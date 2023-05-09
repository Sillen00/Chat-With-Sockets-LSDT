import { useState } from 'react';
import chatterappLogo from '../assets/chatterapplogo.svg';
import { alignPropType } from 'react-bootstrap/esm/types';

interface User {
  username: string;
}

export function LoginForm() {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className='login-container'>
      <form
        onSubmit={handleSubmit}
        style={{display:"flex", flexDirection: "column", alignItems: "center", justifyContent:"center"}}
      >
          <img src={chatterappLogo} alt='logo' />
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            className='form-control'
            id='username'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
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
