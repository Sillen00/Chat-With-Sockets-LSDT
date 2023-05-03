import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Chat from '../components/Chat';
function Lobby() {
  const location = useLocation();
  const { username } = location.state;

  return (
    <div>
        <Header />
      <h1>user: {username}</h1>
      
      <Chat />
      {/* rooms */}
      {/* DM */}
  
    </div>
  );
}

export default Lobby;
