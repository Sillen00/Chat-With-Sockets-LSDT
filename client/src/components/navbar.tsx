import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import chatterapplogo from '../assets/chatterapplogo.svg';
function Header() {
  return (
    <>
      <Navbar bg="dark">       
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt="logo"
              src={chatterapplogo}
              width="100"
              className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>
        </Container>
      </Navbar>      
    </>
  );
}

export default Header;