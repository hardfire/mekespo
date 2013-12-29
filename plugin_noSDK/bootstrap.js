/* jshint moz:true */
// basic app structure taken from https://github.com/Mardak/restartless/tree/watchWindows

const {classes: Cc, interfaces: Ci, utils: Cu} = Components;
Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/AddonManager.jsm");

let wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
.getService(Components.interfaces.nsIWindowMediator);

// yay, console.log
const consoleJSM = Cu.import("resource://gre/modules/devtools/Console.jsm", {});
let console = consoleJSM.console; //access exported symbol of "console" from the Console.jsm
const global = this;
let webSocketTried = 0;


/**
* Handle the add-on being activated on install/enable
*/
//https://github.com/mozilla/prospector/blob/master/findSuggest/bootstrap.js
function startup() {
  //var websocket = Cc["@mozilla.org/network/protocol;1?name=wss"]
                         //.createInstance(Ci.nsIWebSocketChannel);
  //websocket.asyncOpen("http://localhost:54014", "mekeso.avinash.me", {}, null);
  var timer = Components.classes["@mozilla.org/timer;1"]
                        .createInstance(Components.interfaces.nsITimer);
  timer.initWithCallback(bootstrapWindow, 1000, Components.interfaces.nsITimer.TYPE_ONE_SHOT);
  //watchWindows(spotKeys);
  //play pause element action
  // -> document.getElementById('app-player').contentDocument.getElementById('play-pause').click();
}


function shutdown() {}
function install() {}
function uninstall() {}

function bootstrapWindow(){
  console.log('bootstraping');
  var window = wm.getMostRecentWindow("navigator:browser");
  if ( window && window.document.readyState == "complete")
      listenToWS(window);
  window.addEventListener("load", function runOnce() {
    window.removeEventListener("load", runOnce, false);
    listenToWS(window);
  }, false);
}

function listenToWS(window) {
  var WebSocket = window.gBrowser.contentWindow.WebSocket;
  var exampleSocket = new WebSocket("ws://127.0.0.1:54014");
  exampleSocket.onopen = function() {
    console.log('webSocket Connected');
  };
  exampleSocket.onmessage = function(event) {
    console.log(event.data);
    handleKey(event.data);
  };
  exampleSocket.onerror = function() {
    console.log("websocket error");
  };
  exampleSocket.onclose = function() {
    webSocketTried++;
    console.log("websocket closed");
    //maybe because websocket is not ready, try again, with exponential waiting
    var timer = Components.classes["@mozilla.org/timer;1"]
                .createInstance(Components.interfaces.nsITimer);
    timer.initWithCallback(bootstrapWindow, 10^webSocketTried * 100, Components.interfaces.nsITimer.TYPE_ONE_SHOT);
  };
}

function handleKey(key){
  if(key === "KEYTYPE_PLAY") {
    playPauseSpotify(
      getFirstSpotifyTab()
    );
  }
}

function playPauseSpotify(tab){
  console.log(tab);
  if(tab){
    tab.contentDocument.getElementById('app-player').contentDocument.getElementById('play-pause').click();
  }
}

function spotKeys(window){
  //http://stackoverflow.com/questions/18747267/
  function onkeydown(e) {
    if(e.keyCode == 80) {
      playPauseSpotify(
        getFirstSpotifyTab()
      );
    }
  }
  // Bootstrapped add-ons need to clean up after themselves!
  function onunload() {
    window.removeEventListener("keydown", onkeypress);
  }
  window.addEventListener("keydown", onkeydown);
  unload(onunload, window);
}

function getFirstSpotifyTab() {
  //get all open browser windows
  let windows = wm.getEnumerator("navigator:browser");
  while (windows.hasMoreElements()) {

    let window = windows.getNext();

    //get all tabs in a window
    let tabs = window.gBrowser.browsers.length;

    for(var i=0; i<tabs; i++) {
      let tab = window.gBrowser.getBrowserAtIndex(i);
      if (tab.currentURI.spec.indexOf("play.spotify.com") != -1) {
        return tab;
      }
    }

    return null;
  }
}
