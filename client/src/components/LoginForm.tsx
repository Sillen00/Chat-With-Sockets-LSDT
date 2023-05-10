import { useState } from 'react';
import { Button } from 'react-bootstrap';
import chatterappLogo from '../assets/logoChat.png';
import { useSocket } from '../context/SocketContext';

interface User {
  username: string;
}

export function LoginForm() {
  // const [username, setUsername] = useState('');
  const [name, setName] = useState('');

  const { createUserAndJoinLobby } = useSocket();

  // const { socket } = useSocket();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createUserAndJoinLobby(name);
  };

  return (
    <div className='login-container'>
      <form onSubmit={handleSubmit} className='d-flex flex-column gap-3'>
        <img src={chatterappLogo} style={{width: "15rem", marginBottom:"2rem"}} alt='logo' />
        <div>
          <label htmlFor='username'>Username:</label>
          <input
            name='Name'
            placeholder='Name'
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <Button type='submit' style={{ backgroundColor: '#710193 color: #fff' }}>
          Join Chat
        </Button>
      </form>
    </div>
  );
}
