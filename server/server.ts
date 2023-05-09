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
  const mongoCollection = mongoClient.db(DB).collection(COLLECTION);

  io.adapter(createAdapter(mongoCollection));

  io.on('connection', socket => {
    console.log('a user connected', socket.id);

    socket.on('join_lobby', (lobbyRoom: string, name: string, ack) => {
      socket.data.name = name;
      socket.join(lobbyRoom);
      io.emit('rooms', getRooms());
      ack();
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

    // When a new user connects send the list of rooms
    socket.emit('rooms', getRooms());
  });

  io.listen(3000);
};

main();

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
