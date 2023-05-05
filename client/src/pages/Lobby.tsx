import { useState } from "react";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Chat from "../components/Chat";
import { dm } from "../components/Dm";
import Header from "../components/Header";
import { allRooms } from "../components/Rooms";

function Lobby() {
  const location = useLocation();
  const { username } = location.state;
  const [showRooms, setShowRooms] = useState(true);

  const toggleRooms = () => {
    setShowRooms(!showRooms);
  };

  return (
    <Row>
      <Col md={4} className='nopadding'>
        {/* <Row className='col-md-5 mx-auto w-100 h-100'> */}
          <div
            className='hide-on-mobile '
            style={{ backgroundColor: '#F0E6DC' }}
          >
          <Header />
            <div className='my-3'>
              <h4>{showRooms ? 'Rooms' : 'DM'}</h4>
            </div>
            <ButtonGroup aria-label='Buttongroup for room or DM'>
              <Button
                variant={showRooms ? 'dark' : 'light'}
                onClick={toggleRooms}
              >
                Rooms
              </Button>
              <Button
                variant={!showRooms ? 'dark' : 'light'}
                onClick={toggleRooms}
              >
                DM
              </Button>
            </ButtonGroup>
            <div className='flex-grow-1'>
              {showRooms
                ? allRooms.map((room) => <div key={room.id}>{room.name}</div>)
                : dm.map((message) => <div key={message.id}>{message.name}</div>)}
            </div>
          </div>
        {/* </Row> */}
      </Col>
      <Col xs={12} md={8} className='nopadding'>
          <Chat />  
      </Col>
    </Row>
  );
}

export default Lobby;
