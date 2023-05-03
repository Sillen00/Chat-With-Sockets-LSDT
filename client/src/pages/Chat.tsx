import { useLocation } from 'react-router-dom';
import Header from '../components/Header';

function Chat() {
  const location = useLocation();
  const { username } = location.state;

  return (
    <div>
        <Header />
      <h1>user: {username}</h1>
  
    </div>
  );
}

export default Chat;
