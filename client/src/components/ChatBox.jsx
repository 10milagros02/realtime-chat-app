import { useEffect, useState } from "react";
import { socket } from "../services/socket";
import Message from "./Message";

export default function ChatBox({ username }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const handler = (data) => setMessages((prev) => [...prev, data]);
    socket.on("receive_message", handler);
    return () => socket.off("receive_message", handler);
  }, []);

  const sendMessage = () => {
    if (!text.trim()) return;

    socket.emit("send_message", {
      user: username,
      text,
      time: new Date().toLocaleTimeString(),
    });
    setText("");
  };

  return (
    <div style={{ flex: 1, border: "1px solid #ccc", padding: 10, borderRadius: 8 }}>
      <h3>💬 Chat</h3>

      <div
        style={{
          height: 300,
          overflowY: "auto",
          marginBottom: 10,
          padding: 8,
          background: "#fafafa",
        }}
      >
        {messages.map((m, i) => (
          <Message key={i} {...m} />
        ))}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Escribe un mensaje..."
        style={{ width: "80%", padding: 6 }}
      />
      <button onClick={sendMessage} style={{ marginLeft: 8, padding: 6 }}>
        Enviar
      </button>
    </div>
  );
}