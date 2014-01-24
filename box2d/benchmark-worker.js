
var Module = {
  print: function(x) { Module.printBuffer += x + '\n' },
  printBuffer: '',
  arguments: ['3']
};

if (typeof console === 'undefined') console = { log: function(){} };

var start = Date.now();
importScripts('box2d.js');
var time = Date.now() - start;

onmessage = function(event) {
  var msg = event.data;

  postMessage({
    benchmark: msg.benchmark,
    runtime: time,
    output: Module.printBuffer
  });
};

