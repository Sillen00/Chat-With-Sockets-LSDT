import { useSocket } from '../context/SocketContext';

function Rooms() {
  const { rooms, joinRoom, roomUsers, room } = useSocket();

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
          color: 'white',
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
              {roomUsers[room]?.map((user, i) => (
                <li key={i}>{user}</li>
              ))}
            </ul>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Rooms;
