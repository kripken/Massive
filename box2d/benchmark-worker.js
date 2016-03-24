
var Module = {
  print: function(x) { Module.printBuffer += x + '\n' },
  printBuffer: ''
};

if (typeof console === 'undefined') console = { log: function(){} };

onmessage = function(event) {
  var msg = event.data;

  function respond(output) {
    // output format is:         frame averages: 31.675 +- 7.808, range: 22.000 to 63.000
    var m = /frame averages: (\d+\.\d+) \+- (\d+\.\d+), range: (\d+\.\d+) to (\d+\.\d+)/.exec(output);
    m = m || []; // for just startup
    postMessage({
      benchmark: msg.benchmark,
      runtime: time,
      average: parseFloat(m[1]),
      variance: parseFloat(m[2]),
      lowest: parseFloat(m[3]),
      highest: parseFloat(m[4])
    });
  }

  var source = msg.benchmark.indexOf('f32') < 0 ? 'box2d.js' : 'f32_box2d.js';
  var asmjs = source.replace('.js', '.asm.js')

  Module.wasmJSMethod = 'asmjs';

  if (msg.args === 'cold') {
    Module.arguments = ['0'];
    var xhr = new XMLHttpRequest();
    xhr.open('GET', source, false);
    xhr.send(null);
    var src = xhr.responseText;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', asmjs, false);
    xhr.send(null);
    var src = xhr.responseText + '\n' + src; // asm.js and then the rest of the code
    src = src.replace('"use asm";', '"use asm";' + '/*' + [0,0,0,0,0,0,0,0,0,0,0,0,0].map(Math.random) + '*/'); // randomize to avoid caching
    src = src.replace("'use asm';'", "'use asm';" + '/*' + [0,0,0,0,0,0,0,0,0,0,0,0,0].map(Math.random) + '*/'); // randomize to avoid caching
    if (src === xhr.responseText) throw 'failed to modify src' + typeof xhr.responseText;
    var start = Date.now();
    var out = eval(src);
    var time = Date.now() - start;
    respond(Module.printBuffer + '|' + out);
    return;
  }

  Module.arguments = msg.args;

  var start = Date.now();
  importScripts(asmjs);
  importScripts(source);
  var time = Date.now() - start;

  respond(Module.printBuffer);
};

