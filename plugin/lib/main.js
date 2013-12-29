/* jshint moz:true */

var data = require('self').data;
var pageWorkers = require('page-worker');
var tabs = require('tabs');

ws_worker = pageWorkers.Page({
  contentScriptFile: data.url('worker.js'),
  contentURL: data.url('worker.html')
});

ws_worker.on('message', function(data){
  for each(var tab in tabs) {
    if (tab.url.indexOf("play.spotify.com") != -1)
      playPause(tab);
  }
  console.log(data);
});

function playPause(tab){
  tab.attach({
    contentScript:
      "document.getElementById('app-player').contentDocument.getElementById('play-pause').click()"
  });
}

