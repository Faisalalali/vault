// server/server.js
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const next = require('next');
const cors = require('cors');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Custom server setup
const expressApp = express();
expressApp.use(cors());
const httpServer = createServer(expressApp);

// Import the socket initialization function
const { initializeSocket } = require('../lib/socket');

// Socket.io connection and event handling
initializeSocket(httpServer); // Call the function to set up the socket

// Handle all Next.js requests
app.prepare().then(() => {
  expressApp.all('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
