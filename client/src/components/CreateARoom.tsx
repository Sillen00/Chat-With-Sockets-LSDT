import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
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
      <Form
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}
        onSubmit={handleCreateAndJoinRoom}
      >
        <Form.Group controlId='formBasicEmail'>
          <Form.Control
            type='text'
            name='createdRoom'
            placeholder='Name of room'
            value={createdRoom}
            onChange={e => setCreatedRoom(e.target.value)}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Create and join room
        </Button>
      </Form>
    </div>
  );
}

// create the return form above but with react bootstrap

export default CreateARoom;
