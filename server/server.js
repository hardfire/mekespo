var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 54014});

//web sockets broadcast function
wss.broadcast = function(data) {
  console.log('doing a broadcast');
  for(var i in this.clients)
    this.clients[i].send(data);
};

wss.on("connection", function(ws) {
  console.log('incoming connection');
});

//start the nodObjC process
var cp = require('child_process');
var n = cp.fork(__dirname + '/macMediaKey.js');

n.on('message', function(m) {
  wss.broadcast(m);
});
