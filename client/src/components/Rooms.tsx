import { useSocket } from '../context/SocketContext';

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
  const { rooms, joinRoom } = useSocket();

  // const [showList, setShowList] = useState(false);

  // const handleButtonClick = () => {
  //   setShowList(!showList);
  // };

  const joinExistingRoom = (room: string) => {
    joinRoom(room);
  };

  return (
    <div>
      <ul
        style={{
          display: 'flex',
          flexDirection: 'row',
          listStyleType: 'none',
          gap: '1rem',
        }}
      >
        {rooms?.map((room, i) => (
          <li
            onClick={() => joinExistingRoom(room)}
            style={{ border: '1px solid green', padding: '0.5rem' }}
            key={i}
          >
            {room}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Rooms;
