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
if (!Module) Module = (typeof Module !== 'undefined' ? Module : null) || {};

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
    window['Module'] = Module;
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
  if (/<?\{ ?[^}]* ?\}>?/.test(type)) return true; // { i32, i8 } etc. - anonymous struct types
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
    var source = Pointer_stringify(code);
    if (source[0] === '"') {
      // tolerate EM_ASM("..code..") even though EM_ASM(..code..) is correct
      if (source.indexOf('"', 1) === source.length-1) {
        source = source.substr(1, source.length-2);
      } else {
        // something invalid happened, e.g. EM_ASM("..code($0)..", input)
        abort('invalid EM_ASM input |' + source + '|. Please use EM_ASM(..code..) (no quotes) or EM_ASM({ ..code($0).. }, input) (to input values)');
      }
    }
    try {
      var evalled = eval('(function(' + args.join(',') + '){ ' + source + ' })'); // new Function does not allow upvars in node
    } catch(e) {
      Module.printErr('error in executing inline EM_ASM code: ' + e + ' on: \n\n' + source + '\n\nwith args |' + args + '| (make sure to use the right one out of EM_ASM, EM_ASM_ARGS, etc.)');
      throw e;
    }
    return Runtime.asmConstCache[code] = evalled;
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
      /* TODO: use TextEncoder when present,
        var encoder = new TextEncoder();
        encoder['encoding'] = "utf-8";
        var utf8Array = encoder['encode'](aMsg.data);
      */
      string = unescape(encodeURIComponent(string));
      var ret = [];
      for (var i = 0; i < string.length; i++) {
        ret.push(string.charCodeAt(i));
      }
      return ret;
    }
  },
  getCompilerSetting: function (name) {
    throw 'You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work';
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
  var subs = [];
  var first = true;
  function dump(x) {
    //return;
    if (x) Module.print(x);
    Module.print(func);
    var pre = '';
    for (var a = 0; a < i; a++) pre += ' ';
    Module.print (pre + '^');
  }
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
    if (rawList) {
      if (ret) {
        list.push(ret + '?');
      }
      return list;
    } else {
      return ret + flushList();
    }
  }
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
  abort('Cannot enlarge memory arrays. Either (1) compile with -s TOTAL_MEMORY=X with X higher than the current value ' + TOTAL_MEMORY + ', (2) compile with ALLOW_MEMORY_GROWTH which adjusts the size at runtime but prevents some optimizations, or (3) set Module.TOTAL_MEMORY before the program runs.');
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
       'JS engine does not provide full typed array support');

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

function unSign(value, bits, ignore) {
  if (value >= 0) {
    return value;
  }
  return bits <= 32 ? 2*Math.abs(1 << (bits-1)) + value // Need some trickery, since if bits == 32, we are right at the limit of the bits JS uses in bitshifts
                    : Math.pow(2, bits)         + value;
}
function reSign(value, bits, ignore) {
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

if (!Math['fround']) Math['fround'] = function(x) { return x };
Math.fround = Math['fround'];

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
var __ZTVN10__cxxabiv117__class_type_infoE = 7024;
var __ZTVN10__cxxabiv120__si_class_type_infoE = 7064;




STATIC_BASE = 8;

STATICTOP = STATIC_BASE + Runtime.alignMemory(7731);
/* global initializers */ __ATINIT__.push();


/* memory initializer */ allocate([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,232,118,72,0,0,0,0,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,101,114,114,111,114,58,32,37,100,92,110,0,0,0,0,0,102,114,97,109,101,32,97,118,101,114,97,103,101,115,58,32,37,46,51,102,32,43,45,32,37,46,51,102,44,32,114,97,110,103,101,58,32,37,46,51,102,32,116,111,32,37,46,51,102,32,10,0,0,0,0,0,105,102,32,40,77,111,100,117,108,101,46,114,101,112,111,114,116,67,111,109,112,108,101,116,105,111,110,41,32,77,111,100,117,108,101,46,114,101,112,111,114,116,67,111,109,112,108,101,116,105,111,110,40,41,0,0,114,101,115,112,111,110,115,105,118,101,32,109,97,105,110,32,108,111,111,112,0,0,0,0,0,0,0,0,56,1,0,0,1,0,0,0,2,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,49,49,98,50,69,100,103,101,83,104,97,112,101,0,0,0,55,98,50,83,104,97,112,101,0,0,0,0,0,0,0,0,120,27,0,0,32,1,0,0,160,27,0,0,16,1,0,0,48,1,0,0,0,0,0,0,66,111,120,50,68,47,67,111,108,108,105,115,105,111,110,47,83,104,97,112,101,115,47,98,50,80,111,108,121,103,111,110,83,104,97,112,101,46,99,112,112,0,0,0,0,0,0,0,48,46,48,102,32,60,61,32,108,111,119,101,114,32,38,38,32,108,111,119,101,114,32,60,61,32,105,110,112,117,116,46,109,97,120,70,114,97,99,116,105,111,110,0,0,0,0,0,82,97,121,67,97,115,116,0,109,95,118,101,114,116,101,120,67,111,117,110,116,32,62,61,32,51,0,0,0,0,0,0,67,111,109,112,117,116,101,77,97,115,115,0,0,0,0,0,97,114,101,97,32,62,32,49,46,49,57,50,48,57,50,57,48,101,45,48,55,70,0,0,0,0,0,0,48,2,0,0,3,0,0,0,4,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,49,52,98,50,80,111,108,121,103,111,110,83,104,97,112,101,0,0,0,0,0,0,0,0,160,27,0,0,24,2,0,0,48,1,0,0,0,0,0,0,16,0,0,0,32,0,0,0,64,0,0,0,96,0,0,0,128,0,0,0,160,0,0,0,192,0,0,0,224,0,0,0,0,1,0,0,64,1,0,0,128,1,0,0,192,1,0,0,0,2,0,0,128,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,106,32,60,32,98,50,95,98,108,111,99,107,83,105,122,101,115,0,0,0,0,0,0,0,66,111,120,50,68,47,67,111,109,109,111,110,47,98,50,66,108,111,99,107,65,108,108,111,99,97,116,111,114,46,99,112,112,0,0,0,0,0,0,0,98,50,66,108,111,99,107,65,108,108,111,99,97,116,111,114,0,0,0,0,0,0,0,0,48,32,60,32,115,105,122,101,0,0,0,0,0,0,0,0,65,108,108,111,99,97,116,101,0,0,0,0,0,0,0,0,48,32,60,61,32,105,110,100,101,120,32,38,38,32,105,110,100,101,120,32,60,32,98,50,95,98,108,111,99,107,83,105,122,101,115,0,0,0,0,0,98,108,111,99,107,67,111,117,110,116,32,42,32,98,108,111,99,107,83,105,122,101,32,60,61,32,98,50,95,99,104,117,110,107,83,105,122,101,0,0,70,114,101,101,0,0,0,0,98,100,45,62,112,111,115,105,116,105,111,110,46,73,115,86,97,108,105,100,40,41,0,0,66,111,120,50,68,47,68,121,110,97,109,105,99,115,47,98,50,66,111,100,121,46,99,112,112,0,0,0,0,0,0,0,98,50,66,111,100,121,0,0,98,100,45,62,108,105,110,101,97,114,86,101,108,111,99,105,116,121,46,73,115,86,97,108,105,100,40,41,0,0,0,0,98,50,73,115,86,97,108,105,100,40,98,100,45,62,97,110,103,108,101,41,0,0,0,0,98,50,73,115,86,97,108,105,100,40,98,100,45,62,97,110,103,117,108,97,114,86,101,108,111,99,105,116,121,41,0,0,98,50,73,115,86,97,108,105,100,40,98,100,45,62,97,110,103,117,108,97,114,68,97,109,112,105,110,103,41,32,38,38,32,98,100,45,62,97,110,103,117,108,97,114,68,97,109,112,105,110,103,32,62,61,32,48,46,48,102,0,0,0,0,0,98,50,73,115,86,97,108,105,100,40,98,100,45,62,108,105,110,101,97,114,68,97,109,112,105,110,103,41,32,38,38,32,98,100,45,62,108,105,110,101,97,114,68,97,109,112,105,110,103,32,62,61,32,48,46,48,102,0,0,0,0,0,0,0,109,95,119,111,114,108,100,45,62,73,115,76,111,99,107,101,100,40,41,32,61,61,32,102,97,108,115,101,0,0,0,0,67,114,101,97,116,101,70,105,120,116,117,114,101,0,0,0,109,95,116,121,112,101,32,61,61,32,98,50,95,100,121,110,97,109,105,99,66,111,100,121,0,0,0,0,0,0,0,0,82,101,115,101,116,77,97,115,115,68,97,116,97,0,0,0,109,95,73,32,62,32,48,46,48,102,0,0,0,0,0,0,0,10,0,0,0,0,0,0,240,7,0,0,0,0,0,0,48,32,60,61,32,112,114,111,120,121,73,100,32,38,38,32,112,114,111,120,121,73,100,32,60,32,109,95,110,111,100,101,67,97,112,97,99,105,116,121,0,0,0,0,0,0,0,0,46,47,66,111,120,50,68,47,67,111,108,108,105,115,105,111,110,47,98,50,68,121,110,97,109,105,99,84,114,101,101,46,104,0,0,0,0,0,0,0,71,101,116,85,115,101,114,68,97,116,97,0,0,0,0,0,71,101,116,70,97,116,65,65,66,66,0,0,0,0,0,0,0,0,0,0,32,8,0,0,5,0,0,0,6,0,0,0,1,0,0,0,2,0,0,0,1,0,0,0,2,0,0,0,49,55,98,50,67,111,110,116,97,99,116,76,105,115,116,101,110,101,114,0,0,0,0,0,120,27,0,0,8,8,0,0,109,95,112,114,111,120,121,67,111,117,110,116,32,61,61,32,48,0,0,0,0,0,0,0,66,111,120,50,68,47,68,121,110,97,109,105,99,115,47,98,50,70,105,120,116,117,114,101,46,99,112,112,0,0,0,0,67,114,101,97,116,101,80,114,111,120,105,101,115,0,0,0,73,115,76,111,99,107,101,100,40,41,32,61,61,32,102,97,108,115,101,0,0,0,0,0,66,111,120,50,68,47,68,121,110,97,109,105,99,115,47,98,50,87,111,114,108,100,46,99,112,112,0,0,0,0,0,0,67,114,101,97,116,101,66,111,100,121,0,0,0,0,0,0,98,45,62,73,115,65,99,116,105,118,101,40,41,32,61,61,32,116,114,117,101,0,0,0,83,111,108,118,101,0,0,0,115,116,97,99,107,67,111,117,110,116,32,60,32,115,116,97,99,107,83,105,122,101,0,0,116,121,112,101,65,32,61,61,32,98,50,95,100,121,110,97,109,105,99,66,111,100,121,32,124,124,32,116,121,112,101,66,32,61,61,32,98,50,95,100,121,110,97,109,105,99,66,111,100,121,0,0,0,0,0,0,83,111,108,118,101,84,79,73,0,0,0,0,0,0,0,0,97,108,112,104,97,48,32,60,32,49,46,48,102,0,0,0,46,47,66,111,120,50,68,47,67,111,109,109,111,110,47,98,50,77,97,116,104,46,104,0,65,100,118,97,110,99,101,0,109,95,106,111,105,110,116,67,111,117,110,116,32,60,32,109,95,106,111,105,110,116,67,97,112,97,99,105,116,121,0,0,46,47,66,111,120,50,68,47,68,121,110,97,109,105,99,115,47,98,50,73,115,108,97,110,100,46,104,0,0,0,0,0,65,100,100,0,0,0,0,0,109,95,99,111,110,116,97,99,116,67,111,117,110,116,32,60,32,109,95,99,111,110,116,97,99,116,67,97,112,97,99,105,116,121,0,0,0,0,0,0,109,95,98,111,100,121,67,111,117,110,116,32,60,32,109,95,98,111,100,121,67,97,112,97,99,105,116,121,0,0,0,0,0,0,0,0,40,10,0,0,7,0,0,0,8,0,0,0,3,0,0,0,0,0,0,0,49,53,98,50,67,111,110,116,97,99,116,70,105,108,116,101,114,0,0,0,0,0,0,0,120,27,0,0,16,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,32,60,61,32,105,110,100,101,120,32,38,38,32,105,110,100,101,120,32,60,32,99,104,97,105,110,45,62,109,95,99,111,117,110,116,0,0,0,0,66,111,120,50,68,47,67,111,108,108,105,115,105,111,110,47,98,50,68,105,115,116,97,110,99,101,46,99,112,112,0,0,83,101,116,0,0,0,0,0,102,97,108,115,101,0,0,0,98,50,68,105,115,116,97,110,99,101,0,0,0,0,0,0,71,101,116,77,101,116,114,105,99,0,0,0,0,0,0,0,71,101,116,87,105,116,110,101,115,115,80,111,105,110,116,115,0,0,0,0,0,0,0,0,48,32,60,61,32,105,110,100,101,120,32,38,38,32,105,110,100,101,120,32,60,32,109,95,99,111,117,110,116,0,0,0,46,47,66,111,120,50,68,47,67,111,108,108,105,115,105,111,110,47,98,50,68,105,115,116,97,110,99,101,46,104,0,0,71,101,116,86,101,114,116,101,120,0,0,0,0,0,0,0,71,101,116,67,108,111,115,101,115,116,80,111,105,110,116,0,99,97,99,104,101,45,62,99,111,117,110,116,32,60,61,32,51,0,0,0,0,0,0,0,82,101,97,100,67,97,99,104,101,0,0,0,0,0,0,0,109,95,110,111,100,101,67,111,117,110,116,32,61,61,32,109,95,110,111,100,101,67,97,112,97,99,105,116,121,0,0,0,66,111,120,50,68,47,67,111,108,108,105,115,105,111,110,47,98,50,68,121,110,97,109,105,99,84,114,101,101,46,99,112,112,0,0,0,0,0,0,0,65,108,108,111,99,97,116,101,78,111,100,101,0,0,0,0,48,32,60,61,32,110,111,100,101,73,100,32,38,38,32,110,111,100,101,73,100,32,60,32,109,95,110,111,100,101,67,97,112,97,99,105,116,121,0,0,70,114,101,101,78,111,100,101,0,0,0,0,0,0,0,0,48,32,60,32,109,95,110,111,100,101,67,111,117,110,116,0,48,32,60,61,32,112,114,111,120,121,73,100,32,38,38,32,112,114,111,120,121,73,100,32,60,32,109,95,110,111,100,101,67,97,112,97,99,105,116,121,0,0,0,0,0,0,0,0,109,95,110,111,100,101,115,91,112,114,111,120,121,73,100,93,46,73,115,76,101,97,102,40,41,0,0,0,0,0,0,0,77,111,118,101,80,114,111,120,121,0,0,0,0,0,0,0,99,104,105,108,100,49,32,33,61,32,40,45,49,41,0,0,73,110,115,101,114,116,76,101,97,102,0,0,0,0,0,0,99,104,105,108,100,50,32,33,61,32,40,45,49,41,0,0,105,65,32,33,61,32,40,45,49,41,0,0,0,0,0,0,66,97,108,97,110,99,101,0,48,32,60,61,32,105,66,32,38,38,32,105,66,32,60,32,109,95,110,111,100,101,67,97,112,97,99,105,116,121,0,0,48,32,60,61,32,105,67,32,38,38,32,105,67,32,60,32,109,95,110,111,100,101,67,97,112,97,99,105,116,121,0,0,48,32,60,61,32,105,70,32,38,38,32,105,70,32,60,32,109,95,110,111,100,101,67,97,112,97,99,105,116,121,0,0,48,32,60,61,32,105,71,32,38,38,32,105,71,32,60,32,109,95,110,111,100,101,67,97,112,97,99,105,116,121,0,0,109,95,110,111,100,101,115,91,67,45,62,112,97,114,101,110,116,93,46,99,104,105,108,100,50,32,61,61,32,105,65,0,48,32,60,61,32,105,68,32,38,38,32,105,68,32,60,32,109,95,110,111,100,101,67,97,112,97,99,105,116,121,0,0,48,32,60,61,32,105,69,32,38,38,32,105,69,32,60,32,109,95,110,111,100,101,67,97,112,97,99,105,116,121,0,0,109,95,110,111,100,101,115,91,66,45,62,112,97,114,101,110,116,93,46,99,104,105,108,100,50,32,61,61,32,105,65,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,116,97,114,103,101,116,32,62,32,116,111,108,101,114,97,110,99,101,0,0,0,0,0,0,66,111,120,50,68,47,67,111,108,108,105,115,105,111,110,47,98,50,84,105,109,101,79,102,73,109,112,97,99,116,46,99,112,112,0,0,0,0,0,0,98,50,84,105,109,101,79,102,73,109,112,97,99,116,0,0,102,97,108,115,101,0,0,0,69,118,97,108,117,97,116,101,0,0,0,0,0,0,0,0,48,32,60,61,32,105,110,100,101,120,32,38,38,32,105,110,100,101,120,32,60,32,109,95,99,111,117,110,116,0,0,0,46,47,66,111,120,50,68,47,67,111,108,108,105,115,105,111,110,47,98,50,68,105,115,116,97,110,99,101,46,104,0,0,71,101,116,86,101,114,116,101,120,0,0,0,0,0,0,0,70,105,110,100,77,105,110,83,101,112,97,114,97,116,105,111,110,0,0,0,0,0,0,0,48,32,60,32,99,111,117,110,116,32,38,38,32,99,111,117,110,116,32,60,32,51,0,0,73,110,105,116,105,97,108,105,122,101,0,0,0,0,0,0,0,0,0,0,0,0,0,0,109,95,105,110,100,101,120,32,61,61,32,48,0,0,0,0,66,111,120,50,68,47,67,111,109,109,111,110,47,98,50,83,116,97,99,107,65,108,108,111,99,97,116,111,114,46,99,112,112,0,0,0,0,0,0,0,126,98,50,83,116,97,99,107,65,108,108,111,99,97,116,111,114,0,0,0,0,0,0,0,109,95,101,110,116,114,121,67,111,117,110,116,32,61,61,32,48,0,0,0,0,0,0,0,109,95,101,110,116,114,121,67,111,117,110,116,32,60,32,98,50,95,109,97,120,83,116,97,99,107,69,110,116,114,105,101,115,0,0,0,0,0,0,0,65,108,108,111,99,97,116,101,0,0,0,0,0,0,0,0,109,95,101,110,116,114,121,67,111,117,110,116,32,62,32,48,0,0,0,0,0,0,0,0,70,114,101,101,0,0,0,0,112,32,61,61,32,101,110,116,114,121,45,62,100,97,116,97,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,32,60,61,32,116,121,112,101,49,32,38,38,32,116,121,112,101,49,32,60,32,98,50,83,104,97,112,101,58,58,101,95,116,121,112,101,67,111,117,110,116,0,0,0,0,0,0,66,111,120,50,68,47,68,121,110,97,109,105,99,115,47,67,111,110,116,97,99,116,115,47,98,50,67,111,110,116,97,99,116,46,99,112,112,0,0,0,48,32,60,61,32,116,121,112,101,50,32,38,38,32,116,121,112,101,50,32,60,32,98,50,83,104,97,112,101,58,58,101,95,116,121,112,101,67,111,117,110,116,0,0,0,0,0,0,67,114,101,97,116,101,0,0,115,95,105,110,105,116,105,97,108,105,122,101,100,32,61,61,32,116,114,117,101,0,0,0,68,101,115,116,114,111,121,0,48,32,60,61,32,116,121,112,101,65,32,38,38,32,116,121,112,101,66,32,60,32,98,50,83,104,97,112,101,58,58,101,95,116,121,112,101,67,111,117,110,116,0,0,0,0,0,0,0,0,0,0,120,17,0,0,1,0,0,0,9,0,0,0,10,0,0,0,0,0,0,0,57,98,50,67,111,110,116,97,99,116,0,0,0,0,0,0,120,27,0,0,104,17,0,0,0,0,0,0,104,18,0,0,3,0,0,0,11,0,0,0,12,0,0,0,0,0,0,0,109,95,102,105,120,116,117,114,101,65,45,62,71,101,116,84,121,112,101,40,41,32,61,61,32,98,50,83,104,97,112,101,58,58,101,95,101,100,103,101,0,0,0,0,0,0,0,0,66,111,120,50,68,47,68,121,110,97,109,105,99,115,47,67,111,110,116,97,99,116,115,47,98,50,69,100,103,101,65,110,100,67,105,114,99,108,101,67,111,110,116,97,99,116,46,99,112,112,0,0,0,0,0,0,98,50,69,100,103,101,65,110,100,67,105,114,99,108,101,67,111,110,116,97,99,116,0,0,109,95,102,105,120,116,117,114,101,66,45,62,71,101,116,84,121,112,101,40,41,32,61,61,32,98,50,83,104,97,112,101,58,58,101,95,99,105,114,99,108,101,0,0,0,0,0,0,50,50,98,50,69,100,103,101,65,110,100,67,105,114,99,108,101,67,111,110,116,97,99,116,0,0,0,0,0,0,0,0,160,27,0,0,72,18,0,0,120,17,0,0,0,0,0,0,0,0,0,0,96,19,0,0,4,0,0,0,13,0,0,0,14,0,0,0,0,0,0,0,109,95,102,105,120,116,117,114,101,65,45,62,71,101,116,84,121,112,101,40,41,32,61,61,32,98,50,83,104,97,112,101,58,58,101,95,101,100,103,101,0,0,0,0,0,0,0,0,66,111,120,50,68,47,68,121,110,97,109,105,99,115,47,67,111,110,116,97,99,116,115,47,98,50,69,100,103,101,65,110,100,80,111,108,121,103,111,110,67,111,110,116,97,99,116,46,99,112,112,0,0,0,0,0,98,50,69,100,103,101,65,110,100,80,111,108,121,103,111,110,67,111,110,116,97,99,116,0,109,95,102,105,120,116,117,114,101,66,45,62,71,101,116,84,121,112,101,40,41,32,61,61,32,98,50,83,104,97,112,101,58,58,101,95,112,111,108,121,103,111,110,0,0,0,0,0,50,51,98,50,69,100,103,101,65,110,100,80,111,108,121,103,111,110,67,111,110,116,97,99,116,0,0,0,0,0,0,0,160,27,0,0,64,19,0,0,120,17,0,0,0,0,0,0,0,0,0,0,96,20,0,0,5,0,0,0,15,0,0,0,16,0,0,0,0,0,0,0,109,95,102,105,120,116,117,114,101,65,45,62,71,101,116,84,121,112,101,40,41,32,61,61,32,98,50,83,104,97,112,101,58,58,101,95,112,111,108,121,103,111,110,0,0,0,0,0,66,111,120,50,68,47,68,121,110,97,109,105,99,115,47,67,111,110,116,97,99,116,115,47,98,50,80,111,108,121,103,111,110,65,110,100,67,105,114,99,108,101,67,111,110,116,97,99,116,46,99,112,112,0,0,0,98,50,80,111,108,121,103,111,110,65,110,100,67,105,114,99,108,101,67,111,110,116,97,99,116,0,0,0,0,0,0,0,109,95,102,105,120,116,117,114,101,66,45,62,71,101,116,84,121,112,101,40,41,32,61,61,32,98,50,83,104,97,112,101,58,58,101,95,99,105,114,99,108,101,0,0,0,0,0,0,50,53,98,50,80,111,108,121,103,111,110,65,110,100,67,105,114,99,108,101,67,111,110,116,97,99,116,0,0,0,0,0,160,27,0,0,64,20,0,0,120,17,0,0,0,0,0,0,0,0,0,0,72,21,0,0,6,0,0,0,17,0,0,0,18,0,0,0,0,0,0,0,109,95,102,105,120,116,117,114,101,65,45,62,71,101,116,84,121,112,101,40,41,32,61,61,32,98,50,83,104,97,112,101,58,58,101,95,112,111,108,121,103,111,110,0,0,0,0,0,66,111,120,50,68,47,68,121,110,97,109,105,99,115,47,67,111,110,116,97,99,116,115,47,98,50,80,111,108,121,103,111,110,67,111,110,116,97,99,116,46,99,112,112,0,0,0,0,98,50,80,111,108,121,103,111,110,67,111,110,116,97,99,116,0,0,0,0,0,0,0,0,109,95,102,105,120,116,117,114,101,66,45,62,71,101,116,84,121,112,101,40,41,32,61,61,32,98,50,83,104,97,112,101,58,58,101,95,112,111,108,121,103,111,110,0,0,0,0,0,49,54,98,50,80,111,108,121,103,111,110,67,111,110,116,97,99,116,0,0,0,0,0,0,160,27,0,0,48,21,0,0,120,17,0,0,0,0,0,0,116,111,105,73,110,100,101,120,65,32,60,32,109,95,98,111,100,121,67,111,117,110,116,0,66,111,120,50,68,47,68,121,110,97,109,105,99,115,47,98,50,73,115,108,97,110,100,46,99,112,112,0,0,0,0,0,83,111,108,118,101,84,79,73,0,0,0,0,0,0,0,0,116,111,105,73,110,100,101,120,66,32,60,32,109,95,98,111,100,121,67,111,117,110,116,0,100,101,110,32,62,32,48,46,48,102,0,0,0,0,0,0,66,111,120,50,68,47,67,111,108,108,105,115,105,111,110,47,98,50,67,111,108,108,105,100,101,69,100,103,101,46,99,112,112,0,0,0,0,0,0,0,98,50,67,111,108,108,105,100,101,69,100,103,101,65,110,100,67,105,114,99,108,101,0,0,48,32,60,61,32,101,100,103,101,49,32,38,38,32,101,100,103,101,49,32,60,32,112,111,108,121,49,45,62,109,95,118,101,114,116,101,120,67,111,117,110,116,0,0,0,0,0,0,66,111,120,50,68,47,67,111,108,108,105,115,105,111,110,47,98,50,67,111,108,108,105,100,101,80,111,108,121,103,111,110,46,99,112,112,0,0,0,0,98,50,70,105,110,100,73,110,99,105,100,101,110,116,69,100,103,101,0,0,0,0,0,0,98,50,69,100,103,101,83,101,112,97,114,97,116,105,111,110,0,0,0,0,0,0,0,0,0,0,0,0,120,23,0,0,7,0,0,0,19,0,0,0,20,0,0,0,0,0,0,0,109,95,102,105,120,116,117,114,101,65,45,62,71,101,116,84,121,112,101,40,41,32,61,61,32,98,50,83,104,97,112,101,58,58,101,95,99,104,97,105,110,0,0,0,0,0,0,0,66,111,120,50,68,47,68,121,110,97,109,105,99,115,47,67,111,110,116,97,99,116,115,47,98,50,67,104,97,105,110,65,110,100,67,105,114,99,108,101,67,111,110,116,97,99,116,46,99,112,112,0,0,0,0,0,98,50,67,104,97,105,110,65,110,100,67,105,114,99,108,101,67,111,110,116,97,99,116,0,109,95,102,105,120,116,117,114,101,66,45,62,71,101,116,84,121,112,101,40,41,32,61,61,32,98,50,83,104,97,112,101,58,58,101,95,99,105,114,99,108,101,0,0,0,0,0,0,50,51,98,50,67,104,97,105,110,65,110,100,67,105,114,99,108,101,67,111,110,116,97,99,116,0,0,0,0,0,0,0,160,27,0,0,88,23,0,0,120,17,0,0,0,0,0,0,0,0,0,0,120,24,0,0,8,0,0,0,21,0,0,0,22,0,0,0,0,0,0,0,109,95,102,105,120,116,117,114,101,65,45,62,71,101,116,84,121,112,101,40,41,32,61,61,32,98,50,83,104,97,112,101,58,58,101,95,99,104,97,105,110,0,0,0,0,0,0,0,66,111,120,50,68,47,68,121,110,97,109,105,99,115,47,67,111,110,116,97,99,116,115,47,98,50,67,104,97,105,110,65,110,100,80,111,108,121,103,111,110,67,111,110,116,97,99,116,46,99,112,112,0,0,0,0,98,50,67,104,97,105,110,65,110,100,80,111,108,121,103,111,110,67,111,110,116,97,99,116,0,0,0,0,0,0,0,0,109,95,102,105,120,116,117,114,101,66,45,62,71,101,116,84,121,112,101,40,41,32,61,61,32,98,50,83,104,97,112,101,58,58,101,95,112,111,108,121,103,111,110,0,0,0,0,0,50,52,98,50,67,104,97,105,110,65,110,100,80,111,108,121,103,111,110,67,111,110,116,97,99,116,0,0,0,0,0,0,160,27,0,0,88,24,0,0,120,17,0,0,0,0,0,0,0,0,0,0,88,25,0,0,9,0,0,0,23,0,0,0,24,0,0,0,0,0,0,0,109,95,102,105,120,116,117,114,101,65,45,62,71,101,116,84,121,112,101,40,41,32,61,61,32,98,50,83,104,97,112,101,58,58,101,95,99,105,114,99,108,101,0,0,0,0,0,0,66,111,120,50,68,47,68,121,110,97,109,105,99,115,47,67,111,110,116,97,99,116,115,47,98,50,67,105,114,99,108,101,67,111,110,116,97,99,116,46,99,112,112,0,0,0,0,0,98,50,67,105,114,99,108,101,67,111,110,116,97,99,116,0,109,95,102,105,120,116,117,114,101,66,45,62,71,101,116,84,121,112,101,40,41,32,61,61,32,98,50,83,104,97,112,101,58,58,101,95,99,105,114,99,108,101,0,0,0,0,0,0,49,53,98,50,67,105,114,99,108,101,67,111,110,116,97,99,116,0,0,0,0,0,0,0,160,27,0,0,64,25,0,0,120,17,0,0,0,0,0,0,112,111,105,110,116,67,111,117,110,116,32,62,32,48,0,0,66,111,120,50,68,47,68,121,110,97,109,105,99,115,47,67,111,110,116,97,99,116,115,47,98,50,67,111,110,116,97,99,116,83,111,108,118,101,114,46,99,112,112,0,0,0,0,0,98,50,67,111,110,116,97,99,116,83,111,108,118,101,114,0,109,97,110,105,102,111,108,100,45,62,112,111,105,110,116,67,111,117,110,116,32,62,32,48,0,0,0,0,0,0,0,0,73,110,105,116,105,97,108,105,122,101,86,101,108,111,99,105,116,121,67,111,110,115,116,114,97,105,110,116,115,0,0,0,112,111,105,110,116,67,111,117,110,116,32,61,61,32,49,32,124,124,32,112,111,105,110,116,67,111,117,110,116,32,61,61,32,50,0,0,0,0,0,0,83,111,108,118,101,86,101,108,111,99,105,116,121,67,111,110,115,116,114,97,105,110,116,115,0,0,0,0,0,0,0,0,97,46,120,32,62,61,32,48,46,48,102,32,38,38,32,97,46,121,32,62,61,32,48,46,48,102,0,0,0,0,0,0,112,99,45,62,112,111,105,110,116,67,111,117,110,116,32,62,32,48,0,0,0,0,0,0,73,110,105,116,105,97,108,105,122,101,0,0,0,0,0,0,66,111,120,50,68,47,67,111,108,108,105,115,105,111,110,47,83,104,97,112,101,115,47,98,50,67,104,97,105,110,83,104,97,112,101,46,99,112,112,0,48,32,60,61,32,105,110,100,101,120,32,38,38,32,105,110,100,101,120,32,60,32,109,95,99,111,117,110,116,32,45,32,49,0,0,0,0,0,0,0,71,101,116,67,104,105,108,100,69,100,103,101,0,0,0,0,83,116,57,116,121,112,101,95,105,110,102,111,0,0,0,0,120,27,0,0,232,26,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,54,95,95,115,104,105,109,95,116,121,112,101,95,105,110,102,111,69,0,0,0,0,0,0,0,0,160,27,0,0,0,27,0,0,248,26,0,0,0,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,55,95,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,0,0,0,0,0,0,160,27,0,0,56,27,0,0,40,27,0,0,0,0,0,0,0,0,0,0,96,27,0,0,25,0,0,0,26,0,0,0,27,0,0,0,28,0,0,0,4,0,0,0,1,0,0,0,1,0,0,0,10,0,0,0,0,0,0,0,232,27,0,0,25,0,0,0,29,0,0,0,27,0,0,0,28,0,0,0,4,0,0,0,2,0,0,0,2,0,0,0,11,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,50,48,95,95,115,105,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,0,0,0,160,27,0,0,192,27,0,0,96,27,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,30,0,0,30,0,0,0,31,0,0,0,3,0,0,0,0,0,0,0,115,116,100,58,58,98,97,100,95,97,108,108,111,99,0,0,83,116,57,98,97,100,95,97,108,108,111,99,0,0,0,0,160,27,0,0,24,30,0,0,0,0,0,0,0,0,0,0], "i8", ALLOC_NONE, Runtime.GLOBAL_BASE);




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


  function _emscripten_set_main_loop(func, fps, simulateInfiniteLoop, arg) {
      Module['noExitRuntime'] = true;
  
      assert(!Browser.mainLoop.scheduler, 'there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one, if you want to');
  
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
  
        if (Browser.mainLoop.method === 'timeout' && Module.ctx) {
          Module.printErr('Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!');
          Browser.mainLoop.method = ''; // just warn once per call to set main loop
        }
  
        if (Module['preMainLoop']) {
          Module['preMainLoop']();
        }
  
        try {
          if (typeof arg !== 'undefined') {
            Runtime.dynCall('vi', func, [arg]);
          } else {
            Runtime.dynCall('v', func);
          }
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
        };
        Browser.mainLoop.method = 'timeout';
      } else {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler() {
          Browser.requestAnimationFrame(Browser.mainLoop.runner);
        };
        Browser.mainLoop.method = 'rAF';
      }
      Browser.mainLoop.scheduler();
  
      if (simulateInfiniteLoop) {
        throw 'SimulateInfiniteLoop';
      }
    }

  var _cosf=Math_cos;

  function ___cxa_pure_virtual() {
      ABORT = true;
      throw 'Pure virtual function called!';
    }

  function _time(ptr) {
      var ret = Math.floor(Date.now()/1000);
      if (ptr) {
        HEAP32[((ptr)>>2)]=ret;
      }
      return ret;
    }

  function ___assert_fail(condition, filename, line, func) {
      ABORT = true;
      throw 'Assertion failed: ' + Pointer_stringify(condition) + ', at: ' + [filename ? Pointer_stringify(filename) : 'unknown filename', line, func ? Pointer_stringify(func) : 'unknown function'] + ' at ' + stackTrace();
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
  
  
  
  var ___cxa_last_thrown_exception=0;function ___resumeException(ptr) {
      if (!___cxa_last_thrown_exception) { ___cxa_last_thrown_exception = ptr; }
      throw ptr + " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";
    }
  
  var ___cxa_exception_header_size=8;function ___cxa_find_matching_catch(thrown, throwntype) {
      if (thrown == -1) thrown = ___cxa_last_thrown_exception;
      header = thrown - ___cxa_exception_header_size;
      if (throwntype == -1) throwntype = HEAP32[((header)>>2)];
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
    }function ___cxa_throw(ptr, type, destructor) {
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
      var header = ptr - ___cxa_exception_header_size;
      HEAP32[((header)>>2)]=type;
      HEAP32[(((header)+(4))>>2)]=destructor;
      ___cxa_last_thrown_exception = ptr;
      if (!("uncaught_exception" in __ZSt18uncaught_exceptionv)) {
        __ZSt18uncaught_exceptionv.uncaught_exception = 1;
      } else {
        __ZSt18uncaught_exceptionv.uncaught_exception++;
      }
      throw ptr + " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";
    }

   
  Module["_memset"] = _memset;

  
  
  function __exit(status) {
      // void _exit(int status);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/exit.html
      Module['exit'](status);
    }function _exit(status) {
      __exit(status);
    }function __ZSt9terminatev() {
      _exit(-1234);
    }

  function _abort() {
      Module['abort']();
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
        return MEMFS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
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
          var node = MEMFS.createNode(parent, newname, 511 /* 0777 */ | 40960, 0);
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
      },DB_VERSION:21,DB_STORE_NAME:"FILE_DATA",mount:function (mount) {
        // reuse all of the core MEMFS functionality
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
      },getDB:function (name, callback) {
        // check the cache first
        var db = IDBFS.dbs[name];
        if (db) {
          return callback(null, db);
        }
  
        var req;
        try {
          req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
        } catch (e) {
          return callback(e);
        }
        req.onupgradeneeded = function(e) {
          var db = e.target.result;
          var transaction = e.target.transaction;
  
          var fileStore;
  
          if (db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
            fileStore = transaction.objectStore(IDBFS.DB_STORE_NAME);
          } else {
            fileStore = db.createObjectStore(IDBFS.DB_STORE_NAME);
          }
  
          fileStore.createIndex('timestamp', 'timestamp', { unique: false });
        };
        req.onsuccess = function() {
          db = req.result;
  
          // add to the cache
          IDBFS.dbs[name] = db;
          callback(null, db);
        };
        req.onerror = function() {
          callback(this.error);
        };
      },getLocalSet:function (mount, callback) {
        var entries = {};
  
        function isRealDir(p) {
          return p !== '.' && p !== '..';
        };
        function toAbsolute(root) {
          return function(p) {
            return PATH.join2(root, p);
          }
        };
  
        var check = FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint));
  
        while (check.length) {
          var path = check.pop();
          var stat;
  
          try {
            stat = FS.stat(path);
          } catch (e) {
            return callback(e);
          }
  
          if (FS.isDir(stat.mode)) {
            check.push.apply(check, FS.readdir(path).filter(isRealDir).map(toAbsolute(path)));
          }
  
          entries[path] = { timestamp: stat.mtime };
        }
  
        return callback(null, { type: 'local', entries: entries });
      },getRemoteSet:function (mount, callback) {
        var entries = {};
  
        IDBFS.getDB(mount.mountpoint, function(err, db) {
          if (err) return callback(err);
  
          var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readonly');
          transaction.onerror = function() { callback(this.error); };
  
          var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
          var index = store.index('timestamp');
  
          index.openKeyCursor().onsuccess = function(event) {
            var cursor = event.target.result;
  
            if (!cursor) {
              return callback(null, { type: 'remote', db: db, entries: entries });
            }
  
            entries[cursor.primaryKey] = { timestamp: cursor.key };
  
            cursor.continue();
          };
        });
      },loadLocalEntry:function (path, callback) {
        var stat, node;
  
        try {
          var lookup = FS.lookupPath(path);
          node = lookup.node;
          stat = FS.stat(path);
        } catch (e) {
          return callback(e);
        }
  
        if (FS.isDir(stat.mode)) {
          return callback(null, { timestamp: stat.mtime, mode: stat.mode });
        } else if (FS.isFile(stat.mode)) {
          return callback(null, { timestamp: stat.mtime, mode: stat.mode, contents: node.contents });
        } else {
          return callback(new Error('node type not supported'));
        }
      },storeLocalEntry:function (path, entry, callback) {
        try {
          if (FS.isDir(entry.mode)) {
            FS.mkdir(path, entry.mode);
          } else if (FS.isFile(entry.mode)) {
            FS.writeFile(path, entry.contents, { encoding: 'binary', canOwn: true });
          } else {
            return callback(new Error('node type not supported'));
          }
  
          FS.utime(path, entry.timestamp, entry.timestamp);
        } catch (e) {
          return callback(e);
        }
  
        callback(null);
      },removeLocalEntry:function (path, callback) {
        try {
          var lookup = FS.lookupPath(path);
          var stat = FS.stat(path);
  
          if (FS.isDir(stat.mode)) {
            FS.rmdir(path);
          } else if (FS.isFile(stat.mode)) {
            FS.unlink(path);
          }
        } catch (e) {
          return callback(e);
        }
  
        callback(null);
      },loadRemoteEntry:function (store, path, callback) {
        var req = store.get(path);
        req.onsuccess = function(event) { callback(null, event.target.result); };
        req.onerror = function() { callback(this.error); };
      },storeRemoteEntry:function (store, path, entry, callback) {
        var req = store.put(entry, path);
        req.onsuccess = function() { callback(null); };
        req.onerror = function() { callback(this.error); };
      },removeRemoteEntry:function (store, path, callback) {
        var req = store.delete(path);
        req.onsuccess = function() { callback(null); };
        req.onerror = function() { callback(this.error); };
      },reconcile:function (src, dst, callback) {
        var total = 0;
  
        var create = [];
        Object.keys(src.entries).forEach(function (key) {
          var e = src.entries[key];
          var e2 = dst.entries[key];
          if (!e2 || e.timestamp > e2.timestamp) {
            create.push(key);
            total++;
          }
        });
  
        var remove = [];
        Object.keys(dst.entries).forEach(function (key) {
          var e = dst.entries[key];
          var e2 = src.entries[key];
          if (!e2) {
            remove.push(key);
            total++;
          }
        });
  
        if (!total) {
          return callback(null);
        }
  
        var errored = false;
        var completed = 0;
        var db = src.type === 'remote' ? src.db : dst.db;
        var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readwrite');
        var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
  
        function done(err) {
          if (err) {
            if (!done.errored) {
              done.errored = true;
              return callback(err);
            }
            return;
          }
          if (++completed >= total) {
            return callback(null);
          }
        };
  
        transaction.onerror = function() { done(this.error); };
  
        // sort paths in ascending order so directory entries are created
        // before the files inside them
        create.sort().forEach(function (path) {
          if (dst.type === 'local') {
            IDBFS.loadRemoteEntry(store, path, function (err, entry) {
              if (err) return done(err);
              IDBFS.storeLocalEntry(path, entry, done);
            });
          } else {
            IDBFS.loadLocalEntry(path, function (err, entry) {
              if (err) return done(err);
              IDBFS.storeRemoteEntry(store, path, entry, done);
            });
          }
        });
  
        // sort paths in descending order so files are deleted before their
        // parent directories
        remove.sort().reverse().forEach(function(path) {
          if (dst.type === 'local') {
            IDBFS.removeLocalEntry(path, done);
          } else {
            IDBFS.removeRemoteEntry(store, path, done);
          }
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
    }var FS={root:null,mounts:[],devices:[null],streams:[],nextInode:1,nameTable:null,currentPath:"/",initialized:false,ignorePermissions:true,trackingDelegate:{},tracking:{openFlags:{READ:1,WRITE:2}},ErrnoError:null,genericErrors:{},handleFSError:function (e) {
        if (!(e instanceof FS.ErrnoError)) throw e + ' : ' + stackTrace();
        return ___setErrNo(e.errno);
      },lookupPath:function (path, opts) {
        path = PATH.resolve(FS.cwd(), path);
        opts = opts || {};
  
        var defaults = {
          follow_mount: true,
          recurse_count: 0
        };
        for (var key in defaults) {
          if (opts[key] === undefined) {
            opts[key] = defaults[key];
          }
        }
  
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
            if (!islast || (islast && opts.follow_mount)) {
              current = current.mounted.root;
            }
          }
  
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
            if (!parent) {
              parent = this;  // root node sets parent to itself
            }
            this.parent = parent;
            this.mount = parent.mount;
            this.mounted = null;
            this.id = FS.nextInode++;
            this.name = name;
            this.mode = mode;
            this.node_ops = {};
            this.stream_ops = {};
            this.rdev = rdev;
          };
  
          FS.FSNode.prototype = {};
  
          // compatibility
          var readMode = 292 | 73;
          var writeMode = 146;
  
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
  
        var node = new FS.FSNode(parent, name, mode, rdev);
  
        FS.hashAddNode(node);
  
        return node;
      },destroyNode:function (node) {
        FS.hashRemoveNode(node);
      },isRoot:function (node) {
        return node === node.parent;
      },isMountpoint:function (node) {
        return !!node.mounted;
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
        fd_start = fd_start || 0;
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
        // clone it, so we can return an instance of FSStream
        var newStream = new FS.FSStream();
        for (var p in stream) {
          newStream[p] = stream[p];
        }
        stream = newStream;
        var fd = FS.nextfd(fd_start, fd_end);
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },closeStream:function (fd) {
        FS.streams[fd] = null;
      },getStreamFromPtr:function (ptr) {
        return FS.streams[ptr - 1];
      },getPtrForStream:function (stream) {
        return stream ? stream.fd + 1 : 0;
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
      },getMounts:function (mount) {
        var mounts = [];
        var check = [mount];
  
        while (check.length) {
          var m = check.pop();
  
          mounts.push(m);
  
          check.push.apply(check, m.mounts);
        }
  
        return mounts;
      },syncfs:function (populate, callback) {
        if (typeof(populate) === 'function') {
          callback = populate;
          populate = false;
        }
  
        var mounts = FS.getMounts(FS.root.mount);
        var completed = 0;
  
        function done(err) {
          if (err) {
            if (!done.errored) {
              done.errored = true;
              return callback(err);
            }
            return;
          }
          if (++completed >= mounts.length) {
            callback(null);
          }
        };
  
        // sync all mounts
        mounts.forEach(function (mount) {
          if (!mount.type.syncfs) {
            return done(null);
          }
          mount.type.syncfs(mount, populate, done);
        });
      },mount:function (type, opts, mountpoint) {
        var root = mountpoint === '/';
        var pseudo = !mountpoint;
        var node;
  
        if (root && FS.root) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        } else if (!root && !pseudo) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
          mountpoint = lookup.path;  // use the absolute path
          node = lookup.node;
  
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
          }
  
          if (!FS.isDir(node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
          }
        }
  
        var mount = {
          type: type,
          opts: opts,
          mountpoint: mountpoint,
          mounts: []
        };
  
        // create a root node for the fs
        var mountRoot = type.mount(mount);
        mountRoot.mount = mount;
        mount.root = mountRoot;
  
        if (root) {
          FS.root = mountRoot;
        } else if (node) {
          // set as a mountpoint
          node.mounted = mount;
  
          // add the new mount to the current mount's children
          if (node.mount) {
            node.mount.mounts.push(mount);
          }
        }
  
        return mountRoot;
      },unmount:function (mountpoint) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
        if (!FS.isMountpoint(lookup.node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
  
        // destroy the nodes for this mount, and all its child mounts
        var node = lookup.node;
        var mount = node.mounted;
        var mounts = FS.getMounts(mount);
  
        Object.keys(FS.nameTable).forEach(function (hash) {
          var current = FS.nameTable[hash];
  
          while (current) {
            var next = current.name_next;
  
            if (mounts.indexOf(current.mount) !== -1) {
              FS.destroyNode(current);
            }
  
            current = next;
          }
        });
  
        // no longer a mountpoint
        node.mounted = null;
  
        // remove this mount from the child mounts
        var idx = node.mount.mounts.indexOf(mount);
        assert(idx !== -1);
        node.mount.mounts.splice(idx, 1);
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
        mode = mode !== undefined ? mode : 438 /* 0666 */;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },mkdir:function (path, mode) {
        mode = mode !== undefined ? mode : 511 /* 0777 */;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },mkdev:function (path, mode, dev) {
        if (typeof(dev) === 'undefined') {
          dev = mode;
          mode = 438 /* 0666 */;
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
        try {
          if (FS.trackingDelegate['willMovePath']) {
            FS.trackingDelegate['willMovePath'](old_path, new_path);
          }
        } catch(e) {
          console.log("FS.trackingDelegate['willMovePath']('"+old_path+"', '"+new_path+"') threw an exception: " + e.message);
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
        try {
          if (FS.trackingDelegate['onMovePath']) FS.trackingDelegate['onMovePath'](old_path, new_path);
        } catch(e) {
          console.log("FS.trackingDelegate['onMovePath']('"+old_path+"', '"+new_path+"') threw an exception: " + e.message);
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
        try {
          if (FS.trackingDelegate['willDeletePath']) {
            FS.trackingDelegate['willDeletePath'](path);
          }
        } catch(e) {
          console.log("FS.trackingDelegate['willDeletePath']('"+path+"') threw an exception: " + e.message);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
        try {
          if (FS.trackingDelegate['onDeletePath']) FS.trackingDelegate['onDeletePath'](path);
        } catch(e) {
          console.log("FS.trackingDelegate['onDeletePath']('"+path+"') threw an exception: " + e.message);
        }
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
        try {
          if (FS.trackingDelegate['willDeletePath']) {
            FS.trackingDelegate['willDeletePath'](path);
          }
        } catch(e) {
          console.log("FS.trackingDelegate['willDeletePath']('"+path+"') threw an exception: " + e.message);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
        try {
          if (FS.trackingDelegate['onDeletePath']) FS.trackingDelegate['onDeletePath'](path);
        } catch(e) {
          console.log("FS.trackingDelegate['onDeletePath']('"+path+"') threw an exception: " + e.message);
        }
      },readlink:function (path) {
        var lookup = FS.lookupPath(path);
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
        mode = typeof mode === 'undefined' ? 438 /* 0666 */ : mode;
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
        try {
          if (FS.trackingDelegate['onOpenFile']) {
            var trackingFlags = 0;
            if ((flags & 2097155) !== 1) {
              trackingFlags |= FS.tracking.openFlags.READ;
            }
            if ((flags & 2097155) !== 0) {
              trackingFlags |= FS.tracking.openFlags.WRITE;
            }
            FS.trackingDelegate['onOpenFile'](path, trackingFlags);
          }
        } catch(e) {
          console.log("FS.trackingDelegate['onOpenFile']('"+path+"', flags) threw an exception: " + e.message);
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
        try {
          if (stream.path && FS.trackingDelegate['onWriteToFile']) FS.trackingDelegate['onWriteToFile'](stream.path);
        } catch(e) {
          console.log("FS.trackingDelegate['onWriteToFile']('"+path+"') threw an exception: " + e.message);
        }
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
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
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
        }
        FS.close(stream);
        return ret;
      },writeFile:function (path, data, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'w';
        opts.encoding = opts.encoding || 'utf8';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        var stream = FS.open(path, opts.flags, opts.mode);
        if (opts.encoding === 'utf8') {
          var utf8 = new Runtime.UTF8Processor();
          var buf = new Uint8Array(utf8.processJSString(data));
          FS.write(stream, buf, 0, buf.length, 0, opts.canOwn);
        } else if (opts.encoding === 'binary') {
          FS.write(stream, data, 0, data.length, 0, opts.canOwn);
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
        HEAP32[((_stdin)>>2)]=FS.getPtrForStream(stdin);
        assert(stdin.fd === 0, 'invalid handle for stdin (' + stdin.fd + ')');
  
        var stdout = FS.open('/dev/stdout', 'w');
        HEAP32[((_stdout)>>2)]=FS.getPtrForStream(stdout);
        assert(stdout.fd === 1, 'invalid handle for stdout (' + stdout.fd + ')');
  
        var stderr = FS.open('/dev/stderr', 'w');
        HEAP32[((_stderr)>>2)]=FS.getPtrForStream(stderr);
        assert(stderr.fd === 2, 'invalid handle for stderr (' + stderr.fd + ')');
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
        if (typeof XMLHttpRequest !== 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
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
  
  
  
  
  function _mkport() { throw 'TODO' }var SOCKFS={mount:function (mount) {
        return FS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
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
              // runtimeConfig gets set to true if WebSocket runtime configuration is available.
              var runtimeConfig = (Module['websocket'] && ('object' === typeof Module['websocket']));
  
              // The default value is 'ws://' the replace is needed because the compiler replaces "//" comments with '#'
              // comments without checking context, so we'd end up with ws:#, the replace swaps the "#" for "//" again.
              var url = 'ws:#'.replace('#', '//');
  
              if (runtimeConfig) {
                if ('string' === typeof Module['websocket']['url']) {
                  url = Module['websocket']['url']; // Fetch runtime WebSocket URL config.
                }
              }
  
              if (url === 'ws://' || url === 'wss://') { // Is the supplied URL config just a prefix, if so complete it.
                url = url + addr + ':' + port;
              }
  
              // Make the WebSocket subprotocol (Sec-WebSocket-Protocol) default to binary if no configuration is set.
              var subProtocols = 'binary'; // The default value is 'binary'
  
              if (runtimeConfig) {
                if ('string' === typeof Module['websocket']['subprotocol']) {
                  subProtocols = Module['websocket']['subprotocol']; // Fetch runtime WebSocket subprotocol config.
                }
              }
  
              // The regex trims the string (removes spaces at the beginning and end, then splits the string by
              // <any space>,<any space> into an Array. Whitespace removal is important for Websockify and ws.
              subProtocols = subProtocols.replace(/^ +| +$/g,"").split(/ *, */);
  
              // The node ws library API for specifying optional subprotocol is slightly different than the browser's.
              var opts = ENVIRONMENT_IS_NODE ? {'protocol': subProtocols.toString()} : subProtocols;
  
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
    }
  
  function _fileno(stream) {
      // int fileno(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fileno.html
      stream = FS.getStreamFromPtr(stream);
      if (!stream) return -1;
      return stream.fd;
    }function _fwrite(ptr, size, nitems, stream) {
      // size_t fwrite(const void *restrict ptr, size_t size, size_t nitems, FILE *restrict stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fwrite.html
      var bytesToWrite = nitems * size;
      if (bytesToWrite == 0) return 0;
      var fd = _fileno(stream);
      var bytesWritten = _write(fd, ptr, bytesToWrite);
      if (bytesWritten == -1) {
        var streamObj = FS.getStreamFromPtr(stream);
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
                 HEAP32[(((varargs)+(argIndex+4))>>2)]];
  
        } else {
          type = 'i32'; // varargs are always i32, i64, or double
          ret = HEAP32[(((varargs)+(argIndex))>>2)];
        }
        argIndex += Runtime.getNativeFieldSize(type);
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
          if (precision < 0) {
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

  var _sinf=Math_sin;


  var _sqrtf=Math_sqrt;

  var _floorf=Math_floor;

  
  function _fputs(s, stream) {
      // int fputs(const char *restrict s, FILE *restrict stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fputs.html
      var fd = _fileno(stream);
      return _write(fd, s, _strlen(s));
    }
  
  function _fputc(c, stream) {
      // int fputc(int c, FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fputc.html
      var chr = unSign(c & 0xFF);
      HEAP8[((_fputc.ret)|0)]=chr;
      var fd = _fileno(stream);
      var ret = _write(fd, _fputc.ret, 1);
      if (ret == -1) {
        var streamObj = FS.getStreamFromPtr(stream);
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

  function _clock() {
      if (_clock.start === undefined) _clock.start = Date.now();
      return Math.floor((Date.now() - _clock.start) * (1000000/1000));
    }

  
  var ___cxa_caught_exceptions=[];function ___cxa_begin_catch(ptr) {
      __ZSt18uncaught_exceptionv.uncaught_exception--;
      ___cxa_caught_exceptions.push(___cxa_last_thrown_exception);
      return ptr;
    }

  function ___errno_location() {
      return ___errno_state;
    }

  
  function _emscripten_memcpy_big(dest, src, num) {
      HEAPU8.set(HEAPU8.subarray(src, src+num), dest);
      return dest;
    } 
  Module["_memcpy"] = _memcpy;

  function __ZNSt9exceptionD2Ev() {}

  var Browser={mainLoop:{scheduler:null,method:"",shouldPause:false,paused:false,queue:[],pause:function () {
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
        if (canvas) {
          // forced aspect ratio can be enabled by defining 'forcedAspectRatio' on Module
          // Module['forcedAspectRatio'] = 4 / 3;
          
          canvas.requestPointerLock = canvas['requestPointerLock'] ||
                                      canvas['mozRequestPointerLock'] ||
                                      canvas['webkitRequestPointerLock'] ||
                                      canvas['msRequestPointerLock'] ||
                                      function(){};
          canvas.exitPointerLock = document['exitPointerLock'] ||
                                   document['mozExitPointerLock'] ||
                                   document['webkitExitPointerLock'] ||
                                   document['msExitPointerLock'] ||
                                   function(){}; // no-op if function does not exist
          canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
  
          function pointerLockChange() {
            Browser.pointerLock = document['pointerLockElement'] === canvas ||
                                  document['mozPointerLockElement'] === canvas ||
                                  document['webkitPointerLockElement'] === canvas ||
                                  document['msPointerLockElement'] === canvas;
          }
  
          document.addEventListener('pointerlockchange', pointerLockChange, false);
          document.addEventListener('mozpointerlockchange', pointerLockChange, false);
          document.addEventListener('webkitpointerlockchange', pointerLockChange, false);
          document.addEventListener('mspointerlockchange', pointerLockChange, false);
  
          if (Module['elementPointerLock']) {
            canvas.addEventListener("click", function(ev) {
              if (!Browser.pointerLock && canvas.requestPointerLock) {
                canvas.requestPointerLock();
                ev.preventDefault();
              }
            }, false);
          }
        }
      },createContext:function (canvas, useWebGL, setInModule, webGLContextAttributes) {
        var ctx;
        var errorInfo = '?';
        function onContextCreationError(event) {
          errorInfo = event.statusMessage || errorInfo;
        }
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
          var canvasContainer = canvas.parentNode;
          if ((document['webkitFullScreenElement'] || document['webkitFullscreenElement'] ||
               document['mozFullScreenElement'] || document['mozFullscreenElement'] ||
               document['fullScreenElement'] || document['fullscreenElement'] ||
               document['msFullScreenElement'] || document['msFullscreenElement'] ||
               document['webkitCurrentFullScreenElement']) === canvasContainer) {
            canvas.cancelFullScreen = document['cancelFullScreen'] ||
                                      document['mozCancelFullScreen'] ||
                                      document['webkitCancelFullScreen'] ||
                                      document['msExitFullscreen'] ||
                                      document['exitFullscreen'] ||
                                      function() {};
            canvas.cancelFullScreen = canvas.cancelFullScreen.bind(document);
            if (Browser.lockPointer) canvas.requestPointerLock();
            Browser.isFullScreen = true;
            if (Browser.resizeCanvas) Browser.setFullScreenCanvasSize();
          } else {
            
            // remove the full screen specific parent of the canvas again to restore the HTML structure from before going full screen
            canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
            canvasContainer.parentNode.removeChild(canvasContainer);
            
            if (Browser.resizeCanvas) Browser.setWindowedCanvasSize();
          }
          if (Module['onFullScreen']) Module['onFullScreen'](Browser.isFullScreen);
          Browser.updateCanvasDimensions(canvas);
        }
  
        if (!Browser.fullScreenHandlersInstalled) {
          Browser.fullScreenHandlersInstalled = true;
          document.addEventListener('fullscreenchange', fullScreenChange, false);
          document.addEventListener('mozfullscreenchange', fullScreenChange, false);
          document.addEventListener('webkitfullscreenchange', fullScreenChange, false);
          document.addEventListener('MSFullscreenChange', fullScreenChange, false);
        }
  
        // create a new parent to ensure the canvas has no siblings. this allows browsers to optimize full screen performance when its parent is the full screen root
        var canvasContainer = document.createElement("div");
        canvas.parentNode.insertBefore(canvasContainer, canvas);
        canvasContainer.appendChild(canvas);
        
        // use parent of canvas as full screen root to allow aspect ratio correction (Firefox stretches the root to screen size)
        canvasContainer.requestFullScreen = canvasContainer['requestFullScreen'] ||
                                            canvasContainer['mozRequestFullScreen'] ||
                                            canvasContainer['msRequestFullscreen'] ||
                                           (canvasContainer['webkitRequestFullScreen'] ? function() { canvasContainer['webkitRequestFullScreen'](Element['ALLOW_KEYBOARD_INPUT']) } : null);
        canvasContainer.requestFullScreen();
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
        Module['noExitRuntime'] = true;
        return setTimeout(function() {
          if (!ABORT) func();
        }, timeout);
      },safeSetInterval:function (func, timeout) {
        Module['noExitRuntime'] = true;
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
      },getMouseWheelDelta:function (event) {
        return Math.max(-1, Math.min(1, event.type === 'DOMMouseScroll' ? event.detail : -event.wheelDelta));
      },mouseX:0,mouseY:0,mouseMovementX:0,mouseMovementY:0,touches:{},lastTouches:{},calculateMouseEvent:function (event) { // event should be mousemove, mousedown or mouseup
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
          var cw = Module["canvas"].width;
          var ch = Module["canvas"].height;
  
          // Neither .scrollX or .pageXOffset are defined in a spec, but
          // we prefer .scrollX because it is currently in a spec draft.
          // (see: http://www.w3.org/TR/2013/WD-cssom-view-20131217/)
          var scrollX = ((typeof window.scrollX !== 'undefined') ? window.scrollX : window.pageXOffset);
          var scrollY = ((typeof window.scrollY !== 'undefined') ? window.scrollY : window.pageYOffset);
  
          if (event.type === 'touchstart' || event.type === 'touchend' || event.type === 'touchmove') {
            var touch = event.touch;
            if (touch === undefined) {
              return; // the "touch" property is only defined in SDL
  
            }
            var adjustedX = touch.pageX - (scrollX + rect.left);
            var adjustedY = touch.pageY - (scrollY + rect.top);
  
            adjustedX = adjustedX * (cw / rect.width);
            adjustedY = adjustedY * (ch / rect.height);
  
            var coords = { x: adjustedX, y: adjustedY };
            
            if (event.type === 'touchstart') {
              Browser.lastTouches[touch.identifier] = coords;
              Browser.touches[touch.identifier] = coords;
            } else if (event.type === 'touchend' || event.type === 'touchmove') {
              Browser.lastTouches[touch.identifier] = Browser.touches[touch.identifier];
              Browser.touches[touch.identifier] = { x: adjustedX, y: adjustedY };
            } 
            return;
          }
  
          var x = event.pageX - (scrollX + rect.left);
          var y = event.pageY - (scrollY + rect.top);
  
          // the canvas might be CSS-scaled compared to its backbuffer;
          // SDL-using content will want mouse coordinates in terms
          // of backbuffer units.
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
        Browser.updateCanvasDimensions(canvas, width, height);
        if (!noUpdates) Browser.updateResizeListeners();
      },windowedWidth:0,windowedHeight:0,setFullScreenCanvasSize:function () {
        // check if SDL is available   
        if (typeof SDL != "undefined") {
        	var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        	flags = flags | 0x00800000; // set SDL_FULLSCREEN flag
        	HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        }
        Browser.updateResizeListeners();
      },setWindowedCanvasSize:function () {
        // check if SDL is available       
        if (typeof SDL != "undefined") {
        	var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        	flags = flags & ~0x00800000; // clear SDL_FULLSCREEN flag
        	HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        }
        Browser.updateResizeListeners();
      },updateCanvasDimensions:function (canvas, wNative, hNative) {
        if (wNative && hNative) {
          canvas.widthNative = wNative;
          canvas.heightNative = hNative;
        } else {
          wNative = canvas.widthNative;
          hNative = canvas.heightNative;
        }
        var w = wNative;
        var h = hNative;
        if (Module['forcedAspectRatio'] && Module['forcedAspectRatio'] > 0) {
          if (w/h < Module['forcedAspectRatio']) {
            w = Math.round(h * Module['forcedAspectRatio']);
          } else {
            h = Math.round(w / Module['forcedAspectRatio']);
          }
        }
        if (((document['webkitFullScreenElement'] || document['webkitFullscreenElement'] ||
             document['mozFullScreenElement'] || document['mozFullscreenElement'] ||
             document['fullScreenElement'] || document['fullscreenElement'] ||
             document['msFullScreenElement'] || document['msFullscreenElement'] ||
             document['webkitCurrentFullScreenElement']) === canvas.parentNode) && (typeof screen != 'undefined')) {
           var factor = Math.min(screen.width / w, screen.height / h);
           w = Math.round(w * factor);
           h = Math.round(h * factor);
        }
        if (Browser.resizeCanvas) {
          if (canvas.width  != w) canvas.width  = w;
          if (canvas.height != h) canvas.height = h;
          if (typeof canvas.style != 'undefined') {
            canvas.style.removeProperty( "width");
            canvas.style.removeProperty("height");
          }
        } else {
          if (canvas.width  != wNative) canvas.width  = wNative;
          if (canvas.height != hNative) canvas.height = hNative;
          if (typeof canvas.style != 'undefined') {
            if (w != wNative || h != hNative) {
              canvas.style.setProperty( "width", w + "px", "important");
              canvas.style.setProperty("height", h + "px", "important");
            } else {
              canvas.style.removeProperty( "width");
              canvas.style.removeProperty("height");
            }
          }
        }
      }};

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

  function _emscripten_run_script(ptr) {
      eval(Pointer_stringify(ptr));
    }

  
  function _malloc(bytes) {
      /* Over-allocate to make sure it is byte-aligned by 8.
       * This will leak memory, but this is only the dummy
       * implementation (replaced by dlmalloc normally) so
       * not an issue.
       */
      var ptr = Runtime.dynamicAlloc(bytes + 8);
      return (ptr+8) & 0xFFFFFFF8;
    }
  Module["_malloc"] = _malloc;function ___cxa_allocate_exception(size) {
      var ptr = _malloc(size + ___cxa_exception_header_size);
      return ptr + ___cxa_exception_header_size;
    }

  function _emscripten_cancel_main_loop() {
      Browser.mainLoop.scheduler = null;
      Browser.mainLoop.shouldPause = true;
    }

  var __ZTISt9exception=allocate([allocate([1,0,0,0,0,0,0], "i8", ALLOC_STATIC)+8, 0], "i32", ALLOC_STATIC);
FS.staticInit();__ATINIT__.unshift({ func: function() { if (!Module["noFSInit"] && !FS.init.initialized) FS.init() } });__ATMAIN__.push({ func: function() { FS.ignorePermissions = false } });__ATEXIT__.push({ func: function() { FS.quit() } });Module["FS_createFolder"] = FS.createFolder;Module["FS_createPath"] = FS.createPath;Module["FS_createDataFile"] = FS.createDataFile;Module["FS_createPreloadedFile"] = FS.createPreloadedFile;Module["FS_createLazyFile"] = FS.createLazyFile;Module["FS_createLink"] = FS.createLink;Module["FS_createDevice"] = FS.createDevice;
___errno_state = Runtime.staticAlloc(4); HEAP32[((___errno_state)>>2)]=0;
__ATINIT__.unshift({ func: function() { TTY.init() } });__ATEXIT__.push({ func: function() { TTY.shutdown() } });TTY.utf8 = new Runtime.UTF8Processor();
if (ENVIRONMENT_IS_NODE) { var fs = require("fs"); NODEFS.staticInit(); }
__ATINIT__.push({ func: function() { SOCKFS.root = FS.mount(SOCKFS, {}, null); } });
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
function invoke_iiii(index,a1,a2,a3) {
  try {
    return Module["dynCall_iiii"](index,a1,a2,a3);
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

function invoke_ii(index,a1) {
  try {
    return Module["dynCall_ii"](index,a1);
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
var asm=(function(global,env,buffer){"use asm";var a=new global.Int8Array(buffer);var b=new global.Int16Array(buffer);var c=new global.Int32Array(buffer);var d=new global.Uint8Array(buffer);var e=new global.Uint16Array(buffer);var f=new global.Uint32Array(buffer);var g=new global.Float32Array(buffer);var h=new global.Float64Array(buffer);var i=env.STACKTOP|0;var j=env.STACK_MAX|0;var k=env.tempDoublePtr|0;var l=env.ABORT|0;var m=env.__ZTISt9exception|0;var n=0;var o=0;var p=0;var q=0;var r=+env.NaN,s=+env.Infinity;var t=0,u=0,v=0,w=0,x=0.0,y=0,z=0,A=0,B=0.0;var C=0;var D=0;var E=0;var F=0;var G=0;var H=0;var I=0;var J=0;var K=0;var L=0;var M=global.Math.floor;var N=global.Math.abs;var O=global.Math.sqrt;var P=global.Math.pow;var Q=global.Math.cos;var R=global.Math.sin;var S=global.Math.tan;var T=global.Math.acos;var U=global.Math.asin;var V=global.Math.atan;var W=global.Math.atan2;var X=global.Math.exp;var Y=global.Math.log;var Z=global.Math.ceil;var _=global.Math.imul;var $=global.Math.fround;var aa=env.abort;var ba=env.assert;var ca=env.asmPrintInt;var da=env.asmPrintFloat;var ea=env.min;var fa=env.invoke_iiii;var ga=env.invoke_viiiii;var ha=env.invoke_vi;var ia=env.invoke_vii;var ja=env.invoke_ii;var ka=env.invoke_viii;var la=env.invoke_v;var ma=env.invoke_viif;var na=env.invoke_viiiiii;var oa=env.invoke_iii;var pa=env.invoke_iiiiii;var qa=env.invoke_viiii;var ra=env.___cxa_throw;var sa=env._emscripten_run_script;var ta=env._cosf;var ua=env._send;var va=env.__ZSt9terminatev;var wa=env.__reallyNegative;var xa=env.___cxa_is_number_type;var ya=env.___assert_fail;var za=env.___cxa_allocate_exception;var Aa=env.___cxa_find_matching_catch;var Ba=env._fflush;var Ca=env._pwrite;var Da=env.___setErrNo;var Ea=env._sbrk;var Fa=env.___cxa_begin_catch;var Ga=env._sinf;var Ha=env._fileno;var Ia=env.___resumeException;var Ja=env.__ZSt18uncaught_exceptionv;var Ka=env._sysconf;var La=env._clock;var Ma=env._emscripten_memcpy_big;var Na=env._puts;var Oa=env._mkport;var Pa=env._floorf;var Qa=env._sqrtf;var Ra=env._write;var Sa=env._emscripten_set_main_loop;var Ta=env.___errno_location;var Ua=env.__ZNSt9exceptionD2Ev;var Va=env._printf;var Wa=env.___cxa_does_inherit;var Xa=env.__exit;var Ya=env._fputc;var Za=env._abort;var _a=env._fwrite;var $a=env._time;var ab=env._fprintf;var bb=env._emscripten_cancel_main_loop;var cb=env.__formatString;var db=env._fputs;var eb=env._exit;var fb=env.___cxa_pure_virtual;var gb=$(0);const hb=$(0);
// EMSCRIPTEN_START_FUNCS
function ub(a){a=a|0;var b=0;b=i;i=i+a|0;i=i+7&-8;return b|0}function vb(){return i|0}function wb(a){a=a|0;i=a}function xb(a,b){a=a|0;b=b|0;if((n|0)==0){n=a;o=b}}function yb(b){b=b|0;a[k]=a[b];a[k+1|0]=a[b+1|0];a[k+2|0]=a[b+2|0];a[k+3|0]=a[b+3|0]}function zb(b){b=b|0;a[k]=a[b];a[k+1|0]=a[b+1|0];a[k+2|0]=a[b+2|0];a[k+3|0]=a[b+3|0];a[k+4|0]=a[b+4|0];a[k+5|0]=a[b+5|0];a[k+6|0]=a[b+6|0];a[k+7|0]=a[b+7|0]}function Ab(a){a=a|0;C=a}function Bb(a){a=a|0;D=a}function Cb(a){a=a|0;E=a}function Db(a){a=a|0;F=a}function Eb(a){a=a|0;G=a}function Fb(a){a=a|0;H=a}function Gb(a){a=a|0;I=a}function Hb(a){a=a|0;J=a}function Ib(a){a=a|0;K=a}function Jb(a){a=a|0;L=a}function Kb(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,h=hb,j=hb,k=0,l=hb,m=0,n=hb;d=i;e=c[4]|0;f=i;i=i+((4*e|0)+15&-16)|0;k=(e|0)>0;if(k){m=0;j=$(0.0);do{l=$($($(c[b+(m<<2)>>2]|0)/$(1.0e6))*$(1.0e3));g[f+(m<<2)>>2]=l;j=$(j+l);m=m+1|0}while((m|0)<(e|0));h=$(e|0);j=$(j/h);g[a>>2]=j;if(k){k=0;l=$(0.0);do{n=$($(g[f+(k<<2)>>2])-j);l=$(l+$(n*n));k=k+1|0}while((k|0)<(e|0))}else{l=$(0.0)}}else{h=$(e|0);g[a>>2]=$($(0.0)/h);l=$(0.0)}g[a+4>>2]=$(O($(l/h)));i=d;return}function Lb(d,e){d=d|0;e=e|0;var f=0,h=0,j=0,k=hb,l=0,m=0,n=0,o=hb,p=hb,q=0,r=0,s=0,t=0,u=hb,v=0,w=0,x=0,y=0,z=0,A=hb,B=hb;f=i;i=i+240|0;j=f;n=f+224|0;h=f+168|0;m=f+160|0;l=f+152|0;a:do{if((d|0)>1){r=a[c[e+4>>2]|0]|0;switch(r|0){case 49:{c[2]=5;c[4]=35;s=35;r=5;break a};case 50:{c[2]=32;c[4]=161;s=161;r=32;break a};case 51:{q=5;break a};case 52:{c[2]=320;c[4]=2331;s=2331;r=320;break a};case 53:{c[2]=640;c[4]=5661;s=5661;r=640;break a};case 48:{y=0;i=f;return y|0};default:{c[j>>2]=r+ -48;Va(80,j|0)|0;y=-1;i=f;return y|0}}}else{q=5}}while(0);if((q|0)==5){c[2]=64;c[4]=333;s=333;r=64}q=s+r|0;c[4]=q;c[2]=0;c[8]=Ze(q>>>0>1073741823?-1:q<<2)|0;g[n>>2]=$(0.0);g[n+4>>2]=$(-10.0);t=Ye(103028)|0;Oc(t,n);c[6]=t;Qc(t,0);c[j+44>>2]=0;t=j+4|0;s=j+36|0;c[t+0>>2]=0;c[t+4>>2]=0;c[t+8>>2]=0;c[t+12>>2]=0;c[t+16>>2]=0;c[t+20>>2]=0;c[t+24>>2]=0;c[t+28>>2]=0;a[s]=1;a[j+37|0]=1;a[j+38|0]=0;a[j+39|0]=0;c[j>>2]=0;a[j+40|0]=1;g[j+48>>2]=$(1.0);s=Pc(c[6]|0,j)|0;c[h>>2]=240;c[h+4>>2]=1;g[h+8>>2]=$(.009999999776482582);t=h+28|0;c[t+0>>2]=0;c[t+4>>2]=0;c[t+8>>2]=0;c[t+12>>2]=0;b[t+16>>1]=0;g[m>>2]=$(-40.0);g[m+4>>2]=$(0.0);g[l>>2]=$(40.0);g[l+4>>2]=$(0.0);Rb(h,m,l);nc(s,h,$(0.0))|0;c[j>>2]=504;c[j+4>>2]=2;g[j+8>>2]=$(.009999999776482582);c[j+148>>2]=0;g[j+12>>2]=$(0.0);g[j+16>>2]=$(0.0);Zb(j,$(.5),$(.5));s=h+44|0;t=h+4|0;m=h+36|0;v=h+37|0;w=h+38|0;x=h+39|0;y=h+40|0;r=h+48|0;q=h+4|0;p=$(-7.0);o=$(.75);n=0;do{u=p;k=o;l=n;do{c[s>>2]=0;c[t+0>>2]=0;c[t+4>>2]=0;c[t+8>>2]=0;c[t+12>>2]=0;c[t+16>>2]=0;c[t+20>>2]=0;c[t+24>>2]=0;c[t+28>>2]=0;a[m]=1;a[v]=1;a[w]=0;a[x]=0;a[y]=1;g[r>>2]=$(1.0);c[h>>2]=2;B=$(u);A=$(k);z=q;g[z>>2]=B;g[z+4>>2]=A;z=Pc(c[6]|0,h)|0;nc(z,j,$(5.0))|0;c[14]=z;u=$(u+$(1.125));k=$(k+$(0.0));l=l+1|0}while((l|0)<40);p=$(p+$(.5625));o=$(o+$(1.0));n=n+1|0}while((n|0)<40);if((c[2]|0)>0){h=0;do{Tc(c[6]|0,$(.01666666753590107),3,3);h=h+1|0}while((h|0)<(c[2]|0))}if((d|0)>2){z=(a[c[e+8>>2]|0]|0)+ -48|0;c[18]=z;if((z|0)!=0){Na(208)|0;Sa(2,60,1);z=0;i=f;return z|0}}else{c[18]=0}while(1){Ob();if((c[16]|0)>(c[4]|0)){e=0;break}}i=f;return e|0}function Mb(a){a=a|0;return}function Nb(a){a=a|0;return}function Ob(){var a=0,b=0,d=0,e=0,f=0.0,j=0.0,l=0.0,m=0.0;a=i;i=i+48|0;b=a;d=a+32|0;e=c[16]|0;if((e|0)>=(c[4]|0)){c[16]=e+1;Kb(d,c[8]|0);m=+$(g[d>>2]);l=+$(g[d+4>>2]);j=+$($($(c[10]|0)/$(1.0e6))*$(1.0e3));f=+$($($(c[12]|0)/$(1.0e6))*$(1.0e3));h[k>>3]=m;c[b>>2]=c[k>>2];c[b+4>>2]=c[k+4>>2];e=b+8|0;h[k>>3]=l;c[e>>2]=c[k>>2];c[e+4>>2]=c[k+4>>2];e=b+16|0;h[k>>3]=j;c[e>>2]=c[k>>2];c[e+4>>2]=c[k+4>>2];e=b+24|0;h[k>>3]=f;c[e>>2]=c[k>>2];c[e+4>>2]=c[k+4>>2];Va(96,b|0)|0;sa(152);if((c[18]|0)==0){i=a;return}bb();i=a;return}d=La()|0;Tc(c[6]|0,$(.01666666753590107),3,3);d=(La()|0)-d|0;b=c[16]|0;c[(c[8]|0)+(b<<2)>>2]=d;if((d|0)<(c[10]|0)){c[10]=d}if((d|0)>(c[12]|0)){c[12]=d}c[16]=b+1;i=a;return}function Pb(a){a=a|0;var b=0;b=i;_e(a);i=b;return}function Qb(a){a=a|0;var b=0;b=i;_e(a);i=b;return}function Rb(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0;g=d;d=c[g+4>>2]|0;f=b+12|0;c[f>>2]=c[g>>2];c[f+4>>2]=d;f=e;e=c[f+4>>2]|0;d=b+20|0;c[d>>2]=c[f>>2];c[d+4>>2]=e;a[b+44|0]=0;a[b+45|0]=0;return}function Sb(a,d){a=a|0;d=d|0;var e=0,f=0,h=0,j=0;e=i;d=fc(d,48)|0;if((d|0)==0){d=0}else{c[d>>2]=240;c[d+4>>2]=1;g[d+8>>2]=$(.009999999776482582);f=d+28|0;c[f+0>>2]=0;c[f+4>>2]=0;c[f+8>>2]=0;c[f+12>>2]=0;b[f+16>>1]=0}j=a+4|0;h=c[j+4>>2]|0;f=d+4|0;c[f>>2]=c[j>>2];c[f+4>>2]=h;f=d+12|0;a=a+12|0;c[f+0>>2]=c[a+0>>2];c[f+4>>2]=c[a+4>>2];c[f+8>>2]=c[a+8>>2];c[f+12>>2]=c[a+12>>2];c[f+16>>2]=c[a+16>>2];c[f+20>>2]=c[a+20>>2];c[f+24>>2]=c[a+24>>2];c[f+28>>2]=c[a+28>>2];b[f+32>>1]=b[a+32>>1]|0;i=e;return d|0}function Tb(a){a=a|0;return 1}function Ub(a,b,c){a=a|0;b=b|0;c=c|0;return 0}function Vb(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=hb,h=hb,j=hb,k=hb,l=hb,m=hb,n=hb,o=hb,p=hb,q=hb,r=hb,s=hb,t=hb;e=i;k=$(g[c>>2]);j=$(g[d>>2]);k=$(k-j);f=$(g[c+4>>2]);m=$(g[d+4>>2]);f=$(f-m);o=$(g[d+12>>2]);l=$(k*o);h=$(g[d+8>>2]);l=$(l+$(f*h));k=$($(o*f)-$(k*h));j=$($(g[c+8>>2])-j);m=$($(g[c+12>>2])-m);f=$($($(o*j)+$(h*m))-l);j=$($($(o*m)-$(h*j))-k);d=a+12|0;h=$(g[d>>2]);m=$(g[d+4>>2]);d=a+20|0;o=$(g[d>>2]);o=$(o-h);p=$($(g[d+4>>2])-m);s=$(-o);n=$($(o*o)+$(p*p));q=$(O($(n)));if(q<$(1.1920928955078125e-7)){q=p}else{t=$($(1.0)/q);q=$(p*t);s=$(t*s)}r=$($($(m-k)*s)+$($(h-l)*q));t=$($(j*s)+$(f*q));if(t==$(0.0)){d=0;i=e;return d|0}t=$(r/t);if(t<$(0.0)){d=0;i=e;return d|0}if($(g[c+16>>2])<t|n==$(0.0)){d=0;i=e;return d|0}p=$($($(o*$($(l+$(f*t))-h))+$(p*$($(k+$(j*t))-m)))/n);if(p<$(0.0)|p>$(1.0)){d=0;i=e;return d|0}g[b+8>>2]=t;if(r>$(0.0)){r=$(-q);t=$(-s);s=$(r);t=$(t);d=b;g[d>>2]=s;g[d+4>>2]=t;d=1;i=e;return d|0}else{r=$(q);t=$(s);d=b;g[d>>2]=r;g[d+4>>2]=t;d=1;i=e;return d|0}return 0}function Wb(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=hb,f=hb,h=hb,j=hb,k=hb,l=hb,m=hb,n=hb,o=hb;d=i;k=$(g[c+12>>2]);n=$(g[a+12>>2]);h=$(k*n);m=$(g[c+8>>2]);e=$(g[a+16>>2]);h=$(h-$(m*e));o=$(g[c>>2]);h=$(o+h);e=$($(n*m)+$(k*e));n=$(g[c+4>>2]);e=$(e+n);l=$(g[a+20>>2]);j=$(k*l);f=$(g[a+24>>2]);j=$(o+$(j-$(m*f)));f=$(n+$($(m*l)+$(k*f)));k=$(g[a+8>>2]);l=$((h<j?h:j)-k);o=$((e<f?e:f)-k);n=$(l);o=$(o);c=b;g[c>>2]=n;g[c+4>>2]=o;h=$(k+(h>j?h:j));o=$(k+(e>f?e:f));n=$(h);o=$(o);c=b+8|0;g[c>>2]=n;g[c+4>>2]=o;i=d;return}function Xb(a,b,c){a=a|0;b=b|0;c=$(c);var d=0,e=hb;d=i;g[b>>2]=$(0.0);e=$(g[a+12>>2]);e=$(e+$(g[a+20>>2]));c=$(g[a+16>>2]);e=$(e*$(.5));c=$($(c+$(g[a+24>>2]))*$(.5));e=$(e);c=$(c);a=b+4|0;g[a>>2]=e;g[a+4>>2]=c;g[b+12>>2]=$(0.0);i=d;return}function Yb(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,h=0;d=i;b=fc(b,152)|0;if((b|0)==0){b=0}else{c[b>>2]=504;c[b+4>>2]=2;g[b+8>>2]=$(.009999999776482582);c[b+148>>2]=0;g[b+12>>2]=$(0.0);g[b+16>>2]=$(0.0)}h=a+4|0;f=c[h+4>>2]|0;e=b+4|0;c[e>>2]=c[h>>2];c[e+4>>2]=f;ff(b+12|0,a+12|0,140)|0;i=d;return b|0}function Zb(a,b,d){a=a|0;b=$(b);d=$(d);var e=hb,f=hb;c[a+148>>2]=4;e=$(-b);f=$(-d);g[a+20>>2]=e;g[a+24>>2]=f;g[a+28>>2]=b;g[a+32>>2]=f;g[a+36>>2]=b;g[a+40>>2]=d;g[a+44>>2]=e;g[a+48>>2]=d;g[a+84>>2]=$(0.0);g[a+88>>2]=$(-1.0);g[a+92>>2]=$(1.0);g[a+96>>2]=$(0.0);g[a+100>>2]=$(0.0);g[a+104>>2]=$(1.0);g[a+108>>2]=$(-1.0);g[a+112>>2]=$(0.0);g[a+12>>2]=$(0.0);g[a+16>>2]=$(0.0);return}function _b(a){a=a|0;return 1}function $b(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=hb,h=hb,j=0,k=hb,l=hb,m=hb;e=i;k=$(g[d>>2]);k=$(k-$(g[b>>2]));l=$(g[d+4>>2]);l=$(l-$(g[b+4>>2]));m=$(g[b+12>>2]);f=$(k*m);h=$(g[b+8>>2]);f=$(f+$(l*h));h=$($(m*l)-$(k*h));b=c[a+148>>2]|0;if((b|0)>0){d=0}else{j=1;i=e;return j|0}while(1){l=$(f-$(g[a+(d<<3)+20>>2]));m=$(h-$(g[a+(d<<3)+24>>2]));l=$(l*$(g[a+(d<<3)+84>>2]));j=d+1|0;if($(l+$(m*$(g[a+(d<<3)+88>>2])))>$(0.0)){b=0;a=4;break}if((j|0)<(b|0)){d=j}else{b=1;a=4;break}}if((a|0)==4){i=e;return b|0}return 0}function ac(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var h=0,j=hb,k=0,l=hb,m=hb,n=hb,o=hb,p=hb,q=0,r=0,s=0,t=hb,u=hb,v=hb,w=hb,x=hb;f=i;l=$(g[d>>2]);m=$(g[e>>2]);l=$(l-m);n=$(g[d+4>>2]);u=$(g[e+4>>2]);n=$(n-u);k=e+12|0;t=$(g[k>>2]);o=$(l*t);e=e+8|0;v=$(g[e>>2]);o=$(o+$(n*v));l=$($(t*n)-$(l*v));m=$($(g[d+8>>2])-m);u=$($(g[d+12>>2])-u);n=$($($(t*m)+$(v*u))-o);m=$($($(t*u)-$(v*m))-l);d=d+16|0;q=c[a+148>>2]|0;do{if((q|0)>0){s=0;r=-1;p=$(0.0);t=$(g[d>>2]);a:while(1){x=$($(g[a+(s<<3)+20>>2])-o);u=$($(g[a+(s<<3)+24>>2])-l);w=$(g[a+(s<<3)+84>>2]);x=$(x*w);v=$(g[a+(s<<3)+88>>2]);u=$(x+$(u*v));v=$($(n*w)+$(m*v));do{if(v==$(0.0)){if(u<$(0.0)){a=0;q=18;break a}}else{if(v<$(0.0)?u<$(p*v):0){r=s;p=$(u/v);break}if(v>$(0.0)?u<$(t*v):0){t=$(u/v)}}}while(0);s=s+1|0;if(t<p){a=0;q=18;break}if((s|0)>=(q|0)){q=13;break}}if((q|0)==13){if(p>=$(0.0)){h=r;j=p;break}ya(376,328,249,424)}else if((q|0)==18){i=f;return a|0}}else{h=-1;j=$(0.0)}}while(0);if(!(j<=$(g[d>>2]))){ya(376,328,249,424)}if(!((h|0)>-1)){s=0;i=f;return s|0}g[b+8>>2]=j;v=$(g[k>>2]);t=$(g[a+(h<<3)+84>>2]);w=$(v*t);u=$(g[e>>2]);x=$(g[a+(h<<3)+88>>2]);w=$(w-$(u*x));x=$($(t*u)+$(v*x));w=$(w);x=$(x);s=b;g[s>>2]=w;g[s+4>>2]=x;s=1;i=f;return s|0}function bc(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=hb,h=hb,j=hb,k=hb,l=hb,m=hb,n=hb,o=hb,p=0,q=hb,r=hb,s=hb;e=i;j=$(g[d+12>>2]);k=$(g[a+20>>2]);l=$(j*k);h=$(g[d+8>>2]);o=$(g[a+24>>2]);l=$(l-$(h*o));f=$(g[d>>2]);l=$(f+l);o=$($(k*h)+$(j*o));k=$(g[d+4>>2]);o=$(o+k);d=c[a+148>>2]|0;if((d|0)>1){m=l;n=o;p=1;do{s=$(g[a+(p<<3)+20>>2]);r=$(j*s);q=$(g[a+(p<<3)+24>>2]);r=$(f+$(r-$(h*q)));q=$($($(s*h)+$(j*q))+k);m=m<r?m:r;n=n<q?n:q;l=l>r?l:r;o=o>q?o:q;p=p+1|0}while((p|0)<(d|0))}else{n=o;m=l}s=$(g[a+8>>2]);q=$(m-s);r=$(n-s);q=$(q);r=$(r);p=b;g[p>>2]=q;g[p+4>>2]=r;r=$(l+s);s=$(o+s);r=$(r);s=$(s);p=b+8|0;g[p>>2]=r;g[p+4>>2]=s;i=e;return}function cc(a,b,d){a=a|0;b=b|0;d=$(d);var e=0,f=0,h=hb,j=hb,k=hb,l=hb,m=hb,n=hb,o=0,p=hb,q=0,r=0,s=0,t=0,u=hb,v=0,w=hb,x=hb,y=hb,z=hb;e=i;f=c[a+148>>2]|0;if((f|0)>2){j=$(0.0);h=$(0.0);o=0}else{ya(432,328,306,456)}do{h=$(h+$(g[a+(o<<3)+20>>2]));j=$(j+$(g[a+(o<<3)+24>>2]));o=o+1|0}while((o|0)<(f|0));n=$($(1.0)/$(f|0));h=$(h*n);n=$(j*n);s=a+20|0;v=a+24|0;l=$(0.0);m=$(0.0);j=$(0.0);k=$(0.0);t=0;do{u=$($(g[a+(t<<3)+20>>2])-h);p=$($(g[a+(t<<3)+24>>2])-n);t=t+1|0;o=(t|0)<(f|0);if(o){q=a+(t<<3)+20|0;r=a+(t<<3)+24|0}else{q=s;r=v}x=$($(g[q>>2])-h);w=$($(g[r>>2])-n);y=$($(u*w)-$(p*x));z=$(y*$(.5));k=$(k+z);z=$(z*$(.3333333432674408));l=$(l+$($(u+x)*z));m=$(m+$($(p+w)*z));j=$(j+$($(y*$(.0833333358168602))*$($($(x*x)+$($(u*u)+$(u*x)))+$($(w*w)+$($(p*p)+$(p*w))))))}while(o);p=$(k*d);g[b>>2]=p;if(k>$(1.1920928955078125e-7)){z=$($(1.0)/k);y=$(l*z);z=$(m*z);w=$(h+y);x=$(n+z);n=$(w);u=$(x);v=b+4|0;g[v>>2]=n;g[v+4>>2]=u;g[b+12>>2]=$($(j*d)+$(p*$($($(w*w)+$(x*x))-$($(y*y)+$(z*z)))));i=e;return}else{ya(472,328,352,456)}}function dc(b){b=b|0;var d=0,e=0,f=0,g=0;e=i;f=b+8|0;c[f>>2]=128;c[b+4>>2]=0;g=hc(1024)|0;c[b>>2]=g;df(g|0,0,c[f>>2]<<3|0)|0;f=b+12|0;b=f+56|0;do{c[f>>2]=0;f=f+4|0}while((f|0)<(b|0));if((a[1280]|0)==0){b=1;f=0}else{i=e;return}do{if((f|0)>=14){d=3;break}if((b|0)>(c[576+(f<<2)>>2]|0)){f=f+1|0;a[632+b|0]=f}else{a[632+b|0]=f}b=b+1|0}while((b|0)<641);if((d|0)==3){ya(1288,1312,73,1352)}a[1280]=1;i=e;return}function ec(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;d=a+4|0;e=c[a>>2]|0;if((c[d>>2]|0)>0){f=0}else{f=e;ic(f);i=b;return}do{ic(c[e+(f<<3)+4>>2]|0);f=f+1|0;e=c[a>>2]|0}while((f|0)<(c[d>>2]|0));ic(e);i=b;return}function fc(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0;e=i;if((d|0)==0){l=0;i=e;return l|0}if((d|0)<=0){ya(1376,1312,104,1392)}if((d|0)>640){l=hc(d)|0;i=e;return l|0}l=a[632+d|0]|0;g=l&255;if(!((l&255)<14)){ya(1408,1312,112,1392)}d=b+(g<<2)+12|0;f=c[d>>2]|0;if((f|0)!=0){c[d>>2]=c[f>>2];l=f;i=e;return l|0}f=b+4|0;h=c[f>>2]|0;j=b+8|0;if((h|0)==(c[j>>2]|0)){l=c[b>>2]|0;h=h+128|0;c[j>>2]=h;h=hc(h<<3)|0;c[b>>2]=h;ff(h|0,l|0,c[f>>2]<<3|0)|0;df((c[b>>2]|0)+(c[f>>2]<<3)|0,0,1024)|0;ic(l);h=c[f>>2]|0}l=c[b>>2]|0;j=hc(16384)|0;b=l+(h<<3)+4|0;c[b>>2]=j;g=c[576+(g<<2)>>2]|0;c[l+(h<<3)>>2]=g;h=16384/(g|0)|0;if((_(h,g)|0)>=16385){ya(1448,1312,140,1392)}h=h+ -1|0;if((h|0)>0){l=0;while(1){k=l+1|0;c[j+(_(l,g)|0)>>2]=j+(_(k,g)|0);j=c[b>>2]|0;if((k|0)==(h|0)){break}else{l=k}}}c[j+(_(h,g)|0)>>2]=0;c[d>>2]=c[c[b>>2]>>2];c[f>>2]=(c[f>>2]|0)+1;l=c[b>>2]|0;i=e;return l|0}function gc(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;f=i;if((e|0)==0){i=f;return}if((e|0)<=0){ya(1376,1312,164,1488)}if((e|0)>640){ic(d);i=f;return}e=a[632+e|0]|0;if(!((e&255)<14)){ya(1408,1312,173,1488)}e=b+((e&255)<<2)+12|0;c[d>>2]=c[e>>2];c[e>>2]=d;i=f;return}function hc(a){a=a|0;var b=0;b=i;a=We(a)|0;i=b;return a|0}function ic(a){a=a|0;var b=0;b=i;Xe(a);i=b;return}function jc(d,e,f){d=d|0;e=e|0;f=f|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=hb;h=i;n=e+4|0;r=$(g[n>>2]);q=r==r&$(0.0)==$(0.0);q=q&r>$(-s);if(!(q&r<$(s))){ya(1496,1520,27,1552)}r=$(g[e+8>>2]);q=r==r&$(0.0)==$(0.0);q=q&r>$(-s);if(!(q&r<$(s))){ya(1496,1520,27,1552)}k=e+16|0;r=$(g[k>>2]);q=r==r&$(0.0)==$(0.0);q=q&r>$(-s);if(!(q&r<$(s))){ya(1560,1520,28,1552)}r=$(g[e+20>>2]);q=r==r&$(0.0)==$(0.0);q=q&r>$(-s);if(!(q&r<$(s))){ya(1560,1520,28,1552)}l=e+12|0;r=$(g[l>>2]);q=r==r&$(0.0)==$(0.0);q=q&r>$(-s);if(!(q&r<$(s))){ya(1592,1520,29,1552)}m=e+24|0;r=$(g[m>>2]);q=r==r&$(0.0)==$(0.0);q=q&r>$(-s);if(!(q&r<$(s))){ya(1616,1520,30,1552)}j=e+32|0;r=$(g[j>>2]);q=r==r&$(0.0)==$(0.0);q=q&r>$(-s);if(!(r>=$(0.0))|q&r<$(s)^1){ya(1648,1520,31,1552)}o=e+28|0;r=$(g[o>>2]);q=r==r&$(0.0)==$(0.0);q=q&r>$(-s);if(!(r>=$(0.0))|q&r<$(s)^1){ya(1712,1520,32,1552)}p=d+4|0;q=(a[e+39|0]|0)==0?0:8;b[p>>1]=q;if((a[e+38|0]|0)!=0){q=(q&65535|16)&65535;b[p>>1]=q}if((a[e+36|0]|0)!=0){q=(q&65535|4)&65535;b[p>>1]=q}if((a[e+37|0]|0)!=0){q=(q&65535|2)&65535;b[p>>1]=q}if((a[e+40|0]|0)!=0){b[p>>1]=q&65535|32}c[d+88>>2]=f;p=n;q=c[p>>2]|0;p=c[p+4>>2]|0;n=d+12|0;c[n>>2]=q;c[n+4>>2]=p;r=$(g[l>>2]);g[d+20>>2]=$(+R(+r));g[d+24>>2]=$(+Q(+r));g[d+28>>2]=$(0.0);g[d+32>>2]=$(0.0);n=d+36|0;c[n>>2]=q;c[n+4>>2]=p;n=d+44|0;c[n>>2]=q;c[n+4>>2]=p;g[d+52>>2]=$(g[l>>2]);g[d+56>>2]=$(g[l>>2]);g[d+60>>2]=$(0.0);c[d+108>>2]=0;c[d+112>>2]=0;c[d+92>>2]=0;c[d+96>>2]=0;n=k;p=c[n+4>>2]|0;q=d+64|0;c[q>>2]=c[n>>2];c[q+4>>2]=p;g[d+72>>2]=$(g[m>>2]);g[d+132>>2]=$(g[o>>2]);g[d+136>>2]=$(g[j>>2]);g[d+140>>2]=$(g[e+48>>2]);g[d+76>>2]=$(0.0);g[d+80>>2]=$(0.0);g[d+84>>2]=$(0.0);g[d+144>>2]=$(0.0);q=c[e>>2]|0;c[d>>2]=q;j=d+116|0;if((q|0)==2){g[j>>2]=$(1.0);g[d+120>>2]=$(1.0);p=d+124|0;g[p>>2]=$(0.0);p=d+128|0;g[p>>2]=$(0.0);p=e+44|0;p=c[p>>2]|0;q=d+148|0;c[q>>2]=p;q=d+100|0;c[q>>2]=0;q=d+104|0;c[q>>2]=0;i=h;return}else{g[j>>2]=$(0.0);g[d+120>>2]=$(0.0);p=d+124|0;g[p>>2]=$(0.0);p=d+128|0;g[p>>2]=$(0.0);p=e+44|0;p=c[p>>2]|0;q=d+148|0;c[q>>2]=p;q=d+100|0;c[q>>2]=0;q=d+104|0;c[q>>2]=0;i=h;return}}function kc(a){a=a|0;var d=hb,e=0,f=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=hb,s=hb,t=hb,u=0,v=hb,w=hb,x=0,y=hb;h=i;i=i+16|0;n=h;l=a+116|0;m=a+120|0;f=a+124|0;j=a+128|0;e=a+28|0;g[e>>2]=$(0.0);g[a+32>>2]=$(0.0);c[l+0>>2]=0;c[l+4>>2]=0;c[l+8>>2]=0;c[l+12>>2]=0;o=c[a>>2]|0;if((o|0)==1|(o|0)==0){q=a+12|0;p=c[q>>2]|0;q=c[q+4>>2]|0;u=a+36|0;c[u>>2]=p;c[u+4>>2]=q;u=a+44|0;c[u>>2]=p;c[u+4>>2]=q;g[a+52>>2]=$(g[a+56>>2]);i=h;return}else if((o|0)==2){u=3784;t=$(g[u>>2]);v=$(g[u+4>>2]);u=c[a+100>>2]|0;if((u|0)!=0){o=n+4|0;p=n+8|0;q=n+12|0;r=$(0.0);s=$(0.0);do{w=$(g[u>>2]);if(!(w==$(0.0))){x=c[u+12>>2]|0;pb[c[(c[x>>2]|0)+28>>2]&3](x,n,w);r=$(g[n>>2]);s=$(r+$(g[l>>2]));g[l>>2]=s;w=$(r*$(g[o>>2]));t=$(t+w);v=$(v+$(r*$(g[p>>2])));r=$(g[q>>2]);r=$(r+$(g[f>>2]));g[f>>2]=r}u=c[u+4>>2]|0}while((u|0)!=0);if(s>$(0.0)){w=$($(1.0)/s);g[m>>2]=w;t=$(t*w);v=$(v*w)}else{k=11}}else{r=$(0.0);k=11}if((k|0)==11){g[l>>2]=$(1.0);g[m>>2]=$(1.0);s=$(1.0)}do{if(r>$(0.0)?(b[a+4>>1]&16)==0:0){r=$(r-$($($(v*v)+$(t*t))*s));g[f>>2]=r;if(r>$(0.0)){d=$($(1.0)/r);break}else{ya(1872,1520,319,1856)}}else{k=17}}while(0);if((k|0)==17){g[f>>2]=$(0.0);d=$(0.0)}g[j>>2]=d;x=a+44|0;u=x;w=$(g[u>>2]);r=$(g[u+4>>2]);s=$(t);d=$(v);u=e;g[u>>2]=s;g[u+4>>2]=d;d=$(g[a+24>>2]);s=$(d*t);y=$(g[a+20>>2]);s=$(s-$(y*v));s=$($(g[a+12>>2])+s);v=$($(t*y)+$(d*v));v=$(v+$(g[a+16>>2]));d=$(s);t=$(v);g[x>>2]=d;g[x+4>>2]=t;x=a+36|0;g[x>>2]=d;g[x+4>>2]=t;t=$(g[a+72>>2]);v=$(t*$(v-r));w=$(t*$(s-w));x=a+64|0;g[x>>2]=$($(g[x>>2])-v);x=a+68|0;g[x>>2]=$(w+$(g[x>>2]));i=h;return}else{ya(1824,1520,284,1856)}}function lc(a){a=a|0;var b=0,d=0,e=0,f=0,h=hb,j=hb,k=hb,l=hb,m=hb;b=i;i=i+16|0;e=b;k=$(g[a+52>>2]);l=$(+R(+k));g[e+8>>2]=l;k=$(+Q(+k));g[e+12>>2]=k;m=$(g[a+28>>2]);j=$(k*m);h=$(g[a+32>>2]);j=$(j-$(l*h));h=$($(m*l)+$(k*h));j=$($(g[a+36>>2])-j);h=$($(g[a+40>>2])-h);j=$(j);h=$(h);d=e;g[d>>2]=j;g[d+4>>2]=h;d=(c[a+88>>2]|0)+102872|0;f=c[a+100>>2]|0;if((f|0)==0){i=b;return}a=a+12|0;do{Nc(f,d,e,a);f=c[f+4>>2]|0}while((f|0)!=0);i=b;return}function mc(a,d){a=a|0;d=d|0;var e=0,f=0,h=0,j=0;f=i;e=a+88|0;h=c[e>>2]|0;if((c[h+102868>>2]&2|0)!=0){ya(1776,1520,153,1808)}j=fc(h,44)|0;if((j|0)==0){j=0}else{Kc(j)}Lc(j,h,a,d);if(!((b[a+4>>1]&32)==0)){Mc(j,(c[e>>2]|0)+102872|0,a+12|0)}d=a+100|0;c[j+4>>2]=c[d>>2];c[d>>2]=j;d=a+104|0;c[d>>2]=(c[d>>2]|0)+1;c[j+8>>2]=a;if(!($(g[j>>2])>$(0.0))){d=c[e>>2]|0;d=d+102868|0;h=c[d>>2]|0;h=h|1;c[d>>2]=h;i=f;return j|0}kc(a);d=c[e>>2]|0;d=d+102868|0;h=c[d>>2]|0;h=h|1;c[d>>2]=h;i=f;return j|0}function nc(d,e,f){d=d|0;e=e|0;f=$(f);var h=0,j=0;h=i;i=i+32|0;j=h;b[j+22>>1]=1;b[j+24>>1]=-1;b[j+26>>1]=0;c[j+4>>2]=0;g[j+8>>2]=$(.20000000298023224);g[j+12>>2]=$(0.0);a[j+20|0]=0;c[j>>2]=e;g[j+16>>2]=f;e=mc(d,j)|0;i=h;return e|0}function oc(b,d){b=b|0;d=d|0;var e=0,f=0;e=i;if((c[b>>2]|0)!=2?(c[d>>2]|0)!=2:0){d=0}else{f=3}a:do{if((f|0)==3){f=c[b+108>>2]|0;if((f|0)==0){d=1}else{while(1){if((c[f>>2]|0)==(d|0)?(a[(c[f+4>>2]|0)+61|0]|0)==0:0){d=0;break a}f=c[f+12>>2]|0;if((f|0)==0){d=1;break}}}}}while(0);i=e;return d|0}function pc(a){a=a|0;return}function qc(a){a=a|0;return}function rc(a){a=a|0;var b=0;b=i;Vc(a);c[a+60>>2]=0;c[a+64>>2]=0;c[a+68>>2]=1888;c[a+72>>2]=1896;c[a+76>>2]=0;i=b;return}function sc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0;d=i;f=c[(c[b+48>>2]|0)+8>>2]|0;e=c[(c[b+52>>2]|0)+8>>2]|0;g=c[a+72>>2]|0;if((g|0)!=0?(c[b+4>>2]&2|0)!=0:0){lb[c[(c[g>>2]|0)+12>>2]&15](g,b)}h=b+8|0;j=c[h>>2]|0;g=b+12|0;if((j|0)!=0){c[j+12>>2]=c[g>>2]}j=c[g>>2]|0;if((j|0)!=0){c[j+8>>2]=c[h>>2]}h=a+60|0;if((c[h>>2]|0)==(b|0)){c[h>>2]=c[g>>2]}h=b+24|0;j=c[h>>2]|0;g=b+28|0;if((j|0)!=0){c[j+12>>2]=c[g>>2]}j=c[g>>2]|0;if((j|0)!=0){c[j+8>>2]=c[h>>2]}f=f+112|0;if((b+16|0)==(c[f>>2]|0)){c[f>>2]=c[g>>2]}g=b+40|0;h=c[g>>2]|0;f=b+44|0;if((h|0)!=0){c[h+12>>2]=c[f>>2]}h=c[f>>2]|0;if((h|0)!=0){c[h+8>>2]=c[g>>2]}e=e+112|0;if((b+32|0)!=(c[e>>2]|0)){j=a+76|0;j=c[j>>2]|0;wd(b,j);j=a+64|0;h=c[j>>2]|0;h=h+ -1|0;c[j>>2]=h;i=d;return}c[e>>2]=c[f>>2];j=a+76|0;j=c[j>>2]|0;wd(b,j);j=a+64|0;h=c[j>>2]|0;h=h+ -1|0;c[j>>2]=h;i=d;return}function tc(a){a=a|0;var d=0,e=0,f=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=hb,v=hb,w=hb,x=hb;e=i;l=c[a+60>>2]|0;if((l|0)==0){i=e;return}k=a+12|0;j=a+4|0;h=a+72|0;f=a+68|0;a:while(1){p=c[l+48>>2]|0;n=c[l+52>>2]|0;o=c[l+56>>2]|0;m=c[l+60>>2]|0;s=c[p+8>>2]|0;q=c[n+8>>2]|0;t=l+4|0;do{if((c[t>>2]&8|0)==0){d=11}else{if(!(oc(q,s)|0)){t=c[l+12>>2]|0;sc(a,l);l=t;break}r=c[f>>2]|0;if((r|0)!=0?!(ib[c[(c[r>>2]|0)+8>>2]&7](r,p,n)|0):0){t=c[l+12>>2]|0;sc(a,l);l=t;break}c[t>>2]=c[t>>2]&-9;d=11}}while(0);do{if((d|0)==11){d=0;if((b[s+4>>1]&2)==0){r=0}else{r=(c[s>>2]|0)!=0}if((b[q+4>>1]&2)==0){q=0}else{q=(c[q>>2]|0)!=0}if(!(r|q)){l=c[l+12>>2]|0;break}o=c[(c[p+24>>2]|0)+(o*28|0)+24>>2]|0;m=c[(c[n+24>>2]|0)+(m*28|0)+24>>2]|0;if(!((o|0)>-1)){d=19;break a}n=c[k>>2]|0;if((n|0)<=(o|0)){d=19;break a}p=c[j>>2]|0;if(!((m|0)>-1&(n|0)>(m|0))){d=21;break a}x=$(g[p+(m*36|0)>>2]);x=$(x-$(g[p+(o*36|0)+8>>2]));w=$(g[p+(m*36|0)+4>>2]);w=$(w-$(g[p+(o*36|0)+12>>2]));v=$(g[p+(o*36|0)>>2]);v=$(v-$(g[p+(m*36|0)+8>>2]));u=$(g[p+(o*36|0)+4>>2]);if(x>$(0.0)|w>$(0.0)|v>$(0.0)|$(u-$(g[p+(m*36|0)+12>>2]))>$(0.0)){t=c[l+12>>2]|0;sc(a,l);l=t;break}else{yd(l,c[h>>2]|0);l=c[l+12>>2]|0;break}}}while(0);if((l|0)==0){d=25;break}}if((d|0)==19){ya(1904,1952,159,2008)}else if((d|0)==21){ya(1904,1952,159,2008)}else if((d|0)==25){i=e;return}}function uc(a){a=a|0;var b=0;b=i;vc(a,a);i=b;return}function vc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;e=i;i=i+16|0;g=e;d=a+52|0;c[d>>2]=0;f=a+40|0;n=c[f>>2]|0;do{if((n|0)>0){k=a+32|0;m=a+56|0;j=a+12|0;l=a+4|0;o=0;while(1){p=c[(c[k>>2]|0)+(o<<2)>>2]|0;c[m>>2]=p;if(!((p|0)==-1)){if(!((p|0)>-1)){j=6;break}if((c[j>>2]|0)<=(p|0)){j=6;break}xc(a,a,(c[l>>2]|0)+(p*36|0)|0);n=c[f>>2]|0}o=o+1|0;if((o|0)>=(n|0)){j=9;break}}if((j|0)==6){ya(1904,1952,159,2008)}else if((j|0)==9){h=c[d>>2]|0;break}}else{h=0}}while(0);c[f>>2]=0;f=a+44|0;p=c[f>>2]|0;c[g>>2]=3;zc(p,p+(h*12|0)|0,g);if((c[d>>2]|0)<=0){i=e;return}g=a+12|0;h=a+4|0;k=0;a:while(1){j=c[f>>2]|0;a=j+(k*12|0)|0;l=c[a>>2]|0;if(!((l|0)>-1)){j=14;break}n=c[g>>2]|0;if((n|0)<=(l|0)){j=14;break}m=c[h>>2]|0;j=j+(k*12|0)+4|0;o=c[j>>2]|0;if(!((o|0)>-1&(n|0)>(o|0))){j=16;break}wc(b,c[m+(l*36|0)+16>>2]|0,c[m+(o*36|0)+16>>2]|0);l=c[d>>2]|0;while(1){k=k+1|0;if((k|0)>=(l|0)){j=21;break a}m=c[f>>2]|0;if((c[m+(k*12|0)>>2]|0)!=(c[a>>2]|0)){continue a}if((c[m+(k*12|0)+4>>2]|0)!=(c[j>>2]|0)){continue a}}}if((j|0)==14){ya(1904,1952,153,1992)}else if((j|0)==16){ya(1904,1952,153,1992)}else if((j|0)==21){i=e;return}}function wc(a,d,f){a=a|0;d=d|0;f=f|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;h=i;k=c[d+16>>2]|0;j=c[f+16>>2]|0;d=c[d+20>>2]|0;f=c[f+20>>2]|0;m=c[k+8>>2]|0;l=c[j+8>>2]|0;if((m|0)==(l|0)){i=h;return}o=c[l+112>>2]|0;a:do{if((o|0)!=0){while(1){if((c[o>>2]|0)==(m|0)){n=c[o+4>>2]|0;q=c[n+48>>2]|0;r=c[n+52>>2]|0;p=c[n+56>>2]|0;n=c[n+60>>2]|0;if((q|0)==(k|0)&(r|0)==(j|0)&(p|0)==(d|0)&(n|0)==(f|0)){n=22;break}if((q|0)==(j|0)&(r|0)==(k|0)&(p|0)==(f|0)&(n|0)==(d|0)){n=22;break}}o=c[o+12>>2]|0;if((o|0)==0){break a}}if((n|0)==22){i=h;return}}}while(0);if(!(oc(l,m)|0)){i=h;return}l=c[a+68>>2]|0;if((l|0)!=0?!(ib[c[(c[l>>2]|0)+8>>2]&7](l,k,j)|0):0){i=h;return}d=vd(k,d,j,f,c[a+76>>2]|0)|0;if((d|0)==0){i=h;return}k=c[(c[d+48>>2]|0)+8>>2]|0;j=c[(c[d+52>>2]|0)+8>>2]|0;c[d+8>>2]=0;l=a+60|0;c[d+12>>2]=c[l>>2];f=c[l>>2]|0;if((f|0)!=0){c[f+8>>2]=d}c[l>>2]=d;m=d+16|0;c[d+20>>2]=d;c[m>>2]=j;c[d+24>>2]=0;f=k+112|0;c[d+28>>2]=c[f>>2];l=c[f>>2]|0;if((l|0)!=0){c[l+8>>2]=m}c[f>>2]=m;f=d+32|0;c[d+36>>2]=d;c[f>>2]=k;c[d+40>>2]=0;l=j+112|0;c[d+44>>2]=c[l>>2];d=c[l>>2]|0;if((d|0)!=0){c[d+8>>2]=f}c[l>>2]=f;d=k+4|0;f=e[d>>1]|0;if((f&2|0)==0){b[d>>1]=f|2;g[k+144>>2]=$(0.0)}k=j+4|0;d=e[k>>1]|0;if((d&2|0)==0){b[k>>1]=d|2;g[j+144>>2]=$(0.0)}r=a+64|0;c[r>>2]=(c[r>>2]|0)+1;i=h;return}function xc(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=hb,u=hb,v=hb,w=hb;f=i;i=i+1040|0;h=f;e=h+4|0;c[h>>2]=e;j=h+1028|0;c[j>>2]=0;k=h+1032|0;c[k>>2]=256;q=c[h>>2]|0;c[q+(c[j>>2]<<2)>>2]=c[a>>2];r=c[j>>2]|0;s=r+1|0;c[j>>2]=s;a:do{if((r|0)>-1){a=a+4|0;n=d+4|0;o=d+8|0;m=d+12|0;while(1){s=s+ -1|0;c[j>>2]=s;p=c[q+(s<<2)>>2]|0;do{if(!((p|0)==-1)?(l=c[a>>2]|0,w=$(g[d>>2]),w=$(w-$(g[l+(p*36|0)+8>>2])),v=$(g[n>>2]),v=$(v-$(g[l+(p*36|0)+12>>2])),u=$(g[l+(p*36|0)>>2]),u=$(u-$(g[o>>2])),t=$(g[l+(p*36|0)+4>>2]),!(w>$(0.0)|v>$(0.0)|u>$(0.0)|$(t-$(g[m>>2]))>$(0.0))):0){r=l+(p*36|0)+24|0;if((c[r>>2]|0)==-1){if(!(Yc(b,p)|0)){break a}s=c[j>>2]|0;break}if((s|0)==(c[k>>2]|0)?(c[k>>2]=s<<1,s=hc(s<<3)|0,c[h>>2]=s,ff(s|0,q|0,c[j>>2]<<2|0)|0,(q|0)!=(e|0)):0){ic(q)}q=c[h>>2]|0;c[q+(c[j>>2]<<2)>>2]=c[r>>2];r=(c[j>>2]|0)+1|0;c[j>>2]=r;p=l+(p*36|0)+28|0;if((r|0)==(c[k>>2]|0)?(c[k>>2]=r<<1,s=hc(r<<3)|0,c[h>>2]=s,ff(s|0,q|0,c[j>>2]<<2|0)|0,(q|0)!=(e|0)):0){ic(q)}c[(c[h>>2]|0)+(c[j>>2]<<2)>>2]=c[p>>2];s=(c[j>>2]|0)+1|0;c[j>>2]=s}}while(0);if((s|0)<=0){break a}q=c[h>>2]|0}}}while(0);b=c[h>>2]|0;if((b|0)==(e|0)){i=f;return}ic(b);c[h>>2]=0;i=f;return}function yc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;d=i;f=c[a>>2]|0;e=c[b>>2]|0;if((f|0)>=(e|0)){if((f|0)==(e|0)){a=(c[a+4>>2]|0)<(c[b+4>>2]|0)}else{a=0}}else{a=1}i=d;return a|0}function zc(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;f=i;i=i+16|0;e=f;a:while(1){j=b;g=b+ -12|0;b:while(1){k=a;m=j-k|0;switch((m|0)/12|0|0){case 2:{h=4;break a};case 5:{h=15;break a};case 3:{h=6;break a};case 4:{h=14;break a};case 1:case 0:{h=67;break a};default:{}}if((m|0)<372){h=21;break a}n=(m|0)/24|0;l=a+(n*12|0)|0;do{if((m|0)>11988){p=(m|0)/48|0;m=a+(p*12|0)|0;p=a+((p+n|0)*12|0)|0;n=Ac(a,m,l,p,d)|0;if(rb[c[d>>2]&3](g,p)|0){c[e+0>>2]=c[p+0>>2];c[e+4>>2]=c[p+4>>2];c[e+8>>2]=c[p+8>>2];c[p+0>>2]=c[g+0>>2];c[p+4>>2]=c[g+4>>2];c[p+8>>2]=c[g+8>>2];c[g+0>>2]=c[e+0>>2];c[g+4>>2]=c[e+4>>2];c[g+8>>2]=c[e+8>>2];o=n+1|0;if(rb[c[d>>2]&3](p,l)|0){c[e+0>>2]=c[l+0>>2];c[e+4>>2]=c[l+4>>2];c[e+8>>2]=c[l+8>>2];c[l+0>>2]=c[p+0>>2];c[l+4>>2]=c[p+4>>2];c[l+8>>2]=c[p+8>>2];c[p+0>>2]=c[e+0>>2];c[p+4>>2]=c[e+4>>2];c[p+8>>2]=c[e+8>>2];o=n+2|0;if(rb[c[d>>2]&3](l,m)|0){c[e+0>>2]=c[m+0>>2];c[e+4>>2]=c[m+4>>2];c[e+8>>2]=c[m+8>>2];c[m+0>>2]=c[l+0>>2];c[m+4>>2]=c[l+4>>2];c[m+8>>2]=c[l+8>>2];c[l+0>>2]=c[e+0>>2];c[l+4>>2]=c[e+4>>2];c[l+8>>2]=c[e+8>>2];if(rb[c[d>>2]&3](m,a)|0){c[e+0>>2]=c[a+0>>2];c[e+4>>2]=c[a+4>>2];c[e+8>>2]=c[a+8>>2];c[a+0>>2]=c[m+0>>2];c[a+4>>2]=c[m+4>>2];c[a+8>>2]=c[m+8>>2];c[m+0>>2]=c[e+0>>2];c[m+4>>2]=c[e+4>>2];c[m+8>>2]=c[e+8>>2];n=n+4|0}else{n=n+3|0}}else{n=o}}else{n=o}}}else{q=rb[c[d>>2]&3](l,a)|0;m=rb[c[d>>2]&3](g,l)|0;if(!q){if(!m){n=0;break}c[e+0>>2]=c[l+0>>2];c[e+4>>2]=c[l+4>>2];c[e+8>>2]=c[l+8>>2];c[l+0>>2]=c[g+0>>2];c[l+4>>2]=c[g+4>>2];c[l+8>>2]=c[g+8>>2];c[g+0>>2]=c[e+0>>2];c[g+4>>2]=c[e+4>>2];c[g+8>>2]=c[e+8>>2];if(!(rb[c[d>>2]&3](l,a)|0)){n=1;break}c[e+0>>2]=c[a+0>>2];c[e+4>>2]=c[a+4>>2];c[e+8>>2]=c[a+8>>2];c[a+0>>2]=c[l+0>>2];c[a+4>>2]=c[l+4>>2];c[a+8>>2]=c[l+8>>2];c[l+0>>2]=c[e+0>>2];c[l+4>>2]=c[e+4>>2];c[l+8>>2]=c[e+8>>2];n=2;break}if(m){c[e+0>>2]=c[a+0>>2];c[e+4>>2]=c[a+4>>2];c[e+8>>2]=c[a+8>>2];c[a+0>>2]=c[g+0>>2];c[a+4>>2]=c[g+4>>2];c[a+8>>2]=c[g+8>>2];c[g+0>>2]=c[e+0>>2];c[g+4>>2]=c[e+4>>2];c[g+8>>2]=c[e+8>>2];n=1;break}c[e+0>>2]=c[a+0>>2];c[e+4>>2]=c[a+4>>2];c[e+8>>2]=c[a+8>>2];c[a+0>>2]=c[l+0>>2];c[a+4>>2]=c[l+4>>2];c[a+8>>2]=c[l+8>>2];c[l+0>>2]=c[e+0>>2];c[l+4>>2]=c[e+4>>2];c[l+8>>2]=c[e+8>>2];if(rb[c[d>>2]&3](g,l)|0){c[e+0>>2]=c[l+0>>2];c[e+4>>2]=c[l+4>>2];c[e+8>>2]=c[l+8>>2];c[l+0>>2]=c[g+0>>2];c[l+4>>2]=c[g+4>>2];c[l+8>>2]=c[g+8>>2];c[g+0>>2]=c[e+0>>2];c[g+4>>2]=c[e+4>>2];c[g+8>>2]=c[e+8>>2];n=2}else{n=1}}}while(0);do{if(rb[c[d>>2]&3](a,l)|0){o=g}else{o=g;while(1){o=o+ -12|0;if((a|0)==(o|0)){break}if(rb[c[d>>2]&3](o,l)|0){h=50;break}}if((h|0)==50){h=0;c[e+0>>2]=c[a+0>>2];c[e+4>>2]=c[a+4>>2];c[e+8>>2]=c[a+8>>2];c[a+0>>2]=c[o+0>>2];c[a+4>>2]=c[o+4>>2];c[a+8>>2]=c[o+8>>2];c[o+0>>2]=c[e+0>>2];c[o+4>>2]=c[e+4>>2];c[o+8>>2]=c[e+8>>2];n=n+1|0;break}l=a+12|0;if(!(rb[c[d>>2]&3](a,g)|0)){if((l|0)==(g|0)){h=67;break a}while(1){k=l+12|0;if(rb[c[d>>2]&3](a,l)|0){break}if((k|0)==(g|0)){h=67;break a}else{l=k}}c[e+0>>2]=c[l+0>>2];c[e+4>>2]=c[l+4>>2];c[e+8>>2]=c[l+8>>2];c[l+0>>2]=c[g+0>>2];c[l+4>>2]=c[g+4>>2];c[l+8>>2]=c[g+8>>2];c[g+0>>2]=c[e+0>>2];c[g+4>>2]=c[e+4>>2];c[g+8>>2]=c[e+8>>2];l=k}if((l|0)==(g|0)){h=67;break a}else{k=g}while(1){while(1){m=l+12|0;if(rb[c[d>>2]&3](a,l)|0){break}else{l=m}}do{k=k+ -12|0}while(rb[c[d>>2]&3](a,k)|0);if(!(l>>>0<k>>>0)){a=l;continue b}c[e+0>>2]=c[l+0>>2];c[e+4>>2]=c[l+4>>2];c[e+8>>2]=c[l+8>>2];c[l+0>>2]=c[k+0>>2];c[l+4>>2]=c[k+4>>2];c[l+8>>2]=c[k+8>>2];c[k+0>>2]=c[e+0>>2];c[k+4>>2]=c[e+4>>2];c[k+8>>2]=c[e+8>>2];l=m}}}while(0);m=a+12|0;c:do{if(m>>>0<o>>>0){while(1){q=m;while(1){m=q+12|0;if(rb[c[d>>2]&3](q,l)|0){q=m}else{p=o;break}}do{p=p+ -12|0}while(!(rb[c[d>>2]&3](p,l)|0));if(q>>>0>p>>>0){m=q;break c}c[e+0>>2]=c[q+0>>2];c[e+4>>2]=c[q+4>>2];c[e+8>>2]=c[q+8>>2];c[q+0>>2]=c[p+0>>2];c[q+4>>2]=c[p+4>>2];c[q+8>>2]=c[p+8>>2];c[p+0>>2]=c[e+0>>2];c[p+4>>2]=c[e+4>>2];c[p+8>>2]=c[e+8>>2];o=p;l=(l|0)==(q|0)?p:l;n=n+1|0}}}while(0);if((m|0)!=(l|0)?rb[c[d>>2]&3](l,m)|0:0){c[e+0>>2]=c[m+0>>2];c[e+4>>2]=c[m+4>>2];c[e+8>>2]=c[m+8>>2];c[m+0>>2]=c[l+0>>2];c[m+4>>2]=c[l+4>>2];c[m+8>>2]=c[l+8>>2];c[l+0>>2]=c[e+0>>2];c[l+4>>2]=c[e+4>>2];c[l+8>>2]=c[e+8>>2];n=n+1|0}if((n|0)==0){n=Cc(a,m,d)|0;l=m+12|0;if(Cc(l,b,d)|0){h=62;break}if(n){a=l;continue}}q=m;if((q-k|0)>=(j-q|0)){h=66;break}zc(a,m,d);a=m+12|0}if((h|0)==62){h=0;if(n){h=67;break}else{b=m;continue}}else if((h|0)==66){h=0;zc(m+12|0,b,d);b=m;continue}}if((h|0)==4){if(!(rb[c[d>>2]&3](g,a)|0)){i=f;return}c[e+0>>2]=c[a+0>>2];c[e+4>>2]=c[a+4>>2];c[e+8>>2]=c[a+8>>2];c[a+0>>2]=c[g+0>>2];c[a+4>>2]=c[g+4>>2];c[a+8>>2]=c[g+8>>2];c[g+0>>2]=c[e+0>>2];c[g+4>>2]=c[e+4>>2];c[g+8>>2]=c[e+8>>2];i=f;return}else if((h|0)==6){h=a+12|0;q=rb[c[d>>2]&3](h,a)|0;j=rb[c[d>>2]&3](g,h)|0;if(!q){if(!j){i=f;return}c[e+0>>2]=c[h+0>>2];c[e+4>>2]=c[h+4>>2];c[e+8>>2]=c[h+8>>2];c[h+0>>2]=c[g+0>>2];c[h+4>>2]=c[g+4>>2];c[h+8>>2]=c[g+8>>2];c[g+0>>2]=c[e+0>>2];c[g+4>>2]=c[e+4>>2];c[g+8>>2]=c[e+8>>2];if(!(rb[c[d>>2]&3](h,a)|0)){i=f;return}c[e+0>>2]=c[a+0>>2];c[e+4>>2]=c[a+4>>2];c[e+8>>2]=c[a+8>>2];c[a+0>>2]=c[h+0>>2];c[a+4>>2]=c[h+4>>2];c[a+8>>2]=c[h+8>>2];c[h+0>>2]=c[e+0>>2];c[h+4>>2]=c[e+4>>2];c[h+8>>2]=c[e+8>>2];i=f;return}if(j){c[e+0>>2]=c[a+0>>2];c[e+4>>2]=c[a+4>>2];c[e+8>>2]=c[a+8>>2];c[a+0>>2]=c[g+0>>2];c[a+4>>2]=c[g+4>>2];c[a+8>>2]=c[g+8>>2];c[g+0>>2]=c[e+0>>2];c[g+4>>2]=c[e+4>>2];c[g+8>>2]=c[e+8>>2];i=f;return}c[e+0>>2]=c[a+0>>2];c[e+4>>2]=c[a+4>>2];c[e+8>>2]=c[a+8>>2];c[a+0>>2]=c[h+0>>2];c[a+4>>2]=c[h+4>>2];c[a+8>>2]=c[h+8>>2];c[h+0>>2]=c[e+0>>2];c[h+4>>2]=c[e+4>>2];c[h+8>>2]=c[e+8>>2];if(!(rb[c[d>>2]&3](g,h)|0)){i=f;return}c[e+0>>2]=c[h+0>>2];c[e+4>>2]=c[h+4>>2];c[e+8>>2]=c[h+8>>2];c[h+0>>2]=c[g+0>>2];c[h+4>>2]=c[g+4>>2];c[h+8>>2]=c[g+8>>2];c[g+0>>2]=c[e+0>>2];c[g+4>>2]=c[e+4>>2];c[g+8>>2]=c[e+8>>2];i=f;return}else if((h|0)==14){Ac(a,a+12|0,a+24|0,g,d)|0;i=f;return}else if((h|0)==15){h=a+12|0;j=a+24|0;b=a+36|0;Ac(a,h,j,b,d)|0;if(!(rb[c[d>>2]&3](g,b)|0)){i=f;return}c[e+0>>2]=c[b+0>>2];c[e+4>>2]=c[b+4>>2];c[e+8>>2]=c[b+8>>2];c[b+0>>2]=c[g+0>>2];c[b+4>>2]=c[g+4>>2];c[b+8>>2]=c[g+8>>2];c[g+0>>2]=c[e+0>>2];c[g+4>>2]=c[e+4>>2];c[g+8>>2]=c[e+8>>2];if(!(rb[c[d>>2]&3](b,j)|0)){i=f;return}c[e+0>>2]=c[j+0>>2];c[e+4>>2]=c[j+4>>2];c[e+8>>2]=c[j+8>>2];c[j+0>>2]=c[b+0>>2];c[j+4>>2]=c[b+4>>2];c[j+8>>2]=c[b+8>>2];c[b+0>>2]=c[e+0>>2];c[b+4>>2]=c[e+4>>2];c[b+8>>2]=c[e+8>>2];if(!(rb[c[d>>2]&3](j,h)|0)){i=f;return}c[e+0>>2]=c[h+0>>2];c[e+4>>2]=c[h+4>>2];c[e+8>>2]=c[h+8>>2];c[h+0>>2]=c[j+0>>2];c[h+4>>2]=c[j+4>>2];c[h+8>>2]=c[j+8>>2];c[j+0>>2]=c[e+0>>2];c[j+4>>2]=c[e+4>>2];c[j+8>>2]=c[e+8>>2];if(!(rb[c[d>>2]&3](h,a)|0)){i=f;return}c[e+0>>2]=c[a+0>>2];c[e+4>>2]=c[a+4>>2];c[e+8>>2]=c[a+8>>2];c[a+0>>2]=c[h+0>>2];c[a+4>>2]=c[h+4>>2];c[a+8>>2]=c[h+8>>2];c[h+0>>2]=c[e+0>>2];c[h+4>>2]=c[e+4>>2];c[h+8>>2]=c[e+8>>2];i=f;return}else if((h|0)==21){Bc(a,b,d);i=f;return}else if((h|0)==67){i=f;return}}function Ac(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0;g=i;i=i+16|0;h=g;k=rb[c[f>>2]&3](b,a)|0;j=rb[c[f>>2]&3](d,b)|0;do{if(k){if(j){c[h+0>>2]=c[a+0>>2];c[h+4>>2]=c[a+4>>2];c[h+8>>2]=c[a+8>>2];c[a+0>>2]=c[d+0>>2];c[a+4>>2]=c[d+4>>2];c[a+8>>2]=c[d+8>>2];c[d+0>>2]=c[h+0>>2];c[d+4>>2]=c[h+4>>2];c[d+8>>2]=c[h+8>>2];j=1;break}c[h+0>>2]=c[a+0>>2];c[h+4>>2]=c[a+4>>2];c[h+8>>2]=c[a+8>>2];c[a+0>>2]=c[b+0>>2];c[a+4>>2]=c[b+4>>2];c[a+8>>2]=c[b+8>>2];c[b+0>>2]=c[h+0>>2];c[b+4>>2]=c[h+4>>2];c[b+8>>2]=c[h+8>>2];if(rb[c[f>>2]&3](d,b)|0){c[h+0>>2]=c[b+0>>2];c[h+4>>2]=c[b+4>>2];c[h+8>>2]=c[b+8>>2];c[b+0>>2]=c[d+0>>2];c[b+4>>2]=c[d+4>>2];c[b+8>>2]=c[d+8>>2];c[d+0>>2]=c[h+0>>2];c[d+4>>2]=c[h+4>>2];c[d+8>>2]=c[h+8>>2];j=2}else{j=1}}else{if(j){c[h+0>>2]=c[b+0>>2];c[h+4>>2]=c[b+4>>2];c[h+8>>2]=c[b+8>>2];c[b+0>>2]=c[d+0>>2];c[b+4>>2]=c[d+4>>2];c[b+8>>2]=c[d+8>>2];c[d+0>>2]=c[h+0>>2];c[d+4>>2]=c[h+4>>2];c[d+8>>2]=c[h+8>>2];if(rb[c[f>>2]&3](b,a)|0){c[h+0>>2]=c[a+0>>2];c[h+4>>2]=c[a+4>>2];c[h+8>>2]=c[a+8>>2];c[a+0>>2]=c[b+0>>2];c[a+4>>2]=c[b+4>>2];c[a+8>>2]=c[b+8>>2];c[b+0>>2]=c[h+0>>2];c[b+4>>2]=c[h+4>>2];c[b+8>>2]=c[h+8>>2];j=2}else{j=1}}else{j=0}}}while(0);if(!(rb[c[f>>2]&3](e,d)|0)){k=j;i=g;return k|0}c[h+0>>2]=c[d+0>>2];c[h+4>>2]=c[d+4>>2];c[h+8>>2]=c[d+8>>2];c[d+0>>2]=c[e+0>>2];c[d+4>>2]=c[e+4>>2];c[d+8>>2]=c[e+8>>2];c[e+0>>2]=c[h+0>>2];c[e+4>>2]=c[h+4>>2];c[e+8>>2]=c[h+8>>2];if(!(rb[c[f>>2]&3](d,b)|0)){k=j+1|0;i=g;return k|0}c[h+0>>2]=c[b+0>>2];c[h+4>>2]=c[b+4>>2];c[h+8>>2]=c[b+8>>2];c[b+0>>2]=c[d+0>>2];c[b+4>>2]=c[d+4>>2];c[b+8>>2]=c[d+8>>2];c[d+0>>2]=c[h+0>>2];c[d+4>>2]=c[h+4>>2];c[d+8>>2]=c[h+8>>2];if(!(rb[c[f>>2]&3](b,a)|0)){k=j+2|0;i=g;return k|0}c[h+0>>2]=c[a+0>>2];c[h+4>>2]=c[a+4>>2];c[h+8>>2]=c[a+8>>2];c[a+0>>2]=c[b+0>>2];c[a+4>>2]=c[b+4>>2];c[a+8>>2]=c[b+8>>2];c[b+0>>2]=c[h+0>>2];c[b+4>>2]=c[h+4>>2];c[b+8>>2]=c[h+8>>2];k=j+3|0;i=g;return k|0}function Bc(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0;f=i;i=i+32|0;g=f+12|0;e=f;h=a+24|0;j=a+12|0;l=rb[c[d>>2]&3](j,a)|0;k=rb[c[d>>2]&3](h,j)|0;do{if(l){if(k){c[g+0>>2]=c[a+0>>2];c[g+4>>2]=c[a+4>>2];c[g+8>>2]=c[a+8>>2];c[a+0>>2]=c[h+0>>2];c[a+4>>2]=c[h+4>>2];c[a+8>>2]=c[h+8>>2];c[h+0>>2]=c[g+0>>2];c[h+4>>2]=c[g+4>>2];c[h+8>>2]=c[g+8>>2];break}c[g+0>>2]=c[a+0>>2];c[g+4>>2]=c[a+4>>2];c[g+8>>2]=c[a+8>>2];c[a+0>>2]=c[j+0>>2];c[a+4>>2]=c[j+4>>2];c[a+8>>2]=c[j+8>>2];c[j+0>>2]=c[g+0>>2];c[j+4>>2]=c[g+4>>2];c[j+8>>2]=c[g+8>>2];if(rb[c[d>>2]&3](h,j)|0){c[g+0>>2]=c[j+0>>2];c[g+4>>2]=c[j+4>>2];c[g+8>>2]=c[j+8>>2];c[j+0>>2]=c[h+0>>2];c[j+4>>2]=c[h+4>>2];c[j+8>>2]=c[h+8>>2];c[h+0>>2]=c[g+0>>2];c[h+4>>2]=c[g+4>>2];c[h+8>>2]=c[g+8>>2]}}else{if(k){c[g+0>>2]=c[j+0>>2];c[g+4>>2]=c[j+4>>2];c[g+8>>2]=c[j+8>>2];c[j+0>>2]=c[h+0>>2];c[j+4>>2]=c[h+4>>2];c[j+8>>2]=c[h+8>>2];c[h+0>>2]=c[g+0>>2];c[h+4>>2]=c[g+4>>2];c[h+8>>2]=c[g+8>>2];if(rb[c[d>>2]&3](j,a)|0){c[g+0>>2]=c[a+0>>2];c[g+4>>2]=c[a+4>>2];c[g+8>>2]=c[a+8>>2];c[a+0>>2]=c[j+0>>2];c[a+4>>2]=c[j+4>>2];c[a+8>>2]=c[j+8>>2];c[j+0>>2]=c[g+0>>2];c[j+4>>2]=c[g+4>>2];c[j+8>>2]=c[g+8>>2]}}}}while(0);g=a+36|0;if((g|0)==(b|0)){i=f;return}while(1){if(rb[c[d>>2]&3](g,h)|0){c[e+0>>2]=c[g+0>>2];c[e+4>>2]=c[g+4>>2];c[e+8>>2]=c[g+8>>2];j=g;while(1){c[j+0>>2]=c[h+0>>2];c[j+4>>2]=c[h+4>>2];c[j+8>>2]=c[h+8>>2];if((h|0)==(a|0)){break}j=h+ -12|0;if(rb[c[d>>2]&3](e,j)|0){l=h;h=j;j=l}else{break}}c[h+0>>2]=c[e+0>>2];c[h+4>>2]=c[e+4>>2];c[h+8>>2]=c[e+8>>2]}h=g+12|0;if((h|0)==(b|0)){break}else{l=g;g=h;h=l}}i=f;return}function Cc(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0;e=i;i=i+32|0;h=e+12|0;g=e;switch((b-a|0)/12|0|0){case 4:{Ac(a,a+12|0,a+24|0,b+ -12|0,d)|0;l=1;i=e;return l|0};case 3:{f=a+12|0;g=b+ -12|0;l=rb[c[d>>2]&3](f,a)|0;b=rb[c[d>>2]&3](g,f)|0;if(!l){if(!b){l=1;i=e;return l|0}c[h+0>>2]=c[f+0>>2];c[h+4>>2]=c[f+4>>2];c[h+8>>2]=c[f+8>>2];c[f+0>>2]=c[g+0>>2];c[f+4>>2]=c[g+4>>2];c[f+8>>2]=c[g+8>>2];c[g+0>>2]=c[h+0>>2];c[g+4>>2]=c[h+4>>2];c[g+8>>2]=c[h+8>>2];if(!(rb[c[d>>2]&3](f,a)|0)){l=1;i=e;return l|0}c[h+0>>2]=c[a+0>>2];c[h+4>>2]=c[a+4>>2];c[h+8>>2]=c[a+8>>2];c[a+0>>2]=c[f+0>>2];c[a+4>>2]=c[f+4>>2];c[a+8>>2]=c[f+8>>2];c[f+0>>2]=c[h+0>>2];c[f+4>>2]=c[h+4>>2];c[f+8>>2]=c[h+8>>2];l=1;i=e;return l|0}if(b){c[h+0>>2]=c[a+0>>2];c[h+4>>2]=c[a+4>>2];c[h+8>>2]=c[a+8>>2];c[a+0>>2]=c[g+0>>2];c[a+4>>2]=c[g+4>>2];c[a+8>>2]=c[g+8>>2];c[g+0>>2]=c[h+0>>2];c[g+4>>2]=c[h+4>>2];c[g+8>>2]=c[h+8>>2];l=1;i=e;return l|0}c[h+0>>2]=c[a+0>>2];c[h+4>>2]=c[a+4>>2];c[h+8>>2]=c[a+8>>2];c[a+0>>2]=c[f+0>>2];c[a+4>>2]=c[f+4>>2];c[a+8>>2]=c[f+8>>2];c[f+0>>2]=c[h+0>>2];c[f+4>>2]=c[h+4>>2];c[f+8>>2]=c[h+8>>2];if(!(rb[c[d>>2]&3](g,f)|0)){l=1;i=e;return l|0}c[h+0>>2]=c[f+0>>2];c[h+4>>2]=c[f+4>>2];c[h+8>>2]=c[f+8>>2];c[f+0>>2]=c[g+0>>2];c[f+4>>2]=c[g+4>>2];c[f+8>>2]=c[g+8>>2];c[g+0>>2]=c[h+0>>2];c[g+4>>2]=c[h+4>>2];c[g+8>>2]=c[h+8>>2];l=1;i=e;return l|0};case 2:{b=b+ -12|0;if(!(rb[c[d>>2]&3](b,a)|0)){l=1;i=e;return l|0}c[h+0>>2]=c[a+0>>2];c[h+4>>2]=c[a+4>>2];c[h+8>>2]=c[a+8>>2];c[a+0>>2]=c[b+0>>2];c[a+4>>2]=c[b+4>>2];c[a+8>>2]=c[b+8>>2];c[b+0>>2]=c[h+0>>2];c[b+4>>2]=c[h+4>>2];c[b+8>>2]=c[h+8>>2];l=1;i=e;return l|0};case 5:{g=a+12|0;j=a+24|0;f=a+36|0;b=b+ -12|0;Ac(a,g,j,f,d)|0;if(!(rb[c[d>>2]&3](b,f)|0)){l=1;i=e;return l|0}c[h+0>>2]=c[f+0>>2];c[h+4>>2]=c[f+4>>2];c[h+8>>2]=c[f+8>>2];c[f+0>>2]=c[b+0>>2];c[f+4>>2]=c[b+4>>2];c[f+8>>2]=c[b+8>>2];c[b+0>>2]=c[h+0>>2];c[b+4>>2]=c[h+4>>2];c[b+8>>2]=c[h+8>>2];if(!(rb[c[d>>2]&3](f,j)|0)){l=1;i=e;return l|0}c[h+0>>2]=c[j+0>>2];c[h+4>>2]=c[j+4>>2];c[h+8>>2]=c[j+8>>2];c[j+0>>2]=c[f+0>>2];c[j+4>>2]=c[f+4>>2];c[j+8>>2]=c[f+8>>2];c[f+0>>2]=c[h+0>>2];c[f+4>>2]=c[h+4>>2];c[f+8>>2]=c[h+8>>2];if(!(rb[c[d>>2]&3](j,g)|0)){l=1;i=e;return l|0}c[h+0>>2]=c[g+0>>2];c[h+4>>2]=c[g+4>>2];c[h+8>>2]=c[g+8>>2];c[g+0>>2]=c[j+0>>2];c[g+4>>2]=c[j+4>>2];c[g+8>>2]=c[j+8>>2];c[j+0>>2]=c[h+0>>2];c[j+4>>2]=c[h+4>>2];c[j+8>>2]=c[h+8>>2];if(!(rb[c[d>>2]&3](g,a)|0)){l=1;i=e;return l|0}c[h+0>>2]=c[a+0>>2];c[h+4>>2]=c[a+4>>2];c[h+8>>2]=c[a+8>>2];c[a+0>>2]=c[g+0>>2];c[a+4>>2]=c[g+4>>2];c[a+8>>2]=c[g+8>>2];c[g+0>>2]=c[h+0>>2];c[g+4>>2]=c[h+4>>2];c[g+8>>2]=c[h+8>>2];l=1;i=e;return l|0};case 1:case 0:{l=1;i=e;return l|0};default:{k=a+24|0;j=a+12|0;m=rb[c[d>>2]&3](j,a)|0;l=rb[c[d>>2]&3](k,j)|0;do{if(m){if(l){c[h+0>>2]=c[a+0>>2];c[h+4>>2]=c[a+4>>2];c[h+8>>2]=c[a+8>>2];c[a+0>>2]=c[k+0>>2];c[a+4>>2]=c[k+4>>2];c[a+8>>2]=c[k+8>>2];c[k+0>>2]=c[h+0>>2];c[k+4>>2]=c[h+4>>2];c[k+8>>2]=c[h+8>>2];break}c[h+0>>2]=c[a+0>>2];c[h+4>>2]=c[a+4>>2];c[h+8>>2]=c[a+8>>2];c[a+0>>2]=c[j+0>>2];c[a+4>>2]=c[j+4>>2];c[a+8>>2]=c[j+8>>2];c[j+0>>2]=c[h+0>>2];c[j+4>>2]=c[h+4>>2];c[j+8>>2]=c[h+8>>2];if(rb[c[d>>2]&3](k,j)|0){c[h+0>>2]=c[j+0>>2];c[h+4>>2]=c[j+4>>2];c[h+8>>2]=c[j+8>>2];c[j+0>>2]=c[k+0>>2];c[j+4>>2]=c[k+4>>2];c[j+8>>2]=c[k+8>>2];c[k+0>>2]=c[h+0>>2];c[k+4>>2]=c[h+4>>2];c[k+8>>2]=c[h+8>>2]}}else{if(l){c[h+0>>2]=c[j+0>>2];c[h+4>>2]=c[j+4>>2];c[h+8>>2]=c[j+8>>2];c[j+0>>2]=c[k+0>>2];c[j+4>>2]=c[k+4>>2];c[j+8>>2]=c[k+8>>2];c[k+0>>2]=c[h+0>>2];c[k+4>>2]=c[h+4>>2];c[k+8>>2]=c[h+8>>2];if(rb[c[d>>2]&3](j,a)|0){c[h+0>>2]=c[a+0>>2];c[h+4>>2]=c[a+4>>2];c[h+8>>2]=c[a+8>>2];c[a+0>>2]=c[j+0>>2];c[a+4>>2]=c[j+4>>2];c[a+8>>2]=c[j+8>>2];c[j+0>>2]=c[h+0>>2];c[j+4>>2]=c[h+4>>2];c[j+8>>2]=c[h+8>>2]}}}}while(0);h=a+36|0;if((h|0)==(b|0)){m=1;i=e;return m|0}j=0;while(1){if(rb[c[d>>2]&3](h,k)|0){c[g+0>>2]=c[h+0>>2];c[g+4>>2]=c[h+4>>2];c[g+8>>2]=c[h+8>>2];l=h;while(1){c[l+0>>2]=c[k+0>>2];c[l+4>>2]=c[k+4>>2];c[l+8>>2]=c[k+8>>2];if((k|0)==(a|0)){break}l=k+ -12|0;if(rb[c[d>>2]&3](g,l)|0){m=k;k=l;l=m}else{break}}c[k+0>>2]=c[g+0>>2];c[k+4>>2]=c[g+4>>2];c[k+8>>2]=c[g+8>>2];j=j+1|0;if((j|0)==8){break}}k=h+12|0;if((k|0)==(b|0)){a=1;f=35;break}else{m=h;h=k;k=m}}if((f|0)==35){i=e;return a|0}m=(h+12|0)==(b|0);i=e;return m|0}}return 0}function Dc(a){a=a|0;Fa(a|0)|0;va()}function Ec(a){a=a|0;var b=0;b=i;_e(a);i=b;return}function Fc(a,b){a=a|0;b=b|0;return}function Gc(a,b){a=a|0;b=b|0;return}function Hc(a,b,c){a=a|0;b=b|0;c=c|0;return}function Ic(a,b,c){a=a|0;b=b|0;c=c|0;return}function Jc(a){a=a|0;var b=0;b=i;_e(a);i=b;return}function Kc(a){a=a|0;var d=0;d=i;b[a+32>>1]=1;b[a+34>>1]=-1;b[a+36>>1]=0;c[a+40>>2]=0;c[a+24>>2]=0;c[a+28>>2]=0;c[a+0>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;c[a+12>>2]=0;i=d;return}function Lc(d,e,f,h){d=d|0;e=e|0;f=f|0;h=h|0;var j=0,k=0,l=0,m=hb;j=i;c[d+40>>2]=c[h+4>>2];g[d+16>>2]=$(g[h+8>>2]);g[d+20>>2]=$(g[h+12>>2]);c[d+8>>2]=f;c[d+4>>2]=0;f=d+32|0;k=h+22|0;b[f+0>>1]=b[k+0>>1]|0;b[f+2>>1]=b[k+2>>1]|0;b[f+4>>1]=b[k+4>>1]|0;a[d+38|0]=a[h+20|0]|0;f=c[h>>2]|0;f=rb[c[(c[f>>2]|0)+8>>2]&3](f,e)|0;c[d+12>>2]=f;f=mb[c[(c[f>>2]|0)+12>>2]&3](f)|0;k=fc(e,f*28|0)|0;e=d+24|0;c[e>>2]=k;if((f|0)>0){l=0}else{l=d+28|0;c[l>>2]=0;l=h+16|0;m=$(g[l>>2]);g[d>>2]=m;i=j;return}do{c[k+(l*28|0)+16>>2]=0;k=c[e>>2]|0;c[k+(l*28|0)+24>>2]=-1;l=l+1|0}while((l|0)!=(f|0));l=d+28|0;c[l>>2]=0;l=h+16|0;m=$(g[l>>2]);g[d>>2]=m;i=j;return}function Mc(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0;e=i;f=a+28|0;if((c[f>>2]|0)!=0){ya(2088,2112,124,2144)}g=a+12|0;j=c[g>>2]|0;j=mb[c[(c[j>>2]|0)+12>>2]&3](j)|0;c[f>>2]=j;if((j|0)<=0){i=e;return}h=a+24|0;j=0;do{k=c[h>>2]|0;l=k+(j*28|0)|0;m=c[g>>2]|0;tb[c[(c[m>>2]|0)+24>>2]&15](m,l,d,j);c[k+(j*28|0)+24>>2]=Wc(b,l,l)|0;c[k+(j*28|0)+16>>2]=a;c[k+(j*28|0)+20>>2]=j;j=j+1|0}while((j|0)<(c[f>>2]|0));i=e;return}function Nc(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=hb,A=hb,B=hb,C=hb,D=0;m=i;i=i+48|0;k=m+24|0;l=m+8|0;h=m;j=a+28|0;if((c[j>>2]|0)<=0){i=m;return}f=a+24|0;u=a+12|0;v=k+4|0;w=l+4|0;p=k+8|0;q=l+8|0;r=k+12|0;s=l+12|0;n=e+4|0;y=d+4|0;o=h+4|0;x=0;do{a=c[f>>2]|0;D=c[u>>2]|0;t=a+(x*28|0)+20|0;tb[c[(c[D>>2]|0)+24>>2]&15](D,k,d,c[t>>2]|0);D=c[u>>2]|0;tb[c[(c[D>>2]|0)+24>>2]&15](D,l,e,c[t>>2]|0);t=a+(x*28|0)|0;B=$(g[k>>2]);C=$(g[l>>2]);A=$(g[v>>2]);z=$(g[w>>2]);B=$(B<C?B:C);C=$(A<z?A:z);D=t;g[D>>2]=B;g[D+4>>2]=C;B=$(g[p>>2]);C=$(g[q>>2]);z=$(g[r>>2]);A=$(g[s>>2]);B=$(B>C?B:C);C=$(z>A?z:A);D=a+(x*28|0)+8|0;g[D>>2]=B;g[D+4>>2]=C;B=$(g[e>>2]);B=$(B-$(g[d>>2]));C=$(g[n>>2]);C=$(C-$(g[y>>2]));g[h>>2]=B;g[o>>2]=C;Xc(b,c[a+(x*28|0)+24>>2]|0,t,h);x=x+1|0}while((x|0)<(c[j>>2]|0));i=m;return}function Oc(b,d){b=b|0;d=d|0;var e=0,f=0,h=0,j=0;e=i;dc(b);od(b+68|0);rc(b+102872|0);j=b+102968|0;c[b+102980>>2]=0;c[b+102984>>2]=0;f=b+102952|0;h=b+102992|0;c[f+0>>2]=0;c[f+4>>2]=0;c[f+8>>2]=0;c[f+12>>2]=0;a[h]=1;a[b+102993|0]=1;a[b+102994|0]=0;a[b+102995|0]=1;a[b+102976|0]=1;h=d;f=c[h+4>>2]|0;d=j;c[d>>2]=c[h>>2];c[d+4>>2]=f;c[b+102868>>2]=4;g[b+102988>>2]=$(0.0);c[b+102948>>2]=b;d=b+102996|0;c[d+0>>2]=0;c[d+4>>2]=0;c[d+8>>2]=0;c[d+12>>2]=0;c[d+16>>2]=0;c[d+20>>2]=0;c[d+24>>2]=0;c[d+28>>2]=0;i=e;return}function Pc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;d=i;if((c[a+102868>>2]&2|0)!=0){ya(2160,2184,109,2216)}e=fc(a,152)|0;if((e|0)==0){e=0}else{jc(e,b,a)}c[e+92>>2]=0;b=a+102952|0;c[e+96>>2]=c[b>>2];f=c[b>>2]|0;if((f|0)!=0){c[f+92>>2]=e}c[b>>2]=e;f=a+102960|0;c[f>>2]=(c[f>>2]|0)+1;i=d;return e|0}function Qc(f,h){f=f|0;h=h|0;var j=0,k=0;j=i;k=f+102976|0;if((h&1|0)==(d[k]|0|0)){i=j;return}a[k]=h&1;if(h){i=j;return}f=c[f+102952>>2]|0;if((f|0)==0){i=j;return}do{k=f+4|0;h=e[k>>1]|0;if((h&2|0)==0){b[k>>1]=h|2;g[f+144>>2]=$(0.0)}f=c[f+96>>2]|0}while((f|0)!=0);i=j;return}function Rc(d,e){d=d|0;e=e|0;var f=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=hb;j=i;i=i+96|0;k=j+32|0;o=j;h=j+84|0;q=d+103008|0;g[q>>2]=$(0.0);t=d+103012|0;g[t>>2]=$(0.0);n=d+103016|0;g[n>>2]=$(0.0);u=d+102960|0;f=d+102872|0;l=d+68|0;Vd(k,c[u>>2]|0,c[d+102936>>2]|0,c[d+102964>>2]|0,l,c[d+102944>>2]|0);m=d+102952|0;v=c[m>>2]|0;if((v|0)!=0){do{Q=v+4|0;b[Q>>1]=b[Q>>1]&65534;v=c[v+96>>2]|0}while((v|0)!=0)}v=c[d+102932>>2]|0;if((v|0)!=0){do{Q=v+4|0;c[Q>>2]=c[Q>>2]&-2;v=c[v+12>>2]|0}while((v|0)!=0)}v=c[d+102956>>2]|0;if((v|0)!=0){do{a[v+60|0]=0;v=c[v+12>>2]|0}while((v|0)!=0)}C=c[u>>2]|0;u=qd(l,C<<2)|0;K=c[m>>2]|0;a:do{if((K|0)!=0){w=k+28|0;I=k+36|0;F=k+32|0;v=k+40|0;B=k+8|0;H=k+48|0;G=k+16|0;E=k+44|0;J=k+12|0;D=d+102968|0;A=d+102976|0;z=o+12|0;y=o+16|0;x=o+20|0;b:while(1){L=K+4|0;M=b[L>>1]|0;if((M&35)==34?(c[K>>2]|0)!=0:0){c[w>>2]=0;c[I>>2]=0;c[F>>2]=0;c[u>>2]=K;b[L>>1]=M&65535|1;N=1;do{N=N+ -1|0;L=c[u+(N<<2)>>2]|0;M=L+4|0;O=b[M>>1]|0;if((O&32)==0){n=13;break b}P=c[w>>2]|0;if((P|0)>=(c[v>>2]|0)){n=15;break b}c[L+8>>2]=P;Q=c[w>>2]|0;c[(c[B>>2]|0)+(Q<<2)>>2]=L;c[w>>2]=Q+1;O=O&65535;if((O&2|0)==0){b[M>>1]=O|2;g[L+144>>2]=$(0.0)}if((c[L>>2]|0)!=0){M=c[L+112>>2]|0;if((M|0)!=0){do{Q=c[M+4>>2]|0;O=Q+4|0;if(((c[O>>2]&7|0)==6?(a[(c[Q+48>>2]|0)+38|0]|0)==0:0)?(a[(c[Q+52>>2]|0)+38|0]|0)==0:0){P=c[I>>2]|0;if((P|0)>=(c[E>>2]|0)){n=25;break b}c[I>>2]=P+1;c[(c[J>>2]|0)+(P<<2)>>2]=Q;c[O>>2]=c[O>>2]|1;Q=c[M>>2]|0;O=Q+4|0;P=b[O>>1]|0;if((P&1)==0){if((N|0)>=(C|0)){n=28;break b}c[u+(N<<2)>>2]=Q;b[O>>1]=P&65535|1;N=N+1|0}}M=c[M+12>>2]|0}while((M|0)!=0)}L=c[L+108>>2]|0;if((L|0)!=0){do{P=L+4|0;O=c[P>>2]|0;if((a[O+60|0]|0)==0?(p=c[L>>2]|0,s=p+4|0,r=b[s>>1]|0,!((r&32)==0)):0){M=c[F>>2]|0;if((M|0)>=(c[H>>2]|0)){n=35;break b}c[F>>2]=M+1;c[(c[G>>2]|0)+(M<<2)>>2]=O;a[(c[P>>2]|0)+60|0]=1;if((r&1)==0){if((N|0)>=(C|0)){n=38;break b}c[u+(N<<2)>>2]=p;b[s>>1]=r&65535|1;N=N+1|0}}L=c[L+12>>2]|0}while((L|0)!=0)}}}while((N|0)>0);Xd(k,o,e,D,(a[A]|0)!=0);R=$(g[z>>2]);g[q>>2]=$(R+$(g[q>>2]));R=$(g[y>>2]);g[t>>2]=$(R+$(g[t>>2]));R=$(g[x>>2]);g[n>>2]=$(R+$(g[n>>2]));N=c[w>>2]|0;if((N|0)>0){L=c[B>>2]|0;O=0;do{M=c[L+(O<<2)>>2]|0;if((c[M>>2]|0)==0){Q=M+4|0;b[Q>>1]=b[Q>>1]&65534}O=O+1|0}while((O|0)<(N|0))}}K=c[K+96>>2]|0;if((K|0)==0){break a}}if((n|0)==13){ya(2232,2184,445,2256)}else if((n|0)==15){ya(2520,2440,54,2472)}else if((n|0)==25){ya(2480,2440,62,2472)}else if((n|0)==28){ya(2264,2184,495,2256)}else if((n|0)==35){ya(2408,2440,68,2472)}else if((n|0)==38){ya(2264,2184,524,2256)}}}while(0);rd(l,u);sd(h);l=c[m>>2]|0;if((l|0)==0){uc(f);R=$(ud(h));Q=d+103020|0;g[Q>>2]=R;Wd(k);i=j;return}do{if(!((b[l+4>>1]&1)==0)?(c[l>>2]|0)!=0:0){lc(l)}l=c[l+96>>2]|0}while((l|0)!=0);uc(f);R=$(ud(h));Q=d+103020|0;g[Q>>2]=R;Wd(k);i=j;return}function Sc(d,f){d=d|0;f=f|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,S=0,T=0,U=0,V=0,W=0,X=hb,Y=0,Z=0,_=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=hb,wa=hb,xa=hb,za=hb,Aa=hb,Ba=hb,Ca=hb;h=i;i=i+336|0;k=h+284|0;n=h+152|0;m=h+144|0;l=h+108|0;p=h+72|0;o=h+64|0;u=h+24|0;q=h;r=d+102872|0;t=d+102944|0;Vd(k,64,32,0,d+68|0,c[t>>2]|0);j=d+102995|0;if((a[j]|0)!=0){v=c[d+102952>>2]|0;if((v|0)!=0){do{ua=v+4|0;b[ua>>1]=b[ua>>1]&65534;g[v+60>>2]=$(0.0);v=c[v+96>>2]|0}while((v|0)!=0)}v=d+102932|0;w=c[v>>2]|0;if((w|0)!=0){do{ua=w+4|0;c[ua>>2]=c[ua>>2]&-34;c[w+128>>2]=0;g[w+132>>2]=$(1.0);w=c[w+12>>2]|0}while((w|0)!=0)}}else{v=d+102932|0}F=k+28|0;G=k+36|0;H=k+32|0;I=k+40|0;J=k+8|0;E=k+44|0;D=k+12|0;C=o+4|0;B=q+4|0;A=q+8|0;z=q+16|0;y=f+12|0;x=q+12|0;w=q+20|0;U=d+102994|0;S=n+16|0;P=n+20|0;O=n+24|0;N=n+44|0;M=n+48|0;L=n+52|0;W=n+28|0;K=n+56|0;V=n+92|0;d=n+128|0;T=m+4|0;a:while(1){ba=c[v>>2]|0;if((ba|0)==0){l=36;break}else{X=$(1.0);Z=0}do{ca=ba+4|0;Y=c[ca>>2]|0;do{if((Y&4|0)!=0?(c[ba+128>>2]|0)<=8:0){if((Y&32|0)==0){Y=c[ba+48>>2]|0;_=c[ba+52>>2]|0;if((a[Y+38|0]|0)!=0){break}if((a[_+38|0]|0)!=0){break}aa=c[Y+8>>2]|0;ea=c[_+8>>2]|0;ha=c[aa>>2]|0;ga=c[ea>>2]|0;if(!((ha|0)==2|(ga|0)==2)){l=16;break a}fa=b[aa+4>>1]|0;da=b[ea+4>>1]|0;if(!((fa&2)!=0&(ha|0)!=0|(da&2)!=0&(ga|0)!=0)){break}if(!((fa&8)!=0|(ha|0)!=2|((da&8)!=0|(ga|0)!=2))){break}fa=aa+28|0;ga=aa+60|0;wa=$(g[ga>>2]);da=ea+28|0;ha=ea+60|0;va=$(g[ha>>2]);if(!(wa<va)){if(va<wa){if(!(va<$(1.0))){l=25;break a}va=$($(wa-va)/$($(1.0)-va));ua=ea+36|0;xa=$($(1.0)-va);Ba=$($(g[ua>>2])*xa);za=$(xa*$(g[ea+40>>2]));Aa=$(va*$(g[ea+44>>2]));Aa=$(Ba+Aa);za=$(za+$(va*$(g[ea+48>>2])));Aa=$(Aa);za=$(za);g[ua>>2]=Aa;g[ua+4>>2]=za;ua=ea+52|0;xa=$(xa*$(g[ua>>2]));g[ua>>2]=$(xa+$(va*$(g[ea+56>>2])));g[ha>>2]=wa;va=wa}else{va=wa}}else{if(!(wa<$(1.0))){l=21;break a}Ba=$($(va-wa)/$($(1.0)-wa));ua=aa+36|0;Aa=$($(1.0)-Ba);wa=$($(g[ua>>2])*Aa);za=$(Aa*$(g[aa+40>>2]));xa=$(Ba*$(g[aa+44>>2]));xa=$(wa+xa);za=$(za+$(Ba*$(g[aa+48>>2])));xa=$(xa);za=$(za);g[ua>>2]=xa;g[ua+4>>2]=za;ua=aa+52|0;Aa=$(Aa*$(g[ua>>2]));g[ua>>2]=$(Aa+$(Ba*$(g[aa+56>>2])));g[ga>>2]=va}if(!(va<$(1.0))){l=28;break a}ua=c[ba+56>>2]|0;aa=c[ba+60>>2]|0;c[S>>2]=0;c[P>>2]=0;g[O>>2]=$(0.0);c[N>>2]=0;c[M>>2]=0;g[L>>2]=$(0.0);Zc(n,c[Y+12>>2]|0,ua);Zc(W,c[_+12>>2]|0,aa);Y=K+0|0;_=fa+0|0;aa=Y+36|0;do{c[Y>>2]=c[_>>2];Y=Y+4|0;_=_+4|0}while((Y|0)<(aa|0));Y=V+0|0;_=da+0|0;aa=Y+36|0;do{c[Y>>2]=c[_>>2];Y=Y+4|0;_=_+4|0}while((Y|0)<(aa|0));g[d>>2]=$(1.0);kd(m,n);if((c[m>>2]|0)==3){va=$(va+$($($(1.0)-va)*$(g[T>>2])));ua=va<$(1.0);va=ua?va:$(1.0)}else{va=$(1.0)}g[ba+132>>2]=va;c[ca>>2]=c[ca>>2]|32}else{va=$(g[ba+132>>2])}if(va<X){X=va;Z=ba}}}while(0);ba=c[ba+12>>2]|0}while((ba|0)!=0);if((Z|0)==0|X>$(.9999988079071045)){l=36;break}ba=c[(c[Z+48>>2]|0)+8>>2]|0;ca=c[(c[Z+52>>2]|0)+8>>2]|0;da=ba+28|0;Y=l+0|0;_=da+0|0;aa=Y+36|0;do{c[Y>>2]=c[_>>2];Y=Y+4|0;_=_+4|0}while((Y|0)<(aa|0));ea=ca+28|0;Y=p+0|0;_=ea+0|0;aa=Y+36|0;do{c[Y>>2]=c[_>>2];Y=Y+4|0;_=_+4|0}while((Y|0)<(aa|0));Y=ba+60|0;va=$(g[Y>>2]);if(!(va<$(1.0))){l=38;break}Aa=$($(X-va)/$($(1.0)-va));la=ba+36|0;Ba=$($(1.0)-Aa);za=$($(g[la>>2])*Ba);wa=$(Ba*$(g[ba+40>>2]));ga=ba+44|0;Ca=$(Aa*$(g[ga>>2]));ha=ba+48|0;Ca=$(za+Ca);wa=$(wa+$(Aa*$(g[ha>>2])));za=$(Ca);xa=$(wa);g[la>>2]=za;g[la+4>>2]=xa;la=ba+52|0;Ba=$(Ba*$(g[la>>2]));fa=ba+56|0;Aa=$(Ba+$(Aa*$(g[fa>>2])));g[la>>2]=Aa;g[Y>>2]=X;la=ba+44|0;g[la>>2]=za;g[la+4>>2]=xa;g[fa>>2]=Aa;xa=$(+R(+Aa));la=ba+20|0;g[la>>2]=xa;Aa=$(+Q(+Aa));ka=ba+24|0;g[ka>>2]=Aa;ma=ba+12|0;ja=ba+28|0;za=$(g[ja>>2]);Ba=$(Aa*za);ia=ba+32|0;va=$(g[ia>>2]);Ba=$(Ca-$(Ba-$(xa*va)));va=$(wa-$($(xa*za)+$(Aa*va)));Ba=$(Ba);va=$(va);Y=ma;g[Y>>2]=Ba;g[Y+4>>2]=va;Y=ca+60|0;va=$(g[Y>>2]);if(!(va<$(1.0))){l=40;break}Aa=$($(X-va)/$($(1.0)-va));sa=ca+36|0;Ba=$($(1.0)-Aa);za=$($(g[sa>>2])*Ba);wa=$(Ba*$(g[ca+40>>2]));pa=ca+44|0;va=$(Aa*$(g[pa>>2]));oa=ca+48|0;va=$(za+va);wa=$(wa+$(Aa*$(g[oa>>2])));za=$(va);xa=$(wa);g[sa>>2]=za;g[sa+4>>2]=xa;sa=ca+52|0;Ba=$(Ba*$(g[sa>>2]));na=ca+56|0;Aa=$(Ba+$(Aa*$(g[na>>2])));g[sa>>2]=Aa;g[Y>>2]=X;sa=ca+44|0;g[sa>>2]=za;g[sa+4>>2]=xa;g[na>>2]=Aa;xa=$(+R(+Aa));sa=ca+20|0;g[sa>>2]=xa;Aa=$(+Q(+Aa));ra=ca+24|0;g[ra>>2]=Aa;ta=ca+12|0;qa=ca+28|0;za=$(g[qa>>2]);Ba=$(Aa*za);ua=ca+32|0;Ca=$(g[ua>>2]);Ba=$(va-$(Ba-$(xa*Ca)));Ca=$(wa-$($(xa*za)+$(Aa*Ca)));Ba=$(Ba);Ca=$(Ca);Y=ta;g[Y>>2]=Ba;g[Y+4>>2]=Ca;yd(Z,c[t>>2]|0);Y=Z+4|0;_=c[Y>>2]|0;c[Y>>2]=_&-33;aa=Z+128|0;c[aa>>2]=(c[aa>>2]|0)+1;if((_&6|0)!=6){c[Y>>2]=_&-37;Y=da+0|0;_=l+0|0;aa=Y+36|0;do{c[Y>>2]=c[_>>2];Y=Y+4|0;_=_+4|0}while((Y|0)<(aa|0));Y=ea+0|0;_=p+0|0;aa=Y+36|0;do{c[Y>>2]=c[_>>2];Y=Y+4|0;_=_+4|0}while((Y|0)<(aa|0));za=$(g[fa>>2]);Ca=$(+R(+za));g[la>>2]=Ca;za=$(+Q(+za));g[ka>>2]=za;Ba=$(g[ja>>2]);xa=$(za*Ba);Aa=$(g[ia>>2]);xa=$(xa-$(Ca*Aa));Aa=$($(Ca*Ba)+$(za*Aa));xa=$($(g[ga>>2])-xa);Aa=$($(g[ha>>2])-Aa);xa=$(xa);Aa=$(Aa);g[ma>>2]=xa;g[ma+4>>2]=Aa;Aa=$(g[na>>2]);xa=$(+R(+Aa));g[sa>>2]=xa;Aa=$(+Q(+Aa));g[ra>>2]=Aa;za=$(g[qa>>2]);Ba=$(Aa*za);Ca=$(g[ua>>2]);Ba=$(Ba-$(xa*Ca));Ca=$($(xa*za)+$(Aa*Ca));Ba=$($(g[pa>>2])-Ba);Ca=$($(g[oa>>2])-Ca);Ba=$(Ba);Ca=$(Ca);ua=ta;g[ua>>2]=Ba;g[ua+4>>2]=Ca;continue}_=ba+4|0;aa=e[_>>1]|0;if((aa&2|0)==0){b[_>>1]=aa|2;g[ba+144>>2]=$(0.0)}aa=ca+4|0;da=e[aa>>1]|0;if((da&2|0)==0){b[aa>>1]=da|2;g[ca+144>>2]=$(0.0)}c[F>>2]=0;c[G>>2]=0;c[H>>2]=0;if((c[I>>2]|0)<=0){l=48;break}da=ba+8|0;c[da>>2]=0;fa=c[F>>2]|0;c[(c[J>>2]|0)+(fa<<2)>>2]=ba;fa=fa+1|0;c[F>>2]=fa;if((fa|0)>=(c[I>>2]|0)){l=50;break}ea=ca+8|0;c[ea>>2]=fa;fa=c[F>>2]|0;c[(c[J>>2]|0)+(fa<<2)>>2]=ca;c[F>>2]=fa+1;fa=c[G>>2]|0;if((fa|0)>=(c[E>>2]|0)){l=52;break}c[G>>2]=fa+1;c[(c[D>>2]|0)+(fa<<2)>>2]=Z;b[_>>1]=e[_>>1]|1;b[aa>>1]=e[aa>>1]|1;c[Y>>2]=c[Y>>2]|1;c[o>>2]=ba;c[C>>2]=ca;Z=1;while(1){b:do{if((c[ba>>2]|0)==2?(s=c[ba+112>>2]|0,(s|0)!=0):0){ba=ba+4|0;fa=s;do{if((c[F>>2]|0)==(c[I>>2]|0)){break b}if((c[G>>2]|0)==(c[E>>2]|0)){break b}ga=c[fa+4>>2]|0;ha=ga+4|0;do{if((c[ha>>2]&1|0)==0){ca=c[fa>>2]|0;if(((c[ca>>2]|0)==2?(b[ba>>1]&8)==0:0)?(b[ca+4>>1]&8)==0:0){break}if((a[(c[ga+48>>2]|0)+38|0]|0)==0?(a[(c[ga+52>>2]|0)+38|0]|0)==0:0){ia=ca+28|0;Y=u+0|0;_=ia+0|0;aa=Y+36|0;do{c[Y>>2]=c[_>>2];Y=Y+4|0;_=_+4|0}while((Y|0)<(aa|0));Y=ca+4|0;if((b[Y>>1]&1)==0){_=ca+60|0;va=$(g[_>>2]);if(!(va<$(1.0))){l=67;break a}Aa=$($(X-va)/$($(1.0)-va));ta=ca+36|0;Ba=$($(1.0)-Aa);za=$($(g[ta>>2])*Ba);wa=$(Ba*$(g[ca+40>>2]));va=$(Aa*$(g[ca+44>>2]));va=$(za+va);wa=$(wa+$(Aa*$(g[ca+48>>2])));za=$(va);xa=$(wa);g[ta>>2]=za;g[ta+4>>2]=xa;ta=ca+52|0;Ba=$(Ba*$(g[ta>>2]));ua=ca+56|0;Aa=$(Ba+$(Aa*$(g[ua>>2])));g[ta>>2]=Aa;g[_>>2]=X;ta=ca+44|0;g[ta>>2]=za;g[ta+4>>2]=xa;g[ua>>2]=Aa;xa=$(+R(+Aa));g[ca+20>>2]=xa;Aa=$(+Q(+Aa));g[ca+24>>2]=Aa;za=$(g[ca+28>>2]);Ba=$(Aa*za);Ca=$(g[ca+32>>2]);Ba=$(va-$(Ba-$(xa*Ca)));Ca=$(wa-$($(xa*za)+$(Aa*Ca)));Ba=$(Ba);Ca=$(Ca);ua=ca+12|0;g[ua>>2]=Ba;g[ua+4>>2]=Ca}yd(ga,c[t>>2]|0);_=c[ha>>2]|0;if((_&4|0)==0){Y=ia+0|0;_=u+0|0;aa=Y+36|0;do{c[Y>>2]=c[_>>2];Y=Y+4|0;_=_+4|0}while((Y|0)<(aa|0));Aa=$(g[ca+56>>2]);xa=$(+R(+Aa));g[ca+20>>2]=xa;Aa=$(+Q(+Aa));g[ca+24>>2]=Aa;za=$(g[ca+28>>2]);Ba=$(Aa*za);Ca=$(g[ca+32>>2]);Ba=$(Ba-$(xa*Ca));Ca=$($(xa*za)+$(Aa*Ca));Ba=$($(g[ca+44>>2])-Ba);Ca=$($(g[ca+48>>2])-Ca);Ba=$(Ba);Ca=$(Ca);ua=ca+12|0;g[ua>>2]=Ba;g[ua+4>>2]=Ca;break}if((_&2|0)==0){Y=ia+0|0;_=u+0|0;aa=Y+36|0;do{c[Y>>2]=c[_>>2];Y=Y+4|0;_=_+4|0}while((Y|0)<(aa|0));Aa=$(g[ca+56>>2]);xa=$(+R(+Aa));g[ca+20>>2]=xa;Aa=$(+Q(+Aa));g[ca+24>>2]=Aa;za=$(g[ca+28>>2]);Ba=$(Aa*za);Ca=$(g[ca+32>>2]);Ba=$(Ba-$(xa*Ca));Ca=$($(xa*za)+$(Aa*Ca));Ba=$($(g[ca+44>>2])-Ba);Ca=$($(g[ca+48>>2])-Ca);Ba=$(Ba);Ca=$(Ca);ua=ca+12|0;g[ua>>2]=Ba;g[ua+4>>2]=Ca;break}c[ha>>2]=_|1;_=c[G>>2]|0;if((_|0)>=(c[E>>2]|0)){l=74;break a}c[G>>2]=_+1;c[(c[D>>2]|0)+(_<<2)>>2]=ga;_=e[Y>>1]|0;if((_&1|0)==0){b[Y>>1]=_|1;if((c[ca>>2]|0)!=0?(_&2|0)==0:0){b[Y>>1]=_|3;g[ca+144>>2]=$(0.0)}Y=c[F>>2]|0;if((Y|0)>=(c[I>>2]|0)){l=80;break a}c[ca+8>>2]=Y;ua=c[F>>2]|0;c[(c[J>>2]|0)+(ua<<2)>>2]=ca;c[F>>2]=ua+1}}}}while(0);fa=c[fa+12>>2]|0}while((fa|0)!=0)}}while(0);if((Z|0)>=2){break}ba=c[o+(Z<<2)>>2]|0;Z=Z+1|0}Ca=$($(1.0)-X);Ca=$(Ca*$(g[f>>2]));g[q>>2]=Ca;g[B>>2]=$($(1.0)/Ca);g[A>>2]=$(1.0);c[z>>2]=20;c[x>>2]=c[y>>2];a[w]=0;Yd(k,q,c[da>>2]|0,c[ea>>2]|0);Z=c[F>>2]|0;if((Z|0)>0){Y=0;do{_=c[(c[J>>2]|0)+(Y<<2)>>2]|0;ua=_+4|0;b[ua>>1]=b[ua>>1]&65534;if((c[_>>2]|0)==2){lc(_);Z=c[_+112>>2]|0;if((Z|0)!=0){do{ua=(c[Z+4>>2]|0)+4|0;c[ua>>2]=c[ua>>2]&-34;Z=c[Z+12>>2]|0}while((Z|0)!=0)}Z=c[F>>2]|0}Y=Y+1|0}while((Y|0)<(Z|0))}uc(r);if((a[U]|0)!=0){l=92;break}}switch(l|0){case 16:{ya(2288,2184,641,2344);break};case 21:{ya(2360,2376,723,2400);break};case 25:{ya(2360,2376,723,2400);break};case 28:{ya(2360,2184,676,2344);break};case 36:{a[j]=1;Wd(k);i=h;return};case 38:{ya(2360,2376,723,2400);break};case 40:{ya(2360,2376,723,2400);break};case 48:{ya(2520,2440,54,2472);break};case 50:{ya(2520,2440,54,2472);break};case 52:{ya(2480,2440,62,2472);break};case 67:{ya(2360,2376,723,2400);break};case 74:{ya(2480,2440,62,2472);break};case 80:{ya(2520,2440,54,2472);break};case 92:{a[j]=0;Wd(k);i=h;return}}}function Tc(b,d,e,f){b=b|0;d=$(d);e=e|0;f=f|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;k=i;i=i+32|0;j=k+27|0;l=k;o=k+26|0;p=k+25|0;n=k+24|0;sd(j);h=b+102868|0;q=c[h>>2]|0;if((q&1|0)!=0){uc(b+102872|0);q=c[h>>2]&-2;c[h>>2]=q}c[h>>2]=q|2;g[l>>2]=d;c[l+12>>2]=e;c[l+16>>2]=f;if(d>$(0.0)){g[l+4>>2]=$($(1.0)/d)}else{g[l+4>>2]=$(0.0)}e=b+102988|0;g[l+8>>2]=$($(g[e>>2])*d);a[l+20|0]=a[b+102992|0]|0;sd(o);tc(b+102872|0);g[b+103e3>>2]=$(ud(o));if((a[b+102995|0]|0)!=0?$(g[l>>2])>$(0.0):0){sd(p);Rc(b,l);g[b+103004>>2]=$(ud(p))}if((a[b+102993|0]|0)!=0){d=$(g[l>>2]);if(d>$(0.0)){sd(n);Sc(b,l);g[b+103024>>2]=$(ud(n));m=12}}else{m=12}if((m|0)==12){d=$(g[l>>2])}if(d>$(0.0)){g[e>>2]=$(g[l+4>>2])}l=c[h>>2]|0;if((l&4|0)==0){q=l&-3;c[h>>2]=q;d=$(ud(j));q=b+102996|0;g[q>>2]=d;i=k;return}m=c[b+102952>>2]|0;if((m|0)==0){q=l&-3;c[h>>2]=q;d=$(ud(j));q=b+102996|0;g[q>>2]=d;i=k;return}do{g[m+76>>2]=$(0.0);g[m+80>>2]=$(0.0);g[m+84>>2]=$(0.0);m=c[m+96>>2]|0}while((m|0)!=0);q=l&-3;c[h>>2]=q;d=$(ud(j));q=b+102996|0;g[q>>2]=d;i=k;return}function Uc(a,c,d){a=a|0;c=c|0;d=d|0;var e=0;a=i;e=b[c+36>>1]|0;if(!(e<<16>>16!=(b[d+36>>1]|0)|e<<16>>16==0)){e=e<<16>>16>0;i=a;return e|0}if((b[d+32>>1]&b[c+34>>1])<<16>>16==0){e=0;i=a;return e|0}e=(b[d+34>>1]&b[c+32>>1])<<16>>16!=0;i=a;return e|0}function Vc(a){a=a|0;var b=0;b=i;cd(a);c[a+28>>2]=0;c[a+48>>2]=16;c[a+52>>2]=0;c[a+44>>2]=hc(192)|0;c[a+36>>2]=16;c[a+40>>2]=0;c[a+32>>2]=hc(64)|0;i=b;return}function Wc(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=i;d=fd(a,b,d)|0;b=a+28|0;c[b>>2]=(c[b>>2]|0)+1;b=a+40|0;f=c[b>>2]|0;g=a+36|0;a=a+32|0;if((f|0)==(c[g>>2]|0)){h=c[a>>2]|0;c[g>>2]=f<<1;f=hc(f<<3)|0;c[a>>2]=f;ff(f|0,h|0,c[b>>2]<<2|0)|0;ic(h);f=c[b>>2]|0}c[(c[a>>2]|0)+(f<<2)>>2]=d;c[b>>2]=(c[b>>2]|0)+1;i=e;return d|0}function Xc(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;f=i;if(!(id(a,b,d,e)|0)){i=f;return}e=a+40|0;d=c[e>>2]|0;g=a+36|0;a=a+32|0;if((d|0)==(c[g>>2]|0)){h=c[a>>2]|0;c[g>>2]=d<<1;d=hc(d<<3)|0;c[a>>2]=d;ff(d|0,h|0,c[e>>2]<<2|0)|0;ic(h);d=c[e>>2]|0}c[(c[a>>2]|0)+(d<<2)>>2]=b;c[e>>2]=(c[e>>2]|0)+1;i=f;return}function Yc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0;d=i;f=a+56|0;h=c[f>>2]|0;if((h|0)==(b|0)){i=d;return 1}e=a+52|0;g=c[e>>2]|0;j=a+48|0;a=a+44|0;if((g|0)==(c[j>>2]|0)){h=c[a>>2]|0;c[j>>2]=g<<1;g=hc(g*24|0)|0;c[a>>2]=g;ff(g|0,h|0,(c[e>>2]|0)*12|0)|0;ic(h);h=c[f>>2]|0;g=c[e>>2]|0}a=c[a>>2]|0;c[a+(g*12|0)>>2]=(h|0)>(b|0)?b:h;f=c[f>>2]|0;c[a+((c[e>>2]|0)*12|0)+4>>2]=(f|0)<(b|0)?b:f;c[e>>2]=(c[e>>2]|0)+1;i=d;return 1}function Zc(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,h=0,j=0,k=0,l=0;e=i;f=c[b+4>>2]|0;if((f|0)==0){c[a+16>>2]=b+12;c[a+20>>2]=1;g[a+24>>2]=$(g[b+8>>2]);i=e;return}else if((f|0)==1){c[a+16>>2]=b+12;c[a+20>>2]=2;g[a+24>>2]=$(g[b+8>>2]);i=e;return}else if((f|0)==3){if(!((d|0)>-1)){ya(2632,2672,53,2704)}f=b+16|0;if((c[f>>2]|0)<=(d|0)){ya(2632,2672,53,2704)}j=b+12|0;l=(c[j>>2]|0)+(d<<3)|0;k=c[l+4>>2]|0;h=a;c[h>>2]=c[l>>2];c[h+4>>2]=k;h=d+1|0;d=a+8|0;j=c[j>>2]|0;if((h|0)<(c[f>>2]|0)){j=j+(h<<3)|0;k=c[j+4>>2]|0;l=d;c[l>>2]=c[j>>2];c[l+4>>2]=k}else{k=c[j+4>>2]|0;l=d;c[l>>2]=c[j>>2];c[l+4>>2]=k}c[a+16>>2]=a;c[a+20>>2]=2;g[a+24>>2]=$(g[b+8>>2]);i=e;return}else if((f|0)==2){c[a+16>>2]=b+20;c[a+20>>2]=c[b+148>>2];g[a+24>>2]=$(g[b+8>>2]);i=e;return}else{ya(2712,2672,81,2704)}}function _c(a){a=a|0;var b=0,d=0,e=0,f=hb,h=hb,j=hb,k=hb,l=hb,m=hb,n=hb,o=hb,p=hb,q=hb,r=hb,s=hb,t=hb,u=hb,v=hb,w=hb,x=hb,y=0;b=i;d=a+16|0;t=$(g[d>>2]);r=$(g[d+4>>2]);d=a+36|0;e=a+52|0;q=$(g[e>>2]);s=$(g[e+4>>2]);e=a+72|0;y=a+88|0;u=$(g[y>>2]);n=$(g[y+4>>2]);w=$(q-t);m=$(s-r);l=$($(t*w)+$(r*m));k=$($(q*w)+$(s*m));f=$(u-t);v=$(n-r);j=$($(t*f)+$(r*v));h=$($(u*f)+$(n*v));x=$(u-q);o=$(n-s);p=$($(q*x)+$(s*o));o=$($(u*x)+$(n*o));f=$($(w*v)-$(m*f));m=$($($(q*n)-$(s*u))*f);n=$($($(r*u)-$(t*n))*f);f=$($($(t*s)-$(r*q))*f);if(!(!(l>=$(-0.0))|!(j>=$(-0.0)))){g[a+24>>2]=$(1.0);c[a+108>>2]=1;i=b;return}if(!(!(l<$(-0.0))|!(k>$(0.0))|!(f<=$(0.0)))){x=$($(1.0)/$(k-l));g[a+24>>2]=$(k*x);g[a+60>>2]=$(-$(l*x));c[a+108>>2]=2;i=b;return}if(!(!(j<$(-0.0))|!(h>$(0.0))|!(n<=$(0.0)))){x=$($(1.0)/$(h-j));g[a+24>>2]=$(h*x);g[a+96>>2]=$(-$(j*x));c[a+108>>2]=2;a=d+0|0;e=e+0|0;d=a+36|0;do{c[a>>2]=c[e>>2];a=a+4|0;e=e+4|0}while((a|0)<(d|0));i=b;return}if(!(!(k<=$(0.0))|!(p>=$(-0.0)))){g[a+60>>2]=$(1.0);c[a+108>>2]=1;a=a+0|0;e=d+0|0;d=a+36|0;do{c[a>>2]=c[e>>2];a=a+4|0;e=e+4|0}while((a|0)<(d|0));i=b;return}if(!(!(h<=$(0.0))|!(o<=$(0.0)))){g[a+96>>2]=$(1.0);c[a+108>>2]=1;a=a+0|0;e=e+0|0;d=a+36|0;do{c[a>>2]=c[e>>2];a=a+4|0;e=e+4|0}while((a|0)<(d|0));i=b;return}if(!(p<$(-0.0))|!(o>$(0.0))|!(m<=$(0.0))){x=$($(1.0)/$(f+$(m+n)));g[a+24>>2]=$(m*x);g[a+60>>2]=$(n*x);g[a+96>>2]=$(f*x);c[a+108>>2]=3;i=b;return}else{x=$($(1.0)/$(o-p));g[a+60>>2]=$(o*x);g[a+96>>2]=$(-$(p*x));c[a+108>>2]=2;a=a+0|0;e=e+0|0;d=a+36|0;do{c[a>>2]=c[e>>2];a=a+4|0;e=e+4|0}while((a|0)<(d|0));i=b;return}}function $c(d,e,f){d=d|0;e=e|0;f=f|0;var h=0,j=0,k=0,l=0,m=hb,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=hb,v=hb,w=hb,x=0,y=0,z=hb,A=hb,B=hb,C=hb,D=hb,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,P=hb,Q=hb,R=hb,S=0,T=0,U=0,V=0,W=hb,X=hb,Y=hb,Z=0;h=i;i=i+176|0;p=h+152|0;o=h+136|0;j=h+24|0;r=h+12|0;s=h;c[652]=(c[652]|0)+1;n=f+28|0;J=f+56|0;c[p+0>>2]=c[J+0>>2];c[p+4>>2]=c[J+4>>2];c[p+8>>2]=c[J+8>>2];c[p+12>>2]=c[J+12>>2];J=f+72|0;c[o+0>>2]=c[J+0>>2];c[o+4>>2]=c[J+4>>2];c[o+8>>2]=c[J+8>>2];c[o+12>>2]=c[J+12>>2];ad(j,e,f,p,n,o);n=j+108|0;J=c[n>>2]|0;if((J|0)==3|(J|0)==2|(J|0)==1){k=j+16|0;l=j+20|0;w=$(g[p+12>>2]);u=$(g[p+8>>2]);t=f+16|0;q=f+20|0;v=$(g[p>>2]);z=$(g[p+4>>2]);A=$(g[o+12>>2]);C=$(g[o+8>>2]);y=f+44|0;x=f+48|0;B=$(g[o>>2]);D=$(g[o+4>>2]);o=j+52|0;p=j+56|0;H=j+16|0;E=j+36|0;G=j+52|0;I=j+24|0;F=j+60|0;L=0;a:while(1){K=(J|0)>0;if(K){M=0;do{c[r+(M<<2)>>2]=c[j+(M*36|0)+28>>2];c[s+(M<<2)>>2]=c[j+(M*36|0)+32>>2];M=M+1|0}while((M|0)!=(J|0))}do{if((J|0)==1){N=17}else if((J|0)==3){_c(j);M=c[n>>2]|0;if((M|0)==2){N=18}else if((M|0)==1){N=17}else if((M|0)==0){N=15;break a}else if((M|0)==3){N=42;break a}else{N=16;break a}}else if((J|0)==2){Z=H;Y=$(g[Z>>2]);P=$(g[Z+4>>2]);Z=G;X=$(g[Z>>2]);R=$(g[Z+4>>2]);Q=$(X-Y);W=$(R-P);P=$($(Y*Q)+$(P*W));if(P>=$(-0.0)){g[I>>2]=$(1.0);c[n>>2]=1;N=17;break}Q=$($(X*Q)+$(R*W));if(!(Q<=$(0.0))){Y=$($(1.0)/$(Q-P));g[I>>2]=$(Q*Y);g[F>>2]=$(-$(P*Y));c[n>>2]=2;N=18;break}else{g[F>>2]=$(1.0);c[n>>2]=1;S=j+0|0;N=E+0|0;M=S+36|0;do{c[S>>2]=c[N>>2];S=S+4|0;N=N+4|0}while((S|0)<(M|0));N=17;break}}else{N=13;break a}}while(0);do{if((N|0)==17){P=$(-$(g[k>>2]));Q=$(-$(g[l>>2]));M=1}else if((N|0)==18){Q=$(g[o>>2]);X=$(g[k>>2]);Q=$(Q-X);P=$(g[p>>2]);Y=$(g[l>>2]);P=$(P-Y);if($($(X*P)-$(Q*Y))>$(0.0)){P=$(-P);M=2;break}else{Q=$(-Q);M=2;break}}}while(0);if($($(Q*Q)+$(P*P))<$(1.4210854715202004e-14)){N=42;break}S=j+(M*36|0)|0;X=$(-P);Y=$(-Q);W=$($(w*X)+$(u*Y));X=$($(w*Y)-$(u*X));T=c[t>>2]|0;U=c[q>>2]|0;if((U|0)>1){Y=$(g[T+4>>2]);V=0;Y=$($(X*Y)+$(W*$(g[T>>2])));Z=1;while(1){R=$(W*$(g[T+(Z<<3)>>2]));R=$(R+$(X*$(g[T+(Z<<3)+4>>2])));N=R>Y;V=N?Z:V;Z=Z+1|0;if((Z|0)==(U|0)){break}else{Y=N?R:Y}}N=j+(M*36|0)+28|0;c[N>>2]=V;if(!((V|0)>-1)){N=28;break}}else{N=j+(M*36|0)+28|0;c[N>>2]=0;V=0}if((U|0)<=(V|0)){N=28;break}X=$(g[T+(V<<3)>>2]);R=$(w*X);W=$(g[T+(V<<3)+4>>2]);R=$(v+$(R-$(u*W)));W=$($($(X*u)+$(w*W))+z);X=$(R);W=$(W);T=S;g[T>>2]=X;g[T+4>>2]=W;W=$($(P*A)+$(Q*C));X=$($(Q*A)-$(P*C));T=c[y>>2]|0;S=c[x>>2]|0;if((S|0)>1){Q=$(g[T+4>>2]);U=0;Q=$($(X*Q)+$(W*$(g[T>>2])));V=1;while(1){P=$(W*$(g[T+(V<<3)>>2]));P=$(P+$(X*$(g[T+(V<<3)+4>>2])));Z=P>Q;U=Z?V:U;V=V+1|0;if((V|0)==(S|0)){break}else{Q=Z?P:Q}}V=j+(M*36|0)+32|0;c[V>>2]=U;if(!((U|0)>-1)){N=35;break}}else{V=j+(M*36|0)+32|0;c[V>>2]=0;U=0}if((S|0)<=(U|0)){N=35;break}W=$(g[T+(U<<3)>>2]);X=$(A*W);Y=$(g[T+(U<<3)+4>>2]);X=$(B+$(X-$(C*Y)));Y=$($($(W*C)+$(A*Y))+D);W=$(X);Y=$(Y);Z=j+(M*36|0)+8|0;g[Z>>2]=W;g[Z+4>>2]=Y;X=$(X-R);Y=$(g[j+(M*36|0)+12>>2]);Y=$(Y-$(g[j+(M*36|0)+4>>2]));X=$(X);Y=$(Y);Z=j+(M*36|0)+16|0;g[Z>>2]=X;g[Z+4>>2]=Y;L=L+1|0;c[654]=(c[654]|0)+1;if(K){M=c[N>>2]|0;K=0;do{if((M|0)==(c[r+(K<<2)>>2]|0)?(c[V>>2]|0)==(c[s+(K<<2)>>2]|0):0){N=42;break a}K=K+1|0}while((K|0)<(J|0))}J=(c[n>>2]|0)+1|0;c[n>>2]=J;if((L|0)>=20){N=42;break}}if((N|0)==13){ya(2712,2672,498,2720)}else if((N|0)==15){ya(2712,2672,194,2856)}else if((N|0)==16){ya(2712,2672,207,2856)}else if((N|0)==28){ya(2776,2808,103,2840)}else if((N|0)==35){ya(2776,2808,103,2840)}else if((N|0)==42){q=c[656]|0;c[656]=(q|0)>(L|0)?q:L;s=d+8|0;bd(j,d,s);X=$(g[d>>2]);X=$(X-$(g[s>>2]));r=d+4|0;Y=$(g[r>>2]);q=d+12|0;Y=$(Y-$(g[q>>2]));t=d+16|0;g[t>>2]=$(O($($(X*X)+$(Y*Y))));c[d+20>>2]=L;n=c[n>>2]|0;if((n|0)==0){ya(2712,2672,246,2736)}else if((n|0)==2){Y=$(g[k>>2]);Y=$(Y-$(g[o>>2]));m=$(g[l>>2]);m=$(m-$(g[p>>2]));m=$(O($($(Y*Y)+$(m*m))))}else if((n|0)==3){W=$(g[o>>2]);m=$(g[k>>2]);W=$(W-m);Y=$(g[p>>2]);X=$(g[l>>2]);Y=$(Y-X);m=$($(g[j+88>>2])-m);m=$($(W*$($(g[j+92>>2])-X))-$(Y*m))}else if((n|0)==1){m=$(0.0)}else{ya(2712,2672,259,2736)}g[e>>2]=m;b[e+4>>1]=n;k=0;do{a[e+k+6|0]=c[j+(k*36|0)+28>>2];a[e+k+9|0]=c[j+(k*36|0)+32>>2];k=k+1|0}while((k|0)<(n|0));if((a[f+88|0]|0)==0){i=h;return}m=$(g[f+24>>2]);u=$(g[f+52>>2]);w=$(g[t>>2]);v=$(m+u);if(!(w>v&w>$(1.1920928955078125e-7))){X=$(g[d>>2]);X=$(X+$(g[s>>2]));Y=$(g[r>>2]);X=$(X*$(.5));Y=$($(Y+$(g[q>>2]))*$(.5));X=$(X);Y=$(Y);Z=d;g[Z>>2]=X;g[Z+4>>2]=Y;Z=s;g[Z>>2]=X;g[Z+4>>2]=Y;g[t>>2]=$(0.0);i=h;return}g[t>>2]=$(w-v);A=$(g[s>>2]);w=$(g[d>>2]);C=$(A-w);v=$(g[q>>2]);z=$(g[r>>2]);B=$(v-z);D=$(O($($(C*C)+$(B*B))));if(!(D<$(1.1920928955078125e-7))){Y=$($(1.0)/D);C=$(C*Y);B=$(B*Y)}Y=$(m*B);g[d>>2]=$($(m*C)+w);g[r>>2]=$(Y+z);Y=$(u*B);g[s>>2]=$(A-$(u*C));g[q>>2]=$(v-Y);i=h;return}}else if((J|0)==0){ya(2712,2672,194,2856)}else{ya(2712,2672,207,2856)}}function ad(a,e,f,h,j,k){a=a|0;e=e|0;f=f|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=hb,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=hb,D=hb,E=0,F=hb,G=hb,H=hb,I=hb,J=hb,K=hb;l=i;r=b[e+4>>1]|0;if(!((r&65535)<4)){ya(2872,2672,102,2896)}q=r&65535;m=a+108|0;c[m>>2]=q;a:do{if(!(r<<16>>16==0)){v=f+20|0;z=f+16|0;r=j+20|0;s=j+16|0;t=h+12|0;u=h+8|0;q=h+4|0;w=k+12|0;x=k+8|0;y=k+4|0;A=0;while(1){E=d[e+A+6|0]|0;c[a+(A*36|0)+28>>2]=E;B=d[e+A+9|0]|0;c[a+(A*36|0)+32>>2]=B;if((c[v>>2]|0)<=(E|0)){p=6;break}E=(c[z>>2]|0)+(E<<3)|0;D=$(g[E>>2]);C=$(g[E+4>>2]);if((c[r>>2]|0)<=(B|0)){p=8;break}B=(c[s>>2]|0)+(B<<3)|0;G=$(g[B>>2]);I=$(g[B+4>>2]);J=$(g[t>>2]);F=$(D*J);H=$(g[u>>2]);F=$(F-$(C*H));F=$($(g[h>>2])+F);H=$($(C*J)+$(D*H));H=$(H+$(g[q>>2]));C=$(F);H=$(H);B=a+(A*36|0)|0;g[B>>2]=C;g[B+4>>2]=H;H=$(g[w>>2]);C=$(G*H);D=$(g[x>>2]);C=$(C-$(I*D));C=$($(g[k>>2])+C);D=$($(I*H)+$(G*D));D=$(D+$(g[y>>2]));G=$(C);D=$(D);B=a+(A*36|0)+8|0;g[B>>2]=G;g[B+4>>2]=D;C=$(C-F);D=$(g[a+(A*36|0)+12>>2]);D=$(D-$(g[a+(A*36|0)+4>>2]));C=$(C);D=$(D);B=a+(A*36|0)+16|0;g[B>>2]=C;g[B+4>>2]=D;g[a+(A*36|0)+24>>2]=$(0.0);A=A+1|0;B=c[m>>2]|0;if((A|0)>=(B|0)){n=B;break a}}if((p|0)==6){ya(2776,2808,103,2840)}else if((p|0)==8){ya(2776,2808,103,2840)}}else{n=q}}while(0);do{if((n|0)>1){C=$(g[e>>2]);if((n|0)==2){J=$(g[a+16>>2]);J=$(J-$(g[a+52>>2]));o=$(g[a+20>>2]);o=$(o-$(g[a+56>>2]));o=$(O($($(J*J)+$(o*o))))}else if((n|0)==3){H=$(g[a+52>>2]);o=$(g[a+16>>2]);H=$(H-o);J=$(g[a+56>>2]);I=$(g[a+20>>2]);J=$(J-I);o=$($(g[a+88>>2])-o);o=$($(H*$($(g[a+92>>2])-I))-$(J*o))}else{ya(2712,2672,259,2736)}if(!(o<$(C*$(.5)))?!($(C*$(2.0))<o|o<$(1.1920928955078125e-7)):0){p=18;break}c[m>>2]=0}else{p=18}}while(0);if((p|0)==18?(n|0)!=0:0){i=l;return}c[a+28>>2]=0;c[a+32>>2]=0;if((c[f+20>>2]|0)<=0){ya(2776,2808,103,2840)}E=c[f+16>>2]|0;o=$(g[E>>2]);C=$(g[E+4>>2]);if((c[j+20>>2]|0)<=0){ya(2776,2808,103,2840)}E=c[j+16>>2]|0;D=$(g[E>>2]);K=$(g[E+4>>2]);G=$(g[h+12>>2]);I=$(o*G);J=$(g[h+8>>2]);I=$(I-$(C*J));I=$($(g[h>>2])+I);J=$($(C*G)+$(o*J));J=$(J+$(g[h+4>>2]));G=$(I);F=$(J);E=a;g[E>>2]=G;g[E+4>>2]=F;F=$(g[k+12>>2]);G=$(D*F);H=$(g[k+8>>2]);G=$(G-$(K*H));G=$($(g[k>>2])+G);H=$($(K*F)+$(D*H));H=$(H+$(g[k+4>>2]));D=$(G);F=$(H);E=a+8|0;g[E>>2]=D;g[E+4>>2]=F;I=$(G-I);J=$(H-J);I=$(I);J=$(J);E=a+16|0;g[E>>2]=I;g[E+4>>2]=J;c[m>>2]=1;i=l;return}function bd(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,h=hb,j=hb,k=hb,l=hb,m=0,n=0;e=i;f=c[a+108>>2]|0;if((f|0)==3){h=$(g[a+24>>2]);j=$(h*$(g[a>>2]));h=$(h*$(g[a+4>>2]));k=$(g[a+60>>2]);l=$(k*$(g[a+36>>2]));l=$(j+l);k=$(h+$(k*$(g[a+40>>2])));h=$(g[a+96>>2]);j=$(h*$(g[a+72>>2]));j=$(l+j);h=$(k+$(h*$(g[a+76>>2])));j=$(j);h=$(h);g[b>>2]=j;g[b+4>>2]=h;g[d>>2]=j;g[d+4>>2]=h;i=e;return}else if((f|0)==2){m=a+24|0;l=$(g[m>>2]);k=$(l*$(g[a>>2]));l=$(l*$(g[a+4>>2]));f=a+60|0;j=$(g[f>>2]);h=$(j*$(g[a+36>>2]));h=$(k+h);j=$(l+$(j*$(g[a+40>>2])));h=$(h);j=$(j);g[b>>2]=h;g[b+4>>2]=j;j=$(g[m>>2]);h=$(j*$(g[a+8>>2]));j=$(j*$(g[a+12>>2]));l=$(g[f>>2]);k=$(l*$(g[a+44>>2]));k=$(h+k);l=$(j+$(l*$(g[a+48>>2])));k=$(k);l=$(l);g[d>>2]=k;g[d+4>>2]=l;i=e;return}else if((f|0)==1){n=a;m=c[n+4>>2]|0;f=b;c[f>>2]=c[n>>2];c[f+4>>2]=m;f=a+8|0;b=c[f+4>>2]|0;m=d;c[m>>2]=c[f>>2];c[m+4>>2]=b;i=e;return}else if((f|0)==0){ya(2712,2672,217,2752)}else{ya(2712,2672,236,2752)}}function cd(a){a=a|0;var b=0,d=0,e=0,f=0,g=0;e=i;c[a>>2]=-1;d=a+12|0;c[d>>2]=16;c[a+8>>2]=0;g=hc(576)|0;b=a+4|0;c[b>>2]=g;df(g|0,0,(c[d>>2]|0)*36|0)|0;g=(c[d>>2]|0)+ -1|0;b=c[b>>2]|0;if((g|0)>0){g=0;while(1){f=g+1|0;c[b+(g*36|0)+20>>2]=f;c[b+(g*36|0)+32>>2]=-1;g=(c[d>>2]|0)+ -1|0;if((f|0)<(g|0)){g=f}else{break}}}c[b+(g*36|0)+20>>2]=-1;c[b+(((c[d>>2]|0)+ -1|0)*36|0)+32>>2]=-1;c[a+16>>2]=0;c[a+20>>2]=0;c[a+24>>2]=0;i=e;return}function dd(a){a=a|0;var b=0;b=i;ic(c[a+4>>2]|0);i=b;return}function ed(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0;b=i;d=a+16|0;e=c[d>>2]|0;if((e|0)==-1){f=a+8|0;g=c[f>>2]|0;e=a+12|0;if((g|0)!=(c[e>>2]|0)){ya(2912,2944,61,2984)}a=a+4|0;h=c[a>>2]|0;c[e>>2]=g<<1;g=hc(g*72|0)|0;c[a>>2]=g;ff(g|0,h|0,(c[f>>2]|0)*36|0)|0;ic(h);g=c[f>>2]|0;h=(c[e>>2]|0)+ -1|0;a=c[a>>2]|0;if((g|0)<(h|0)){h=g;while(1){g=h+1|0;c[a+(h*36|0)+20>>2]=g;c[a+(h*36|0)+32>>2]=-1;h=(c[e>>2]|0)+ -1|0;if((g|0)<(h|0)){h=g}else{break}}}c[a+(h*36|0)+20>>2]=-1;c[a+(((c[e>>2]|0)+ -1|0)*36|0)+32>>2]=-1;e=c[f>>2]|0;c[d>>2]=e}else{f=a+8|0;a=c[a+4>>2]|0}h=a+(e*36|0)+20|0;c[d>>2]=c[h>>2];c[h>>2]=-1;c[a+(e*36|0)+24>>2]=-1;c[a+(e*36|0)+28>>2]=-1;c[a+(e*36|0)+32>>2]=0;c[a+(e*36|0)+16>>2]=0;c[f>>2]=(c[f>>2]|0)+1;i=b;return e|0}function fd(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,h=0,j=hb,k=hb,l=0;f=i;e=ed(a)|0;h=a+4|0;j=$($(g[b>>2])+$(-.10000000149011612));k=$($(g[b+4>>2])+$(-.10000000149011612));j=$(j);k=$(k);l=(c[h>>2]|0)+(e*36|0)|0;g[l>>2]=j;g[l+4>>2]=k;k=$($(g[b+8>>2])+$(.10000000149011612));j=$($(g[b+12>>2])+$(.10000000149011612));k=$(k);j=$(j);b=(c[h>>2]|0)+(e*36|0)+8|0;g[b>>2]=k;g[b+4>>2]=j;c[(c[h>>2]|0)+(e*36|0)+16>>2]=d;c[(c[h>>2]|0)+(e*36|0)+32>>2]=0;gd(a,e);i=f;return e|0}function gd(a,b){a=a|0;b=b|0;var d=0,e=0,f=hb,h=hb,j=hb,k=hb,l=0,m=0,n=0,o=0,p=hb,q=hb,r=hb,s=hb,t=hb,u=hb,v=hb,w=hb,x=hb,y=hb,z=hb,A=0;d=i;n=a+24|0;c[n>>2]=(c[n>>2]|0)+1;n=c[a>>2]|0;if((n|0)==-1){c[a>>2]=b;c[(c[a+4>>2]|0)+(b*36|0)+20>>2]=-1;i=d;return}e=a+4|0;l=c[e>>2]|0;k=$(g[l+(b*36|0)>>2]);j=$(g[l+(b*36|0)+4>>2]);h=$(g[l+(b*36|0)+8>>2]);f=$(g[l+(b*36|0)+12>>2]);m=c[l+(n*36|0)+24>>2]|0;a:do{if(!((m|0)==-1)){do{o=c[l+(n*36|0)+28>>2]|0;t=$(g[l+(n*36|0)+8>>2]);s=$(g[l+(n*36|0)>>2]);q=$(t-s);r=$(g[l+(n*36|0)+12>>2]);p=$(g[l+(n*36|0)+4>>2]);q=$($(q+$(r-p))*$(2.0));x=$($($((t>h?t:h)-(s<k?s:k))+$((r>f?r:f)-(p<j?p:j)))*$(2.0));p=$(x*$(2.0));q=$($(x-q)*$(2.0));x=$(g[l+(m*36|0)>>2]);s=k<x?k:x;t=$(g[l+(m*36|0)+4>>2]);u=j<t?j:t;v=$(g[l+(m*36|0)+8>>2]);w=h>v?h:v;r=$(g[l+(m*36|0)+12>>2]);y=f>r?f:r;if((c[l+(m*36|0)+24>>2]|0)==-1){r=$($($(w-s)+$(y-u))*$(2.0))}else{r=$($($($(w-s)+$(y-u))*$(2.0))-$($($(v-x)+$(r-t))*$(2.0)))}r=$(q+r);u=$(g[l+(o*36|0)>>2]);s=k<u?k:u;z=$(g[l+(o*36|0)+4>>2]);y=j<z?j:z;x=$(g[l+(o*36|0)+8>>2]);w=h>x?h:x;v=$(g[l+(o*36|0)+12>>2]);t=f>v?f:v;if((c[l+(o*36|0)+24>>2]|0)==-1){s=$($($(w-s)+$(t-y))*$(2.0))}else{s=$($($($(w-s)+$(t-y))*$(2.0))-$($($(x-u)+$(v-z))*$(2.0)))}q=$(q+s);if(p<r&p<q){break a}n=r<q?m:o;m=c[l+(n*36|0)+24>>2]|0}while(!((m|0)==-1))}}while(0);l=c[l+(n*36|0)+20>>2]|0;m=ed(a)|0;o=c[e>>2]|0;c[o+(m*36|0)+20>>2]=l;c[o+(m*36|0)+16>>2]=0;o=c[e>>2]|0;q=$(g[o+(n*36|0)>>2]);p=$(g[o+(n*36|0)+4>>2]);k=$(k<q?k:q);j=$(j<p?j:p);A=o+(m*36|0)|0;g[A>>2]=k;g[A+4>>2]=j;k=$(g[o+(n*36|0)+8>>2]);j=$(g[o+(n*36|0)+12>>2]);h=$(h>k?h:k);z=$(f>j?f:j);o=o+(m*36|0)+8|0;g[o>>2]=h;g[o+4>>2]=z;o=c[e>>2]|0;c[o+(m*36|0)+32>>2]=(c[o+(n*36|0)+32>>2]|0)+1;if((l|0)==-1){c[o+(m*36|0)+24>>2]=n;c[o+(m*36|0)+28>>2]=b;c[o+(n*36|0)+20>>2]=m;A=o+(b*36|0)+20|0;c[A>>2]=m;c[a>>2]=m;m=c[A>>2]|0}else{A=o+(l*36|0)+24|0;if((c[A>>2]|0)==(n|0)){c[A>>2]=m}else{c[o+(l*36|0)+28>>2]=m}c[o+(m*36|0)+24>>2]=n;c[o+(m*36|0)+28>>2]=b;c[o+(n*36|0)+20>>2]=m;c[o+(b*36|0)+20>>2]=m}if((m|0)==-1){i=d;return}while(1){l=jd(a,m)|0;b=c[e>>2]|0;n=c[b+(l*36|0)+24>>2]|0;m=c[b+(l*36|0)+28>>2]|0;if((n|0)==-1){e=20;break}if((m|0)==-1){e=22;break}o=c[b+(n*36|0)+32>>2]|0;A=c[b+(m*36|0)+32>>2]|0;c[b+(l*36|0)+32>>2]=((o|0)>(A|0)?o:A)+1;j=$(g[b+(n*36|0)>>2]);k=$(g[b+(m*36|0)>>2]);f=$(g[b+(n*36|0)+4>>2]);h=$(g[b+(m*36|0)+4>>2]);j=$(j<k?j:k);f=$(f<h?f:h);A=b+(l*36|0)|0;g[A>>2]=j;g[A+4>>2]=f;f=$(g[b+(n*36|0)+8>>2]);h=$(g[b+(m*36|0)+8>>2]);j=$(g[b+(n*36|0)+12>>2]);k=$(g[b+(m*36|0)+12>>2]);f=$(f>h?f:h);z=$(j>k?j:k);m=b+(l*36|0)+8|0;g[m>>2]=f;g[m+4>>2]=z;m=c[(c[e>>2]|0)+(l*36|0)+20>>2]|0;if((m|0)==-1){e=24;break}}if((e|0)==20){ya(3168,2944,307,3184)}else if((e|0)==22){ya(3200,2944,308,3184)}else if((e|0)==24){i=d;return}}function hd(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,h=0,j=0,k=0,l=hb,m=hb,n=hb,o=hb,p=0;d=i;if((c[a>>2]|0)==(b|0)){c[a>>2]=-1;i=d;return}e=a+4|0;h=c[e>>2]|0;j=c[h+(b*36|0)+20>>2]|0;f=h+(j*36|0)+20|0;k=c[f>>2]|0;p=c[h+(j*36|0)+24>>2]|0;if((p|0)==(b|0)){p=c[h+(j*36|0)+28>>2]|0}if((k|0)==-1){c[a>>2]=p;c[h+(p*36|0)+20>>2]=-1;if(!((j|0)>-1)){ya(3e3,2944,97,3040)}if((c[a+12>>2]|0)<=(j|0)){ya(3e3,2944,97,3040)}e=a+8|0;if((c[e>>2]|0)<=0){ya(3056,2944,98,3040)}p=a+16|0;c[f>>2]=c[p>>2];c[h+(j*36|0)+32>>2]=-1;c[p>>2]=j;c[e>>2]=(c[e>>2]|0)+ -1;i=d;return}b=h+(k*36|0)+24|0;if((c[b>>2]|0)==(j|0)){c[b>>2]=p}else{c[h+(k*36|0)+28>>2]=p}c[h+(p*36|0)+20>>2]=k;if(!((j|0)>-1)){ya(3e3,2944,97,3040)}if((c[a+12>>2]|0)<=(j|0)){ya(3e3,2944,97,3040)}b=a+8|0;if((c[b>>2]|0)<=0){ya(3056,2944,98,3040)}p=a+16|0;c[f>>2]=c[p>>2];c[h+(j*36|0)+32>>2]=-1;c[p>>2]=j;c[b>>2]=(c[b>>2]|0)+ -1;do{f=jd(a,k)|0;k=c[e>>2]|0;j=c[k+(f*36|0)+24>>2]|0;h=c[k+(f*36|0)+28>>2]|0;n=$(g[k+(j*36|0)>>2]);o=$(g[k+(h*36|0)>>2]);m=$(g[k+(j*36|0)+4>>2]);l=$(g[k+(h*36|0)+4>>2]);n=$(n<o?n:o);o=$(m<l?m:l);p=k+(f*36|0)|0;g[p>>2]=n;g[p+4>>2]=o;o=$(g[k+(j*36|0)+8>>2]);n=$(g[k+(h*36|0)+8>>2]);m=$(g[k+(j*36|0)+12>>2]);l=$(g[k+(h*36|0)+12>>2]);n=$(o>n?o:n);o=$(m>l?m:l);k=k+(f*36|0)+8|0;g[k>>2]=n;g[k+4>>2]=o;k=c[e>>2]|0;j=c[k+(j*36|0)+32>>2]|0;h=c[k+(h*36|0)+32>>2]|0;c[k+(f*36|0)+32>>2]=((j|0)>(h|0)?j:h)+1;k=c[k+(f*36|0)+20>>2]|0}while(!((k|0)==-1));i=d;return}function id(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,h=0,j=hb,k=hb,l=hb,m=hb,n=hb,o=hb,p=0;h=i;if(!((b|0)>-1)){ya(3072,2944,135,3152)}if((c[a+12>>2]|0)<=(b|0)){ya(3072,2944,135,3152)}f=a+4|0;p=c[f>>2]|0;if(!((c[p+(b*36|0)+24>>2]|0)==-1)){ya(3120,2944,137,3152)}o=$(g[p+(b*36|0)>>2]);if(((o<=$(g[d>>2])?(o=$(g[p+(b*36|0)+4>>2]),o<=$(g[d+4>>2])):0)?(o=$(g[d+8>>2]),o<=$(g[p+(b*36|0)+8>>2])):0)?(o=$(g[d+12>>2]),o<=$(g[p+(b*36|0)+12>>2])):0){d=0;i=h;return d|0}hd(a,b);p=d;k=$(g[p>>2]);m=$(g[p+4>>2]);d=d+8|0;n=$(g[d>>2]);k=$(k+$(-.10000000149011612));m=$(m+$(-.10000000149011612));n=$(n+$(.10000000149011612));j=$($(g[d+4>>2])+$(.10000000149011612));o=$($(g[e>>2])*$(2.0));l=$($(g[e+4>>2])*$(2.0));if(o<$(0.0)){k=$(k+o)}else{n=$(o+n)}if(l<$(0.0)){m=$(m+l)}else{j=$(l+j)}d=c[f>>2]|0;l=$(k);o=$(m);p=d+(b*36|0)|0;g[p>>2]=l;g[p+4>>2]=o;n=$(n);o=$(j);d=d+(b*36|0)+8|0;g[d>>2]=n;g[d+4>>2]=o;gd(a,b);d=1;i=h;return d|0}function jd(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=hb,w=0,x=0,y=hb,z=hb,A=hb,B=hb;d=i;if((b|0)==-1){ya(3216,2944,382,3232)}j=c[a+4>>2]|0;p=j+(b*36|0)|0;u=j+(b*36|0)+24|0;l=c[u>>2]|0;if((l|0)==-1){x=b;i=d;return x|0}e=j+(b*36|0)+32|0;if((c[e>>2]|0)<2){x=b;i=d;return x|0}w=j+(b*36|0)+28|0;k=c[w>>2]|0;if(!((l|0)>-1)){ya(3240,2944,392,3232)}o=c[a+12>>2]|0;if((l|0)>=(o|0)){ya(3240,2944,392,3232)}if(!((k|0)>-1&(k|0)<(o|0))){ya(3272,2944,393,3232)}m=j+(l*36|0)|0;n=j+(k*36|0)|0;f=j+(k*36|0)+32|0;h=j+(l*36|0)+32|0;q=(c[f>>2]|0)-(c[h>>2]|0)|0;if((q|0)>1){x=j+(k*36|0)+24|0;q=c[x>>2]|0;u=j+(k*36|0)+28|0;r=c[u>>2]|0;s=j+(q*36|0)|0;t=j+(r*36|0)|0;if(!((q|0)>-1&(q|0)<(o|0))){ya(3304,2944,407,3232)}if(!((r|0)>-1&(r|0)<(o|0))){ya(3336,2944,408,3232)}c[x>>2]=b;x=j+(b*36|0)+20|0;o=j+(k*36|0)+20|0;c[o>>2]=c[x>>2];c[x>>2]=k;o=c[o>>2]|0;do{if(!((o|0)==-1)){a=j+(o*36|0)+24|0;if((c[a>>2]|0)==(b|0)){c[a>>2]=k;break}a=j+(o*36|0)+28|0;if((c[a>>2]|0)==(b|0)){c[a>>2]=k;break}else{ya(3368,2944,424,3232)}}else{c[a>>2]=k}}while(0);a=j+(q*36|0)+32|0;o=j+(r*36|0)+32|0;if((c[a>>2]|0)>(c[o>>2]|0)){c[u>>2]=q;c[w>>2]=r;c[j+(r*36|0)+20>>2]=b;v=$(g[m>>2]);y=$(g[t>>2]);v=v<y?v:y;z=$(g[j+(l*36|0)+4>>2]);y=$(g[j+(r*36|0)+4>>2]);A=$(v);z=$(z<y?z:y);x=p;g[x>>2]=A;g[x+4>>2]=z;z=$(g[j+(l*36|0)+8>>2]);A=$(g[j+(r*36|0)+8>>2]);y=$(g[j+(l*36|0)+12>>2]);B=$(g[j+(r*36|0)+12>>2]);z=$(z>A?z:A);A=$(y>B?y:B);x=j+(b*36|0)+8|0;g[x>>2]=z;g[x+4>>2]=A;A=$(g[s>>2]);y=$(g[j+(b*36|0)+4>>2]);z=$(g[j+(q*36|0)+4>>2]);v=$(v<A?v:A);y=$(y<z?y:z);x=n;g[x>>2]=v;g[x+4>>2]=y;y=$(g[j+(b*36|0)+8>>2]);v=$(g[j+(q*36|0)+8>>2]);z=$(g[j+(b*36|0)+12>>2]);A=$(g[j+(q*36|0)+12>>2]);v=$(y>v?y:v);B=$(z>A?z:A);j=j+(k*36|0)+8|0;g[j>>2]=v;g[j+4>>2]=B;h=c[h>>2]|0;j=c[o>>2]|0;h=((h|0)>(j|0)?h:j)+1|0;c[e>>2]=h;e=c[a>>2]|0;e=(h|0)>(e|0)?h:e}else{c[u>>2]=r;c[w>>2]=q;c[j+(q*36|0)+20>>2]=b;v=$(g[m>>2]);y=$(g[s>>2]);v=v<y?v:y;z=$(g[j+(l*36|0)+4>>2]);A=$(g[j+(q*36|0)+4>>2]);y=$(v);z=$(z<A?z:A);x=p;g[x>>2]=y;g[x+4>>2]=z;z=$(g[j+(l*36|0)+8>>2]);A=$(g[j+(q*36|0)+8>>2]);y=$(g[j+(l*36|0)+12>>2]);B=$(g[j+(q*36|0)+12>>2]);z=$(z>A?z:A);A=$(y>B?y:B);x=j+(b*36|0)+8|0;g[x>>2]=z;g[x+4>>2]=A;A=$(g[t>>2]);y=$(g[j+(b*36|0)+4>>2]);z=$(g[j+(r*36|0)+4>>2]);v=$(v<A?v:A);z=$(y<z?y:z);x=n;g[x>>2]=v;g[x+4>>2]=z;z=$(g[j+(b*36|0)+8>>2]);v=$(g[j+(r*36|0)+8>>2]);y=$(g[j+(b*36|0)+12>>2]);A=$(g[j+(r*36|0)+12>>2]);v=$(z>v?z:v);B=$(y>A?y:A);j=j+(k*36|0)+8|0;g[j>>2]=v;g[j+4>>2]=B;h=c[h>>2]|0;j=c[a>>2]|0;h=((h|0)>(j|0)?h:j)+1|0;c[e>>2]=h;e=c[o>>2]|0;e=(h|0)>(e|0)?h:e}c[f>>2]=e+1;x=k;i=d;return x|0}if(!((q|0)<-1)){x=b;i=d;return x|0}x=j+(l*36|0)+24|0;q=c[x>>2]|0;w=j+(l*36|0)+28|0;r=c[w>>2]|0;t=j+(q*36|0)|0;s=j+(r*36|0)|0;if(!((q|0)>-1&(q|0)<(o|0))){ya(3400,2944,467,3232)}if(!((r|0)>-1&(r|0)<(o|0))){ya(3432,2944,468,3232)}c[x>>2]=b;x=j+(b*36|0)+20|0;o=j+(l*36|0)+20|0;c[o>>2]=c[x>>2];c[x>>2]=l;o=c[o>>2]|0;do{if(!((o|0)==-1)){a=j+(o*36|0)+24|0;if((c[a>>2]|0)==(b|0)){c[a>>2]=l;break}a=j+(o*36|0)+28|0;if((c[a>>2]|0)==(b|0)){c[a>>2]=l;break}else{ya(3464,2944,484,3232)}}else{c[a>>2]=l}}while(0);o=j+(q*36|0)+32|0;a=j+(r*36|0)+32|0;if((c[o>>2]|0)>(c[a>>2]|0)){c[w>>2]=q;c[u>>2]=r;c[j+(r*36|0)+20>>2]=b;v=$(g[n>>2]);y=$(g[s>>2]);v=v<y?v:y;z=$(g[j+(k*36|0)+4>>2]);y=$(g[j+(r*36|0)+4>>2]);A=$(v);z=$(z<y?z:y);x=p;g[x>>2]=A;g[x+4>>2]=z;z=$(g[j+(k*36|0)+8>>2]);y=$(g[j+(r*36|0)+8>>2]);A=$(g[j+(k*36|0)+12>>2]);B=$(g[j+(r*36|0)+12>>2]);y=$(z>y?z:y);A=$(A>B?A:B);x=j+(b*36|0)+8|0;g[x>>2]=y;g[x+4>>2]=A;A=$(g[t>>2]);z=$(g[j+(b*36|0)+4>>2]);y=$(g[j+(q*36|0)+4>>2]);v=$(v<A?v:A);y=$(z<y?z:y);x=m;g[x>>2]=v;g[x+4>>2]=y;y=$(g[j+(b*36|0)+8>>2]);z=$(g[j+(q*36|0)+8>>2]);v=$(g[j+(b*36|0)+12>>2]);A=$(g[j+(q*36|0)+12>>2]);y=$(y>z?y:z);B=$(v>A?v:A);j=j+(l*36|0)+8|0;g[j>>2]=y;g[j+4>>2]=B;f=c[f>>2]|0;j=c[a>>2]|0;f=((f|0)>(j|0)?f:j)+1|0;c[e>>2]=f;e=c[o>>2]|0;e=(f|0)>(e|0)?f:e}else{c[w>>2]=r;c[u>>2]=q;c[j+(q*36|0)+20>>2]=b;v=$(g[n>>2]);y=$(g[t>>2]);v=v<y?v:y;z=$(g[j+(k*36|0)+4>>2]);A=$(g[j+(q*36|0)+4>>2]);y=$(v);A=$(z<A?z:A);x=p;g[x>>2]=y;g[x+4>>2]=A;A=$(g[j+(k*36|0)+8>>2]);z=$(g[j+(q*36|0)+8>>2]);y=$(g[j+(k*36|0)+12>>2]);B=$(g[j+(q*36|0)+12>>2]);z=$(A>z?A:z);A=$(y>B?y:B);x=j+(b*36|0)+8|0;g[x>>2]=z;g[x+4>>2]=A;A=$(g[s>>2]);z=$(g[j+(b*36|0)+4>>2]);y=$(g[j+(r*36|0)+4>>2]);v=$(v<A?v:A);y=$(z<y?z:y);x=m;g[x>>2]=v;g[x+4>>2]=y;y=$(g[j+(b*36|0)+8>>2]);z=$(g[j+(r*36|0)+8>>2]);v=$(g[j+(b*36|0)+12>>2]);A=$(g[j+(r*36|0)+12>>2]);y=$(y>z?y:z);B=$(v>A?v:A);j=j+(l*36|0)+8|0;g[j>>2]=y;g[j+4>>2]=B;f=c[f>>2]|0;j=c[o>>2]|0;f=((f|0)>(j|0)?f:j)+1|0;c[e>>2]=f;e=c[a>>2]|0;e=(f|0)>(e|0)?f:e}c[h>>2]=e+1;x=l;i=d;return x|0}function kd(d,e){d=d|0;e=e|0;var f=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=hb,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=hb,H=0,I=hb,J=hb,K=0,L=0,N=0,O=0,P=0,S=0,T=0,U=0,V=hb,W=0,X=hb,Y=hb,Z=0,_=0,aa=hb,ba=0,ca=hb,da=hb,ea=hb,fa=hb,ga=0,ha=hb,ia=hb,ja=hb,ka=hb,la=hb;f=i;i=i+320|0;q=f+276|0;p=f+240|0;r=f+228|0;k=f+136|0;m=f+112|0;n=f+8|0;o=f+4|0;j=f;c[874]=(c[874]|0)+1;c[d>>2]=0;x=e+128|0;h=d+4|0;g[h>>2]=$(g[x>>2]);l=e+28|0;u=q+0|0;t=e+56|0;v=u+36|0;do{c[u>>2]=c[t>>2];u=u+4|0;t=t+4|0}while((u|0)<(v|0));u=p+0|0;t=e+92|0;v=u+36|0;do{c[u>>2]=c[t>>2];u=u+4|0;t=t+4|0}while((u|0)<(v|0));t=q+24|0;X=$(g[t>>2]);Y=$($(M($(X/$(6.2831854820251465))))*$(6.2831854820251465));X=$(X-Y);g[t>>2]=X;u=q+28|0;Y=$($(g[u>>2])-Y);g[u>>2]=Y;v=p+24|0;aa=$(g[v>>2]);V=$($(M($(aa/$(6.2831854820251465))))*$(6.2831854820251465));aa=$(aa-V);g[v>>2]=aa;w=p+28|0;V=$($(g[w>>2])-V);g[w>>2]=V;s=$(g[x>>2]);G=$(g[e+24>>2]);G=$($(G+$(g[e+52>>2]))+$(-.014999999664723873));ga=G<$(.004999999888241291);G=ga?$(.004999999888241291):G;if(!(G>$(.0012499999720603228))){ya(3536,3560,280,3600)}b[r+4>>1]=0;c[k+0>>2]=c[e+0>>2];c[k+4>>2]=c[e+4>>2];c[k+8>>2]=c[e+8>>2];c[k+12>>2]=c[e+12>>2];c[k+16>>2]=c[e+16>>2];c[k+20>>2]=c[e+20>>2];c[k+24>>2]=c[e+24>>2];K=k+28|0;c[K+0>>2]=c[l+0>>2];c[K+4>>2]=c[l+4>>2];c[K+8>>2]=c[l+8>>2];c[K+12>>2]=c[l+12>>2];c[K+16>>2]=c[l+16>>2];c[K+20>>2]=c[l+20>>2];c[K+24>>2]=c[l+24>>2];a[k+88|0]=0;K=q+8|0;L=q+12|0;N=q+16|0;O=q+20|0;P=q+4|0;S=p+8|0;T=p+12|0;H=p+16|0;F=p+20|0;A=p+4|0;E=k+56|0;D=k+64|0;C=k+68|0;B=k+72|0;y=k+80|0;x=k+84|0;z=m+16|0;I=$(G+$(.0012499999720603228));J=$(G+$(-.0012499999720603228));ca=V;U=0;V=$(0.0);a:while(1){ha=$($(1.0)-V);da=$(ha*$(g[K>>2]));ka=$(ha*$(g[L>>2]));la=$(V*$(g[N>>2]));la=$(da+la);ka=$(ka+$(V*$(g[O>>2])));da=$($(ha*X)+$(V*Y));Y=$(+R(+da));da=$(+Q(+da));X=$(g[q>>2]);ja=$(da*X);ia=$(g[P>>2]);ja=$(la-$(ja-$(Y*ia)));ia=$(ka-$($(Y*X)+$(da*ia)));X=$(ha*$(g[S>>2]));ka=$(ha*$(g[T>>2]));la=$(V*$(g[H>>2]));la=$(X+la);ka=$(ka+$(V*$(g[F>>2])));X=$($(ha*aa)+$(V*ca));ha=$(+R(+X));X=$(+Q(+X));aa=$(g[p>>2]);ea=$(X*aa);fa=$(g[A>>2]);ea=$(la-$(ea-$(ha*fa)));fa=$(ka-$($(ha*aa)+$(X*fa)));aa=$(ja);ca=$(ia);ga=E;g[ga>>2]=aa;g[ga+4>>2]=ca;g[D>>2]=Y;g[C>>2]=da;ea=$(ea);fa=$(fa);ga=B;g[ga>>2]=ea;g[ga+4>>2]=fa;g[y>>2]=ha;g[x>>2]=X;$c(m,r,k);X=$(g[z>>2]);if(X<=$(0.0)){j=5;break}if(X<I){j=7;break}$(ld(n,r,e,q,l,p,V));W=0;X=s;do{ea=$(md(n,o,j,X));if(ea>I){j=10;break a}if(ea>J){V=X;break}_=c[o>>2]|0;Z=c[j>>2]|0;ca=$(nd(n,_,Z,V));if(ca<J){j=13;break a}if(!(ca<=I)){Y=V;aa=X;ba=0}else{j=15;break a}while(1){if((ba&1|0)==0){da=$($(Y+aa)*$(.5))}else{da=$(Y+$($($(G-ca)*$(aa-Y))/$(ea-ca)))}fa=$(nd(n,_,Z,da));ha=$(fa-G);if(!(ha>$(0.0))){ha=$(-ha)}if(ha<$(.0012499999720603228)){X=da;break}ga=fa>G;ba=ba+1|0;c[880]=(c[880]|0)+1;if((ba|0)==50){ba=50;break}else{Y=ga?da:Y;aa=ga?aa:da;ca=ga?fa:ca;ea=ga?ea:fa}}Z=c[882]|0;c[882]=(Z|0)>(ba|0)?Z:ba;W=W+1|0}while((W|0)!=8);U=U+1|0;c[876]=(c[876]|0)+1;if((U|0)==20){j=27;break}X=$(g[t>>2]);Y=$(g[u>>2]);aa=$(g[v>>2]);ca=$(g[w>>2])}if((j|0)==5){c[d>>2]=2;g[h>>2]=$(0.0);h=c[878]|0;ga=(h|0)>(U|0);ga=ga?h:U;c[878]=ga;i=f;return}else if((j|0)==7){c[d>>2]=3;g[h>>2]=V;h=c[878]|0;ga=(h|0)>(U|0);ga=ga?h:U;c[878]=ga;i=f;return}else if((j|0)==10){c[d>>2]=4;g[h>>2]=s}else if((j|0)==13){c[d>>2]=1;g[h>>2]=V}else if((j|0)==15){c[d>>2]=3;g[h>>2]=V}else if((j|0)==27){c[d>>2]=1;g[h>>2]=V;U=20;h=c[878]|0;ga=(h|0)>(U|0);ga=ga?h:U;c[878]=ga;i=f;return}c[876]=(c[876]|0)+1;U=U+1|0;h=c[878]|0;ga=(h|0)>(U|0);ga=ga?h:U;c[878]=ga;i=f;return}function ld(e,f,h,j,k,l,m){e=e|0;f=f|0;h=h|0;j=j|0;k=k|0;l=l|0;m=$(m);var n=0,o=hb,p=hb,q=hb,r=hb,s=hb,t=hb,u=hb,v=0,w=hb,x=hb,y=hb,z=hb,A=hb,B=hb,C=hb,D=0,E=0,F=0,G=0,H=hb,I=hb;n=i;c[e>>2]=h;c[e+4>>2]=k;v=b[f+4>>1]|0;if(!(v<<16>>16!=0&(v&65535)<3)){ya(3744,3560,50,3768)}D=e+8|0;E=D+0|0;F=j+0|0;G=E+36|0;do{c[E>>2]=c[F>>2];E=E+4|0;F=F+4|0}while((E|0)<(G|0));j=e+44|0;E=j+0|0;F=l+0|0;G=E+36|0;do{c[E>>2]=c[F>>2];E=E+4|0;F=F+4|0}while((E|0)<(G|0));s=$($(1.0)-m);p=$(s*$(g[e+16>>2]));B=$(s*$(g[e+20>>2]));A=$($(g[e+24>>2])*m);A=$(p+A);B=$(B+$($(g[e+28>>2])*m));p=$(s*$(g[e+32>>2]));p=$(p+$($(g[e+36>>2])*m));o=$(+R(+p));p=$(+Q(+p));C=$(g[D>>2]);r=$(p*C);q=$(g[e+12>>2]);r=$(A-$(r-$(o*q)));q=$(B-$($(o*C)+$(p*q)));C=$(s*$(g[e+52>>2]));B=$(s*$(g[e+56>>2]));A=$($(g[e+60>>2])*m);A=$(C+A);B=$(B+$($(g[e+64>>2])*m));s=$(s*$(g[e+68>>2]));s=$(s+$($(g[e+72>>2])*m));m=$(+R(+s));s=$(+Q(+s));C=$(g[j>>2]);u=$(s*C);t=$(g[e+48>>2]);u=$(A-$(u-$(m*t)));t=$(B-$($(m*C)+$(s*t)));if(v<<16>>16==1){c[e+80>>2]=0;v=d[f+6|0]|0;if((c[h+20>>2]|0)<=(v|0)){ya(3640,3672,103,3704)}G=(c[h+16>>2]|0)+(v<<3)|0;w=$(g[G>>2]);x=$(g[G+4>>2]);f=d[f+9|0]|0;if((c[k+20>>2]|0)<=(f|0)){ya(3640,3672,103,3704)}f=(c[k+16>>2]|0)+(f<<3)|0;B=$(g[f>>2]);C=$(g[f+4>>2]);f=e+92|0;r=$($(u+$($(s*B)-$(m*C)))-$(r+$($(p*w)-$(o*x))));p=$($(t+$($(m*B)+$(s*C)))-$(q+$($(o*w)+$(p*x))));C=$(r);o=$(p);G=f;g[G>>2]=C;g[G+4>>2]=o;o=$(O($($(r*r)+$(p*p))));if(o<$(1.1920928955078125e-7)){C=$(0.0);i=n;return $(C)}C=$($(1.0)/o);g[f>>2]=$(r*C);g[e+96>>2]=$(p*C);C=o;i=n;return $(C)}v=f+6|0;j=f+7|0;D=e+80|0;if((a[v]|0)==(a[j]|0)){c[D>>2]=2;D=d[f+9|0]|0;j=c[k+20>>2]|0;if((j|0)<=(D|0)){ya(3640,3672,103,3704)}k=c[k+16>>2]|0;G=k+(D<<3)|0;x=$(g[G>>2]);w=$(g[G+4>>2]);f=d[f+10|0]|0;if((j|0)<=(f|0)){ya(3640,3672,103,3704)}f=k+(f<<3)|0;B=$(g[f>>2]);z=$(g[f+4>>2]);f=e+92|0;C=$(B-x);A=$(z-w);y=$(-C);I=$(A);H=$(y);G=f;g[G>>2]=I;g[G+4>>2]=H;C=$(O($($(A*A)+$(C*C))));if(!(C<$(1.1920928955078125e-7))){I=$($(1.0)/C);A=$(A*I);g[f>>2]=A;y=$(I*y);g[e+96>>2]=y}x=$($(x+B)*$(.5));w=$($(w+z)*$(.5));H=$(x);I=$(w);e=e+84|0;g[e>>2]=H;g[e+4>>2]=I;e=d[v]|0;if((c[h+20>>2]|0)<=(e|0)){ya(3640,3672,103,3704)}I=$(t+$($(m*x)+$(s*w)));z=$(u+$($(s*x)-$(m*w)));B=$($(m*A)+$(s*y));x=$($(s*A)-$(m*y));G=(c[h+16>>2]|0)+(e<<3)|0;C=$(g[G>>2]);H=$(g[G+4>>2]);o=$($(x*$($(r+$($(p*C)-$(o*H)))-z))+$(B*$($(q+$($(o*C)+$(p*H)))-I)));if(!(o<$(0.0))){I=o;i=n;return $(I)}H=$(-A);I=$(-y);H=$(H);I=$(I);G=f;g[G>>2]=H;g[G+4>>2]=I;I=$(-o);i=n;return $(I)}else{c[D>>2]=1;D=d[v]|0;v=c[h+20>>2]|0;if((v|0)<=(D|0)){ya(3640,3672,103,3704)}h=c[h+16>>2]|0;G=h+(D<<3)|0;x=$(g[G>>2]);w=$(g[G+4>>2]);j=d[j]|0;if((v|0)<=(j|0)){ya(3640,3672,103,3704)}h=h+(j<<3)|0;B=$(g[h>>2]);A=$(g[h+4>>2]);h=e+92|0;C=$(B-x);z=$(A-w);y=$(-C);H=$(z);I=$(y);G=h;g[G>>2]=H;g[G+4>>2]=I;C=$(O($($(z*z)+$(C*C))));if(!(C<$(1.1920928955078125e-7))){I=$($(1.0)/C);z=$(z*I);g[h>>2]=z;y=$(I*y);g[e+96>>2]=y}x=$($(x+B)*$(.5));w=$($(w+A)*$(.5));H=$(x);I=$(w);e=e+84|0;g[e>>2]=H;g[e+4>>2]=I;e=d[f+9|0]|0;if((c[k+20>>2]|0)<=(e|0)){ya(3640,3672,103,3704)}I=$(q+$($(o*x)+$(p*w)));B=$(r+$($(p*x)-$(o*w)));C=$($(o*z)+$(p*y));A=$($(p*z)-$(o*y));G=(c[k+16>>2]|0)+(e<<3)|0;H=$(g[G>>2]);o=$(g[G+4>>2]);o=$($(A*$($(u+$($(s*H)-$(m*o)))-B))+$(C*$($(t+$($(m*H)+$(s*o)))-I)));if(!(o<$(0.0))){I=o;i=n;return $(I)}H=$(-z);I=$(-y);H=$(H);I=$(I);G=h;g[G>>2]=H;g[G+4>>2]=I;I=$(-o);i=n;return $(I)}return $(0)}function md(a,b,d,e){a=a|0;b=b|0;d=d|0;e=$(e);var f=0,h=hb,j=hb,k=hb,l=hb,m=hb,n=hb,o=hb,p=hb,q=hb,r=0,s=0,t=hb,u=hb,v=0,w=hb,x=hb,y=hb,z=hb,A=0,B=0,C=0,D=0;f=i;m=$($(1.0)-e);h=$(m*$(g[a+16>>2]));y=$(m*$(g[a+20>>2]));x=$($(g[a+24>>2])*e);x=$(h+x);y=$(y+$($(g[a+28>>2])*e));h=$(m*$(g[a+32>>2]));h=$(h+$($(g[a+36>>2])*e));j=$(+R(+h));h=$(+Q(+h));z=$(g[a+8>>2]);n=$(h*z);l=$(g[a+12>>2]);n=$(x-$(n-$(j*l)));l=$(y-$($(j*z)+$(h*l)));z=$(m*$(g[a+52>>2]));y=$(m*$(g[a+56>>2]));x=$($(g[a+60>>2])*e);x=$(z+x);y=$(y+$($(g[a+64>>2])*e));m=$(m*$(g[a+68>>2]));m=$(m+$($(g[a+72>>2])*e));e=$(+R(+m));m=$(+Q(+m));z=$(g[a+44>>2]);o=$(m*z);k=$(g[a+48>>2]);o=$(x-$(o-$(e*k)));k=$(y-$($(e*z)+$(m*k)));v=c[a+80>>2]|0;if((v|0)==0){p=$(g[a+92>>2]);z=$(h*p);q=$(g[a+96>>2]);z=$(z+$(j*q));w=$($(h*q)-$(j*p));u=$(-p);y=$(-q);t=$($(m*u)+$(e*y));u=$($(m*y)-$(e*u));s=c[a>>2]|0;r=c[s+16>>2]|0;s=s+20|0;A=c[s>>2]|0;if((A|0)>1){x=$(g[r+4>>2]);B=0;x=$($(w*x)+$(z*$(g[r>>2])));C=1;while(1){y=$(z*$(g[r+(C<<3)>>2]));y=$(y+$(w*$(g[r+(C<<3)+4>>2])));v=y>x;B=v?C:B;C=C+1|0;if((C|0)==(A|0)){break}else{x=v?y:x}}}else{B=0}c[b>>2]=B;a=c[a+4>>2]|0;v=c[a+16>>2]|0;a=a+20|0;A=c[a>>2]|0;if((A|0)>1){w=$(g[v+4>>2]);C=0;w=$($(u*w)+$(t*$(g[v>>2])));D=1;while(1){x=$(t*$(g[v+(D<<3)>>2]));x=$(x+$(u*$(g[v+(D<<3)+4>>2])));B=x>w;C=B?D:C;D=D+1|0;if((D|0)==(A|0)){break}else{w=B?x:w}}}else{C=0}c[d>>2]=C;d=c[b>>2]|0;if(!((d|0)>-1)){ya(3640,3672,103,3704)}if((c[s>>2]|0)<=(d|0)){ya(3640,3672,103,3704)}D=r+(d<<3)|0;t=$(g[D>>2]);u=$(g[D+4>>2]);if(!((C|0)>-1)){ya(3640,3672,103,3704)}if((c[a>>2]|0)<=(C|0)){ya(3640,3672,103,3704)}D=v+(C<<3)|0;y=$(g[D>>2]);z=$(g[D+4>>2]);z=$($(p*$($(o+$($(m*y)-$(e*z)))-$(n+$($(h*t)-$(j*u)))))+$(q*$($(k+$($(e*y)+$(m*z)))-$(l+$($(j*t)+$(h*u))))));i=f;return $(z)}else if((v|0)==1){y=$(g[a+92>>2]);q=$(h*y);p=$(g[a+96>>2]);q=$(q-$(j*p));p=$($(j*y)+$(h*p));y=$(g[a+84>>2]);x=$(h*y);z=$(g[a+88>>2]);n=$(n+$(x-$(j*z)));h=$(l+$($(j*y)+$(h*z)));l=$(-q);z=$(-p);j=$($(m*l)+$(e*z));l=$($(m*z)-$(e*l));c[b>>2]=-1;A=a+4|0;B=c[A>>2]|0;a=c[B+16>>2]|0;B=c[B+20>>2]|0;if((B|0)>1){t=$(g[a+4>>2]);v=0;t=$($(l*t)+$(j*$(g[a>>2])));s=1;while(1){u=$(j*$(g[a+(s<<3)>>2]));u=$(u+$(l*$(g[a+(s<<3)+4>>2])));b=u>t;v=b?s:v;s=s+1|0;if((s|0)==(B|0)){break}else{t=b?u:t}}c[d>>2]=v;if((v|0)>-1){r=v}else{ya(3640,3672,103,3704)}}else{c[d>>2]=0;r=0}d=c[A>>2]|0;if((c[d+20>>2]|0)<=(r|0)){ya(3640,3672,103,3704)}D=(c[d+16>>2]|0)+(r<<3)|0;y=$(g[D>>2]);z=$(g[D+4>>2]);z=$($(q*$($(o+$($(m*y)-$(e*z)))-n))+$(p*$($(k+$($(e*y)+$(m*z)))-h)));i=f;return $(z)}else if((v|0)==2){y=$(g[a+92>>2]);p=$(m*y);q=$(g[a+96>>2]);p=$(p-$(e*q));q=$($(e*y)+$(m*q));y=$(g[a+84>>2]);x=$(m*y);z=$(g[a+88>>2]);o=$(o+$(x-$(e*z)));e=$(k+$($(e*y)+$(m*z)));k=$(-p);z=$(-q);m=$($(h*k)+$(j*z));k=$($(h*z)-$(j*k));c[d>>2]=-1;B=c[a>>2]|0;A=c[B+16>>2]|0;B=c[B+20>>2]|0;if((B|0)>1){u=$(g[A+4>>2]);d=0;u=$($(k*u)+$(m*$(g[A>>2])));r=1;while(1){t=$(m*$(g[A+(r<<3)>>2]));t=$(t+$(k*$(g[A+(r<<3)+4>>2])));v=t>u;d=v?r:d;r=r+1|0;if((r|0)==(B|0)){break}else{u=v?t:u}}c[b>>2]=d;if((d|0)>-1){s=d}else{ya(3640,3672,103,3704)}}else{c[b>>2]=0;s=0}d=c[a>>2]|0;if((c[d+20>>2]|0)<=(s|0)){ya(3640,3672,103,3704)}D=(c[d+16>>2]|0)+(s<<3)|0;y=$(g[D>>2]);z=$(g[D+4>>2]);z=$($(p*$($(n+$($(h*y)-$(j*z)))-o))+$(q*$($(l+$($(j*y)+$(h*z)))-e)));i=f;return $(z)}else{ya(3616,3560,183,3720)}return $(0)}function nd(a,b,d,e){a=a|0;b=b|0;d=d|0;e=$(e);var f=0,h=hb,j=hb,k=hb,l=hb,m=hb,n=hb,o=hb,p=hb,q=hb,r=hb,s=hb,t=0,u=hb,v=hb;f=i;l=$($(1.0)-e);k=$(l*$(g[a+16>>2]));r=$(l*$(g[a+20>>2]));q=$($(g[a+24>>2])*e);q=$(k+q);r=$(r+$($(g[a+28>>2])*e));k=$(l*$(g[a+32>>2]));k=$(k+$($(g[a+36>>2])*e));h=$(+R(+k));k=$(+Q(+k));m=$(g[a+8>>2]);n=$(k*m);j=$(g[a+12>>2]);n=$(q-$(n-$(h*j)));j=$(r-$($(h*m)+$(k*j)));m=$(l*$(g[a+52>>2]));r=$(l*$(g[a+56>>2]));q=$($(g[a+60>>2])*e);q=$(m+q);r=$(r+$($(g[a+64>>2])*e));l=$(l*$(g[a+68>>2]));l=$(l+$($(g[a+72>>2])*e));m=$(+R(+l));l=$(+Q(+l));s=$(g[a+44>>2]);o=$(l*s);e=$(g[a+48>>2]);o=$(q-$(o-$(m*e)));e=$(r-$($(m*s)+$(l*e)));t=c[a+80>>2]|0;if((t|0)==2){r=$(g[a+92>>2]);q=$(l*r);p=$(g[a+96>>2]);q=$(q-$(m*p));p=$($(m*r)+$(l*p));r=$(g[a+84>>2]);u=$(l*r);s=$(g[a+88>>2]);o=$(o+$(u-$(m*s)));e=$(e+$($(m*r)+$(l*s)));a=c[a>>2]|0;if(!((b|0)>-1)){ya(3640,3672,103,3704)}if((c[a+20>>2]|0)<=(b|0)){ya(3640,3672,103,3704)}t=(c[a+16>>2]|0)+(b<<3)|0;s=$(g[t>>2]);u=$(g[t+4>>2]);u=$($(q*$($(n+$($(k*s)-$(h*u)))-o))+$(p*$($(j+$($(h*s)+$(k*u)))-e)));i=f;return $(u)}else if((t|0)==1){s=$(g[a+92>>2]);q=$(k*s);p=$(g[a+96>>2]);q=$(q-$(h*p));p=$($(h*s)+$(k*p));s=$(g[a+84>>2]);r=$(k*s);u=$(g[a+88>>2]);n=$(n+$(r-$(h*u)));h=$(j+$($(h*s)+$(k*u)));a=c[a+4>>2]|0;if(!((d|0)>-1)){ya(3640,3672,103,3704)}if((c[a+20>>2]|0)<=(d|0)){ya(3640,3672,103,3704)}t=(c[a+16>>2]|0)+(d<<3)|0;s=$(g[t>>2]);u=$(g[t+4>>2]);u=$($(q*$($(o+$($(l*s)-$(m*u)))-n))+$(p*$($(e+$($(m*s)+$(l*u)))-h)));i=f;return $(u)}else if((t|0)==0){q=$(g[a+92>>2]);p=$(g[a+96>>2]);t=c[a>>2]|0;if(!((b|0)>-1)){ya(3640,3672,103,3704)}if((c[t+20>>2]|0)<=(b|0)){ya(3640,3672,103,3704)}t=(c[t+16>>2]|0)+(b<<3)|0;r=$(g[t>>2]);s=$(g[t+4>>2]);a=c[a+4>>2]|0;if(!((d|0)>-1)){ya(3640,3672,103,3704)}if((c[a+20>>2]|0)<=(d|0)){ya(3640,3672,103,3704)}t=(c[a+16>>2]|0)+(d<<3)|0;v=$(g[t>>2]);u=$(g[t+4>>2]);u=$($(q*$($(o+$($(l*v)-$(m*u)))-$(n+$($(k*r)-$(h*s)))))+$(p*$($(e+$($(m*v)+$(l*u)))-$(j+$($(h*r)+$(k*s))))));i=f;return $(u)}else{ya(3616,3560,242,3624)}return $(0)}function od(a){a=a|0;c[a+102400>>2]=0;c[a+102404>>2]=0;c[a+102408>>2]=0;c[a+102796>>2]=0;return}function pd(a){a=a|0;var b=0;b=i;if((c[a+102400>>2]|0)!=0){ya(3792,3808,32,3848)}if((c[a+102796>>2]|0)==0){i=b;return}else{ya(3872,3808,33,3848)}}function qd(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0;f=i;g=b+102796|0;h=c[g>>2]|0;if((h|0)>=32){ya(3896,3808,38,3936)}e=b+(h*12|0)+102412|0;c[b+(h*12|0)+102416>>2]=d;j=b+102400|0;k=c[j>>2]|0;if((k+d|0)>102400){c[e>>2]=hc(d)|0;a[b+(h*12|0)+102420|0]=1}else{c[e>>2]=b+k;a[b+(h*12|0)+102420|0]=0;c[j>>2]=(c[j>>2]|0)+d}h=b+102404|0;d=(c[h>>2]|0)+d|0;c[h>>2]=d;b=b+102408|0;h=c[b>>2]|0;c[b>>2]=(h|0)>(d|0)?h:d;c[g>>2]=(c[g>>2]|0)+1;i=f;return c[e>>2]|0}function rd(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0;f=i;e=b+102796|0;g=c[e>>2]|0;if((g|0)<=0){ya(3952,3808,63,3976)}h=g+ -1|0;if((c[b+(h*12|0)+102412>>2]|0)!=(d|0)){ya(3984,3808,65,3976)}if((a[b+(h*12|0)+102420|0]|0)==0){d=b+(h*12|0)+102416|0;h=b+102400|0;c[h>>2]=(c[h>>2]|0)-(c[d>>2]|0)}else{ic(d);d=b+(h*12|0)+102416|0;g=c[e>>2]|0}h=b+102404|0;c[h>>2]=(c[h>>2]|0)-(c[d>>2]|0);c[e>>2]=g+ -1;i=f;return}function sd(a){a=a|0;return}function td(a){a=a|0;return}function ud(a){a=a|0;return $(0.0)}function vd(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0;h=i;if((a[4200]|0)==0){c[1002]=3;c[4012>>2]=3;a[4016|0]=1;c[4104>>2]=4;c[4108>>2]=4;a[4112|0]=1;c[4032>>2]=4;c[4036>>2]=4;a[4040|0]=0;c[4128>>2]=5;c[4132>>2]=5;a[4136|0]=1;c[4056>>2]=6;c[4060>>2]=6;a[4064|0]=1;c[4020>>2]=6;c[4024>>2]=6;a[4028|0]=0;c[4080>>2]=7;c[4084>>2]=7;a[4088|0]=1;c[4116>>2]=7;c[4120>>2]=7;a[4124|0]=0;c[4152>>2]=8;c[4156>>2]=8;a[4160|0]=1;c[4044>>2]=8;c[4048>>2]=8;a[4052|0]=0;c[4176>>2]=9;c[4180>>2]=9;a[4184|0]=1;c[4140>>2]=9;c[4144>>2]=9;a[4148|0]=0;a[4200]=1}j=c[(c[b+12>>2]|0)+4>>2]|0;k=c[(c[e+12>>2]|0)+4>>2]|0;if(!(j>>>0<4)){ya(4208,4256,80,4344)}if(!(k>>>0<4)){ya(4296,4256,81,4344)}l=c[4008+(j*48|0)+(k*12|0)>>2]|0;if((l|0)==0){l=0;i=h;return l|0}if((a[4008+(j*48|0)+(k*12|0)+8|0]|0)==0){l=sb[l&15](e,f,b,d,g)|0;i=h;return l|0}else{l=sb[l&15](b,d,e,f,g)|0;i=h;return l|0}return 0}function wd(d,f){d=d|0;f=f|0;var h=0,j=0,k=0,l=0,m=0,n=0;h=i;if((a[4200]|0)==0){ya(4352,4256,103,4376)}j=c[d+48>>2]|0;if((c[d+124>>2]|0)>0){m=c[j+8>>2]|0;l=m+4|0;k=e[l>>1]|0;if((k&2|0)==0){b[l>>1]=k|2;g[m+144>>2]=$(0.0)}m=c[d+52>>2]|0;l=c[m+8>>2]|0;k=l+4|0;n=e[k>>1]|0;if((n&2|0)==0){b[k>>1]=n|2;g[l+144>>2]=$(0.0)}}else{m=c[d+52>>2]|0}j=c[(c[j+12>>2]|0)+4>>2]|0;k=c[(c[m+12>>2]|0)+4>>2]|0;if((j|0)>-1&(k|0)<4){lb[c[4008+(j*48|0)+(k*12|0)+4>>2]&15](d,f);i=h;return}else{ya(4384,4256,114,4376)}}function xd(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var h=0,j=0,k=hb,l=hb;h=i;c[a>>2]=4440;c[a+4>>2]=4;c[a+48>>2]=b;c[a+52>>2]=e;c[a+56>>2]=d;c[a+60>>2]=f;c[a+124>>2]=0;c[a+128>>2]=0;f=b+16|0;d=a+8|0;j=d+40|0;do{c[d>>2]=0;d=d+4|0}while((d|0)<(j|0));k=$(g[f>>2]);g[a+136>>2]=$(O($(k*$(g[e+16>>2]))));k=$(g[b+20>>2]);l=$(g[e+20>>2]);g[a+140>>2]=k>l?k:l;i=h;return}function yd(d,f){d=d|0;f=f|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0;j=i;i=i+64|0;h=j;p=d+64|0;l=h+0|0;m=p+0|0;k=l+64|0;do{c[l>>2]=c[m>>2];l=l+4|0;m=m+4|0}while((l|0)<(k|0));l=d+4|0;q=c[l>>2]|0;c[l>>2]=q|4;q=q>>>1;t=c[d+48>>2]|0;u=c[d+52>>2]|0;k=(a[u+38|0]|a[t+38|0])<<24>>24!=0;n=c[t+8>>2]|0;m=c[u+8>>2]|0;r=n+12|0;s=m+12|0;if(!k){tb[c[c[d>>2]>>2]&15](d,p,r,s);r=d+124|0;p=(c[r>>2]|0)>0;a:do{if(p){y=c[h+60>>2]|0;if((y|0)>0){x=0}else{o=0;while(1){g[d+(o*20|0)+72>>2]=$(0.0);g[d+(o*20|0)+76>>2]=$(0.0);o=o+1|0;if((o|0)>=(c[r>>2]|0)){break a}}}do{v=d+(x*20|0)+72|0;g[v>>2]=$(0.0);u=d+(x*20|0)+76|0;g[u>>2]=$(0.0);t=c[d+(x*20|0)+80>>2]|0;w=0;while(1){s=w+1|0;if((c[h+(w*20|0)+16>>2]|0)==(t|0)){o=7;break}if((s|0)<(y|0)){w=s}else{break}}if((o|0)==7){o=0;g[v>>2]=$(g[h+(w*20|0)+8>>2]);g[u>>2]=$(g[h+(w*20|0)+12>>2])}x=x+1|0}while((x|0)<(c[r>>2]|0))}}while(0);o=q&1;if(p^(o|0)!=0){q=n+4|0;r=e[q>>1]|0;if((r&2|0)==0){b[q>>1]=r|2;g[n+144>>2]=$(0.0)}n=m+4|0;q=e[n>>1]|0;if((q&2|0)==0){b[n>>1]=q|2;g[m+144>>2]=$(0.0)}}}else{p=ie(c[t+12>>2]|0,c[d+56>>2]|0,c[u+12>>2]|0,c[d+60>>2]|0,r,s)|0;c[d+124>>2]=0;o=q&1}m=c[l>>2]|0;c[l>>2]=p?m|2:m&-3;n=(o|0)==0;l=p^1;m=(f|0)==0;if(!(n^1|l|m)){lb[c[(c[f>>2]|0)+8>>2]&15](f,d)}if(!(n|p|m)){lb[c[(c[f>>2]|0)+12>>2]&15](f,d)}if(k|l|m){i=j;return}nb[c[(c[f>>2]|0)+16>>2]&3](f,d,h);i=j;return}function zd(a){a=a|0;return}function Ad(a){a=a|0;var b=0;b=i;_e(a);i=b;return}function Bd(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;b=i;f=fc(f,144)|0;if((f|0)==0){e=0;i=b;return e|0}xd(f,a,0,d,0);c[f>>2]=4488;if((c[(c[(c[f+48>>2]|0)+12>>2]|0)+4>>2]|0)!=1){ya(4504,4552,41,4608)}if((c[(c[(c[f+52>>2]|0)+12>>2]|0)+4>>2]|0)==0){e=f;i=b;return e|0}else{ya(4632,4552,42,4608)}return 0}function Cd(a,b){a=a|0;b=b|0;var d=0;d=i;kb[c[(c[a>>2]|0)+4>>2]&31](a);gc(b,a,144);i=d;return}function Dd(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;f=i;$d(b,c[(c[a+48>>2]|0)+12>>2]|0,d,c[(c[a+52>>2]|0)+12>>2]|0,e);i=f;return}function Ed(a){a=a|0;return}function Fd(a){a=a|0;var b=0;b=i;_e(a);i=b;return}function Gd(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;b=i;f=fc(f,144)|0;if((f|0)==0){e=0;i=b;return e|0}xd(f,a,0,d,0);c[f>>2]=4736;if((c[(c[(c[f+48>>2]|0)+12>>2]|0)+4>>2]|0)!=1){ya(4752,4800,41,4856)}if((c[(c[(c[f+52>>2]|0)+12>>2]|0)+4>>2]|0)==2){e=f;i=b;return e|0}else{ya(4880,4800,42,4856)}return 0}function Hd(a,b){a=a|0;b=b|0;var d=0;d=i;kb[c[(c[a>>2]|0)+4>>2]&31](a);gc(b,a,144);i=d;return}function Id(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;f=i;ce(b,c[(c[a+48>>2]|0)+12>>2]|0,d,c[(c[a+52>>2]|0)+12>>2]|0,e);i=f;return}function Jd(a){a=a|0;return}function Kd(a){a=a|0;var b=0;b=i;_e(a);i=b;return}function Ld(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;b=i;f=fc(f,144)|0;if((f|0)==0){e=0;i=b;return e|0}xd(f,a,0,d,0);c[f>>2]=4984;if((c[(c[(c[f+48>>2]|0)+12>>2]|0)+4>>2]|0)!=2){ya(5e3,5048,41,5104)}if((c[(c[(c[f+52>>2]|0)+12>>2]|0)+4>>2]|0)==0){e=f;i=b;return e|0}else{ya(5136,5048,42,5104)}return 0}function Md(a,b){a=a|0;b=b|0;var d=0;d=i;kb[c[(c[a>>2]|0)+4>>2]&31](a);gc(b,a,144);i=d;return}function Nd(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;f=i;_d(b,c[(c[a+48>>2]|0)+12>>2]|0,d,c[(c[a+52>>2]|0)+12>>2]|0,e);i=f;return}function Od(a){a=a|0;return}function Pd(a){a=a|0;var b=0;b=i;_e(a);i=b;return}function Qd(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;b=i;f=fc(f,144)|0;if((f|0)==0){e=0;i=b;return e|0}xd(f,a,0,d,0);c[f>>2]=5240;if((c[(c[(c[f+48>>2]|0)+12>>2]|0)+4>>2]|0)!=2){ya(5256,5304,44,5352)}if((c[(c[(c[f+52>>2]|0)+12>>2]|0)+4>>2]|0)==2){e=f;i=b;return e|0}else{ya(5376,5304,45,5352)}return 0}function Rd(a,b){a=a|0;b=b|0;var d=0;d=i;kb[c[(c[a>>2]|0)+4>>2]&31](a);gc(b,a,144);i=d;return}function Sd(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;f=i;de(b,c[(c[a+48>>2]|0)+12>>2]|0,d,c[(c[a+52>>2]|0)+12>>2]|0,e);i=f;return}function Td(a){a=a|0;return}function Ud(a){a=a|0;var b=0;b=i;_e(a);i=b;return}function Vd(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0;h=i;j=a+40|0;c[j>>2]=b;c[a+44>>2]=d;c[a+48>>2]=e;c[a+28>>2]=0;c[a+36>>2]=0;c[a+32>>2]=0;c[a>>2]=f;c[a+4>>2]=g;c[a+8>>2]=qd(f,b<<2)|0;c[a+12>>2]=qd(c[a>>2]|0,d<<2)|0;c[a+16>>2]=qd(c[a>>2]|0,e<<2)|0;c[a+24>>2]=qd(c[a>>2]|0,(c[j>>2]|0)*12|0)|0;c[a+20>>2]=qd(c[a>>2]|0,(c[j>>2]|0)*12|0)|0;i=h;return}function Wd(a){a=a|0;var b=0;b=i;rd(c[a>>2]|0,c[a+20>>2]|0);rd(c[a>>2]|0,c[a+24>>2]|0);rd(c[a>>2]|0,c[a+16>>2]|0);rd(c[a>>2]|0,c[a+12>>2]|0);rd(c[a>>2]|0,c[a+8>>2]|0);i=b;return}function Xd(d,e,f,h,j){d=d|0;e=e|0;f=f|0;h=h|0;j=j|0;var l=0,m=0,n=0,o=hb,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=hb,y=0,z=0,A=0,B=hb,C=0,D=hb,E=hb,F=hb,G=hb,H=hb,I=0,J=hb;l=i;i=i+160|0;p=l+128|0;q=l+148|0;r=l+96|0;w=l+52|0;n=l;sd(q);o=$(g[f>>2]);m=d+28|0;if((c[m>>2]|0)>0){t=d+8|0;s=h+4|0;v=d+20|0;u=d+24|0;y=0;do{C=c[(c[t>>2]|0)+(y<<2)>>2]|0;A=C+44|0;z=c[A>>2]|0;A=c[A+4>>2]|0;x=$(g[C+56>>2]);I=C+64|0;D=$(g[I>>2]);E=$(g[I+4>>2]);B=$(g[C+72>>2]);I=C+36|0;c[I>>2]=z;c[I+4>>2]=A;g[C+52>>2]=x;if((c[C>>2]|0)==2){H=$(g[C+140>>2]);J=$(H*$(g[h>>2]));H=$(H*$(g[s>>2]));F=$(g[C+120>>2]);G=$(F*$(g[C+76>>2]));D=$(D+$(o*$(J+G)));E=$(E+$(o*$(H+$(F*$(g[C+80>>2])))));F=$(o*$(g[C+128>>2]));B=$(B+$(F*$(g[C+84>>2])));F=$($(1.0)-$(o*$(g[C+132>>2])));I=F<$(1.0);F=I?F:$(1.0);I=F<$(0.0);F=I?$(0.0):F;D=$(D*F);E=$(E*F);F=$($(1.0)-$(o*$(g[C+136>>2])));I=F<$(1.0);F=I?F:$(1.0);I=F<$(0.0);B=$(B*(I?$(0.0):F))}I=(c[v>>2]|0)+(y*12|0)|0;c[I>>2]=z;c[I+4>>2]=A;g[(c[v>>2]|0)+(y*12|0)+8>>2]=x;H=$(D);J=$(E);I=(c[u>>2]|0)+(y*12|0)|0;g[I>>2]=H;g[I+4>>2]=J;g[(c[u>>2]|0)+(y*12|0)+8>>2]=B;y=y+1|0}while((y|0)<(c[m>>2]|0))}else{u=d+24|0;v=d+20|0}c[r+0>>2]=c[f+0>>2];c[r+4>>2]=c[f+4>>2];c[r+8>>2]=c[f+8>>2];c[r+12>>2]=c[f+12>>2];c[r+16>>2]=c[f+16>>2];c[r+20>>2]=c[f+20>>2];C=c[v>>2]|0;c[r+24>>2]=C;I=c[u>>2]|0;c[r+28>>2]=I;c[w+0>>2]=c[f+0>>2];c[w+4>>2]=c[f+4>>2];c[w+8>>2]=c[f+8>>2];c[w+12>>2]=c[f+12>>2];c[w+16>>2]=c[f+16>>2];c[w+20>>2]=c[f+20>>2];t=d+12|0;c[w+24>>2]=c[t>>2];s=d+36|0;c[w+28>>2]=c[s>>2];c[w+32>>2]=C;c[w+36>>2]=I;c[w+40>>2]=c[d>>2];ye(n,w);Ae(n);if((a[f+20|0]|0)!=0){Be(n)}w=d+32|0;if((c[w>>2]|0)>0){y=d+16|0;h=0;do{I=c[(c[y>>2]|0)+(h<<2)>>2]|0;lb[c[(c[I>>2]|0)+28>>2]&15](I,r);h=h+1|0}while((h|0)<(c[w>>2]|0))}g[e+12>>2]=$(ud(q));z=f+12|0;if((c[z>>2]|0)>0){A=d+16|0;h=0;do{if((c[w>>2]|0)>0){y=0;do{I=c[(c[A>>2]|0)+(y<<2)>>2]|0;lb[c[(c[I>>2]|0)+32>>2]&15](I,r);y=y+1|0}while((y|0)<(c[w>>2]|0))}Ce(n);h=h+1|0}while((h|0)<(c[z>>2]|0))}De(n);g[e+16>>2]=$(ud(q));if((c[m>>2]|0)>0){z=c[u>>2]|0;h=0;do{I=c[v>>2]|0;y=I+(h*12|0)|0;C=y;x=$(g[C>>2]);B=$(g[C+4>>2]);D=$(g[I+(h*12|0)+8>>2]);I=z+(h*12|0)|0;F=$(g[I>>2]);G=$(g[I+4>>2]);E=$(g[z+(h*12|0)+8>>2]);J=$(o*F);H=$(o*G);H=$($(J*J)+$(H*H));if(H>$(4.0)){J=$($(2.0)/$(O($(H))));F=$(F*J);G=$(G*J)}H=$(o*E);if($(H*H)>$(2.4674012660980225)){if(!(H>$(0.0))){H=$(-H)}E=$(E*$($(1.5707963705062866)/H))}x=$(x+$(o*F));J=$(B+$(o*G));H=$(D+$(o*E));D=$(x);J=$(J);z=y;g[z>>2]=D;g[z+4>>2]=J;g[(c[v>>2]|0)+(h*12|0)+8>>2]=H;H=$(F);J=$(G);z=(c[u>>2]|0)+(h*12|0)|0;g[z>>2]=H;g[z+4>>2]=J;z=c[u>>2]|0;g[z+(h*12|0)+8>>2]=E;h=h+1|0}while((h|0)<(c[m>>2]|0))}f=f+16|0;a:do{if((c[f>>2]|0)>0){h=d+16|0;z=0;while(1){y=Ee(n)|0;if((c[w>>2]|0)>0){C=0;A=1;do{I=c[(c[h>>2]|0)+(C<<2)>>2]|0;A=A&(rb[c[(c[I>>2]|0)+36>>2]&3](I,r)|0);C=C+1|0}while((C|0)<(c[w>>2]|0))}else{A=1}z=z+1|0;if(y&A){r=0;break a}if((z|0)>=(c[f>>2]|0)){r=1;break}}}else{r=1}}while(0);if((c[m>>2]|0)>0){w=d+8|0;f=0;do{I=c[(c[w>>2]|0)+(f<<2)>>2]|0;C=(c[v>>2]|0)+(f*12|0)|0;A=c[C>>2]|0;C=c[C+4>>2]|0;h=I+44|0;c[h>>2]=A;c[h+4>>2]=C;G=$(g[(c[v>>2]|0)+(f*12|0)+8>>2]);g[I+56>>2]=G;h=(c[u>>2]|0)+(f*12|0)|0;y=c[h+4>>2]|0;z=I+64|0;c[z>>2]=c[h>>2];c[z+4>>2]=y;g[I+72>>2]=$(g[(c[u>>2]|0)+(f*12|0)+8>>2]);E=$(+R(+G));g[I+20>>2]=E;G=$(+Q(+G));g[I+24>>2]=G;F=$(g[I+28>>2]);H=$(G*F);J=$(g[I+32>>2]);H=$(H-$(E*J));J=$($(E*F)+$(G*J));H=$((c[k>>2]=A,$(g[k>>2]))-H);J=$((c[k>>2]=C,$(g[k>>2]))-J);H=$(H);J=$(J);I=I+12|0;g[I>>2]=H;g[I+4>>2]=J;f=f+1|0}while((f|0)<(c[m>>2]|0))}g[e+20>>2]=$(ud(q));e=c[n+40>>2]|0;q=d+4|0;if((c[q>>2]|0)!=0?(c[s>>2]|0)>0:0){f=p+16|0;u=0;do{v=c[(c[t>>2]|0)+(u<<2)>>2]|0;w=c[e+(u*152|0)+144>>2]|0;c[f>>2]=w;if((w|0)>0){h=0;do{g[p+(h<<2)>>2]=$(g[e+(u*152|0)+(h*36|0)+16>>2]);g[p+(h<<2)+8>>2]=$(g[e+(u*152|0)+(h*36|0)+20>>2]);h=h+1|0}while((h|0)!=(w|0))}I=c[q>>2]|0;nb[c[(c[I>>2]|0)+20>>2]&3](I,v,p);u=u+1|0}while((u|0)<(c[s>>2]|0))}if(!j){ze(n);i=l;return}p=c[m>>2]|0;j=(p|0)>0;if(j){q=c[d+8>>2]|0;e=0;x=$(3.4028234663852886e+38);do{f=c[q+(e<<2)>>2]|0;do{if((c[f>>2]|0)!=0){if((!((b[f+4>>1]&4)==0)?(J=$(g[f+72>>2]),!($(J*J)>$(.001218469929881394))):0)?(H=$(g[f+64>>2]),H=$(H*H),J=$(g[f+68>>2]),!($(H+$(J*J))>$(9999999747378752.0e-20))):0){I=f+144|0;B=$(o+$(g[I>>2]));g[I>>2]=B;x=x<B?x:B;break}g[f+144>>2]=$(0.0);x=$(0.0)}}while(0);e=e+1|0}while((e|0)<(p|0))}else{x=$(3.4028234663852886e+38)}if(!(x>=$(.5))|r|j^1){ze(n);i=l;return}d=d+8|0;j=0;do{I=c[(c[d>>2]|0)+(j<<2)>>2]|0;C=I+4|0;b[C>>1]=b[C>>1]&65533;g[I+144>>2]=$(0.0);I=I+64|0;c[I+0>>2]=0;c[I+4>>2]=0;c[I+8>>2]=0;c[I+12>>2]=0;c[I+16>>2]=0;c[I+20>>2]=0;j=j+1|0}while((j|0)<(c[m>>2]|0));ze(n);i=l;return}function Yd(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=hb,r=hb,s=hb,t=hb,u=hb,v=hb,w=hb,x=hb,y=0,z=0,A=0,B=0,C=hb;f=i;i=i+128|0;h=f+96|0;p=f+52|0;j=f;l=a+28|0;k=c[l>>2]|0;if((k|0)<=(d|0)){ya(5464,5488,386,5520)}if((k|0)<=(e|0)){ya(5536,5488,387,5520)}if((k|0)>0){o=a+8|0;n=a+20|0;m=a+24|0;y=0;while(1){k=c[(c[o>>2]|0)+(y<<2)>>2]|0;z=k+44|0;A=c[z+4>>2]|0;B=(c[n>>2]|0)+(y*12|0)|0;c[B>>2]=c[z>>2];c[B+4>>2]=A;x=$(g[k+56>>2]);g[(c[n>>2]|0)+(y*12|0)+8>>2]=x;B=k+64|0;A=c[B+4>>2]|0;z=(c[m>>2]|0)+(y*12|0)|0;c[z>>2]=c[B>>2];c[z+4>>2]=A;x=$(g[k+72>>2]);k=c[m>>2]|0;g[k+(y*12|0)+8>>2]=x;y=y+1|0;if((y|0)>=(c[l>>2]|0)){y=k;break}}}else{n=a+20|0;y=c[a+24>>2]|0}k=a+12|0;c[p+24>>2]=c[k>>2];m=a+36|0;c[p+28>>2]=c[m>>2];c[p+40>>2]=c[a>>2];c[p+0>>2]=c[b+0>>2];c[p+4>>2]=c[b+4>>2];c[p+8>>2]=c[b+8>>2];c[p+12>>2]=c[b+12>>2];c[p+16>>2]=c[b+16>>2];c[p+20>>2]=c[b+20>>2];c[p+32>>2]=c[n>>2];o=a+24|0;c[p+36>>2]=y;ye(j,p);p=b+16|0;a:do{if((c[p>>2]|0)>0){y=0;do{y=y+1|0;if(Ge(j,d,e)|0){break a}}while((y|0)<(c[p>>2]|0))}}while(0);p=a+8|0;A=(c[n>>2]|0)+(d*12|0)|0;B=c[A+4>>2]|0;z=(c[(c[p>>2]|0)+(d<<2)>>2]|0)+36|0;c[z>>2]=c[A>>2];c[z+4>>2]=B;z=c[n>>2]|0;x=$(g[z+(d*12|0)+8>>2]);B=c[p>>2]|0;g[(c[B+(d<<2)>>2]|0)+52>>2]=x;z=z+(e*12|0)|0;A=c[z+4>>2]|0;B=(c[B+(e<<2)>>2]|0)+36|0;c[B>>2]=c[z>>2];c[B+4>>2]=A;x=$(g[(c[n>>2]|0)+(e*12|0)+8>>2]);g[(c[(c[p>>2]|0)+(e<<2)>>2]|0)+52>>2]=x;Ae(j);e=b+12|0;if((c[e>>2]|0)>0){d=0;do{Ce(j);d=d+1|0}while((d|0)<(c[e>>2]|0))}t=$(g[b>>2]);if((c[l>>2]|0)>0){d=0;do{B=c[n>>2]|0;b=B+(d*12|0)|0;A=b;q=$(g[A>>2]);s=$(g[A+4>>2]);r=$(g[B+(d*12|0)+8>>2]);B=c[o>>2]|0;A=B+(d*12|0)|0;v=$(g[A>>2]);w=$(g[A+4>>2]);u=$(g[B+(d*12|0)+8>>2]);C=$(t*v);x=$(t*w);x=$($(C*C)+$(x*x));if(x>$(4.0)){C=$($(2.0)/$(O($(x))));v=$(v*C);w=$(w*C)}x=$(t*u);if($(x*x)>$(2.4674012660980225)){if(!(x>$(0.0))){x=$(-x)}u=$(u*$($(1.5707963705062866)/x))}q=$(q+$(t*v));s=$(s+$(t*w));x=$(r+$(t*u));r=$(q);C=$(s);B=b;g[B>>2]=r;g[B+4>>2]=C;g[(c[n>>2]|0)+(d*12|0)+8>>2]=x;v=$(v);w=$(w);B=(c[o>>2]|0)+(d*12|0)|0;g[B>>2]=v;g[B+4>>2]=w;g[(c[o>>2]|0)+(d*12|0)+8>>2]=u;B=c[(c[p>>2]|0)+(d<<2)>>2]|0;A=B+44|0;g[A>>2]=r;g[A+4>>2]=C;g[B+56>>2]=x;A=B+64|0;g[A>>2]=v;g[A+4>>2]=w;g[B+72>>2]=u;u=$(+R(+x));g[B+20>>2]=u;w=$(+Q(+x));g[B+24>>2]=w;v=$(g[B+28>>2]);x=$(w*v);C=$(g[B+32>>2]);x=$(q-$(x-$(u*C)));C=$(s-$($(u*v)+$(w*C)));x=$(x);C=$(C);B=B+12|0;g[B>>2]=x;g[B+4>>2]=C;d=d+1|0}while((d|0)<(c[l>>2]|0))}l=c[j+40>>2]|0;a=a+4|0;if((c[a>>2]|0)==0){ze(j);i=f;return}if((c[m>>2]|0)<=0){ze(j);i=f;return}n=h+16|0;o=0;do{p=c[(c[k>>2]|0)+(o<<2)>>2]|0;b=c[l+(o*152|0)+144>>2]|0;c[n>>2]=b;if((b|0)>0){d=0;do{g[h+(d<<2)>>2]=$(g[l+(o*152|0)+(d*36|0)+16>>2]);g[h+(d<<2)+8>>2]=$(g[l+(o*152|0)+(d*36|0)+20>>2]);d=d+1|0}while((d|0)!=(b|0))}B=c[a>>2]|0;nb[c[(c[B>>2]|0)+20>>2]&3](B,p,h);o=o+1|0}while((o|0)<(c[m>>2]|0));ze(j);i=f;return}function Zd(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var h=0,j=0,k=0,l=hb,m=hb,n=hb,o=hb,p=hb,q=hb,r=hb;h=i;k=a+60|0;c[k>>2]=0;j=b+12|0;p=$(g[d+12>>2]);o=$(g[j>>2]);l=$(p*o);r=$(g[d+8>>2]);m=$(g[b+16>>2]);l=$(l-$(r*m));l=$($(g[d>>2])+l);m=$($(o*r)+$(p*m));m=$(m+$(g[d+4>>2]));d=e+12|0;p=$(g[f+12>>2]);r=$(g[d>>2]);o=$(p*r);q=$(g[f+8>>2]);n=$(g[e+16>>2]);o=$(o-$(q*n));o=$($(g[f>>2])+o);n=$($(r*q)+$(p*n));l=$(o-l);m=$($(n+$(g[f+4>>2]))-m);m=$($(l*l)+$(m*m));l=$(g[b+8>>2]);l=$(l+$(g[e+8>>2]));if(m>$(l*l)){i=h;return}c[a+56>>2]=0;e=j;f=c[e+4>>2]|0;b=a+48|0;c[b>>2]=c[e>>2];c[b+4>>2]=f;g[a+40>>2]=$(0.0);g[a+44>>2]=$(0.0);c[k>>2]=1;b=d;f=c[b+4>>2]|0;d=a;c[d>>2]=c[b>>2];c[d+4>>2]=f;c[a+16>>2]=0;i=h;return}function _d(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var h=0,j=0,l=0,m=hb,n=hb,o=hb,p=0,q=hb,r=hb,s=0,t=hb,u=hb,v=hb,w=hb,x=hb,y=hb,z=0;j=i;l=a+60|0;c[l>>2]=0;h=e+12|0;x=$(g[f+12>>2]);n=$(g[h>>2]);m=$(x*n);o=$(g[f+8>>2]);y=$(g[e+16>>2]);m=$(m-$(o*y));m=$($(g[f>>2])+m);y=$($(n*o)+$(x*y));y=$(y+$(g[f+4>>2]));m=$(m-$(g[d>>2]));y=$(y-$(g[d+4>>2]));x=$(g[d+12>>2]);o=$(m*x);n=$(g[d+8>>2]);o=$(o+$(y*n));n=$($(x*y)-$(m*n));m=$(g[b+8>>2]);m=$(m+$(g[e+8>>2]));p=c[b+148>>2]|0;do{if((p|0)>0){f=0;e=0;q=$(-3.4028234663852886e+38);while(1){y=$(o-$(g[b+(f<<3)+20>>2]));r=$(n-$(g[b+(f<<3)+24>>2]));y=$(y*$(g[b+(f<<3)+84>>2]));r=$(y+$(r*$(g[b+(f<<3)+88>>2])));if(r>m){f=19;break}d=r>q;q=d?r:q;e=d?f:e;f=f+1|0;if((f|0)>=(p|0)){f=4;break}}if((f|0)==4){z=q<$(1.1920928955078125e-7);break}else if((f|0)==19){i=j;return}}else{e=0;z=1}}while(0);s=e+1|0;d=b+(e<<3)+20|0;f=c[d>>2]|0;d=c[d+4>>2]|0;r=(c[k>>2]=f,$(g[k>>2]));q=(c[k>>2]=d,$(g[k>>2]));p=b+(((s|0)<(p|0)?s:0)<<3)+20|0;s=c[p>>2]|0;p=c[p+4>>2]|0;y=(c[k>>2]=s,$(g[k>>2]));v=(c[k>>2]=p,$(g[k>>2]));if(z){c[l>>2]=1;c[a+56>>2]=1;z=b+(e<<3)+84|0;s=c[z+4>>2]|0;p=a+40|0;c[p>>2]=c[z>>2];c[p+4>>2]=s;x=$($(r+y)*$(.5));y=$($(q+v)*$(.5));x=$(x);y=$(y);p=a+48|0;g[p>>2]=x;g[p+4>>2]=y;p=h;s=c[p+4>>2]|0;z=a;c[z>>2]=c[p>>2];c[z+4>>2]=s;c[a+16>>2]=0;i=j;return}t=$(o-r);x=$(n-q);w=$(o-y);u=$(n-v);if($($(t*$(y-r))+$(x*$(v-q)))<=$(0.0)){if($($(t*t)+$(x*x))>$(m*m)){i=j;return}c[l>>2]=1;c[a+56>>2]=1;b=a+40|0;y=$(t);m=$(x);z=b;g[z>>2]=y;g[z+4>>2]=m;m=$(O($($(t*t)+$(x*x))));if(!(m<$(1.1920928955078125e-7))){y=$($(1.0)/m);g[b>>2]=$(t*y);g[a+44>>2]=$(x*y)}p=a+48|0;c[p>>2]=f;c[p+4>>2]=d;p=h;s=c[p+4>>2]|0;z=a;c[z>>2]=c[p>>2];c[z+4>>2]=s;c[a+16>>2]=0;i=j;return}if(!($($(w*$(r-y))+$(u*$(q-v)))<=$(0.0))){r=$($(r+y)*$(.5));q=$($(q+v)*$(.5));x=$(o-r);y=$(n-q);f=b+(e<<3)+84|0;x=$(x*$(g[f>>2]));if($(x+$(y*$(g[b+(e<<3)+88>>2])))>m){i=j;return}c[l>>2]=1;c[a+56>>2]=1;z=f;s=c[z+4>>2]|0;p=a+40|0;c[p>>2]=c[z>>2];c[p+4>>2]=s;x=$(r);y=$(q);p=a+48|0;g[p>>2]=x;g[p+4>>2]=y;p=h;s=c[p+4>>2]|0;z=a;c[z>>2]=c[p>>2];c[z+4>>2]=s;c[a+16>>2]=0;i=j;return}if($($(w*w)+$(u*u))>$(m*m)){i=j;return}c[l>>2]=1;c[a+56>>2]=1;b=a+40|0;y=$(w);m=$(u);z=b;g[z>>2]=y;g[z+4>>2]=m;m=$(O($($(w*w)+$(u*u))));if(!(m<$(1.1920928955078125e-7))){y=$($(1.0)/m);g[b>>2]=$(w*y);g[a+44>>2]=$(u*y)}z=a+48|0;c[z>>2]=s;c[z+4>>2]=p;p=h;s=c[p+4>>2]|0;z=a;c[z>>2]=c[p>>2];c[z+4>>2]=s;c[a+16>>2]=0;i=j;return}function $d(b,d,e,f,h){b=b|0;d=d|0;e=e|0;f=f|0;h=h|0;var j=0,l=0,m=0,n=hb,o=hb,p=hb,q=hb,r=hb,s=hb,t=0,u=0,v=hb,w=hb,x=hb,y=hb,z=hb,A=hb,B=hb,C=hb;m=i;j=b+60|0;c[j>>2]=0;l=f+12|0;o=$(g[h+12>>2]);w=$(g[l>>2]);A=$(o*w);B=$(g[h+8>>2]);x=$(g[f+16>>2]);A=$(A-$(B*x));A=$($(g[h>>2])+A);x=$($(w*B)+$(o*x));x=$(x+$(g[h+4>>2]));A=$(A-$(g[e>>2]));x=$(x-$(g[e+4>>2]));o=$(g[e+12>>2]);B=$(A*o);w=$(g[e+8>>2]);B=$(B+$(x*w));w=$($(o*x)-$(A*w));e=d+12|0;h=c[e>>2]|0;e=c[e+4>>2]|0;A=(c[k>>2]=h,$(g[k>>2]));x=(c[k>>2]=e,$(g[k>>2]));u=d+20|0;t=c[u>>2]|0;u=c[u+4>>2]|0;o=(c[k>>2]=t,$(g[k>>2]));p=(c[k>>2]=u,$(g[k>>2]));n=$(o-A);v=$(p-x);y=$($(n*$(o-B))+$(v*$(p-w)));s=$(B-A);r=$(w-x);z=$($(s*n)+$(r*v));q=$(g[d+8>>2]);q=$(q+$(g[f+8>>2]));if(z<=$(0.0)){if($($(s*s)+$(r*r))>$(q*q)){i=m;return}if((a[d+44|0]|0)!=0?(f=d+28|0,C=$(g[f>>2]),$($($(A-B)*$(A-C))+$($(x-w)*$(x-$(g[f+4>>2]))))>$(0.0)):0){i=m;return}c[j>>2]=1;c[b+56>>2]=0;g[b+40>>2]=$(0.0);g[b+44>>2]=$(0.0);t=b+48|0;c[t>>2]=h;c[t+4>>2]=e;t=b+16|0;c[t>>2]=0;a[t]=0;a[t+1|0]=0;a[t+2|0]=0;a[t+3|0]=0;t=l;u=c[t+4>>2]|0;f=b;c[f>>2]=c[t>>2];c[f+4>>2]=u;i=m;return}if(y<=$(0.0)){n=$(B-o);r=$(w-p);if($($(n*n)+$(r*r))>$(q*q)){i=m;return}if((a[d+45|0]|0)!=0?(f=d+36|0,C=$(g[f>>2]),$($(n*$(C-o))+$(r*$($(g[f+4>>2])-p)))>$(0.0)):0){i=m;return}c[j>>2]=1;c[b+56>>2]=0;g[b+40>>2]=$(0.0);g[b+44>>2]=$(0.0);f=b+48|0;c[f>>2]=t;c[f+4>>2]=u;t=b+16|0;c[t>>2]=0;a[t]=1;a[t+1|0]=0;a[t+2|0]=0;a[t+3|0]=0;t=l;u=c[t+4>>2]|0;f=b;c[f>>2]=c[t>>2];c[f+4>>2]=u;i=m;return}C=$($(n*n)+$(v*v));if(!(C>$(0.0))){ya(5560,5576,127,5616)}C=$($(1.0)/C);B=$(B-$($($(A*y)+$(o*z))*C));C=$(w-$($($(x*y)+$(p*z))*C));if($($(B*B)+$(C*C))>$(q*q)){i=m;return}o=$(-v);if($($(n*r)+$(s*o))<$(0.0)){n=$(-n)}else{v=o}o=$(O($($(n*n)+$(v*v))));if(!(o<$(1.1920928955078125e-7))){C=$($(1.0)/o);v=$(v*C);n=$(n*C)}c[j>>2]=1;c[b+56>>2]=1;B=$(v);C=$(n);t=b+40|0;g[t>>2]=B;g[t+4>>2]=C;t=b+48|0;c[t>>2]=h;c[t+4>>2]=e;t=b+16|0;c[t>>2]=0;a[t]=0;a[t+1|0]=0;a[t+2|0]=1;a[t+3|0]=0;t=l;u=c[t+4>>2]|0;f=b;c[f>>2]=c[t>>2];c[f+4>>2]=u;i=m;return}



function ae(b,d,e,f,h,j){b=b|0;d=d|0;e=e|0;f=f|0;h=h|0;j=j|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=hb,B=hb,C=hb,D=hb,E=hb,F=hb,G=hb,H=0,I=hb,J=hb,K=hb,L=hb,M=0,N=0,P=hb,Q=hb,R=0,S=hb,T=0,U=0;l=i;i=i+144|0;w=l+128|0;r=l+24|0;p=l+72|0;q=l+48|0;m=l;n=b+132|0;G=$(g[f+12>>2]);C=$(g[j+8>>2]);A=$(G*C);B=$(g[f+8>>2]);F=$(g[j+12>>2]);A=$(A-$(B*F));F=$($(C*B)+$(G*F));C=$(A);E=$(F);D=$(g[j>>2]);D=$(D-$(g[f>>2]));Q=$(g[j+4>>2]);Q=$(Q-$(g[f+4>>2]));P=$($(G*D)+$(B*Q));D=$($(G*Q)-$(B*D));B=$(P);Q=$(D);f=n;g[f>>2]=B;g[f+4>>2]=Q;f=b+140|0;g[f>>2]=C;g[f+4>>2]=E;f=b+144|0;E=$(g[h+12>>2]);C=$(F*E);o=b+140|0;Q=$(g[h+16>>2]);C=$(P+$(C-$(A*Q)));j=b+136|0;D=$($($(E*A)+$(F*Q))+D);Q=$(C);F=$(D);H=b+148|0;g[H>>2]=Q;g[H+4>>2]=F;H=e+28|0;v=c[H>>2]|0;H=c[H+4>>2]|0;t=b+156|0;c[t>>2]=v;c[t+4>>2]=H;t=b+164|0;R=e+12|0;T=c[R>>2]|0;R=c[R+4>>2]|0;s=t;c[s>>2]=T;c[s+4>>2]=R;s=b+172|0;y=e+20|0;U=c[y>>2]|0;y=c[y+4>>2]|0;N=s;c[N>>2]=U;c[N+4>>2]=y;N=e+36|0;M=c[N>>2]|0;N=c[N+4>>2]|0;x=b+180|0;c[x>>2]=M;c[x+4>>2]=N;x=(a[e+44|0]|0)!=0;z=(a[e+45|0]|0)!=0;F=(c[k>>2]=U,$(g[k>>2]));Q=(c[k>>2]=T,$(g[k>>2]));A=$(F-Q);E=(c[k>>2]=y,$(g[k>>2]));y=b+168|0;P=(c[k>>2]=R,$(g[k>>2]));B=$(E-P);G=$(O($($(A*A)+$(B*B))));R=G<$(1.1920928955078125e-7);L=(c[k>>2]=v,$(g[k>>2]));K=(c[k>>2]=H,$(g[k>>2]));J=(c[k>>2]=M,$(g[k>>2]));I=(c[k>>2]=N,$(g[k>>2]));if(!R){S=$($(1.0)/G);A=$(A*S);B=$(B*S)}e=b+196|0;G=$(-A);g[e>>2]=B;v=b+200|0;g[v>>2]=G;G=$($($(C-Q)*B)+$($(D-P)*G));if(x){Q=$(Q-L);P=$(P-K);S=$(O($($(Q*Q)+$(P*P))));if(!(S<$(1.1920928955078125e-7))){S=$($(1.0)/S);Q=$(Q*S);P=$(P*S)}S=$(-Q);g[b+188>>2]=P;g[b+192>>2]=S;H=$($(B*Q)-$(A*P))>=$(0.0);K=$($($(C-L)*P)+$($(D-K)*S))}else{H=0;K=$(0.0)}a:do{if(!z){if(!x){U=G>=$(0.0);a[b+248|0]=U&1;x=b+212|0;if(U){u=64;break}else{u=65;break}}x=K>=$(0.0);if(H){if(!x){U=G>=$(0.0);a[b+248|0]=U&1;x=b+212|0;if(!U){Q=$(-B);Q=$(Q);S=$(A);R=x;g[R>>2]=Q;g[R+4>>2]=S;R=e;U=c[R>>2]|0;R=c[R+4>>2]|0;T=b+228|0;c[T>>2]=U;c[T+4>>2]=R;Q=$(-(c[k>>2]=U,$(g[k>>2])));U=b+236|0;g[U>>2]=Q;g[U+4>>2]=S;break}}else{a[b+248|0]=1;x=b+212|0}U=e;T=c[U+4>>2]|0;R=x;c[R>>2]=c[U>>2];c[R+4>>2]=T;R=b+188|0;T=c[R+4>>2]|0;U=b+228|0;c[U>>2]=c[R>>2];c[U+4>>2]=T;Q=$(-$(g[e>>2]));S=$(-$(g[v>>2]));Q=$(Q);S=$(S);U=b+236|0;g[U>>2]=Q;g[U+4>>2]=S;break}else{if(x){U=G>=$(0.0);a[b+248|0]=U&1;x=b+212|0;if(U){R=e;U=c[R>>2]|0;R=c[R+4>>2]|0;T=x;c[T>>2]=U;c[T+4>>2]=R;T=b+228|0;c[T>>2]=U;c[T+4>>2]=R;Q=$(-(c[k>>2]=U,$(g[k>>2])));Q=$(Q);S=$(A);U=b+236|0;g[U>>2]=Q;g[U+4>>2]=S;break}}else{a[b+248|0]=0;x=b+212|0}S=$(-B);S=$(S);Q=$(A);R=x;g[R>>2]=S;g[R+4>>2]=Q;R=e;T=c[R+4>>2]|0;U=b+228|0;c[U>>2]=c[R>>2];c[U+4>>2]=T;Q=$(-$(g[b+188>>2]));S=$(-$(g[b+192>>2]));Q=$(Q);S=$(S);U=b+236|0;g[U>>2]=Q;g[U+4>>2]=S;break}}else{L=$(J-F);J=$(I-E);I=$(O($($(L*L)+$(J*J))));if(I<$(1.1920928955078125e-7)){I=L}else{S=$($(1.0)/I);I=$(L*S);J=$(J*S)}S=$(-I);M=b+204|0;g[M>>2]=J;N=b+208|0;g[N>>2]=S;R=$($(A*J)-$(B*I))>$(0.0);C=$($($(C-F)*J)+$($(D-E)*S));if(!x){x=G>=$(0.0);if(!z){a[b+248|0]=x&1;u=b+212|0;if(x){x=u;u=64;break}else{x=u;u=65;break}}if(R){if(!x){U=C>=$(0.0);a[b+248|0]=U&1;x=b+212|0;if(!U){Q=$(-B);Q=$(Q);S=$(A);R=x;g[R>>2]=Q;g[R+4>>2]=S;R=b+228|0;g[R>>2]=Q;g[R+4>>2]=S;R=e;T=c[R+4>>2]|0;U=b+236|0;c[U>>2]=c[R>>2];c[U+4>>2]=T;break}}else{a[b+248|0]=1;x=b+212|0}U=e;T=c[U+4>>2]|0;R=x;c[R>>2]=c[U>>2];c[R+4>>2]=T;Q=$(-$(g[e>>2]));S=$(-$(g[v>>2]));Q=$(Q);S=$(S);R=b+228|0;g[R>>2]=Q;g[R+4>>2]=S;R=b+204|0;T=c[R+4>>2]|0;U=b+236|0;c[U>>2]=c[R>>2];c[U+4>>2]=T;break}else{if(x){U=C>=$(0.0);a[b+248|0]=U&1;x=b+212|0;if(U){T=e;R=c[T>>2]|0;T=c[T+4>>2]|0;U=x;c[U>>2]=R;c[U+4>>2]=T;Q=$(-(c[k>>2]=R,$(g[k>>2])));Q=$(Q);S=$(A);U=b+228|0;g[U>>2]=Q;g[U+4>>2]=S;U=b+236|0;c[U>>2]=R;c[U+4>>2]=T;break}}else{a[b+248|0]=0;x=b+212|0}S=$(-B);S=$(S);Q=$(A);R=x;g[R>>2]=S;g[R+4>>2]=Q;Q=$(-$(g[b+204>>2]));S=$(-$(g[b+208>>2]));Q=$(Q);S=$(S);R=b+228|0;g[R>>2]=Q;g[R+4>>2]=S;R=e;T=c[R+4>>2]|0;U=b+236|0;c[U>>2]=c[R>>2];c[U+4>>2]=T;break}}if(H&R){if(!(K>=$(0.0))&!(G>=$(0.0))){U=C>=$(0.0);a[b+248|0]=U&1;x=b+212|0;if(!U){Q=$(-B);Q=$(Q);S=$(A);U=x;g[U>>2]=Q;g[U+4>>2]=S;U=b+228|0;g[U>>2]=Q;g[U+4>>2]=S;U=b+236|0;g[U>>2]=Q;g[U+4>>2]=S;break}}else{a[b+248|0]=1;x=b+212|0}R=e;T=c[R+4>>2]|0;U=x;c[U>>2]=c[R>>2];c[U+4>>2]=T;U=b+188|0;T=c[U+4>>2]|0;R=b+228|0;c[R>>2]=c[U>>2];c[R+4>>2]=T;R=b+204|0;T=c[R+4>>2]|0;U=b+236|0;c[U>>2]=c[R>>2];c[U+4>>2]=T;break}if(H){do{if(!(K>=$(0.0))){if(G>=$(0.0)){U=C>=$(0.0);a[b+248|0]=U&1;x=b+212|0;if(U){break}}else{a[b+248|0]=0;x=b+212|0}Q=$(-B);Q=$(Q);S=$(A);U=x;g[U>>2]=Q;g[U+4>>2]=S;S=$(-$(g[M>>2]));Q=$(-$(g[N>>2]));S=$(S);Q=$(Q);U=b+228|0;g[U>>2]=S;g[U+4>>2]=Q;Q=$(-$(g[e>>2]));S=$(-$(g[v>>2]));Q=$(Q);S=$(S);U=b+236|0;g[U>>2]=Q;g[U+4>>2]=S;break a}else{a[b+248|0]=1;x=b+212|0}}while(0);R=e;T=c[R+4>>2]|0;U=x;c[U>>2]=c[R>>2];c[U+4>>2]=T;U=b+188|0;T=c[U+4>>2]|0;R=b+228|0;c[R>>2]=c[U>>2];c[R+4>>2]=T;R=e;T=c[R+4>>2]|0;U=b+236|0;c[U>>2]=c[R>>2];c[U+4>>2]=T;break}if(!R){if(!(!(K>=$(0.0))|!(G>=$(0.0)))){U=C>=$(0.0);a[b+248|0]=U&1;x=b+212|0;if(U){T=e;R=c[T>>2]|0;T=c[T+4>>2]|0;U=x;c[U>>2]=R;c[U+4>>2]=T;U=b+228|0;c[U>>2]=R;c[U+4>>2]=T;U=b+236|0;c[U>>2]=R;c[U+4>>2]=T;break}}else{a[b+248|0]=0;x=b+212|0}Q=$(-B);Q=$(Q);S=$(A);U=x;g[U>>2]=Q;g[U+4>>2]=S;S=$(-$(g[M>>2]));Q=$(-$(g[N>>2]));S=$(S);Q=$(Q);U=b+228|0;g[U>>2]=S;g[U+4>>2]=Q;Q=$(-$(g[b+188>>2]));S=$(-$(g[b+192>>2]));Q=$(Q);S=$(S);U=b+236|0;g[U>>2]=Q;g[U+4>>2]=S;break}do{if(!(C>=$(0.0))){if(K>=$(0.0)){U=G>=$(0.0);a[b+248|0]=U&1;x=b+212|0;if(U){break}}else{a[b+248|0]=0;x=b+212|0}Q=$(-B);Q=$(Q);S=$(A);U=x;g[U>>2]=Q;g[U+4>>2]=S;S=$(-$(g[e>>2]));Q=$(-$(g[v>>2]));S=$(S);Q=$(Q);U=b+228|0;g[U>>2]=S;g[U+4>>2]=Q;Q=$(-$(g[b+188>>2]));S=$(-$(g[b+192>>2]));Q=$(Q);S=$(S);U=b+236|0;g[U>>2]=Q;g[U+4>>2]=S;break a}else{a[b+248|0]=1;x=b+212|0}}while(0);R=e;T=c[R+4>>2]|0;U=x;c[U>>2]=c[R>>2];c[U+4>>2]=T;U=e;T=c[U+4>>2]|0;R=b+228|0;c[R>>2]=c[U>>2];c[R+4>>2]=T;R=b+204|0;T=c[R+4>>2]|0;U=b+236|0;c[U>>2]=c[R>>2];c[U+4>>2]=T}}while(0);if((u|0)==64){R=e;U=c[R>>2]|0;R=c[R+4>>2]|0;T=x;c[T>>2]=U;c[T+4>>2]=R;Q=$(-(c[k>>2]=U,$(g[k>>2])));Q=$(Q);S=$(A);U=b+228|0;g[U>>2]=Q;g[U+4>>2]=S;U=b+236|0;g[U>>2]=Q;g[U+4>>2]=S}else if((u|0)==65){Q=$(-B);Q=$(Q);S=$(A);T=x;g[T>>2]=Q;g[T+4>>2]=S;T=e;R=c[T>>2]|0;T=c[T+4>>2]|0;U=b+228|0;c[U>>2]=R;c[U+4>>2]=T;U=b+236|0;c[U>>2]=R;c[U+4>>2]=T}x=h+148|0;M=b+128|0;c[M>>2]=c[x>>2];if((c[x>>2]|0)>0){z=0;do{Q=$(g[f>>2]);S=$(g[h+(z<<3)+20>>2]);K=$(Q*S);L=$(g[o>>2]);P=$(g[h+(z<<3)+24>>2]);K=$(K-$(L*P));K=$($(g[n>>2])+K);P=$($(S*L)+$(Q*P));P=$(P+$(g[j>>2]));K=$(K);P=$(P);U=b+(z<<3)|0;g[U>>2]=K;g[U+4>>2]=P;P=$(g[f>>2]);K=$(g[h+(z<<3)+84>>2]);Q=$(P*K);L=$(g[o>>2]);S=$(g[h+(z<<3)+88>>2]);Q=$(Q-$(L*S));S=$($(K*L)+$(P*S));Q=$(Q);S=$(S);U=b+(z<<3)+64|0;g[U>>2]=Q;g[U+4>>2]=S;z=z+1|0}while((z|0)<(c[x>>2]|0))}z=b+244|0;g[z>>2]=$(.019999999552965164);x=d+60|0;c[x>>2]=0;H=b+248|0;N=c[M>>2]|0;if((N|0)<=0){i=l;return}B=$(g[b+164>>2]);E=$(g[y>>2]);C=$(g[b+212>>2]);F=$(g[b+216>>2]);A=$(3.4028234663852886e+38);y=0;do{D=$($(g[b+(y<<3)>>2])-B);D=$($(C*D)+$(F*$($(g[b+(y<<3)+4>>2])-E)));A=D<A?D:A;y=y+1|0}while((y|0)!=(N|0));if(A>$(.019999999552965164)){i=l;return}be(w,b);y=c[w>>2]|0;if((y|0)!=0){B=$(g[w+8>>2]);if(B>$(g[z>>2])){i=l;return}if(B>$($(A*$(.9800000190734863))+$(.0010000000474974513))){w=c[w+4>>2]|0;N=d+56|0;if((y|0)==1){w=r;u=77}else{c[N>>2]=2;T=t;U=c[T+4>>2]|0;R=r;c[R>>2]=c[T>>2];c[R+4>>2]=U;R=r+8|0;a[R]=0;U=w&255;a[R+1|0]=U;a[R+2|0]=0;a[R+3|0]=1;R=s;T=c[R+4>>2]|0;s=r+12|0;c[s>>2]=c[R>>2];c[s+4>>2]=T;s=r+20|0;a[s]=0;a[s+1|0]=U;a[s+2|0]=0;a[s+3|0]=1;c[p>>2]=w;s=w+1|0;e=(s|0)<(c[M>>2]|0)?s:0;c[p+4>>2]=e;v=b+(w<<3)|0;s=c[v>>2]|0;v=c[v+4>>2]|0;H=p+8|0;c[H>>2]=s;c[H+4>>2]=v;e=b+(e<<3)|0;H=c[e>>2]|0;e=c[e+4>>2]|0;y=p+16|0;c[y>>2]=H;c[y+4>>2]=e;y=b+(w<<3)+64|0;b=c[y>>2]|0;y=c[y+4>>2]|0;t=p+24|0;c[t>>2]=b;c[t+4>>2]=y;t=0}}else{u=75}}else{u=75}if((u|0)==75){w=r;N=d+56|0;u=77}do{if((u|0)==77){c[N>>2]=1;u=c[M>>2]|0;if((u|0)>1){C=$(g[b+68>>2]);B=$(g[b+216>>2]);S=$(g[b+64>>2]);A=$(g[b+212>>2]);M=0;C=$($(A*S)+$(B*C));N=1;while(1){D=$(A*$(g[b+(N<<3)+64>>2]));D=$(D+$(B*$(g[b+(N<<3)+68>>2])));y=D<C;M=y?N:M;N=N+1|0;if((N|0)<(u|0)){C=y?D:C}else{break}}}else{M=0}y=M+1|0;T=(y|0)<(u|0)?y:0;U=b+(M<<3)|0;R=c[U+4>>2]|0;N=r;c[N>>2]=c[U>>2];c[N+4>>2]=R;N=r+8|0;a[N]=0;a[N+1|0]=M;a[N+2|0]=1;a[N+3|0]=0;N=b+(T<<3)|0;R=c[N+4>>2]|0;U=r+12|0;c[U>>2]=c[N>>2];c[U+4>>2]=R;U=r+20|0;a[U]=0;a[U+1|0]=T;a[U+2|0]=1;a[U+3|0]=0;if((a[H]|0)==0){c[p>>2]=1;c[p+4>>2]=0;r=s;s=c[r>>2]|0;r=c[r+4>>2]|0;H=p+8|0;c[H>>2]=s;c[H+4>>2]=r;H=c[t>>2]|0;t=c[t+4>>2]|0;b=p+16|0;c[b>>2]=H;c[b+4>>2]=t;Q=$(-$(g[e>>2]));S=$(-$(g[v>>2]));b=(g[k>>2]=Q,c[k>>2]|0);y=(g[k>>2]=S,c[k>>2]|0);e=p+24|0;c[e>>2]=b;c[e+4>>2]=y;e=t;v=r;r=w;w=1;t=1;break}else{c[p>>2]=0;c[p+4>>2]=1;v=t;r=c[v>>2]|0;v=c[v+4>>2]|0;H=p+8|0;c[H>>2]=r;c[H+4>>2]=v;H=c[s>>2]|0;s=c[s+4>>2]|0;y=p+16|0;c[y>>2]=H;c[y+4>>2]=s;y=e;b=c[y>>2]|0;y=c[y+4>>2]|0;e=p+24|0;c[e>>2]=b;c[e+4>>2]=y;e=s;s=r;r=w;w=0;t=1;break}}}while(0);I=(c[k>>2]=y,$(g[k>>2]));S=(c[k>>2]=b,$(g[k>>2]));J=(c[k>>2]=s,$(g[k>>2]));K=(c[k>>2]=v,$(g[k>>2]));L=(c[k>>2]=H,$(g[k>>2]));Q=(c[k>>2]=e,$(g[k>>2]));U=p+32|0;e=p+24|0;s=p+28|0;S=$(-S);g[U>>2]=I;g[p+36>>2]=S;H=p+44|0;P=$(-I);v=H;g[v>>2]=P;c[v+4>>2]=b;v=p+8|0;u=p+12|0;S=$($(I*J)+$(K*S));g[p+40>>2]=S;P=$(L*P);y=p+52|0;g[y>>2]=$(P+$((c[k>>2]=b,$(g[k>>2]))*Q));if((he(q,r,U,S,w)|0)<2){i=l;return}S=$(g[y>>2]);if((he(m,q,H,S,c[p+4>>2]|0)|0)<2){i=l;return}q=d+40|0;if(t){T=e;U=c[T>>2]|0;T=c[T+4>>2]|0;N=q;c[N>>2]=U;c[N+4>>2]=T;N=v;T=c[N>>2]|0;N=c[N+4>>2]|0;R=d+48|0;c[R>>2]=T;c[R+4>>2]=N;B=(c[k>>2]=T,$(g[k>>2]));A=(c[k>>2]=U,$(g[k>>2]));C=$(g[u>>2]);D=$(g[s>>2]);G=$(g[m>>2]);S=$(G-B);E=$(g[m+4>>2]);S=$($(S*A)+$($(E-C)*D));F=$(g[z>>2]);if(!(S<=F)){h=0}else{Q=$(G-$(g[n>>2]));P=$(E-$(g[j>>2]));L=$(g[f>>2]);S=$(Q*L);F=$(g[o>>2]);S=$(S+$(P*F));F=$($(L*P)-$(Q*F));S=$(S);F=$(F);h=d;g[h>>2]=S;g[h+4>>2]=F;c[d+16>>2]=c[m+8>>2];F=$(g[z>>2]);h=1}E=$(g[m+12>>2]);S=$(E-B);B=$(g[m+16>>2]);if($($(S*A)+$($(B-C)*D))<=F){P=$(E-$(g[n>>2]));L=$(B-$(g[j>>2]));K=$(g[f>>2]);Q=$(P*K);S=$(g[o>>2]);Q=$(Q+$(L*S));S=$($(K*L)-$(P*S));Q=$(Q);S=$(S);U=d+(h*20|0)|0;g[U>>2]=Q;g[U+4>>2]=S;c[d+(h*20|0)+16>>2]=c[m+20>>2];h=h+1|0}}else{R=c[p>>2]|0;N=h+(R<<3)+84|0;U=c[N+4>>2]|0;T=q;c[T>>2]=c[N>>2];c[T+4>>2]=U;R=h+(R<<3)+20|0;T=c[R+4>>2]|0;U=d+48|0;c[U>>2]=c[R>>2];c[U+4>>2]=T;A=$(g[v>>2]);B=$(g[e>>2]);C=$(g[u>>2]);D=$(g[s>>2]);S=$($(g[m>>2])-A);S=$($(S*B)+$($($(g[m+4>>2])-C)*D));E=$(g[z>>2]);if(!(S<=E)){h=0}else{T=m;h=c[T+4>>2]|0;U=d;c[U>>2]=c[T>>2];c[U+4>>2]=h;U=m+8|0;h=d+16|0;a[h+2|0]=a[U+3|0]|0;a[h+3|0]=a[U+2|0]|0;a[h]=a[U+1|0]|0;a[h+1|0]=a[U]|0;E=$(g[z>>2]);h=1}n=m+12|0;S=$($(g[n>>2])-A);if($($(S*B)+$($($(g[m+16>>2])-C)*D))<=E){R=n;U=c[R+4>>2]|0;T=d+(h*20|0)|0;c[T>>2]=c[R>>2];c[T+4>>2]=U;T=m+20|0;U=d+(h*20|0)+16|0;a[U+2|0]=a[T+3|0]|0;a[U+3|0]=a[T+2|0]|0;a[U]=a[T+1|0]|0;a[U+1|0]=a[T]|0;h=h+1|0}}c[x>>2]=h;i=l;return}function be(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,h=0,j=hb,k=hb,l=0,m=hb,n=hb,o=0,p=0,q=0,r=0,s=hb,t=hb,u=hb,v=hb,w=0,x=hb,y=hb,z=hb,A=hb,B=hb,C=hb;r=i;c[a>>2]=0;e=a+4|0;c[e>>2]=-1;f=a+8|0;g[f>>2]=$(-3.4028234663852886e+38);k=$(g[b+216>>2]);j=$(g[b+212>>2]);h=c[b+128>>2]|0;if((h|0)<=0){i=r;return}t=$(g[b+164>>2]);u=$(g[b+168>>2]);n=$(g[b+172>>2]);m=$(g[b+176>>2]);s=$(g[b+244>>2]);o=b+228|0;p=b+232|0;q=b+236|0;d=b+240|0;v=$(-3.4028234663852886e+38);w=0;while(1){z=$(g[b+(w<<3)+64>>2]);x=$(-z);y=$(-$(g[b+(w<<3)+68>>2]));C=$(g[b+(w<<3)>>2]);A=$(C-t);B=$(g[b+(w<<3)+4>>2]);A=$($(A*x)+$($(B-u)*y));B=$($($(C-n)*x)+$($(B-m)*y));A=A<B?A:B;if(A>s){break}if(!($($(k*z)+$(j*y))>=$(0.0))){C=$(x-$(g[o>>2]));if(!($($(C*j)+$($(y-$(g[p>>2]))*k))<$(-.03490658849477768))&A>v){l=8}}else{C=$(x-$(g[q>>2]));if(!($($(C*j)+$($(y-$(g[d>>2]))*k))<$(-.03490658849477768))&A>v){l=8}}if((l|0)==8){l=0;c[a>>2]=2;c[e>>2]=w;g[f>>2]=A;v=A}w=w+1|0;if((w|0)>=(h|0)){l=10;break}}if((l|0)==10){i=r;return}c[a>>2]=2;c[e>>2]=w;g[f>>2]=A;i=r;return}function ce(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0;f=i;i=i+256|0;ae(f,a,b,c,d,e);i=f;return}function de(b,d,e,f,h){b=b|0;d=d|0;e=e|0;f=f|0;h=h|0;var j=0,k=0,l=0,m=hb,n=hb,o=hb,p=hb,q=hb,r=0,s=0,t=0,u=0,v=hb,w=hb,x=hb,y=hb,z=hb,A=0,B=hb,C=hb,D=hb,E=hb,F=hb,G=0,H=hb,I=hb,J=hb,K=0,L=0,M=hb,N=0,P=hb,Q=hb;j=i;i=i+96|0;A=j+92|0;G=j+88|0;s=j;r=j+80|0;t=j+56|0;l=j+32|0;u=j+24|0;k=b+60|0;c[k>>2]=0;m=$(g[d+8>>2]);m=$(m+$(g[f+8>>2]));c[A>>2]=0;o=$(ee(A,d,e,f,h));if(o>m){i=j;return}c[G>>2]=0;n=$(ee(G,f,h,d,e));if(n>m){i=j;return}if(n>$($(o*$(.9800000190734863))+$(.0010000000474974513))){y=$(g[h>>2]);x=$(g[h+4>>2]);w=$(g[h+8>>2]);v=$(g[h+12>>2]);o=$(g[e>>2]);q=$(g[e+4>>2]);p=$(g[e+8>>2]);n=$(g[e+12>>2]);h=c[G>>2]|0;c[b+56>>2]=2;e=1;A=f}else{y=$(g[e>>2]);x=$(g[e+4>>2]);w=$(g[e+8>>2]);v=$(g[e+12>>2]);o=$(g[h>>2]);q=$(g[h+4>>2]);p=$(g[h+8>>2]);n=$(g[h+12>>2]);h=c[A>>2]|0;c[b+56>>2]=1;e=0;A=d;d=f}G=c[d+148>>2]|0;if(!((h|0)>-1)){ya(5640,5688,151,5728)}f=c[A+148>>2]|0;if((f|0)<=(h|0)){ya(5640,5688,151,5728)}D=$(g[A+(h<<3)+84>>2]);z=$(v*D);M=$(g[A+(h<<3)+88>>2]);z=$(z-$(w*M));M=$($(w*D)+$(v*M));D=$($(n*z)+$(p*M));z=$($(n*M)-$(p*z));if((G|0)>0){N=0;L=0;C=$(3.4028234663852886e+38);while(1){B=$(D*$(g[d+(N<<3)+84>>2]));B=$(B+$(z*$(g[d+(N<<3)+88>>2])));K=B<C;L=K?N:L;N=N+1|0;if((N|0)==(G|0)){break}else{C=K?B:C}}}else{L=0}K=L+1|0;N=(K|0)<(G|0)?K:0;M=$(g[d+(L<<3)+20>>2]);J=$(n*M);I=$(g[d+(L<<3)+24>>2]);J=$(o+$(J-$(p*I)));I=$(q+$($(p*M)+$(n*I)));J=$(J);I=$(I);K=s;g[K>>2]=J;g[K+4>>2]=I;K=h&255;G=s+8|0;a[G]=K;a[G+1|0]=L;a[G+2|0]=1;a[G+3|0]=0;I=$(g[d+(N<<3)+20>>2]);J=$(n*I);M=$(g[d+(N<<3)+24>>2]);J=$(o+$(J-$(p*M)));M=$(q+$($(p*I)+$(n*M)));J=$(J);M=$(M);d=s+12|0;g[d>>2]=J;g[d+4>>2]=M;d=s+20|0;a[d]=K;a[d+1|0]=N;a[d+2|0]=1;a[d+3|0]=0;d=h+1|0;f=(d|0)<(f|0)?d:0;N=A+(h<<3)+20|0;F=$(g[N>>2]);C=$(g[N+4>>2]);N=A+(f<<3)+20|0;E=$(g[N>>2]);D=$(g[N+4>>2]);M=$(E-F);I=$(D-C);z=$(O($($(M*M)+$(I*I))));if(!(z<$(1.1920928955078125e-7))){J=$($(1.0)/z);M=$(M*J);I=$(I*J)}J=$($(F+E)*$(.5));H=$($(v*M)-$(w*I));B=$($(v*I)+$(w*M));g[r>>2]=H;g[r+4>>2]=B;z=$(-H);Q=$(y+$($(v*F)-$(w*C)));P=$(x+$($(w*F)+$(v*C)));F=$(-M);M=$($(C+D)*$(.5));C=$($(Q*B)+$(P*z));P=$(m-$($(Q*H)+$(P*B)));Q=$(-B);g[u>>2]=z;g[u+4>>2]=Q;if((he(t,s,u,P,h)|0)<2){i=j;return}if((he(l,t,r,$(m+$($($(y+$($(v*E)-$(w*D)))*H)+$($(x+$($(w*E)+$(v*D)))*B))),f)|0)<2){i=j;return}w=$(I);Q=$(F);r=b+40|0;g[r>>2]=w;g[r+4>>2]=Q;Q=$(J);w=$(M);r=b+48|0;g[r>>2]=Q;g[r+4>>2]=w;w=$(g[l>>2]);Q=$(B*w);v=$(g[l+4>>2]);r=!($($(Q+$(v*z))-C)<=m);if(e<<24>>24==0){if(r){r=0}else{Q=$(w-o);M=$(v-q);P=$($(n*Q)+$(p*M));Q=$($(n*M)-$(p*Q));P=$(P);Q=$(Q);r=b;g[r>>2]=P;g[r+4>>2]=Q;c[b+16>>2]=c[l+8>>2];r=1}v=$(g[l+12>>2]);Q=$(B*v);w=$(g[l+16>>2]);if($($(Q+$(w*z))-C)<=m){Q=$(v-o);M=$(w-q);P=$($(n*Q)+$(p*M));Q=$($(n*M)-$(p*Q));P=$(P);Q=$(Q);N=b+(r*20|0)|0;g[N>>2]=P;g[N+4>>2]=Q;c[b+(r*20|0)+16>>2]=c[l+20>>2];r=r+1|0}}else{if(r){r=0}else{Q=$(w-o);M=$(v-q);P=$($(n*Q)+$(p*M));Q=$($(n*M)-$(p*Q));P=$(P);Q=$(Q);r=b;g[r>>2]=P;g[r+4>>2]=Q;r=b+16|0;N=c[l+8>>2]|0;c[r>>2]=N;a[r]=N>>>8;a[r+1|0]=N;a[r+2|0]=N>>>24;a[r+3|0]=N>>>16;r=1}v=$(g[l+12>>2]);Q=$(B*v);w=$(g[l+16>>2]);if($($(Q+$(w*z))-C)<=m){Q=$(v-o);M=$(w-q);P=$($(n*Q)+$(p*M));Q=$($(n*M)-$(p*Q));P=$(P);Q=$(Q);N=b+(r*20|0)|0;g[N>>2]=P;g[N+4>>2]=Q;N=b+(r*20|0)+16|0;L=c[l+20>>2]|0;c[N>>2]=L;a[N]=L>>>8;a[N+1|0]=L;a[N+2|0]=L>>>24;a[N+3|0]=L>>>16;r=r+1|0}}c[k>>2]=r;i=j;return}function ee(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var h=0,j=0,k=hb,l=hb,m=hb,n=hb,o=0,p=0,q=0,r=hb,s=hb,t=hb;h=i;j=c[b+148>>2]|0;r=$(g[f+12>>2]);n=$(g[e+12>>2]);s=$(r*n);t=$(g[f+8>>2]);m=$(g[e+16>>2]);s=$(s-$(t*m));s=$($(g[f>>2])+s);m=$($(n*t)+$(r*m));m=$(m+$(g[f+4>>2]));r=$(g[d+12>>2]);t=$(g[b+12>>2]);n=$(r*t);k=$(g[d+8>>2]);l=$(g[b+16>>2]);n=$(n-$(k*l));n=$($(g[d>>2])+n);l=$($(t*k)+$(r*l));n=$(s-n);l=$(m-$(l+$(g[d+4>>2])));m=$($(r*n)+$(k*l));k=$($(r*l)-$(n*k));if((j|0)>0){q=0;p=0;l=$(-3.4028234663852886e+38);while(1){n=$(m*$(g[b+(p<<3)+84>>2]));n=$(n+$(k*$(g[b+(p<<3)+88>>2])));o=n>l;q=o?p:q;p=p+1|0;if((p|0)==(j|0)){break}else{l=o?n:l}}}else{q=0}l=$(fe(b,d,q,e,f));o=((q|0)>0?q:j)+ -1|0;k=$(fe(b,d,o,e,f));p=q+1|0;p=(p|0)<(j|0)?p:0;m=$(fe(b,d,p,e,f));if(k>l&k>m){while(1){p=((o|0)>0?o:j)+ -1|0;l=$(fe(b,d,p,e,f));if(l>k){o=p;k=l}else{break}}c[a>>2]=o;i=h;return $(k)}if(m>l){o=p;k=m}else{t=l;c[a>>2]=q;i=h;return $(t)}while(1){p=o+1|0;p=(p|0)<(j|0)?p:0;l=$(fe(b,d,p,e,f));if(l>k){o=p;k=l}else{break}}c[a>>2]=o;i=h;return $(k)}function fe(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var h=hb,j=hb,k=hb,l=hb,m=hb,n=hb,o=0,p=0,q=hb,r=hb,s=hb,t=hb,u=0,v=0,w=0;o=i;p=c[e+148>>2]|0;if(!((d|0)>-1)){ya(5640,5688,32,5752)}if((c[a+148>>2]|0)<=(d|0)){ya(5640,5688,32,5752)}k=$(g[b+12>>2]);m=$(g[a+(d<<3)+84>>2]);h=$(k*m);l=$(g[b+8>>2]);j=$(g[a+(d<<3)+88>>2]);h=$(h-$(l*j));j=$($(m*l)+$(k*j));m=$(g[f+12>>2]);s=$(m*h);n=$(g[f+8>>2]);s=$(s+$(n*j));q=$($(m*j)-$(h*n));if((p|0)>0){v=0;w=0;r=$(3.4028234663852886e+38);while(1){t=$(s*$(g[e+(v<<3)+20>>2]));t=$(t+$(q*$(g[e+(v<<3)+24>>2])));u=t<r;w=u?v:w;v=v+1|0;if((v|0)==(p|0)){break}else{r=u?t:r}}}else{w=0}q=$(g[a+(d<<3)+20>>2]);r=$(k*q);t=$(g[a+(d<<3)+24>>2]);r=$(r-$(l*t));r=$($(g[b>>2])+r);t=$($(q*l)+$(k*t));t=$(t+$(g[b+4>>2]));l=$(g[e+(w<<3)+20>>2]);q=$(m*l);s=$(g[e+(w<<3)+24>>2]);q=$(q-$(n*s));q=$($(g[f>>2])+q);s=$($(l*n)+$(m*s));t=$($(h*$(q-r))+$(j*$($(s+$(g[f+4>>2]))-t)));i=o;return $(t)}function ge(a,b,d,e,f,h){a=a|0;b=b|0;d=d|0;e=$(e);f=f|0;h=$(h);var j=0,k=0,l=hb,m=0,n=0,o=hb,p=0,q=hb,r=hb,s=0,t=hb,u=hb,v=hb,w=hb,x=0,y=hb;j=i;k=b+60|0;if((c[k>>2]|0)==0){i=j;return}m=c[b+56>>2]|0;if((m|0)==0){g[a>>2]=$(1.0);k=a+4|0;g[k>>2]=$(0.0);u=$(g[d+12>>2]);q=$(g[b+48>>2]);l=$(u*q);t=$(g[d+8>>2]);o=$(g[b+52>>2]);l=$(l-$(t*o));l=$($(g[d>>2])+l);o=$($(q*t)+$(u*o));o=$(o+$(g[d+4>>2]));u=$(g[f+12>>2]);t=$(g[b>>2]);q=$(u*t);v=$(g[f+8>>2]);r=$(g[b+4>>2]);q=$(q-$(v*r));q=$($(g[f>>2])+q);r=$($(t*v)+$(u*r));r=$(r+$(g[f+4>>2]));u=$(l-q);v=$(o-r);if($($(u*u)+$(v*v))>$(1.4210854715202004e-14)){u=$(q-l);t=$(r-o);w=$(u);v=$(t);s=a;g[s>>2]=w;g[s+4>>2]=v;v=$(O($($(u*u)+$(t*t))));if(!(v<$(1.1920928955078125e-7))){w=$($(1.0)/v);u=$(u*w);g[a>>2]=u;t=$(t*w);g[k>>2]=t}}else{u=$(1.0);t=$(0.0)}v=$($($(l+$(u*e))+$(q-$(u*h)))*$(.5));w=$($($(o+$(t*e))+$(r-$(t*h)))*$(.5));v=$(v);w=$(w);s=a+8|0;g[s>>2]=v;g[s+4>>2]=w;i=j;return}else if((m|0)==2){p=f+12|0;u=$(g[p>>2]);l=$(g[b+40>>2]);q=$(u*l);s=f+8|0;w=$(g[s>>2]);r=$(g[b+44>>2]);q=$(q-$(w*r));r=$($(l*w)+$(u*r));u=$(q);w=$(r);n=a;g[n>>2]=u;g[n+4>>2]=w;w=$(g[p>>2]);u=$(g[b+48>>2]);l=$(w*u);v=$(g[s>>2]);o=$(g[b+52>>2]);l=$(l-$(v*o));l=$($(g[f>>2])+l);o=$($(u*v)+$(w*o));o=$(o+$(g[f+4>>2]));if((c[k>>2]|0)>0){n=d+12|0;m=d+8|0;f=d+4|0;p=a+4|0;s=0;do{v=$(g[n>>2]);y=$(g[b+(s*20|0)>>2]);w=$(v*y);t=$(g[m>>2]);u=$(g[b+(s*20|0)+4>>2]);w=$(w-$(t*u));w=$($(g[d>>2])+w);u=$($(y*t)+$(v*u));u=$(u+$(g[f>>2]));v=$(h-$($(q*$(w-l))+$($(u-o)*r)));w=$($($(w-$(q*e))+$(w+$(q*v)))*$(.5));q=$($($(u-$(r*e))+$(u+$(r*v)))*$(.5));r=$(w);q=$(q);x=a+(s<<3)+8|0;g[x>>2]=r;g[x+4>>2]=q;s=s+1|0;q=$(g[a>>2]);r=$(g[p>>2])}while((s|0)<(c[k>>2]|0))}w=$(-q);y=$(-r);w=$(w);y=$(y);x=a;g[x>>2]=w;g[x+4>>2]=y;i=j;return}else if((m|0)==1){s=d+12|0;v=$(g[s>>2]);l=$(g[b+40>>2]);q=$(v*l);x=d+8|0;y=$(g[x>>2]);r=$(g[b+44>>2]);q=$(q-$(y*r));r=$($(l*y)+$(v*r));v=$(q);y=$(r);p=a;g[p>>2]=v;g[p+4>>2]=y;y=$(g[s>>2]);v=$(g[b+48>>2]);l=$(y*v);w=$(g[x>>2]);o=$(g[b+52>>2]);l=$(l-$(w*o));l=$($(g[d>>2])+l);o=$($(v*w)+$(y*o));o=$(o+$(g[d+4>>2]));if((c[k>>2]|0)<=0){i=j;return}d=f+12|0;m=f+8|0;n=f+4|0;p=a+4|0;s=0;while(1){y=$(g[d>>2]);t=$(g[b+(s*20|0)>>2]);w=$(y*t);u=$(g[m>>2]);v=$(g[b+(s*20|0)+4>>2]);w=$(w-$(u*v));w=$($(g[f>>2])+w);v=$($(t*u)+$(y*v));v=$(v+$(g[n>>2]));y=$(e-$($(q*$(w-l))+$($(v-o)*r)));w=$($($(w-$(q*h))+$(w+$(q*y)))*$(.5));y=$($($(v-$(r*h))+$(v+$(r*y)))*$(.5));w=$(w);y=$(y);x=a+(s<<3)+8|0;g[x>>2]=w;g[x+4>>2]=y;s=s+1|0;if((s|0)>=(c[k>>2]|0)){break}q=$(g[a>>2]);r=$(g[p>>2])}i=j;return}else{i=j;return}}function he(b,d,e,f,h){b=b|0;d=d|0;e=e|0;f=$(f);h=h|0;var j=0,k=0,l=hb,m=0,n=0,o=hb,p=hb,q=0,r=hb;j=i;p=$(g[e>>2]);l=$(p*$(g[d>>2]));o=$(g[e+4>>2]);m=d+4|0;l=$($(l+$(o*$(g[m>>2])))-f);e=d+12|0;p=$(p*$(g[e>>2]));k=d+16|0;f=$($(p+$(o*$(g[k>>2])))-f);if(!(l<=$(0.0))){n=0}else{c[b+0>>2]=c[d+0>>2];c[b+4>>2]=c[d+4>>2];c[b+8>>2]=c[d+8>>2];n=1}if(f<=$(0.0)){q=n+1|0;n=b+(n*12|0)|0;c[n+0>>2]=c[e+0>>2];c[n+4>>2]=c[e+4>>2];c[n+8>>2]=c[e+8>>2];n=q}if(!($(l*f)<$(0.0))){q=n;i=j;return q|0}l=$(l/$(l-f));o=$(g[e>>2]);r=$(g[d>>2]);o=$(o-r);f=$(g[k>>2]);p=$(g[m>>2]);o=$(r+$(l*o));p=$(p+$(l*$(f-p)));o=$(o);p=$(p);q=b+(n*12|0)|0;g[q>>2]=o;g[q+4>>2]=p;q=b+(n*12|0)+8|0;a[q]=h;a[q+1|0]=a[d+9|0]|0;a[q+2|0]=0;a[q+3|0]=1;q=n+1|0;i=j;return q|0}function ie(d,e,f,h,j,k){d=d|0;e=e|0;f=f|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0;l=i;i=i+128|0;n=l+36|0;o=l+24|0;m=l;c[n+16>>2]=0;c[n+20>>2]=0;g[n+24>>2]=$(0.0);c[n+44>>2]=0;c[n+48>>2]=0;g[n+52>>2]=$(0.0);Zc(n,d,e);Zc(n+28|0,f,h);d=n+56|0;c[d+0>>2]=c[j+0>>2];c[d+4>>2]=c[j+4>>2];c[d+8>>2]=c[j+8>>2];c[d+12>>2]=c[j+12>>2];d=n+72|0;c[d+0>>2]=c[k+0>>2];c[d+4>>2]=c[k+4>>2];c[d+8>>2]=c[k+8>>2];c[d+12>>2]=c[k+12>>2];a[n+88|0]=1;b[o+4>>1]=0;$c(m,o,n);d=$(g[m+16>>2])<$(11920928955078125.0e-22);i=l;return d|0}function je(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0;g=i;f=fc(f,144)|0;if((f|0)==0){f=0;i=g;return f|0}xd(f,a,b,d,e);c[f>>2]=5784;if((c[(c[(c[f+48>>2]|0)+12>>2]|0)+4>>2]|0)!=3){ya(5800,5848,43,5904)}if((c[(c[(c[f+52>>2]|0)+12>>2]|0)+4>>2]|0)==0){i=g;return f|0}else{ya(5928,5848,44,5904)}return 0}function ke(a,b){a=a|0;b=b|0;var d=0;d=i;kb[c[(c[a>>2]|0)+4>>2]&31](a);gc(b,a,144);i=d;return}function le(a,d,e,f){a=a|0;d=d|0;e=e|0;f=f|0;var h=0,j=0,k=0,l=0;h=i;i=i+48|0;j=h;k=c[(c[a+48>>2]|0)+12>>2]|0;c[j>>2]=240;c[j+4>>2]=1;g[j+8>>2]=$(.009999999776482582);l=j+28|0;c[l+0>>2]=0;c[l+4>>2]=0;c[l+8>>2]=0;c[l+12>>2]=0;b[l+16>>1]=0;He(k,j,c[a+56>>2]|0);$d(d,j,e,c[(c[a+52>>2]|0)+12>>2]|0,f);i=h;return}function me(a){a=a|0;return}function ne(a){a=a|0;var b=0;b=i;_e(a);i=b;return}function oe(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0;g=i;f=fc(f,144)|0;if((f|0)==0){f=0;i=g;return f|0}xd(f,a,b,d,e);c[f>>2]=6032;if((c[(c[(c[f+48>>2]|0)+12>>2]|0)+4>>2]|0)!=3){ya(6048,6096,43,6152)}if((c[(c[(c[f+52>>2]|0)+12>>2]|0)+4>>2]|0)==2){i=g;return f|0}else{ya(6184,6096,44,6152)}return 0}function pe(a,b){a=a|0;b=b|0;var d=0;d=i;kb[c[(c[a>>2]|0)+4>>2]&31](a);gc(b,a,144);i=d;return}function qe(a,d,e,f){a=a|0;d=d|0;e=e|0;f=f|0;var h=0,j=0,k=0,l=0;h=i;i=i+48|0;j=h;k=c[(c[a+48>>2]|0)+12>>2]|0;c[j>>2]=240;c[j+4>>2]=1;g[j+8>>2]=$(.009999999776482582);l=j+28|0;c[l+0>>2]=0;c[l+4>>2]=0;c[l+8>>2]=0;c[l+12>>2]=0;b[l+16>>1]=0;He(k,j,c[a+56>>2]|0);ce(d,j,e,c[(c[a+52>>2]|0)+12>>2]|0,f);i=h;return}function re(a){a=a|0;return}function se(a){a=a|0;var b=0;b=i;_e(a);i=b;return}function te(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;b=i;f=fc(f,144)|0;if((f|0)==0){e=0;i=b;return e|0}xd(f,a,0,d,0);c[f>>2]=6288;if((c[(c[(c[f+48>>2]|0)+12>>2]|0)+4>>2]|0)!=0){ya(6304,6352,44,6400)}if((c[(c[(c[f+52>>2]|0)+12>>2]|0)+4>>2]|0)==0){e=f;i=b;return e|0}else{ya(6416,6352,45,6400)}return 0}function ue(a,b){a=a|0;b=b|0;var d=0;d=i;kb[c[(c[a>>2]|0)+4>>2]&31](a);gc(b,a,144);i=d;return}function ve(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;f=i;Zd(b,c[(c[a+48>>2]|0)+12>>2]|0,d,c[(c[a+52>>2]|0)+12>>2]|0,e);i=f;return}function we(a){a=a|0;return}function xe(a){a=a|0;var b=0;b=i;_e(a);i=b;return}function ye(b,d){b=b|0;d=d|0;var e=0,f=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=hb,t=hb,u=0,v=0,w=0,x=0,y=0,z=0;e=i;c[b+0>>2]=c[d+0>>2];c[b+4>>2]=c[d+4>>2];c[b+8>>2]=c[d+8>>2];c[b+12>>2]=c[d+12>>2];c[b+16>>2]=c[d+16>>2];c[b+20>>2]=c[d+20>>2];r=c[d+40>>2]|0;m=b+32|0;c[m>>2]=r;f=c[d+28>>2]|0;j=b+48|0;c[j>>2]=f;h=b+36|0;c[h>>2]=qd(r,f*88|0)|0;f=b+40|0;c[f>>2]=qd(c[m>>2]|0,(c[j>>2]|0)*152|0)|0;c[b+24>>2]=c[d+32>>2];c[b+28>>2]=c[d+36>>2];m=c[d+24>>2]|0;d=b+44|0;c[d>>2]=m;if((c[j>>2]|0)<=0){i=e;return}k=b+20|0;b=b+8|0;l=0;while(1){n=c[m+(l<<2)>>2]|0;o=c[n+48>>2]|0;p=c[n+52>>2]|0;r=c[o+8>>2]|0;q=c[p+8>>2]|0;m=c[n+124>>2]|0;if((m|0)<=0){f=4;break}s=$(g[(c[p+12>>2]|0)+8>>2]);t=$(g[(c[o+12>>2]|0)+8>>2]);p=c[f>>2]|0;g[p+(l*152|0)+136>>2]=$(g[n+136>>2]);g[p+(l*152|0)+140>>2]=$(g[n+140>>2]);z=r+8|0;c[p+(l*152|0)+112>>2]=c[z>>2];y=q+8|0;c[p+(l*152|0)+116>>2]=c[y>>2];w=r+120|0;g[p+(l*152|0)+120>>2]=$(g[w>>2]);x=q+120|0;g[p+(l*152|0)+124>>2]=$(g[x>>2]);v=r+128|0;g[p+(l*152|0)+128>>2]=$(g[v>>2]);u=q+128|0;g[p+(l*152|0)+132>>2]=$(g[u>>2]);c[p+(l*152|0)+148>>2]=l;c[p+(l*152|0)+144>>2]=m;o=p+(l*152|0)+80|0;c[o+0>>2]=0;c[o+4>>2]=0;c[o+8>>2]=0;c[o+12>>2]=0;c[o+16>>2]=0;c[o+20>>2]=0;c[o+24>>2]=0;c[o+28>>2]=0;o=c[h>>2]|0;c[o+(l*88|0)+32>>2]=c[z>>2];c[o+(l*88|0)+36>>2]=c[y>>2];g[o+(l*88|0)+40>>2]=$(g[w>>2]);g[o+(l*88|0)+44>>2]=$(g[x>>2]);x=r+28|0;r=c[x+4>>2]|0;w=o+(l*88|0)+48|0;c[w>>2]=c[x>>2];c[w+4>>2]=r;w=q+28|0;r=c[w+4>>2]|0;q=o+(l*88|0)+56|0;c[q>>2]=c[w>>2];c[q+4>>2]=r;g[o+(l*88|0)+64>>2]=$(g[v>>2]);g[o+(l*88|0)+68>>2]=$(g[u>>2]);q=n+104|0;r=c[q+4>>2]|0;u=o+(l*88|0)+16|0;c[u>>2]=c[q>>2];c[u+4>>2]=r;u=n+112|0;r=c[u+4>>2]|0;q=o+(l*88|0)+24|0;c[q>>2]=c[u>>2];c[q+4>>2]=r;c[o+(l*88|0)+84>>2]=m;g[o+(l*88|0)+76>>2]=t;g[o+(l*88|0)+80>>2]=s;c[o+(l*88|0)+72>>2]=c[n+120>>2];q=0;do{r=n+(q*20|0)+64|0;if((a[k]|0)==0){g[p+(l*152|0)+(q*36|0)+16>>2]=$(0.0);g[p+(l*152|0)+(q*36|0)+20>>2]=$(0.0)}else{t=$(g[b>>2]);g[p+(l*152|0)+(q*36|0)+16>>2]=$(t*$(g[n+(q*20|0)+72>>2]));t=$(g[b>>2]);g[p+(l*152|0)+(q*36|0)+20>>2]=$(t*$(g[n+(q*20|0)+76>>2]))}x=p+(l*152|0)+(q*36|0)|0;g[p+(l*152|0)+(q*36|0)+24>>2]=$(0.0);g[p+(l*152|0)+(q*36|0)+28>>2]=$(0.0);g[p+(l*152|0)+(q*36|0)+32>>2]=$(0.0);z=o+(l*88|0)+(q<<3)|0;c[x+0>>2]=0;c[x+4>>2]=0;c[x+8>>2]=0;c[x+12>>2]=0;x=r;y=c[x+4>>2]|0;c[z>>2]=c[x>>2];c[z+4>>2]=y;q=q+1|0}while((q|0)!=(m|0));l=l+1|0;if((l|0)>=(c[j>>2]|0)){f=12;break}m=c[d>>2]|0}if((f|0)==4){ya(6504,6520,71,6568)}else if((f|0)==12){i=e;return}}function ze(a){a=a|0;var b=0,d=0;b=i;d=a+32|0;rd(c[d>>2]|0,c[a+40>>2]|0);rd(c[d>>2]|0,c[a+36>>2]|0);i=b;return}function Ae(a){a=a|0;var b=0,d=0,e=0,f=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=hb,u=hb,v=hb,w=hb,x=hb,y=hb,z=hb,A=hb,B=hb,C=hb,D=hb,E=hb,F=hb,G=hb,H=0,I=hb,J=0,K=0,L=0,M=0,N=0,O=hb,P=hb,S=hb,T=hb,U=0,V=hb,W=hb,X=hb,Y=hb,Z=hb,_=hb,aa=0,ba=0;b=i;i=i+64|0;l=b+40|0;e=b+24|0;h=b;f=a+48|0;if((c[f>>2]|0)<=0){i=b;return}m=a+40|0;d=a+36|0;k=a+44|0;j=a+24|0;p=a+28|0;q=l+8|0;o=l+12|0;n=e+8|0;a=e+12|0;s=0;while(1){r=c[m>>2]|0;J=c[d>>2]|0;H=c[(c[k>>2]|0)+(c[r+(s*152|0)+148>>2]<<2)>>2]|0;L=c[r+(s*152|0)+112>>2]|0;U=c[r+(s*152|0)+116>>2]|0;G=$(g[r+(s*152|0)+120>>2]);A=$(g[r+(s*152|0)+124>>2]);t=$(g[r+(s*152|0)+128>>2]);u=$(g[r+(s*152|0)+132>>2]);M=J+(s*88|0)+48|0;P=$(g[M>>2]);S=$(g[M+4>>2]);M=J+(s*88|0)+56|0;T=$(g[M>>2]);V=$(g[M+4>>2]);M=c[j>>2]|0;N=M+(L*12|0)|0;C=$(g[N>>2]);D=$(g[N+4>>2]);I=$(g[M+(L*12|0)+8>>2]);N=c[p>>2]|0;K=N+(L*12|0)|0;y=$(g[K>>2]);B=$(g[K+4>>2]);z=$(g[N+(L*12|0)+8>>2]);L=M+(U*12|0)|0;E=$(g[L>>2]);F=$(g[L+4>>2]);O=$(g[M+(U*12|0)+8>>2]);M=N+(U*12|0)|0;w=$(g[M>>2]);v=$(g[M+4>>2]);x=$(g[N+(U*12|0)+8>>2]);if((c[H+124>>2]|0)<=0){d=4;break}W=$(g[J+(s*88|0)+80>>2]);X=$(g[J+(s*88|0)+76>>2]);Z=$(+R(+I));g[q>>2]=Z;_=$(+Q(+I));g[o>>2]=_;I=$(+R(+O));g[n>>2]=I;O=$(+Q(+O));g[a>>2]=O;Y=$(C-$($(P*_)-$(S*Z)));S=$(D-$($(S*_)+$(P*Z)));P=$(Y);S=$(S);N=l;g[N>>2]=P;g[N+4>>2]=S;S=$(E-$($(T*O)-$(V*I)));V=$(F-$($(V*O)+$(T*I)));T=$(S);V=$(V);N=e;g[N>>2]=T;g[N+4>>2]=V;ge(h,H+64|0,l,X,e,W);N=r+(s*152|0)+72|0;U=h;J=c[U+4>>2]|0;H=N;c[H>>2]=c[U>>2];c[H+4>>2]=J;H=r+(s*152|0)+144|0;J=c[H>>2]|0;do{if((J|0)>0){M=r+(s*152|0)+76|0;I=$(G+A);L=r+(s*152|0)+140|0;K=0;do{aa=h+(K<<3)+8|0;T=$($(g[aa>>2])-C);U=h+(K<<3)+12|0;S=$($(g[U>>2])-D);Z=$(T);S=$(S);ba=r+(s*152|0)+(K*36|0)|0;g[ba>>2]=Z;g[ba+4>>2]=S;S=$($(g[aa>>2])-E);Z=$($(g[U>>2])-F);_=$(S);Z=$(Z);U=r+(s*152|0)+(K*36|0)+8|0;g[U>>2]=_;g[U+4>>2]=Z;Z=$(g[M>>2]);_=$(T*Z);P=$(g[r+(s*152|0)+(K*36|0)+4>>2]);V=$(g[N>>2]);_=$(_-$(P*V));Z=$(Z*S);O=$(g[r+(s*152|0)+(K*36|0)+12>>2]);V=$(Z-$(V*O));V=$($(I+$(_*$(t*_)))+$(V*$(u*V)));if(V>$(0.0)){V=$($(1.0)/V)}else{V=$(0.0)}g[r+(s*152|0)+(K*36|0)+24>>2]=V;V=$(g[M>>2]);Z=$(-$(g[N>>2]));_=$($(T*Z)-$(V*P));V=$($(S*Z)-$(V*O));V=$($(I+$(_*$(t*_)))+$(V*$(u*V)));if(V>$(0.0)){V=$($(1.0)/V)}else{V=$(0.0)}g[r+(s*152|0)+(K*36|0)+28>>2]=V;U=r+(s*152|0)+(K*36|0)+32|0;g[U>>2]=$(0.0);_=$($($(w-$(x*O))-y)+$(z*P));O=$($($(v+$(x*S))-B)-$(z*T));_=$($(g[N>>2])*_);O=$(_+$($(g[M>>2])*O));if(O<$(-1.0)){g[U>>2]=$(-$(O*$(g[L>>2])))}K=K+1|0}while((K|0)!=(J|0));if((c[H>>2]|0)==2){v=$(g[r+(s*152|0)>>2]);X=$(g[r+(s*152|0)+76>>2]);v=$(v*X);W=$(g[r+(s*152|0)+4>>2]);w=$(g[N>>2]);W=$(v-$(W*w));v=$(X*$(g[r+(s*152|0)+8>>2]));v=$(v-$(w*$(g[r+(s*152|0)+12>>2])));Z=$(X*$(g[r+(s*152|0)+36>>2]));Z=$(Z-$(w*$(g[r+(s*152|0)+40>>2])));X=$(X*$(g[r+(s*152|0)+44>>2]));w=$(X-$(w*$(g[r+(s*152|0)+48>>2])));X=$(G+A);Y=$(t*W);_=$(u*v);v=$($(X+$(W*Y))+$(v*_));t=$($(X+$(Z*$(t*Z)))+$(w*$(u*w)));u=$($(X+$(Y*Z))+$(_*w));w=$($(v*t)-$(u*u));if(!($(v*v)<$(w*$(1.0e3)))){c[H>>2]=1;break}g[r+(s*152|0)+96>>2]=v;g[r+(s*152|0)+100>>2]=u;g[r+(s*152|0)+104>>2]=u;g[r+(s*152|0)+108>>2]=t;if(w!=$(0.0)){w=$($(1.0)/w)}Z=$(-$(w*u));_=$(v*w);g[r+(s*152|0)+80>>2]=$(t*w);g[r+(s*152|0)+84>>2]=Z;g[r+(s*152|0)+88>>2]=Z;g[r+(s*152|0)+92>>2]=_}}}while(0);s=s+1|0;if((s|0)>=(c[f>>2]|0)){d=21;break}}if((d|0)==4){ya(6584,6520,168,6616)}else if((d|0)==21){i=b;return}}function Be(a){a=a|0;var b=0,d=0,e=0,f=0,h=0,j=0,k=0,l=0,m=hb,n=hb,o=hb,p=0,q=hb,r=hb,s=hb,t=hb,u=hb,v=hb,w=hb,x=hb,y=0,z=hb,A=0,B=hb,C=hb,D=hb;b=i;d=a+48|0;if((c[d>>2]|0)<=0){i=b;return}e=a+40|0;f=a+28|0;y=c[f>>2]|0;k=0;do{l=c[e>>2]|0;j=c[l+(k*152|0)+112>>2]|0;h=c[l+(k*152|0)+116>>2]|0;m=$(g[l+(k*152|0)+120>>2]);q=$(g[l+(k*152|0)+128>>2]);o=$(g[l+(k*152|0)+124>>2]);n=$(g[l+(k*152|0)+132>>2]);p=c[l+(k*152|0)+144>>2]|0;a=y+(j*12|0)|0;A=a;t=$(g[A>>2]);v=$(g[A+4>>2]);w=$(g[y+(j*12|0)+8>>2]);A=y+(h*12|0)|0;x=$(g[A>>2]);z=$(g[A+4>>2]);u=$(g[y+(h*12|0)+8>>2]);y=l+(k*152|0)+72|0;r=$(g[y>>2]);s=$(g[y+4>>2]);if((p|0)>0){y=0;do{D=$(g[l+(k*152|0)+(y*36|0)+16>>2]);C=$(r*D);D=$(s*D);B=$(g[l+(k*152|0)+(y*36|0)+20>>2]);C=$(C+$(s*B));B=$(D-$(r*B));D=$($(g[l+(k*152|0)+(y*36|0)>>2])*B);w=$(w-$(q*$(D-$($(g[l+(k*152|0)+(y*36|0)+4>>2])*C))));t=$(t-$(m*C));v=$(v-$(m*B));D=$(B*$(g[l+(k*152|0)+(y*36|0)+8>>2]));u=$(u+$(n*$(D-$(C*$(g[l+(k*152|0)+(y*36|0)+12>>2])))));x=$(x+$(o*C));z=$(z+$(o*B));y=y+1|0}while((y|0)!=(p|0))}D=$(t);C=$(v);y=a;g[y>>2]=D;g[y+4>>2]=C;y=c[f>>2]|0;g[y+(j*12|0)+8>>2]=w;C=$(x);D=$(z);y=y+(h*12|0)|0;g[y>>2]=C;g[y+4>>2]=D;y=c[f>>2]|0;g[y+(h*12|0)+8>>2]=u;k=k+1|0}while((k|0)<(c[d>>2]|0));i=b;return}function Ce(a){a=a|0;var b=0,d=0,e=0,f=0,h=0,j=0,k=0,l=hb,m=hb,n=hb,o=hb,p=hb,q=hb,r=hb,s=hb,t=hb,u=hb,v=0,w=hb,x=hb,y=0,z=0,A=0,B=hb,C=hb,D=hb,E=hb,F=hb,G=hb,H=hb,I=hb,J=hb,K=hb,L=hb,M=hb,N=hb,O=hb,P=hb,Q=0,R=hb,S=0,T=hb,U=hb;b=i;d=a+48|0;if((c[d>>2]|0)<=0){i=b;return}e=a+40|0;a=a+28|0;Q=c[a>>2]|0;f=0;a:while(1){v=c[e>>2]|0;y=v+(f*152|0)|0;k=c[v+(f*152|0)+112>>2]|0;h=c[v+(f*152|0)+116>>2]|0;o=$(g[v+(f*152|0)+120>>2]);m=$(g[v+(f*152|0)+128>>2]);n=$(g[v+(f*152|0)+124>>2]);l=$(g[v+(f*152|0)+132>>2]);A=v+(f*152|0)+144|0;z=c[A>>2]|0;j=Q+(k*12|0)|0;S=j;x=$(g[S>>2]);w=$(g[S+4>>2]);t=$(g[Q+(k*12|0)+8>>2]);S=Q+(h*12|0)|0;p=$(g[S>>2]);q=$(g[S+4>>2]);u=$(g[Q+(h*12|0)+8>>2]);S=v+(f*152|0)+72|0;s=$(g[S>>2]);r=$(g[S+4>>2]);C=$(-s);B=$(g[v+(f*152|0)+136>>2]);if((z+ -1|0)>>>0<2){Q=0}else{d=4;break}do{D=$(g[v+(f*152|0)+(Q*36|0)+12>>2]);F=$(u*D);I=$(g[v+(f*152|0)+(Q*36|0)+8>>2]);F=$($(p-F)-x);K=$($(q+$(u*I))-w);G=$(g[v+(f*152|0)+(Q*36|0)+4>>2]);J=$(t*G);H=$(g[v+(f*152|0)+(Q*36|0)>>2]);K=$($(r*$(F+J))+$($(K-$(t*H))*C));K=$($(g[v+(f*152|0)+(Q*36|0)+28>>2])*K);J=$(B*$(g[v+(f*152|0)+(Q*36|0)+16>>2]));S=v+(f*152|0)+(Q*36|0)+20|0;F=$(g[S>>2]);K=$(F-K);E=$(-J);J=K<J?K:J;R=J<E?E:J;P=$(R-F);g[S>>2]=R;R=$(r*P);P=$(P*C);x=$(x-$(o*R));w=$(w-$(o*P));t=$(t-$(m*$($(H*P)-$(G*R))));p=$(p+$(n*R));q=$(q+$(n*P));u=$(u+$(l*$($(I*P)-$(D*R))));Q=Q+1|0}while((Q|0)!=(z|0));do{if((c[A>>2]|0)!=1){z=v+(f*152|0)+16|0;E=$(g[z>>2]);A=v+(f*152|0)+52|0;F=$(g[A>>2]);if(!(E>=$(0.0))|!(F>=$(0.0))){d=9;break a}C=$(g[v+(f*152|0)+12>>2]);J=$(u*C);D=$(g[v+(f*152|0)+8>>2]);J=$($(p-J)-x);T=$($(q+$(u*D))-w);B=$(g[v+(f*152|0)+4>>2]);O=$(t*B);M=$(g[y>>2]);O=$(J+O);T=$(T-$(t*M));J=$(g[v+(f*152|0)+48>>2]);I=$(u*J);K=$(g[v+(f*152|0)+44>>2]);I=$($(p-I)-x);U=$($(q+$(u*K))-w);N=$(g[v+(f*152|0)+40>>2]);G=$(t*N);H=$(g[v+(f*152|0)+36>>2]);T=$($(s*O)+$(r*T));U=$($(s*$(I+G))+$(r*$(U-$(t*H))));T=$(T-$(g[v+(f*152|0)+32>>2]));U=$(U-$(g[v+(f*152|0)+68>>2]));G=$(E*$(g[v+(f*152|0)+96>>2]));I=$(g[v+(f*152|0)+104>>2]);G=$(G+$(F*I));O=$(g[v+(f*152|0)+100>>2]);L=$(E*O);G=$(T-G);L=$(U-$(L+$(F*$(g[v+(f*152|0)+108>>2]))));U=$($(g[v+(f*152|0)+80>>2])*G);U=$(U+$($(g[v+(f*152|0)+88>>2])*L));T=$(G*$(g[v+(f*152|0)+84>>2]));T=$(T+$(L*$(g[v+(f*152|0)+92>>2])));P=$(-U);R=$(-T);if(!(!(U<=$(-0.0))|!(T<=$(-0.0)))){L=$(P-E);T=$(R-F);O=$(s*L);L=$(r*L);U=$(s*T);T=$(r*T);G=$(O+U);I=$(L+T);x=$(x-$(o*G));w=$(w-$(o*I));t=$(t-$(m*$($($(M*L)-$(B*O))+$($(H*T)-$(N*U)))));p=$(p+$(n*G));q=$(q+$(n*I));u=$(u+$(l*$($($(D*L)-$(C*O))+$($(K*T)-$(J*U)))));g[z>>2]=P;g[A>>2]=R;break}U=$(G*$(g[v+(f*152|0)+24>>2]));P=$(-U);if(U<=$(-0.0)?$(L+$(O*P))>=$(0.0):0){O=$(P-E);T=$($(0.0)-F);R=$(s*O);O=$(r*O);U=$(s*T);T=$(r*T);I=$(U+R);L=$(T+O);x=$(x-$(o*I));w=$(w-$(o*L));t=$(t-$(m*$($($(O*M)-$(R*B))+$($(T*H)-$(U*N)))));p=$(p+$(n*I));q=$(q+$(n*L));u=$(u+$(l*$($($(O*D)-$(R*C))+$($(T*K)-$(U*J)))));g[z>>2]=P;g[A>>2]=$(0.0);break}U=$(L*$(g[v+(f*152|0)+60>>2]));O=$(-U);if(U<=$(-0.0)?$(G+$(I*O))>=$(0.0):0){P=$($(0.0)-E);T=$(O-F);R=$(s*P);P=$(r*P);U=$(s*T);T=$(r*T);I=$(R+U);L=$(P+T);x=$(x-$(o*I));w=$(w-$(o*L));t=$(t-$(m*$($($(P*M)-$(R*B))+$($(T*H)-$(U*N)))));p=$(p+$(n*I));q=$(q+$(n*L));u=$(u+$(l*$($($(P*D)-$(R*C))+$($(T*K)-$(U*J)))));g[z>>2]=$(0.0);g[A>>2]=O;break}if(!(!(G>=$(0.0))|!(L>=$(0.0)))){P=$($(0.0)-E);T=$($(0.0)-F);R=$(s*P);P=$(r*P);U=$(s*T);T=$(r*T);L=$(R+U);O=$(P+T);x=$(x-$(o*L));w=$(w-$(o*O));t=$(t-$(m*$($($(P*M)-$(R*B))+$($(T*H)-$(U*N)))));p=$(p+$(n*L));q=$(q+$(n*O));u=$(u+$(l*$($($(P*D)-$(R*C))+$($(T*K)-$(U*J)))));g[z>>2]=$(0.0);g[A>>2]=$(0.0)}}else{C=$(g[v+(f*152|0)+12>>2]);U=$(u*C);B=$(g[v+(f*152|0)+8>>2]);U=$($(p-U)-x);G=$($(q+$(u*B))-w);D=$(g[v+(f*152|0)+4>>2]);F=$(t*D);E=$(g[y>>2]);G=$($(s*$(U+F))+$(r*$(G-$(t*E))));F=$(g[v+(f*152|0)+24>>2]);G=$(F*$(G-$(g[v+(f*152|0)+32>>2])));v=v+(f*152|0)+16|0;F=$(g[v>>2]);G=$(F-G);S=G>$(0.0);U=S?G:$(0.0);T=$(U-F);g[v>>2]=U;U=$(s*T);T=$(r*T);x=$(x-$(o*U));w=$(w-$(o*T));p=$(p+$(n*U));q=$(q+$(n*T));t=$(t-$(m*$($(E*T)-$(D*U))));u=$(u+$(l*$($(B*T)-$(C*U))))}}while(0);U=$(x);T=$(w);Q=j;g[Q>>2]=U;g[Q+4>>2]=T;Q=c[a>>2]|0;g[Q+(k*12|0)+8>>2]=t;T=$(p);U=$(q);Q=Q+(h*12|0)|0;g[Q>>2]=T;g[Q+4>>2]=U;Q=c[a>>2]|0;g[Q+(h*12|0)+8>>2]=u;f=f+1|0;if((f|0)>=(c[d>>2]|0)){d=21;break}}if((d|0)==4){ya(6648,6520,311,6688)}else if((d|0)==9){ya(6720,6520,406,6688)}else if((d|0)==21){i=b;return}}function De(a){a=a|0;var b=0,d=0,e=0,f=0,h=0,j=0,k=0;b=i;d=c[a+48>>2]|0;if((d|0)<=0){i=b;return}e=c[a+40>>2]|0;a=c[a+44>>2]|0;f=0;do{h=c[a+(c[e+(f*152|0)+148>>2]<<2)>>2]|0;j=c[e+(f*152|0)+144>>2]|0;if((j|0)>0){k=0;do{g[h+(k*20|0)+72>>2]=$(g[e+(f*152|0)+(k*36|0)+16>>2]);g[h+(k*20|0)+76>>2]=$(g[e+(f*152|0)+(k*36|0)+20>>2]);k=k+1|0}while((k|0)<(j|0))}f=f+1|0}while((f|0)<(d|0));i=b;return}function Ee(a){a=a|0;var b=0,d=0,e=0,f=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=hb,u=hb,v=hb,w=hb,x=0,y=hb,z=hb,A=hb,B=hb,C=0,D=hb,E=hb,F=hb,G=hb,H=hb,I=hb,J=hb,K=hb,L=0,M=hb,N=hb,O=hb,P=hb,S=hb,T=hb,U=hb,V=hb,W=0,X=hb;b=i;i=i+64|0;f=b+40|0;h=b+24|0;e=b;d=a+48|0;if((c[d>>2]|0)<=0){V=$(0.0);L=V>=$(-.014999999664723873);i=b;return L|0}j=a+36|0;l=a+24|0;p=f+8|0;a=f+12|0;k=h+8|0;o=h+12|0;m=e+8|0;n=e+16|0;L=c[l>>2]|0;r=0;I=$(0.0);do{x=c[j>>2]|0;C=x+(r*88|0)|0;s=c[x+(r*88|0)+32>>2]|0;q=c[x+(r*88|0)+36>>2]|0;W=x+(r*88|0)+48|0;y=$(g[W>>2]);z=$(g[W+4>>2]);B=$(g[x+(r*88|0)+40>>2]);u=$(g[x+(r*88|0)+64>>2]);W=x+(r*88|0)+56|0;A=$(g[W>>2]);v=$(g[W+4>>2]);t=$(g[x+(r*88|0)+44>>2]);w=$(g[x+(r*88|0)+68>>2]);x=c[x+(r*88|0)+84>>2]|0;W=L+(s*12|0)|0;E=$(g[W>>2]);J=$(g[W+4>>2]);F=$(g[L+(s*12|0)+8>>2]);W=L+(q*12|0)|0;G=$(g[W>>2]);K=$(g[W+4>>2]);H=$(g[L+(q*12|0)+8>>2]);if((x|0)>0){D=$(B+t);L=0;do{T=$(+R(+F));g[p>>2]=T;U=$(+Q(+F));g[a>>2]=U;P=$(+R(+H));g[k>>2]=P;O=$(+Q(+H));g[o>>2]=O;S=$(E-$($(y*U)-$(z*T)));T=$(J-$($(z*U)+$(y*T)));S=$(S);T=$(T);W=f;g[W>>2]=S;g[W+4>>2]=T;T=$(G-$($(A*O)-$(v*P)));P=$(K-$($(v*O)+$(A*P)));T=$(T);P=$(P);W=h;g[W>>2]=T;g[W+4>>2]=P;Fe(e,C,f,h,L);W=e;P=$(g[W>>2]);T=$(g[W+4>>2]);W=m;O=$(g[W>>2]);S=$(g[W+4>>2]);U=$(g[n>>2]);M=$(O-E);N=$(S-J);O=$(O-G);S=$(S-K);I=I<U?I:U;U=$($(U+$(.004999999888241291))*$(.20000000298023224));W=U<$(0.0);V=W?U:$(0.0);U=$($(T*M)-$(P*N));X=$($(T*O)-$(P*S));U=$($(X*$(w*X))+$(D+$(U*$(u*U))));if(U>$(0.0)){W=V<$(-.20000000298023224);U=$($(-(W?$(-.20000000298023224):V))/U)}else{U=$(0.0)}X=$(P*U);V=$(T*U);E=$(E-$(B*X));J=$(J-$(B*V));F=$(F-$(u*$($(M*V)-$(N*X))));G=$(G+$(t*X));K=$(K+$(t*V));H=$(H+$(w*$($(O*V)-$(S*X))));L=L+1|0}while((L|0)!=(x|0));L=c[l>>2]|0}X=$(E);V=$(J);L=L+(s*12|0)|0;g[L>>2]=X;g[L+4>>2]=V;L=c[l>>2]|0;g[L+(s*12|0)+8>>2]=F;V=$(G);X=$(K);L=L+(q*12|0)|0;g[L>>2]=V;g[L+4>>2]=X;L=c[l>>2]|0;g[L+(q*12|0)+8>>2]=H;r=r+1|0}while((r|0)<(c[d>>2]|0));W=I>=$(-.014999999664723873);i=b;return W|0}function Fe(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var h=0,j=hb,k=hb,l=hb,m=hb,n=hb,o=hb,p=hb,q=hb,r=0,s=hb,t=0,u=0;h=i;if((c[b+84>>2]|0)<=0){ya(6752,6520,617,6776)}r=c[b+72>>2]|0;if((r|0)==2){t=e+12|0;n=$(g[t>>2]);l=$(g[b+16>>2]);p=$(n*l);r=e+8|0;k=$(g[r>>2]);q=$(g[b+20>>2]);p=$(p-$(k*q));q=$($(l*k)+$(n*q));n=$(p);k=$(q);u=a;g[u>>2]=n;g[u+4>>2]=k;k=$(g[t>>2]);n=$(g[b+24>>2]);l=$(k*n);s=$(g[r>>2]);m=$(g[b+28>>2]);l=$(l-$(s*m));l=$($(g[e>>2])+l);m=$($(n*s)+$(k*m));m=$(m+$(g[e+4>>2]));k=$(g[d+12>>2]);s=$(g[b+(f<<3)>>2]);n=$(k*s);j=$(g[d+8>>2]);o=$(g[b+(f<<3)+4>>2]);n=$(n-$(j*o));n=$($(g[d>>2])+n);o=$($(s*j)+$(k*o));o=$(o+$(g[d+4>>2]));m=$($(p*$(n-l))+$($(o-m)*q));m=$(m-$(g[b+76>>2]));g[a+16>>2]=$(m-$(g[b+80>>2]));n=$(n);o=$(o);f=a+8|0;g[f>>2]=n;g[f+4>>2]=o;p=$(-p);q=$(-q);p=$(p);q=$(q);f=a;g[f>>2]=p;g[f+4>>2]=q;i=h;return}else if((r|0)==1){t=d+12|0;q=$(g[t>>2]);n=$(g[b+16>>2]);m=$(q*n);u=d+8|0;l=$(g[u>>2]);p=$(g[b+20>>2]);m=$(m-$(l*p));p=$($(n*l)+$(q*p));q=$(m);l=$(p);r=a;g[r>>2]=q;g[r+4>>2]=l;l=$(g[t>>2]);q=$(g[b+24>>2]);n=$(l*q);j=$(g[u>>2]);o=$(g[b+28>>2]);n=$(n-$(j*o));n=$($(g[d>>2])+n);o=$($(q*j)+$(l*o));o=$(o+$(g[d+4>>2]));l=$(g[e+12>>2]);j=$(g[b+(f<<3)>>2]);q=$(l*j);k=$(g[e+8>>2]);s=$(g[b+(f<<3)+4>>2]);q=$(q-$(k*s));q=$($(g[e>>2])+q);s=$($(j*k)+$(l*s));s=$(s+$(g[e+4>>2]));p=$($(m*$(q-n))+$($(s-o)*p));p=$(p-$(g[b+76>>2]));g[a+16>>2]=$(p-$(g[b+80>>2]));q=$(q);s=$(s);u=a+8|0;g[u>>2]=q;g[u+4>>2]=s;i=h;return}else if((r|0)==0){m=$(g[d+12>>2]);k=$(g[b+24>>2]);j=$(m*k);s=$(g[d+8>>2]);l=$(g[b+28>>2]);j=$(j-$(s*l));j=$($(g[d>>2])+j);l=$($(k*s)+$(m*l));l=$(l+$(g[d+4>>2]));m=$(g[e+12>>2]);s=$(g[b>>2]);k=$(m*s);n=$(g[e+8>>2]);o=$(g[b+4>>2]);k=$(k-$(n*o));k=$($(g[e>>2])+k);o=$($(s*n)+$(m*o));o=$(o+$(g[e+4>>2]));m=$(k-j);n=$(o-l);s=$(m);p=$(n);u=a;g[u>>2]=s;g[u+4>>2]=p;p=$(O($($(m*m)+$(n*n))));if(p<$(1.1920928955078125e-7)){p=m;q=n}else{q=$($(1.0)/p);p=$(m*q);g[a>>2]=p;q=$(n*q);g[a+4>>2]=q}k=$($(j+k)*$(.5));s=$($(l+o)*$(.5));o=$(k);s=$(s);u=a+8|0;g[u>>2]=o;g[u+4>>2]=s;s=$($(m*p)+$(n*q));s=$(s-$(g[b+76>>2]));g[a+16>>2]=$(s-$(g[b+80>>2]));i=h;return}else{i=h;return}}function Ge(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=hb,y=hb,z=hb,A=hb,B=hb,C=hb,D=hb,E=hb,F=hb,G=hb,H=hb,I=hb,J=hb,K=hb,L=hb,M=hb,N=0,O=hb,P=hb,S=hb,T=hb,U=hb,V=hb,W=hb,X=hb,Y=0,Z=hb;e=i;i=i+64|0;l=e+40|0;f=e+24|0;h=e;j=a+48|0;if((c[j>>2]|0)<=0){X=$(0.0);N=X>=$(-.007499999832361937);i=e;return N|0}k=a+36|0;q=a+24|0;a=l+8|0;r=l+12|0;m=f+8|0;n=f+12|0;o=h+8|0;p=h+16|0;s=0;K=$(0.0);do{N=c[k>>2]|0;v=N+(s*88|0)|0;t=c[N+(s*88|0)+32>>2]|0;u=c[N+(s*88|0)+36>>2]|0;w=N+(s*88|0)+48|0;x=$(g[w>>2]);y=$(g[w+4>>2]);w=N+(s*88|0)+56|0;z=$(g[w>>2]);A=$(g[w+4>>2]);w=c[N+(s*88|0)+84>>2]|0;if((t|0)==(b|0)|(t|0)==(d|0)){D=$(g[N+(s*88|0)+40>>2]);C=$(g[N+(s*88|0)+64>>2])}else{C=$(0.0);D=$(0.0)}B=$(g[N+(s*88|0)+44>>2]);E=$(g[N+(s*88|0)+68>>2]);N=c[q>>2]|0;Y=N+(t*12|0)|0;J=$(g[Y>>2]);L=$(g[Y+4>>2]);F=$(g[N+(t*12|0)+8>>2]);Y=N+(u*12|0)|0;I=$(g[Y>>2]);M=$(g[Y+4>>2]);H=$(g[N+(u*12|0)+8>>2]);if((w|0)>0){G=$(D+B);N=0;do{O=$(+R(+F));g[a>>2]=O;W=$(+Q(+F));g[r>>2]=W;V=$(+R(+H));g[m>>2]=V;T=$(+Q(+H));g[n>>2]=T;S=$(J-$($(x*W)-$(y*O)));O=$(L-$($(y*W)+$(x*O)));S=$(S);O=$(O);Y=l;g[Y>>2]=S;g[Y+4>>2]=O;O=$(I-$($(z*T)-$(A*V)));V=$(M-$($(A*T)+$(z*V)));O=$(O);V=$(V);Y=f;g[Y>>2]=O;g[Y+4>>2]=V;Fe(h,v,l,f,N);Y=h;V=$(g[Y>>2]);O=$(g[Y+4>>2]);Y=o;T=$(g[Y>>2]);S=$(g[Y+4>>2]);W=$(g[p>>2]);P=$(T-J);U=$(S-L);T=$(T-I);S=$(S-M);K=K<W?K:W;W=$($(W+$(.004999999888241291))*$(.75));Y=W<$(0.0);W=Y?W:$(0.0);X=$($(O*P)-$(V*U));Z=$($(O*T)-$(V*S));X=$($(Z*$(E*Z))+$(G+$(X*$(C*X))));if(X>$(0.0)){Y=W<$(-.20000000298023224);W=$($(-(Y?$(-.20000000298023224):W))/X)}else{W=$(0.0)}Z=$(V*W);X=$(O*W);J=$(J-$(D*Z));L=$(L-$(D*X));F=$(F-$(C*$($(P*X)-$(U*Z))));I=$(I+$(B*Z));M=$(M+$(B*X));H=$(H+$(E*$($(T*X)-$(S*Z))));N=N+1|0}while((N|0)!=(w|0));N=c[q>>2]|0}Z=$(J);X=$(L);Y=N+(t*12|0)|0;g[Y>>2]=Z;g[Y+4>>2]=X;Y=c[q>>2]|0;g[Y+(t*12|0)+8>>2]=F;X=$(I);Z=$(M);Y=Y+(u*12|0)|0;g[Y>>2]=X;g[Y+4>>2]=Z;g[(c[q>>2]|0)+(u*12|0)+8>>2]=H;s=s+1|0}while((s|0)<(c[j>>2]|0));Y=K>=$(-.007499999832361937);i=e;return Y|0}function He(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,h=0,j=0,k=0,l=0,m=0,n=0;f=i;if(!((e|0)>-1)){ya(6832,6792,89,6872)}h=b+16|0;if(((c[h>>2]|0)+ -1|0)<=(e|0)){ya(6832,6792,89,6872)}c[d+4>>2]=1;g[d+8>>2]=$(g[b+8>>2]);j=b+12|0;k=(c[j>>2]|0)+(e<<3)|0;l=c[k+4>>2]|0;m=d+12|0;c[m>>2]=c[k>>2];c[m+4>>2]=l;m=(c[j>>2]|0)+(e+1<<3)|0;l=c[m+4>>2]|0;k=d+20|0;c[k>>2]=c[m>>2];c[k+4>>2]=l;k=d+28|0;if((e|0)>0){n=(c[j>>2]|0)+(e+ -1<<3)|0;l=c[n+4>>2]|0;m=k;c[m>>2]=c[n>>2];c[m+4>>2]=l;a[d+44|0]=1}else{l=b+20|0;m=c[l+4>>2]|0;n=k;c[n>>2]=c[l>>2];c[n+4>>2]=m;a[d+44|0]=a[b+36|0]|0}k=d+36|0;if(((c[h>>2]|0)+ -2|0)>(e|0)){l=(c[j>>2]|0)+(e+2<<3)|0;m=c[l+4>>2]|0;n=k;c[n>>2]=c[l>>2];c[n+4>>2]=m;a[d+45|0]=1;i=f;return}else{l=b+28|0;m=c[l+4>>2]|0;n=k;c[n>>2]=c[l>>2];c[n+4>>2]=m;a[d+45|0]=a[b+37|0]|0;i=f;return}}function Ie(a){a=a|0;return}function Je(a){a=a|0;return}function Ke(a){a=a|0;return}function Le(a){a=a|0;return}function Me(a){a=a|0;var b=0;b=i;_e(a);i=b;return}function Ne(a){a=a|0;var b=0;b=i;_e(a);i=b;return}function Oe(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=i;i=i+64|0;f=e;if((a|0)==(b|0)){h=1;i=e;return h|0}if((b|0)==0){h=0;i=e;return h|0}b=Re(b,6952,7008,0)|0;if((b|0)==0){h=0;i=e;return h|0}h=f+0|0;g=h+56|0;do{c[h>>2]=0;h=h+4|0}while((h|0)<(g|0));c[f>>2]=b;c[f+8>>2]=a;c[f+12>>2]=-1;c[f+48>>2]=1;tb[c[(c[b>>2]|0)+28>>2]&15](b,f,c[d>>2]|0,1);if((c[f+24>>2]|0)!=1){h=0;i=e;return h|0}c[d>>2]=c[f+16>>2];h=1;i=e;return h|0}function Pe(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;g=i;if((c[d+8>>2]|0)!=(b|0)){i=g;return}b=d+16|0;h=c[b>>2]|0;if((h|0)==0){c[b>>2]=e;c[d+24>>2]=f;c[d+36>>2]=1;i=g;return}if((h|0)!=(e|0)){h=d+36|0;c[h>>2]=(c[h>>2]|0)+1;c[d+24>>2]=2;a[d+54|0]=1;i=g;return}e=d+24|0;if((c[e>>2]|0)!=2){i=g;return}c[e>>2]=f;i=g;return}function Qe(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;g=i;if((b|0)!=(c[d+8>>2]|0)){h=c[b+8>>2]|0;tb[c[(c[h>>2]|0)+28>>2]&15](h,d,e,f);i=g;return}b=d+16|0;h=c[b>>2]|0;if((h|0)==0){c[b>>2]=e;c[d+24>>2]=f;c[d+36>>2]=1;i=g;return}if((h|0)!=(e|0)){h=d+36|0;c[h>>2]=(c[h>>2]|0)+1;c[d+24>>2]=2;a[d+54|0]=1;i=g;return}e=d+24|0;if((c[e>>2]|0)!=2){i=g;return}c[e>>2]=f;i=g;return}function Re(d,e,f,g){d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;h=i;i=i+64|0;j=h;k=c[d>>2]|0;l=d+(c[k+ -8>>2]|0)|0;k=c[k+ -4>>2]|0;c[j>>2]=f;c[j+4>>2]=d;c[j+8>>2]=e;c[j+12>>2]=g;n=j+16|0;o=j+20|0;e=j+24|0;m=j+28|0;g=j+32|0;d=j+40|0;p=(k|0)==(f|0);q=n+0|0;f=q+36|0;do{c[q>>2]=0;q=q+4|0}while((q|0)<(f|0));b[n+36>>1]=0;a[n+38|0]=0;if(p){c[j+48>>2]=1;qb[c[(c[k>>2]|0)+20>>2]&3](k,j,l,l,1,0);q=(c[e>>2]|0)==1?l:0;i=h;return q|0}jb[c[(c[k>>2]|0)+24>>2]&3](k,j,l,1,0);j=c[j+36>>2]|0;if((j|0)==0){if((c[d>>2]|0)!=1){q=0;i=h;return q|0}if((c[m>>2]|0)!=1){q=0;i=h;return q|0}q=(c[g>>2]|0)==1?c[o>>2]|0:0;i=h;return q|0}else if((j|0)==1){if((c[e>>2]|0)!=1){if((c[d>>2]|0)!=0){q=0;i=h;return q|0}if((c[m>>2]|0)!=1){q=0;i=h;return q|0}if((c[g>>2]|0)!=1){q=0;i=h;return q|0}}q=c[n>>2]|0;i=h;return q|0}else{q=0;i=h;return q|0}return 0}function Se(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0;h=i;if((b|0)==(c[d+8>>2]|0)){if((c[d+4>>2]|0)!=(e|0)){i=h;return}j=d+28|0;if((c[j>>2]|0)==1){i=h;return}c[j>>2]=f;i=h;return}if((b|0)!=(c[d>>2]|0)){l=c[b+8>>2]|0;jb[c[(c[l>>2]|0)+24>>2]&3](l,d,e,f,g);i=h;return}if((c[d+16>>2]|0)!=(e|0)?(k=d+20|0,(c[k>>2]|0)!=(e|0)):0){c[d+32>>2]=f;f=d+44|0;if((c[f>>2]|0)==4){i=h;return}l=d+52|0;a[l]=0;m=d+53|0;a[m]=0;b=c[b+8>>2]|0;qb[c[(c[b>>2]|0)+20>>2]&3](b,d,e,e,1,g);if((a[m]|0)!=0){if((a[l]|0)==0){b=1;j=13}}else{b=0;j=13}do{if((j|0)==13){c[k>>2]=e;m=d+40|0;c[m>>2]=(c[m>>2]|0)+1;if((c[d+36>>2]|0)==1?(c[d+24>>2]|0)==2:0){a[d+54|0]=1;if(b){break}}else{j=16}if((j|0)==16?b:0){break}c[f>>2]=4;i=h;return}}while(0);c[f>>2]=3;i=h;return}if((f|0)!=1){i=h;return}c[d+32>>2]=1;i=h;return}function Te(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0;g=i;if((c[d+8>>2]|0)==(b|0)){if((c[d+4>>2]|0)!=(e|0)){i=g;return}d=d+28|0;if((c[d>>2]|0)==1){i=g;return}c[d>>2]=f;i=g;return}if((c[d>>2]|0)!=(b|0)){i=g;return}if((c[d+16>>2]|0)!=(e|0)?(h=d+20|0,(c[h>>2]|0)!=(e|0)):0){c[d+32>>2]=f;c[h>>2]=e;b=d+40|0;c[b>>2]=(c[b>>2]|0)+1;if((c[d+36>>2]|0)==1?(c[d+24>>2]|0)==2:0){a[d+54|0]=1}c[d+44>>2]=4;i=g;return}if((f|0)!=1){i=g;return}c[d+32>>2]=1;i=g;return}function Ue(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0;j=i;if((b|0)!=(c[d+8>>2]|0)){b=c[b+8>>2]|0;qb[c[(c[b>>2]|0)+20>>2]&3](b,d,e,f,g,h);i=j;return}a[d+53|0]=1;if((c[d+4>>2]|0)!=(f|0)){i=j;return}a[d+52|0]=1;b=d+16|0;f=c[b>>2]|0;if((f|0)==0){c[b>>2]=e;c[d+24>>2]=g;c[d+36>>2]=1;if(!((c[d+48>>2]|0)==1&(g|0)==1)){i=j;return}a[d+54|0]=1;i=j;return}if((f|0)!=(e|0)){h=d+36|0;c[h>>2]=(c[h>>2]|0)+1;a[d+54|0]=1;i=j;return}e=d+24|0;b=c[e>>2]|0;if((b|0)==2){c[e>>2]=g}else{g=b}if(!((c[d+48>>2]|0)==1&(g|0)==1)){i=j;return}a[d+54|0]=1;i=j;return}function Ve(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;h=i;if((c[d+8>>2]|0)!=(b|0)){i=h;return}a[d+53|0]=1;if((c[d+4>>2]|0)!=(f|0)){i=h;return}a[d+52|0]=1;f=d+16|0;b=c[f>>2]|0;if((b|0)==0){c[f>>2]=e;c[d+24>>2]=g;c[d+36>>2]=1;if(!((c[d+48>>2]|0)==1&(g|0)==1)){i=h;return}a[d+54|0]=1;i=h;return}if((b|0)!=(e|0)){b=d+36|0;c[b>>2]=(c[b>>2]|0)+1;a[d+54|0]=1;i=h;return}e=d+24|0;f=c[e>>2]|0;if((f|0)==2){c[e>>2]=g}else{g=f}if(!((c[d+48>>2]|0)==1&(g|0)==1)){i=h;return}a[d+54|0]=1;i=h;return}function We(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0;b=i;do{if(a>>>0<245){if(a>>>0<11){a=16}else{a=a+11&-8}v=a>>>3;r=c[1790]|0;w=r>>>v;if((w&3|0)!=0){j=(w&1^1)+v|0;h=j<<1;f=7200+(h<<2)|0;h=7200+(h+2<<2)|0;d=c[h>>2]|0;e=d+8|0;g=c[e>>2]|0;do{if((f|0)!=(g|0)){if(g>>>0<(c[7176>>2]|0)>>>0){Za()}k=g+12|0;if((c[k>>2]|0)==(d|0)){c[k>>2]=f;c[h>>2]=g;break}else{Za()}}else{c[1790]=r&~(1<<j)}}while(0);H=j<<3;c[d+4>>2]=H|3;H=d+(H|4)|0;c[H>>2]=c[H>>2]|1;H=e;i=b;return H|0}if(a>>>0>(c[7168>>2]|0)>>>0){if((w|0)!=0){f=2<<v;f=w<<v&(f|0-f);f=(f&0-f)+ -1|0;d=f>>>12&16;f=f>>>d;e=f>>>5&8;f=f>>>e;g=f>>>2&4;f=f>>>g;j=f>>>1&2;f=f>>>j;h=f>>>1&1;h=(e|d|g|j|h)+(f>>>h)|0;f=h<<1;j=7200+(f<<2)|0;f=7200+(f+2<<2)|0;g=c[f>>2]|0;d=g+8|0;e=c[d>>2]|0;do{if((j|0)!=(e|0)){if(e>>>0<(c[7176>>2]|0)>>>0){Za()}k=e+12|0;if((c[k>>2]|0)==(g|0)){c[k>>2]=j;c[f>>2]=e;break}else{Za()}}else{c[1790]=r&~(1<<h)}}while(0);h=h<<3;f=h-a|0;c[g+4>>2]=a|3;e=g+a|0;c[g+(a|4)>>2]=f|1;c[g+h>>2]=f;h=c[7168>>2]|0;if((h|0)!=0){g=c[7180>>2]|0;l=h>>>3;j=l<<1;h=7200+(j<<2)|0;k=c[1790]|0;l=1<<l;if((k&l|0)!=0){j=7200+(j+2<<2)|0;k=c[j>>2]|0;if(k>>>0<(c[7176>>2]|0)>>>0){Za()}else{D=j;C=k}}else{c[1790]=k|l;D=7200+(j+2<<2)|0;C=h}c[D>>2]=g;c[C+12>>2]=g;c[g+8>>2]=C;c[g+12>>2]=h}c[7168>>2]=f;c[7180>>2]=e;H=d;i=b;return H|0}r=c[7164>>2]|0;if((r|0)!=0){d=(r&0-r)+ -1|0;G=d>>>12&16;d=d>>>G;F=d>>>5&8;d=d>>>F;H=d>>>2&4;d=d>>>H;h=d>>>1&2;d=d>>>h;e=d>>>1&1;e=c[7464+((F|G|H|h|e)+(d>>>e)<<2)>>2]|0;d=(c[e+4>>2]&-8)-a|0;h=e;while(1){g=c[h+16>>2]|0;if((g|0)==0){g=c[h+20>>2]|0;if((g|0)==0){break}}h=(c[g+4>>2]&-8)-a|0;f=h>>>0<d>>>0;d=f?h:d;h=g;e=f?g:e}h=c[7176>>2]|0;if(e>>>0<h>>>0){Za()}f=e+a|0;if(!(e>>>0<f>>>0)){Za()}g=c[e+24>>2]|0;k=c[e+12>>2]|0;do{if((k|0)==(e|0)){k=e+20|0;j=c[k>>2]|0;if((j|0)==0){k=e+16|0;j=c[k>>2]|0;if((j|0)==0){B=0;break}}while(1){l=j+20|0;m=c[l>>2]|0;if((m|0)!=0){j=m;k=l;continue}l=j+16|0;m=c[l>>2]|0;if((m|0)==0){break}else{j=m;k=l}}if(k>>>0<h>>>0){Za()}else{c[k>>2]=0;B=j;break}}else{j=c[e+8>>2]|0;if(j>>>0<h>>>0){Za()}h=j+12|0;if((c[h>>2]|0)!=(e|0)){Za()}l=k+8|0;if((c[l>>2]|0)==(e|0)){c[h>>2]=k;c[l>>2]=j;B=k;break}else{Za()}}}while(0);do{if((g|0)!=0){j=c[e+28>>2]|0;h=7464+(j<<2)|0;if((e|0)==(c[h>>2]|0)){c[h>>2]=B;if((B|0)==0){c[7164>>2]=c[7164>>2]&~(1<<j);break}}else{if(g>>>0<(c[7176>>2]|0)>>>0){Za()}h=g+16|0;if((c[h>>2]|0)==(e|0)){c[h>>2]=B}else{c[g+20>>2]=B}if((B|0)==0){break}}if(B>>>0<(c[7176>>2]|0)>>>0){Za()}c[B+24>>2]=g;g=c[e+16>>2]|0;do{if((g|0)!=0){if(g>>>0<(c[7176>>2]|0)>>>0){Za()}else{c[B+16>>2]=g;c[g+24>>2]=B;break}}}while(0);g=c[e+20>>2]|0;if((g|0)!=0){if(g>>>0<(c[7176>>2]|0)>>>0){Za()}else{c[B+20>>2]=g;c[g+24>>2]=B;break}}}}while(0);if(d>>>0<16){H=d+a|0;c[e+4>>2]=H|3;H=e+(H+4)|0;c[H>>2]=c[H>>2]|1}else{c[e+4>>2]=a|3;c[e+(a|4)>>2]=d|1;c[e+(d+a)>>2]=d;h=c[7168>>2]|0;if((h|0)!=0){g=c[7180>>2]|0;j=h>>>3;k=j<<1;h=7200+(k<<2)|0;l=c[1790]|0;j=1<<j;if((l&j|0)!=0){k=7200+(k+2<<2)|0;j=c[k>>2]|0;if(j>>>0<(c[7176>>2]|0)>>>0){Za()}else{z=k;A=j}}else{c[1790]=l|j;z=7200+(k+2<<2)|0;A=h}c[z>>2]=g;c[A+12>>2]=g;c[g+8>>2]=A;c[g+12>>2]=h}c[7168>>2]=d;c[7180>>2]=f}H=e+8|0;i=b;return H|0}}}else{if(!(a>>>0>4294967231)){z=a+11|0;a=z&-8;B=c[7164>>2]|0;if((B|0)!=0){A=0-a|0;z=z>>>8;if((z|0)!=0){if(a>>>0>16777215){C=31}else{G=(z+1048320|0)>>>16&8;H=z<<G;F=(H+520192|0)>>>16&4;H=H<<F;C=(H+245760|0)>>>16&2;C=14-(F|G|C)+(H<<C>>>15)|0;C=a>>>(C+7|0)&1|C<<1}}else{C=0}F=c[7464+(C<<2)>>2]|0;a:do{if((F|0)==0){D=0;z=0}else{if((C|0)==31){z=0}else{z=25-(C>>>1)|0}D=0;E=a<<z;z=0;while(1){H=c[F+4>>2]&-8;G=H-a|0;if(G>>>0<A>>>0){if((H|0)==(a|0)){A=G;D=F;z=F;break a}else{A=G;z=F}}G=c[F+20>>2]|0;F=c[F+(E>>>31<<2)+16>>2]|0;D=(G|0)==0|(G|0)==(F|0)?D:G;if((F|0)==0){break}else{E=E<<1}}}}while(0);if((D|0)==0&(z|0)==0){H=2<<C;B=B&(H|0-H);if((B|0)==0){break}H=(B&0-B)+ -1|0;E=H>>>12&16;H=H>>>E;C=H>>>5&8;H=H>>>C;F=H>>>2&4;H=H>>>F;G=H>>>1&2;H=H>>>G;D=H>>>1&1;D=c[7464+((C|E|F|G|D)+(H>>>D)<<2)>>2]|0}if((D|0)!=0){while(1){C=(c[D+4>>2]&-8)-a|0;B=C>>>0<A>>>0;A=B?C:A;z=B?D:z;B=c[D+16>>2]|0;if((B|0)!=0){D=B;continue}D=c[D+20>>2]|0;if((D|0)==0){break}}}if((z|0)!=0?A>>>0<((c[7168>>2]|0)-a|0)>>>0:0){f=c[7176>>2]|0;if(z>>>0<f>>>0){Za()}d=z+a|0;if(!(z>>>0<d>>>0)){Za()}e=c[z+24>>2]|0;g=c[z+12>>2]|0;do{if((g|0)==(z|0)){h=z+20|0;g=c[h>>2]|0;if((g|0)==0){h=z+16|0;g=c[h>>2]|0;if((g|0)==0){x=0;break}}while(1){j=g+20|0;k=c[j>>2]|0;if((k|0)!=0){g=k;h=j;continue}j=g+16|0;k=c[j>>2]|0;if((k|0)==0){break}else{g=k;h=j}}if(h>>>0<f>>>0){Za()}else{c[h>>2]=0;x=g;break}}else{h=c[z+8>>2]|0;if(h>>>0<f>>>0){Za()}j=h+12|0;if((c[j>>2]|0)!=(z|0)){Za()}f=g+8|0;if((c[f>>2]|0)==(z|0)){c[j>>2]=g;c[f>>2]=h;x=g;break}else{Za()}}}while(0);do{if((e|0)!=0){g=c[z+28>>2]|0;f=7464+(g<<2)|0;if((z|0)==(c[f>>2]|0)){c[f>>2]=x;if((x|0)==0){c[7164>>2]=c[7164>>2]&~(1<<g);break}}else{if(e>>>0<(c[7176>>2]|0)>>>0){Za()}f=e+16|0;if((c[f>>2]|0)==(z|0)){c[f>>2]=x}else{c[e+20>>2]=x}if((x|0)==0){break}}if(x>>>0<(c[7176>>2]|0)>>>0){Za()}c[x+24>>2]=e;e=c[z+16>>2]|0;do{if((e|0)!=0){if(e>>>0<(c[7176>>2]|0)>>>0){Za()}else{c[x+16>>2]=e;c[e+24>>2]=x;break}}}while(0);e=c[z+20>>2]|0;if((e|0)!=0){if(e>>>0<(c[7176>>2]|0)>>>0){Za()}else{c[x+20>>2]=e;c[e+24>>2]=x;break}}}}while(0);b:do{if(!(A>>>0<16)){c[z+4>>2]=a|3;c[z+(a|4)>>2]=A|1;c[z+(A+a)>>2]=A;f=A>>>3;if(A>>>0<256){g=f<<1;e=7200+(g<<2)|0;h=c[1790]|0;f=1<<f;if((h&f|0)!=0){f=7200+(g+2<<2)|0;g=c[f>>2]|0;if(g>>>0<(c[7176>>2]|0)>>>0){Za()}else{w=f;v=g}}else{c[1790]=h|f;w=7200+(g+2<<2)|0;v=e}c[w>>2]=d;c[v+12>>2]=d;c[z+(a+8)>>2]=v;c[z+(a+12)>>2]=e;break}e=A>>>8;if((e|0)!=0){if(A>>>0>16777215){e=31}else{G=(e+1048320|0)>>>16&8;H=e<<G;F=(H+520192|0)>>>16&4;H=H<<F;e=(H+245760|0)>>>16&2;e=14-(F|G|e)+(H<<e>>>15)|0;e=A>>>(e+7|0)&1|e<<1}}else{e=0}f=7464+(e<<2)|0;c[z+(a+28)>>2]=e;c[z+(a+20)>>2]=0;c[z+(a+16)>>2]=0;h=c[7164>>2]|0;g=1<<e;if((h&g|0)==0){c[7164>>2]=h|g;c[f>>2]=d;c[z+(a+24)>>2]=f;c[z+(a+12)>>2]=d;c[z+(a+8)>>2]=d;break}f=c[f>>2]|0;if((e|0)==31){e=0}else{e=25-(e>>>1)|0}c:do{if((c[f+4>>2]&-8|0)!=(A|0)){e=A<<e;g=f;while(1){h=g+(e>>>31<<2)+16|0;f=c[h>>2]|0;if((f|0)==0){break}if((c[f+4>>2]&-8|0)==(A|0)){r=f;break c}else{e=e<<1;g=f}}if(h>>>0<(c[7176>>2]|0)>>>0){Za()}else{c[h>>2]=d;c[z+(a+24)>>2]=g;c[z+(a+12)>>2]=d;c[z+(a+8)>>2]=d;break b}}else{r=f}}while(0);f=r+8|0;e=c[f>>2]|0;g=c[7176>>2]|0;if(r>>>0<g>>>0){Za()}if(e>>>0<g>>>0){Za()}else{c[e+12>>2]=d;c[f>>2]=d;c[z+(a+8)>>2]=e;c[z+(a+12)>>2]=r;c[z+(a+24)>>2]=0;break}}else{H=A+a|0;c[z+4>>2]=H|3;H=z+(H+4)|0;c[H>>2]=c[H>>2]|1}}while(0);H=z+8|0;i=b;return H|0}}}else{a=-1}}}while(0);r=c[7168>>2]|0;if(!(a>>>0>r>>>0)){e=r-a|0;d=c[7180>>2]|0;if(e>>>0>15){c[7180>>2]=d+a;c[7168>>2]=e;c[d+(a+4)>>2]=e|1;c[d+r>>2]=e;c[d+4>>2]=a|3}else{c[7168>>2]=0;c[7180>>2]=0;c[d+4>>2]=r|3;H=d+(r+4)|0;c[H>>2]=c[H>>2]|1}H=d+8|0;i=b;return H|0}r=c[7172>>2]|0;if(a>>>0<r>>>0){G=r-a|0;c[7172>>2]=G;H=c[7184>>2]|0;c[7184>>2]=H+a;c[H+(a+4)>>2]=G|1;c[H+4>>2]=a|3;H=H+8|0;i=b;return H|0}do{if((c[1908]|0)==0){r=Ka(30)|0;if((r+ -1&r|0)==0){c[7640>>2]=r;c[7636>>2]=r;c[7644>>2]=-1;c[7648>>2]=-1;c[7652>>2]=0;c[7604>>2]=0;c[1908]=($a(0)|0)&-16^1431655768;break}else{Za()}}}while(0);w=a+48|0;A=c[7640>>2]|0;x=a+47|0;z=A+x|0;A=0-A|0;v=z&A;if(!(v>>>0>a>>>0)){H=0;i=b;return H|0}r=c[7600>>2]|0;if((r|0)!=0?(G=c[7592>>2]|0,H=G+v|0,H>>>0<=G>>>0|H>>>0>r>>>0):0){H=0;i=b;return H|0}d:do{if((c[7604>>2]&4|0)==0){B=c[7184>>2]|0;e:do{if((B|0)!=0){r=7608|0;while(1){C=c[r>>2]|0;if(!(C>>>0>B>>>0)?(y=r+4|0,(C+(c[y>>2]|0)|0)>>>0>B>>>0):0){break}r=c[r+8>>2]|0;if((r|0)==0){o=182;break e}}if((r|0)!=0){A=z-(c[7172>>2]|0)&A;if(A>>>0<2147483647){o=Ea(A|0)|0;B=(o|0)==((c[r>>2]|0)+(c[y>>2]|0)|0);y=o;z=A;r=B?o:-1;A=B?A:0;o=191}else{A=0}}else{o=182}}else{o=182}}while(0);do{if((o|0)==182){r=Ea(0)|0;if((r|0)!=(-1|0)){A=r;y=c[7636>>2]|0;z=y+ -1|0;if((z&A|0)==0){A=v}else{A=v-A+(z+A&0-y)|0}B=c[7592>>2]|0;z=B+A|0;if(A>>>0>a>>>0&A>>>0<2147483647){y=c[7600>>2]|0;if((y|0)!=0?z>>>0<=B>>>0|z>>>0>y>>>0:0){A=0;break}y=Ea(A|0)|0;o=(y|0)==(r|0);z=A;r=o?r:-1;A=o?A:0;o=191}else{A=0}}else{A=0}}}while(0);f:do{if((o|0)==191){o=0-z|0;if((r|0)!=(-1|0)){p=A;o=202;break d}do{if((y|0)!=(-1|0)&z>>>0<2147483647&z>>>0<w>>>0?(u=c[7640>>2]|0,u=x-z+u&0-u,u>>>0<2147483647):0){if((Ea(u|0)|0)==(-1|0)){Ea(o|0)|0;break f}else{z=u+z|0;break}}}while(0);if((y|0)!=(-1|0)){r=y;p=z;o=202;break d}}}while(0);c[7604>>2]=c[7604>>2]|4;o=199}else{A=0;o=199}}while(0);if((((o|0)==199?v>>>0<2147483647:0)?(s=Ea(v|0)|0,t=Ea(0)|0,(t|0)!=(-1|0)&(s|0)!=(-1|0)&s>>>0<t>>>0):0)?(p=t-s|0,q=p>>>0>(a+40|0)>>>0,q):0){r=s;p=q?p:A;o=202}if((o|0)==202){q=(c[7592>>2]|0)+p|0;c[7592>>2]=q;if(q>>>0>(c[7596>>2]|0)>>>0){c[7596>>2]=q}q=c[7184>>2]|0;g:do{if((q|0)!=0){v=7608|0;while(1){w=c[v>>2]|0;t=v+4|0;u=c[t>>2]|0;if((r|0)==(w+u|0)){o=214;break}s=c[v+8>>2]|0;if((s|0)==0){break}else{v=s}}if(((o|0)==214?(c[v+12>>2]&8|0)==0:0)?q>>>0>=w>>>0&q>>>0<r>>>0:0){c[t>>2]=u+p;d=(c[7172>>2]|0)+p|0;e=q+8|0;if((e&7|0)==0){e=0}else{e=0-e&7}H=d-e|0;c[7184>>2]=q+e;c[7172>>2]=H;c[q+(e+4)>>2]=H|1;c[q+(d+4)>>2]=40;c[7188>>2]=c[7648>>2];break}if(r>>>0<(c[7176>>2]|0)>>>0){c[7176>>2]=r}t=r+p|0;s=7608|0;while(1){if((c[s>>2]|0)==(t|0)){o=224;break}u=c[s+8>>2]|0;if((u|0)==0){break}else{s=u}}if((o|0)==224?(c[s+12>>2]&8|0)==0:0){c[s>>2]=r;h=s+4|0;c[h>>2]=(c[h>>2]|0)+p;h=r+8|0;if((h&7|0)==0){h=0}else{h=0-h&7}j=r+(p+8)|0;if((j&7|0)==0){n=0}else{n=0-j&7}o=r+(n+p)|0;j=h+a|0;k=r+j|0;m=o-(r+h)-a|0;c[r+(h+4)>>2]=a|3;h:do{if((o|0)!=(c[7184>>2]|0)){if((o|0)==(c[7180>>2]|0)){H=(c[7168>>2]|0)+m|0;c[7168>>2]=H;c[7180>>2]=k;c[r+(j+4)>>2]=H|1;c[r+(H+j)>>2]=H;break}q=p+4|0;t=c[r+(q+n)>>2]|0;if((t&3|0)==1){a=t&-8;s=t>>>3;do{if(!(t>>>0<256)){l=c[r+((n|24)+p)>>2]|0;v=c[r+(p+12+n)>>2]|0;do{if((v|0)==(o|0)){u=n|16;t=r+(q+u)|0;s=c[t>>2]|0;if((s|0)==0){t=r+(u+p)|0;s=c[t>>2]|0;if((s|0)==0){g=0;break}}while(1){v=s+20|0;u=c[v>>2]|0;if((u|0)!=0){s=u;t=v;continue}v=s+16|0;u=c[v>>2]|0;if((u|0)==0){break}else{s=u;t=v}}if(t>>>0<(c[7176>>2]|0)>>>0){Za()}else{c[t>>2]=0;g=s;break}}else{s=c[r+((n|8)+p)>>2]|0;if(s>>>0<(c[7176>>2]|0)>>>0){Za()}t=s+12|0;if((c[t>>2]|0)!=(o|0)){Za()}u=v+8|0;if((c[u>>2]|0)==(o|0)){c[t>>2]=v;c[u>>2]=s;g=v;break}else{Za()}}}while(0);if((l|0)!=0){s=c[r+(p+28+n)>>2]|0;t=7464+(s<<2)|0;if((o|0)==(c[t>>2]|0)){c[t>>2]=g;if((g|0)==0){c[7164>>2]=c[7164>>2]&~(1<<s);break}}else{if(l>>>0<(c[7176>>2]|0)>>>0){Za()}s=l+16|0;if((c[s>>2]|0)==(o|0)){c[s>>2]=g}else{c[l+20>>2]=g}if((g|0)==0){break}}if(g>>>0<(c[7176>>2]|0)>>>0){Za()}c[g+24>>2]=l;l=n|16;o=c[r+(l+p)>>2]|0;do{if((o|0)!=0){if(o>>>0<(c[7176>>2]|0)>>>0){Za()}else{c[g+16>>2]=o;c[o+24>>2]=g;break}}}while(0);l=c[r+(q+l)>>2]|0;if((l|0)!=0){if(l>>>0<(c[7176>>2]|0)>>>0){Za()}else{c[g+20>>2]=l;c[l+24>>2]=g;break}}}}else{q=c[r+((n|8)+p)>>2]|0;g=c[r+(p+12+n)>>2]|0;t=7200+(s<<1<<2)|0;if((q|0)!=(t|0)){if(q>>>0<(c[7176>>2]|0)>>>0){Za()}if((c[q+12>>2]|0)!=(o|0)){Za()}}if((g|0)==(q|0)){c[1790]=c[1790]&~(1<<s);break}if((g|0)!=(t|0)){if(g>>>0<(c[7176>>2]|0)>>>0){Za()}s=g+8|0;if((c[s>>2]|0)==(o|0)){l=s}else{Za()}}else{l=g+8|0}c[q+12>>2]=g;c[l>>2]=q}}while(0);o=r+((a|n)+p)|0;m=a+m|0}g=o+4|0;c[g>>2]=c[g>>2]&-2;c[r+(j+4)>>2]=m|1;c[r+(m+j)>>2]=m;g=m>>>3;if(m>>>0<256){l=g<<1;d=7200+(l<<2)|0;m=c[1790]|0;g=1<<g;if((m&g|0)!=0){l=7200+(l+2<<2)|0;g=c[l>>2]|0;if(g>>>0<(c[7176>>2]|0)>>>0){Za()}else{f=l;e=g}}else{c[1790]=m|g;f=7200+(l+2<<2)|0;e=d}c[f>>2]=k;c[e+12>>2]=k;c[r+(j+8)>>2]=e;c[r+(j+12)>>2]=d;break}e=m>>>8;if((e|0)!=0){if(m>>>0>16777215){e=31}else{G=(e+1048320|0)>>>16&8;H=e<<G;F=(H+520192|0)>>>16&4;H=H<<F;e=(H+245760|0)>>>16&2;e=14-(F|G|e)+(H<<e>>>15)|0;e=m>>>(e+7|0)&1|e<<1}}else{e=0}f=7464+(e<<2)|0;c[r+(j+28)>>2]=e;c[r+(j+20)>>2]=0;c[r+(j+16)>>2]=0;l=c[7164>>2]|0;g=1<<e;if((l&g|0)==0){c[7164>>2]=l|g;c[f>>2]=k;c[r+(j+24)>>2]=f;c[r+(j+12)>>2]=k;c[r+(j+8)>>2]=k;break}f=c[f>>2]|0;if((e|0)==31){e=0}else{e=25-(e>>>1)|0}i:do{if((c[f+4>>2]&-8|0)!=(m|0)){e=m<<e;while(1){g=f+(e>>>31<<2)+16|0;l=c[g>>2]|0;if((l|0)==0){break}if((c[l+4>>2]&-8|0)==(m|0)){d=l;break i}else{e=e<<1;f=l}}if(g>>>0<(c[7176>>2]|0)>>>0){Za()}else{c[g>>2]=k;c[r+(j+24)>>2]=f;c[r+(j+12)>>2]=k;c[r+(j+8)>>2]=k;break h}}else{d=f}}while(0);f=d+8|0;e=c[f>>2]|0;g=c[7176>>2]|0;if(d>>>0<g>>>0){Za()}if(e>>>0<g>>>0){Za()}else{c[e+12>>2]=k;c[f>>2]=k;c[r+(j+8)>>2]=e;c[r+(j+12)>>2]=d;c[r+(j+24)>>2]=0;break}}else{H=(c[7172>>2]|0)+m|0;c[7172>>2]=H;c[7184>>2]=k;c[r+(j+4)>>2]=H|1}}while(0);H=r+(h|8)|0;i=b;return H|0}e=7608|0;while(1){d=c[e>>2]|0;if(!(d>>>0>q>>>0)?(n=c[e+4>>2]|0,m=d+n|0,m>>>0>q>>>0):0){break}e=c[e+8>>2]|0}e=d+(n+ -39)|0;if((e&7|0)==0){e=0}else{e=0-e&7}d=d+(n+ -47+e)|0;d=d>>>0<(q+16|0)>>>0?q:d;e=d+8|0;f=r+8|0;if((f&7|0)==0){f=0}else{f=0-f&7}H=p+ -40-f|0;c[7184>>2]=r+f;c[7172>>2]=H;c[r+(f+4)>>2]=H|1;c[r+(p+ -36)>>2]=40;c[7188>>2]=c[7648>>2];c[d+4>>2]=27;c[e+0>>2]=c[7608>>2];c[e+4>>2]=c[7612>>2];c[e+8>>2]=c[7616>>2];c[e+12>>2]=c[7620>>2];c[7608>>2]=r;c[7612>>2]=p;c[7620>>2]=0;c[7616>>2]=e;e=d+28|0;c[e>>2]=7;if((d+32|0)>>>0<m>>>0){do{H=e;e=e+4|0;c[e>>2]=7}while((H+8|0)>>>0<m>>>0)}if((d|0)!=(q|0)){d=d-q|0;e=q+(d+4)|0;c[e>>2]=c[e>>2]&-2;c[q+4>>2]=d|1;c[q+d>>2]=d;e=d>>>3;if(d>>>0<256){f=e<<1;d=7200+(f<<2)|0;g=c[1790]|0;e=1<<e;if((g&e|0)!=0){f=7200+(f+2<<2)|0;e=c[f>>2]|0;if(e>>>0<(c[7176>>2]|0)>>>0){Za()}else{k=f;j=e}}else{c[1790]=g|e;k=7200+(f+2<<2)|0;j=d}c[k>>2]=q;c[j+12>>2]=q;c[q+8>>2]=j;c[q+12>>2]=d;break}e=d>>>8;if((e|0)!=0){if(d>>>0>16777215){e=31}else{G=(e+1048320|0)>>>16&8;H=e<<G;F=(H+520192|0)>>>16&4;H=H<<F;e=(H+245760|0)>>>16&2;e=14-(F|G|e)+(H<<e>>>15)|0;e=d>>>(e+7|0)&1|e<<1}}else{e=0}j=7464+(e<<2)|0;c[q+28>>2]=e;c[q+20>>2]=0;c[q+16>>2]=0;f=c[7164>>2]|0;g=1<<e;if((f&g|0)==0){c[7164>>2]=f|g;c[j>>2]=q;c[q+24>>2]=j;c[q+12>>2]=q;c[q+8>>2]=q;break}f=c[j>>2]|0;if((e|0)==31){e=0}else{e=25-(e>>>1)|0}j:do{if((c[f+4>>2]&-8|0)!=(d|0)){e=d<<e;while(1){j=f+(e>>>31<<2)+16|0;g=c[j>>2]|0;if((g|0)==0){break}if((c[g+4>>2]&-8|0)==(d|0)){h=g;break j}else{e=e<<1;f=g}}if(j>>>0<(c[7176>>2]|0)>>>0){Za()}else{c[j>>2]=q;c[q+24>>2]=f;c[q+12>>2]=q;c[q+8>>2]=q;break g}}else{h=f}}while(0);f=h+8|0;e=c[f>>2]|0;d=c[7176>>2]|0;if(h>>>0<d>>>0){Za()}if(e>>>0<d>>>0){Za()}else{c[e+12>>2]=q;c[f>>2]=q;c[q+8>>2]=e;c[q+12>>2]=h;c[q+24>>2]=0;break}}}else{H=c[7176>>2]|0;if((H|0)==0|r>>>0<H>>>0){c[7176>>2]=r}c[7608>>2]=r;c[7612>>2]=p;c[7620>>2]=0;c[7196>>2]=c[1908];c[7192>>2]=-1;d=0;do{H=d<<1;G=7200+(H<<2)|0;c[7200+(H+3<<2)>>2]=G;c[7200+(H+2<<2)>>2]=G;d=d+1|0}while((d|0)!=32);d=r+8|0;if((d&7|0)==0){d=0}else{d=0-d&7}H=p+ -40-d|0;c[7184>>2]=r+d;c[7172>>2]=H;c[r+(d+4)>>2]=H|1;c[r+(p+ -36)>>2]=40;c[7188>>2]=c[7648>>2]}}while(0);d=c[7172>>2]|0;if(d>>>0>a>>>0){G=d-a|0;c[7172>>2]=G;H=c[7184>>2]|0;c[7184>>2]=H+a;c[H+(a+4)>>2]=G|1;c[H+4>>2]=a|3;H=H+8|0;i=b;return H|0}}c[(Ta()|0)>>2]=12;H=0;i=b;return H|0}function Xe(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;b=i;if((a|0)==0){i=b;return}q=a+ -8|0;r=c[7176>>2]|0;if(q>>>0<r>>>0){Za()}o=c[a+ -4>>2]|0;n=o&3;if((n|0)==1){Za()}j=o&-8;h=a+(j+ -8)|0;do{if((o&1|0)==0){u=c[q>>2]|0;if((n|0)==0){i=b;return}q=-8-u|0;o=a+q|0;n=u+j|0;if(o>>>0<r>>>0){Za()}if((o|0)==(c[7180>>2]|0)){d=a+(j+ -4)|0;if((c[d>>2]&3|0)!=3){d=o;m=n;break}c[7168>>2]=n;c[d>>2]=c[d>>2]&-2;c[a+(q+4)>>2]=n|1;c[h>>2]=n;i=b;return}t=u>>>3;if(u>>>0<256){d=c[a+(q+8)>>2]|0;m=c[a+(q+12)>>2]|0;p=7200+(t<<1<<2)|0;if((d|0)!=(p|0)){if(d>>>0<r>>>0){Za()}if((c[d+12>>2]|0)!=(o|0)){Za()}}if((m|0)==(d|0)){c[1790]=c[1790]&~(1<<t);d=o;m=n;break}if((m|0)!=(p|0)){if(m>>>0<r>>>0){Za()}p=m+8|0;if((c[p>>2]|0)==(o|0)){s=p}else{Za()}}else{s=m+8|0}c[d+12>>2]=m;c[s>>2]=d;d=o;m=n;break}s=c[a+(q+24)>>2]|0;t=c[a+(q+12)>>2]|0;do{if((t|0)==(o|0)){u=a+(q+20)|0;t=c[u>>2]|0;if((t|0)==0){u=a+(q+16)|0;t=c[u>>2]|0;if((t|0)==0){p=0;break}}while(1){w=t+20|0;v=c[w>>2]|0;if((v|0)!=0){t=v;u=w;continue}v=t+16|0;w=c[v>>2]|0;if((w|0)==0){break}else{t=w;u=v}}if(u>>>0<r>>>0){Za()}else{c[u>>2]=0;p=t;break}}else{u=c[a+(q+8)>>2]|0;if(u>>>0<r>>>0){Za()}r=u+12|0;if((c[r>>2]|0)!=(o|0)){Za()}v=t+8|0;if((c[v>>2]|0)==(o|0)){c[r>>2]=t;c[v>>2]=u;p=t;break}else{Za()}}}while(0);if((s|0)!=0){t=c[a+(q+28)>>2]|0;r=7464+(t<<2)|0;if((o|0)==(c[r>>2]|0)){c[r>>2]=p;if((p|0)==0){c[7164>>2]=c[7164>>2]&~(1<<t);d=o;m=n;break}}else{if(s>>>0<(c[7176>>2]|0)>>>0){Za()}r=s+16|0;if((c[r>>2]|0)==(o|0)){c[r>>2]=p}else{c[s+20>>2]=p}if((p|0)==0){d=o;m=n;break}}if(p>>>0<(c[7176>>2]|0)>>>0){Za()}c[p+24>>2]=s;r=c[a+(q+16)>>2]|0;do{if((r|0)!=0){if(r>>>0<(c[7176>>2]|0)>>>0){Za()}else{c[p+16>>2]=r;c[r+24>>2]=p;break}}}while(0);q=c[a+(q+20)>>2]|0;if((q|0)!=0){if(q>>>0<(c[7176>>2]|0)>>>0){Za()}else{c[p+20>>2]=q;c[q+24>>2]=p;d=o;m=n;break}}else{d=o;m=n}}else{d=o;m=n}}else{d=q;m=j}}while(0);if(!(d>>>0<h>>>0)){Za()}n=a+(j+ -4)|0;o=c[n>>2]|0;if((o&1|0)==0){Za()}if((o&2|0)==0){if((h|0)==(c[7184>>2]|0)){w=(c[7172>>2]|0)+m|0;c[7172>>2]=w;c[7184>>2]=d;c[d+4>>2]=w|1;if((d|0)!=(c[7180>>2]|0)){i=b;return}c[7180>>2]=0;c[7168>>2]=0;i=b;return}if((h|0)==(c[7180>>2]|0)){w=(c[7168>>2]|0)+m|0;c[7168>>2]=w;c[7180>>2]=d;c[d+4>>2]=w|1;c[d+w>>2]=w;i=b;return}m=(o&-8)+m|0;n=o>>>3;do{if(!(o>>>0<256)){l=c[a+(j+16)>>2]|0;q=c[a+(j|4)>>2]|0;do{if((q|0)==(h|0)){o=a+(j+12)|0;n=c[o>>2]|0;if((n|0)==0){o=a+(j+8)|0;n=c[o>>2]|0;if((n|0)==0){k=0;break}}while(1){p=n+20|0;q=c[p>>2]|0;if((q|0)!=0){n=q;o=p;continue}p=n+16|0;q=c[p>>2]|0;if((q|0)==0){break}else{n=q;o=p}}if(o>>>0<(c[7176>>2]|0)>>>0){Za()}else{c[o>>2]=0;k=n;break}}else{o=c[a+j>>2]|0;if(o>>>0<(c[7176>>2]|0)>>>0){Za()}p=o+12|0;if((c[p>>2]|0)!=(h|0)){Za()}n=q+8|0;if((c[n>>2]|0)==(h|0)){c[p>>2]=q;c[n>>2]=o;k=q;break}else{Za()}}}while(0);if((l|0)!=0){n=c[a+(j+20)>>2]|0;o=7464+(n<<2)|0;if((h|0)==(c[o>>2]|0)){c[o>>2]=k;if((k|0)==0){c[7164>>2]=c[7164>>2]&~(1<<n);break}}else{if(l>>>0<(c[7176>>2]|0)>>>0){Za()}n=l+16|0;if((c[n>>2]|0)==(h|0)){c[n>>2]=k}else{c[l+20>>2]=k}if((k|0)==0){break}}if(k>>>0<(c[7176>>2]|0)>>>0){Za()}c[k+24>>2]=l;h=c[a+(j+8)>>2]|0;do{if((h|0)!=0){if(h>>>0<(c[7176>>2]|0)>>>0){Za()}else{c[k+16>>2]=h;c[h+24>>2]=k;break}}}while(0);h=c[a+(j+12)>>2]|0;if((h|0)!=0){if(h>>>0<(c[7176>>2]|0)>>>0){Za()}else{c[k+20>>2]=h;c[h+24>>2]=k;break}}}}else{k=c[a+j>>2]|0;a=c[a+(j|4)>>2]|0;j=7200+(n<<1<<2)|0;if((k|0)!=(j|0)){if(k>>>0<(c[7176>>2]|0)>>>0){Za()}if((c[k+12>>2]|0)!=(h|0)){Za()}}if((a|0)==(k|0)){c[1790]=c[1790]&~(1<<n);break}if((a|0)!=(j|0)){if(a>>>0<(c[7176>>2]|0)>>>0){Za()}j=a+8|0;if((c[j>>2]|0)==(h|0)){l=j}else{Za()}}else{l=a+8|0}c[k+12>>2]=a;c[l>>2]=k}}while(0);c[d+4>>2]=m|1;c[d+m>>2]=m;if((d|0)==(c[7180>>2]|0)){c[7168>>2]=m;i=b;return}}else{c[n>>2]=o&-2;c[d+4>>2]=m|1;c[d+m>>2]=m}h=m>>>3;if(m>>>0<256){a=h<<1;e=7200+(a<<2)|0;j=c[1790]|0;h=1<<h;if((j&h|0)!=0){h=7200+(a+2<<2)|0;a=c[h>>2]|0;if(a>>>0<(c[7176>>2]|0)>>>0){Za()}else{f=h;g=a}}else{c[1790]=j|h;f=7200+(a+2<<2)|0;g=e}c[f>>2]=d;c[g+12>>2]=d;c[d+8>>2]=g;c[d+12>>2]=e;i=b;return}f=m>>>8;if((f|0)!=0){if(m>>>0>16777215){f=31}else{v=(f+1048320|0)>>>16&8;w=f<<v;u=(w+520192|0)>>>16&4;w=w<<u;f=(w+245760|0)>>>16&2;f=14-(u|v|f)+(w<<f>>>15)|0;f=m>>>(f+7|0)&1|f<<1}}else{f=0}g=7464+(f<<2)|0;c[d+28>>2]=f;c[d+20>>2]=0;c[d+16>>2]=0;a=c[7164>>2]|0;h=1<<f;a:do{if((a&h|0)!=0){g=c[g>>2]|0;if((f|0)==31){f=0}else{f=25-(f>>>1)|0}b:do{if((c[g+4>>2]&-8|0)!=(m|0)){f=m<<f;a=g;while(1){h=a+(f>>>31<<2)+16|0;g=c[h>>2]|0;if((g|0)==0){break}if((c[g+4>>2]&-8|0)==(m|0)){e=g;break b}else{f=f<<1;a=g}}if(h>>>0<(c[7176>>2]|0)>>>0){Za()}else{c[h>>2]=d;c[d+24>>2]=a;c[d+12>>2]=d;c[d+8>>2]=d;break a}}else{e=g}}while(0);g=e+8|0;f=c[g>>2]|0;h=c[7176>>2]|0;if(e>>>0<h>>>0){Za()}if(f>>>0<h>>>0){Za()}else{c[f+12>>2]=d;c[g>>2]=d;c[d+8>>2]=f;c[d+12>>2]=e;c[d+24>>2]=0;break}}else{c[7164>>2]=a|h;c[g>>2]=d;c[d+24>>2]=g;c[d+12>>2]=d;c[d+8>>2]=d}}while(0);w=(c[7192>>2]|0)+ -1|0;c[7192>>2]=w;if((w|0)==0){d=7616|0}else{i=b;return}while(1){d=c[d>>2]|0;if((d|0)==0){break}else{d=d+8|0}}c[7192>>2]=-1;i=b;return}function Ye(a){a=a|0;var b=0,d=0;b=i;a=(a|0)==0?1:a;while(1){d=We(a)|0;if((d|0)!=0){a=6;break}d=c[1914]|0;c[1914]=d+0;if((d|0)==0){a=5;break}ob[d&3]()}if((a|0)==5){d=za(4)|0;c[d>>2]=7672;ra(d|0,7720,30)}else if((a|0)==6){i=b;return d|0}return 0}function Ze(a){a=a|0;var b=0;b=i;a=Ye(a)|0;i=b;return a|0}function _e(a){a=a|0;var b=0;b=i;if((a|0)!=0){Xe(a)}i=b;return}function $e(a){a=a|0;var b=0;b=i;Ua(a|0);_e(a);i=b;return}function af(a){a=a|0;var b=0;b=i;Ua(a|0);i=b;return}function bf(a){a=a|0;return 7688}function cf(){c[1932]=m}function df(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;f=b+e|0;if((e|0)>=20){d=d&255;i=b&3;h=d|d<<8|d<<16|d<<24;g=f&~3;if(i){i=b+4-i|0;while((b|0)<(i|0)){a[b]=d;b=b+1|0}}while((b|0)<(g|0)){c[b>>2]=h;b=b+4|0}}while((b|0)<(f|0)){a[b]=d;b=b+1|0}return b-e|0}function ef(b){b=b|0;var c=0;c=b;while(a[c]|0){c=c+1|0}return c-b|0}function ff(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;if((e|0)>=4096)return Ma(b|0,d|0,e|0)|0;f=b|0;if((b&3)==(d&3)){while(b&3){if((e|0)==0)return f|0;a[b]=a[d]|0;b=b+1|0;d=d+1|0;e=e-1|0}while((e|0)>=4){c[b>>2]=c[d>>2];b=b+4|0;d=d+4|0;e=e-4|0}}while((e|0)>0){a[b]=a[d]|0;b=b+1|0;d=d+1|0;e=e-1|0}return f|0}function gf(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return ib[a&7](b|0,c|0,d|0)|0}function hf(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;jb[a&3](b|0,c|0,d|0,e|0,f|0)}function jf(a,b){a=a|0;b=b|0;kb[a&31](b|0)}function kf(a,b,c){a=a|0;b=b|0;c=c|0;lb[a&15](b|0,c|0)}function lf(a,b){a=a|0;b=b|0;return mb[a&3](b|0)|0}function mf(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;nb[a&3](b|0,c|0,d|0)}function nf(a){a=a|0;ob[a&3]()}function of(a,b,c,d){a=a|0;b=b|0;c=c|0;d=$(d);pb[a&3](b|0,c|0,$(d))}function pf(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;qb[a&3](b|0,c|0,d|0,e|0,f|0,g|0)}function qf(a,b,c){a=a|0;b=b|0;c=c|0;return rb[a&3](b|0,c|0)|0}function rf(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return sb[a&15](b|0,c|0,d|0,e|0,f|0)|0}function sf(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;tb[a&15](b|0,c|0,d|0,e|0)}function tf(a,b,c){a=a|0;b=b|0;c=c|0;aa(0);return 0}function uf(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;aa(1)}function vf(a){a=a|0;aa(2)}function wf(a,b){a=a|0;b=b|0;aa(3)}function xf(a){a=a|0;aa(4);return 0}function yf(a,b,c){a=a|0;b=b|0;c=c|0;aa(5)}function zf(){aa(6)}function Af(){fb()}function Bf(a,b,c){a=a|0;b=b|0;c=$(c);aa(7)}function Cf(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;aa(8)}function Df(a,b){a=a|0;b=b|0;aa(9);return 0}function Ef(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;aa(10);return 0}function Ff(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;aa(11)}




// EMSCRIPTEN_END_FUNCS
var ib=[tf,Ub,$b,Uc,Oe,tf,tf,tf];var jb=[uf,Te,Se,uf];var kb=[vf,Mb,Qb,Nb,Pb,qc,Ec,pc,Jc,zd,Ad,Ed,Fd,Jd,Kd,Od,Pd,Td,Ud,me,ne,re,se,we,xe,Je,Me,Ke,Le,Ne,af,$e];var lb=[wf,Fc,Gc,ue,Md,Rd,Cd,Hd,ke,pe,wf,wf,wf,wf,wf,wf];var mb=[xf,Tb,_b,bf];var nb=[yf,Hc,Ic,yf];var ob=[zf,Af,Ob,zf];var pb=[Bf,Xb,cc,Bf];var qb=[Cf,Ve,Ue,Cf];var rb=[Df,Sb,Yb,yc];var sb=[Ef,Vb,ac,te,Ld,Qd,Bd,Gd,je,oe,Ef,Ef,Ef,Ef,Ef,Ef];var tb=[Ff,Wb,bc,Dd,Id,Nd,Sd,le,qe,ve,Pe,Qe,Ff,Ff,Ff,Ff];return{_strlen:ef,_free:Xe,_main:Lb,_memset:df,_malloc:We,_memcpy:ff,runPostSets:cf,stackAlloc:ub,stackSave:vb,stackRestore:wb,setThrew:xb,setTempRet0:Ab,setTempRet1:Bb,setTempRet2:Cb,setTempRet3:Db,setTempRet4:Eb,setTempRet5:Fb,setTempRet6:Gb,setTempRet7:Hb,setTempRet8:Ib,setTempRet9:Jb,dynCall_iiii:gf,dynCall_viiiii:hf,dynCall_vi:jf,dynCall_vii:kf,dynCall_ii:lf,dynCall_viii:mf,dynCall_v:nf,dynCall_viif:of,dynCall_viiiiii:pf,dynCall_iii:qf,dynCall_iiiiii:rf,dynCall_viiii:sf}})


// EMSCRIPTEN_END_ASM
({ "Math": Math, "Int8Array": Int8Array, "Int16Array": Int16Array, "Int32Array": Int32Array, "Uint8Array": Uint8Array, "Uint16Array": Uint16Array, "Uint32Array": Uint32Array, "Float32Array": Float32Array, "Float64Array": Float64Array }, { "abort": abort, "assert": assert, "asmPrintInt": asmPrintInt, "asmPrintFloat": asmPrintFloat, "min": Math_min, "invoke_iiii": invoke_iiii, "invoke_viiiii": invoke_viiiii, "invoke_vi": invoke_vi, "invoke_vii": invoke_vii, "invoke_ii": invoke_ii, "invoke_viii": invoke_viii, "invoke_v": invoke_v, "invoke_viif": invoke_viif, "invoke_viiiiii": invoke_viiiiii, "invoke_iii": invoke_iii, "invoke_iiiiii": invoke_iiiiii, "invoke_viiii": invoke_viiii, "___cxa_throw": ___cxa_throw, "_emscripten_run_script": _emscripten_run_script, "_cosf": _cosf, "_send": _send, "__ZSt9terminatev": __ZSt9terminatev, "__reallyNegative": __reallyNegative, "___cxa_is_number_type": ___cxa_is_number_type, "___assert_fail": ___assert_fail, "___cxa_allocate_exception": ___cxa_allocate_exception, "___cxa_find_matching_catch": ___cxa_find_matching_catch, "_fflush": _fflush, "_pwrite": _pwrite, "___setErrNo": ___setErrNo, "_sbrk": _sbrk, "___cxa_begin_catch": ___cxa_begin_catch, "_sinf": _sinf, "_fileno": _fileno, "___resumeException": ___resumeException, "__ZSt18uncaught_exceptionv": __ZSt18uncaught_exceptionv, "_sysconf": _sysconf, "_clock": _clock, "_emscripten_memcpy_big": _emscripten_memcpy_big, "_puts": _puts, "_mkport": _mkport, "_floorf": _floorf, "_sqrtf": _sqrtf, "_write": _write, "_emscripten_set_main_loop": _emscripten_set_main_loop, "___errno_location": ___errno_location, "__ZNSt9exceptionD2Ev": __ZNSt9exceptionD2Ev, "_printf": _printf, "___cxa_does_inherit": ___cxa_does_inherit, "__exit": __exit, "_fputc": _fputc, "_abort": _abort, "_fwrite": _fwrite, "_time": _time, "_fprintf": _fprintf, "_emscripten_cancel_main_loop": _emscripten_cancel_main_loop, "__formatString": __formatString, "_fputs": _fputs, "_exit": _exit, "___cxa_pure_virtual": ___cxa_pure_virtual, "STACKTOP": STACKTOP, "STACK_MAX": STACK_MAX, "tempDoublePtr": tempDoublePtr, "ABORT": ABORT, "NaN": NaN, "Infinity": Infinity, "__ZTISt9exception": __ZTISt9exception }, buffer);
var _strlen = Module["_strlen"] = asm["_strlen"];
var _free = Module["_free"] = asm["_free"];
var _main = Module["_main"] = asm["_main"];
var _memset = Module["_memset"] = asm["_memset"];
var _malloc = Module["_malloc"] = asm["_malloc"];
var _memcpy = Module["_memcpy"] = asm["_memcpy"];
var runPostSets = Module["runPostSets"] = asm["runPostSets"];
var dynCall_iiii = Module["dynCall_iiii"] = asm["dynCall_iiii"];
var dynCall_viiiii = Module["dynCall_viiiii"] = asm["dynCall_viiiii"];
var dynCall_vi = Module["dynCall_vi"] = asm["dynCall_vi"];
var dynCall_vii = Module["dynCall_vii"] = asm["dynCall_vii"];
var dynCall_ii = Module["dynCall_ii"] = asm["dynCall_ii"];
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
  if (ENVIRONMENT_IS_NODE || ENVIRONMENT_IS_SHELL) {
    var data = Module['readBinary'](memoryInitializer);
    HEAPU8.set(data, STATIC_BASE);
  } else {
    addRunDependency('memory initializer');
    Browser.asyncLoad(memoryInitializer, function(data) {
      HEAPU8.set(data, STATIC_BASE);
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

    if (ENVIRONMENT_IS_WEB && preloadStartTime !== null) {
      Module.printErr('pre-main prep time: ' + (Date.now() - preloadStartTime) + ' ms');
    }

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

  var extra = '\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.';

  throw 'abort() at ' + stackTrace() + extra;
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






