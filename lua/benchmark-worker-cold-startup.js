
var Module = {
  print: function(x) { Module.printBuffer += x + '\n' },
  printBuffer: ''
};

if (typeof console === 'undefined') console = { log: function(){} };

onmessage = function(event) {
  var msg = event.data;

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'lua.vm.js', false);
  xhr.send(null);
  var src = xhr.responseText.replace('"use asm";', '"use asm";' + '/*' + [0,0,0,0,0,0,0,0,0,0,0,0,0].map(Math.random) + '*/'); // randomize to avoid caching
  if (src === xhr.responseText) throw 'failed to modify src' + typeof xhr.responseText;
  var start = Date.now();
  var out = eval(src);
  var time = Date.now() - start;
  postMessage({
    benchmark: msg.benchmark,
    startup: time,
    output: Module.printBuffer + '|' + out
  });
};

