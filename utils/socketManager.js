// utils/socketManager.js
import { Server } from "socket.io";

let ioInstance = null;

const initializeSocketIO = (server) => {
  // If an instance of io already exists, return it instead of creating a new one
  if (ioInstance) {
    return ioInstance;
  }

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // Change this to your frontend's address
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("collectionsUpdate", async ({ data }) => {
      console.log("collectionsUpdate event received");
      io.emit("collectionsUpdate", { data });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  ioInstance = io; // Store the instance for future calls
  return io;
};

export default { initializeSocketIO };
