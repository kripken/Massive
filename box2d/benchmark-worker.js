
var Module = {
  print: function(x) { Module.printBuffer += x + '\n' },
  printBuffer: ''
};

if (typeof console === 'undefined') console = { log: function(){} };

onmessage = function(event) {
  var msg = event.data;

  Module.arguments = msg.args;

  var start = Date.now();
  importScripts('box2d.js');
  var time = Date.now() - start;

  postMessage({
    benchmark: msg.benchmark,
    runtime: time,
    output: Module.printBuffer
  });
};

