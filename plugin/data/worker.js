var ws = new WebSocket('ws://localhost:54014');
ws.onmessage = function(ev) {
  self.postMessage(ev.data);
};
