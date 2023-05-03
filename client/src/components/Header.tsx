import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import chatterappLogo from '../assets/chatterapplogo.svg';
import DirectMessage from './Dm';
import Rooms from './Rooms';

function Header() {
  return (
    <>
    <Navbar style={{ backgroundColor: "#F0E6DC" }} expand='md' className='mb-3 d-flex justify-content-spacebetween'>
      <Container fluid>
        <Navbar.Brand href='#'></Navbar.Brand>
        <img src={chatterappLogo} alt='logo' width='100' />
        <Navbar.Toggle aria-controls='offcanvasNavbar-expand-lg' />
        <Navbar.Offcanvas style={{ backgroundColor: "#F0E6DC" }}
          id='offcanvasNavbar-expand-lg'
          aria-labelledby='offcanvasNavbarLabel-expand-lg'
          placement='end'
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id='offcanvasNavbarLabel-expand-lg'>
              Offcanvas
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className='justify-content-end flex-grow-1 pe-3' style={{display: 'flex', gap: '1rem'}}>
              <DirectMessage />
             <Rooms />
            
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
    </>
  );
}


export default Header;
