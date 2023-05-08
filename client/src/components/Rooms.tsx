import { useState } from 'react';
import { Button } from 'react-bootstrap';


// Detta skall vara en lista på alla rum som finns
export const allRooms = [
  {
    name: 'Room1',
    id: '1',
  },
  {
    name: 'Room2',
    id: '1',
  },
];

function Rooms() {
  const [showList, setShowList] = useState(false);

  const handleButtonClick = () => {
    setShowList(!showList);
  };

  return (
    <div>
      <Button onClick={handleButtonClick}>Rooms</Button>
      {showList && (
        <ul>
          {allRooms.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Rooms;