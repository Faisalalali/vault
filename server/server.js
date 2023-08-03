// server/server.js
import express from 'express';
import http from 'http';
import { initializeSocketIO } from '@/utils/socketManager';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;

// Start the Express server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Initialize Socket.IO and pass the server to the socket manager
initializeSocketIO(server);
