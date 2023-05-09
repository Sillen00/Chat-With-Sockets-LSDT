import { Button } from 'react-bootstrap';
import { useSocket } from '../context/SocketContext';

function LeaveRoom() {
  // const handleLeaveRoom = () => {
  //     leaveRoom()
  //     };

  // function that starts counting from 0 - 10 sec and when it reaches 10 sec it will not show that a user is writin in the chat

  const { room, leaveRoom } = useSocket();

  const handleLeaveRoom = () => {
    leaveRoom();
  };

  return (
    <div>
      <Button variant='secondary' onClick={handleLeaveRoom}>
        Leave room
      </Button>
    </div>
  );
}

export default LeaveRoom;
