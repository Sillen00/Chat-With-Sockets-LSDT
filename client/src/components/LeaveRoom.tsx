import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

function LeaveRoom() {
  return (
    <div>
      <Row>
        <Col>
          <ButtonGroup aria-label='Basic example'>
            <Button variant='secondary'>Return to Lobby</Button>
          </ButtonGroup>
        </Col>
      </Row>
    </div>
  );
}

export default LeaveRoom;
