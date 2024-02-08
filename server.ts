import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Updated MongoDB connection for version 8
const mongoDBUri = "mongodb://localhost:27017/dating-app";
mongoose
  .connect(mongoDBUri)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the dating app!");
});

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);
  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`Socket joined room: ${room}`);
  });
  socket.on("sendMessage", (data) => {
    io.to(data.room).emit("newMessage", data.message);
  });
  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
