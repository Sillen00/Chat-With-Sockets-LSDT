import { useSocket } from './context/SocketContext';
import Lobby from './pages/Lobby';
import Login from './pages/login';

function App() {
  const { sessionId } = useSocket();
  // console.log("SESSION IDKOM IGEN! " + sessionId);
  return <>{sessionId ? <Lobby /> : <Login />}</>;
}

export default App;
