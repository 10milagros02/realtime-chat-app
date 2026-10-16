import { useEffect, useState } from "react";
import { socket } from "../services/socket";
import ChatBox from "../components/ChatBox";
import UsersList from "../components/UsersList";

export default function Chat() {
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleJoin = () => {
    if (username.trim()) {
      socket.emit("join", username);
      setJoined(true);
    }
  };

  if (!joined) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Ingresa tu nombre</h2>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Tu nombre..."
          onKeyDown={(e) => e.key === "Enter" && handleJoin()}
          style={{ padding: 6, marginRight: 8 }}
        />
        <button onClick={handleJoin} style={{ padding: 6 }}>
          Entrar al chat
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", gap: 20, padding: 20 }}>
      <ChatBox username={username} />
      <UsersList />
    </div>
  );
}