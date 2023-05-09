import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
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
        <Button variant="primary" type='submit'>Create and join room</Button>
      </form>
    </div>
  );
}

export default CreateARoom;
