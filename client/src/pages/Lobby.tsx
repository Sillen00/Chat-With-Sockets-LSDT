import { useState } from 'react';
import { Col, Row, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Chat from '../components/Chat';
import { dm } from '../components/Dm';
import Header from '../components/Header';
import { allRooms } from '../components/Rooms';

function Lobby() {
  const location = useLocation();
  const { username } = location.state;
  const [showRooms, setShowRooms] = useState(true);

  const handleSwitchChange = (value: string) => {
    setShowRooms(value === 'rooms');
  };

  return (
    <Row>
      <Col md={4}>
        <Row className='col-md-5 mx-auto w-100'>
          <Header />
          <div
            className='hide-on-mobile '
            style={{ minHeight: '100vh', backgroundColor: '#F0E6DC' }}
          >
            <div className='my-3'>{showRooms ? <h4>Rooms</h4> : <h4>DM</h4>}</div>
            <ToggleButtonGroup
              type='radio'
              name='options'
              defaultValue={showRooms ? 'rooms' : 'dm'}
              onChange={handleSwitchChange}
              className='d-flex justify-content-center align-items-center mb-3'
            >
              <ToggleButton variant='outline-primary' value='rooms'>
                Rooms
              </ToggleButton>
              <ToggleButton variant='outline-primary' value='dm'>
                DM
              </ToggleButton>
            </ToggleButtonGroup>
            <div className='flex-grow-1'>
              {showRooms
                ? allRooms.map(room => <div key={room.id}>{room.name}</div>)
                : dm.map(message => <div key={message.id}>{message.name}</div>)}
            </div>
          </div>
        </Row>
      </Col>
      <Col xs={12} md={8}>
        <Chat />
      </Col>
    </Row>
  );
}

export default Lobby;
