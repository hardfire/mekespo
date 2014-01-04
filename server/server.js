var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 54014, host:'127.0.0.1'});

//web sockets broadcast function
wss.broadcast = function(data) {
  console.log('doing a broadcast');
  for(var i in this.clients)
    this.clients[i].send(data);
};

wss.on("connection", function(ws) {
  console.log('incoming connection');
});

var platform = null;

//run the listening process depending on the host machine
if(process.platform === 'darwin')
  platform = 'mac'; // mac starts a ObjC Process
else if(process.platform === 'linux')
  platform = 'linux' // linux starts a X11 Process

//start the nodObjC process
var cp = require('child_process');
var n = cp.fork(__dirname + '/' + platform+'MediaKey.js');

n.on('message', function(m) {
  wss.broadcast(m);
});
