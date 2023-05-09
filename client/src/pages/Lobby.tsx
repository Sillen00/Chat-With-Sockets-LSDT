import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import Chat from '../components/Chat';
import Dm from '../components/Dm';
import LeaveRoom from '../components/LeaveRoom';
import Rooms from '../components/Rooms';
import '../index.css';

function Lobby() {
  const [showRooms, setShowRooms] = useState(true);

  const toggleRooms = () => {
    setShowRooms(!showRooms);
  };

  return (
    <>
      <Row style={{ height: '100vh', margin: '0' }}>
        {/* Desktop vänster menu */}
        <Col md={3} style={{ borderRight: '2px solid black', backgroundColor: '#F0E6DC' }}>
          {/* Mobile headern */}
          {/* <Header /> */}

          <div className='hide-on-mobile '>
            <div>
              <h3>username</h3>
              <h4>{showRooms ? 'Rooms' : 'DM'}</h4>
              <ButtonGroup aria-label='Buttongroup for room or DM'>
                <Button variant={showRooms ? 'dark' : 'light'} onClick={toggleRooms}>
                  Rooms
                </Button>
                <Button variant={!showRooms ? 'dark' : 'light'} onClick={toggleRooms}>
                  DM
                </Button>
              </ButtonGroup>
              {showRooms ? (
                // SOCKET.IO STUFF WILL GO HERE
                <Rooms />
              ) : (
                <Dm />
              )}
            </div>
          </div>
        </Col>

        {/* Chat page in middle */}
        <Col xs={12} md={6} style={{ padding: 0 }}>
          <Chat />
        </Col>

        {/* Room menu right side. */}
        <Col md={3} style={{ padding: 15, color: 'red', borderLeft: '2px solid black' }}>
          <h3>You are in room:</h3>
          <LeaveRoom />
        </Col>
      </Row>
    </>
  );
}

export default Lobby;
