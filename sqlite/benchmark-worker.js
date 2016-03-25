
var Module = {
  print: function(x) { Module.printBuffer += x + '\n' },
  printBuffer: ''
};

if (typeof console === 'undefined') console = { log: function(){} };

onmessage = function(event) {
  var msg = event.data;

  var source = 'sqlite.js';

  Module.wasmJSMethod = msg.benchmark.indexOf('wasm') < 0 ? 'asmjs' : 'native-wasm';
  console.log('using ' + Module.wasmJSMethod);

  function calcTime() {
    var m = /TOTAL[\. ]+([\d\.]+)s/.exec(Module.printBuffer) || [];
    m = m.map(parseFloat);
    if (!m || !m[1]) console.log('ERROR: invalid output: ' + Module.printBuffer);
    return parseFloat(m[1]);
  }

  if (msg.args.indexOf('startup') >= 0) {
    Module.arguments = ['--size', '0'];
  } else {
    Module.arguments = msg.args;
  }

  console.log('run sqlite with ' + Module.arguments);

  var start = Date.now();
  if (Module.wasmJSMethod === 'asmjs') {
    importScripts(source.replace('.js', '.asm.js'));
  } else {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', source.replace('.js', '.wasm'), false);
    xhr.responseType = 'arraybuffer';
    xhr.send(null);
    Module.wasmBinary = xhr.response;
  }
  importScripts(source);
  var time = Date.now() - start;

  postMessage({
    benchmark: msg.benchmark,
    runtime: time,
    calcTime: calcTime()
  });
};

