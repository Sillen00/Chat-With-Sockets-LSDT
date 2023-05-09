import React, { useState } from 'react';
import { useSocket } from '../context/SocketContext';

function CreateARoom() {
  const { room, messages, joinRoom, leaveRoom, name } = useSocket();
  const [createdRoom, setCreatedRoom] = useState('');

  const handleCreateAndJoinRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    joinRoom(createdRoom);
    setCreatedRoom('');
  };

  const handleLeaveRoom = () => {
    leaveRoom();
  };
  return (
    <div>
      <form onSubmit={handleCreateAndJoinRoom}>
        <input
          type='text'
          name='createdRoom'
          value={createdRoom}
          onChange={e => setCreatedRoom(e.target.value)}
        />
        <button type='submit'>Create and join room</button>
      </form>
    </div>
  );
}

export default CreateARoom;
