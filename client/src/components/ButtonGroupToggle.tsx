import { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import Rooms from "./Rooms";

function ButtonGroupToggle() {
  const [showRooms, setShowRooms] = useState(true);

  const toggleRooms = () => {
    setShowRooms(!showRooms);
  };

  return (
    <div className="my-3">
      
      <ButtonGroup aria-label="Buttongroup for room or DM">
        <Button variant={showRooms ? "dark" : "light"} onClick={toggleRooms}>
          Rooms
        </Button>
        <Button variant={!showRooms ? "dark" : "light"} onClick={toggleRooms}>
          DM
        </Button>
      </ButtonGroup>
      <div className="flex-grow-1">
      {showRooms ? (
              // SOCKET.IO STUFF WILL GO HERE
              // allRooms.map(room => <div key={room.id}>{room.name}</div>)
              <Rooms />
            ) : (
              <p>DM - users online</p>
            )}
      </div>
    </div>
  );
}

export default ButtonGroupToggle;
