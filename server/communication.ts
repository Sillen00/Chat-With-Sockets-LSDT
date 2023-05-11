export interface ServerToClientEvents {
  message: (name: string, message: string) => void;
  rooms: (rooms: Room[]) => void;
  typing: (name: string) => void;
  stop_typing: (name: string) => void;
  session: (session: SocketData) => void;
  all_users: (users: User[]) => void;
}

export interface ClientToServerEvents {
  message: (room: string, message: string) => void;
  join_lobby: (room: string) => void;
  join: (room: string, name: string, ack: () => void) => void;
  leave: (room: string, ack: () => void) => void;
  typing: (room: string) => void;
  stop_typing: () => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  sessionID: string;
  userID: string;
}

export interface Message {
  userID?: string;
  name: string;
  message: string;
}

export interface MessageHistory {
  room: string;
  messages: Message[];
}

export interface User {
  name: string;
  userID: string;
}

export interface Room {
  name: string;
  users: User[];
}
