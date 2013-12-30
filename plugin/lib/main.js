/* jshint moz:true */

var data = require('self').data;
var pageWorkers = require('page-worker');
var tabs = require('tabs');
var self = require("sdk/self");

// options that we suppport
var supported_options = [
  'KEYTYPE_PLAY',
  'KEYTYPE_NEXT',
  'KEYTYPE_PREV'
];

// vendors we support and the url pattern to match
var supported_vendors = [
  { name : 'spotify',
    url  : 'play.spotify.com' },
  { name : 'saavn',
    url  : 'saavn.com/play' }
];

// start the worker that connects to the ws server
ws_worker = pageWorkers.Page({
  contentScriptFile: data.url('worker.js'),
  contentURL: data.url('worker.html')
});

// if a media button has been pressed
ws_worker.on('message', function(data){
  // check if option is not supported
  if(supported_options.indexOf(data) === -1)
    return;

  var foundVendor = false;
  // loop through all the tabs
  for each(var tab in tabs) {
    // loop through each vendor and see if the url matches
    for each(var vendor in supported_vendors){

      if(tab.url.indexOf(vendor.url) != -1) {
        // found a match
        // call the right script to inject into the file
        var scriptPath = 'vendor-scripts/'+vendor.name+'/'+data.toLowerCase()+'.js';
        tab.attach({
          contentScriptFile: self.data.url(scriptPath)
        });
        foundVendor = true;
        break;
      }

    } // vendor loop

    if(foundVendor)
      break;
  } // tabs loop

  // looks like no vendor was open, damn! you dont like music
  if(!foundVendor) {
    //console.log('Couldnot find the right vendor site');
  }

});
