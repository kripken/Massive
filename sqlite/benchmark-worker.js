
var Module = {
  print: function(x) { Module.printBuffer += x + '\n' },
  printBuffer: ''
};

if (typeof console === 'undefined') console = { log: function(){} };

onmessage = function(event) {
  var msg = event.data;

  function calcTime() {
    var m = /create table : took (\d+) ms\n\d+,\d+ inserts : took (\d+) ms\ncommit : took (\d+) ms\ncount\(\*\) = \d+\n\ncount\(\*\) = \d+\n\ncount\(\*\) = \d+\n\ncount\(\*\) = \d+\n\nselects : took (\d+) ms\ncreate indexes : took (\d+) ms\ncount\(\*\) = \d+\n\ncount\(\*\) = \d+\n\nselects with indexes : took (\d+) ms/.exec(Module.printBuffer) || [];
    m = m.map(parseFloat);
    return (m[1]+m[2]+m[3]+m[4]+m[5]+m[6])/1000;
  }

  if (msg.args.indexOf('startup') >= 0) {
    Module.arguments = ['0', '0'];
  }

  if (msg.args.indexOf('cold') >= 0) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'sqlite.js', false);
    xhr.send(null);
    var src = xhr.responseText.replace('"use asm";', '"use asm";' + '/*' + [0,0,0,0,0,0,0,0,0,0,0,0,0].map(Math.random) + '*/'); // randomize to avoid caching
    if (src === xhr.responseText) throw 'failed to modify src' + typeof xhr.responseText;
    var start = Date.now();
    var out = eval(src);
    var time = Date.now() - start;

    postMessage({
      benchmark: msg.benchmark,
      runtime: time,
      calcTime: calcTime()
    });
    return;
  }

  Module.arguments = msg.args;

  var start = Date.now();
  importScripts('sqlite.js');
  var time = Date.now() - start;

  postMessage({
    benchmark: msg.benchmark,
    runtime: time,
    calcTime: calcTime()
  });
};

