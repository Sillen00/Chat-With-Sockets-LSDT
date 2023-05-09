import { useSocket } from './context/SocketContext';
import Lobby from './pages/Lobby';
import Login from './pages/login';

function App() {
  const {room} = useSocket()
  return (
    <>
      {room ? <Lobby /> : <Login />}
    </>
  );
}

export default App;
