import { useState } from 'react';
import { useSocket } from '../context/SocketContext';

// Detta skall vara en lista på alla DM's eller online users som finns
export const dm = [
  {
    name: 'Pelle',
  },
];

function DirectMessage() {
  const [showList, setShowList] = useState(false);
  const { allUsers } = useSocket();

  const handleButtonClick = () => {
    setShowList(!showList);
  };

  return (
    <div style={{ color: 'white' }}>
      <ul>
        {allUsers?.map((item, i) => (
          <li key={i}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default DirectMessage;
