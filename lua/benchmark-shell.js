
var Module = {
  printBuffer: '',
  print: function(x) {
    Module.printBuffer += x + '\n';
  }
};

var pre = Date.now();

var Module = { print: function(x) { Module.printBuffer += x + '\n' }, printBuffer: '' };
var console = { log: function(){} };

var startup = Date.now();
load('lua.vm.js');
startup = Date.now() - startup;

function doIt(code) {
  var start = Date.now();
  L.execute(code);
  print(['runtime:', Date.now() - start, '  startup:', startup]);
}

doIt(read('binarytrees.lua'));

