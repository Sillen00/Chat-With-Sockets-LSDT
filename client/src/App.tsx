import { Col, Row, Container } from 'react-bootstrap';
import Header from './components/navbar';

function App() {
  return (
function App() {
  return (
    <div className='d-flex'>
      <Container fluid>
        <Row>
          <Col md={3} className='bg-light'>
            <Header />
            {/* Aside on the left */}
          </Col>
          <Col md={6} className='bg-white'>
            <h1>mitten</h1>
            {/* Main content in the middle */}
          </Col>
          <Col md={3} className='bg-light'>
            <h1>höger</h1>
            {/* Aside on the right */}
          </Col>
        </Row>
      </Container>
    </div>
  );
}



export default App;
