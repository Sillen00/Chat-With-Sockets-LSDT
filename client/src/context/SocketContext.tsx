import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import type {
  ClientToServerEvents,
  Message,
  ServerToClientEvents,
  SocketData,
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
  sessionId?: string;
  userId?: string;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io({ autoConnect: false });

const SocketContext = createContext<ContextValues>(null as any);
export const useSocket = () => useContext(SocketContext);

function SocketProvider({ children }: PropsWithChildren) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [room, setRoom] = useState<string>();
  const [rooms, setRooms] = useState<string[]>();
  const [name, setName] = useState<string>();
  const [typingName, setTypingName] = useState<string>();
  const [sessionId, setSessionId] = useState<string>();
  const [userId, setUserId] = useState<string>();

  useEffect(() => {
    let sessionID = sessionStorage.getItem('sessionID');

    if (sessionID) {
      const lobbyRoom = 'Lobby';
      setRoom('Lobby');
      socket.emit('join_lobby', lobbyRoom);
      // setRooms(rooms => [...rooms!, 'Lobby']);
      setSessionId(sessionID);
      socket.auth = { sessionID };
      socket.connect();
    }
  }, []);

  //
  // Function starts when user clicks on "Join Chat" button with a username.
  //
  const createUserAndJoinLobby = (name: string) => {
    const lobbyRoom = 'Lobby';
    setRoom(lobbyRoom);
    setName(name);

    socket.emit('join_lobby', lobbyRoom);
    let sessionID = sessionStorage.getItem('sessionID');
    if (sessionID) {
      setSessionId(sessionID);
    }
    // let usernameAlreadySelected = false;

    // }
    socket.auth = { name };
    socket.connect();

    //  sessionStorage.setItem('sessionID', (socket.auth as { sessionID: string }).sessionID);
  };

  //
  // Funtion runs when user clicks on a room in the list of rooms.
  //
  const joinRoom = (room: string) => {
    setMessages([]);
    if (room.length > 2) {
      setRoom(room);
      socket.emit('join', room, name!, () => {});
    } else {
      alert('Your room name is to short.');
    }
  };

  //
  // Function runs when user clicks on "Leave Room" button.
  //
  const leaveRoom = () => {
    setMessages([]);
    const lobbyRoom = 'Lobby';
    socket.emit('leave', room!, () => {
      setRoom(lobbyRoom);
    });
  };

  //
  // Function runs when user clicks on "Send" button to send a message.
  //
  const sendMessage = (message: string) => {
    if (message.trim().length > 0) {
      socket.emit('stop_typing');
    }

    if (!room) throw Error("Can't send message without a room");
    socket.emit('message', room, message);
  };

  //
  // Function runs when user starts typing a message.
  //
  const isTyping = () => {
    socket.emit('typing', room!);
  };

  //
  //
  //
  const stopTyping = () => {
    socket.emit('stop_typing');
  };

  useEffect(() => {
    function session({ name, sessionID, userID }: SocketData) {
      // attach the session ID to the next reconnection attempts

      // console.log(name, sessionID, userID);

      socket.auth = { sessionID };
      // store it in the localStorage
      sessionStorage.setItem('sessionID', sessionID?.toString()!);

      // TYPESCRIPT FEL
      // save the ID of the user
      setUserId(userID);
      // socket.userID = userID;

      // setName(name);
    }

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

    socket.on('session', session);
    socket.on('connect', connect);
    socket.on('disconnect', disconnect);
    socket.on('message', message);
    socket.on('rooms', rooms);
    socket.on('typing', typing);
    socket.on('stop_typing', stop_typing);

    return () => {
      socket.off('session', session);
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
        sessionId,
        userId,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
