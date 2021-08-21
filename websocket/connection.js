class Connection {
  static instances;
  static server;

  static init(server) {
    Connection.instances = new Map();
    Connection.server = server;
  }

  constructor(ws) {
    this.ws = ws;
    this.events = new Set();
    Connection.instances.set(ws, this);
  }

  addEvent(event) {
    this.events.add(event);
  }

  dispatch(message, ws) {
    const parsedMessage = JSON.parse(message);
    Connection.server.clients.forEach(client => client.send(message));
  }
}

module.exports = Connection;