import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import ButtonGroupToggle from '../components/ButtonGroupToggle';
import Chat from '../components/Chat';
import CreateARoom from '../components/CreateARoom';
import Header from '../components/Header';
import LeaveRoom from '../components/LeaveRoom';
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
          style={{ backgroundColor: '#1B4866', height: '100%', padding: '1rem' }}
        >
          <ButtonGroupToggle />
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
