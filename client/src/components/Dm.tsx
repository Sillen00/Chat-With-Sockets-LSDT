import { useState } from 'react';
import { Button } from 'react-bootstrap';

// Detta skall vara en lista på alla DM's eller online users som finns
export const dm = [
  {
    name: 'Pelle',
  },
];

function DirectMessage() {
  // const [showList, setShowList] = useState(false);

  // const handleButtonClick = () => {
  //   setShowList(!showList);
  // };

  return (
    <div>
      {/* <h1>hr</h1> */}
      {/* <Button onClick={handleButtonClick}>DM's</Button> */}
      {/* {showList && ( */}
        <ul>
          {dm.map((item, i) => (
            <li key={i}>{item.name}</li>
          ))}
        </ul>
      {/* )} */}
    </div>
  );
}

export default DirectMessage;
