import { useState } from 'react';
import { Button, Col, Row, Stack } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Chat from '../components/Chat';
import Dm from '../components/Dm';
import Header from '../components/Header';
import Rooms from '../components/Rooms';

function Lobby() {
  const location = useLocation();
  const { username } = location.state;
  const [showRooms, setShowRooms] = useState(true);

  const toggleShowRooms = () => {
    setShowRooms(prev => !prev);
  };

  return (
    <Row>
      <Col md={4} style={{ padding: '0' }}>
        <Stack gap={4} className='col-md-5 mx-auto w-100'>
          <Header />
          {/* <div
            className='hide-on-mobile'
            style={{  minHeight: '100vh', backgroundColor: '#F0E6DC' }}
          >
            <Button variant='primary' onClick={toggleShowRooms}>
              {showRooms ? 'Show DM' : 'Show Rooms'}
            </Button>
            {showRooms ? <Rooms /> : <Dm />}
          </div> */}
        </Stack>
      </Col>
      <Col md={8}>
        <Chat />
      </Col>
    </Row>
  );
}

export default Lobby;
