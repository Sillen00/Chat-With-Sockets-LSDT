import { useState } from 'react';
import { useSocket } from '../context/SocketContext';


function DirectMessage() {
  const [showList, setShowList] = useState(false);
  const { allUsers } = useSocket();


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
