import { useEffect, useState } from 'react';
import { useSocket } from './context/SocketContext';
import Lobby from './pages/Lobby';
import Login from './pages/login';

function App() {
  const { room, sessionID } = useSocket();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (sessionID) {
  //     setLoading(false);
  //   }
  // }, [sessionID]);

  // if (loading) {
  //   // render a loading spinner or message
  //   return <div>Loading...</div>;
  // }

  return <>{sessionID ? <Lobby /> : <Login />}</>;
}

export default App;
