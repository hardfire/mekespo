var x11 = require('x11');
var keyMap = {
  171 : 'KEYTYPE_PREV',
  172 : 'KEYTYPE_PLAY',
  173 : 'KEYTYPE_NEXT'
};

x11.createClient(function(err, display) {
  if (!err) {
    var X = display.client;
    var root = display.screen[0].root;
    var wid = X.AllocID();

    // XXX Revert to using keySymToKeyCode
    // too lazy to not hard code the key codes
    X.GrabKey(root, true, false, 171, false, true); // prev
    X.GrabKey(root, true, false, 172, false, true); // play
    X.GrabKey(root, true, false, 173, false, true); // next

    // This is the mother of god keyboard grabber
    // locks the whole system
    //X.GrabKeyboard(root, false, false, true, true);

    X.on('event', function(ev) {
      if(ev.name === 'KeyRelease')
      {
        send(keyMap[ev.keycode]);
      }
    });
    X.on('error', function(e) {
      console.error(e);
    });
  } else {
    console.error(err);
  }
});

function send(data){
  process.send(data);
  //console.log(data);
}
