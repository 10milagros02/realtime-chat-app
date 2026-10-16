// Usuarios en memoria
let users = []; // { id, username }

export const chatSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`🔌 Conectado: ${socket.id}`);

    // Evento: unirse al chat
    socket.on("join", (username) => {
      if (!users.find((u) => u.id === socket.id)) {
        users.push({ id: socket.id, username });
      }
      io.emit("users_list", users);
      io.emit("receive_message", {
        user: "Sistema",
        text: `${username} se ha unido al chat`,
        time: new Date().toLocaleTimeString(),
      });
    });

    // Evento: enviar mensaje
    socket.on("send_message", (data) => {
      io.emit("receive_message", data);
    });

    // Evento: desconexión
    socket.on("disconnect", () => {
      const user = users.find((u) => u.id === socket.id);
      users = users.filter((u) => u.id !== socket.id);
      io.emit("users_list", users);

      if (user) {
        io.emit("receive_message", {
          user: "Sistema",
          text: `${user.username} salió del chat`,
          time: new Date().toLocaleTimeString(),
        });
      }
      console.log(`❌ Desconectado: ${socket.id}`);
    });
  });
};