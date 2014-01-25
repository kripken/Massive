
var Module = {
  print: function(x) { Module.printBuffer += x + '\n' },
  printBuffer: ''
};

if (typeof console === 'undefined') console = { log: function(){} };

onmessage = function(event) {
  var msg = event.data;

  if (msg.args === 'cold') {
    Module.arguments = ['0'];
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'box2d.js', false);
    xhr.send(null);
    var src = xhr.responseText.replace('"use asm";', '"use asm";' + '/*' + [0,0,0,0,0,0,0,0,0,0,0,0,0].map(Math.random) + '*/'); // randomize to avoid caching
    if (src === xhr.responseText) throw 'failed to modify src' + typeof xhr.responseText;
    var start = Date.now();
    var out = eval(src);
    var time = Date.now() - start;
    postMessage({
      benchmark: msg.benchmark,
      runtime: time,
      output: Module.printBuffer + '|' + out
    });
    return;
  }

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

