import { useState } from 'react';

// Detta skall vara en lista på alla DM's eller online users som finns
export const dm = [
  {
    name: 'Pelle',
  },
];

function DirectMessage() {
  const [showList, setShowList] = useState(false);

  const handleButtonClick = () => {
    setShowList(!showList);
  };

  return (
    <div style={{ color: 'white' }}>
      <ul>
        {dm.map((item, i) => (
          <li key={i}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default DirectMessage;
