import { useState } from 'react';
import { Button, ButtonGroup, Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import chatterappLogo from '../assets/chatterapplogo.svg';
import '../index.css';
import Dm from './Dm';
import LeaveRoom from './LeaveRoom';
import Rooms from './Rooms';

function Header() {
  const [showRooms, setShowRooms] = useState(true);

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
            <Navbar.Toggle aria-controls='offcanvasNavbar-expand-lg' />
            <Navbar.Offcanvas
              style={{ backgroundColor: '#F0E6DC' }}
              id='offcanvasNavbar-expand-lg'
              aria-labelledby='offcanvasNavbarLabel-expand-lg'
              placement='end'
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id='offcanvasNavbarLabel-expand-lg'>Offcanvas</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav
                  id='offcanvas-content'
                  className='justify-content-end flex-grow-1 pe-3 '
                  style={{ display: 'flex', gap: '1rem' }}
                >
                  <ButtonGroup aria-label='Buttongroup for room or DM'>
                    <Button variant={showRooms ? 'dark' : 'light'} onClick={toggleRooms}>
                      Rooms
                    </Button>
                    <Button variant={!showRooms ? 'dark' : 'light'} onClick={toggleRooms}>
                      DM
                    </Button>
                  </ButtonGroup>
                  <div>{showRooms ? <Rooms /> : <Dm />}</div>
                  <div className='leave-room-btn'>
                    <LeaveRoom />
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
