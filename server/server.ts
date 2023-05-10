import { createAdapter } from '@socket.io/mongo-adapter';
import { MongoClient } from 'mongodb';
import { Server } from 'socket.io';
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from './communication';

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>();

const DB = 'chatterapp';
const COLLECTION = 'socket.io-adapter-events';
const mongoClient = new MongoClient(
  'mongodb+srv://nerd:nerduserATLAS@cluster0.pg7qeoa.mongodb.net/chatter/?retryWrites=true&w=majority'
);

let userRoomMap = new Map<string, Map<string, string>>();

const main = async () => {
  await mongoClient.connect();

  try {
    await mongoClient.db(DB).createCollection(COLLECTION, {
      capped: true,
      size: 1e6,
    });
  } catch (e) {
    // collection already exists
  }

  try {
    await mongoClient.db(DB).createCollection('sessions');
  } catch (error) {
    // collection already exists
  }

  const adapterCollection = mongoClient.db(DB).collection(COLLECTION);
  const sessionCollection = mongoClient.db(DB).collection<SocketData>('sessions');

  io.adapter(createAdapter(adapterCollection));

  io.use(async (socket, next) => {
    const sessionID = socket.handshake.auth.sessionID;
    if (sessionID) {
      // find existing session Reconnect existing user
      const session = await sessionCollection.findOne({ sessionID });
      if (session) {
        socket.data.sessionID = sessionID;
        socket.data.userID = session.userID;
        socket.data.name = session.name;
        return next();
      }
    }
    const name = socket.handshake.auth.name;
    if (!name) {
      return next(new Error('invalid name'));
    }
    // create new session for new user
    socket.data.sessionID = Date.now().toString();
    socket.data.userID = Date.now().toString();
    socket.data.name = name;
    await sessionCollection.insertOne(socket.data as SocketData);
    next();
  });

  //

  io.on('connection', socket => {
    console.log('a user connected', socket.id);

    const session = {
      name: socket.data.name,
      sessionID: socket.data.sessionID,
      userID: socket.data.userID,
    };
    socket.emit('session', session);

    socket.on('join_lobby', (lobbyRoom: string) => {
      socket.join(lobbyRoom);
      if (socket.data.name) {
        addUserToRoom(lobbyRoom, socket.id, socket.data.name);
      }
      io.emit('rooms', getRooms());
      io.to(lobbyRoom).emit('roomUsers', lobbyRoom, getUsersInRoom(lobbyRoom));
    });

    socket.on('message', (room, message) => {
      io.to(room).emit('message', socket.data.name!, message);
      console.log(room, socket.data.name, message);
    });

    socket.on('join', (room, name, ack) => {
      //socket.rooms
      const { rooms } = io.sockets.adapter;
      for (const [name, setOfSocketIds] of rooms) {
        if (!setOfSocketIds.has(name)) {
          socket.leave(name);
        }
      }
      socket.join(room);

      ack();
      // When a user joins a room send an updated
      // list of rooms to everyone
      io.emit('rooms', getRooms());
      addUserToRoom(room, socket.id, name);
      io.to(room).emit('roomUsers', room, getUsersInRoom(room));
    });

    socket.on('leave', (room, ack) => {
      console.log('Try to leave room: ' + room);
      const { rooms } = io.sockets.adapter;

      for (const [name, setOfSocketIds] of rooms) {
        console.log(name);
        if (name === room) {
          socket.leave(room);
        }
      }
      socket.join('Lobby');
      // console.log("Left room: " + room);
      ack();
      io.emit('rooms', getRooms());
      removeUserFromRoom(room, socket.id);
      io.to(room).emit('roomUsers', room, getUsersInRoom(room));
    });

    socket.on('typing', (room: string) => {
      const name = socket.data.name;
      if (name) {
        socket.to(room).emit('typing', name);
      }
    });

    socket.on('stop_typing', () => {
      const name = socket.data.name;
      if (name) {
        socket.broadcast.emit('stop_typing', name);
      }
    });

    // When a new user connects send the list of rooms
    socket.emit('rooms', getRooms());
  });

  io.listen(3000);
};

main();

function addUserToRoom(room: string, userId: string, userName: string) {
  if (!userRoomMap.has(room)) {
    userRoomMap.set(room, new Map());
  }
  userRoomMap.get(room)?.set(userId, userName);
}

function removeUserFromRoom(room: string, userId: string) {
  userRoomMap.get(room)?.delete(userId);
  if (userRoomMap.get(room)?.size === 0) {
    userRoomMap.delete(room);
  }
}

function getUsersInRoom(room: string) {
  return Array.from(userRoomMap.get(room)?.values() || []);
}

function getRooms() {
  const { rooms } = io.sockets.adapter;
  const roomsFound: string[] = [];

  // console.log(rooms);

  for (const [name, setOfSocketIds] of rooms) {
    // An actual real room that we created
    if (!setOfSocketIds.has(name)) {
      roomsFound.push(name);
    }
    // console.log(setOfSocketIds);
  }

  return roomsFound;
}
