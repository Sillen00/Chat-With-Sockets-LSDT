import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import chatterapplogo from '../assets/chatterapplogo.svg';

function Header() {
  return (
    <>
      <Navbar style={{ backgroundColor: '#D9D9D9' }} expand="md">
        <Container style={{ margin: '0', padding: '0' }}>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Navbar.Brand href='#home' className='ml-auto' style={{ margin: '0 1rem' }}>
                <img alt='chatterapp logo' src={chatterapplogo} width='100' className='d-inline-block align-top' />{' '}
              </Navbar.Brand>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
