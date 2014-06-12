
var Module = {
  print: function(x) { Module.printBuffer += x + '\n' },
  printBuffer: ''
};

if (typeof console === 'undefined') console = { log: function(){} };

onmessage = function(event) {
  var msg = event.data;

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

  if (msg.args.indexOf('cold') >= 0) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'sqlite.js', false);
    xhr.send(null);
    var src = xhr.responseText.replace('"use asm";', '"use asm";' + '/*' + [0,0,0,0,0,0,0,0,0,0,0,0,0].map(Math.random) + '*/'); // randomize to avoid caching
    if (src === xhr.responseText) throw 'failed to modify src' + typeof xhr.responseText;
    var start = Date.now();
    console.log('run sqlite with ' + Module.arguments);
    var out = eval('var Module = { arguments: ' + JSON.stringify(Module.arguments) + ' };\n' + src);
    var time = Date.now() - start;

    postMessage({
      benchmark: msg.benchmark,
      runtime: time,
      calcTime: calcTime()
    });
    return;
  }

  console.log('run sqlite with ' + Module.arguments);

  var start = Date.now();
  importScripts('sqlite.js');
  var time = Date.now() - start;

  postMessage({
    benchmark: msg.benchmark,
    runtime: time,
    calcTime: calcTime()
  });
};

