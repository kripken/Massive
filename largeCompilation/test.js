
function makeModule(target) {
  var SILLY = 'x = x + 1 | 0; x = x - 1 | 0; ';
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
  console.log('finishing with ' + mb);
  postMessage({
    benchmark: 'large-compilation',
    mb: mb,
  });
}

function tryAllocations() {
  var CHUNK = 50*1024*1024;
  var size = CHUNK;
  var curr, last;
  while (1) {
    last = curr;
    try {
      console.log('try ' + size);
      curr = new Uint8Array(size);
      console.log('    ok');
      curr[Math.random()*curr.length | 0] = 1;
    } catch(e) {
      return last;
    }
    size += CHUNK;
  }
  console.log('stop tryAllocations due to limit');
  return curr;
}

function test() {
  var size = 5*1024*1024;
  var code = makeModule(size);
  var blob = new Blob([code], { type: 'text/javascript' });
  var src = URL.createObjectURL(blob);
  console.log('trying');
  try {
    importScripts(src);
  } catch(e) {
    finish(-2);
  } finally {
    URL.revokeObjectURL(src);
  }
  console.log('imported');
  var name = 'module_' + size;
  var linked = eval(name + '(this, {}, new ArrayBuffer(1024*1024))');
  console.log('linked');
  if (linked.export(17) !== 18) finish(-1); // bad output
  console.log('verified');
  // we succeeded in building a large asm.js application, now let's see how much memory we can allocate
  var biggest = tryAllocations();
  finish(biggest ? biggest.length/(1024*1024) : 0);
}

function testStandalone(size) {
  var code = makeModule(size);
  var blob = new Blob([code], { type: 'text/javascript' });
  var src = URL.createObjectURL(blob);
  console.log('trying');
  var script = document.createElement('script');
  script.onload = function() {
    console.log('imported');
    var name = 'module_' + size;
    var linked = eval(name + '(this, {}, new ArrayBuffer(1024*1024))');
    console.log('linked');
    if (linked.export(17) !== 18) finish(-1); // bad output
    console.log('verified');
    URL.revokeObjectURL(src);
  }
  script.src = src;
  document.body.appendChild(script);
}

onmessage = function(event) {
  var msg = event.data;
  test();
};

