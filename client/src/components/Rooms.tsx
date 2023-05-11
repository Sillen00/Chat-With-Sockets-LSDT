import { useSocket } from '../context/SocketContext';

// Detta skall vara en lista på alla rum som finns
// const allRooms = [
//   {
//     name: 'Room1',
//   },
//   {
//     name: 'Room2',
//   },
// ];

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
          <>
            <li
              key={i}
              onClick={() => joinExistingRoom(room.name)}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '1.5rem',
                cursor: 'pointer',
              }}
            >
              {room.name}
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
              {room.users.map(user => <li>{user.name}</li>)}
            </ul>
          </>
        ))}
      </ul>
    </div>
  );
}

export default Rooms;
