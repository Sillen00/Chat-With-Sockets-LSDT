import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';

interface User {
  username: string;
}

export function LoginForm() {
  const [username, setUsername] = useState('');
  const { socket } = useSocket();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === '') {
      return;
    }
    const user: User = { username };
    socket.emit('join', user);
    navigate('/chat', { state: { username } });
  };

  return (
    <form onSubmit={handleSubmit} className='d-flex justify-content-center'>
      <div className='form-group'>
        <label htmlFor='username'>Username:</label>
        <input
          type='text'
          className='form-control'
          id='username'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <button
        type='submit'
        className='btn btn-primary mt-4'
        style={{ margin: '1rem', backgroundColor: '#710193 color: #fff' }}
      >
        Join Chat
      </button>
    </form>
  );
}
