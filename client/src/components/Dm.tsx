import { useState } from 'react';
import { Button } from 'react-bootstrap';

// Detta skall vara en lista på alla DM's eller online users som finns
export const dm = [
  {
    name: 'Message From:',
    id: '1',
  },
];

function DirectMessage() {
  const [showList, setShowList] = useState(false);

  const handleButtonClick = () => {
    setShowList(!showList);
  };

  return (
    <div>
      <Button onClick={handleButtonClick}>DM's</Button>
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

export default DirectMessage;
