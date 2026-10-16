export default function Message({ user, text, time }) {
  const isSystem = user === "Sistema";

  return (
    <div
      style={{
        marginBottom: 8,
        fontStyle: isSystem ? "italic" : "normal",
        color: isSystem ? "#888" : "#000",
      }}
    >
      <strong>{user}</strong>{" "}
      <small style={{ color: "#888" }}>{time}</small>
      <p style={{ margin: 0 }}>{text}</p>
    </div>
  );
}