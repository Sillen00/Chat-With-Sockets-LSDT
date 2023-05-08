import { useState } from 'react';
import { Button } from 'react-bootstrap';


// Detta skall vara en lista på alla rum som finns
export const allRooms = [
  {
    name: 'Room1',
  },
  {
    name: 'Room2',
  },
];

function Rooms() {
  // const [showList, setShowList] = useState(false);

  // const handleButtonClick = () => {
  //   setShowList(!showList);
  // };

  return (
    <div>
      {/* <Button onClick={handleButtonClick}>Rooms</Button> */}
      {/* {showList && ( */}
        <ul>
          <div style={{border: '2px solid black', background: ''}}>
          {allRooms.map((item, i) => (
            <li key={i}>{item.name}</li>
          ))}

        </div>
        </ul>
      {/* )} */}
    </div>
  );
}

export default Rooms;