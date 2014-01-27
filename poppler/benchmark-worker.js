
if (typeof console === 'undefined') console = { log: function(){} };

onmessage = function(event) {
  var msg = event.data;

  var Module = {
    printBuffer: '',
    arguments: ['-scale-to', '512', 'input.pdf']
  };

  // fetch source code
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'poppler.js', false);
  xhr.send(null);
  var src = xhr.responseText.replace('"use asm";', '"use asm";' + '/*' + [0,0,0,0,0,0,0,0,0,0,0,0,0].map(Math.random) + '*/'); // randomize to avoid caching
  if (src === xhr.responseText) throw 'failed to modify src' + typeof xhr.responseText;

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
  var pagesLeft = 125;
  Module.print = function(x) {
    Module.printBuffer += x + '\n';
    if (--pagesLeft === 0) {
      var time = Date.now() - start;
      postMessage({
        benchmark: msg.benchmark,
        runtime: time,
        //output: Module.printBuffer
      });
    }
    throw 'poppler is done';
  };
  Module.preRun = [function() {
    FS.createDataFile('/', 'input.pdf', data, true, false);
  }];
  eval(src);
};

