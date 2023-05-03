import { useLocation } from 'react-router-dom';

function Chat() {
  const location = useLocation();
  const { username } = location.state;
  
  return (
    <div>
      <h1>This is the user: {username}</h1>
    </div>
  );
}

export default Chat;
