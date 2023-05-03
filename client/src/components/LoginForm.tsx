import { useSocket } from "../context/SocketContext";
import { useState } from "react";

interface User {
  username: string;
}

export function LoginForm() {
  const [username, setUsername] = useState("");
  const { socket } = useSocket();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === "") {
      return;
    }
    const user: User = { username };
    socket.emit("join", user);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <button type="submit">Join Chat</button>
    </form>
  );
}
