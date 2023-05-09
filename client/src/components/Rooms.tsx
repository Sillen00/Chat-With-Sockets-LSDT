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

  const joinExistingRoom = (room: string) => {
    joinRoom(room);
  };

  return (
    <div>
      {/* CHAT ROOM */}
      <ul
        style={{
          display: 'flex',
          flexDirection: 'column',
          listStyleType: 'none',
          gap: '.5rem',
          margin: '0',
          padding: '0',
          textTransform: 'uppercase',
          color: "white",
        }}
      >
        {/* CREATED ROOMS */}
        {rooms?.map((room, i) => (
          <div>
            <li
              onClick={() => joinExistingRoom(room)}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '1.5rem',
                cursor: 'pointer',
              }}
              key={i}
            >
              {room}
              {/* USERS IN CHAT ROOM */}
            </li>
            <ul
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                listStyleType: 'none',
                gap: '.5rem',
                margin: '0',
                padding: '0',
                textTransform: 'none',
              }}
            >
              <li>User</li>
              <li>User</li>
              <li>User</li>
            </ul>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Rooms;
