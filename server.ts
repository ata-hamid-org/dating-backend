import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import { createMatch } from "./services/matchService";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Connect to MongoDB database
mongoose
  .connect("mongodb://localhost:27017/dating-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Add this option to avoid deprecation warning
mongoose.set("useCreateIndex", true);

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the dating app!");
});

// Socket.io
io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`Socket joined room: ${room}`);
  });

  socket.on("sendMessage", (data) => {
    // Save the message in the database (e.g., MongoDB)
    // Emit the message to the room
    io.to(data.room).emit("newMessage", data.message);
  });

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
