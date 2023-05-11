import { useState } from 'react';
import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import chatterappLogo from '../assets/logoChat.png';
import { useSocket } from '../context/SocketContext';
import '../index.css';
import ButtonGroupToggle from './ButtonGroupToggle';
import CreateARoom from './CreateARoom';
import LeaveRoom from './LeaveRoom';

function Header() {
  const [showRooms, setShowRooms] = useState(true);
  const { name } = useSocket();

  const toggleRooms = () => {
    setShowRooms(!showRooms);
  };

  return (
    <>
      <Navbar id='custom-navbar' expand='md' sticky='top'>
        <Container id='fluid-desk' fluid>
          <div className=' d-flex align-items-center flex-row'>
            <img src={chatterappLogo} alt='logo' width='100' />
          </div>

          <div>
            <Navbar.Toggle
              aria-controls='offcanvasNavbar-expand-lg'
              style={{ background: '#ad7055' }}
            />
            <Navbar.Offcanvas
              style={{ backgroundColor: '#1B4866', color: 'white' }}
              id='offcanvasNavbar-expand-lg'
              aria-labelledby='offcanvasNavbarLabel-expand-lg'
              placement='end'
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id='offcanvasNavbarLabel-expand-lg'>{name}</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav
                  id='offcanvas-content'
                  className='justify-content-end flex-grow-1 pe-3 '
                  style={{ display: 'flex', gap: '1rem', alignItems: 'center', height: '100%' }}
                >
                  <ButtonGroupToggle />
                  <div className='leave-room-btn'>
                    <LeaveRoom />
                  </div>
              <div style={{marginTop: "auto"}}>
                <CreateARoom />
              </div>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
