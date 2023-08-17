// pages/api/sse.js
export default (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  // You can send updates using res.write
  res.write('data: update\n\n');
  // You need to keep the connection open or set up a way to close it properly
  res.on('close', () => {
    res.end();
  });
};
