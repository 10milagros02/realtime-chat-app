import { useEffect, useState } from "react";
import { socket } from "../services/socket";

export default function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const handler = (data) => setUsers(data);
    socket.on("users_list", handler);
    return () => socket.off("users_list", handler);
  }, []);

  return (
    <div style={{ width: 200, border: "1px solid #ccc", padding: 10, borderRadius: 8 }}>
      <h3>👥 Usuarios ({users.length})</h3>
      <ul style={{ paddingLeft: 18 }}>
        {users.map((u) => (
          <li key={u.id}>{u.username}</li>
        ))}
      </ul>
    </div>
  );
}