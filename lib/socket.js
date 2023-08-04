// lib/socket.js
const { Server } = require('socket.io');
const { connectToDatabase } = require('./mongodb');

let io;

async function initializeSocket(server) {
  if (io) {
    return io;
  }

  const { client, db } = await connectToDatabase();
  io = new Server(server);

  const changeStream = db.collection('collections').watch();

  changeStream.on('change', (change) => {
    const updatedDocument = change.fullDocument;
    io.emit('databaseChange', change);
  });

  return io;
}

module.exports = {
  initializeSocket,
};