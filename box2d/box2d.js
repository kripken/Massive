// Note: For maximum-speed code, see "Optimizing Code" on the Emscripten wiki, https://github.com/kripken/emscripten/wiki/Optimizing-Code
// Note: Some Emscripten settings may limit the speed of the generated code.
// The Module object: Our interface to the outside world. We import
// and export values on it, and do the work to get that through
// closure compiler if necessary. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(Module) { ..generated code.. }
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to do an eval in order to handle the closure compiler
// case, where this code here is minified but Module was defined
// elsewhere (e.g. case 4 above). We also need to check if Module
// already exists (e.g. case 3 above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module;
if (!Module) Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');

// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = {};
for (var key in Module) {
  if (Module.hasOwnProperty(key)) {
    moduleOverrides[key] = Module[key];
  }
}

// The environment setup code below is customized to use Module.
// *** Environment setup code ***
var ENVIRONMENT_IS_NODE = typeof process === 'object' && typeof require === 'function';
var ENVIRONMENT_IS_WEB = typeof window === 'object';
var ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

if (ENVIRONMENT_IS_NODE) {
  // Expose functionality in the same simple way that the shells work
  // Note that we pollute the global namespace here, otherwise we break in node
  if (!Module['print']) Module['print'] = function print(x) {
    process['stdout'].write(x + '\n');
  };
  if (!Module['printErr']) Module['printErr'] = function printErr(x) {
    process['stderr'].write(x + '\n');
  };

  var nodeFS = require('fs');
  var nodePath = require('path');

  Module['read'] = function read(filename, binary) {
    filename = nodePath['normalize'](filename);
    var ret = nodeFS['readFileSync'](filename);
    // The path is absolute if the normalized version is the same as the resolved.
    if (!ret && filename != nodePath['resolve'](filename)) {
      filename = path.join(__dirname, '..', 'src', filename);
      ret = nodeFS['readFileSync'](filename);
    }
    if (ret && !binary) ret = ret.toString();
    return ret;
  };

  Module['readBinary'] = function readBinary(filename) { return Module['read'](filename, true) };

  Module['load'] = function load(f) {
    globalEval(read(f));
  };

  Module['arguments'] = process['argv'].slice(2);

  module['exports'] = Module;
}
else if (ENVIRONMENT_IS_SHELL) {
  if (!Module['print']) Module['print'] = print;
  if (typeof printErr != 'undefined') Module['printErr'] = printErr; // not present in v8 or older sm

  if (typeof read != 'undefined') {
    Module['read'] = read;
  } else {
    Module['read'] = function read() { throw 'no read() available (jsc?)' };
  }

  Module['readBinary'] = function readBinary(f) {
    return read(f, 'binary');
  };

  if (typeof scriptArgs != 'undefined') {
    Module['arguments'] = scriptArgs;
  } else if (typeof arguments != 'undefined') {
    Module['arguments'] = arguments;
  }

  this['Module'] = Module;

  eval("if (typeof gc === 'function' && gc.toString().indexOf('[native code]') > 0) var gc = undefined"); // wipe out the SpiderMonkey shell 'gc' function, which can confuse closure (uses it as a minified name, and it is then initted to a non-falsey value unexpectedly)
}
else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  Module['read'] = function read(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    return xhr.responseText;
  };

  if (typeof arguments != 'undefined') {
    Module['arguments'] = arguments;
  }

  if (typeof console !== 'undefined') {
    if (!Module['print']) Module['print'] = function print(x) {
      console.log(x);
    };
    if (!Module['printErr']) Module['printErr'] = function printErr(x) {
      console.log(x);
    };
  } else {
    // Probably a worker, and without console.log. We can do very little here...
    var TRY_USE_DUMP = false;
    if (!Module['print']) Module['print'] = (TRY_USE_DUMP && (typeof(dump) !== "undefined") ? (function(x) {
      dump(x);
    }) : (function(x) {
      // self.postMessage(x); // enable this if you want stdout to be sent as messages
    }));
  }

  if (ENVIRONMENT_IS_WEB) {
    this['Module'] = Module;
  } else {
    Module['load'] = importScripts;
  }
}
else {
  // Unreachable because SHELL is dependant on the others
  throw 'Unknown runtime environment. Where are we?';
}

function globalEval(x) {
  eval.call(null, x);
}
if (!Module['load'] == 'undefined' && Module['read']) {
  Module['load'] = function load(f) {
    globalEval(Module['read'](f));
  };
}
if (!Module['print']) {
  Module['print'] = function(){};
}
if (!Module['printErr']) {
  Module['printErr'] = Module['print'];
}
if (!Module['arguments']) {
  Module['arguments'] = [];
}
// *** Environment setup code ***

// Closure helpers
Module.print = Module['print'];
Module.printErr = Module['printErr'];

// Callbacks
Module['preRun'] = [];
Module['postRun'] = [];

// Merge back in the overrides
for (var key in moduleOverrides) {
  if (moduleOverrides.hasOwnProperty(key)) {
    Module[key] = moduleOverrides[key];
  }
}



// === Auto-generated preamble library stuff ===

//========================================
// Runtime code shared with compiler
//========================================

var Runtime = {
  stackSave: function () {
    return STACKTOP;
  },
  stackRestore: function (stackTop) {
    STACKTOP = stackTop;
  },
  forceAlign: function (target, quantum) {
    quantum = quantum || 4;
    if (quantum == 1) return target;
    if (isNumber(target) && isNumber(quantum)) {
      return Math.ceil(target/quantum)*quantum;
    } else if (isNumber(quantum) && isPowerOfTwo(quantum)) {
      return '(((' +target + ')+' + (quantum-1) + ')&' + -quantum + ')';
    }
    return 'Math.ceil((' + target + ')/' + quantum + ')*' + quantum;
  },
  isNumberType: function (type) {
    return type in Runtime.INT_TYPES || type in Runtime.FLOAT_TYPES;
  },
  isPointerType: function isPointerType(type) {
  return type[type.length-1] == '*';
},
  isStructType: function isStructType(type) {
  if (isPointerType(type)) return false;
  if (isArrayType(type)) return true;
  if (/<?{ ?[^}]* ?}>?/.test(type)) return true; // { i32, i8 } etc. - anonymous struct types
  // See comment in isStructPointerType()
  return type[0] == '%';
},
  INT_TYPES: {"i1":0,"i8":0,"i16":0,"i32":0,"i64":0},
  FLOAT_TYPES: {"float":0,"double":0},
  or64: function (x, y) {
    var l = (x | 0) | (y | 0);
    var h = (Math.round(x / 4294967296) | Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  and64: function (x, y) {
    var l = (x | 0) & (y | 0);
    var h = (Math.round(x / 4294967296) & Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  xor64: function (x, y) {
    var l = (x | 0) ^ (y | 0);
    var h = (Math.round(x / 4294967296) ^ Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  getNativeTypeSize: function (type) {
    switch (type) {
      case 'i1': case 'i8': return 1;
      case 'i16': return 2;
      case 'i32': return 4;
      case 'i64': return 8;
      case 'float': return 4;
      case 'double': return 8;
      default: {
        if (type[type.length-1] === '*') {
          return Runtime.QUANTUM_SIZE; // A pointer
        } else if (type[0] === 'i') {
          var bits = parseInt(type.substr(1));
          assert(bits % 8 === 0);
          return bits/8;
        } else {
          return 0;
        }
      }
    }
  },
  getNativeFieldSize: function (type) {
    return Math.max(Runtime.getNativeTypeSize(type), Runtime.QUANTUM_SIZE);
  },
  dedup: function dedup(items, ident) {
  var seen = {};
  if (ident) {
    return items.filter(function(item) {
      if (seen[item[ident]]) return false;
      seen[item[ident]] = true;
      return true;
    });
  } else {
    return items.filter(function(item) {
      if (seen[item]) return false;
      seen[item] = true;
      return true;
    });
  }
},
  set: function set() {
  var args = typeof arguments[0] === 'object' ? arguments[0] : arguments;
  var ret = {};
  for (var i = 0; i < args.length; i++) {
    ret[args[i]] = 0;
  }
  return ret;
},
  STACK_ALIGN: 8,
  getAlignSize: function (type, size, vararg) {
    // we align i64s and doubles on 64-bit boundaries, unlike x86
    if (vararg) return 8;
    if (!vararg && (type == 'i64' || type == 'double')) return 8;
    if (!type) return Math.min(size, 8); // align structures internally to 64 bits
    return Math.min(size || (type ? Runtime.getNativeFieldSize(type) : 0), Runtime.QUANTUM_SIZE);
  },
  calculateStructAlignment: function calculateStructAlignment(type) {
    type.flatSize = 0;
    type.alignSize = 0;
    var diffs = [];
    var prev = -1;
    var index = 0;
    type.flatIndexes = type.fields.map(function(field) {
      index++;
      var size, alignSize;
      if (Runtime.isNumberType(field) || Runtime.isPointerType(field)) {
        size = Runtime.getNativeTypeSize(field); // pack char; char; in structs, also char[X]s.
        alignSize = Runtime.getAlignSize(field, size);
      } else if (Runtime.isStructType(field)) {
        if (field[1] === '0') {
          // this is [0 x something]. When inside another structure like here, it must be at the end,
          // and it adds no size
          // XXX this happens in java-nbody for example... assert(index === type.fields.length, 'zero-length in the middle!');
          size = 0;
          if (Types.types[field]) {
            alignSize = Runtime.getAlignSize(null, Types.types[field].alignSize);
          } else {
            alignSize = type.alignSize || QUANTUM_SIZE;
          }
        } else {
          size = Types.types[field].flatSize;
          alignSize = Runtime.getAlignSize(null, Types.types[field].alignSize);
        }
      } else if (field[0] == 'b') {
        // bN, large number field, like a [N x i8]
        size = field.substr(1)|0;
        alignSize = 1;
      } else if (field[0] === '<') {
        // vector type
        size = alignSize = Types.types[field].flatSize; // fully aligned
      } else if (field[0] === 'i') {
        // illegal integer field, that could not be legalized because it is an internal structure field
        // it is ok to have such fields, if we just use them as markers of field size and nothing more complex
        size = alignSize = parseInt(field.substr(1))/8;
        assert(size % 1 === 0, 'cannot handle non-byte-size field ' + field);
      } else {
        assert(false, 'invalid type for calculateStructAlignment');
      }
      if (type.packed) alignSize = 1;
      type.alignSize = Math.max(type.alignSize, alignSize);
      var curr = Runtime.alignMemory(type.flatSize, alignSize); // if necessary, place this on aligned memory
      type.flatSize = curr + size;
      if (prev >= 0) {
        diffs.push(curr-prev);
      }
      prev = curr;
      return curr;
    });
    if (type.name_ && type.name_[0] === '[') {
      // arrays have 2 elements, so we get the proper difference. then we scale here. that way we avoid
      // allocating a potentially huge array for [999999 x i8] etc.
      type.flatSize = parseInt(type.name_.substr(1))*type.flatSize/2;
    }
    type.flatSize = Runtime.alignMemory(type.flatSize, type.alignSize);
    if (diffs.length == 0) {
      type.flatFactor = type.flatSize;
    } else if (Runtime.dedup(diffs).length == 1) {
      type.flatFactor = diffs[0];
    }
    type.needsFlattening = (type.flatFactor != 1);
    return type.flatIndexes;
  },
  generateStructInfo: function (struct, typeName, offset) {
    var type, alignment;
    if (typeName) {
      offset = offset || 0;
      type = (typeof Types === 'undefined' ? Runtime.typeInfo : Types.types)[typeName];
      if (!type) return null;
      if (type.fields.length != struct.length) {
        printErr('Number of named fields must match the type for ' + typeName + ': possibly duplicate struct names. Cannot return structInfo');
        return null;
      }
      alignment = type.flatIndexes;
    } else {
      var type = { fields: struct.map(function(item) { return item[0] }) };
      alignment = Runtime.calculateStructAlignment(type);
    }
    var ret = {
      __size__: type.flatSize
    };
    if (typeName) {
      struct.forEach(function(item, i) {
        if (typeof item === 'string') {
          ret[item] = alignment[i] + offset;
        } else {
          // embedded struct
          var key;
          for (var k in item) key = k;
          ret[key] = Runtime.generateStructInfo(item[key], type.fields[i], alignment[i]);
        }
      });
    } else {
      struct.forEach(function(item, i) {
        ret[item[1]] = alignment[i];
      });
    }
    return ret;
  },
  dynCall: function (sig, ptr, args) {
    if (args && args.length) {
      if (!args.splice) args = Array.prototype.slice.call(args);
      args.splice(0, 0, ptr);
      return Module['dynCall_' + sig].apply(null, args);
    } else {
      return Module['dynCall_' + sig].call(null, ptr);
    }
  },
  functionPointers: [],
  addFunction: function (func) {
    for (var i = 0; i < Runtime.functionPointers.length; i++) {
      if (!Runtime.functionPointers[i]) {
        Runtime.functionPointers[i] = func;
        return 2*(1 + i);
      }
    }
    throw 'Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.';
  },
  removeFunction: function (index) {
    Runtime.functionPointers[(index-2)/2] = null;
  },
  getAsmConst: function (code, numArgs) {
    // code is a constant string on the heap, so we can cache these
    if (!Runtime.asmConstCache) Runtime.asmConstCache = {};
    var func = Runtime.asmConstCache[code];
    if (func) return func;
    var args = [];
    for (var i = 0; i < numArgs; i++) {
      args.push(String.fromCharCode(36) + i); // $0, $1 etc
    }
    code = Pointer_stringify(code);
    if (code[0] === '"') {
      // tolerate EM_ASM("..code..") even though EM_ASM(..code..) is correct
      if (code.indexOf('"', 1) === code.length-1) {
        code = code.substr(1, code.length-2);
      } else {
        // something invalid happened, e.g. EM_ASM("..code($0)..", input)
        abort('invalid EM_ASM input |' + code + '|. Please use EM_ASM(..code..) (no quotes) or EM_ASM({ ..code($0).. }, input) (to input values)');
      }
    }
    return Runtime.asmConstCache[code] = eval('(function(' + args.join(',') + '){ ' + code + ' })'); // new Function does not allow upvars in node
  },
  warnOnce: function (text) {
    if (!Runtime.warnOnce.shown) Runtime.warnOnce.shown = {};
    if (!Runtime.warnOnce.shown[text]) {
      Runtime.warnOnce.shown[text] = 1;
      Module.printErr(text);
    }
  },
  funcWrappers: {},
  getFuncWrapper: function (func, sig) {
    assert(sig);
    if (!Runtime.funcWrappers[func]) {
      Runtime.funcWrappers[func] = function dynCall_wrapper() {
        return Runtime.dynCall(sig, func, arguments);
      };
    }
    return Runtime.funcWrappers[func];
  },
  UTF8Processor: function () {
    var buffer = [];
    var needed = 0;
    this.processCChar = function (code) {
      code = code & 0xFF;

      if (buffer.length == 0) {
        if ((code & 0x80) == 0x00) {        // 0xxxxxxx
          return String.fromCharCode(code);
        }
        buffer.push(code);
        if ((code & 0xE0) == 0xC0) {        // 110xxxxx
          needed = 1;
        } else if ((code & 0xF0) == 0xE0) { // 1110xxxx
          needed = 2;
        } else {                            // 11110xxx
          needed = 3;
        }
        return '';
      }

      if (needed) {
        buffer.push(code);
        needed--;
        if (needed > 0) return '';
      }

      var c1 = buffer[0];
      var c2 = buffer[1];
      var c3 = buffer[2];
      var c4 = buffer[3];
      var ret;
      if (buffer.length == 2) {
        ret = String.fromCharCode(((c1 & 0x1F) << 6)  | (c2 & 0x3F));
      } else if (buffer.length == 3) {
        ret = String.fromCharCode(((c1 & 0x0F) << 12) | ((c2 & 0x3F) << 6)  | (c3 & 0x3F));
      } else {
        // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        var codePoint = ((c1 & 0x07) << 18) | ((c2 & 0x3F) << 12) |
                        ((c3 & 0x3F) << 6)  | (c4 & 0x3F);
        ret = String.fromCharCode(
          Math.floor((codePoint - 0x10000) / 0x400) + 0xD800,
          (codePoint - 0x10000) % 0x400 + 0xDC00);
      }
      buffer.length = 0;
      return ret;
    }
    this.processJSString = function processJSString(string) {
      string = unescape(encodeURIComponent(string));
      var ret = [];
      for (var i = 0; i < string.length; i++) {
        ret.push(string.charCodeAt(i));
      }
      return ret;
    }
  },
  stackAlloc: function (size) { var ret = STACKTOP;STACKTOP = (STACKTOP + size)|0;STACKTOP = (((STACKTOP)+7)&-8); return ret; },
  staticAlloc: function (size) { var ret = STATICTOP;STATICTOP = (STATICTOP + size)|0;STATICTOP = (((STATICTOP)+7)&-8); return ret; },
  dynamicAlloc: function (size) { var ret = DYNAMICTOP;DYNAMICTOP = (DYNAMICTOP + size)|0;DYNAMICTOP = (((DYNAMICTOP)+7)&-8); if (DYNAMICTOP >= TOTAL_MEMORY) enlargeMemory();; return ret; },
  alignMemory: function (size,quantum) { var ret = size = Math.ceil((size)/(quantum ? quantum : 8))*(quantum ? quantum : 8); return ret; },
  makeBigInt: function (low,high,unsigned) { var ret = (unsigned ? ((+((low>>>0)))+((+((high>>>0)))*(+4294967296))) : ((+((low>>>0)))+((+((high|0)))*(+4294967296)))); return ret; },
  GLOBAL_BASE: 8,
  QUANTUM_SIZE: 4,
  __dummy__: 0
}


Module['Runtime'] = Runtime;









//========================================
// Runtime essentials
//========================================

var __THREW__ = 0; // Used in checking for thrown exceptions.

var ABORT = false; // whether we are quitting the application. no code should run after this. set in exit() and abort()
var EXITSTATUS = 0;

var undef = 0;
// tempInt is used for 32-bit signed values or smaller. tempBigInt is used
// for 32-bit unsigned values or more than 32 bits. TODO: audit all uses of tempInt
var tempValue, tempInt, tempBigInt, tempInt2, tempBigInt2, tempPair, tempBigIntI, tempBigIntR, tempBigIntS, tempBigIntP, tempBigIntD, tempDouble, tempFloat;
var tempI64, tempI64b;
var tempRet0, tempRet1, tempRet2, tempRet3, tempRet4, tempRet5, tempRet6, tempRet7, tempRet8, tempRet9;

function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed: ' + text);
  }
}

var globalScope = this;

// C calling interface. A convenient way to call C functions (in C files, or
// defined with extern "C").
//
// Note: LLVM optimizations can inline and remove functions, after which you will not be
//       able to call them. Closure can also do so. To avoid that, add your function to
//       the exports using something like
//
//         -s EXPORTED_FUNCTIONS='["_main", "_myfunc"]'
//
// @param ident      The name of the C function (note that C++ functions will be name-mangled - use extern "C")
// @param returnType The return type of the function, one of the JS types 'number', 'string' or 'array' (use 'number' for any C pointer, and
//                   'array' for JavaScript arrays and typed arrays; note that arrays are 8-bit).
// @param argTypes   An array of the types of arguments for the function (if there are no arguments, this can be ommitted). Types are as in returnType,
//                   except that 'array' is not possible (there is no way for us to know the length of the array)
// @param args       An array of the arguments to the function, as native JS values (as in returnType)
//                   Note that string arguments will be stored on the stack (the JS string will become a C string on the stack).
// @return           The return value, as a native JS value (as in returnType)
function ccall(ident, returnType, argTypes, args) {
  return ccallFunc(getCFunc(ident), returnType, argTypes, args);
}
Module["ccall"] = ccall;

// Returns the C function with a specified identifier (for C++, you need to do manual name mangling)
function getCFunc(ident) {
  try {
    var func = Module['_' + ident]; // closure exported function
    if (!func) func = eval('_' + ident); // explicit lookup
  } catch(e) {
  }
  assert(func, 'Cannot call unknown function ' + ident + ' (perhaps LLVM optimizations or closure removed it?)');
  return func;
}

// Internal function that does a C call using a function, not an identifier
function ccallFunc(func, returnType, argTypes, args) {
  var stack = 0;
  function toC(value, type) {
    if (type == 'string') {
      if (value === null || value === undefined || value === 0) return 0; // null string
      value = intArrayFromString(value);
      type = 'array';
    }
    if (type == 'array') {
      if (!stack) stack = Runtime.stackSave();
      var ret = Runtime.stackAlloc(value.length);
      writeArrayToMemory(value, ret);
      return ret;
    }
    return value;
  }
  function fromC(value, type) {
    if (type == 'string') {
      return Pointer_stringify(value);
    }
    assert(type != 'array');
    return value;
  }
  var i = 0;
  var cArgs = args ? args.map(function(arg) {
    return toC(arg, argTypes[i++]);
  }) : [];
  var ret = fromC(func.apply(null, cArgs), returnType);
  if (stack) Runtime.stackRestore(stack);
  return ret;
}

// Returns a native JS wrapper for a C function. This is similar to ccall, but
// returns a function you can call repeatedly in a normal way. For example:
//
//   var my_function = cwrap('my_c_function', 'number', ['number', 'number']);
//   alert(my_function(5, 22));
//   alert(my_function(99, 12));
//
function cwrap(ident, returnType, argTypes) {
  var func = getCFunc(ident);
  return function() {
    return ccallFunc(func, returnType, argTypes, Array.prototype.slice.call(arguments));
  }
}
Module["cwrap"] = cwrap;

// Sets a value in memory in a dynamic way at run-time. Uses the
// type data. This is the same as makeSetValue, except that
// makeSetValue is done at compile-time and generates the needed
// code then, whereas this function picks the right code at
// run-time.
// Note that setValue and getValue only do *aligned* writes and reads!
// Note that ccall uses JS types as for defining types, while setValue and
// getValue need LLVM types ('i8', 'i32') - this is a lower-level operation
function setValue(ptr, value, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': HEAP8[(ptr)]=value; break;
      case 'i8': HEAP8[(ptr)]=value; break;
      case 'i16': HEAP16[((ptr)>>1)]=value; break;
      case 'i32': HEAP32[((ptr)>>2)]=value; break;
      case 'i64': (tempI64 = [value>>>0,(tempDouble=value,(+(Math_abs(tempDouble))) >= (+1) ? (tempDouble > (+0) ? ((Math_min((+(Math_floor((tempDouble)/(+4294967296)))), (+4294967295)))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/(+4294967296))))))>>>0) : 0)],HEAP32[((ptr)>>2)]=tempI64[0],HEAP32[(((ptr)+(4))>>2)]=tempI64[1]); break;
      case 'float': HEAPF32[((ptr)>>2)]=value; break;
      case 'double': HEAPF64[((ptr)>>3)]=value; break;
      default: abort('invalid type for setValue: ' + type);
    }
}
Module['setValue'] = setValue;

// Parallel to setValue.
function getValue(ptr, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': return HEAP8[(ptr)];
      case 'i8': return HEAP8[(ptr)];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP32[((ptr)>>2)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      default: abort('invalid type for setValue: ' + type);
    }
  return null;
}
Module['getValue'] = getValue;

var ALLOC_NORMAL = 0; // Tries to use _malloc()
var ALLOC_STACK = 1; // Lives for the duration of the current function call
var ALLOC_STATIC = 2; // Cannot be freed
var ALLOC_DYNAMIC = 3; // Cannot be freed except through sbrk
var ALLOC_NONE = 4; // Do not allocate
Module['ALLOC_NORMAL'] = ALLOC_NORMAL;
Module['ALLOC_STACK'] = ALLOC_STACK;
Module['ALLOC_STATIC'] = ALLOC_STATIC;
Module['ALLOC_DYNAMIC'] = ALLOC_DYNAMIC;
Module['ALLOC_NONE'] = ALLOC_NONE;

// allocate(): This is for internal use. You can use it yourself as well, but the interface
//             is a little tricky (see docs right below). The reason is that it is optimized
//             for multiple syntaxes to save space in generated code. So you should
//             normally not use allocate(), and instead allocate memory using _malloc(),
//             initialize it with setValue(), and so forth.
// @slab: An array of data, or a number. If a number, then the size of the block to allocate,
//        in *bytes* (note that this is sometimes confusing: the next parameter does not
//        affect this!)
// @types: Either an array of types, one for each byte (or 0 if no type at that position),
//         or a single type which is used for the entire block. This only matters if there
//         is initial data - if @slab is a number, then this does not matter at all and is
//         ignored.
// @allocator: How to allocate memory, see ALLOC_*
function allocate(slab, types, allocator, ptr) {
  var zeroinit, size;
  if (typeof slab === 'number') {
    zeroinit = true;
    size = slab;
  } else {
    zeroinit = false;
    size = slab.length;
  }

  var singleType = typeof types === 'string' ? types : null;

  var ret;
  if (allocator == ALLOC_NONE) {
    ret = ptr;
  } else {
    ret = [_malloc, Runtime.stackAlloc, Runtime.staticAlloc, Runtime.dynamicAlloc][allocator === undefined ? ALLOC_STATIC : allocator](Math.max(size, singleType ? 1 : types.length));
  }

  if (zeroinit) {
    var ptr = ret, stop;
    assert((ret & 3) == 0);
    stop = ret + (size & ~3);
    for (; ptr < stop; ptr += 4) {
      HEAP32[((ptr)>>2)]=0;
    }
    stop = ret + size;
    while (ptr < stop) {
      HEAP8[((ptr++)|0)]=0;
    }
    return ret;
  }

  if (singleType === 'i8') {
    if (slab.subarray || slab.slice) {
      HEAPU8.set(slab, ret);
    } else {
      HEAPU8.set(new Uint8Array(slab), ret);
    }
    return ret;
  }

  var i = 0, type, typeSize, previousType;
  while (i < size) {
    var curr = slab[i];

    if (typeof curr === 'function') {
      curr = Runtime.getFunctionIndex(curr);
    }

    type = singleType || types[i];
    if (type === 0) {
      i++;
      continue;
    }

    if (type == 'i64') type = 'i32'; // special case: we have one i32 here, and one i32 later

    setValue(ret+i, curr, type);

    // no need to look up size unless type changes, so cache it
    if (previousType !== type) {
      typeSize = Runtime.getNativeTypeSize(type);
      previousType = type;
    }
    i += typeSize;
  }

  return ret;
}
Module['allocate'] = allocate;

function Pointer_stringify(ptr, /* optional */ length) {
  // TODO: use TextDecoder
  // Find the length, and check for UTF while doing so
  var hasUtf = false;
  var t;
  var i = 0;
  while (1) {
    t = HEAPU8[(((ptr)+(i))|0)];
    if (t >= 128) hasUtf = true;
    else if (t == 0 && !length) break;
    i++;
    if (length && i == length) break;
  }
  if (!length) length = i;

  var ret = '';

  if (!hasUtf) {
    var MAX_CHUNK = 1024; // split up into chunks, because .apply on a huge string can overflow the stack
    var curr;
    while (length > 0) {
      curr = String.fromCharCode.apply(String, HEAPU8.subarray(ptr, ptr + Math.min(length, MAX_CHUNK)));
      ret = ret ? ret + curr : curr;
      ptr += MAX_CHUNK;
      length -= MAX_CHUNK;
    }
    return ret;
  }

  var utf8 = new Runtime.UTF8Processor();
  for (i = 0; i < length; i++) {
    t = HEAPU8[(((ptr)+(i))|0)];
    ret += utf8.processCChar(t);
  }
  return ret;
}
Module['Pointer_stringify'] = Pointer_stringify;

// Given a pointer 'ptr' to a null-terminated UTF16LE-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.
function UTF16ToString(ptr) {
  var i = 0;

  var str = '';
  while (1) {
    var codeUnit = HEAP16[(((ptr)+(i*2))>>1)];
    if (codeUnit == 0)
      return str;
    ++i;
    // fromCharCode constructs a character from a UTF-16 code unit, so we can pass the UTF16 string right through.
    str += String.fromCharCode(codeUnit);
  }
}
Module['UTF16ToString'] = UTF16ToString;

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF16LE form. The copy will require at most (str.length*2+1)*2 bytes of space in the HEAP.
function stringToUTF16(str, outPtr) {
  for(var i = 0; i < str.length; ++i) {
    // charCodeAt returns a UTF-16 encoded code unit, so it can be directly written to the HEAP.
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    HEAP16[(((outPtr)+(i*2))>>1)]=codeUnit;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP16[(((outPtr)+(str.length*2))>>1)]=0;
}
Module['stringToUTF16'] = stringToUTF16;

// Given a pointer 'ptr' to a null-terminated UTF32LE-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.
function UTF32ToString(ptr) {
  var i = 0;

  var str = '';
  while (1) {
    var utf32 = HEAP32[(((ptr)+(i*4))>>2)];
    if (utf32 == 0)
      return str;
    ++i;
    // Gotcha: fromCharCode constructs a character from a UTF-16 encoded code (pair), not from a Unicode code point! So encode the code point to UTF-16 for constructing.
    if (utf32 >= 0x10000) {
      var ch = utf32 - 0x10000;
      str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
    } else {
      str += String.fromCharCode(utf32);
    }
  }
}
Module['UTF32ToString'] = UTF32ToString;

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF32LE form. The copy will require at most (str.length+1)*4 bytes of space in the HEAP,
// but can use less, since str.length does not return the number of characters in the string, but the number of UTF-16 code units in the string.
function stringToUTF32(str, outPtr) {
  var iChar = 0;
  for(var iCodeUnit = 0; iCodeUnit < str.length; ++iCodeUnit) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    var codeUnit = str.charCodeAt(iCodeUnit); // possibly a lead surrogate
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) {
      var trailSurrogate = str.charCodeAt(++iCodeUnit);
      codeUnit = 0x10000 + ((codeUnit & 0x3FF) << 10) | (trailSurrogate & 0x3FF);
    }
    HEAP32[(((outPtr)+(iChar*4))>>2)]=codeUnit;
    ++iChar;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP32[(((outPtr)+(iChar*4))>>2)]=0;
}
Module['stringToUTF32'] = stringToUTF32;

function demangle(func) {
  try {
    // Special-case the entry point, since its name differs from other name mangling.
    if (func == 'Object._main' || func == '_main') {
      return 'main()';
    }
    if (typeof func === 'number') func = Pointer_stringify(func);
    if (func[0] !== '_') return func;
    if (func[1] !== '_') return func; // C function
    if (func[2] !== 'Z') return func;
    switch (func[3]) {
      case 'n': return 'operator new()';
      case 'd': return 'operator delete()';
    }
    var i = 3;
    // params, etc.
    var basicTypes = {
      'v': 'void',
      'b': 'bool',
      'c': 'char',
      's': 'short',
      'i': 'int',
      'l': 'long',
      'f': 'float',
      'd': 'double',
      'w': 'wchar_t',
      'a': 'signed char',
      'h': 'unsigned char',
      't': 'unsigned short',
      'j': 'unsigned int',
      'm': 'unsigned long',
      'x': 'long long',
      'y': 'unsigned long long',
      'z': '...'
    };
    function dump(x) {
      //return;
      if (x) Module.print(x);
      Module.print(func);
      var pre = '';
      for (var a = 0; a < i; a++) pre += ' ';
      Module.print (pre + '^');
    }
    var subs = [];
    function parseNested() {
      i++;
      if (func[i] === 'K') i++; // ignore const
      var parts = [];
      while (func[i] !== 'E') {
        if (func[i] === 'S') { // substitution
          i++;
          var next = func.indexOf('_', i);
          var num = func.substring(i, next) || 0;
          parts.push(subs[num] || '?');
          i = next+1;
          continue;
        }
        if (func[i] === 'C') { // constructor
          parts.push(parts[parts.length-1]);
          i += 2;
          continue;
        }
        var size = parseInt(func.substr(i));
        var pre = size.toString().length;
        if (!size || !pre) { i--; break; } // counter i++ below us
        var curr = func.substr(i + pre, size);
        parts.push(curr);
        subs.push(curr);
        i += pre + size;
      }
      i++; // skip E
      return parts;
    }
    var first = true;
    function parse(rawList, limit, allowVoid) { // main parser
      limit = limit || Infinity;
      var ret = '', list = [];
      function flushList() {
        return '(' + list.join(', ') + ')';
      }
      var name;
      if (func[i] === 'N') {
        // namespaced N-E
        name = parseNested().join('::');
        limit--;
        if (limit === 0) return rawList ? [name] : name;
      } else {
        // not namespaced
        if (func[i] === 'K' || (first && func[i] === 'L')) i++; // ignore const and first 'L'
        var size = parseInt(func.substr(i));
        if (size) {
          var pre = size.toString().length;
          name = func.substr(i + pre, size);
          i += pre + size;
        }
      }
      first = false;
      if (func[i] === 'I') {
        i++;
        var iList = parse(true);
        var iRet = parse(true, 1, true);
        ret += iRet[0] + ' ' + name + '<' + iList.join(', ') + '>';
      } else {
        ret = name;
      }
      paramLoop: while (i < func.length && limit-- > 0) {
        //dump('paramLoop');
        var c = func[i++];
        if (c in basicTypes) {
          list.push(basicTypes[c]);
        } else {
          switch (c) {
            case 'P': list.push(parse(true, 1, true)[0] + '*'); break; // pointer
            case 'R': list.push(parse(true, 1, true)[0] + '&'); break; // reference
            case 'L': { // literal
              i++; // skip basic type
              var end = func.indexOf('E', i);
              var size = end - i;
              list.push(func.substr(i, size));
              i += size + 2; // size + 'EE'
              break;
            }
            case 'A': { // array
              var size = parseInt(func.substr(i));
              i += size.toString().length;
              if (func[i] !== '_') throw '?';
              i++; // skip _
              list.push(parse(true, 1, true)[0] + ' [' + size + ']');
              break;
            }
            case 'E': break paramLoop;
            default: ret += '?' + c; break paramLoop;
          }
        }
      }
      if (!allowVoid && list.length === 1 && list[0] === 'void') list = []; // avoid (void)
      return rawList ? list : ret + flushList();
    }
    return parse();
  } catch(e) {
    return func;
  }
}

function demangleAll(text) {
  return text.replace(/__Z[\w\d_]+/g, function(x) { var y = demangle(x); return x === y ? x : (x + ' [' + y + ']') });
}

function stackTrace() {
  var stack = new Error().stack;
  return stack ? demangleAll(stack) : '(no stack trace available)'; // Stack trace is not available at least on IE10 and Safari 6.
}

// Memory management

var PAGE_SIZE = 4096;
function alignMemoryPage(x) {
  return (x+4095)&-4096;
}

var HEAP;
var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;

var STATIC_BASE = 0, STATICTOP = 0, staticSealed = false; // static area
var STACK_BASE = 0, STACKTOP = 0, STACK_MAX = 0; // stack area
var DYNAMIC_BASE = 0, DYNAMICTOP = 0; // dynamic area handled by sbrk

function enlargeMemory() {
  abort('Cannot enlarge memory arrays in asm.js. Either (1) compile with -s TOTAL_MEMORY=X with X higher than the current value ' + TOTAL_MEMORY + ', or (2) set Module.TOTAL_MEMORY before the program runs.');
}

var TOTAL_STACK = Module['TOTAL_STACK'] || 5242880;
var TOTAL_MEMORY = Module['TOTAL_MEMORY'] || 134217728;
var FAST_MEMORY = Module['FAST_MEMORY'] || 2097152;

var totalMemory = 4096;
while (totalMemory < TOTAL_MEMORY || totalMemory < 2*TOTAL_STACK) {
  if (totalMemory < 16*1024*1024) {
    totalMemory *= 2;
  } else {
    totalMemory += 16*1024*1024
  }
}
if (totalMemory !== TOTAL_MEMORY) {
  Module.printErr('increasing TOTAL_MEMORY to ' + totalMemory + ' to be more reasonable');
  TOTAL_MEMORY = totalMemory;
}

// Initialize the runtime's memory
// check for full engine support (use string 'subarray' to avoid closure compiler confusion)
assert(typeof Int32Array !== 'undefined' && typeof Float64Array !== 'undefined' && !!(new Int32Array(1)['subarray']) && !!(new Int32Array(1)['set']),
       'Cannot fallback to non-typed array case: Code is too specialized');

var buffer = new ArrayBuffer(TOTAL_MEMORY);
HEAP8 = new Int8Array(buffer);
HEAP16 = new Int16Array(buffer);
HEAP32 = new Int32Array(buffer);
HEAPU8 = new Uint8Array(buffer);
HEAPU16 = new Uint16Array(buffer);
HEAPU32 = new Uint32Array(buffer);
HEAPF32 = new Float32Array(buffer);
HEAPF64 = new Float64Array(buffer);

// Endianness check (note: assumes compiler arch was little-endian)
HEAP32[0] = 255;
assert(HEAPU8[0] === 255 && HEAPU8[3] === 0, 'Typed arrays 2 must be run on a little-endian system');

Module['HEAP'] = HEAP;
Module['HEAP8'] = HEAP8;
Module['HEAP16'] = HEAP16;
Module['HEAP32'] = HEAP32;
Module['HEAPU8'] = HEAPU8;
Module['HEAPU16'] = HEAPU16;
Module['HEAPU32'] = HEAPU32;
Module['HEAPF32'] = HEAPF32;
Module['HEAPF64'] = HEAPF64;

function callRuntimeCallbacks(callbacks) {
  while(callbacks.length > 0) {
    var callback = callbacks.shift();
    if (typeof callback == 'function') {
      callback();
      continue;
    }
    var func = callback.func;
    if (typeof func === 'number') {
      if (callback.arg === undefined) {
        Runtime.dynCall('v', func);
      } else {
        Runtime.dynCall('vi', func, [callback.arg]);
      }
    } else {
      func(callback.arg === undefined ? null : callback.arg);
    }
  }
}

var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the runtime has exited

var runtimeInitialized = false;

function preRun() {
  // compatibility - merge in anything from Module['preRun'] at this time
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPRERUN__);
}

function ensureInitRuntime() {
  if (runtimeInitialized) return;
  runtimeInitialized = true;
  callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
  callRuntimeCallbacks(__ATMAIN__);
}

function exitRuntime() {
  callRuntimeCallbacks(__ATEXIT__);
}

function postRun() {
  // compatibility - merge in anything from Module['postRun'] at this time
  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}
Module['addOnPreRun'] = Module.addOnPreRun = addOnPreRun;

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}
Module['addOnInit'] = Module.addOnInit = addOnInit;

function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}
Module['addOnPreMain'] = Module.addOnPreMain = addOnPreMain;

function addOnExit(cb) {
  __ATEXIT__.unshift(cb);
}
Module['addOnExit'] = Module.addOnExit = addOnExit;

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}
Module['addOnPostRun'] = Module.addOnPostRun = addOnPostRun;

// Tools

// This processes a JS string into a C-line array of numbers, 0-terminated.
// For LLVM-originating strings, see parser.js:parseLLVMString function
function intArrayFromString(stringy, dontAddNull, length /* optional */) {
  var ret = (new Runtime.UTF8Processor()).processJSString(stringy);
  if (length) {
    ret.length = length;
  }
  if (!dontAddNull) {
    ret.push(0);
  }
  return ret;
}
Module['intArrayFromString'] = intArrayFromString;

function intArrayToString(array) {
  var ret = [];
  for (var i = 0; i < array.length; i++) {
    var chr = array[i];
    if (chr > 0xFF) {
      chr &= 0xFF;
    }
    ret.push(String.fromCharCode(chr));
  }
  return ret.join('');
}
Module['intArrayToString'] = intArrayToString;

// Write a Javascript array to somewhere in the heap
function writeStringToMemory(string, buffer, dontAddNull) {
  var array = intArrayFromString(string, dontAddNull);
  var i = 0;
  while (i < array.length) {
    var chr = array[i];
    HEAP8[(((buffer)+(i))|0)]=chr;
    i = i + 1;
  }
}
Module['writeStringToMemory'] = writeStringToMemory;

function writeArrayToMemory(array, buffer) {
  for (var i = 0; i < array.length; i++) {
    HEAP8[(((buffer)+(i))|0)]=array[i];
  }
}
Module['writeArrayToMemory'] = writeArrayToMemory;

function writeAsciiToMemory(str, buffer, dontAddNull) {
  for (var i = 0; i < str.length; i++) {
    HEAP8[(((buffer)+(i))|0)]=str.charCodeAt(i);
  }
  if (!dontAddNull) HEAP8[(((buffer)+(str.length))|0)]=0;
}
Module['writeAsciiToMemory'] = writeAsciiToMemory;

function unSign(value, bits, ignore, sig) {
  if (value >= 0) {
    return value;
  }
  return bits <= 32 ? 2*Math.abs(1 << (bits-1)) + value // Need some trickery, since if bits == 32, we are right at the limit of the bits JS uses in bitshifts
                    : Math.pow(2, bits)         + value;
}
function reSign(value, bits, ignore, sig) {
  if (value <= 0) {
    return value;
  }
  var half = bits <= 32 ? Math.abs(1 << (bits-1)) // abs is needed if bits == 32
                        : Math.pow(2, bits-1);
  if (value >= half && (bits <= 32 || value > half)) { // for huge values, we can hit the precision limit and always get true here. so don't do that
                                                       // but, in general there is no perfect solution here. With 64-bit ints, we get rounding and errors
                                                       // TODO: In i64 mode 1, resign the two parts separately and safely
    value = -2*half + value; // Cannot bitshift half, as it may be at the limit of the bits JS uses in bitshifts
  }
  return value;
}

// check for imul support, and also for correctness ( https://bugs.webkit.org/show_bug.cgi?id=126345 )
if (!Math['imul'] || Math['imul'](0xffffffff, 5) !== -5) Math['imul'] = function imul(a, b) {
  var ah  = a >>> 16;
  var al = a & 0xffff;
  var bh  = b >>> 16;
  var bl = b & 0xffff;
  return (al*bl + ((ah*bl + al*bh) << 16))|0;
};
Math.imul = Math['imul'];


var Math_abs = Math.abs;
var Math_cos = Math.cos;
var Math_sin = Math.sin;
var Math_tan = Math.tan;
var Math_acos = Math.acos;
var Math_asin = Math.asin;
var Math_atan = Math.atan;
var Math_atan2 = Math.atan2;
var Math_exp = Math.exp;
var Math_log = Math.log;
var Math_sqrt = Math.sqrt;
var Math_ceil = Math.ceil;
var Math_floor = Math.floor;
var Math_pow = Math.pow;
var Math_imul = Math.imul;
var Math_fround = Math.fround;
var Math_min = Math.min;

// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// PRE_RUN_ADDITIONS (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled

function addRunDependency(id) {
  runDependencies++;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
}
Module['addRunDependency'] = addRunDependency;
function removeRunDependency(id) {
  runDependencies--;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}
Module['removeRunDependency'] = removeRunDependency;

Module["preloadedImages"] = {}; // maps url to image data
Module["preloadedAudios"] = {}; // maps url to audio data


var memoryInitializer = null;

// === Body ===



STATIC_BASE = 8;

STATICTOP = STATIC_BASE + 7752;








/* global initializers */ __ATINIT__.push({ func: function() { runPostSets() } });























































































































































































































































































































































var __ZTVN10__cxxabiv120__si_class_type_infoE;
__ZTVN10__cxxabiv120__si_class_type_infoE=allocate([0,0,0,0,104,23,0,0,78,0,0,0,18,0,0,0,80,0,0,0,22,0,0,0,2,0,0,0,4,0,0,0,4,0,0,0,14,0,0,0,0,0,0,0,0,0,0,0], "i8", ALLOC_STATIC);;
var __ZTVN10__cxxabiv117__class_type_infoE;
__ZTVN10__cxxabiv117__class_type_infoE=allocate([0,0,0,0,120,23,0,0,78,0,0,0,76,0,0,0,80,0,0,0,22,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,8,0,0,0,0,0,0,0,0,0,0,0], "i8", ALLOC_STATIC);;






























































var __ZTISt9exception;



























































var __ZN16b2BlockAllocatorC1Ev;
var __ZN16b2BlockAllocatorD1Ev;
var __ZN6b2BodyC1EPK9b2BodyDefP7b2World;
var __ZN16b2ContactManagerC1Ev;
var __ZN9b2FixtureC1Ev;
var __ZN7b2WorldC1ERK6b2Vec2;
var __ZN12b2BroadPhaseC1Ev;
var __ZN13b2DynamicTreeC1Ev;
var __ZN13b2DynamicTreeD1Ev;
var __ZN16b2StackAllocatorC1Ev;
var __ZN16b2StackAllocatorD1Ev;
var __ZN7b2TimerC1Ev;
var __ZN8b2IslandC1EiiiP16b2StackAllocatorP17b2ContactListener;
var __ZN8b2IslandD1Ev;
var __ZN15b2ContactSolverC1EP18b2ContactSolverDef;
var __ZN15b2ContactSolverD1Ev;
/* memory initializer */ allocate([114,101,115,112,111,110,115,105,118,101,32,109,97,105,110,32,108,111,111,112,0,0,0,0,0,232,118,72,0,0,0,0,255,255,255,255,0,0,0,0,144,20,0,0,0,0,0,0,216,20,0,0,0,0,0,0,48,32,60,61,32,105,66,32,38,38,32,105,66,32,60,32,109,95,110,111,100,101,67,97,112,97,99,105,116,121,0,0,73,115,76,111,99,107,101,100,40,41,32,61,61,32,102,97,108,115,101,0,0,0,0,0,105,65,32,33,61,32,40,45,49,41,0,0,0,0,0,0,97,108,112,104,97,48,32,60,32,49,46,48,102,0,0,0,99,104,105,108,100,50,32,33,61,32,40,45,49,41,0,0,109,95,119,111,114,108,100,45,62,73,115,76,111,99,107,101,100,40,41,32,61,61,32,102,97,108,115,101,0,0,0,0,116,121,112,101,65,32,61,61,32,98,50,95,100,121,110,97,109,105,99,66,111,100,121,32,124,124,32,116,121,112,101,66,32,61,61,32,98,50,95,100,121,110,97,109,105,99,66,111,100,121,0,0,0,0,0,0,98,50,73,115,86,97,108,105,100,40,98,100,45,62,108,105,110,101,97,114,68,97,109,112,105,110,103,41,32,38,38,32,98,100,45,62,108,105,110,101,97,114,68,97,109,112,105,110,103,32,62,61,32,48,46,48,102,0,0,0,0,0,0,0,99,104,105,108,100,49,32,33,61,32,40,45,49,41,0,0,115,116,97,99,107,67,111,117,110,116,32,60,32,115,116,97,99,107,83,105,122,101,0,0,97,114,101,97,32,62,32,49,46,49,57,50,48,57,50,57,48,101,45,48,55,70,0,0,112,99,45,62,112,111,105,110,116,67,111,117,110,116,32,62,32,48,0,0,0,0,0,0,98,50,73,115,86,97,108,105,100,40,98,100,45,62,97,110,103,117,108,97,114,68,97,109,112,105,110,103,41,32,38,38,32,98,100,45,62,97,110,103,117,108,97,114,68,97,109,112,105,110,103,32,62,61,32,48,46,48,102,0,0,0,0,0,112,32,61,61,32,101,110,116,114,121,45,62,100,97,116,97,0,0,0,0,0,0,0,0,48,32,60,32,99,111,117,110,116,32,38,38,32,99,111,117,110,116,32,60,32,51,0,0,109,95,110,111,100,101,115,91,112,114,111,120,121,73,100,93,46,73,115,76,101,97,102,40,41,0,0,0,0,0,0,0,99,97,99,104,101,45,62,99,111,117,110,116,32,60,61,32,51,0,0,0,0,0,0,0,98,45,62,73,115,65,99,116,105,118,101,40,41,32,61,61,32,116,114,117,101,0,0,0,48,32,60,61,32,105,110,100,101,120,32,38,38,32,105,110,100,101,120,32,60,32,109,95,99,111,117,110,116,32,45,32,49,0,0,0,0,0,0,0,97,46,120,32,62,61,32,48,46,48,102,32,38,38,32,97,46,121,32,62,61,32,48,46,48,102,0,0,0,0,0,0,112,111,105,110,116,67,111,117,110,116,32,62,32,48,0,0,98,50,73,115,86,97,108,105,100,40,98,100,45,62,97,110,103,117,108,97,114,86,101,108,111,99,105,116,121,41,0,0,109,95,102,105,120,116,117,114,101,65,45,62,71,101,116,84,121,112,101,40,41,32,61,61,32,98,50,83,104,97,112,101,58,58,101,95,99,105,114,99,108,101,0,0,0,0,0,0,48,32,60,61,32,116,121,112,101,65,32,38,38,32,116,121,112,101,66,32,60,32,98,50,83,104,97,112,101,58,58,101,95,116,121,112,101,67,111,117,110,116,0,0,0,0,0,0,109,95,101,110,116,114,121,67,111,117,110,116,32,62,32,48,0,0,0,0,0,0,0,0,46,47,66,111,120,50,68,47,67,111,108,108,105,115,105,111,110,47,98,50,68,105,115,116,97,110,99,101,46,104,0,0,109,95,112,114,111,120,121,67,111,117,110,116,32,61,61,32,48,0,0,0,0,0,0,0,109,95,102,105,120,116,117,114,101,65,45,62,71,101,116,84,121,112,101,40,41,32,61,61,32,98,50,83,104,97,112,101,58,58,101,95,99,104,97,105,110,0,0,0,0,0,0,0,98,108,111,99,107,67,111,117,110,116,32,42,32,98,108,111,99,107,83,105,122,101,32,60,61,32,98,50,95,99,104,117,110,107,83,105,122,101,0,0,48,32,60,61,32,112,114,111,120,121,73,100,32,38,38,32,112,114,111,120,121,73,100,32,60,32,109,95,110,111,100,101,67,97,112,97,99,105,116,121,0,0,0,0,0,0,0,0,46,47,66,111,120,50,68,47,67,111,108,108,105,115,105,111,110,47,98,50,68,105,115,116,97,110,99,101,46,104,0,0,109,95,102,105,120,116,117,114,101,65,45,62,71,101,116,84,121,112,101,40,41,32,61,61,32,98,50,83,104,97,112,101,58,58,101,95,99,104,97,105,110,0,0,0,0,0,0,0,48,32,60,61,32,101,100,103,101,49,32,38,38,32,101,100,103,101,49,32,60,32,112,111,108,121,49,45,62,109,95,118,101,114,116,101,120,67,111,117,110,116,0,0,0,0,0,0,109,95,118,101,114,116,101,120,67,111,117,110,116,32,62,61,32,51,0,0,0,0,0,0,100,101,110,32,62,32,48,46,48,102,0,0,0,0,0,0,116,111,105,73,110,100,101,120,65,32,60,32,109,95,98,111,100,121,67,111,117,110,116,0,48,46,48,102,32,60,61,32,108,111,119,101,114,32,38,38,32,108,111,119,101,114,32,60,61,32,105,110,112,117,116,46,109,97,120,70,114,97,99,116,105,111,110,0,0,0,0,0,48,32,60,61,32,112,114,111,120,121,73,100,32,38,38,32,112,114,111,120,121,73,100,32,60,32,109,95,110,111,100,101,67,97,112,97,99,105,116,121,0,0,0,0,0,0,0,0,115,116,100,58,58,98,97,100,95,97,108,108,111,99,0,0,112,111,105,110,116,67,111,117,110,116,32,61,61,32,49,32,124,124,32,112,111,105,110,116,67,111,117,110,116,32,61,61,32,50,0,0,0,0,0,0,98,50,73,115,86,97,108,105,100,40,98,100,45,62,97,110,103,108,101,41,0,0,0,0,115,95,105,110,105,116,105,97,108,105,122,101,100,32,61,61,32,116,114,117,101,0,0,0,109,95,101,110,116,114,121,67,111,117,110,116,32,60,32,98,50,95,109,97,120,83,116,97,99,107,69,110,116,114,105,101,115,0,0,0,0,0,0,0,48,32,60,61,32,105,110,100,101,120,32,38,38,32,105,110,100,101,120,32,60,32,109,95,99,111,117,110,116,0,0,0,48,32,60,61,32,105,110,100,101,120,32,38,38,32,105,110,100,101,120,32,60,32,98,50,95,98,108,111,99,107,83,105,122,101,115,0,0,0,0,0,48,32,60,32,109,95,110,111,100,101,67,111,117,110,116,0,48,32,60,61,32,105,110,100,101,120,32,38,38,32,105,110,100,101,120,32,60,32,109,95,99,111,117,110,116,0,0,0,105,102,32,40,77,111,100,117,108,101,46,114,101,112,111,114,116,67,111,109,112,108,101,116,105,111,110,41,32,77,111,100,117,108,101,46,114,101,112,111,114,116,67,111,109,112,108,101,116,105,111,110,40,41,0,0,109,95,98,111,100,121,67,111,117,110,116,32,60,32,109,95,98,111,100,121,67,97,112,97,99,105,116,121,0,0,0,0,109,95,99,111,110,116,97,99,116,67,111,117,110,116,32,60,32,109,95,99,111,110,116,97,99,116,67,97,112,97,99,105,116,121,0,0,0,0,0,0,109,95,102,105,120,116,117,114,101,65,45,62,71,101,116,84,121,112,101,40,41,32,61,61,32,98,50,83,104,97,112,101,58,58,101,95,112,111,108,121,103,111,110,0,0,0,0,0,46,47,66,111,120,50,68,47,68,121,110,97,109,105,99,115,47,98,50,73,115,108,97,110,100,46,104,0,0,0,0,0,109,95,102,105,120,116,117,114,101,65,45,62,71,101,116,84,121,112,101,40,41,32,61,61,32,98,50,83,104,97,112,101,58,58,101,95,112,111,108,121,103,111,110,0,0,0,0,0,109,95,106,111,105,110,116,67,111,117,110,116,32,60,32,109,95,106,111,105,110,116,67,97,112,97,99,105,116,121,0,0,109,95,102,105,120,116,117,114,101,65,45,62,71,101,116,84,121,112,101,40,41,32,61,61,32,98,50,83,104,97,112,101,58,58,101,95,101,100,103,101,0,0,0,0,0,0,0,0,109,97,110,105,102,111,108,100,45,62,112,111,105,110,116,67,111,117,110,116,32,62,32,48,0,0,0,0,0,0,0,0,109,95,102,105,120,116,117,114,101,65,45,62,71,101,116,84,121,112,101,40,41,32,61,61,32,98,50,83,104,97,112,101,58,58,101,95,101,100,103,101,0,0,0,0,0,0,0,0,109,95,102,105,120,116,117,114,101,66,45,62,71,101,116,84,121,112,101,40,41,32,61,61,32,98,50,83,104,97,112,101,58,58,101,95,99,105,114,99,108,101,0,0,0,0,0,0,109,95,102,105,120,116,117,114,101,66,45,62,71,101,116,84,121,112,101,40,41,32,61,61,32,98,50,83,104,97,112,101,58,58,101,95,112,111,108,121,103,111,110,0,0,0,0,0,109,95,102,105,120,116,117,114,101,66,45,62,71,101,116,84,121,112,101,40,41,32,61,61,32,98,50,83,104,97,112,101,58,58,101,95,99,105,114,99,108,101,0,0,0,0,0,0,46,47,66,111,120,50,68,47,67,111,109,109,111,110,47,98,50,77,97,116,104,46,104,0,98,100,45,62,112,111,115,105,116,105,111,110,46,73,115,86,97,108,105,100,40,41,0,0,116,111,105,73,110,100,101,120,66,32,60,32,109,95,98,111,100,121,67,111,117,110,116,0,46,47,66,111,120,50,68,47,67,111,108,108,105,115,105,111,110,47,98,50,68,121,110,97,109,105,99,84,114,101,101,46,104,0,0,0,0,0,0,0,48,32,60,61,32,116,121,112,101,49,32,38,38,32,116,121,112,101,49,32,60,32,98,50,83,104,97,112,101,58,58,101,95,116,121,112,101,67,111,117,110,116,0,0,0,0,0,0,109,95,102,105,120,116,117,114,101,66,45,62,71,101,116,84,121,112,101,40,41,32,61,61,32,98,50,83,104,97,112,101,58,58,101,95,112,111,108,121,103,111,110,0,0,0,0,0,98,100,45,62,108,105,110,101,97,114,86,101,108,111,99,105,116,121,46,73,115,86,97,108,105,100,40,41,0,0,0,0,109,95,102,105,120,116,117,114,101,66,45,62,71,101,116,84,121,112,101,40,41,32,61,61,32,98,50,83,104,97,112,101,58,58,101,95,99,105,114,99,108,101,0,0,0,0,0,0,109,95,102,105,120,116,117,114,101,66,45,62,71,101,116,84,121,112,101,40,41,32,61,61,32,98,50,83,104,97,112,101,58,58,101,95,112,111,108,121,103,111,110,0,0,0,0,0,109,95,102,105,120,116,117,114,101,66,45,62,71,101,116,84,121,112,101,40,41,32,61,61,32,98,50,83,104,97,112,101,58,58,101,95,99,105,114,99,108,101,0,0,0,0,0,0,48,32,60,61,32,116,121,112,101,50,32,38,38,32,116,121,112,101,50,32,60,32,98,50,83,104,97,112,101,58,58,101,95,116,121,112,101,67,111,117,110,116,0,0,0,0,0,0,109,95,101,110,116,114,121,67,111,117,110,116,32,61,61,32,48,0,0,0,0,0,0,0,102,97,108,115,101,0,0,0,48,32,60,61,32,110,111,100,101,73,100,32,38,38,32,110,111,100,101,73,100,32,60,32,109,95,110,111,100,101,67,97,112,97,99,105,116,121,0,0,48,32,60,32,115,105,122,101,0,0,0,0,0,0,0,0,102,97,108,115,101,0,0,0,109,95,105,110,100,101,120,32,61,61,32,48,0,0,0,0,116,97,114,103,101,116,32,62,32,116,111,108,101,114,97,110,99,101,0,0,0,0,0,0,102,114,97,109,101,32,97,118,101,114,97,103,101,115,58,32,37,46,51,102,32,43,45,32,37,46,51,102,44,32,114,97,110,103,101,58,32,37,46,51,102,32,116,111,32,37,46,51,102,32,10,0,0,0,0,0,66,111,120,50,68,47,68,121,110,97,109,105,99,115,47,98,50,87,111,114,108,100,46,99,112,112,0,0,0,0,0,0,109,95,110,111,100,101,115,91,66,45,62,112,97,114,101,110,116,93,46,99,104,105,108,100,50,32,61,61,32,105,65,0,109,95,110,111,100,101,67,111,117,110,116,32,61,61,32,109,95,110,111,100,101,67,97,112,97,99,105,116,121,0,0,0,48,32,60,61,32,105,69,32,38,38,32,105,69,32,60,32,109,95,110,111,100,101,67,97,112,97,99,105,116,121,0,0,66,111,120,50,68,47,67,111,108,108,105,115,105,111,110,47,83,104,97,112,101,115,47,98,50,67,104,97,105,110,83,104,97,112,101,46,99,112,112,0,48,32,60,61,32,105,110,100,101,120,32,38,38,32,105,110,100,101,120,32,60,32,99,104,97,105,110,45,62,109,95,99,111,117,110,116,0,0,0,0,66,111,120,50,68,47,68,121,110,97,109,105,99,115,47,67,111,110,116,97,99,116,115,47,98,50,67,111,110,116,97,99,116,83,111,108,118,101,114,46,99,112,112,0,0,0,0,0,66,111,120,50,68,47,68,121,110,97,109,105,99,115,47,98,50,70,105,120,116,117,114,101,46,99,112,112,0,0,0,0,66,111,120,50,68,47,68,121,110,97,109,105,99,115,47,67,111,110,116,97,99,116,115,47,98,50,67,105,114,99,108,101,67,111,110,116,97,99,116,46,99,112,112,0,0,0,0,0,66,111,120,50,68,47,68,121,110,97,109,105,99,115,47,67,111,110,116,97,99,116,115,47,98,50,67,104,97,105,110,65,110,100,80,111,108,121,103,111,110,67,111,110,116,97,99,116,46,99,112,112,0,0,0,0,48,32,60,61,32,105,68,32,38,38,32,105,68,32,60,32,109,95,110,111,100,101,67,97,112,97,99,105,116,121,0,0,66,111,120,50,68,47,68,121,110,97,109,105,99,115,47,67,111,110,116,97,99,116,115,47,98,50,67,104,97,105,110,65,110,100,67,105,114,99,108,101,67,111,110,116,97,99,116,46,99,112,112,0,0,0,0,0,66,111,120,50,68,47,67,111,108,108,105,115,105,111,110,47,98,50,67,111,108,108,105,100,101,80,111,108,121,103,111,110,46,99,112,112,0,0,0,0,66,111,120,50,68,47,67,111,108,108,105,115,105,111,110,47,98,50,67,111,108,108,105,100,101,69,100,103,101,46,99,112,112,0,0,0,0,0,0,0,66,111,120,50,68,47,68,121,110,97,109,105,99,115,47,98,50,73,115,108,97,110,100,46,99,112,112,0,0,0,0,0,109,95,110,111,100,101,115,91,67,45,62,112,97,114,101,110,116,93,46,99,104,105,108,100,50,32,61,61,32,105,65,0,106,32,60,32,98,50,95,98,108,111,99,107,83,105,122,101,115,0,0,0,0,0,0,0,66,111,120,50,68,47,68,121,110,97,109,105,99,115,47,67,111,110,116,97,99,116,115,47,98,50,80,111,108,121,103,111,110,67,111,110,116,97,99,116,46,99,112,112,0,0,0,0,66,111,120,50,68,47,68,121,110,97,109,105,99,115,47,67,111,110,116,97,99,116,115,47,98,50,80,111,108,121,103,111,110,65,110,100,67,105,114,99,108,101,67,111,110,116,97,99,116,46,99,112,112,0,0,0,66,111,120,50,68,47,68,121,110,97,109,105,99,115,47,67,111,110,116,97,99,116,115,47,98,50,69,100,103,101,65,110,100,80,111,108,121,103,111,110,67,111,110,116,97,99,116,46,99,112,112,0,0,0,0,0,66,111,120,50,68,47,68,121,110,97,109,105,99,115,47,98,50,66,111,100,121,46,99,112,112,0,0,0,0,0,0,0,66,111,120,50,68,47,68,121,110,97,109,105,99,115,47,67,111,110,116,97,99,116,115,47,98,50,69,100,103,101,65,110,100,67,105,114,99,108,101,67,111,110,116,97,99,116,46,99,112,112,0,0,0,0,0,0,66,111,120,50,68,47,68,121,110,97,109,105,99,115,47,67,111,110,116,97,99,116,115,47,98,50,67,111,110,116,97,99,116,46,99,112,112,0,0,0,48,32,60,61,32,105,71,32,38,38,32,105,71,32,60,32,109,95,110,111,100,101,67,97,112,97,99,105,116,121,0,0,66,111,120,50,68,47,67,111,109,109,111,110,47,98,50,83,116,97,99,107,65,108,108,111,99,97,116,111,114,46,99,112,112,0,0,0,0,0,0,0,66,111,120,50,68,47,67,111,108,108,105,115,105,111,110,47,98,50,84,105,109,101,79,102,73,109,112,97,99,116,46,99,112,112,0,0,0,0,0,0,109,95,73,32,62,32,48,46,48,102,0,0,0,0,0,0,66,111,120,50,68,47,67,111,108,108,105,115,105,111,110,47,98,50,68,121,110,97,109,105,99,84,114,101,101,46,99,112,112,0,0,0,0,0,0,0,66,111,120,50,68,47,67,111,108,108,105,115,105,111,110,47,98,50,68,105,115,116,97,110,99,101,46,99,112,112,0,0,66,111,120,50,68,47,67,111,109,109,111,110,47,98,50,66,108,111,99,107,65,108,108,111,99,97,116,111,114,46,99,112,112,0,0,0,0,0,0,0,48,32,60,61,32,105,70,32,38,38,32,105,70,32,60,32,109,95,110,111,100,101,67,97,112,97,99,105,116,121,0,0,109,95,116,121,112,101,32,61,61,32,98,50,95,100,121,110,97,109,105,99,66,111,100,121,0,0,0,0,0,0,0,0,48,32,60,61,32,105,67,32,38,38,32,105,67,32,60,32,109,95,110,111,100,101,67,97,112,97,99,105,116,121,0,0,66,111,120,50,68,47,67,111,108,108,105,115,105,111,110,47,83,104,97,112,101,115,47,98,50,80,111,108,121,103,111,110,83,104,97,112,101,46,99,112,112,0,0,0,0,0,0,0,101,114,114,111,114,58,32,37,100,92,110,0,0,0,0,0,71,101,116,77,101,116,114,105,99,0,0,0,0,0,0,0,71,101,116,87,105,116,110,101,115,115,80,111,105,110,116,115,0,0,0,0,0,0,0,0,71,101,116,67,108,111,115,101,115,116,80,111,105,110,116,0,69,118,97,108,117,97,116,101,0,0,0,0,0,0,0,0,70,105,110,100,77,105,110,83,101,112,97,114,97,116,105,111,110,0,0,0,0,0,0,0,71,101,116,86,101,114,116,101,120,0,0,0,0,0,0,0,71,101,116,86,101,114,116,101,120,0,0,0,0,0,0,0,82,97,121,67,97,115,116,0,67,111,109,112,117,116,101,77,97,115,115,0,0,0,0,0,71,101,116,85,115,101,114,68,97,116,97,0,0,0,0,0,71,101,116,70,97,116,65,65,66,66,0,0,0,0,0,0,71,101,116,67,104,105,108,100,69,100,103,101,0,0,0,0,82,101,97,100,67,97,99,104,101,0,0,0,0,0,0,0,67,114,101,97,116,101,80,114,111,120,105,101,115,0,0,0,68,101,115,116,114,111,121,0,67,114,101,97,116,101,0,0,83,111,108,118,101,84,79,73,0,0,0,0,0,0,0,0,65,100,100,0,0,0,0,0,83,111,108,118,101,84,79,73,0,0,0,0,0,0,0,0,83,111,108,118,101,0,0,0,67,114,101,97,116,101,66,111,100,121,0,0,0,0,0,0,65,100,118,97,110,99,101,0,98,50,66,111,100,121,0,0,82,101,115,101,116,77,97,115,115,68,97,116,97,0,0,0,67,114,101,97,116,101,70,105,120,116,117,114,101,0,0,0,98,50,80,111,108,121,103,111,110,65,110,100,67,105,114,99,108,101,67,111,110,116,97,99,116,0,0,0,0,0,0,0,73,110,105,116,105,97,108,105,122,101,0,0,0,0,0,0,98,50,67,104,97,105,110,65,110,100,80,111,108,121,103,111,110,67,111,110,116,97,99,116,0,0,0,0,0,0,0,0,98,50,69,100,103,101,65,110,100,80,111,108,121,103,111,110,67,111,110,116,97,99,116,0,98,50,67,104,97,105,110,65,110,100,67,105,114,99,108,101,67,111,110,116,97,99,116,0,98,50,69,100,103,101,65,110,100,67,105,114,99,108,101,67,111,110,116,97,99,116,0,0,73,110,105,116,105,97,108,105,122,101,0,0,0,0,0,0,126,98,50,83,116,97,99,107,65,108,108,111,99,97,116,111,114,0,0,0,0,0,0,0,65,108,108,111,99,97,116,101,0,0,0,0,0,0,0,0,70,114,101,101,0,0,0,0,98,50,80,111,108,121,103,111,110,67,111,110,116,97,99,116,0,0,0,0,0,0,0,0,98,50,66,108,111,99,107,65,108,108,111,99,97,116,111,114,0,0,0,0,0,0,0,0,65,108,108,111,99,97,116,101,0,0,0,0,0,0,0,0,70,114,101,101,0,0,0,0,83,101,116,0,0,0,0,0,98,50,67,111,110,116,97,99,116,83,111,108,118,101,114,0,73,110,105,116,105,97,108,105,122,101,86,101,108,111,99,105,116,121,67,111,110,115,116,114,97,105,110,116,115,0,0,0,83,111,108,118,101,86,101,108,111,99,105,116,121,67,111,110,115,116,114,97,105,110,116,115,0,0,0,0,0,0,0,0,98,50,67,105,114,99,108,101,67,111,110,116,97,99,116,0,77,111,118,101,80,114,111,120,121,0,0,0,0,0,0,0,70,114,101,101,78,111,100,101,0,0,0,0,0,0,0,0,66,97,108,97,110,99,101,0,65,108,108,111,99,97,116,101,78,111,100,101,0,0,0,0,73,110,115,101,114,116,76,101,97,102,0,0,0,0,0,0,98,50,70,105,110,100,73,110,99,105,100,101,110,116,69,100,103,101,0,0,0,0,0,0,98,50,69,100,103,101,83,101,112,97,114,97,116,105,111,110,0,0,0,0,0,0,0,0,98,50,67,111,108,108,105,100,101,69,100,103,101,65,110,100,67,105,114,99,108,101,0,0,98,50,84,105,109,101,79,102,73,109,112,97,99,116,0,0,98,50,68,105,115,116,97,110,99,101,0,0,0,0,0,0,0,0,0,0,88,23,0,0,42,0,0,0,72,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,152,23,0,0,4,0,0,0,16,0,0,0,44,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,168,23,0,0,12,0,0,0,40,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,184,23,0,0,4,0,0,0,54,0,0,0,82,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,200,23,0,0,18,0,0,0,48,0,0,0,26,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,216,23,0,0,20,0,0,0,34,0,0,0,60,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,232,23,0,0,22,0,0,0,28,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,248,23,0,0,38,0,0,0,8,0,0,0,6,0,0,0,12,0,0,0,6,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,0,0,10,0,0,0,10,0,0,0,58,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,24,0,0,74,0,0,0,52,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,24,0,0,6,0,0,0,62,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,24,0,0,36,0,0,0,64,0,0,0,2,0,0,0,4,0,0,0,8,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,56,24,0,0,30,0,0,0,12,0,0,0,6,0,0,0,6,0,0,0,4,0,0,0,12,0,0,0,16,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,83,116,57,116,121,112,101,95,105,110,102,111,0,0,0,0,83,116,57,98,97,100,95,97,108,108,111,99,0,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,50,48,95,95,115,105,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,55,95,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,0,0,0,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,54,95,95,115,104,105,109,95,116,121,112,101,95,105,110,102,111,69,0,0,0,0,0,0,0,0,57,98,50,67,111,110,116,97,99,116,0,0,0,0,0,0,55,98,50,83,104,97,112,101,0,0,0,0,0,0,0,0,50,53,98,50,80,111,108,121,103,111,110,65,110,100,67,105,114,99,108,101,67,111,110,116,97,99,116,0,0,0,0,0,50,52,98,50,67,104,97,105,110,65,110,100,80,111,108,121,103,111,110,67,111,110,116,97,99,116,0,0,0,0,0,0,50,51,98,50,69,100,103,101,65,110,100,80,111,108,121,103,111,110,67,111,110,116,97,99,116,0,0,0,0,0,0,0,50,51,98,50,67,104,97,105,110,65,110,100,67,105,114,99,108,101,67,111,110,116,97,99,116,0,0,0,0,0,0,0,50,50,98,50,69,100,103,101,65,110,100,67,105,114,99,108,101,67,111,110,116,97,99,116,0,0,0,0,0,0,0,0,49,55,98,50,67,111,110,116,97,99,116,76,105,115,116,101,110,101,114,0,0,0,0,0,49,54,98,50,80,111,108,121,103,111,110,67,111,110,116,97,99,116,0,0,0,0,0,0,49,53,98,50,67,111,110,116,97,99,116,70,105,108,116,101,114,0,0,0,0,0,0,0,49,53,98,50,67,105,114,99,108,101,67,111,110,116,97,99,116,0,0,0,0,0,0,0,49,52,98,50,80,111,108,121,103,111,110,83,104,97,112,101,0,0,0,0,0,0,0,0,49,49,98,50,69,100,103,101,83,104,97,112,101,0,0,0,0,0,0,0,112,21,0,0,0,0,0,0,128,21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,144,21,0,0,120,23,0,0,0,0,0,0,0,0,0,0,184,21,0,0,136,23,0,0,0,0,0,0,0,0,0,0,224,21,0,0,80,23,0,0,0,0,0,0,0,0,0,0,8,22,0,0,0,0,0,0,24,22,0,0,0,0,0,0,40,22,0,0,152,23,0,0,0,0,0,0,0,0,0,0,72,22,0,0,152,23,0,0,0,0,0,0,0,0,0,0,104,22,0,0,152,23,0,0,0,0,0,0,0,0,0,0,136,22,0,0,152,23,0,0,0,0,0,0,0,0,0,0,168,22,0,0,152,23,0,0,0,0,0,0,0,0,0,0,200,22,0,0,0,0,0,0,224,22,0,0,152,23,0,0,0,0,0,0,0,0,0,0,248,22,0,0,0,0,0,0,16,23,0,0,152,23,0,0,0,0,0,0,0,0,0,0,40,23,0,0,160,23,0,0,0,0,0,0,0,0,0,0,64,23,0,0,160,23,0,0,0,0,0,0,16,0,0,0,32,0,0,0,64,0,0,0,96,0,0,0,128,0,0,0,160,0,0,0,192,0,0,0,224,0,0,0,0,1,0,0,64,1,0,0,128,1,0,0,192,1,0,0,0,2,0,0,128,2,0,0], "i8", ALLOC_NONE, Runtime.GLOBAL_BASE);



var tempDoublePtr = Runtime.alignMemory(allocate(12, "i8", ALLOC_STATIC), 8);

assert(tempDoublePtr % 8 == 0);

function copyTempFloat(ptr) { // functions, because inlining this code increases code size too much

  HEAP8[tempDoublePtr] = HEAP8[ptr];

  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];

  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];

  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];

}

function copyTempDouble(ptr) {

  HEAP8[tempDoublePtr] = HEAP8[ptr];

  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];

  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];

  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];

  HEAP8[tempDoublePtr+4] = HEAP8[ptr+4];

  HEAP8[tempDoublePtr+5] = HEAP8[ptr+5];

  HEAP8[tempDoublePtr+6] = HEAP8[ptr+6];

  HEAP8[tempDoublePtr+7] = HEAP8[ptr+7];

}


  
  
  
  
  var ERRNO_CODES={EPERM:1,ENOENT:2,ESRCH:3,EINTR:4,EIO:5,ENXIO:6,E2BIG:7,ENOEXEC:8,EBADF:9,ECHILD:10,EAGAIN:11,EWOULDBLOCK:11,ENOMEM:12,EACCES:13,EFAULT:14,ENOTBLK:15,EBUSY:16,EEXIST:17,EXDEV:18,ENODEV:19,ENOTDIR:20,EISDIR:21,EINVAL:22,ENFILE:23,EMFILE:24,ENOTTY:25,ETXTBSY:26,EFBIG:27,ENOSPC:28,ESPIPE:29,EROFS:30,EMLINK:31,EPIPE:32,EDOM:33,ERANGE:34,ENOMSG:42,EIDRM:43,ECHRNG:44,EL2NSYNC:45,EL3HLT:46,EL3RST:47,ELNRNG:48,EUNATCH:49,ENOCSI:50,EL2HLT:51,EDEADLK:35,ENOLCK:37,EBADE:52,EBADR:53,EXFULL:54,ENOANO:55,EBADRQC:56,EBADSLT:57,EDEADLOCK:35,EBFONT:59,ENOSTR:60,ENODATA:61,ETIME:62,ENOSR:63,ENONET:64,ENOPKG:65,EREMOTE:66,ENOLINK:67,EADV:68,ESRMNT:69,ECOMM:70,EPROTO:71,EMULTIHOP:72,EDOTDOT:73,EBADMSG:74,ENOTUNIQ:76,EBADFD:77,EREMCHG:78,ELIBACC:79,ELIBBAD:80,ELIBSCN:81,ELIBMAX:82,ELIBEXEC:83,ENOSYS:38,ENOTEMPTY:39,ENAMETOOLONG:36,ELOOP:40,EOPNOTSUPP:95,EPFNOSUPPORT:96,ECONNRESET:104,ENOBUFS:105,EAFNOSUPPORT:97,EPROTOTYPE:91,ENOTSOCK:88,ENOPROTOOPT:92,ESHUTDOWN:108,ECONNREFUSED:111,EADDRINUSE:98,ECONNABORTED:103,ENETUNREACH:101,ENETDOWN:100,ETIMEDOUT:110,EHOSTDOWN:112,EHOSTUNREACH:113,EINPROGRESS:115,EALREADY:114,EDESTADDRREQ:89,EMSGSIZE:90,EPROTONOSUPPORT:93,ESOCKTNOSUPPORT:94,EADDRNOTAVAIL:99,ENETRESET:102,EISCONN:106,ENOTCONN:107,ETOOMANYREFS:109,EUSERS:87,EDQUOT:122,ESTALE:116,ENOTSUP:95,ENOMEDIUM:123,EILSEQ:84,EOVERFLOW:75,ECANCELED:125,ENOTRECOVERABLE:131,EOWNERDEAD:130,ESTRPIPE:86};
  
  var ERRNO_MESSAGES={0:"Success",1:"Not super-user",2:"No such file or directory",3:"No such process",4:"Interrupted system call",5:"I/O error",6:"No such device or address",7:"Arg list too long",8:"Exec format error",9:"Bad file number",10:"No children",11:"No more processes",12:"Not enough core",13:"Permission denied",14:"Bad address",15:"Block device required",16:"Mount device busy",17:"File exists",18:"Cross-device link",19:"No such device",20:"Not a directory",21:"Is a directory",22:"Invalid argument",23:"Too many open files in system",24:"Too many open files",25:"Not a typewriter",26:"Text file busy",27:"File too large",28:"No space left on device",29:"Illegal seek",30:"Read only file system",31:"Too many links",32:"Broken pipe",33:"Math arg out of domain of func",34:"Math result not representable",35:"File locking deadlock error",36:"File or path name too long",37:"No record locks available",38:"Function not implemented",39:"Directory not empty",40:"Too many symbolic links",42:"No message of desired type",43:"Identifier removed",44:"Channel number out of range",45:"Level 2 not synchronized",46:"Level 3 halted",47:"Level 3 reset",48:"Link number out of range",49:"Protocol driver not attached",50:"No CSI structure available",51:"Level 2 halted",52:"Invalid exchange",53:"Invalid request descriptor",54:"Exchange full",55:"No anode",56:"Invalid request code",57:"Invalid slot",59:"Bad font file fmt",60:"Device not a stream",61:"No data (for no delay io)",62:"Timer expired",63:"Out of streams resources",64:"Machine is not on the network",65:"Package not installed",66:"The object is remote",67:"The link has been severed",68:"Advertise error",69:"Srmount error",70:"Communication error on send",71:"Protocol error",72:"Multihop attempted",73:"Cross mount point (not really error)",74:"Trying to read unreadable message",75:"Value too large for defined data type",76:"Given log. name not unique",77:"f.d. invalid for this operation",78:"Remote address changed",79:"Can   access a needed shared lib",80:"Accessing a corrupted shared lib",81:".lib section in a.out corrupted",82:"Attempting to link in too many libs",83:"Attempting to exec a shared library",84:"Illegal byte sequence",86:"Streams pipe error",87:"Too many users",88:"Socket operation on non-socket",89:"Destination address required",90:"Message too long",91:"Protocol wrong type for socket",92:"Protocol not available",93:"Unknown protocol",94:"Socket type not supported",95:"Not supported",96:"Protocol family not supported",97:"Address family not supported by protocol family",98:"Address already in use",99:"Address not available",100:"Network interface is not configured",101:"Network is unreachable",102:"Connection reset by network",103:"Connection aborted",104:"Connection reset by peer",105:"No buffer space available",106:"Socket is already connected",107:"Socket is not connected",108:"Can't send after socket shutdown",109:"Too many references",110:"Connection timed out",111:"Connection refused",112:"Host is down",113:"Host is unreachable",114:"Socket already connected",115:"Connection already in progress",116:"Stale file handle",122:"Quota exceeded",123:"No medium (in tape drive)",125:"Operation canceled",130:"Previous owner died",131:"State not recoverable"};
  
  
  var ___errno_state=0;function ___setErrNo(value) {
      // For convenient setting and returning of errno.
      HEAP32[((___errno_state)>>2)]=value;
      return value;
    }
  
  var PATH={splitPath:function (filename) {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },normalizeArray:function (parts, allowAboveRoot) {
        // if the path tries to go above the root, `up` ends up > 0
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        // if the path is allowed to go above the root, restore leading ..s
        if (allowAboveRoot) {
          for (; up--; up) {
            parts.unshift('..');
          }
        }
        return parts;
      },normalize:function (path) {
        var isAbsolute = path.charAt(0) === '/',
            trailingSlash = path.substr(-1) === '/';
        // Normalize the path
        path = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), !isAbsolute).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      },dirname:function (path) {
        var result = PATH.splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
          // No dirname whatsoever
          return '.';
        }
        if (dir) {
          // It has a dirname, strip trailing slash
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      },basename:function (path) {
        // EMSCRIPTEN return '/'' for '/', not an empty string
        if (path === '/') return '/';
        var lastSlash = path.lastIndexOf('/');
        if (lastSlash === -1) return path;
        return path.substr(lastSlash+1);
      },extname:function (path) {
        return PATH.splitPath(path)[3];
      },join:function () {
        var paths = Array.prototype.slice.call(arguments, 0);
        return PATH.normalize(paths.join('/'));
      },join2:function (l, r) {
        return PATH.normalize(l + '/' + r);
      },resolve:function () {
        var resolvedPath = '',
          resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = (i >= 0) ? arguments[i] : FS.cwd();
          // Skip empty and invalid entries
          if (typeof path !== 'string') {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            continue;
          }
          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = path.charAt(0) === '/';
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        resolvedPath = PATH.normalizeArray(resolvedPath.split('/').filter(function(p) {
          return !!p;
        }), !resolvedAbsolute).join('/');
        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
      },relative:function (from, to) {
        from = PATH.resolve(from).substr(1);
        to = PATH.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== '') break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== '') break;
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split('/'));
        var toParts = trim(to.split('/'));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..');
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join('/');
      }};
  
  var TTY={ttys:[],init:function () {
        // https://github.com/kripken/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
        //   // device, it always assumes it's a TTY device. because of this, we're forcing
        //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
        //   // with text files until FS.init can be refactored.
        //   process['stdin']['setEncoding']('utf8');
        // }
      },shutdown:function () {
        // https://github.com/kripken/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
        //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
        //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
        //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
        //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
        //   process['stdin']['pause']();
        // }
      },register:function (dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },stream_ops:{open:function (stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
          }
          stream.tty = tty;
          stream.seekable = false;
        },close:function (stream) {
          // flush any pending line data
          if (stream.tty.output.length) {
            stream.tty.ops.put_char(stream.tty, 10);
          }
        },read:function (stream, buffer, offset, length, pos /* ignored */) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset+i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },write:function (stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
          }
          for (var i = 0; i < length; i++) {
            try {
              stream.tty.ops.put_char(stream.tty, buffer[offset+i]);
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        }},default_tty_ops:{get_char:function (tty) {
          if (!tty.input.length) {
            var result = null;
            if (ENVIRONMENT_IS_NODE) {
              result = process['stdin']['read']();
              if (!result) {
                if (process['stdin']['_readableState'] && process['stdin']['_readableState']['ended']) {
                  return null;  // EOF
                }
                return undefined;  // no data available
              }
            } else if (typeof window != 'undefined' &&
              typeof window.prompt == 'function') {
              // Browser.
              result = window.prompt('Input: ');  // returns null on cancel
              if (result !== null) {
                result += '\n';
              }
            } else if (typeof readline == 'function') {
              // Command line.
              result = readline();
              if (result !== null) {
                result += '\n';
              }
            }
            if (!result) {
              return null;
            }
            tty.input = intArrayFromString(result, true);
          }
          return tty.input.shift();
        },put_char:function (tty, val) {
          if (val === null || val === 10) {
            Module['print'](tty.output.join(''));
            tty.output = [];
          } else {
            tty.output.push(TTY.utf8.processCChar(val));
          }
        }},default_tty1_ops:{put_char:function (tty, val) {
          if (val === null || val === 10) {
            Module['printErr'](tty.output.join(''));
            tty.output = [];
          } else {
            tty.output.push(TTY.utf8.processCChar(val));
          }
        }}};
  
  var MEMFS={ops_table:null,CONTENT_OWNING:1,CONTENT_FLEXIBLE:2,CONTENT_FIXED:3,mount:function (mount) {
        return MEMFS.createNode(null, '/', 16384 | 0777, 0);
      },createNode:function (parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          // no supported
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (!MEMFS.ops_table) {
          MEMFS.ops_table = {
            dir: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                lookup: MEMFS.node_ops.lookup,
                mknod: MEMFS.node_ops.mknod,
                mknod: MEMFS.node_ops.mknod,
                rename: MEMFS.node_ops.rename,
                unlink: MEMFS.node_ops.unlink,
                rmdir: MEMFS.node_ops.rmdir,
                readdir: MEMFS.node_ops.readdir,
                symlink: MEMFS.node_ops.symlink
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek
              }
            },
            file: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek,
                read: MEMFS.stream_ops.read,
                write: MEMFS.stream_ops.write,
                allocate: MEMFS.stream_ops.allocate,
                mmap: MEMFS.stream_ops.mmap
              }
            },
            link: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                readlink: MEMFS.node_ops.readlink
              },
              stream: {}
            },
            chrdev: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: FS.chrdev_stream_ops
            },
          };
        }
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.contents = [];
          node.contentMode = MEMFS.CONTENT_FLEXIBLE;
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        // add the new node to the parent
        if (parent) {
          parent.contents[name] = node;
        }
        return node;
      },ensureFlexible:function (node) {
        if (node.contentMode !== MEMFS.CONTENT_FLEXIBLE) {
          var contents = node.contents;
          node.contents = Array.prototype.slice.call(contents);
          node.contentMode = MEMFS.CONTENT_FLEXIBLE;
        }
      },node_ops:{getattr:function (node) {
          var attr = {};
          // device numbers reuse inode numbers.
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.contents.length;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp);
          // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
          //       but this is not required by the standard.
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },setattr:function (node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== undefined) {
            MEMFS.ensureFlexible(node);
            var contents = node.contents;
            if (attr.size < contents.length) contents.length = attr.size;
            else while (attr.size > contents.length) contents.push(0);
          }
        },lookup:function (parent, name) {
          throw FS.genericErrors[ERRNO_CODES.ENOENT];
        },mknod:function (parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },rename:function (old_node, new_dir, new_name) {
          // if we're overwriting a directory at new_name, make sure it's empty.
          if (FS.isDir(old_node.mode)) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {
            }
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
              }
            }
          }
          // do the internal rewiring
          delete old_node.parent.contents[old_node.name];
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          old_node.parent = new_dir;
        },unlink:function (parent, name) {
          delete parent.contents[name];
        },rmdir:function (parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
          }
          delete parent.contents[name];
        },readdir:function (node) {
          var entries = ['.', '..']
          for (var key in node.contents) {
            if (!node.contents.hasOwnProperty(key)) {
              continue;
            }
            entries.push(key);
          }
          return entries;
        },symlink:function (parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 0777 | 40960, 0);
          node.link = oldpath;
          return node;
        },readlink:function (node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          return node.link;
        }},stream_ops:{read:function (stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (size > 8 && contents.subarray) { // non-trivial, and typed array
            buffer.set(contents.subarray(position, position + size), offset);
          } else
          {
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          }
          return size;
        },write:function (stream, buffer, offset, length, position, canOwn) {
          var node = stream.node;
          node.timestamp = Date.now();
          var contents = node.contents;
          if (length && contents.length === 0 && position === 0 && buffer.subarray) {
            // just replace it with the new data
            if (canOwn && offset === 0) {
              node.contents = buffer; // this could be a subarray of Emscripten HEAP, or allocated from some other source.
              node.contentMode = (buffer.buffer === HEAP8.buffer) ? MEMFS.CONTENT_OWNING : MEMFS.CONTENT_FIXED;
            } else {
              node.contents = new Uint8Array(buffer.subarray(offset, offset+length));
              node.contentMode = MEMFS.CONTENT_FIXED;
            }
            return length;
          }
          MEMFS.ensureFlexible(node);
          var contents = node.contents;
          while (contents.length < position) contents.push(0);
          for (var i = 0; i < length; i++) {
            contents[position + i] = buffer[offset + i];
          }
          return length;
        },llseek:function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.contents.length;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          stream.ungotten = [];
          stream.position = position;
          return position;
        },allocate:function (stream, offset, length) {
          MEMFS.ensureFlexible(stream.node);
          var contents = stream.node.contents;
          var limit = offset + length;
          while (limit > contents.length) contents.push(0);
        },mmap:function (stream, buffer, offset, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          // Only make a new copy when MAP_PRIVATE is specified.
          if ( !(flags & 2) &&
                (contents.buffer === buffer || contents.buffer === buffer.buffer) ) {
            // We can't emulate MAP_SHARED when the file is not backed by the buffer
            // we're mapping to (e.g. the HEAP buffer).
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            // Try to avoid unnecessary slices.
            if (position > 0 || position + length < contents.length) {
              if (contents.subarray) {
                contents = contents.subarray(position, position + length);
              } else {
                contents = Array.prototype.slice.call(contents, position, position + length);
              }
            }
            allocated = true;
            ptr = _malloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOMEM);
            }
            buffer.set(contents, ptr);
          }
          return { ptr: ptr, allocated: allocated };
        }}};
  
  var IDBFS={dbs:{},indexedDB:function () {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      },DB_VERSION:20,DB_STORE_NAME:"FILE_DATA",mount:function (mount) {
        return MEMFS.mount.apply(null, arguments);
      },syncfs:function (mount, populate, callback) {
        IDBFS.getLocalSet(mount, function(err, local) {
          if (err) return callback(err);
  
          IDBFS.getRemoteSet(mount, function(err, remote) {
            if (err) return callback(err);
  
            var src = populate ? remote : local;
            var dst = populate ? local : remote;
  
            IDBFS.reconcile(src, dst, callback);
          });
        });
      },reconcile:function (src, dst, callback) {
        var total = 0;
  
        var create = {};
        for (var key in src.files) {
          if (!src.files.hasOwnProperty(key)) continue;
          var e = src.files[key];
          var e2 = dst.files[key];
          if (!e2 || e.timestamp > e2.timestamp) {
            create[key] = e;
            total++;
          }
        }
  
        var remove = {};
        for (var key in dst.files) {
          if (!dst.files.hasOwnProperty(key)) continue;
          var e = dst.files[key];
          var e2 = src.files[key];
          if (!e2) {
            remove[key] = e;
            total++;
          }
        }
  
        if (!total) {
          // early out
          return callback(null);
        }
  
        var completed = 0;
        function done(err) {
          if (err) return callback(err);
          if (++completed >= total) {
            return callback(null);
          }
        };
  
        // create a single transaction to handle and IDB reads / writes we'll need to do
        var db = src.type === 'remote' ? src.db : dst.db;
        var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readwrite');
        transaction.onerror = function transaction_onerror() { callback(this.error); };
        var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
  
        for (var path in create) {
          if (!create.hasOwnProperty(path)) continue;
          var entry = create[path];
  
          if (dst.type === 'local') {
            // save file to local
            try {
              if (FS.isDir(entry.mode)) {
                FS.mkdir(path, entry.mode);
              } else if (FS.isFile(entry.mode)) {
                var stream = FS.open(path, 'w+', 0666);
                FS.write(stream, entry.contents, 0, entry.contents.length, 0, true /* canOwn */);
                FS.close(stream);
              }
              done(null);
            } catch (e) {
              return done(e);
            }
          } else {
            // save file to IDB
            var req = store.put(entry, path);
            req.onsuccess = function req_onsuccess() { done(null); };
            req.onerror = function req_onerror() { done(this.error); };
          }
        }
  
        for (var path in remove) {
          if (!remove.hasOwnProperty(path)) continue;
          var entry = remove[path];
  
          if (dst.type === 'local') {
            // delete file from local
            try {
              if (FS.isDir(entry.mode)) {
                // TODO recursive delete?
                FS.rmdir(path);
              } else if (FS.isFile(entry.mode)) {
                FS.unlink(path);
              }
              done(null);
            } catch (e) {
              return done(e);
            }
          } else {
            // delete file from IDB
            var req = store.delete(path);
            req.onsuccess = function req_onsuccess() { done(null); };
            req.onerror = function req_onerror() { done(this.error); };
          }
        }
      },getLocalSet:function (mount, callback) {
        var files = {};
  
        function isRealDir(p) {
          return p !== '.' && p !== '..';
        };
        function toAbsolute(root) {
          return function(p) {
            return PATH.join2(root, p);
          }
        };
  
        var check = FS.readdir(mount.mountpoint)
          .filter(isRealDir)
          .map(toAbsolute(mount.mountpoint));
  
        while (check.length) {
          var path = check.pop();
          var stat, node;
  
          try {
            var lookup = FS.lookupPath(path);
            node = lookup.node;
            stat = FS.stat(path);
          } catch (e) {
            return callback(e);
          }
  
          if (FS.isDir(stat.mode)) {
            check.push.apply(check, FS.readdir(path)
              .filter(isRealDir)
              .map(toAbsolute(path)));
  
            files[path] = { mode: stat.mode, timestamp: stat.mtime };
          } else if (FS.isFile(stat.mode)) {
            files[path] = { contents: node.contents, mode: stat.mode, timestamp: stat.mtime };
          } else {
            return callback(new Error('node type not supported'));
          }
        }
  
        return callback(null, { type: 'local', files: files });
      },getDB:function (name, callback) {
        // look it up in the cache
        var db = IDBFS.dbs[name];
        if (db) {
          return callback(null, db);
        }
        var req;
        try {
          req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        req.onupgradeneeded = function req_onupgradeneeded() {
          db = req.result;
          db.createObjectStore(IDBFS.DB_STORE_NAME);
        };
        req.onsuccess = function req_onsuccess() {
          db = req.result;
          // add to the cache
          IDBFS.dbs[name] = db;
          callback(null, db);
        };
        req.onerror = function req_onerror() {
          callback(this.error);
        };
      },getRemoteSet:function (mount, callback) {
        var files = {};
  
        IDBFS.getDB(mount.mountpoint, function(err, db) {
          if (err) return callback(err);
  
          var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readonly');
          transaction.onerror = function transaction_onerror() { callback(this.error); };
  
          var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
          store.openCursor().onsuccess = function store_openCursor_onsuccess(event) {
            var cursor = event.target.result;
            if (!cursor) {
              return callback(null, { type: 'remote', db: db, files: files });
            }
  
            files[cursor.key] = cursor.value;
            cursor.continue();
          };
        });
      }};
  
  var NODEFS={isWindows:false,staticInit:function () {
        NODEFS.isWindows = !!process.platform.match(/^win/);
      },mount:function (mount) {
        assert(ENVIRONMENT_IS_NODE);
        return NODEFS.createNode(null, '/', NODEFS.getMode(mount.opts.root), 0);
      },createNode:function (parent, name, mode, dev) {
        if (!FS.isDir(mode) && !FS.isFile(mode) && !FS.isLink(mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var node = FS.createNode(parent, name, mode);
        node.node_ops = NODEFS.node_ops;
        node.stream_ops = NODEFS.stream_ops;
        return node;
      },getMode:function (path) {
        var stat;
        try {
          stat = fs.lstatSync(path);
          if (NODEFS.isWindows) {
            // On Windows, directories return permission bits 'rw-rw-rw-', even though they have 'rwxrwxrwx', so 
            // propagate write bits to execute bits.
            stat.mode = stat.mode | ((stat.mode & 146) >> 1);
          }
        } catch (e) {
          if (!e.code) throw e;
          throw new FS.ErrnoError(ERRNO_CODES[e.code]);
        }
        return stat.mode;
      },realPath:function (node) {
        var parts = [];
        while (node.parent !== node) {
          parts.push(node.name);
          node = node.parent;
        }
        parts.push(node.mount.opts.root);
        parts.reverse();
        return PATH.join.apply(null, parts);
      },flagsToPermissionStringMap:{0:"r",1:"r+",2:"r+",64:"r",65:"r+",66:"r+",129:"rx+",193:"rx+",514:"w+",577:"w",578:"w+",705:"wx",706:"wx+",1024:"a",1025:"a",1026:"a+",1089:"a",1090:"a+",1153:"ax",1154:"ax+",1217:"ax",1218:"ax+",4096:"rs",4098:"rs+"},flagsToPermissionString:function (flags) {
        if (flags in NODEFS.flagsToPermissionStringMap) {
          return NODEFS.flagsToPermissionStringMap[flags];
        } else {
          return flags;
        }
      },node_ops:{getattr:function (node) {
          var path = NODEFS.realPath(node);
          var stat;
          try {
            stat = fs.lstatSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          // node.js v0.10.20 doesn't report blksize and blocks on Windows. Fake them with default blksize of 4096.
          // See http://support.microsoft.com/kb/140365
          if (NODEFS.isWindows && !stat.blksize) {
            stat.blksize = 4096;
          }
          if (NODEFS.isWindows && !stat.blocks) {
            stat.blocks = (stat.size+stat.blksize-1)/stat.blksize|0;
          }
          return {
            dev: stat.dev,
            ino: stat.ino,
            mode: stat.mode,
            nlink: stat.nlink,
            uid: stat.uid,
            gid: stat.gid,
            rdev: stat.rdev,
            size: stat.size,
            atime: stat.atime,
            mtime: stat.mtime,
            ctime: stat.ctime,
            blksize: stat.blksize,
            blocks: stat.blocks
          };
        },setattr:function (node, attr) {
          var path = NODEFS.realPath(node);
          try {
            if (attr.mode !== undefined) {
              fs.chmodSync(path, attr.mode);
              // update the common node structure mode as well
              node.mode = attr.mode;
            }
            if (attr.timestamp !== undefined) {
              var date = new Date(attr.timestamp);
              fs.utimesSync(path, date, date);
            }
            if (attr.size !== undefined) {
              fs.truncateSync(path, attr.size);
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },lookup:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          var mode = NODEFS.getMode(path);
          return NODEFS.createNode(parent, name, mode);
        },mknod:function (parent, name, mode, dev) {
          var node = NODEFS.createNode(parent, name, mode, dev);
          // create the backing node for this in the fs root as well
          var path = NODEFS.realPath(node);
          try {
            if (FS.isDir(node.mode)) {
              fs.mkdirSync(path, node.mode);
            } else {
              fs.writeFileSync(path, '', { mode: node.mode });
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          return node;
        },rename:function (oldNode, newDir, newName) {
          var oldPath = NODEFS.realPath(oldNode);
          var newPath = PATH.join2(NODEFS.realPath(newDir), newName);
          try {
            fs.renameSync(oldPath, newPath);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },unlink:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          try {
            fs.unlinkSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },rmdir:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          try {
            fs.rmdirSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },readdir:function (node) {
          var path = NODEFS.realPath(node);
          try {
            return fs.readdirSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },symlink:function (parent, newName, oldPath) {
          var newPath = PATH.join2(NODEFS.realPath(parent), newName);
          try {
            fs.symlinkSync(oldPath, newPath);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },readlink:function (node) {
          var path = NODEFS.realPath(node);
          try {
            return fs.readlinkSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        }},stream_ops:{open:function (stream) {
          var path = NODEFS.realPath(stream.node);
          try {
            if (FS.isFile(stream.node.mode)) {
              stream.nfd = fs.openSync(path, NODEFS.flagsToPermissionString(stream.flags));
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },close:function (stream) {
          try {
            if (FS.isFile(stream.node.mode) && stream.nfd) {
              fs.closeSync(stream.nfd);
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },read:function (stream, buffer, offset, length, position) {
          // FIXME this is terrible.
          var nbuffer = new Buffer(length);
          var res;
          try {
            res = fs.readSync(stream.nfd, nbuffer, 0, length, position);
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          if (res > 0) {
            for (var i = 0; i < res; i++) {
              buffer[offset + i] = nbuffer[i];
            }
          }
          return res;
        },write:function (stream, buffer, offset, length, position) {
          // FIXME this is terrible.
          var nbuffer = new Buffer(buffer.subarray(offset, offset + length));
          var res;
          try {
            res = fs.writeSync(stream.nfd, nbuffer, 0, length, position);
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          return res;
        },llseek:function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              try {
                var stat = fs.fstatSync(stream.nfd);
                position += stat.size;
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES[e.code]);
              }
            }
          }
  
          if (position < 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
  
          stream.position = position;
          return position;
        }}};
  
  var _stdin=allocate(1, "i32*", ALLOC_STATIC);
  
  var _stdout=allocate(1, "i32*", ALLOC_STATIC);
  
  var _stderr=allocate(1, "i32*", ALLOC_STATIC);
  
  function _fflush(stream) {
      // int fflush(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fflush.html
      // we don't currently perform any user-space buffering of data
    }var FS={root:null,mounts:[],devices:[null],streams:[null],nextInode:1,nameTable:null,currentPath:"/",initialized:false,ignorePermissions:true,ErrnoError:null,genericErrors:{},handleFSError:function (e) {
        if (!(e instanceof FS.ErrnoError)) throw e + ' : ' + stackTrace();
        return ___setErrNo(e.errno);
      },lookupPath:function (path, opts) {
        path = PATH.resolve(FS.cwd(), path);
        opts = opts || { recurse_count: 0 };
  
        if (opts.recurse_count > 8) {  // max recursive lookup of 8
          throw new FS.ErrnoError(ERRNO_CODES.ELOOP);
        }
  
        // split the path
        var parts = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), false);
  
        // start at the root
        var current = FS.root;
        var current_path = '/';
  
        for (var i = 0; i < parts.length; i++) {
          var islast = (i === parts.length-1);
          if (islast && opts.parent) {
            // stop resolving
            break;
          }
  
          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]);
  
          // jump to the mount's root node if this is a mountpoint
          if (FS.isMountpoint(current)) {
            current = current.mount.root;
          }
  
          // follow symlinks
          // by default, lookupPath will not follow a symlink if it is the final path component.
          // setting opts.follow = true will override this behavior.
          if (!islast || opts.follow) {
            var count = 0;
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH.resolve(PATH.dirname(current_path), link);
              
              var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count });
              current = lookup.node;
  
              if (count++ > 40) {  // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
                throw new FS.ErrnoError(ERRNO_CODES.ELOOP);
              }
            }
          }
        }
  
        return { path: current_path, node: current };
      },getPath:function (node) {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length-1] !== '/' ? mount + '/' + path : mount + path;
          }
          path = path ? node.name + '/' + path : node.name;
          node = node.parent;
        }
      },hashName:function (parentid, name) {
        var hash = 0;
  
  
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
      },hashAddNode:function (node) {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },hashRemoveNode:function (node) {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },lookupNode:function (parent, name) {
        var err = FS.mayLookup(parent);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        // if we failed to find it in the cache, call into the VFS
        return FS.lookup(parent, name);
      },createNode:function (parent, name, mode, rdev) {
        if (!FS.FSNode) {
          FS.FSNode = function(parent, name, mode, rdev) {
            this.id = FS.nextInode++;
            this.name = name;
            this.mode = mode;
            this.node_ops = {};
            this.stream_ops = {};
            this.rdev = rdev;
            this.parent = null;
            this.mount = null;
            if (!parent) {
              parent = this;  // root node sets parent to itself
            }
            this.parent = parent;
            this.mount = parent.mount;
            FS.hashAddNode(this);
          };
  
          // compatibility
          var readMode = 292 | 73;
          var writeMode = 146;
  
          FS.FSNode.prototype = {};
  
          // NOTE we must use Object.defineProperties instead of individual calls to
          // Object.defineProperty in order to make closure compiler happy
          Object.defineProperties(FS.FSNode.prototype, {
            read: {
              get: function() { return (this.mode & readMode) === readMode; },
              set: function(val) { val ? this.mode |= readMode : this.mode &= ~readMode; }
            },
            write: {
              get: function() { return (this.mode & writeMode) === writeMode; },
              set: function(val) { val ? this.mode |= writeMode : this.mode &= ~writeMode; }
            },
            isFolder: {
              get: function() { return FS.isDir(this.mode); },
            },
            isDevice: {
              get: function() { return FS.isChrdev(this.mode); },
            },
          });
        }
        return new FS.FSNode(parent, name, mode, rdev);
      },destroyNode:function (node) {
        FS.hashRemoveNode(node);
      },isRoot:function (node) {
        return node === node.parent;
      },isMountpoint:function (node) {
        return node.mounted;
      },isFile:function (mode) {
        return (mode & 61440) === 32768;
      },isDir:function (mode) {
        return (mode & 61440) === 16384;
      },isLink:function (mode) {
        return (mode & 61440) === 40960;
      },isChrdev:function (mode) {
        return (mode & 61440) === 8192;
      },isBlkdev:function (mode) {
        return (mode & 61440) === 24576;
      },isFIFO:function (mode) {
        return (mode & 61440) === 4096;
      },isSocket:function (mode) {
        return (mode & 49152) === 49152;
      },flagModes:{"r":0,"rs":1052672,"r+":2,"w":577,"wx":705,"xw":705,"w+":578,"wx+":706,"xw+":706,"a":1089,"ax":1217,"xa":1217,"a+":1090,"ax+":1218,"xa+":1218},modeStringToFlags:function (str) {
        var flags = FS.flagModes[str];
        if (typeof flags === 'undefined') {
          throw new Error('Unknown file open mode: ' + str);
        }
        return flags;
      },flagsToPermissionString:function (flag) {
        var accmode = flag & 2097155;
        var perms = ['r', 'w', 'rw'][accmode];
        if ((flag & 512)) {
          perms += 'w';
        }
        return perms;
      },nodePermissions:function (node, perms) {
        if (FS.ignorePermissions) {
          return 0;
        }
        // return 0 if any user, group or owner bits are set.
        if (perms.indexOf('r') !== -1 && !(node.mode & 292)) {
          return ERRNO_CODES.EACCES;
        } else if (perms.indexOf('w') !== -1 && !(node.mode & 146)) {
          return ERRNO_CODES.EACCES;
        } else if (perms.indexOf('x') !== -1 && !(node.mode & 73)) {
          return ERRNO_CODES.EACCES;
        }
        return 0;
      },mayLookup:function (dir) {
        return FS.nodePermissions(dir, 'x');
      },mayCreate:function (dir, name) {
        try {
          var node = FS.lookupNode(dir, name);
          return ERRNO_CODES.EEXIST;
        } catch (e) {
        }
        return FS.nodePermissions(dir, 'wx');
      },mayDelete:function (dir, name, isdir) {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var err = FS.nodePermissions(dir, 'wx');
        if (err) {
          return err;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return ERRNO_CODES.ENOTDIR;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return ERRNO_CODES.EBUSY;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return ERRNO_CODES.EISDIR;
          }
        }
        return 0;
      },mayOpen:function (node, flags) {
        if (!node) {
          return ERRNO_CODES.ENOENT;
        }
        if (FS.isLink(node.mode)) {
          return ERRNO_CODES.ELOOP;
        } else if (FS.isDir(node.mode)) {
          if ((flags & 2097155) !== 0 ||  // opening for write
              (flags & 512)) {
            return ERRNO_CODES.EISDIR;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },MAX_OPEN_FDS:4096,nextfd:function (fd_start, fd_end) {
        fd_start = fd_start || 1;
        fd_end = fd_end || FS.MAX_OPEN_FDS;
        for (var fd = fd_start; fd <= fd_end; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(ERRNO_CODES.EMFILE);
      },getStream:function (fd) {
        return FS.streams[fd];
      },createStream:function (stream, fd_start, fd_end) {
        if (!FS.FSStream) {
          FS.FSStream = function(){};
          FS.FSStream.prototype = {};
          // compatibility
          Object.defineProperties(FS.FSStream.prototype, {
            object: {
              get: function() { return this.node; },
              set: function(val) { this.node = val; }
            },
            isRead: {
              get: function() { return (this.flags & 2097155) !== 1; }
            },
            isWrite: {
              get: function() { return (this.flags & 2097155) !== 0; }
            },
            isAppend: {
              get: function() { return (this.flags & 1024); }
            }
          });
        }
        if (0) {
          // reuse the object
          stream.__proto__ = FS.FSStream.prototype;
        } else {
          var newStream = new FS.FSStream();
          for (var p in stream) {
            newStream[p] = stream[p];
          }
          stream = newStream;
        }
        var fd = FS.nextfd(fd_start, fd_end);
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },closeStream:function (fd) {
        FS.streams[fd] = null;
      },chrdev_stream_ops:{open:function (stream) {
          var device = FS.getDevice(stream.node.rdev);
          // override node's stream ops with the device's
          stream.stream_ops = device.stream_ops;
          // forward the open call
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
        },llseek:function () {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }},major:function (dev) {
        return ((dev) >> 8);
      },minor:function (dev) {
        return ((dev) & 0xff);
      },makedev:function (ma, mi) {
        return ((ma) << 8 | (mi));
      },registerDevice:function (dev, ops) {
        FS.devices[dev] = { stream_ops: ops };
      },getDevice:function (dev) {
        return FS.devices[dev];
      },syncfs:function (populate, callback) {
        if (typeof(populate) === 'function') {
          callback = populate;
          populate = false;
        }
  
        var completed = 0;
        var total = FS.mounts.length;
        function done(err) {
          if (err) {
            return callback(err);
          }
          if (++completed >= total) {
            callback(null);
          }
        };
  
        // sync all mounts
        for (var i = 0; i < FS.mounts.length; i++) {
          var mount = FS.mounts[i];
          if (!mount.type.syncfs) {
            done(null);
            continue;
          }
          mount.type.syncfs(mount, populate, done);
        }
      },mount:function (type, opts, mountpoint) {
        var lookup;
        if (mountpoint) {
          lookup = FS.lookupPath(mountpoint, { follow: false });
          mountpoint = lookup.path;  // use the absolute path
        }
        var mount = {
          type: type,
          opts: opts,
          mountpoint: mountpoint,
          root: null
        };
        // create a root node for the fs
        var root = type.mount(mount);
        root.mount = mount;
        mount.root = root;
        // assign the mount info to the mountpoint's node
        if (lookup) {
          lookup.node.mount = mount;
          lookup.node.mounted = true;
          // compatibility update FS.root if we mount to /
          if (mountpoint === '/') {
            FS.root = mount.root;
          }
        }
        // add to our cached list of mounts
        FS.mounts.push(mount);
        return root;
      },lookup:function (parent, name) {
        return parent.node_ops.lookup(parent, name);
      },mknod:function (path, mode, dev) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var err = FS.mayCreate(parent, name);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },create:function (path, mode) {
        mode = mode !== undefined ? mode : 0666;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },mkdir:function (path, mode) {
        mode = mode !== undefined ? mode : 0777;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },mkdev:function (path, mode, dev) {
        if (typeof(dev) === 'undefined') {
          dev = mode;
          mode = 0666;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },symlink:function (oldpath, newpath) {
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        var newname = PATH.basename(newpath);
        var err = FS.mayCreate(parent, newname);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },rename:function (old_path, new_path) {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        // parents must exist
        var lookup, old_dir, new_dir;
        try {
          lookup = FS.lookupPath(old_path, { parent: true });
          old_dir = lookup.node;
          lookup = FS.lookupPath(new_path, { parent: true });
          new_dir = lookup.node;
        } catch (e) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        // need to be part of the same mount
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(ERRNO_CODES.EXDEV);
        }
        // source must exist
        var old_node = FS.lookupNode(old_dir, old_name);
        // old path should not be an ancestor of the new path
        var relative = PATH.relative(old_path, new_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        // new path should not be an ancestor of the old path
        relative = PATH.relative(new_path, old_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
        }
        // see if the new path already exists
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
          // not fatal
        }
        // early out if nothing needs to change
        if (old_node === new_node) {
          return;
        }
        // we'll need to delete the old entry
        var isdir = FS.isDir(old_node.mode);
        var err = FS.mayDelete(old_dir, old_name, isdir);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        // need delete permissions if we'll be overwriting.
        // need create permissions if new doesn't already exist.
        err = new_node ?
          FS.mayDelete(new_dir, new_name, isdir) :
          FS.mayCreate(new_dir, new_name);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        // if we are going to change the parent, check write permissions
        if (new_dir !== old_dir) {
          err = FS.nodePermissions(old_dir, 'w');
          if (err) {
            throw new FS.ErrnoError(err);
          }
        }
        // remove the node from the lookup hash
        FS.hashRemoveNode(old_node);
        // do the underlying fs rename
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
        } catch (e) {
          throw e;
        } finally {
          // add the node back to the hash (in case node_ops.rename
          // changed its name)
          FS.hashAddNode(old_node);
        }
      },rmdir:function (path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, true);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
      },readdir:function (path) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
        }
        return node.node_ops.readdir(node);
      },unlink:function (path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, false);
        if (err) {
          // POSIX says unlink should set EPERM, not EISDIR
          if (err === ERRNO_CODES.EISDIR) err = ERRNO_CODES.EPERM;
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
      },readlink:function (path) {
        var lookup = FS.lookupPath(path, { follow: false });
        var link = lookup.node;
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        return link.node_ops.readlink(link);
      },stat:function (path, dontFollow) {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return node.node_ops.getattr(node);
      },lstat:function (path) {
        return FS.stat(path, true);
      },chmod:function (path, mode, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        node.node_ops.setattr(node, {
          mode: (mode & 4095) | (node.mode & ~4095),
          timestamp: Date.now()
        });
      },lchmod:function (path, mode) {
        FS.chmod(path, mode, true);
      },fchmod:function (fd, mode) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        FS.chmod(stream.node, mode);
      },chown:function (path, uid, gid, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        node.node_ops.setattr(node, {
          timestamp: Date.now()
          // we ignore the uid / gid for now
        });
      },lchown:function (path, uid, gid) {
        FS.chown(path, uid, gid, true);
      },fchown:function (fd, uid, gid) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        FS.chown(stream.node, uid, gid);
      },truncate:function (path, len) {
        if (len < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var err = FS.nodePermissions(node, 'w');
        if (err) {
          throw new FS.ErrnoError(err);
        }
        node.node_ops.setattr(node, {
          size: len,
          timestamp: Date.now()
        });
      },ftruncate:function (fd, len) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        FS.truncate(stream.node, len);
      },utime:function (path, atime, mtime) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, {
          timestamp: Math.max(atime, mtime)
        });
      },open:function (path, flags, mode, fd_start, fd_end) {
        flags = typeof flags === 'string' ? FS.modeStringToFlags(flags) : flags;
        mode = typeof mode === 'undefined' ? 0666 : mode;
        if ((flags & 64)) {
          mode = (mode & 4095) | 32768;
        } else {
          mode = 0;
        }
        var node;
        if (typeof path === 'object') {
          node = path;
        } else {
          path = PATH.normalize(path);
          try {
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072)
            });
            node = lookup.node;
          } catch (e) {
            // ignore
          }
        }
        // perhaps we need to create the node
        if ((flags & 64)) {
          if (node) {
            // if O_CREAT and O_EXCL are set, error out if the node already exists
            if ((flags & 128)) {
              throw new FS.ErrnoError(ERRNO_CODES.EEXIST);
            }
          } else {
            // node doesn't exist, try to create it
            node = FS.mknod(path, mode, 0);
          }
        }
        if (!node) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        }
        // can't truncate a device
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        // check permissions
        var err = FS.mayOpen(node, flags);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        // do truncation if necessary
        if ((flags & 512)) {
          FS.truncate(node, 0);
        }
        // we've already handled these, don't pass down to the underlying vfs
        flags &= ~(128 | 512);
  
        // register the stream with the filesystem
        var stream = FS.createStream({
          node: node,
          path: FS.getPath(node),  // we want the absolute path to the node
          flags: flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          // used by the file family libc calls (fopen, fwrite, ferror, etc.)
          ungotten: [],
          error: false
        }, fd_start, fd_end);
        // call the new stream's open function
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!FS.readFiles) FS.readFiles = {};
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
            Module['printErr']('read file: ' + path);
          }
        }
        return stream;
      },close:function (stream) {
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
      },llseek:function (stream, offset, whence) {
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        return stream.stream_ops.llseek(stream, offset, whence);
      },read:function (stream, buffer, offset, length, position) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var seeking = true;
        if (typeof position === 'undefined') {
          position = stream.position;
          seeking = false;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },write:function (stream, buffer, offset, length, position, canOwn) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var seeking = true;
        if (typeof position === 'undefined') {
          position = stream.position;
          seeking = false;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        if (stream.flags & 1024) {
          // seek to the end before writing in append mode
          FS.llseek(stream, 0, 2);
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
        if (!seeking) stream.position += bytesWritten;
        return bytesWritten;
      },allocate:function (stream, offset, length) {
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
        }
        stream.stream_ops.allocate(stream, offset, length);
      },mmap:function (stream, buffer, offset, length, position, prot, flags) {
        // TODO if PROT is PROT_WRITE, make sure we have write access
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(ERRNO_CODES.EACCES);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
        }
        return stream.stream_ops.mmap(stream, buffer, offset, length, position, prot, flags);
      },ioctl:function (stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTTY);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },readFile:function (path, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'r';
        opts.encoding = opts.encoding || 'binary';
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === 'utf8') {
          ret = '';
          var utf8 = new Runtime.UTF8Processor();
          for (var i = 0; i < length; i++) {
            ret += utf8.processCChar(buf[i]);
          }
        } else if (opts.encoding === 'binary') {
          ret = buf;
        } else {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        FS.close(stream);
        return ret;
      },writeFile:function (path, data, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'w';
        opts.encoding = opts.encoding || 'utf8';
        var stream = FS.open(path, opts.flags, opts.mode);
        if (opts.encoding === 'utf8') {
          var utf8 = new Runtime.UTF8Processor();
          var buf = new Uint8Array(utf8.processJSString(data));
          FS.write(stream, buf, 0, buf.length, 0);
        } else if (opts.encoding === 'binary') {
          FS.write(stream, data, 0, data.length, 0);
        } else {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        FS.close(stream);
      },cwd:function () {
        return FS.currentPath;
      },chdir:function (path) {
        var lookup = FS.lookupPath(path, { follow: true });
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
        }
        var err = FS.nodePermissions(lookup.node, 'x');
        if (err) {
          throw new FS.ErrnoError(err);
        }
        FS.currentPath = lookup.path;
      },createDefaultDirectories:function () {
        FS.mkdir('/tmp');
      },createDefaultDevices:function () {
        // create /dev
        FS.mkdir('/dev');
        // setup /dev/null
        FS.registerDevice(FS.makedev(1, 3), {
          read: function() { return 0; },
          write: function() { return 0; }
        });
        FS.mkdev('/dev/null', FS.makedev(1, 3));
        // setup /dev/tty and /dev/tty1
        // stderr needs to print output using Module['printErr']
        // so we register a second tty just for it.
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev('/dev/tty', FS.makedev(5, 0));
        FS.mkdev('/dev/tty1', FS.makedev(6, 0));
        // we're not going to emulate the actual shm device,
        // just create the tmp dirs that reside in it commonly
        FS.mkdir('/dev/shm');
        FS.mkdir('/dev/shm/tmp');
      },createStandardStreams:function () {
        // TODO deprecate the old functionality of a single
        // input / output callback and that utilizes FS.createDevice
        // and instead require a unique set of stream ops
  
        // by default, we symlink the standard streams to the
        // default tty devices. however, if the standard streams
        // have been overwritten we create a unique device for
        // them instead.
        if (Module['stdin']) {
          FS.createDevice('/dev', 'stdin', Module['stdin']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdin');
        }
        if (Module['stdout']) {
          FS.createDevice('/dev', 'stdout', null, Module['stdout']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdout');
        }
        if (Module['stderr']) {
          FS.createDevice('/dev', 'stderr', null, Module['stderr']);
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr');
        }
  
        // open default streams for the stdin, stdout and stderr devices
        var stdin = FS.open('/dev/stdin', 'r');
        HEAP32[((_stdin)>>2)]=stdin.fd;
        assert(stdin.fd === 1, 'invalid handle for stdin (' + stdin.fd + ')');
  
        var stdout = FS.open('/dev/stdout', 'w');
        HEAP32[((_stdout)>>2)]=stdout.fd;
        assert(stdout.fd === 2, 'invalid handle for stdout (' + stdout.fd + ')');
  
        var stderr = FS.open('/dev/stderr', 'w');
        HEAP32[((_stderr)>>2)]=stderr.fd;
        assert(stderr.fd === 3, 'invalid handle for stderr (' + stderr.fd + ')');
      },ensureErrnoError:function () {
        if (FS.ErrnoError) return;
        FS.ErrnoError = function ErrnoError(errno) {
          this.errno = errno;
          for (var key in ERRNO_CODES) {
            if (ERRNO_CODES[key] === errno) {
              this.code = key;
              break;
            }
          }
          this.message = ERRNO_MESSAGES[errno];
        };
        FS.ErrnoError.prototype = new Error();
        FS.ErrnoError.prototype.constructor = FS.ErrnoError;
        // Some errors may happen quite a bit, to avoid overhead we reuse them (and suffer a lack of stack info)
        [ERRNO_CODES.ENOENT].forEach(function(code) {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = '<generic error, no stack>';
        });
      },staticInit:function () {
        FS.ensureErrnoError();
  
        FS.nameTable = new Array(4096);
  
        FS.root = FS.createNode(null, '/', 16384 | 0777, 0);
        FS.mount(MEMFS, {}, '/');
  
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
      },init:function (input, output, error) {
        assert(!FS.init.initialized, 'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)');
        FS.init.initialized = true;
  
        FS.ensureErrnoError();
  
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        Module['stdin'] = input || Module['stdin'];
        Module['stdout'] = output || Module['stdout'];
        Module['stderr'] = error || Module['stderr'];
  
        FS.createStandardStreams();
      },quit:function () {
        FS.init.initialized = false;
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      },getMode:function (canRead, canWrite) {
        var mode = 0;
        if (canRead) mode |= 292 | 73;
        if (canWrite) mode |= 146;
        return mode;
      },joinPath:function (parts, forceRelative) {
        var path = PATH.join.apply(null, parts);
        if (forceRelative && path[0] == '/') path = path.substr(1);
        return path;
      },absolutePath:function (relative, base) {
        return PATH.resolve(base, relative);
      },standardizePath:function (path) {
        return PATH.normalize(path);
      },findObject:function (path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (ret.exists) {
          return ret.object;
        } else {
          ___setErrNo(ret.error);
          return null;
        }
      },analyzePath:function (path, dontResolveLastLink) {
        // operate from within the context of the symlink's target
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {
        }
        var ret = {
          isRoot: false, exists: false, error: 0, name: null, path: null, object: null,
          parentExists: false, parentPath: null, parentObject: null
        };
        try {
          var lookup = FS.lookupPath(path, { parent: true });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === '/';
        } catch (e) {
          ret.error = e.errno;
        };
        return ret;
      },createFolder:function (parent, name, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.mkdir(path, mode);
      },createPath:function (parent, path, canRead, canWrite) {
        parent = typeof parent === 'string' ? parent : FS.getPath(parent);
        var parts = path.split('/').reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {
            // ignore EEXIST
          }
          parent = current;
        }
        return current;
      },createFile:function (parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.create(path, mode);
      },createDataFile:function (parent, name, data, canRead, canWrite, canOwn) {
        var path = name ? PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name) : parent;
        var mode = FS.getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data === 'string') {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
            data = arr;
          }
          // make sure we can write to the file
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 'w');
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
        return node;
      },createDevice:function (parent, name, input, output) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(!!input, !!output);
        if (!FS.createDevice.major) FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        // Create a fake device that a set of stream ops to emulate
        // the old behavior.
        FS.registerDevice(dev, {
          open: function(stream) {
            stream.seekable = false;
          },
          close: function(stream) {
            // flush any pending line data
            if (output && output.buffer && output.buffer.length) {
              output(10);
            }
          },
          read: function(stream, buffer, offset, length, pos /* ignored */) {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES.EIO);
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset+i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write: function(stream, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset+i]);
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES.EIO);
              }
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          }
        });
        return FS.mkdev(path, mode, dev);
      },createLink:function (parent, name, target, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        return FS.symlink(target, path);
      },forceLoadFile:function (obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        var success = true;
        if (typeof XMLHttpRequest !== 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else if (Module['read']) {
          // Command-line.
          try {
            // WARNING: Can't read binary files in V8's d8 or tracemonkey's js, as
            //          read() will try to parse UTF8.
            obj.contents = intArrayFromString(Module['read'](obj.url), true);
          } catch (e) {
            success = false;
          }
        } else {
          throw new Error('Cannot load without read() or XMLHttpRequest.');
        }
        if (!success) ___setErrNo(ERRNO_CODES.EIO);
        return success;
      },createLazyFile:function (parent, name, url, canRead, canWrite) {
        if (typeof XMLHttpRequest !== 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          // Lazy chunked Uint8Array (implements get and length from Uint8Array). Actual getting is abstracted away for eventual reuse.
          function LazyUint8Array() {
            this.lengthKnown = false;
            this.chunks = []; // Loaded chunks. Index is the chunk number
          }
          LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
            if (idx > this.length-1 || idx < 0) {
              return undefined;
            }
            var chunkOffset = idx % this.chunkSize;
            var chunkNum = Math.floor(idx / this.chunkSize);
            return this.getter(chunkNum)[chunkOffset];
          }
          LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
            this.getter = getter;
          }
          LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
              // Find length
              var xhr = new XMLHttpRequest();
              xhr.open('HEAD', url, false);
              xhr.send(null);
              if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
              var datalength = Number(xhr.getResponseHeader("Content-length"));
              var header;
              var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
              var chunkSize = 1024*1024; // Chunk size in bytes
  
              if (!hasByteServing) chunkSize = datalength;
  
              // Function to get a range from the remote URL.
              var doXHR = (function(from, to) {
                if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
                if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
  
                // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, false);
                if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
  
                // Some hints to the browser that we want binary data.
                if (typeof Uint8Array != 'undefined') xhr.responseType = 'arraybuffer';
                if (xhr.overrideMimeType) {
                  xhr.overrideMimeType('text/plain; charset=x-user-defined');
                }
  
                xhr.send(null);
                if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
                if (xhr.response !== undefined) {
                  return new Uint8Array(xhr.response || []);
                } else {
                  return intArrayFromString(xhr.responseText || '', true);
                }
              });
              var lazyArray = this;
              lazyArray.setDataGetter(function(chunkNum) {
                var start = chunkNum * chunkSize;
                var end = (chunkNum+1) * chunkSize - 1; // including this byte
                end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
                if (typeof(lazyArray.chunks[chunkNum]) === "undefined") {
                  lazyArray.chunks[chunkNum] = doXHR(start, end);
                }
                if (typeof(lazyArray.chunks[chunkNum]) === "undefined") throw new Error("doXHR failed!");
                return lazyArray.chunks[chunkNum];
              });
  
              this._length = datalength;
              this._chunkSize = chunkSize;
              this.lengthKnown = true;
          }
  
          var lazyArray = new LazyUint8Array();
          Object.defineProperty(lazyArray, "length", {
              get: function() {
                  if(!this.lengthKnown) {
                      this.cacheLength();
                  }
                  return this._length;
              }
          });
          Object.defineProperty(lazyArray, "chunkSize", {
              get: function() {
                  if(!this.lengthKnown) {
                      this.cacheLength();
                  }
                  return this._chunkSize;
              }
          });
  
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
  
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        // This is a total hack, but I want to get this lazy file code out of the
        // core of MEMFS. If we want to keep this lazy file concept I feel it should
        // be its own thin LAZYFS proxying calls to MEMFS.
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        // override each stream op with one that tries to force load the lazy file first
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach(function(key) {
          var fn = node.stream_ops[key];
          stream_ops[key] = function forceLoadLazyFile() {
            if (!FS.forceLoadFile(node)) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
            return fn.apply(null, arguments);
          };
        });
        // use a custom read function
        stream_ops.read = function stream_ops_read(stream, buffer, offset, length, position) {
          if (!FS.forceLoadFile(node)) {
            throw new FS.ErrnoError(ERRNO_CODES.EIO);
          }
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (contents.slice) { // normal array
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) { // LazyUint8Array from sync binary XHR
              buffer[offset + i] = contents.get(position + i);
            }
          }
          return size;
        };
        node.stream_ops = stream_ops;
        return node;
      },createPreloadedFile:function (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn) {
        Browser.init();
        // TODO we should allow people to just pass in a complete filename instead
        // of parent and name being that we just join them anyways
        var fullname = name ? PATH.resolve(PATH.join2(parent, name)) : parent;
        function processData(byteArray) {
          function finish(byteArray) {
            if (!dontCreateFile) {
              FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
            }
            if (onload) onload();
            removeRunDependency('cp ' + fullname);
          }
          var handled = false;
          Module['preloadPlugins'].forEach(function(plugin) {
            if (handled) return;
            if (plugin['canHandle'](fullname)) {
              plugin['handle'](byteArray, fullname, finish, function() {
                if (onerror) onerror();
                removeRunDependency('cp ' + fullname);
              });
              handled = true;
            }
          });
          if (!handled) finish(byteArray);
        }
        addRunDependency('cp ' + fullname);
        if (typeof url == 'string') {
          Browser.asyncLoad(url, function(byteArray) {
            processData(byteArray);
          }, onerror);
        } else {
          processData(url);
        }
      },indexedDB:function () {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      },DB_NAME:function () {
        return 'EM_FS_' + window.location.pathname;
      },DB_VERSION:20,DB_STORE_NAME:"FILE_DATA",saveFilesToDB:function (paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
          console.log('creating db');
          var db = openRequest.result;
          db.createObjectStore(FS.DB_STORE_NAME);
        };
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          var transaction = db.transaction([FS.DB_STORE_NAME], 'readwrite');
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var putRequest = files.put(FS.analyzePath(path).object.contents, path);
            putRequest.onsuccess = function putRequest_onsuccess() { ok++; if (ok + fail == total) finish() };
            putRequest.onerror = function putRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      },loadFilesFromDB:function (paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = onerror; // no database to load from
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          try {
            var transaction = db.transaction([FS.DB_STORE_NAME], 'readonly');
          } catch(e) {
            onerror(e);
            return;
          }
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var getRequest = files.get(path);
            getRequest.onsuccess = function getRequest_onsuccess() {
              if (FS.analyzePath(path).exists) {
                FS.unlink(path);
              }
              FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
              ok++;
              if (ok + fail == total) finish();
            };
            getRequest.onerror = function getRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      }};
  
  
  
  
  var _mkport=undefined;var SOCKFS={mount:function (mount) {
        return FS.createNode(null, '/', 16384 | 0777, 0);
      },createSocket:function (family, type, protocol) {
        var streaming = type == 1;
        if (protocol) {
          assert(streaming == (protocol == 6)); // if SOCK_STREAM, must be tcp
        }
  
        // create our internal socket structure
        var sock = {
          family: family,
          type: type,
          protocol: protocol,
          server: null,
          peers: {},
          pending: [],
          recv_queue: [],
          sock_ops: SOCKFS.websocket_sock_ops
        };
  
        // create the filesystem node to store the socket structure
        var name = SOCKFS.nextname();
        var node = FS.createNode(SOCKFS.root, name, 49152, 0);
        node.sock = sock;
  
        // and the wrapping stream that enables library functions such
        // as read and write to indirectly interact with the socket
        var stream = FS.createStream({
          path: name,
          node: node,
          flags: FS.modeStringToFlags('r+'),
          seekable: false,
          stream_ops: SOCKFS.stream_ops
        });
  
        // map the new stream to the socket structure (sockets have a 1:1
        // relationship with a stream)
        sock.stream = stream;
  
        return sock;
      },getSocket:function (fd) {
        var stream = FS.getStream(fd);
        if (!stream || !FS.isSocket(stream.node.mode)) {
          return null;
        }
        return stream.node.sock;
      },stream_ops:{poll:function (stream) {
          var sock = stream.node.sock;
          return sock.sock_ops.poll(sock);
        },ioctl:function (stream, request, varargs) {
          var sock = stream.node.sock;
          return sock.sock_ops.ioctl(sock, request, varargs);
        },read:function (stream, buffer, offset, length, position /* ignored */) {
          var sock = stream.node.sock;
          var msg = sock.sock_ops.recvmsg(sock, length);
          if (!msg) {
            // socket is closed
            return 0;
          }
          buffer.set(msg.buffer, offset);
          return msg.buffer.length;
        },write:function (stream, buffer, offset, length, position /* ignored */) {
          var sock = stream.node.sock;
          return sock.sock_ops.sendmsg(sock, buffer, offset, length);
        },close:function (stream) {
          var sock = stream.node.sock;
          sock.sock_ops.close(sock);
        }},nextname:function () {
        if (!SOCKFS.nextname.current) {
          SOCKFS.nextname.current = 0;
        }
        return 'socket[' + (SOCKFS.nextname.current++) + ']';
      },websocket_sock_ops:{createPeer:function (sock, addr, port) {
          var ws;
  
          if (typeof addr === 'object') {
            ws = addr;
            addr = null;
            port = null;
          }
  
          if (ws) {
            // for sockets that've already connected (e.g. we're the server)
            // we can inspect the _socket property for the address
            if (ws._socket) {
              addr = ws._socket.remoteAddress;
              port = ws._socket.remotePort;
            }
            // if we're just now initializing a connection to the remote,
            // inspect the url property
            else {
              var result = /ws[s]?:\/\/([^:]+):(\d+)/.exec(ws.url);
              if (!result) {
                throw new Error('WebSocket URL must be in the format ws(s)://address:port');
              }
              addr = result[1];
              port = parseInt(result[2], 10);
            }
          } else {
            // create the actual websocket object and connect
            try {
              var url = 'ws://' + addr + ':' + port;
              // the node ws library API is slightly different than the browser's
              var opts = ENVIRONMENT_IS_NODE ? {headers: {'websocket-protocol': ['binary']}} : ['binary'];
              // If node we use the ws library.
              var WebSocket = ENVIRONMENT_IS_NODE ? require('ws') : window['WebSocket'];
              ws = new WebSocket(url, opts);
              ws.binaryType = 'arraybuffer';
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EHOSTUNREACH);
            }
          }
  
  
          var peer = {
            addr: addr,
            port: port,
            socket: ws,
            dgram_send_queue: []
          };
  
          SOCKFS.websocket_sock_ops.addPeer(sock, peer);
          SOCKFS.websocket_sock_ops.handlePeerEvents(sock, peer);
  
          // if this is a bound dgram socket, send the port number first to allow
          // us to override the ephemeral port reported to us by remotePort on the
          // remote end.
          if (sock.type === 2 && typeof sock.sport !== 'undefined') {
            peer.dgram_send_queue.push(new Uint8Array([
                255, 255, 255, 255,
                'p'.charCodeAt(0), 'o'.charCodeAt(0), 'r'.charCodeAt(0), 't'.charCodeAt(0),
                ((sock.sport & 0xff00) >> 8) , (sock.sport & 0xff)
            ]));
          }
  
          return peer;
        },getPeer:function (sock, addr, port) {
          return sock.peers[addr + ':' + port];
        },addPeer:function (sock, peer) {
          sock.peers[peer.addr + ':' + peer.port] = peer;
        },removePeer:function (sock, peer) {
          delete sock.peers[peer.addr + ':' + peer.port];
        },handlePeerEvents:function (sock, peer) {
          var first = true;
  
          var handleOpen = function () {
            try {
              var queued = peer.dgram_send_queue.shift();
              while (queued) {
                peer.socket.send(queued);
                queued = peer.dgram_send_queue.shift();
              }
            } catch (e) {
              // not much we can do here in the way of proper error handling as we've already
              // lied and said this data was sent. shut it down.
              peer.socket.close();
            }
          };
  
          function handleMessage(data) {
            assert(typeof data !== 'string' && data.byteLength !== undefined);  // must receive an ArrayBuffer
            data = new Uint8Array(data);  // make a typed array view on the array buffer
  
  
            // if this is the port message, override the peer's port with it
            var wasfirst = first;
            first = false;
            if (wasfirst &&
                data.length === 10 &&
                data[0] === 255 && data[1] === 255 && data[2] === 255 && data[3] === 255 &&
                data[4] === 'p'.charCodeAt(0) && data[5] === 'o'.charCodeAt(0) && data[6] === 'r'.charCodeAt(0) && data[7] === 't'.charCodeAt(0)) {
              // update the peer's port and it's key in the peer map
              var newport = ((data[8] << 8) | data[9]);
              SOCKFS.websocket_sock_ops.removePeer(sock, peer);
              peer.port = newport;
              SOCKFS.websocket_sock_ops.addPeer(sock, peer);
              return;
            }
  
            sock.recv_queue.push({ addr: peer.addr, port: peer.port, data: data });
          };
  
          if (ENVIRONMENT_IS_NODE) {
            peer.socket.on('open', handleOpen);
            peer.socket.on('message', function(data, flags) {
              if (!flags.binary) {
                return;
              }
              handleMessage((new Uint8Array(data)).buffer);  // copy from node Buffer -> ArrayBuffer
            });
            peer.socket.on('error', function() {
              // don't throw
            });
          } else {
            peer.socket.onopen = handleOpen;
            peer.socket.onmessage = function peer_socket_onmessage(event) {
              handleMessage(event.data);
            };
          }
        },poll:function (sock) {
          if (sock.type === 1 && sock.server) {
            // listen sockets should only say they're available for reading
            // if there are pending clients.
            return sock.pending.length ? (64 | 1) : 0;
          }
  
          var mask = 0;
          var dest = sock.type === 1 ?  // we only care about the socket state for connection-based sockets
            SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport) :
            null;
  
          if (sock.recv_queue.length ||
              !dest ||  // connection-less sockets are always ready to read
              (dest && dest.socket.readyState === dest.socket.CLOSING) ||
              (dest && dest.socket.readyState === dest.socket.CLOSED)) {  // let recv return 0 once closed
            mask |= (64 | 1);
          }
  
          if (!dest ||  // connection-less sockets are always ready to write
              (dest && dest.socket.readyState === dest.socket.OPEN)) {
            mask |= 4;
          }
  
          if ((dest && dest.socket.readyState === dest.socket.CLOSING) ||
              (dest && dest.socket.readyState === dest.socket.CLOSED)) {
            mask |= 16;
          }
  
          return mask;
        },ioctl:function (sock, request, arg) {
          switch (request) {
            case 21531:
              var bytes = 0;
              if (sock.recv_queue.length) {
                bytes = sock.recv_queue[0].data.length;
              }
              HEAP32[((arg)>>2)]=bytes;
              return 0;
            default:
              return ERRNO_CODES.EINVAL;
          }
        },close:function (sock) {
          // if we've spawned a listen server, close it
          if (sock.server) {
            try {
              sock.server.close();
            } catch (e) {
            }
            sock.server = null;
          }
          // close any peer connections
          var peers = Object.keys(sock.peers);
          for (var i = 0; i < peers.length; i++) {
            var peer = sock.peers[peers[i]];
            try {
              peer.socket.close();
            } catch (e) {
            }
            SOCKFS.websocket_sock_ops.removePeer(sock, peer);
          }
          return 0;
        },bind:function (sock, addr, port) {
          if (typeof sock.saddr !== 'undefined' || typeof sock.sport !== 'undefined') {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);  // already bound
          }
          sock.saddr = addr;
          sock.sport = port || _mkport();
          // in order to emulate dgram sockets, we need to launch a listen server when
          // binding on a connection-less socket
          // note: this is only required on the server side
          if (sock.type === 2) {
            // close the existing server if it exists
            if (sock.server) {
              sock.server.close();
              sock.server = null;
            }
            // swallow error operation not supported error that occurs when binding in the
            // browser where this isn't supported
            try {
              sock.sock_ops.listen(sock, 0);
            } catch (e) {
              if (!(e instanceof FS.ErrnoError)) throw e;
              if (e.errno !== ERRNO_CODES.EOPNOTSUPP) throw e;
            }
          }
        },connect:function (sock, addr, port) {
          if (sock.server) {
            throw new FS.ErrnoError(ERRNO_CODS.EOPNOTSUPP);
          }
  
          // TODO autobind
          // if (!sock.addr && sock.type == 2) {
          // }
  
          // early out if we're already connected / in the middle of connecting
          if (typeof sock.daddr !== 'undefined' && typeof sock.dport !== 'undefined') {
            var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
            if (dest) {
              if (dest.socket.readyState === dest.socket.CONNECTING) {
                throw new FS.ErrnoError(ERRNO_CODES.EALREADY);
              } else {
                throw new FS.ErrnoError(ERRNO_CODES.EISCONN);
              }
            }
          }
  
          // add the socket to our peer list and set our
          // destination address / port to match
          var peer = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
          sock.daddr = peer.addr;
          sock.dport = peer.port;
  
          // always "fail" in non-blocking mode
          throw new FS.ErrnoError(ERRNO_CODES.EINPROGRESS);
        },listen:function (sock, backlog) {
          if (!ENVIRONMENT_IS_NODE) {
            throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
          }
          if (sock.server) {
             throw new FS.ErrnoError(ERRNO_CODES.EINVAL);  // already listening
          }
          var WebSocketServer = require('ws').Server;
          var host = sock.saddr;
          sock.server = new WebSocketServer({
            host: host,
            port: sock.sport
            // TODO support backlog
          });
  
          sock.server.on('connection', function(ws) {
            if (sock.type === 1) {
              var newsock = SOCKFS.createSocket(sock.family, sock.type, sock.protocol);
  
              // create a peer on the new socket
              var peer = SOCKFS.websocket_sock_ops.createPeer(newsock, ws);
              newsock.daddr = peer.addr;
              newsock.dport = peer.port;
  
              // push to queue for accept to pick up
              sock.pending.push(newsock);
            } else {
              // create a peer on the listen socket so calling sendto
              // with the listen socket and an address will resolve
              // to the correct client
              SOCKFS.websocket_sock_ops.createPeer(sock, ws);
            }
          });
          sock.server.on('closed', function() {
            sock.server = null;
          });
          sock.server.on('error', function() {
            // don't throw
          });
        },accept:function (listensock) {
          if (!listensock.server) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          var newsock = listensock.pending.shift();
          newsock.stream.flags = listensock.stream.flags;
          return newsock;
        },getname:function (sock, peer) {
          var addr, port;
          if (peer) {
            if (sock.daddr === undefined || sock.dport === undefined) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
            }
            addr = sock.daddr;
            port = sock.dport;
          } else {
            // TODO saddr and sport will be set for bind()'d UDP sockets, but what
            // should we be returning for TCP sockets that've been connect()'d?
            addr = sock.saddr || 0;
            port = sock.sport || 0;
          }
          return { addr: addr, port: port };
        },sendmsg:function (sock, buffer, offset, length, addr, port) {
          if (sock.type === 2) {
            // connection-less sockets will honor the message address,
            // and otherwise fall back to the bound destination address
            if (addr === undefined || port === undefined) {
              addr = sock.daddr;
              port = sock.dport;
            }
            // if there was no address to fall back to, error out
            if (addr === undefined || port === undefined) {
              throw new FS.ErrnoError(ERRNO_CODES.EDESTADDRREQ);
            }
          } else {
            // connection-based sockets will only use the bound
            addr = sock.daddr;
            port = sock.dport;
          }
  
          // find the peer for the destination address
          var dest = SOCKFS.websocket_sock_ops.getPeer(sock, addr, port);
  
          // early out if not connected with a connection-based socket
          if (sock.type === 1) {
            if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
            } else if (dest.socket.readyState === dest.socket.CONNECTING) {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
          }
  
          // create a copy of the incoming data to send, as the WebSocket API
          // doesn't work entirely with an ArrayBufferView, it'll just send
          // the entire underlying buffer
          var data;
          if (buffer instanceof Array || buffer instanceof ArrayBuffer) {
            data = buffer.slice(offset, offset + length);
          } else {  // ArrayBufferView
            data = buffer.buffer.slice(buffer.byteOffset + offset, buffer.byteOffset + offset + length);
          }
  
          // if we're emulating a connection-less dgram socket and don't have
          // a cached connection, queue the buffer to send upon connect and
          // lie, saying the data was sent now.
          if (sock.type === 2) {
            if (!dest || dest.socket.readyState !== dest.socket.OPEN) {
              // if we're not connected, open a new connection
              if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
                dest = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
              }
              dest.dgram_send_queue.push(data);
              return length;
            }
          }
  
          try {
            // send the actual data
            dest.socket.send(data);
            return length;
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
        },recvmsg:function (sock, length) {
          // http://pubs.opengroup.org/onlinepubs/7908799/xns/recvmsg.html
          if (sock.type === 1 && sock.server) {
            // tcp servers should not be recv()'ing on the listen socket
            throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
          }
  
          var queued = sock.recv_queue.shift();
          if (!queued) {
            if (sock.type === 1) {
              var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
  
              if (!dest) {
                // if we have a destination address but are not connected, error out
                throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
              }
              else if (dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
                // return null if the socket has closed
                return null;
              }
              else {
                // else, our socket is in a valid state but truly has nothing available
                throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
              }
            } else {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
          }
  
          // queued.data will be an ArrayBuffer if it's unadulterated, but if it's
          // requeued TCP data it'll be an ArrayBufferView
          var queuedLength = queued.data.byteLength || queued.data.length;
          var queuedOffset = queued.data.byteOffset || 0;
          var queuedBuffer = queued.data.buffer || queued.data;
          var bytesRead = Math.min(length, queuedLength);
          var res = {
            buffer: new Uint8Array(queuedBuffer, queuedOffset, bytesRead),
            addr: queued.addr,
            port: queued.port
          };
  
  
          // push back any unread data for TCP connections
          if (sock.type === 1 && bytesRead < queuedLength) {
            var bytesRemaining = queuedLength - bytesRead;
            queued.data = new Uint8Array(queuedBuffer, queuedOffset + bytesRead, bytesRemaining);
            sock.recv_queue.unshift(queued);
          }
  
          return res;
        }}};function _send(fd, buf, len, flags) {
      var sock = SOCKFS.getSocket(fd);
      if (!sock) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      // TODO honor flags
      return _write(fd, buf, len);
    }
  
  function _pwrite(fildes, buf, nbyte, offset) {
      // ssize_t pwrite(int fildes, const void *buf, size_t nbyte, off_t offset);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/write.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        var slab = HEAP8;
        return FS.write(stream, slab, buf, nbyte, offset);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _write(fildes, buf, nbyte) {
      // ssize_t write(int fildes, const void *buf, size_t nbyte);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/write.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
  
  
      try {
        var slab = HEAP8;
        return FS.write(stream, slab, buf, nbyte);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _fwrite(ptr, size, nitems, stream) {
      // size_t fwrite(const void *restrict ptr, size_t size, size_t nitems, FILE *restrict stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fwrite.html
      var bytesToWrite = nitems * size;
      if (bytesToWrite == 0) return 0;
      var bytesWritten = _write(stream, ptr, bytesToWrite);
      if (bytesWritten == -1) {
        var streamObj = FS.getStream(stream);
        if (streamObj) streamObj.error = true;
        return 0;
      } else {
        return Math.floor(bytesWritten / size);
      }
    }
  
  
   
  Module["_strlen"] = _strlen;
  
  function __reallyNegative(x) {
      return x < 0 || (x === 0 && (1/x) === -Infinity);
    }function __formatString(format, varargs) {
      var textIndex = format;
      var argIndex = 0;
      function getNextArg(type) {
        // NOTE: Explicitly ignoring type safety. Otherwise this fails:
        //       int x = 4; printf("%c\n", (char)x);
        var ret;
        if (type === 'double') {
          ret = HEAPF64[(((varargs)+(argIndex))>>3)];
        } else if (type == 'i64') {
          ret = [HEAP32[(((varargs)+(argIndex))>>2)],
                 HEAP32[(((varargs)+(argIndex+8))>>2)]];
          argIndex += 8; // each 32-bit chunk is in a 64-bit block
  
        } else {
          type = 'i32'; // varargs are always i32, i64, or double
          ret = HEAP32[(((varargs)+(argIndex))>>2)];
        }
        argIndex += Math.max(Runtime.getNativeFieldSize(type), Runtime.getAlignSize(type, null, true));
        return ret;
      }
  
      var ret = [];
      var curr, next, currArg;
      while(1) {
        var startTextIndex = textIndex;
        curr = HEAP8[(textIndex)];
        if (curr === 0) break;
        next = HEAP8[((textIndex+1)|0)];
        if (curr == 37) {
          // Handle flags.
          var flagAlwaysSigned = false;
          var flagLeftAlign = false;
          var flagAlternative = false;
          var flagZeroPad = false;
          var flagPadSign = false;
          flagsLoop: while (1) {
            switch (next) {
              case 43:
                flagAlwaysSigned = true;
                break;
              case 45:
                flagLeftAlign = true;
                break;
              case 35:
                flagAlternative = true;
                break;
              case 48:
                if (flagZeroPad) {
                  break flagsLoop;
                } else {
                  flagZeroPad = true;
                  break;
                }
              case 32:
                flagPadSign = true;
                break;
              default:
                break flagsLoop;
            }
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
          }
  
          // Handle width.
          var width = 0;
          if (next == 42) {
            width = getNextArg('i32');
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
          } else {
            while (next >= 48 && next <= 57) {
              width = width * 10 + (next - 48);
              textIndex++;
              next = HEAP8[((textIndex+1)|0)];
            }
          }
  
          // Handle precision.
          var precisionSet = false, precision = -1;
          if (next == 46) {
            precision = 0;
            precisionSet = true;
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
            if (next == 42) {
              precision = getNextArg('i32');
              textIndex++;
            } else {
              while(1) {
                var precisionChr = HEAP8[((textIndex+1)|0)];
                if (precisionChr < 48 ||
                    precisionChr > 57) break;
                precision = precision * 10 + (precisionChr - 48);
                textIndex++;
              }
            }
            next = HEAP8[((textIndex+1)|0)];
          }
          if (precision === -1) {
            precision = 6; // Standard default.
            precisionSet = false;
          }
  
          // Handle integer sizes. WARNING: These assume a 32-bit architecture!
          var argSize;
          switch (String.fromCharCode(next)) {
            case 'h':
              var nextNext = HEAP8[((textIndex+2)|0)];
              if (nextNext == 104) {
                textIndex++;
                argSize = 1; // char (actually i32 in varargs)
              } else {
                argSize = 2; // short (actually i32 in varargs)
              }
              break;
            case 'l':
              var nextNext = HEAP8[((textIndex+2)|0)];
              if (nextNext == 108) {
                textIndex++;
                argSize = 8; // long long
              } else {
                argSize = 4; // long
              }
              break;
            case 'L': // long long
            case 'q': // int64_t
            case 'j': // intmax_t
              argSize = 8;
              break;
            case 'z': // size_t
            case 't': // ptrdiff_t
            case 'I': // signed ptrdiff_t or unsigned size_t
              argSize = 4;
              break;
            default:
              argSize = null;
          }
          if (argSize) textIndex++;
          next = HEAP8[((textIndex+1)|0)];
  
          // Handle type specifier.
          switch (String.fromCharCode(next)) {
            case 'd': case 'i': case 'u': case 'o': case 'x': case 'X': case 'p': {
              // Integer.
              var signed = next == 100 || next == 105;
              argSize = argSize || 4;
              var currArg = getNextArg('i' + (argSize * 8));
              var argText;
              // Flatten i64-1 [low, high] into a (slightly rounded) double
              if (argSize == 8) {
                currArg = Runtime.makeBigInt(currArg[0], currArg[1], next == 117);
              }
              // Truncate to requested size.
              if (argSize <= 4) {
                var limit = Math.pow(256, argSize) - 1;
                currArg = (signed ? reSign : unSign)(currArg & limit, argSize * 8);
              }
              // Format the number.
              var currAbsArg = Math.abs(currArg);
              var prefix = '';
              if (next == 100 || next == 105) {
                argText = reSign(currArg, 8 * argSize, 1).toString(10);
              } else if (next == 117) {
                argText = unSign(currArg, 8 * argSize, 1).toString(10);
                currArg = Math.abs(currArg);
              } else if (next == 111) {
                argText = (flagAlternative ? '0' : '') + currAbsArg.toString(8);
              } else if (next == 120 || next == 88) {
                prefix = (flagAlternative && currArg != 0) ? '0x' : '';
                if (currArg < 0) {
                  // Represent negative numbers in hex as 2's complement.
                  currArg = -currArg;
                  argText = (currAbsArg - 1).toString(16);
                  var buffer = [];
                  for (var i = 0; i < argText.length; i++) {
                    buffer.push((0xF - parseInt(argText[i], 16)).toString(16));
                  }
                  argText = buffer.join('');
                  while (argText.length < argSize * 2) argText = 'f' + argText;
                } else {
                  argText = currAbsArg.toString(16);
                }
                if (next == 88) {
                  prefix = prefix.toUpperCase();
                  argText = argText.toUpperCase();
                }
              } else if (next == 112) {
                if (currAbsArg === 0) {
                  argText = '(nil)';
                } else {
                  prefix = '0x';
                  argText = currAbsArg.toString(16);
                }
              }
              if (precisionSet) {
                while (argText.length < precision) {
                  argText = '0' + argText;
                }
              }
  
              // Add sign if needed
              if (currArg >= 0) {
                if (flagAlwaysSigned) {
                  prefix = '+' + prefix;
                } else if (flagPadSign) {
                  prefix = ' ' + prefix;
                }
              }
  
              // Move sign to prefix so we zero-pad after the sign
              if (argText.charAt(0) == '-') {
                prefix = '-' + prefix;
                argText = argText.substr(1);
              }
  
              // Add padding.
              while (prefix.length + argText.length < width) {
                if (flagLeftAlign) {
                  argText += ' ';
                } else {
                  if (flagZeroPad) {
                    argText = '0' + argText;
                  } else {
                    prefix = ' ' + prefix;
                  }
                }
              }
  
              // Insert the result into the buffer.
              argText = prefix + argText;
              argText.split('').forEach(function(chr) {
                ret.push(chr.charCodeAt(0));
              });
              break;
            }
            case 'f': case 'F': case 'e': case 'E': case 'g': case 'G': {
              // Float.
              var currArg = getNextArg('double');
              var argText;
              if (isNaN(currArg)) {
                argText = 'nan';
                flagZeroPad = false;
              } else if (!isFinite(currArg)) {
                argText = (currArg < 0 ? '-' : '') + 'inf';
                flagZeroPad = false;
              } else {
                var isGeneral = false;
                var effectivePrecision = Math.min(precision, 20);
  
                // Convert g/G to f/F or e/E, as per:
                // http://pubs.opengroup.org/onlinepubs/9699919799/functions/printf.html
                if (next == 103 || next == 71) {
                  isGeneral = true;
                  precision = precision || 1;
                  var exponent = parseInt(currArg.toExponential(effectivePrecision).split('e')[1], 10);
                  if (precision > exponent && exponent >= -4) {
                    next = ((next == 103) ? 'f' : 'F').charCodeAt(0);
                    precision -= exponent + 1;
                  } else {
                    next = ((next == 103) ? 'e' : 'E').charCodeAt(0);
                    precision--;
                  }
                  effectivePrecision = Math.min(precision, 20);
                }
  
                if (next == 101 || next == 69) {
                  argText = currArg.toExponential(effectivePrecision);
                  // Make sure the exponent has at least 2 digits.
                  if (/[eE][-+]\d$/.test(argText)) {
                    argText = argText.slice(0, -1) + '0' + argText.slice(-1);
                  }
                } else if (next == 102 || next == 70) {
                  argText = currArg.toFixed(effectivePrecision);
                  if (currArg === 0 && __reallyNegative(currArg)) {
                    argText = '-' + argText;
                  }
                }
  
                var parts = argText.split('e');
                if (isGeneral && !flagAlternative) {
                  // Discard trailing zeros and periods.
                  while (parts[0].length > 1 && parts[0].indexOf('.') != -1 &&
                         (parts[0].slice(-1) == '0' || parts[0].slice(-1) == '.')) {
                    parts[0] = parts[0].slice(0, -1);
                  }
                } else {
                  // Make sure we have a period in alternative mode.
                  if (flagAlternative && argText.indexOf('.') == -1) parts[0] += '.';
                  // Zero pad until required precision.
                  while (precision > effectivePrecision++) parts[0] += '0';
                }
                argText = parts[0] + (parts.length > 1 ? 'e' + parts[1] : '');
  
                // Capitalize 'E' if needed.
                if (next == 69) argText = argText.toUpperCase();
  
                // Add sign.
                if (currArg >= 0) {
                  if (flagAlwaysSigned) {
                    argText = '+' + argText;
                  } else if (flagPadSign) {
                    argText = ' ' + argText;
                  }
                }
              }
  
              // Add padding.
              while (argText.length < width) {
                if (flagLeftAlign) {
                  argText += ' ';
                } else {
                  if (flagZeroPad && (argText[0] == '-' || argText[0] == '+')) {
                    argText = argText[0] + '0' + argText.slice(1);
                  } else {
                    argText = (flagZeroPad ? '0' : ' ') + argText;
                  }
                }
              }
  
              // Adjust case.
              if (next < 97) argText = argText.toUpperCase();
  
              // Insert the result into the buffer.
              argText.split('').forEach(function(chr) {
                ret.push(chr.charCodeAt(0));
              });
              break;
            }
            case 's': {
              // String.
              var arg = getNextArg('i8*');
              var argLength = arg ? _strlen(arg) : '(null)'.length;
              if (precisionSet) argLength = Math.min(argLength, precision);
              if (!flagLeftAlign) {
                while (argLength < width--) {
                  ret.push(32);
                }
              }
              if (arg) {
                for (var i = 0; i < argLength; i++) {
                  ret.push(HEAPU8[((arg++)|0)]);
                }
              } else {
                ret = ret.concat(intArrayFromString('(null)'.substr(0, argLength), true));
              }
              if (flagLeftAlign) {
                while (argLength < width--) {
                  ret.push(32);
                }
              }
              break;
            }
            case 'c': {
              // Character.
              if (flagLeftAlign) ret.push(getNextArg('i8'));
              while (--width > 0) {
                ret.push(32);
              }
              if (!flagLeftAlign) ret.push(getNextArg('i8'));
              break;
            }
            case 'n': {
              // Write the length written so far to the next parameter.
              var ptr = getNextArg('i32*');
              HEAP32[((ptr)>>2)]=ret.length;
              break;
            }
            case '%': {
              // Literal percent sign.
              ret.push(curr);
              break;
            }
            default: {
              // Unknown specifiers remain untouched.
              for (var i = startTextIndex; i < textIndex + 2; i++) {
                ret.push(HEAP8[(i)]);
              }
            }
          }
          textIndex += 2;
          // TODO: Support a/A (hex float) and m (last error) specifiers.
          // TODO: Support %1${specifier} for arg selection.
        } else {
          ret.push(curr);
          textIndex += 1;
        }
      }
      return ret;
    }function _fprintf(stream, format, varargs) {
      // int fprintf(FILE *restrict stream, const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      var result = __formatString(format, varargs);
      var stack = Runtime.stackSave();
      var ret = _fwrite(allocate(result, 'i8', ALLOC_STACK), 1, result.length, stream);
      Runtime.stackRestore(stack);
      return ret;
    }function _printf(format, varargs) {
      // int printf(const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      var stdout = HEAP32[((_stdout)>>2)];
      return _fprintf(stdout, format, varargs);
    }

  function _llvm_umul_with_overflow_i32(x, y) {
      x = x>>>0;
      y = y>>>0;
      return ((asm["setTempRet0"](x*y > 4294967295),(x*y)>>>0)|0);
    }

  
  function _llvm_eh_exception() {
      return HEAP32[((_llvm_eh_exception.buf)>>2)];
    }
  
  function __ZSt18uncaught_exceptionv() { // std::uncaught_exception()
      return !!__ZSt18uncaught_exceptionv.uncaught_exception;
    }
  
  
  
  function ___cxa_is_number_type(type) {
      var isNumber = false;
      try { if (type == __ZTIi) isNumber = true } catch(e){}
      try { if (type == __ZTIj) isNumber = true } catch(e){}
      try { if (type == __ZTIl) isNumber = true } catch(e){}
      try { if (type == __ZTIm) isNumber = true } catch(e){}
      try { if (type == __ZTIx) isNumber = true } catch(e){}
      try { if (type == __ZTIy) isNumber = true } catch(e){}
      try { if (type == __ZTIf) isNumber = true } catch(e){}
      try { if (type == __ZTId) isNumber = true } catch(e){}
      try { if (type == __ZTIe) isNumber = true } catch(e){}
      try { if (type == __ZTIc) isNumber = true } catch(e){}
      try { if (type == __ZTIa) isNumber = true } catch(e){}
      try { if (type == __ZTIh) isNumber = true } catch(e){}
      try { if (type == __ZTIs) isNumber = true } catch(e){}
      try { if (type == __ZTIt) isNumber = true } catch(e){}
      return isNumber;
    }function ___cxa_does_inherit(definiteType, possibilityType, possibility) {
      if (possibility == 0) return false;
      if (possibilityType == 0 || possibilityType == definiteType)
        return true;
      var possibility_type_info;
      if (___cxa_is_number_type(possibilityType)) {
        possibility_type_info = possibilityType;
      } else {
        var possibility_type_infoAddr = HEAP32[((possibilityType)>>2)] - 8;
        possibility_type_info = HEAP32[((possibility_type_infoAddr)>>2)];
      }
      switch (possibility_type_info) {
      case 0: // possibility is a pointer
        // See if definite type is a pointer
        var definite_type_infoAddr = HEAP32[((definiteType)>>2)] - 8;
        var definite_type_info = HEAP32[((definite_type_infoAddr)>>2)];
        if (definite_type_info == 0) {
          // Also a pointer; compare base types of pointers
          var defPointerBaseAddr = definiteType+8;
          var defPointerBaseType = HEAP32[((defPointerBaseAddr)>>2)];
          var possPointerBaseAddr = possibilityType+8;
          var possPointerBaseType = HEAP32[((possPointerBaseAddr)>>2)];
          return ___cxa_does_inherit(defPointerBaseType, possPointerBaseType, possibility);
        } else
          return false; // one pointer and one non-pointer
      case 1: // class with no base class
        return false;
      case 2: // class with base class
        var parentTypeAddr = possibilityType + 8;
        var parentType = HEAP32[((parentTypeAddr)>>2)];
        return ___cxa_does_inherit(definiteType, parentType, possibility);
      default:
        return false; // some unencountered type
      }
    }
  
  function ___resumeException(ptr) {
      if (HEAP32[((_llvm_eh_exception.buf)>>2)] == 0) HEAP32[((_llvm_eh_exception.buf)>>2)]=ptr;
      throw ptr + " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";;
    }function ___cxa_find_matching_catch(thrown, throwntype) {
      if (thrown == -1) thrown = HEAP32[((_llvm_eh_exception.buf)>>2)];
      if (throwntype == -1) throwntype = HEAP32[(((_llvm_eh_exception.buf)+(4))>>2)];
      var typeArray = Array.prototype.slice.call(arguments, 2);
  
      // If throwntype is a pointer, this means a pointer has been
      // thrown. When a pointer is thrown, actually what's thrown
      // is a pointer to the pointer. We'll dereference it.
      if (throwntype != 0 && !___cxa_is_number_type(throwntype)) {
        var throwntypeInfoAddr= HEAP32[((throwntype)>>2)] - 8;
        var throwntypeInfo= HEAP32[((throwntypeInfoAddr)>>2)];
        if (throwntypeInfo == 0)
          thrown = HEAP32[((thrown)>>2)];
      }
      // The different catch blocks are denoted by different types.
      // Due to inheritance, those types may not precisely match the
      // type of the thrown object. Find one which matches, and
      // return the type of the catch block which should be called.
      for (var i = 0; i < typeArray.length; i++) {
        if (___cxa_does_inherit(typeArray[i], throwntype, thrown))
          return ((asm["setTempRet0"](typeArray[i]),thrown)|0);
      }
      // Shouldn't happen unless we have bogus data in typeArray
      // or encounter a type for which emscripten doesn't have suitable
      // typeinfo defined. Best-efforts match just in case.
      return ((asm["setTempRet0"](throwntype),thrown)|0);
    }function ___gxx_personality_v0() {
    }

  function _emscripten_set_main_loop(func, fps, simulateInfiniteLoop) {
      Module['noExitRuntime'] = true;
  
      Browser.mainLoop.runner = function Browser_mainLoop_runner() {
        if (ABORT) return;
        if (Browser.mainLoop.queue.length > 0) {
          var start = Date.now();
          var blocker = Browser.mainLoop.queue.shift();
          blocker.func(blocker.arg);
          if (Browser.mainLoop.remainingBlockers) {
            var remaining = Browser.mainLoop.remainingBlockers;
            var next = remaining%1 == 0 ? remaining-1 : Math.floor(remaining);
            if (blocker.counted) {
              Browser.mainLoop.remainingBlockers = next;
            } else {
              // not counted, but move the progress along a tiny bit
              next = next + 0.5; // do not steal all the next one's progress
              Browser.mainLoop.remainingBlockers = (8*remaining + next)/9;
            }
          }
          console.log('main loop blocker "' + blocker.name + '" took ' + (Date.now() - start) + ' ms'); //, left: ' + Browser.mainLoop.remainingBlockers);
          Browser.mainLoop.updateStatus();
          setTimeout(Browser.mainLoop.runner, 0);
          return;
        }
        if (Browser.mainLoop.shouldPause) {
          // catch pauses from non-main loop sources
          Browser.mainLoop.paused = true;
          Browser.mainLoop.shouldPause = false;
          return;
        }
  
        // Signal GL rendering layer that processing of a new frame is about to start. This helps it optimize
        // VBO double-buffering and reduce GPU stalls.
  
        if (Module['preMainLoop']) {
          Module['preMainLoop']();
        }
  
        try {
          Runtime.dynCall('v', func);
        } catch (e) {
          if (e instanceof ExitStatus) {
            return;
          } else {
            if (e && typeof e === 'object' && e.stack) Module.printErr('exception thrown: ' + [e, e.stack]);
            throw e;
          }
        }
  
        if (Module['postMainLoop']) {
          Module['postMainLoop']();
        }
  
        if (Browser.mainLoop.shouldPause) {
          // catch pauses from the main loop itself
          Browser.mainLoop.paused = true;
          Browser.mainLoop.shouldPause = false;
          return;
        }
        Browser.mainLoop.scheduler();
      }
      if (fps && fps > 0) {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler() {
          setTimeout(Browser.mainLoop.runner, 1000/fps); // doing this each time means that on exception, we stop
        }
      } else {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler() {
          Browser.requestAnimationFrame(Browser.mainLoop.runner);
        }
      }
      Browser.mainLoop.scheduler();
  
      if (simulateInfiniteLoop) {
        throw 'SimulateInfiniteLoop';
      }
    }

  function _clock() {
      if (_clock.start === undefined) _clock.start = Date.now();
      return Math.floor((Date.now() - _clock.start) * (1000000/1000));
    }

  function _emscripten_run_script(ptr) {
      eval(Pointer_stringify(ptr));
    }

  function _emscripten_cancel_main_loop() {
      Browser.mainLoop.scheduler = null;
      Browser.mainLoop.shouldPause = true;
    }

  var _sqrtf=Math_sqrt;

  
  function _fputs(s, stream) {
      // int fputs(const char *restrict s, FILE *restrict stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fputs.html
      return _write(stream, s, _strlen(s));
    }
  
  function _fputc(c, stream) {
      // int fputc(int c, FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fputc.html
      var chr = unSign(c & 0xFF);
      HEAP8[((_fputc.ret)|0)]=chr;
      var ret = _write(stream, _fputc.ret, 1);
      if (ret == -1) {
        var streamObj = FS.getStream(stream);
        if (streamObj) streamObj.error = true;
        return -1;
      } else {
        return chr;
      }
    }function _puts(s) {
      // int puts(const char *s);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/puts.html
      // NOTE: puts() always writes an extra newline.
      var stdout = HEAP32[((_stdout)>>2)];
      var ret = _fputs(s, stdout);
      if (ret < 0) {
        return ret;
      } else {
        var newlineRet = _fputc(10, stdout);
        return (newlineRet < 0) ? -1 : ret + 1;
      }
    }

  
   
  Module["_memset"] = _memset;var _llvm_memset_p0i8_i64=_memset;

  
   
  Module["_memcpy"] = _memcpy;var _llvm_memcpy_p0i8_p0i8_i64=_memcpy;

  function ___assert_fail(condition, filename, line, func) {
      ABORT = true;
      throw 'Assertion failed: ' + Pointer_stringify(condition) + ', at: ' + [filename ? Pointer_stringify(filename) : 'unknown filename', line, func ? Pointer_stringify(func) : 'unknown function'] + ' at ' + stackTrace();
    }

  var _sinf=Math_sin;

  var _cosf=Math_cos;

  var _llvm_memset_p0i8_i32=_memset;

  var _llvm_memcpy_p0i8_p0i8_i32=_memcpy;

  function _llvm_lifetime_start() {}

  function ___cxa_begin_catch(ptr) {
      __ZSt18uncaught_exceptionv.uncaught_exception--;
      return ptr;
    }

  
  
  function __exit(status) {
      // void _exit(int status);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/exit.html
      Module['exit'](status);
    }function _exit(status) {
      __exit(status);
    }function __ZSt9terminatev() {
      _exit(-1234);
    }

  function _llvm_lifetime_end() {}

  var _floorf=Math_floor;

  function ___cxa_pure_virtual() {
      ABORT = true;
      throw 'Pure virtual function called!';
    }

  function __ZNSt9exceptionD2Ev() {}

  function _abort() {
      Module['abort']();
    }

  function ___errno_location() {
      return ___errno_state;
    }

  function _sbrk(bytes) {
      // Implement a Linux-like 'memory area' for our 'process'.
      // Changes the size of the memory area by |bytes|; returns the
      // address of the previous top ('break') of the memory area
      // We control the "dynamic" memory - DYNAMIC_BASE to DYNAMICTOP
      var self = _sbrk;
      if (!self.called) {
        DYNAMICTOP = alignMemoryPage(DYNAMICTOP); // make sure we start out aligned
        self.called = true;
        assert(Runtime.dynamicAlloc);
        self.alloc = Runtime.dynamicAlloc;
        Runtime.dynamicAlloc = function() { abort('cannot dynamically allocate, sbrk now has control') };
      }
      var ret = DYNAMICTOP;
      if (bytes != 0) self.alloc(bytes);
      return ret;  // Previous break location.
    }

  function _sysconf(name) {
      // long sysconf(int name);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/sysconf.html
      switch(name) {
        case 30: return PAGE_SIZE;
        case 132:
        case 133:
        case 12:
        case 137:
        case 138:
        case 15:
        case 235:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 149:
        case 13:
        case 10:
        case 236:
        case 153:
        case 9:
        case 21:
        case 22:
        case 159:
        case 154:
        case 14:
        case 77:
        case 78:
        case 139:
        case 80:
        case 81:
        case 79:
        case 82:
        case 68:
        case 67:
        case 164:
        case 11:
        case 29:
        case 47:
        case 48:
        case 95:
        case 52:
        case 51:
        case 46:
          return 200809;
        case 27:
        case 246:
        case 127:
        case 128:
        case 23:
        case 24:
        case 160:
        case 161:
        case 181:
        case 182:
        case 242:
        case 183:
        case 184:
        case 243:
        case 244:
        case 245:
        case 165:
        case 178:
        case 179:
        case 49:
        case 50:
        case 168:
        case 169:
        case 175:
        case 170:
        case 171:
        case 172:
        case 97:
        case 76:
        case 32:
        case 173:
        case 35:
          return -1;
        case 176:
        case 177:
        case 7:
        case 155:
        case 8:
        case 157:
        case 125:
        case 126:
        case 92:
        case 93:
        case 129:
        case 130:
        case 131:
        case 94:
        case 91:
          return 1;
        case 74:
        case 60:
        case 69:
        case 70:
        case 4:
          return 1024;
        case 31:
        case 42:
        case 72:
          return 32;
        case 87:
        case 26:
        case 33:
          return 2147483647;
        case 34:
        case 1:
          return 47839;
        case 38:
        case 36:
          return 99;
        case 43:
        case 37:
          return 2048;
        case 0: return 2097152;
        case 3: return 65536;
        case 28: return 32768;
        case 44: return 32767;
        case 75: return 16384;
        case 39: return 1000;
        case 89: return 700;
        case 71: return 256;
        case 40: return 255;
        case 2: return 100;
        case 180: return 64;
        case 25: return 20;
        case 5: return 16;
        case 6: return 6;
        case 73: return 4;
        case 84: return 1;
      }
      ___setErrNo(ERRNO_CODES.EINVAL);
      return -1;
    }

  function _time(ptr) {
      var ret = Math.floor(Date.now()/1000);
      if (ptr) {
        HEAP32[((ptr)>>2)]=ret;
      }
      return ret;
    }

  function ___cxa_allocate_exception(size) {
      return _malloc(size);
    }

  function ___cxa_throw(ptr, type, destructor) {
      if (!___cxa_throw.initialized) {
        try {
          HEAP32[((__ZTVN10__cxxabiv119__pointer_type_infoE)>>2)]=0; // Workaround for libcxxabi integration bug
        } catch(e){}
        try {
          HEAP32[((__ZTVN10__cxxabiv117__class_type_infoE)>>2)]=1; // Workaround for libcxxabi integration bug
        } catch(e){}
        try {
          HEAP32[((__ZTVN10__cxxabiv120__si_class_type_infoE)>>2)]=2; // Workaround for libcxxabi integration bug
        } catch(e){}
        ___cxa_throw.initialized = true;
      }
      HEAP32[((_llvm_eh_exception.buf)>>2)]=ptr;
      HEAP32[(((_llvm_eh_exception.buf)+(4))>>2)]=type;
      HEAP32[(((_llvm_eh_exception.buf)+(8))>>2)]=destructor;
      if (!("uncaught_exception" in __ZSt18uncaught_exceptionv)) {
        __ZSt18uncaught_exceptionv.uncaught_exception = 1;
      } else {
        __ZSt18uncaught_exceptionv.uncaught_exception++;
      }
      throw ptr + " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";;
    }

  function ___cxa_call_unexpected(exception) {
      Module.printErr('Unexpected exception thrown, this is not properly supported - aborting');
      ABORT = true;
      throw exception;
    }






  var Browser={mainLoop:{scheduler:null,shouldPause:false,paused:false,queue:[],pause:function () {
          Browser.mainLoop.shouldPause = true;
        },resume:function () {
          if (Browser.mainLoop.paused) {
            Browser.mainLoop.paused = false;
            Browser.mainLoop.scheduler();
          }
          Browser.mainLoop.shouldPause = false;
        },updateStatus:function () {
          if (Module['setStatus']) {
            var message = Module['statusMessage'] || 'Please wait...';
            var remaining = Browser.mainLoop.remainingBlockers;
            var expected = Browser.mainLoop.expectedBlockers;
            if (remaining) {
              if (remaining < expected) {
                Module['setStatus'](message + ' (' + (expected - remaining) + '/' + expected + ')');
              } else {
                Module['setStatus'](message);
              }
            } else {
              Module['setStatus']('');
            }
          }
        }},isFullScreen:false,pointerLock:false,moduleContextCreatedCallbacks:[],workers:[],init:function () {
        if (!Module["preloadPlugins"]) Module["preloadPlugins"] = []; // needs to exist even in workers
  
        if (Browser.initted || ENVIRONMENT_IS_WORKER) return;
        Browser.initted = true;
  
        try {
          new Blob();
          Browser.hasBlobConstructor = true;
        } catch(e) {
          Browser.hasBlobConstructor = false;
          console.log("warning: no blob constructor, cannot create blobs with mimetypes");
        }
        Browser.BlobBuilder = typeof MozBlobBuilder != "undefined" ? MozBlobBuilder : (typeof WebKitBlobBuilder != "undefined" ? WebKitBlobBuilder : (!Browser.hasBlobConstructor ? console.log("warning: no BlobBuilder") : null));
        Browser.URLObject = typeof window != "undefined" ? (window.URL ? window.URL : window.webkitURL) : undefined;
        if (!Module.noImageDecoding && typeof Browser.URLObject === 'undefined') {
          console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.");
          Module.noImageDecoding = true;
        }
  
        // Support for plugins that can process preloaded files. You can add more of these to
        // your app by creating and appending to Module.preloadPlugins.
        //
        // Each plugin is asked if it can handle a file based on the file's name. If it can,
        // it is given the file's raw data. When it is done, it calls a callback with the file's
        // (possibly modified) data. For example, a plugin might decompress a file, or it
        // might create some side data structure for use later (like an Image element, etc.).
  
        var imagePlugin = {};
        imagePlugin['canHandle'] = function imagePlugin_canHandle(name) {
          return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name);
        };
        imagePlugin['handle'] = function imagePlugin_handle(byteArray, name, onload, onerror) {
          var b = null;
          if (Browser.hasBlobConstructor) {
            try {
              b = new Blob([byteArray], { type: Browser.getMimetype(name) });
              if (b.size !== byteArray.length) { // Safari bug #118630
                // Safari's Blob can only take an ArrayBuffer
                b = new Blob([(new Uint8Array(byteArray)).buffer], { type: Browser.getMimetype(name) });
              }
            } catch(e) {
              Runtime.warnOnce('Blob constructor present but fails: ' + e + '; falling back to blob builder');
            }
          }
          if (!b) {
            var bb = new Browser.BlobBuilder();
            bb.append((new Uint8Array(byteArray)).buffer); // we need to pass a buffer, and must copy the array to get the right data range
            b = bb.getBlob();
          }
          var url = Browser.URLObject.createObjectURL(b);
          var img = new Image();
          img.onload = function img_onload() {
            assert(img.complete, 'Image ' + name + ' could not be decoded');
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            Module["preloadedImages"][name] = canvas;
            Browser.URLObject.revokeObjectURL(url);
            if (onload) onload(byteArray);
          };
          img.onerror = function img_onerror(event) {
            console.log('Image ' + url + ' could not be decoded');
            if (onerror) onerror();
          };
          img.src = url;
        };
        Module['preloadPlugins'].push(imagePlugin);
  
        var audioPlugin = {};
        audioPlugin['canHandle'] = function audioPlugin_canHandle(name) {
          return !Module.noAudioDecoding && name.substr(-4) in { '.ogg': 1, '.wav': 1, '.mp3': 1 };
        };
        audioPlugin['handle'] = function audioPlugin_handle(byteArray, name, onload, onerror) {
          var done = false;
          function finish(audio) {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = audio;
            if (onload) onload(byteArray);
          }
          function fail() {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = new Audio(); // empty shim
            if (onerror) onerror();
          }
          if (Browser.hasBlobConstructor) {
            try {
              var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
            } catch(e) {
              return fail();
            }
            var url = Browser.URLObject.createObjectURL(b); // XXX we never revoke this!
            var audio = new Audio();
            audio.addEventListener('canplaythrough', function() { finish(audio) }, false); // use addEventListener due to chromium bug 124926
            audio.onerror = function audio_onerror(event) {
              if (done) return;
              console.log('warning: browser could not fully decode audio ' + name + ', trying slower base64 approach');
              function encode64(data) {
                var BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
                var PAD = '=';
                var ret = '';
                var leftchar = 0;
                var leftbits = 0;
                for (var i = 0; i < data.length; i++) {
                  leftchar = (leftchar << 8) | data[i];
                  leftbits += 8;
                  while (leftbits >= 6) {
                    var curr = (leftchar >> (leftbits-6)) & 0x3f;
                    leftbits -= 6;
                    ret += BASE[curr];
                  }
                }
                if (leftbits == 2) {
                  ret += BASE[(leftchar&3) << 4];
                  ret += PAD + PAD;
                } else if (leftbits == 4) {
                  ret += BASE[(leftchar&0xf) << 2];
                  ret += PAD;
                }
                return ret;
              }
              audio.src = 'data:audio/x-' + name.substr(-3) + ';base64,' + encode64(byteArray);
              finish(audio); // we don't wait for confirmation this worked - but it's worth trying
            };
            audio.src = url;
            // workaround for chrome bug 124926 - we do not always get oncanplaythrough or onerror
            Browser.safeSetTimeout(function() {
              finish(audio); // try to use it even though it is not necessarily ready to play
            }, 10000);
          } else {
            return fail();
          }
        };
        Module['preloadPlugins'].push(audioPlugin);
  
        // Canvas event setup
  
        var canvas = Module['canvas'];
        canvas.requestPointerLock = canvas['requestPointerLock'] ||
                                    canvas['mozRequestPointerLock'] ||
                                    canvas['webkitRequestPointerLock'];
        canvas.exitPointerLock = document['exitPointerLock'] ||
                                 document['mozExitPointerLock'] ||
                                 document['webkitExitPointerLock'] ||
                                 function(){}; // no-op if function does not exist
        canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
  
        function pointerLockChange() {
          Browser.pointerLock = document['pointerLockElement'] === canvas ||
                                document['mozPointerLockElement'] === canvas ||
                                document['webkitPointerLockElement'] === canvas;
        }
  
        document.addEventListener('pointerlockchange', pointerLockChange, false);
        document.addEventListener('mozpointerlockchange', pointerLockChange, false);
        document.addEventListener('webkitpointerlockchange', pointerLockChange, false);
  
        if (Module['elementPointerLock']) {
          canvas.addEventListener("click", function(ev) {
            if (!Browser.pointerLock && canvas.requestPointerLock) {
              canvas.requestPointerLock();
              ev.preventDefault();
            }
          }, false);
        }
      },createContext:function (canvas, useWebGL, setInModule, webGLContextAttributes) {
        var ctx;
        try {
          if (useWebGL) {
            var contextAttributes = {
              antialias: false,
              alpha: false
            };
  
            if (webGLContextAttributes) {
              for (var attribute in webGLContextAttributes) {
                contextAttributes[attribute] = webGLContextAttributes[attribute];
              }
            }
  
  
            var errorInfo = '?';
            function onContextCreationError(event) {
              errorInfo = event.statusMessage || errorInfo;
            }
            canvas.addEventListener('webglcontextcreationerror', onContextCreationError, false);
            try {
              ['experimental-webgl', 'webgl'].some(function(webglId) {
                return ctx = canvas.getContext(webglId, contextAttributes);
              });
            } finally {
              canvas.removeEventListener('webglcontextcreationerror', onContextCreationError, false);
            }
          } else {
            ctx = canvas.getContext('2d');
          }
          if (!ctx) throw ':(';
        } catch (e) {
          Module.print('Could not create canvas: ' + [errorInfo, e]);
          return null;
        }
        if (useWebGL) {
          // Set the background of the WebGL canvas to black
          canvas.style.backgroundColor = "black";
  
          // Warn on context loss
          canvas.addEventListener('webglcontextlost', function(event) {
            alert('WebGL context lost. You will need to reload the page.');
          }, false);
        }
        if (setInModule) {
          GLctx = Module.ctx = ctx;
          Module.useWebGL = useWebGL;
          Browser.moduleContextCreatedCallbacks.forEach(function(callback) { callback() });
          Browser.init();
        }
        return ctx;
      },destroyContext:function (canvas, useWebGL, setInModule) {},fullScreenHandlersInstalled:false,lockPointer:undefined,resizeCanvas:undefined,requestFullScreen:function (lockPointer, resizeCanvas) {
        Browser.lockPointer = lockPointer;
        Browser.resizeCanvas = resizeCanvas;
        if (typeof Browser.lockPointer === 'undefined') Browser.lockPointer = true;
        if (typeof Browser.resizeCanvas === 'undefined') Browser.resizeCanvas = false;
  
        var canvas = Module['canvas'];
        function fullScreenChange() {
          Browser.isFullScreen = false;
          if ((document['webkitFullScreenElement'] || document['webkitFullscreenElement'] ||
               document['mozFullScreenElement'] || document['mozFullscreenElement'] ||
               document['fullScreenElement'] || document['fullscreenElement']) === canvas) {
            canvas.cancelFullScreen = document['cancelFullScreen'] ||
                                      document['mozCancelFullScreen'] ||
                                      document['webkitCancelFullScreen'];
            canvas.cancelFullScreen = canvas.cancelFullScreen.bind(document);
            if (Browser.lockPointer) canvas.requestPointerLock();
            Browser.isFullScreen = true;
            if (Browser.resizeCanvas) Browser.setFullScreenCanvasSize();
          } else if (Browser.resizeCanvas){
            Browser.setWindowedCanvasSize();
          }
          if (Module['onFullScreen']) Module['onFullScreen'](Browser.isFullScreen);
        }
  
        if (!Browser.fullScreenHandlersInstalled) {
          Browser.fullScreenHandlersInstalled = true;
          document.addEventListener('fullscreenchange', fullScreenChange, false);
          document.addEventListener('mozfullscreenchange', fullScreenChange, false);
          document.addEventListener('webkitfullscreenchange', fullScreenChange, false);
        }
  
        canvas.requestFullScreen = canvas['requestFullScreen'] ||
                                   canvas['mozRequestFullScreen'] ||
                                   (canvas['webkitRequestFullScreen'] ? function() { canvas['webkitRequestFullScreen'](Element['ALLOW_KEYBOARD_INPUT']) } : null);
        canvas.requestFullScreen();
      },requestAnimationFrame:function requestAnimationFrame(func) {
        if (typeof window === 'undefined') { // Provide fallback to setTimeout if window is undefined (e.g. in Node.js)
          setTimeout(func, 1000/60);
        } else {
          if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = window['requestAnimationFrame'] ||
                                           window['mozRequestAnimationFrame'] ||
                                           window['webkitRequestAnimationFrame'] ||
                                           window['msRequestAnimationFrame'] ||
                                           window['oRequestAnimationFrame'] ||
                                           window['setTimeout'];
          }
          window.requestAnimationFrame(func);
        }
      },safeCallback:function (func) {
        return function() {
          if (!ABORT) return func.apply(null, arguments);
        };
      },safeRequestAnimationFrame:function (func) {
        return Browser.requestAnimationFrame(function() {
          if (!ABORT) func();
        });
      },safeSetTimeout:function (func, timeout) {
        return setTimeout(function() {
          if (!ABORT) func();
        }, timeout);
      },safeSetInterval:function (func, timeout) {
        return setInterval(function() {
          if (!ABORT) func();
        }, timeout);
      },getMimetype:function (name) {
        return {
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'png': 'image/png',
          'bmp': 'image/bmp',
          'ogg': 'audio/ogg',
          'wav': 'audio/wav',
          'mp3': 'audio/mpeg'
        }[name.substr(name.lastIndexOf('.')+1)];
      },getUserMedia:function (func) {
        if(!window.getUserMedia) {
          window.getUserMedia = navigator['getUserMedia'] ||
                                navigator['mozGetUserMedia'];
        }
        window.getUserMedia(func);
      },getMovementX:function (event) {
        return event['movementX'] ||
               event['mozMovementX'] ||
               event['webkitMovementX'] ||
               0;
      },getMovementY:function (event) {
        return event['movementY'] ||
               event['mozMovementY'] ||
               event['webkitMovementY'] ||
               0;
      },mouseX:0,mouseY:0,mouseMovementX:0,mouseMovementY:0,calculateMouseEvent:function (event) { // event should be mousemove, mousedown or mouseup
        if (Browser.pointerLock) {
          // When the pointer is locked, calculate the coordinates
          // based on the movement of the mouse.
          // Workaround for Firefox bug 764498
          if (event.type != 'mousemove' &&
              ('mozMovementX' in event)) {
            Browser.mouseMovementX = Browser.mouseMovementY = 0;
          } else {
            Browser.mouseMovementX = Browser.getMovementX(event);
            Browser.mouseMovementY = Browser.getMovementY(event);
          }
          
          // check if SDL is available
          if (typeof SDL != "undefined") {
          	Browser.mouseX = SDL.mouseX + Browser.mouseMovementX;
          	Browser.mouseY = SDL.mouseY + Browser.mouseMovementY;
          } else {
          	// just add the mouse delta to the current absolut mouse position
          	// FIXME: ideally this should be clamped against the canvas size and zero
          	Browser.mouseX += Browser.mouseMovementX;
          	Browser.mouseY += Browser.mouseMovementY;
          }        
        } else {
          // Otherwise, calculate the movement based on the changes
          // in the coordinates.
          var rect = Module["canvas"].getBoundingClientRect();
          var x, y;
          
          // Neither .scrollX or .pageXOffset are defined in a spec, but
          // we prefer .scrollX because it is currently in a spec draft.
          // (see: http://www.w3.org/TR/2013/WD-cssom-view-20131217/)
          var scrollX = ((typeof window.scrollX !== 'undefined') ? window.scrollX : window.pageXOffset);
          var scrollY = ((typeof window.scrollY !== 'undefined') ? window.scrollY : window.pageYOffset);
          if (event.type == 'touchstart' ||
              event.type == 'touchend' ||
              event.type == 'touchmove') {
            var t = event.touches.item(0);
            if (t) {
              x = t.pageX - (scrollX + rect.left);
              y = t.pageY - (scrollY + rect.top);
            } else {
              return;
            }
          } else {
            x = event.pageX - (scrollX + rect.left);
            y = event.pageY - (scrollY + rect.top);
          }
  
          // the canvas might be CSS-scaled compared to its backbuffer;
          // SDL-using content will want mouse coordinates in terms
          // of backbuffer units.
          var cw = Module["canvas"].width;
          var ch = Module["canvas"].height;
          x = x * (cw / rect.width);
          y = y * (ch / rect.height);
  
          Browser.mouseMovementX = x - Browser.mouseX;
          Browser.mouseMovementY = y - Browser.mouseY;
          Browser.mouseX = x;
          Browser.mouseY = y;
        }
      },xhrLoad:function (url, onload, onerror) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function xhr_onload() {
          if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            onload(xhr.response);
          } else {
            onerror();
          }
        };
        xhr.onerror = onerror;
        xhr.send(null);
      },asyncLoad:function (url, onload, onerror, noRunDep) {
        Browser.xhrLoad(url, function(arrayBuffer) {
          assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
          onload(new Uint8Array(arrayBuffer));
          if (!noRunDep) removeRunDependency('al ' + url);
        }, function(event) {
          if (onerror) {
            onerror();
          } else {
            throw 'Loading data file "' + url + '" failed.';
          }
        });
        if (!noRunDep) addRunDependency('al ' + url);
      },resizeListeners:[],updateResizeListeners:function () {
        var canvas = Module['canvas'];
        Browser.resizeListeners.forEach(function(listener) {
          listener(canvas.width, canvas.height);
        });
      },setCanvasSize:function (width, height, noUpdates) {
        var canvas = Module['canvas'];
        canvas.width = width;
        canvas.height = height;
        if (!noUpdates) Browser.updateResizeListeners();
      },windowedWidth:0,windowedHeight:0,setFullScreenCanvasSize:function () {
        var canvas = Module['canvas'];
        this.windowedWidth = canvas.width;
        this.windowedHeight = canvas.height;
        canvas.width = screen.width;
        canvas.height = screen.height;
        // check if SDL is available   
        if (typeof SDL != "undefined") {
        	var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        	flags = flags | 0x00800000; // set SDL_FULLSCREEN flag
        	HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        }
        Browser.updateResizeListeners();
      },setWindowedCanvasSize:function () {
        var canvas = Module['canvas'];
        canvas.width = this.windowedWidth;
        canvas.height = this.windowedHeight;
        // check if SDL is available       
        if (typeof SDL != "undefined") {
        	var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        	flags = flags & ~0x00800000; // clear SDL_FULLSCREEN flag
        	HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        }
        Browser.updateResizeListeners();
      }};
FS.staticInit();__ATINIT__.unshift({ func: function() { if (!Module["noFSInit"] && !FS.init.initialized) FS.init() } });__ATMAIN__.push({ func: function() { FS.ignorePermissions = false } });__ATEXIT__.push({ func: function() { FS.quit() } });Module["FS_createFolder"] = FS.createFolder;Module["FS_createPath"] = FS.createPath;Module["FS_createDataFile"] = FS.createDataFile;Module["FS_createPreloadedFile"] = FS.createPreloadedFile;Module["FS_createLazyFile"] = FS.createLazyFile;Module["FS_createLink"] = FS.createLink;Module["FS_createDevice"] = FS.createDevice;
___errno_state = Runtime.staticAlloc(4); HEAP32[((___errno_state)>>2)]=0;
__ATINIT__.unshift({ func: function() { TTY.init() } });__ATEXIT__.push({ func: function() { TTY.shutdown() } });TTY.utf8 = new Runtime.UTF8Processor();
if (ENVIRONMENT_IS_NODE) { var fs = require("fs"); NODEFS.staticInit(); }
__ATINIT__.push({ func: function() { SOCKFS.root = FS.mount(SOCKFS, {}, null); } });
_llvm_eh_exception.buf = allocate(12, "void*", ALLOC_STATIC);
_fputc.ret = allocate([0], "i8", ALLOC_STATIC);
Module["requestFullScreen"] = function Module_requestFullScreen(lockPointer, resizeCanvas) { Browser.requestFullScreen(lockPointer, resizeCanvas) };
  Module["requestAnimationFrame"] = function Module_requestAnimationFrame(func) { Browser.requestAnimationFrame(func) };
  Module["setCanvasSize"] = function Module_setCanvasSize(width, height, noUpdates) { Browser.setCanvasSize(width, height, noUpdates) };
  Module["pauseMainLoop"] = function Module_pauseMainLoop() { Browser.mainLoop.pause() };
  Module["resumeMainLoop"] = function Module_resumeMainLoop() { Browser.mainLoop.resume() };
  Module["getUserMedia"] = function Module_getUserMedia() { Browser.getUserMedia() }
STACK_BASE = STACKTOP = Runtime.alignMemory(STATICTOP);

staticSealed = true; // seal the static portion of memory

STACK_MAX = STACK_BASE + 5242880;

DYNAMIC_BASE = DYNAMICTOP = Runtime.alignMemory(STACK_MAX);

assert(DYNAMIC_BASE < TOTAL_MEMORY, "TOTAL_MEMORY not big enough for stack");


var Math_min = Math.min;
function invoke_ii(index,a1) {
  try {
    return Module["dynCall_ii"](index,a1);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_viiiii(index,a1,a2,a3,a4,a5) {
  try {
    Module["dynCall_viiiii"](index,a1,a2,a3,a4,a5);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_vi(index,a1) {
  try {
    Module["dynCall_vi"](index,a1);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_vii(index,a1,a2) {
  try {
    Module["dynCall_vii"](index,a1,a2);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_iiii(index,a1,a2,a3) {
  try {
    return Module["dynCall_iiii"](index,a1,a2,a3);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_viii(index,a1,a2,a3) {
  try {
    Module["dynCall_viii"](index,a1,a2,a3);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_v(index) {
  try {
    Module["dynCall_v"](index);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_viif(index,a1,a2,a3) {
  try {
    Module["dynCall_viif"](index,a1,a2,a3);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_viiiiii(index,a1,a2,a3,a4,a5,a6) {
  try {
    Module["dynCall_viiiiii"](index,a1,a2,a3,a4,a5,a6);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_iii(index,a1,a2) {
  try {
    return Module["dynCall_iii"](index,a1,a2);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_iiiiii(index,a1,a2,a3,a4,a5) {
  try {
    return Module["dynCall_iiiiii"](index,a1,a2,a3,a4,a5);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_viiii(index,a1,a2,a3,a4) {
  try {
    Module["dynCall_viiii"](index,a1,a2,a3,a4);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function asmPrintInt(x, y) {
  Module.print('int ' + x + ',' + y);// + ' ' + new Error().stack);
}
function asmPrintFloat(x, y) {
  Module.print('float ' + x + ',' + y);// + ' ' + new Error().stack);
}
// EMSCRIPTEN_START_ASM
var asm=(function(global,env,buffer){"use asm";var a=new global.Int8Array(buffer);var b=new global.Int16Array(buffer);var c=new global.Int32Array(buffer);var d=new global.Uint8Array(buffer);var e=new global.Uint16Array(buffer);var f=new global.Uint32Array(buffer);var g=new global.Float32Array(buffer);var h=new global.Float64Array(buffer);var i=env.STACKTOP|0;var j=env.STACK_MAX|0;var k=env.tempDoublePtr|0;var l=env.ABORT|0;var m=env.__ZTVN10__cxxabiv120__si_class_type_infoE|0;var n=env.__ZTVN10__cxxabiv117__class_type_infoE|0;var o=env.__ZTISt9exception|0;var p=+env.NaN;var q=+env.Infinity;var r=0;var s=0;var t=0;var u=0;var v=0,w=0,x=0,y=0,z=0.0,A=0,B=0,C=0,D=0.0;var E=0;var F=0;var G=0;var H=0;var I=0;var J=0;var K=0;var L=0;var M=0;var N=0;var O=global.Math.floor;var P=global.Math.abs;var Q=global.Math.sqrt;var R=global.Math.pow;var S=global.Math.cos;var T=global.Math.sin;var U=global.Math.tan;var V=global.Math.acos;var W=global.Math.asin;var X=global.Math.atan;var Y=global.Math.atan2;var Z=global.Math.exp;var _=global.Math.log;var $=global.Math.ceil;var aa=global.Math.imul;var ba=env.abort;var ca=env.assert;var da=env.asmPrintInt;var ea=env.asmPrintFloat;var fa=env.min;var ga=env.invoke_ii;var ha=env.invoke_viiiii;var ia=env.invoke_vi;var ja=env.invoke_vii;var ka=env.invoke_iiii;var la=env.invoke_viii;var ma=env.invoke_v;var na=env.invoke_viif;var oa=env.invoke_viiiiii;var pa=env.invoke_iii;var qa=env.invoke_iiiiii;var ra=env.invoke_viiii;var sa=env._llvm_lifetime_end;var ta=env._cosf;var ua=env.___cxa_call_unexpected;var va=env.___assert_fail;var wa=env.___cxa_throw;var xa=env._abort;var ya=env._fprintf;var za=env._llvm_eh_exception;var Aa=env._printf;var Ba=env._fflush;var Ca=env.__reallyNegative;var Da=env._sqrtf;var Ea=env._fputc;var Fa=env._floorf;var Ga=env._puts;var Ha=env._clock;var Ia=env.___setErrNo;var Ja=env._fwrite;var Ka=env._send;var La=env._write;var Ma=env._fputs;var Na=env._llvm_umul_with_overflow_i32;var Oa=env._exit;var Pa=env.___cxa_find_matching_catch;var Qa=env.___cxa_allocate_exception;var Ra=env._emscripten_cancel_main_loop;var Sa=env._sysconf;var Ta=env.___cxa_pure_virtual;var Ua=env.___cxa_is_number_type;var Va=env._emscripten_set_main_loop;var Wa=env._time;var Xa=env.__formatString;var Ya=env.___cxa_does_inherit;var Za=env.__ZSt9terminatev;var _a=env.___cxa_begin_catch;var $a=env._sinf;var ab=env.__ZSt18uncaught_exceptionv;var bb=env._pwrite;var cb=env._sbrk;var db=env.__ZNSt9exceptionD2Ev;var eb=env.___errno_location;var fb=env.___gxx_personality_v0;var gb=env._llvm_lifetime_start;var hb=env.___resumeException;var ib=env.__exit;var jb=env._emscripten_run_script;var kb=0.0;
// EMSCRIPTEN_START_FUNCS
function xb(a){a=a|0;var b=0;b=i;i=i+a|0;i=i+7&-8;return b|0}function yb(){return i|0}function zb(a){a=a|0;i=a}function Ab(a,b){a=a|0;b=b|0;if((r|0)==0){r=a;s=b}}function Bb(b){b=b|0;a[k]=a[b];a[k+1|0]=a[b+1|0];a[k+2|0]=a[b+2|0];a[k+3|0]=a[b+3|0]}function Cb(b){b=b|0;a[k]=a[b];a[k+1|0]=a[b+1|0];a[k+2|0]=a[b+2|0];a[k+3|0]=a[b+3|0];a[k+4|0]=a[b+4|0];a[k+5|0]=a[b+5|0];a[k+6|0]=a[b+6|0];a[k+7|0]=a[b+7|0]}function Db(a){a=a|0;E=a}function Eb(a){a=a|0;F=a}function Fb(a){a=a|0;G=a}function Gb(a){a=a|0;H=a}function Hb(a){a=a|0;I=a}function Ib(a){a=a|0;J=a}function Jb(a){a=a|0;K=a}function Kb(a){a=a|0;L=a}function Lb(a){a=a|0;M=a}function Mb(a){a=a|0;N=a}function Nb(){c[1492]=n+8;c[1494]=m+8;c[1496]=o;c[1498]=m+8;c[1502]=m+8;c[1506]=m+8;c[1510]=n+8;c[1512]=n+8;c[1514]=m+8;c[1518]=m+8;c[1522]=m+8;c[1526]=m+8;c[1530]=m+8;c[1534]=n+8;c[1536]=m+8;c[1540]=n+8;c[1542]=m+8;c[1546]=m+8;c[1550]=m+8}function Ob(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,h=0.0,j=0.0,k=0,l=0.0,m=0,n=0.0;d=i;e=c[1938]|0;f=i;i=i+(e*4|0)|0;i=i+7&-8;k=(e|0)>0;do{if(k){m=0;j=0.0;do{l=+(c[b+(m<<2)>>2]|0)/1.0e6*1.0e3;g[f+(m<<2)>>2]=l;j=j+l;m=m+1|0;}while((m|0)<(e|0));h=+(e|0);j=j/h;g[a>>2]=j;if(k){l=0.0;k=0}else{l=0.0;break}do{n=+g[f+(k<<2)>>2]-j;l=l+n*n;k=k+1|0;}while((k|0)<(e|0))}else{h=+(e|0);g[a>>2]=0.0/h;l=0.0}}while(0);g[a+4>>2]=+Q(l/h);i=d;return}function Pb(b,d){b=b|0;d=d|0;var e=0,f=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0.0,u=0.0,v=0,w=0.0,x=0.0,y=0,z=0,A=0.0,B=0.0;e=i;i=i+336|0;k=e|0;j=e+8|0;n=e+64|0;m=e+112|0;l=e+120|0;h=e+128|0;f=e+280|0;a:do{if((b|0)>1){p=a[c[d+4>>2]|0]|0;switch(p|0){case 49:{c[1936]=5;c[1938]=35;q=5;p=35;break a};case 50:{c[1936]=32;c[1938]=161;q=32;p=161;break a};case 51:{o=5;break a};case 52:{c[1936]=320;c[1938]=2331;q=320;p=2331;break a};case 53:{c[1936]=640;c[1938]=5661;q=640;p=5661;break a};case 48:{y=0;i=e;return y|0};default:{Aa(4088,(y=i,i=i+8|0,c[y>>2]=p-48,y)|0)|0;i=y;y=-1;i=e;return y|0}}}else{o=5}}while(0);if((o|0)==5){c[1936]=64;c[1938]=333;q=64;p=333}o=p+q|0;c[1938]=o;c[1936]=0;o=Na(o|0,4)|0;c[1572]=af(E?-1:o)|0;g[k>>2]=0.0;g[k+4>>2]=-10.0;s=$e(103028)|0;Pc(s,k);c[1568]=s;Rc(s,0);c[j+44>>2]=0;gf(j+4|0,0,32)|0;a[j+36|0]=1;a[j+37|0]=1;a[j+38|0]=0;a[j+39|0]=0;c[j>>2]=0;a[j+40|0]=1;g[j+48>>2]=1.0;s=Qc(c[1568]|0,j)|0;c[n>>2]=5448;c[n+4>>2]=1;g[n+8>>2]=.009999999776482582;gf(n+28|0,0,18)|0;g[m>>2]=-40.0;g[m+4>>2]=0.0;g[l>>2]=40.0;g[l+4>>2]=0.0;Rb(n,m,l);rc(s,n|0,0.0)|0;c[h>>2]=5400;c[h+4>>2]=2;g[h+8>>2]=.009999999776482582;c[h+148>>2]=0;g[h+12>>2]=0.0;g[h+16>>2]=0.0;$b(h,.5,.5);s=f+44|0;m=f+36|0;r=f+4|0;p=f+37|0;o=f+38|0;l=f+39|0;q=f|0;k=f+40|0;j=f+48|0;n=f+4|0;h=h|0;t=.75;u=-7.0;v=0;while(1){x=t;w=u;y=v;while(1){c[s>>2]=0;gf(r|0,0,32)|0;a[m]=1;a[p]=1;a[o]=0;a[l]=0;a[k]=1;g[j>>2]=1.0;c[q>>2]=2;B=+w;A=+x;g[n>>2]=B;g[n+4>>2]=A;z=Qc(c[1568]|0,f)|0;rc(z,h,5.0)|0;c[1570]=z;y=y+1|0;if((y|0)<40){x=x+0.0;w=w+1.125}else{break}}v=v+1|0;if((v|0)<40){t=t+1.0;u=u+.5625}else{break}}if((c[1936]|0)>0){f=0;do{Uc(c[1568]|0,.01666666753590107,3,3);f=f+1|0;}while((f|0)<(c[1936]|0))}do{if((b|0)>2){z=(a[c[d+8>>2]|0]|0)-48|0;c[1574]=z;if((z|0)==0){break}Ga(8)|0;Va(2,60,1);z=0;i=e;return z|0}else{c[1574]=0}}while(0);while(1){Qb();if((c[1582]|0)>(c[1938]|0)){b=0;break}}i=e;return b|0}function Qb(){var a=0,b=0,d=0,e=0.0,f=0.0,j=0.0;a=i;i=i+8|0;b=a|0;d=c[1582]|0;if((d|0)>=(c[1938]|0)){c[1582]=d+1;Ob(b,c[1572]|0);j=+g[b+4>>2];f=+(c[8]|0)/1.0e6*1.0e3;e=+(c[10]|0)/1.0e6*1.0e3;Aa(2712,(d=i,i=i+32|0,h[d>>3]=+g[b>>2],h[d+8>>3]=j,h[d+16>>3]=f,h[d+24>>3]=e,d)|0)|0;i=d;jb(1584);if((c[1574]|0)==0){i=a;return}Ra();i=a;return}b=Ha()|0;Uc(c[1568]|0,.01666666753590107,3,3);b=(Ha()|0)-b|0;c[(c[1572]|0)+(c[1582]<<2)>>2]=b;if((b|0)<(c[8]|0)){c[8]=b}if((b|0)>(c[10]|0)){c[10]=b}c[1582]=(c[1582]|0)+1;i=a;return}function Rb(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0;g=d;f=b+12|0;d=c[g+4>>2]|0;c[f>>2]=c[g>>2];c[f+4>>2]=d;f=e;d=b+20|0;e=c[f+4>>2]|0;c[d>>2]=c[f>>2];c[d+4>>2]=e;a[b+44|0]=0;a[b+45|0]=0;return}function Sb(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;b=jc(b,48)|0;if((b|0)==0){b=0}else{c[b>>2]=5448;c[b+4>>2]=1;g[b+8>>2]=.009999999776482582;gf(b+28|0,0,18)|0}f=a+4|0;d=b+4|0;e=c[f+4>>2]|0;c[d>>2]=c[f>>2];c[d+4>>2]=e;hf(b+12|0,a+12|0,34)|0;return b|0}function Tb(a){a=a|0;return 1}function Ub(a,b,c){a=a|0;b=b|0;c=c|0;return 0}function Vb(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0.0,h=0.0,i=0.0,j=0.0,k=0.0,l=0.0,m=0.0,n=0.0,o=0.0,p=0.0,q=0.0,r=0.0,s=0.0;k=+g[d>>2];j=+g[c>>2]-k;i=+g[d+4>>2];f=+g[c+4>>2]-i;n=+g[d+12>>2];h=+g[d+8>>2];l=j*n+f*h;j=n*f-j*h;k=+g[c+8>>2]-k;i=+g[c+12>>2]-i;f=n*k+h*i-l;k=n*i-h*k-j;d=a+12|0;h=+g[d>>2];i=+g[d+4>>2];d=a+20|0;n=+g[d>>2];n=n-h;o=+g[d+4>>2]-i;r=-0.0-n;m=n*n+o*o;p=+Q(m);if(p<1.1920928955078125e-7){p=o}else{s=1.0/p;p=o*s;r=s*r}q=(i-j)*r+(h-l)*p;s=k*r+f*p;if(s==0.0){d=0;return d|0}s=q/s;if(s<0.0){d=0;return d|0}if(+g[c+16>>2]<s|m==0.0){d=0;return d|0}o=(n*(l+f*s-h)+o*(j+k*s-i))/m;if(o<0.0|o>1.0){d=0;return d|0}g[b+8>>2]=s;if(q>0.0){d=b;q=+(-0.0-p);s=+(-0.0-r);g[d>>2]=q;g[d+4>>2]=s;d=1;return d|0}else{d=b;q=+p;s=+r;g[d>>2]=q;g[d+4>>2]=s;d=1;return d|0}return 0}function Wb(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0.0,f=0.0,h=0.0,i=0.0,j=0.0,k=0.0,l=0.0,m=0.0;j=+g[c+12>>2];k=+g[a+12>>2];l=+g[c+8>>2];f=+g[a+16>>2];i=+g[c>>2];h=i+(j*k-l*f);m=+g[c+4>>2];f=k*l+j*f+m;k=+g[a+20>>2];e=+g[a+24>>2];i=i+(j*k-l*e);e=m+(l*k+j*e);j=+g[a+8>>2];a=b;k=+((h<i?h:i)-j);m=+((f<e?f:e)-j);g[a>>2]=k;g[a+4>>2]=m;b=b+8|0;h=+(j+(h>i?h:i));m=+(j+(f>e?f:e));g[b>>2]=h;g[b+4>>2]=m;return}function Xb(a,b,c){a=a|0;b=b|0;c=+c;var d=0,e=0.0;g[b>>2]=0.0;d=b+4|0;e=+((+g[a+12>>2]+ +g[a+20>>2])*.5);c=+((+g[a+16>>2]+ +g[a+24>>2])*.5);g[d>>2]=e;g[d+4>>2]=c;g[b+12>>2]=0.0;return}function Yb(a){a=a|0;return}function Zb(a){a=a|0;bf(a);return}function _b(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;b=jc(b,152)|0;if((b|0)==0){b=0}else{c[b>>2]=5400;c[b+4>>2]=2;g[b+8>>2]=.009999999776482582;c[b+148>>2]=0;g[b+12>>2]=0.0;g[b+16>>2]=0.0}f=a+4|0;d=b+4|0;e=c[f+4>>2]|0;c[d>>2]=c[f>>2];c[d+4>>2]=e;hf(b+12|0,a+12|0,140)|0;return b|0}function $b(a,b,d){a=a|0;b=+b;d=+d;var e=0.0,f=0.0;c[a+148>>2]=4;e=-0.0-b;f=-0.0-d;g[a+20>>2]=e;g[a+24>>2]=f;g[a+28>>2]=b;g[a+32>>2]=f;g[a+36>>2]=b;g[a+40>>2]=d;g[a+44>>2]=e;g[a+48>>2]=d;g[a+84>>2]=0.0;g[a+88>>2]=-1.0;g[a+92>>2]=1.0;g[a+96>>2]=0.0;g[a+100>>2]=0.0;g[a+104>>2]=1.0;g[a+108>>2]=-1.0;g[a+112>>2]=0.0;g[a+12>>2]=0.0;g[a+16>>2]=0.0;return}function ac(a){a=a|0;return 1}function bc(a,b,d){a=a|0;b=b|0;d=d|0;var e=0.0,f=0.0,h=0,i=0.0,j=0.0,k=0.0;i=+g[d>>2]- +g[b>>2];j=+g[d+4>>2]- +g[b+4>>2];k=+g[b+12>>2];f=+g[b+8>>2];e=i*k+j*f;f=k*j-i*f;b=c[a+148>>2]|0;if((b|0)>0){d=0}else{h=1;return h|0}while(1){h=d+1|0;if((e- +g[a+20+(d<<3)>>2])*+g[a+84+(d<<3)>>2]+(f- +g[a+20+(d<<3)+4>>2])*+g[a+84+(d<<3)+4>>2]>0.0){b=0;a=4;break}if((h|0)<(b|0)){d=h}else{b=1;a=4;break}}if((a|0)==4){return b|0}return 0}function cc(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var h=0.0,i=0.0,j=0.0,k=0.0,l=0,m=0.0,n=0,o=0,p=0.0,q=0.0,r=0.0,s=0.0;j=+g[e>>2];h=+g[d>>2]-j;q=+g[e+4>>2];i=+g[d+4>>2]-q;f=e+12|0;p=+g[f>>2];e=e+8|0;r=+g[e>>2];k=h*p+i*r;h=p*i-h*r;j=+g[d+8>>2]-j;q=+g[d+12>>2]-q;i=p*j+r*q-k;j=p*q-r*j-h;d=d+16|0;l=c[a+148>>2]|0;do{if((l|0)>0){p=+g[d>>2];n=-1;o=0;m=0.0;a:while(1){s=+g[a+84+(o<<3)>>2];r=+g[a+84+(o<<3)+4>>2];q=(+g[a+20+(o<<3)>>2]-k)*s+(+g[a+20+(o<<3)+4>>2]-h)*r;r=i*s+j*r;b:do{if(r==0.0){if(q<0.0){a=0;l=18;break a}}else{do{if(r<0.0){if(q>=m*r){break}m=q/r;n=o;break b}}while(0);if(r<=0.0){break}if(q>=p*r){break}p=q/r}}while(0);o=o+1|0;if(p<m){a=0;l=18;break}if((o|0)>=(l|0)){l=13;break}}if((l|0)==13){if(m>=0.0){break}va(1224,4040,249,4232);return 0}else if((l|0)==18){return a|0}}else{m=0.0;n=-1}}while(0);if(m>+g[d>>2]){va(1224,4040,249,4232);return 0}if((n|0)<=-1){o=0;return o|0}g[b+8>>2]=m;q=+g[f>>2];m=+g[a+84+(n<<3)>>2];p=+g[e>>2];s=+g[a+84+(n<<3)+4>>2];o=b;r=+(q*m-p*s);s=+(m*p+q*s);g[o>>2]=r;g[o+4>>2]=s;o=1;return o|0}function dc(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0.0,h=0.0,i=0.0,j=0.0,k=0.0,l=0.0,m=0.0,n=0.0,o=0.0,p=0.0,q=0.0;f=+g[d+12>>2];p=+g[a+20>>2];i=+g[d+8>>2];m=+g[a+24>>2];h=+g[d>>2];k=h+(f*p-i*m);j=+g[d+4>>2];m=p*i+f*m+j;d=c[a+148>>2]|0;if((d|0)>1){l=m;n=k;e=1;do{q=+g[a+20+(e<<3)>>2];o=+g[a+20+(e<<3)+4>>2];p=h+(f*q-i*o);o=q*i+f*o+j;n=n<p?n:p;l=l<o?l:o;k=k>p?k:p;m=m>o?m:o;e=e+1|0;}while((e|0)<(d|0))}else{l=m;n=k}q=+g[a+8>>2];e=b;o=+(n-q);p=+(l-q);g[e>>2]=o;g[e+4>>2]=p;e=b+8|0;p=+(k+q);q=+(m+q);g[e>>2]=p;g[e+4>>2]=q;return}function ec(a,b,d){a=a|0;b=b|0;d=+d;var e=0,f=0.0,h=0.0,i=0.0,j=0.0,k=0.0,l=0.0,m=0.0,n=0,o=0,p=0,q=0.0,r=0,s=0,t=0,u=0.0,v=0.0,w=0.0,x=0.0;e=c[a+148>>2]|0;if((e|0)>2){h=0.0;f=0.0;n=0}else{va(1160,4040,306,4240)}do{f=f+ +g[a+20+(n<<3)>>2];h=h+ +g[a+20+(n<<3)+4>>2];n=n+1|0;}while((n|0)<(e|0));k=1.0/+(e|0);f=f*k;k=h*k;s=a+20|0;n=a+24|0;h=0.0;i=0.0;r=0;l=0.0;j=0.0;do{m=+g[a+20+(r<<3)>>2]-f;q=+g[a+20+(r<<3)+4>>2]-k;r=r+1|0;p=(r|0)<(e|0);if(p){t=a+20+(r<<3)|0;o=a+20+(r<<3)+4|0}else{t=s;o=n}v=+g[t>>2]-f;u=+g[o>>2]-k;w=m*u-q*v;x=w*.5;j=j+x;x=x*.3333333432674408;i=i+(m+v)*x;h=h+(q+u)*x;l=l+w*.0833333358168602*(v*v+(m*m+m*v)+(u*u+(q*q+q*u)))}while(p);m=j*d;g[b>>2]=m;if(j>1.1920928955078125e-7){x=1.0/j;w=i*x;x=h*x;u=f+w;v=k+x;t=b+4|0;k=+u;q=+v;g[t>>2]=k;g[t+4>>2]=q;g[b+12>>2]=l*d+m*(u*u+v*v-(w*w+x*x));return}else{va(360,4040,352,4240)}}function fc(a){a=a|0;return}function gc(a){a=a|0;bf(a);return}function hc(b){b=b|0;var d=0,e=0,f=0;e=b+8|0;c[e>>2]=128;c[b+4>>2]=0;f=lc(1024)|0;c[b>>2]=f;gf(f|0,0,c[e>>2]<<3|0)|0;gf(b+12|0,0,56)|0;if((a[7080]&1)==0){e=0;b=1}else{return}do{if((e|0)>=14){d=3;break}if((b|0)>(c[6216+(e<<2)>>2]|0)){e=e+1|0;a[7088+b|0]=e}else{a[7088+b|0]=e}b=b+1|0;}while((b|0)<641);if((d|0)==3){va(3392,3904,73,4704)}a[7080]=1;return}function ic(a){a=a|0;var b=0,d=0,e=0;b=a+4|0;a=a|0;e=c[a>>2]|0;if((c[b>>2]|0)>0){d=0}else{mc(e);return}do{mc(c[e+(d<<3)+4>>2]|0);d=d+1|0;e=c[a>>2]|0}while((d|0)<(c[b>>2]|0));mc(e);return}function jc(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0;if((d|0)==0){j=0;return j|0}if((d|0)<=0){va(2648,3904,104,4728);return 0}if((d|0)>640){j=lc(d)|0;return j|0}j=a[7088+d|0]|0;f=j&255;if((j&255)>>>0>=14>>>0){va(1496,3904,112,4728);return 0}d=b+12+(f<<2)|0;e=c[d>>2]|0;if((e|0)!=0){c[d>>2]=c[e>>2];j=e;return j|0}e=b+4|0;g=c[e>>2]|0;h=b+8|0;b=b|0;if((g|0)==(c[h>>2]|0)){i=c[b>>2]|0;j=g+128|0;c[h>>2]=j;j=lc(j<<3)|0;c[b>>2]=j;g=i;hf(j|0,g|0,c[e>>2]<<3)|0;gf((c[b>>2]|0)+(c[e>>2]<<3)|0,0,1024)|0;mc(g);g=c[e>>2]|0}j=c[b>>2]|0;i=lc(16384)|0;b=j+(g<<3)+4|0;c[b>>2]=i;f=c[6216+(f<<2)>>2]|0;c[j+(g<<3)>>2]=f;g=16384/(f|0)|0;if((aa(g,f)|0)>=16385){va(944,3904,140,4728);return 0}g=g-1|0;if((g|0)>0){h=0;while(1){j=h+1|0;c[i+(aa(h,f)|0)>>2]=i+(aa(j,f)|0);i=c[b>>2]|0;if((j|0)<(g|0)){h=j}else{break}}}c[i+(aa(g,f)|0)>>2]=0;c[d>>2]=c[c[b>>2]>>2];c[e>>2]=(c[e>>2]|0)+1;j=c[b>>2]|0;return j|0}function kc(b,d,e){b=b|0;d=d|0;e=e|0;if((e|0)==0){return}if((e|0)<=0){va(2648,3904,164,4744)}if((e|0)>640){mc(d);return}e=a[7088+e|0]|0;if((e&255)>>>0>=14>>>0){va(1496,3904,173,4744)}e=b+12+((e&255)<<2)|0;c[d>>2]=c[e>>2];c[e>>2]=d;return}function lc(a){a=a|0;return Ze(a)|0}function mc(a){a=a|0;_e(a);return}function nc(d,e,f){d=d|0;e=e|0;f=f|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0.0;l=e+4|0;p=+g[l>>2];if(!(p==p&!(kb=0.0,kb!=kb)&p>-q&p<q)){va(2168,3576,27,4424)}p=+g[e+8>>2];if(!(p==p&!(kb=0.0,kb!=kb)&p>-q&p<q)){va(2168,3576,27,4424)}i=e+16|0;p=+g[i>>2];if(!(p==p&!(kb=0.0,kb!=kb)&p>-q&p<q)){va(2352,3576,28,4424)}p=+g[e+20>>2];if(!(p==p&!(kb=0.0,kb!=kb)&p>-q&p<q)){va(2352,3576,28,4424)}j=e+12|0;p=+g[j>>2];if(!(p==p&!(kb=0.0,kb!=kb)&p>-q&p<q)){va(1376,3576,29,4424)}k=e+24|0;p=+g[k>>2];if(!(p==p&!(kb=0.0,kb!=kb)&p>-q&p<q)){va(688,3576,30,4424)}h=e+32|0;p=+g[h>>2];if(p<0.0|p==p&!(kb=0.0,kb!=kb)&p>-q&p<q^1){va(408,3576,31,4424)}m=e+28|0;p=+g[m>>2];if(p<0.0|p==p&!(kb=0.0,kb!=kb)&p>-q&p<q^1){va(256,3576,32,4424)}n=d+4|0;b[n>>1]=0;o=(a[e+39|0]&1)==0?0:8;b[n>>1]=o;if((a[e+38|0]&1)!=0){o=o|16;b[n>>1]=o}if((a[e+36|0]&1)!=0){o=o|4;b[n>>1]=o}if((a[e+37|0]&1)!=0){o=o|2;b[n>>1]=o}if((a[e+40|0]&1)!=0){b[n>>1]=o|32}c[d+88>>2]=f;o=l;l=d+12|0;n=c[o>>2]|0;o=c[o+4>>2]|0;c[l>>2]=n;c[l+4>>2]=o;p=+g[j>>2];g[d+20>>2]=+T(p);g[d+24>>2]=+S(p);g[d+28>>2]=0.0;g[d+32>>2]=0.0;l=d+36|0;c[l>>2]=n;c[l+4>>2]=o;l=d+44|0;c[l>>2]=n;c[l+4>>2]=o;g[d+52>>2]=+g[j>>2];g[d+56>>2]=+g[j>>2];g[d+60>>2]=0.0;c[d+108>>2]=0;c[d+112>>2]=0;c[d+92>>2]=0;c[d+96>>2]=0;l=i;o=d+64|0;n=c[l+4>>2]|0;c[o>>2]=c[l>>2];c[o+4>>2]=n;g[d+72>>2]=+g[k>>2];g[d+132>>2]=+g[m>>2];g[d+136>>2]=+g[h>>2];g[d+140>>2]=+g[e+48>>2];g[d+76>>2]=0.0;g[d+80>>2]=0.0;g[d+84>>2]=0.0;g[d+144>>2]=0.0;o=c[e>>2]|0;c[d>>2]=o;h=d+116|0;if((o|0)==2){g[h>>2]=1.0;g[d+120>>2]=1.0;n=d+124|0;g[n>>2]=0.0;n=d+128|0;g[n>>2]=0.0;n=e+44|0;n=c[n>>2]|0;o=d+148|0;c[o>>2]=n;o=d+100|0;c[o>>2]=0;o=d+104|0;c[o>>2]=0;return}else{g[h>>2]=0.0;g[d+120>>2]=0.0;n=d+124|0;g[n>>2]=0.0;n=d+128|0;g[n>>2]=0.0;n=e+44|0;n=c[n>>2]|0;o=d+148|0;c[o>>2]=n;o=d+100|0;c[o>>2]=0;o=d+104|0;c[o>>2]=0;return}}function oc(a){a=a|0;var d=0,e=0,f=0.0,h=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0.0,u=0.0,v=0.0,w=0.0,x=0,y=0.0,z=0,A=0.0;l=i;i=i+16|0;o=l|0;n=a+116|0;m=a+120|0;d=a+124|0;j=a+128|0;h=a+28|0;g[h>>2]=0.0;g[a+32>>2]=0.0;gf(n|0,0,16)|0;p=c[a>>2]|0;if((p|0)==0|(p|0)==1){s=a+12|0;x=a+36|0;r=c[s>>2]|0;s=c[s+4>>2]|0;c[x>>2]=r;c[x+4>>2]=s;x=a+44|0;c[x>>2]=r;c[x+4>>2]=s;g[a+52>>2]=+g[a+56>>2];i=l;return}else if((p|0)==2){x=6400;w=+g[x>>2];u=+g[x+4>>2];x=c[a+100>>2]|0;do{if((x|0)==0){t=0.0;e=11}else{r=o|0;p=o+4|0;q=o+8|0;s=o+12|0;v=0.0;t=0.0;do{y=+g[x>>2];if(y!=0.0){z=c[x+12>>2]|0;sb[c[(c[z>>2]|0)+28>>2]&7](z,o,y);t=+g[r>>2];v=t+ +g[n>>2];g[n>>2]=v;w=w+t*+g[p>>2];u=u+t*+g[q>>2];t=+g[s>>2]+ +g[d>>2];g[d>>2]=t}x=c[x+4>>2]|0;}while((x|0)!=0);if(v<=0.0){e=11;break}y=1.0/v;g[m>>2]=y;w=w*y;u=u*y}}while(0);if((e|0)==11){g[n>>2]=1.0;g[m>>2]=1.0;v=1.0}do{if(t>0.0){if((b[a+4>>1]&16)!=0){e=17;break}t=t-(u*u+w*w)*v;g[d>>2]=t;if(t>0.0){f=1.0/t;break}else{va(3816,3576,319,4432)}}else{e=17}}while(0);if((e|0)==17){g[d>>2]=0.0;f=0.0}g[j>>2]=f;z=a+44|0;y=+g[z>>2];t=+g[z+4>>2];x=h;A=+w;f=+u;g[x>>2]=A;g[x+4>>2]=f;f=+g[a+24>>2];A=+g[a+20>>2];v=+g[a+12>>2]+(f*w-A*u);u=w*A+f*u+ +g[a+16>>2];x=(g[k>>2]=v,c[k>>2]|0);x=x|0;w=+u;c[z>>2]=x;g[z+4>>2]=w;z=a+36|0;c[z>>2]=x;g[z+4>>2]=w;w=+g[a+72>>2];z=a+64|0;g[z>>2]=+g[z>>2]-w*(u-t);z=a+68|0;g[z>>2]=w*(v-y)+ +g[z>>2];i=l;return}else{va(3976,3576,284,4432)}}function pc(a){a=a|0;var b=0,d=0,e=0,f=0,h=0.0,j=0.0,k=0.0,l=0.0,m=0.0;b=i;i=i+16|0;e=b|0;k=+g[a+52>>2];l=+T(k);g[e+8>>2]=l;k=+S(k);g[e+12>>2]=k;m=+g[a+28>>2];h=+g[a+32>>2];d=e;j=+(+g[a+36>>2]-(k*m-l*h));h=+(+g[a+40>>2]-(m*l+k*h));g[d>>2]=j;g[d+4>>2]=h;d=(c[a+88>>2]|0)+102872|0;f=c[a+100>>2]|0;if((f|0)==0){i=b;return}a=a+12|0;do{Oc(f,d,e,a);f=c[f+4>>2]|0;}while((f|0)!=0);i=b;return}function qc(a,d){a=a|0;d=d|0;var e=0,f=0,h=0;e=a+88|0;f=c[e>>2]|0;if((c[f+102868>>2]&2|0)!=0){va(168,3576,153,4448);return 0}f=f|0;h=jc(f,44)|0;if((h|0)==0){h=0}else{Lc(h)}Mc(h,f,a,d);if((b[a+4>>1]&32)!=0){Nc(h,(c[e>>2]|0)+102872|0,a+12|0)}f=a+100|0;c[h+4>>2]=c[f>>2];c[f>>2]=h;f=a+104|0;c[f>>2]=(c[f>>2]|0)+1;c[h+8>>2]=a;if(+g[h>>2]<=0.0){f=c[e>>2]|0;f=f+102868|0;d=c[f>>2]|0;d=d|1;c[f>>2]=d;return h|0}oc(a);f=c[e>>2]|0;f=f+102868|0;d=c[f>>2]|0;d=d|1;c[f>>2]=d;return h|0}function rc(d,e,f){d=d|0;e=e|0;f=+f;var h=0,j=0;h=i;i=i+32|0;j=h|0;b[j+22>>1]=1;b[j+24>>1]=-1;b[j+26>>1]=0;c[j+4>>2]=0;g[j+8>>2]=.20000000298023224;g[j+12>>2]=0.0;a[j+20|0]=0;c[j>>2]=e;g[j+16>>2]=f;e=qc(d,j)|0;i=h;return e|0}function sc(b,d){b=b|0;d=d|0;do{if((c[b>>2]|0)!=2){if((c[d>>2]|0)==2){break}else{d=0}return d|0}}while(0);b=c[b+108>>2]|0;if((b|0)==0){b=1;return b|0}while(1){if((c[b>>2]|0)==(d|0)){if((a[(c[b+4>>2]|0)+61|0]&1)==0){d=0;b=7;break}}b=c[b+12>>2]|0;if((b|0)==0){d=1;b=7;break}}if((b|0)==7){return d|0}return 0}function tc(a){a=a|0;return}function uc(a){a=a|0;Yc(a|0);c[a+60>>2]=0;c[a+64>>2]=0;c[a+68>>2]=56;c[a+72>>2]=48;c[a+76>>2]=0;return}function vc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[(c[b+48>>2]|0)+8>>2]|0;d=c[(c[b+52>>2]|0)+8>>2]|0;f=c[a+72>>2]|0;do{if((f|0)!=0){if((c[b+4>>2]&2|0)==0){break}ob[c[(c[f>>2]|0)+12>>2]&31](f,b)}}while(0);g=b+8|0;h=c[g>>2]|0;f=b+12|0;if((h|0)!=0){c[h+12>>2]=c[f>>2]}h=c[f>>2]|0;if((h|0)!=0){c[h+8>>2]=c[g>>2]}g=a+60|0;if((c[g>>2]|0)==(b|0)){c[g>>2]=c[f>>2]}g=b+24|0;h=c[g>>2]|0;f=b+28|0;if((h|0)!=0){c[h+12>>2]=c[f>>2]}h=c[f>>2]|0;if((h|0)!=0){c[h+8>>2]=c[g>>2]}e=e+112|0;if((b+16|0)==(c[e>>2]|0)){c[e>>2]=c[f>>2]}f=b+40|0;g=c[f>>2]|0;e=b+44|0;if((g|0)!=0){c[g+12>>2]=c[e>>2]}g=c[e>>2]|0;if((g|0)!=0){c[g+8>>2]=c[f>>2]}d=d+112|0;if((b+32|0)!=(c[d>>2]|0)){h=a+76|0;h=c[h>>2]|0;zd(b,h);h=a+64|0;g=c[h>>2]|0;g=g-1|0;c[h>>2]=g;return}c[d>>2]=c[e>>2];h=a+76|0;h=c[h>>2]|0;zd(b,h);h=a+64|0;g=c[h>>2]|0;g=g-1|0;c[h>>2]=g;return}function wc(a){a=a|0;var d=0,e=0,f=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;j=c[a+60>>2]|0;if((j|0)==0){return}i=a+12|0;h=a+4|0;f=a+72|0;e=a+68|0;a:while(1){n=c[j+48>>2]|0;l=c[j+52>>2]|0;m=c[j+56>>2]|0;k=c[j+60>>2]|0;q=c[n+8>>2]|0;o=c[l+8>>2]|0;r=j+4|0;b:do{if((c[r>>2]&8|0)==0){d=11}else{if(!(sc(o,q)|0)){r=c[j+12>>2]|0;vc(a,j);j=r;break}p=c[e>>2]|0;do{if((p|0)!=0){if(pb[c[(c[p>>2]|0)+8>>2]&15](p,n,l)|0){break}r=c[j+12>>2]|0;vc(a,j);j=r;break b}}while(0);c[r>>2]=c[r>>2]&-9;d=11}}while(0);do{if((d|0)==11){d=0;if((b[q+4>>1]&2)==0){p=0}else{p=(c[q>>2]|0)!=0|0}if((b[o+4>>1]&2)==0){o=1}else{o=(c[o>>2]|0)==0}if((p|0)==0&o){j=c[j+12>>2]|0;break}m=c[(c[n+24>>2]|0)+(m*28|0)+24>>2]|0;k=c[(c[l+24>>2]|0)+(k*28|0)+24>>2]|0;if((m|0)<=-1){d=19;break a}l=c[i>>2]|0;if((l|0)<=(m|0)){d=19;break a}n=c[h>>2]|0;if(!((k|0)>-1&(l|0)>(k|0))){d=21;break a}if(+g[n+(k*36|0)>>2]- +g[n+(m*36|0)+8>>2]>0.0|+g[n+(k*36|0)+4>>2]- +g[n+(m*36|0)+12>>2]>0.0|+g[n+(m*36|0)>>2]- +g[n+(k*36|0)+8>>2]>0.0|+g[n+(m*36|0)+4>>2]- +g[n+(k*36|0)+12>>2]>0.0){r=c[j+12>>2]|0;vc(a,j);j=r;break}else{Bd(j,c[f>>2]|0);j=c[j+12>>2]|0;break}}}while(0);if((j|0)==0){d=25;break}}if((d|0)==19){va(1272,2216,159,4272)}else if((d|0)==21){va(1272,2216,159,4272)}else if((d|0)==25){return}}function xc(a){a=a|0;yc(a|0,a);return}function yc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=i;i=i+8|0;g=d|0;e=a+52|0;c[e>>2]=0;f=a+40|0;q=c[f>>2]|0;do{if((q|0)>0){k=a+32|0;l=a+56|0;m=a|0;n=a+12|0;j=a+4|0;o=0;while(1){p=c[(c[k>>2]|0)+(o<<2)>>2]|0;c[l>>2]=p;if((p|0)!=-1){if((p|0)<=-1){j=6;break}if((c[n>>2]|0)<=(p|0)){j=6;break}Ac(m,a,(c[j>>2]|0)+(p*36|0)|0);q=c[f>>2]|0}o=o+1|0;if((o|0)>=(q|0)){j=9;break}}if((j|0)==6){va(1272,2216,159,4272)}else if((j|0)==9){h=c[e>>2]|0;break}}else{h=0}}while(0);c[f>>2]=0;f=a+44|0;q=c[f>>2]|0;c[g>>2]=4;Cc(q,q+(h*12|0)|0,g);if((c[e>>2]|0)<=0){i=d;return}g=a+12|0;h=a+4|0;k=0;a:while(1){j=c[f>>2]|0;a=j+(k*12|0)|0;l=c[a>>2]|0;if((l|0)<=-1){j=14;break}m=c[g>>2]|0;if((m|0)<=(l|0)){j=14;break}n=c[h>>2]|0;j=j+(k*12|0)+4|0;o=c[j>>2]|0;if(!((o|0)>-1&(m|0)>(o|0))){j=16;break}zc(b,c[n+(l*36|0)+16>>2]|0,c[n+(o*36|0)+16>>2]|0);l=c[e>>2]|0;while(1){k=k+1|0;if((k|0)>=(l|0)){j=21;break a}m=c[f>>2]|0;if((c[m+(k*12|0)>>2]|0)!=(c[a>>2]|0)){continue a}if((c[m+(k*12|0)+4>>2]|0)!=(c[j>>2]|0)){continue a}}}if((j|0)==14){va(1272,2216,153,4256)}else if((j|0)==16){va(1272,2216,153,4256)}else if((j|0)==21){i=d;return}}function zc(a,d,e){a=a|0;d=d|0;e=e|0;var f=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;f=c[d+16>>2]|0;h=c[e+16>>2]|0;d=c[d+20>>2]|0;e=c[e+20>>2]|0;j=c[f+8>>2]|0;i=c[h+8>>2]|0;if((j|0)==(i|0)){return}m=c[i+112>>2]|0;a:do{if((m|0)!=0){while(1){if((c[m>>2]|0)==(j|0)){n=c[m+4>>2]|0;k=c[n+48>>2]|0;l=c[n+52>>2]|0;o=c[n+56>>2]|0;n=c[n+60>>2]|0;if((k|0)==(f|0)&(l|0)==(h|0)&(o|0)==(d|0)&(n|0)==(e|0)){k=22;break}if((k|0)==(h|0)&(l|0)==(f|0)&(o|0)==(e|0)&(n|0)==(d|0)){k=22;break}}m=c[m+12>>2]|0;if((m|0)==0){break a}}if((k|0)==22){return}}}while(0);if(!(sc(i,j)|0)){return}i=c[a+68>>2]|0;do{if((i|0)!=0){if(pb[c[(c[i>>2]|0)+8>>2]&15](i,f,h)|0){break}return}}while(0);d=yd(f,d,h,e,c[a+76>>2]|0)|0;if((d|0)==0){return}h=c[(c[d+48>>2]|0)+8>>2]|0;f=c[(c[d+52>>2]|0)+8>>2]|0;c[d+8>>2]=0;e=a+60|0;c[d+12>>2]=c[e>>2];i=c[e>>2]|0;if((i|0)!=0){c[i+8>>2]=d}c[e>>2]=d;e=d+16|0;c[d+20>>2]=d;c[e>>2]=f;c[d+24>>2]=0;i=h+112|0;c[d+28>>2]=c[i>>2];j=c[i>>2]|0;if((j|0)!=0){c[j+8>>2]=e}c[i>>2]=e;e=d+32|0;c[d+36>>2]=d;c[e>>2]=h;c[d+40>>2]=0;i=f+112|0;c[d+44>>2]=c[i>>2];d=c[i>>2]|0;if((d|0)!=0){c[d+8>>2]=e}c[i>>2]=e;d=h+4|0;e=b[d>>1]|0;if((e&2)==0){b[d>>1]=e|2;g[h+144>>2]=0.0}h=f+4|0;d=b[h>>1]|0;if((d&2)==0){b[h>>1]=d|2;g[f+144>>2]=0.0}o=a+64|0;c[o>>2]=(c[o>>2]|0)+1;return}function Ac(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;f=i;i=i+1040|0;k=f|0;e=k+4|0;h=k|0;c[h>>2]=e;j=k+1028|0;c[j>>2]=0;k=k+1032|0;c[k>>2]=256;c[(c[h>>2]|0)+(c[j>>2]<<2)>>2]=c[a>>2];r=c[j>>2]|0;s=r+1|0;c[j>>2]=s;a:do{if((r|0)>-1){n=a+4|0;m=d|0;l=d+4|0;a=d+8|0;d=d+12|0;do{s=s-1|0;c[j>>2]=s;q=c[h>>2]|0;o=c[q+(s<<2)>>2]|0;do{if((o|0)!=-1){p=c[n>>2]|0;if(+g[m>>2]- +g[p+(o*36|0)+8>>2]>0.0|+g[l>>2]- +g[p+(o*36|0)+12>>2]>0.0|+g[p+(o*36|0)>>2]- +g[a>>2]>0.0|+g[p+(o*36|0)+4>>2]- +g[d>>2]>0.0){break}r=p+(o*36|0)+24|0;if((c[r>>2]|0)==-1){if(!($c(b,o)|0)){break a}s=c[j>>2]|0;break}do{if((s|0)==(c[k>>2]|0)){c[k>>2]=s<<1;t=lc(s<<3)|0;c[h>>2]=t;s=q;hf(t|0,s|0,c[j>>2]<<2)|0;if((q|0)==(e|0)){break}mc(s)}}while(0);c[(c[h>>2]|0)+(c[j>>2]<<2)>>2]=c[r>>2];q=(c[j>>2]|0)+1|0;c[j>>2]=q;o=p+(o*36|0)+28|0;do{if((q|0)==(c[k>>2]|0)){t=c[h>>2]|0;c[k>>2]=q<<1;s=lc(q<<3)|0;c[h>>2]=s;p=t;hf(s|0,p|0,c[j>>2]<<2)|0;if((t|0)==(e|0)){break}mc(p)}}while(0);c[(c[h>>2]|0)+(c[j>>2]<<2)>>2]=c[o>>2];s=(c[j>>2]|0)+1|0;c[j>>2]=s}}while(0);}while((s|0)>0)}}while(0);b=c[h>>2]|0;if((b|0)==(e|0)){i=f;return}mc(b);c[h>>2]=0;i=f;return}function Bc(a,b){a=a|0;b=b|0;var d=0,e=0;d=c[a>>2]|0;e=c[b>>2]|0;if((d|0)<(e|0)){b=1;return b|0}if((d|0)!=(e|0)){b=0;return b|0}b=(c[a+4>>2]|0)<(c[b+4>>2]|0);return b|0}function Cc(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0;e=i;i=i+480|0;t=e|0;q=e+16|0;o=e+32|0;k=e+48|0;j=e+64|0;f=e+224|0;u=e+240|0;r=e+256|0;n=e+272|0;l=e+288|0;w=e+304|0;v=e+320|0;s=e+336|0;p=e+352|0;m=e+368|0;K=e+464|0;x=e+160|0;M=e+176|0;L=e+192|0;z=e+208|0;J=e+384|0;H=e+400|0;F=e+432|0;y=e+448|0;G=e+416|0;C=e+80|0;E=e+96|0;A=e+112|0;D=e+128|0;B=e+144|0;a:while(1){N=b;h=b-12|0;g=h;b:while(1){O=a;Q=N-O|0;switch((Q|0)/12|0|0){case 4:{I=14;break a};case 5:{I=15;break a};case 2:{I=4;break a};case 3:{I=6;break a};case 0:case 1:{I=81;break a};default:{}}if((Q|0)<372){I=21;break a}R=(Q|0)/24|0;P=a+(R*12|0)|0;do{if((Q|0)>11988){S=(Q|0)/48|0;Q=a+(S*12|0)|0;R=a+((S+R|0)*12|0)|0;S=Dc(a,Q,P,R,d)|0;if(!(ub[c[d>>2]&7](h,R)|0)){break}T=R;c[z>>2]=c[T>>2];c[z+4>>2]=c[T+4>>2];c[z+8>>2]=c[T+8>>2];c[T>>2]=c[g>>2];c[T+4>>2]=c[g+4>>2];c[T+8>>2]=c[g+8>>2];c[g>>2]=c[z>>2];c[g+4>>2]=c[z+4>>2];c[g+8>>2]=c[z+8>>2];if(!(ub[c[d>>2]&7](R,P)|0)){S=S+1|0;break}R=P;c[M>>2]=c[R>>2];c[M+4>>2]=c[R+4>>2];c[M+8>>2]=c[R+8>>2];c[R>>2]=c[T>>2];c[R+4>>2]=c[T+4>>2];c[R+8>>2]=c[T+8>>2];c[T>>2]=c[M>>2];c[T+4>>2]=c[M+4>>2];c[T+8>>2]=c[M+8>>2];if(!(ub[c[d>>2]&7](P,Q)|0)){S=S+2|0;break}T=Q;c[x>>2]=c[T>>2];c[x+4>>2]=c[T+4>>2];c[x+8>>2]=c[T+8>>2];c[T>>2]=c[R>>2];c[T+4>>2]=c[R+4>>2];c[T+8>>2]=c[R+8>>2];c[R>>2]=c[x>>2];c[R+4>>2]=c[x+4>>2];c[R+8>>2]=c[x+8>>2];if(!(ub[c[d>>2]&7](Q,a)|0)){S=S+3|0;break}U=a;c[L>>2]=c[U>>2];c[L+4>>2]=c[U+4>>2];c[L+8>>2]=c[U+8>>2];c[U>>2]=c[T>>2];c[U+4>>2]=c[T+4>>2];c[U+8>>2]=c[T+8>>2];c[T>>2]=c[L>>2];c[T+4>>2]=c[L+4>>2];c[T+8>>2]=c[L+8>>2];S=S+4|0}else{U=ub[c[d>>2]&7](P,a)|0;R=ub[c[d>>2]&7](h,P)|0;if(!U){if(!R){S=0;break}Q=P;c[B>>2]=c[Q>>2];c[B+4>>2]=c[Q+4>>2];c[B+8>>2]=c[Q+8>>2];c[Q>>2]=c[g>>2];c[Q+4>>2]=c[g+4>>2];c[Q+8>>2]=c[g+8>>2];c[g>>2]=c[B>>2];c[g+4>>2]=c[B+4>>2];c[g+8>>2]=c[B+8>>2];if(!(ub[c[d>>2]&7](P,a)|0)){S=1;break}S=a;c[A>>2]=c[S>>2];c[A+4>>2]=c[S+4>>2];c[A+8>>2]=c[S+8>>2];c[S>>2]=c[Q>>2];c[S+4>>2]=c[Q+4>>2];c[S+8>>2]=c[Q+8>>2];c[Q>>2]=c[A>>2];c[Q+4>>2]=c[A+4>>2];c[Q+8>>2]=c[A+8>>2];S=2;break}Q=a;if(R){c[C>>2]=c[Q>>2];c[C+4>>2]=c[Q+4>>2];c[C+8>>2]=c[Q+8>>2];c[Q>>2]=c[g>>2];c[Q+4>>2]=c[g+4>>2];c[Q+8>>2]=c[g+8>>2];c[g>>2]=c[C>>2];c[g+4>>2]=c[C+4>>2];c[g+8>>2]=c[C+8>>2];S=1;break}c[E>>2]=c[Q>>2];c[E+4>>2]=c[Q+4>>2];c[E+8>>2]=c[Q+8>>2];R=P;c[Q>>2]=c[R>>2];c[Q+4>>2]=c[R+4>>2];c[Q+8>>2]=c[R+8>>2];c[R>>2]=c[E>>2];c[R+4>>2]=c[E+4>>2];c[R+8>>2]=c[E+8>>2];if(!(ub[c[d>>2]&7](h,P)|0)){S=1;break}c[D>>2]=c[R>>2];c[D+4>>2]=c[R+4>>2];c[D+8>>2]=c[R+8>>2];c[R>>2]=c[g>>2];c[R+4>>2]=c[g+4>>2];c[R+8>>2]=c[g+8>>2];c[g>>2]=c[D>>2];c[g+4>>2]=c[D+4>>2];c[g+8>>2]=c[D+8>>2];S=2}}while(0);do{if(ub[c[d>>2]&7](a,P)|0){R=h}else{R=h;while(1){R=R-12|0;if((a|0)==(R|0)){break}if(ub[c[d>>2]&7](R,P)|0){I=64;break}}if((I|0)==64){I=0;T=a;c[G>>2]=c[T>>2];c[G+4>>2]=c[T+4>>2];c[G+8>>2]=c[T+8>>2];U=R;c[T>>2]=c[U>>2];c[T+4>>2]=c[U+4>>2];c[T+8>>2]=c[U+8>>2];c[U>>2]=c[G>>2];c[U+4>>2]=c[G+4>>2];c[U+8>>2]=c[G+8>>2];S=S+1|0;break}P=a+12|0;if(!(ub[c[d>>2]&7](a,h)|0)){if((P|0)==(h|0)){I=81;break a}while(1){O=P+12|0;if(ub[c[d>>2]&7](a,P)|0){break}if((O|0)==(h|0)){I=81;break a}else{P=O}}c[y>>2]=c[P>>2];c[y+4>>2]=c[P+4>>2];c[y+8>>2]=c[P+8>>2];c[P>>2]=c[g>>2];c[P+4>>2]=c[g+4>>2];c[P+8>>2]=c[g+8>>2];c[g>>2]=c[y>>2];c[g+4>>2]=c[y+4>>2];c[g+8>>2]=c[y+8>>2];P=O}if((P|0)==(h|0)){I=81;break a}else{O=h}while(1){while(1){Q=P+12|0;if(ub[c[d>>2]&7](a,P)|0){break}else{P=Q}}do{O=O-12|0;}while(ub[c[d>>2]&7](a,O)|0);if(P>>>0>=O>>>0){a=P;continue b}U=P;c[F>>2]=c[U>>2];c[F+4>>2]=c[U+4>>2];c[F+8>>2]=c[U+8>>2];P=O;c[U>>2]=c[P>>2];c[U+4>>2]=c[P+4>>2];c[U+8>>2]=c[P+8>>2];c[P>>2]=c[F>>2];c[P+4>>2]=c[F+4>>2];c[P+8>>2]=c[F+8>>2];P=Q}}}while(0);Q=a+12|0;c:do{if(Q>>>0<R>>>0){while(1){U=Q;while(1){Q=U+12|0;if(ub[c[d>>2]&7](U,P)|0){U=Q}else{T=R;break}}do{T=T-12|0;}while(!(ub[c[d>>2]&7](T,P)|0));if(U>>>0>T>>>0){Q=U;break c}V=U;c[H>>2]=c[V>>2];c[H+4>>2]=c[V+4>>2];c[H+8>>2]=c[V+8>>2];R=T;c[V>>2]=c[R>>2];c[V+4>>2]=c[R+4>>2];c[V+8>>2]=c[R+8>>2];c[R>>2]=c[H>>2];c[R+4>>2]=c[H+4>>2];c[R+8>>2]=c[H+8>>2];R=T;S=S+1|0;P=(P|0)==(U|0)?T:P}}}while(0);do{if((Q|0)!=(P|0)){if(!(ub[c[d>>2]&7](P,Q)|0)){break}U=Q;c[J>>2]=c[U>>2];c[J+4>>2]=c[U+4>>2];c[J+8>>2]=c[U+8>>2];V=P;c[U>>2]=c[V>>2];c[U+4>>2]=c[V+4>>2];c[U+8>>2]=c[V+8>>2];c[V>>2]=c[J>>2];c[V+4>>2]=c[J+4>>2];c[V+8>>2]=c[J+8>>2];S=S+1|0}}while(0);if((S|0)==0){R=Ec(a,Q,d)|0;P=Q+12|0;if(Ec(P,b,d)|0){I=76;break}if(R){a=P;continue}}V=Q;if((V-O|0)>=(N-V|0)){I=80;break}Cc(a,Q,d);a=Q+12|0}if((I|0)==76){I=0;if(R){I=81;break}else{b=Q;continue}}else if((I|0)==80){I=0;Cc(Q+12|0,b,d);b=Q;continue}}if((I|0)==4){if(!(ub[c[d>>2]&7](h,a)|0)){i=e;return}V=K;U=a;c[V>>2]=c[U>>2];c[V+4>>2]=c[U+4>>2];c[V+8>>2]=c[U+8>>2];c[U>>2]=c[g>>2];c[U+4>>2]=c[g+4>>2];c[U+8>>2]=c[g+8>>2];c[g>>2]=c[V>>2];c[g+4>>2]=c[V+4>>2];c[g+8>>2]=c[V+8>>2];i=e;return}else if((I|0)==6){f=a+12|0;V=ub[c[d>>2]&7](f,a)|0;b=ub[c[d>>2]&7](h,f)|0;if(!V){if(!b){i=e;return}b=f;c[m>>2]=c[b>>2];c[m+4>>2]=c[b+4>>2];c[m+8>>2]=c[b+8>>2];c[b>>2]=c[g>>2];c[b+4>>2]=c[g+4>>2];c[b+8>>2]=c[g+8>>2];c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];c[g+8>>2]=c[m+8>>2];if(!(ub[c[d>>2]&7](f,a)|0)){i=e;return}V=a;c[s>>2]=c[V>>2];c[s+4>>2]=c[V+4>>2];c[s+8>>2]=c[V+8>>2];c[V>>2]=c[b>>2];c[V+4>>2]=c[b+4>>2];c[V+8>>2]=c[b+8>>2];c[b>>2]=c[s>>2];c[b+4>>2]=c[s+4>>2];c[b+8>>2]=c[s+8>>2];i=e;return}if(b){c[w>>2]=c[a>>2];c[w+4>>2]=c[a+4>>2];c[w+8>>2]=c[a+8>>2];c[a>>2]=c[g>>2];c[a+4>>2]=c[g+4>>2];c[a+8>>2]=c[g+8>>2];c[g>>2]=c[w>>2];c[g+4>>2]=c[w+4>>2];c[g+8>>2]=c[w+8>>2];i=e;return}c[v>>2]=c[a>>2];c[v+4>>2]=c[a+4>>2];c[v+8>>2]=c[a+8>>2];b=f;c[a>>2]=c[b>>2];c[a+4>>2]=c[b+4>>2];c[a+8>>2]=c[b+8>>2];c[b>>2]=c[v>>2];c[b+4>>2]=c[v+4>>2];c[b+8>>2]=c[v+8>>2];if(!(ub[c[d>>2]&7](h,f)|0)){i=e;return}c[p>>2]=c[b>>2];c[p+4>>2]=c[b+4>>2];c[p+8>>2]=c[b+8>>2];c[b>>2]=c[g>>2];c[b+4>>2]=c[g+4>>2];c[b+8>>2]=c[g+8>>2];c[g>>2]=c[p>>2];c[g+4>>2]=c[p+4>>2];c[g+8>>2]=c[p+8>>2];i=e;return}else if((I|0)==14){Dc(a,a+12|0,a+24|0,h,d)|0;i=e;return}else if((I|0)==15){f=a+12|0;b=a+24|0;j=a+36|0;Dc(a,f,b,j,d)|0;if(!(ub[c[d>>2]&7](h,j)|0)){i=e;return}h=j;c[l>>2]=c[h>>2];c[l+4>>2]=c[h+4>>2];c[l+8>>2]=c[h+8>>2];c[h>>2]=c[g>>2];c[h+4>>2]=c[g+4>>2];c[h+8>>2]=c[g+8>>2];c[g>>2]=c[l>>2];c[g+4>>2]=c[l+4>>2];c[g+8>>2]=c[l+8>>2];if(!(ub[c[d>>2]&7](j,b)|0)){i=e;return}g=b;c[r>>2]=c[g>>2];c[r+4>>2]=c[g+4>>2];c[r+8>>2]=c[g+8>>2];c[g>>2]=c[h>>2];c[g+4>>2]=c[h+4>>2];c[g+8>>2]=c[h+8>>2];c[h>>2]=c[r>>2];c[h+4>>2]=c[r+4>>2];c[h+8>>2]=c[r+8>>2];if(!(ub[c[d>>2]&7](b,f)|0)){i=e;return}b=f;c[u>>2]=c[b>>2];c[u+4>>2]=c[b+4>>2];c[u+8>>2]=c[b+8>>2];c[b>>2]=c[g>>2];c[b+4>>2]=c[g+4>>2];c[b+8>>2]=c[g+8>>2];c[g>>2]=c[u>>2];c[g+4>>2]=c[u+4>>2];c[g+8>>2]=c[u+8>>2];if(!(ub[c[d>>2]&7](f,a)|0)){i=e;return}V=a;c[n>>2]=c[V>>2];c[n+4>>2]=c[V+4>>2];c[n+8>>2]=c[V+8>>2];c[V>>2]=c[b>>2];c[V+4>>2]=c[b+4>>2];c[V+8>>2]=c[b+8>>2];c[b>>2]=c[n>>2];c[b+4>>2]=c[n+4>>2];c[b+8>>2]=c[n+8>>2];i=e;return}else if((I|0)==21){g=f;h=a+24|0;l=a+12|0;V=ub[c[d>>2]&7](l,a)|0;m=ub[c[d>>2]&7](h,l)|0;do{if(V){j=a;if(m){c[t>>2]=c[j>>2];c[t+4>>2]=c[j+4>>2];c[t+8>>2]=c[j+8>>2];V=h;c[j>>2]=c[V>>2];c[j+4>>2]=c[V+4>>2];c[j+8>>2]=c[V+8>>2];c[V>>2]=c[t>>2];c[V+4>>2]=c[t+4>>2];c[V+8>>2]=c[t+8>>2];break}c[q>>2]=c[j>>2];c[q+4>>2]=c[j+4>>2];c[q+8>>2]=c[j+8>>2];m=l;c[j>>2]=c[m>>2];c[j+4>>2]=c[m+4>>2];c[j+8>>2]=c[m+8>>2];c[m>>2]=c[q>>2];c[m+4>>2]=c[q+4>>2];c[m+8>>2]=c[q+8>>2];if(!(ub[c[d>>2]&7](h,l)|0)){break}c[k>>2]=c[m>>2];c[k+4>>2]=c[m+4>>2];c[k+8>>2]=c[m+8>>2];V=h;c[m>>2]=c[V>>2];c[m+4>>2]=c[V+4>>2];c[m+8>>2]=c[V+8>>2];c[V>>2]=c[k>>2];c[V+4>>2]=c[k+4>>2];c[V+8>>2]=c[k+8>>2]}else{if(!m){break}k=l;c[j>>2]=c[k>>2];c[j+4>>2]=c[k+4>>2];c[j+8>>2]=c[k+8>>2];V=h;c[k>>2]=c[V>>2];c[k+4>>2]=c[V+4>>2];c[k+8>>2]=c[V+8>>2];c[V>>2]=c[j>>2];c[V+4>>2]=c[j+4>>2];c[V+8>>2]=c[j+8>>2];if(!(ub[c[d>>2]&7](l,a)|0)){break}V=a;c[o>>2]=c[V>>2];c[o+4>>2]=c[V+4>>2];c[o+8>>2]=c[V+8>>2];c[V>>2]=c[k>>2];c[V+4>>2]=c[k+4>>2];c[V+8>>2]=c[k+8>>2];c[k>>2]=c[o>>2];c[k+4>>2]=c[o+4>>2];c[k+8>>2]=c[o+8>>2]}}while(0);j=a+36|0;if((j|0)==(b|0)){i=e;return}while(1){if(ub[c[d>>2]&7](j,h)|0){l=j;c[g>>2]=c[l>>2];c[g+4>>2]=c[l+4>>2];c[g+8>>2]=c[l+8>>2];l=j;while(1){V=l;l=h;c[V>>2]=c[l>>2];c[V+4>>2]=c[l+4>>2];c[V+8>>2]=c[l+8>>2];if((h|0)==(a|0)){break}k=h-12|0;if(ub[c[d>>2]&7](f,k)|0){l=h;h=k}else{break}}c[l>>2]=c[g>>2];c[l+4>>2]=c[g+4>>2];c[l+8>>2]=c[g+8>>2]}k=j+12|0;if((k|0)==(b|0)){break}else{h=j;j=k}}i=e;return}else if((I|0)==81){i=e;return}}function Dc(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;h=i;i=i+128|0;j=h+80|0;g=h+96|0;k=h+112|0;n=h|0;m=h+16|0;p=h+32|0;l=h+48|0;q=h+64|0;r=ub[c[f>>2]&7](b,a)|0;o=ub[c[f>>2]&7](d,b)|0;do{if(r){p=a;if(o){c[n>>2]=c[p>>2];c[n+4>>2]=c[p+4>>2];c[n+8>>2]=c[p+8>>2];l=d;c[p>>2]=c[l>>2];c[p+4>>2]=c[l+4>>2];c[p+8>>2]=c[l+8>>2];c[l>>2]=c[n>>2];c[l+4>>2]=c[n+4>>2];c[l+8>>2]=c[n+8>>2];l=1;break}c[m>>2]=c[p>>2];c[m+4>>2]=c[p+4>>2];c[m+8>>2]=c[p+8>>2];n=b;c[p>>2]=c[n>>2];c[p+4>>2]=c[n+4>>2];c[p+8>>2]=c[n+8>>2];c[n>>2]=c[m>>2];c[n+4>>2]=c[m+4>>2];c[n+8>>2]=c[m+8>>2];if(!(ub[c[f>>2]&7](d,b)|0)){l=1;break}c[l>>2]=c[n>>2];c[l+4>>2]=c[n+4>>2];c[l+8>>2]=c[n+8>>2];r=d;c[n>>2]=c[r>>2];c[n+4>>2]=c[r+4>>2];c[n+8>>2]=c[r+8>>2];c[r>>2]=c[l>>2];c[r+4>>2]=c[l+4>>2];c[r+8>>2]=c[l+8>>2];l=2}else{if(!o){l=0;break}l=b;c[q>>2]=c[l>>2];c[q+4>>2]=c[l+4>>2];c[q+8>>2]=c[l+8>>2];r=d;c[l>>2]=c[r>>2];c[l+4>>2]=c[r+4>>2];c[l+8>>2]=c[r+8>>2];c[r>>2]=c[q>>2];c[r+4>>2]=c[q+4>>2];c[r+8>>2]=c[q+8>>2];if(!(ub[c[f>>2]&7](b,a)|0)){l=1;break}r=a;c[p>>2]=c[r>>2];c[p+4>>2]=c[r+4>>2];c[p+8>>2]=c[r+8>>2];c[r>>2]=c[l>>2];c[r+4>>2]=c[l+4>>2];c[r+8>>2]=c[l+8>>2];c[l>>2]=c[p>>2];c[l+4>>2]=c[p+4>>2];c[l+8>>2]=c[p+8>>2];l=2}}while(0);if(!(ub[c[f>>2]&7](e,d)|0)){r=l;i=h;return r|0}q=k;k=d;c[q>>2]=c[k>>2];c[q+4>>2]=c[k+4>>2];c[q+8>>2]=c[k+8>>2];r=e;c[k>>2]=c[r>>2];c[k+4>>2]=c[r+4>>2];c[k+8>>2]=c[r+8>>2];c[r>>2]=c[q>>2];c[r+4>>2]=c[q+4>>2];c[r+8>>2]=c[q+8>>2];if(!(ub[c[f>>2]&7](d,b)|0)){r=l+1|0;i=h;return r|0}r=j;j=b;c[r>>2]=c[j>>2];c[r+4>>2]=c[j+4>>2];c[r+8>>2]=c[j+8>>2];c[j>>2]=c[k>>2];c[j+4>>2]=c[k+4>>2];c[j+8>>2]=c[k+8>>2];c[k>>2]=c[r>>2];c[k+4>>2]=c[r+4>>2];c[k+8>>2]=c[r+8>>2];if(!(ub[c[f>>2]&7](b,a)|0)){r=l+2|0;i=h;return r|0}r=g;q=a;c[r>>2]=c[q>>2];c[r+4>>2]=c[q+4>>2];c[r+8>>2]=c[q+8>>2];c[q>>2]=c[j>>2];c[q+4>>2]=c[j+4>>2];c[q+8>>2]=c[j+8>>2];c[j>>2]=c[r>>2];c[j+4>>2]=c[r+4>>2];c[j+8>>2]=c[r+8>>2];r=l+3|0;i=h;return r|0}function Ec(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;e=i;i=i+256|0;q=e|0;p=e+16|0;o=e+32|0;l=e+48|0;k=e+64|0;n=e+80|0;m=e+96|0;j=e+112|0;h=e+128|0;r=e+224|0;g=e+240|0;switch((b-a|0)/12|0|0){case 3:{f=a+12|0;b=b-12|0;l=e+144|0;g=e+160|0;j=e+176|0;h=e+192|0;m=e+208|0;r=ub[c[d>>2]&7](f,a)|0;k=ub[c[d>>2]&7](b,f)|0;if(!r){if(!k){r=1;i=e;return r|0}g=f;c[m>>2]=c[g>>2];c[m+4>>2]=c[g+4>>2];c[m+8>>2]=c[g+8>>2];r=b;c[g>>2]=c[r>>2];c[g+4>>2]=c[r+4>>2];c[g+8>>2]=c[r+8>>2];c[r>>2]=c[m>>2];c[r+4>>2]=c[m+4>>2];c[r+8>>2]=c[m+8>>2];if(!(ub[c[d>>2]&7](f,a)|0)){r=1;i=e;return r|0}r=a;c[j>>2]=c[r>>2];c[j+4>>2]=c[r+4>>2];c[j+8>>2]=c[r+8>>2];c[r>>2]=c[g>>2];c[r+4>>2]=c[g+4>>2];c[r+8>>2]=c[g+8>>2];c[g>>2]=c[j>>2];c[g+4>>2]=c[j+4>>2];c[g+8>>2]=c[j+8>>2];r=1;i=e;return r|0}if(k){c[l>>2]=c[a>>2];c[l+4>>2]=c[a+4>>2];c[l+8>>2]=c[a+8>>2];r=b;c[a>>2]=c[r>>2];c[a+4>>2]=c[r+4>>2];c[a+8>>2]=c[r+8>>2];c[r>>2]=c[l>>2];c[r+4>>2]=c[l+4>>2];c[r+8>>2]=c[l+8>>2];r=1;i=e;return r|0}c[g>>2]=c[a>>2];c[g+4>>2]=c[a+4>>2];c[g+8>>2]=c[a+8>>2];j=f;c[a>>2]=c[j>>2];c[a+4>>2]=c[j+4>>2];c[a+8>>2]=c[j+8>>2];c[j>>2]=c[g>>2];c[j+4>>2]=c[g+4>>2];c[j+8>>2]=c[g+8>>2];if(!(ub[c[d>>2]&7](b,f)|0)){r=1;i=e;return r|0}c[h>>2]=c[j>>2];c[h+4>>2]=c[j+4>>2];c[h+8>>2]=c[j+8>>2];r=b;c[j>>2]=c[r>>2];c[j+4>>2]=c[r+4>>2];c[j+8>>2]=c[r+8>>2];c[r>>2]=c[h>>2];c[r+4>>2]=c[h+4>>2];c[r+8>>2]=c[h+8>>2];r=1;i=e;return r|0};case 2:{b=b-12|0;if(!(ub[c[d>>2]&7](b,a)|0)){r=1;i=e;return r|0}q=r;p=a;c[q>>2]=c[p>>2];c[q+4>>2]=c[p+4>>2];c[q+8>>2]=c[p+8>>2];r=b;c[p>>2]=c[r>>2];c[p+4>>2]=c[r+4>>2];c[p+8>>2]=c[r+8>>2];c[r>>2]=c[q>>2];c[r+4>>2]=c[q+4>>2];c[r+8>>2]=c[q+8>>2];r=1;i=e;return r|0};case 4:{Dc(a,a+12|0,a+24|0,b-12|0,d)|0;r=1;i=e;return r|0};case 5:{f=a+12|0;g=a+24|0;k=a+36|0;b=b-12|0;Dc(a,f,g,k,d)|0;if(!(ub[c[d>>2]&7](b,k)|0)){r=1;i=e;return r|0}l=k;c[h>>2]=c[l>>2];c[h+4>>2]=c[l+4>>2];c[h+8>>2]=c[l+8>>2];r=b;c[l>>2]=c[r>>2];c[l+4>>2]=c[r+4>>2];c[l+8>>2]=c[r+8>>2];c[r>>2]=c[h>>2];c[r+4>>2]=c[h+4>>2];c[r+8>>2]=c[h+8>>2];if(!(ub[c[d>>2]&7](k,g)|0)){r=1;i=e;return r|0}b=g;c[m>>2]=c[b>>2];c[m+4>>2]=c[b+4>>2];c[m+8>>2]=c[b+8>>2];c[b>>2]=c[l>>2];c[b+4>>2]=c[l+4>>2];c[b+8>>2]=c[l+8>>2];c[l>>2]=c[m>>2];c[l+4>>2]=c[m+4>>2];c[l+8>>2]=c[m+8>>2];if(!(ub[c[d>>2]&7](g,f)|0)){r=1;i=e;return r|0}g=f;c[n>>2]=c[g>>2];c[n+4>>2]=c[g+4>>2];c[n+8>>2]=c[g+8>>2];c[g>>2]=c[b>>2];c[g+4>>2]=c[b+4>>2];c[g+8>>2]=c[b+8>>2];c[b>>2]=c[n>>2];c[b+4>>2]=c[n+4>>2];c[b+8>>2]=c[n+8>>2];if(!(ub[c[d>>2]&7](f,a)|0)){r=1;i=e;return r|0}r=a;c[j>>2]=c[r>>2];c[j+4>>2]=c[r+4>>2];c[j+8>>2]=c[r+8>>2];c[r>>2]=c[g>>2];c[r+4>>2]=c[g+4>>2];c[r+8>>2]=c[g+8>>2];c[g>>2]=c[j>>2];c[g+4>>2]=c[j+4>>2];c[g+8>>2]=c[j+8>>2];r=1;i=e;return r|0};case 0:case 1:{r=1;i=e;return r|0};default:{h=a+24|0;j=a+12|0;n=q;m=p;r=ub[c[d>>2]&7](j,a)|0;p=ub[c[d>>2]&7](h,j)|0;do{if(r){k=a;if(p){c[n>>2]=c[k>>2];c[n+4>>2]=c[k+4>>2];c[n+8>>2]=c[k+8>>2];r=h;c[k>>2]=c[r>>2];c[k+4>>2]=c[r+4>>2];c[k+8>>2]=c[r+8>>2];c[r>>2]=c[n>>2];c[r+4>>2]=c[n+4>>2];c[r+8>>2]=c[n+8>>2];break}c[m>>2]=c[k>>2];c[m+4>>2]=c[k+4>>2];c[m+8>>2]=c[k+8>>2];n=j;c[k>>2]=c[n>>2];c[k+4>>2]=c[n+4>>2];c[k+8>>2]=c[n+8>>2];c[n>>2]=c[m>>2];c[n+4>>2]=c[m+4>>2];c[n+8>>2]=c[m+8>>2];if(!(ub[c[d>>2]&7](h,j)|0)){break}c[l>>2]=c[n>>2];c[l+4>>2]=c[n+4>>2];c[l+8>>2]=c[n+8>>2];r=h;c[n>>2]=c[r>>2];c[n+4>>2]=c[r+4>>2];c[n+8>>2]=c[r+8>>2];c[r>>2]=c[l>>2];c[r+4>>2]=c[l+4>>2];c[r+8>>2]=c[l+8>>2]}else{if(!p){break}l=j;c[k>>2]=c[l>>2];c[k+4>>2]=c[l+4>>2];c[k+8>>2]=c[l+8>>2];r=h;c[l>>2]=c[r>>2];c[l+4>>2]=c[r+4>>2];c[l+8>>2]=c[r+8>>2];c[r>>2]=c[k>>2];c[r+4>>2]=c[k+4>>2];c[r+8>>2]=c[k+8>>2];if(!(ub[c[d>>2]&7](j,a)|0)){break}r=a;c[o>>2]=c[r>>2];c[o+4>>2]=c[r+4>>2];c[o+8>>2]=c[r+8>>2];c[r>>2]=c[l>>2];c[r+4>>2]=c[l+4>>2];c[r+8>>2]=c[l+8>>2];c[l>>2]=c[o>>2];c[l+4>>2]=c[o+4>>2];c[l+8>>2]=c[o+8>>2]}}while(0);k=a+36|0;if((k|0)==(b|0)){r=1;i=e;return r|0}j=g;l=0;while(1){if(ub[c[d>>2]&7](k,h)|0){n=k;c[j>>2]=c[n>>2];c[j+4>>2]=c[n+4>>2];c[j+8>>2]=c[n+8>>2];n=k;while(1){r=n;n=h;c[r>>2]=c[n>>2];c[r+4>>2]=c[n+4>>2];c[r+8>>2]=c[n+8>>2];if((h|0)==(a|0)){break}m=h-12|0;if(ub[c[d>>2]&7](g,m)|0){n=h;h=m}else{break}}c[n>>2]=c[j>>2];c[n+4>>2]=c[j+4>>2];c[n+8>>2]=c[j+8>>2];l=l+1|0;if((l|0)==8){break}}m=k+12|0;if((m|0)==(b|0)){d=1;f=35;break}else{h=k;k=m}}if((f|0)==35){i=e;return d|0}r=(k+12|0)==(b|0);i=e;return r|0}}return 0}function Fc(a){a=a|0;_a(a|0)|0;Za()}function Gc(a){a=a|0;bf(a);return}function Hc(a,b){a=a|0;b=b|0;return}function Ic(a,b){a=a|0;b=b|0;return}function Jc(a,b,c){a=a|0;b=b|0;c=c|0;return}function Kc(a,b,c){a=a|0;b=b|0;c=c|0;return}function Lc(a){a=a|0;b[a+32>>1]=1;b[a+34>>1]=-1;b[a+36>>1]=0;c[a+40>>2]=0;c[a+24>>2]=0;c[a+28>>2]=0;gf(a|0,0,16)|0;return}function Mc(d,e,f,h){d=d|0;e=e|0;f=f|0;h=h|0;var i=0,j=0,k=0.0;c[d+40>>2]=c[h+4>>2];g[d+16>>2]=+g[h+8>>2];g[d+20>>2]=+g[h+12>>2];c[d+8>>2]=f;c[d+4>>2]=0;f=d+32|0;j=h+22|0;b[f>>1]=b[j>>1]|0;b[f+2>>1]=b[j+2>>1]|0;b[f+4>>1]=b[j+4>>1]|0;a[d+38|0]=a[h+20|0]&1;f=c[h>>2]|0;f=ub[c[(c[f>>2]|0)+8>>2]&7](f,e)|0;c[d+12>>2]=f;f=lb[c[(c[f>>2]|0)+12>>2]&7](f)|0;j=jc(e,f*28|0)|0;e=d+24|0;c[e>>2]=j;if((f|0)>0){i=0}else{j=d+28|0;c[j>>2]=0;j=h+16|0;k=+g[j>>2];j=d|0;g[j>>2]=k;return}while(1){c[j+(i*28|0)+16>>2]=0;c[(c[e>>2]|0)+(i*28|0)+24>>2]=-1;i=i+1|0;if((i|0)>=(f|0)){break}j=c[e>>2]|0}j=d+28|0;c[j>>2]=0;j=h+16|0;k=+g[j>>2];j=d|0;g[j>>2]=k;return}function Nc(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;e=a+28|0;if((c[e>>2]|0)!=0){va(872,3024,124,4320)}f=a+12|0;h=c[f>>2]|0;h=lb[c[(c[h>>2]|0)+12>>2]&7](h)|0;c[e>>2]=h;if((h|0)<=0){return}g=a+24|0;h=0;do{i=c[g>>2]|0;j=i+(h*28|0)|0;l=c[f>>2]|0;k=j|0;wb[c[(c[l>>2]|0)+24>>2]&31](l,k,d,h);c[i+(h*28|0)+24>>2]=Zc(b,k,j)|0;c[i+(h*28|0)+16>>2]=a;c[i+(h*28|0)+20>>2]=h;h=h+1|0;}while((h|0)<(c[e>>2]|0));return}function Oc(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0.0,G=0.0,H=0.0,I=0.0;m=i;i=i+40|0;j=m|0;k=m+16|0;f=m+32|0;h=a+28|0;if((c[h>>2]|0)<=0){i=m;return}l=a+24|0;w=a+12|0;y=j|0;z=k|0;A=j+4|0;B=k+4|0;s=j+8|0;t=k+8|0;u=j+12|0;v=k+12|0;o=e|0;p=d|0;a=e+4|0;n=d+4|0;q=f|0;r=f+4|0;C=0;do{D=c[l>>2]|0;E=c[w>>2]|0;x=D+(C*28|0)+20|0;wb[c[(c[E>>2]|0)+24>>2]&31](E,j,d,c[x>>2]|0);E=c[w>>2]|0;wb[c[(c[E>>2]|0)+24>>2]&31](E,k,e,c[x>>2]|0);x=D+(C*28|0)|0;H=+g[y>>2];I=+g[z>>2];G=+g[A>>2];F=+g[B>>2];E=x;H=+(H<I?H:I);I=+(G<F?G:F);g[E>>2]=H;g[E+4>>2]=I;I=+g[s>>2];H=+g[t>>2];F=+g[u>>2];G=+g[v>>2];E=D+(C*28|0)+8|0;H=+(I>H?I:H);I=+(F>G?F:G);g[E>>2]=H;g[E+4>>2]=I;I=+g[a>>2]- +g[n>>2];g[q>>2]=+g[o>>2]- +g[p>>2];g[r>>2]=I;_c(b,c[D+(C*28|0)+24>>2]|0,x,f);C=C+1|0;}while((C|0)<(c[h>>2]|0));i=m;return}function Pc(b,d){b=b|0;d=d|0;var e=0,f=0,h=0;e=b|0;hc(e);rd(b+68|0);uc(b+102872|0);c[b+102980>>2]=0;c[b+102984>>2]=0;gf(b+102952|0,0,16)|0;a[b+102992|0]=1;a[b+102993|0]=1;a[b+102994|0]=0;a[b+102995|0]=1;a[b+102976|0]=1;h=d;d=b+102968|0;f=c[h+4>>2]|0;c[d>>2]=c[h>>2];c[d+4>>2]=f;c[b+102868>>2]=4;g[b+102988>>2]=0.0;c[b+102948>>2]=e;gf(b+102996|0,0,32)|0;return}function Qc(a,b){a=a|0;b=b|0;var d=0,e=0;if((c[a+102868>>2]&2|0)!=0){va(96,2768,109,4400);return 0}d=jc(a|0,152)|0;if((d|0)==0){d=0}else{nc(d,b,a)}c[d+92>>2]=0;b=a+102952|0;c[d+96>>2]=c[b>>2];e=c[b>>2]|0;if((e|0)!=0){c[e+92>>2]=d}c[b>>2]=d;e=a+102960|0;c[e>>2]=(c[e>>2]|0)+1;return d|0}function Rc(d,e){d=d|0;e=e|0;var f=0;f=d+102976|0;if((e&1|0)==(a[f]&1|0)){return}a[f]=e&1;if(e){return}d=c[d+102952>>2]|0;if((d|0)==0){return}do{f=d+4|0;e=b[f>>1]|0;if((e&2)==0){b[f>>1]=e|2;g[d+144>>2]=0.0}d=c[d+96>>2]|0;}while((d|0)!=0);return}function Sc(d,e){d=d|0;e=e|0;var f=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0;k=i;i=i+96|0;f=k|0;q=k+56|0;h=k+88|0;p=d+103008|0;g[p>>2]=0.0;o=d+103012|0;g[o>>2]=0.0;n=d+103016|0;g[n>>2]=0.0;r=d+102960|0;j=d+102872|0;m=d+68|0;Yd(f,c[r>>2]|0,c[d+102936>>2]|0,c[d+102964>>2]|0,m,c[d+102944>>2]|0);l=d+102952|0;s=c[l>>2]|0;if((s|0)!=0){do{P=s+4|0;b[P>>1]=b[P>>1]&-2;s=c[s+96>>2]|0;}while((s|0)!=0)}s=c[d+102932>>2]|0;if((s|0)!=0){do{P=s+4|0;c[P>>2]=c[P>>2]&-2;s=c[s+12>>2]|0;}while((s|0)!=0)}s=c[d+102956>>2]|0;if((s|0)!=0){do{a[s+60|0]=0;s=c[s+12>>2]|0;}while((s|0)!=0)}z=c[r>>2]|0;r=td(m,z<<2)|0;y=r;I=c[l>>2]|0;a:do{if((I|0)!=0){x=f+28|0;v=f+36|0;B=f+32|0;t=f+40|0;s=f+8|0;w=f+48|0;A=f+16|0;H=f+44|0;u=f+12|0;C=d+102968|0;D=d+102976|0;E=q+12|0;F=q+16|0;G=q+20|0;b:while(1){J=I+4|0;do{if((b[J>>1]&35)==34){if((c[I>>2]|0)==0){break}c[x>>2]=0;c[v>>2]=0;c[B>>2]=0;c[y>>2]=I;b[J>>1]=b[J>>1]|1;K=1;do{K=K-1|0;J=c[y+(K<<2)>>2]|0;L=J+4|0;if((b[L>>1]&32)==0){n=18;break b}M=c[x>>2]|0;if((M|0)>=(c[t>>2]|0)){n=21;break b}c[J+8>>2]=M;c[(c[s>>2]|0)+(c[x>>2]<<2)>>2]=J;c[x>>2]=(c[x>>2]|0)+1;M=b[L>>1]|0;if((M&2)==0){b[L>>1]=M|2;g[J+144>>2]=0.0}do{if((c[J>>2]|0)!=0){L=c[J+112>>2]|0;if((L|0)!=0){do{M=c[L+4>>2]|0;O=M+4|0;do{if((c[O>>2]&7|0)==6){if((a[(c[M+48>>2]|0)+38|0]&1)!=0){break}if((a[(c[M+52>>2]|0)+38|0]&1)!=0){break}N=c[v>>2]|0;if((N|0)>=(c[H>>2]|0)){n=32;break b}c[v>>2]=N+1;c[(c[u>>2]|0)+(N<<2)>>2]=M;c[O>>2]=c[O>>2]|1;M=c[L>>2]|0;N=M+4|0;if((b[N>>1]&1)!=0){break}if((K|0)>=(z|0)){n=36;break b}c[y+(K<<2)>>2]=M;b[N>>1]=b[N>>1]|1;K=K+1|0}}while(0);L=c[L+12>>2]|0;}while((L|0)!=0)}J=c[J+108>>2]|0;if((J|0)==0){break}do{P=J+4|0;O=c[P>>2]|0;do{if((a[O+60|0]&1)==0){N=c[J>>2]|0;M=N+4|0;if((b[M>>1]&32)==0){break}L=c[B>>2]|0;if((L|0)>=(c[w>>2]|0)){n=44;break b}c[B>>2]=L+1;c[(c[A>>2]|0)+(L<<2)>>2]=O;a[(c[P>>2]|0)+60|0]=1;if((b[M>>1]&1)!=0){break}if((K|0)>=(z|0)){n=48;break b}c[y+(K<<2)>>2]=N;b[M>>1]=b[M>>1]|1;K=K+1|0}}while(0);J=c[J+12>>2]|0;}while((J|0)!=0)}}while(0);}while((K|0)>0);_d(f,q,e,C,(a[D]&1)!=0);g[p>>2]=+g[E>>2]+ +g[p>>2];g[o>>2]=+g[F>>2]+ +g[o>>2];g[n>>2]=+g[G>>2]+ +g[n>>2];K=c[x>>2]|0;if((K|0)>0){J=0}else{break}do{L=c[(c[s>>2]|0)+(J<<2)>>2]|0;if((c[L>>2]|0)==0){K=L+4|0;b[K>>1]=b[K>>1]&-2;K=c[x>>2]|0}J=J+1|0;}while((J|0)<(K|0))}}while(0);I=c[I+96>>2]|0;if((I|0)==0){break a}}if((n|0)==18){va(576,2768,445,4392)}else if((n|0)==21){va(1640,1760,54,4368)}else if((n|0)==32){va(1672,1760,62,4368)}else if((n|0)==36){va(336,2768,495,4392)}else if((n|0)==44){va(1840,1760,68,4368)}else if((n|0)==48){va(336,2768,524,4392)}}}while(0);ud(m,r);vd(h);l=c[l>>2]|0;if((l|0)!=0){do{do{if((b[l+4>>1]&1)!=0){if((c[l>>2]|0)==0){break}pc(l)}}while(0);l=c[l+96>>2]|0;}while((l|0)!=0)}xc(j);g[d+103020>>2]=+xd(h);Zd(f);i=k;return}function Tc(d,e){d=d|0;e=e|0;var f=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0.0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,wa=0,xa=0.0,ya=0.0,za=0.0,Aa=0.0,Ba=0.0,Ca=0.0,Da=0;j=i;i=i+352|0;f=j|0;o=j+56|0;n=j+192|0;s=j+200|0;z=j+240|0;l=j+280|0;D=j+288|0;q=j+328|0;m=d+102872|0;p=d+102944|0;Yd(f,64,32,0,d+68|0,c[p>>2]|0);h=d+102995|0;do{if((a[h]&1)==0){r=d+102932|0}else{r=c[d+102952>>2]|0;if((r|0)!=0){do{wa=r+4|0;b[wa>>1]=b[wa>>1]&-2;g[r+60>>2]=0.0;r=c[r+96>>2]|0;}while((r|0)!=0)}r=d+102932|0;t=c[r>>2]|0;if((t|0)==0){break}do{wa=t+4|0;c[wa>>2]=c[wa>>2]&-34;c[t+128>>2]=0;g[t+132>>2]=1.0;t=c[t+12>>2]|0;}while((t|0)!=0)}}while(0);B=f+28|0;C=f+36|0;t=f+32|0;y=f+40|0;x=f+8|0;w=f+44|0;u=f+12|0;v=l|0;A=l+4|0;E=e|0;F=q|0;G=q+4|0;I=q+8|0;H=q+16|0;K=e+12|0;J=q+12|0;e=q+20|0;W=d+102994|0;Z=o+16|0;X=o+20|0;d=o+24|0;U=o+44|0;R=o+48|0;Q=o+52|0;P=o|0;O=o+28|0;N=o+56|0;M=o+92|0;V=o+128|0;L=n|0;Y=n+4|0;a:while(1){aa=c[r>>2]|0;if((aa|0)==0){m=1;l=119;break}else{_=1.0;$=0}do{ba=aa+4|0;ca=c[ba>>2]|0;do{if((ca&4|0)!=0){if((c[aa+128>>2]|0)>8){break}if((ca&32|0)==0){da=c[aa+48>>2]|0;ca=c[aa+52>>2]|0;if((a[da+38|0]&1)!=0){break}if((a[ca+38|0]&1)!=0){break}ea=c[da+8>>2]|0;fa=c[ca+8>>2]|0;ia=c[ea>>2]|0;ja=c[fa>>2]|0;ha=(ja|0)==2;if(!((ia|0)==2|ha)){l=22;break a}ka=b[ea+4>>1]|0;ga=b[fa+4>>1]|0;if(((ka&2)==0|(ia|0)==0)&((ga&2)==0|(ja|0)==0)){break}if((ka&8)==0){ia=(ia|0)!=2|0}else{ia=1}if((ga&8)==0){if((ia|0)==0&ha){break}}ha=ea+28|0;ja=ea+60|0;xa=+g[ja>>2];ga=fa+28|0;ia=fa+60|0;ya=+g[ia>>2];do{if(xa<ya){if(xa>=1.0){l=31;break a}xa=(ya-xa)/(1.0-xa);ua=ea+36|0;za=1.0-xa;wa=ua;Ba=+(+g[ua>>2]*za+xa*+g[ea+44>>2]);Aa=+(za*+g[ea+40>>2]+xa*+g[ea+48>>2]);g[wa>>2]=Ba;g[wa+4>>2]=Aa;wa=ea+52|0;g[wa>>2]=za*+g[wa>>2]+xa*+g[ea+56>>2];g[ja>>2]=ya;xa=ya}else{if(ya>=xa){break}if(ya>=1.0){l=36;break a}Ba=(xa-ya)/(1.0-ya);ua=fa+36|0;Aa=1.0-Ba;wa=ua;ya=+(+g[ua>>2]*Aa+Ba*+g[fa+44>>2]);za=+(Aa*+g[fa+40>>2]+Ba*+g[fa+48>>2]);g[wa>>2]=ya;g[wa+4>>2]=za;wa=fa+52|0;g[wa>>2]=Aa*+g[wa>>2]+Ba*+g[fa+56>>2];g[ia>>2]=xa}}while(0);if(xa>=1.0){l=40;break a}ua=c[aa+56>>2]|0;wa=c[aa+60>>2]|0;c[Z>>2]=0;c[X>>2]=0;g[d>>2]=0.0;c[U>>2]=0;c[R>>2]=0;g[Q>>2]=0.0;ad(P,c[da+12>>2]|0,ua);ad(O,c[ca+12>>2]|0,wa);hf(N|0,ha|0,36)|0;hf(M|0,ga|0,36)|0;g[V>>2]=1.0;nd(n,o);if((c[L>>2]|0)==3){xa=xa+(1.0-xa)*+g[Y>>2];xa=xa<1.0?xa:1.0}else{xa=1.0}g[aa+132>>2]=xa;c[ba>>2]=c[ba>>2]|32}else{xa=+g[aa+132>>2]}if(xa>=_){break}$=aa;_=xa}}while(0);aa=c[aa+12>>2]|0;}while((aa|0)!=0);if(($|0)==0|_>.9999988079071045){m=1;l=119;break}aa=c[(c[$+48>>2]|0)+8>>2]|0;ba=c[(c[$+52>>2]|0)+8>>2]|0;da=aa+28|0;hf(s|0,da|0,36)|0;ea=ba+28|0;hf(z|0,ea|0,36)|0;ca=aa+60|0;xa=+g[ca>>2];if(xa>=1.0){l=53;break}Aa=(_-xa)/(1.0-xa);ka=aa+36|0;za=1.0-Aa;fa=aa+44|0;ga=aa+48|0;Ba=+g[ka>>2]*za+Aa*+g[fa>>2];Ca=za*+g[aa+40>>2]+Aa*+g[ga>>2];ia=(g[k>>2]=Ba,c[k>>2]|0);ia=ia|0;ya=+Ca;c[ka>>2]=ia;g[ka+4>>2]=ya;ka=aa+52|0;ha=aa+56|0;Aa=za*+g[ka>>2]+Aa*+g[ha>>2];g[ka>>2]=Aa;g[ca>>2]=_;ka=aa+44|0;c[ka>>2]=ia;g[ka+4>>2]=ya;g[ha>>2]=Aa;ya=+T(Aa);ka=aa+20|0;g[ka>>2]=ya;Aa=+S(Aa);ia=aa+24|0;g[ia>>2]=Aa;ma=aa+28|0;za=+g[ma>>2];la=aa+32|0;xa=+g[la>>2];ja=aa+12|0;Ba=+(Ba-(Aa*za-ya*xa));xa=+(Ca-(ya*za+Aa*xa));g[ja>>2]=Ba;g[ja+4>>2]=xa;ca=ba+60|0;xa=+g[ca>>2];if(xa>=1.0){l=56;break}Aa=(_-xa)/(1.0-xa);qa=ba+36|0;za=1.0-Aa;pa=ba+44|0;na=ba+48|0;Ba=+g[qa>>2]*za+Aa*+g[pa>>2];xa=za*+g[ba+40>>2]+Aa*+g[na>>2];wa=(g[k>>2]=Ba,c[k>>2]|0);wa=wa|0;ya=+xa;c[qa>>2]=wa;g[qa+4>>2]=ya;qa=ba+52|0;oa=ba+56|0;Aa=za*+g[qa>>2]+Aa*+g[oa>>2];g[qa>>2]=Aa;g[ca>>2]=_;qa=ba+44|0;c[qa>>2]=wa;g[qa+4>>2]=ya;g[oa>>2]=Aa;ya=+T(Aa);qa=ba+20|0;g[qa>>2]=ya;Aa=+S(Aa);wa=ba+24|0;g[wa>>2]=Aa;ua=ba+28|0;za=+g[ua>>2];ta=ba+32|0;Ca=+g[ta>>2];sa=ba+12|0;Ba=+(Ba-(Aa*za-ya*Ca));Ca=+(xa-(ya*za+Aa*Ca));g[sa>>2]=Ba;g[sa+4>>2]=Ca;Bd($,c[p>>2]|0);ca=$+4|0;ra=c[ca>>2]|0;c[ca>>2]=ra&-33;Da=$+128|0;c[Da>>2]=(c[Da>>2]|0)+1;if((ra&6|0)!=6){c[ca>>2]=ra&-37;hf(da|0,s|0,36)|0;hf(ea|0,z|0,36)|0;za=+g[ha>>2];Ba=+T(za);g[ka>>2]=Ba;za=+S(za);g[ia>>2]=za;Ca=+g[ma>>2];Aa=+g[la>>2];ya=+(+g[fa>>2]-(za*Ca-Ba*Aa));Aa=+(+g[ga>>2]-(Ba*Ca+za*Aa));g[ja>>2]=ya;g[ja+4>>2]=Aa;Aa=+g[oa>>2];ya=+T(Aa);g[qa>>2]=ya;Aa=+S(Aa);g[wa>>2]=Aa;za=+g[ua>>2];Ca=+g[ta>>2];Ba=+(+g[pa>>2]-(Aa*za-ya*Ca));Ca=+(+g[na>>2]-(ya*za+Aa*Ca));g[sa>>2]=Ba;g[sa+4>>2]=Ca;continue}fa=aa+4|0;da=b[fa>>1]|0;if((da&2)==0){b[fa>>1]=da|2;g[aa+144>>2]=0.0}ga=ba+4|0;da=b[ga>>1]|0;if((da&2)==0){b[ga>>1]=da|2;g[ba+144>>2]=0.0}c[B>>2]=0;c[C>>2]=0;c[t>>2]=0;if((c[y>>2]|0)<=0){l=66;break}ea=aa+8|0;c[ea>>2]=0;c[(c[x>>2]|0)+(c[B>>2]<<2)>>2]=aa;ha=(c[B>>2]|0)+1|0;c[B>>2]=ha;if((ha|0)>=(c[y>>2]|0)){l=69;break}da=ba+8|0;c[da>>2]=ha;c[(c[x>>2]|0)+(c[B>>2]<<2)>>2]=ba;c[B>>2]=(c[B>>2]|0)+1;ha=c[C>>2]|0;if((ha|0)>=(c[w>>2]|0)){l=72;break}c[C>>2]=ha+1;c[(c[u>>2]|0)+(ha<<2)>>2]=$;b[fa>>1]=b[fa>>1]|1;b[ga>>1]=b[ga>>1]|1;c[ca>>2]=c[ca>>2]|1;c[v>>2]=aa;c[A>>2]=ba;$=1;while(1){b:do{if((c[aa>>2]|0)==2){ba=c[aa+112>>2]|0;if((ba|0)==0){break}aa=aa+4|0;do{if((c[B>>2]|0)==(c[y>>2]|0)){break b}if((c[C>>2]|0)==(c[w>>2]|0)){break b}ha=c[ba+4>>2]|0;ja=ha+4|0;c:do{if((c[ja>>2]&1|0)==0){ca=c[ba>>2]|0;fa=ca|0;do{if((c[fa>>2]|0)==2){if((b[aa>>1]&8)!=0){break}if((b[ca+4>>1]&8)==0){break c}}}while(0);if((a[(c[ha+48>>2]|0)+38|0]&1)!=0){break}if((a[(c[ha+52>>2]|0)+38|0]&1)!=0){break}ia=ca+28|0;hf(D|0,ia|0,36)|0;ga=ca+4|0;if((b[ga>>1]&1)==0){ka=ca+60|0;xa=+g[ka>>2];if(xa>=1.0){l=88;break a}Aa=(_-xa)/(1.0-xa);wa=ca+36|0;za=1.0-Aa;Ba=+g[wa>>2]*za+Aa*+g[ca+44>>2];xa=za*+g[ca+40>>2]+Aa*+g[ca+48>>2];ua=(g[k>>2]=Ba,c[k>>2]|0);ua=ua|0;ya=+xa;c[wa>>2]=ua;g[wa+4>>2]=ya;wa=ca+52|0;Da=ca+56|0;Aa=za*+g[wa>>2]+Aa*+g[Da>>2];g[wa>>2]=Aa;g[ka>>2]=_;wa=ca+44|0;c[wa>>2]=ua;g[wa+4>>2]=ya;g[Da>>2]=Aa;ya=+T(Aa);g[ca+20>>2]=ya;Aa=+S(Aa);g[ca+24>>2]=Aa;za=+g[ca+28>>2];Ca=+g[ca+32>>2];Da=ca+12|0;Ba=+(Ba-(Aa*za-ya*Ca));Ca=+(xa-(ya*za+Aa*Ca));g[Da>>2]=Ba;g[Da+4>>2]=Ca}Bd(ha,c[p>>2]|0);ka=c[ja>>2]|0;if((ka&4|0)==0){hf(ia|0,D|0,36)|0;Aa=+g[ca+56>>2];ya=+T(Aa);g[ca+20>>2]=ya;Aa=+S(Aa);g[ca+24>>2]=Aa;za=+g[ca+28>>2];Ca=+g[ca+32>>2];Da=ca+12|0;Ba=+(+g[ca+44>>2]-(Aa*za-ya*Ca));Ca=+(+g[ca+48>>2]-(ya*za+Aa*Ca));g[Da>>2]=Ba;g[Da+4>>2]=Ca;break}if((ka&2|0)==0){hf(ia|0,D|0,36)|0;Aa=+g[ca+56>>2];ya=+T(Aa);g[ca+20>>2]=ya;Aa=+S(Aa);g[ca+24>>2]=Aa;za=+g[ca+28>>2];Ca=+g[ca+32>>2];Da=ca+12|0;Ba=+(+g[ca+44>>2]-(Aa*za-ya*Ca));Ca=+(+g[ca+48>>2]-(ya*za+Aa*Ca));g[Da>>2]=Ba;g[Da+4>>2]=Ca;break}c[ja>>2]=ka|1;ia=c[C>>2]|0;if((ia|0)>=(c[w>>2]|0)){l=97;break a}c[C>>2]=ia+1;c[(c[u>>2]|0)+(ia<<2)>>2]=ha;ha=b[ga>>1]|0;if((ha&1)!=0){break}b[ga>>1]=ha|1;do{if((c[fa>>2]|0)!=0){if((ha&2)!=0){break}b[ga>>1]=ha|3;g[ca+144>>2]=0.0}}while(0);fa=c[B>>2]|0;if((fa|0)>=(c[y>>2]|0)){l=104;break a}c[ca+8>>2]=fa;c[(c[x>>2]|0)+(c[B>>2]<<2)>>2]=ca;c[B>>2]=(c[B>>2]|0)+1}}while(0);ba=c[ba+12>>2]|0;}while((ba|0)!=0)}}while(0);if(($|0)>=2){break}aa=c[l+($<<2)>>2]|0;$=$+1|0}Ca=(1.0-_)*+g[E>>2];g[F>>2]=Ca;g[G>>2]=1.0/Ca;g[I>>2]=1.0;c[H>>2]=20;c[J>>2]=c[K>>2];a[e]=0;$d(f,q,c[ea>>2]|0,c[da>>2]|0);if((c[B>>2]|0)>0){$=0;do{aa=c[(c[x>>2]|0)+($<<2)>>2]|0;Da=aa+4|0;b[Da>>1]=b[Da>>1]&-2;do{if((c[aa>>2]|0)==2){pc(aa);aa=c[aa+112>>2]|0;if((aa|0)==0){break}do{Da=(c[aa+4>>2]|0)+4|0;c[Da>>2]=c[Da>>2]&-34;aa=c[aa+12>>2]|0;}while((aa|0)!=0)}}while(0);$=$+1|0;}while(($|0)<(c[B>>2]|0))}xc(m);if((a[W]&1)!=0){m=0;l=119;break}}if((l|0)==22){va(200,2768,641,4376)}else if((l|0)==31){va(136,2144,723,4416)}else if((l|0)==36){va(136,2144,723,4416)}else if((l|0)==40){va(136,2768,676,4376)}else if((l|0)==53){va(136,2144,723,4416)}else if((l|0)==56){va(136,2144,723,4416)}else if((l|0)==66){va(1640,1760,54,4368)}else if((l|0)==69){va(1640,1760,54,4368)}else if((l|0)==72){va(1672,1760,62,4368)}else if((l|0)==88){va(136,2144,723,4416)}else if((l|0)==97){va(1672,1760,62,4368)}else if((l|0)==104){va(1640,1760,54,4368)}else if((l|0)==119){a[h]=m;Zd(f);i=j;return}}function Uc(b,d,e,f){b=b|0;d=+d;e=e|0;f=f|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;j=i;i=i+56|0;h=j|0;m=j+8|0;o=j+32|0;p=j+40|0;n=j+48|0;vd(h);k=b+102868|0;q=c[k>>2]|0;if((q&1|0)!=0){xc(b+102872|0);q=c[k>>2]&-2;c[k>>2]=q}c[k>>2]=q|2;q=m|0;g[q>>2]=d;c[m+12>>2]=e;c[m+16>>2]=f;if(d>0.0){g[m+4>>2]=1.0/d}else{g[m+4>>2]=0.0}f=b+102988|0;g[m+8>>2]=+g[f>>2]*d;a[m+20|0]=a[b+102992|0]&1;vd(o);wc(b+102872|0);g[b+103e3>>2]=+xd(o);do{if((a[b+102995|0]&1)!=0){if(+g[q>>2]<=0.0){break}vd(p);Sc(b,m);g[b+103004>>2]=+xd(p)}}while(0);do{if((a[b+102993|0]&1)==0){l=12}else{d=+g[q>>2];if(d<=0.0){break}vd(n);Tc(b,m);g[b+103024>>2]=+xd(n);l=12}}while(0);if((l|0)==12){d=+g[q>>2]}if(d>0.0){g[f>>2]=+g[m+4>>2]}l=c[k>>2]|0;if((l&4|0)==0){e=l;e=e&-3;c[k>>2]=e;d=+xd(h);e=b+102996|0;g[e>>2]=d;i=j;return}m=c[b+102952>>2]|0;if((m|0)==0){e=l;e=e&-3;c[k>>2]=e;d=+xd(h);e=b+102996|0;g[e>>2]=d;i=j;return}do{g[m+76>>2]=0.0;g[m+80>>2]=0.0;g[m+84>>2]=0.0;m=c[m+96>>2]|0;}while((m|0)!=0);e=c[k>>2]|0;e=e&-3;c[k>>2]=e;d=+xd(h);e=b+102996|0;g[e>>2]=d;i=j;return}function Vc(a,c,d){a=a|0;c=c|0;d=d|0;a=b[c+36>>1]|0;if(!(a<<16>>16!=(b[d+36>>1]|0)|a<<16>>16==0)){a=a<<16>>16>0;return a|0}if((b[d+32>>1]&b[c+34>>1])<<16>>16==0){a=0;return a|0}a=(b[d+34>>1]&b[c+32>>1])<<16>>16!=0;return a|0}function Wc(a){a=a|0;return}function Xc(a){a=a|0;bf(a);return}function Yc(a){a=a|0;fd(a|0);c[a+28>>2]=0;c[a+48>>2]=16;c[a+52>>2]=0;c[a+44>>2]=lc(192)|0;c[a+36>>2]=16;c[a+40>>2]=0;c[a+32>>2]=lc(64)|0;return}function Zc(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;d=id(a|0,b,d)|0;b=a+28|0;c[b>>2]=(c[b>>2]|0)+1;b=a+40|0;e=c[b>>2]|0;f=a+36|0;a=a+32|0;if((e|0)==(c[f>>2]|0)){g=c[a>>2]|0;c[f>>2]=e<<1;f=lc(e<<3)|0;c[a>>2]=f;e=g;hf(f|0,e|0,c[b>>2]<<2)|0;mc(e);e=c[b>>2]|0}c[(c[a>>2]|0)+(e<<2)>>2]=d;c[b>>2]=(c[b>>2]|0)+1;return d|0}function _c(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;if(!(ld(a|0,b,d,e)|0)){return}e=a+40|0;d=c[e>>2]|0;f=a+36|0;a=a+32|0;if((d|0)==(c[f>>2]|0)){g=c[a>>2]|0;c[f>>2]=d<<1;f=lc(d<<3)|0;c[a>>2]=f;d=g;hf(f|0,d|0,c[e>>2]<<2)|0;mc(d);d=c[e>>2]|0}c[(c[a>>2]|0)+(d<<2)>>2]=b;c[e>>2]=(c[e>>2]|0)+1;return}function $c(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=a+56|0;g=c[e>>2]|0;if((g|0)==(b|0)){return 1}d=a+52|0;f=c[d>>2]|0;h=a+48|0;a=a+44|0;if((f|0)==(c[h>>2]|0)){g=c[a>>2]|0;c[h>>2]=f<<1;f=lc(f*24|0)|0;c[a>>2]=f;hf(f|0,g|0,(c[d>>2]|0)*12|0)|0;mc(g);g=c[e>>2]|0;f=c[d>>2]|0}c[(c[a>>2]|0)+(f*12|0)>>2]=(g|0)>(b|0)?b:g;e=c[e>>2]|0;c[(c[a>>2]|0)+((c[d>>2]|0)*12|0)+4>>2]=(e|0)<(b|0)?b:e;c[d>>2]=(c[d>>2]|0)+1;return 1}function ad(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,h=0,i=0,j=0;e=c[b+4>>2]|0;if((e|0)==0){c[a+16>>2]=b+12;c[a+20>>2]=1;g[a+24>>2]=+g[b+8>>2];return}else if((e|0)==3){if((d|0)<=-1){va(2936,3872,53,4752)}e=b+16|0;if((c[e>>2]|0)<=(d|0)){va(2936,3872,53,4752)}h=b+12|0;j=(c[h>>2]|0)+(d<<3)|0;f=a;i=c[j+4>>2]|0;c[f>>2]=c[j>>2];c[f+4>>2]=i;f=d+1|0;d=a+8|0;h=c[h>>2]|0;if((f|0)<(c[e>>2]|0)){h=h+(f<<3)|0;j=d;i=c[h+4>>2]|0;c[j>>2]=c[h>>2];c[j+4>>2]=i}else{j=d;i=c[h+4>>2]|0;c[j>>2]=c[h>>2];c[j+4>>2]=i}c[a+16>>2]=a;c[a+20>>2]=2;g[a+24>>2]=+g[b+8>>2];return}else if((e|0)==2){c[a+16>>2]=b+20;c[a+20>>2]=c[b+148>>2];g[a+24>>2]=+g[b+8>>2];return}else if((e|0)==1){c[a+16>>2]=b+12;c[a+20>>2]=2;g[a+24>>2]=+g[b+8>>2];return}else{va(2664,3872,81,4752)}}function bd(a){a=a|0;var b=0,d=0.0,e=0.0,f=0.0,h=0,i=0.0,j=0.0,k=0.0,l=0.0,m=0.0,n=0.0,o=0.0,p=0.0,q=0.0,r=0.0,s=0.0,t=0.0,u=0.0,v=0.0,w=0;h=a+16|0;r=+g[h>>2];p=+g[h+4>>2];h=a+36|0;b=a+52|0;o=+g[b>>2];q=+g[b+4>>2];b=a+72|0;w=a+88|0;s=+g[w>>2];l=+g[w+4>>2];u=o-r;k=q-p;d=r*u+p*k;i=o*u+q*k;j=s-r;t=l-p;f=r*j+p*t;e=s*j+l*t;v=s-o;m=l-q;n=o*v+q*m;m=s*v+l*m;j=u*t-k*j;k=(o*l-q*s)*j;l=(p*s-r*l)*j;j=(r*q-p*o)*j;if(!(d<-0.0|f<-0.0)){g[a+24>>2]=1.0;c[a+108>>2]=1;return}if(!(d>=-0.0|i<=0.0|j>0.0)){v=1.0/(i-d);g[a+24>>2]=i*v;g[a+60>>2]=-0.0-d*v;c[a+108>>2]=2;return}if(!(f>=-0.0|e<=0.0|l>0.0)){v=1.0/(e-f);g[a+24>>2]=e*v;g[a+96>>2]=-0.0-f*v;c[a+108>>2]=2;hf(h|0,b|0,36)|0;return}if(!(i>0.0|n<-0.0)){g[a+60>>2]=1.0;c[a+108>>2]=1;hf(a|0,h|0,36)|0;return}if(!(e>0.0|m>0.0)){g[a+96>>2]=1.0;c[a+108>>2]=1;hf(a|0,b|0,36)|0;return}if(n>=-0.0|m<=0.0|k>0.0){v=1.0/(j+(k+l));g[a+24>>2]=k*v;g[a+60>>2]=l*v;g[a+96>>2]=j*v;c[a+108>>2]=3;return}else{v=1.0/(m-n);g[a+60>>2]=m*v;g[a+96>>2]=-0.0-n*v;c[a+108>>2]=2;hf(a|0,b|0,36)|0;return}}function cd(d,e,f){d=d|0;e=e|0;f=f|0;var h=0,j=0,l=0.0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0.0,w=0.0,x=0.0,y=0,z=0,A=0.0,B=0.0,C=0.0,D=0.0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0.0,M=0,N=0,O=0,P=0,R=0,S=0.0,T=0.0,U=0.0,V=0,W=0,X=0,Y=0.0,Z=0.0,_=0.0,$=0,aa=0;h=i;i=i+176|0;r=h|0;q=h+16|0;n=h+32|0;t=h+144|0;y=h+160|0;c[1598]=(c[1598]|0)+1;j=r;p=f+56|0;c[j>>2]=c[p>>2];c[j+4>>2]=c[p+4>>2];c[j+8>>2]=c[p+8>>2];c[j+12>>2]=c[p+12>>2];j=q;p=f+72|0;c[j>>2]=c[p>>2];c[j+4>>2]=c[p+4>>2];c[j+8>>2]=c[p+8>>2];c[j+12>>2]=c[p+12>>2];dd(n,e,f|0,r,f+28|0,q);j=n|0;p=n+108|0;M=c[p>>2]|0;if((M|0)==1|(M|0)==2|(M|0)==3){o=n+16|0;m=n+20|0;w=+g[r+12>>2];x=+g[r+8>>2];u=f+16|0;s=f+20|0;v=+g[r>>2];A=+g[r+4>>2];B=+g[q+12>>2];C=+g[q+8>>2];z=f+44|0;E=f+48|0;D=+g[q>>2];L=+g[q+4>>2];q=n+52|0;r=n+56|0;I=n+16|0;J=n+52|0;K=n+24|0;F=n+60|0;G=n;H=n+36|0;N=0;a:while(1){O=(M|0)>0;if(O){P=0;do{c[t+(P<<2)>>2]=c[j+(P*36|0)+28>>2];c[y+(P<<2)>>2]=c[j+(P*36|0)+32>>2];P=P+1|0;}while((P|0)<(M|0))}do{if((M|0)==1){R=17}else if((M|0)==2){_=+g[I>>2];S=+g[I+4>>2];T=+g[J>>2];Y=+g[J+4>>2];Z=T-_;U=Y-S;S=_*Z+S*U;if(S>=-0.0){g[K>>2]=1.0;c[p>>2]=1;R=17;break}T=T*Z+Y*U;if(T>0.0){_=1.0/(T-S);g[K>>2]=T*_;g[F>>2]=-0.0-S*_;c[p>>2]=2;R=18;break}else{g[F>>2]=1.0;c[p>>2]=1;hf(G|0,H|0,36)|0;R=17;break}}else if((M|0)==3){bd(n);P=c[p>>2]|0;if((P|0)==0){R=15;break a}else if((P|0)==2){R=18}else if((P|0)==1){R=17}else if((P|0)==3){R=42;break a}else{R=16;break a}}else{R=13;break a}}while(0);do{if((R|0)==17){S=-0.0- +g[o>>2];T=-0.0- +g[m>>2];P=1}else if((R|0)==18){Z=+g[o>>2];T=+g[q>>2]-Z;_=+g[m>>2];S=+g[r>>2]-_;if(Z*S-T*_>0.0){S=-0.0-S;P=2;break}else{T=-0.0-T;P=2;break}}}while(0);if(T*T+S*S<1.4210854715202004e-14){R=42;break}V=j+(P*36|0)|0;Z=-0.0-S;_=-0.0-T;Y=w*Z+x*_;Z=w*_-x*Z;W=c[u>>2]|0;X=c[s>>2]|0;if((X|0)>1){U=Z*+g[W+4>>2]+Y*+g[W>>2];aa=1;$=0;while(1){_=Y*+g[W+(aa<<3)>>2]+Z*+g[W+(aa<<3)+4>>2];R=_>U;$=R?aa:$;aa=aa+1|0;if((aa|0)<(X|0)){U=R?_:U}else{break}}R=j+(P*36|0)+28|0;c[R>>2]=$;if(($|0)<=-1){R=28;break}}else{R=j+(P*36|0)+28|0;c[R>>2]=0;$=0}if((X|0)<=($|0)){R=28;break}Z=+g[W+($<<3)>>2];Y=+g[W+($<<3)+4>>2];U=v+(w*Z-x*Y);W=V;_=+U;Y=+(Z*x+w*Y+A);g[W>>2]=_;g[W+4>>2]=Y;Y=S*B+T*C;S=T*B-S*C;W=c[z>>2]|0;V=c[E>>2]|0;if((V|0)>1){T=S*+g[W+4>>2]+Y*+g[W>>2];aa=1;$=0;while(1){Z=Y*+g[W+(aa<<3)>>2]+S*+g[W+(aa<<3)+4>>2];X=Z>T;$=X?aa:$;aa=aa+1|0;if((aa|0)<(V|0)){T=X?Z:T}else{break}}X=j+(P*36|0)+32|0;c[X>>2]=$;if(($|0)<=-1){R=35;break}}else{X=j+(P*36|0)+32|0;c[X>>2]=0;$=0}if((V|0)<=($|0)){R=35;break}T=+g[W+($<<3)>>2];_=+g[W+($<<3)+4>>2];Z=D+(B*T-C*_);aa=j+(P*36|0)+8|0;Y=+Z;_=+(T*C+B*_+L);g[aa>>2]=Y;g[aa+4>>2]=_;aa=j+(P*36|0)+16|0;Z=+(Z-U);_=+(+g[j+(P*36|0)+12>>2]- +g[j+(P*36|0)+4>>2]);g[aa>>2]=Z;g[aa+4>>2]=_;N=N+1|0;c[1596]=(c[1596]|0)+1;if(O){P=c[R>>2]|0;O=0;do{if((P|0)==(c[t+(O<<2)>>2]|0)){if((c[X>>2]|0)==(c[y+(O<<2)>>2]|0)){R=42;break a}}O=O+1|0;}while((O|0)<(M|0))}M=(c[p>>2]|0)+1|0;c[p>>2]=M;if((N|0)>=20){R=42;break}}if((R|0)==13){va(2664,3872,498,5016)}else if((R|0)==15){va(2664,3872,194,4144)}else if((R|0)==16){va(2664,3872,207,4144)}else if((R|0)==28){va(1552,1032,103,4216)}else if((R|0)==35){va(1552,1032,103,4216)}else if((R|0)==42){s=c[1594]|0;c[1594]=(s|0)>(N|0)?s:N;z=d+8|0;ed(n,d|0,z);t=d|0;y=z|0;Z=+g[t>>2]- +g[y>>2];u=d+4|0;s=d+12|0;_=+g[u>>2]- +g[s>>2];E=d+16|0;g[E>>2]=+Q(Z*Z+_*_);c[d+20>>2]=N;p=c[p>>2]|0;if((p|0)==0){va(2664,3872,246,4104)}else if((p|0)==2){_=+g[o>>2]- +g[q>>2];l=+g[m>>2]- +g[r>>2];l=+Q(_*_+l*l)}else if((p|0)==3){l=+g[o>>2];_=+g[m>>2];l=(+g[q>>2]-l)*(+g[n+92>>2]-_)-(+g[r>>2]-_)*(+g[n+88>>2]-l)}else if((p|0)==1){l=0.0}else{va(2664,3872,259,4104)}g[e>>2]=l;b[e+4>>1]=p;m=0;do{a[e+6+m|0]=c[j+(m*36|0)+28>>2];a[e+9+m|0]=c[j+(m*36|0)+32>>2];m=m+1|0;}while((m|0)<(p|0));if((a[f+88|0]&1)==0){i=h;return}l=+g[f+24>>2];v=+g[f+52>>2];x=+g[E>>2];w=l+v;if(!(x>w&x>1.1920928955078125e-7)){aa=d;$=(g[k>>2]=(+g[t>>2]+ +g[y>>2])*.5,c[k>>2]|0);$=$|0;_=+((+g[u>>2]+ +g[s>>2])*.5);c[aa>>2]=$;g[aa+4>>2]=_;aa=z;c[aa>>2]=$;g[aa+4>>2]=_;g[E>>2]=0.0;i=h;return}g[E>>2]=x-w;A=+g[y>>2];B=+g[t>>2];L=A-B;x=+g[s>>2];w=+g[u>>2];C=x-w;D=+Q(L*L+C*C);if(D>=1.1920928955078125e-7){_=1.0/D;L=L*_;C=C*_}g[t>>2]=l*L+B;g[u>>2]=l*C+w;g[y>>2]=A-v*L;g[s>>2]=x-v*C;i=h;return}}else if((M|0)==0){va(2664,3872,194,4144)}else{va(2664,3872,207,4144)}}function dd(a,e,f,h,i,j){a=a|0;e=e|0;f=f|0;h=h|0;i=i|0;j=j|0;var k=0,l=0,m=0.0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0.0,E=0.0,F=0,G=0.0,H=0.0,I=0.0,J=0.0,K=0.0,L=0.0;p=b[e+4>>1]|0;if((p&65535)>>>0>=4>>>0){va(552,3872,102,4304)}q=p&65535;k=a+108|0;c[k>>2]=q;o=a|0;a:do{if(p<<16>>16==0){n=q}else{p=f+20|0;A=f+16|0;v=i+20|0;r=i+16|0;s=h+12|0;t=h+8|0;u=h|0;q=h+4|0;w=j+12|0;x=j+8|0;y=j|0;z=j+4|0;B=0;while(1){F=d[e+6+B|0]|0;c[o+(B*36|0)+28>>2]=F;C=d[e+9+B|0]|0;c[o+(B*36|0)+32>>2]=C;if((c[p>>2]|0)<=(F|0)){l=6;break}F=(c[A>>2]|0)+(F<<3)|0;E=+g[F>>2];D=+g[F+4>>2];if((c[v>>2]|0)<=(C|0)){l=8;break}C=(c[r>>2]|0)+(C<<3)|0;I=+g[C>>2];K=+g[C+4>>2];L=+g[s>>2];J=+g[t>>2];G=+g[u>>2]+(E*L-D*J);C=o+(B*36|0)|0;H=+G;J=+(D*L+E*J+ +g[q>>2]);g[C>>2]=H;g[C+4>>2]=J;J=+g[w>>2];E=+g[x>>2];D=+g[y>>2]+(I*J-K*E);C=o+(B*36|0)+8|0;H=+D;E=+(K*J+I*E+ +g[z>>2]);g[C>>2]=H;g[C+4>>2]=E;C=o+(B*36|0)+16|0;D=+(D-G);E=+(+g[o+(B*36|0)+12>>2]- +g[o+(B*36|0)+4>>2]);g[C>>2]=D;g[C+4>>2]=E;g[o+(B*36|0)+24>>2]=0.0;B=B+1|0;C=c[k>>2]|0;if((B|0)>=(C|0)){n=C;break a}}if((l|0)==6){va(1552,1032,103,4216)}else if((l|0)==8){va(1552,1032,103,4216)}}}while(0);do{if((n|0)>1){D=+g[e>>2];if((n|0)==3){m=+g[a+16>>2];L=+g[a+20>>2];m=(+g[a+52>>2]-m)*(+g[a+92>>2]-L)-(+g[a+56>>2]-L)*(+g[a+88>>2]-m)}else if((n|0)==2){L=+g[a+16>>2]- +g[a+52>>2];m=+g[a+20>>2]- +g[a+56>>2];m=+Q(L*L+m*m)}else{va(2664,3872,259,4104)}if(m>=D*.5){if(!(D*2.0<m|m<1.1920928955078125e-7)){l=18;break}}c[k>>2]=0}else{l=18}}while(0);do{if((l|0)==18){if((n|0)==0){break}return}}while(0);c[a+28>>2]=0;c[a+32>>2]=0;if((c[f+20>>2]|0)<=0){va(1552,1032,103,4216)}F=c[f+16>>2]|0;m=+g[F>>2];D=+g[F+4>>2];if((c[i+20>>2]|0)<=0){va(1552,1032,103,4216)}F=c[i+16>>2]|0;G=+g[F>>2];E=+g[F+4>>2];J=+g[h+12>>2];L=+g[h+8>>2];K=+g[h>>2]+(m*J-D*L);L=D*J+m*L+ +g[h+4>>2];F=a;J=+K;H=+L;g[F>>2]=J;g[F+4>>2]=H;H=+g[j+12>>2];J=+g[j+8>>2];I=+g[j>>2]+(G*H-E*J);J=E*H+G*J+ +g[j+4>>2];F=a+8|0;G=+I;H=+J;g[F>>2]=G;g[F+4>>2]=H;F=a+16|0;K=+(I-K);L=+(J-L);g[F>>2]=K;g[F+4>>2]=L;c[k>>2]=1;return}function ed(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0.0,h=0.0,i=0.0,j=0;e=c[a+108>>2]|0;if((e|0)==3){i=+g[a+24>>2];h=+g[a+60>>2];f=+g[a+96>>2];e=b;b=(g[k>>2]=i*+g[a>>2]+h*+g[a+36>>2]+f*+g[a+72>>2],c[k>>2]|0);b=b|0;f=+(i*+g[a+4>>2]+h*+g[a+40>>2]+f*+g[a+76>>2]);c[e>>2]=b;g[e+4>>2]=f;c[d>>2]=b;g[d+4>>2]=f;return}else if((e|0)==0){va(2664,3872,217,4120)}else if((e|0)==2){j=a+24|0;h=+g[j>>2];e=a+60|0;f=+g[e>>2];i=+(h*+g[a>>2]+f*+g[a+36>>2]);f=+(h*+g[a+4>>2]+f*+g[a+40>>2]);g[b>>2]=i;g[b+4>>2]=f;f=+g[j>>2];i=+g[e>>2];h=+(f*+g[a+8>>2]+i*+g[a+44>>2]);i=+(f*+g[a+12>>2]+i*+g[a+48>>2]);g[d>>2]=h;g[d+4>>2]=i;return}else if((e|0)==1){e=a;j=c[e+4>>2]|0;c[b>>2]=c[e>>2];c[b+4>>2]=j;b=a+8|0;j=d;d=c[b+4>>2]|0;c[j>>2]=c[b>>2];c[j+4>>2]=d;return}else{va(2664,3872,236,4120)}}function fd(a){a=a|0;var b=0,d=0,e=0,f=0;c[a>>2]=-1;d=a+12|0;c[d>>2]=16;c[a+8>>2]=0;f=lc(576)|0;b=a+4|0;c[b>>2]=f;gf(f|0,0,(c[d>>2]|0)*36|0|0)|0;f=(c[d>>2]|0)-1|0;if((f|0)>0){f=0;while(1){e=f+1|0;c[(c[b>>2]|0)+(f*36|0)+20>>2]=e;c[(c[b>>2]|0)+(f*36|0)+32>>2]=-1;f=(c[d>>2]|0)-1|0;if((e|0)<(f|0)){f=e}else{break}}}c[(c[b>>2]|0)+(f*36|0)+20>>2]=-1;c[(c[b>>2]|0)+(((c[d>>2]|0)-1|0)*36|0)+32>>2]=-1;c[a+16>>2]=0;c[a+20>>2]=0;c[a+24>>2]=0;return}function gd(a){a=a|0;mc(c[a+4>>2]|0);return}function hd(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0;b=a+16|0;e=c[b>>2]|0;if((e|0)==-1){d=a+8|0;g=c[d>>2]|0;e=a+12|0;if((g|0)!=(c[e>>2]|0)){va(2832,3832,61,4896);return 0}f=a+4|0;h=c[f>>2]|0;c[e>>2]=g<<1;a=lc(g*72|0)|0;c[f>>2]=a;g=h;hf(a|0,g|0,(c[d>>2]|0)*36|0)|0;mc(g);g=c[d>>2]|0;a=(c[e>>2]|0)-1|0;if((g|0)<(a|0)){while(1){a=g+1|0;c[(c[f>>2]|0)+(g*36|0)+20>>2]=a;c[(c[f>>2]|0)+(g*36|0)+32>>2]=-1;g=(c[e>>2]|0)-1|0;if((a|0)<(g|0)){g=a}else{break}}}else{g=a}c[(c[f>>2]|0)+(g*36|0)+20>>2]=-1;c[(c[f>>2]|0)+(((c[e>>2]|0)-1|0)*36|0)+32>>2]=-1;e=c[d>>2]|0;c[b>>2]=e}else{f=a+4|0;d=a+8|0}h=(c[f>>2]|0)+(e*36|0)+20|0;c[b>>2]=c[h>>2];c[h>>2]=-1;c[(c[f>>2]|0)+(e*36|0)+24>>2]=-1;c[(c[f>>2]|0)+(e*36|0)+28>>2]=-1;c[(c[f>>2]|0)+(e*36|0)+32>>2]=0;c[(c[f>>2]|0)+(e*36|0)+16>>2]=0;c[d>>2]=(c[d>>2]|0)+1;return e|0}function id(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,h=0,i=0.0,j=0.0;e=hd(a)|0;f=a+4|0;h=(c[f>>2]|0)+(e*36|0)|0;i=+(+g[b>>2]+-.10000000149011612);j=+(+g[b+4>>2]+-.10000000149011612);g[h>>2]=i;g[h+4>>2]=j;h=(c[f>>2]|0)+(e*36|0)+8|0;j=+(+g[b+8>>2]+.10000000149011612);i=+(+g[b+12>>2]+.10000000149011612);g[h>>2]=j;g[h+4>>2]=i;c[(c[f>>2]|0)+(e*36|0)+16>>2]=d;c[(c[f>>2]|0)+(e*36|0)+32>>2]=0;jd(a,e);return e|0}function jd(a,b){a=a|0;b=b|0;var d=0,e=0,f=0.0,h=0.0,i=0.0,j=0.0,k=0,l=0,m=0,n=0,o=0.0,p=0.0,q=0.0,r=0.0,s=0.0,t=0.0,u=0.0,v=0.0,w=0.0,x=0.0,y=0.0,z=0;e=a+24|0;c[e>>2]=(c[e>>2]|0)+1;e=a|0;l=c[e>>2]|0;if((l|0)==-1){c[e>>2]=b;c[(c[a+4>>2]|0)+(b*36|0)+20>>2]=-1;return}d=a+4|0;k=c[d>>2]|0;j=+g[k+(b*36|0)>>2];i=+g[k+(b*36|0)+4>>2];h=+g[k+(b*36|0)+8>>2];f=+g[k+(b*36|0)+12>>2];m=c[k+(l*36|0)+24>>2]|0;a:do{if((m|0)!=-1){do{n=c[k+(l*36|0)+28>>2]|0;r=+g[k+(l*36|0)+8>>2];s=+g[k+(l*36|0)>>2];q=+g[k+(l*36|0)+12>>2];p=+g[k+(l*36|0)+4>>2];w=((r>h?r:h)-(s<j?s:j)+((q>f?q:f)-(p<i?p:i)))*2.0;o=w*2.0;p=(w-(r-s+(q-p))*2.0)*2.0;w=+g[k+(m*36|0)>>2];r=j<w?j:w;s=+g[k+(m*36|0)+4>>2];t=i<s?i:s;u=+g[k+(m*36|0)+8>>2];v=h>u?h:u;q=+g[k+(m*36|0)+12>>2];x=f>q?f:q;if((c[k+(m*36|0)+24>>2]|0)==-1){q=(v-r+(x-t))*2.0}else{q=(v-r+(x-t))*2.0-(u-w+(q-s))*2.0}q=p+q;s=+g[k+(n*36|0)>>2];r=j<s?j:s;t=+g[k+(n*36|0)+4>>2];x=i<t?i:t;w=+g[k+(n*36|0)+8>>2];v=h>w?h:w;u=+g[k+(n*36|0)+12>>2];y=f>u?f:u;if((c[k+(n*36|0)+24>>2]|0)==-1){r=(v-r+(y-x))*2.0}else{r=(v-r+(y-x))*2.0-(w-s+(u-t))*2.0}p=p+r;if(o<q&o<p){break a}l=q<p?m:n;m=c[k+(l*36|0)+24>>2]|0;}while((m|0)!=-1)}}while(0);m=c[k+(l*36|0)+20>>2]|0;k=hd(a)|0;c[(c[d>>2]|0)+(k*36|0)+20>>2]=m;c[(c[d>>2]|0)+(k*36|0)+16>>2]=0;n=c[d>>2]|0;p=+g[n+(l*36|0)>>2];o=+g[n+(l*36|0)+4>>2];z=n+(k*36|0)|0;j=+(j<p?j:p);i=+(i<o?i:o);g[z>>2]=j;g[z+4>>2]=i;j=+g[n+(l*36|0)+8>>2];i=+g[n+(l*36|0)+12>>2];n=n+(k*36|0)+8|0;h=+(h>j?h:j);y=+(f>i?f:i);g[n>>2]=h;g[n+4>>2]=y;n=c[d>>2]|0;c[n+(k*36|0)+32>>2]=(c[n+(l*36|0)+32>>2]|0)+1;n=c[d>>2]|0;if((m|0)==-1){c[n+(k*36|0)+24>>2]=l;c[(c[d>>2]|0)+(k*36|0)+28>>2]=b;c[(c[d>>2]|0)+(l*36|0)+20>>2]=k;c[(c[d>>2]|0)+(b*36|0)+20>>2]=k;c[e>>2]=k}else{e=n+(m*36|0)+24|0;if((c[e>>2]|0)==(l|0)){c[e>>2]=k}else{c[n+(m*36|0)+28>>2]=k}c[(c[d>>2]|0)+(k*36|0)+24>>2]=l;c[(c[d>>2]|0)+(k*36|0)+28>>2]=b;c[(c[d>>2]|0)+(l*36|0)+20>>2]=k;c[(c[d>>2]|0)+(b*36|0)+20>>2]=k}b=c[(c[d>>2]|0)+(b*36|0)+20>>2]|0;if((b|0)==-1){return}while(1){b=md(a,b)|0;n=c[d>>2]|0;k=c[n+(b*36|0)+24>>2]|0;e=c[n+(b*36|0)+28>>2]|0;if((k|0)==-1){d=20;break}if((e|0)==-1){d=22;break}m=c[n+(k*36|0)+32>>2]|0;l=c[n+(e*36|0)+32>>2]|0;c[n+(b*36|0)+32>>2]=((m|0)>(l|0)?m:l)+1;l=c[d>>2]|0;j=+g[l+(k*36|0)>>2];i=+g[l+(e*36|0)>>2];h=+g[l+(k*36|0)+4>>2];f=+g[l+(e*36|0)+4>>2];m=l+(b*36|0)|0;i=+(j<i?j:i);f=+(h<f?h:f);g[m>>2]=i;g[m+4>>2]=f;f=+g[l+(k*36|0)+8>>2];i=+g[l+(e*36|0)+8>>2];h=+g[l+(k*36|0)+12>>2];j=+g[l+(e*36|0)+12>>2];e=l+(b*36|0)+8|0;f=+(f>i?f:i);y=+(h>j?h:j);g[e>>2]=f;g[e+4>>2]=y;b=c[(c[d>>2]|0)+(b*36|0)+20>>2]|0;if((b|0)==-1){d=24;break}}if((d|0)==20){va(320,3832,307,4912)}else if((d|0)==22){va(152,3832,308,4912)}else if((d|0)==24){return}}function kd(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,h=0,i=0,j=0.0,k=0.0,l=0,m=0.0,n=0.0;i=a|0;if((c[i>>2]|0)==(b|0)){c[i>>2]=-1;return}d=a+4|0;h=c[d>>2]|0;e=c[h+(b*36|0)+20>>2]|0;f=c[h+(e*36|0)+20>>2]|0;l=c[h+(e*36|0)+24>>2]|0;if((l|0)==(b|0)){l=c[h+(e*36|0)+28>>2]|0}if((f|0)==-1){c[i>>2]=l;c[h+(l*36|0)+20>>2]=-1;if((e|0)<=-1){va(2608,3832,97,4872)}if((c[a+12>>2]|0)<=(e|0)){va(2608,3832,97,4872)}f=a+8|0;if((c[f>>2]|0)<=0){va(1536,3832,98,4872)}b=a+16|0;c[(c[d>>2]|0)+(e*36|0)+20>>2]=c[b>>2];c[(c[d>>2]|0)+(e*36|0)+32>>2]=-1;c[b>>2]=e;c[f>>2]=(c[f>>2]|0)-1;return}i=h+(f*36|0)+24|0;if((c[i>>2]|0)==(e|0)){c[i>>2]=l}else{c[h+(f*36|0)+28>>2]=l}c[(c[d>>2]|0)+(l*36|0)+20>>2]=f;if((e|0)<=-1){va(2608,3832,97,4872)}if((c[a+12>>2]|0)<=(e|0)){va(2608,3832,97,4872)}h=a+8|0;if((c[h>>2]|0)<=0){va(1536,3832,98,4872)}b=a+16|0;c[(c[d>>2]|0)+(e*36|0)+20>>2]=c[b>>2];c[(c[d>>2]|0)+(e*36|0)+32>>2]=-1;c[b>>2]=e;c[h>>2]=(c[h>>2]|0)-1;do{e=md(a,f)|0;i=c[d>>2]|0;h=c[i+(e*36|0)+24>>2]|0;f=c[i+(e*36|0)+28>>2]|0;n=+g[i+(h*36|0)>>2];m=+g[i+(f*36|0)>>2];k=+g[i+(h*36|0)+4>>2];j=+g[i+(f*36|0)+4>>2];l=i+(e*36|0)|0;m=+(n<m?n:m);n=+(k<j?k:j);g[l>>2]=m;g[l+4>>2]=n;n=+g[i+(h*36|0)+8>>2];m=+g[i+(f*36|0)+8>>2];k=+g[i+(h*36|0)+12>>2];j=+g[i+(f*36|0)+12>>2];i=i+(e*36|0)+8|0;m=+(n>m?n:m);n=+(k>j?k:j);g[i>>2]=m;g[i+4>>2]=n;i=c[d>>2]|0;h=c[i+(h*36|0)+32>>2]|0;f=c[i+(f*36|0)+32>>2]|0;c[i+(e*36|0)+32>>2]=((h|0)>(f|0)?h:f)+1;f=c[(c[d>>2]|0)+(e*36|0)+20>>2]|0;}while((f|0)!=-1);return}function ld(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,h=0.0,i=0.0,j=0.0,k=0.0,l=0.0,m=0.0,n=0;if((b|0)<=-1){va(984,3832,135,4856);return 0}if((c[a+12>>2]|0)<=(b|0)){va(984,3832,135,4856);return 0}f=a+4|0;n=c[f>>2]|0;if((c[n+(b*36|0)+24>>2]|0)!=-1){va(520,3832,137,4856);return 0}do{if(+g[n+(b*36|0)>>2]<=+g[d>>2]){if(+g[n+(b*36|0)+4>>2]>+g[d+4>>2]){break}if(+g[d+8>>2]>+g[n+(b*36|0)+8>>2]){break}if(+g[d+12>>2]>+g[n+(b*36|0)+12>>2]){break}else{a=0}return a|0}}while(0);kd(a,b);n=d;m=+g[n>>2];h=+g[n+4>>2];d=d+8|0;i=+g[d>>2];m=m+-.10000000149011612;h=h+-.10000000149011612;i=i+.10000000149011612;k=+g[d+4>>2]+.10000000149011612;l=+g[e>>2]*2.0;j=+g[e+4>>2]*2.0;if(l<0.0){m=m+l}else{i=l+i}if(j<0.0){h=h+j}else{k=j+k}d=c[f>>2]|0;n=d+(b*36|0)|0;m=+m;l=+h;g[n>>2]=m;g[n+4>>2]=l;d=d+(b*36|0)+8|0;l=+i;m=+k;g[d>>2]=l;g[d+4>>2]=m;jd(a,b);d=1;return d|0}function md(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0.0,t=0,u=0,v=0,w=0,x=0.0,y=0.0,z=0.0,A=0.0;if((b|0)==-1){va(120,3832,382,4888);return 0}m=a+4|0;h=c[m>>2]|0;n=h+(b*36|0)|0;t=h+(b*36|0)+24|0;j=c[t>>2]|0;if((j|0)==-1){w=b;return w|0}d=h+(b*36|0)+32|0;if((c[d>>2]|0)<2){w=b;return w|0}u=h+(b*36|0)+28|0;i=c[u>>2]|0;if((j|0)<=-1){va(64,3832,392,4888);return 0}v=c[a+12>>2]|0;if((j|0)>=(v|0)){va(64,3832,392,4888);return 0}if(!((i|0)>-1&(i|0)<(v|0))){va(4008,3832,393,4888);return 0}l=h+(j*36|0)|0;k=h+(i*36|0)|0;e=h+(i*36|0)+32|0;f=h+(j*36|0)+32|0;o=(c[e>>2]|0)-(c[f>>2]|0)|0;if((o|0)>1){w=h+(i*36|0)+24|0;o=c[w>>2]|0;t=h+(i*36|0)+28|0;p=c[t>>2]|0;q=h+(o*36|0)|0;r=h+(p*36|0)|0;if(!((o|0)>-1&(o|0)<(v|0))){va(3944,3832,407,4888);return 0}if(!((p|0)>-1&(p|0)<(v|0))){va(3704,3832,408,4888);return 0}c[w>>2]=b;w=h+(b*36|0)+20|0;v=h+(i*36|0)+20|0;c[v>>2]=c[w>>2];c[w>>2]=i;v=c[v>>2]|0;do{if((v|0)==-1){c[a>>2]=i}else{m=c[m>>2]|0;a=m+(v*36|0)+24|0;if((c[a>>2]|0)==(b|0)){c[a>>2]=i;break}m=m+(v*36|0)+28|0;if((c[m>>2]|0)==(b|0)){c[m>>2]=i;break}else{va(3360,3832,424,4888);return 0}}}while(0);m=h+(o*36|0)+32|0;a=h+(p*36|0)+32|0;if((c[m>>2]|0)>(c[a>>2]|0)){c[t>>2]=o;c[u>>2]=p;c[h+(p*36|0)+20>>2]=b;s=+g[l>>2];x=+g[r>>2];s=s<x?s:x;x=+g[h+(j*36|0)+4>>2];y=+g[h+(p*36|0)+4>>2];z=+s;x=+(x<y?x:y);g[n>>2]=z;g[n+4>>2]=x;z=+g[h+(j*36|0)+8>>2];x=+g[h+(p*36|0)+8>>2];y=+g[h+(j*36|0)+12>>2];A=+g[h+(p*36|0)+12>>2];j=h+(b*36|0)+8|0;x=+(z>x?z:x);z=+(y>A?y:A);g[j>>2]=x;g[j+4>>2]=z;z=+g[q>>2];x=+g[h+(b*36|0)+4>>2];y=+g[h+(o*36|0)+4>>2];s=+(s<z?s:z);y=+(x<y?x:y);g[k>>2]=s;g[k+4>>2]=y;s=+g[h+(b*36|0)+8>>2];y=+g[h+(o*36|0)+8>>2];x=+g[h+(b*36|0)+12>>2];z=+g[h+(o*36|0)+12>>2];h=h+(i*36|0)+8|0;s=+(s>y?s:y);A=+(x>z?x:z);g[h>>2]=s;g[h+4>>2]=A;f=c[f>>2]|0;h=c[a>>2]|0;f=((f|0)>(h|0)?f:h)+1|0;c[d>>2]=f;d=c[m>>2]|0;d=(f|0)>(d|0)?f:d}else{c[t>>2]=p;c[u>>2]=o;c[h+(o*36|0)+20>>2]=b;s=+g[l>>2];x=+g[q>>2];s=s<x?s:x;x=+g[h+(j*36|0)+4>>2];y=+g[h+(o*36|0)+4>>2];z=+s;y=+(x<y?x:y);g[n>>2]=z;g[n+4>>2]=y;y=+g[h+(j*36|0)+8>>2];z=+g[h+(o*36|0)+8>>2];x=+g[h+(j*36|0)+12>>2];A=+g[h+(o*36|0)+12>>2];j=h+(b*36|0)+8|0;y=+(y>z?y:z);z=+(x>A?x:A);g[j>>2]=y;g[j+4>>2]=z;z=+g[r>>2];x=+g[h+(b*36|0)+4>>2];y=+g[h+(p*36|0)+4>>2];s=+(s<z?s:z);x=+(x<y?x:y);g[k>>2]=s;g[k+4>>2]=x;x=+g[h+(b*36|0)+8>>2];s=+g[h+(p*36|0)+8>>2];y=+g[h+(b*36|0)+12>>2];z=+g[h+(p*36|0)+12>>2];h=h+(i*36|0)+8|0;s=+(x>s?x:s);A=+(y>z?y:z);g[h>>2]=s;g[h+4>>2]=A;f=c[f>>2]|0;h=c[m>>2]|0;f=((f|0)>(h|0)?f:h)+1|0;c[d>>2]=f;d=c[a>>2]|0;d=(f|0)>(d|0)?f:d}c[e>>2]=d+1;w=i;return w|0}if((o|0)>=-1){w=b;return w|0}w=h+(j*36|0)+24|0;p=c[w>>2]|0;u=h+(j*36|0)+28|0;o=c[u>>2]|0;q=h+(p*36|0)|0;r=h+(o*36|0)|0;if(!((p|0)>-1&(p|0)<(v|0))){va(3160,3832,467,4888);return 0}if(!((o|0)>-1&(o|0)<(v|0))){va(2864,3832,468,4888);return 0}c[w>>2]=b;w=h+(b*36|0)+20|0;v=h+(j*36|0)+20|0;c[v>>2]=c[w>>2];c[w>>2]=j;v=c[v>>2]|0;do{if((v|0)==-1){c[a>>2]=j}else{m=c[m>>2]|0;a=m+(v*36|0)+24|0;if((c[a>>2]|0)==(b|0)){c[a>>2]=j;break}m=m+(v*36|0)+28|0;if((c[m>>2]|0)==(b|0)){c[m>>2]=j;break}else{va(2800,3832,484,4888);return 0}}}while(0);m=h+(p*36|0)+32|0;a=h+(o*36|0)+32|0;if((c[m>>2]|0)>(c[a>>2]|0)){c[u>>2]=p;c[t>>2]=o;c[h+(o*36|0)+20>>2]=b;s=+g[k>>2];x=+g[r>>2];s=s<x?s:x;x=+g[h+(i*36|0)+4>>2];y=+g[h+(o*36|0)+4>>2];z=+s;y=+(x<y?x:y);g[n>>2]=z;g[n+4>>2]=y;y=+g[h+(i*36|0)+8>>2];x=+g[h+(o*36|0)+8>>2];z=+g[h+(i*36|0)+12>>2];A=+g[h+(o*36|0)+12>>2];i=h+(b*36|0)+8|0;x=+(y>x?y:x);z=+(z>A?z:A);g[i>>2]=x;g[i+4>>2]=z;z=+g[q>>2];y=+g[h+(b*36|0)+4>>2];x=+g[h+(p*36|0)+4>>2];s=+(s<z?s:z);x=+(y<x?y:x);g[l>>2]=s;g[l+4>>2]=x;x=+g[h+(b*36|0)+8>>2];y=+g[h+(p*36|0)+8>>2];s=+g[h+(b*36|0)+12>>2];z=+g[h+(p*36|0)+12>>2];h=h+(j*36|0)+8|0;x=+(x>y?x:y);A=+(s>z?s:z);g[h>>2]=x;g[h+4>>2]=A;e=c[e>>2]|0;h=c[a>>2]|0;e=((e|0)>(h|0)?e:h)+1|0;c[d>>2]=e;d=c[m>>2]|0;d=(e|0)>(d|0)?e:d}else{c[u>>2]=o;c[t>>2]=p;c[h+(p*36|0)+20>>2]=b;s=+g[k>>2];x=+g[q>>2];s=s<x?s:x;x=+g[h+(i*36|0)+4>>2];y=+g[h+(p*36|0)+4>>2];z=+s;y=+(x<y?x:y);g[n>>2]=z;g[n+4>>2]=y;y=+g[h+(i*36|0)+8>>2];z=+g[h+(p*36|0)+8>>2];x=+g[h+(i*36|0)+12>>2];A=+g[h+(p*36|0)+12>>2];i=h+(b*36|0)+8|0;y=+(y>z?y:z);z=+(x>A?x:A);g[i>>2]=y;g[i+4>>2]=z;z=+g[r>>2];x=+g[h+(b*36|0)+4>>2];y=+g[h+(o*36|0)+4>>2];s=+(s<z?s:z);x=+(x<y?x:y);g[l>>2]=s;g[l+4>>2]=x;s=+g[h+(b*36|0)+8>>2];x=+g[h+(o*36|0)+8>>2];y=+g[h+(b*36|0)+12>>2];z=+g[h+(o*36|0)+12>>2];h=h+(j*36|0)+8|0;s=+(s>x?s:x);A=+(y>z?y:z);g[h>>2]=s;g[h+4>>2]=A;e=c[e>>2]|0;h=c[m>>2]|0;e=((e|0)>(h|0)?e:h)+1|0;c[d>>2]=e;d=c[a>>2]|0;d=(e|0)>(d|0)?e:d}c[f>>2]=d+1;w=j;return w|0}function nd(d,e){d=d|0;e=e|0;var f=0,h=0,j=0,k=0,l=0,m=0,n=0.0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0.0,z=0,A=0,B=0,C=0,D=0,E=0,F=0.0,G=0.0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,P=0,Q=0,R=0.0,U=0,V=0,W=0,X=0,Y=0,Z=0.0,_=0,$=0.0,aa=0.0,ba=0,ca=0.0,da=0.0,ea=0,fa=0.0,ga=0.0,ha=0,ia=0.0,ja=0.0,ka=0.0;f=i;i=i+336|0;o=f|0;q=f+40|0;m=f+80|0;p=f+96|0;r=f+192|0;l=f+216|0;j=f+320|0;k=f+328|0;c[1592]=(c[1592]|0)+1;h=d|0;c[h>>2]=0;ha=e+128|0;d=d+4|0;g[d>>2]=+g[ha>>2];x=e|0;s=e+28|0;hf(o|0,e+56|0,36)|0;hf(q|0,e+92|0,36)|0;t=o+24|0;aa=+g[t>>2];ca=+O(aa/6.2831854820251465)*6.2831854820251465;aa=aa-ca;g[t>>2]=aa;u=o+28|0;ca=+g[u>>2]-ca;g[u>>2]=ca;v=q+24|0;$=+g[v>>2];Z=+O($/6.2831854820251465)*6.2831854820251465;$=$-Z;g[v>>2]=$;w=q+28|0;Z=+g[w>>2]-Z;g[w>>2]=Z;n=+g[ha>>2];y=+g[e+24>>2]+ +g[e+52>>2]+-.014999999664723873;y=y<.004999999888241291?.004999999888241291:y;if(y<=.0012499999720603228){va(2688,3776,280,5e3)}b[m+4>>1]=0;Q=p;U=e;c[Q>>2]=c[U>>2];c[Q+4>>2]=c[U+4>>2];c[Q+8>>2]=c[U+8>>2];c[Q+12>>2]=c[U+12>>2];c[Q+16>>2]=c[U+16>>2];c[Q+20>>2]=c[U+20>>2];c[Q+24>>2]=c[U+24>>2];Q=p+28|0;U=s;c[Q>>2]=c[U>>2];c[Q+4>>2]=c[U+4>>2];c[Q+8>>2]=c[U+8>>2];c[Q+12>>2]=c[U+12>>2];c[Q+16>>2]=c[U+16>>2];c[Q+20>>2]=c[U+20>>2];c[Q+24>>2]=c[U+24>>2];a[p+88|0]=0;Q=o+8|0;U=o+12|0;e=o+16|0;D=o+20|0;H=o|0;I=o+4|0;L=q+8|0;N=q+12|0;M=q+16|0;P=q+20|0;J=q|0;K=q+4|0;W=p+56|0;X=p+64|0;C=p+68|0;B=p+72|0;A=p+80|0;z=p+84|0;V=r+16|0;F=y+.0012499999720603228;G=y+-.0012499999720603228;R=0.0;E=0;a:while(1){ka=1.0-R;da=ka*aa+R*ca;ca=+T(da);da=+S(da);ja=+g[H>>2];aa=+g[I>>2];Z=ka*$+R*Z;ia=+T(Z);Z=+S(Z);$=+g[J>>2];ga=+g[K>>2];fa=ka*+g[L>>2]+R*+g[M>>2]-(Z*$-ia*ga);ga=ka*+g[N>>2]+R*+g[P>>2]-(ia*$+Z*ga);$=+(ka*+g[Q>>2]+R*+g[e>>2]-(da*ja-ca*aa));aa=+(ka*+g[U>>2]+R*+g[D>>2]-(ca*ja+da*aa));g[W>>2]=$;g[W+4>>2]=aa;g[X>>2]=ca;g[C>>2]=da;fa=+fa;ga=+ga;g[B>>2]=fa;g[B+4>>2]=ga;g[A>>2]=ia;g[z>>2]=Z;cd(r,m,p);Z=+g[V>>2];if(Z<=0.0){j=5;break}if(Z<F){j=7;break}+od(l,m,x,o,s,q,R);Y=0;Z=n;do{fa=+pd(l,j,k,Z);if(fa>F){j=10;break a}if(fa>G){R=Z;break}_=c[j>>2]|0;ba=c[k>>2]|0;da=+qd(l,_,ba,R);if(da<G){j=13;break a}if(da>F){$=Z;aa=R;ea=0}else{j=15;break a}while(1){if((ea&1|0)==0){ca=(aa+$)*.5}else{ca=aa+(y-da)*($-aa)/(fa-da)}ga=+qd(l,_,ba,ca);ia=ga-y;if(ia<=0.0){ia=-0.0-ia}if(ia<.0012499999720603228){Z=ca;break}ha=ga>y;ea=ea+1|0;c[1584]=(c[1584]|0)+1;if((ea|0)==50){ea=50;break}else{$=ha?$:ca;aa=ha?ca:aa;da=ha?ga:da;fa=ha?fa:ga}}_=c[1586]|0;c[1586]=(_|0)>(ea|0)?_:ea;Y=Y+1|0;}while((Y|0)!=8);E=E+1|0;c[1590]=(c[1590]|0)+1;if((E|0)==20){j=27;break}aa=+g[t>>2];ca=+g[u>>2];$=+g[v>>2];Z=+g[w>>2]}if((j|0)==5){c[h>>2]=2;g[d>>2]=0.0;h=c[1588]|0;ha=(h|0)>(E|0);ha=ha?h:E;c[1588]=ha;i=f;return}else if((j|0)==7){c[h>>2]=3;g[d>>2]=R;h=c[1588]|0;ha=(h|0)>(E|0);ha=ha?h:E;c[1588]=ha;i=f;return}else if((j|0)==10){c[h>>2]=4;g[d>>2]=n}else if((j|0)==13){c[h>>2]=1;g[d>>2]=R}else if((j|0)==15){c[h>>2]=3;g[d>>2]=R}else if((j|0)==27){c[h>>2]=1;g[d>>2]=R;E=20;h=c[1588]|0;ha=(h|0)>(E|0);ha=ha?h:E;c[1588]=ha;i=f;return}c[1590]=(c[1590]|0)+1;E=E+1|0;h=c[1588]|0;ha=(h|0)>(E|0);ha=ha?h:E;c[1588]=ha;i=f;return}function od(e,f,h,i,j,k,l){e=e|0;f=f|0;h=h|0;i=i|0;j=j|0;k=k|0;l=+l;var m=0.0,n=0.0,o=0.0,p=0.0,q=0.0,r=0.0,s=0.0,t=0,u=0.0,v=0.0,w=0.0,x=0.0,y=0.0,z=0.0,A=0.0,B=0,C=0.0,D=0.0;c[e>>2]=h;c[e+4>>2]=j;t=b[f+4>>1]|0;if(!(t<<16>>16!=0&(t&65535)>>>0<3>>>0)){va(496,3776,50,4616);return 0.0}B=e+8|0;hf(B|0,i|0,36)|0;i=e+44|0;hf(i|0,k|0,36)|0;y=1.0-l;n=y*+g[e+32>>2]+ +g[e+36>>2]*l;m=+T(n);n=+S(n);p=+g[B>>2];o=+g[e+12>>2];s=y*+g[e+16>>2]+ +g[e+24>>2]*l-(n*p-m*o);o=y*+g[e+20>>2]+ +g[e+28>>2]*l-(m*p+n*o);p=y*+g[e+68>>2]+ +g[e+72>>2]*l;q=+T(p);p=+S(p);z=+g[i>>2];A=+g[e+48>>2];r=y*+g[e+52>>2]+ +g[e+60>>2]*l-(p*z-q*A);l=y*+g[e+56>>2]+ +g[e+64>>2]*l-(q*z+p*A);if(t<<16>>16==1){c[e+80>>2]=0;t=d[f+6|0]|0;if((c[h+20>>2]|0)<=(t|0)){va(1464,840,103,4200);return 0.0}B=(c[h+16>>2]|0)+(t<<3)|0;v=+g[B>>2];u=+g[B+4>>2];f=d[f+9|0]|0;if((c[j+20>>2]|0)<=(f|0)){va(1464,840,103,4200);return 0.0}f=(c[j+16>>2]|0)+(f<<3)|0;z=+g[f>>2];A=+g[f+4>>2];f=e+92|0;r=r+(p*z-q*A)-(s+(n*v-m*u));m=l+(q*z+p*A)-(o+(m*v+n*u));B=f;A=+r;n=+m;g[B>>2]=A;g[B+4>>2]=n;n=+Q(r*r+m*m);if(n<1.1920928955078125e-7){A=0.0;return+A}A=1.0/n;g[f>>2]=r*A;g[e+96>>2]=m*A;A=n;return+A}t=f+6|0;i=f+7|0;k=e+80|0;if((a[t]|0)==(a[i]|0)){c[k>>2]=2;k=d[f+9|0]|0;i=c[j+20>>2]|0;if((i|0)<=(k|0)){va(1464,840,103,4200);return 0.0}j=c[j+16>>2]|0;B=j+(k<<3)|0;v=+g[B>>2];u=+g[B+4>>2];f=d[f+10|0]|0;if((i|0)<=(f|0)){va(1464,840,103,4200);return 0.0}j=j+(f<<3)|0;z=+g[j>>2];x=+g[j+4>>2];j=e+92|0;A=z-v;w=x-u;y=-0.0-A;f=j;D=+w;C=+y;g[f>>2]=D;g[f+4>>2]=C;A=+Q(w*w+A*A);if(A>=1.1920928955078125e-7){D=1.0/A;w=w*D;g[j>>2]=w;y=D*y;g[e+96>>2]=y}v=(v+z)*.5;u=(u+x)*.5;e=e+84|0;C=+v;D=+u;g[e>>2]=C;g[e+4>>2]=D;e=d[t]|0;if((c[h+20>>2]|0)<=(e|0)){va(1464,840,103,4200);return 0.0}B=(c[h+16>>2]|0)+(e<<3)|0;C=+g[B>>2];D=+g[B+4>>2];m=(p*w-q*y)*(s+(n*C-m*D)-(r+(p*v-q*u)))+(q*w+p*y)*(o+(m*C+n*D)-(l+(q*v+p*u)));if(m>=0.0){D=m;return+D}C=+(-0.0-w);D=+(-0.0-y);g[f>>2]=C;g[f+4>>2]=D;D=-0.0-m;return+D}else{c[k>>2]=1;k=d[t]|0;t=c[h+20>>2]|0;if((t|0)<=(k|0)){va(1464,840,103,4200);return 0.0}h=c[h+16>>2]|0;B=h+(k<<3)|0;v=+g[B>>2];u=+g[B+4>>2];i=d[i]|0;if((t|0)<=(i|0)){va(1464,840,103,4200);return 0.0}t=h+(i<<3)|0;z=+g[t>>2];x=+g[t+4>>2];t=e+92|0;A=z-v;w=x-u;y=-0.0-A;h=t;C=+w;D=+y;g[h>>2]=C;g[h+4>>2]=D;A=+Q(w*w+A*A);if(A>=1.1920928955078125e-7){D=1.0/A;w=w*D;g[t>>2]=w;y=D*y;g[e+96>>2]=y}v=(v+z)*.5;u=(u+x)*.5;e=e+84|0;C=+v;D=+u;g[e>>2]=C;g[e+4>>2]=D;e=d[f+9|0]|0;if((c[j+20>>2]|0)<=(e|0)){va(1464,840,103,4200);return 0.0}B=(c[j+16>>2]|0)+(e<<3)|0;C=+g[B>>2];D=+g[B+4>>2];m=(n*w-m*y)*(r+(p*C-q*D)-(s+(n*v-m*u)))+(m*w+n*y)*(l+(q*C+p*D)-(o+(m*v+n*u)));if(m>=0.0){D=m;return+D}C=+(-0.0-w);D=+(-0.0-y);g[h>>2]=C;g[h+4>>2]=D;D=-0.0-m;return+D}return 0.0}function pd(a,b,d,e){a=a|0;b=b|0;d=d|0;e=+e;var f=0.0,h=0.0,i=0.0,j=0.0,k=0.0,l=0.0,m=0.0,n=0,o=0,p=0,q=0.0,r=0.0,s=0.0,t=0,u=0,v=0.0,w=0,x=0.0,y=0.0,z=0,A=0;v=1.0-e;f=v*+g[a+32>>2]+ +g[a+36>>2]*e;h=+T(f);f=+S(f);j=+g[a+8>>2];i=+g[a+12>>2];l=v*+g[a+16>>2]+ +g[a+24>>2]*e-(f*j-h*i);i=v*+g[a+20>>2]+ +g[a+28>>2]*e-(h*j+f*i);j=v*+g[a+68>>2]+ +g[a+72>>2]*e;k=+T(j);j=+S(j);x=+g[a+44>>2];y=+g[a+48>>2];m=v*+g[a+52>>2]+ +g[a+60>>2]*e-(j*x-k*y);e=v*+g[a+56>>2]+ +g[a+64>>2]*e-(k*x+j*y);n=c[a+80>>2]|0;if((n|0)==0){n=a+92|0;q=+g[n>>2];o=a+96|0;x=+g[o>>2];y=f*q+h*x;s=f*x-h*q;q=-0.0-q;x=-0.0-x;r=j*q+k*x;q=j*x-k*q;p=a|0;u=c[p>>2]|0;w=c[u+16>>2]|0;u=c[u+20>>2]|0;if((u|0)>1){v=s*+g[w+4>>2]+y*+g[w>>2];A=1;z=0;while(1){x=y*+g[w+(A<<3)>>2]+s*+g[w+(A<<3)+4>>2];t=x>v;z=t?A:z;A=A+1|0;if((A|0)<(u|0)){v=t?x:v}else{break}}}else{z=0}c[b>>2]=z;a=a+4|0;u=c[a>>2]|0;w=c[u+16>>2]|0;u=c[u+20>>2]|0;if((u|0)>1){s=q*+g[w+4>>2]+r*+g[w>>2];z=1;A=0;while(1){v=r*+g[w+(z<<3)>>2]+q*+g[w+(z<<3)+4>>2];t=v>s;A=t?z:A;z=z+1|0;if((z|0)<(u|0)){s=t?v:s}else{break}}}else{A=0}c[d>>2]=A;d=c[p>>2]|0;b=c[b>>2]|0;if((b|0)<=-1){va(1464,840,103,4200);return 0.0}if((c[d+20>>2]|0)<=(b|0)){va(1464,840,103,4200);return 0.0}b=(c[d+16>>2]|0)+(b<<3)|0;r=+g[b>>2];q=+g[b+4>>2];b=c[a>>2]|0;if((A|0)<=-1){va(1464,840,103,4200);return 0.0}if((c[b+20>>2]|0)<=(A|0)){va(1464,840,103,4200);return 0.0}A=(c[b+16>>2]|0)+(A<<3)|0;x=+g[A>>2];y=+g[A+4>>2];y=+g[n>>2]*(m+(j*x-k*y)-(l+(f*r-h*q)))+ +g[o>>2]*(e+(k*x+j*y)-(i+(h*r+f*q)));return+y}else if((n|0)==1){x=+g[a+92>>2];q=+g[a+96>>2];r=f*x-h*q;q=h*x+f*q;x=+g[a+84>>2];y=+g[a+88>>2];l=l+(f*x-h*y);f=i+(h*x+f*y);i=-0.0-r;y=-0.0-q;h=j*i+k*y;i=j*y-k*i;c[b>>2]=-1;b=a+4|0;a=c[b>>2]|0;o=c[a+16>>2]|0;a=c[a+20>>2]|0;do{if((a|0)>1){s=i*+g[o+4>>2]+h*+g[o>>2];t=1;p=0;while(1){v=h*+g[o+(t<<3)>>2]+i*+g[o+(t<<3)+4>>2];n=v>s;p=n?t:p;t=t+1|0;if((t|0)<(a|0)){s=n?v:s}else{break}}c[d>>2]=p;if((p|0)>-1){break}va(1464,840,103,4200);return 0.0}else{c[d>>2]=0;p=0}}while(0);b=c[b>>2]|0;if((c[b+20>>2]|0)<=(p|0)){va(1464,840,103,4200);return 0.0}A=(c[b+16>>2]|0)+(p<<3)|0;x=+g[A>>2];y=+g[A+4>>2];y=r*(m+(j*x-k*y)-l)+q*(e+(k*x+j*y)-f);return+y}else if((n|0)==2){x=+g[a+92>>2];r=+g[a+96>>2];q=j*x-k*r;r=k*x+j*r;x=+g[a+84>>2];y=+g[a+88>>2];m=m+(j*x-k*y);j=e+(k*x+j*y);k=-0.0-q;y=-0.0-r;e=f*k+h*y;k=f*y-h*k;c[d>>2]=-1;d=a|0;o=c[d>>2]|0;a=c[o+16>>2]|0;o=c[o+20>>2]|0;do{if((o|0)>1){v=k*+g[a+4>>2]+e*+g[a>>2];p=1;t=0;while(1){s=e*+g[a+(p<<3)>>2]+k*+g[a+(p<<3)+4>>2];n=s>v;t=n?p:t;p=p+1|0;if((p|0)<(o|0)){v=n?s:v}else{break}}c[b>>2]=t;if((t|0)>-1){break}va(1464,840,103,4200);return 0.0}else{c[b>>2]=0;t=0}}while(0);b=c[d>>2]|0;if((c[b+20>>2]|0)<=(t|0)){va(1464,840,103,4200);return 0.0}A=(c[b+16>>2]|0)+(t<<3)|0;x=+g[A>>2];y=+g[A+4>>2];y=q*(l+(f*x-h*y)-m)+r*(i+(h*x+f*y)-j);return+y}else{va(2600,3776,183,4176);return 0.0}return 0.0}function qd(a,b,d,e){a=a|0;b=b|0;d=d|0;e=+e;var f=0.0,h=0.0,i=0.0,j=0.0,k=0.0,l=0.0,m=0.0,n=0.0,o=0.0,p=0.0,q=0.0,r=0,s=0.0,t=0.0;o=1.0-e;m=o*+g[a+32>>2]+ +g[a+36>>2]*e;k=+T(m);m=+S(m);h=+g[a+8>>2];l=+g[a+12>>2];j=o*+g[a+16>>2]+ +g[a+24>>2]*e-(m*h-k*l);l=o*+g[a+20>>2]+ +g[a+28>>2]*e-(k*h+m*l);h=o*+g[a+68>>2]+ +g[a+72>>2]*e;i=+T(h);h=+S(h);p=+g[a+44>>2];q=+g[a+48>>2];f=o*+g[a+52>>2]+ +g[a+60>>2]*e-(h*p-i*q);e=o*+g[a+56>>2]+ +g[a+64>>2]*e-(i*p+h*q);r=c[a+80>>2]|0;if((r|0)==1){q=+g[a+92>>2];n=+g[a+96>>2];o=+g[a+84>>2];p=+g[a+88>>2];a=c[a+4>>2]|0;if((d|0)<=-1){va(1464,840,103,4200);return 0.0}if((c[a+20>>2]|0)<=(d|0)){va(1464,840,103,4200);return 0.0}r=(c[a+16>>2]|0)+(d<<3)|0;t=+g[r>>2];s=+g[r+4>>2];q=(m*q-k*n)*(f+(h*t-i*s)-(j+(m*o-k*p)))+(k*q+m*n)*(e+(i*t+h*s)-(l+(k*o+m*p)));return+q}else if((r|0)==0){n=+g[a+92>>2];o=+g[a+96>>2];r=c[a>>2]|0;if((b|0)<=-1){va(1464,840,103,4200);return 0.0}if((c[r+20>>2]|0)<=(b|0)){va(1464,840,103,4200);return 0.0}r=(c[r+16>>2]|0)+(b<<3)|0;q=+g[r>>2];p=+g[r+4>>2];a=c[a+4>>2]|0;if((d|0)<=-1){va(1464,840,103,4200);return 0.0}if((c[a+20>>2]|0)<=(d|0)){va(1464,840,103,4200);return 0.0}r=(c[a+16>>2]|0)+(d<<3)|0;s=+g[r>>2];t=+g[r+4>>2];t=n*(f+(h*s-i*t)-(j+(m*q-k*p)))+o*(e+(i*s+h*t)-(l+(k*q+m*p)));return+t}else if((r|0)==2){n=+g[a+92>>2];q=+g[a+96>>2];p=+g[a+84>>2];o=+g[a+88>>2];a=c[a>>2]|0;if((b|0)<=-1){va(1464,840,103,4200);return 0.0}if((c[a+20>>2]|0)<=(b|0)){va(1464,840,103,4200);return 0.0}r=(c[a+16>>2]|0)+(b<<3)|0;s=+g[r>>2];t=+g[r+4>>2];t=(h*n-i*q)*(j+(m*s-k*t)-(f+(h*p-i*o)))+(i*n+h*q)*(l+(k*s+m*t)-(e+(i*p+h*o)));return+t}else{va(2600,3776,242,4160);return 0.0}return 0.0}function rd(a){a=a|0;c[a+102400>>2]=0;c[a+102404>>2]=0;c[a+102408>>2]=0;c[a+102796>>2]=0;return}function sd(a){a=a|0;if((c[a+102400>>2]|0)!=0){va(2672,3736,32,4632)}if((c[a+102796>>2]|0)==0){return}else{va(2576,3736,33,4632)}}function td(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=b+102796|0;g=c[e>>2]|0;if((g|0)>=32){va(1424,3736,38,4656);return 0}f=b+102412+(g*12|0)|0;c[b+102412+(g*12|0)+4>>2]=d;h=b+102400|0;i=c[h>>2]|0;if((i+d|0)>102400){c[f>>2]=lc(d)|0;a[b+102412+(g*12|0)+8|0]=1}else{c[f>>2]=b+i;a[b+102412+(g*12|0)+8|0]=0;c[h>>2]=(c[h>>2]|0)+d}i=b+102404|0;g=(c[i>>2]|0)+d|0;c[i>>2]=g;b=b+102408|0;d=c[b>>2]|0;c[b>>2]=(d|0)>(g|0)?d:g;c[e>>2]=(c[e>>2]|0)+1;return c[f>>2]|0}function ud(b,d){b=b|0;d=d|0;var e=0,f=0,g=0;e=b+102796|0;g=c[e>>2]|0;if((g|0)<=0){va(816,3736,63,4672)}f=g-1|0;if((c[b+102412+(f*12|0)>>2]|0)!=(d|0)){va(472,3736,65,4672)}if((a[b+102412+(f*12|0)+8|0]&1)==0){f=b+102412+(f*12|0)+4|0;d=b+102400|0;c[d>>2]=(c[d>>2]|0)-(c[f>>2]|0)}else{mc(d);g=c[e>>2]|0;f=b+102412+(f*12|0)+4|0}d=b+102404|0;c[d>>2]=(c[d>>2]|0)-(c[f>>2]|0);c[e>>2]=g-1;return}function vd(a){a=a|0;return}function wd(a){a=a|0;return}function xd(a){a=a|0;return+0.0}function yd(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0;if((a[6880]&1)==0){c[1722]=8;c[1723]=2;a[6896]=1;c[1746]=6;c[1747]=8;a[6992]=1;c[1728]=6;c[1729]=8;a[6920]=0;c[1752]=18;c[1753]=14;a[7016]=1;c[1734]=4;c[1735]=22;a[6944]=1;c[1725]=4;c[1726]=22;a[6908]=0;c[1740]=16;c[1741]=20;a[6968]=1;c[1749]=16;c[1750]=20;a[7004]=0;c[1758]=10;c[1759]=18;a[7040]=1;c[1731]=10;c[1732]=18;a[6932]=0;c[1764]=14;c[1765]=4;a[7064]=1;c[1755]=14;c[1756]=4;a[7028]=0;a[6880]=1}h=c[(c[b+12>>2]|0)+4>>2]|0;i=c[(c[e+12>>2]|0)+4>>2]|0;if(h>>>0>=4>>>0){va(2256,3664,80,4344);return 0}if(i>>>0>=4>>>0){va(2528,3664,81,4344);return 0}j=c[6888+(h*48|0)+(i*12|0)>>2]|0;if((j|0)==0){j=0;return j|0}if((a[6888+(h*48|0)+(i*12|0)+8|0]&1)==0){j=vb[j&31](e,f,b,d,g)|0;return j|0}else{j=vb[j&31](b,d,e,f,g)|0;return j|0}return 0}function zd(d,e){d=d|0;e=e|0;var f=0,h=0,i=0,j=0,k=0;if((a[6880]&1)==0){va(1400,3664,103,4336)}f=d+48|0;do{if((c[d+124>>2]|0)>0){j=c[(c[f>>2]|0)+8>>2]|0;h=j+4|0;i=b[h>>1]|0;if((i&2)==0){b[h>>1]=i|2;g[j+144>>2]=0.0}j=d+52|0;k=c[(c[j>>2]|0)+8>>2]|0;h=k+4|0;i=b[h>>1]|0;if((i&2)!=0){break}b[h>>1]=i|2;g[k+144>>2]=0.0}else{j=d+52|0}}while(0);f=c[(c[(c[f>>2]|0)+12>>2]|0)+4>>2]|0;h=c[(c[(c[j>>2]|0)+12>>2]|0)+4>>2]|0;if((f|0)>-1&(h|0)<4){ob[c[6888+(f*48|0)+(h*12|0)+4>>2]&31](d,e);return}else{va(768,3664,114,4336)}}function Ad(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var h=0.0,i=0.0;c[a>>2]=5072;c[a+4>>2]=4;c[a+48>>2]=b;c[a+52>>2]=e;c[a+56>>2]=d;c[a+60>>2]=f;c[a+124>>2]=0;c[a+128>>2]=0;gf(a+8|0,0,40)|0;g[a+136>>2]=+Q(+g[b+16>>2]*+g[e+16>>2]);h=+g[b+20>>2];i=+g[e+20>>2];g[a+140>>2]=h>i?h:i;return}function Bd(d,e){d=d|0;e=e|0;var f=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;j=i;i=i+64|0;h=j|0;r=d+64|0;hf(h|0,r|0,64)|0;k=d+4|0;n=c[k>>2]|0;c[k>>2]=n|4;n=n>>>1;t=c[d+48>>2]|0;q=c[d+52>>2]|0;f=((a[q+38|0]|a[t+38|0])&1)!=0;m=c[t+8>>2]|0;l=c[q+8>>2]|0;s=m+12|0;o=l+12|0;do{if(f){o=le(c[t+12>>2]|0,c[d+56>>2]|0,c[q+12>>2]|0,c[d+60>>2]|0,s,o)|0;c[d+124>>2]=0;n=n&1}else{wb[c[c[d>>2]>>2]&31](d,r,s,o);q=d+124|0;o=(c[q>>2]|0)>0;a:do{if(o){v=c[h+60>>2]|0;if((v|0)>0){w=0}else{p=0;while(1){g[d+64+(p*20|0)+8>>2]=0.0;g[d+64+(p*20|0)+12>>2]=0.0;p=p+1|0;if((p|0)>=(c[q>>2]|0)){break a}}}do{x=d+64+(w*20|0)+8|0;g[x>>2]=0.0;u=d+64+(w*20|0)+12|0;g[u>>2]=0.0;t=c[d+64+(w*20|0)+16>>2]|0;r=0;while(1){s=r+1|0;if((c[h+(r*20|0)+16>>2]|0)==(t|0)){p=7;break}if((s|0)<(v|0)){r=s}else{break}}if((p|0)==7){p=0;g[x>>2]=+g[h+(r*20|0)+8>>2];g[u>>2]=+g[h+(r*20|0)+12>>2]}w=w+1|0;}while((w|0)<(c[q>>2]|0))}}while(0);n=n&1;if(!(o^(n|0)!=0)){break}q=m+4|0;p=b[q>>1]|0;if((p&2)==0){b[q>>1]=p|2;g[m+144>>2]=0.0}p=l+4|0;m=b[p>>1]|0;if((m&2)!=0){break}b[p>>1]=m|2;g[l+144>>2]=0.0}}while(0);l=c[k>>2]|0;c[k>>2]=o?l|2:l&-3;m=(n|0)==0;k=o^1;l=(e|0)==0;if(!(m^1|k|l)){ob[c[(c[e>>2]|0)+8>>2]&31](e,d)}if(!(m|o|l)){ob[c[(c[e>>2]|0)+12>>2]&31](e,d)}if(f|k|l){i=j;return}qb[c[(c[e>>2]|0)+16>>2]&7](e,d,h);i=j;return}function Cd(a){a=a|0;return}function Dd(a){a=a|0;bf(a);return}function Ed(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;f=jc(f,144)|0;if((f|0)==0){e=0;e=e|0;return e|0}Ad(f,a,0,d,0);c[f>>2]=5232;if((c[(c[(c[f+48>>2]|0)+12>>2]|0)+4>>2]|0)!=1){va(1952,3608,41,4592);return 0}if((c[(c[(c[f+52>>2]|0)+12>>2]|0)+4>>2]|0)==0){e=f;e=e|0;return e|0}else{va(2480,3608,42,4592);return 0}return 0}function Fd(a,b){a=a|0;b=b|0;nb[c[(c[a>>2]|0)+4>>2]&127](a);kc(b,a,144);return}function Gd(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;ce(b,c[(c[a+48>>2]|0)+12>>2]|0,d,c[(c[a+52>>2]|0)+12>>2]|0,e);return}function Hd(a){a=a|0;return}function Id(a){a=a|0;bf(a);return}function Jd(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;f=jc(f,144)|0;if((f|0)==0){e=0;e=e|0;return e|0}Ad(f,a,0,d,0);c[f>>2]=5168;if((c[(c[(c[f+48>>2]|0)+12>>2]|0)+4>>2]|0)!=1){va(1872,3520,41,4544);return 0}if((c[(c[(c[f+52>>2]|0)+12>>2]|0)+4>>2]|0)==2){e=f;e=e|0;return e|0}else{va(2432,3520,42,4544);return 0}return 0}function Kd(a,b){a=a|0;b=b|0;nb[c[(c[a>>2]|0)+4>>2]&127](a);kc(b,a,144);return}function Ld(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;fe(b,c[(c[a+48>>2]|0)+12>>2]|0,d,c[(c[a+52>>2]|0)+12>>2]|0,e);return}function Md(a){a=a|0;return}function Nd(a){a=a|0;bf(a);return}function Od(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;f=jc(f,144)|0;if((f|0)==0){e=0;e=e|0;return e|0}Ad(f,a,0,d,0);c[f>>2]=5104;if((c[(c[(c[f+48>>2]|0)+12>>2]|0)+4>>2]|0)!=2){va(1792,3464,41,4464);return 0}if((c[(c[(c[f+52>>2]|0)+12>>2]|0)+4>>2]|0)==0){e=f;e=e|0;return e|0}else{va(2384,3464,42,4464);return 0}return 0}function Pd(a,b){a=a|0;b=b|0;nb[c[(c[a>>2]|0)+4>>2]&127](a);kc(b,a,144);return}function Qd(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;be(b,c[(c[a+48>>2]|0)+12>>2]|0,d,c[(c[a+52>>2]|0)+12>>2]|0,e);return}function Rd(a){a=a|0;return}function Sd(a){a=a|0;bf(a);return}function Td(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;f=jc(f,144)|0;if((f|0)==0){e=0;e=e|0;return e|0}Ad(f,a,0,d,0);c[f>>2]=5304;if((c[(c[(c[f+48>>2]|0)+12>>2]|0)+4>>2]|0)!=2){va(1712,3416,44,4680);return 0}if((c[(c[(c[f+52>>2]|0)+12>>2]|0)+4>>2]|0)==2){e=f;e=e|0;return e|0}else{va(2304,3416,45,4680);return 0}return 0}function Ud(a,b){a=a|0;b=b|0;nb[c[(c[a>>2]|0)+4>>2]&127](a);kc(b,a,144);return}function Vd(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;ge(b,c[(c[a+48>>2]|0)+12>>2]|0,d,c[(c[a+52>>2]|0)+12>>2]|0,e);return}function Wd(a){a=a|0;return}function Xd(a){a=a|0;bf(a);return}function Yd(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0;h=a+40|0;c[h>>2]=b;c[a+44>>2]=d;c[a+48>>2]=e;c[a+28>>2]=0;c[a+36>>2]=0;c[a+32>>2]=0;i=a|0;c[i>>2]=f;c[a+4>>2]=g;c[a+8>>2]=td(f,b<<2)|0;c[a+12>>2]=td(c[i>>2]|0,d<<2)|0;c[a+16>>2]=td(c[i>>2]|0,e<<2)|0;c[a+24>>2]=td(c[i>>2]|0,(c[h>>2]|0)*12|0)|0;c[a+20>>2]=td(c[i>>2]|0,(c[h>>2]|0)*12|0)|0;return}function Zd(a){a=a|0;var b=0;b=a|0;ud(c[b>>2]|0,c[a+20>>2]|0);ud(c[b>>2]|0,c[a+24>>2]|0);ud(c[b>>2]|0,c[a+16>>2]|0);ud(c[b>>2]|0,c[a+12>>2]|0);ud(c[b>>2]|0,c[a+8>>2]|0);return}function _d(d,e,f,h,j){d=d|0;e=e|0;f=f|0;h=h|0;j=j|0;var l=0,m=0,n=0,o=0.0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0.0,y=0,z=0,A=0,B=0.0,C=0.0,D=0,E=0.0,F=0.0,G=0.0,H=0.0,I=0.0,J=0;n=i;i=i+168|0;p=n|0;q=n+24|0;r=n+32|0;v=n+64|0;m=n+112|0;vd(q);o=+g[f>>2];l=d+28|0;if((c[l>>2]|0)>0){s=d+8|0;t=h|0;w=h+4|0;h=d+20|0;u=d+24|0;z=0;do{D=c[(c[s>>2]|0)+(z<<2)>>2]|0;A=D+44|0;y=c[A>>2]|0;A=c[A+4>>2]|0;x=+g[D+56>>2];J=D+64|0;F=+g[J>>2];C=+g[J+4>>2];H=+g[D+72>>2];J=D+36|0;c[J>>2]=y;c[J+4>>2]=A;g[D+52>>2]=x;if((c[D>>2]|0)==2){E=+g[D+140>>2];B=+g[D+120>>2];G=1.0-o*+g[D+132>>2];G=G<1.0?G:1.0;G=G<0.0?0.0:G;I=1.0-o*+g[D+136>>2];I=I<1.0?I:1.0;H=(H+o*+g[D+128>>2]*+g[D+84>>2])*(I<0.0?0.0:I);F=(F+o*(E*+g[t>>2]+B*+g[D+76>>2]))*G;C=(C+o*(E*+g[w>>2]+B*+g[D+80>>2]))*G}J=(c[h>>2]|0)+(z*12|0)|0;c[J>>2]=y;c[J+4>>2]=A;g[(c[h>>2]|0)+(z*12|0)+8>>2]=x;J=(c[u>>2]|0)+(z*12|0)|0;G=+F;I=+C;g[J>>2]=G;g[J+4>>2]=I;g[(c[u>>2]|0)+(z*12|0)+8>>2]=H;z=z+1|0;}while((z|0)<(c[l>>2]|0))}else{h=d+20|0;u=d+24|0}wd(q);D=r;s=f;c[D>>2]=c[s>>2];c[D+4>>2]=c[s+4>>2];c[D+8>>2]=c[s+8>>2];c[D+12>>2]=c[s+12>>2];c[D+16>>2]=c[s+16>>2];c[D+20>>2]=c[s+20>>2];D=c[h>>2]|0;c[r+24>>2]=D;J=c[u>>2]|0;c[r+28>>2]=J;t=v;c[t>>2]=c[s>>2];c[t+4>>2]=c[s+4>>2];c[t+8>>2]=c[s+8>>2];c[t+12>>2]=c[s+12>>2];c[t+16>>2]=c[s+16>>2];c[t+20>>2]=c[s+20>>2];t=d+12|0;c[v+24>>2]=c[t>>2];s=d+36|0;c[v+28>>2]=c[s>>2];c[v+32>>2]=D;c[v+36>>2]=J;c[v+40>>2]=c[d>>2];Be(m,v);De(m);if((a[f+20|0]&1)!=0){Ee(m)}v=d+32|0;if((c[v>>2]|0)>0){y=d+16|0;w=0;do{J=c[(c[y>>2]|0)+(w<<2)>>2]|0;ob[c[(c[J>>2]|0)+28>>2]&31](J,r);w=w+1|0;}while((w|0)<(c[v>>2]|0))}g[e+12>>2]=+xd(q);wd(q);w=f+12|0;if((c[w>>2]|0)>0){y=d+16|0;z=0;do{if((c[v>>2]|0)>0){A=0;do{J=c[(c[y>>2]|0)+(A<<2)>>2]|0;ob[c[(c[J>>2]|0)+32>>2]&31](J,r);A=A+1|0;}while((A|0)<(c[v>>2]|0))}Fe(m);z=z+1|0;}while((z|0)<(c[w>>2]|0))}Ge(m);g[e+16>>2]=+xd(q);if((c[l>>2]|0)>0){y=0;do{J=c[h>>2]|0;w=J+(y*12|0)|0;x=+g[w>>2];C=+g[w+4>>2];B=+g[J+(y*12|0)+8>>2];J=c[u>>2]|0;D=J+(y*12|0)|0;F=+g[D>>2];G=+g[D+4>>2];E=+g[J+(y*12|0)+8>>2];I=o*F;H=o*G;H=I*I+H*H;if(H>4.0){I=2.0/+Q(H);F=F*I;G=G*I}H=o*E;if(H*H>2.4674012660980225){if(H<=0.0){H=-0.0-H}E=E*(1.5707963705062866/H)}I=+(x+o*F);H=+(C+o*G);g[w>>2]=I;g[w+4>>2]=H;g[(c[h>>2]|0)+(y*12|0)+8>>2]=B+o*E;J=(c[u>>2]|0)+(y*12|0)|0;H=+F;I=+G;g[J>>2]=H;g[J+4>>2]=I;g[(c[u>>2]|0)+(y*12|0)+8>>2]=E;y=y+1|0;}while((y|0)<(c[l>>2]|0))}wd(q);w=f+16|0;a:do{if((c[w>>2]|0)>0){y=d+16|0;z=0;while(1){f=He(m)|0;if((c[v>>2]|0)>0){A=1;D=0;do{J=c[(c[y>>2]|0)+(D<<2)>>2]|0;A=A&(ub[c[(c[J>>2]|0)+36>>2]&7](J,r)|0);D=D+1|0;}while((D|0)<(c[v>>2]|0))}else{A=1}z=z+1|0;if(f&A){r=0;break a}if((z|0)>=(c[w>>2]|0)){r=1;break}}}else{r=1}}while(0);if((c[l>>2]|0)>0){v=d+8|0;f=0;do{J=c[(c[v>>2]|0)+(f<<2)>>2]|0;D=(c[h>>2]|0)+(f*12|0)|0;w=J+44|0;A=c[D>>2]|0;D=c[D+4>>2]|0;c[w>>2]=A;c[w+4>>2]=D;G=+g[(c[h>>2]|0)+(f*12|0)+8>>2];g[J+56>>2]=G;w=(c[u>>2]|0)+(f*12|0)|0;z=J+64|0;y=c[w+4>>2]|0;c[z>>2]=c[w>>2];c[z+4>>2]=y;g[J+72>>2]=+g[(c[u>>2]|0)+(f*12|0)+8>>2];E=+T(G);g[J+20>>2]=E;G=+S(G);g[J+24>>2]=G;F=+g[J+28>>2];I=+g[J+32>>2];H=(c[k>>2]=A,+g[k>>2])-(G*F-E*I);I=(c[k>>2]=D,+g[k>>2])-(E*F+G*I);J=J+12|0;H=+H;I=+I;g[J>>2]=H;g[J+4>>2]=I;f=f+1|0;}while((f|0)<(c[l>>2]|0))}g[e+20>>2]=+xd(q);f=c[m+40>>2]|0;h=d+4|0;do{if((c[h>>2]|0)!=0){if((c[s>>2]|0)<=0){break}u=p+16|0;v=0;do{w=c[(c[t>>2]|0)+(v<<2)>>2]|0;e=c[f+(v*152|0)+144>>2]|0;c[u>>2]=e;if((e|0)>0){q=0;do{g[p+(q<<2)>>2]=+g[f+(v*152|0)+(q*36|0)+16>>2];g[p+8+(q<<2)>>2]=+g[f+(v*152|0)+(q*36|0)+20>>2];q=q+1|0;}while((q|0)<(e|0))}J=c[h>>2]|0;qb[c[(c[J>>2]|0)+20>>2]&7](J,w,p);v=v+1|0;}while((v|0)<(c[s>>2]|0))}}while(0);if(!j){Ce(m);i=n;return}q=c[l>>2]|0;if((q|0)>0){p=d+8|0;x=3.4028234663852886e+38;j=0;do{q=c[(c[p>>2]|0)+(j<<2)>>2]|0;b:do{if((c[q>>2]|0)!=0){do{if((b[q+4>>1]&4)!=0){I=+g[q+72>>2];if(I*I>.001218469929881394){break}H=+g[q+64>>2];I=+g[q+68>>2];if(H*H+I*I>9999999747378752.0e-20){break}J=q+144|0;B=o+ +g[J>>2];g[J>>2]=B;x=x<B?x:B;break b}}while(0);g[q+144>>2]=0.0;x=0.0}}while(0);j=j+1|0;q=c[l>>2]|0;}while((j|0)<(q|0))}else{x=3.4028234663852886e+38}if(!((q|0)>0&((x<.5|r)^1))){Ce(m);i=n;return}d=d+8|0;p=0;do{J=c[(c[d>>2]|0)+(p<<2)>>2]|0;D=J+4|0;b[D>>1]=b[D>>1]&-3;g[J+144>>2]=0.0;gf(J+64|0,0,24)|0;p=p+1|0;}while((p|0)<(c[l>>2]|0));Ce(m);i=n;return}function $d(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0.0,s=0.0,t=0.0,u=0.0,v=0.0,w=0.0,x=0.0,y=0.0,z=0,A=0,B=0,C=0,D=0.0;f=i;i=i+128|0;h=f|0;q=f+24|0;j=f+72|0;n=a+28|0;l=c[n>>2]|0;if((l|0)<=(d|0)){va(1200,3328,386,4352)}if((l|0)<=(e|0)){va(2192,3328,387,4352)}if((l|0)>0){l=a+8|0;o=a+20|0;p=a+24|0;m=0;do{z=c[(c[l>>2]|0)+(m<<2)>>2]|0;B=z+44|0;C=(c[o>>2]|0)+(m*12|0)|0;A=c[B+4>>2]|0;c[C>>2]=c[B>>2];c[C+4>>2]=A;g[(c[o>>2]|0)+(m*12|0)+8>>2]=+g[z+56>>2];C=z+64|0;A=(c[p>>2]|0)+(m*12|0)|0;B=c[C+4>>2]|0;c[A>>2]=c[C>>2];c[A+4>>2]=B;g[(c[p>>2]|0)+(m*12|0)+8>>2]=+g[z+72>>2];m=m+1|0;}while((m|0)<(c[n>>2]|0))}else{o=a+20|0;p=a+24|0}m=a+12|0;c[q+24>>2]=c[m>>2];l=a+36|0;c[q+28>>2]=c[l>>2];c[q+40>>2]=c[a>>2];C=q;B=b;c[C>>2]=c[B>>2];c[C+4>>2]=c[B+4>>2];c[C+8>>2]=c[B+8>>2];c[C+12>>2]=c[B+12>>2];c[C+16>>2]=c[B+16>>2];c[C+20>>2]=c[B+20>>2];c[q+32>>2]=c[o>>2];c[q+36>>2]=c[p>>2];Be(j,q);q=b+16|0;a:do{if((c[q>>2]|0)>0){z=0;do{z=z+1|0;if(Je(j,d,e)|0){break a}}while((z|0)<(c[q>>2]|0))}}while(0);q=a+8|0;A=(c[o>>2]|0)+(d*12|0)|0;B=(c[(c[q>>2]|0)+(d<<2)>>2]|0)+36|0;C=c[A+4>>2]|0;c[B>>2]=c[A>>2];c[B+4>>2]=C;g[(c[(c[q>>2]|0)+(d<<2)>>2]|0)+52>>2]=+g[(c[o>>2]|0)+(d*12|0)+8>>2];B=(c[o>>2]|0)+(e*12|0)|0;d=(c[(c[q>>2]|0)+(e<<2)>>2]|0)+36|0;C=c[B+4>>2]|0;c[d>>2]=c[B>>2];c[d+4>>2]=C;g[(c[(c[q>>2]|0)+(e<<2)>>2]|0)+52>>2]=+g[(c[o>>2]|0)+(e*12|0)+8>>2];De(j);d=b+12|0;if((c[d>>2]|0)>0){e=0;do{Fe(j);e=e+1|0;}while((e|0)<(c[d>>2]|0))}r=+g[b>>2];if((c[n>>2]|0)>0){d=0;do{C=c[o>>2]|0;b=C+(d*12|0)|0;t=+g[b>>2];u=+g[b+4>>2];s=+g[C+(d*12|0)+8>>2];C=c[p>>2]|0;B=C+(d*12|0)|0;w=+g[B>>2];x=+g[B+4>>2];v=+g[C+(d*12|0)+8>>2];D=r*w;y=r*x;y=D*D+y*y;if(y>4.0){D=2.0/+Q(y);w=w*D;x=x*D}y=r*v;if(y*y>2.4674012660980225){if(y<=0.0){y=-0.0-y}v=v*(1.5707963705062866/y)}y=t+r*w;u=u+r*x;D=s+r*v;z=(g[k>>2]=y,c[k>>2]|0);z=z|0;t=+u;c[b>>2]=z;g[b+4>>2]=t;g[(c[o>>2]|0)+(d*12|0)+8>>2]=D;C=(c[p>>2]|0)+(d*12|0)|0;A=(g[k>>2]=w,c[k>>2]|0);A=A|0;x=+x;c[C>>2]=A;g[C+4>>2]=x;g[(c[p>>2]|0)+(d*12|0)+8>>2]=v;C=c[(c[q>>2]|0)+(d<<2)>>2]|0;B=C+44|0;c[B>>2]=z;g[B+4>>2]=t;g[C+56>>2]=D;B=C+64|0;c[B>>2]=A;g[B+4>>2]=x;g[C+72>>2]=v;v=+T(D);g[C+20>>2]=v;x=+S(D);g[C+24>>2]=x;w=+g[C+28>>2];D=+g[C+32>>2];C=C+12|0;y=+(y-(x*w-v*D));D=+(u-(v*w+x*D));g[C>>2]=y;g[C+4>>2]=D;d=d+1|0;}while((d|0)<(c[n>>2]|0))}n=c[j+40>>2]|0;a=a+4|0;if((c[a>>2]|0)==0){Ce(j);i=f;return}if((c[l>>2]|0)<=0){Ce(j);i=f;return}o=h+16|0;p=0;do{q=c[(c[m>>2]|0)+(p<<2)>>2]|0;b=c[n+(p*152|0)+144>>2]|0;c[o>>2]=b;if((b|0)>0){d=0;do{g[h+(d<<2)>>2]=+g[n+(p*152|0)+(d*36|0)+16>>2];g[h+8+(d<<2)>>2]=+g[n+(p*152|0)+(d*36|0)+20>>2];d=d+1|0;}while((d|0)<(b|0))}C=c[a>>2]|0;qb[c[(c[C>>2]|0)+20>>2]&7](C,q,h);p=p+1|0;}while((p|0)<(c[l>>2]|0));Ce(j);i=f;return}function ae(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var h=0,i=0,j=0,k=0.0,l=0.0,m=0.0,n=0.0,o=0.0,p=0.0,q=0.0,r=0.0,s=0.0;i=a+60|0;c[i>>2]=0;h=b+12|0;k=+g[d+12>>2];o=+g[h>>2];n=+g[d+8>>2];l=+g[b+16>>2];j=e+12|0;q=+g[f+12>>2];s=+g[j>>2];r=+g[f+8>>2];p=+g[e+16>>2];m=+g[f>>2]+(q*s-r*p)-(+g[d>>2]+(k*o-n*l));l=s*r+q*p+ +g[f+4>>2]-(o*n+k*l+ +g[d+4>>2]);k=+g[b+8>>2]+ +g[e+8>>2];if(m*m+l*l>k*k){return}c[a+56>>2]=0;d=h;b=a+48|0;f=c[d+4>>2]|0;c[b>>2]=c[d>>2];c[b+4>>2]=f;g[a+40>>2]=0.0;g[a+44>>2]=0.0;c[i>>2]=1;b=j;f=a;d=c[b+4>>2]|0;c[f>>2]=c[b>>2];c[f+4>>2]=d;c[a+16>>2]=0;return}function be(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var h=0,i=0,j=0.0,l=0.0,m=0.0,n=0.0,o=0,p=0,q=0.0,r=0.0,s=0.0,t=0.0,u=0.0,v=0.0,w=0.0,x=0;i=a+60|0;c[i>>2]=0;h=e+12|0;v=+g[f+12>>2];l=+g[h>>2];j=+g[f+8>>2];w=+g[e+16>>2];m=+g[f>>2]+(v*l-j*w)- +g[d>>2];w=l*j+v*w+ +g[f+4>>2]- +g[d+4>>2];v=+g[d+12>>2];j=+g[d+8>>2];l=m*v+w*j;j=v*w-m*j;m=+g[b+8>>2]+ +g[e+8>>2];o=c[b+148>>2]|0;do{if((o|0)>0){f=0;n=-3.4028234663852886e+38;e=0;while(1){q=(l- +g[b+20+(f<<3)>>2])*+g[b+84+(f<<3)>>2]+(j- +g[b+20+(f<<3)+4>>2])*+g[b+84+(f<<3)+4>>2];if(q>m){f=19;break}d=q>n;n=d?q:n;e=d?f:e;f=f+1|0;if((f|0)>=(o|0)){f=4;break}}if((f|0)==4){x=n<1.1920928955078125e-7;break}else if((f|0)==19){return}}else{x=1;e=0}}while(0);p=e+1|0;d=b+20+(e<<3)|0;f=c[d>>2]|0;d=c[d+4>>2]|0;q=(c[k>>2]=f,+g[k>>2]);n=(c[k>>2]=d,+g[k>>2]);o=b+20+(((p|0)<(o|0)?p:0)<<3)|0;p=c[o>>2]|0;o=c[o+4>>2]|0;w=(c[k>>2]=p,+g[k>>2]);s=(c[k>>2]=o,+g[k>>2]);if(x){c[i>>2]=1;c[a+56>>2]=1;p=b+84+(e<<3)|0;o=a+40|0;x=c[p+4>>2]|0;c[o>>2]=c[p>>2];c[o+4>>2]=x;o=a+48|0;v=+((q+w)*.5);w=+((n+s)*.5);g[o>>2]=v;g[o+4>>2]=w;o=h;x=a;p=c[o+4>>2]|0;c[x>>2]=c[o>>2];c[x+4>>2]=p;c[a+16>>2]=0;return}v=l-q;t=j-n;r=l-w;u=j-s;if(v*(w-q)+t*(s-n)<=0.0){if(v*v+t*t>m*m){return}c[i>>2]=1;c[a+56>>2]=1;b=a+40|0;x=b;w=+v;j=+t;g[x>>2]=w;g[x+4>>2]=j;j=+Q(v*v+t*t);if(j>=1.1920928955078125e-7){w=1.0/j;g[b>>2]=v*w;g[a+44>>2]=t*w}o=a+48|0;c[o>>2]=f;c[o+4>>2]=d;o=h;x=a;p=c[o+4>>2]|0;c[x>>2]=c[o>>2];c[x+4>>2]=p;c[a+16>>2]=0;return}if(r*(q-w)+u*(n-s)>0.0){q=(q+w)*.5;n=(n+s)*.5;f=b+84+(e<<3)|0;if((l-q)*+g[f>>2]+(j-n)*+g[b+84+(e<<3)+4>>2]>m){return}c[i>>2]=1;c[a+56>>2]=1;p=f;o=a+40|0;x=c[p+4>>2]|0;c[o>>2]=c[p>>2];c[o+4>>2]=x;o=a+48|0;v=+q;w=+n;g[o>>2]=v;g[o+4>>2]=w;o=h;x=a;p=c[o+4>>2]|0;c[x>>2]=c[o>>2];c[x+4>>2]=p;c[a+16>>2]=0;return}if(r*r+u*u>m*m){return}c[i>>2]=1;c[a+56>>2]=1;b=a+40|0;x=b;w=+r;j=+u;g[x>>2]=w;g[x+4>>2]=j;j=+Q(r*r+u*u);if(j>=1.1920928955078125e-7){w=1.0/j;g[b>>2]=r*w;g[a+44>>2]=u*w}x=a+48|0;c[x>>2]=p;c[x+4>>2]=o;o=h;x=a;p=c[o+4>>2]|0;c[x>>2]=c[o>>2];c[x+4>>2]=p;c[a+16>>2]=0;return}function ce(b,d,e,f,h){b=b|0;d=d|0;e=e|0;f=f|0;h=h|0;var i=0,j=0,l=0.0,m=0.0,n=0.0,o=0.0,p=0.0,q=0.0,r=0,s=0,t=0.0,u=0.0,v=0.0,w=0.0,x=0.0,y=0.0,z=0.0,A=0.0;j=b+60|0;c[j>>2]=0;i=f+12|0;m=+g[h+12>>2];z=+g[i>>2];u=+g[h+8>>2];v=+g[f+16>>2];y=+g[h>>2]+(m*z-u*v)- +g[e>>2];v=z*u+m*v+ +g[h+4>>2]- +g[e+4>>2];m=+g[e+12>>2];u=+g[e+8>>2];z=y*m+v*u;u=m*v-y*u;e=d+12|0;h=c[e>>2]|0;e=c[e+4>>2]|0;y=(c[k>>2]=h,+g[k>>2]);v=(c[k>>2]=e,+g[k>>2]);s=d+20|0;r=c[s>>2]|0;s=c[s+4>>2]|0;m=(c[k>>2]=r,+g[k>>2]);n=(c[k>>2]=s,+g[k>>2]);l=m-y;t=n-v;w=l*(m-z)+t*(n-u);q=z-y;p=u-v;x=q*l+p*t;o=+g[d+8>>2]+ +g[f+8>>2];if(x<=0.0){if(q*q+p*p>o*o){return}do{if((a[d+44|0]&1)!=0){f=d+28|0;A=+g[f>>2];if((y-z)*(y-A)+(v-u)*(v- +g[f+4>>2])<=0.0){break}return}}while(0);c[j>>2]=1;c[b+56>>2]=0;g[b+40>>2]=0.0;g[b+44>>2]=0.0;f=b+48|0;c[f>>2]=h;c[f+4>>2]=e;f=b+16|0;c[f>>2]=0;r=f;a[f]=0;a[r+1|0]=0;a[r+2|0]=0;a[r+3|0]=0;r=i;f=b;s=c[r+4>>2]|0;c[f>>2]=c[r>>2];c[f+4>>2]=s;return}if(w<=0.0){l=z-m;p=u-n;if(l*l+p*p>o*o){return}do{if((a[d+45|0]&1)!=0){f=d+36|0;A=+g[f>>2];if(l*(A-m)+p*(+g[f+4>>2]-n)<=0.0){break}return}}while(0);c[j>>2]=1;c[b+56>>2]=0;g[b+40>>2]=0.0;g[b+44>>2]=0.0;f=b+48|0;c[f>>2]=r;c[f+4>>2]=s;f=b+16|0;c[f>>2]=0;r=f;a[f]=1;a[r+1|0]=0;a[r+2|0]=0;a[r+3|0]=0;r=i;f=b;s=c[r+4>>2]|0;c[f>>2]=c[r>>2];c[f+4>>2]=s;return}A=l*l+t*t;if(A<=0.0){va(1184,3288,127,4976)}A=1.0/A;z=z-(y*w+m*x)*A;A=u-(v*w+n*x)*A;if(z*z+A*A>o*o){return}m=-0.0-t;if(l*p+q*m<0.0){l=-0.0-l}else{t=m}m=+Q(l*l+t*t);if(m>=1.1920928955078125e-7){A=1.0/m;t=t*A;l=l*A}c[j>>2]=1;c[b+56>>2]=1;f=b+40|0;z=+t;A=+l;g[f>>2]=z;g[f+4>>2]=A;f=b+48|0;c[f>>2]=h;c[f+4>>2]=e;f=b+16|0;c[f>>2]=0;r=f;a[f]=0;a[r+1|0]=0;a[r+2|0]=1;a[r+3|0]=0;r=i;f=b;s=c[r+4>>2]|0;c[f>>2]=c[r>>2];c[f+4>>2]=s;return}



function de(b,d,e,f,h,j){b=b|0;d=d|0;e=e|0;f=f|0;h=h|0;j=j|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0.0,C=0.0,D=0,E=0.0,F=0,G=0.0,H=0.0,I=0.0,J=0.0,K=0.0,L=0.0,M=0,N=0.0,O=0.0,P=0,R=0,S=0.0,T=0.0,U=0.0,V=0,W=0,X=0.0;l=i;i=i+144|0;x=l|0;r=l+16|0;p=l+40|0;q=l+96|0;m=l+120|0;o=b+132|0;G=+g[f+12>>2];T=+g[j+8>>2];C=+g[f+8>>2];I=+g[j+12>>2];B=G*T-C*I;I=T*C+G*I;T=+B;J=+I;H=+g[j>>2]- +g[f>>2];S=+g[j+4>>2]- +g[f+4>>2];E=G*H+C*S;H=G*S-C*H;C=+E;S=+H;j=o;g[j>>2]=C;g[j+4>>2]=S;j=b+140|0;g[j>>2]=T;g[j+4>>2]=J;j=b+144|0;J=+g[h+12>>2];n=b+140|0;T=+g[h+16>>2];o=o|0;E=E+(I*J-B*T);f=b+136|0;H=J*B+I*T+H;P=b+148|0;T=+E;I=+H;g[P>>2]=T;g[P+4>>2]=I;P=e+28|0;w=b+156|0;M=c[P>>2]|0;P=c[P+4>>2]|0;c[w>>2]=M;c[w+4>>2]=P;w=e+12|0;t=b+164|0;v=c[w>>2]|0;w=c[w+4>>2]|0;c[t>>2]=v;c[t+4>>2]=w;A=e+20|0;s=b+172|0;W=c[A>>2]|0;A=c[A+4>>2]|0;c[s>>2]=W;c[s+4>>2]=A;V=e+36|0;D=b+180|0;R=c[V>>2]|0;V=c[V+4>>2]|0;c[D>>2]=R;c[D+4>>2]=V;D=a[e+44|0]&1;z=D<<24>>24!=0;F=a[e+45|0]|0;y=(F&1)!=0;I=(c[k>>2]=W,+g[k>>2]);T=(c[k>>2]=v,+g[k>>2]);B=I-T;J=(c[k>>2]=A,+g[k>>2]);A=b+168|0;S=(c[k>>2]=w,+g[k>>2]);C=J-S;G=+Q(B*B+C*C);K=(c[k>>2]=M,+g[k>>2]);O=(c[k>>2]=P,+g[k>>2]);N=(c[k>>2]=R,+g[k>>2]);L=(c[k>>2]=V,+g[k>>2]);if(G>=1.1920928955078125e-7){U=1.0/G;B=B*U;C=C*U}e=b+196|0;G=-0.0-B;v=e|0;g[v>>2]=C;w=b+200|0;g[w>>2]=G;G=(E-T)*C+(H-S)*G;if(z){T=T-K;U=S-O;S=+Q(T*T+U*U);if(S<1.1920928955078125e-7){S=T}else{X=1.0/S;S=T*X;U=U*X}X=-0.0-S;g[b+188>>2]=U;g[b+192>>2]=X;K=(E-K)*U+(H-O)*X;M=C*S-B*U>=0.0}else{K=0.0;M=0}a:do{if(y){N=N-I;L=L-J;O=+Q(N*N+L*L);if(O>=1.1920928955078125e-7){X=1.0/O;N=N*X;L=L*X}X=-0.0-N;R=b+204|0;g[R>>2]=L;P=b+208|0;g[P>>2]=X;V=B*L-C*N>0.0;E=(E-I)*L+(H-J)*X;if((D&F)<<24>>24==0){u=38;break}if(M&V){do{if(K<0.0&G<0.0){W=E>=0.0;a[b+248|0]=W&1;y=b+212|0;if(W){break}W=y;V=(g[k>>2]=-0.0-C,c[k>>2]|0);V=V|0;X=+B;c[W>>2]=V;g[W+4>>2]=X;W=b+228|0;c[W>>2]=V;g[W+4>>2]=X;W=b+236|0;c[W>>2]=V;g[W+4>>2]=X;break a}else{a[b+248|0]=1;y=b+212|0}}while(0);W=e;V=y;R=c[W+4>>2]|0;c[V>>2]=c[W>>2];c[V+4>>2]=R;V=b+188|0;R=b+228|0;W=c[V+4>>2]|0;c[R>>2]=c[V>>2];c[R+4>>2]=W;R=b+204|0;W=b+236|0;V=c[R+4>>2]|0;c[W>>2]=c[R>>2];c[W+4>>2]=V;break}if(M){do{if(K<0.0){if(G<0.0){a[b+248|0]=0;y=b+212|0}else{W=E>=0.0;a[b+248|0]=W&1;y=b+212|0;if(W){break}}W=y;U=+(-0.0-C);X=+B;g[W>>2]=U;g[W+4>>2]=X;W=b+228|0;X=+(-0.0- +g[R>>2]);U=+(-0.0- +g[P>>2]);g[W>>2]=X;g[W+4>>2]=U;W=b+236|0;U=+(-0.0- +g[v>>2]);X=+(-0.0- +g[w>>2]);g[W>>2]=U;g[W+4>>2]=X;break a}else{a[b+248|0]=1;y=b+212|0}}while(0);R=e;P=y;W=c[R+4>>2]|0;c[P>>2]=c[R>>2];c[P+4>>2]=W;P=b+188|0;W=b+228|0;V=c[P+4>>2]|0;c[W>>2]=c[P>>2];c[W+4>>2]=V;W=b+236|0;V=c[R+4>>2]|0;c[W>>2]=c[R>>2];c[W+4>>2]=V;break}if(!V){do{if(K<0.0|G<0.0){a[b+248|0]=0;y=b+212|0}else{W=E>=0.0;a[b+248|0]=W&1;y=b+212|0;if(!W){break}V=e;W=y;R=c[V>>2]|0;V=c[V+4>>2]|0;c[W>>2]=R;c[W+4>>2]=V;W=b+228|0;c[W>>2]=R;c[W+4>>2]=V;W=b+236|0;c[W>>2]=R;c[W+4>>2]=V;break a}}while(0);W=y;U=+(-0.0-C);X=+B;g[W>>2]=U;g[W+4>>2]=X;W=b+228|0;X=+(-0.0- +g[R>>2]);U=+(-0.0- +g[P>>2]);g[W>>2]=X;g[W+4>>2]=U;W=b+236|0;U=+(-0.0- +g[b+188>>2]);X=+(-0.0- +g[b+192>>2]);g[W>>2]=U;g[W+4>>2]=X;break}do{if(E<0.0){if(K<0.0){a[b+248|0]=0;y=b+212|0}else{W=G>=0.0;a[b+248|0]=W&1;y=b+212|0;if(W){break}}W=y;U=+(-0.0-C);X=+B;g[W>>2]=U;g[W+4>>2]=X;W=b+228|0;X=+(-0.0- +g[v>>2]);U=+(-0.0- +g[w>>2]);g[W>>2]=X;g[W+4>>2]=U;W=b+236|0;U=+(-0.0- +g[b+188>>2]);X=+(-0.0- +g[b+192>>2]);g[W>>2]=U;g[W+4>>2]=X;break a}else{a[b+248|0]=1;y=b+212|0}}while(0);V=e;R=y;W=c[V+4>>2]|0;c[R>>2]=c[V>>2];c[R+4>>2]=W;R=b+228|0;W=c[V+4>>2]|0;c[R>>2]=c[V>>2];c[R+4>>2]=W;R=b+204|0;W=b+236|0;V=c[R+4>>2]|0;c[W>>2]=c[R>>2];c[W+4>>2]=V}else{V=0;E=0.0;u=38}}while(0);b:do{if((u|0)==38){if(z){y=K>=0.0;if(M){do{if(y){a[b+248|0]=1;y=b+212|0}else{W=G>=0.0;a[b+248|0]=W&1;y=b+212|0;if(W){break}P=y;W=(g[k>>2]=-0.0-C,c[k>>2]|0);R=0;X=+B;c[P>>2]=R|W;g[P+4>>2]=X;P=e;W=b+228|0;V=c[P>>2]|0;P=c[P+4>>2]|0;c[W>>2]=V;c[W+4>>2]=P;W=b+236|0;c[W>>2]=R|(g[k>>2]=-0.0-(c[k>>2]=V,+g[k>>2]),c[k>>2]|0);g[W+4>>2]=X;break b}}while(0);V=e;R=y;W=c[V+4>>2]|0;c[R>>2]=c[V>>2];c[R+4>>2]=W;R=b+188|0;W=b+228|0;V=c[R+4>>2]|0;c[W>>2]=c[R>>2];c[W+4>>2]=V;W=b+236|0;U=+(-0.0- +g[v>>2]);X=+(-0.0- +g[w>>2]);g[W>>2]=U;g[W+4>>2]=X;break}else{do{if(y){W=G>=0.0;a[b+248|0]=W&1;y=b+212|0;if(!W){break}R=e;W=y;V=c[R>>2]|0;R=c[R+4>>2]|0;c[W>>2]=V;c[W+4>>2]=R;W=b+228|0;c[W>>2]=V;c[W+4>>2]=R;W=b+236|0;U=+(-0.0-(c[k>>2]=V,+g[k>>2]));X=+B;g[W>>2]=U;g[W+4>>2]=X;break b}else{a[b+248|0]=0;y=b+212|0}}while(0);R=y;X=+(-0.0-C);U=+B;g[R>>2]=X;g[R+4>>2]=U;R=e;W=b+228|0;V=c[R+4>>2]|0;c[W>>2]=c[R>>2];c[W+4>>2]=V;W=b+236|0;U=+(-0.0- +g[b+188>>2]);X=+(-0.0- +g[b+192>>2]);g[W>>2]=U;g[W+4>>2]=X;break}}z=G>=0.0;if(!y){a[b+248|0]=z&1;y=b+212|0;if(z){R=e;W=y;V=c[R>>2]|0;R=c[R+4>>2]|0;c[W>>2]=V;c[W+4>>2]=R;W=b+228|0;V=(g[k>>2]=-0.0-(c[k>>2]=V,+g[k>>2]),c[k>>2]|0);V=V|0;X=+B;c[W>>2]=V;g[W+4>>2]=X;W=b+236|0;c[W>>2]=V;g[W+4>>2]=X;break}else{V=y;U=+(-0.0-C);X=+B;g[V>>2]=U;g[V+4>>2]=X;V=e;W=b+228|0;R=c[V>>2]|0;V=c[V+4>>2]|0;c[W>>2]=R;c[W+4>>2]=V;W=b+236|0;c[W>>2]=R;c[W+4>>2]=V;break}}if(V){do{if(z){a[b+248|0]=1;y=b+212|0}else{W=E>=0.0;a[b+248|0]=W&1;y=b+212|0;if(W){break}R=y;W=(g[k>>2]=-0.0-C,c[k>>2]|0);W=W|0;X=+B;c[R>>2]=W;g[R+4>>2]=X;R=b+228|0;c[R>>2]=W;g[R+4>>2]=X;R=e;W=b+236|0;V=c[R+4>>2]|0;c[W>>2]=c[R>>2];c[W+4>>2]=V;break b}}while(0);V=e;R=y;W=c[V+4>>2]|0;c[R>>2]=c[V>>2];c[R+4>>2]=W;R=b+228|0;U=+(-0.0- +g[v>>2]);X=+(-0.0- +g[w>>2]);g[R>>2]=U;g[R+4>>2]=X;R=b+204|0;W=b+236|0;V=c[R+4>>2]|0;c[W>>2]=c[R>>2];c[W+4>>2]=V;break}else{do{if(z){W=E>=0.0;a[b+248|0]=W&1;y=b+212|0;if(!W){break}V=e;W=y;R=c[V>>2]|0;V=c[V+4>>2]|0;c[W>>2]=R;c[W+4>>2]=V;W=b+228|0;U=+(-0.0-(c[k>>2]=R,+g[k>>2]));X=+B;g[W>>2]=U;g[W+4>>2]=X;W=b+236|0;c[W>>2]=R;c[W+4>>2]=V;break b}else{a[b+248|0]=0;y=b+212|0}}while(0);R=y;X=+(-0.0-C);U=+B;g[R>>2]=X;g[R+4>>2]=U;R=b+228|0;U=+(-0.0- +g[b+204>>2]);X=+(-0.0- +g[b+208>>2]);g[R>>2]=U;g[R+4>>2]=X;R=e;W=b+236|0;V=c[R+4>>2]|0;c[W>>2]=c[R>>2];c[W+4>>2]=V;break}}}while(0);y=h+148|0;F=b+128|0;c[F>>2]=c[y>>2];if((c[y>>2]|0)>0){z=0;do{S=+g[j>>2];U=+g[h+20+(z<<3)>>2];X=+g[n>>2];T=+g[h+20+(z<<3)+4>>2];W=b+(z<<3)|0;O=+(+g[o>>2]+(S*U-X*T));T=+(U*X+S*T+ +g[f>>2]);g[W>>2]=O;g[W+4>>2]=T;T=+g[j>>2];O=+g[h+84+(z<<3)>>2];S=+g[n>>2];X=+g[h+84+(z<<3)+4>>2];W=b+64+(z<<3)|0;U=+(T*O-S*X);X=+(O*S+T*X);g[W>>2]=U;g[W+4>>2]=X;z=z+1|0;}while((z|0)<(c[y>>2]|0))}z=b+244|0;g[z>>2]=.019999999552965164;y=d+60|0;c[y>>2]=0;D=b+248|0;M=c[F>>2]|0;if((M|0)>0){B=+g[b+164>>2];G=+g[A>>2];E=+g[b+212>>2];C=+g[b+216>>2];A=0;H=3.4028234663852886e+38;do{I=E*(+g[b+(A<<3)>>2]-B)+C*(+g[b+(A<<3)+4>>2]-G);H=I<H?I:H;A=A+1|0;}while((A|0)<(M|0))}else{H=3.4028234663852886e+38}if(H>+g[z>>2]){i=l;return}ee(x,b);M=c[x>>2]|0;do{if((M|0)==0){u=74}else{B=+g[x+8>>2];if(B>+g[z>>2]){i=l;return}if(B<=H*.9800000190734863+.0010000000474974513){u=74;break}A=c[x+4>>2]|0;x=r|0;P=d+56|0;if((M|0)==1){u=76;break}c[P>>2]=2;W=r;V=c[t+4>>2]|0;c[W>>2]=c[t>>2];c[W+4>>2]=V;W=r+8|0;V=W;a[W]=0;W=A&255;a[V+1|0]=W;a[V+2|0]=0;a[V+3|0]=1;V=r+12|0;R=c[s+4>>2]|0;c[V>>2]=c[s>>2];c[V+4>>2]=R;V=r+20|0;r=V;a[V]=0;a[r+1|0]=W;a[r+2|0]=0;a[r+3|0]=1;c[p>>2]=A;r=A+1|0;e=(r|0)<(c[F>>2]|0)?r:0;c[p+4>>2]=e;s=b+(A<<3)|0;w=p+8|0;D=c[s>>2]|0;s=c[s+4>>2]|0;c[w>>2]=D;c[w+4>>2]=s;e=b+(e<<3)|0;w=p+16|0;v=c[e>>2]|0;e=c[e+4>>2]|0;c[w>>2]=v;c[w+4>>2]=e;w=b+64+(A<<3)|0;r=p+24|0;t=c[w>>2]|0;w=c[w+4>>2]|0;c[r>>2]=t;c[r+4>>2]=w;r=A;b=0}}while(0);if((u|0)==74){x=r|0;P=d+56|0;u=76}do{if((u|0)==76){c[P>>2]=1;u=c[F>>2]|0;if((u|0)>1){C=+g[b+216>>2];G=+g[b+212>>2];M=0;E=G*+g[b+64>>2]+C*+g[b+68>>2];F=1;while(1){B=G*+g[b+64+(F<<3)>>2]+C*+g[b+64+(F<<3)+4>>2];A=B<E;M=A?F:M;F=F+1|0;if((F|0)<(u|0)){E=A?B:E}else{break}}}else{M=0}A=M+1|0;W=(A|0)<(u|0)?A:0;P=b+(M<<3)|0;V=r;R=c[P+4>>2]|0;c[V>>2]=c[P>>2];c[V+4>>2]=R;V=r+8|0;R=V;a[V]=0;a[R+1|0]=M;a[R+2|0]=1;a[R+3|0]=0;R=b+(W<<3)|0;V=r+12|0;b=c[R+4>>2]|0;c[V>>2]=c[R>>2];c[V+4>>2]=b;V=r+20|0;b=V;a[V]=0;a[b+1|0]=W;a[b+2|0]=1;a[b+3|0]=0;b=p|0;if((a[D]&1)==0){c[b>>2]=1;c[p+4>>2]=0;b=p+8|0;D=c[s>>2]|0;s=c[s+4>>2]|0;c[b>>2]=D;c[b+4>>2]=s;b=p+16|0;r=c[t>>2]|0;e=c[t+4>>2]|0;c[b>>2]=r;c[b+4>>2]=e;b=p+24|0;t=(g[k>>2]=-0.0- +g[v>>2],c[k>>2]|0);w=(g[k>>2]=-0.0- +g[w>>2],c[k>>2]|0);c[b>>2]=t;c[b+4>>2]=w;v=r;r=1;b=1;break}else{c[b>>2]=0;c[p+4>>2]=1;w=p+8|0;D=c[t>>2]|0;b=c[t+4>>2]|0;c[w>>2]=D;c[w+4>>2]=b;w=p+16|0;v=c[s>>2]|0;r=c[s+4>>2]|0;c[w>>2]=v;c[w+4>>2]=r;w=e;s=p+24|0;t=c[w>>2]|0;w=c[w+4>>2]|0;c[s>>2]=t;c[s+4>>2]=w;s=b;e=r;r=0;b=1;break}}}while(0);L=(c[k>>2]=w,+g[k>>2]);X=(c[k>>2]=t,+g[k>>2]);N=(c[k>>2]=D,+g[k>>2]);O=(c[k>>2]=s,+g[k>>2]);S=(c[k>>2]=v,+g[k>>2]);U=(c[k>>2]=e,+g[k>>2]);W=p+32|0;w=p+24|0;s=p+28|0;e=w|0;X=-0.0-X;g[W>>2]=L;g[p+36>>2]=X;F=p+44|0;T=-0.0-L;v=F;g[v>>2]=T;c[v+4>>2]=t;v=p+8|0;A=v|0;u=p+12|0;X=L*N+O*X;g[p+40>>2]=X;D=p+52|0;g[D>>2]=S*T+(c[k>>2]=t,+g[k>>2])*U;t=q|0;q=p|0;if((ke(t,x,W,X,r)|0)<2){i=l;return}if((ke(m|0,t,F,+g[D>>2],c[p+4>>2]|0)|0)<2){i=l;return}p=d+40|0;do{if(b){R=w;P=p;W=c[R>>2]|0;R=c[R+4>>2]|0;c[P>>2]=W;c[P+4>>2]=R;P=v;R=d+48|0;V=c[P>>2]|0;P=c[P+4>>2]|0;c[R>>2]=V;c[R+4>>2]=P;C=(c[k>>2]=V,+g[k>>2]);B=(c[k>>2]=W,+g[k>>2]);E=+g[u>>2];G=+g[s>>2];J=+g[m>>2];I=+g[m+4>>2];H=+g[z>>2];if((J-C)*B+(I-E)*G>H){h=0}else{U=J- +g[o>>2];T=I- +g[f>>2];S=+g[j>>2];H=+g[n>>2];h=d;X=+(U*S+T*H);H=+(S*T-U*H);g[h>>2]=X;g[h+4>>2]=H;c[d+16>>2]=c[m+8>>2];h=1;H=+g[z>>2]}J=+g[m+12>>2];I=+g[m+16>>2];if((J-C)*B+(I-E)*G>H){break}T=J- +g[o>>2];S=I- +g[f>>2];O=+g[j>>2];X=+g[n>>2];W=d+(h*20|0)|0;U=+(T*O+S*X);X=+(O*S-T*X);g[W>>2]=U;g[W+4>>2]=X;c[d+(h*20|0)+16>>2]=c[m+20>>2];h=h+1|0}else{R=c[q>>2]|0;P=h+84+(R<<3)|0;W=p;V=c[P+4>>2]|0;c[W>>2]=c[P>>2];c[W+4>>2]=V;R=h+20+(R<<3)|0;W=d+48|0;V=c[R+4>>2]|0;c[W>>2]=c[R>>2];c[W+4>>2]=V;B=+g[A>>2];C=+g[e>>2];E=+g[u>>2];G=+g[s>>2];H=+g[z>>2];if((+g[m>>2]-B)*C+(+g[m+4>>2]-E)*G>H){h=0}else{V=m;W=d;R=c[V+4>>2]|0;c[W>>2]=c[V>>2];c[W+4>>2]=R;W=m+8|0;R=W;V=d+16|0;h=V;a[h+2|0]=a[R+3|0]|0;a[h+3|0]=a[R+2|0]|0;a[V]=a[R+1|0]|0;a[h+1|0]=a[W]|0;h=1;H=+g[z>>2]}f=m+12|0;if((+g[f>>2]-B)*C+(+g[m+16>>2]-E)*G>H){break}R=f;V=d+(h*20|0)|0;P=c[R+4>>2]|0;c[V>>2]=c[R>>2];c[V+4>>2]=P;V=m+20|0;P=V;R=d+(h*20|0)+16|0;W=R;a[W+2|0]=a[P+3|0]|0;a[W+3|0]=a[P+2|0]|0;a[R]=a[P+1|0]|0;a[W+1|0]=a[V]|0;h=h+1|0}}while(0);c[y>>2]=h;i=l;return}function ee(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,h=0.0,i=0.0,j=0,k=0.0,l=0.0,m=0.0,n=0,o=0,p=0,q=0,r=0.0,s=0.0,t=0,u=0.0,v=0.0,w=0.0,x=0.0,y=0.0,z=0.0,A=0.0;f=a|0;c[f>>2]=0;e=a+4|0;c[e>>2]=-1;q=a+8|0;g[q>>2]=-3.4028234663852886e+38;i=+g[b+216>>2];h=+g[b+212>>2];a=c[b+128>>2]|0;if((a|0)<=0){return}s=+g[b+164>>2];m=+g[b+168>>2];l=+g[b+172>>2];k=+g[b+176>>2];r=+g[b+244>>2];n=b+228|0;o=b+232|0;p=b+236|0;j=b+240|0;t=0;v=-3.4028234663852886e+38;while(1){u=+g[b+64+(t<<3)>>2];w=-0.0-u;x=-0.0- +g[b+64+(t<<3)+4>>2];A=+g[b+(t<<3)>>2];z=+g[b+(t<<3)+4>>2];y=(A-s)*w+(z-m)*x;z=(A-l)*w+(z-k)*x;y=y<z?y:z;if(y>r){break}if(i*u+h*x<0.0){if((w- +g[n>>2])*h+(x- +g[o>>2])*i>=-.03490658849477768&y>v){d=8}}else{if((w- +g[p>>2])*h+(x- +g[j>>2])*i>=-.03490658849477768&y>v){d=8}}if((d|0)==8){d=0;c[f>>2]=2;c[e>>2]=t;g[q>>2]=y;v=y}t=t+1|0;if((t|0)>=(a|0)){d=10;break}}if((d|0)==10){return}c[f>>2]=2;c[e>>2]=t;g[q>>2]=y;return}function fe(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0;f=i;i=i+256|0;de(f|0,a,b,c,d,e);i=f;return}function ge(b,d,e,f,h){b=b|0;d=d|0;e=e|0;f=f|0;h=h|0;var j=0,k=0,l=0,m=0.0,n=0.0,o=0.0,p=0.0,q=0.0,r=0,s=0,t=0,u=0.0,v=0.0,w=0.0,x=0.0,y=0,z=0,A=0,B=0.0,C=0.0,D=0.0,E=0.0,F=0.0,G=0,H=0.0,I=0.0,J=0,K=0.0,L=0,M=0,N=0.0,O=0.0,P=0,R=0.0,S=0.0;j=i;i=i+104|0;y=j|0;A=j+8|0;z=j+16|0;r=j+40|0;t=j+48|0;l=j+72|0;s=j+96|0;k=b+60|0;c[k>>2]=0;m=+g[d+8>>2]+ +g[f+8>>2];c[y>>2]=0;n=+he(y,d,e,f,h);if(n>m){i=j;return}c[A>>2]=0;o=+he(A,f,h,d,e);if(o>m){i=j;return}if(o>n*.9800000190734863+.0010000000474974513){v=+g[h>>2];u=+g[h+4>>2];w=+g[h+8>>2];x=+g[h+12>>2];q=+g[e>>2];o=+g[e+4>>2];p=+g[e+8>>2];n=+g[e+12>>2];h=c[A>>2]|0;c[b+56>>2]=2;A=f;f=1}else{v=+g[e>>2];u=+g[e+4>>2];w=+g[e+8>>2];x=+g[e+12>>2];q=+g[h>>2];o=+g[h+4>>2];p=+g[h+8>>2];n=+g[h+12>>2];h=c[y>>2]|0;c[b+56>>2]=1;A=d;d=f;f=0}y=z|0;G=c[d+148>>2]|0;if((h|0)<=-1){va(1112,3248,151,4928)}e=c[A+148>>2]|0;if((e|0)<=(h|0)){va(1112,3248,151,4928)}B=+g[A+84+(h<<3)>>2];O=+g[A+84+(h<<3)+4>>2];C=x*B-w*O;O=w*B+x*O;B=n*C+p*O;C=n*O-p*C;if((G|0)>0){M=0;D=3.4028234663852886e+38;L=0;while(1){E=B*+g[d+84+(M<<3)>>2]+C*+g[d+84+(M<<3)+4>>2];J=E<D;L=J?M:L;M=M+1|0;if((M|0)<(G|0)){D=J?E:D}else{break}}}else{L=0}J=L+1|0;M=(J|0)<(G|0)?J:0;N=+g[d+20+(L<<3)>>2];K=+g[d+20+(L<<3)+4>>2];J=z;O=+(q+(n*N-p*K));K=+(o+(p*N+n*K));g[J>>2]=O;g[J+4>>2]=K;J=h&255;P=z+8|0;G=P;a[P]=J;a[G+1|0]=L;a[G+2|0]=1;a[G+3|0]=0;K=+g[d+20+(M<<3)>>2];O=+g[d+20+(M<<3)+4>>2];L=z+12|0;N=+(q+(n*K-p*O));O=+(o+(p*K+n*O));g[L>>2]=N;g[L+4>>2]=O;L=z+20|0;z=L;a[L]=J;a[z+1|0]=M;a[z+2|0]=1;a[z+3|0]=0;z=h+1|0;z=(z|0)<(e|0)?z:0;P=A+20+(h<<3)|0;F=+g[P>>2];E=+g[P+4>>2];P=A+20+(z<<3)|0;I=+g[P>>2];H=+g[P+4>>2];K=I-F;O=H-E;B=+Q(K*K+O*O);if(B>=1.1920928955078125e-7){N=1.0/B;K=K*N;O=O*N}N=x*K-w*O;C=x*O+w*K;g[r>>2]=N;g[r+4>>2]=C;B=-0.0-N;S=v+(x*F-w*E);R=u+(w*F+x*E);t=t|0;D=S*C+R*B;g[s>>2]=B;g[s+4>>2]=-0.0-C;if((ke(t,y,s,m-(S*N+R*C),h)|0)<2){i=j;return}if((ke(l|0,t,r,m+((v+(x*I-w*H))*N+(u+(w*I+x*H))*C),z)|0)<2){i=j;return}r=b+40|0;v=+O;u=+(-0.0-K);g[r>>2]=v;g[r+4>>2]=u;r=b+48|0;u=+((F+I)*.5);v=+((E+H)*.5);g[r>>2]=u;g[r+4>>2]=v;v=+g[l>>2];u=+g[l+4>>2];r=C*v+u*B-D>m;do{if(f<<24>>24==0){if(r){r=0}else{S=v-q;O=u-o;r=b;R=+(n*S+p*O);S=+(n*O-p*S);g[r>>2]=R;g[r+4>>2]=S;c[b+16>>2]=c[l+8>>2];r=1}u=+g[l+12>>2];v=+g[l+16>>2];if(C*u+v*B-D>m){break}S=u-q;O=v-o;P=b+(r*20|0)|0;R=+(n*S+p*O);S=+(n*O-p*S);g[P>>2]=R;g[P+4>>2]=S;c[b+(r*20|0)+16>>2]=c[l+20>>2];r=r+1|0}else{if(r){r=0}else{S=v-q;O=u-o;M=b;R=+(n*S+p*O);S=+(n*O-p*S);g[M>>2]=R;g[M+4>>2]=S;M=b+16|0;P=c[l+8>>2]|0;c[M>>2]=P;r=M;a[M]=P>>>8;a[r+1|0]=P;a[r+2|0]=P>>>24;a[r+3|0]=P>>>16;r=1}u=+g[l+12>>2];v=+g[l+16>>2];if(C*u+v*B-D>m){break}S=u-q;O=v-o;L=b+(r*20|0)|0;R=+(n*S+p*O);S=+(n*O-p*S);g[L>>2]=R;g[L+4>>2]=S;L=b+(r*20|0)+16|0;M=c[l+20>>2]|0;c[L>>2]=M;P=L;a[L]=M>>>8;a[P+1|0]=M;a[P+2|0]=M>>>24;a[P+3|0]=M>>>16;r=r+1|0}}while(0);c[k>>2]=r;i=j;return}function he(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var h=0,i=0.0,j=0.0,k=0.0,l=0.0,m=0,n=0,o=0,p=0.0,q=0.0,r=0.0,s=0.0,t=0.0;h=c[b+148>>2]|0;r=+g[f+12>>2];t=+g[e+12>>2];s=+g[f+8>>2];q=+g[e+16>>2];p=+g[d+12>>2];j=+g[b+12>>2];i=+g[d+8>>2];k=+g[b+16>>2];l=+g[f>>2]+(r*t-s*q)-(+g[d>>2]+(p*j-i*k));k=t*s+r*q+ +g[f+4>>2]-(j*i+p*k+ +g[d+4>>2]);j=p*l+i*k;i=p*k-l*i;if((h|0)>0){o=0;k=-3.4028234663852886e+38;n=0;while(1){l=j*+g[b+84+(o<<3)>>2]+i*+g[b+84+(o<<3)+4>>2];m=l>k;n=m?o:n;o=o+1|0;if((o|0)<(h|0)){k=m?l:k}else{break}}}else{n=0}i=+ie(b,d,n,e,f);m=((n|0)>0?n:h)-1|0;j=+ie(b,d,m,e,f);o=n+1|0;o=(o|0)<(h|0)?o:0;k=+ie(b,d,o,e,f);if(j>i&j>k){while(1){n=((m|0)>0?m:h)-1|0;i=+ie(b,d,n,e,f);if(i>j){j=i;m=n}else{break}}c[a>>2]=m;return+j}if(k>i){j=k;m=o}else{t=i;o=n;c[a>>2]=o;return+t}while(1){n=m+1|0;n=(n|0)<(h|0)?n:0;i=+ie(b,d,n,e,f);if(i>j){j=i;m=n}else{break}}c[a>>2]=m;return+j}function ie(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var h=0.0,i=0.0,j=0.0,k=0.0,l=0.0,m=0.0,n=0,o=0.0,p=0.0,q=0.0,r=0.0,s=0,t=0,u=0;n=c[e+148>>2]|0;if((d|0)<=-1){va(1112,3248,32,4952);return 0.0}if((c[a+148>>2]|0)<=(d|0)){va(1112,3248,32,4952);return 0.0}h=+g[b+12>>2];l=+g[a+84+(d<<3)>>2];j=+g[b+8>>2];i=+g[a+84+(d<<3)+4>>2];k=h*l-j*i;i=l*j+h*i;l=+g[f+12>>2];m=+g[f+8>>2];o=l*k+m*i;q=l*i-k*m;if((n|0)>0){t=0;p=3.4028234663852886e+38;u=0;while(1){r=o*+g[e+20+(t<<3)>>2]+q*+g[e+20+(t<<3)+4>>2];s=r<p;u=s?t:u;t=t+1|0;if((t|0)<(n|0)){p=s?r:p}else{break}}}else{u=0}q=+g[a+20+(d<<3)>>2];r=+g[a+20+(d<<3)+4>>2];o=+g[e+20+(u<<3)>>2];p=+g[e+20+(u<<3)+4>>2];return+(k*(+g[f>>2]+(l*o-m*p)-(+g[b>>2]+(h*q-j*r)))+i*(o*m+l*p+ +g[f+4>>2]-(q*j+h*r+ +g[b+4>>2])))}function je(a,b,d,e,f,h){a=a|0;b=b|0;d=d|0;e=+e;f=f|0;h=+h;var i=0,j=0,k=0.0,l=0,m=0.0,n=0,o=0,p=0,q=0.0,r=0,s=0.0,t=0.0,u=0.0,v=0.0,w=0.0,x=0,y=0.0;i=b+60|0;if((c[i>>2]|0)==0){return}j=c[b+56>>2]|0;if((j|0)==0){i=a|0;g[i>>2]=1.0;j=a+4|0;g[j>>2]=0.0;u=+g[d+12>>2];v=+g[b+48>>2];t=+g[d+8>>2];m=+g[b+52>>2];k=+g[d>>2]+(u*v-t*m);m=v*t+u*m+ +g[d+4>>2];u=+g[f+12>>2];t=+g[b>>2];v=+g[f+8>>2];s=+g[b+4>>2];q=+g[f>>2]+(u*t-v*s);s=t*v+u*s+ +g[f+4>>2];u=k-q;v=m-s;do{if(u*u+v*v>1.4210854715202004e-14){v=q-k;t=s-m;r=a;w=+v;u=+t;g[r>>2]=w;g[r+4>>2]=u;u=+Q(v*v+t*t);if(u<1.1920928955078125e-7){break}w=1.0/u;v=v*w;g[i>>2]=v;t=t*w;g[j>>2]=t}else{v=1.0;t=0.0}}while(0);r=a+8|0;v=+((k+v*e+(q-v*h))*.5);w=+((m+t*e+(s-t*h))*.5);g[r>>2]=v;g[r+4>>2]=w;return}else if((j|0)==2){p=f+12|0;u=+g[p>>2];v=+g[b+40>>2];r=f+8|0;w=+g[r>>2];q=+g[b+44>>2];s=u*v-w*q;q=v*w+u*q;j=a;u=+s;w=+q;g[j>>2]=u;g[j+4>>2]=w;w=+g[p>>2];u=+g[b+48>>2];v=+g[r>>2];m=+g[b+52>>2];k=+g[f>>2]+(w*u-v*m);m=u*v+w*m+ +g[f+4>>2];if((c[i>>2]|0)>0){f=d+12|0;n=d+8|0;l=d|0;d=d+4|0;p=a|0;o=a+4|0;r=0;do{v=+g[f>>2];y=+g[b+(r*20|0)>>2];t=+g[n>>2];u=+g[b+(r*20|0)+4>>2];w=+g[l>>2]+(v*y-t*u);u=y*t+v*u+ +g[d>>2];v=h-(s*(w-k)+(u-m)*q);x=a+8+(r<<3)|0;w=+((w-s*e+(w+s*v))*.5);s=+((u-q*e+(u+q*v))*.5);g[x>>2]=w;g[x+4>>2]=s;r=r+1|0;s=+g[p>>2];q=+g[o>>2]}while((r|0)<(c[i>>2]|0))}w=+(-0.0-s);y=+(-0.0-q);g[j>>2]=w;g[j+4>>2]=y;return}else if((j|0)==1){r=d+12|0;v=+g[r>>2];w=+g[b+40>>2];x=d+8|0;y=+g[x>>2];q=+g[b+44>>2];s=v*w-y*q;q=w*y+v*q;p=a;v=+s;y=+q;g[p>>2]=v;g[p+4>>2]=y;y=+g[r>>2];v=+g[b+48>>2];w=+g[x>>2];m=+g[b+52>>2];k=+g[d>>2]+(y*v-w*m);m=v*w+y*m+ +g[d+4>>2];if((c[i>>2]|0)<=0){return}l=f+12|0;j=f+8|0;n=f|0;o=f+4|0;d=a|0;f=a+4|0;p=0;while(1){y=+g[l>>2];t=+g[b+(p*20|0)>>2];u=+g[j>>2];v=+g[b+(p*20|0)+4>>2];w=+g[n>>2]+(y*t-u*v);v=t*u+y*v+ +g[o>>2];y=e-(s*(w-k)+(v-m)*q);x=a+8+(p<<3)|0;w=+((w-s*h+(w+s*y))*.5);y=+((v-q*h+(v+q*y))*.5);g[x>>2]=w;g[x+4>>2]=y;p=p+1|0;if((p|0)>=(c[i>>2]|0)){break}s=+g[d>>2];q=+g[f>>2]}return}else{return}}function ke(b,d,e,f,h){b=b|0;d=d|0;e=e|0;f=+f;h=h|0;var i=0,j=0,k=0,l=0.0,m=0,n=0,o=0.0,p=0.0,q=0;p=+g[e>>2];i=d|0;o=+g[e+4>>2];e=d+4|0;l=p*+g[i>>2]+o*+g[e>>2]-f;m=d+12|0;j=m|0;k=d+16|0;f=p*+g[j>>2]+o*+g[k>>2]-f;if(l>0.0){n=0}else{n=b;q=d;c[n>>2]=c[q>>2];c[n+4>>2]=c[q+4>>2];c[n+8>>2]=c[q+8>>2];n=1}if(f<=0.0){q=b+(n*12|0)|0;c[q>>2]=c[m>>2];c[q+4>>2]=c[m+4>>2];c[q+8>>2]=c[m+8>>2];n=n+1|0}if(l*f>=0.0){q=n;return q|0}f=l/(l-f);o=+g[i>>2];p=+g[e>>2];m=b+(n*12|0)|0;o=+(o+f*(+g[j>>2]-o));p=+(p+f*(+g[k>>2]-p));g[m>>2]=o;g[m+4>>2]=p;m=b+(n*12|0)+8|0;q=m;a[m]=h;a[q+1|0]=a[d+9|0]|0;a[q+2|0]=0;a[q+3|0]=1;q=n+1|0;return q|0}function le(d,e,f,h,j,k){d=d|0;e=e|0;f=f|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0;m=i;i=i+136|0;n=m|0;o=m+96|0;l=m+112|0;c[n+16>>2]=0;c[n+20>>2]=0;g[n+24>>2]=0.0;c[n+44>>2]=0;c[n+48>>2]=0;g[n+52>>2]=0.0;ad(n|0,d,e);ad(n+28|0,f,h);d=n+56|0;e=j;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];c[d+8>>2]=c[e+8>>2];c[d+12>>2]=c[e+12>>2];d=n+72|0;e=k;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];c[d+8>>2]=c[e+8>>2];c[d+12>>2]=c[e+12>>2];a[n+88|0]=1;b[o+4>>1]=0;cd(l,o,n);i=m;return+g[l+16>>2]<11920928955078125.0e-22|0}function me(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;f=jc(f,144)|0;if((f|0)==0){f=0;f=f|0;return f|0}Ad(f,a,b,d,e);c[f>>2]=5200;if((c[(c[(c[f+48>>2]|0)+12>>2]|0)+4>>2]|0)!=3){va(1064,3192,43,4568);return 0}if((c[(c[(c[f+52>>2]|0)+12>>2]|0)+4>>2]|0)==0){f=f|0;return f|0}else{va(2096,3192,44,4568);return 0}return 0}function ne(a,b){a=a|0;b=b|0;nb[c[(c[a>>2]|0)+4>>2]&127](a);kc(b,a,144);return}function oe(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,h=0,j=0;f=i;i=i+48|0;h=f|0;j=c[(c[a+48>>2]|0)+12>>2]|0;c[h>>2]=5448;c[h+4>>2]=1;g[h+8>>2]=.009999999776482582;gf(h+28|0,0,18)|0;Ke(j,h,c[a+56>>2]|0);ce(b,h,d,c[(c[a+52>>2]|0)+12>>2]|0,e);i=f;return}function pe(a){a=a|0;return}function qe(a){a=a|0;bf(a);return}function re(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;f=jc(f,144)|0;if((f|0)==0){f=0;f=f|0;return f|0}Ad(f,a,b,d,e);c[f>>2]=5136;if((c[(c[(c[f+48>>2]|0)+12>>2]|0)+4>>2]|0)!=3){va(896,3104,43,4512);return 0}if((c[(c[(c[f+52>>2]|0)+12>>2]|0)+4>>2]|0)==2){f=f|0;return f|0}else{va(2048,3104,44,4512);return 0}return 0}function se(a,b){a=a|0;b=b|0;nb[c[(c[a>>2]|0)+4>>2]&127](a);kc(b,a,144);return}function te(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,h=0,j=0;f=i;i=i+48|0;h=f|0;j=c[(c[a+48>>2]|0)+12>>2]|0;c[h>>2]=5448;c[h+4>>2]=1;g[h+8>>2]=.009999999776482582;gf(h+28|0,0,18)|0;Ke(j,h,c[a+56>>2]|0);fe(b,h,d,c[(c[a+52>>2]|0)+12>>2]|0,e);i=f;return}function ue(a){a=a|0;return}function ve(a){a=a|0;bf(a);return}function we(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;f=jc(f,144)|0;if((f|0)==0){e=0;e=e|0;return e|0}Ad(f,a,0,d,0);c[f>>2]=5368;if((c[(c[(c[f+48>>2]|0)+12>>2]|0)+4>>2]|0)!=0){va(720,3056,44,4840);return 0}if((c[(c[(c[f+52>>2]|0)+12>>2]|0)+4>>2]|0)==0){e=f;e=e|0;return e|0}else{va(2e3,3056,45,4840);return 0}return 0}function xe(a,b){a=a|0;b=b|0;nb[c[(c[a>>2]|0)+4>>2]&127](a);kc(b,a,144);return}function ye(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;ae(b,c[(c[a+48>>2]|0)+12>>2]|0,d,c[(c[a+52>>2]|0)+12>>2]|0,e);return}function ze(a){a=a|0;return}function Ae(a){a=a|0;bf(a);return}function Be(b,d){b=b|0;d=d|0;var e=0,f=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0.0,r=0.0,s=0,t=0,u=0,v=0,w=0,x=0;p=b;k=d;c[p>>2]=c[k>>2];c[p+4>>2]=c[k+4>>2];c[p+8>>2]=c[k+8>>2];c[p+12>>2]=c[k+12>>2];c[p+16>>2]=c[k+16>>2];c[p+20>>2]=c[k+20>>2];p=c[d+40>>2]|0;k=b+32|0;c[k>>2]=p;h=c[d+28>>2]|0;f=b+48|0;c[f>>2]=h;e=b+36|0;c[e>>2]=td(p,h*88|0)|0;h=b+40|0;c[h>>2]=td(c[k>>2]|0,(c[f>>2]|0)*152|0)|0;c[b+24>>2]=c[d+32>>2];c[b+28>>2]=c[d+36>>2];k=c[d+24>>2]|0;d=b+44|0;c[d>>2]=k;if((c[f>>2]|0)<=0){return}i=b+20|0;b=b+8|0;j=0;while(1){k=c[k+(j<<2)>>2]|0;p=c[k+48>>2]|0;o=c[k+52>>2]|0;m=c[p+8>>2]|0;n=c[o+8>>2]|0;l=c[k+124>>2]|0;if((l|0)<=0){e=4;break}q=+g[(c[o+12>>2]|0)+8>>2];r=+g[(c[p+12>>2]|0)+8>>2];p=c[h>>2]|0;g[p+(j*152|0)+136>>2]=+g[k+136>>2];g[p+(j*152|0)+140>>2]=+g[k+140>>2];x=m+8|0;c[p+(j*152|0)+112>>2]=c[x>>2];w=n+8|0;c[p+(j*152|0)+116>>2]=c[w>>2];u=m+120|0;g[p+(j*152|0)+120>>2]=+g[u>>2];v=n+120|0;g[p+(j*152|0)+124>>2]=+g[v>>2];t=m+128|0;g[p+(j*152|0)+128>>2]=+g[t>>2];s=n+128|0;g[p+(j*152|0)+132>>2]=+g[s>>2];c[p+(j*152|0)+148>>2]=j;c[p+(j*152|0)+144>>2]=l;gf(p+(j*152|0)+80|0,0,32)|0;o=c[e>>2]|0;c[o+(j*88|0)+32>>2]=c[x>>2];c[o+(j*88|0)+36>>2]=c[w>>2];g[o+(j*88|0)+40>>2]=+g[u>>2];g[o+(j*88|0)+44>>2]=+g[v>>2];v=m+28|0;u=o+(j*88|0)+48|0;m=c[v+4>>2]|0;c[u>>2]=c[v>>2];c[u+4>>2]=m;u=n+28|0;n=o+(j*88|0)+56|0;m=c[u+4>>2]|0;c[n>>2]=c[u>>2];c[n+4>>2]=m;g[o+(j*88|0)+64>>2]=+g[t>>2];g[o+(j*88|0)+68>>2]=+g[s>>2];n=k+104|0;s=o+(j*88|0)+16|0;m=c[n+4>>2]|0;c[s>>2]=c[n>>2];c[s+4>>2]=m;s=k+112|0;m=o+(j*88|0)+24|0;n=c[s+4>>2]|0;c[m>>2]=c[s>>2];c[m+4>>2]=n;c[o+(j*88|0)+84>>2]=l;g[o+(j*88|0)+76>>2]=r;g[o+(j*88|0)+80>>2]=q;c[o+(j*88|0)+72>>2]=c[k+120>>2];m=0;do{if((a[i]&1)==0){g[p+(j*152|0)+(m*36|0)+16>>2]=0.0;g[p+(j*152|0)+(m*36|0)+20>>2]=0.0}else{g[p+(j*152|0)+(m*36|0)+16>>2]=+g[b>>2]*+g[k+64+(m*20|0)+8>>2];g[p+(j*152|0)+(m*36|0)+20>>2]=+g[b>>2]*+g[k+64+(m*20|0)+12>>2]}g[p+(j*152|0)+(m*36|0)+24>>2]=0.0;g[p+(j*152|0)+(m*36|0)+28>>2]=0.0;g[p+(j*152|0)+(m*36|0)+32>>2]=0.0;v=k+64+(m*20|0)|0;x=o+(j*88|0)+(m<<3)|0;gf(p+(j*152|0)+(m*36|0)|0,0,16)|0;w=c[v+4>>2]|0;c[x>>2]=c[v>>2];c[x+4>>2]=w;m=m+1|0;}while((m|0)<(l|0));j=j+1|0;if((j|0)>=(c[f>>2]|0)){e=12;break}k=c[d>>2]|0}if((e|0)==4){va(672,2976,71,4760)}else if((e|0)==12){return}}function Ce(a){a=a|0;var b=0;b=a+32|0;ud(c[b>>2]|0,c[a+40>>2]|0);ud(c[b>>2]|0,c[a+36>>2]|0);return}function De(a){a=a|0;var b=0,d=0,e=0,f=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0.0,x=0.0,y=0.0,z=0.0,A=0.0,B=0.0,C=0.0,D=0.0,E=0.0,F=0.0,G=0.0,H=0.0,I=0.0,J=0.0,K=0,L=0,M=0,N=0,O=0,P=0.0,Q=0,R=0,U=0.0,V=0.0,W=0.0,X=0.0,Y=0,Z=0.0,_=0.0,$=0.0,aa=0.0,ba=0.0,ca=0.0,da=0,ea=0;b=i;i=i+56|0;e=b|0;f=b+16|0;m=b+32|0;h=a+48|0;if((c[h>>2]|0)<=0){i=b;return}d=a+40|0;l=a+36|0;k=a+44|0;j=a+24|0;a=a+28|0;t=e+8|0;r=e+12|0;q=f+8|0;p=f+12|0;o=e;n=f;s=m;v=0;while(1){u=c[d>>2]|0;L=c[l>>2]|0;K=c[(c[k>>2]|0)+(c[u+(v*152|0)+148>>2]<<2)>>2]|0;O=c[u+(v*152|0)+112>>2]|0;Y=c[u+(v*152|0)+116>>2]|0;z=+g[u+(v*152|0)+120>>2];I=+g[u+(v*152|0)+124>>2];w=+g[u+(v*152|0)+128>>2];x=+g[u+(v*152|0)+132>>2];Q=L+(v*88|0)+48|0;P=+g[Q>>2];U=+g[Q+4>>2];Q=L+(v*88|0)+56|0;V=+g[Q>>2];W=+g[Q+4>>2];Q=c[j>>2]|0;R=Q+(O*12|0)|0;G=+g[R>>2];H=+g[R+4>>2];X=+g[Q+(O*12|0)+8>>2];R=c[a>>2]|0;N=R+(O*12|0)|0;C=+g[N>>2];F=+g[N+4>>2];D=+g[R+(O*12|0)+8>>2];O=Q+(Y*12|0)|0;y=+g[O>>2];J=+g[O+4>>2];Z=+g[Q+(Y*12|0)+8>>2];Q=R+(Y*12|0)|0;A=+g[Q>>2];E=+g[Q+4>>2];B=+g[R+(Y*12|0)+8>>2];if((c[K+124>>2]|0)<=0){d=4;break}_=+g[L+(v*88|0)+80>>2];$=+g[L+(v*88|0)+76>>2];ca=+T(X);g[t>>2]=ca;X=+S(X);g[r>>2]=X;aa=+T(Z);g[q>>2]=aa;Z=+S(Z);g[p>>2]=Z;ba=+(G-(P*X-U*ca));X=+(H-(U*X+P*ca));g[o>>2]=ba;g[o+4>>2]=X;X=+(y-(V*Z-W*aa));Z=+(J-(W*Z+V*aa));g[n>>2]=X;g[n+4>>2]=Z;je(m,K+64|0,e,$,f,_);N=u+(v*152|0)+72|0;K=N;O=c[s+4>>2]|0;c[K>>2]=c[s>>2];c[K+4>>2]=O;K=u+(v*152|0)+144|0;O=c[K>>2]|0;do{if((O|0)>0){M=u+(v*152|0)+76|0;R=N|0;P=z+I;Q=u+(v*152|0)+140|0;L=0;do{Y=m+8+(L<<3)|0;X=+g[Y>>2]-G;da=m+8+(L<<3)+4|0;ea=u+(v*152|0)+(L*36|0)|0;V=+X;W=+(+g[da>>2]-H);g[ea>>2]=V;g[ea+4>>2]=W;W=+g[Y>>2]-y;Y=u+(v*152|0)+(L*36|0)+8|0;V=+W;ba=+(+g[da>>2]-J);g[Y>>2]=V;g[Y+4>>2]=ba;ba=+g[M>>2];V=+g[u+(v*152|0)+(L*36|0)+4>>2];Z=+g[R>>2];ca=X*ba-V*Z;U=+g[u+(v*152|0)+(L*36|0)+12>>2];Z=ba*W-Z*U;Z=P+ca*w*ca+Z*x*Z;if(Z>0.0){Z=1.0/Z}else{Z=0.0}g[u+(v*152|0)+(L*36|0)+24>>2]=Z;Z=+g[M>>2];ba=-0.0- +g[R>>2];ca=X*ba-Z*V;Z=W*ba-Z*U;Z=P+ca*w*ca+Z*x*Z;if(Z>0.0){Z=1.0/Z}else{Z=0.0}g[u+(v*152|0)+(L*36|0)+28>>2]=Z;Y=u+(v*152|0)+(L*36|0)+32|0;g[Y>>2]=0.0;U=+g[R>>2]*(A-B*U-C+D*V)+ +g[M>>2]*(E+B*W-F-D*X);if(U<-1.0){g[Y>>2]=-0.0-U*+g[Q>>2]}L=L+1|0;}while((L|0)<(O|0));if((c[K>>2]|0)!=2){break}$=+g[u+(v*152|0)+76>>2];ca=+g[N>>2];_=+g[u+(v*152|0)>>2]*$- +g[u+(v*152|0)+4>>2]*ca;y=$*+g[u+(v*152|0)+8>>2]-ca*+g[u+(v*152|0)+12>>2];ba=$*+g[u+(v*152|0)+36>>2]-ca*+g[u+(v*152|0)+40>>2];ca=$*+g[u+(v*152|0)+44>>2]-ca*+g[u+(v*152|0)+48>>2];$=z+I;aa=w*_;z=x*y;y=$+_*aa+y*z;x=$+ba*w*ba+ca*x*ca;w=$+aa*ba+z*ca;z=y*x-w*w;if(y*y>=z*1.0e3){c[K>>2]=1;break}g[u+(v*152|0)+96>>2]=y;g[u+(v*152|0)+100>>2]=w;g[u+(v*152|0)+104>>2]=w;g[u+(v*152|0)+108>>2]=x;if(z!=0.0){z=1.0/z}ca=-0.0-z*w;g[u+(v*152|0)+80>>2]=x*z;g[u+(v*152|0)+84>>2]=ca;g[u+(v*152|0)+88>>2]=ca;g[u+(v*152|0)+92>>2]=y*z}}while(0);v=v+1|0;if((v|0)>=(c[h>>2]|0)){d=21;break}}if((d|0)==4){va(1920,2976,168,4776)}else if((d|0)==21){i=b;return}}function Ee(a){a=a|0;var b=0,d=0,e=0,f=0,h=0,i=0,j=0.0,k=0.0,l=0,m=0.0,n=0.0,o=0.0,p=0,q=0.0,r=0.0,s=0.0,t=0.0,u=0.0,v=0.0,w=0.0,x=0,y=0,z=0.0,A=0.0,B=0.0;b=a+48|0;if((c[b>>2]|0)<=0){return}d=a+40|0;e=a+28|0;i=0;do{p=c[d>>2]|0;f=c[p+(i*152|0)+112>>2]|0;a=c[p+(i*152|0)+116>>2]|0;j=+g[p+(i*152|0)+120>>2];m=+g[p+(i*152|0)+128>>2];k=+g[p+(i*152|0)+124>>2];q=+g[p+(i*152|0)+132>>2];l=c[p+(i*152|0)+144>>2]|0;x=c[e>>2]|0;h=x+(f*12|0)|0;v=+g[h>>2];s=+g[h+4>>2];t=+g[x+(f*12|0)+8>>2];y=x+(a*12|0)|0;w=+g[y>>2];u=+g[y+4>>2];r=+g[x+(a*12|0)+8>>2];x=p+(i*152|0)+72|0;o=+g[x>>2];n=+g[x+4>>2];if((l|0)>0){x=0;do{B=+g[p+(i*152|0)+(x*36|0)+16>>2];z=+g[p+(i*152|0)+(x*36|0)+20>>2];A=o*B+n*z;z=n*B-o*z;t=t-m*(+g[p+(i*152|0)+(x*36|0)>>2]*z- +g[p+(i*152|0)+(x*36|0)+4>>2]*A);v=v-j*A;s=s-j*z;r=r+q*(z*+g[p+(i*152|0)+(x*36|0)+8>>2]-A*+g[p+(i*152|0)+(x*36|0)+12>>2]);w=w+k*A;u=u+k*z;x=x+1|0;}while((x|0)<(l|0))}B=+v;A=+s;g[h>>2]=B;g[h+4>>2]=A;g[(c[e>>2]|0)+(f*12|0)+8>>2]=t;y=(c[e>>2]|0)+(a*12|0)|0;A=+w;B=+u;g[y>>2]=A;g[y+4>>2]=B;g[(c[e>>2]|0)+(a*12|0)+8>>2]=r;i=i+1|0;}while((i|0)<(c[b>>2]|0));return}function Fe(a){a=a|0;var b=0,d=0,e=0,f=0,h=0,i=0.0,j=0.0,k=0.0,l=0.0,m=0.0,n=0.0,o=0.0,p=0.0,q=0.0,r=0.0,s=0,t=0.0,u=0.0,v=0,w=0.0,x=0.0,y=0.0,z=0.0,A=0,B=0,C=0.0,D=0.0,E=0.0,F=0.0,G=0.0,H=0.0,I=0.0,J=0.0,K=0.0,L=0.0,M=0.0,N=0.0,O=0,P=0,Q=0.0,R=0.0;b=a+48|0;if((c[b>>2]|0)<=0){return}d=a+40|0;a=a+28|0;e=0;a:while(1){s=c[d>>2]|0;v=s+(e*152|0)|0;f=c[s+(e*152|0)+112>>2]|0;h=c[s+(e*152|0)+116>>2]|0;i=+g[s+(e*152|0)+120>>2];q=+g[s+(e*152|0)+128>>2];k=+g[s+(e*152|0)+124>>2];m=+g[s+(e*152|0)+132>>2];A=s+(e*152|0)+144|0;B=c[A>>2]|0;P=c[a>>2]|0;O=P+(f*12|0)|0;l=+g[O>>2];j=+g[O+4>>2];O=P+(h*12|0)|0;r=+g[O>>2];o=+g[O+4>>2];O=s+(e*152|0)+72|0;p=+g[O>>2];n=+g[O+4>>2];w=-0.0-p;x=+g[s+(e*152|0)+136>>2];if((B-1|0)>>>0<2>>>0){O=0;t=+g[P+(h*12|0)+8>>2];u=+g[P+(f*12|0)+8>>2]}else{b=4;break}do{D=+g[s+(e*152|0)+(O*36|0)+12>>2];z=+g[s+(e*152|0)+(O*36|0)+8>>2];E=+g[s+(e*152|0)+(O*36|0)+4>>2];y=+g[s+(e*152|0)+(O*36|0)>>2];H=x*+g[s+(e*152|0)+(O*36|0)+16>>2];P=s+(e*152|0)+(O*36|0)+20|0;C=+g[P>>2];G=C- +g[s+(e*152|0)+(O*36|0)+28>>2]*(n*(r-t*D-l+u*E)+(o+t*z-j-u*y)*w);F=-0.0-H;G=G<H?G:H;N=G<F?F:G;M=N-C;g[P>>2]=N;N=n*M;M=M*w;l=l-i*N;j=j-i*M;u=u-q*(y*M-E*N);r=r+k*N;o=o+k*M;t=t+m*(z*M-D*N);O=O+1|0;}while((O|0)<(B|0));b:do{if((c[A>>2]|0)==1){w=+g[s+(e*152|0)+12>>2];x=+g[s+(e*152|0)+8>>2];y=+g[s+(e*152|0)+4>>2];C=+g[v>>2];v=s+(e*152|0)+16|0;z=+g[v>>2];D=z- +g[s+(e*152|0)+24>>2]*(p*(r-t*w-l+u*y)+n*(o+t*x-j-u*C)- +g[s+(e*152|0)+32>>2]);M=D>0.0?D:0.0;N=M-z;g[v>>2]=M;M=p*N;N=n*N;u=u-q*(C*N-y*M);t=t+m*(x*N-w*M);r=r+k*M;o=o+k*N;l=l-i*M;j=j-i*N}else{A=s+(e*152|0)+16|0;z=+g[A>>2];B=s+(e*152|0)+52|0;C=+g[B>>2];if(z<0.0|C<0.0){b=9;break a}w=+g[s+(e*152|0)+12>>2];x=+g[s+(e*152|0)+8>>2];D=+g[s+(e*152|0)+4>>2];G=+g[v>>2];E=+g[s+(e*152|0)+48>>2];y=+g[s+(e*152|0)+44>>2];F=+g[s+(e*152|0)+40>>2];H=+g[s+(e*152|0)+36>>2];K=+g[s+(e*152|0)+104>>2];L=+g[s+(e*152|0)+100>>2];I=p*(r-t*w-l+u*D)+n*(o+t*x-j-u*G)- +g[s+(e*152|0)+32>>2]-(z*+g[s+(e*152|0)+96>>2]+C*K);J=p*(r-t*E-l+u*F)+n*(o+t*y-j-u*H)- +g[s+(e*152|0)+68>>2]-(z*L+C*+g[s+(e*152|0)+108>>2]);R=+g[s+(e*152|0)+80>>2]*I+ +g[s+(e*152|0)+88>>2]*J;Q=I*+g[s+(e*152|0)+84>>2]+J*+g[s+(e*152|0)+92>>2];N=-0.0-R;M=-0.0-Q;if(!(R>-0.0|Q>-0.0)){I=N-z;K=M-C;J=p*I;I=n*I;L=p*K;K=n*K;Q=J+L;R=I+K;g[A>>2]=N;g[B>>2]=M;u=u-q*(G*I-D*J+(H*K-F*L));t=t+m*(x*I-w*J+(y*K-E*L));r=r+k*Q;o=o+k*R;l=l-i*Q;j=j-i*R;break}R=I*+g[s+(e*152|0)+24>>2];M=-0.0-R;do{if(R<=-0.0){if(J+L*M<0.0){break}J=M-z;L=0.0-C;K=p*J;J=n*J;N=p*L;L=n*L;Q=N+K;R=L+J;g[A>>2]=M;g[B>>2]=0.0;u=u-q*(J*G-K*D+(L*H-N*F));t=t+m*(J*x-K*w+(L*y-N*E));r=r+k*Q;o=o+k*R;l=l-i*Q;j=j-i*R;break b}}while(0);R=J*+g[s+(e*152|0)+60>>2];L=-0.0-R;do{if(R<=-0.0){if(I+K*L<0.0){break}J=0.0-z;M=L-C;K=p*J;J=n*J;N=p*M;M=n*M;Q=K+N;R=J+M;g[A>>2]=0.0;g[B>>2]=L;u=u-q*(J*G-K*D+(M*H-N*F));t=t+m*(J*x-K*w+(M*y-N*E));r=r+k*Q;o=o+k*R;l=l-i*Q;j=j-i*R;break b}}while(0);if(I<0.0|J<0.0){break}K=0.0-z;M=0.0-C;L=p*K;K=n*K;N=p*M;M=n*M;Q=L+N;R=K+M;g[A>>2]=0.0;g[B>>2]=0.0;u=u-q*(K*G-L*D+(M*H-N*F));t=t+m*(K*x-L*w+(M*y-N*E));r=r+k*Q;o=o+k*R;l=l-i*Q;j=j-i*R}}while(0);P=(c[a>>2]|0)+(f*12|0)|0;R=+l;Q=+j;g[P>>2]=R;g[P+4>>2]=Q;g[(c[a>>2]|0)+(f*12|0)+8>>2]=u;P=(c[a>>2]|0)+(h*12|0)|0;Q=+r;R=+o;g[P>>2]=Q;g[P+4>>2]=R;g[(c[a>>2]|0)+(h*12|0)+8>>2]=t;e=e+1|0;if((e|0)>=(c[b>>2]|0)){b=21;break}}if((b|0)==4){va(1336,2976,311,4808)}else if((b|0)==9){va(640,2976,406,4808)}else if((b|0)==21){return}}function Ge(a){a=a|0;var b=0,d=0,e=0,f=0,h=0,i=0,j=0;b=a+48|0;j=c[b>>2]|0;if((j|0)<=0){return}d=a+40|0;a=a+44|0;e=0;do{f=c[d>>2]|0;h=c[(c[a>>2]|0)+(c[f+(e*152|0)+148>>2]<<2)>>2]|0;i=f+(e*152|0)+144|0;if((c[i>>2]|0)>0){j=0;do{g[h+64+(j*20|0)+8>>2]=+g[f+(e*152|0)+(j*36|0)+16>>2];g[h+64+(j*20|0)+12>>2]=+g[f+(e*152|0)+(j*36|0)+20>>2];j=j+1|0;}while((j|0)<(c[i>>2]|0));j=c[b>>2]|0}e=e+1|0;}while((e|0)<(j|0));return}function He(a){a=a|0;var b=0,d=0,e=0,f=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0.0,x=0.0,y=0.0,z=0,A=0.0,B=0.0,C=0.0,D=0.0,E=0,F=0.0,G=0.0,H=0.0,I=0.0,J=0.0,K=0.0,L=0.0,M=0.0,N=0.0,O=0,P=0.0,Q=0.0,R=0.0,U=0.0,V=0.0,W=0.0,X=0.0,Y=0.0,Z=0,_=0.0;b=i;i=i+56|0;e=b|0;j=b+16|0;d=b+32|0;f=a+48|0;if((c[f>>2]|0)<=0){Y=0.0;O=Y>=-.014999999664723873;i=b;return O|0}h=a+36|0;n=a+24|0;r=e+8|0;s=e+12|0;a=j+8|0;k=j+12|0;l=e;m=j;q=d;o=d+8|0;p=d+16|0;v=0;N=0.0;do{z=c[h>>2]|0;E=z+(v*88|0)|0;u=c[z+(v*88|0)+32>>2]|0;t=c[z+(v*88|0)+36>>2]|0;O=z+(v*88|0)+48|0;A=+g[O>>2];B=+g[O+4>>2];C=+g[z+(v*88|0)+40>>2];w=+g[z+(v*88|0)+64>>2];O=z+(v*88|0)+56|0;F=+g[O>>2];D=+g[O+4>>2];x=+g[z+(v*88|0)+44>>2];y=+g[z+(v*88|0)+68>>2];z=c[z+(v*88|0)+84>>2]|0;O=c[n>>2]|0;Z=O+(u*12|0)|0;H=+g[Z>>2];I=+g[Z+4>>2];J=+g[O+(u*12|0)+8>>2];Z=O+(t*12|0)|0;K=+g[Z>>2];L=+g[Z+4>>2];M=+g[O+(t*12|0)+8>>2];if((z|0)>0){G=C+x;O=0;do{U=+T(J);g[r>>2]=U;X=+S(J);g[s>>2]=X;V=+T(M);g[a>>2]=V;R=+S(M);g[k>>2]=R;W=+(H-(A*X-B*U));U=+(I-(B*X+A*U));g[l>>2]=W;g[l+4>>2]=U;U=+(K-(F*R-D*V));V=+(L-(D*R+F*V));g[m>>2]=U;g[m+4>>2]=V;Ie(d,E,e,j,O);V=+g[q>>2];U=+g[q+4>>2];R=+g[o>>2];W=+g[o+4>>2];X=+g[p>>2];P=R-H;Q=W-I;R=R-K;W=W-L;N=N<X?N:X;X=(X+.004999999888241291)*.20000000298023224;Y=X<0.0?X:0.0;X=U*P-V*Q;_=U*R-V*W;X=_*y*_+(G+X*w*X);if(X>0.0){X=(-0.0-(Y<-.20000000298023224?-.20000000298023224:Y))/X}else{X=0.0}_=V*X;Y=U*X;H=H-C*_;I=I-C*Y;J=J-w*(P*Y-Q*_);K=K+x*_;L=L+x*Y;M=M+y*(R*Y-W*_);O=O+1|0;}while((O|0)<(z|0));O=c[n>>2]|0}Z=O+(u*12|0)|0;_=+H;Y=+I;g[Z>>2]=_;g[Z+4>>2]=Y;g[(c[n>>2]|0)+(u*12|0)+8>>2]=J;Z=(c[n>>2]|0)+(t*12|0)|0;Y=+K;_=+L;g[Z>>2]=Y;g[Z+4>>2]=_;g[(c[n>>2]|0)+(t*12|0)+8>>2]=M;v=v+1|0;}while((v|0)<(c[f>>2]|0));Z=N>=-.014999999664723873;i=b;return Z|0}function Ie(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var h=0.0,i=0.0,j=0.0,k=0.0,l=0.0,m=0.0,n=0.0,o=0.0,p=0,q=0.0,r=0.0,s=0.0,t=0,u=0;if((c[b+84>>2]|0)<=0){va(384,2976,617,4496)}p=c[b+72>>2]|0;if((p|0)==1){t=d+12|0;i=+g[t>>2];j=+g[b+16>>2];p=d+8|0;k=+g[p>>2];m=+g[b+20>>2];h=i*j-k*m;m=j*k+i*m;u=a;i=+h;k=+m;g[u>>2]=i;g[u+4>>2]=k;k=+g[t>>2];i=+g[b+24>>2];j=+g[p>>2];l=+g[b+28>>2];q=+g[e+12>>2];s=+g[b+(f<<3)>>2];r=+g[e+8>>2];o=+g[b+(f<<3)+4>>2];n=+g[e>>2]+(q*s-r*o);o=s*r+q*o+ +g[e+4>>2];g[a+16>>2]=h*(n-(+g[d>>2]+(k*i-j*l)))+(o-(i*j+k*l+ +g[d+4>>2]))*m- +g[b+76>>2]- +g[b+80>>2];f=a+8|0;n=+n;o=+o;g[f>>2]=n;g[f+4>>2]=o;return}else if((p|0)==0){k=+g[d+12>>2];l=+g[b+24>>2];s=+g[d+8>>2];j=+g[b+28>>2];h=+g[d>>2]+(k*l-s*j);j=l*s+k*j+ +g[d+4>>2];k=+g[e+12>>2];s=+g[b>>2];l=+g[e+8>>2];m=+g[b+4>>2];i=+g[e>>2]+(k*s-l*m);m=s*l+k*m+ +g[e+4>>2];k=i-h;l=m-j;u=a;s=+k;n=+l;g[u>>2]=s;g[u+4>>2]=n;n=+Q(k*k+l*l);if(n<1.1920928955078125e-7){n=k;o=l}else{o=1.0/n;n=k*o;g[a>>2]=n;o=l*o;g[a+4>>2]=o}u=a+8|0;r=+((h+i)*.5);s=+((j+m)*.5);g[u>>2]=r;g[u+4>>2]=s;g[a+16>>2]=k*n+l*o- +g[b+76>>2]- +g[b+80>>2];return}else if((p|0)==2){p=e+12|0;k=+g[p>>2];l=+g[b+16>>2];t=e+8|0;m=+g[t>>2];s=+g[b+20>>2];r=k*l-m*s;s=l*m+k*s;u=a;k=+r;m=+s;g[u>>2]=k;g[u+4>>2]=m;m=+g[p>>2];k=+g[b+24>>2];l=+g[t>>2];n=+g[b+28>>2];j=+g[d+12>>2];h=+g[b+(f<<3)>>2];i=+g[d+8>>2];q=+g[b+(f<<3)+4>>2];o=+g[d>>2]+(j*h-i*q);q=h*i+j*q+ +g[d+4>>2];g[a+16>>2]=r*(o-(+g[e>>2]+(m*k-l*n)))+(q-(k*l+m*n+ +g[e+4>>2]))*s- +g[b+76>>2]- +g[b+80>>2];t=a+8|0;o=+o;q=+q;g[t>>2]=o;g[t+4>>2]=q;r=+(-0.0-r);s=+(-0.0-s);g[u>>2]=r;g[u+4>>2]=s;return}else{return}}function Je(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0.0,z=0,A=0.0,B=0.0,C=0.0,D=0.0,E=0,F=0.0,G=0.0,H=0.0,I=0.0,J=0.0,K=0.0,L=0.0,M=0.0,N=0.0,O=0.0,P=0.0,Q=0,R=0.0,U=0.0,V=0.0,W=0.0,X=0.0,Y=0.0,Z=0.0,_=0.0,$=0,aa=0.0;e=i;i=i+56|0;l=e|0;f=e+16|0;j=e+32|0;h=a+48|0;if((c[h>>2]|0)<=0){_=0.0;Q=_>=-.007499999832361937;i=e;return Q|0}k=a+36|0;n=a+24|0;m=l+8|0;r=l+12|0;u=f+8|0;o=f+12|0;p=l;q=f;a=j;s=j+8|0;t=j+16|0;v=0;J=0.0;do{Q=c[k>>2]|0;E=Q+(v*88|0)|0;w=c[Q+(v*88|0)+32>>2]|0;x=c[Q+(v*88|0)+36>>2]|0;z=Q+(v*88|0)+48|0;y=+g[z>>2];B=+g[z+4>>2];z=Q+(v*88|0)+56|0;C=+g[z>>2];D=+g[z+4>>2];z=c[Q+(v*88|0)+84>>2]|0;if((w|0)==(b|0)|(w|0)==(d|0)){G=+g[Q+(v*88|0)+40>>2];F=+g[Q+(v*88|0)+64>>2]}else{G=0.0;F=0.0}A=+g[Q+(v*88|0)+44>>2];H=+g[Q+(v*88|0)+68>>2];Q=c[n>>2]|0;$=Q+(w*12|0)|0;N=+g[$>>2];M=+g[$+4>>2];L=+g[Q+(w*12|0)+8>>2];$=Q+(x*12|0)|0;O=+g[$>>2];K=+g[$+4>>2];P=+g[Q+(x*12|0)+8>>2];if((z|0)>0){I=G+A;Q=0;do{V=+T(L);g[m>>2]=V;Z=+S(L);g[r>>2]=Z;U=+T(P);g[u>>2]=U;R=+S(P);g[o>>2]=R;X=+(N-(y*Z-B*V));V=+(M-(B*Z+y*V));g[p>>2]=X;g[p+4>>2]=V;V=+(O-(C*R-D*U));U=+(K-(D*R+C*U));g[q>>2]=V;g[q+4>>2]=U;Ie(j,E,l,f,Q);U=+g[a>>2];V=+g[a+4>>2];R=+g[s>>2];X=+g[s+4>>2];Z=+g[t>>2];W=R-N;Y=X-M;R=R-O;X=X-K;J=J<Z?J:Z;Z=(Z+.004999999888241291)*.75;Z=Z<0.0?Z:0.0;_=V*W-U*Y;aa=V*R-U*X;_=aa*H*aa+(I+_*F*_);if(_>0.0){Z=(-0.0-(Z<-.20000000298023224?-.20000000298023224:Z))/_}else{Z=0.0}aa=U*Z;_=V*Z;N=N-G*aa;M=M-G*_;L=L-F*(W*_-Y*aa);O=O+A*aa;K=K+A*_;P=P+H*(R*_-X*aa);Q=Q+1|0;}while((Q|0)<(z|0));Q=c[n>>2]|0}$=Q+(w*12|0)|0;aa=+N;_=+M;g[$>>2]=aa;g[$+4>>2]=_;g[(c[n>>2]|0)+(w*12|0)+8>>2]=L;$=(c[n>>2]|0)+(x*12|0)|0;_=+O;aa=+K;g[$>>2]=_;g[$+4>>2]=aa;g[(c[n>>2]|0)+(x*12|0)+8>>2]=P;v=v+1|0;}while((v|0)<(c[h>>2]|0));$=J>=-.007499999832361937;i=e;return $|0}function Ke(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,h=0,i=0,j=0,k=0,l=0;if((e|0)<=-1){va(600,2896,89,4288)}f=b+16|0;if(((c[f>>2]|0)-1|0)<=(e|0)){va(600,2896,89,4288)}c[d+4>>2]=1;g[d+8>>2]=+g[b+8>>2];h=b+12|0;j=(c[h>>2]|0)+(e<<3)|0;k=d+12|0;i=c[j+4>>2]|0;c[k>>2]=c[j>>2];c[k+4>>2]=i;k=(c[h>>2]|0)+(e+1<<3)|0;i=d+20|0;j=c[k+4>>2]|0;c[i>>2]=c[k>>2];c[i+4>>2]=j;i=d+28|0;if((e|0)>0){l=(c[h>>2]|0)+(e-1<<3)|0;k=i;j=c[l+4>>2]|0;c[k>>2]=c[l>>2];c[k+4>>2]=j;a[d+44|0]=1}else{j=b+20|0;l=i;k=c[j+4>>2]|0;c[l>>2]=c[j>>2];c[l+4>>2]=k;a[d+44|0]=a[b+36|0]&1}i=d+36|0;if(((c[f>>2]|0)-2|0)>(e|0)){j=(c[h>>2]|0)+(e+2<<3)|0;l=i;k=c[j+4>>2]|0;c[l>>2]=c[j>>2];c[l+4>>2]=k;a[d+45|0]=1;return}else{j=b+28|0;l=i;k=c[j+4>>2]|0;c[l>>2]=c[j>>2];c[l+4>>2]=k;a[d+45|0]=a[b+37|0]&1;return}}function Le(a){a=a|0;return}function Me(a){a=a|0;Le(a|0);return}function Ne(a){a=a|0;return}function Oe(a){a=a|0;return}function Pe(a){a=a|0;Le(a|0);bf(a);return}function Qe(a){a=a|0;Le(a|0);bf(a);return}function Re(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;e=i;i=i+56|0;f=e|0;if((a|0)==(b|0)){g=1;i=e;return g|0}if((b|0)==0){g=0;i=e;return g|0}g=Ue(b,6024,6008,0)|0;b=g;if((g|0)==0){g=0;i=e;return g|0}gf(f|0,0,56)|0;c[f>>2]=b;c[f+8>>2]=a;c[f+12>>2]=-1;c[f+48>>2]=1;wb[c[(c[g>>2]|0)+28>>2]&31](b,f,c[d>>2]|0,1);if((c[f+24>>2]|0)!=1){g=0;i=e;return g|0}c[d>>2]=c[f+16>>2];g=1;i=e;return g|0}function Se(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0;if((c[d+8>>2]|0)!=(b|0)){return}b=d+16|0;g=c[b>>2]|0;if((g|0)==0){c[b>>2]=e;c[d+24>>2]=f;c[d+36>>2]=1;return}if((g|0)!=(e|0)){g=d+36|0;c[g>>2]=(c[g>>2]|0)+1;c[d+24>>2]=2;a[d+54|0]=1;return}e=d+24|0;if((c[e>>2]|0)!=2){return}c[e>>2]=f;return}function Te(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0;if((b|0)!=(c[d+8>>2]|0)){g=c[b+8>>2]|0;wb[c[(c[g>>2]|0)+28>>2]&31](g,d,e,f);return}b=d+16|0;g=c[b>>2]|0;if((g|0)==0){c[b>>2]=e;c[d+24>>2]=f;c[d+36>>2]=1;return}if((g|0)!=(e|0)){g=d+36|0;c[g>>2]=(c[g>>2]|0)+1;c[d+24>>2]=2;a[d+54|0]=1;return}e=d+24|0;if((c[e>>2]|0)!=2){return}c[e>>2]=f;return}function Ue(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;f=i;i=i+56|0;g=f|0;j=c[a>>2]|0;k=a+(c[j-8>>2]|0)|0;j=c[j-4>>2]|0;h=j;c[g>>2]=d;c[g+4>>2]=a;c[g+8>>2]=b;c[g+12>>2]=e;b=g+16|0;n=g+20|0;e=g+24|0;l=g+28|0;a=g+32|0;m=g+40|0;gf(b|0,0,39)|0;if((j|0)==(d|0)){c[g+48>>2]=1;tb[c[(c[j>>2]|0)+20>>2]&7](h,g,k,k,1,0);i=f;return((c[e>>2]|0)==1?k:0)|0}mb[c[(c[j>>2]|0)+24>>2]&7](h,g,k,1,0);d=c[g+36>>2]|0;if((d|0)==1){do{if((c[e>>2]|0)!=1){if((c[m>>2]|0)!=0){n=0;i=f;return n|0}if((c[l>>2]|0)!=1){n=0;i=f;return n|0}if((c[a>>2]|0)==1){break}else{d=0}i=f;return d|0}}while(0);n=c[b>>2]|0;i=f;return n|0}else if((d|0)==0){if((c[m>>2]|0)!=1){n=0;i=f;return n|0}if((c[l>>2]|0)!=1){n=0;i=f;return n|0}n=(c[a>>2]|0)==1?c[n>>2]|0:0;i=f;return n|0}else{n=0;i=f;return n|0}return 0}function Ve(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0;i=b|0;if((i|0)==(c[d+8>>2]|0)){if((c[d+4>>2]|0)!=(e|0)){return}h=d+28|0;if((c[h>>2]|0)==1){return}c[h>>2]=f;return}if((i|0)!=(c[d>>2]|0)){j=c[b+8>>2]|0;mb[c[(c[j>>2]|0)+24>>2]&7](j,d,e,f,g);return}do{if((c[d+16>>2]|0)!=(e|0)){i=d+20|0;if((c[i>>2]|0)==(e|0)){break}c[d+32>>2]=f;f=d+44|0;if((c[f>>2]|0)==4){return}j=d+52|0;a[j]=0;k=d+53|0;a[k]=0;b=c[b+8>>2]|0;tb[c[(c[b>>2]|0)+20>>2]&7](b,d,e,e,1,g);if((a[k]&1)==0){b=0;h=13}else{if((a[j]&1)==0){b=1;h=13}}a:do{if((h|0)==13){c[i>>2]=e;k=d+40|0;c[k>>2]=(c[k>>2]|0)+1;do{if((c[d+36>>2]|0)==1){if((c[d+24>>2]|0)!=2){h=16;break}a[d+54|0]=1;if(b){break a}}else{h=16}}while(0);if((h|0)==16){if(b){break}}c[f>>2]=4;return}}while(0);c[f>>2]=3;return}}while(0);if((f|0)!=1){return}c[d+32>>2]=1;return}function We(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;if((c[d+8>>2]|0)==(b|0)){if((c[d+4>>2]|0)!=(e|0)){return}d=d+28|0;if((c[d>>2]|0)==1){return}c[d>>2]=f;return}if((c[d>>2]|0)!=(b|0)){return}do{if((c[d+16>>2]|0)!=(e|0)){b=d+20|0;if((c[b>>2]|0)==(e|0)){break}c[d+32>>2]=f;c[b>>2]=e;g=d+40|0;c[g>>2]=(c[g>>2]|0)+1;do{if((c[d+36>>2]|0)==1){if((c[d+24>>2]|0)!=2){break}a[d+54|0]=1}}while(0);c[d+44>>2]=4;return}}while(0);if((f|0)!=1){return}c[d+32>>2]=1;return}function Xe(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;if((b|0)!=(c[d+8>>2]|0)){b=c[b+8>>2]|0;tb[c[(c[b>>2]|0)+20>>2]&7](b,d,e,f,g,h);return}a[d+53|0]=1;if((c[d+4>>2]|0)!=(f|0)){return}a[d+52|0]=1;b=d+16|0;f=c[b>>2]|0;if((f|0)==0){c[b>>2]=e;c[d+24>>2]=g;c[d+36>>2]=1;if(!((c[d+48>>2]|0)==1&(g|0)==1)){return}a[d+54|0]=1;return}if((f|0)!=(e|0)){h=d+36|0;c[h>>2]=(c[h>>2]|0)+1;a[d+54|0]=1;return}e=d+24|0;b=c[e>>2]|0;if((b|0)==2){c[e>>2]=g}else{g=b}if(!((c[d+48>>2]|0)==1&(g|0)==1)){return}a[d+54|0]=1;return}function Ye(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;if((c[d+8>>2]|0)!=(b|0)){return}a[d+53|0]=1;if((c[d+4>>2]|0)!=(f|0)){return}a[d+52|0]=1;f=d+16|0;b=c[f>>2]|0;if((b|0)==0){c[f>>2]=e;c[d+24>>2]=g;c[d+36>>2]=1;if(!((c[d+48>>2]|0)==1&(g|0)==1)){return}a[d+54|0]=1;return}if((b|0)!=(e|0)){h=d+36|0;c[h>>2]=(c[h>>2]|0)+1;a[d+54|0]=1;return}e=d+24|0;f=c[e>>2]|0;if((f|0)==2){c[e>>2]=g}else{g=f}if(!((c[d+48>>2]|0)==1&(g|0)==1)){return}a[d+54|0]=1;return}function Ze(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;do{if(a>>>0<245>>>0){if(a>>>0<11>>>0){a=16}else{a=a+11&-8}f=a>>>3;e=c[1602]|0;b=e>>>(f>>>0);if((b&3|0)!=0){g=(b&1^1)+f|0;h=g<<1;b=6448+(h<<2)|0;h=6448+(h+2<<2)|0;f=c[h>>2]|0;d=f+8|0;a=c[d>>2]|0;do{if((b|0)==(a|0)){c[1602]=e&~(1<<g)}else{if(a>>>0<(c[1606]|0)>>>0){xa();return 0}e=a+12|0;if((c[e>>2]|0)==(f|0)){c[e>>2]=b;c[h>>2]=a;break}else{xa();return 0}}}while(0);q=g<<3;c[f+4>>2]=q|3;q=f+(q|4)|0;c[q>>2]=c[q>>2]|1;q=d;return q|0}if(a>>>0<=(c[1604]|0)>>>0){break}if((b|0)!=0){g=2<<f;g=b<<f&(g|-g);g=(g&-g)-1|0;b=g>>>12&16;g=g>>>(b>>>0);h=g>>>5&8;g=g>>>(h>>>0);f=g>>>2&4;g=g>>>(f>>>0);i=g>>>1&2;g=g>>>(i>>>0);d=g>>>1&1;d=(h|b|f|i|d)+(g>>>(d>>>0))|0;g=d<<1;i=6448+(g<<2)|0;g=6448+(g+2<<2)|0;f=c[g>>2]|0;b=f+8|0;h=c[b>>2]|0;do{if((i|0)==(h|0)){c[1602]=e&~(1<<d)}else{if(h>>>0<(c[1606]|0)>>>0){xa();return 0}e=h+12|0;if((c[e>>2]|0)==(f|0)){c[e>>2]=i;c[g>>2]=h;break}else{xa();return 0}}}while(0);q=d<<3;d=q-a|0;c[f+4>>2]=a|3;e=f+a|0;c[f+(a|4)>>2]=d|1;c[f+q>>2]=d;f=c[1604]|0;if((f|0)!=0){a=c[1607]|0;g=f>>>3;h=g<<1;f=6448+(h<<2)|0;i=c[1602]|0;g=1<<g;do{if((i&g|0)==0){c[1602]=i|g;g=f;h=6448+(h+2<<2)|0}else{h=6448+(h+2<<2)|0;g=c[h>>2]|0;if(g>>>0>=(c[1606]|0)>>>0){break}xa();return 0}}while(0);c[h>>2]=a;c[g+12>>2]=a;c[a+8>>2]=g;c[a+12>>2]=f}c[1604]=d;c[1607]=e;q=b;return q|0}b=c[1603]|0;if((b|0)==0){break}e=(b&-b)-1|0;p=e>>>12&16;e=e>>>(p>>>0);o=e>>>5&8;e=e>>>(o>>>0);q=e>>>2&4;e=e>>>(q>>>0);d=e>>>1&2;e=e>>>(d>>>0);b=e>>>1&1;b=c[6712+((o|p|q|d|b)+(e>>>(b>>>0))<<2)>>2]|0;e=b;d=b;b=(c[b+4>>2]&-8)-a|0;while(1){f=c[e+16>>2]|0;if((f|0)==0){f=c[e+20>>2]|0;if((f|0)==0){break}}g=(c[f+4>>2]&-8)-a|0;h=g>>>0<b>>>0;e=f;d=h?f:d;b=h?g:b}f=d;h=c[1606]|0;if(f>>>0<h>>>0){xa();return 0}q=f+a|0;e=q;if(f>>>0>=q>>>0){xa();return 0}g=c[d+24>>2]|0;i=c[d+12>>2]|0;do{if((i|0)==(d|0)){j=d+20|0;i=c[j>>2]|0;if((i|0)==0){j=d+16|0;i=c[j>>2]|0;if((i|0)==0){i=0;break}}while(1){l=i+20|0;k=c[l>>2]|0;if((k|0)!=0){i=k;j=l;continue}l=i+16|0;k=c[l>>2]|0;if((k|0)==0){break}else{i=k;j=l}}if(j>>>0<h>>>0){xa();return 0}else{c[j>>2]=0;break}}else{j=c[d+8>>2]|0;if(j>>>0<h>>>0){xa();return 0}h=j+12|0;if((c[h>>2]|0)!=(d|0)){xa();return 0}k=i+8|0;if((c[k>>2]|0)==(d|0)){c[h>>2]=i;c[k>>2]=j;break}else{xa();return 0}}}while(0);a:do{if((g|0)!=0){h=d+28|0;j=6712+(c[h>>2]<<2)|0;do{if((d|0)==(c[j>>2]|0)){c[j>>2]=i;if((i|0)!=0){break}c[1603]=c[1603]&~(1<<c[h>>2]);break a}else{if(g>>>0<(c[1606]|0)>>>0){xa();return 0}h=g+16|0;if((c[h>>2]|0)==(d|0)){c[h>>2]=i}else{c[g+20>>2]=i}if((i|0)==0){break a}}}while(0);if(i>>>0<(c[1606]|0)>>>0){xa();return 0}c[i+24>>2]=g;g=c[d+16>>2]|0;do{if((g|0)!=0){if(g>>>0<(c[1606]|0)>>>0){xa();return 0}else{c[i+16>>2]=g;c[g+24>>2]=i;break}}}while(0);g=c[d+20>>2]|0;if((g|0)==0){break}if(g>>>0<(c[1606]|0)>>>0){xa();return 0}else{c[i+20>>2]=g;c[g+24>>2]=i;break}}}while(0);if(b>>>0<16>>>0){q=b+a|0;c[d+4>>2]=q|3;q=f+(q+4)|0;c[q>>2]=c[q>>2]|1}else{c[d+4>>2]=a|3;c[f+(a|4)>>2]=b|1;c[f+(b+a)>>2]=b;f=c[1604]|0;if((f|0)!=0){a=c[1607]|0;i=f>>>3;h=i<<1;f=6448+(h<<2)|0;g=c[1602]|0;i=1<<i;do{if((g&i|0)==0){c[1602]=g|i;g=f;h=6448+(h+2<<2)|0}else{h=6448+(h+2<<2)|0;g=c[h>>2]|0;if(g>>>0>=(c[1606]|0)>>>0){break}xa();return 0}}while(0);c[h>>2]=a;c[g+12>>2]=a;c[a+8>>2]=g;c[a+12>>2]=f}c[1604]=b;c[1607]=e}q=d+8|0;return q|0}else{if(a>>>0>4294967231>>>0){a=-1;break}b=a+11|0;a=b&-8;f=c[1603]|0;if((f|0)==0){break}e=-a|0;b=b>>>8;do{if((b|0)==0){g=0}else{if(a>>>0>16777215>>>0){g=31;break}p=(b+1048320|0)>>>16&8;q=b<<p;o=(q+520192|0)>>>16&4;q=q<<o;g=(q+245760|0)>>>16&2;g=14-(o|p|g)+(q<<g>>>15)|0;g=a>>>((g+7|0)>>>0)&1|g<<1}}while(0);h=c[6712+(g<<2)>>2]|0;b:do{if((h|0)==0){b=0;j=0}else{if((g|0)==31){i=0}else{i=25-(g>>>1)|0}b=0;i=a<<i;j=0;while(1){l=c[h+4>>2]&-8;k=l-a|0;if(k>>>0<e>>>0){if((l|0)==(a|0)){b=h;e=k;j=h;break b}else{b=h;e=k}}k=c[h+20>>2]|0;h=c[h+16+(i>>>31<<2)>>2]|0;j=(k|0)==0|(k|0)==(h|0)?j:k;if((h|0)==0){break}else{i=i<<1}}}}while(0);if((j|0)==0&(b|0)==0){q=2<<g;f=f&(q|-q);if((f|0)==0){break}q=(f&-f)-1|0;n=q>>>12&16;q=q>>>(n>>>0);m=q>>>5&8;q=q>>>(m>>>0);o=q>>>2&4;q=q>>>(o>>>0);p=q>>>1&2;q=q>>>(p>>>0);j=q>>>1&1;j=c[6712+((m|n|o|p|j)+(q>>>(j>>>0))<<2)>>2]|0}if((j|0)!=0){while(1){g=(c[j+4>>2]&-8)-a|0;f=g>>>0<e>>>0;e=f?g:e;b=f?j:b;f=c[j+16>>2]|0;if((f|0)!=0){j=f;continue}j=c[j+20>>2]|0;if((j|0)==0){break}}}if((b|0)==0){break}if(e>>>0>=((c[1604]|0)-a|0)>>>0){break}d=b;i=c[1606]|0;if(d>>>0<i>>>0){xa();return 0}g=d+a|0;f=g;if(d>>>0>=g>>>0){xa();return 0}h=c[b+24>>2]|0;j=c[b+12>>2]|0;do{if((j|0)==(b|0)){k=b+20|0;j=c[k>>2]|0;if((j|0)==0){k=b+16|0;j=c[k>>2]|0;if((j|0)==0){j=0;break}}while(1){m=j+20|0;l=c[m>>2]|0;if((l|0)!=0){j=l;k=m;continue}l=j+16|0;m=c[l>>2]|0;if((m|0)==0){break}else{j=m;k=l}}if(k>>>0<i>>>0){xa();return 0}else{c[k>>2]=0;break}}else{k=c[b+8>>2]|0;if(k>>>0<i>>>0){xa();return 0}l=k+12|0;if((c[l>>2]|0)!=(b|0)){xa();return 0}i=j+8|0;if((c[i>>2]|0)==(b|0)){c[l>>2]=j;c[i>>2]=k;break}else{xa();return 0}}}while(0);c:do{if((h|0)!=0){i=b+28|0;k=6712+(c[i>>2]<<2)|0;do{if((b|0)==(c[k>>2]|0)){c[k>>2]=j;if((j|0)!=0){break}c[1603]=c[1603]&~(1<<c[i>>2]);break c}else{if(h>>>0<(c[1606]|0)>>>0){xa();return 0}i=h+16|0;if((c[i>>2]|0)==(b|0)){c[i>>2]=j}else{c[h+20>>2]=j}if((j|0)==0){break c}}}while(0);if(j>>>0<(c[1606]|0)>>>0){xa();return 0}c[j+24>>2]=h;h=c[b+16>>2]|0;do{if((h|0)!=0){if(h>>>0<(c[1606]|0)>>>0){xa();return 0}else{c[j+16>>2]=h;c[h+24>>2]=j;break}}}while(0);h=c[b+20>>2]|0;if((h|0)==0){break}if(h>>>0<(c[1606]|0)>>>0){xa();return 0}else{c[j+20>>2]=h;c[h+24>>2]=j;break}}}while(0);d:do{if(e>>>0<16>>>0){q=e+a|0;c[b+4>>2]=q|3;q=d+(q+4)|0;c[q>>2]=c[q>>2]|1}else{c[b+4>>2]=a|3;c[d+(a|4)>>2]=e|1;c[d+(e+a)>>2]=e;h=e>>>3;if(e>>>0<256>>>0){g=h<<1;e=6448+(g<<2)|0;i=c[1602]|0;h=1<<h;do{if((i&h|0)==0){c[1602]=i|h;h=e;g=6448+(g+2<<2)|0}else{g=6448+(g+2<<2)|0;h=c[g>>2]|0;if(h>>>0>=(c[1606]|0)>>>0){break}xa();return 0}}while(0);c[g>>2]=f;c[h+12>>2]=f;c[d+(a+8)>>2]=h;c[d+(a+12)>>2]=e;break}f=e>>>8;do{if((f|0)==0){f=0}else{if(e>>>0>16777215>>>0){f=31;break}p=(f+1048320|0)>>>16&8;q=f<<p;o=(q+520192|0)>>>16&4;q=q<<o;f=(q+245760|0)>>>16&2;f=14-(o|p|f)+(q<<f>>>15)|0;f=e>>>((f+7|0)>>>0)&1|f<<1}}while(0);h=6712+(f<<2)|0;c[d+(a+28)>>2]=f;c[d+(a+20)>>2]=0;c[d+(a+16)>>2]=0;j=c[1603]|0;i=1<<f;if((j&i|0)==0){c[1603]=j|i;c[h>>2]=g;c[d+(a+24)>>2]=h;c[d+(a+12)>>2]=g;c[d+(a+8)>>2]=g;break}j=c[h>>2]|0;if((f|0)==31){h=0}else{h=25-(f>>>1)|0}e:do{if((c[j+4>>2]&-8|0)!=(e|0)){f=j;h=e<<h;while(1){i=f+16+(h>>>31<<2)|0;j=c[i>>2]|0;if((j|0)==0){break}if((c[j+4>>2]&-8|0)==(e|0)){break e}else{f=j;h=h<<1}}if(i>>>0<(c[1606]|0)>>>0){xa();return 0}else{c[i>>2]=g;c[d+(a+24)>>2]=f;c[d+(a+12)>>2]=g;c[d+(a+8)>>2]=g;break d}}}while(0);f=j+8|0;h=c[f>>2]|0;e=c[1606]|0;if(j>>>0<e>>>0){xa();return 0}if(h>>>0<e>>>0){xa();return 0}else{c[h+12>>2]=g;c[f>>2]=g;c[d+(a+8)>>2]=h;c[d+(a+12)>>2]=j;c[d+(a+24)>>2]=0;break}}}while(0);q=b+8|0;return q|0}}while(0);b=c[1604]|0;if(a>>>0<=b>>>0){e=b-a|0;d=c[1607]|0;if(e>>>0>15>>>0){q=d;c[1607]=q+a;c[1604]=e;c[q+(a+4)>>2]=e|1;c[q+b>>2]=e;c[d+4>>2]=a|3}else{c[1604]=0;c[1607]=0;c[d+4>>2]=b|3;q=d+(b+4)|0;c[q>>2]=c[q>>2]|1}q=d+8|0;return q|0}b=c[1605]|0;if(a>>>0<b>>>0){o=b-a|0;c[1605]=o;q=c[1608]|0;p=q;c[1608]=p+a;c[p+(a+4)>>2]=o|1;c[q+4>>2]=a|3;q=q+8|0;return q|0}do{if((c[1576]|0)==0){b=Sa(30)|0;if((b-1&b|0)==0){c[1578]=b;c[1577]=b;c[1579]=-1;c[1580]=-1;c[1581]=0;c[1713]=0;c[1576]=(Wa(0)|0)&-16^1431655768;break}else{xa();return 0}}}while(0);g=a+48|0;e=c[1578]|0;h=a+47|0;b=e+h|0;e=-e|0;f=b&e;if(f>>>0<=a>>>0){q=0;return q|0}i=c[1712]|0;do{if((i|0)!=0){p=c[1710]|0;q=p+f|0;if(q>>>0<=p>>>0|q>>>0>i>>>0){a=0}else{break}return a|0}}while(0);f:do{if((c[1713]&4|0)==0){i=c[1608]|0;g:do{if((i|0)==0){d=182}else{j=6856;while(1){k=j|0;m=c[k>>2]|0;if(m>>>0<=i>>>0){l=j+4|0;if((m+(c[l>>2]|0)|0)>>>0>i>>>0){break}}j=c[j+8>>2]|0;if((j|0)==0){d=182;break g}}if((j|0)==0){d=182;break}i=b-(c[1605]|0)&e;if(i>>>0>=2147483647>>>0){e=0;break}j=cb(i|0)|0;d=(j|0)==((c[k>>2]|0)+(c[l>>2]|0)|0);b=d?j:-1;e=d?i:0;d=191}}while(0);do{if((d|0)==182){b=cb(0)|0;if((b|0)==-1){e=0;break}i=b;e=c[1577]|0;j=e-1|0;if((j&i|0)==0){i=f}else{i=f-i+(j+i&-e)|0}j=c[1710]|0;e=j+i|0;if(!(i>>>0>a>>>0&i>>>0<2147483647>>>0)){e=0;break}k=c[1712]|0;if((k|0)!=0){if(e>>>0<=j>>>0|e>>>0>k>>>0){e=0;break}}j=cb(i|0)|0;d=(j|0)==(b|0);b=d?b:-1;e=d?i:0;d=191}}while(0);h:do{if((d|0)==191){d=-i|0;if((b|0)!=-1){d=202;break f}do{if((j|0)!=-1&i>>>0<2147483647>>>0&i>>>0<g>>>0){b=c[1578]|0;b=h-i+b&-b;if(b>>>0>=2147483647>>>0){break}if((cb(b|0)|0)==-1){cb(d|0)|0;break h}else{i=b+i|0;break}}}while(0);if((j|0)!=-1){e=i;b=j;d=202;break f}}}while(0);c[1713]=c[1713]|4;d=199}else{e=0;d=199}}while(0);do{if((d|0)==199){if(f>>>0>=2147483647>>>0){break}b=cb(f|0)|0;f=cb(0)|0;if(!((f|0)!=-1&(b|0)!=-1&b>>>0<f>>>0)){break}g=f-b|0;f=g>>>0>(a+40|0)>>>0;if(f){e=f?g:e;d=202}}}while(0);do{if((d|0)==202){f=(c[1710]|0)+e|0;c[1710]=f;if(f>>>0>(c[1711]|0)>>>0){c[1711]=f}f=c[1608]|0;i:do{if((f|0)==0){q=c[1606]|0;if((q|0)==0|b>>>0<q>>>0){c[1606]=b}c[1714]=b;c[1715]=e;c[1717]=0;c[1611]=c[1576];c[1610]=-1;d=0;do{q=d<<1;p=6448+(q<<2)|0;c[6448+(q+3<<2)>>2]=p;c[6448+(q+2<<2)>>2]=p;d=d+1|0;}while(d>>>0<32>>>0);d=b+8|0;if((d&7|0)==0){d=0}else{d=-d&7}q=e-40-d|0;c[1608]=b+d;c[1605]=q;c[b+(d+4)>>2]=q|1;c[b+(e-36)>>2]=40;c[1609]=c[1580]}else{h=6856;do{g=c[h>>2]|0;i=h+4|0;j=c[i>>2]|0;if((b|0)==(g+j|0)){d=214;break}h=c[h+8>>2]|0;}while((h|0)!=0);do{if((d|0)==214){if((c[h+12>>2]&8|0)!=0){break}q=f;if(!(q>>>0>=g>>>0&q>>>0<b>>>0)){break}c[i>>2]=j+e;q=c[1608]|0;b=(c[1605]|0)+e|0;d=q;e=q+8|0;if((e&7|0)==0){e=0}else{e=-e&7}q=b-e|0;c[1608]=d+e;c[1605]=q;c[d+(e+4)>>2]=q|1;c[d+(b+4)>>2]=40;c[1609]=c[1580];break i}}while(0);if(b>>>0<(c[1606]|0)>>>0){c[1606]=b}g=b+e|0;h=6856;do{i=h|0;if((c[i>>2]|0)==(g|0)){d=224;break}h=c[h+8>>2]|0;}while((h|0)!=0);do{if((d|0)==224){if((c[h+12>>2]&8|0)!=0){break}c[i>>2]=b;d=h+4|0;c[d>>2]=(c[d>>2]|0)+e;d=b+8|0;if((d&7|0)==0){d=0}else{d=-d&7}f=b+(e+8)|0;if((f&7|0)==0){j=0}else{j=-f&7}l=b+(j+e)|0;m=l;f=d+a|0;h=b+f|0;g=h;i=l-(b+d)-a|0;c[b+(d+4)>>2]=a|3;j:do{if((m|0)==(c[1608]|0)){q=(c[1605]|0)+i|0;c[1605]=q;c[1608]=g;c[b+(f+4)>>2]=q|1}else{if((m|0)==(c[1607]|0)){q=(c[1604]|0)+i|0;c[1604]=q;c[1607]=g;c[b+(f+4)>>2]=q|1;c[b+(q+f)>>2]=q;break}k=e+4|0;o=c[b+(k+j)>>2]|0;if((o&3|0)==1){a=o&-8;n=o>>>3;k:do{if(o>>>0<256>>>0){l=c[b+((j|8)+e)>>2]|0;k=c[b+(e+12+j)>>2]|0;o=6448+(n<<1<<2)|0;do{if((l|0)!=(o|0)){if(l>>>0<(c[1606]|0)>>>0){xa();return 0}if((c[l+12>>2]|0)==(m|0)){break}xa();return 0}}while(0);if((k|0)==(l|0)){c[1602]=c[1602]&~(1<<n);break}do{if((k|0)==(o|0)){n=k+8|0}else{if(k>>>0<(c[1606]|0)>>>0){xa();return 0}n=k+8|0;if((c[n>>2]|0)==(m|0)){break}xa();return 0}}while(0);c[l+12>>2]=k;c[n>>2]=l}else{m=c[b+((j|24)+e)>>2]|0;n=c[b+(e+12+j)>>2]|0;do{if((n|0)==(l|0)){p=j|16;o=b+(k+p)|0;n=c[o>>2]|0;if((n|0)==0){o=b+(p+e)|0;n=c[o>>2]|0;if((n|0)==0){n=0;break}}while(1){q=n+20|0;p=c[q>>2]|0;if((p|0)!=0){n=p;o=q;continue}q=n+16|0;p=c[q>>2]|0;if((p|0)==0){break}else{n=p;o=q}}if(o>>>0<(c[1606]|0)>>>0){xa();return 0}else{c[o>>2]=0;break}}else{p=c[b+((j|8)+e)>>2]|0;if(p>>>0<(c[1606]|0)>>>0){xa();return 0}o=p+12|0;if((c[o>>2]|0)!=(l|0)){xa();return 0}q=n+8|0;if((c[q>>2]|0)==(l|0)){c[o>>2]=n;c[q>>2]=p;break}else{xa();return 0}}}while(0);if((m|0)==0){break}o=b+(e+28+j)|0;p=6712+(c[o>>2]<<2)|0;do{if((l|0)==(c[p>>2]|0)){c[p>>2]=n;if((n|0)!=0){break}c[1603]=c[1603]&~(1<<c[o>>2]);break k}else{if(m>>>0<(c[1606]|0)>>>0){xa();return 0}o=m+16|0;if((c[o>>2]|0)==(l|0)){c[o>>2]=n}else{c[m+20>>2]=n}if((n|0)==0){break k}}}while(0);if(n>>>0<(c[1606]|0)>>>0){xa();return 0}c[n+24>>2]=m;m=j|16;l=c[b+(m+e)>>2]|0;do{if((l|0)!=0){if(l>>>0<(c[1606]|0)>>>0){xa();return 0}else{c[n+16>>2]=l;c[l+24>>2]=n;break}}}while(0);k=c[b+(k+m)>>2]|0;if((k|0)==0){break}if(k>>>0<(c[1606]|0)>>>0){xa();return 0}else{c[n+20>>2]=k;c[k+24>>2]=n;break}}}while(0);m=b+((a|j)+e)|0;i=a+i|0}j=m+4|0;c[j>>2]=c[j>>2]&-2;c[b+(f+4)>>2]=i|1;c[b+(i+f)>>2]=i;j=i>>>3;if(i>>>0<256>>>0){e=j<<1;a=6448+(e<<2)|0;h=c[1602]|0;i=1<<j;do{if((h&i|0)==0){c[1602]=h|i;h=a;e=6448+(e+2<<2)|0}else{e=6448+(e+2<<2)|0;h=c[e>>2]|0;if(h>>>0>=(c[1606]|0)>>>0){break}xa();return 0}}while(0);c[e>>2]=g;c[h+12>>2]=g;c[b+(f+8)>>2]=h;c[b+(f+12)>>2]=a;break}a=i>>>8;do{if((a|0)==0){a=0}else{if(i>>>0>16777215>>>0){a=31;break}p=(a+1048320|0)>>>16&8;q=a<<p;o=(q+520192|0)>>>16&4;q=q<<o;a=(q+245760|0)>>>16&2;a=14-(o|p|a)+(q<<a>>>15)|0;a=i>>>((a+7|0)>>>0)&1|a<<1}}while(0);j=6712+(a<<2)|0;c[b+(f+28)>>2]=a;c[b+(f+20)>>2]=0;c[b+(f+16)>>2]=0;e=c[1603]|0;g=1<<a;if((e&g|0)==0){c[1603]=e|g;c[j>>2]=h;c[b+(f+24)>>2]=j;c[b+(f+12)>>2]=h;c[b+(f+8)>>2]=h;break}e=c[j>>2]|0;if((a|0)==31){g=0}else{g=25-(a>>>1)|0}l:do{if((c[e+4>>2]&-8|0)!=(i|0)){a=e;j=i<<g;while(1){g=a+16+(j>>>31<<2)|0;e=c[g>>2]|0;if((e|0)==0){break}if((c[e+4>>2]&-8|0)==(i|0)){break l}else{a=e;j=j<<1}}if(g>>>0<(c[1606]|0)>>>0){xa();return 0}else{c[g>>2]=h;c[b+(f+24)>>2]=a;c[b+(f+12)>>2]=h;c[b+(f+8)>>2]=h;break j}}}while(0);i=e+8|0;g=c[i>>2]|0;a=c[1606]|0;if(e>>>0<a>>>0){xa();return 0}if(g>>>0<a>>>0){xa();return 0}else{c[g+12>>2]=h;c[i>>2]=h;c[b+(f+8)>>2]=g;c[b+(f+12)>>2]=e;c[b+(f+24)>>2]=0;break}}}while(0);q=b+(d|8)|0;return q|0}}while(0);d=f;j=6856;while(1){h=c[j>>2]|0;if(h>>>0<=d>>>0){i=c[j+4>>2]|0;g=h+i|0;if(g>>>0>d>>>0){break}}j=c[j+8>>2]|0}j=h+(i-39)|0;if((j&7|0)==0){j=0}else{j=-j&7}h=h+(i-47+j)|0;h=h>>>0<(f+16|0)>>>0?d:h;i=h+8|0;j=b+8|0;if((j&7|0)==0){j=0}else{j=-j&7}q=e-40-j|0;c[1608]=b+j;c[1605]=q;c[b+(j+4)>>2]=q|1;c[b+(e-36)>>2]=40;c[1609]=c[1580];c[h+4>>2]=27;c[i>>2]=c[1714];c[i+4>>2]=c[1715];c[i+8>>2]=c[1716];c[i+12>>2]=c[1717];c[1714]=b;c[1715]=e;c[1717]=0;c[1716]=i;e=h+28|0;c[e>>2]=7;if((h+32|0)>>>0<g>>>0){while(1){b=e+4|0;c[b>>2]=7;if((e+8|0)>>>0<g>>>0){e=b}else{break}}}if((h|0)==(d|0)){break}e=h-f|0;g=d+(e+4)|0;c[g>>2]=c[g>>2]&-2;c[f+4>>2]=e|1;c[d+e>>2]=e;g=e>>>3;if(e>>>0<256>>>0){d=g<<1;b=6448+(d<<2)|0;e=c[1602]|0;g=1<<g;do{if((e&g|0)==0){c[1602]=e|g;e=b;d=6448+(d+2<<2)|0}else{d=6448+(d+2<<2)|0;e=c[d>>2]|0;if(e>>>0>=(c[1606]|0)>>>0){break}xa();return 0}}while(0);c[d>>2]=f;c[e+12>>2]=f;c[f+8>>2]=e;c[f+12>>2]=b;break}b=f;d=e>>>8;do{if((d|0)==0){d=0}else{if(e>>>0>16777215>>>0){d=31;break}p=(d+1048320|0)>>>16&8;q=d<<p;o=(q+520192|0)>>>16&4;q=q<<o;d=(q+245760|0)>>>16&2;d=14-(o|p|d)+(q<<d>>>15)|0;d=e>>>((d+7|0)>>>0)&1|d<<1}}while(0);i=6712+(d<<2)|0;c[f+28>>2]=d;c[f+20>>2]=0;c[f+16>>2]=0;g=c[1603]|0;h=1<<d;if((g&h|0)==0){c[1603]=g|h;c[i>>2]=b;c[f+24>>2]=i;c[f+12>>2]=f;c[f+8>>2]=f;break}g=c[i>>2]|0;if((d|0)==31){h=0}else{h=25-(d>>>1)|0}m:do{if((c[g+4>>2]&-8|0)!=(e|0)){d=g;h=e<<h;while(1){i=d+16+(h>>>31<<2)|0;g=c[i>>2]|0;if((g|0)==0){break}if((c[g+4>>2]&-8|0)==(e|0)){break m}else{d=g;h=h<<1}}if(i>>>0<(c[1606]|0)>>>0){xa();return 0}else{c[i>>2]=b;c[f+24>>2]=d;c[f+12>>2]=f;c[f+8>>2]=f;break i}}}while(0);e=g+8|0;h=c[e>>2]|0;d=c[1606]|0;if(g>>>0<d>>>0){xa();return 0}if(h>>>0<d>>>0){xa();return 0}else{c[h+12>>2]=b;c[e>>2]=b;c[f+8>>2]=h;c[f+12>>2]=g;c[f+24>>2]=0;break}}}while(0);b=c[1605]|0;if(b>>>0<=a>>>0){break}o=b-a|0;c[1605]=o;q=c[1608]|0;p=q;c[1608]=p+a;c[p+(a+4)>>2]=o|1;c[q+4>>2]=a|3;q=q+8|0;return q|0}}while(0);c[(eb()|0)>>2]=12;q=0;return q|0}function _e(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;if((a|0)==0){return}p=a-8|0;r=p;q=c[1606]|0;if(p>>>0<q>>>0){xa()}n=c[a-4>>2]|0;m=n&3;if((m|0)==1){xa()}h=n&-8;k=a+(h-8)|0;i=k;a:do{if((n&1|0)==0){u=c[p>>2]|0;if((m|0)==0){return}p=-8-u|0;r=a+p|0;m=r;n=u+h|0;if(r>>>0<q>>>0){xa()}if((m|0)==(c[1607]|0)){b=a+(h-4)|0;if((c[b>>2]&3|0)!=3){b=m;l=n;break}c[1604]=n;c[b>>2]=c[b>>2]&-2;c[a+(p+4)>>2]=n|1;c[k>>2]=n;return}t=u>>>3;if(u>>>0<256>>>0){b=c[a+(p+8)>>2]|0;l=c[a+(p+12)>>2]|0;o=6448+(t<<1<<2)|0;do{if((b|0)!=(o|0)){if(b>>>0<q>>>0){xa()}if((c[b+12>>2]|0)==(m|0)){break}xa()}}while(0);if((l|0)==(b|0)){c[1602]=c[1602]&~(1<<t);b=m;l=n;break}do{if((l|0)==(o|0)){s=l+8|0}else{if(l>>>0<q>>>0){xa()}o=l+8|0;if((c[o>>2]|0)==(m|0)){s=o;break}xa()}}while(0);c[b+12>>2]=l;c[s>>2]=b;b=m;l=n;break}s=c[a+(p+24)>>2]|0;u=c[a+(p+12)>>2]|0;do{if((u|0)==(r|0)){u=a+(p+20)|0;t=c[u>>2]|0;if((t|0)==0){u=a+(p+16)|0;t=c[u>>2]|0;if((t|0)==0){o=0;break}}while(1){w=t+20|0;v=c[w>>2]|0;if((v|0)!=0){t=v;u=w;continue}v=t+16|0;w=c[v>>2]|0;if((w|0)==0){break}else{t=w;u=v}}if(u>>>0<q>>>0){xa()}else{c[u>>2]=0;o=t;break}}else{t=c[a+(p+8)>>2]|0;if(t>>>0<q>>>0){xa()}q=t+12|0;if((c[q>>2]|0)!=(r|0)){xa()}v=u+8|0;if((c[v>>2]|0)==(r|0)){c[q>>2]=u;c[v>>2]=t;o=u;break}else{xa()}}}while(0);if((s|0)==0){b=m;l=n;break}q=a+(p+28)|0;t=6712+(c[q>>2]<<2)|0;do{if((r|0)==(c[t>>2]|0)){c[t>>2]=o;if((o|0)!=0){break}c[1603]=c[1603]&~(1<<c[q>>2]);b=m;l=n;break a}else{if(s>>>0<(c[1606]|0)>>>0){xa()}q=s+16|0;if((c[q>>2]|0)==(r|0)){c[q>>2]=o}else{c[s+20>>2]=o}if((o|0)==0){b=m;l=n;break a}}}while(0);if(o>>>0<(c[1606]|0)>>>0){xa()}c[o+24>>2]=s;q=c[a+(p+16)>>2]|0;do{if((q|0)!=0){if(q>>>0<(c[1606]|0)>>>0){xa()}else{c[o+16>>2]=q;c[q+24>>2]=o;break}}}while(0);p=c[a+(p+20)>>2]|0;if((p|0)==0){b=m;l=n;break}if(p>>>0<(c[1606]|0)>>>0){xa()}else{c[o+20>>2]=p;c[p+24>>2]=o;b=m;l=n;break}}else{b=r;l=h}}while(0);m=b;if(m>>>0>=k>>>0){xa()}n=a+(h-4)|0;o=c[n>>2]|0;if((o&1|0)==0){xa()}do{if((o&2|0)==0){if((i|0)==(c[1608]|0)){w=(c[1605]|0)+l|0;c[1605]=w;c[1608]=b;c[b+4>>2]=w|1;if((b|0)!=(c[1607]|0)){return}c[1607]=0;c[1604]=0;return}if((i|0)==(c[1607]|0)){w=(c[1604]|0)+l|0;c[1604]=w;c[1607]=b;c[b+4>>2]=w|1;c[m+w>>2]=w;return}l=(o&-8)+l|0;n=o>>>3;b:do{if(o>>>0<256>>>0){g=c[a+h>>2]|0;h=c[a+(h|4)>>2]|0;a=6448+(n<<1<<2)|0;do{if((g|0)!=(a|0)){if(g>>>0<(c[1606]|0)>>>0){xa()}if((c[g+12>>2]|0)==(i|0)){break}xa()}}while(0);if((h|0)==(g|0)){c[1602]=c[1602]&~(1<<n);break}do{if((h|0)==(a|0)){j=h+8|0}else{if(h>>>0<(c[1606]|0)>>>0){xa()}a=h+8|0;if((c[a>>2]|0)==(i|0)){j=a;break}xa()}}while(0);c[g+12>>2]=h;c[j>>2]=g}else{i=c[a+(h+16)>>2]|0;n=c[a+(h|4)>>2]|0;do{if((n|0)==(k|0)){n=a+(h+12)|0;j=c[n>>2]|0;if((j|0)==0){n=a+(h+8)|0;j=c[n>>2]|0;if((j|0)==0){g=0;break}}while(1){p=j+20|0;o=c[p>>2]|0;if((o|0)!=0){j=o;n=p;continue}o=j+16|0;p=c[o>>2]|0;if((p|0)==0){break}else{j=p;n=o}}if(n>>>0<(c[1606]|0)>>>0){xa()}else{c[n>>2]=0;g=j;break}}else{o=c[a+h>>2]|0;if(o>>>0<(c[1606]|0)>>>0){xa()}p=o+12|0;if((c[p>>2]|0)!=(k|0)){xa()}j=n+8|0;if((c[j>>2]|0)==(k|0)){c[p>>2]=n;c[j>>2]=o;g=n;break}else{xa()}}}while(0);if((i|0)==0){break}n=a+(h+20)|0;j=6712+(c[n>>2]<<2)|0;do{if((k|0)==(c[j>>2]|0)){c[j>>2]=g;if((g|0)!=0){break}c[1603]=c[1603]&~(1<<c[n>>2]);break b}else{if(i>>>0<(c[1606]|0)>>>0){xa()}j=i+16|0;if((c[j>>2]|0)==(k|0)){c[j>>2]=g}else{c[i+20>>2]=g}if((g|0)==0){break b}}}while(0);if(g>>>0<(c[1606]|0)>>>0){xa()}c[g+24>>2]=i;i=c[a+(h+8)>>2]|0;do{if((i|0)!=0){if(i>>>0<(c[1606]|0)>>>0){xa()}else{c[g+16>>2]=i;c[i+24>>2]=g;break}}}while(0);h=c[a+(h+12)>>2]|0;if((h|0)==0){break}if(h>>>0<(c[1606]|0)>>>0){xa()}else{c[g+20>>2]=h;c[h+24>>2]=g;break}}}while(0);c[b+4>>2]=l|1;c[m+l>>2]=l;if((b|0)!=(c[1607]|0)){break}c[1604]=l;return}else{c[n>>2]=o&-2;c[b+4>>2]=l|1;c[m+l>>2]=l}}while(0);g=l>>>3;if(l>>>0<256>>>0){a=g<<1;d=6448+(a<<2)|0;h=c[1602]|0;g=1<<g;do{if((h&g|0)==0){c[1602]=h|g;f=d;e=6448+(a+2<<2)|0}else{h=6448+(a+2<<2)|0;g=c[h>>2]|0;if(g>>>0>=(c[1606]|0)>>>0){f=g;e=h;break}xa()}}while(0);c[e>>2]=b;c[f+12>>2]=b;c[b+8>>2]=f;c[b+12>>2]=d;return}e=b;f=l>>>8;do{if((f|0)==0){g=0}else{if(l>>>0>16777215>>>0){g=31;break}v=(f+1048320|0)>>>16&8;w=f<<v;u=(w+520192|0)>>>16&4;w=w<<u;g=(w+245760|0)>>>16&2;g=14-(u|v|g)+(w<<g>>>15)|0;g=l>>>((g+7|0)>>>0)&1|g<<1}}while(0);h=6712+(g<<2)|0;c[b+28>>2]=g;c[b+20>>2]=0;c[b+16>>2]=0;a=c[1603]|0;f=1<<g;c:do{if((a&f|0)==0){c[1603]=a|f;c[h>>2]=e;c[b+24>>2]=h;c[b+12>>2]=b;c[b+8>>2]=b}else{f=c[h>>2]|0;if((g|0)==31){g=0}else{g=25-(g>>>1)|0}d:do{if((c[f+4>>2]&-8|0)==(l|0)){d=f}else{h=l<<g;while(1){g=f+16+(h>>>31<<2)|0;a=c[g>>2]|0;if((a|0)==0){break}if((c[a+4>>2]&-8|0)==(l|0)){d=a;break d}else{f=a;h=h<<1}}if(g>>>0<(c[1606]|0)>>>0){xa()}else{c[g>>2]=e;c[b+24>>2]=f;c[b+12>>2]=b;c[b+8>>2]=b;break c}}}while(0);g=d+8|0;f=c[g>>2]|0;h=c[1606]|0;if(d>>>0<h>>>0){xa()}if(f>>>0<h>>>0){xa()}else{c[f+12>>2]=e;c[g>>2]=e;c[b+8>>2]=f;c[b+12>>2]=d;c[b+24>>2]=0;break}}}while(0);w=(c[1610]|0)-1|0;c[1610]=w;if((w|0)==0){b=6864}else{return}while(1){b=c[b>>2]|0;if((b|0)==0){break}else{b=b+8|0}}c[1610]=-1;return}function $e(a){a=a|0;var b=0,d=0;a=(a|0)==0?1:a;while(1){d=Ze(a)|0;if((d|0)!=0){b=10;break}d=(C=c[1934]|0,c[1934]=C+0,C);if((d|0)==0){break}rb[d&7]()}if((b|0)==10){return d|0}d=Qa(4)|0;c[d>>2]=5040;wa(d|0,5976,42);return 0}function af(a){a=a|0;return $e(a)|0}function bf(a){a=a|0;if((a|0)==0){return}_e(a);return}function cf(a){a=a|0;bf(a);return}function df(a){a=a|0;return}function ef(a){a=a|0;return 1320}function ff(b){b=b|0;var c=0;c=b;while(a[c]|0){c=c+1|0}return c-b|0}function gf(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;f=b+e|0;if((e|0)>=20){d=d&255;i=b&3;h=d|d<<8|d<<16|d<<24;g=f&~3;if(i){i=b+4-i|0;while((b|0)<(i|0)){a[b]=d;b=b+1|0}}while((b|0)<(g|0)){c[b>>2]=h;b=b+4|0}}while((b|0)<(f|0)){a[b]=d;b=b+1|0}return b-e|0}function hf(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;f=b|0;if((b&3)==(d&3)){while(b&3){if((e|0)==0)return f|0;a[b]=a[d]|0;b=b+1|0;d=d+1|0;e=e-1|0}while((e|0)>=4){c[b>>2]=c[d>>2];b=b+4|0;d=d+4|0;e=e-4|0}}while((e|0)>0){a[b]=a[d]|0;b=b+1|0;d=d+1|0;e=e-1|0}return f|0}function jf(){Ta()}function kf(a,b){a=a|0;b=b|0;return lb[a&7](b|0)|0}function lf(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;mb[a&7](b|0,c|0,d|0,e|0,f|0)}function mf(a,b){a=a|0;b=b|0;nb[a&127](b|0)}function nf(a,b,c){a=a|0;b=b|0;c=c|0;ob[a&31](b|0,c|0)}function of(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return pb[a&15](b|0,c|0,d|0)|0}function pf(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;qb[a&7](b|0,c|0,d|0)}function qf(a){a=a|0;rb[a&7]()}function rf(a,b,c,d){a=a|0;b=b|0;c=c|0;d=+d;sb[a&7](b|0,c|0,+d)}function sf(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;tb[a&7](b|0,c|0,d|0,e|0,f|0,g|0)}function tf(a,b,c){a=a|0;b=b|0;c=c|0;return ub[a&7](b|0,c|0)|0}function uf(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return vb[a&31](b|0,c|0,d|0,e|0,f|0)|0}function vf(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;wb[a&31](b|0,c|0,d|0,e|0)}function wf(a){a=a|0;ba(0);return 0}function xf(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;ba(1)}function yf(a){a=a|0;ba(2)}function zf(a,b){a=a|0;b=b|0;ba(3)}function Af(a,b,c){a=a|0;b=b|0;c=c|0;ba(4);return 0}function Bf(a,b,c){a=a|0;b=b|0;c=c|0;ba(5)}function Cf(){ba(6)}function Df(a,b,c){a=a|0;b=b|0;c=+c;ba(7)}function Ef(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;ba(8)}function Ff(a,b){a=a|0;b=b|0;ba(9);return 0}function Gf(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;ba(10);return 0}function Hf(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;ba(11)}




// EMSCRIPTEN_END_FUNCS
var lb=[wf,wf,ef,wf,ac,wf,Tb,wf];var mb=[xf,xf,We,xf,Ve,xf,xf,xf];var nb=[yf,yf,Sd,yf,Id,yf,Ae,yf,Gc,yf,Wd,yf,Zb,yf,gd,yf,Cd,yf,Qe,yf,ic,yf,Oe,yf,vd,yf,Nd,yf,Hd,yf,Yb,yf,Lc,yf,pe,yf,fc,yf,tc,yf,Rd,yf,df,yf,Dd,yf,Ce,yf,Md,yf,hc,yf,Xc,yf,ue,yf,Yc,yf,Xd,yf,qe,yf,ze,yf,gc,yf,Zd,yf,uc,yf,rd,yf,cf,yf,Wc,yf,Pe,yf,Me,yf,Ne,yf,ve,yf,fd,yf,sd,yf,yf,yf,yf,yf,yf,yf,yf,yf,yf,yf,yf,yf,yf,yf,yf,yf,yf,yf,yf,yf,yf,yf,yf,yf,yf,yf,yf,yf,yf,yf,yf,yf,yf,yf,yf,yf,yf,yf,yf,yf];var ob=[zf,zf,xe,zf,se,zf,Hc,zf,Pd,zf,Pc,zf,Ic,zf,Ud,zf,Be,zf,ne,zf,Kd,zf,Fd,zf,zf,zf,zf,zf,zf,zf,zf,zf];var pb=[Af,Af,Re,Af,Ub,Af,Vc,Af,bc,Af,Af,Af,Af,Af,Af,Af];var qb=[Bf,Bf,Kc,Bf,nc,Bf,Jc,Bf];var rb=[Cf,Cf,Qb,Cf,jf,Cf,Cf,Cf];var sb=[Df,Df,ec,Df,Xb,Df,Df,Df];var tb=[Ef,Ef,Ye,Ef,Xe,Ef,Yd,Ef];var ub=[Ff,Ff,_b,Ff,Bc,Ff,Sb,Ff];var vb=[Gf,Gf,cc,Gf,Ed,Gf,Od,Gf,we,Gf,me,Gf,Vb,Gf,re,Gf,Jd,Gf,Td,Gf,Gf,Gf,Gf,Gf,Gf,Gf,Gf,Gf,Gf,Gf,Gf,Gf];var wb=[Hf,Hf,dc,Hf,te,Hf,ye,Hf,Se,Hf,Vd,Hf,Qd,Hf,Te,Hf,Wb,Hf,Ld,Hf,oe,Hf,Gd,Hf,Hf,Hf,Hf,Hf,Hf,Hf,Hf,Hf];return{_strlen:ff,_free:_e,_main:Pb,_memset:gf,_malloc:Ze,_memcpy:hf,runPostSets:Nb,stackAlloc:xb,stackSave:yb,stackRestore:zb,setThrew:Ab,setTempRet0:Db,setTempRet1:Eb,setTempRet2:Fb,setTempRet3:Gb,setTempRet4:Hb,setTempRet5:Ib,setTempRet6:Jb,setTempRet7:Kb,setTempRet8:Lb,setTempRet9:Mb,dynCall_ii:kf,dynCall_viiiii:lf,dynCall_vi:mf,dynCall_vii:nf,dynCall_iiii:of,dynCall_viii:pf,dynCall_v:qf,dynCall_viif:rf,dynCall_viiiiii:sf,dynCall_iii:tf,dynCall_iiiiii:uf,dynCall_viiii:vf}})


// EMSCRIPTEN_END_ASM
({ "Math": Math, "Int8Array": Int8Array, "Int16Array": Int16Array, "Int32Array": Int32Array, "Uint8Array": Uint8Array, "Uint16Array": Uint16Array, "Uint32Array": Uint32Array, "Float32Array": Float32Array, "Float64Array": Float64Array }, { "abort": abort, "assert": assert, "asmPrintInt": asmPrintInt, "asmPrintFloat": asmPrintFloat, "min": Math_min, "invoke_ii": invoke_ii, "invoke_viiiii": invoke_viiiii, "invoke_vi": invoke_vi, "invoke_vii": invoke_vii, "invoke_iiii": invoke_iiii, "invoke_viii": invoke_viii, "invoke_v": invoke_v, "invoke_viif": invoke_viif, "invoke_viiiiii": invoke_viiiiii, "invoke_iii": invoke_iii, "invoke_iiiiii": invoke_iiiiii, "invoke_viiii": invoke_viiii, "_llvm_lifetime_end": _llvm_lifetime_end, "_cosf": _cosf, "___cxa_call_unexpected": ___cxa_call_unexpected, "___assert_fail": ___assert_fail, "___cxa_throw": ___cxa_throw, "_abort": _abort, "_fprintf": _fprintf, "_llvm_eh_exception": _llvm_eh_exception, "_printf": _printf, "_fflush": _fflush, "__reallyNegative": __reallyNegative, "_sqrtf": _sqrtf, "_fputc": _fputc, "_floorf": _floorf, "_puts": _puts, "_clock": _clock, "___setErrNo": ___setErrNo, "_fwrite": _fwrite, "_send": _send, "_write": _write, "_fputs": _fputs, "_llvm_umul_with_overflow_i32": _llvm_umul_with_overflow_i32, "_exit": _exit, "___cxa_find_matching_catch": ___cxa_find_matching_catch, "___cxa_allocate_exception": ___cxa_allocate_exception, "_emscripten_cancel_main_loop": _emscripten_cancel_main_loop, "_sysconf": _sysconf, "___cxa_pure_virtual": ___cxa_pure_virtual, "___cxa_is_number_type": ___cxa_is_number_type, "_emscripten_set_main_loop": _emscripten_set_main_loop, "_time": _time, "__formatString": __formatString, "___cxa_does_inherit": ___cxa_does_inherit, "__ZSt9terminatev": __ZSt9terminatev, "___cxa_begin_catch": ___cxa_begin_catch, "_sinf": _sinf, "__ZSt18uncaught_exceptionv": __ZSt18uncaught_exceptionv, "_pwrite": _pwrite, "_sbrk": _sbrk, "__ZNSt9exceptionD2Ev": __ZNSt9exceptionD2Ev, "___errno_location": ___errno_location, "___gxx_personality_v0": ___gxx_personality_v0, "_llvm_lifetime_start": _llvm_lifetime_start, "___resumeException": ___resumeException, "__exit": __exit, "_emscripten_run_script": _emscripten_run_script, "STACKTOP": STACKTOP, "STACK_MAX": STACK_MAX, "tempDoublePtr": tempDoublePtr, "ABORT": ABORT, "NaN": NaN, "Infinity": Infinity, "__ZTVN10__cxxabiv120__si_class_type_infoE": __ZTVN10__cxxabiv120__si_class_type_infoE, "__ZTVN10__cxxabiv117__class_type_infoE": __ZTVN10__cxxabiv117__class_type_infoE, "__ZTISt9exception": __ZTISt9exception }, buffer);
var _strlen = Module["_strlen"] = asm["_strlen"];
var _free = Module["_free"] = asm["_free"];
var _main = Module["_main"] = asm["_main"];
var _memset = Module["_memset"] = asm["_memset"];
var _malloc = Module["_malloc"] = asm["_malloc"];
var _memcpy = Module["_memcpy"] = asm["_memcpy"];
var runPostSets = Module["runPostSets"] = asm["runPostSets"];
var dynCall_ii = Module["dynCall_ii"] = asm["dynCall_ii"];
var dynCall_viiiii = Module["dynCall_viiiii"] = asm["dynCall_viiiii"];
var dynCall_vi = Module["dynCall_vi"] = asm["dynCall_vi"];
var dynCall_vii = Module["dynCall_vii"] = asm["dynCall_vii"];
var dynCall_iiii = Module["dynCall_iiii"] = asm["dynCall_iiii"];
var dynCall_viii = Module["dynCall_viii"] = asm["dynCall_viii"];
var dynCall_v = Module["dynCall_v"] = asm["dynCall_v"];
var dynCall_viif = Module["dynCall_viif"] = asm["dynCall_viif"];
var dynCall_viiiiii = Module["dynCall_viiiiii"] = asm["dynCall_viiiiii"];
var dynCall_iii = Module["dynCall_iii"] = asm["dynCall_iii"];
var dynCall_iiiiii = Module["dynCall_iiiiii"] = asm["dynCall_iiiiii"];
var dynCall_viiii = Module["dynCall_viiii"] = asm["dynCall_viiii"];

Runtime.stackAlloc = function(size) { return asm['stackAlloc'](size) };
Runtime.stackSave = function() { return asm['stackSave']() };
Runtime.stackRestore = function(top) { asm['stackRestore'](top) };

// Warning: printing of i64 values may be slightly rounded! No deep i64 math used, so precise i64 code not included
var i64Math = null;

// === Auto-generated postamble setup entry stuff ===

if (memoryInitializer) {
  function applyData(data) {
    HEAPU8.set(data, STATIC_BASE);
  }
  if (ENVIRONMENT_IS_NODE || ENVIRONMENT_IS_SHELL) {
    applyData(Module['readBinary'](memoryInitializer));
  } else {
    addRunDependency('memory initializer');
    Browser.asyncLoad(memoryInitializer, function(data) {
      applyData(data);
      removeRunDependency('memory initializer');
    }, function(data) {
      throw 'could not load memory initializer ' + memoryInitializer;
    });
  }
}

function ExitStatus(status) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + status + ")";
  this.status = status;
};
ExitStatus.prototype = new Error();
ExitStatus.prototype.constructor = ExitStatus;

var initialStackTop;
var preloadStartTime = null;
var calledMain = false;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!Module['calledRun'] && shouldRunNow) run([].concat(Module["arguments"]));
  if (!Module['calledRun']) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
}

Module['callMain'] = Module.callMain = function callMain(args) {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on __ATMAIN__)');
  assert(__ATPRERUN__.length == 0, 'cannot call main when preRun functions remain to be called');

  args = args || [];

  if (ENVIRONMENT_IS_WEB && preloadStartTime !== null) {
    Module.printErr('preload time: ' + (Date.now() - preloadStartTime) + ' ms');
  }

  ensureInitRuntime();

  var argc = args.length+1;
  function pad() {
    for (var i = 0; i < 4-1; i++) {
      argv.push(0);
    }
  }
  var argv = [allocate(intArrayFromString("/bin/this.program"), 'i8', ALLOC_NORMAL) ];
  pad();
  for (var i = 0; i < argc-1; i = i + 1) {
    argv.push(allocate(intArrayFromString(args[i]), 'i8', ALLOC_NORMAL));
    pad();
  }
  argv.push(0);
  argv = allocate(argv, 'i32', ALLOC_NORMAL);

  initialStackTop = STACKTOP;

  try {

    var ret = Module['_main'](argc, argv, 0);


    // if we're not running an evented main loop, it's time to exit
    if (!Module['noExitRuntime']) {
      exit(ret);
    }
  }
  catch(e) {
    if (e instanceof ExitStatus) {
      // exit() throws this once it's done to make sure execution
      // has been stopped completely
      return;
    } else if (e == 'SimulateInfiniteLoop') {
      // running an evented main loop, don't immediately exit
      Module['noExitRuntime'] = true;
      return;
    } else {
      if (e && typeof e === 'object' && e.stack) Module.printErr('exception thrown: ' + [e, e.stack]);
      throw e;
    }
  } finally {
    calledMain = true;
  }
}




function run(args) {
  args = args || Module['arguments'];

  if (preloadStartTime === null) preloadStartTime = Date.now();

  if (runDependencies > 0) {
    Module.printErr('run() called, but dependencies remain, so not running');
    return;
  }

  preRun();

  if (runDependencies > 0) return; // a preRun added a dependency, run will be called later
  if (Module['calledRun']) return; // run may have just been called through dependencies being fulfilled just in this very frame

  function doRun() {
    if (Module['calledRun']) return; // run may have just been called while the async setStatus time below was happening
    Module['calledRun'] = true;

    ensureInitRuntime();

    preMain();

    if (Module['_main'] && shouldRunNow) {
      Module['callMain'](args);
    }

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      if (!ABORT) doRun();
    }, 1);
  } else {
    doRun();
  }
}
Module['run'] = Module.run = run;

function exit(status) {
  ABORT = true;
  EXITSTATUS = status;
  STACKTOP = initialStackTop;

  // exit the runtime
  exitRuntime();

  // TODO We should handle this differently based on environment.
  // In the browser, the best we can do is throw an exception
  // to halt execution, but in node we could process.exit and
  // I'd imagine SM shell would have something equivalent.
  // This would let us set a proper exit status (which
  // would be great for checking test exit statuses).
  // https://github.com/kripken/emscripten/issues/1371

  // throw an exception to halt the current execution
  throw new ExitStatus(status);
}
Module['exit'] = Module.exit = exit;

function abort(text) {
  if (text) {
    Module.print(text);
    Module.printErr(text);
  }

  ABORT = true;
  EXITSTATUS = 1;

  throw 'abort() at ' + stackTrace();
}
Module['abort'] = Module.abort = abort;

// {{PRE_RUN_ADDITIONS}}

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}

// shouldRunNow refers to calling main(), not run().
var shouldRunNow = true;
if (Module['noInitialRun']) {
  shouldRunNow = false;
}

run([].concat(Module["arguments"]));

// {{POST_RUN_ADDITIONS}}






// {{MODULE_ADDITIONS}}






