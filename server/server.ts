import { createAdapter } from '@socket.io/mongo-adapter';
import { MongoClient } from 'mongodb';
import { Server } from 'socket.io';
import type {
  ClientToServerEvents,
  InterServerEvents,
  Room,
  ServerToClientEvents,
  SocketData,
  User,
} from './communication';

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>();

const DB = 'chatterapp';
const COLLECTION = 'socket.io-adapter-events';
const mongoClient = new MongoClient(
  'mongodb+srv://nerd:nerduserATLAS@cluster0.pg7qeoa.mongodb.net/chatter/?retryWrites=true&w=majority'
);

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
    socket.data.sessionID = Math.random().toString().slice(2);
    socket.data.userID = Math.random().toString().slice(2);
    socket.data.name = name;
    await sessionCollection.insertOne(socket.data as SocketData);
    next();
  });
  
  //
  // const allUsers = await sessionCollection.toArray();
  
  io.on('connection', socket => {
    console.log('a user connected', socket.id);

    // const session = {
    //   name: socket.data.name,
    //   sessionID: socket.data.sessionID,
    //   userID: socket.data.userID,
    // };
    socket.emit('session', socket.data as SocketData);

    socket.on('join_lobby', (lobbyRoom: string) => {
      socket.join(lobbyRoom);
      io.emit('rooms', getRooms());
    });

    socket.on('message', (room, message) => {
      io.to(room).emit('message', socket.data.name!, message);
      console.log(room, socket.data.name, message);
      // Save message to database
    });

    socket.on('join', (room, name, ack) => {
      'DM-<userID>-<userID>';
      //socket.data.userID måste finnas i room namnet om man ska få joina

      //socket.rooms
      const { rooms } = io.sockets.adapter;
      for (const [name, setOfSocketIds] of rooms) {
        if (!setOfSocketIds.has(name)) {
          socket.leave(name);
        }
      }
      socket.join(room);
      // Get all message from database and send to client

      ack();
      // When a user joins a room send an updated
      // list of rooms to everyone
      io.emit('rooms', getRooms());
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
    
    socket.on('disconnect', () => {
      io.emit('all_users', getAllOnlineUsers());
      io.emit('rooms', getRooms());
    });
    
    // When a new user connects send the list of rooms
    socket.emit('rooms', getRooms());
    io.emit('all_users', getAllOnlineUsers());
  });
  
  io.listen(3000);
};

main();

function getRooms() {
  const { rooms } = io.sockets.adapter;
  const roomsFound: Room[] = [];
  
  for (const [name, setOfSocketIds] of rooms) {
    // An actual real room that we created
    if (!setOfSocketIds.has(name)) {
      roomsFound.push({
        name,
        users: [],
      });
      // io.sockets.sockets.filter(...setOfSocketIds...)...
    }
  }

  return roomsFound;
}

function getAllOnlineUsers() {
  const allSockets = io.sockets.sockets;
  const usersFound: User[] = [];

  for (const [socketId, socket] of allSockets) {
    // An actual real room that we created
    usersFound.push({
      name: socket.data.name!,
      userID: socket.data.userID!,
    });
  }

  return usersFound;
}
