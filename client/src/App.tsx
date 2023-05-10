import { useEffect, useState } from 'react';
import { useSocket } from './context/SocketContext';
import Lobby from './pages/Lobby';
import Login from './pages/login';

function App() {
  const { room, userId} = useSocket();

  return <>{userId ? <Lobby /> : <Login />}</>;
}

export default App;
