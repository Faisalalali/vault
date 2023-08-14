// lib/socket.js
const { Server } = require('socket.io');
const dbConnect = require('./dbConnect');

let io;

async function initializeSocket(server) {
  if (io) {
    return io;
  }

  const db = await dbConnect();
  io = new Server(server);

  // watch for changes in all collections
  const changeStream = db.watch();

  changeStream.on('change', (change) => {
    io.emit('databaseChange', change);
  });

  return io;
}

module.exports = {
  initializeSocket,
};