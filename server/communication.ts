export interface ServerToClientEvents {
  message: (name: string, message: string) => void;
  rooms: (rooms: string[]) => void;
  typing: (name: string) => void;
  stop_typing: (name: string) => void;
}

export interface ClientToServerEvents {
  message: (room: string, message: string) => void;
  join_lobby: (room: string, name: string, ack: () => void) => void;
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
  name: string;
  message: string;
}
