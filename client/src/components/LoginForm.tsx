import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import chatterappLogo from '../assets/chatterapplogo.svg';
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
      <form
        onSubmit={handleSubmit}
        className='d-flex flex-column justify-content-center align-items-center'
      >
        <div className='form-group'>
          <img src={chatterappLogo} alt='logo' />
          <label htmlFor='username'>Username:</label>
          <input
            name='Name'
            placeholder='Name'
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
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
    </div>
  );
}
