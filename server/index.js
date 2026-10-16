import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { chatSocket } from "./sockets/chatSocket.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Servidor de chat funcionando");
});

// 1. Crear servidor HTTP
const server = http.createServer(app);

// 2. Integrar Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// 3. Conectar lógica de sockets
chatSocket(io);

// 4. Levantar servidor
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
