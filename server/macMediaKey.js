var $ = require('NodObjC');

// Import the foundaton framework
$.framework('Foundation');
$.framework('AppKit');

$.import('iokit');

// Setup the recommended NSAutoreleasePool instance
var pool = $.NSAutoreleasePool('alloc')('init');

//extend NSApplication and extend the sendEvent Class
var keyListener = $.NSApplication.extend('keyListener');
keyListener.addMethod('sendEvent:','v@:@', function(self, _cmd, nsevent){
  // if event type and subtype match the media Keys
  // http://weblog.rogueamoeba.com/2007/09/29/
  if (parseInt(nsevent('type')) === parseInt($.NSSystemDefined) &&
  nsevent('subtype') === 8) {
    var keyCode = ((nsevent('data1') & 0xFFFF0000) >> 16 );
    var keyFlags = (nsevent('data1') & 0x0000FFFF);
    var keyState = (((keyFlags & 0xFF00) >> 8)) == 0xA;
    var keyRepeat = (keyFlags & 0x1);
    mediaKeyPress(keyCode, keyState, keyRepeat);
  }
});
keyListener.register();

//create the application and run it
var app = keyListener('sharedApplication');
app('run');

function mediaKeyPress(keyCode, keyState, keyRepeat){
  if (keyCode === $.NX_KEYTYPE_PLAY) {
    if(keyState === true)
      send('KEYTYPE_PLAY');
  } else if (keyCode === $.NX_KEYTYPE_FAST) {
    if(keyState === true)
      send('KEYTYPE_NEXT');
  } else if (keyCode === $.NX_KEYTYPE_REWIND) {
    if(keyState === true)
      send('KEYTYPE_PREV');
  }
}

function send(data){
  process.send(data);
}

