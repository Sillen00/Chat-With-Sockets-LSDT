import { useState } from 'react';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Chat from '../components/Chat';
import { dm } from '../components/Dm';
import Header from '../components/Header';
import LeaveRoom from '../components/LeaveRoom';
import Rooms, { allRooms } from '../components/Rooms';

function Lobby() {
  const location = useLocation();
  const { username } = location.state;
  const [showRooms, setShowRooms] = useState(true);

  const toggleRooms = () => {
    setShowRooms(!showRooms);
  };

  return (
    <Row style={{ height: '100vh', margin: '0' }}>
      <Col md={3} style={{ padding: '0', borderRight: '2px solid black', overflow: 'hidden' }}>
        <Header />
        <div
          className='hide-on-mobile '
          style={{ backgroundColor: '#F0E6DC', height: '100%', padding: '1rem' }}
        >
          <h3>{username}</h3>
          <div className='my-3'>
            <h4>{showRooms ? 'Rooms' : 'DM'}</h4>
          </div>
          <ButtonGroup aria-label='Buttongroup for room or DM'>
            <Button variant={showRooms ? 'dark' : 'light'} onClick={toggleRooms}>
              Rooms
            </Button>
            <Button variant={!showRooms ? 'dark' : 'light'} onClick={toggleRooms}>
              DM
            </Button>
          </ButtonGroup>
          <div className='flex-grow-1'>
            {showRooms
            // SOCKET.IO STUFF WILL GO HERE
              ? allRooms.map(room => <div key={room.id}>{room.name}</div>)
              : dm.map(message => <div key={message.id}>{message.name}</div>)}
          </div>
        </div>
      </Col>
      <Col xs={12} md={6} className='nopadding'>
        <Chat />
      </Col>
      <Col md={3} className='info-bar'>
        <h3>You are in room:</h3>
          <div>
            <LeaveRoom />
          </div>
      </Col>
    </Row>
  );
}

export default Lobby;
