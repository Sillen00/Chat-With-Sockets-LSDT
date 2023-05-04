import { useState } from 'react';
import { Button } from 'react-bootstrap';

const dm = [
  {
    name: 'test',
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
          {dm.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Rooms;