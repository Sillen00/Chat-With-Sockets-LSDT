import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Chat from '../components/Chat';
import { Col, Container, Row } from 'react-bootstrap';



function Lobby() {
  const location = useLocation();
  const { username } = location.state;

  return (
    <Container fluid>
      <Row>
        <Col md={4} style={{padding: '0'}}>
          <Header />
        </Col>
        <Col md={8}>
          <Chat />
        </Col>
      </Row>
    </Container>
  );
}


export default Lobby;
