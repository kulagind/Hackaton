const WebSocket = require('ws');
const Connection = require('./connection');
const server = require('http').createServer();

const PORT = 8999;

const wsServer = new WebSocket.Server({server});

Connection.init(wsServer);

wsServer.on('connection', ws => {
  const connection = new Connection(ws);

  ws.on('message', m => connection.dispatch(m, ws));

  ws.on("error", e => ws.send(e));
});

wsServer.on('close', ws => {
  connections.delete(ws);
});

server.listen(PORT, _ => {
  console.log(`WebSocket listening on ${PORT}...`);
});

