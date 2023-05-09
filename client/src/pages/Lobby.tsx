import { useState } from 'react';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import Chat from '../components/Chat';
import CreateARoom from '../components/CreateARoom';
import Header from '../components/Header';
import LeaveRoom from '../components/LeaveRoom';
import Rooms from '../components/Rooms';
import { useSocket } from '../context/SocketContext';

function Lobby() {
  // const location = useLocation();
  // const { username } = location.state;

  const [showRooms, setShowRooms] = useState(true);

  const { room, messages, joinRoom, leaveRoom, name } = useSocket();

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
          <h3>{name}</h3>
          <ButtonGroup aria-label='Buttongroup for room or DM'>
            <Button variant={showRooms ? 'dark' : 'light'} onClick={toggleRooms}>
              Rooms
            </Button>
            <Button variant={!showRooms ? 'dark' : 'light'} onClick={toggleRooms}>
              DM
            </Button>
          </ButtonGroup>
          <div className='flex-grow-1'>
            {showRooms ? (
              // SOCKET.IO STUFF WILL GO HERE
              // allRooms.map(room => <div key={room.id}>{room.name}</div>)
              <Rooms />
            ) : (
              <p>DM - users online</p>
            )}
          </div>
          <CreateARoom />
          <p>hej</p>
        </div>
      </Col>
      <Col xs={12} md={6} className='nopadding'>
        <Chat />
      </Col>
      <Col md={3} className='info-bar'>
        <h3>You are in room: {room}</h3>
        <div>
          <LeaveRoom />
        </div>
      </Col>
    </Row>
  );
}

export default Lobby;
