function stickyWebSocket(url, protocols) {
  // http://dthain.blogspot.nl/2009/02/exponential-backoff-in-distributed.html
  // using an exponential backoff algorithm to try to reconnect to the server
  this.debug = false;
  this.timeout = 10;
  this.fixedDelay = 2; // f - this is a random name, might be totally wrong too
  this.retries = 0;
  this.maxDelay = 30000;
  this.onopen = function(e){};
  this.onclose = function(e){};
  this.onconnecting = function(e){};
  this.onerror = function(e){};

  var closed = false;
  var ws;
  var timeout;
  var sws = this;

  this.send = function(data) {
    logDebug("SWS - sending data");
    return sws.send(data);
  };

  this.close = function(){
    logDebug("SWS - closing, tata bye bye!");
    closed = true;
    ws.close();
  }

  function logDebug(message){
    if(sws.debug)
      console.log(message);
  };

  function getDelay(){
    var r = (Math.random()*2); // random number 1-2
    var delay = r*sws.t*Math.pow(sws.f,sws.n);
    sws.n++;
    if(delay > sws.m)
      return sws.m;
    return delay
  };

  function init(){
    logDebug("SWS - attempting to connect");
    ws = new WebSocket(url, protocols);

    ws.onopen = function(e){
      logDebug("SWS - connected yay!");
      clearTimeout(timeout);
      sws.retries = 0;
      sws.onopen(e);
    };

    ws.onclose = function(e){
      logDebug("SWS - connection closed");
      clearTimeout(timeout);

      // do this only if it was not manually closed
      if(!closed){
        var delay = getDelay();
        logDebug("SWS - trying to reconnect in "+ delay);
        timeout = setTimeout(function(){
          init();
        }, delay);
      }
      sws.onclose(e);
    };

    ws.onmessage = function(e){
      logDebug("SWS - got a message");
      sws.onmessage(e);
    };

    ws.onerror = function(e){
      logDebug("SWS - whoopsie error");
      sws.onerror(e);
    }
  };
  init();
};

var ws = new stickyWebSocket('ws://localhost:54014');

ws.onmessage = function(ev) {
  self.postMessage(ev.data);
};
