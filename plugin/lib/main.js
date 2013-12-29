/* jshint moz:true */

var data = require('self').data;
var pageWorkers = require('page-worker');
var tabs = require('tabs');

var supported_options = [
  'KEYTYPE_PLAY',
  'KEYTYPE_NEXT',
  'KEYTYPE_PREV'
];

ws_worker = pageWorkers.Page({
  contentScriptFile: data.url('worker.js'),
  contentURL: data.url('worker.html')
});

ws_worker.on('message', function(data){
  //option is not supported
  if(supported_options.indexOf(data) === -1)
    return;

  for each(var tab in tabs) {
    if (tab.url.indexOf("play.spotify.com") != -1)
      spotify[data](tab);
  }
  console.log(data);
});

var spotify =  {
  KEYTYPE_PLAY: function(tab) {
    tab.attach({
      contentScript:
      "document.getElementById('app-player').contentDocument.getElementById('play-pause').click()"
    });
  },
  KEYTYPE_NEXT: function(tab) {
    tab.attach({
      contentScript:
      "document.getElementById('app-player').contentDocument.getElementById('next').click()"
    });
  },
  KEYTYPE_PREV: function(tab) {
    tab.attach({
      contentScript:
      "document.getElementById('app-player').contentDocument.getElementById('previous').click()"
    });
  }
};

