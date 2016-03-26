
if (typeof console === 'undefined') console = { log: function(){} };

var Module = {
  printBuffer: '',
  arguments: ['-scale-to', '512', 'input.pdf']
};

onmessage = function(event) {
  var msg = event.data;

  var source = 'src.cpp.o.js';

  Module.wasmJSMethod = msg.benchmark.indexOf('wasm') < 0 ? 'asmjs' : 'native-wasm';
  console.log('using ' + Module.wasmJSMethod);

  if (msg.args && msg.args.indexOf('startup') >= 0) {
    Module.noInitialRun = true;
  } else {
    // fetch data
    xhr = new XMLHttpRequest();
    xhr.open('GET', 'freeculture.pdf', false);
    xhr.responseType = 'arraybuffer';
    xhr.send(null);
    var data = xhr.response;
    if (!data) throw 'bad data';
    data = new Uint8Array(data);

    // prepare code, add data, and run
    var start = Date.now();
    var pagesLeft = 215;
    var pageTimer = 0, pageTimes = 0, pageTimes2 = 0, pageCounter = 0, pageMax = 0;
    Module.print = function(x) {
      Module.printBuffer += x + '\n';

      var now = Date.now();
      if (pageTimer > 0) {
        var delta = now - pageTimer;
        pageTimes += delta;
        pageTimes2 += Math.pow(delta, 2);
        pageCounter++;
        pageMax = Math.max(pageMax, delta);
      }
      pageTimer = now;

      if (--pagesLeft === 0) {
        var time = Date.now() - start;

        // clear out the top frame from the averages - one of the later pages in this pdf is very slow to render
        pageTimes -= pageMax;
        pageTimes2 -= Math.pow(pageMax, 2);

        postMessage({
          benchmark: msg.benchmark,
          runtime: time,
          average: pageTimes/pageCounter,
          highest: pageMax,
          deviation: Math.sqrt(pageTimes2/pageCounter - Math.pow(pageTimes/pageCounter, 2)),
          //output: Module.printBuffer
        });
      }
      throw 'poppler is done';
    };
    Module.preRun = [function() {
      FS.createDataFile('/', 'input.pdf', data, true, false);
    }];
  }

  var startup = Date.now();
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
  startup = Date.now() - startup;

  if (msg.args && msg.args.indexOf('startup') >= 0) {
    postMessage({
      benchmark: msg.benchmark,
      startup: startup,
    });
  }
};

