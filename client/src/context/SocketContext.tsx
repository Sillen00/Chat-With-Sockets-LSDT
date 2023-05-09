import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import type {
  ClientToServerEvents,
  Message,
  ServerToClientEvents,
} from '../../../server/communication';

interface ContextValues {
  createUserAndJoinLobby: (name: string) => void;
  joinRoom: (room: string) => void;
  leaveRoom: () => void;
  sendMessage: (message: string) => void;
  room?: string;
  messages: Message[];
  rooms?: string[];
  name?: string;
  isTyping: () => void;
  typingName?: string;
  stopTyping: () => void;
}

// socket.on("session", ({ sessionID, userID }) => {
  // attach the session ID to the next reconnection attempts
  // socket.auth = { sessionID };
  // store it in the localStorage
  // localStorage.setItem("sessionID", sessionID);
  // save the ID of the user
  // socket.userID = userID;
// });

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io({autoConnect: false});

const SocketContext = createContext<ContextValues>(null as any);
export const useSocket = () => useContext(SocketContext);

function SocketProvider({ children }: PropsWithChildren) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [room, setRoom] = useState<string>();
  const [rooms, setRooms] = useState<string[]>();
  const [name, setName] = useState<string>();
  const [typingName, setTypingName] = useState<string>();




  const createUserAndJoinLobby = (name: string) => {
    // created() {
  // const sessionID = localStorage.getItem("sessionID");

  // if (sessionID) {
    // this.usernameAlreadySelected = true;
    // socket.auth = { sessionID };
    // socket.connect();
  // }
  // ...
// }
    const lobbyRoom = 'Lobby';



    socket.auth = {name}
    socket.connect();

    socket.emit('join_lobby', lobbyRoom, name, () => {
      setRoom(lobbyRoom);
      setName(name);
    });
  };

  const joinRoom = (room: string) => {
    setMessages([]);
    if (room.length > 2) {
      socket.emit('join', room, name!, () => {
        setRoom(room);
      });
    } else {
      alert('Your room name is to short.');
    }
  };

  const leaveRoom = () => {
    setMessages([]);
    const lobbyRoom = 'Lobby';
    socket.emit('leave', room!, () => {
      setRoom(lobbyRoom);
    });
  };

  const sendMessage = (message: string) => {
    if (message.trim().length > 0) {
      socket.emit('stop_typing');
    }

    if (!room) throw Error("Can't send message without a room");
    socket.emit('message', room, message);
  };

  const isTyping = () => {
    socket.emit('typing', room!);
  };

  const stopTyping = () => {
    socket.emit('stop_typing');
  };

  useEffect(() => {
    function connect() {
      console.log('Connected to server');
    }
    function disconnect() {
      console.log('Disconnected from server');
    }
    function message(name: string, message: string) {
      setMessages(messages => [...messages, { name, message }]);
    }
    function rooms(rooms: string[]) {
      setRooms(rooms);
    }
    function typing(name: string) {
      setTypingName(name);
    }
    function stop_typing() {
      setTypingName('');
    }

    socket.on('connect', connect);
    socket.on('disconnect', disconnect);
    socket.on('message', message);
    socket.on('rooms', rooms);
    socket.on('typing', typing);
    socket.on('stop_typing', stop_typing);

    return () => {
      socket.off('connect', connect);
      socket.off('disconnect', disconnect);
      socket.off('message', message);
      socket.off('rooms', rooms);
      socket.off('typing', typing);
      socket.off('stop_typing', stop_typing);
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        createUserAndJoinLobby,
        joinRoom,
        leaveRoom,
        sendMessage,
        room,
        messages,
        rooms,
        name,
        isTyping,
        typingName,
        stopTyping,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
