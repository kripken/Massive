
var CHUNK = 25*1024*1024;

var SILLY = 'x = x + 1 | 0; x = x - 1 | 0; ';

function makeModule(target) {
  var silly = SILLY;
  while (silly.length < target/1000) silly = silly + silly;
  var parts = ['function module_' + target + '(stdlib, foreign, heap) { "use asm"; var g_i = 0;'];
  var size = 0, index = 0;
  while (size < target) {
    var curr;
    if (index === 0) {
      curr = 'function f0(x) { x = x | 0; return x + 1 | 0; }';
    } else {
      curr = 'function f' + index + '(x) { x = x | 0; x = x ? x : ' + Math.floor(Math.random()*100) + '; ' + silly + ' return f' + (index-1) + '(x | 0) | 0; }';
    }
    last = 'f' + index;
    index++;
    size += curr.length;
    parts.push(curr);
  }
  parts.push('return { export: ' + last + ' } }');
  return parts.join('\n');
}

function finish(mb) {
  postMessage({
    benchmark: 'large-compilation',
    mb: mb,
  });
}

function measureFreeMemory() {
  var size = 1024*1024;
  while (1) {
    try {
      curr = new Uint8Array(size);
      curr[Math.random()*curr.length | 0] = 1;
    } catch(e) {
      return size/2 + (curr ? curr[Math.random()*curr.length | 0] : 0);
    }
    curr = null;
    size = size*2;
  }
/*
  var pieces = [];
  function finish() {
    return size * pieces.length + pieces[Math.random()*pieces.length | 0][Math.random()*size | 0];
  }
  while (1) {
    try {
      var piece = new Uint8Array(size);
      if (!piece) return finish();
      pieces.push(piece);
      piece[Math.random()*size | 0] = 1;
      console.log('pieces: ' + [pieces.length, pieces[pieces.length-1].length]);
    } catch(e) {
      return finish();
    }
  }
  return finish();
*/
}

function grabMemory(amount) {
  var chunk = 200*1024*1024;
  var ret = [];
  var total = 0;
  while (amount > 0) {
    var curr = new Uint8Array(Math.min(chunk, amount));
    curr[Math.random()*curr.length | 0] = 1;
    ret.push(curr);
    amount -= chunk;
    total += curr.length;
  }
  console.log('grabbed ' + [ret.length, total]);
  return ret;
}

function test(size) {
  var code = makeModule(size);
  var blob = new Blob([code], { type: 'text/javascript' });
  var src = URL.createObjectURL(blob);
  console.log('trying ' + (size/(1024*1024)).toFixed(2));
  var before = measureFreeMemory();
  var GRAB = grabMemory(before*0.75);
  console.log('before: ' + before);
  try {
    importScripts(src);
  } catch(e) {
    finish(size);
  } finally {
    URL.revokeObjectURL(src);
  }
  console.log('imported');
  var middle = measureFreeMemory();
  console.log('middle: ' + middle);
  // success, test the module
  var name = 'module_' + size;
  var linked = eval(name + '(this, {}, new ArrayBuffer(1024*1024))');
  console.log('linked');
  var after = measureFreeMemory();
  console.log('after: ' + after);
  // we should verify, but it crashes chrome XXX if (linked.export(17) !== 18) finish(-1); // bad output
  eval(name + ' = null');
  code = blob = src = name = linked = null; // hold on to nothing
  GRAB.length = 0;
  GRAB = null;
  console.log('reset');
  setTimeout(function() {
    test(size + CHUNK);
  }, 1); // delaying even 1ms is enough to allow compilation memory to be reclaimed
}

onmessage = function(event) {
  var msg = event.data;
  test(CHUNK);
};

