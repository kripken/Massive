
var Module = {
  print: function(x) { Module.printBuffer += x + '\n' },
  printBuffer: ''
};

if (typeof console === 'undefined') console = { log: function(){} };

onmessage = function(event) {
  var msg = event.data;

  function respond(output, time) {
    postMessage({
      benchmark: msg.benchmark,
      runtime: time,
      output: Module.printBuffer
    });
  }

  var source = 'lua_binarytrees.js';
  var asmjs = source.replace('.js', '.asm.js');

  Module.wasmJSMethod = msg.benchmark.indexOf('wasm') < 0 ? 'asmjs' : 'native-wasm';
  console.log('using ' + Module.wasmJSMethod);

  Module.arguments = msg.args;

  var start = Date.now();
  if (Module.wasmJSMethod === 'asmjs') {
    importScripts(asmjs);
  } else {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', source.replace('.js', '.wasm'), false);
    xhr.responseType = 'arraybuffer';
    xhr.send(null);
    Module.wasmBinary = xhr.response;
  }
  importScripts(source);
  respond(Module.printBuffer, Date.now() - start);
};

