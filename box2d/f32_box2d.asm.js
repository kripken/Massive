Module["asm"] =  (function(global,env,buffer) {

 "use asm";
 var a = new global.Int8Array(buffer);
 var b = new global.Int16Array(buffer);
 var c = new global.Int32Array(buffer);
 var d = new global.Uint8Array(buffer);
 var e = new global.Uint16Array(buffer);
 var f = new global.Uint32Array(buffer);
 var g = new global.Float32Array(buffer);
 var h = new global.Float64Array(buffer);
 var i = env.STACKTOP | 0;
 var j = env.STACK_MAX | 0;
 var k = env.tempDoublePtr | 0;
 var l = env.ABORT | 0;
 var m = env.cttz_i8 | 0;
 var n = 0;
 var o = 0;
 var p = 0;
 var q = 0;
 var r = global.NaN, s = global.Infinity;
 var t = 0, u = 0, v = 0, w = 0, x = 0.0, y = 0, z = 0, A = 0, B = 0.0;
 var C = 0;
 var D = 0;
 var E = 0;
 var F = 0;
 var G = 0;
 var H = 0;
 var I = 0;
 var J = 0;
 var K = 0;
 var L = 0;
 var M = global.Math.floor;
 var N = global.Math.abs;
 var O = global.Math.sqrt;
 var P = global.Math.pow;
 var Q = global.Math.cos;
 var R = global.Math.sin;
 var S = global.Math.tan;
 var T = global.Math.acos;
 var U = global.Math.asin;
 var V = global.Math.atan;
 var W = global.Math.atan2;
 var X = global.Math.exp;
 var Y = global.Math.log;
 var Z = global.Math.ceil;
 var _ = global.Math.imul;
 var $ = global.Math.min;
 var aa = global.Math.clz32;
 var ba = global.Math.fround;
 var ca = env.abort;
 var da = env.assert;
 var ea = env.invoke_iiii;
 var fa = env.invoke_viiiii;
 var ga = env.invoke_vi;
 var ha = env.invoke_vii;
 var ia = env.invoke_ii;
 var ja = env.invoke_viii;
 var ka = env.invoke_v;
 var la = env.invoke_viif;
 var ma = env.invoke_viiiiii;
 var na = env.invoke_iii;
 var oa = env.invoke_iiiiii;
 var pa = env.invoke_viiii;
 var qa = env._pthread_cleanup_pop;
 var ra = env._emscripten_run_script;
 var sa = env._pthread_key_create;
 var ta = env._abort;
 var ua = env.___gxx_personality_v0;
 var va = env.___assert_fail;
 var wa = env.___cxa_allocate_exception;
 var xa = env.__ZSt18uncaught_exceptionv;
 var ya = env._emscripten_set_main_loop_timing;
 var za = env._sbrk;
 var Aa = env.___cxa_begin_catch;
 var Ba = env._emscripten_memcpy_big;
 var Ca = env.___resumeException;
 var Da = env.___cxa_find_matching_catch;
 var Ea = env._pthread_getspecific;
 var Fa = env._clock;
 var Ga = env._llvm_fabs_f32;
 var Ha = env._pthread_once;
 var Ia = env.___syscall54;
 var Ja = env._emscripten_set_main_loop;
 var Ka = env._pthread_setspecific;
 var La = env.___cxa_throw;
 var Ma = env.___syscall6;
 var Na = env._pthread_cleanup_push;
 var Oa = env._emscripten_cancel_main_loop;
 var Pa = env.___syscall140;
 var Qa = env.___cxa_pure_virtual;
 var Ra = env.___syscall146;
 var Sa = ba(0);
 const Ta = ba(0);
 
// EMSCRIPTEN_START_FUNCS

function Ke(a) {
 a = a | 0;
 var b = 0, d = 0, e = 0, f = 0, g = 0, h = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, z = 0, A = 0, B = 0, C = 0, D = 0;
 D = i;
 i = i + 16 | 0;
 p = D;
 do if (a >>> 0 < 245) {
  q = a >>> 0 < 11 ? 16 : a + 11 & -8;
  a = q >>> 3;
  k = c[2443] | 0;
  b = k >>> a;
  if (b & 3 | 0) {
   b = (b & 1 ^ 1) + a | 0;
   d = 9812 + (b << 1 << 2) | 0;
   e = d + 8 | 0;
   f = c[e >> 2] | 0;
   g = f + 8 | 0;
   h = c[g >> 2] | 0;
   do if ((d | 0) == (h | 0)) c[2443] = k & ~(1 << b); else {
    if (h >>> 0 < (c[2447] | 0) >>> 0) ta();
    a = h + 12 | 0;
    if ((c[a >> 2] | 0) == (f | 0)) {
     c[a >> 2] = d;
     c[e >> 2] = h;
     break;
    } else ta();
   } while (0);
   C = b << 3;
   c[f + 4 >> 2] = C | 3;
   C = f + C + 4 | 0;
   c[C >> 2] = c[C >> 2] | 1;
   C = g;
   i = D;
   return C | 0;
  }
  h = c[2445] | 0;
  if (q >>> 0 > h >>> 0) {
   if (b | 0) {
    d = 2 << a;
    d = b << a & (d | 0 - d);
    d = (d & 0 - d) + -1 | 0;
    j = d >>> 12 & 16;
    d = d >>> j;
    f = d >>> 5 & 8;
    d = d >>> f;
    g = d >>> 2 & 4;
    d = d >>> g;
    e = d >>> 1 & 2;
    d = d >>> e;
    b = d >>> 1 & 1;
    b = (f | j | g | e | b) + (d >>> b) | 0;
    d = 9812 + (b << 1 << 2) | 0;
    e = d + 8 | 0;
    g = c[e >> 2] | 0;
    j = g + 8 | 0;
    f = c[j >> 2] | 0;
    do if ((d | 0) == (f | 0)) {
     c[2443] = k & ~(1 << b);
     l = h;
    } else {
     if (f >>> 0 < (c[2447] | 0) >>> 0) ta();
     a = f + 12 | 0;
     if ((c[a >> 2] | 0) == (g | 0)) {
      c[a >> 2] = d;
      c[e >> 2] = f;
      l = c[2445] | 0;
      break;
     } else ta();
    } while (0);
    h = (b << 3) - q | 0;
    c[g + 4 >> 2] = q | 3;
    e = g + q | 0;
    c[e + 4 >> 2] = h | 1;
    c[e + h >> 2] = h;
    if (l | 0) {
     f = c[2448] | 0;
     b = l >>> 3;
     d = 9812 + (b << 1 << 2) | 0;
     a = c[2443] | 0;
     b = 1 << b;
     if (!(a & b)) {
      c[2443] = a | b;
      m = d + 8 | 0;
      n = d;
     } else {
      a = d + 8 | 0;
      b = c[a >> 2] | 0;
      if (b >>> 0 < (c[2447] | 0) >>> 0) ta(); else {
       m = a;
       n = b;
      }
     }
     c[m >> 2] = f;
     c[n + 12 >> 2] = f;
     c[f + 8 >> 2] = n;
     c[f + 12 >> 2] = d;
    }
    c[2445] = h;
    c[2448] = e;
    C = j;
    i = D;
    return C | 0;
   }
   a = c[2444] | 0;
   if (a) {
    d = (a & 0 - a) + -1 | 0;
    B = d >>> 12 & 16;
    d = d >>> B;
    A = d >>> 5 & 8;
    d = d >>> A;
    C = d >>> 2 & 4;
    d = d >>> C;
    b = d >>> 1 & 2;
    d = d >>> b;
    e = d >>> 1 & 1;
    e = c[10076 + ((A | B | C | b | e) + (d >>> e) << 2) >> 2] | 0;
    d = (c[e + 4 >> 2] & -8) - q | 0;
    b = e;
    while (1) {
     a = c[b + 16 >> 2] | 0;
     if (!a) {
      a = c[b + 20 >> 2] | 0;
      if (!a) {
       k = e;
       break;
      }
     }
     b = (c[a + 4 >> 2] & -8) - q | 0;
     C = b >>> 0 < d >>> 0;
     d = C ? b : d;
     b = a;
     e = C ? a : e;
    }
    g = c[2447] | 0;
    if (k >>> 0 < g >>> 0) ta();
    j = k + q | 0;
    if (k >>> 0 >= j >>> 0) ta();
    h = c[k + 24 >> 2] | 0;
    e = c[k + 12 >> 2] | 0;
    do if ((e | 0) == (k | 0)) {
     b = k + 20 | 0;
     a = c[b >> 2] | 0;
     if (!a) {
      b = k + 16 | 0;
      a = c[b >> 2] | 0;
      if (!a) {
       o = 0;
       break;
      }
     }
     while (1) {
      e = a + 20 | 0;
      f = c[e >> 2] | 0;
      if (f | 0) {
       a = f;
       b = e;
       continue;
      }
      e = a + 16 | 0;
      f = c[e >> 2] | 0;
      if (!f) break; else {
       a = f;
       b = e;
      }
     }
     if (b >>> 0 < g >>> 0) ta(); else {
      c[b >> 2] = 0;
      o = a;
      break;
     }
    } else {
     f = c[k + 8 >> 2] | 0;
     if (f >>> 0 < g >>> 0) ta();
     a = f + 12 | 0;
     if ((c[a >> 2] | 0) != (k | 0)) ta();
     b = e + 8 | 0;
     if ((c[b >> 2] | 0) == (k | 0)) {
      c[a >> 2] = e;
      c[b >> 2] = f;
      o = e;
      break;
     } else ta();
    } while (0);
    do if (h | 0) {
     a = c[k + 28 >> 2] | 0;
     b = 10076 + (a << 2) | 0;
     if ((k | 0) == (c[b >> 2] | 0)) {
      c[b >> 2] = o;
      if (!o) {
       c[2444] = c[2444] & ~(1 << a);
       break;
      }
     } else {
      if (h >>> 0 < (c[2447] | 0) >>> 0) ta();
      a = h + 16 | 0;
      if ((c[a >> 2] | 0) == (k | 0)) c[a >> 2] = o; else c[h + 20 >> 2] = o;
      if (!o) break;
     }
     b = c[2447] | 0;
     if (o >>> 0 < b >>> 0) ta();
     c[o + 24 >> 2] = h;
     a = c[k + 16 >> 2] | 0;
     do if (a | 0) if (a >>> 0 < b >>> 0) ta(); else {
      c[o + 16 >> 2] = a;
      c[a + 24 >> 2] = o;
      break;
     } while (0);
     a = c[k + 20 >> 2] | 0;
     if (a | 0) if (a >>> 0 < (c[2447] | 0) >>> 0) ta(); else {
      c[o + 20 >> 2] = a;
      c[a + 24 >> 2] = o;
      break;
     }
    } while (0);
    if (d >>> 0 < 16) {
     C = d + q | 0;
     c[k + 4 >> 2] = C | 3;
     C = k + C + 4 | 0;
     c[C >> 2] = c[C >> 2] | 1;
    } else {
     c[k + 4 >> 2] = q | 3;
     c[j + 4 >> 2] = d | 1;
     c[j + d >> 2] = d;
     a = c[2445] | 0;
     if (a | 0) {
      f = c[2448] | 0;
      b = a >>> 3;
      e = 9812 + (b << 1 << 2) | 0;
      a = c[2443] | 0;
      b = 1 << b;
      if (!(a & b)) {
       c[2443] = a | b;
       r = e + 8 | 0;
       s = e;
      } else {
       a = e + 8 | 0;
       b = c[a >> 2] | 0;
       if (b >>> 0 < (c[2447] | 0) >>> 0) ta(); else {
        r = a;
        s = b;
       }
      }
      c[r >> 2] = f;
      c[s + 12 >> 2] = f;
      c[f + 8 >> 2] = s;
      c[f + 12 >> 2] = e;
     }
     c[2445] = d;
     c[2448] = j;
    }
    C = k + 8 | 0;
    i = D;
    return C | 0;
   }
  }
 } else if (a >>> 0 > 4294967231) q = -1; else {
  a = a + 11 | 0;
  q = a & -8;
  k = c[2444] | 0;
  if (k) {
   d = 0 - q | 0;
   a = a >>> 8;
   if (!a) j = 0; else if (q >>> 0 > 16777215) j = 31; else {
    s = (a + 1048320 | 0) >>> 16 & 8;
    w = a << s;
    r = (w + 520192 | 0) >>> 16 & 4;
    w = w << r;
    j = (w + 245760 | 0) >>> 16 & 2;
    j = 14 - (r | s | j) + (w << j >>> 15) | 0;
    j = q >>> (j + 7 | 0) & 1 | j << 1;
   }
   b = c[10076 + (j << 2) >> 2] | 0;
   a : do if (!b) {
    a = 0;
    b = 0;
    w = 86;
   } else {
    f = d;
    a = 0;
    g = q << ((j | 0) == 31 ? 0 : 25 - (j >>> 1) | 0);
    h = b;
    b = 0;
    while (1) {
     e = c[h + 4 >> 2] & -8;
     d = e - q | 0;
     if (d >>> 0 < f >>> 0) if ((e | 0) == (q | 0)) {
      a = h;
      b = h;
      w = 90;
      break a;
     } else b = h; else d = f;
     e = c[h + 20 >> 2] | 0;
     h = c[h + 16 + (g >>> 31 << 2) >> 2] | 0;
     a = (e | 0) == 0 | (e | 0) == (h | 0) ? a : e;
     e = (h | 0) == 0;
     if (e) {
      w = 86;
      break;
     } else {
      f = d;
      g = g << (e & 1 ^ 1);
     }
    }
   } while (0);
   if ((w | 0) == 86) {
    if ((a | 0) == 0 & (b | 0) == 0) {
     a = 2 << j;
     a = k & (a | 0 - a);
     if (!a) break;
     s = (a & 0 - a) + -1 | 0;
     n = s >>> 12 & 16;
     s = s >>> n;
     m = s >>> 5 & 8;
     s = s >>> m;
     o = s >>> 2 & 4;
     s = s >>> o;
     r = s >>> 1 & 2;
     s = s >>> r;
     a = s >>> 1 & 1;
     a = c[10076 + ((m | n | o | r | a) + (s >>> a) << 2) >> 2] | 0;
    }
    if (!a) {
     h = d;
     k = b;
    } else w = 90;
   }
   if ((w | 0) == 90) while (1) {
    w = 0;
    s = (c[a + 4 >> 2] & -8) - q | 0;
    e = s >>> 0 < d >>> 0;
    d = e ? s : d;
    b = e ? a : b;
    e = c[a + 16 >> 2] | 0;
    if (e | 0) {
     a = e;
     w = 90;
     continue;
    }
    a = c[a + 20 >> 2] | 0;
    if (!a) {
     h = d;
     k = b;
     break;
    } else w = 90;
   }
   if (k) if (h >>> 0 < ((c[2445] | 0) - q | 0) >>> 0) {
    f = c[2447] | 0;
    if (k >>> 0 < f >>> 0) ta();
    j = k + q | 0;
    if (k >>> 0 >= j >>> 0) ta();
    g = c[k + 24 >> 2] | 0;
    d = c[k + 12 >> 2] | 0;
    do if ((d | 0) == (k | 0)) {
     b = k + 20 | 0;
     a = c[b >> 2] | 0;
     if (!a) {
      b = k + 16 | 0;
      a = c[b >> 2] | 0;
      if (!a) {
       t = 0;
       break;
      }
     }
     while (1) {
      d = a + 20 | 0;
      e = c[d >> 2] | 0;
      if (e | 0) {
       a = e;
       b = d;
       continue;
      }
      d = a + 16 | 0;
      e = c[d >> 2] | 0;
      if (!e) break; else {
       a = e;
       b = d;
      }
     }
     if (b >>> 0 < f >>> 0) ta(); else {
      c[b >> 2] = 0;
      t = a;
      break;
     }
    } else {
     e = c[k + 8 >> 2] | 0;
     if (e >>> 0 < f >>> 0) ta();
     a = e + 12 | 0;
     if ((c[a >> 2] | 0) != (k | 0)) ta();
     b = d + 8 | 0;
     if ((c[b >> 2] | 0) == (k | 0)) {
      c[a >> 2] = d;
      c[b >> 2] = e;
      t = d;
      break;
     } else ta();
    } while (0);
    do if (g | 0) {
     a = c[k + 28 >> 2] | 0;
     b = 10076 + (a << 2) | 0;
     if ((k | 0) == (c[b >> 2] | 0)) {
      c[b >> 2] = t;
      if (!t) {
       c[2444] = c[2444] & ~(1 << a);
       break;
      }
     } else {
      if (g >>> 0 < (c[2447] | 0) >>> 0) ta();
      a = g + 16 | 0;
      if ((c[a >> 2] | 0) == (k | 0)) c[a >> 2] = t; else c[g + 20 >> 2] = t;
      if (!t) break;
     }
     b = c[2447] | 0;
     if (t >>> 0 < b >>> 0) ta();
     c[t + 24 >> 2] = g;
     a = c[k + 16 >> 2] | 0;
     do if (a | 0) if (a >>> 0 < b >>> 0) ta(); else {
      c[t + 16 >> 2] = a;
      c[a + 24 >> 2] = t;
      break;
     } while (0);
     a = c[k + 20 >> 2] | 0;
     if (a | 0) if (a >>> 0 < (c[2447] | 0) >>> 0) ta(); else {
      c[t + 20 >> 2] = a;
      c[a + 24 >> 2] = t;
      break;
     }
    } while (0);
    do if (h >>> 0 < 16) {
     C = h + q | 0;
     c[k + 4 >> 2] = C | 3;
     C = k + C + 4 | 0;
     c[C >> 2] = c[C >> 2] | 1;
    } else {
     c[k + 4 >> 2] = q | 3;
     c[j + 4 >> 2] = h | 1;
     c[j + h >> 2] = h;
     a = h >>> 3;
     if (h >>> 0 < 256) {
      d = 9812 + (a << 1 << 2) | 0;
      b = c[2443] | 0;
      a = 1 << a;
      if (!(b & a)) {
       c[2443] = b | a;
       u = d + 8 | 0;
       v = d;
      } else {
       a = d + 8 | 0;
       b = c[a >> 2] | 0;
       if (b >>> 0 < (c[2447] | 0) >>> 0) ta(); else {
        u = a;
        v = b;
       }
      }
      c[u >> 2] = j;
      c[v + 12 >> 2] = j;
      c[j + 8 >> 2] = v;
      c[j + 12 >> 2] = d;
      break;
     }
     a = h >>> 8;
     if (!a) d = 0; else if (h >>> 0 > 16777215) d = 31; else {
      B = (a + 1048320 | 0) >>> 16 & 8;
      C = a << B;
      A = (C + 520192 | 0) >>> 16 & 4;
      C = C << A;
      d = (C + 245760 | 0) >>> 16 & 2;
      d = 14 - (A | B | d) + (C << d >>> 15) | 0;
      d = h >>> (d + 7 | 0) & 1 | d << 1;
     }
     e = 10076 + (d << 2) | 0;
     c[j + 28 >> 2] = d;
     a = j + 16 | 0;
     c[a + 4 >> 2] = 0;
     c[a >> 2] = 0;
     a = c[2444] | 0;
     b = 1 << d;
     if (!(a & b)) {
      c[2444] = a | b;
      c[e >> 2] = j;
      c[j + 24 >> 2] = e;
      c[j + 12 >> 2] = j;
      c[j + 8 >> 2] = j;
      break;
     }
     f = h << ((d | 0) == 31 ? 0 : 25 - (d >>> 1) | 0);
     a = c[e >> 2] | 0;
     while (1) {
      if ((c[a + 4 >> 2] & -8 | 0) == (h | 0)) {
       d = a;
       w = 148;
       break;
      }
      b = a + 16 + (f >>> 31 << 2) | 0;
      d = c[b >> 2] | 0;
      if (!d) {
       w = 145;
       break;
      } else {
       f = f << 1;
       a = d;
      }
     }
     if ((w | 0) == 145) if (b >>> 0 < (c[2447] | 0) >>> 0) ta(); else {
      c[b >> 2] = j;
      c[j + 24 >> 2] = a;
      c[j + 12 >> 2] = j;
      c[j + 8 >> 2] = j;
      break;
     } else if ((w | 0) == 148) {
      a = d + 8 | 0;
      b = c[a >> 2] | 0;
      C = c[2447] | 0;
      if (b >>> 0 >= C >>> 0 & d >>> 0 >= C >>> 0) {
       c[b + 12 >> 2] = j;
       c[a >> 2] = j;
       c[j + 8 >> 2] = b;
       c[j + 12 >> 2] = d;
       c[j + 24 >> 2] = 0;
       break;
      } else ta();
     }
    } while (0);
    C = k + 8 | 0;
    i = D;
    return C | 0;
   }
  }
 } while (0);
 d = c[2445] | 0;
 if (d >>> 0 >= q >>> 0) {
  a = d - q | 0;
  b = c[2448] | 0;
  if (a >>> 0 > 15) {
   C = b + q | 0;
   c[2448] = C;
   c[2445] = a;
   c[C + 4 >> 2] = a | 1;
   c[C + a >> 2] = a;
   c[b + 4 >> 2] = q | 3;
  } else {
   c[2445] = 0;
   c[2448] = 0;
   c[b + 4 >> 2] = d | 3;
   C = b + d + 4 | 0;
   c[C >> 2] = c[C >> 2] | 1;
  }
  C = b + 8 | 0;
  i = D;
  return C | 0;
 }
 a = c[2446] | 0;
 if (a >>> 0 > q >>> 0) {
  A = a - q | 0;
  c[2446] = A;
  C = c[2449] | 0;
  B = C + q | 0;
  c[2449] = B;
  c[B + 4 >> 2] = A | 1;
  c[C + 4 >> 2] = q | 3;
  C = C + 8 | 0;
  i = D;
  return C | 0;
 }
 if (!(c[2561] | 0)) {
  c[2563] = 4096;
  c[2562] = 4096;
  c[2564] = -1;
  c[2565] = -1;
  c[2566] = 0;
  c[2554] = 0;
  v = p & -16 ^ 1431655768;
  c[p >> 2] = v;
  c[2561] = v;
 }
 h = q + 48 | 0;
 g = c[2563] | 0;
 j = q + 47 | 0;
 f = g + j | 0;
 g = 0 - g | 0;
 k = f & g;
 if (k >>> 0 <= q >>> 0) {
  C = 0;
  i = D;
  return C | 0;
 }
 a = c[2553] | 0;
 if (a | 0) {
  u = c[2551] | 0;
  v = u + k | 0;
  if (v >>> 0 <= u >>> 0 | v >>> 0 > a >>> 0) {
   C = 0;
   i = D;
   return C | 0;
  }
 }
 b : do if (!(c[2554] & 4)) {
  a = c[2449] | 0;
  c : do if (!a) w = 171; else {
   e = 10220;
   while (1) {
    b = c[e >> 2] | 0;
    if (b >>> 0 <= a >>> 0) {
     d = e + 4 | 0;
     if ((b + (c[d >> 2] | 0) | 0) >>> 0 > a >>> 0) break;
    }
    e = c[e + 8 >> 2] | 0;
    if (!e) {
     w = 171;
     break c;
    }
   }
   a = f - (c[2446] | 0) & g;
   if (a >>> 0 < 2147483647) {
    b = za(a | 0) | 0;
    if ((b | 0) == ((c[e >> 2] | 0) + (c[d >> 2] | 0) | 0)) {
     if ((b | 0) != (-1 | 0)) {
      f = b;
      h = a;
      w = 191;
      break b;
     }
    } else {
     e = b;
     w = 181;
    }
   }
  } while (0);
  do if ((w | 0) == 171) {
   f = za(0) | 0;
   if ((f | 0) != (-1 | 0)) {
    a = f;
    b = c[2562] | 0;
    d = b + -1 | 0;
    if (!(d & a)) a = k; else a = k - a + (d + a & 0 - b) | 0;
    b = c[2551] | 0;
    d = b + a | 0;
    if (a >>> 0 > q >>> 0 & a >>> 0 < 2147483647) {
     e = c[2553] | 0;
     if (e | 0) if (d >>> 0 <= b >>> 0 | d >>> 0 > e >>> 0) break;
     b = za(a | 0) | 0;
     if ((b | 0) == (f | 0)) {
      h = a;
      w = 191;
      break b;
     } else {
      e = b;
      w = 181;
     }
    }
   }
  } while (0);
  d : do if ((w | 0) == 181) {
   d = 0 - a | 0;
   do if (h >>> 0 > a >>> 0 & (a >>> 0 < 2147483647 & (e | 0) != (-1 | 0))) {
    b = c[2563] | 0;
    b = j - a + b & 0 - b;
    if (b >>> 0 < 2147483647) if ((za(b | 0) | 0) == (-1 | 0)) {
     za(d | 0) | 0;
     break d;
    } else {
     a = b + a | 0;
     break;
    }
   } while (0);
   if ((e | 0) != (-1 | 0)) {
    f = e;
    h = a;
    w = 191;
    break b;
   }
  } while (0);
  c[2554] = c[2554] | 4;
  w = 188;
 } else w = 188; while (0);
 if ((w | 0) == 188) if (k >>> 0 < 2147483647) {
  b = za(k | 0) | 0;
  a = za(0) | 0;
  if (b >>> 0 < a >>> 0 & ((b | 0) != (-1 | 0) & (a | 0) != (-1 | 0))) {
   a = a - b | 0;
   if (a >>> 0 > (q + 40 | 0) >>> 0) {
    f = b;
    h = a;
    w = 191;
   }
  }
 }
 if ((w | 0) == 191) {
  a = (c[2551] | 0) + h | 0;
  c[2551] = a;
  if (a >>> 0 > (c[2552] | 0) >>> 0) c[2552] = a;
  j = c[2449] | 0;
  do if (!j) {
   C = c[2447] | 0;
   if ((C | 0) == 0 | f >>> 0 < C >>> 0) c[2447] = f;
   c[2555] = f;
   c[2556] = h;
   c[2558] = 0;
   c[2452] = c[2561];
   c[2451] = -1;
   a = 0;
   do {
    C = 9812 + (a << 1 << 2) | 0;
    c[C + 12 >> 2] = C;
    c[C + 8 >> 2] = C;
    a = a + 1 | 0;
   } while ((a | 0) != 32);
   C = f + 8 | 0;
   C = (C & 7 | 0) == 0 ? 0 : 0 - C & 7;
   B = f + C | 0;
   C = h + -40 - C | 0;
   c[2449] = B;
   c[2446] = C;
   c[B + 4 >> 2] = C | 1;
   c[B + C + 4 >> 2] = 40;
   c[2450] = c[2565];
  } else {
   b = 10220;
   do {
    a = c[b >> 2] | 0;
    e = b + 4 | 0;
    d = c[e >> 2] | 0;
    if ((f | 0) == (a + d | 0)) {
     w = 201;
     break;
    }
    b = c[b + 8 >> 2] | 0;
   } while ((b | 0) != 0);
   if ((w | 0) == 201) if (!(c[b + 12 >> 2] & 8)) if (j >>> 0 < f >>> 0 & j >>> 0 >= a >>> 0) {
    c[e >> 2] = d + h;
    C = j + 8 | 0;
    C = (C & 7 | 0) == 0 ? 0 : 0 - C & 7;
    B = j + C | 0;
    C = h - C + (c[2446] | 0) | 0;
    c[2449] = B;
    c[2446] = C;
    c[B + 4 >> 2] = C | 1;
    c[B + C + 4 >> 2] = 40;
    c[2450] = c[2565];
    break;
   }
   a = c[2447] | 0;
   if (f >>> 0 < a >>> 0) {
    c[2447] = f;
    k = f;
   } else k = a;
   d = f + h | 0;
   a = 10220;
   while (1) {
    if ((c[a >> 2] | 0) == (d | 0)) {
     b = a;
     w = 209;
     break;
    }
    a = c[a + 8 >> 2] | 0;
    if (!a) {
     b = 10220;
     break;
    }
   }
   if ((w | 0) == 209) if (!(c[a + 12 >> 2] & 8)) {
    c[b >> 2] = f;
    m = a + 4 | 0;
    c[m >> 2] = (c[m >> 2] | 0) + h;
    m = f + 8 | 0;
    m = f + ((m & 7 | 0) == 0 ? 0 : 0 - m & 7) | 0;
    a = d + 8 | 0;
    a = d + ((a & 7 | 0) == 0 ? 0 : 0 - a & 7) | 0;
    l = m + q | 0;
    g = a - m - q | 0;
    c[m + 4 >> 2] = q | 3;
    do if ((a | 0) == (j | 0)) {
     C = (c[2446] | 0) + g | 0;
     c[2446] = C;
     c[2449] = l;
     c[l + 4 >> 2] = C | 1;
    } else {
     if ((a | 0) == (c[2448] | 0)) {
      C = (c[2445] | 0) + g | 0;
      c[2445] = C;
      c[2448] = l;
      c[l + 4 >> 2] = C | 1;
      c[l + C >> 2] = C;
      break;
     }
     b = c[a + 4 >> 2] | 0;
     if ((b & 3 | 0) == 1) {
      j = b & -8;
      f = b >>> 3;
      e : do if (b >>> 0 < 256) {
       d = c[a + 8 >> 2] | 0;
       e = c[a + 12 >> 2] | 0;
       b = 9812 + (f << 1 << 2) | 0;
       do if ((d | 0) != (b | 0)) {
        if (d >>> 0 < k >>> 0) ta();
        if ((c[d + 12 >> 2] | 0) == (a | 0)) break;
        ta();
       } while (0);
       if ((e | 0) == (d | 0)) {
        c[2443] = c[2443] & ~(1 << f);
        break;
       }
       do if ((e | 0) == (b | 0)) x = e + 8 | 0; else {
        if (e >>> 0 < k >>> 0) ta();
        b = e + 8 | 0;
        if ((c[b >> 2] | 0) == (a | 0)) {
         x = b;
         break;
        }
        ta();
       } while (0);
       c[d + 12 >> 2] = e;
       c[x >> 2] = d;
      } else {
       h = c[a + 24 >> 2] | 0;
       e = c[a + 12 >> 2] | 0;
       do if ((e | 0) == (a | 0)) {
        d = a + 16 | 0;
        e = d + 4 | 0;
        b = c[e >> 2] | 0;
        if (!b) {
         b = c[d >> 2] | 0;
         if (!b) {
          A = 0;
          break;
         }
        } else d = e;
        while (1) {
         e = b + 20 | 0;
         f = c[e >> 2] | 0;
         if (f | 0) {
          b = f;
          d = e;
          continue;
         }
         e = b + 16 | 0;
         f = c[e >> 2] | 0;
         if (!f) break; else {
          b = f;
          d = e;
         }
        }
        if (d >>> 0 < k >>> 0) ta(); else {
         c[d >> 2] = 0;
         A = b;
         break;
        }
       } else {
        f = c[a + 8 >> 2] | 0;
        if (f >>> 0 < k >>> 0) ta();
        b = f + 12 | 0;
        if ((c[b >> 2] | 0) != (a | 0)) ta();
        d = e + 8 | 0;
        if ((c[d >> 2] | 0) == (a | 0)) {
         c[b >> 2] = e;
         c[d >> 2] = f;
         A = e;
         break;
        } else ta();
       } while (0);
       if (!h) break;
       b = c[a + 28 >> 2] | 0;
       d = 10076 + (b << 2) | 0;
       do if ((a | 0) == (c[d >> 2] | 0)) {
        c[d >> 2] = A;
        if (A | 0) break;
        c[2444] = c[2444] & ~(1 << b);
        break e;
       } else {
        if (h >>> 0 < (c[2447] | 0) >>> 0) ta();
        b = h + 16 | 0;
        if ((c[b >> 2] | 0) == (a | 0)) c[b >> 2] = A; else c[h + 20 >> 2] = A;
        if (!A) break e;
       } while (0);
       e = c[2447] | 0;
       if (A >>> 0 < e >>> 0) ta();
       c[A + 24 >> 2] = h;
       b = a + 16 | 0;
       d = c[b >> 2] | 0;
       do if (d | 0) if (d >>> 0 < e >>> 0) ta(); else {
        c[A + 16 >> 2] = d;
        c[d + 24 >> 2] = A;
        break;
       } while (0);
       b = c[b + 4 >> 2] | 0;
       if (!b) break;
       if (b >>> 0 < (c[2447] | 0) >>> 0) ta(); else {
        c[A + 20 >> 2] = b;
        c[b + 24 >> 2] = A;
        break;
       }
      } while (0);
      a = a + j | 0;
      g = j + g | 0;
     }
     a = a + 4 | 0;
     c[a >> 2] = c[a >> 2] & -2;
     c[l + 4 >> 2] = g | 1;
     c[l + g >> 2] = g;
     a = g >>> 3;
     if (g >>> 0 < 256) {
      d = 9812 + (a << 1 << 2) | 0;
      b = c[2443] | 0;
      a = 1 << a;
      do if (!(b & a)) {
       c[2443] = b | a;
       B = d + 8 | 0;
       C = d;
      } else {
       a = d + 8 | 0;
       b = c[a >> 2] | 0;
       if (b >>> 0 >= (c[2447] | 0) >>> 0) {
        B = a;
        C = b;
        break;
       }
       ta();
      } while (0);
      c[B >> 2] = l;
      c[C + 12 >> 2] = l;
      c[l + 8 >> 2] = C;
      c[l + 12 >> 2] = d;
      break;
     }
     a = g >>> 8;
     do if (!a) d = 0; else {
      if (g >>> 0 > 16777215) {
       d = 31;
       break;
      }
      B = (a + 1048320 | 0) >>> 16 & 8;
      C = a << B;
      A = (C + 520192 | 0) >>> 16 & 4;
      C = C << A;
      d = (C + 245760 | 0) >>> 16 & 2;
      d = 14 - (A | B | d) + (C << d >>> 15) | 0;
      d = g >>> (d + 7 | 0) & 1 | d << 1;
     } while (0);
     e = 10076 + (d << 2) | 0;
     c[l + 28 >> 2] = d;
     a = l + 16 | 0;
     c[a + 4 >> 2] = 0;
     c[a >> 2] = 0;
     a = c[2444] | 0;
     b = 1 << d;
     if (!(a & b)) {
      c[2444] = a | b;
      c[e >> 2] = l;
      c[l + 24 >> 2] = e;
      c[l + 12 >> 2] = l;
      c[l + 8 >> 2] = l;
      break;
     }
     f = g << ((d | 0) == 31 ? 0 : 25 - (d >>> 1) | 0);
     a = c[e >> 2] | 0;
     while (1) {
      if ((c[a + 4 >> 2] & -8 | 0) == (g | 0)) {
       d = a;
       w = 279;
       break;
      }
      b = a + 16 + (f >>> 31 << 2) | 0;
      d = c[b >> 2] | 0;
      if (!d) {
       w = 276;
       break;
      } else {
       f = f << 1;
       a = d;
      }
     }
     if ((w | 0) == 276) if (b >>> 0 < (c[2447] | 0) >>> 0) ta(); else {
      c[b >> 2] = l;
      c[l + 24 >> 2] = a;
      c[l + 12 >> 2] = l;
      c[l + 8 >> 2] = l;
      break;
     } else if ((w | 0) == 279) {
      a = d + 8 | 0;
      b = c[a >> 2] | 0;
      C = c[2447] | 0;
      if (b >>> 0 >= C >>> 0 & d >>> 0 >= C >>> 0) {
       c[b + 12 >> 2] = l;
       c[a >> 2] = l;
       c[l + 8 >> 2] = b;
       c[l + 12 >> 2] = d;
       c[l + 24 >> 2] = 0;
       break;
      } else ta();
     }
    } while (0);
    C = m + 8 | 0;
    i = D;
    return C | 0;
   } else b = 10220;
   while (1) {
    a = c[b >> 2] | 0;
    if (a >>> 0 <= j >>> 0) {
     a = a + (c[b + 4 >> 2] | 0) | 0;
     if (a >>> 0 > j >>> 0) break;
    }
    b = c[b + 8 >> 2] | 0;
   }
   g = a + -47 | 0;
   d = g + 8 | 0;
   d = g + ((d & 7 | 0) == 0 ? 0 : 0 - d & 7) | 0;
   g = j + 16 | 0;
   d = d >>> 0 < g >>> 0 ? j : d;
   b = d + 8 | 0;
   e = f + 8 | 0;
   e = (e & 7 | 0) == 0 ? 0 : 0 - e & 7;
   C = f + e | 0;
   e = h + -40 - e | 0;
   c[2449] = C;
   c[2446] = e;
   c[C + 4 >> 2] = e | 1;
   c[C + e + 4 >> 2] = 40;
   c[2450] = c[2565];
   e = d + 4 | 0;
   c[e >> 2] = 27;
   c[b >> 2] = c[2555];
   c[b + 4 >> 2] = c[2556];
   c[b + 8 >> 2] = c[2557];
   c[b + 12 >> 2] = c[2558];
   c[2555] = f;
   c[2556] = h;
   c[2558] = 0;
   c[2557] = b;
   b = d + 24 | 0;
   do {
    b = b + 4 | 0;
    c[b >> 2] = 7;
   } while ((b + 4 | 0) >>> 0 < a >>> 0);
   if ((d | 0) != (j | 0)) {
    h = d - j | 0;
    c[e >> 2] = c[e >> 2] & -2;
    c[j + 4 >> 2] = h | 1;
    c[d >> 2] = h;
    a = h >>> 3;
    if (h >>> 0 < 256) {
     d = 9812 + (a << 1 << 2) | 0;
     b = c[2443] | 0;
     a = 1 << a;
     if (!(b & a)) {
      c[2443] = b | a;
      y = d + 8 | 0;
      z = d;
     } else {
      a = d + 8 | 0;
      b = c[a >> 2] | 0;
      if (b >>> 0 < (c[2447] | 0) >>> 0) ta(); else {
       y = a;
       z = b;
      }
     }
     c[y >> 2] = j;
     c[z + 12 >> 2] = j;
     c[j + 8 >> 2] = z;
     c[j + 12 >> 2] = d;
     break;
    }
    a = h >>> 8;
    if (!a) d = 0; else if (h >>> 0 > 16777215) d = 31; else {
     B = (a + 1048320 | 0) >>> 16 & 8;
     C = a << B;
     A = (C + 520192 | 0) >>> 16 & 4;
     C = C << A;
     d = (C + 245760 | 0) >>> 16 & 2;
     d = 14 - (A | B | d) + (C << d >>> 15) | 0;
     d = h >>> (d + 7 | 0) & 1 | d << 1;
    }
    f = 10076 + (d << 2) | 0;
    c[j + 28 >> 2] = d;
    c[j + 20 >> 2] = 0;
    c[g >> 2] = 0;
    a = c[2444] | 0;
    b = 1 << d;
    if (!(a & b)) {
     c[2444] = a | b;
     c[f >> 2] = j;
     c[j + 24 >> 2] = f;
     c[j + 12 >> 2] = j;
     c[j + 8 >> 2] = j;
     break;
    }
    e = h << ((d | 0) == 31 ? 0 : 25 - (d >>> 1) | 0);
    a = c[f >> 2] | 0;
    while (1) {
     if ((c[a + 4 >> 2] & -8 | 0) == (h | 0)) {
      d = a;
      w = 305;
      break;
     }
     b = a + 16 + (e >>> 31 << 2) | 0;
     d = c[b >> 2] | 0;
     if (!d) {
      w = 302;
      break;
     } else {
      e = e << 1;
      a = d;
     }
    }
    if ((w | 0) == 302) if (b >>> 0 < (c[2447] | 0) >>> 0) ta(); else {
     c[b >> 2] = j;
     c[j + 24 >> 2] = a;
     c[j + 12 >> 2] = j;
     c[j + 8 >> 2] = j;
     break;
    } else if ((w | 0) == 305) {
     a = d + 8 | 0;
     b = c[a >> 2] | 0;
     C = c[2447] | 0;
     if (b >>> 0 >= C >>> 0 & d >>> 0 >= C >>> 0) {
      c[b + 12 >> 2] = j;
      c[a >> 2] = j;
      c[j + 8 >> 2] = b;
      c[j + 12 >> 2] = d;
      c[j + 24 >> 2] = 0;
      break;
     } else ta();
    }
   }
  } while (0);
  a = c[2446] | 0;
  if (a >>> 0 > q >>> 0) {
   A = a - q | 0;
   c[2446] = A;
   C = c[2449] | 0;
   B = C + q | 0;
   c[2449] = B;
   c[B + 4 >> 2] = A | 1;
   c[C + 4 >> 2] = q | 3;
   C = C + 8 | 0;
   i = D;
   return C | 0;
  }
 }
 c[(ee() | 0) >> 2] = 12;
 C = 0;
 i = D;
 return C | 0;
}

function me(e, f, g, j, l) {
 e = e | 0;
 f = f | 0;
 g = g | 0;
 j = j | 0;
 l = l | 0;
 var m = 0, n = 0, o = 0, p = 0, q = 0.0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x = 0.0, y = 0, z = 0, A = 0, B = 0, D = 0, E = 0, F = 0, G = 0, H = 0, I = 0, J = 0, K = 0, L = 0, M = 0, N = 0, O = 0, P = 0, Q = 0, R = 0, S = 0, T = 0, U = 0, V = 0, W = 0, X = 0, Y = 0, Z = 0, $ = 0, aa = 0, ba = 0, ca = 0, da = 0, ea = 0, fa = 0, ga = 0, ha = 0, ia = 0;
 ia = i;
 i = i + 624 | 0;
 da = ia + 24 | 0;
 fa = ia + 16 | 0;
 ea = ia + 588 | 0;
 aa = ia + 576 | 0;
 ca = ia;
 W = ia + 536 | 0;
 ha = ia + 8 | 0;
 ga = ia + 528 | 0;
 M = (e | 0) != 0;
 N = W + 40 | 0;
 V = N;
 W = W + 39 | 0;
 X = ha + 4 | 0;
 Y = ea;
 Z = 0 - Y | 0;
 $ = aa + 12 | 0;
 aa = aa + 11 | 0;
 ba = $;
 O = ba - Y | 0;
 P = -2 - Y | 0;
 Q = ba + 2 | 0;
 R = da + 288 | 0;
 S = ea + 9 | 0;
 T = S;
 U = ea + 8 | 0;
 m = 0;
 o = 0;
 n = 0;
 y = f;
 a : while (1) {
  do if ((m | 0) > -1) if ((o | 0) > (2147483647 - m | 0)) {
   c[(ee() | 0) >> 2] = 75;
   m = -1;
   break;
  } else {
   m = o + m | 0;
   break;
  } while (0);
  f = a[y >> 0] | 0;
  if (!(f << 24 >> 24)) {
   L = 244;
   break;
  } else o = y;
  b : while (1) {
   switch (f << 24 >> 24) {
   case 37:
    {
     f = o;
     L = 9;
     break b;
    }
   case 0:
    {
     f = o;
     break b;
    }
   default:
    {}
   }
   K = o + 1 | 0;
   f = a[K >> 0] | 0;
   o = K;
  }
  c : do if ((L | 0) == 9) while (1) {
   L = 0;
   if ((a[f + 1 >> 0] | 0) != 37) break c;
   o = o + 1 | 0;
   f = f + 2 | 0;
   if ((a[f >> 0] | 0) == 37) L = 9; else break;
  } while (0);
  w = o - y | 0;
  if (M) if (!(c[e >> 2] & 32)) ne(y, w, e) | 0;
  if ((o | 0) != (y | 0)) {
   o = w;
   y = f;
   continue;
  }
  r = f + 1 | 0;
  o = a[r >> 0] | 0;
  p = (o << 24 >> 24) + -48 | 0;
  if (p >>> 0 < 10) {
   K = (a[f + 2 >> 0] | 0) == 36;
   r = K ? f + 3 | 0 : r;
   o = a[r >> 0] | 0;
   u = K ? p : -1;
   n = K ? 1 : n;
  } else u = -1;
  f = o << 24 >> 24;
  d : do if ((f & -32 | 0) == 32) {
   p = 0;
   while (1) {
    if (!(1 << f + -32 & 75913)) {
     s = p;
     break d;
    }
    p = 1 << (o << 24 >> 24) + -32 | p;
    r = r + 1 | 0;
    o = a[r >> 0] | 0;
    f = o << 24 >> 24;
    if ((f & -32 | 0) != 32) {
     s = p;
     break;
    }
   }
  } else s = 0; while (0);
  do if (o << 24 >> 24 == 42) {
   o = r + 1 | 0;
   f = (a[o >> 0] | 0) + -48 | 0;
   if (f >>> 0 < 10) if ((a[r + 2 >> 0] | 0) == 36) {
    c[l + (f << 2) >> 2] = 10;
    n = 1;
    r = r + 3 | 0;
    f = c[j + ((a[o >> 0] | 0) + -48 << 3) >> 2] | 0;
   } else L = 24; else L = 24;
   if ((L | 0) == 24) {
    L = 0;
    if (n | 0) {
     m = -1;
     break a;
    }
    if (!M) {
     v = s;
     n = 0;
     r = o;
     K = 0;
     break;
    }
    n = (c[g >> 2] | 0) + (4 - 1) & ~(4 - 1);
    f = c[n >> 2] | 0;
    c[g >> 2] = n + 4;
    n = 0;
    r = o;
   }
   if ((f | 0) < 0) {
    v = s | 8192;
    K = 0 - f | 0;
   } else {
    v = s;
    K = f;
   }
  } else {
   p = (o << 24 >> 24) + -48 | 0;
   if (p >>> 0 < 10) {
    f = r;
    o = 0;
    do {
     o = (o * 10 | 0) + p | 0;
     f = f + 1 | 0;
     p = (a[f >> 0] | 0) + -48 | 0;
    } while (p >>> 0 < 10);
    if ((o | 0) < 0) {
     m = -1;
     break a;
    } else {
     v = s;
     r = f;
     K = o;
    }
   } else {
    v = s;
    K = 0;
   }
  } while (0);
  e : do if ((a[r >> 0] | 0) == 46) {
   f = r + 1 | 0;
   o = a[f >> 0] | 0;
   if (o << 24 >> 24 != 42) {
    p = (o << 24 >> 24) + -48 | 0;
    if (p >>> 0 < 10) o = 0; else {
     s = 0;
     break;
    }
    while (1) {
     o = (o * 10 | 0) + p | 0;
     f = f + 1 | 0;
     p = (a[f >> 0] | 0) + -48 | 0;
     if (p >>> 0 >= 10) {
      s = o;
      break e;
     }
    }
   }
   f = r + 2 | 0;
   o = (a[f >> 0] | 0) + -48 | 0;
   if (o >>> 0 < 10) if ((a[r + 3 >> 0] | 0) == 36) {
    c[l + (o << 2) >> 2] = 10;
    s = c[j + ((a[f >> 0] | 0) + -48 << 3) >> 2] | 0;
    f = r + 4 | 0;
    break;
   }
   if (n | 0) {
    m = -1;
    break a;
   }
   if (M) {
    J = (c[g >> 2] | 0) + (4 - 1) & ~(4 - 1);
    s = c[J >> 2] | 0;
    c[g >> 2] = J + 4;
   } else s = 0;
  } else {
   s = -1;
   f = r;
  } while (0);
  t = 0;
  while (1) {
   o = (a[f >> 0] | 0) + -65 | 0;
   if (o >>> 0 > 57) {
    m = -1;
    break a;
   }
   p = f + 1 | 0;
   o = a[6475 + (t * 58 | 0) + o >> 0] | 0;
   r = o & 255;
   if ((r + -1 | 0) >>> 0 < 8) {
    f = p;
    t = r;
   } else {
    J = p;
    break;
   }
  }
  if (!(o << 24 >> 24)) {
   m = -1;
   break;
  }
  p = (u | 0) > -1;
  do if (o << 24 >> 24 == 19) if (p) {
   m = -1;
   break a;
  } else L = 52; else {
   if (p) {
    c[l + (u << 2) >> 2] = r;
    H = j + (u << 3) | 0;
    I = c[H + 4 >> 2] | 0;
    L = ca;
    c[L >> 2] = c[H >> 2];
    c[L + 4 >> 2] = I;
    L = 52;
    break;
   }
   if (!M) {
    m = 0;
    break a;
   }
   pe(ca, r, g);
  } while (0);
  if ((L | 0) == 52) {
   L = 0;
   if (!M) {
    o = w;
    y = J;
    continue;
   }
  }
  u = a[f >> 0] | 0;
  u = (t | 0) != 0 & (u & 15 | 0) == 3 ? u & -33 : u;
  p = v & -65537;
  I = (v & 8192 | 0) == 0 ? v : p;
  f : do switch (u | 0) {
  case 110:
   switch (t | 0) {
   case 0:
    {
     c[c[ca >> 2] >> 2] = m;
     o = w;
     y = J;
     continue a;
    }
   case 1:
    {
     c[c[ca >> 2] >> 2] = m;
     o = w;
     y = J;
     continue a;
    }
   case 2:
    {
     o = c[ca >> 2] | 0;
     c[o >> 2] = m;
     c[o + 4 >> 2] = ((m | 0) < 0) << 31 >> 31;
     o = w;
     y = J;
     continue a;
    }
   case 3:
    {
     b[c[ca >> 2] >> 1] = m;
     o = w;
     y = J;
     continue a;
    }
   case 4:
    {
     a[c[ca >> 2] >> 0] = m;
     o = w;
     y = J;
     continue a;
    }
   case 6:
    {
     c[c[ca >> 2] >> 2] = m;
     o = w;
     y = J;
     continue a;
    }
   case 7:
    {
     o = c[ca >> 2] | 0;
     c[o >> 2] = m;
     c[o + 4 >> 2] = ((m | 0) < 0) << 31 >> 31;
     o = w;
     y = J;
     continue a;
    }
   default:
    {
     o = w;
     y = J;
     continue a;
    }
   }
  case 112:
   {
    t = I | 8;
    s = s >>> 0 > 8 ? s : 8;
    u = 120;
    L = 64;
    break;
   }
  case 88:
  case 120:
   {
    t = I;
    L = 64;
    break;
   }
  case 111:
   {
    p = ca;
    o = c[p >> 2] | 0;
    p = c[p + 4 >> 2] | 0;
    if ((o | 0) == 0 & (p | 0) == 0) f = N; else {
     f = N;
     do {
      f = f + -1 | 0;
      a[f >> 0] = o & 7 | 48;
      o = yf(o | 0, p | 0, 3) | 0;
      p = C;
     } while (!((o | 0) == 0 & (p | 0) == 0));
    }
    if (!(I & 8)) {
     o = I;
     t = 0;
     r = 6955;
     L = 77;
    } else {
     t = V - f | 0;
     o = I;
     s = (s | 0) > (t | 0) ? s : t + 1 | 0;
     t = 0;
     r = 6955;
     L = 77;
    }
    break;
   }
  case 105:
  case 100:
   {
    o = ca;
    f = c[o >> 2] | 0;
    o = c[o + 4 >> 2] | 0;
    if ((o | 0) < 0) {
     f = uf(0, 0, f | 0, o | 0) | 0;
     o = C;
     p = ca;
     c[p >> 2] = f;
     c[p + 4 >> 2] = o;
     p = 1;
     r = 6955;
     L = 76;
     break f;
    }
    if (!(I & 2048)) {
     r = I & 1;
     p = r;
     r = (r | 0) == 0 ? 6955 : 6957;
     L = 76;
    } else {
     p = 1;
     r = 6956;
     L = 76;
    }
    break;
   }
  case 117:
   {
    o = ca;
    f = c[o >> 2] | 0;
    o = c[o + 4 >> 2] | 0;
    p = 0;
    r = 6955;
    L = 76;
    break;
   }
  case 99:
   {
    a[W >> 0] = c[ca >> 2];
    f = W;
    u = 1;
    w = 0;
    v = 6955;
    o = N;
    break;
   }
  case 109:
   {
    o = re(c[(ee() | 0) >> 2] | 0) | 0;
    L = 82;
    break;
   }
  case 115:
   {
    o = c[ca >> 2] | 0;
    o = o | 0 ? o : 8857;
    L = 82;
    break;
   }
  case 67:
   {
    c[ha >> 2] = c[ca >> 2];
    c[X >> 2] = 0;
    c[ca >> 2] = ha;
    f = ha;
    s = -1;
    L = 86;
    break;
   }
  case 83:
   {
    f = c[ca >> 2] | 0;
    if (!s) {
     te(e, 32, K, 0, I);
     f = 0;
     L = 97;
    } else L = 86;
    break;
   }
  case 65:
  case 71:
  case 70:
  case 69:
  case 97:
  case 103:
  case 102:
  case 101:
   {
    q = +h[ca >> 3];
    c[fa >> 2] = 0;
    h[k >> 3] = q;
    if ((c[k + 4 >> 2] | 0) < 0) {
     q = -q;
     G = 1;
     H = 8864;
    } else if (!(I & 2048)) {
     H = I & 1;
     G = H;
     H = (H | 0) == 0 ? 8865 : 8870;
    } else {
     G = 1;
     H = 8867;
    }
    h[k >> 3] = q;
    F = c[k + 4 >> 2] & 2146435072;
    do if (F >>> 0 < 2146435072 | (F | 0) == 2146435072 & 0 < 0) {
     x = +we(q, fa) * 2.0;
     o = x != 0.0;
     if (o) c[fa >> 2] = (c[fa >> 2] | 0) + -1;
     D = u | 32;
     if ((D | 0) == 97) {
      v = u & 32;
      y = (v | 0) == 0 ? H : H + 9 | 0;
      w = G | 2;
      f = 12 - s | 0;
      do if (s >>> 0 > 11 | (f | 0) == 0) q = x; else {
       q = 8.0;
       do {
        f = f + -1 | 0;
        q = q * 16.0;
       } while ((f | 0) != 0);
       if ((a[y >> 0] | 0) == 45) {
        q = -(q + (-x - q));
        break;
       } else {
        q = x + q - q;
        break;
       }
      } while (0);
      o = c[fa >> 2] | 0;
      f = (o | 0) < 0 ? 0 - o | 0 : o;
      f = qe(f, ((f | 0) < 0) << 31 >> 31, $) | 0;
      if ((f | 0) == ($ | 0)) {
       a[aa >> 0] = 48;
       f = aa;
      }
      a[f + -1 >> 0] = (o >> 31 & 2) + 43;
      t = f + -2 | 0;
      a[t >> 0] = u + 15;
      r = (s | 0) < 1;
      p = (I & 8 | 0) == 0;
      o = ea;
      while (1) {
       H = ~~q;
       f = o + 1 | 0;
       a[o >> 0] = d[6939 + H >> 0] | v;
       q = (q - +(H | 0)) * 16.0;
       do if ((f - Y | 0) == 1) {
        if (p & (r & q == 0.0)) break;
        a[f >> 0] = 46;
        f = o + 2 | 0;
       } while (0);
       if (!(q != 0.0)) break; else o = f;
      }
      p = t;
      s = (s | 0) != 0 & (P + f | 0) < (s | 0) ? Q + s - p | 0 : O - p + f | 0;
      r = s + w | 0;
      te(e, 32, K, r, I);
      if (!(c[e >> 2] & 32)) ne(y, w, e) | 0;
      te(e, 48, K, r, I ^ 65536);
      o = f - Y | 0;
      if (!(c[e >> 2] & 32)) ne(ea, o, e) | 0;
      f = ba - p | 0;
      te(e, 48, s - (o + f) | 0, 0, 0);
      if (!(c[e >> 2] & 32)) ne(t, f, e) | 0;
      te(e, 32, K, r, I ^ 8192);
      f = (r | 0) < (K | 0) ? K : r;
      break;
     }
     f = (s | 0) < 0 ? 6 : s;
     if (o) {
      o = (c[fa >> 2] | 0) + -28 | 0;
      c[fa >> 2] = o;
      q = x * 268435456.0;
     } else {
      q = x;
      o = c[fa >> 2] | 0;
     }
     F = (o | 0) < 0 ? da : R;
     E = F;
     o = F;
     do {
      B = ~~q >>> 0;
      c[o >> 2] = B;
      o = o + 4 | 0;
      q = (q - +(B >>> 0)) * 1.0e9;
     } while (q != 0.0);
     p = o;
     o = c[fa >> 2] | 0;
     if ((o | 0) > 0) {
      s = F;
      while (1) {
       t = (o | 0) > 29 ? 29 : o;
       r = p + -4 | 0;
       do if (r >>> 0 < s >>> 0) r = s; else {
        o = 0;
        do {
         B = wf(c[r >> 2] | 0, 0, t | 0) | 0;
         B = xf(B | 0, C | 0, o | 0, 0) | 0;
         o = C;
         A = If(B | 0, o | 0, 1e9, 0) | 0;
         c[r >> 2] = A;
         o = Hf(B | 0, o | 0, 1e9, 0) | 0;
         r = r + -4 | 0;
        } while (r >>> 0 >= s >>> 0);
        if (!o) {
         r = s;
         break;
        }
        r = s + -4 | 0;
        c[r >> 2] = o;
       } while (0);
       while (1) {
        if (p >>> 0 <= r >>> 0) break;
        o = p + -4 | 0;
        if (!(c[o >> 2] | 0)) p = o; else break;
       }
       o = (c[fa >> 2] | 0) - t | 0;
       c[fa >> 2] = o;
       if ((o | 0) > 0) s = r; else break;
      }
     } else r = F;
     if ((o | 0) < 0) {
      y = ((f + 25 | 0) / 9 | 0) + 1 | 0;
      z = (D | 0) == 102;
      v = r;
      while (1) {
       w = 0 - o | 0;
       w = (w | 0) > 9 ? 9 : w;
       do if (v >>> 0 < p >>> 0) {
        o = (1 << w) + -1 | 0;
        s = 1e9 >>> w;
        r = 0;
        t = v;
        do {
         B = c[t >> 2] | 0;
         c[t >> 2] = (B >>> w) + r;
         r = _(B & o, s) | 0;
         t = t + 4 | 0;
        } while (t >>> 0 < p >>> 0);
        o = (c[v >> 2] | 0) == 0 ? v + 4 | 0 : v;
        if (!r) {
         r = o;
         break;
        }
        c[p >> 2] = r;
        r = o;
        p = p + 4 | 0;
       } else r = (c[v >> 2] | 0) == 0 ? v + 4 | 0 : v; while (0);
       o = z ? F : r;
       p = (p - o >> 2 | 0) > (y | 0) ? o + (y << 2) | 0 : p;
       o = (c[fa >> 2] | 0) + w | 0;
       c[fa >> 2] = o;
       if ((o | 0) >= 0) {
        z = r;
        break;
       } else v = r;
      }
     } else z = r;
     do if (z >>> 0 < p >>> 0) {
      o = (E - z >> 2) * 9 | 0;
      s = c[z >> 2] | 0;
      if (s >>> 0 < 10) break; else r = 10;
      do {
       r = r * 10 | 0;
       o = o + 1 | 0;
      } while (s >>> 0 >= r >>> 0);
     } else o = 0; while (0);
     A = (D | 0) == 103;
     B = (f | 0) != 0;
     r = f - ((D | 0) != 102 ? o : 0) + ((B & A) << 31 >> 31) | 0;
     if ((r | 0) < (((p - E >> 2) * 9 | 0) + -9 | 0)) {
      t = r + 9216 | 0;
      r = F + 4 + (((t | 0) / 9 | 0) + -1024 << 2) | 0;
      t = ((t | 0) % 9 | 0) + 1 | 0;
      if ((t | 0) < 9) {
       s = 10;
       do {
        s = s * 10 | 0;
        t = t + 1 | 0;
       } while ((t | 0) != 9);
      } else s = 10;
      w = c[r >> 2] | 0;
      y = (w >>> 0) % (s >>> 0) | 0;
      t = (r + 4 | 0) == (p | 0);
      do if (t & (y | 0) == 0) s = z; else {
       x = (((w >>> 0) / (s >>> 0) | 0) & 1 | 0) == 0 ? 9007199254740992.0 : 9007199254740994.0;
       v = (s | 0) / 2 | 0;
       if (y >>> 0 < v >>> 0) q = .5; else q = t & (y | 0) == (v | 0) ? 1.0 : 1.5;
       do if (G) {
        if ((a[H >> 0] | 0) != 45) break;
        x = -x;
        q = -q;
       } while (0);
       t = w - y | 0;
       c[r >> 2] = t;
       if (!(x + q != x)) {
        s = z;
        break;
       }
       D = t + s | 0;
       c[r >> 2] = D;
       if (D >>> 0 > 999999999) {
        o = z;
        while (1) {
         s = r + -4 | 0;
         c[r >> 2] = 0;
         if (s >>> 0 < o >>> 0) {
          o = o + -4 | 0;
          c[o >> 2] = 0;
         }
         D = (c[s >> 2] | 0) + 1 | 0;
         c[s >> 2] = D;
         if (D >>> 0 > 999999999) r = s; else {
          v = o;
          r = s;
          break;
         }
        }
       } else v = z;
       o = (E - v >> 2) * 9 | 0;
       t = c[v >> 2] | 0;
       if (t >>> 0 < 10) {
        s = v;
        break;
       } else s = 10;
       do {
        s = s * 10 | 0;
        o = o + 1 | 0;
       } while (t >>> 0 >= s >>> 0);
       s = v;
      } while (0);
      D = r + 4 | 0;
      z = s;
      p = p >>> 0 > D >>> 0 ? D : p;
     }
     w = 0 - o | 0;
     while (1) {
      if (p >>> 0 <= z >>> 0) {
       y = 0;
       D = p;
       break;
      }
      r = p + -4 | 0;
      if (!(c[r >> 2] | 0)) p = r; else {
       y = 1;
       D = p;
       break;
      }
     }
     do if (A) {
      f = (B & 1 ^ 1) + f | 0;
      if ((f | 0) > (o | 0) & (o | 0) > -5) {
       u = u + -1 | 0;
       f = f + -1 - o | 0;
      } else {
       u = u + -2 | 0;
       f = f + -1 | 0;
      }
      p = I & 8;
      if (p | 0) break;
      do if (y) {
       p = c[D + -4 >> 2] | 0;
       if (!p) {
        r = 9;
        break;
       }
       if (!((p >>> 0) % 10 | 0)) {
        s = 10;
        r = 0;
       } else {
        r = 0;
        break;
       }
       do {
        s = s * 10 | 0;
        r = r + 1 | 0;
       } while (!((p >>> 0) % (s >>> 0) | 0 | 0));
      } else r = 9; while (0);
      p = ((D - E >> 2) * 9 | 0) + -9 | 0;
      if ((u | 32 | 0) == 102) {
       p = p - r | 0;
       p = (p | 0) < 0 ? 0 : p;
       f = (f | 0) < (p | 0) ? f : p;
       p = 0;
       break;
      } else {
       p = p + o - r | 0;
       p = (p | 0) < 0 ? 0 : p;
       f = (f | 0) < (p | 0) ? f : p;
       p = 0;
       break;
      }
     } else p = I & 8; while (0);
     v = f | p;
     s = (v | 0) != 0 & 1;
     t = (u | 32 | 0) == 102;
     if (t) {
      o = (o | 0) > 0 ? o : 0;
      u = 0;
     } else {
      r = (o | 0) < 0 ? w : o;
      r = qe(r, ((r | 0) < 0) << 31 >> 31, $) | 0;
      if ((ba - r | 0) < 2) do {
       r = r + -1 | 0;
       a[r >> 0] = 48;
      } while ((ba - r | 0) < 2);
      a[r + -1 >> 0] = (o >> 31 & 2) + 43;
      E = r + -2 | 0;
      a[E >> 0] = u;
      o = ba - E | 0;
      u = E;
     }
     w = G + 1 + f + s + o | 0;
     te(e, 32, K, w, I);
     if (!(c[e >> 2] & 32)) ne(H, G, e) | 0;
     te(e, 48, K, w, I ^ 65536);
     do if (t) {
      r = z >>> 0 > F >>> 0 ? F : z;
      o = r;
      do {
       p = qe(c[o >> 2] | 0, 0, S) | 0;
       do if ((o | 0) == (r | 0)) {
        if ((p | 0) != (S | 0)) break;
        a[U >> 0] = 48;
        p = U;
       } else {
        if (p >>> 0 <= ea >>> 0) break;
        vf(ea | 0, 48, p - Y | 0) | 0;
        do p = p + -1 | 0; while (p >>> 0 > ea >>> 0);
       } while (0);
       if (!(c[e >> 2] & 32)) ne(p, T - p | 0, e) | 0;
       o = o + 4 | 0;
      } while (o >>> 0 <= F >>> 0);
      do if (v | 0) {
       if (c[e >> 2] & 32 | 0) break;
       ne(8899, 1, e) | 0;
      } while (0);
      if ((f | 0) > 0 & o >>> 0 < D >>> 0) {
       p = o;
       while (1) {
        o = qe(c[p >> 2] | 0, 0, S) | 0;
        if (o >>> 0 > ea >>> 0) {
         vf(ea | 0, 48, o - Y | 0) | 0;
         do o = o + -1 | 0; while (o >>> 0 > ea >>> 0);
        }
        if (!(c[e >> 2] & 32)) ne(o, (f | 0) > 9 ? 9 : f, e) | 0;
        p = p + 4 | 0;
        o = f + -9 | 0;
        if (!((f | 0) > 9 & p >>> 0 < D >>> 0)) {
         f = o;
         break;
        } else f = o;
       }
      }
      te(e, 48, f + 9 | 0, 9, 0);
     } else {
      t = y ? D : z + 4 | 0;
      if ((f | 0) > -1) {
       s = (p | 0) == 0;
       r = z;
       do {
        o = qe(c[r >> 2] | 0, 0, S) | 0;
        if ((o | 0) == (S | 0)) {
         a[U >> 0] = 48;
         o = U;
        }
        do if ((r | 0) == (z | 0)) {
         p = o + 1 | 0;
         if (!(c[e >> 2] & 32)) ne(o, 1, e) | 0;
         if (s & (f | 0) < 1) {
          o = p;
          break;
         }
         if (c[e >> 2] & 32 | 0) {
          o = p;
          break;
         }
         ne(8899, 1, e) | 0;
         o = p;
        } else {
         if (o >>> 0 <= ea >>> 0) break;
         vf(ea | 0, 48, o + Z | 0) | 0;
         do o = o + -1 | 0; while (o >>> 0 > ea >>> 0);
        } while (0);
        p = T - o | 0;
        if (!(c[e >> 2] & 32)) ne(o, (f | 0) > (p | 0) ? p : f, e) | 0;
        f = f - p | 0;
        r = r + 4 | 0;
       } while (r >>> 0 < t >>> 0 & (f | 0) > -1);
      }
      te(e, 48, f + 18 | 0, 18, 0);
      if (c[e >> 2] & 32 | 0) break;
      ne(u, ba - u | 0, e) | 0;
     } while (0);
     te(e, 32, K, w, I ^ 8192);
     f = (w | 0) < (K | 0) ? K : w;
    } else {
     t = (u & 32 | 0) != 0;
     s = q != q | 0.0 != 0.0;
     o = s ? 0 : G;
     r = o + 3 | 0;
     te(e, 32, K, r, p);
     f = c[e >> 2] | 0;
     if (!(f & 32)) {
      ne(H, o, e) | 0;
      f = c[e >> 2] | 0;
     }
     if (!(f & 32)) ne(s ? (t ? 8891 : 8895) : t ? 8883 : 8887, 3, e) | 0;
     te(e, 32, K, r, I ^ 8192);
     f = (r | 0) < (K | 0) ? K : r;
    } while (0);
    o = f;
    y = J;
    continue a;
   }
  default:
   {
    f = y;
    p = I;
    u = s;
    w = 0;
    v = 6955;
    o = N;
   }
  } while (0);
  g : do if ((L | 0) == 64) {
   p = ca;
   o = c[p >> 2] | 0;
   p = c[p + 4 >> 2] | 0;
   r = u & 32;
   if ((o | 0) == 0 & (p | 0) == 0) {
    f = N;
    o = t;
    t = 0;
    r = 6955;
    L = 77;
   } else {
    f = N;
    do {
     f = f + -1 | 0;
     a[f >> 0] = d[6939 + (o & 15) >> 0] | r;
     o = yf(o | 0, p | 0, 4) | 0;
     p = C;
    } while (!((o | 0) == 0 & (p | 0) == 0));
    L = ca;
    if ((t & 8 | 0) == 0 | (c[L >> 2] | 0) == 0 & (c[L + 4 >> 2] | 0) == 0) {
     o = t;
     t = 0;
     r = 6955;
     L = 77;
    } else {
     o = t;
     t = 2;
     r = 6955 + (u >> 4) | 0;
     L = 77;
    }
   }
  } else if ((L | 0) == 76) {
   f = qe(f, o, N) | 0;
   o = I;
   t = p;
   L = 77;
  } else if ((L | 0) == 82) {
   L = 0;
   I = se(o, 0, s) | 0;
   H = (I | 0) == 0;
   f = o;
   u = H ? s : I - o | 0;
   w = 0;
   v = 6955;
   o = H ? o + s | 0 : I;
  } else if ((L | 0) == 86) {
   L = 0;
   p = 0;
   o = 0;
   t = f;
   while (1) {
    r = c[t >> 2] | 0;
    if (!r) break;
    o = ue(ga, r) | 0;
    if ((o | 0) < 0 | o >>> 0 > (s - p | 0) >>> 0) break;
    p = o + p | 0;
    if (s >>> 0 > p >>> 0) t = t + 4 | 0; else break;
   }
   if ((o | 0) < 0) {
    m = -1;
    break a;
   }
   te(e, 32, K, p, I);
   if (!p) {
    f = 0;
    L = 97;
   } else {
    r = 0;
    while (1) {
     o = c[f >> 2] | 0;
     if (!o) {
      f = p;
      L = 97;
      break g;
     }
     o = ue(ga, o) | 0;
     r = o + r | 0;
     if ((r | 0) > (p | 0)) {
      f = p;
      L = 97;
      break g;
     }
     if (!(c[e >> 2] & 32)) ne(ga, o, e) | 0;
     if (r >>> 0 >= p >>> 0) {
      f = p;
      L = 97;
      break;
     } else f = f + 4 | 0;
    }
   }
  } while (0);
  if ((L | 0) == 97) {
   L = 0;
   te(e, 32, K, f, I ^ 8192);
   o = (K | 0) > (f | 0) ? K : f;
   y = J;
   continue;
  }
  if ((L | 0) == 77) {
   L = 0;
   p = (s | 0) > -1 ? o & -65537 : o;
   o = ca;
   o = (c[o >> 2] | 0) != 0 | (c[o + 4 >> 2] | 0) != 0;
   if ((s | 0) != 0 | o) {
    u = (o & 1 ^ 1) + (V - f) | 0;
    u = (s | 0) > (u | 0) ? s : u;
    w = t;
    v = r;
    o = N;
   } else {
    f = N;
    u = 0;
    w = t;
    v = r;
    o = N;
   }
  }
  t = o - f | 0;
  r = (u | 0) < (t | 0) ? t : u;
  s = w + r | 0;
  o = (K | 0) < (s | 0) ? s : K;
  te(e, 32, o, s, p);
  if (!(c[e >> 2] & 32)) ne(v, w, e) | 0;
  te(e, 48, o, s, p ^ 65536);
  te(e, 48, r, t, 0);
  if (!(c[e >> 2] & 32)) ne(f, t, e) | 0;
  te(e, 32, o, s, p ^ 8192);
  y = J;
 }
 h : do if ((L | 0) == 244) if (!e) if (!n) m = 0; else {
  m = 1;
  while (1) {
   n = c[l + (m << 2) >> 2] | 0;
   if (!n) break;
   pe(j + (m << 3) | 0, n, g);
   m = m + 1 | 0;
   if ((m | 0) >= 10) {
    m = 1;
    break h;
   }
  }
  if ((m | 0) < 10) while (1) {
   if (c[l + (m << 2) >> 2] | 0) {
    m = -1;
    break h;
   }
   m = m + 1 | 0;
   if ((m | 0) >= 10) {
    m = 1;
    break;
   }
  } else m = 1;
 } while (0);
 i = ia;
 return m | 0;
}

function _c(d, e, f, h, j, l) {
 d = d | 0;
 e = e | 0;
 f = f | 0;
 h = h | 0;
 j = j | 0;
 l = l | 0;
 var m = Ta, n = Ta, o = Ta, p = Ta, q = Ta, r = Ta, s = Ta, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, z = 0, A = 0, B = 0, C = Ta, D = Ta, E = Ta, F = Ta, G = Ta, H = Ta, I = Ta, J = Ta, K = 0, L = 0, M = 0, N = 0, P = 0, Q = 0, R = 0, S = 0, T = 0, U = 0, V = 0, W = 0;
 W = i;
 i = i + 144 | 0;
 v = W + 128 | 0;
 N = W + 24 | 0;
 Q = W + 72 | 0;
 P = W + 48 | 0;
 V = W;
 G = ba(g[h + 12 >> 2]);
 I = ba(g[l + 8 >> 2]);
 o = ba(G * I);
 F = ba(g[h + 8 >> 2]);
 p = ba(g[l + 12 >> 2]);
 o = ba(o - ba(F * p));
 p = ba(ba(I * F) + ba(G * p));
 I = ba(g[l >> 2]);
 I = ba(I - ba(g[h >> 2]));
 H = ba(g[l + 4 >> 2]);
 H = ba(H - ba(g[h + 4 >> 2]));
 q = ba(ba(G * I) + ba(F * H));
 I = ba(ba(G * H) - ba(F * I));
 R = d + 132 | 0;
 g[R >> 2] = q;
 S = d + 136 | 0;
 g[S >> 2] = I;
 T = d + 140 | 0;
 g[T >> 2] = o;
 U = d + 144 | 0;
 g[U >> 2] = p;
 F = ba(g[j + 12 >> 2]);
 H = ba(p * F);
 G = ba(g[j + 16 >> 2]);
 H = ba(q + ba(H - ba(o * G)));
 I = ba(ba(ba(F * o) + ba(p * G)) + I);
 g[d + 148 >> 2] = H;
 g[d + 152 >> 2] = I;
 y = f + 28 | 0;
 x = c[y >> 2] | 0;
 y = c[y + 4 >> 2] | 0;
 A = d + 156 | 0;
 c[A >> 2] = x;
 c[A + 4 >> 2] = y;
 A = d + 164 | 0;
 L = f + 12 | 0;
 w = c[L >> 2] | 0;
 L = c[L + 4 >> 2] | 0;
 B = A;
 c[B >> 2] = w;
 c[B + 4 >> 2] = L;
 B = d + 172 | 0;
 u = f + 20 | 0;
 t = c[u >> 2] | 0;
 u = c[u + 4 >> 2] | 0;
 K = B;
 c[K >> 2] = t;
 c[K + 4 >> 2] = u;
 K = f + 36 | 0;
 z = c[K >> 2] | 0;
 K = c[K + 4 >> 2] | 0;
 h = d + 180 | 0;
 c[h >> 2] = z;
 c[h + 4 >> 2] = K;
 h = b[f + 44 >> 1] | 0;
 l = (h & 255) << 24 >> 24 != 0;
 h = (h & 65535) > 255;
 G = (c[k >> 2] = t, ba(g[k >> 2]));
 p = (c[k >> 2] = w, ba(g[k >> 2]));
 o = ba(G - p);
 F = (c[k >> 2] = u, ba(g[k >> 2]));
 u = d + 168 | 0;
 q = (c[k >> 2] = L, ba(g[k >> 2]));
 m = ba(F - q);
 n = ba(O(ba(ba(o * o) + ba(m * m))));
 L = n < ba(1.1920929e-07);
 r = (c[k >> 2] = x, ba(g[k >> 2]));
 s = (c[k >> 2] = y, ba(g[k >> 2]));
 C = (c[k >> 2] = z, ba(g[k >> 2]));
 D = (c[k >> 2] = K, ba(g[k >> 2]));
 if (L) J = m; else {
  E = ba(ba(1.0) / n);
  J = ba(m * E);
  o = ba(o * E);
 }
 y = d + 196 | 0;
 E = ba(-o);
 g[y >> 2] = J;
 z = d + 200 | 0;
 g[z >> 2] = E;
 E = ba(ba(ba(H - p) * J) + ba(ba(I - q) * E));
 if (l) {
  p = ba(p - r);
  n = ba(q - s);
  m = ba(O(ba(ba(p * p) + ba(n * n))));
  if (m < ba(1.1920929e-07)) m = p; else {
   q = ba(ba(1.0) / m);
   m = ba(p * q);
   n = ba(n * q);
  }
  q = ba(-m);
  g[d + 188 >> 2] = n;
  g[d + 192 >> 2] = q;
  t = ba(ba(J * m) - ba(o * n)) >= ba(0.0);
  q = ba(ba(ba(H - r) * n) + ba(ba(I - s) * q));
 } else {
  t = 0;
  q = ba(0.0);
 }
 do if (h) {
  p = ba(C - G);
  m = ba(D - F);
  n = ba(O(ba(ba(p * p) + ba(m * m))));
  if (n < ba(1.1920929e-07)) n = m; else {
   D = ba(ba(1.0) / n);
   n = ba(m * D);
   p = ba(p * D);
  }
  m = ba(-p);
  g[d + 204 >> 2] = n;
  g[d + 208 >> 2] = m;
  f = ba(ba(o * n) - ba(J * p)) > ba(0.0);
  m = ba(ba(ba(H - G) * n) + ba(ba(I - F) * m));
  if (!l) {
   l = E >= ba(0.0);
   h = m >= ba(0.0);
   if (f) {
    L = l | h;
    a[d + 248 >> 0] = L & 1;
    h = d + 212 | 0;
    if (L) {
     L = y;
     x = c[L >> 2] | 0;
     L = c[L + 4 >> 2] | 0;
     K = h;
     c[K >> 2] = x;
     c[K + 4 >> 2] = L;
     g[d + 228 >> 2] = ba(-(c[k >> 2] = x, ba(g[k >> 2])));
     g[d + 232 >> 2] = o;
     x = d + 204 | 0;
     K = c[x + 4 >> 2] | 0;
     L = d + 236 | 0;
     c[L >> 2] = c[x >> 2];
     c[L + 4 >> 2] = K;
     break;
    } else {
     J = ba(-J);
     g[h >> 2] = J;
     g[d + 216 >> 2] = o;
     g[d + 228 >> 2] = J;
     g[d + 232 >> 2] = o;
     x = y;
     K = c[x + 4 >> 2] | 0;
     L = d + 236 | 0;
     c[L >> 2] = c[x >> 2];
     c[L + 4 >> 2] = K;
     break;
    }
   } else {
    L = l & h;
    a[d + 248 >> 0] = L & 1;
    h = d + 212 | 0;
    if (L) {
     K = y;
     x = c[K >> 2] | 0;
     K = c[K + 4 >> 2] | 0;
     L = h;
     c[L >> 2] = x;
     c[L + 4 >> 2] = K;
     g[d + 228 >> 2] = ba(-(c[k >> 2] = x, ba(g[k >> 2])));
     g[d + 232 >> 2] = o;
     L = d + 236 | 0;
     c[L >> 2] = x;
     c[L + 4 >> 2] = K;
     break;
    } else {
     g[h >> 2] = ba(-J);
     g[d + 216 >> 2] = o;
     I = ba(-ba(g[d + 204 >> 2]));
     J = ba(-ba(g[d + 208 >> 2]));
     g[d + 228 >> 2] = I;
     g[d + 232 >> 2] = J;
     x = y;
     K = c[x + 4 >> 2] | 0;
     L = d + 236 | 0;
     c[L >> 2] = c[x >> 2];
     c[L + 4 >> 2] = K;
     break;
    }
   }
  }
  if (t & f) {
   L = E >= ba(0.0) | q >= ba(0.0) | m >= ba(0.0);
   a[d + 248 >> 0] = L & 1;
   h = d + 212 | 0;
   if (L) {
    x = y;
    K = c[x + 4 >> 2] | 0;
    L = h;
    c[L >> 2] = c[x >> 2];
    c[L + 4 >> 2] = K;
    L = d + 188 | 0;
    K = c[L + 4 >> 2] | 0;
    x = d + 228 | 0;
    c[x >> 2] = c[L >> 2];
    c[x + 4 >> 2] = K;
    x = d + 204 | 0;
    K = c[x + 4 >> 2] | 0;
    L = d + 236 | 0;
    c[L >> 2] = c[x >> 2];
    c[L + 4 >> 2] = K;
    break;
   } else {
    J = ba(-J);
    g[h >> 2] = J;
    g[d + 216 >> 2] = o;
    g[d + 228 >> 2] = J;
    g[d + 232 >> 2] = o;
    g[d + 236 >> 2] = J;
    g[d + 240 >> 2] = o;
    break;
   }
  }
  if (t) {
   if (!(q >= ba(0.0))) {
    L = E >= ba(0.0) & m >= ba(0.0);
    a[d + 248 >> 0] = L & 1;
    h = d + 212 | 0;
    if (!L) {
     J = ba(-J);
     g[h >> 2] = J;
     g[d + 216 >> 2] = o;
     g[d + 228 >> 2] = ba(-n);
     g[d + 232 >> 2] = p;
     g[d + 236 >> 2] = J;
     g[d + 240 >> 2] = o;
     break;
    }
   } else {
    a[d + 248 >> 0] = 1;
    h = d + 212 | 0;
   }
   x = y;
   K = c[x + 4 >> 2] | 0;
   L = h;
   c[L >> 2] = c[x >> 2];
   c[L + 4 >> 2] = K;
   L = d + 188 | 0;
   K = c[L + 4 >> 2] | 0;
   x = d + 228 | 0;
   c[x >> 2] = c[L >> 2];
   c[x + 4 >> 2] = K;
   x = y;
   K = c[x + 4 >> 2] | 0;
   L = d + 236 | 0;
   c[L >> 2] = c[x >> 2];
   c[L + 4 >> 2] = K;
   break;
  }
  if (!f) {
   L = E >= ba(0.0) & q >= ba(0.0) & m >= ba(0.0);
   a[d + 248 >> 0] = L & 1;
   h = d + 212 | 0;
   if (L) {
    K = y;
    x = c[K >> 2] | 0;
    K = c[K + 4 >> 2] | 0;
    L = h;
    c[L >> 2] = x;
    c[L + 4 >> 2] = K;
    L = d + 228 | 0;
    c[L >> 2] = x;
    c[L + 4 >> 2] = K;
    L = d + 236 | 0;
    c[L >> 2] = x;
    c[L + 4 >> 2] = K;
    break;
   } else {
    g[h >> 2] = ba(-J);
    g[d + 216 >> 2] = o;
    g[d + 228 >> 2] = ba(-n);
    g[d + 232 >> 2] = p;
    I = ba(-ba(g[d + 188 >> 2]));
    J = ba(-ba(g[d + 192 >> 2]));
    g[d + 236 >> 2] = I;
    g[d + 240 >> 2] = J;
    break;
   }
  }
  if (!(m >= ba(0.0))) {
   L = E >= ba(0.0) & q >= ba(0.0);
   a[d + 248 >> 0] = L & 1;
   h = d + 212 | 0;
   if (!L) {
    I = ba(-J);
    g[h >> 2] = I;
    g[d + 216 >> 2] = o;
    g[d + 228 >> 2] = I;
    g[d + 232 >> 2] = o;
    I = ba(-ba(g[d + 188 >> 2]));
    J = ba(-ba(g[d + 192 >> 2]));
    g[d + 236 >> 2] = I;
    g[d + 240 >> 2] = J;
    break;
   }
  } else {
   a[d + 248 >> 0] = 1;
   h = d + 212 | 0;
  }
  K = y;
  L = c[K >> 2] | 0;
  K = c[K + 4 >> 2] | 0;
  x = h;
  c[x >> 2] = L;
  c[x + 4 >> 2] = K;
  x = d + 228 | 0;
  c[x >> 2] = L;
  c[x + 4 >> 2] = K;
  x = d + 204 | 0;
  K = c[x + 4 >> 2] | 0;
  L = d + 236 | 0;
  c[L >> 2] = c[x >> 2];
  c[L + 4 >> 2] = K;
 } else {
  if (!l) {
   L = E >= ba(0.0);
   a[d + 248 >> 0] = L & 1;
   h = d + 212 | 0;
   if (L) {
    x = y;
    L = c[x >> 2] | 0;
    x = c[x + 4 >> 2] | 0;
    K = h;
    c[K >> 2] = L;
    c[K + 4 >> 2] = x;
    J = ba(-(c[k >> 2] = L, ba(g[k >> 2])));
    g[d + 228 >> 2] = J;
    g[d + 232 >> 2] = o;
    g[d + 236 >> 2] = J;
    g[d + 240 >> 2] = o;
    break;
   } else {
    g[h >> 2] = ba(-J);
    g[d + 216 >> 2] = o;
    K = y;
    x = c[K >> 2] | 0;
    K = c[K + 4 >> 2] | 0;
    L = d + 228 | 0;
    c[L >> 2] = x;
    c[L + 4 >> 2] = K;
    L = d + 236 | 0;
    c[L >> 2] = x;
    c[L + 4 >> 2] = K;
    break;
   }
  }
  l = q >= ba(0.0);
  h = E >= ba(0.0);
  if (t) {
   L = h | l;
   a[d + 248 >> 0] = L & 1;
   h = d + 212 | 0;
   if (L) {
    x = y;
    L = c[x >> 2] | 0;
    x = c[x + 4 >> 2] | 0;
    w = h;
    c[w >> 2] = L;
    c[w + 4 >> 2] = x;
    w = d + 188 | 0;
    x = c[w + 4 >> 2] | 0;
    K = d + 228 | 0;
    c[K >> 2] = c[w >> 2];
    c[K + 4 >> 2] = x;
    g[d + 236 >> 2] = ba(-(c[k >> 2] = L, ba(g[k >> 2])));
    g[d + 240 >> 2] = o;
    break;
   } else {
    g[h >> 2] = ba(-J);
    g[d + 216 >> 2] = o;
    x = y;
    L = c[x >> 2] | 0;
    x = c[x + 4 >> 2] | 0;
    K = d + 228 | 0;
    c[K >> 2] = L;
    c[K + 4 >> 2] = x;
    g[d + 236 >> 2] = ba(-(c[k >> 2] = L, ba(g[k >> 2])));
    g[d + 240 >> 2] = o;
    break;
   }
  } else {
   L = h & l;
   a[d + 248 >> 0] = L & 1;
   h = d + 212 | 0;
   if (L) {
    x = y;
    L = c[x >> 2] | 0;
    x = c[x + 4 >> 2] | 0;
    K = h;
    c[K >> 2] = L;
    c[K + 4 >> 2] = x;
    K = d + 228 | 0;
    c[K >> 2] = L;
    c[K + 4 >> 2] = x;
    g[d + 236 >> 2] = ba(-(c[k >> 2] = L, ba(g[k >> 2])));
    g[d + 240 >> 2] = o;
    break;
   } else {
    g[h >> 2] = ba(-J);
    g[d + 216 >> 2] = o;
    x = y;
    K = c[x + 4 >> 2] | 0;
    L = d + 228 | 0;
    c[L >> 2] = c[x >> 2];
    c[L + 4 >> 2] = K;
    I = ba(-ba(g[d + 188 >> 2]));
    J = ba(-ba(g[d + 192 >> 2]));
    g[d + 236 >> 2] = I;
    g[d + 240 >> 2] = J;
    break;
   }
  }
 } while (0);
 l = j + 148 | 0;
 h = c[l >> 2] | 0;
 t = d + 128 | 0;
 c[t >> 2] = h;
 if ((h | 0) > 0) {
  h = 0;
  do {
   G = ba(g[U >> 2]);
   I = ba(g[j + 20 + (h << 3) >> 2]);
   F = ba(G * I);
   H = ba(g[T >> 2]);
   J = ba(g[j + 20 + (h << 3) + 4 >> 2]);
   F = ba(F - ba(H * J));
   F = ba(ba(g[R >> 2]) + F);
   J = ba(ba(I * H) + ba(G * J));
   J = ba(J + ba(g[S >> 2]));
   g[d + (h << 3) >> 2] = F;
   g[d + (h << 3) + 4 >> 2] = J;
   J = ba(g[U >> 2]);
   F = ba(g[j + 84 + (h << 3) >> 2]);
   G = ba(J * F);
   H = ba(g[T >> 2]);
   I = ba(g[j + 84 + (h << 3) + 4 >> 2]);
   J = ba(ba(F * H) + ba(J * I));
   g[d + 64 + (h << 3) >> 2] = ba(G - ba(H * I));
   g[d + 64 + (h << 3) + 4 >> 2] = J;
   h = h + 1 | 0;
  } while ((h | 0) < (c[l >> 2] | 0));
  h = c[t >> 2] | 0;
 }
 K = d + 244 | 0;
 g[K >> 2] = ba(.0199999996);
 L = e + 60 | 0;
 c[L >> 2] = 0;
 x = d + 248 | 0;
 if ((h | 0) <= 0) {
  i = W;
  return;
 }
 s = ba(g[d + 164 >> 2]);
 m = ba(g[u >> 2]);
 o = ba(g[d + 212 >> 2]);
 p = ba(g[d + 216 >> 2]);
 r = ba(3402823469999999843913219.0e14);
 n = ba(3402823469999999843913219.0e14);
 f = 0;
 while (1) {
  q = ba(ba(g[d + (f << 3) >> 2]) - s);
  q = ba(ba(o * q) + ba(p * ba(ba(g[d + (f << 3) + 4 >> 2]) - m)));
  l = q < r;
  n = l ? q : n;
  f = f + 1 | 0;
  if ((f | 0) == (h | 0)) break; else r = l ? q : r;
 }
 if (n > ba(.0199999996)) {
  i = W;
  return;
 }
 $c(v, d);
 l = c[v >> 2] | 0;
 if (!l) M = 58; else {
  m = ba(g[v + 8 >> 2]);
  if (!(m > ba(g[K >> 2]))) if (m > ba(ba(n * ba(.980000019)) + ba(.00100000005))) {
   v = c[v + 4 >> 2] | 0;
   h = e + 56 | 0;
   if ((l | 0) == 1) {
    u = Q;
    w = N;
    v = N;
    M = 60;
   } else {
    c[h >> 2] = 2;
    f = A;
    z = c[f + 4 >> 2] | 0;
    l = N;
    c[l >> 2] = c[f >> 2];
    c[l + 4 >> 2] = z;
    l = N + 8 | 0;
    a[l >> 0] = 0;
    z = v & 255;
    a[l + 1 >> 0] = z;
    a[l + 2 >> 0] = 0;
    a[l + 3 >> 0] = 1;
    l = B;
    f = c[l + 4 >> 2] | 0;
    h = N + 12 | 0;
    c[h >> 2] = c[l >> 2];
    c[h + 4 >> 2] = f;
    h = N + 20 | 0;
    a[h >> 0] = 0;
    a[h + 1 >> 0] = z;
    a[h + 2 >> 0] = 0;
    a[h + 3 >> 0] = 1;
    c[Q >> 2] = v;
    h = v + 1 | 0;
    h = (h | 0) < (c[t >> 2] | 0) ? h : 0;
    c[Q + 4 >> 2] = h;
    z = Q + 8 | 0;
    f = d + (v << 3) | 0;
    t = c[f >> 2] | 0;
    f = c[f + 4 >> 2] | 0;
    l = z;
    c[l >> 2] = t;
    c[l + 4 >> 2] = f;
    h = d + (h << 3) | 0;
    l = c[h >> 2] | 0;
    h = c[h + 4 >> 2] | 0;
    B = Q + 16 | 0;
    c[B >> 2] = l;
    c[B + 4 >> 2] = h;
    B = Q + 24 | 0;
    u = d + 64 + (v << 3) | 0;
    w = c[u >> 2] | 0;
    u = c[u + 4 >> 2] | 0;
    A = B;
    c[A >> 2] = w;
    c[A + 4 >> 2] = u;
    A = Q;
    m = (c[k >> 2] = w, ba(g[k >> 2]));
    w = N;
    x = 0;
    M = 67;
   }
  } else M = 58;
 }
 if ((M | 0) == 58) {
  u = Q;
  w = N;
  v = N;
  h = e + 56 | 0;
  M = 60;
 }
 do if ((M | 0) == 60) {
  c[h >> 2] = 1;
  t = c[t >> 2] | 0;
  if ((t | 0) > 1) {
   m = ba(g[d + 212 >> 2]);
   p = ba(m * ba(g[d + 64 >> 2]));
   n = ba(g[d + 216 >> 2]);
   h = 0;
   p = ba(p + ba(n * ba(g[d + 68 >> 2])));
   f = 1;
   while (1) {
    o = ba(m * ba(g[d + 64 + (f << 3) >> 2]));
    o = ba(o + ba(n * ba(g[d + 64 + (f << 3) + 4 >> 2])));
    l = o < p;
    h = l ? f : h;
    f = f + 1 | 0;
    if ((f | 0) >= (t | 0)) break; else p = l ? o : p;
   }
  } else h = 0;
  M = h + 1 | 0;
  M = (M | 0) < (t | 0) ? M : 0;
  t = d + (h << 3) | 0;
  v = c[t + 4 >> 2] | 0;
  u = N;
  c[u >> 2] = c[t >> 2];
  c[u + 4 >> 2] = v;
  u = N + 8 | 0;
  a[u >> 0] = 0;
  a[u + 1 >> 0] = h;
  a[u + 2 >> 0] = 1;
  a[u + 3 >> 0] = 0;
  u = d + (M << 3) | 0;
  v = c[u + 4 >> 2] | 0;
  d = N + 12 | 0;
  c[d >> 2] = c[u >> 2];
  c[d + 4 >> 2] = v;
  N = N + 20 | 0;
  a[N >> 0] = 0;
  a[N + 1 >> 0] = M;
  a[N + 2 >> 0] = 1;
  a[N + 3 >> 0] = 0;
  if (!(a[x >> 0] | 0)) {
   c[Q >> 2] = 1;
   c[Q + 4 >> 2] = 0;
   u = Q + 8 | 0;
   f = B;
   t = c[f >> 2] | 0;
   f = c[f + 4 >> 2] | 0;
   h = u;
   c[h >> 2] = t;
   c[h + 4 >> 2] = f;
   h = A;
   l = c[h >> 2] | 0;
   h = c[h + 4 >> 2] | 0;
   A = Q + 16 | 0;
   c[A >> 2] = l;
   c[A + 4 >> 2] = h;
   m = ba(-ba(g[y >> 2]));
   J = ba(-ba(g[z >> 2]));
   g[Q + 24 >> 2] = m;
   g[Q + 28 >> 2] = J;
   z = u;
   A = Q;
   B = Q + 24 | 0;
   u = (g[k >> 2] = J, c[k >> 2] | 0);
   v = 1;
   x = 1;
   M = 67;
   break;
  } else {
   c[Q >> 2] = 0;
   c[Q + 4 >> 2] = 1;
   z = Q + 8 | 0;
   f = A;
   t = c[f >> 2] | 0;
   f = c[f + 4 >> 2] | 0;
   h = z;
   c[h >> 2] = t;
   c[h + 4 >> 2] = f;
   h = B;
   l = c[h >> 2] | 0;
   h = c[h + 4 >> 2] | 0;
   B = Q + 16 | 0;
   c[B >> 2] = l;
   c[B + 4 >> 2] = h;
   B = Q + 24 | 0;
   u = y;
   v = c[u >> 2] | 0;
   u = c[u + 4 >> 2] | 0;
   A = B;
   c[A >> 2] = v;
   c[A + 4 >> 2] = u;
   A = Q;
   m = (c[k >> 2] = v, ba(g[k >> 2]));
   v = 0;
   x = 1;
   M = 67;
   break;
  }
 } while (0);
 if ((M | 0) == 67) {
  E = (c[k >> 2] = t, ba(g[k >> 2]));
  F = (c[k >> 2] = f, ba(g[k >> 2]));
  G = (c[k >> 2] = l, ba(g[k >> 2]));
  I = (c[k >> 2] = h, ba(g[k >> 2]));
  N = Q + 32 | 0;
  y = Q + 28 | 0;
  t = Q + 24 | 0;
  J = ba(-m);
  c[N >> 2] = u;
  g[Q + 36 >> 2] = J;
  l = Q + 44 | 0;
  D = (c[k >> 2] = u, ba(g[k >> 2]));
  H = ba(-D);
  g[l >> 2] = H;
  g[Q + 48 >> 2] = m;
  f = Q + 8 | 0;
  u = Q + 12 | 0;
  J = ba(ba(D * E) + ba(F * J));
  g[Q + 40 >> 2] = J;
  h = Q + 52 | 0;
  g[h >> 2] = ba(ba(G * H) + ba(m * I));
  if ((fd(P, w, N, J, v) | 0) >= 2) {
   J = ba(g[h >> 2]);
   if ((fd(V, P, l, J, c[Q + 4 >> 2] | 0) | 0) >= 2) {
    h = e + 40 | 0;
    if (x) {
     Q = B;
     j = c[Q >> 2] | 0;
     Q = c[Q + 4 >> 2] | 0;
     N = h;
     c[N >> 2] = j;
     c[N + 4 >> 2] = Q;
     N = z;
     Q = c[N >> 2] | 0;
     N = c[N + 4 >> 2] | 0;
     P = e + 48 | 0;
     c[P >> 2] = Q;
     c[P + 4 >> 2] = N;
     q = (c[k >> 2] = Q, ba(g[k >> 2]));
     s = (c[k >> 2] = j, ba(g[k >> 2]));
     r = ba(g[u >> 2]);
     p = ba(g[y >> 2]);
     m = ba(g[V >> 2]);
     J = ba(m - q);
     n = ba(g[V + 4 >> 2]);
     J = ba(ba(J * s) + ba(ba(n - r) * p));
     o = ba(g[K >> 2]);
     if (!(J <= o)) h = 0; else {
      o = ba(m - ba(g[R >> 2]));
      I = ba(n - ba(g[S >> 2]));
      G = ba(g[U >> 2]);
      H = ba(o * G);
      J = ba(g[T >> 2]);
      o = ba(ba(G * I) - ba(o * J));
      g[e >> 2] = ba(H + ba(I * J));
      g[e + 4 >> 2] = o;
      c[e + 16 >> 2] = c[V + 8 >> 2];
      o = ba(g[K >> 2]);
      h = 1;
     }
     n = ba(g[V + 12 >> 2]);
     J = ba(n - q);
     m = ba(g[V + 16 >> 2]);
     if (ba(ba(J * s) + ba(ba(m - r) * p)) <= o) {
      J = ba(n - ba(g[R >> 2]));
      H = ba(m - ba(g[S >> 2]));
      F = ba(g[U >> 2]);
      G = ba(J * F);
      I = ba(g[T >> 2]);
      J = ba(ba(F * H) - ba(J * I));
      g[e + (h * 20 | 0) >> 2] = ba(G + ba(H * I));
      g[e + (h * 20 | 0) + 4 >> 2] = J;
      c[e + (h * 20 | 0) + 16 >> 2] = c[V + 20 >> 2];
      h = h + 1 | 0;
     }
    } else {
     S = c[A >> 2] | 0;
     R = j + 84 + (S << 3) | 0;
     U = c[R + 4 >> 2] | 0;
     T = h;
     c[T >> 2] = c[R >> 2];
     c[T + 4 >> 2] = U;
     S = j + 20 + (S << 3) | 0;
     T = c[S + 4 >> 2] | 0;
     U = e + 48 | 0;
     c[U >> 2] = c[S >> 2];
     c[U + 4 >> 2] = T;
     q = ba(g[f >> 2]);
     p = ba(g[t >> 2]);
     o = ba(g[u >> 2]);
     n = ba(g[y >> 2]);
     J = ba(ba(g[V >> 2]) - q);
     J = ba(ba(J * p) + ba(ba(ba(g[V + 4 >> 2]) - o) * n));
     m = ba(g[K >> 2]);
     if (!(J <= m)) h = 0; else {
      T = V;
      h = c[T + 4 >> 2] | 0;
      U = e;
      c[U >> 2] = c[T >> 2];
      c[U + 4 >> 2] = h;
      U = V + 8 | 0;
      h = e + 16 | 0;
      a[h + 2 >> 0] = a[U + 3 >> 0] | 0;
      a[h + 3 >> 0] = a[U + 2 >> 0] | 0;
      a[h >> 0] = a[U + 1 >> 0] | 0;
      a[h + 1 >> 0] = a[U >> 0] | 0;
      m = ba(g[K >> 2]);
      h = 1;
     }
     l = V + 12 | 0;
     J = ba(ba(g[l >> 2]) - q);
     if (ba(ba(J * p) + ba(ba(ba(g[V + 16 >> 2]) - o) * n)) <= m) {
      S = l;
      T = c[S + 4 >> 2] | 0;
      U = e + (h * 20 | 0) | 0;
      c[U >> 2] = c[S >> 2];
      c[U + 4 >> 2] = T;
      V = V + 20 | 0;
      e = e + (h * 20 | 0) + 16 | 0;
      a[e + 2 >> 0] = a[V + 3 >> 0] | 0;
      a[e + 3 >> 0] = a[V + 2 >> 0] | 0;
      a[e >> 0] = a[V + 1 >> 0] | 0;
      a[e + 1 >> 0] = a[V >> 0] | 0;
      h = h + 1 | 0;
     }
    }
    c[L >> 2] = h;
   }
  }
 }
 i = W;
 return;
}

function sc(d, f) {
 d = d | 0;
 f = f | 0;
 var h = 0, j = 0, l = Ta, m = 0, n = 0, o = 0, p = Ta, q = 0, r = 0, s = 0, t = 0, u = 0, v = Ta, w = 0, x = 0, y = 0, z = 0, A = 0, B = 0, C = 0, D = 0, E = 0, F = 0, G = 0, H = 0, I = 0, J = 0, K = 0, L = 0, M = 0, N = 0, O = 0, P = 0, Q = 0, R = 0, S = 0, T = 0, U = 0, V = 0, W = 0, X = 0, Y = 0, Z = 0, _ = 0, $ = 0, aa = 0, ca = 0, da = 0, ea = 0, fa = 0, ga = 0, ha = 0, ia = 0, ja = 0, ka = 0, la = 0, ma = 0, na = 0, oa = 0, pa = 0, qa = 0, ra = 0, sa = 0, ta = 0, ua = 0, wa = Ta, xa = Ta, ya = Ta, za = Ta;
 ua = i;
 i = i + 272 | 0;
 ta = ua + 216 | 0;
 qa = ua + 84 | 0;
 ra = ua + 48 | 0;
 pa = ua + 40 | 0;
 oa = ua;
 ma = d + 102872 | 0;
 na = d + 102944 | 0;
 Ed(ta, 64, 32, 0, d + 68 | 0, c[na >> 2] | 0);
 sa = d + 102995 | 0;
 if (!(a[sa >> 0] | 0)) j = d + 102932 | 0; else {
  h = c[d + 102952 >> 2] | 0;
  if (h | 0) do {
   la = h + 4 | 0;
   b[la >> 1] = e[la >> 1] & 65534;
   g[h + 60 >> 2] = ba(0.0);
   h = c[h + 96 >> 2] | 0;
  } while ((h | 0) != 0);
  j = d + 102932 | 0;
  h = c[j >> 2] | 0;
  if (h) do {
   la = h + 4 | 0;
   c[la >> 2] = c[la >> 2] & -34;
   c[h + 128 >> 2] = 0;
   g[h + 132 >> 2] = ba(1.0);
   h = c[h + 12 >> 2] | 0;
  } while ((h | 0) != 0);
 }
 Z = ta + 28 | 0;
 _ = ta + 36 | 0;
 $ = ta + 32 | 0;
 aa = ta + 40 | 0;
 ca = ta + 8 | 0;
 da = ta + 44 | 0;
 ea = ta + 12 | 0;
 fa = pa + 4 | 0;
 ga = oa + 4 | 0;
 ha = oa + 8 | 0;
 ia = oa + 16 | 0;
 ja = f + 12 | 0;
 ka = oa + 12 | 0;
 la = oa + 20 | 0;
 N = d + 102994 | 0;
 O = qa + 16 | 0;
 P = qa + 20 | 0;
 Q = qa + 24 | 0;
 R = qa + 44 | 0;
 S = qa + 48 | 0;
 T = qa + 52 | 0;
 U = qa + 28 | 0;
 V = qa + 56 | 0;
 W = qa + 92 | 0;
 X = qa + 128 | 0;
 Y = ra + 4 | 0;
 h = c[j >> 2] | 0;
 a : do if (h | 0) {
  v = ba(1.0);
  w = 0;
  b : while (1) {
   u = h + 4 | 0;
   d = c[u >> 2] | 0;
   do if (d & 4) if ((c[h + 128 >> 2] | 0) <= 8) {
    if (!(d & 32)) {
     s = c[h + 48 >> 2] | 0;
     t = c[h + 52 >> 2] | 0;
     if (a[s + 38 >> 0] | 0) break;
     if (a[t + 38 >> 0] | 0) break;
     q = c[s + 8 >> 2] | 0;
     r = c[t + 8 >> 2] | 0;
     d = c[q >> 2] | 0;
     m = c[r >> 2] | 0;
     if (!((d | 0) == 2 | (m | 0) == 2)) {
      h = 16;
      break b;
     }
     n = b[q + 4 >> 1] | 0;
     o = b[r + 4 >> 1] | 0;
     if (!((d | 0) != 0 & (n & 2) != 0 | (m | 0) != 0 & (o & 2) != 0)) break;
     if (!((d | 0) != 2 | (n & 8) != 0 | ((m | 0) != 2 | (o & 8) != 0))) break;
     n = q + 28 | 0;
     d = q + 60 | 0;
     l = ba(g[d >> 2]);
     o = r + 28 | 0;
     m = r + 60 | 0;
     p = ba(g[m >> 2]);
     if (l < p) {
      if (!(l < ba(1.0))) {
       h = 21;
       break b;
      }
      l = ba(ba(p - l) / ba(ba(1.0) - l));
      wa = ba(ba(1.0) - l);
      L = q + 36 | 0;
      za = ba(wa * ba(g[L >> 2]));
      M = q + 40 | 0;
      xa = ba(wa * ba(g[M >> 2]));
      ya = ba(l * ba(g[q + 44 >> 2]));
      xa = ba(xa + ba(l * ba(g[q + 48 >> 2])));
      g[L >> 2] = ba(za + ya);
      g[M >> 2] = xa;
      M = q + 52 | 0;
      wa = ba(wa * ba(g[M >> 2]));
      g[M >> 2] = ba(wa + ba(l * ba(g[q + 56 >> 2])));
      g[d >> 2] = p;
      l = p;
     } else if (p < l) {
      if (!(p < ba(1.0))) {
       h = 25;
       break b;
      }
      za = ba(ba(l - p) / ba(ba(1.0) - p));
      ya = ba(ba(1.0) - za);
      L = r + 36 | 0;
      p = ba(ya * ba(g[L >> 2]));
      M = r + 40 | 0;
      xa = ba(ya * ba(g[M >> 2]));
      wa = ba(za * ba(g[r + 44 >> 2]));
      xa = ba(xa + ba(za * ba(g[r + 48 >> 2])));
      g[L >> 2] = ba(p + wa);
      g[M >> 2] = xa;
      M = r + 52 | 0;
      ya = ba(ya * ba(g[M >> 2]));
      g[M >> 2] = ba(ya + ba(za * ba(g[r + 56 >> 2])));
      g[m >> 2] = l;
     }
     if (!(l < ba(1.0))) {
      h = 28;
      break b;
     }
     K = c[h + 56 >> 2] | 0;
     L = c[h + 60 >> 2] | 0;
     c[O >> 2] = 0;
     c[P >> 2] = 0;
     g[Q >> 2] = ba(0.0);
     c[R >> 2] = 0;
     c[S >> 2] = 0;
     g[T >> 2] = ba(0.0);
     hd(qa, c[s + 12 >> 2] | 0, K);
     hd(U, c[t + 12 >> 2] | 0, L);
     L = V;
     K = L + 36 | 0;
     do {
      c[L >> 2] = c[n >> 2];
      L = L + 4 | 0;
      n = n + 4 | 0;
     } while ((L | 0) < (K | 0));
     L = W;
     n = o;
     K = L + 36 | 0;
     do {
      c[L >> 2] = c[n >> 2];
      L = L + 4 | 0;
      n = n + 4 | 0;
     } while ((L | 0) < (K | 0));
     g[X >> 2] = ba(1.0);
     td(ra, qa);
     if ((c[ra >> 2] | 0) == 3) {
      l = ba(l + ba(ba(ba(1.0) - l) * ba(g[Y >> 2])));
      M = l < ba(1.0);
      l = M ? l : ba(1.0);
     } else l = ba(1.0);
     g[h + 132 >> 2] = l;
     c[u >> 2] = c[u >> 2] | 32;
    } else l = ba(g[h + 132 >> 2]);
    M = l < v;
    v = M ? l : v;
    w = M ? h : w;
   } while (0);
   h = c[h + 12 >> 2] | 0;
   if (h | 0) continue;
   if (v > ba(.999998807) | (w | 0) == 0) break a;
   d = c[(c[w + 48 >> 2] | 0) + 8 >> 2] | 0;
   M = c[(c[w + 52 >> 2] | 0) + 8 >> 2] | 0;
   I = d + 28 | 0;
   L = qa;
   n = I;
   K = L + 36 | 0;
   do {
    c[L >> 2] = c[n >> 2];
    L = L + 4 | 0;
    n = n + 4 | 0;
   } while ((L | 0) < (K | 0));
   J = M + 28 | 0;
   L = ra;
   n = J;
   K = L + 36 | 0;
   do {
    c[L >> 2] = c[n >> 2];
    L = L + 4 | 0;
    n = n + 4 | 0;
   } while ((L | 0) < (K | 0));
   h = d + 60 | 0;
   l = ba(g[h >> 2]);
   if (!(l < ba(1.0))) {
    h = 36;
    break;
   }
   ya = ba(ba(v - l) / ba(ba(1.0) - l));
   wa = ba(ba(1.0) - ya);
   H = d + 36 | 0;
   l = ba(wa * ba(g[H >> 2]));
   D = d + 40 | 0;
   xa = ba(wa * ba(g[D >> 2]));
   F = d + 44 | 0;
   za = ba(ya * ba(g[F >> 2]));
   G = d + 48 | 0;
   xa = ba(xa + ba(ya * ba(g[G >> 2])));
   g[H >> 2] = ba(l + za);
   g[D >> 2] = xa;
   D = d + 52 | 0;
   wa = ba(wa * ba(g[D >> 2]));
   H = d + 56 | 0;
   ya = ba(wa + ba(ya * ba(g[H >> 2])));
   g[D >> 2] = ya;
   g[h >> 2] = v;
   D = d + 36 | 0;
   E = c[D >> 2] | 0;
   D = c[D + 4 >> 2] | 0;
   z = d + 44 | 0;
   c[z >> 2] = E;
   c[z + 4 >> 2] = D;
   g[H >> 2] = ya;
   wa = ba(Ne(ya));
   z = d + 20 | 0;
   g[z >> 2] = wa;
   ya = ba(Me(ya));
   A = d + 24 | 0;
   g[A >> 2] = ya;
   B = d + 28 | 0;
   xa = ba(g[B >> 2]);
   za = ba(ya * xa);
   C = d + 32 | 0;
   l = ba(g[C >> 2]);
   za = ba(za - ba(wa * l));
   l = ba(ba(wa * xa) + ba(ya * l));
   za = ba((c[k >> 2] = E, ba(g[k >> 2])) - za);
   l = ba((c[k >> 2] = D, ba(g[k >> 2])) - l);
   D = d + 12 | 0;
   g[D >> 2] = za;
   E = d + 16 | 0;
   g[E >> 2] = l;
   h = M + 60 | 0;
   l = ba(g[h >> 2]);
   if (!(l < ba(1.0))) {
    h = 38;
    break;
   }
   xa = ba(ba(v - l) / ba(ba(1.0) - l));
   p = ba(ba(1.0) - xa);
   y = M + 36 | 0;
   za = ba(p * ba(g[y >> 2]));
   s = M + 40 | 0;
   wa = ba(p * ba(g[s >> 2]));
   u = M + 44 | 0;
   ya = ba(xa * ba(g[u >> 2]));
   x = M + 48 | 0;
   wa = ba(wa + ba(xa * ba(g[x >> 2])));
   g[y >> 2] = ba(za + ya);
   g[s >> 2] = wa;
   s = M + 52 | 0;
   p = ba(p * ba(g[s >> 2]));
   y = M + 56 | 0;
   xa = ba(p + ba(xa * ba(g[y >> 2])));
   g[s >> 2] = xa;
   g[h >> 2] = v;
   s = M + 36 | 0;
   t = c[s >> 2] | 0;
   s = c[s + 4 >> 2] | 0;
   m = M + 44 | 0;
   c[m >> 2] = t;
   c[m + 4 >> 2] = s;
   g[y >> 2] = xa;
   p = ba(Ne(xa));
   m = M + 20 | 0;
   g[m >> 2] = p;
   xa = ba(Me(xa));
   o = M + 24 | 0;
   g[o >> 2] = xa;
   q = M + 28 | 0;
   wa = ba(g[q >> 2]);
   ya = ba(xa * wa);
   r = M + 32 | 0;
   za = ba(g[r >> 2]);
   ya = ba(ya - ba(p * za));
   za = ba(ba(p * wa) + ba(xa * za));
   ya = ba((c[k >> 2] = t, ba(g[k >> 2])) - ya);
   za = ba((c[k >> 2] = s, ba(g[k >> 2])) - za);
   s = M + 12 | 0;
   g[s >> 2] = ya;
   t = M + 16 | 0;
   g[t >> 2] = za;
   Cc(w, c[na >> 2] | 0);
   K = w + 4 | 0;
   h = c[K >> 2] | 0;
   L = h & -33;
   c[K >> 2] = L;
   n = w + 128 | 0;
   c[n >> 2] = (c[n >> 2] | 0) + 1;
   if ((h & 6 | 0) == 6) {
    n = d + 4 | 0;
    h = e[n >> 1] | 0;
    if (!(h & 2)) {
     b[n >> 1] = h | 2;
     g[d + 144 >> 2] = ba(0.0);
    }
    m = M + 4 | 0;
    h = e[m >> 1] | 0;
    if (!(h & 2)) {
     b[m >> 1] = h | 2;
     g[M + 144 >> 2] = ba(0.0);
    }
    c[Z >> 2] = 0;
    c[_ >> 2] = 0;
    c[$ >> 2] = 0;
    h = c[aa >> 2] | 0;
    if ((h | 0) <= 0) {
     h = 47;
     break;
    }
    x = d + 8 | 0;
    c[x >> 2] = 0;
    c[c[ca >> 2] >> 2] = d;
    c[Z >> 2] = 1;
    if ((h | 0) <= 1) {
     h = 49;
     break;
    }
    u = M + 8 | 0;
    c[u >> 2] = 1;
    c[(c[ca >> 2] | 0) + 4 >> 2] = M;
    c[Z >> 2] = 2;
    if ((c[da >> 2] | 0) <= 0) {
     h = 51;
     break;
    }
    c[_ >> 2] = 1;
    c[c[ea >> 2] >> 2] = w;
    b[n >> 1] = e[n >> 1] | 1;
    b[m >> 1] = e[m >> 1] | 1;
    c[K >> 2] = L | 1;
    c[pa >> 2] = d;
    c[fa >> 2] = M;
    h = 0;
    while (1) {
     c : do if ((c[d >> 2] | 0) == 2) {
      m = c[d + 112 >> 2] | 0;
      if (m | 0) {
       t = d + 4 | 0;
       do {
        if ((c[Z >> 2] | 0) == (c[aa >> 2] | 0)) break c;
        if ((c[_ >> 2] | 0) == (c[da >> 2] | 0)) break c;
        r = c[m + 4 >> 2] | 0;
        o = r + 4 | 0;
        d : do if (!(c[o >> 2] & 1)) {
         s = c[m >> 2] | 0;
         do if ((c[s >> 2] | 0) == 2) {
          if (b[t >> 1] & 8) break;
          if (!(b[s + 4 >> 1] & 8)) break d;
         } while (0);
         if (a[(c[r + 48 >> 2] | 0) + 38 >> 0] | 0) break;
         if (a[(c[r + 52 >> 2] | 0) + 38 >> 0] | 0) break;
         q = s + 28 | 0;
         L = oa;
         n = q;
         K = L + 36 | 0;
         do {
          c[L >> 2] = c[n >> 2];
          L = L + 4 | 0;
          n = n + 4 | 0;
         } while ((L | 0) < (K | 0));
         n = s + 4 | 0;
         if (!(b[n >> 1] & 1)) {
          d = s + 60 | 0;
          l = ba(g[d >> 2]);
          if (!(l < ba(1.0))) {
           h = 67;
           break b;
          }
          xa = ba(ba(v - l) / ba(ba(1.0) - l));
          p = ba(ba(1.0) - xa);
          K = s + 36 | 0;
          za = ba(p * ba(g[K >> 2]));
          M = s + 40 | 0;
          wa = ba(p * ba(g[M >> 2]));
          ya = ba(xa * ba(g[s + 44 >> 2]));
          wa = ba(wa + ba(xa * ba(g[s + 48 >> 2])));
          g[K >> 2] = ba(za + ya);
          g[M >> 2] = wa;
          M = s + 52 | 0;
          p = ba(p * ba(g[M >> 2]));
          K = s + 56 | 0;
          xa = ba(p + ba(xa * ba(g[K >> 2])));
          g[M >> 2] = xa;
          g[d >> 2] = v;
          M = s + 36 | 0;
          L = c[M >> 2] | 0;
          M = c[M + 4 >> 2] | 0;
          J = s + 44 | 0;
          c[J >> 2] = L;
          c[J + 4 >> 2] = M;
          g[K >> 2] = xa;
          p = ba(Ne(xa));
          g[s + 20 >> 2] = p;
          xa = ba(Me(xa));
          g[s + 24 >> 2] = xa;
          wa = ba(g[s + 28 >> 2]);
          ya = ba(xa * wa);
          za = ba(g[s + 32 >> 2]);
          ya = ba(ya - ba(p * za));
          za = ba(ba(p * wa) + ba(xa * za));
          ya = ba((c[k >> 2] = L, ba(g[k >> 2])) - ya);
          za = ba((c[k >> 2] = M, ba(g[k >> 2])) - za);
          g[s + 12 >> 2] = ya;
          g[s + 16 >> 2] = za;
         }
         Cc(r, c[na >> 2] | 0);
         d = c[o >> 2] | 0;
         do if (!(d & 4)) {
          L = q;
          n = oa;
          K = L + 36 | 0;
          do {
           c[L >> 2] = c[n >> 2];
           L = L + 4 | 0;
           n = n + 4 | 0;
          } while ((L | 0) < (K | 0));
          xa = ba(g[s + 56 >> 2]);
          p = ba(Ne(xa));
          g[s + 20 >> 2] = p;
          xa = ba(Me(xa));
          g[s + 24 >> 2] = xa;
          wa = ba(g[s + 28 >> 2]);
          ya = ba(xa * wa);
          za = ba(g[s + 32 >> 2]);
          ya = ba(ya - ba(p * za));
          za = ba(ba(p * wa) + ba(xa * za));
          ya = ba(ba(g[s + 44 >> 2]) - ya);
          za = ba(ba(g[s + 48 >> 2]) - za);
          g[s + 12 >> 2] = ya;
          g[s + 16 >> 2] = za;
         } else {
          if (!(d & 2)) {
           L = q;
           n = oa;
           K = L + 36 | 0;
           do {
            c[L >> 2] = c[n >> 2];
            L = L + 4 | 0;
            n = n + 4 | 0;
           } while ((L | 0) < (K | 0));
           xa = ba(g[s + 56 >> 2]);
           p = ba(Ne(xa));
           g[s + 20 >> 2] = p;
           xa = ba(Me(xa));
           g[s + 24 >> 2] = xa;
           wa = ba(g[s + 28 >> 2]);
           ya = ba(xa * wa);
           za = ba(g[s + 32 >> 2]);
           ya = ba(ya - ba(p * za));
           za = ba(ba(p * wa) + ba(xa * za));
           ya = ba(ba(g[s + 44 >> 2]) - ya);
           za = ba(ba(g[s + 48 >> 2]) - za);
           g[s + 12 >> 2] = ya;
           g[s + 16 >> 2] = za;
           break;
          }
          c[o >> 2] = d | 1;
          d = c[_ >> 2] | 0;
          if ((d | 0) >= (c[da >> 2] | 0)) {
           h = 74;
           break b;
          }
          c[_ >> 2] = d + 1;
          c[(c[ea >> 2] | 0) + (d << 2) >> 2] = r;
          d = e[n >> 1] | 0;
          if (d & 1 | 0) break;
          b[n >> 1] = d | 1;
          if ((d & 2 | 0) == 0 & (c[s >> 2] | 0) != 0) {
           b[n >> 1] = d | 3;
           g[s + 144 >> 2] = ba(0.0);
          }
          d = c[Z >> 2] | 0;
          if ((d | 0) >= (c[aa >> 2] | 0)) {
           h = 79;
           break b;
          }
          c[s + 8 >> 2] = d;
          c[(c[ca >> 2] | 0) + (d << 2) >> 2] = s;
          c[Z >> 2] = d + 1;
         } while (0);
        } while (0);
        m = c[m + 12 >> 2] | 0;
       } while ((m | 0) != 0);
      }
     } while (0);
     h = h + 1 | 0;
     if ((h | 0) >= 2) break;
     d = c[pa + (h << 2) >> 2] | 0;
    }
    za = ba(ba(1.0) - v);
    za = ba(za * ba(g[f >> 2]));
    g[oa >> 2] = za;
    g[ga >> 2] = ba(ba(1.0) / za);
    g[ha >> 2] = ba(1.0);
    c[ia >> 2] = 20;
    c[ka >> 2] = c[ja >> 2];
    a[la >> 0] = 0;
    Hd(ta, oa, c[x >> 2] | 0, c[u >> 2] | 0);
    if ((c[Z >> 2] | 0) > 0) {
     d = 0;
     do {
      h = c[(c[ca >> 2] | 0) + (d << 2) >> 2] | 0;
      M = h + 4 | 0;
      b[M >> 1] = e[M >> 1] & 65534;
      do if ((c[h >> 2] | 0) == 2) {
       Pb(h);
       h = c[h + 112 >> 2] | 0;
       if (!h) break;
       do {
        M = (c[h + 4 >> 2] | 0) + 4 | 0;
        c[M >> 2] = c[M >> 2] & -34;
        h = c[h + 12 >> 2] | 0;
       } while ((h | 0) != 0);
      } while (0);
      d = d + 1 | 0;
     } while ((d | 0) < (c[Z >> 2] | 0));
    }
    ac(ma);
    if (a[N >> 0] | 0) {
     h = 90;
     break;
    }
   } else {
    c[K >> 2] = h & -37;
    L = I;
    n = qa;
    K = L + 36 | 0;
    do {
     c[L >> 2] = c[n >> 2];
     L = L + 4 | 0;
     n = n + 4 | 0;
    } while ((L | 0) < (K | 0));
    L = J;
    n = ra;
    K = L + 36 | 0;
    do {
     c[L >> 2] = c[n >> 2];
     L = L + 4 | 0;
     n = n + 4 | 0;
    } while ((L | 0) < (K | 0));
    wa = ba(g[H >> 2]);
    za = ba(Ne(wa));
    g[z >> 2] = za;
    wa = ba(Me(wa));
    g[A >> 2] = wa;
    ya = ba(g[B >> 2]);
    v = ba(wa * ya);
    xa = ba(g[C >> 2]);
    v = ba(v - ba(za * xa));
    xa = ba(ba(za * ya) + ba(wa * xa));
    v = ba(ba(g[F >> 2]) - v);
    xa = ba(ba(g[G >> 2]) - xa);
    g[D >> 2] = v;
    g[E >> 2] = xa;
    xa = ba(g[y >> 2]);
    v = ba(Ne(xa));
    g[m >> 2] = v;
    xa = ba(Me(xa));
    g[o >> 2] = xa;
    wa = ba(g[q >> 2]);
    ya = ba(xa * wa);
    za = ba(g[r >> 2]);
    ya = ba(ya - ba(v * za));
    za = ba(ba(v * wa) + ba(xa * za));
    ya = ba(ba(g[u >> 2]) - ya);
    za = ba(ba(g[x >> 2]) - za);
    g[s >> 2] = ya;
    g[t >> 2] = za;
   }
   h = c[j >> 2] | 0;
   if (!h) break a; else {
    v = ba(1.0);
    w = 0;
   }
  }
  switch (h | 0) {
  case 16:
   {
    va(3567, 3351, 641, 5651);
    break;
   }
  case 21:
   {
    va(3618, 3632, 723, 3656);
    break;
   }
  case 25:
   {
    va(3618, 3632, 723, 3656);
    break;
   }
  case 28:
   {
    va(3618, 3351, 676, 5651);
    break;
   }
  case 36:
   {
    va(3618, 3632, 723, 3656);
    break;
   }
  case 38:
   {
    va(3618, 3632, 723, 3656);
    break;
   }
  case 47:
   {
    va(3417, 3446, 54, 3474);
    break;
   }
  case 49:
   {
    va(3417, 3446, 54, 3474);
    break;
   }
  case 51:
   {
    va(3478, 3446, 62, 3474);
    break;
   }
  case 67:
   {
    va(3618, 3632, 723, 3656);
    break;
   }
  case 74:
   {
    va(3478, 3446, 62, 3474);
    break;
   }
  case 79:
   {
    va(3417, 3446, 54, 3474);
    break;
   }
  case 90:
   {
    a[sa >> 0] = 0;
    Fd(ta);
    i = ua;
    return;
   }
  }
 } while (0);
 a[sa >> 0] = 1;
 Fd(ta);
 i = ua;
 return;
}

function dc(a, b, d) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 var e = 0, f = 0, g = 0, h = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0;
 q = i;
 i = i + 16 | 0;
 p = q;
 a : while (1) {
  m = b;
  n = b + -12 | 0;
  b : while (1) {
   l = a;
   e = m - l | 0;
   switch ((e | 0) / 12 | 0 | 0) {
   case 2:
    {
     e = n;
     b = n;
     o = 4;
     break a;
    }
   case 3:
    {
     g = n;
     f = n;
     o = 6;
     break a;
    }
   case 4:
    {
     b = n;
     o = 14;
     break a;
    }
   case 5:
    {
     h = n;
     g = n;
     o = 15;
     break a;
    }
   case 1:
   case 0:
    {
     o = 69;
     break a;
    }
   default:
    {}
   }
   if ((e | 0) < 372) {
    o = 21;
    break a;
   }
   k = a + (((e | 0) / 24 | 0) * 12 | 0) | 0;
   do if ((e | 0) > 11988) {
    e = (e | 0) / 48 | 0;
    h = a + (e * 12 | 0) | 0;
    e = k + (e * 12 | 0) | 0;
    f = ec(a, h, k, e, d) | 0;
    if (bb[c[d >> 2] & 3](n, e) | 0) {
     c[p >> 2] = c[e >> 2];
     c[p + 4 >> 2] = c[e + 4 >> 2];
     c[p + 8 >> 2] = c[e + 8 >> 2];
     c[e >> 2] = c[n >> 2];
     c[e + 4 >> 2] = c[n + 4 >> 2];
     c[e + 8 >> 2] = c[n + 8 >> 2];
     c[n >> 2] = c[p >> 2];
     c[n + 4 >> 2] = c[p + 4 >> 2];
     c[n + 8 >> 2] = c[p + 8 >> 2];
     g = f + 1 | 0;
     if (bb[c[d >> 2] & 3](e, k) | 0) {
      c[p >> 2] = c[k >> 2];
      c[p + 4 >> 2] = c[k + 4 >> 2];
      c[p + 8 >> 2] = c[k + 8 >> 2];
      c[k >> 2] = c[e >> 2];
      c[k + 4 >> 2] = c[e + 4 >> 2];
      c[k + 8 >> 2] = c[e + 8 >> 2];
      c[e >> 2] = c[p >> 2];
      c[e + 4 >> 2] = c[p + 4 >> 2];
      c[e + 8 >> 2] = c[p + 8 >> 2];
      e = f + 2 | 0;
      if (bb[c[d >> 2] & 3](k, h) | 0) {
       c[p >> 2] = c[h >> 2];
       c[p + 4 >> 2] = c[h + 4 >> 2];
       c[p + 8 >> 2] = c[h + 8 >> 2];
       c[h >> 2] = c[k >> 2];
       c[h + 4 >> 2] = c[k + 4 >> 2];
       c[h + 8 >> 2] = c[k + 8 >> 2];
       c[k >> 2] = c[p >> 2];
       c[k + 4 >> 2] = c[p + 4 >> 2];
       c[k + 8 >> 2] = c[p + 8 >> 2];
       if (bb[c[d >> 2] & 3](h, a) | 0) {
        c[p >> 2] = c[a >> 2];
        c[p + 4 >> 2] = c[a + 4 >> 2];
        c[p + 8 >> 2] = c[a + 8 >> 2];
        c[a >> 2] = c[h >> 2];
        c[a + 4 >> 2] = c[h + 4 >> 2];
        c[a + 8 >> 2] = c[h + 8 >> 2];
        c[h >> 2] = c[p >> 2];
        c[h + 4 >> 2] = c[p + 4 >> 2];
        c[h + 8 >> 2] = c[p + 8 >> 2];
        f = f + 4 | 0;
       } else f = f + 3 | 0;
      } else f = e;
     } else f = g;
    }
   } else {
    j = bb[c[d >> 2] & 3](k, a) | 0;
    e = bb[c[d >> 2] & 3](n, k) | 0;
    if (!j) {
     if (!e) {
      f = 0;
      break;
     };
     c[p >> 2] = c[k >> 2];
     c[p + 4 >> 2] = c[k + 4 >> 2];
     c[p + 8 >> 2] = c[k + 8 >> 2];
     c[k >> 2] = c[n >> 2];
     c[k + 4 >> 2] = c[n + 4 >> 2];
     c[k + 8 >> 2] = c[n + 8 >> 2];
     c[n >> 2] = c[p >> 2];
     c[n + 4 >> 2] = c[p + 4 >> 2];
     c[n + 8 >> 2] = c[p + 8 >> 2];
     if (!(bb[c[d >> 2] & 3](k, a) | 0)) {
      f = 1;
      break;
     };
     c[p >> 2] = c[a >> 2];
     c[p + 4 >> 2] = c[a + 4 >> 2];
     c[p + 8 >> 2] = c[a + 8 >> 2];
     c[a >> 2] = c[k >> 2];
     c[a + 4 >> 2] = c[k + 4 >> 2];
     c[a + 8 >> 2] = c[k + 8 >> 2];
     c[k >> 2] = c[p >> 2];
     c[k + 4 >> 2] = c[p + 4 >> 2];
     c[k + 8 >> 2] = c[p + 8 >> 2];
     f = 2;
     break;
    }
    if (e) {
     c[p >> 2] = c[a >> 2];
     c[p + 4 >> 2] = c[a + 4 >> 2];
     c[p + 8 >> 2] = c[a + 8 >> 2];
     c[a >> 2] = c[n >> 2];
     c[a + 4 >> 2] = c[n + 4 >> 2];
     c[a + 8 >> 2] = c[n + 8 >> 2];
     c[n >> 2] = c[p >> 2];
     c[n + 4 >> 2] = c[p + 4 >> 2];
     c[n + 8 >> 2] = c[p + 8 >> 2];
     f = 1;
     break;
    };
    c[p >> 2] = c[a >> 2];
    c[p + 4 >> 2] = c[a + 4 >> 2];
    c[p + 8 >> 2] = c[a + 8 >> 2];
    c[a >> 2] = c[k >> 2];
    c[a + 4 >> 2] = c[k + 4 >> 2];
    c[a + 8 >> 2] = c[k + 8 >> 2];
    c[k >> 2] = c[p >> 2];
    c[k + 4 >> 2] = c[p + 4 >> 2];
    c[k + 8 >> 2] = c[p + 8 >> 2];
    if (bb[c[d >> 2] & 3](n, k) | 0) {
     c[p >> 2] = c[k >> 2];
     c[p + 4 >> 2] = c[k + 4 >> 2];
     c[p + 8 >> 2] = c[k + 8 >> 2];
     c[k >> 2] = c[n >> 2];
     c[k + 4 >> 2] = c[n + 4 >> 2];
     c[k + 8 >> 2] = c[n + 8 >> 2];
     c[n >> 2] = c[p >> 2];
     c[n + 4 >> 2] = c[p + 4 >> 2];
     c[n + 8 >> 2] = c[p + 8 >> 2];
     f = 2;
    } else f = 1;
   } while (0);
   do if (bb[c[d >> 2] & 3](a, k) | 0) g = n; else {
    e = n;
    while (1) {
     e = e + -12 | 0;
     if ((a | 0) == (e | 0)) break;
     if (bb[c[d >> 2] & 3](e, k) | 0) {
      o = 51;
      break;
     }
    }
    if ((o | 0) == 51) {
     o = 0;
     c[p >> 2] = c[a >> 2];
     c[p + 4 >> 2] = c[a + 4 >> 2];
     c[p + 8 >> 2] = c[a + 8 >> 2];
     c[a >> 2] = c[e >> 2];
     c[a + 4 >> 2] = c[e + 4 >> 2];
     c[a + 8 >> 2] = c[e + 8 >> 2];
     c[e >> 2] = c[p >> 2];
     c[e + 4 >> 2] = c[p + 4 >> 2];
     c[e + 8 >> 2] = c[p + 8 >> 2];
     g = e;
     f = f + 1 | 0;
     break;
    }
    e = a + 12 | 0;
    if (!(bb[c[d >> 2] & 3](a, n) | 0)) {
     if ((e | 0) == (n | 0)) {
      o = 69;
      break a;
     }
     while (1) {
      if (bb[c[d >> 2] & 3](a, e) | 0) break;
      e = e + 12 | 0;
      if ((e | 0) == (n | 0)) {
       o = 69;
       break a;
      }
     }
     c[p >> 2] = c[e >> 2];
     c[p + 4 >> 2] = c[e + 4 >> 2];
     c[p + 8 >> 2] = c[e + 8 >> 2];
     c[e >> 2] = c[n >> 2];
     c[e + 4 >> 2] = c[n + 4 >> 2];
     c[e + 8 >> 2] = c[n + 8 >> 2];
     c[n >> 2] = c[p >> 2];
     c[n + 4 >> 2] = c[p + 4 >> 2];
     c[n + 8 >> 2] = c[p + 8 >> 2];
     e = e + 12 | 0;
    }
    if ((e | 0) == (n | 0)) {
     o = 69;
     break a;
    } else f = n;
    while (1) {
     g = e;
     while (1) {
      e = g + 12 | 0;
      if (bb[c[d >> 2] & 3](a, g) | 0) break; else g = e;
     }
     do f = f + -12 | 0; while (bb[c[d >> 2] & 3](a, f) | 0);
     if (g >>> 0 >= f >>> 0) {
      a = g;
      continue b;
     };
     c[p >> 2] = c[g >> 2];
     c[p + 4 >> 2] = c[g + 4 >> 2];
     c[p + 8 >> 2] = c[g + 8 >> 2];
     c[g >> 2] = c[f >> 2];
     c[g + 4 >> 2] = c[f + 4 >> 2];
     c[g + 8 >> 2] = c[f + 8 >> 2];
     c[f >> 2] = c[p >> 2];
     c[f + 4 >> 2] = c[p + 4 >> 2];
     c[f + 8 >> 2] = c[p + 8 >> 2];
    }
   } while (0);
   e = a + 12 | 0;
   c : do if (e >>> 0 < g >>> 0) {
    j = g;
    while (1) {
     g = e;
     while (1) {
      e = g + 12 | 0;
      if (bb[c[d >> 2] & 3](g, k) | 0) g = e; else {
       h = g;
       break;
      }
     }
     g = j;
     do g = g + -12 | 0; while (!(bb[c[d >> 2] & 3](g, k) | 0));
     if (h >>> 0 > g >>> 0) {
      e = h;
      g = k;
      break c;
     };
     c[p >> 2] = c[h >> 2];
     c[p + 4 >> 2] = c[h + 4 >> 2];
     c[p + 8 >> 2] = c[h + 8 >> 2];
     c[h >> 2] = c[g >> 2];
     c[h + 4 >> 2] = c[g + 4 >> 2];
     c[h + 8 >> 2] = c[g + 8 >> 2];
     c[g >> 2] = c[p >> 2];
     c[g + 4 >> 2] = c[p + 4 >> 2];
     c[g + 8 >> 2] = c[p + 8 >> 2];
     j = g;
     k = (k | 0) == (h | 0) ? g : k;
     f = f + 1 | 0;
    }
   } else g = k; while (0);
   if ((e | 0) != (g | 0)) if (bb[c[d >> 2] & 3](g, e) | 0) {
    c[p >> 2] = c[e >> 2];
    c[p + 4 >> 2] = c[e + 4 >> 2];
    c[p + 8 >> 2] = c[e + 8 >> 2];
    c[e >> 2] = c[g >> 2];
    c[e + 4 >> 2] = c[g + 4 >> 2];
    c[e + 8 >> 2] = c[g + 8 >> 2];
    c[g >> 2] = c[p >> 2];
    c[g + 4 >> 2] = c[p + 4 >> 2];
    c[g + 8 >> 2] = c[p + 8 >> 2];
    f = f + 1 | 0;
   }
   if (!f) {
    f = gc(a, e, d) | 0;
    g = e + 12 | 0;
    if (gc(g, b, d) | 0) {
     o = 68;
     break;
    }
    if (f) {
     a = g;
     continue;
    }
   }
   k = e;
   if ((k - l | 0) >= (m - k | 0)) {
    o = 67;
    break;
   }
   dc(a, e, d);
   a = e + 12 | 0;
  }
  if ((o | 0) == 67) {
   o = 0;
   dc(e + 12 | 0, b, d);
   b = e;
   continue;
  } else if ((o | 0) == 68) {
   o = 0;
   if (f) {
    o = 69;
    break;
   } else {
    b = e;
    continue;
   }
  }
 }
 if ((o | 0) == 4) {
  if (!(bb[c[d >> 2] & 3](e, a) | 0)) {
   i = q;
   return;
  };
  c[p >> 2] = c[a >> 2];
  c[p + 4 >> 2] = c[a + 4 >> 2];
  c[p + 8 >> 2] = c[a + 8 >> 2];
  c[a >> 2] = c[b >> 2];
  c[a + 4 >> 2] = c[b + 4 >> 2];
  c[a + 8 >> 2] = c[b + 8 >> 2];
  c[b >> 2] = c[p >> 2];
  c[b + 4 >> 2] = c[p + 4 >> 2];
  c[b + 8 >> 2] = c[p + 8 >> 2];
  i = q;
  return;
 } else if ((o | 0) == 6) {
  e = a + 12 | 0;
  o = bb[c[d >> 2] & 3](e, a) | 0;
  b = bb[c[d >> 2] & 3](g, e) | 0;
  if (!o) {
   if (!b) {
    i = q;
    return;
   };
   c[p >> 2] = c[e >> 2];
   c[p + 4 >> 2] = c[e + 4 >> 2];
   c[p + 8 >> 2] = c[e + 8 >> 2];
   c[e >> 2] = c[f >> 2];
   c[e + 4 >> 2] = c[f + 4 >> 2];
   c[e + 8 >> 2] = c[f + 8 >> 2];
   c[f >> 2] = c[p >> 2];
   c[f + 4 >> 2] = c[p + 4 >> 2];
   c[f + 8 >> 2] = c[p + 8 >> 2];
   if (!(bb[c[d >> 2] & 3](e, a) | 0)) {
    i = q;
    return;
   };
   c[p >> 2] = c[a >> 2];
   c[p + 4 >> 2] = c[a + 4 >> 2];
   c[p + 8 >> 2] = c[a + 8 >> 2];
   c[a >> 2] = c[e >> 2];
   c[a + 4 >> 2] = c[e + 4 >> 2];
   c[a + 8 >> 2] = c[e + 8 >> 2];
   c[e >> 2] = c[p >> 2];
   c[e + 4 >> 2] = c[p + 4 >> 2];
   c[e + 8 >> 2] = c[p + 8 >> 2];
   i = q;
   return;
  }
  if (b) {
   c[p >> 2] = c[a >> 2];
   c[p + 4 >> 2] = c[a + 4 >> 2];
   c[p + 8 >> 2] = c[a + 8 >> 2];
   c[a >> 2] = c[f >> 2];
   c[a + 4 >> 2] = c[f + 4 >> 2];
   c[a + 8 >> 2] = c[f + 8 >> 2];
   c[f >> 2] = c[p >> 2];
   c[f + 4 >> 2] = c[p + 4 >> 2];
   c[f + 8 >> 2] = c[p + 8 >> 2];
   i = q;
   return;
  };
  c[p >> 2] = c[a >> 2];
  c[p + 4 >> 2] = c[a + 4 >> 2];
  c[p + 8 >> 2] = c[a + 8 >> 2];
  c[a >> 2] = c[e >> 2];
  c[a + 4 >> 2] = c[e + 4 >> 2];
  c[a + 8 >> 2] = c[e + 8 >> 2];
  c[e >> 2] = c[p >> 2];
  c[e + 4 >> 2] = c[p + 4 >> 2];
  c[e + 8 >> 2] = c[p + 8 >> 2];
  if (!(bb[c[d >> 2] & 3](g, e) | 0)) {
   i = q;
   return;
  };
  c[p >> 2] = c[e >> 2];
  c[p + 4 >> 2] = c[e + 4 >> 2];
  c[p + 8 >> 2] = c[e + 8 >> 2];
  c[e >> 2] = c[f >> 2];
  c[e + 4 >> 2] = c[f + 4 >> 2];
  c[e + 8 >> 2] = c[f + 8 >> 2];
  c[f >> 2] = c[p >> 2];
  c[f + 4 >> 2] = c[p + 4 >> 2];
  c[f + 8 >> 2] = c[p + 8 >> 2];
  i = q;
  return;
 } else if ((o | 0) == 14) {
  ec(a, a + 12 | 0, a + 24 | 0, b, d) | 0;
  i = q;
  return;
 } else if ((o | 0) == 15) {
  b = a + 12 | 0;
  e = a + 24 | 0;
  f = a + 36 | 0;
  ec(a, b, e, f, d) | 0;
  if (!(bb[c[d >> 2] & 3](h, f) | 0)) {
   i = q;
   return;
  };
  c[p >> 2] = c[f >> 2];
  c[p + 4 >> 2] = c[f + 4 >> 2];
  c[p + 8 >> 2] = c[f + 8 >> 2];
  c[f >> 2] = c[g >> 2];
  c[f + 4 >> 2] = c[g + 4 >> 2];
  c[f + 8 >> 2] = c[g + 8 >> 2];
  c[g >> 2] = c[p >> 2];
  c[g + 4 >> 2] = c[p + 4 >> 2];
  c[g + 8 >> 2] = c[p + 8 >> 2];
  if (!(bb[c[d >> 2] & 3](f, e) | 0)) {
   i = q;
   return;
  };
  c[p >> 2] = c[e >> 2];
  c[p + 4 >> 2] = c[e + 4 >> 2];
  c[p + 8 >> 2] = c[e + 8 >> 2];
  c[e >> 2] = c[f >> 2];
  c[e + 4 >> 2] = c[f + 4 >> 2];
  c[e + 8 >> 2] = c[f + 8 >> 2];
  c[f >> 2] = c[p >> 2];
  c[f + 4 >> 2] = c[p + 4 >> 2];
  c[f + 8 >> 2] = c[p + 8 >> 2];
  if (!(bb[c[d >> 2] & 3](e, b) | 0)) {
   i = q;
   return;
  };
  c[p >> 2] = c[b >> 2];
  c[p + 4 >> 2] = c[b + 4 >> 2];
  c[p + 8 >> 2] = c[b + 8 >> 2];
  c[b >> 2] = c[e >> 2];
  c[b + 4 >> 2] = c[e + 4 >> 2];
  c[b + 8 >> 2] = c[e + 8 >> 2];
  c[e >> 2] = c[p >> 2];
  c[e + 4 >> 2] = c[p + 4 >> 2];
  c[e + 8 >> 2] = c[p + 8 >> 2];
  if (!(bb[c[d >> 2] & 3](b, a) | 0)) {
   i = q;
   return;
  };
  c[p >> 2] = c[a >> 2];
  c[p + 4 >> 2] = c[a + 4 >> 2];
  c[p + 8 >> 2] = c[a + 8 >> 2];
  c[a >> 2] = c[b >> 2];
  c[a + 4 >> 2] = c[b + 4 >> 2];
  c[a + 8 >> 2] = c[b + 8 >> 2];
  c[b >> 2] = c[p >> 2];
  c[b + 4 >> 2] = c[p + 4 >> 2];
  c[b + 8 >> 2] = c[p + 8 >> 2];
  i = q;
  return;
 } else if ((o | 0) == 21) {
  fc(a, b, d);
  i = q;
  return;
 } else if ((o | 0) == 69) {
  i = q;
  return;
 }
}

function jd(d, e, f) {
 d = d | 0;
 e = e | 0;
 f = f | 0;
 var h = Ta, j = Ta, l = 0, m = Ta, n = Ta, o = Ta, p = Ta, q = Ta, r = Ta, s = Ta, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, z = 0, A = 0, B = 0, C = 0, D = Ta, E = 0, F = 0, G = Ta, H = Ta, I = Ta, J = 0, K = 0, L = Ta, M = 0, N = 0, P = 0, Q = 0, R = 0, S = 0, T = 0, U = Ta, V = Ta, W = Ta, X = Ta, Y = 0, Z = Ta, _ = 0, $ = 0, aa = 0, ca = 0, da = 0, ea = 0, fa = 0, ga = 0, ha = 0;
 ha = i;
 i = i + 176 | 0;
 l = ha + 152 | 0;
 t = ha + 136 | 0;
 ca = ha;
 M = ha + 124 | 0;
 N = ha + 112 | 0;
 c[2421] = (c[2421] | 0) + 1;
 P = f + 56 | 0;
 c[l >> 2] = c[P >> 2];
 c[l + 4 >> 2] = c[P + 4 >> 2];
 c[l + 8 >> 2] = c[P + 8 >> 2];
 c[l + 12 >> 2] = c[P + 12 >> 2];
 P = f + 72 | 0;
 c[t >> 2] = c[P >> 2];
 c[t + 4 >> 2] = c[P + 4 >> 2];
 c[t + 8 >> 2] = c[P + 8 >> 2];
 c[t + 12 >> 2] = c[P + 12 >> 2];
 kd(ca, e, f, l, f + 28 | 0, t);
 P = ca + 108 | 0;
 u = c[P >> 2] | 0;
 switch (u | 0) {
 case 0:
  {
   va(5401, 4593, 194, 4666);
   break;
  }
 case 3:
 case 2:
 case 1:
  {
   $ = ca + 16 | 0;
   aa = ca + 20 | 0;
   H = ba(g[l + 12 >> 2]);
   I = ba(g[l + 8 >> 2]);
   J = f + 16 | 0;
   K = f + 20 | 0;
   L = ba(g[l >> 2]);
   r = ba(g[l + 4 >> 2]);
   s = ba(g[t + 12 >> 2]);
   D = ba(g[t + 8 >> 2]);
   E = f + 44 | 0;
   F = f + 48 | 0;
   G = ba(g[t >> 2]);
   q = ba(g[t + 4 >> 2]);
   S = ca + 52 | 0;
   T = ca + 56 | 0;
   C = ca + 36 | 0;
   Q = ca + 24 | 0;
   R = ca + 60 | 0;
   l = 0;
   a : while (1) {
    B = (u | 0) > 0;
    if (B) {
     t = 0;
     do {
      c[M + (t << 2) >> 2] = c[ca + (t * 36 | 0) + 28 >> 2];
      c[N + (t << 2) >> 2] = c[ca + (t * 36 | 0) + 32 >> 2];
      t = t + 1 | 0;
     } while ((t | 0) != (u | 0));
    }
    b : do switch (u | 0) {
    case 1:
     {
      v = 18;
      break;
     }
    case 2:
     {
      p = ba(g[$ >> 2]);
      o = ba(g[aa >> 2]);
      h = ba(g[S >> 2]);
      j = ba(g[T >> 2]);
      m = ba(h - p);
      n = ba(j - o);
      o = ba(ba(p * m) + ba(o * n));
      if (o >= ba(-0.0)) {
       g[Q >> 2] = ba(1.0);
       c[P >> 2] = 1;
       v = 18;
       break b;
      }
      h = ba(ba(h * m) + ba(j * n));
      if (!(h <= ba(0.0))) {
       p = ba(ba(1.0) / ba(h - o));
       g[Q >> 2] = ba(h * p);
       g[R >> 2] = ba(-ba(o * p));
       c[P >> 2] = 2;
       v = 19;
       break b;
      } else {
       g[R >> 2] = ba(1.0);
       c[P >> 2] = 1;
       t = ca;
       v = C;
       w = t + 36 | 0;
       do {
        c[t >> 2] = c[v >> 2];
        t = t + 4 | 0;
        v = v + 4 | 0;
       } while ((t | 0) < (w | 0));
       v = 18;
       break b;
      }
     }
    case 3:
     {
      id(ca);
      switch (c[P >> 2] | 0) {
      case 3:
       {
        v = 15;
        break a;
       }
      case 0:
       {
        v = 16;
        break a;
       }
      case 1:
       {
        v = 18;
        break;
       }
      case 2:
       {
        v = 19;
        break;
       }
      default:
       {
        v = 17;
        break a;
       }
      }
      break;
     }
    default:
     {
      v = 13;
      break a;
     }
    } while (0);
    do if ((v | 0) == 18) {
     h = ba(-ba(g[$ >> 2]));
     A = 1;
     j = ba(-ba(g[aa >> 2]));
    } else if ((v | 0) == 19) {
     j = ba(g[S >> 2]);
     o = ba(g[$ >> 2]);
     j = ba(j - o);
     h = ba(g[T >> 2]);
     p = ba(g[aa >> 2]);
     h = ba(h - p);
     if (ba(ba(o * h) - ba(j * p)) > ba(0.0)) {
      A = 2;
      h = ba(-h);
      break;
     } else {
      A = 2;
      j = ba(-j);
      break;
     }
    } while (0);
    if (ba(ba(h * h) + ba(j * j)) < ba(1.42108547e-14)) {
     u = A;
     v = 44;
     break;
    }
    o = ba(-h);
    p = ba(-j);
    n = ba(ba(H * o) + ba(I * p));
    o = ba(ba(H * p) - ba(I * o));
    x = c[J >> 2] | 0;
    y = c[K >> 2] | 0;
    if ((y | 0) > 1) {
     p = ba(n * ba(g[x >> 2]));
     v = 0;
     p = ba(p + ba(o * ba(g[x + 4 >> 2])));
     w = 1;
     while (1) {
      m = ba(n * ba(g[x + (w << 3) >> 2]));
      m = ba(m + ba(o * ba(g[x + (w << 3) + 4 >> 2])));
      t = m > p;
      v = t ? w : v;
      w = w + 1 | 0;
      if ((w | 0) == (y | 0)) break; else p = t ? m : p;
     }
     t = ca + (A * 36 | 0) + 28 | 0;
     c[t >> 2] = v;
     if ((v | 0) <= -1) {
      v = 29;
      break;
     }
    } else {
     t = ca + (A * 36 | 0) + 28 | 0;
     c[t >> 2] = 0;
     v = 0;
    }
    if ((y | 0) <= (v | 0)) {
     v = 29;
     break;
    }
    n = ba(g[x + (v << 3) >> 2]);
    o = ba(H * n);
    p = ba(g[x + (v << 3) + 4 >> 2]);
    o = ba(L + ba(o - ba(I * p)));
    p = ba(ba(ba(n * I) + ba(H * p)) + r);
    g[ca + (A * 36 | 0) >> 2] = o;
    g[ca + (A * 36 | 0) + 4 >> 2] = p;
    n = ba(ba(h * s) + ba(j * D));
    h = ba(ba(j * s) - ba(h * D));
    y = c[E >> 2] | 0;
    z = c[F >> 2] | 0;
    if ((z | 0) > 1) {
     m = ba(n * ba(g[y >> 2]));
     w = 0;
     m = ba(m + ba(h * ba(g[y + 4 >> 2])));
     x = 1;
     while (1) {
      j = ba(n * ba(g[y + (x << 3) >> 2]));
      j = ba(j + ba(h * ba(g[y + (x << 3) + 4 >> 2])));
      v = j > m;
      w = v ? x : w;
      x = x + 1 | 0;
      if ((x | 0) == (z | 0)) break; else m = v ? j : m;
     }
     v = ca + (A * 36 | 0) + 32 | 0;
     c[v >> 2] = w;
     if ((w | 0) > -1) {
      x = v;
      v = w;
     } else {
      v = 36;
      break;
     }
    } else {
     x = ca + (A * 36 | 0) + 32 | 0;
     c[x >> 2] = 0;
     v = 0;
    }
    if ((z | 0) <= (v | 0)) {
     v = 36;
     break;
    }
    j = ba(g[y + (v << 3) >> 2]);
    n = ba(s * j);
    m = ba(g[y + (v << 3) + 4 >> 2]);
    n = ba(G + ba(n - ba(D * m)));
    m = ba(ba(ba(j * D) + ba(s * m)) + q);
    g[ca + (A * 36 | 0) + 8 >> 2] = n;
    g[ca + (A * 36 | 0) + 12 >> 2] = m;
    p = ba(m - p);
    g[ca + (A * 36 | 0) + 16 >> 2] = ba(n - o);
    g[ca + (A * 36 | 0) + 20 >> 2] = p;
    l = l + 1 | 0;
    c[2422] = (c[2422] | 0) + 1;
    if (B) {
     t = c[t >> 2] | 0;
     v = 0;
     do {
      if ((t | 0) == (c[M + (v << 2) >> 2] | 0)) if ((c[x >> 2] | 0) == (c[N + (v << 2) >> 2] | 0)) {
       v = 43;
       break a;
      }
      v = v + 1 | 0;
     } while ((v | 0) < (u | 0));
    }
    u = (c[P >> 2] | 0) + 1 | 0;
    c[P >> 2] = u;
    if ((l | 0) >= 20) {
     v = 44;
     break;
    }
   }
   if ((v | 0) == 13) va(5401, 4593, 498, 4682); else if ((v | 0) == 15) {
    ga = c[2423] | 0;
    c[2423] = (ga | 0) > (l | 0) ? ga : l;
    v = 48;
   } else if ((v | 0) == 16) va(5401, 4593, 194, 4666); else if ((v | 0) == 17) va(5401, 4593, 207, 4666); else if ((v | 0) == 29) va(5330, 5360, 103, 5391); else if ((v | 0) == 36) va(5330, 5360, 103, 5391); else if ((v | 0) == 43) {
    u = c[P >> 2] | 0;
    v = 44;
   }
   c : do if ((v | 0) == 44) {
    t = c[2423] | 0;
    c[2423] = (t | 0) > (l | 0) ? t : l;
    t = d + 8 | 0;
    switch (u | 0) {
    case 3:
     {
      v = 48;
      break c;
     }
    case 0:
     {
      va(5401, 4593, 217, 4693);
      break;
     }
    case 1:
     {
      da = ca;
      fa = c[da >> 2] | 0;
      da = c[da + 4 >> 2] | 0;
      _ = d;
      c[_ >> 2] = fa;
      c[_ + 4 >> 2] = da;
      _ = ca + 8 | 0;
      ea = c[_ >> 2] | 0;
      _ = c[_ + 4 >> 2] | 0;
      ga = t;
      c[ga >> 2] = ea;
      c[ga + 4 >> 2] = _;
      V = (c[k >> 2] = fa, ba(g[k >> 2]));
      U = (c[k >> 2] = ea, ba(g[k >> 2]));
      X = (c[k >> 2] = da, ba(g[k >> 2]));
      da = t;
      ea = d + 4 | 0;
      fa = d + 12 | 0;
      ga = d;
      W = (c[k >> 2] = _, ba(g[k >> 2]));
      _ = 1;
      Y = l;
      break c;
     }
    case 2:
     {
      L = ba(g[Q >> 2]);
      V = ba(L * ba(g[ca >> 2]));
      X = ba(L * ba(g[ca + 4 >> 2]));
      W = ba(g[R >> 2]);
      V = ba(V + ba(W * ba(g[ca + 36 >> 2])));
      X = ba(X + ba(W * ba(g[ca + 40 >> 2])));
      g[d >> 2] = V;
      ea = d + 4 | 0;
      g[ea >> 2] = X;
      U = ba(L * ba(g[ca + 8 >> 2]));
      L = ba(L * ba(g[ca + 12 >> 2]));
      U = ba(U + ba(W * ba(g[ca + 44 >> 2])));
      W = ba(L + ba(W * ba(g[ca + 48 >> 2])));
      g[t >> 2] = U;
      fa = d + 12 | 0;
      g[fa >> 2] = W;
      da = t;
      ga = d;
      _ = 2;
      Y = l;
      break c;
     }
    default:
     va(5401, 4593, 236, 4693);
    }
   } while (0);
   if ((v | 0) == 48) {
    X = ba(g[Q >> 2]);
    V = ba(X * ba(g[ca >> 2]));
    X = ba(X * ba(g[ca + 4 >> 2]));
    U = ba(g[R >> 2]);
    W = ba(U * ba(g[ca + 36 >> 2]));
    W = ba(V + W);
    U = ba(X + ba(U * ba(g[ca + 40 >> 2])));
    X = ba(g[ca + 96 >> 2]);
    V = ba(X * ba(g[ca + 72 >> 2]));
    V = ba(W + V);
    X = ba(U + ba(X * ba(g[ca + 76 >> 2])));
    g[d >> 2] = V;
    ea = d + 4 | 0;
    g[ea >> 2] = X;
    da = d + 8 | 0;
    g[da >> 2] = V;
    fa = d + 12 | 0;
    g[fa >> 2] = X;
    ga = d;
    U = V;
    W = X;
    _ = 3;
    Y = l;
   }
   V = ba(V - U);
   X = ba(X - W);
   t = d + 16 | 0;
   g[t >> 2] = ba(O(ba(ba(V * V) + ba(X * X))));
   c[d + 20 >> 2] = Y;
   switch (_ | 0) {
   case 0:
    {
     va(5401, 4593, 246, 4656);
     break;
    }
   case 1:
    {
     Z = ba(0.0);
     break;
    }
   case 2:
    {
     X = ba(ba(g[$ >> 2]) - ba(g[S >> 2]));
     Z = ba(ba(g[aa >> 2]) - ba(g[T >> 2]));
     Z = ba(O(ba(ba(X * X) + ba(Z * Z))));
     break;
    }
   case 3:
    {
     V = ba(g[S >> 2]);
     Z = ba(g[$ >> 2]);
     V = ba(V - Z);
     X = ba(g[T >> 2]);
     W = ba(g[aa >> 2]);
     X = ba(X - W);
     Z = ba(ba(g[ca + 88 >> 2]) - Z);
     Z = ba(ba(V * ba(ba(g[ca + 92 >> 2]) - W)) - ba(X * Z));
     break;
    }
   default:
    {}
   }
   g[e >> 2] = Z;
   b[e + 4 >> 1] = _;
   l = 0;
   do {
    a[e + 6 + l >> 0] = c[ca + (l * 36 | 0) + 28 >> 2];
    a[e + 9 + l >> 0] = c[ca + (l * 36 | 0) + 32 >> 2];
    l = l + 1 | 0;
   } while ((l | 0) < (_ | 0));
   if (!(a[f + 88 >> 0] | 0)) {
    i = ha;
    return;
   }
   s = ba(g[f + 24 >> 2]);
   r = ba(g[f + 52 >> 2]);
   h = ba(g[t >> 2]);
   j = ba(s + r);
   if (!(h > j & h > ba(1.1920929e-07))) {
    X = ba(g[ga >> 2]);
    X = ba(X + ba(g[da >> 2]));
    Z = ba(g[ea >> 2]);
    X = ba(X * ba(.5));
    Z = ba(ba(Z + ba(g[fa >> 2])) * ba(.5));
    g[ga >> 2] = X;
    g[ea >> 2] = Z;
    g[da >> 2] = X;
    g[fa >> 2] = Z;
    g[t >> 2] = ba(0.0);
    i = ha;
    return;
   }
   g[t >> 2] = ba(h - j);
   n = ba(g[da >> 2]);
   o = ba(g[ga >> 2]);
   j = ba(n - o);
   p = ba(g[fa >> 2]);
   q = ba(g[ea >> 2]);
   h = ba(p - q);
   m = ba(O(ba(ba(j * j) + ba(h * h))));
   if (!(m < ba(1.1920929e-07))) {
    Z = ba(ba(1.0) / m);
    j = ba(j * Z);
    h = ba(h * Z);
   }
   Z = ba(s * h);
   g[ga >> 2] = ba(ba(s * j) + o);
   g[ea >> 2] = ba(Z + q);
   Z = ba(r * h);
   g[da >> 2] = ba(n - ba(r * j));
   g[fa >> 2] = ba(p - Z);
   i = ha;
   return;
  }
 default:
  va(5401, 4593, 207, 4666);
 }
}

function Yd(a) {
 a = a | 0;
 var b = Ta, d = Ta, e = 0, f = 0, h = 0, i = Ta, j = Ta, l = Ta, m = 0, n = Ta, o = Ta, p = 0, q = Ta, r = Ta, s = Ta, t = Ta, u = Ta, v = Ta, w = Ta, x = Ta, y = Ta, z = Ta, A = Ta, B = Ta, C = Ta, D = Ta, E = Ta, F = 0, G = 0, H = 0, I = Ta, J = Ta, K = Ta, L = Ta, M = Ta, N = Ta, O = 0, P = 0, Q = 0, R = 0, S = 0, T = 0, U = 0, V = 0, W = Ta, X = Ta;
 U = a + 48 | 0;
 if ((c[U >> 2] | 0) <= 0) return;
 V = a + 40 | 0;
 R = a + 28 | 0;
 a = c[R >> 2] | 0;
 T = 0;
 a : while (1) {
  H = c[V >> 2] | 0;
  G = H + (T * 152 | 0) | 0;
  S = c[H + (T * 152 | 0) + 112 >> 2] | 0;
  O = c[H + (T * 152 | 0) + 116 >> 2] | 0;
  I = ba(g[H + (T * 152 | 0) + 120 >> 2]);
  J = ba(g[H + (T * 152 | 0) + 128 >> 2]);
  K = ba(g[H + (T * 152 | 0) + 124 >> 2]);
  N = ba(g[H + (T * 152 | 0) + 132 >> 2]);
  F = H + (T * 152 | 0) + 144 | 0;
  m = c[F >> 2] | 0;
  P = a + (S * 12 | 0) | 0;
  Q = a + (S * 12 | 0) + 4 | 0;
  L = ba(g[H + (T * 152 | 0) + 72 >> 2]);
  M = ba(g[H + (T * 152 | 0) + 76 >> 2]);
  n = ba(-L);
  o = ba(g[H + (T * 152 | 0) + 136 >> 2]);
  if ((m + -1 | 0) >>> 0 >= 2) {
   a = 6;
   break;
  }
  b = ba(g[a + (O * 12 | 0) + 8 >> 2]);
  d = ba(g[a + (S * 12 | 0) + 8 >> 2]);
  p = 0;
  h = c[P >> 2] | 0;
  f = c[Q >> 2] | 0;
  e = c[a + (O * 12 | 0) >> 2] | 0;
  a = c[a + (O * 12 | 0) + 4 >> 2] | 0;
  do {
   D = ba(g[H + (T * 152 | 0) + (p * 36 | 0) + 12 >> 2]);
   C = ba(b * D);
   B = ba(g[H + (T * 152 | 0) + (p * 36 | 0) + 8 >> 2]);
   x = ba(b * B);
   l = (c[k >> 2] = e, ba(g[k >> 2]));
   C = ba(l - C);
   A = (c[k >> 2] = a, ba(g[k >> 2]));
   x = ba(A + x);
   i = (c[k >> 2] = h, ba(g[k >> 2]));
   C = ba(C - i);
   y = (c[k >> 2] = f, ba(g[k >> 2]));
   x = ba(x - y);
   q = ba(g[H + (T * 152 | 0) + (p * 36 | 0) + 4 >> 2]);
   E = ba(d * q);
   z = ba(g[H + (T * 152 | 0) + (p * 36 | 0) >> 2]);
   x = ba(ba(M * ba(C + E)) + ba(ba(x - ba(d * z)) * n));
   x = ba(ba(g[H + (T * 152 | 0) + (p * 36 | 0) + 28 >> 2]) * x);
   E = ba(o * ba(g[H + (T * 152 | 0) + (p * 36 | 0) + 16 >> 2]));
   h = H + (T * 152 | 0) + (p * 36 | 0) + 20 | 0;
   C = ba(g[h >> 2]);
   x = ba(C - x);
   j = ba(-E);
   E = x < E ? x : E;
   E = E < j ? j : E;
   C = ba(E - C);
   g[h >> 2] = E;
   E = ba(M * C);
   C = ba(C * n);
   j = ba(I * C);
   i = ba(i - ba(I * E));
   h = (g[k >> 2] = i, c[k >> 2] | 0);
   j = ba(y - j);
   f = (g[k >> 2] = j, c[k >> 2] | 0);
   d = ba(d - ba(J * ba(ba(z * C) - ba(q * E))));
   q = ba(K * C);
   l = ba(l + ba(K * E));
   e = (g[k >> 2] = l, c[k >> 2] | 0);
   q = ba(A + q);
   a = (g[k >> 2] = q, c[k >> 2] | 0);
   b = ba(b + ba(N * ba(ba(B * C) - ba(D * E))));
   p = p + 1 | 0;
  } while ((p | 0) != (m | 0));
  do if ((c[F >> 2] | 0) == 1) {
   E = ba(g[H + (T * 152 | 0) + 12 >> 2]);
   y = ba(b * E);
   D = ba(g[H + (T * 152 | 0) + 8 >> 2]);
   y = ba(ba(l - y) - i);
   z = ba(ba(q + ba(b * D)) - j);
   C = ba(g[H + (T * 152 | 0) + 4 >> 2]);
   A = ba(d * C);
   B = ba(g[G >> 2]);
   z = ba(ba(L * ba(y + A)) + ba(M * ba(z - ba(d * B))));
   A = ba(g[H + (T * 152 | 0) + 24 >> 2]);
   z = ba(A * ba(z - ba(g[H + (T * 152 | 0) + 32 >> 2])));
   h = H + (T * 152 | 0) + 16 | 0;
   A = ba(g[h >> 2]);
   z = ba(A - z);
   f = z > ba(0.0);
   z = f ? z : ba(0.0);
   A = ba(z - A);
   g[h >> 2] = z;
   L = ba(L * A);
   M = ba(M * A);
   A = ba(I * M);
   I = ba(i - ba(I * L));
   h = (g[k >> 2] = I, c[k >> 2] | 0);
   I = ba(j - A);
   f = (g[k >> 2] = I, c[k >> 2] | 0);
   d = ba(d - ba(J * ba(ba(B * M) - ba(C * L))));
   J = ba(K * M);
   K = ba(l + ba(K * L));
   e = (g[k >> 2] = K, c[k >> 2] | 0);
   K = ba(q + J);
   a = (g[k >> 2] = K, c[k >> 2] | 0);
   b = ba(b + ba(N * ba(ba(D * M) - ba(E * L))));
  } else {
   m = H + (T * 152 | 0) + 16 | 0;
   A = ba(g[m >> 2]);
   p = H + (T * 152 | 0) + 52 | 0;
   B = ba(g[p >> 2]);
   if (!(A >= ba(0.0)) | !(B >= ba(0.0))) {
    a = 11;
    break a;
   }
   C = ba(g[H + (T * 152 | 0) + 12 >> 2]);
   t = ba(b * C);
   D = ba(g[H + (T * 152 | 0) + 8 >> 2]);
   t = ba(ba(l - t) - i);
   W = ba(ba(q + ba(b * D)) - j);
   E = ba(g[H + (T * 152 | 0) + 4 >> 2]);
   r = ba(d * E);
   s = ba(g[G >> 2]);
   r = ba(t + r);
   W = ba(W - ba(d * s));
   t = ba(g[H + (T * 152 | 0) + 48 >> 2]);
   x = ba(b * t);
   u = ba(g[H + (T * 152 | 0) + 44 >> 2]);
   x = ba(ba(l - x) - i);
   X = ba(ba(q + ba(b * u)) - j);
   v = ba(g[H + (T * 152 | 0) + 40 >> 2]);
   y = ba(d * v);
   w = ba(g[H + (T * 152 | 0) + 36 >> 2]);
   W = ba(ba(L * r) + ba(M * W));
   X = ba(ba(L * ba(x + y)) + ba(M * ba(X - ba(d * w))));
   W = ba(W - ba(g[H + (T * 152 | 0) + 32 >> 2]));
   X = ba(X - ba(g[H + (T * 152 | 0) + 68 >> 2]));
   y = ba(A * ba(g[H + (T * 152 | 0) + 96 >> 2]));
   x = ba(g[H + (T * 152 | 0) + 104 >> 2]);
   y = ba(y + ba(B * x));
   r = ba(g[H + (T * 152 | 0) + 100 >> 2]);
   z = ba(A * r);
   y = ba(W - y);
   z = ba(X - ba(z + ba(B * ba(g[H + (T * 152 | 0) + 108 >> 2]))));
   X = ba(ba(g[H + (T * 152 | 0) + 80 >> 2]) * y);
   X = ba(X + ba(ba(g[H + (T * 152 | 0) + 88 >> 2]) * z));
   W = ba(y * ba(g[H + (T * 152 | 0) + 84 >> 2]));
   W = ba(W + ba(z * ba(g[H + (T * 152 | 0) + 92 >> 2])));
   n = ba(-X);
   o = ba(-W);
   if (!(!(X <= ba(-0.0)) | !(W <= ba(-0.0)))) {
    A = ba(n - A);
    W = ba(o - B);
    B = ba(L * A);
    A = ba(M * A);
    X = ba(L * W);
    W = ba(M * W);
    L = ba(B + X);
    M = ba(A + W);
    z = ba(I * M);
    I = ba(i - ba(I * L));
    h = (g[k >> 2] = I, c[k >> 2] | 0);
    I = ba(j - z);
    f = (g[k >> 2] = I, c[k >> 2] | 0);
    d = ba(d - ba(J * ba(ba(ba(s * A) - ba(E * B)) + ba(ba(w * W) - ba(v * X)))));
    M = ba(K * M);
    L = ba(l + ba(K * L));
    e = (g[k >> 2] = L, c[k >> 2] | 0);
    M = ba(q + M);
    a = (g[k >> 2] = M, c[k >> 2] | 0);
    b = ba(b + ba(N * ba(ba(ba(D * A) - ba(C * B)) + ba(ba(u * W) - ba(t * X)))));
    g[m >> 2] = n;
    g[p >> 2] = o;
    break;
   }
   X = ba(y * ba(g[H + (T * 152 | 0) + 24 >> 2]));
   n = ba(-X);
   if (X <= ba(-0.0) ? ba(z + ba(r * n)) >= ba(0.0) : 0) {
    A = ba(n - A);
    W = ba(ba(0.0) - B);
    B = ba(L * A);
    A = ba(M * A);
    X = ba(L * W);
    W = ba(M * W);
    L = ba(X + B);
    M = ba(W + A);
    z = ba(I * M);
    I = ba(i - ba(I * L));
    h = (g[k >> 2] = I, c[k >> 2] | 0);
    I = ba(j - z);
    f = (g[k >> 2] = I, c[k >> 2] | 0);
    d = ba(d - ba(J * ba(ba(ba(A * s) - ba(B * E)) + ba(ba(W * w) - ba(X * v)))));
    M = ba(K * M);
    L = ba(l + ba(K * L));
    e = (g[k >> 2] = L, c[k >> 2] | 0);
    M = ba(q + M);
    a = (g[k >> 2] = M, c[k >> 2] | 0);
    b = ba(b + ba(N * ba(ba(ba(A * D) - ba(B * C)) + ba(ba(W * u) - ba(X * t)))));
    g[m >> 2] = n;
    c[p >> 2] = 0;
    break;
   }
   X = ba(z * ba(g[H + (T * 152 | 0) + 60 >> 2]));
   n = ba(-X);
   if (X <= ba(-0.0) ? ba(y + ba(x * n)) >= ba(0.0) : 0) {
    A = ba(ba(0.0) - A);
    W = ba(n - B);
    B = ba(L * A);
    A = ba(M * A);
    X = ba(L * W);
    W = ba(M * W);
    L = ba(B + X);
    M = ba(A + W);
    z = ba(I * M);
    I = ba(i - ba(I * L));
    h = (g[k >> 2] = I, c[k >> 2] | 0);
    I = ba(j - z);
    f = (g[k >> 2] = I, c[k >> 2] | 0);
    d = ba(d - ba(J * ba(ba(ba(A * s) - ba(B * E)) + ba(ba(W * w) - ba(X * v)))));
    M = ba(K * M);
    L = ba(l + ba(K * L));
    e = (g[k >> 2] = L, c[k >> 2] | 0);
    M = ba(q + M);
    a = (g[k >> 2] = M, c[k >> 2] | 0);
    b = ba(b + ba(N * ba(ba(ba(A * D) - ba(B * C)) + ba(ba(W * u) - ba(X * t)))));
    c[m >> 2] = 0;
    g[p >> 2] = n;
    break;
   }
   if (y >= ba(0.0) & z >= ba(0.0)) {
    A = ba(ba(0.0) - A);
    W = ba(ba(0.0) - B);
    B = ba(L * A);
    A = ba(M * A);
    X = ba(L * W);
    W = ba(M * W);
    L = ba(B + X);
    M = ba(A + W);
    z = ba(I * M);
    I = ba(i - ba(I * L));
    h = (g[k >> 2] = I, c[k >> 2] | 0);
    I = ba(j - z);
    f = (g[k >> 2] = I, c[k >> 2] | 0);
    d = ba(d - ba(J * ba(ba(ba(A * s) - ba(B * E)) + ba(ba(W * w) - ba(X * v)))));
    M = ba(K * M);
    L = ba(l + ba(K * L));
    e = (g[k >> 2] = L, c[k >> 2] | 0);
    M = ba(q + M);
    a = (g[k >> 2] = M, c[k >> 2] | 0);
    b = ba(b + ba(N * ba(ba(ba(A * D) - ba(B * C)) + ba(ba(W * u) - ba(X * t)))));
    c[m >> 2] = 0;
    c[p >> 2] = 0;
   }
  } while (0);
  c[P >> 2] = h;
  c[Q >> 2] = f;
  Q = c[R >> 2] | 0;
  g[Q + (S * 12 | 0) + 8 >> 2] = d;
  c[Q + (O * 12 | 0) >> 2] = e;
  c[Q + (O * 12 | 0) + 4 >> 2] = a;
  a = c[R >> 2] | 0;
  g[a + (O * 12 | 0) + 8 >> 2] = b;
  T = T + 1 | 0;
  if ((T | 0) >= (c[U >> 2] | 0)) {
   a = 3;
   break;
  }
 }
 if ((a | 0) == 3) return; else if ((a | 0) == 6) va(6271, 6156, 311, 6306); else if ((a | 0) == 11) va(6331, 6156, 406, 6306);
}

function Gd(d, f, h, j, l) {
 d = d | 0;
 f = f | 0;
 h = h | 0;
 j = j | 0;
 l = l | 0;
 var m = 0, n = 0, o = Ta, p = 0, q = 0, r = 0, s = 0, t = 0, u = Ta, v = Ta, w = 0, x = 0, y = 0, z = 0, A = Ta, B = 0, C = Ta, D = Ta, E = Ta, F = 0, G = 0, H = 0, I = Ta, J = 0, K = 0, L = 0, M = 0, N = Ta;
 L = i;
 i = i + 160 | 0;
 H = L + 128 | 0;
 G = L + 148 | 0;
 F = L + 96 | 0;
 B = L + 52 | 0;
 K = L;
 I = ba(g[h >> 2]);
 J = d + 28 | 0;
 if ((c[J >> 2] | 0) > 0) {
  t = d + 8 | 0;
  w = j + 4 | 0;
  z = d + 20 | 0;
  x = d + 24 | 0;
  y = 0;
  do {
   m = c[(c[t >> 2] | 0) + (y << 2) >> 2] | 0;
   r = m + 44 | 0;
   q = c[r >> 2] | 0;
   r = c[r + 4 >> 2] | 0;
   s = c[m + 56 >> 2] | 0;
   n = c[m + 64 >> 2] | 0;
   p = c[m + 68 >> 2] | 0;
   o = ba(g[m + 72 >> 2]);
   M = m + 36 | 0;
   c[M >> 2] = q;
   c[M + 4 >> 2] = r;
   c[m + 52 >> 2] = s;
   if ((c[m >> 2] | 0) == 2) {
    E = ba(g[m + 140 >> 2]);
    D = ba(E * ba(g[j >> 2]));
    E = ba(E * ba(g[w >> 2]));
    C = ba(g[m + 120 >> 2]);
    A = ba(C * ba(g[m + 76 >> 2]));
    A = ba(I * ba(D + A));
    C = ba(I * ba(E + ba(C * ba(g[m + 80 >> 2]))));
    A = ba((c[k >> 2] = n, ba(g[k >> 2])) + A);
    C = ba((c[k >> 2] = p, ba(g[k >> 2])) + C);
    E = ba(I * ba(g[m + 128 >> 2]));
    E = ba(o + ba(E * ba(g[m + 84 >> 2])));
    D = ba(ba(1.0) - ba(I * ba(g[m + 132 >> 2])));
    n = D < ba(1.0);
    D = n ? D : ba(1.0);
    n = D < ba(0.0);
    D = n ? ba(0.0) : D;
    o = ba(A * D);
    n = (g[k >> 2] = o, c[k >> 2] | 0);
    D = ba(C * D);
    o = ba(ba(1.0) - ba(I * ba(g[m + 136 >> 2])));
    M = o < ba(1.0);
    o = M ? o : ba(1.0);
    M = o < ba(0.0);
    m = (g[k >> 2] = D, c[k >> 2] | 0);
    o = ba(E * (M ? ba(0.0) : o));
   } else m = p;
   M = (c[z >> 2] | 0) + (y * 12 | 0) | 0;
   c[M >> 2] = q;
   c[M + 4 >> 2] = r;
   c[(c[z >> 2] | 0) + (y * 12 | 0) + 8 >> 2] = s;
   M = c[x >> 2] | 0;
   c[M + (y * 12 | 0) >> 2] = n;
   c[M + (y * 12 | 0) + 4 >> 2] = m;
   g[(c[x >> 2] | 0) + (y * 12 | 0) + 8 >> 2] = o;
   y = y + 1 | 0;
  } while ((y | 0) < (c[J >> 2] | 0));
 } else {
  x = d + 24 | 0;
  z = d + 20 | 0;
 };
 c[F >> 2] = c[h >> 2];
 c[F + 4 >> 2] = c[h + 4 >> 2];
 c[F + 8 >> 2] = c[h + 8 >> 2];
 c[F + 12 >> 2] = c[h + 12 >> 2];
 c[F + 16 >> 2] = c[h + 16 >> 2];
 c[F + 20 >> 2] = c[h + 20 >> 2];
 w = c[z >> 2] | 0;
 c[F + 24 >> 2] = w;
 M = c[x >> 2] | 0;
 c[F + 28 >> 2] = M;
 c[B >> 2] = c[h >> 2];
 c[B + 4 >> 2] = c[h + 4 >> 2];
 c[B + 8 >> 2] = c[h + 8 >> 2];
 c[B + 12 >> 2] = c[h + 12 >> 2];
 c[B + 16 >> 2] = c[h + 16 >> 2];
 c[B + 20 >> 2] = c[h + 20 >> 2];
 j = d + 12 | 0;
 c[B + 24 >> 2] = c[j >> 2];
 y = d + 36 | 0;
 c[B + 28 >> 2] = c[y >> 2];
 c[B + 32 >> 2] = w;
 c[B + 36 >> 2] = M;
 c[B + 40 >> 2] = c[d >> 2];
 Ud(K, B);
 Wd(K);
 if (a[h + 20 >> 0] | 0) Xd(K);
 w = d + 32 | 0;
 if ((c[w >> 2] | 0) > 0) {
  m = d + 16 | 0;
  n = 0;
  do {
   M = c[(c[m >> 2] | 0) + (n << 2) >> 2] | 0;
   Xa[c[(c[M >> 2] | 0) + 28 >> 2] & 15](M, F);
   n = n + 1 | 0;
  } while ((n | 0) < (c[w >> 2] | 0));
 }
 g[f + 12 >> 2] = ba(Dd(G));
 m = h + 12 | 0;
 if ((c[m >> 2] | 0) > 0) {
  n = d + 16 | 0;
  p = 0;
  do {
   if ((c[w >> 2] | 0) > 0) {
    q = 0;
    do {
     M = c[(c[n >> 2] | 0) + (q << 2) >> 2] | 0;
     Xa[c[(c[M >> 2] | 0) + 32 >> 2] & 15](M, F);
     q = q + 1 | 0;
    } while ((q | 0) < (c[w >> 2] | 0));
   }
   Yd(K);
   p = p + 1 | 0;
  } while ((p | 0) < (c[m >> 2] | 0));
 }
 Zd(K);
 g[f + 16 >> 2] = ba(Dd(G));
 if ((c[J >> 2] | 0) > 0) {
  m = c[x >> 2] | 0;
  s = 0;
  do {
   n = c[z >> 2] | 0;
   q = n + (s * 12 | 0) | 0;
   C = ba(g[q >> 2]);
   r = n + (s * 12 | 0) + 4 | 0;
   D = ba(g[r >> 2]);
   E = ba(g[n + (s * 12 | 0) + 8 >> 2]);
   n = c[m + (s * 12 | 0) >> 2] | 0;
   p = c[m + (s * 12 | 0) + 4 >> 2] | 0;
   A = ba(g[m + (s * 12 | 0) + 8 >> 2]);
   o = (c[k >> 2] = n, ba(g[k >> 2]));
   N = ba(I * o);
   u = (c[k >> 2] = p, ba(g[k >> 2]));
   v = ba(I * u);
   v = ba(ba(N * N) + ba(v * v));
   if (v > ba(4.0)) {
    N = ba(ba(2.0) / ba(O(ba(v))));
    v = ba(o * N);
    n = (g[k >> 2] = v, c[k >> 2] | 0);
    N = ba(u * N);
    m = (g[k >> 2] = N, c[k >> 2] | 0);
   } else m = p;
   o = ba(I * A);
   if (ba(o * o) > ba(2.46740127)) {
    M = o > ba(0.0);
    N = ba(-o);
    o = ba(A * ba(ba(1.57079637) / (M ? o : N)));
   } else o = A;
   A = ba(I * (c[k >> 2] = n, ba(g[k >> 2])));
   D = ba(D + ba(I * (c[k >> 2] = m, ba(g[k >> 2]))));
   N = ba(E + ba(I * o));
   g[q >> 2] = ba(C + A);
   g[r >> 2] = D;
   g[(c[z >> 2] | 0) + (s * 12 | 0) + 8 >> 2] = N;
   M = c[x >> 2] | 0;
   c[M + (s * 12 | 0) >> 2] = n;
   c[M + (s * 12 | 0) + 4 >> 2] = m;
   m = c[x >> 2] | 0;
   g[m + (s * 12 | 0) + 8 >> 2] = o;
   s = s + 1 | 0;
  } while ((s | 0) < (c[J >> 2] | 0));
 }
 r = h + 16 | 0;
 if ((c[r >> 2] | 0) > 0) {
  s = d + 16 | 0;
  t = 0;
  m = 0;
  do {
   q = _d(K) | 0;
   if ((c[w >> 2] | 0) > 0) {
    p = 0;
    n = 1;
    do {
     M = c[(c[s >> 2] | 0) + (p << 2) >> 2] | 0;
     n = n & (bb[c[(c[M >> 2] | 0) + 36 >> 2] & 3](M, F) | 0);
     p = p + 1 | 0;
    } while ((p | 0) < (c[w >> 2] | 0));
   } else n = 1;
   M = q & n;
   m = m | M;
   t = t + 1 | 0;
  } while ((t | 0) < (c[r >> 2] | 0) & (M ^ 1));
  w = m ^ 1;
 } else w = 1;
 if ((c[J >> 2] | 0) > 0) {
  m = d + 8 | 0;
  n = 0;
  do {
   M = c[(c[m >> 2] | 0) + (n << 2) >> 2] | 0;
   F = (c[z >> 2] | 0) + (n * 12 | 0) | 0;
   h = c[F >> 2] | 0;
   F = c[F + 4 >> 2] | 0;
   B = M + 44 | 0;
   c[B >> 2] = h;
   c[B + 4 >> 2] = F;
   B = c[(c[z >> 2] | 0) + (n * 12 | 0) + 8 >> 2] | 0;
   c[M + 56 >> 2] = B;
   r = (c[x >> 2] | 0) + (n * 12 | 0) | 0;
   s = c[r + 4 >> 2] | 0;
   t = M + 64 | 0;
   c[t >> 2] = c[r >> 2];
   c[t + 4 >> 2] = s;
   c[M + 72 >> 2] = c[(c[x >> 2] | 0) + (n * 12 | 0) + 8 >> 2];
   D = (c[k >> 2] = B, ba(g[k >> 2]));
   A = ba(Ne(D));
   g[M + 20 >> 2] = A;
   D = ba(Me(D));
   g[M + 24 >> 2] = D;
   C = ba(g[M + 28 >> 2]);
   E = ba(D * C);
   N = ba(g[M + 32 >> 2]);
   E = ba(E - ba(A * N));
   N = ba(ba(A * C) + ba(D * N));
   E = ba((c[k >> 2] = h, ba(g[k >> 2])) - E);
   N = ba((c[k >> 2] = F, ba(g[k >> 2])) - N);
   g[M + 12 >> 2] = E;
   g[M + 16 >> 2] = N;
   n = n + 1 | 0;
  } while ((n | 0) < (c[J >> 2] | 0));
 }
 g[f + 20 >> 2] = ba(Dd(G));
 m = c[K + 40 >> 2] | 0;
 n = d + 4 | 0;
 if (c[n >> 2] | 0) if ((c[y >> 2] | 0) > 0) {
  p = H + 16 | 0;
  s = 0;
  do {
   q = c[(c[j >> 2] | 0) + (s << 2) >> 2] | 0;
   r = c[m + (s * 152 | 0) + 144 >> 2] | 0;
   c[p >> 2] = r;
   if ((r | 0) > 0) {
    t = 0;
    do {
     c[H + (t << 2) >> 2] = c[m + (s * 152 | 0) + (t * 36 | 0) + 16 >> 2];
     c[H + 8 + (t << 2) >> 2] = c[m + (s * 152 | 0) + (t * 36 | 0) + 20 >> 2];
     t = t + 1 | 0;
    } while ((t | 0) != (r | 0));
   }
   M = c[n >> 2] | 0;
   Za[c[(c[M >> 2] | 0) + 20 >> 2] & 3](M, q, H);
   s = s + 1 | 0;
  } while ((s | 0) < (c[y >> 2] | 0));
 }
 if (!l) {
  Vd(K);
  i = L;
  return;
 }
 n = c[J >> 2] | 0;
 if ((n | 0) > 0) {
  p = c[d + 8 >> 2] | 0;
  q = 0;
  o = ba(3402823469999999843913219.0e14);
  do {
   m = c[p + (q << 2) >> 2] | 0;
   do if (c[m >> 2] | 0) {
    if (b[m + 4 >> 1] & 4) {
     N = ba(g[m + 72 >> 2]);
     if (!(ba(N * N) > ba(.00121846993))) {
      E = ba(g[m + 64 >> 2]);
      E = ba(E * E);
      N = ba(g[m + 68 >> 2]);
      if (!(ba(E + ba(N * N)) > ba(.0000999999974))) {
       M = m + 144 | 0;
       N = ba(I + ba(g[M >> 2]));
       g[M >> 2] = N;
       o = o < N ? o : N;
       break;
      }
     }
    }
    g[m + 144 >> 2] = ba(0.0);
    o = ba(0.0);
   } while (0);
   q = q + 1 | 0;
  } while ((q | 0) < (n | 0));
 } else o = ba(3402823469999999843913219.0e14);
 if (!(o >= ba(.5)) | w) {
  Vd(K);
  i = L;
  return;
 }
 if ((c[J >> 2] | 0) <= 0) {
  Vd(K);
  i = L;
  return;
 }
 m = d + 8 | 0;
 n = 0;
 do {
  M = c[(c[m >> 2] | 0) + (n << 2) >> 2] | 0;
  d = M + 4 | 0;
  b[d >> 1] = e[d >> 1] & 65533;
  g[M + 144 >> 2] = ba(0.0);
  M = M + 64 | 0;
  c[M >> 2] = 0;
  c[M + 4 >> 2] = 0;
  c[M + 8 >> 2] = 0;
  c[M + 12 >> 2] = 0;
  c[M + 16 >> 2] = 0;
  c[M + 20 >> 2] = 0;
  n = n + 1 | 0;
 } while ((n | 0) < (c[J >> 2] | 0));
 Vd(K);
 i = L;
 return;
}

function Le(a) {
 a = a | 0;
 var b = 0, d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0;
 if (!a) return;
 d = a + -8 | 0;
 h = c[2447] | 0;
 if (d >>> 0 < h >>> 0) ta();
 a = c[a + -4 >> 2] | 0;
 b = a & 3;
 if ((b | 0) == 1) ta();
 e = a & -8;
 m = d + e | 0;
 do if (!(a & 1)) {
  a = c[d >> 2] | 0;
  if (!b) return;
  k = d + (0 - a) | 0;
  j = a + e | 0;
  if (k >>> 0 < h >>> 0) ta();
  if ((k | 0) == (c[2448] | 0)) {
   a = m + 4 | 0;
   b = c[a >> 2] | 0;
   if ((b & 3 | 0) != 3) {
    q = k;
    g = j;
    break;
   }
   c[2445] = j;
   c[a >> 2] = b & -2;
   c[k + 4 >> 2] = j | 1;
   c[k + j >> 2] = j;
   return;
  }
  e = a >>> 3;
  if (a >>> 0 < 256) {
   b = c[k + 8 >> 2] | 0;
   d = c[k + 12 >> 2] | 0;
   a = 9812 + (e << 1 << 2) | 0;
   if ((b | 0) != (a | 0)) {
    if (b >>> 0 < h >>> 0) ta();
    if ((c[b + 12 >> 2] | 0) != (k | 0)) ta();
   }
   if ((d | 0) == (b | 0)) {
    c[2443] = c[2443] & ~(1 << e);
    q = k;
    g = j;
    break;
   }
   if ((d | 0) == (a | 0)) f = d + 8 | 0; else {
    if (d >>> 0 < h >>> 0) ta();
    a = d + 8 | 0;
    if ((c[a >> 2] | 0) == (k | 0)) f = a; else ta();
   }
   c[b + 12 >> 2] = d;
   c[f >> 2] = b;
   q = k;
   g = j;
   break;
  }
  f = c[k + 24 >> 2] | 0;
  d = c[k + 12 >> 2] | 0;
  do if ((d | 0) == (k | 0)) {
   b = k + 16 | 0;
   d = b + 4 | 0;
   a = c[d >> 2] | 0;
   if (!a) {
    a = c[b >> 2] | 0;
    if (!a) {
     i = 0;
     break;
    }
   } else b = d;
   while (1) {
    d = a + 20 | 0;
    e = c[d >> 2] | 0;
    if (e | 0) {
     a = e;
     b = d;
     continue;
    }
    d = a + 16 | 0;
    e = c[d >> 2] | 0;
    if (!e) break; else {
     a = e;
     b = d;
    }
   }
   if (b >>> 0 < h >>> 0) ta(); else {
    c[b >> 2] = 0;
    i = a;
    break;
   }
  } else {
   e = c[k + 8 >> 2] | 0;
   if (e >>> 0 < h >>> 0) ta();
   a = e + 12 | 0;
   if ((c[a >> 2] | 0) != (k | 0)) ta();
   b = d + 8 | 0;
   if ((c[b >> 2] | 0) == (k | 0)) {
    c[a >> 2] = d;
    c[b >> 2] = e;
    i = d;
    break;
   } else ta();
  } while (0);
  if (!f) {
   q = k;
   g = j;
  } else {
   a = c[k + 28 >> 2] | 0;
   b = 10076 + (a << 2) | 0;
   if ((k | 0) == (c[b >> 2] | 0)) {
    c[b >> 2] = i;
    if (!i) {
     c[2444] = c[2444] & ~(1 << a);
     q = k;
     g = j;
     break;
    }
   } else {
    if (f >>> 0 < (c[2447] | 0) >>> 0) ta();
    a = f + 16 | 0;
    if ((c[a >> 2] | 0) == (k | 0)) c[a >> 2] = i; else c[f + 20 >> 2] = i;
    if (!i) {
     q = k;
     g = j;
     break;
    }
   }
   d = c[2447] | 0;
   if (i >>> 0 < d >>> 0) ta();
   c[i + 24 >> 2] = f;
   a = k + 16 | 0;
   b = c[a >> 2] | 0;
   do if (b | 0) if (b >>> 0 < d >>> 0) ta(); else {
    c[i + 16 >> 2] = b;
    c[b + 24 >> 2] = i;
    break;
   } while (0);
   a = c[a + 4 >> 2] | 0;
   if (!a) {
    q = k;
    g = j;
   } else if (a >>> 0 < (c[2447] | 0) >>> 0) ta(); else {
    c[i + 20 >> 2] = a;
    c[a + 24 >> 2] = i;
    q = k;
    g = j;
    break;
   }
  }
 } else {
  q = d;
  g = e;
 } while (0);
 if (q >>> 0 >= m >>> 0) ta();
 a = m + 4 | 0;
 b = c[a >> 2] | 0;
 if (!(b & 1)) ta();
 if (!(b & 2)) {
  if ((m | 0) == (c[2449] | 0)) {
   p = (c[2446] | 0) + g | 0;
   c[2446] = p;
   c[2449] = q;
   c[q + 4 >> 2] = p | 1;
   if ((q | 0) != (c[2448] | 0)) return;
   c[2448] = 0;
   c[2445] = 0;
   return;
  }
  if ((m | 0) == (c[2448] | 0)) {
   p = (c[2445] | 0) + g | 0;
   c[2445] = p;
   c[2448] = q;
   c[q + 4 >> 2] = p | 1;
   c[q + p >> 2] = p;
   return;
  }
  g = (b & -8) + g | 0;
  e = b >>> 3;
  do if (b >>> 0 < 256) {
   b = c[m + 8 >> 2] | 0;
   d = c[m + 12 >> 2] | 0;
   a = 9812 + (e << 1 << 2) | 0;
   if ((b | 0) != (a | 0)) {
    if (b >>> 0 < (c[2447] | 0) >>> 0) ta();
    if ((c[b + 12 >> 2] | 0) != (m | 0)) ta();
   }
   if ((d | 0) == (b | 0)) {
    c[2443] = c[2443] & ~(1 << e);
    break;
   }
   if ((d | 0) == (a | 0)) l = d + 8 | 0; else {
    if (d >>> 0 < (c[2447] | 0) >>> 0) ta();
    a = d + 8 | 0;
    if ((c[a >> 2] | 0) == (m | 0)) l = a; else ta();
   }
   c[b + 12 >> 2] = d;
   c[l >> 2] = b;
  } else {
   f = c[m + 24 >> 2] | 0;
   a = c[m + 12 >> 2] | 0;
   do if ((a | 0) == (m | 0)) {
    b = m + 16 | 0;
    d = b + 4 | 0;
    a = c[d >> 2] | 0;
    if (!a) {
     a = c[b >> 2] | 0;
     if (!a) {
      n = 0;
      break;
     }
    } else b = d;
    while (1) {
     d = a + 20 | 0;
     e = c[d >> 2] | 0;
     if (e | 0) {
      a = e;
      b = d;
      continue;
     }
     d = a + 16 | 0;
     e = c[d >> 2] | 0;
     if (!e) break; else {
      a = e;
      b = d;
     }
    }
    if (b >>> 0 < (c[2447] | 0) >>> 0) ta(); else {
     c[b >> 2] = 0;
     n = a;
     break;
    }
   } else {
    b = c[m + 8 >> 2] | 0;
    if (b >>> 0 < (c[2447] | 0) >>> 0) ta();
    d = b + 12 | 0;
    if ((c[d >> 2] | 0) != (m | 0)) ta();
    e = a + 8 | 0;
    if ((c[e >> 2] | 0) == (m | 0)) {
     c[d >> 2] = a;
     c[e >> 2] = b;
     n = a;
     break;
    } else ta();
   } while (0);
   if (f | 0) {
    a = c[m + 28 >> 2] | 0;
    b = 10076 + (a << 2) | 0;
    if ((m | 0) == (c[b >> 2] | 0)) {
     c[b >> 2] = n;
     if (!n) {
      c[2444] = c[2444] & ~(1 << a);
      break;
     }
    } else {
     if (f >>> 0 < (c[2447] | 0) >>> 0) ta();
     a = f + 16 | 0;
     if ((c[a >> 2] | 0) == (m | 0)) c[a >> 2] = n; else c[f + 20 >> 2] = n;
     if (!n) break;
    }
    d = c[2447] | 0;
    if (n >>> 0 < d >>> 0) ta();
    c[n + 24 >> 2] = f;
    a = m + 16 | 0;
    b = c[a >> 2] | 0;
    do if (b | 0) if (b >>> 0 < d >>> 0) ta(); else {
     c[n + 16 >> 2] = b;
     c[b + 24 >> 2] = n;
     break;
    } while (0);
    a = c[a + 4 >> 2] | 0;
    if (a | 0) if (a >>> 0 < (c[2447] | 0) >>> 0) ta(); else {
     c[n + 20 >> 2] = a;
     c[a + 24 >> 2] = n;
     break;
    }
   }
  } while (0);
  c[q + 4 >> 2] = g | 1;
  c[q + g >> 2] = g;
  if ((q | 0) == (c[2448] | 0)) {
   c[2445] = g;
   return;
  }
 } else {
  c[a >> 2] = b & -2;
  c[q + 4 >> 2] = g | 1;
  c[q + g >> 2] = g;
 }
 a = g >>> 3;
 if (g >>> 0 < 256) {
  d = 9812 + (a << 1 << 2) | 0;
  b = c[2443] | 0;
  a = 1 << a;
  if (!(b & a)) {
   c[2443] = b | a;
   o = d + 8 | 0;
   p = d;
  } else {
   a = d + 8 | 0;
   b = c[a >> 2] | 0;
   if (b >>> 0 < (c[2447] | 0) >>> 0) ta(); else {
    o = a;
    p = b;
   }
  }
  c[o >> 2] = q;
  c[p + 12 >> 2] = q;
  c[q + 8 >> 2] = p;
  c[q + 12 >> 2] = d;
  return;
 }
 a = g >>> 8;
 if (!a) d = 0; else if (g >>> 0 > 16777215) d = 31; else {
  o = (a + 1048320 | 0) >>> 16 & 8;
  p = a << o;
  n = (p + 520192 | 0) >>> 16 & 4;
  p = p << n;
  d = (p + 245760 | 0) >>> 16 & 2;
  d = 14 - (n | o | d) + (p << d >>> 15) | 0;
  d = g >>> (d + 7 | 0) & 1 | d << 1;
 }
 e = 10076 + (d << 2) | 0;
 c[q + 28 >> 2] = d;
 c[q + 20 >> 2] = 0;
 c[q + 16 >> 2] = 0;
 a = c[2444] | 0;
 b = 1 << d;
 do if (!(a & b)) {
  c[2444] = a | b;
  c[e >> 2] = q;
  c[q + 24 >> 2] = e;
  c[q + 12 >> 2] = q;
  c[q + 8 >> 2] = q;
 } else {
  f = g << ((d | 0) == 31 ? 0 : 25 - (d >>> 1) | 0);
  a = c[e >> 2] | 0;
  while (1) {
   if ((c[a + 4 >> 2] & -8 | 0) == (g | 0)) {
    d = a;
    e = 130;
    break;
   }
   b = a + 16 + (f >>> 31 << 2) | 0;
   d = c[b >> 2] | 0;
   if (!d) {
    e = 127;
    break;
   } else {
    f = f << 1;
    a = d;
   }
  }
  if ((e | 0) == 127) if (b >>> 0 < (c[2447] | 0) >>> 0) ta(); else {
   c[b >> 2] = q;
   c[q + 24 >> 2] = a;
   c[q + 12 >> 2] = q;
   c[q + 8 >> 2] = q;
   break;
  } else if ((e | 0) == 130) {
   a = d + 8 | 0;
   b = c[a >> 2] | 0;
   p = c[2447] | 0;
   if (b >>> 0 >= p >>> 0 & d >>> 0 >= p >>> 0) {
    c[b + 12 >> 2] = q;
    c[a >> 2] = q;
    c[q + 8 >> 2] = b;
    c[q + 12 >> 2] = d;
    c[q + 24 >> 2] = 0;
    break;
   } else ta();
  }
 } while (0);
 q = (c[2451] | 0) + -1 | 0;
 c[2451] = q;
 if (!q) a = 10228; else return;
 while (1) {
  a = c[a >> 2] | 0;
  if (!a) break; else a = a + 8 | 0;
 }
 c[2451] = -1;
 return;
}

function qd(a, b) {
 a = a | 0;
 b = b | 0;
 var d = 0, e = 0, f = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = Ta, x = Ta, y = Ta, z = Ta, A = Ta, B = Ta;
 if ((b | 0) == -1) va(4851, 4740, 382, 4862);
 p = c[a + 4 >> 2] | 0;
 q = p + (b * 36 | 0) | 0;
 m = p + (b * 36 | 0) + 24 | 0;
 v = c[m >> 2] | 0;
 if ((v | 0) == -1) {
  v = b;
  return v | 0;
 }
 r = p + (b * 36 | 0) + 32 | 0;
 if ((c[r >> 2] | 0) < 2) {
  v = b;
  return v | 0;
 }
 l = p + (b * 36 | 0) + 28 | 0;
 s = c[l >> 2] | 0;
 if ((v | 0) <= -1) va(4870, 4740, 392, 4862);
 e = c[a + 12 >> 2] | 0;
 if ((v | 0) >= (e | 0)) va(4870, 4740, 392, 4862);
 if (!((s | 0) > -1 & (s | 0) < (e | 0))) va(4901, 4740, 393, 4862);
 n = p + (v * 36 | 0) | 0;
 o = p + (s * 36 | 0) | 0;
 t = p + (s * 36 | 0) + 32 | 0;
 u = p + (v * 36 | 0) + 32 | 0;
 d = (c[t >> 2] | 0) - (c[u >> 2] | 0) | 0;
 if ((d | 0) > 1) {
  d = p + (s * 36 | 0) + 24 | 0;
  f = c[d >> 2] | 0;
  h = p + (s * 36 | 0) + 28 | 0;
  i = c[h >> 2] | 0;
  j = p + (f * 36 | 0) | 0;
  k = p + (i * 36 | 0) | 0;
  if (!((f | 0) > -1 & (f | 0) < (e | 0))) va(4932, 4740, 407, 4862);
  if (!((i | 0) > -1 & (i | 0) < (e | 0))) va(4963, 4740, 408, 4862);
  c[d >> 2] = b;
  m = p + (b * 36 | 0) + 20 | 0;
  e = p + (s * 36 | 0) + 20 | 0;
  c[e >> 2] = c[m >> 2];
  c[m >> 2] = s;
  e = c[e >> 2] | 0;
  do if ((e | 0) == -1) c[a >> 2] = s; else {
   d = p + (e * 36 | 0) + 24 | 0;
   if ((c[d >> 2] | 0) == (b | 0)) {
    c[d >> 2] = s;
    break;
   }
   d = p + (e * 36 | 0) + 28 | 0;
   if ((c[d >> 2] | 0) == (b | 0)) {
    c[d >> 2] = s;
    break;
   } else va(4994, 4740, 424, 4862);
  } while (0);
  d = p + (f * 36 | 0) + 32 | 0;
  e = p + (i * 36 | 0) + 32 | 0;
  if ((c[d >> 2] | 0) > (c[e >> 2] | 0)) {
   c[h >> 2] = f;
   c[l >> 2] = i;
   c[p + (i * 36 | 0) + 20 >> 2] = b;
   B = ba(g[n >> 2]);
   w = ba(g[k >> 2]);
   w = B < w ? B : w;
   B = ba(g[p + (v * 36 | 0) + 4 >> 2]);
   y = ba(g[p + (i * 36 | 0) + 4 >> 2]);
   y = B < y ? B : y;
   g[q >> 2] = w;
   g[p + (b * 36 | 0) + 4 >> 2] = y;
   B = ba(g[p + (v * 36 | 0) + 8 >> 2]);
   A = ba(g[p + (i * 36 | 0) + 8 >> 2]);
   z = ba(g[p + (v * 36 | 0) + 12 >> 2]);
   x = ba(g[p + (i * 36 | 0) + 12 >> 2]);
   q = p + (b * 36 | 0) + 8 | 0;
   g[q >> 2] = B > A ? B : A;
   v = p + (b * 36 | 0) + 12 | 0;
   g[v >> 2] = z > x ? z : x;
   x = ba(g[j >> 2]);
   z = ba(g[p + (f * 36 | 0) + 4 >> 2]);
   g[o >> 2] = w < x ? w : x;
   g[p + (s * 36 | 0) + 4 >> 2] = y < z ? y : z;
   z = ba(g[q >> 2]);
   y = ba(g[p + (f * 36 | 0) + 8 >> 2]);
   x = ba(g[v >> 2]);
   w = ba(g[p + (f * 36 | 0) + 12 >> 2]);
   g[p + (s * 36 | 0) + 8 >> 2] = z > y ? z : y;
   g[p + (s * 36 | 0) + 12 >> 2] = x > w ? x : w;
   u = c[u >> 2] | 0;
   v = c[e >> 2] | 0;
   v = ((u | 0) > (v | 0) ? u : v) + 1 | 0;
   c[r >> 2] = v;
   d = c[d >> 2] | 0;
   d = (v | 0) > (d | 0) ? v : d;
  } else {
   c[h >> 2] = i;
   c[l >> 2] = f;
   c[p + (f * 36 | 0) + 20 >> 2] = b;
   w = ba(g[n >> 2]);
   B = ba(g[j >> 2]);
   B = w < B ? w : B;
   w = ba(g[p + (v * 36 | 0) + 4 >> 2]);
   z = ba(g[p + (f * 36 | 0) + 4 >> 2]);
   z = w < z ? w : z;
   g[q >> 2] = B;
   g[p + (b * 36 | 0) + 4 >> 2] = z;
   w = ba(g[p + (v * 36 | 0) + 8 >> 2]);
   x = ba(g[p + (f * 36 | 0) + 8 >> 2]);
   y = ba(g[p + (v * 36 | 0) + 12 >> 2]);
   A = ba(g[p + (f * 36 | 0) + 12 >> 2]);
   q = p + (b * 36 | 0) + 8 | 0;
   g[q >> 2] = w > x ? w : x;
   v = p + (b * 36 | 0) + 12 | 0;
   g[v >> 2] = y > A ? y : A;
   A = ba(g[k >> 2]);
   y = ba(g[p + (i * 36 | 0) + 4 >> 2]);
   g[o >> 2] = B < A ? B : A;
   g[p + (s * 36 | 0) + 4 >> 2] = z < y ? z : y;
   y = ba(g[q >> 2]);
   z = ba(g[p + (i * 36 | 0) + 8 >> 2]);
   A = ba(g[v >> 2]);
   B = ba(g[p + (i * 36 | 0) + 12 >> 2]);
   g[p + (s * 36 | 0) + 8 >> 2] = y > z ? y : z;
   g[p + (s * 36 | 0) + 12 >> 2] = A > B ? A : B;
   u = c[u >> 2] | 0;
   v = c[d >> 2] | 0;
   v = ((u | 0) > (v | 0) ? u : v) + 1 | 0;
   c[r >> 2] = v;
   d = c[e >> 2] | 0;
   d = (v | 0) > (d | 0) ? v : d;
  }
  c[t >> 2] = d + 1;
  v = s;
  return v | 0;
 }
 if ((d | 0) >= -1) {
  v = b;
  return v | 0;
 }
 d = p + (v * 36 | 0) + 24 | 0;
 f = c[d >> 2] | 0;
 h = p + (v * 36 | 0) + 28 | 0;
 i = c[h >> 2] | 0;
 j = p + (f * 36 | 0) | 0;
 k = p + (i * 36 | 0) | 0;
 if (!((f | 0) > -1 & (f | 0) < (e | 0))) va(5026, 4740, 467, 4862);
 if (!((i | 0) > -1 & (i | 0) < (e | 0))) va(5057, 4740, 468, 4862);
 c[d >> 2] = b;
 l = p + (b * 36 | 0) + 20 | 0;
 e = p + (v * 36 | 0) + 20 | 0;
 c[e >> 2] = c[l >> 2];
 c[l >> 2] = v;
 e = c[e >> 2] | 0;
 do if ((e | 0) == -1) c[a >> 2] = v; else {
  d = p + (e * 36 | 0) + 24 | 0;
  if ((c[d >> 2] | 0) == (b | 0)) {
   c[d >> 2] = v;
   break;
  }
  d = p + (e * 36 | 0) + 28 | 0;
  if ((c[d >> 2] | 0) == (b | 0)) {
   c[d >> 2] = v;
   break;
  } else va(5088, 4740, 484, 4862);
 } while (0);
 d = p + (f * 36 | 0) + 32 | 0;
 e = p + (i * 36 | 0) + 32 | 0;
 if ((c[d >> 2] | 0) > (c[e >> 2] | 0)) {
  c[h >> 2] = f;
  c[m >> 2] = i;
  c[p + (i * 36 | 0) + 20 >> 2] = b;
  w = ba(g[o >> 2]);
  B = ba(g[k >> 2]);
  B = w < B ? w : B;
  w = ba(g[p + (s * 36 | 0) + 4 >> 2]);
  z = ba(g[p + (i * 36 | 0) + 4 >> 2]);
  z = w < z ? w : z;
  g[q >> 2] = B;
  g[p + (b * 36 | 0) + 4 >> 2] = z;
  w = ba(g[p + (s * 36 | 0) + 8 >> 2]);
  x = ba(g[p + (i * 36 | 0) + 8 >> 2]);
  y = ba(g[p + (s * 36 | 0) + 12 >> 2]);
  A = ba(g[p + (i * 36 | 0) + 12 >> 2]);
  q = p + (b * 36 | 0) + 8 | 0;
  g[q >> 2] = w > x ? w : x;
  s = p + (b * 36 | 0) + 12 | 0;
  g[s >> 2] = y > A ? y : A;
  A = ba(g[j >> 2]);
  y = ba(g[p + (f * 36 | 0) + 4 >> 2]);
  g[n >> 2] = B < A ? B : A;
  g[p + (v * 36 | 0) + 4 >> 2] = z < y ? z : y;
  y = ba(g[q >> 2]);
  z = ba(g[p + (f * 36 | 0) + 8 >> 2]);
  A = ba(g[s >> 2]);
  B = ba(g[p + (f * 36 | 0) + 12 >> 2]);
  g[p + (v * 36 | 0) + 8 >> 2] = y > z ? y : z;
  g[p + (v * 36 | 0) + 12 >> 2] = A > B ? A : B;
  s = c[t >> 2] | 0;
  t = c[e >> 2] | 0;
  t = ((s | 0) > (t | 0) ? s : t) + 1 | 0;
  c[r >> 2] = t;
  d = c[d >> 2] | 0;
  d = (t | 0) > (d | 0) ? t : d;
 } else {
  c[h >> 2] = i;
  c[m >> 2] = f;
  c[p + (f * 36 | 0) + 20 >> 2] = b;
  w = ba(g[o >> 2]);
  B = ba(g[j >> 2]);
  B = w < B ? w : B;
  w = ba(g[p + (s * 36 | 0) + 4 >> 2]);
  z = ba(g[p + (f * 36 | 0) + 4 >> 2]);
  z = w < z ? w : z;
  g[q >> 2] = B;
  g[p + (b * 36 | 0) + 4 >> 2] = z;
  w = ba(g[p + (s * 36 | 0) + 8 >> 2]);
  x = ba(g[p + (f * 36 | 0) + 8 >> 2]);
  y = ba(g[p + (s * 36 | 0) + 12 >> 2]);
  A = ba(g[p + (f * 36 | 0) + 12 >> 2]);
  q = p + (b * 36 | 0) + 8 | 0;
  g[q >> 2] = w > x ? w : x;
  s = p + (b * 36 | 0) + 12 | 0;
  g[s >> 2] = y > A ? y : A;
  A = ba(g[k >> 2]);
  y = ba(g[p + (i * 36 | 0) + 4 >> 2]);
  g[n >> 2] = B < A ? B : A;
  g[p + (v * 36 | 0) + 4 >> 2] = z < y ? z : y;
  y = ba(g[q >> 2]);
  z = ba(g[p + (i * 36 | 0) + 8 >> 2]);
  A = ba(g[s >> 2]);
  B = ba(g[p + (i * 36 | 0) + 12 >> 2]);
  g[p + (v * 36 | 0) + 8 >> 2] = y > z ? y : z;
  g[p + (v * 36 | 0) + 12 >> 2] = A > B ? A : B;
  s = c[t >> 2] | 0;
  t = c[d >> 2] | 0;
  t = ((s | 0) > (t | 0) ? s : t) + 1 | 0;
  c[r >> 2] = t;
  d = c[e >> 2] | 0;
  d = (t | 0) > (d | 0) ? t : d;
 }
 c[u >> 2] = d + 1;
 return v | 0;
}

function gc(a, b, d) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 var e = 0, f = 0, g = 0, h = 0, j = 0, k = 0, l = 0;
 k = i;
 i = i + 16 | 0;
 j = k;
 switch ((b - a | 0) / 12 | 0 | 0) {
 case 2:
  {
   e = b + -12 | 0;
   if (!(bb[c[d >> 2] & 3](e, a) | 0)) {
    j = 1;
    i = k;
    return j | 0;
   };
   c[j >> 2] = c[a >> 2];
   c[j + 4 >> 2] = c[a + 4 >> 2];
   c[j + 8 >> 2] = c[a + 8 >> 2];
   c[a >> 2] = c[e >> 2];
   c[a + 4 >> 2] = c[e + 4 >> 2];
   c[a + 8 >> 2] = c[e + 8 >> 2];
   c[e >> 2] = c[j >> 2];
   c[e + 4 >> 2] = c[j + 4 >> 2];
   c[e + 8 >> 2] = c[j + 8 >> 2];
   j = 1;
   i = k;
   return j | 0;
  }
 case 3:
  {
   g = a + 12 | 0;
   f = b + -12 | 0;
   b = bb[c[d >> 2] & 3](g, a) | 0;
   e = bb[c[d >> 2] & 3](f, g) | 0;
   if (!b) {
    if (!e) {
     j = 1;
     i = k;
     return j | 0;
    };
    c[j >> 2] = c[g >> 2];
    c[j + 4 >> 2] = c[g + 4 >> 2];
    c[j + 8 >> 2] = c[g + 8 >> 2];
    c[g >> 2] = c[f >> 2];
    c[g + 4 >> 2] = c[f + 4 >> 2];
    c[g + 8 >> 2] = c[f + 8 >> 2];
    c[f >> 2] = c[j >> 2];
    c[f + 4 >> 2] = c[j + 4 >> 2];
    c[f + 8 >> 2] = c[j + 8 >> 2];
    if (!(bb[c[d >> 2] & 3](g, a) | 0)) {
     j = 1;
     i = k;
     return j | 0;
    };
    c[j >> 2] = c[a >> 2];
    c[j + 4 >> 2] = c[a + 4 >> 2];
    c[j + 8 >> 2] = c[a + 8 >> 2];
    c[a >> 2] = c[g >> 2];
    c[a + 4 >> 2] = c[g + 4 >> 2];
    c[a + 8 >> 2] = c[g + 8 >> 2];
    c[g >> 2] = c[j >> 2];
    c[g + 4 >> 2] = c[j + 4 >> 2];
    c[g + 8 >> 2] = c[j + 8 >> 2];
    j = 1;
    i = k;
    return j | 0;
   }
   if (e) {
    c[j >> 2] = c[a >> 2];
    c[j + 4 >> 2] = c[a + 4 >> 2];
    c[j + 8 >> 2] = c[a + 8 >> 2];
    c[a >> 2] = c[f >> 2];
    c[a + 4 >> 2] = c[f + 4 >> 2];
    c[a + 8 >> 2] = c[f + 8 >> 2];
    c[f >> 2] = c[j >> 2];
    c[f + 4 >> 2] = c[j + 4 >> 2];
    c[f + 8 >> 2] = c[j + 8 >> 2];
    j = 1;
    i = k;
    return j | 0;
   };
   c[j >> 2] = c[a >> 2];
   c[j + 4 >> 2] = c[a + 4 >> 2];
   c[j + 8 >> 2] = c[a + 8 >> 2];
   c[a >> 2] = c[g >> 2];
   c[a + 4 >> 2] = c[g + 4 >> 2];
   c[a + 8 >> 2] = c[g + 8 >> 2];
   c[g >> 2] = c[j >> 2];
   c[g + 4 >> 2] = c[j + 4 >> 2];
   c[g + 8 >> 2] = c[j + 8 >> 2];
   if (!(bb[c[d >> 2] & 3](f, g) | 0)) {
    j = 1;
    i = k;
    return j | 0;
   };
   c[j >> 2] = c[g >> 2];
   c[j + 4 >> 2] = c[g + 4 >> 2];
   c[j + 8 >> 2] = c[g + 8 >> 2];
   c[g >> 2] = c[f >> 2];
   c[g + 4 >> 2] = c[f + 4 >> 2];
   c[g + 8 >> 2] = c[f + 8 >> 2];
   c[f >> 2] = c[j >> 2];
   c[f + 4 >> 2] = c[j + 4 >> 2];
   c[f + 8 >> 2] = c[j + 8 >> 2];
   j = 1;
   i = k;
   return j | 0;
  }
 case 4:
  {
   ec(a, a + 12 | 0, a + 24 | 0, b + -12 | 0, d) | 0;
   j = 1;
   i = k;
   return j | 0;
  }
 case 5:
  {
   f = a + 12 | 0;
   g = a + 24 | 0;
   h = a + 36 | 0;
   e = b + -12 | 0;
   ec(a, f, g, h, d) | 0;
   if (!(bb[c[d >> 2] & 3](e, h) | 0)) {
    j = 1;
    i = k;
    return j | 0;
   };
   c[j >> 2] = c[h >> 2];
   c[j + 4 >> 2] = c[h + 4 >> 2];
   c[j + 8 >> 2] = c[h + 8 >> 2];
   c[h >> 2] = c[e >> 2];
   c[h + 4 >> 2] = c[e + 4 >> 2];
   c[h + 8 >> 2] = c[e + 8 >> 2];
   c[e >> 2] = c[j >> 2];
   c[e + 4 >> 2] = c[j + 4 >> 2];
   c[e + 8 >> 2] = c[j + 8 >> 2];
   if (!(bb[c[d >> 2] & 3](h, g) | 0)) {
    j = 1;
    i = k;
    return j | 0;
   };
   c[j >> 2] = c[g >> 2];
   c[j + 4 >> 2] = c[g + 4 >> 2];
   c[j + 8 >> 2] = c[g + 8 >> 2];
   c[g >> 2] = c[h >> 2];
   c[g + 4 >> 2] = c[h + 4 >> 2];
   c[g + 8 >> 2] = c[h + 8 >> 2];
   c[h >> 2] = c[j >> 2];
   c[h + 4 >> 2] = c[j + 4 >> 2];
   c[h + 8 >> 2] = c[j + 8 >> 2];
   if (!(bb[c[d >> 2] & 3](g, f) | 0)) {
    j = 1;
    i = k;
    return j | 0;
   };
   c[j >> 2] = c[f >> 2];
   c[j + 4 >> 2] = c[f + 4 >> 2];
   c[j + 8 >> 2] = c[f + 8 >> 2];
   c[f >> 2] = c[g >> 2];
   c[f + 4 >> 2] = c[g + 4 >> 2];
   c[f + 8 >> 2] = c[g + 8 >> 2];
   c[g >> 2] = c[j >> 2];
   c[g + 4 >> 2] = c[j + 4 >> 2];
   c[g + 8 >> 2] = c[j + 8 >> 2];
   if (!(bb[c[d >> 2] & 3](f, a) | 0)) {
    j = 1;
    i = k;
    return j | 0;
   };
   c[j >> 2] = c[a >> 2];
   c[j + 4 >> 2] = c[a + 4 >> 2];
   c[j + 8 >> 2] = c[a + 8 >> 2];
   c[a >> 2] = c[f >> 2];
   c[a + 4 >> 2] = c[f + 4 >> 2];
   c[a + 8 >> 2] = c[f + 8 >> 2];
   c[f >> 2] = c[j >> 2];
   c[f + 4 >> 2] = c[j + 4 >> 2];
   c[f + 8 >> 2] = c[j + 8 >> 2];
   j = 1;
   i = k;
   return j | 0;
  }
 case 1:
 case 0:
  {
   j = 1;
   i = k;
   return j | 0;
  }
 default:
  {
   f = a + 24 | 0;
   e = a + 12 | 0;
   h = bb[c[d >> 2] & 3](e, a) | 0;
   g = bb[c[d >> 2] & 3](f, e) | 0;
   do if (h) {
    if (g) {
     c[j >> 2] = c[a >> 2];
     c[j + 4 >> 2] = c[a + 4 >> 2];
     c[j + 8 >> 2] = c[a + 8 >> 2];
     c[a >> 2] = c[f >> 2];
     c[a + 4 >> 2] = c[f + 4 >> 2];
     c[a + 8 >> 2] = c[f + 8 >> 2];
     c[f >> 2] = c[j >> 2];
     c[f + 4 >> 2] = c[j + 4 >> 2];
     c[f + 8 >> 2] = c[j + 8 >> 2];
     break;
    };
    c[j >> 2] = c[a >> 2];
    c[j + 4 >> 2] = c[a + 4 >> 2];
    c[j + 8 >> 2] = c[a + 8 >> 2];
    c[a >> 2] = c[e >> 2];
    c[a + 4 >> 2] = c[e + 4 >> 2];
    c[a + 8 >> 2] = c[e + 8 >> 2];
    c[e >> 2] = c[j >> 2];
    c[e + 4 >> 2] = c[j + 4 >> 2];
    c[e + 8 >> 2] = c[j + 8 >> 2];
    if (bb[c[d >> 2] & 3](f, e) | 0) {
     c[j >> 2] = c[e >> 2];
     c[j + 4 >> 2] = c[e + 4 >> 2];
     c[j + 8 >> 2] = c[e + 8 >> 2];
     c[e >> 2] = c[f >> 2];
     c[e + 4 >> 2] = c[f + 4 >> 2];
     c[e + 8 >> 2] = c[f + 8 >> 2];
     c[f >> 2] = c[j >> 2];
     c[f + 4 >> 2] = c[j + 4 >> 2];
     c[f + 8 >> 2] = c[j + 8 >> 2];
    }
   } else if (g) {
    c[j >> 2] = c[e >> 2];
    c[j + 4 >> 2] = c[e + 4 >> 2];
    c[j + 8 >> 2] = c[e + 8 >> 2];
    c[e >> 2] = c[f >> 2];
    c[e + 4 >> 2] = c[f + 4 >> 2];
    c[e + 8 >> 2] = c[f + 8 >> 2];
    c[f >> 2] = c[j >> 2];
    c[f + 4 >> 2] = c[j + 4 >> 2];
    c[f + 8 >> 2] = c[j + 8 >> 2];
    if (bb[c[d >> 2] & 3](e, a) | 0) {
     c[j >> 2] = c[a >> 2];
     c[j + 4 >> 2] = c[a + 4 >> 2];
     c[j + 8 >> 2] = c[a + 8 >> 2];
     c[a >> 2] = c[e >> 2];
     c[a + 4 >> 2] = c[e + 4 >> 2];
     c[a + 8 >> 2] = c[e + 8 >> 2];
     c[e >> 2] = c[j >> 2];
     c[e + 4 >> 2] = c[j + 4 >> 2];
     c[e + 8 >> 2] = c[j + 8 >> 2];
    }
   } while (0);
   g = a + 36 | 0;
   a : do if ((g | 0) == (b | 0)) {
    f = 1;
    e = 0;
   } else {
    e = 0;
    while (1) {
     if (bb[c[d >> 2] & 3](g, f) | 0) {
      c[j >> 2] = c[g >> 2];
      c[j + 4 >> 2] = c[g + 4 >> 2];
      c[j + 8 >> 2] = c[g + 8 >> 2];
      h = g;
      while (1) {
       c[h >> 2] = c[f >> 2];
       c[h + 4 >> 2] = c[f + 4 >> 2];
       c[h + 8 >> 2] = c[f + 8 >> 2];
       if ((f | 0) == (a | 0)) break;
       h = f + -12 | 0;
       if (bb[c[d >> 2] & 3](j, h) | 0) {
        l = f;
        f = h;
        h = l;
       } else break;
      }
      c[f >> 2] = c[j >> 2];
      c[f + 4 >> 2] = c[j + 4 >> 2];
      c[f + 8 >> 2] = c[j + 8 >> 2];
      e = e + 1 | 0;
      if ((e | 0) == 8) {
       f = 0;
       e = (g + 12 | 0) == (b | 0);
       break a;
      }
     }
     f = g + 12 | 0;
     if ((f | 0) == (b | 0)) {
      f = 1;
      e = 0;
      break;
     } else {
      l = g;
      g = f;
      f = l;
     }
    }
   } while (0);
   l = e | f;
   i = k;
   return l | 0;
  }
 }
 return 0;
}

function Je(a, b, d, e, f) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 var g = 0.0, j = 0.0, k = 0.0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, z = 0, A = 0, B = 0, C = 0, D = 0, E = 0;
 E = i;
 i = i + 560 | 0;
 A = E + 480 | 0;
 y = E + 320 | 0;
 D = E + 160 | 0;
 C = E;
 B = c[1972 + (f << 2) >> 2] | 0;
 q = e + -1 | 0;
 x = (d + -3 | 0) / 24 | 0;
 x = (x | 0) < 0 ? 0 : x;
 r = (x * 24 | 0) + 24 | 0;
 l = d - r | 0;
 if ((B + q | 0) >= 0) {
  m = B + e | 0;
  n = 0;
  o = x - q | 0;
  while (1) {
   if ((o | 0) < 0) g = 0.0; else g = +(c[1988 + (o << 2) >> 2] | 0);
   h[y + (n << 3) >> 3] = g;
   n = n + 1 | 0;
   if ((n | 0) == (m | 0)) break; else o = o + 1 | 0;
  }
 }
 o = (e | 0) > 0;
 p = 0;
 while (1) {
  if (o) {
   m = p + q | 0;
   g = 0.0;
   n = 0;
   do {
    g = g + +h[a + (n << 3) >> 3] * +h[y + (m - n << 3) >> 3];
    n = n + 1 | 0;
   } while ((n | 0) != (e | 0));
  } else g = 0.0;
  h[C + (p << 3) >> 3] = g;
  if ((p | 0) < (B | 0)) p = p + 1 | 0; else break;
 }
 t = (l | 0) > 0;
 u = 24 - l | 0;
 v = 23 - l | 0;
 w = (e | 0) > 0;
 s = (r | 0) == (d | 0);
 m = B;
 a : while (1) {
  g = +h[C + (m << 3) >> 3];
  p = (m | 0) > 0;
  if (p) {
   n = 0;
   o = m;
   while (1) {
    k = +(~~(g * 5.9604644775390625e-08) | 0);
    c[A + (n << 2) >> 2] = ~~(g - k * 16777216.0);
    d = o;
    o = o + -1 | 0;
    g = k + +h[C + (o << 3) >> 3];
    if ((d | 0) <= 1) break; else n = n + 1 | 0;
   }
  }
  g = +ke(g, l);
  g = g - +M(+(g * .125)) * 8.0;
  o = ~~g;
  g = g - +(o | 0);
  do if (t) {
   d = A + (m + -1 << 2) | 0;
   n = c[d >> 2] | 0;
   z = n >> u;
   n = n - (z << u) | 0;
   c[d >> 2] = n;
   n = n >> v;
   o = z + o | 0;
   z = 19;
  } else if (s) {
   n = c[A + (m + -1 << 2) >> 2] >> 23;
   z = 19;
   break;
  } else if (!(g >= .5)) {
   n = 0;
   break;
  } else {
   n = 2;
   z = 20;
   break;
  } while (0);
  if ((z | 0) == 19) {
   z = 0;
   if ((n | 0) > 0) z = 20;
  }
  if ((z | 0) == 20) {
   z = 0;
   o = o + 1 | 0;
   if (p) {
    p = 0;
    d = 0;
    do {
     q = A + (d << 2) | 0;
     r = c[q >> 2] | 0;
     if (!p) if (!r) p = 0; else {
      c[q >> 2] = 16777216 - r;
      p = 1;
     } else c[q >> 2] = 16777215 - r;
     d = d + 1 | 0;
    } while ((d | 0) != (m | 0));
   } else p = 0;
   b : do if (t) switch (l | 0) {
   case 1:
    {
     d = A + (m + -1 << 2) | 0;
     c[d >> 2] = c[d >> 2] & 8388607;
     break b;
    }
   case 2:
    {
     d = A + (m + -1 << 2) | 0;
     c[d >> 2] = c[d >> 2] & 4194303;
     break b;
    }
   default:
    break b;
   } while (0);
   if ((n | 0) == 2) {
    g = 1.0 - g;
    if (!p) n = 2; else {
     n = 2;
     g = g - +ke(1.0, l);
    }
   }
  }
  if (!(g == 0.0)) {
   z = 44;
   break;
  }
  if ((m | 0) > (B | 0)) {
   q = m;
   p = 0;
   do {
    q = q + -1 | 0;
    p = c[A + (q << 2) >> 2] | p;
   } while ((q | 0) > (B | 0));
   if (!p) n = 1; else {
    z = 37;
    break;
   }
  } else n = 1;
  while (1) if (!(c[A + (B - n << 2) >> 2] | 0)) n = n + 1 | 0; else break;
  p = n + m | 0;
  if ((n | 0) <= 0) {
   m = p;
   continue;
  }
  while (1) {
   o = m + 1 | 0;
   m = m + e | 0;
   h[y + (m << 3) >> 3] = +(c[1988 + (o + x << 2) >> 2] | 0);
   if (w) {
    g = 0.0;
    n = 0;
    do {
     g = g + +h[a + (n << 3) >> 3] * +h[y + (m - n << 3) >> 3];
     n = n + 1 | 0;
    } while ((n | 0) != (e | 0));
   } else g = 0.0;
   h[C + (o << 3) >> 3] = g;
   if ((o | 0) < (p | 0)) m = o; else {
    m = p;
    continue a;
   }
  }
 }
 do if ((z | 0) == 37) {
  do {
   l = l + -24 | 0;
   m = m + -1 | 0;
  } while ((c[A + (m << 2) >> 2] | 0) == 0);
  r = n;
  q = m;
 } else if ((z | 0) == 44) {
  g = +ke(g, 0 - l | 0);
  if (!(g >= 16777216.0)) {
   c[A + (m << 2) >> 2] = ~~g;
   r = n;
   q = m;
   break;
  } else {
   r = ~~(g * 5.9604644775390625e-08);
   c[A + (m << 2) >> 2] = ~~(g - +(r | 0) * 16777216.0);
   q = m + 1 | 0;
   c[A + (q << 2) >> 2] = r;
   r = n;
   l = l + 24 | 0;
   break;
  }
 } while (0);
 p = (q | 0) > -1;
 if (p) {
  g = +ke(1.0, l);
  l = q;
  while (1) {
   h[C + (l << 3) >> 3] = g * +(c[A + (l << 2) >> 2] | 0);
   if ((l | 0) > 0) {
    g = g * 5.9604644775390625e-08;
    l = l + -1 | 0;
   } else break;
  }
  if (p) {
   n = q;
   while (1) {
    m = q - n | 0;
    g = 0.0;
    l = 0;
    while (1) {
     g = g + +h[1200 + (l << 3) >> 3] * +h[C + (l + n << 3) >> 3];
     if ((l | 0) >= (B | 0) | (l | 0) >= (m | 0)) break; else l = l + 1 | 0;
    }
    h[D + (m << 3) >> 3] = g;
    if ((n | 0) > 0) n = n + -1 | 0; else break;
   }
  }
 }
 c : do switch (f | 0) {
 case 0:
  {
   if (p) {
    g = 0.0;
    l = q;
    while (1) {
     g = g + +h[D + (l << 3) >> 3];
     if ((l | 0) > 0) l = l + -1 | 0; else break;
    }
   } else g = 0.0;
   h[b >> 3] = (r | 0) == 0 ? g : -g;
   break;
  }
 case 2:
 case 1:
  {
   if (p) {
    g = 0.0;
    l = q;
    while (1) {
     g = g + +h[D + (l << 3) >> 3];
     if ((l | 0) > 0) l = l + -1 | 0; else break;
    }
   } else g = 0.0;
   m = (r | 0) == 0;
   h[b >> 3] = m ? g : -g;
   g = +h[D >> 3] - g;
   if ((q | 0) >= 1) {
    l = 1;
    while (1) {
     g = g + +h[D + (l << 3) >> 3];
     if ((l | 0) == (q | 0)) break; else l = l + 1 | 0;
    }
   }
   h[b + 8 >> 3] = m ? g : -g;
   break;
  }
 case 3:
  {
   if ((q | 0) > 0) {
    g = +h[D + (q << 3) >> 3];
    l = q;
    do {
     C = l;
     l = l + -1 | 0;
     f = D + (l << 3) | 0;
     k = +h[f >> 3];
     j = g;
     g = k + g;
     h[D + (C << 3) >> 3] = j + (k - g);
     h[f >> 3] = g;
    } while ((C | 0) > 1);
    l = (q | 0) > 1;
    if (l) {
     g = +h[D + (q << 3) >> 3];
     m = q;
     do {
      f = m;
      m = m + -1 | 0;
      C = D + (m << 3) | 0;
      k = +h[C >> 3];
      j = g;
      g = k + g;
      h[D + (f << 3) >> 3] = j + (k - g);
      h[C >> 3] = g;
     } while ((m | 0) > 1);
     if (l) {
      g = 0.0;
      l = q;
      do {
       g = g + +h[D + (l << 3) >> 3];
       l = l + -1 | 0;
      } while ((l | 0) > 1);
     } else g = 0.0;
    } else g = 0.0;
   } else g = 0.0;
   k = +h[D >> 3];
   j = +h[D + 8 >> 3];
   if (!r) {
    h[b >> 3] = k;
    h[b + 8 >> 3] = j;
    h[b + 16 >> 3] = g;
    break c;
   } else {
    h[b >> 3] = -k;
    h[b + 8 >> 3] = -j;
    h[b + 16 >> 3] = -g;
    break c;
   }
  }
 default:
  {}
 } while (0);
 i = E;
 return o & 7 | 0;
}

function Wd(a) {
 a = a | 0;
 var b = Ta, d = Ta, e = Ta, f = Ta, h = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = Ta, p = Ta, q = Ta, r = Ta, s = Ta, t = Ta, u = Ta, v = Ta, w = Ta, x = Ta, y = Ta, z = Ta, A = 0, B = 0, C = 0, D = 0, E = 0, F = 0, G = 0, H = 0, I = 0, J = 0, K = 0, L = 0, M = 0, N = 0, O = 0, P = 0, Q = 0, R = 0, S = Ta, T = Ta, U = Ta, V = Ta, W = Ta, X = Ta, Y = Ta, Z = Ta, _ = Ta, $ = 0;
 R = i;
 i = i + 64 | 0;
 P = R + 40 | 0;
 Q = R + 24 | 0;
 O = R;
 J = a + 48 | 0;
 if ((c[J >> 2] | 0) <= 0) {
  i = R;
  return;
 }
 K = a + 40 | 0;
 L = a + 36 | 0;
 M = a + 44 | 0;
 N = a + 24 | 0;
 F = a + 28 | 0;
 G = P + 8 | 0;
 H = P + 12 | 0;
 A = Q + 8 | 0;
 B = Q + 12 | 0;
 C = P + 4 | 0;
 D = Q + 4 | 0;
 I = 0;
 while (1) {
  E = c[K >> 2] | 0;
  k = c[L >> 2] | 0;
  l = c[(c[M >> 2] | 0) + (c[E + (I * 152 | 0) + 148 >> 2] << 2) >> 2] | 0;
  h = c[E + (I * 152 | 0) + 112 >> 2] | 0;
  a = c[E + (I * 152 | 0) + 116 >> 2] | 0;
  p = ba(g[E + (I * 152 | 0) + 120 >> 2]);
  q = ba(g[E + (I * 152 | 0) + 124 >> 2]);
  y = ba(g[E + (I * 152 | 0) + 128 >> 2]);
  z = ba(g[E + (I * 152 | 0) + 132 >> 2]);
  j = c[N >> 2] | 0;
  b = ba(g[j + (h * 12 | 0) + 8 >> 2]);
  n = c[F >> 2] | 0;
  r = ba(g[n + (h * 12 | 0) >> 2]);
  s = ba(g[n + (h * 12 | 0) + 4 >> 2]);
  t = ba(g[n + (h * 12 | 0) + 8 >> 2]);
  d = ba(g[j + (a * 12 | 0) + 8 >> 2]);
  u = ba(g[n + (a * 12 | 0) >> 2]);
  v = ba(g[n + (a * 12 | 0) + 4 >> 2]);
  w = ba(g[n + (a * 12 | 0) + 8 >> 2]);
  if ((c[l + 124 >> 2] | 0) <= 0) {
   a = 5;
   break;
  }
  x = ba(g[j + (a * 12 | 0) + 4 >> 2]);
  f = ba(g[j + (a * 12 | 0) >> 2]);
  o = ba(g[j + (h * 12 | 0) + 4 >> 2]);
  e = ba(g[j + (h * 12 | 0) >> 2]);
  U = ba(g[k + (I * 88 | 0) + 60 >> 2]);
  W = ba(g[k + (I * 88 | 0) + 56 >> 2]);
  Y = ba(g[k + (I * 88 | 0) + 52 >> 2]);
  _ = ba(g[k + (I * 88 | 0) + 48 >> 2]);
  S = ba(g[k + (I * 88 | 0) + 80 >> 2]);
  T = ba(g[k + (I * 88 | 0) + 76 >> 2]);
  X = ba(Ne(b));
  g[G >> 2] = X;
  Z = ba(Me(b));
  g[H >> 2] = Z;
  b = ba(Ne(d));
  g[A >> 2] = b;
  V = ba(Me(d));
  g[B >> 2] = V;
  d = ba(o - ba(ba(Y * Z) + ba(_ * X)));
  g[P >> 2] = ba(e - ba(ba(_ * Z) - ba(Y * X)));
  g[C >> 2] = d;
  d = ba(x - ba(ba(U * V) + ba(W * b)));
  g[Q >> 2] = ba(f - ba(ba(W * V) - ba(U * b)));
  g[D >> 2] = d;
  ed(O, l + 64 | 0, P, T, Q, S);
  l = E + (I * 152 | 0) + 72 | 0;
  m = O;
  a = c[m + 4 >> 2] | 0;
  n = l;
  c[n >> 2] = c[m >> 2];
  c[n + 4 >> 2] = a;
  n = E + (I * 152 | 0) + 144 | 0;
  a = c[n >> 2] | 0;
  do if ((a | 0) > 0) {
   h = E + (I * 152 | 0) + 76 | 0;
   b = ba(p + q);
   j = E + (I * 152 | 0) + 140 | 0;
   m = 0;
   do {
    $ = O + 8 + (m << 3) | 0;
    d = ba(ba(g[$ >> 2]) - e);
    k = O + 8 + (m << 3) + 4 | 0;
    _ = ba(ba(g[k >> 2]) - o);
    g[E + (I * 152 | 0) + (m * 36 | 0) >> 2] = d;
    g[E + (I * 152 | 0) + (m * 36 | 0) + 4 >> 2] = _;
    Z = ba(ba(g[$ >> 2]) - f);
    Y = ba(ba(g[k >> 2]) - x);
    g[E + (I * 152 | 0) + (m * 36 | 0) + 8 >> 2] = Z;
    g[E + (I * 152 | 0) + (m * 36 | 0) + 12 >> 2] = Y;
    W = ba(g[h >> 2]);
    V = ba(d * W);
    X = ba(g[l >> 2]);
    V = ba(V - ba(_ * X));
    X = ba(ba(W * Z) - ba(X * Y));
    X = ba(ba(b + ba(V * ba(y * V))) + ba(X * ba(z * X)));
    k = X > ba(0.0);
    X = ba(ba(1.0) / X);
    g[E + (I * 152 | 0) + (m * 36 | 0) + 24 >> 2] = k ? X : ba(0.0);
    X = ba(g[h >> 2]);
    V = ba(-ba(g[l >> 2]));
    W = ba(ba(d * V) - ba(X * _));
    X = ba(ba(Z * V) - ba(X * Y));
    X = ba(ba(b + ba(W * ba(y * W))) + ba(X * ba(z * X)));
    k = X > ba(0.0);
    X = ba(ba(1.0) / X);
    g[E + (I * 152 | 0) + (m * 36 | 0) + 28 >> 2] = k ? X : ba(0.0);
    k = E + (I * 152 | 0) + (m * 36 | 0) + 32 | 0;
    g[k >> 2] = ba(0.0);
    _ = ba(ba(ba(u - ba(w * Y)) - r) + ba(t * _));
    d = ba(ba(ba(v + ba(w * Z)) - s) - ba(t * d));
    _ = ba(ba(g[l >> 2]) * _);
    d = ba(_ + ba(ba(g[h >> 2]) * d));
    if (d < ba(-1.0)) g[k >> 2] = ba(-ba(d * ba(g[j >> 2])));
    m = m + 1 | 0;
   } while ((m | 0) != (a | 0));
   if ((c[n >> 2] | 0) == 2) {
    f = ba(g[E + (I * 152 | 0) >> 2]);
    Y = ba(g[E + (I * 152 | 0) + 76 >> 2]);
    f = ba(f * Y);
    b = ba(g[E + (I * 152 | 0) + 4 >> 2]);
    d = ba(g[l >> 2]);
    b = ba(f - ba(b * d));
    f = ba(Y * ba(g[E + (I * 152 | 0) + 8 >> 2]));
    f = ba(f - ba(d * ba(g[E + (I * 152 | 0) + 12 >> 2])));
    _ = ba(Y * ba(g[E + (I * 152 | 0) + 36 >> 2]));
    _ = ba(_ - ba(d * ba(g[E + (I * 152 | 0) + 40 >> 2])));
    Y = ba(Y * ba(g[E + (I * 152 | 0) + 44 >> 2]));
    d = ba(Y - ba(d * ba(g[E + (I * 152 | 0) + 48 >> 2])));
    Y = ba(p + q);
    Z = ba(y * b);
    e = ba(z * f);
    f = ba(ba(Y + ba(b * Z)) + ba(f * e));
    b = ba(ba(Y + ba(_ * ba(y * _))) + ba(d * ba(z * d)));
    d = ba(ba(Y + ba(Z * _)) + ba(e * d));
    e = ba(ba(f * b) - ba(d * d));
    if (ba(f * f) < ba(e * ba(1.0e3))) {
     g[E + (I * 152 | 0) + 96 >> 2] = f;
     g[E + (I * 152 | 0) + 100 >> 2] = d;
     g[E + (I * 152 | 0) + 104 >> 2] = d;
     g[E + (I * 152 | 0) + 108 >> 2] = b;
     $ = e != ba(0.0);
     Y = ba(ba(1.0) / e);
     Y = $ ? Y : e;
     Z = ba(-ba(Y * d));
     _ = ba(f * Y);
     g[E + (I * 152 | 0) + 80 >> 2] = ba(b * Y);
     g[E + (I * 152 | 0) + 84 >> 2] = Z;
     g[E + (I * 152 | 0) + 88 >> 2] = Z;
     g[E + (I * 152 | 0) + 92 >> 2] = _;
     break;
    } else {
     c[n >> 2] = 1;
     break;
    }
   }
  } while (0);
  I = I + 1 | 0;
  if ((I | 0) >= (c[J >> 2] | 0)) {
   a = 3;
   break;
  }
 }
 if ((a | 0) == 3) {
  i = R;
  return;
 } else if ((a | 0) == 5) va(6216, 6156, 168, 6241);
}
function vd(a, b, d, e) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = ba(e);
 var f = 0, h = Ta, i = 0, j = 0, k = 0, l = 0, m = Ta, n = Ta, o = Ta, p = Ta, q = Ta, r = Ta, s = 0, t = 0, u = 0, v = 0, w = Ta, x = Ta, y = Ta, z = Ta, A = Ta, B = Ta, C = Ta, D = Ta;
 z = ba(ba(1.0) - e);
 C = ba(z * ba(g[a + 16 >> 2]));
 q = ba(z * ba(g[a + 20 >> 2]));
 p = ba(ba(g[a + 24 >> 2]) * e);
 p = ba(C + p);
 q = ba(q + ba(ba(g[a + 28 >> 2]) * e));
 C = ba(z * ba(g[a + 32 >> 2]));
 C = ba(C + ba(ba(g[a + 36 >> 2]) * e));
 B = ba(Ne(C));
 C = ba(Me(C));
 y = ba(g[a + 8 >> 2]);
 x = ba(C * y);
 D = ba(g[a + 12 >> 2]);
 x = ba(p - ba(x - ba(B * D)));
 D = ba(q - ba(ba(B * y) + ba(C * D)));
 y = ba(z * ba(g[a + 52 >> 2]));
 q = ba(z * ba(g[a + 56 >> 2]));
 p = ba(ba(g[a + 60 >> 2]) * e);
 p = ba(y + p);
 q = ba(q + ba(ba(g[a + 64 >> 2]) * e));
 z = ba(z * ba(g[a + 68 >> 2]));
 z = ba(z + ba(ba(g[a + 72 >> 2]) * e));
 y = ba(Ne(z));
 z = ba(Me(z));
 r = ba(g[a + 44 >> 2]);
 w = ba(z * r);
 A = ba(g[a + 48 >> 2]);
 w = ba(p - ba(w - ba(y * A)));
 A = ba(q - ba(ba(y * r) + ba(z * A)));
 switch (c[a + 80 >> 2] | 0) {
 case 0:
  {
   u = a + 92 | 0;
   p = ba(g[u >> 2]);
   h = ba(C * p);
   v = a + 96 | 0;
   r = ba(g[v >> 2]);
   h = ba(h + ba(B * r));
   m = ba(ba(C * r) - ba(B * p));
   p = ba(-p);
   r = ba(-r);
   o = ba(ba(z * p) + ba(y * r));
   p = ba(ba(z * r) - ba(y * p));
   s = c[a >> 2] | 0;
   t = c[s + 16 >> 2] | 0;
   s = s + 20 | 0;
   j = c[s >> 2] | 0;
   if ((j | 0) > 1) {
    n = ba(h * ba(g[t >> 2]));
    f = 0;
    n = ba(n + ba(m * ba(g[t + 4 >> 2])));
    k = 1;
    while (1) {
     e = ba(h * ba(g[t + (k << 3) >> 2]));
     e = ba(e + ba(m * ba(g[t + (k << 3) + 4 >> 2])));
     i = e > n;
     f = i ? k : f;
     k = k + 1 | 0;
     if ((k | 0) == (j | 0)) break; else n = i ? e : n;
    }
   } else f = 0;
   c[b >> 2] = f;
   l = c[a + 4 >> 2] | 0;
   a = c[l + 16 >> 2] | 0;
   l = l + 20 | 0;
   f = c[l >> 2] | 0;
   if ((f | 0) > 1) {
    h = ba(o * ba(g[a >> 2]));
    i = 0;
    h = ba(h + ba(p * ba(g[a + 4 >> 2])));
    k = 1;
    while (1) {
     e = ba(o * ba(g[a + (k << 3) >> 2]));
     e = ba(e + ba(p * ba(g[a + (k << 3) + 4 >> 2])));
     j = e > h;
     i = j ? k : i;
     k = k + 1 | 0;
     if ((k | 0) == (f | 0)) break; else h = j ? e : h;
    }
   } else i = 0;
   c[d >> 2] = i;
   f = c[b >> 2] | 0;
   if ((f | 0) <= -1) va(5330, 5360, 103, 5391);
   if ((c[s >> 2] | 0) <= (f | 0)) va(5330, 5360, 103, 5391);
   h = ba(g[t + (f << 3) >> 2]);
   e = ba(g[t + (f << 3) + 4 >> 2]);
   if ((i | 0) <= -1) va(5330, 5360, 103, 5391);
   if ((c[l >> 2] | 0) <= (i | 0)) va(5330, 5360, 103, 5391);
   q = ba(g[a + (i << 3) >> 2]);
   r = ba(g[a + (i << 3) + 4 >> 2]);
   x = ba(ba(w + ba(ba(z * q) - ba(y * r))) - ba(x + ba(ba(C * h) - ba(B * e))));
   D = ba(ba(A + ba(ba(y * q) + ba(z * r))) - ba(D + ba(ba(B * h) + ba(C * e))));
   C = ba(ba(g[u >> 2]) * x);
   D = ba(C + ba(ba(g[v >> 2]) * D));
   return ba(D);
  }
 case 1:
  {
   n = ba(g[a + 92 >> 2]);
   q = ba(C * n);
   r = ba(g[a + 96 >> 2]);
   q = ba(q - ba(B * r));
   r = ba(ba(B * n) + ba(C * r));
   n = ba(g[a + 84 >> 2]);
   p = ba(C * n);
   o = ba(g[a + 88 >> 2]);
   p = ba(x + ba(p - ba(B * o)));
   o = ba(D + ba(ba(B * n) + ba(C * o)));
   n = ba(-q);
   D = ba(-r);
   m = ba(ba(z * n) + ba(y * D));
   n = ba(ba(z * D) - ba(y * n));
   c[b >> 2] = -1;
   l = c[a + 4 >> 2] | 0;
   a = c[l + 16 >> 2] | 0;
   l = l + 20 | 0;
   i = c[l >> 2] | 0;
   if ((i | 0) > 1) {
    h = ba(m * ba(g[a >> 2]));
    f = 0;
    h = ba(h + ba(n * ba(g[a + 4 >> 2])));
    k = 1;
    while (1) {
     e = ba(m * ba(g[a + (k << 3) >> 2]));
     e = ba(e + ba(n * ba(g[a + (k << 3) + 4 >> 2])));
     j = e > h;
     f = j ? k : f;
     k = k + 1 | 0;
     if ((k | 0) == (i | 0)) break; else h = j ? e : h;
    }
    c[d >> 2] = f;
    if ((f | 0) > -1) t = f; else va(5330, 5360, 103, 5391);
   } else {
    c[d >> 2] = 0;
    t = 0;
   }
   if ((c[l >> 2] | 0) <= (t | 0)) va(5330, 5360, 103, 5391);
   C = ba(g[a + (t << 3) >> 2]);
   D = ba(g[a + (t << 3) + 4 >> 2]);
   D = ba(ba(q * ba(ba(w + ba(ba(z * C) - ba(y * D))) - p)) + ba(r * ba(ba(A + ba(ba(y * C) + ba(z * D))) - o)));
   return ba(D);
  }
 case 2:
  {
   n = ba(g[a + 92 >> 2]);
   q = ba(z * n);
   r = ba(g[a + 96 >> 2]);
   q = ba(q - ba(y * r));
   r = ba(ba(y * n) + ba(z * r));
   n = ba(g[a + 84 >> 2]);
   p = ba(z * n);
   o = ba(g[a + 88 >> 2]);
   p = ba(w + ba(p - ba(y * o)));
   o = ba(A + ba(ba(y * n) + ba(z * o)));
   n = ba(-q);
   A = ba(-r);
   m = ba(ba(C * n) + ba(B * A));
   n = ba(ba(C * A) - ba(B * n));
   c[d >> 2] = -1;
   l = c[a >> 2] | 0;
   a = c[l + 16 >> 2] | 0;
   l = l + 20 | 0;
   i = c[l >> 2] | 0;
   if ((i | 0) > 1) {
    h = ba(m * ba(g[a >> 2]));
    f = 0;
    h = ba(h + ba(n * ba(g[a + 4 >> 2])));
    k = 1;
    while (1) {
     e = ba(m * ba(g[a + (k << 3) >> 2]));
     e = ba(e + ba(n * ba(g[a + (k << 3) + 4 >> 2])));
     j = e > h;
     f = j ? k : f;
     k = k + 1 | 0;
     if ((k | 0) == (i | 0)) break; else h = j ? e : h;
    }
    c[b >> 2] = f;
    if ((f | 0) > -1) s = f; else va(5330, 5360, 103, 5391);
   } else {
    c[b >> 2] = 0;
    s = 0;
   }
   if ((c[l >> 2] | 0) <= (s | 0)) va(5330, 5360, 103, 5391);
   z = ba(g[a + (s << 3) >> 2]);
   A = ba(g[a + (s << 3) + 4 >> 2]);
   D = ba(ba(q * ba(ba(x + ba(ba(C * z) - ba(B * A))) - p)) + ba(r * ba(ba(D + ba(ba(B * z) + ba(C * A))) - o)));
   return ba(D);
  }
 default:
  va(5401, 5257, 183, 5407);
 }
 return ba(0.0);
}

function td(d, e) {
 d = d | 0;
 e = e | 0;
 var f = 0, h = Ta, j = 0, l = 0, m = Ta, n = Ta, o = Ta, p = Ta, q = 0, r = 0, s = Ta, t = Ta, u = 0, v = Ta, w = Ta, x = Ta, y = Ta, z = Ta, A = Ta, B = Ta, C = Ta, D = Ta, E = Ta, F = Ta, G = Ta, H = Ta, I = Ta, J = Ta, K = Ta, L = Ta, N = Ta, O = Ta, P = 0, Q = 0, R = 0, S = 0, T = 0, U = 0, V = 0, W = 0, X = 0, Y = Ta, Z = Ta, _ = 0, $ = 0, aa = 0, ca = 0, da = 0, ea = 0, fa = 0, ga = 0, ha = 0, ia = 0, ja = 0, ka = 0, la = 0, ma = Ta, na = Ta;
 la = i;
 i = i + 320 | 0;
 ha = la + 276 | 0;
 ia = la + 240 | 0;
 aa = la + 228 | 0;
 ca = la + 136 | 0;
 da = la + 112 | 0;
 ea = la + 8 | 0;
 fa = la + 4 | 0;
 ga = la;
 c[2424] = (c[2424] | 0) + 1;
 c[d >> 2] = 0;
 _ = c[e + 128 >> 2] | 0;
 ja = d + 4 | 0;
 c[ja >> 2] = _;
 $ = e + 28 | 0;
 f = ha;
 j = e + 56 | 0;
 l = f + 36 | 0;
 do {
  c[f >> 2] = c[j >> 2];
  f = f + 4 | 0;
  j = j + 4 | 0;
 } while ((f | 0) < (l | 0));
 f = ia;
 j = e + 92 | 0;
 l = f + 36 | 0;
 do {
  c[f >> 2] = c[j >> 2];
  f = f + 4 | 0;
  j = j + 4 | 0;
 } while ((f | 0) < (l | 0));
 X = ha + 24 | 0;
 I = ba(g[X >> 2]);
 J = ba(ba(M(ba(I / ba(6.28318548)))) * ba(6.28318548));
 I = ba(I - J);
 g[X >> 2] = I;
 X = ha + 28 | 0;
 J = ba(ba(g[X >> 2]) - J);
 g[X >> 2] = J;
 X = ia + 24 | 0;
 K = ba(g[X >> 2]);
 L = ba(ba(M(ba(K / ba(6.28318548)))) * ba(6.28318548));
 K = ba(K - L);
 g[X >> 2] = K;
 X = ia + 28 | 0;
 L = ba(ba(g[X >> 2]) - L);
 g[X >> 2] = L;
 N = (c[k >> 2] = _, ba(g[k >> 2]));
 O = ba(g[e + 24 >> 2]);
 O = ba(ba(O + ba(g[e + 52 >> 2])) + ba(-.0149999997));
 X = O < ba(.00499999989);
 O = X ? ba(.00499999989) : O;
 if (!(O > ba(.00124999997))) va(5238, 5257, 280, 5292);
 b[aa + 4 >> 1] = 0;
 c[ca >> 2] = c[e >> 2];
 c[ca + 4 >> 2] = c[e + 4 >> 2];
 c[ca + 8 >> 2] = c[e + 8 >> 2];
 c[ca + 12 >> 2] = c[e + 12 >> 2];
 c[ca + 16 >> 2] = c[e + 16 >> 2];
 c[ca + 20 >> 2] = c[e + 20 >> 2];
 c[ca + 24 >> 2] = c[e + 24 >> 2];
 P = ca + 28 | 0;
 c[P >> 2] = c[$ >> 2];
 c[P + 4 >> 2] = c[$ + 4 >> 2];
 c[P + 8 >> 2] = c[$ + 8 >> 2];
 c[P + 12 >> 2] = c[$ + 12 >> 2];
 c[P + 16 >> 2] = c[$ + 16 >> 2];
 c[P + 20 >> 2] = c[$ + 20 >> 2];
 c[P + 24 >> 2] = c[$ + 24 >> 2];
 a[ca + 88 >> 0] = 0;
 P = ca + 56 | 0;
 Q = ca + 60 | 0;
 R = ca + 64 | 0;
 S = ca + 68 | 0;
 T = ca + 72 | 0;
 U = ca + 76 | 0;
 V = ca + 80 | 0;
 W = ca + 84 | 0;
 X = da + 16 | 0;
 Y = ba(O + ba(.00124999997));
 Z = ba(O + ba(-.00124999997));
 w = ba(g[ha + 8 >> 2]);
 x = ba(g[ha + 12 >> 2]);
 y = ba(g[ha + 16 >> 2]);
 z = ba(g[ha + 20 >> 2]);
 A = ba(g[ha >> 2]);
 B = ba(g[ha + 4 >> 2]);
 C = ba(g[ia + 8 >> 2]);
 D = ba(g[ia + 12 >> 2]);
 E = ba(g[ia + 16 >> 2]);
 F = ba(g[ia + 20 >> 2]);
 G = ba(g[ia >> 2]);
 H = ba(g[ia + 4 >> 2]);
 f = 0;
 h = ba(0.0);
 while (1) {
  m = ba(ba(1.0) - h);
  ma = ba(ba(m * w) + ba(h * y));
  n = ba(ba(m * x) + ba(h * z));
  p = ba(ba(m * I) + ba(h * J));
  o = ba(Ne(p));
  p = ba(Me(p));
  ma = ba(ma - ba(ba(p * A) - ba(o * B)));
  n = ba(n - ba(ba(o * A) + ba(p * B)));
  s = ba(ba(m * C) + ba(h * E));
  t = ba(ba(m * D) + ba(h * F));
  m = ba(ba(m * K) + ba(h * L));
  v = ba(Ne(m));
  m = ba(Me(m));
  s = ba(s - ba(ba(m * G) - ba(v * H)));
  t = ba(t - ba(ba(v * G) + ba(m * H)));
  g[P >> 2] = ma;
  g[Q >> 2] = n;
  g[R >> 2] = o;
  g[S >> 2] = p;
  g[T >> 2] = s;
  g[U >> 2] = t;
  g[V >> 2] = v;
  g[W >> 2] = m;
  jd(da, aa, ca);
  m = ba(g[X >> 2]);
  if (m <= ba(0.0)) {
   h = ba(0.0);
   j = 2;
   ka = 23;
   break;
  }
  if (m < Y) {
   j = 3;
   ka = 23;
   break;
  }
  ba(ud(ea, aa, e, ha, $, ia, h));
  m = ba(vd(ea, fa, ga, N));
  a : do if (m > Y) ka = 7; else {
   u = 0;
   v = N;
   while (1) {
    if (m > Z) {
     j = 0;
     h = v;
     break a;
    }
    q = c[fa >> 2] | 0;
    r = c[ga >> 2] | 0;
    n = ba(wd(ea, q, r, h));
    if (n < Z) {
     ka = 10;
     break;
    }
    if (!(n <= Y)) {
     s = h;
     t = v;
     j = 0;
     p = n;
    } else {
     ka = 12;
     break;
    }
    while (1) {
     if (!(j & 1)) n = ba(ba(s + t) * ba(.5)); else n = ba(s + ba(ba(ba(O - p) * ba(t - s)) / ba(m - p)));
     o = ba(wd(ea, q, r, n));
     na = ba(o - O);
     l = na > ba(0.0);
     ma = ba(-na);
     if ((l ? na : ma) < ba(.00124999997)) break;
     l = o > O;
     j = j + 1 | 0;
     c[2427] = (c[2427] | 0) + 1;
     if ((j | 0) == 50) {
      j = 50;
      n = v;
      break;
     } else {
      s = l ? n : s;
      t = l ? t : n;
      p = l ? o : p;
      m = l ? m : o;
     }
    }
    r = c[2428] | 0;
    c[2428] = (r | 0) > (j | 0) ? r : j;
    u = u + 1 | 0;
    if ((u | 0) == 8) {
     j = 0;
     break a;
    }
    m = ba(vd(ea, fa, ga, n));
    if (m > Y) {
     ka = 7;
     break a;
    } else v = n;
   }
   if ((ka | 0) == 10) {
    ka = 0;
    c[d >> 2] = 1;
    g[ja >> 2] = h;
    j = 1;
    break;
   } else if ((ka | 0) == 12) {
    ka = 0;
    c[d >> 2] = 3;
    g[ja >> 2] = h;
    j = 1;
    break;
   }
  } while (0);
  if ((ka | 0) == 7) {
   ka = 0;
   c[d >> 2] = 4;
   c[ja >> 2] = _;
   j = 1;
  }
  f = f + 1 | 0;
  c[2425] = (c[2425] | 0) + 1;
  if (j) break;
  if ((f | 0) == 20) {
   ka = 22;
   break;
  }
 }
 if ((ka | 0) == 22) {
  c[d >> 2] = 1;
  g[ja >> 2] = h;
  f = 20;
 } else if ((ka | 0) == 23) {
  c[d >> 2] = j;
  g[ja >> 2] = h;
  ka = f;
  d = c[2426] | 0;
  ja = (d | 0) > (ka | 0);
  ka = ja ? d : ka;
  c[2426] = ka;
  i = la;
  return;
 }
 ka = f;
 d = c[2426] | 0;
 ja = (d | 0) > (ka | 0);
 ka = ja ? d : ka;
 c[2426] = ka;
 i = la;
 return;
}

function bd(b, d, e, f, h) {
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 h = h | 0;
 var j = Ta, k = Ta, l = 0, m = 0, n = Ta, o = Ta, p = Ta, q = Ta, r = Ta, s = Ta, t = Ta, u = Ta, v = Ta, w = Ta, x = 0, y = 0, z = Ta, A = Ta, B = Ta, C = Ta, D = Ta, E = 0, F = Ta, G = Ta, H = 0, I = 0, J = 0, K = 0, L = Ta, M = 0, N = 0, P = 0, Q = Ta, R = Ta;
 P = i;
 i = i + 96 | 0;
 l = P + 92 | 0;
 m = P + 88 | 0;
 J = P + 64 | 0;
 K = P + 56 | 0;
 I = P + 32 | 0;
 M = P + 8 | 0;
 H = P;
 N = b + 60 | 0;
 c[N >> 2] = 0;
 L = ba(g[d + 8 >> 2]);
 L = ba(L + ba(g[f + 8 >> 2]));
 c[l >> 2] = 0;
 j = ba(cd(l, d, e, f, h));
 if (j > L) {
  i = P;
  return;
 }
 c[m >> 2] = 0;
 k = ba(cd(m, f, h, d, e));
 if (!(k > L)) {
  E = k > ba(ba(j * ba(.980000019)) + ba(.00100000005));
  k = ba(g[h >> 2]);
  s = ba(g[h + 4 >> 2]);
  p = ba(g[h + 8 >> 2]);
  q = ba(g[h + 12 >> 2]);
  j = ba(g[e >> 2]);
  r = ba(g[e + 4 >> 2]);
  n = ba(g[e + 8 >> 2]);
  o = ba(g[e + 12 >> 2]);
  if (E) {
   h = 2;
   l = m;
   E = 1;
   x = f;
   z = k;
   A = q;
   B = s;
   C = p;
   G = j;
   F = n;
   q = o;
   D = r;
  } else {
   h = 1;
   E = 0;
   x = d;
   d = f;
   z = j;
   A = o;
   B = r;
   C = n;
   G = k;
   F = p;
   D = s;
  }
  y = c[l >> 2] | 0;
  c[b + 56 >> 2] = h;
  m = c[d + 148 >> 2] | 0;
  if ((y | 0) <= -1) va(4440, 4483, 151, 4537);
  f = c[x + 148 >> 2] | 0;
  if ((f | 0) <= (y | 0)) va(4440, 4483, 151, 4537);
  j = ba(g[x + 84 + (y << 3) >> 2]);
  k = ba(A * j);
  w = ba(g[x + 84 + (y << 3) + 4 >> 2]);
  k = ba(k - ba(C * w));
  w = ba(ba(C * j) + ba(A * w));
  j = ba(ba(q * k) + ba(F * w));
  k = ba(ba(q * w) - ba(F * k));
  if ((m | 0) > 0) {
   l = 0;
   h = 0;
   o = ba(3402823469999999843913219.0e14);
   while (1) {
    n = ba(j * ba(g[d + 84 + (l << 3) >> 2]));
    n = ba(n + ba(k * ba(g[d + 84 + (l << 3) + 4 >> 2])));
    e = n < o;
    h = e ? l : h;
    l = l + 1 | 0;
    if ((l | 0) == (m | 0)) break; else o = e ? n : o;
   }
  } else h = 0;
  l = h + 1 | 0;
  m = (l | 0) < (m | 0) ? l : 0;
  r = ba(g[d + 20 + (h << 3) >> 2]);
  s = ba(q * r);
  u = ba(g[d + 20 + (h << 3) + 4 >> 2]);
  r = ba(D + ba(ba(F * r) + ba(q * u)));
  g[J >> 2] = ba(G + ba(s - ba(F * u)));
  g[J + 4 >> 2] = r;
  l = y & 255;
  e = J + 8 | 0;
  a[e >> 0] = l;
  a[e + 1 >> 0] = h;
  a[e + 2 >> 0] = 1;
  a[e + 3 >> 0] = 0;
  r = ba(g[d + 20 + (m << 3) >> 2]);
  u = ba(q * r);
  s = ba(g[d + 20 + (m << 3) + 4 >> 2]);
  r = ba(D + ba(ba(F * r) + ba(q * s)));
  g[J + 12 >> 2] = ba(G + ba(u - ba(F * s)));
  g[J + 16 >> 2] = r;
  h = J + 20 | 0;
  a[h >> 0] = l;
  a[h + 1 >> 0] = m;
  a[h + 2 >> 0] = 1;
  a[h + 3 >> 0] = 0;
  h = y + 1 | 0;
  h = (h | 0) < (f | 0) ? h : 0;
  r = ba(g[x + 20 + (y << 3) >> 2]);
  s = ba(g[x + 20 + (y << 3) + 4 >> 2]);
  u = ba(g[x + 20 + (h << 3) >> 2]);
  t = ba(g[x + 20 + (h << 3) + 4 >> 2]);
  j = ba(u - r);
  n = ba(t - s);
  k = ba(O(ba(ba(j * j) + ba(n * n))));
  if (!(k < ba(1.1920929e-07))) {
   w = ba(ba(1.0) / k);
   j = ba(j * w);
   n = ba(n * w);
  }
  o = ba(ba(r + u) * ba(.5));
  p = ba(ba(A * j) - ba(C * n));
  v = ba(ba(C * j) + ba(A * n));
  g[K >> 2] = p;
  g[K + 4 >> 2] = v;
  w = ba(-p);
  R = ba(z + ba(ba(A * r) - ba(C * s)));
  Q = ba(B + ba(ba(C * r) + ba(A * s)));
  k = ba(-j);
  j = ba(ba(s + t) * ba(.5));
  r = ba(ba(R * v) + ba(Q * w));
  s = ba(L - ba(ba(R * p) + ba(Q * v)));
  Q = ba(-v);
  g[H >> 2] = w;
  g[H + 4 >> 2] = Q;
  if ((fd(I, J, H, s, y) | 0) >= 2) if ((fd(M, I, K, ba(L + ba(ba(ba(z + ba(ba(A * u) - ba(C * t))) * p) + ba(ba(B + ba(ba(C * u) + ba(A * t))) * v))), h) | 0) >= 2) {
   g[b + 40 >> 2] = n;
   g[b + 44 >> 2] = k;
   g[b + 48 >> 2] = o;
   g[b + 52 >> 2] = j;
   j = ba(g[M >> 2]);
   R = ba(v * j);
   k = ba(g[M + 4 >> 2]);
   h = !(ba(ba(R + ba(k * w)) - r) <= L);
   if (!(E << 24 >> 24)) {
    if (h) h = 0; else {
     C = ba(j - G);
     Q = ba(k - D);
     R = ba(ba(q * Q) - ba(F * C));
     g[b >> 2] = ba(ba(q * C) + ba(F * Q));
     g[b + 4 >> 2] = R;
     c[b + 16 >> 2] = c[M + 8 >> 2];
     h = 1;
    }
    k = ba(g[M + 12 >> 2]);
    R = ba(v * k);
    j = ba(g[M + 16 >> 2]);
    if (ba(ba(R + ba(j * w)) - r) <= L) {
     L = ba(k - G);
     Q = ba(j - D);
     R = ba(ba(q * Q) - ba(F * L));
     g[b + (h * 20 | 0) >> 2] = ba(ba(q * L) + ba(F * Q));
     g[b + (h * 20 | 0) + 4 >> 2] = R;
     c[b + (h * 20 | 0) + 16 >> 2] = c[M + 20 >> 2];
     h = h + 1 | 0;
    }
   } else {
    if (h) h = 0; else {
     C = ba(j - G);
     Q = ba(k - D);
     R = ba(ba(q * Q) - ba(F * C));
     g[b >> 2] = ba(ba(q * C) + ba(F * Q));
     g[b + 4 >> 2] = R;
     h = b + 16 | 0;
     K = c[M + 8 >> 2] | 0;
     c[h >> 2] = K;
     a[h >> 0] = K >>> 8;
     a[h + 1 >> 0] = K;
     a[h + 2 >> 0] = K >>> 24;
     a[h + 3 >> 0] = K >>> 16;
     h = 1;
    }
    k = ba(g[M + 12 >> 2]);
    R = ba(v * k);
    j = ba(g[M + 16 >> 2]);
    if (ba(ba(R + ba(j * w)) - r) <= L) {
     L = ba(k - G);
     Q = ba(j - D);
     R = ba(ba(q * Q) - ba(F * L));
     g[b + (h * 20 | 0) >> 2] = ba(ba(q * L) + ba(F * Q));
     g[b + (h * 20 | 0) + 4 >> 2] = R;
     b = b + (h * 20 | 0) + 16 | 0;
     M = c[M + 20 >> 2] | 0;
     c[b >> 2] = M;
     a[b >> 0] = M >>> 8;
     a[b + 1 >> 0] = M;
     a[b + 2 >> 0] = M >>> 24;
     a[b + 3 >> 0] = M >>> 16;
     h = h + 1 | 0;
    }
   }
   c[N >> 2] = h;
  }
 }
 i = P;
 return;
}

function rc(d, f) {
 d = d | 0;
 f = f | 0;
 var h = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, z = 0, A = 0, B = 0, C = 0, D = 0, E = 0, F = 0, G = 0, H = 0, I = 0, J = 0, K = 0, L = 0, M = 0, N = 0, O = 0, P = 0, Q = 0, R = 0, S = 0, T = 0, U = 0, V = 0, W = Ta;
 V = i;
 i = i + 96 | 0;
 T = V + 32 | 0;
 U = V;
 N = d + 103008 | 0;
 g[N >> 2] = ba(0.0);
 O = d + 103012 | 0;
 g[O >> 2] = ba(0.0);
 P = d + 103016 | 0;
 g[P >> 2] = ba(0.0);
 j = d + 102960 | 0;
 S = d + 102872 | 0;
 Q = d + 68 | 0;
 Ed(T, c[j >> 2] | 0, c[d + 102936 >> 2] | 0, c[d + 102964 >> 2] | 0, Q, c[d + 102944 >> 2] | 0);
 R = d + 102952 | 0;
 h = c[R >> 2] | 0;
 if (h | 0) do {
  M = h + 4 | 0;
  b[M >> 1] = e[M >> 1] & 65534;
  h = c[h + 96 >> 2] | 0;
 } while ((h | 0) != 0);
 h = c[d + 102932 >> 2] | 0;
 if (h | 0) do {
  M = h + 4 | 0;
  c[M >> 2] = c[M >> 2] & -2;
  h = c[h + 12 >> 2] | 0;
 } while ((h | 0) != 0);
 h = c[d + 102956 >> 2] | 0;
 if (h | 0) do {
  a[h + 60 >> 0] = 0;
  h = c[h + 12 >> 2] | 0;
 } while ((h | 0) != 0);
 x = c[j >> 2] | 0;
 M = zd(Q, x << 2) | 0;
 h = c[R >> 2] | 0;
 a : do if (h | 0) {
  y = T + 28 | 0;
  z = T + 36 | 0;
  A = T + 32 | 0;
  B = T + 40 | 0;
  C = T + 8 | 0;
  D = T + 48 | 0;
  E = T + 16 | 0;
  F = T + 44 | 0;
  G = T + 12 | 0;
  H = d + 102968 | 0;
  I = d + 102976 | 0;
  J = U + 12 | 0;
  K = U + 16 | 0;
  L = U + 20 | 0;
  b : while (1) {
   j = h + 4 | 0;
   k = b[j >> 1] | 0;
   if ((k & 35) == 34) if (c[h >> 2] | 0) {
    c[y >> 2] = 0;
    c[z >> 2] = 0;
    c[A >> 2] = 0;
    c[M >> 2] = h;
    b[j >> 1] = k & 65535 | 1;
    t = c[B >> 2] | 0;
    u = c[D >> 2] | 0;
    v = c[F >> 2] | 0;
    k = 0;
    l = 0;
    w = 0;
    j = 1;
    do {
     j = j + -1 | 0;
     r = c[M + (j << 2) >> 2] | 0;
     n = r + 4 | 0;
     m = b[n >> 1] | 0;
     if (!(m & 32)) {
      h = 14;
      break b;
     }
     if ((w | 0) >= (t | 0)) {
      h = 16;
      break b;
     }
     c[r + 8 >> 2] = w;
     c[(c[C >> 2] | 0) + (w << 2) >> 2] = r;
     w = w + 1 | 0;
     c[y >> 2] = w;
     m = m & 65535;
     if (!(m & 2)) {
      b[n >> 1] = m | 2;
      g[r + 144 >> 2] = ba(0.0);
     }
     if (c[r >> 2] | 0) {
      m = c[r + 112 >> 2] | 0;
      if (!m) s = l; else while (1) {
       n = c[m + 4 >> 2] | 0;
       o = n + 4 | 0;
       p = c[o >> 2] | 0;
       do if ((p & 7 | 0) == 6) {
        if (a[(c[n + 48 >> 2] | 0) + 38 >> 0] | 0) break;
        if (a[(c[n + 52 >> 2] | 0) + 38 >> 0] | 0) break;
        if ((l | 0) >= (v | 0)) {
         h = 27;
         break b;
        }
        q = l + 1 | 0;
        c[z >> 2] = q;
        c[(c[G >> 2] | 0) + (l << 2) >> 2] = n;
        c[o >> 2] = p | 1;
        l = c[m >> 2] | 0;
        n = l + 4 | 0;
        o = b[n >> 1] | 0;
        if (o & 1) {
         l = q;
         break;
        }
        if ((j | 0) >= (x | 0)) {
         h = 30;
         break b;
        }
        c[M + (j << 2) >> 2] = l;
        b[n >> 1] = o & 65535 | 1;
        l = q;
        j = j + 1 | 0;
       } while (0);
       m = c[m + 12 >> 2] | 0;
       if (!m) {
        s = l;
        break;
       }
      }
      l = c[r + 108 >> 2] | 0;
      if (!l) l = s; else while (1) {
       m = l + 4 | 0;
       n = c[m >> 2] | 0;
       do if (!(a[n + 60 >> 0] | 0)) {
        o = c[l >> 2] | 0;
        p = o + 4 | 0;
        q = b[p >> 1] | 0;
        if (!(q & 32)) break;
        if ((k | 0) >= (u | 0)) {
         h = 36;
         break b;
        }
        r = k + 1 | 0;
        c[A >> 2] = r;
        c[(c[E >> 2] | 0) + (k << 2) >> 2] = n;
        a[(c[m >> 2] | 0) + 60 >> 0] = 1;
        if (q & 1) {
         k = r;
         break;
        }
        if ((j | 0) >= (x | 0)) {
         h = 39;
         break b;
        }
        c[M + (j << 2) >> 2] = o;
        b[p >> 1] = q & 65535 | 1;
        k = r;
        j = j + 1 | 0;
       } while (0);
       l = c[l + 12 >> 2] | 0;
       if (!l) {
        l = s;
        break;
       }
      }
     }
    } while ((j | 0) > 0);
    Gd(T, U, f, H, (a[I >> 0] | 0) != 0);
    W = ba(g[J >> 2]);
    g[N >> 2] = ba(W + ba(g[N >> 2]));
    W = ba(g[K >> 2]);
    g[O >> 2] = ba(W + ba(g[O >> 2]));
    W = ba(g[L >> 2]);
    g[P >> 2] = ba(W + ba(g[P >> 2]));
    j = c[y >> 2] | 0;
    if ((j | 0) > 0) {
     k = c[C >> 2] | 0;
     m = 0;
     do {
      l = c[k + (m << 2) >> 2] | 0;
      if (!(c[l >> 2] | 0)) {
       w = l + 4 | 0;
       b[w >> 1] = e[w >> 1] & 65534;
      }
      m = m + 1 | 0;
     } while ((m | 0) < (j | 0));
    }
   }
   h = c[h + 96 >> 2] | 0;
   if (!h) break a;
  }
  if ((h | 0) == 14) va(3389, 3351, 445, 3411); else if ((h | 0) == 16) va(3417, 3446, 54, 3474); else if ((h | 0) == 27) va(3478, 3446, 62, 3474); else if ((h | 0) == 30) va(3513, 3351, 495, 3411); else if ((h | 0) == 36) va(3536, 3446, 68, 3474); else if ((h | 0) == 39) va(3513, 3351, 524, 3411);
 } while (0);
 Ad(Q, M);
 h = c[R >> 2] | 0;
 if (!h) {
  ac(S);
  W = ba(Dd(U));
  d = d + 103020 | 0;
  g[d >> 2] = W;
  Fd(T);
  i = V;
  return;
 }
 do {
  if (b[h + 4 >> 1] & 1) if (c[h >> 2] | 0) Pb(h);
  h = c[h + 96 >> 2] | 0;
 } while ((h | 0) != 0);
 ac(S);
 W = ba(Dd(U));
 d = d + 103020 | 0;
 g[d >> 2] = W;
 Fd(T);
 i = V;
 return;
}

function ud(a, e, f, h, i, j, k) {
 a = a | 0;
 e = e | 0;
 f = f | 0;
 h = h | 0;
 i = i | 0;
 j = j | 0;
 k = ba(k);
 var l = Ta, m = 0, n = Ta, o = 0, p = 0, q = 0, r = 0, s = Ta, t = Ta, u = Ta, v = Ta, w = Ta, x = Ta, y = Ta, z = Ta, A = Ta, B = Ta, C = Ta, D = Ta, E = Ta;
 c[a >> 2] = f;
 c[a + 4 >> 2] = i;
 r = b[e + 4 >> 1] | 0;
 if ((r + -1 & 65535) >= 2) va(5307, 5257, 50, 6377);
 p = a + 8 | 0;
 o = p;
 m = o + 36 | 0;
 do {
  c[o >> 2] = c[h >> 2];
  o = o + 4 | 0;
  h = h + 4 | 0;
 } while ((o | 0) < (m | 0));
 q = a + 44 | 0;
 o = q;
 h = j;
 m = o + 36 | 0;
 do {
  c[o >> 2] = c[h >> 2];
  o = o + 4 | 0;
  h = h + 4 | 0;
 } while ((o | 0) < (m | 0));
 B = ba(ba(1.0) - k);
 E = ba(B * ba(g[a + 16 >> 2]));
 v = ba(B * ba(g[a + 20 >> 2]));
 u = ba(ba(g[a + 24 >> 2]) * k);
 u = ba(E + u);
 v = ba(v + ba(ba(g[a + 28 >> 2]) * k));
 E = ba(B * ba(g[a + 32 >> 2]));
 E = ba(E + ba(ba(g[a + 36 >> 2]) * k));
 D = ba(Ne(E));
 E = ba(Me(E));
 A = ba(g[p >> 2]);
 z = ba(E * A);
 C = ba(g[a + 12 >> 2]);
 z = ba(u - ba(z - ba(D * C)));
 C = ba(v - ba(ba(D * A) + ba(E * C)));
 A = ba(B * ba(g[a + 52 >> 2]));
 v = ba(B * ba(g[a + 56 >> 2]));
 u = ba(ba(g[a + 60 >> 2]) * k);
 u = ba(A + u);
 v = ba(v + ba(ba(g[a + 64 >> 2]) * k));
 B = ba(B * ba(g[a + 68 >> 2]));
 B = ba(B + ba(ba(g[a + 72 >> 2]) * k));
 A = ba(Ne(B));
 B = ba(Me(B));
 w = ba(g[q >> 2]);
 x = ba(B * w);
 y = ba(g[a + 48 >> 2]);
 x = ba(u - ba(x - ba(A * y)));
 y = ba(v - ba(ba(A * w) + ba(B * y)));
 if (r << 16 >> 16 == 1) {
  c[a + 80 >> 2] = 0;
  j = d[e + 6 >> 0] | 0;
  if ((c[f + 20 >> 2] | 0) <= (j | 0)) va(5330, 5360, 103, 5391);
  m = c[f + 16 >> 2] | 0;
  h = d[e + 9 >> 0] | 0;
  if ((c[i + 20 >> 2] | 0) <= (h | 0)) va(5330, 5360, 103, 5391);
  k = ba(g[m + (j << 3) + 4 >> 2]);
  l = ba(g[m + (j << 3) >> 2]);
  m = c[i + 16 >> 2] | 0;
  v = ba(g[m + (h << 3) >> 2]);
  w = ba(g[m + (h << 3) + 4 >> 2]);
  n = ba(ba(x + ba(ba(B * v) - ba(A * w))) - ba(z + ba(ba(E * l) - ba(D * k))));
  l = ba(ba(y + ba(ba(A * v) + ba(B * w))) - ba(C + ba(ba(E * k) + ba(D * l))));
  m = a + 92 | 0;
  g[m >> 2] = n;
  h = a + 96 | 0;
  g[h >> 2] = l;
  k = ba(O(ba(ba(n * n) + ba(l * l))));
  if (k < ba(1.1920929e-07)) {
   E = ba(0.0);
   return ba(E);
  }
  E = ba(ba(1.0) / k);
  g[m >> 2] = ba(n * E);
  g[h >> 2] = ba(E * l);
  E = k;
  return ba(E);
 }
 p = e + 6 | 0;
 r = b[p >> 1] | 0;
 h = a + 80 | 0;
 if ((r & 255) << 24 >> 24 == ((r & 65535) >>> 8 & 255) << 24 >> 24) {
  c[h >> 2] = 2;
  m = d[e + 9 >> 0] | 0;
  h = c[i + 20 >> 2] | 0;
  if ((h | 0) <= (m | 0)) va(5330, 5360, 103, 5391);
  o = c[i + 16 >> 2] | 0;
  j = d[e + 10 >> 0] | 0;
  if ((h | 0) <= (j | 0)) va(5330, 5360, 103, 5391);
  w = ba(g[o + (m << 3) + 4 >> 2]);
  t = ba(g[o + (m << 3) >> 2]);
  u = ba(g[o + (j << 3) >> 2]);
  s = ba(g[o + (j << 3) + 4 >> 2]);
  l = ba(u - t);
  k = ba(s - w);
  n = ba(-l);
  m = a + 92 | 0;
  g[m >> 2] = k;
  j = a + 96 | 0;
  g[j >> 2] = n;
  l = ba(O(ba(ba(l * l) + ba(k * k))));
  if (l < ba(1.1920929e-07)) v = k; else {
   l = ba(ba(1.0) / l);
   v = ba(k * l);
   g[m >> 2] = v;
   n = ba(l * n);
   g[j >> 2] = n;
  }
  l = ba(ba(t + u) * ba(.5));
  k = ba(ba(w + s) * ba(.5));
  g[a + 84 >> 2] = l;
  g[a + 88 >> 2] = k;
  h = d[p >> 0] | 0;
  if ((c[f + 20 >> 2] | 0) <= (h | 0)) va(5330, 5360, 103, 5391);
  y = ba(y + ba(ba(A * l) + ba(B * k)));
  w = ba(x + ba(ba(B * l) - ba(A * k)));
  x = ba(ba(A * v) + ba(B * n));
  A = ba(ba(B * v) - ba(A * n));
  a = c[f + 16 >> 2] | 0;
  B = ba(g[a + (h << 3) >> 2]);
  k = ba(g[a + (h << 3) + 4 >> 2]);
  k = ba(ba(A * ba(ba(z + ba(ba(E * B) - ba(D * k))) - w)) + ba(x * ba(ba(C + ba(ba(D * B) + ba(E * k))) - y)));
  if (!(k < ba(0.0))) {
   E = k;
   return ba(E);
  }
  E = ba(-n);
  g[m >> 2] = ba(-v);
  g[j >> 2] = E;
  E = ba(-k);
  return ba(E);
 } else {
  c[h >> 2] = 1;
  h = b[p >> 1] | 0;
  j = h & 255;
  m = c[f + 20 >> 2] | 0;
  if ((m | 0) <= (j | 0)) va(5330, 5360, 103, 5391);
  o = (h & 65535) >>> 8 & 65535;
  h = c[f + 16 >> 2] | 0;
  if ((m | 0) <= (o | 0)) va(5330, 5360, 103, 5391);
  w = ba(g[h + (j << 3) + 4 >> 2]);
  t = ba(g[h + (j << 3) >> 2]);
  u = ba(g[h + (o << 3) >> 2]);
  s = ba(g[h + (o << 3) + 4 >> 2]);
  l = ba(u - t);
  k = ba(s - w);
  n = ba(-l);
  m = a + 92 | 0;
  g[m >> 2] = k;
  j = a + 96 | 0;
  g[j >> 2] = n;
  l = ba(O(ba(ba(l * l) + ba(k * k))));
  if (l < ba(1.1920929e-07)) v = k; else {
   l = ba(ba(1.0) / l);
   v = ba(k * l);
   g[m >> 2] = v;
   n = ba(l * n);
   g[j >> 2] = n;
  }
  l = ba(ba(t + u) * ba(.5));
  k = ba(ba(w + s) * ba(.5));
  g[a + 84 >> 2] = l;
  g[a + 88 >> 2] = k;
  h = d[e + 9 >> 0] | 0;
  if ((c[i + 20 >> 2] | 0) <= (h | 0)) va(5330, 5360, 103, 5391);
  C = ba(C + ba(ba(D * l) + ba(E * k)));
  w = ba(z + ba(ba(E * l) - ba(D * k)));
  z = ba(ba(D * v) + ba(E * n));
  D = ba(ba(E * v) - ba(D * n));
  a = c[i + 16 >> 2] | 0;
  E = ba(g[a + (h << 3) >> 2]);
  k = ba(g[a + (h << 3) + 4 >> 2]);
  k = ba(ba(D * ba(ba(x + ba(ba(B * E) - ba(A * k))) - w)) + ba(z * ba(ba(y + ba(ba(A * E) + ba(B * k))) - C)));
  if (!(k < ba(0.0))) {
   E = k;
   return ba(E);
  }
  E = ba(-n);
  g[m >> 2] = ba(-v);
  g[j >> 2] = E;
  E = ba(-k);
  return ba(E);
 }
 return Ta;
}

function Hd(a, b, d, e) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 var f = 0, h = 0, j = 0, l = 0, m = 0, n = 0, o = Ta, p = Ta, q = Ta, r = Ta, s = Ta, t = Ta, u = Ta, v = Ta, w = 0, x = 0, y = 0, z = 0, A = 0, B = 0, C = 0, D = Ta;
 C = i;
 i = i + 128 | 0;
 B = C + 96 | 0;
 n = C + 52 | 0;
 A = C;
 x = a + 28 | 0;
 f = c[x >> 2] | 0;
 if ((f | 0) <= (d | 0)) va(5599, 5623, 386, 5651);
 if ((f | 0) <= (e | 0)) va(5660, 5623, 387, 5651);
 if ((f | 0) > 0) {
  h = a + 8 | 0;
  m = a + 20 | 0;
  l = a + 24 | 0;
  j = 0;
  do {
   z = c[(c[h >> 2] | 0) + (j << 2) >> 2] | 0;
   f = z + 44 | 0;
   y = c[f + 4 >> 2] | 0;
   w = (c[m >> 2] | 0) + (j * 12 | 0) | 0;
   c[w >> 2] = c[f >> 2];
   c[w + 4 >> 2] = y;
   c[(c[m >> 2] | 0) + (j * 12 | 0) + 8 >> 2] = c[z + 56 >> 2];
   w = z + 64 | 0;
   y = c[w + 4 >> 2] | 0;
   f = (c[l >> 2] | 0) + (j * 12 | 0) | 0;
   c[f >> 2] = c[w >> 2];
   c[f + 4 >> 2] = y;
   f = c[l >> 2] | 0;
   c[f + (j * 12 | 0) + 8 >> 2] = c[z + 72 >> 2];
   j = j + 1 | 0;
  } while ((j | 0) < (c[x >> 2] | 0));
 } else {
  f = a + 24 | 0;
  l = f;
  m = a + 20 | 0;
  f = c[f >> 2] | 0;
 }
 z = a + 12 | 0;
 c[n + 24 >> 2] = c[z >> 2];
 y = a + 36 | 0;
 c[n + 28 >> 2] = c[y >> 2];
 c[n + 40 >> 2] = c[a >> 2];
 c[n >> 2] = c[b >> 2];
 c[n + 4 >> 2] = c[b + 4 >> 2];
 c[n + 8 >> 2] = c[b + 8 >> 2];
 c[n + 12 >> 2] = c[b + 12 >> 2];
 c[n + 16 >> 2] = c[b + 16 >> 2];
 c[n + 20 >> 2] = c[b + 20 >> 2];
 c[n + 32 >> 2] = c[m >> 2];
 c[n + 36 >> 2] = f;
 Ud(A, n);
 f = b + 16 | 0;
 if ((c[f >> 2] | 0) > 0) {
  h = 0;
  do {
   h = h + 1 | 0;
   w = (ae(A, d, e) | 0) ^ 1;
  } while ((h | 0) < (c[f >> 2] | 0) & w);
 }
 w = a + 8 | 0;
 j = (c[m >> 2] | 0) + (d * 12 | 0) | 0;
 f = c[j + 4 >> 2] | 0;
 n = (c[(c[w >> 2] | 0) + (d << 2) >> 2] | 0) + 36 | 0;
 c[n >> 2] = c[j >> 2];
 c[n + 4 >> 2] = f;
 n = c[m >> 2] | 0;
 f = c[w >> 2] | 0;
 c[(c[f + (d << 2) >> 2] | 0) + 52 >> 2] = c[n + (d * 12 | 0) + 8 >> 2];
 n = n + (e * 12 | 0) | 0;
 d = c[n + 4 >> 2] | 0;
 f = (c[f + (e << 2) >> 2] | 0) + 36 | 0;
 c[f >> 2] = c[n >> 2];
 c[f + 4 >> 2] = d;
 c[(c[(c[w >> 2] | 0) + (e << 2) >> 2] | 0) + 52 >> 2] = c[(c[m >> 2] | 0) + (e * 12 | 0) + 8 >> 2];
 Wd(A);
 f = b + 12 | 0;
 if ((c[f >> 2] | 0) > 0) {
  h = 0;
  do {
   Yd(A);
   h = h + 1 | 0;
  } while ((h | 0) < (c[f >> 2] | 0));
 }
 s = ba(g[b >> 2]);
 if ((c[x >> 2] | 0) > 0) {
  d = 0;
  do {
   b = c[m >> 2] | 0;
   j = b + (d * 12 | 0) | 0;
   t = ba(g[j >> 2]);
   n = b + (d * 12 | 0) + 4 | 0;
   u = ba(g[n >> 2]);
   v = ba(g[b + (d * 12 | 0) + 8 >> 2]);
   b = c[l >> 2] | 0;
   h = c[b + (d * 12 | 0) >> 2] | 0;
   f = c[b + (d * 12 | 0) + 4 >> 2] | 0;
   o = ba(g[b + (d * 12 | 0) + 8 >> 2]);
   p = (c[k >> 2] = h, ba(g[k >> 2]));
   D = ba(s * p);
   q = (c[k >> 2] = f, ba(g[k >> 2]));
   r = ba(s * q);
   r = ba(ba(D * D) + ba(r * r));
   if (r > ba(4.0)) {
    D = ba(ba(2.0) / ba(O(ba(r))));
    r = ba(p * D);
    h = (g[k >> 2] = r, c[k >> 2] | 0);
    D = ba(q * D);
    f = (g[k >> 2] = D, c[k >> 2] | 0);
   }
   p = ba(s * o);
   if (ba(p * p) > ba(2.46740127)) {
    b = p > ba(0.0);
    D = ba(-p);
    o = ba(o * ba(ba(1.57079637) / (b ? p : D)));
   }
   r = ba(s * (c[k >> 2] = h, ba(g[k >> 2])));
   r = ba(t + r);
   p = ba(u + ba(s * (c[k >> 2] = f, ba(g[k >> 2]))));
   D = ba(v + ba(s * o));
   g[j >> 2] = r;
   g[n >> 2] = p;
   g[(c[m >> 2] | 0) + (d * 12 | 0) + 8 >> 2] = D;
   b = c[l >> 2] | 0;
   c[b + (d * 12 | 0) >> 2] = h;
   c[b + (d * 12 | 0) + 4 >> 2] = f;
   g[(c[l >> 2] | 0) + (d * 12 | 0) + 8 >> 2] = o;
   b = c[(c[w >> 2] | 0) + (d << 2) >> 2] | 0;
   g[b + 44 >> 2] = r;
   g[b + 48 >> 2] = p;
   g[b + 56 >> 2] = D;
   c[b + 64 >> 2] = h;
   c[b + 68 >> 2] = f;
   g[b + 72 >> 2] = o;
   u = ba(Ne(D));
   g[b + 20 >> 2] = u;
   D = ba(Me(D));
   g[b + 24 >> 2] = D;
   q = ba(g[b + 28 >> 2]);
   t = ba(D * q);
   v = ba(g[b + 32 >> 2]);
   D = ba(p - ba(ba(u * q) + ba(D * v)));
   g[b + 12 >> 2] = ba(r - ba(t - ba(u * v)));
   g[b + 16 >> 2] = D;
   d = d + 1 | 0;
  } while ((d | 0) < (c[x >> 2] | 0));
 }
 d = c[A + 40 >> 2] | 0;
 f = a + 4 | 0;
 if (!(c[f >> 2] | 0)) {
  Vd(A);
  i = C;
  return;
 }
 if ((c[y >> 2] | 0) <= 0) {
  Vd(A);
  i = C;
  return;
 }
 h = B + 16 | 0;
 m = 0;
 do {
  j = c[(c[z >> 2] | 0) + (m << 2) >> 2] | 0;
  l = c[d + (m * 152 | 0) + 144 >> 2] | 0;
  c[h >> 2] = l;
  if ((l | 0) > 0) {
   n = 0;
   do {
    c[B + (n << 2) >> 2] = c[d + (m * 152 | 0) + (n * 36 | 0) + 16 >> 2];
    c[B + 8 + (n << 2) >> 2] = c[d + (m * 152 | 0) + (n * 36 | 0) + 20 >> 2];
    n = n + 1 | 0;
   } while ((n | 0) != (l | 0));
  }
  a = c[f >> 2] | 0;
  Za[c[(c[a >> 2] | 0) + 20 >> 2] & 3](a, j, B);
  m = m + 1 | 0;
 } while ((m | 0) < (c[y >> 2] | 0));
 Vd(A);
 i = C;
 return;
}

function pd(a, b) {
 a = a | 0;
 b = b | 0;
 var d = 0, e = 0, f = 0, h = 0, i = 0, j = Ta, k = Ta, l = Ta, m = Ta, n = Ta, o = Ta, p = Ta, q = Ta, r = Ta, s = Ta, t = Ta, u = Ta, v = Ta, w = Ta, x = Ta, y = 0;
 d = a + 24 | 0;
 c[d >> 2] = (c[d >> 2] | 0) + 1;
 d = c[a >> 2] | 0;
 if ((d | 0) == -1) {
  c[a >> 2] = b;
  c[(c[a + 4 >> 2] | 0) + (b * 36 | 0) + 20 >> 2] = -1;
  return;
 }
 y = a + 4 | 0;
 h = c[y >> 2] | 0;
 u = ba(g[h + (b * 36 | 0) >> 2]);
 v = ba(g[h + (b * 36 | 0) + 4 >> 2]);
 w = ba(g[h + (b * 36 | 0) + 8 >> 2]);
 x = ba(g[h + (b * 36 | 0) + 12 >> 2]);
 e = c[h + (d * 36 | 0) + 24 >> 2] | 0;
 a : do if ((e | 0) == -1) i = d; else while (1) {
  f = c[h + (d * 36 | 0) + 28 >> 2] | 0;
  l = ba(g[h + (d * 36 | 0) + 8 >> 2]);
  k = ba(g[h + (d * 36 | 0) >> 2]);
  s = ba(l - k);
  t = ba(g[h + (d * 36 | 0) + 12 >> 2]);
  j = ba(g[h + (d * 36 | 0) + 4 >> 2]);
  s = ba(ba(s + ba(t - j)) * ba(2.0));
  j = ba(ba(ba((l > w ? l : w) - (k < u ? k : u)) + ba((t > x ? t : x) - (j < v ? j : v))) * ba(2.0));
  t = ba(j * ba(2.0));
  s = ba(ba(j - s) * ba(2.0));
  j = ba(g[h + (e * 36 | 0) >> 2]);
  k = u < j ? u : j;
  l = ba(g[h + (e * 36 | 0) + 4 >> 2]);
  m = v < l ? v : l;
  n = ba(g[h + (e * 36 | 0) + 8 >> 2]);
  o = w > n ? w : n;
  p = ba(g[h + (e * 36 | 0) + 12 >> 2]);
  q = x > p ? x : p;
  if ((c[h + (e * 36 | 0) + 24 >> 2] | 0) == -1) j = ba(ba(ba(o - k) + ba(q - m)) * ba(2.0)); else j = ba(ba(ba(ba(o - k) + ba(q - m)) * ba(2.0)) - ba(ba(ba(n - j) + ba(p - l)) * ba(2.0)));
  r = ba(s + j);
  k = ba(g[h + (f * 36 | 0) >> 2]);
  l = u < k ? u : k;
  m = ba(g[h + (f * 36 | 0) + 4 >> 2]);
  n = v < m ? v : m;
  o = ba(g[h + (f * 36 | 0) + 8 >> 2]);
  p = w > o ? w : o;
  q = ba(g[h + (f * 36 | 0) + 12 >> 2]);
  j = x > q ? x : q;
  if ((c[h + (f * 36 | 0) + 24 >> 2] | 0) == -1) j = ba(ba(ba(p - l) + ba(j - n)) * ba(2.0)); else j = ba(ba(ba(ba(p - l) + ba(j - n)) * ba(2.0)) - ba(ba(ba(o - k) + ba(q - m)) * ba(2.0)));
  j = ba(s + j);
  if (t < r & t < j) {
   i = d;
   break a;
  }
  d = r < j ? e : f;
  e = c[h + (d * 36 | 0) + 24 >> 2] | 0;
  if ((e | 0) == -1) {
   i = d;
   break;
  }
 } while (0);
 f = c[h + (i * 36 | 0) + 20 >> 2] | 0;
 h = nd(a) | 0;
 d = c[y >> 2] | 0;
 c[d + (h * 36 | 0) + 20 >> 2] = f;
 c[d + (h * 36 | 0) + 16 >> 2] = 0;
 s = ba(g[d + (i * 36 | 0) >> 2]);
 t = ba(g[d + (i * 36 | 0) + 4 >> 2]);
 g[d + (h * 36 | 0) >> 2] = u < s ? u : s;
 g[d + (h * 36 | 0) + 4 >> 2] = v < t ? v : t;
 u = ba(g[d + (i * 36 | 0) + 8 >> 2]);
 v = ba(g[d + (i * 36 | 0) + 12 >> 2]);
 g[d + (h * 36 | 0) + 8 >> 2] = w > u ? w : u;
 g[d + (h * 36 | 0) + 12 >> 2] = x > v ? x : v;
 d = c[y >> 2] | 0;
 c[d + (h * 36 | 0) + 32 >> 2] = (c[d + (i * 36 | 0) + 32 >> 2] | 0) + 1;
 if ((f | 0) == -1) {
  c[d + (h * 36 | 0) + 24 >> 2] = i;
  f = c[y >> 2] | 0;
  c[f + (h * 36 | 0) + 28 >> 2] = b;
  c[f + (i * 36 | 0) + 20 >> 2] = h;
  c[f + (b * 36 | 0) + 20 >> 2] = h;
  c[a >> 2] = h;
 } else {
  e = d + (f * 36 | 0) + 24 | 0;
  if ((c[e >> 2] | 0) == (i | 0)) c[e >> 2] = h; else c[d + (f * 36 | 0) + 28 >> 2] = h;
  f = c[y >> 2] | 0;
  c[f + (h * 36 | 0) + 24 >> 2] = i;
  c[f + (h * 36 | 0) + 28 >> 2] = b;
  c[f + (i * 36 | 0) + 20 >> 2] = h;
  c[f + (b * 36 | 0) + 20 >> 2] = h;
 }
 d = c[(c[y >> 2] | 0) + (b * 36 | 0) + 20 >> 2] | 0;
 if ((d | 0) == -1) return;
 while (1) {
  d = qd(a, d) | 0;
  e = c[y >> 2] | 0;
  f = c[e + (d * 36 | 0) + 24 >> 2] | 0;
  h = c[e + (d * 36 | 0) + 28 >> 2] | 0;
  if ((f | 0) == -1) {
   d = 20;
   break;
  }
  if ((h | 0) == -1) {
   d = 22;
   break;
  }
  i = c[e + (f * 36 | 0) + 32 >> 2] | 0;
  b = c[e + (h * 36 | 0) + 32 >> 2] | 0;
  c[e + (d * 36 | 0) + 32 >> 2] = ((i | 0) > (b | 0) ? i : b) + 1;
  x = ba(g[e + (f * 36 | 0) >> 2]);
  w = ba(g[e + (h * 36 | 0) >> 2]);
  v = ba(g[e + (f * 36 | 0) + 4 >> 2]);
  u = ba(g[e + (h * 36 | 0) + 4 >> 2]);
  g[e + (d * 36 | 0) >> 2] = x < w ? x : w;
  g[e + (d * 36 | 0) + 4 >> 2] = v < u ? v : u;
  u = ba(g[e + (f * 36 | 0) + 8 >> 2]);
  v = ba(g[e + (h * 36 | 0) + 8 >> 2]);
  w = ba(g[e + (f * 36 | 0) + 12 >> 2]);
  x = ba(g[e + (h * 36 | 0) + 12 >> 2]);
  g[e + (d * 36 | 0) + 8 >> 2] = u > v ? u : v;
  g[e + (d * 36 | 0) + 12 >> 2] = w > x ? w : x;
  d = c[(c[y >> 2] | 0) + (d * 36 | 0) + 20 >> 2] | 0;
  if ((d | 0) == -1) {
   d = 24;
   break;
  }
 }
 if ((d | 0) == 20) va(5120, 4740, 307, 5135); else if ((d | 0) == 22) va(5146, 4740, 308, 5135); else if ((d | 0) == 24) return;
}

function ed(a, b, d, e, f, h) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = ba(e);
 f = f | 0;
 h = ba(h);
 var i = Ta, j = Ta, k = Ta, l = Ta, m = Ta, n = 0, o = Ta, p = Ta, q = 0, r = 0, s = 0, t = 0, u = 0, v = Ta, w = Ta;
 u = b + 60 | 0;
 if (!(c[u >> 2] | 0)) return;
 switch (c[b + 56 >> 2] | 0) {
 case 0:
  {
   g[a >> 2] = ba(1.0);
   n = a + 4 | 0;
   g[n >> 2] = ba(0.0);
   j = ba(g[d + 12 >> 2]);
   m = ba(g[b + 48 >> 2]);
   p = ba(j * m);
   i = ba(g[d + 8 >> 2]);
   o = ba(g[b + 52 >> 2]);
   p = ba(ba(p - ba(i * o)) + ba(g[d >> 2]));
   o = ba(ba(ba(m * i) + ba(j * o)) + ba(g[d + 4 >> 2]));
   j = ba(g[f + 12 >> 2]);
   i = ba(g[b >> 2]);
   m = ba(j * i);
   k = ba(g[f + 8 >> 2]);
   l = ba(g[b + 4 >> 2]);
   m = ba(ba(m - ba(k * l)) + ba(g[f >> 2]));
   l = ba(ba(ba(i * k) + ba(j * l)) + ba(g[f + 4 >> 2]));
   j = ba(p - m);
   k = ba(o - l);
   if (ba(ba(j * j) + ba(k * k)) > ba(1.42108547e-14)) {
    j = ba(m - p);
    i = ba(l - o);
    g[a >> 2] = j;
    g[n >> 2] = i;
    k = ba(O(ba(ba(j * j) + ba(i * i))));
    if (!(k < ba(1.1920929e-07))) {
     k = ba(ba(1.0) / k);
     j = ba(j * k);
     g[a >> 2] = j;
     i = ba(i * k);
     g[n >> 2] = i;
    }
   } else {
    j = ba(1.0);
    i = ba(0.0);
   }
   o = ba(ba(ba(o + ba(i * e)) + ba(l - ba(i * h))) * ba(.5));
   g[a + 8 >> 2] = ba(ba(ba(p + ba(j * e)) + ba(m - ba(j * h))) * ba(.5));
   g[a + 12 >> 2] = o;
   return;
  }
 case 1:
  {
   r = d + 12 | 0;
   p = ba(g[r >> 2]);
   l = ba(g[b + 40 >> 2]);
   i = ba(p * l);
   s = d + 8 | 0;
   m = ba(g[s >> 2]);
   j = ba(g[b + 44 >> 2]);
   i = ba(i - ba(m * j));
   j = ba(ba(l * m) + ba(p * j));
   g[a >> 2] = i;
   t = a + 4 | 0;
   g[t >> 2] = j;
   p = ba(g[r >> 2]);
   m = ba(g[b + 48 >> 2]);
   l = ba(p * m);
   o = ba(g[s >> 2]);
   k = ba(g[b + 52 >> 2]);
   l = ba(ba(l - ba(o * k)) + ba(g[d >> 2]));
   k = ba(ba(ba(m * o) + ba(p * k)) + ba(g[d + 4 >> 2]));
   if ((c[u >> 2] | 0) <= 0) return;
   q = f + 12 | 0;
   r = f + 8 | 0;
   s = f + 4 | 0;
   n = 0;
   while (1) {
    o = ba(g[q >> 2]);
    w = ba(g[b + (n * 20 | 0) >> 2]);
    m = ba(o * w);
    v = ba(g[r >> 2]);
    p = ba(g[b + (n * 20 | 0) + 4 >> 2]);
    m = ba(m - ba(v * p));
    m = ba(ba(g[f >> 2]) + m);
    p = ba(ba(w * v) + ba(o * p));
    p = ba(p + ba(g[s >> 2]));
    o = ba(e - ba(ba(i * ba(m - l)) + ba(ba(p - k) * j)));
    p = ba(ba(ba(p - ba(j * h)) + ba(p + ba(j * o))) * ba(.5));
    g[a + 8 + (n << 3) >> 2] = ba(ba(ba(m - ba(i * h)) + ba(m + ba(i * o))) * ba(.5));
    g[a + 8 + (n << 3) + 4 >> 2] = p;
    n = n + 1 | 0;
    if ((n | 0) >= (c[u >> 2] | 0)) break;
    i = ba(g[a >> 2]);
    j = ba(g[t >> 2]);
   }
   return;
  }
 case 2:
  {
   r = f + 12 | 0;
   w = ba(g[r >> 2]);
   l = ba(g[b + 40 >> 2]);
   j = ba(w * l);
   s = f + 8 | 0;
   p = ba(g[s >> 2]);
   i = ba(g[b + 44 >> 2]);
   j = ba(j - ba(p * i));
   i = ba(ba(l * p) + ba(w * i));
   g[a >> 2] = j;
   t = a + 4 | 0;
   g[t >> 2] = i;
   w = ba(g[r >> 2]);
   p = ba(g[b + 48 >> 2]);
   l = ba(w * p);
   v = ba(g[s >> 2]);
   k = ba(g[b + 52 >> 2]);
   l = ba(l - ba(v * k));
   l = ba(ba(g[f >> 2]) + l);
   k = ba(ba(p * v) + ba(w * k));
   k = ba(k + ba(g[f + 4 >> 2]));
   if ((c[u >> 2] | 0) > 0) {
    q = d + 12 | 0;
    r = d + 8 | 0;
    s = d + 4 | 0;
    n = 0;
    do {
     w = ba(g[q >> 2]);
     m = ba(g[b + (n * 20 | 0) >> 2]);
     v = ba(w * m);
     o = ba(g[r >> 2]);
     p = ba(g[b + (n * 20 | 0) + 4 >> 2]);
     v = ba(v - ba(o * p));
     v = ba(ba(g[d >> 2]) + v);
     p = ba(ba(m * o) + ba(w * p));
     p = ba(p + ba(g[s >> 2]));
     w = ba(h - ba(ba(j * ba(v - l)) + ba(ba(p - k) * i)));
     i = ba(ba(ba(p - ba(i * e)) + ba(p + ba(i * w))) * ba(.5));
     g[a + 8 + (n << 3) >> 2] = ba(ba(ba(v - ba(j * e)) + ba(v + ba(j * w))) * ba(.5));
     g[a + 8 + (n << 3) + 4 >> 2] = i;
     n = n + 1 | 0;
     j = ba(g[a >> 2]);
     i = ba(g[t >> 2]);
    } while ((n | 0) < (c[u >> 2] | 0));
   }
   w = ba(-i);
   g[a >> 2] = ba(-j);
   g[t >> 2] = w;
   return;
  }
 default:
  return;
 }
}

function Ud(b, d) {
 b = b | 0;
 d = d | 0;
 var e = Ta, f = Ta, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, z = 0;
 c[b >> 2] = c[d >> 2];
 c[b + 4 >> 2] = c[d + 4 >> 2];
 c[b + 8 >> 2] = c[d + 8 >> 2];
 c[b + 12 >> 2] = c[d + 12 >> 2];
 c[b + 16 >> 2] = c[d + 16 >> 2];
 c[b + 20 >> 2] = c[d + 20 >> 2];
 k = c[d + 40 >> 2] | 0;
 j = b + 32 | 0;
 c[j >> 2] = k;
 m = c[d + 28 >> 2] | 0;
 n = b + 48 | 0;
 c[n >> 2] = m;
 p = b + 36 | 0;
 c[p >> 2] = zd(k, m * 88 | 0) | 0;
 m = b + 40 | 0;
 c[m >> 2] = zd(c[j >> 2] | 0, (c[n >> 2] | 0) * 152 | 0) | 0;
 c[b + 24 >> 2] = c[d + 32 >> 2];
 c[b + 28 >> 2] = c[d + 36 >> 2];
 d = c[d + 24 >> 2] | 0;
 j = b + 44 | 0;
 c[j >> 2] = d;
 if ((c[n >> 2] | 0) <= 0) return;
 k = b + 20 | 0;
 i = b + 8 | 0;
 d = c[d >> 2] | 0;
 b = c[d + 124 >> 2] | 0;
 if ((b | 0) > 0) {
  l = d;
  o = b;
  q = 0;
 } else va(6141, 6156, 71, 6200);
 while (1) {
  r = c[l + 48 >> 2] | 0;
  h = c[l + 52 >> 2] | 0;
  x = c[r + 8 >> 2] | 0;
  w = c[h + 8 >> 2] | 0;
  h = c[(c[h + 12 >> 2] | 0) + 8 >> 2] | 0;
  r = c[(c[r + 12 >> 2] | 0) + 8 >> 2] | 0;
  d = c[m >> 2] | 0;
  c[d + (q * 152 | 0) + 136 >> 2] = c[l + 136 >> 2];
  c[d + (q * 152 | 0) + 140 >> 2] = c[l + 140 >> 2];
  z = x + 8 | 0;
  c[d + (q * 152 | 0) + 112 >> 2] = c[z >> 2];
  y = w + 8 | 0;
  c[d + (q * 152 | 0) + 116 >> 2] = c[y >> 2];
  v = x + 120 | 0;
  c[d + (q * 152 | 0) + 120 >> 2] = c[v >> 2];
  u = w + 120 | 0;
  c[d + (q * 152 | 0) + 124 >> 2] = c[u >> 2];
  t = x + 128 | 0;
  c[d + (q * 152 | 0) + 128 >> 2] = c[t >> 2];
  s = w + 128 | 0;
  c[d + (q * 152 | 0) + 132 >> 2] = c[s >> 2];
  c[d + (q * 152 | 0) + 148 >> 2] = q;
  c[d + (q * 152 | 0) + 144 >> 2] = o;
  b = d + (q * 152 | 0) + 80 | 0;
  c[b >> 2] = 0;
  c[b + 4 >> 2] = 0;
  c[b + 8 >> 2] = 0;
  c[b + 12 >> 2] = 0;
  c[b + 16 >> 2] = 0;
  c[b + 20 >> 2] = 0;
  c[b + 24 >> 2] = 0;
  c[b + 28 >> 2] = 0;
  b = c[p >> 2] | 0;
  c[b + (q * 88 | 0) + 32 >> 2] = c[z >> 2];
  c[b + (q * 88 | 0) + 36 >> 2] = c[y >> 2];
  c[b + (q * 88 | 0) + 40 >> 2] = c[v >> 2];
  c[b + (q * 88 | 0) + 44 >> 2] = c[u >> 2];
  x = x + 28 | 0;
  u = c[x + 4 >> 2] | 0;
  v = b + (q * 88 | 0) + 48 | 0;
  c[v >> 2] = c[x >> 2];
  c[v + 4 >> 2] = u;
  w = w + 28 | 0;
  v = c[w + 4 >> 2] | 0;
  u = b + (q * 88 | 0) + 56 | 0;
  c[u >> 2] = c[w >> 2];
  c[u + 4 >> 2] = v;
  c[b + (q * 88 | 0) + 64 >> 2] = c[t >> 2];
  c[b + (q * 88 | 0) + 68 >> 2] = c[s >> 2];
  s = l + 104 | 0;
  t = c[s + 4 >> 2] | 0;
  u = b + (q * 88 | 0) + 16 | 0;
  c[u >> 2] = c[s >> 2];
  c[u + 4 >> 2] = t;
  u = l + 112 | 0;
  t = c[u + 4 >> 2] | 0;
  s = b + (q * 88 | 0) + 24 | 0;
  c[s >> 2] = c[u >> 2];
  c[s + 4 >> 2] = t;
  c[b + (q * 88 | 0) + 84 >> 2] = o;
  c[b + (q * 88 | 0) + 76 >> 2] = r;
  c[b + (q * 88 | 0) + 80 >> 2] = h;
  c[b + (q * 88 | 0) + 72 >> 2] = c[l + 120 >> 2];
  h = 0;
  do {
   if (!(a[k >> 0] | 0)) {
    e = ba(0.0);
    f = ba(0.0);
   } else {
    e = ba(g[i >> 2]);
    f = ba(e * ba(g[l + 64 + (h * 20 | 0) + 8 >> 2]));
    e = ba(e * ba(g[l + 64 + (h * 20 | 0) + 12 >> 2]));
   }
   g[d + (q * 152 | 0) + (h * 36 | 0) + 16 >> 2] = f;
   g[d + (q * 152 | 0) + (h * 36 | 0) + 20 >> 2] = e;
   x = d + (q * 152 | 0) + (h * 36 | 0) | 0;
   g[d + (q * 152 | 0) + (h * 36 | 0) + 24 >> 2] = ba(0.0);
   g[d + (q * 152 | 0) + (h * 36 | 0) + 28 >> 2] = ba(0.0);
   g[d + (q * 152 | 0) + (h * 36 | 0) + 32 >> 2] = ba(0.0);
   c[x >> 2] = 0;
   c[x + 4 >> 2] = 0;
   c[x + 8 >> 2] = 0;
   c[x + 12 >> 2] = 0;
   x = l + 64 + (h * 20 | 0) | 0;
   y = c[x + 4 >> 2] | 0;
   z = b + (q * 88 | 0) + (h << 3) | 0;
   c[z >> 2] = c[x >> 2];
   c[z + 4 >> 2] = y;
   h = h + 1 | 0;
  } while ((h | 0) != (o | 0));
  q = q + 1 | 0;
  if ((q | 0) >= (c[n >> 2] | 0)) {
   d = 3;
   break;
  }
  l = c[(c[j >> 2] | 0) + (q << 2) >> 2] | 0;
  o = c[l + 124 >> 2] | 0;
  if ((o | 0) <= 0) {
   d = 4;
   break;
  }
 }
 if ((d | 0) == 3) return; else if ((d | 0) == 4) va(6141, 6156, 71, 6200);
}

function Yc(a, b, d, e, f) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 var h = Ta, i = Ta, j = Ta, l = Ta, m = Ta, n = Ta, o = Ta, p = Ta, q = 0, r = 0, s = 0, t = 0, u = Ta, v = Ta, w = Ta, x = 0, y = 0, z = Ta;
 x = a + 60 | 0;
 c[x >> 2] = 0;
 y = e + 12 | 0;
 o = ba(g[f + 12 >> 2]);
 v = ba(g[y >> 2]);
 w = ba(o * v);
 u = ba(g[f + 8 >> 2]);
 p = ba(g[e + 16 >> 2]);
 w = ba(w - ba(u * p));
 w = ba(ba(g[f >> 2]) + w);
 p = ba(ba(v * u) + ba(o * p));
 p = ba(p + ba(g[f + 4 >> 2]));
 w = ba(w - ba(g[d >> 2]));
 p = ba(p - ba(g[d + 4 >> 2]));
 o = ba(g[d + 12 >> 2]);
 u = ba(w * o);
 v = ba(g[d + 8 >> 2]);
 u = ba(u + ba(p * v));
 v = ba(ba(o * p) - ba(w * v));
 w = ba(g[b + 8 >> 2]);
 w = ba(w + ba(g[e + 8 >> 2]));
 e = c[b + 148 >> 2] | 0;
 do if ((e | 0) > 0) {
  f = 0;
  d = 0;
  i = ba(-3402823469999999843913219.0e14);
  while (1) {
   p = ba(u - ba(g[b + 20 + (f << 3) >> 2]));
   h = ba(v - ba(g[b + 20 + (f << 3) + 4 >> 2]));
   p = ba(p * ba(g[b + 84 + (f << 3) >> 2]));
   h = ba(p + ba(h * ba(g[b + 84 + (f << 3) + 4 >> 2])));
   if (h > w) {
    f = 19;
    break;
   }
   t = h > i;
   i = t ? h : i;
   d = t ? f : d;
   f = f + 1 | 0;
   if ((f | 0) >= (e | 0)) {
    f = 4;
    break;
   }
  }
  if ((f | 0) == 4) {
   t = d;
   d = i < ba(1.1920929e-07);
   break;
  } else if ((f | 0) == 19) return;
 } else {
  t = 0;
  d = 1;
 } while (0);
 s = t + 1 | 0;
 s = (s | 0) < (e | 0) ? s : 0;
 e = c[b + 20 + (t << 3) >> 2] | 0;
 q = c[b + 20 + (t << 3) + 4 >> 2] | 0;
 r = c[b + 20 + (s << 3) >> 2] | 0;
 s = c[b + 20 + (s << 3) + 4 >> 2] | 0;
 if (d) {
  c[x >> 2] = 1;
  c[a + 56 >> 2] = 1;
  t = b + 84 + (t << 3) | 0;
  x = c[t + 4 >> 2] | 0;
  b = a + 40 | 0;
  c[b >> 2] = c[t >> 2];
  c[b + 4 >> 2] = x;
  v = (c[k >> 2] = e, ba(g[k >> 2]));
  v = ba(v + (c[k >> 2] = r, ba(g[k >> 2])));
  w = (c[k >> 2] = q, ba(g[k >> 2]));
  w = ba(ba(w + (c[k >> 2] = s, ba(g[k >> 2]))) * ba(.5));
  g[a + 48 >> 2] = ba(v * ba(.5));
  g[a + 52 >> 2] = w;
  b = y;
  x = c[b + 4 >> 2] | 0;
  y = a;
  c[y >> 2] = c[b >> 2];
  c[y + 4 >> 2] = x;
  c[a + 16 >> 2] = 0;
  return;
 }
 h = (c[k >> 2] = e, ba(g[k >> 2]));
 m = ba(u - h);
 j = (c[k >> 2] = q, ba(g[k >> 2]));
 n = ba(v - j);
 i = (c[k >> 2] = r, ba(g[k >> 2]));
 z = ba(i - h);
 l = (c[k >> 2] = s, ba(g[k >> 2]));
 o = ba(u - i);
 p = ba(v - l);
 if (ba(ba(m * z) + ba(n * ba(l - j))) <= ba(0.0)) {
  h = ba(ba(m * m) + ba(n * n));
  if (h > ba(w * w)) return;
  c[x >> 2] = 1;
  c[a + 56 >> 2] = 1;
  d = a + 40 | 0;
  g[d >> 2] = m;
  f = a + 44 | 0;
  g[f >> 2] = n;
  h = ba(O(ba(h)));
  if (!(h < ba(1.1920929e-07))) {
   z = ba(ba(1.0) / h);
   g[d >> 2] = ba(m * z);
   g[f >> 2] = ba(n * z);
  }
  c[a + 48 >> 2] = e;
  c[a + 52 >> 2] = q;
  b = y;
  x = c[b + 4 >> 2] | 0;
  y = a;
  c[y >> 2] = c[b >> 2];
  c[y + 4 >> 2] = x;
  c[a + 16 >> 2] = 0;
  return;
 }
 if (!(ba(ba(o * ba(h - i)) + ba(p * ba(j - l))) <= ba(0.0))) {
  i = ba(ba(h + i) * ba(.5));
  h = ba(ba(j + l) * ba(.5));
  u = ba(u - i);
  z = ba(v - h);
  d = b + 84 + (t << 3) | 0;
  v = ba(u * ba(g[d >> 2]));
  if (ba(v + ba(z * ba(g[b + 84 + (t << 3) + 4 >> 2]))) > w) return;
  c[x >> 2] = 1;
  c[a + 56 >> 2] = 1;
  t = d;
  x = c[t + 4 >> 2] | 0;
  b = a + 40 | 0;
  c[b >> 2] = c[t >> 2];
  c[b + 4 >> 2] = x;
  g[a + 48 >> 2] = i;
  g[a + 52 >> 2] = h;
  b = y;
  x = c[b + 4 >> 2] | 0;
  y = a;
  c[y >> 2] = c[b >> 2];
  c[y + 4 >> 2] = x;
  c[a + 16 >> 2] = 0;
  return;
 }
 h = ba(ba(o * o) + ba(p * p));
 if (h > ba(w * w)) return;
 c[x >> 2] = 1;
 c[a + 56 >> 2] = 1;
 d = a + 40 | 0;
 g[d >> 2] = o;
 f = a + 44 | 0;
 g[f >> 2] = p;
 h = ba(O(ba(h)));
 if (!(h < ba(1.1920929e-07))) {
  z = ba(ba(1.0) / h);
  g[d >> 2] = ba(o * z);
  g[f >> 2] = ba(p * z);
 }
 c[a + 48 >> 2] = r;
 c[a + 52 >> 2] = s;
 b = y;
 x = c[b + 4 >> 2] | 0;
 y = a;
 c[y >> 2] = c[b >> 2];
 c[y + 4 >> 2] = x;
 c[a + 16 >> 2] = 0;
 return;
}

function ob(d, e) {
 d = d | 0;
 e = e | 0;
 var f = 0, h = 0, j = 0, l = 0, m = 0, n = Ta, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, z = 0, A = 0, B = 0, C = 0, D = 0, E = 0, F = 0;
 E = i;
 i = i + 256 | 0;
 h = E;
 B = E + 232 | 0;
 c[B >> 2] = 0;
 C = E + 76 | 0;
 c[C >> 2] = 0;
 m = E + 240 | 0;
 z = E + 80 | 0;
 A = E + 24 | 0;
 j = E + 16 | 0;
 l = E + 8 | 0;
 a : do if ((d | 0) > 1) {
  f = a[c[e + 4 >> 2] >> 0] | 0;
  switch (f | 0) {
  case 51:
   {
    D = 5;
    break a;
   }
  case 49:
   {
    c[C >> 2] = 5;
    c[2368] = 35;
    f = 35;
    h = 5;
    break a;
   }
  case 50:
   {
    c[C >> 2] = 32;
    c[2368] = 161;
    f = 161;
    h = 32;
    break a;
   }
  case 52:
   {
    c[C >> 2] = 320;
    c[2368] = 2331;
    f = 2331;
    h = 320;
    break a;
   }
  case 53:
   {
    c[C >> 2] = 640;
    c[2368] = 5661;
    f = 5661;
    h = 640;
    break a;
   }
  case 48:
   {
    D = 0;
    i = E;
    return D | 0;
   }
  default:
   {
    c[h >> 2] = f + -48;
    Ee(2356, h) | 0;
    D = -1;
    i = E;
    return D | 0;
   }
  }
 } else D = 5; while (0);
 if ((D | 0) == 5) {
  c[C >> 2] = 64;
  c[2368] = 333;
  f = 333;
  h = 64;
 }
 o = f + h | 0;
 c[2368] = o;
 c[C >> 2] = 0;
 c[2370] = qf(o << 2) | 0;
 g[m >> 2] = ba(0.0);
 g[m + 4 >> 2] = ba(-10.0);
 o = of(103028) | 0;
 oc(o, m);
 c[2369] = o;
 qc(o, 0);
 c[z + 44 >> 2] = 0;
 m = z + 4 | 0;
 c[m >> 2] = 0;
 c[m + 4 >> 2] = 0;
 c[m + 8 >> 2] = 0;
 c[m + 12 >> 2] = 0;
 c[m + 16 >> 2] = 0;
 c[m + 20 >> 2] = 0;
 c[m + 24 >> 2] = 0;
 c[m + 28 >> 2] = 0;
 a[z + 36 >> 0] = 1;
 a[z + 37 >> 0] = 1;
 a[z + 38 >> 0] = 0;
 a[z + 39 >> 0] = 0;
 c[z >> 2] = 0;
 a[z + 40 >> 0] = 1;
 g[z + 48 >> 2] = ba(1.0);
 m = pc(c[2369] | 0, z) | 0;
 c[A >> 2] = 1392;
 c[A + 4 >> 2] = 1;
 g[A + 8 >> 2] = ba(.00999999977);
 o = A + 28 | 0;
 c[o >> 2] = 0;
 c[o + 4 >> 2] = 0;
 c[o + 8 >> 2] = 0;
 c[o + 12 >> 2] = 0;
 b[o + 16 >> 1] = 0;
 g[j >> 2] = ba(-40.0);
 g[j + 4 >> 2] = ba(0.0);
 g[l >> 2] = ba(40.0);
 g[l + 4 >> 2] = ba(0.0);
 yb(A, j, l);
 Rb(m, A, ba(0.0)) | 0;
 c[z >> 2] = 1432;
 c[z + 4 >> 2] = 2;
 g[z + 8 >> 2] = ba(.00999999977);
 c[z + 148 >> 2] = 0;
 g[z + 12 >> 2] = ba(0.0);
 g[z + 16 >> 2] = ba(0.0);
 Gb(z, ba(.5), ba(.5));
 m = A + 44 | 0;
 o = A + 4 | 0;
 p = A + 36 | 0;
 q = A + 37 | 0;
 r = A + 38 | 0;
 s = A + 39 | 0;
 t = A + 40 | 0;
 u = A + 48 | 0;
 v = A + 4 | 0;
 w = A + 8 | 0;
 x = 0;
 y = -1059061760;
 j = 1061158912;
 while (1) {
  h = x;
  l = y;
  f = j;
  while (1) {
   c[m >> 2] = 0;
   c[o >> 2] = 0;
   c[o + 4 >> 2] = 0;
   c[o + 8 >> 2] = 0;
   c[o + 12 >> 2] = 0;
   c[o + 16 >> 2] = 0;
   c[o + 20 >> 2] = 0;
   c[o + 24 >> 2] = 0;
   c[o + 28 >> 2] = 0;
   a[p >> 0] = 1;
   a[q >> 0] = 1;
   a[r >> 0] = 0;
   a[s >> 0] = 0;
   a[t >> 0] = 1;
   g[u >> 2] = ba(1.0);
   c[A >> 2] = 2;
   c[v >> 2] = l;
   c[w >> 2] = f;
   F = pc(c[2369] | 0, A) | 0;
   Rb(F, z, ba(5.0)) | 0;
   c[B >> 2] = F;
   n = ba((c[k >> 2] = l, ba(g[k >> 2])) + ba(1.125));
   l = (g[k >> 2] = n, c[k >> 2] | 0);
   n = ba((c[k >> 2] = f, ba(g[k >> 2])) + ba(0.0));
   h = h + 1 | 0;
   if ((h | 0) >= 40) break; else f = (g[k >> 2] = n, c[k >> 2] | 0);
  }
  n = ba((c[k >> 2] = y, ba(g[k >> 2])) + ba(.5625));
  y = (g[k >> 2] = n, c[k >> 2] | 0);
  n = ba((c[k >> 2] = j, ba(g[k >> 2])) + ba(1.0));
  x = x + 1 | 0;
  if ((x | 0) >= 40) break; else j = (g[k >> 2] = n, c[k >> 2] | 0);
 }
 if ((c[C >> 2] | 0) > 0) {
  f = 0;
  do {
   tc(c[2369] | 0, ba(.0166666675), 3, 3);
   f = f + 1 | 0;
  } while ((f | 0) < (c[C >> 2] | 0));
 }
 if ((d | 0) > 2) {
  F = (a[c[e + 8 >> 2] >> 0] | 0) + -48 | 0;
  c[2372] = F;
  if (!F) D = 19; else {
   Fe(2475) | 0;
   Ja(3, 60, 1);
  }
 } else {
  c[2372] = 0;
  D = 19;
 }
 if ((D | 0) == 19) while (1) {
  pb();
  if ((c[2371] | 0) > (c[2368] | 0)) break; else D = 19;
 }
 F = 0;
 i = E;
 return F | 0;
}

function ae(a, b, d) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 var e = Ta, f = Ta, h = Ta, j = 0, l = 0, m = 0, n = 0, o = Ta, p = Ta, q = Ta, r = Ta, s = Ta, t = Ta, u = Ta, v = Ta, w = Ta, x = Ta, y = Ta, z = Ta, A = Ta, B = Ta, C = 0, D = Ta, E = Ta, F = Ta, G = Ta, H = 0, I = Ta, J = Ta, K = Ta, L = 0, M = 0, N = 0, O = 0, P = 0, Q = 0, R = 0, S = 0, T = 0, U = 0, V = 0, W = 0, X = 0, Y = 0, Z = 0, _ = 0, $ = 0, aa = 0, ca = 0, da = 0, ea = Ta;
 da = i;
 i = i + 64 | 0;
 aa = da + 40 | 0;
 ca = da + 24 | 0;
 $ = da;
 Z = a + 48 | 0;
 if ((c[Z >> 2] | 0) <= 0) {
  K = ba(0.0);
  ca = K >= ba(-.00749999983);
  i = da;
  return ca | 0;
 }
 _ = a + 36 | 0;
 S = a + 24 | 0;
 T = aa + 8 | 0;
 U = aa + 12 | 0;
 V = ca + 8 | 0;
 W = ca + 12 | 0;
 X = aa + 4 | 0;
 L = ca + 4 | 0;
 M = $ + 4 | 0;
 N = $ + 8 | 0;
 O = $ + 12 | 0;
 P = $ + 16 | 0;
 Y = 0;
 e = ba(0.0);
 do {
  a = c[_ >> 2] | 0;
  C = a + (Y * 88 | 0) | 0;
  Q = c[a + (Y * 88 | 0) + 32 >> 2] | 0;
  R = c[a + (Y * 88 | 0) + 36 >> 2] | 0;
  D = ba(g[a + (Y * 88 | 0) + 48 >> 2]);
  E = ba(g[a + (Y * 88 | 0) + 52 >> 2]);
  F = ba(g[a + (Y * 88 | 0) + 56 >> 2]);
  G = ba(g[a + (Y * 88 | 0) + 60 >> 2]);
  H = c[a + (Y * 88 | 0) + 84 >> 2] | 0;
  if ((Q | 0) == (b | 0) | (Q | 0) == (d | 0)) {
   J = ba(g[a + (Y * 88 | 0) + 40 >> 2]);
   I = ba(g[a + (Y * 88 | 0) + 64 >> 2]);
  } else {
   I = ba(0.0);
   J = ba(0.0);
  }
  K = ba(g[a + (Y * 88 | 0) + 44 >> 2]);
  B = ba(g[a + (Y * 88 | 0) + 68 >> 2]);
  n = c[S >> 2] | 0;
  m = c[n + (Q * 12 | 0) >> 2] | 0;
  l = c[n + (Q * 12 | 0) + 4 >> 2] | 0;
  h = ba(g[n + (Q * 12 | 0) + 8 >> 2]);
  j = c[n + (R * 12 | 0) >> 2] | 0;
  a = c[n + (R * 12 | 0) + 4 >> 2] | 0;
  f = ba(g[n + (R * 12 | 0) + 8 >> 2]);
  if ((H | 0) > 0) {
   A = ba(J + K);
   n = 0;
   do {
    r = ba(Ne(h));
    g[T >> 2] = r;
    u = ba(Me(h));
    g[U >> 2] = u;
    q = ba(Ne(f));
    g[V >> 2] = q;
    w = ba(Me(f));
    g[W >> 2] = w;
    x = ba(ba(D * u) - ba(E * r));
    r = ba(ba(E * u) + ba(D * r));
    u = (c[k >> 2] = m, ba(g[k >> 2]));
    x = ba(u - x);
    v = (c[k >> 2] = l, ba(g[k >> 2]));
    r = ba(v - r);
    g[aa >> 2] = x;
    g[X >> 2] = r;
    r = ba(ba(F * w) - ba(G * q));
    q = ba(ba(G * w) + ba(F * q));
    w = (c[k >> 2] = j, ba(g[k >> 2]));
    r = ba(w - r);
    x = (c[k >> 2] = a, ba(g[k >> 2]));
    q = ba(x - q);
    g[ca >> 2] = r;
    g[L >> 2] = q;
    $d($, C, aa, ca, n);
    q = ba(g[$ >> 2]);
    r = ba(g[M >> 2]);
    y = ba(g[N >> 2]);
    z = ba(g[O >> 2]);
    o = ba(g[P >> 2]);
    s = ba(y - u);
    t = ba(z - v);
    y = ba(y - w);
    z = ba(z - x);
    e = e < o ? e : o;
    o = ba(ba(o + ba(.00499999989)) * ba(.75));
    m = o < ba(0.0);
    o = m ? o : ba(0.0);
    p = ba(ba(r * s) - ba(q * t));
    ea = ba(ba(r * y) - ba(q * z));
    p = ba(ba(ea * ba(B * ea)) + ba(A + ba(p * ba(I * p))));
    if (p > ba(0.0)) {
     m = o < ba(-.200000003);
     o = ba(ba(-(m ? ba(-.200000003) : o)) / p);
    } else o = ba(0.0);
    ea = ba(q * o);
    r = ba(r * o);
    q = ba(J * r);
    u = ba(u - ba(J * ea));
    m = (g[k >> 2] = u, c[k >> 2] | 0);
    v = ba(v - q);
    l = (g[k >> 2] = v, c[k >> 2] | 0);
    h = ba(h - ba(I * ba(ba(s * r) - ba(t * ea))));
    v = ba(K * r);
    w = ba(w + ba(K * ea));
    j = (g[k >> 2] = w, c[k >> 2] | 0);
    x = ba(x + v);
    a = (g[k >> 2] = x, c[k >> 2] | 0);
    f = ba(f + ba(B * ba(ba(y * r) - ba(z * ea))));
    n = n + 1 | 0;
   } while ((n | 0) != (H | 0));
   n = c[S >> 2] | 0;
  }
  c[n + (Q * 12 | 0) >> 2] = m;
  c[n + (Q * 12 | 0) + 4 >> 2] = l;
  H = c[S >> 2] | 0;
  g[H + (Q * 12 | 0) + 8 >> 2] = h;
  c[H + (R * 12 | 0) >> 2] = j;
  c[H + (R * 12 | 0) + 4 >> 2] = a;
  g[(c[S >> 2] | 0) + (R * 12 | 0) + 8 >> 2] = f;
  Y = Y + 1 | 0;
 } while ((Y | 0) < (c[Z >> 2] | 0));
 ca = e >= ba(-.00749999983);
 i = da;
 return ca | 0;
}

function _d(a) {
 a = a | 0;
 var b = Ta, d = Ta, e = Ta, f = 0, h = 0, j = 0, l = 0, m = Ta, n = Ta, o = Ta, p = Ta, q = Ta, r = Ta, s = Ta, t = Ta, u = Ta, v = Ta, w = Ta, x = Ta, y = Ta, z = 0, A = Ta, B = Ta, C = Ta, D = Ta, E = Ta, F = Ta, G = Ta, H = Ta, I = 0, J = 0, K = 0, L = 0, M = 0, N = 0, O = 0, P = 0, Q = 0, R = 0, S = 0, T = 0, U = 0, V = 0, W = 0, X = 0, Y = 0, Z = 0, _ = 0, $ = 0, aa = 0, ca = Ta;
 aa = i;
 i = i + 64 | 0;
 _ = aa + 40 | 0;
 $ = aa + 24 | 0;
 Z = aa;
 X = a + 48 | 0;
 if ((c[X >> 2] | 0) <= 0) {
  H = ba(0.0);
  $ = H >= ba(-.0149999997);
  i = aa;
  return $ | 0;
 }
 Y = a + 36 | 0;
 Q = a + 24 | 0;
 R = _ + 8 | 0;
 S = _ + 12 | 0;
 T = $ + 8 | 0;
 U = $ + 12 | 0;
 V = _ + 4 | 0;
 J = $ + 4 | 0;
 K = Z + 4 | 0;
 L = Z + 8 | 0;
 M = Z + 12 | 0;
 N = Z + 16 | 0;
 l = c[Q >> 2] | 0;
 W = 0;
 b = ba(0.0);
 do {
  I = c[Y >> 2] | 0;
  z = I + (W * 88 | 0) | 0;
  O = c[I + (W * 88 | 0) + 32 >> 2] | 0;
  P = c[I + (W * 88 | 0) + 36 >> 2] | 0;
  A = ba(g[I + (W * 88 | 0) + 48 >> 2]);
  B = ba(g[I + (W * 88 | 0) + 52 >> 2]);
  C = ba(g[I + (W * 88 | 0) + 40 >> 2]);
  D = ba(g[I + (W * 88 | 0) + 64 >> 2]);
  E = ba(g[I + (W * 88 | 0) + 56 >> 2]);
  F = ba(g[I + (W * 88 | 0) + 60 >> 2]);
  G = ba(g[I + (W * 88 | 0) + 44 >> 2]);
  H = ba(g[I + (W * 88 | 0) + 68 >> 2]);
  I = c[I + (W * 88 | 0) + 84 >> 2] | 0;
  j = c[l + (O * 12 | 0) >> 2] | 0;
  h = c[l + (O * 12 | 0) + 4 >> 2] | 0;
  e = ba(g[l + (O * 12 | 0) + 8 >> 2]);
  f = c[l + (P * 12 | 0) >> 2] | 0;
  a = c[l + (P * 12 | 0) + 4 >> 2] | 0;
  d = ba(g[l + (P * 12 | 0) + 8 >> 2]);
  if ((I | 0) > 0) {
   y = ba(C + G);
   l = 0;
   do {
    p = ba(Ne(e));
    g[R >> 2] = p;
    s = ba(Me(e));
    g[S >> 2] = s;
    o = ba(Ne(d));
    g[T >> 2] = o;
    u = ba(Me(d));
    g[U >> 2] = u;
    v = ba(ba(A * s) - ba(B * p));
    p = ba(ba(B * s) + ba(A * p));
    s = (c[k >> 2] = j, ba(g[k >> 2]));
    v = ba(s - v);
    t = (c[k >> 2] = h, ba(g[k >> 2]));
    p = ba(t - p);
    g[_ >> 2] = v;
    g[V >> 2] = p;
    p = ba(ba(E * u) - ba(F * o));
    o = ba(ba(F * u) + ba(E * o));
    u = (c[k >> 2] = f, ba(g[k >> 2]));
    p = ba(u - p);
    v = (c[k >> 2] = a, ba(g[k >> 2]));
    o = ba(v - o);
    g[$ >> 2] = p;
    g[J >> 2] = o;
    $d(Z, z, _, $, l);
    o = ba(g[Z >> 2]);
    p = ba(g[K >> 2]);
    w = ba(g[L >> 2]);
    x = ba(g[M >> 2]);
    m = ba(g[N >> 2]);
    q = ba(w - s);
    r = ba(x - t);
    w = ba(w - u);
    x = ba(x - v);
    b = b < m ? b : m;
    m = ba(ba(m + ba(.00499999989)) * ba(.200000003));
    j = m < ba(0.0);
    m = j ? m : ba(0.0);
    n = ba(ba(p * q) - ba(o * r));
    ca = ba(ba(p * w) - ba(o * x));
    n = ba(ba(ca * ba(H * ca)) + ba(y + ba(n * ba(D * n))));
    if (n > ba(0.0)) {
     j = m < ba(-.200000003);
     m = ba(ba(-(j ? ba(-.200000003) : m)) / n);
    } else m = ba(0.0);
    ca = ba(o * m);
    p = ba(p * m);
    o = ba(C * p);
    s = ba(s - ba(C * ca));
    j = (g[k >> 2] = s, c[k >> 2] | 0);
    t = ba(t - o);
    h = (g[k >> 2] = t, c[k >> 2] | 0);
    e = ba(e - ba(D * ba(ba(q * p) - ba(r * ca))));
    t = ba(G * p);
    u = ba(u + ba(G * ca));
    f = (g[k >> 2] = u, c[k >> 2] | 0);
    v = ba(v + t);
    a = (g[k >> 2] = v, c[k >> 2] | 0);
    d = ba(d + ba(H * ba(ba(w * p) - ba(x * ca))));
    l = l + 1 | 0;
   } while ((l | 0) != (I | 0));
   l = c[Q >> 2] | 0;
  }
  c[l + (O * 12 | 0) >> 2] = j;
  c[l + (O * 12 | 0) + 4 >> 2] = h;
  l = c[Q >> 2] | 0;
  g[l + (O * 12 | 0) + 8 >> 2] = e;
  c[l + (P * 12 | 0) >> 2] = f;
  c[l + (P * 12 | 0) + 4 >> 2] = a;
  l = c[Q >> 2] | 0;
  g[l + (P * 12 | 0) + 8 >> 2] = d;
  W = W + 1 | 0;
 } while ((W | 0) < (c[X >> 2] | 0));
 $ = b >= ba(-.0149999997);
 i = aa;
 return $ | 0;
}

function kd(a, e, f, h, i, j) {
 a = a | 0;
 e = e | 0;
 f = f | 0;
 h = h | 0;
 i = i | 0;
 j = j | 0;
 var k = 0, l = Ta, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, z = Ta, A = 0, B = 0, C = Ta, D = Ta, E = Ta, F = Ta, G = Ta, H = Ta;
 k = b[e + 4 >> 1] | 0;
 if ((k & 65535) >= 4) va(4628, 4593, 102, 4646);
 m = k & 65535;
 B = a + 108 | 0;
 c[B >> 2] = m;
 a : do if (!(k << 16 >> 16)) A = m; else {
  u = f + 20 | 0;
  v = f + 16 | 0;
  w = i + 20 | 0;
  x = i + 16 | 0;
  o = h + 12 | 0;
  p = h + 8 | 0;
  q = h + 4 | 0;
  r = j + 12 | 0;
  s = j + 8 | 0;
  t = j + 4 | 0;
  y = 0;
  while (1) {
   k = d[e + 6 + y >> 0] | 0;
   c[a + (y * 36 | 0) + 28 >> 2] = k;
   m = d[e + 9 + y >> 0] | 0;
   c[a + (y * 36 | 0) + 32 >> 2] = m;
   if ((c[u >> 2] | 0) <= (k | 0)) {
    k = 7;
    break;
   }
   n = c[v >> 2] | 0;
   if ((c[w >> 2] | 0) <= (m | 0)) {
    k = 9;
    break;
   }
   E = ba(g[n + (k << 3) + 4 >> 2]);
   G = ba(g[n + (k << 3) >> 2]);
   k = c[x >> 2] | 0;
   F = ba(g[k + (m << 3) >> 2]);
   H = ba(g[k + (m << 3) + 4 >> 2]);
   D = ba(g[o >> 2]);
   C = ba(G * D);
   l = ba(g[p >> 2]);
   C = ba(C - ba(E * l));
   C = ba(ba(g[h >> 2]) + C);
   l = ba(ba(E * D) + ba(G * l));
   l = ba(l + ba(g[q >> 2]));
   g[a + (y * 36 | 0) >> 2] = C;
   g[a + (y * 36 | 0) + 4 >> 2] = l;
   G = ba(g[r >> 2]);
   D = ba(F * G);
   E = ba(g[s >> 2]);
   D = ba(D - ba(H * E));
   D = ba(ba(g[j >> 2]) + D);
   E = ba(ba(H * G) + ba(F * E));
   E = ba(E + ba(g[t >> 2]));
   g[a + (y * 36 | 0) + 8 >> 2] = D;
   g[a + (y * 36 | 0) + 12 >> 2] = E;
   l = ba(E - l);
   g[a + (y * 36 | 0) + 16 >> 2] = ba(D - C);
   g[a + (y * 36 | 0) + 20 >> 2] = l;
   g[a + (y * 36 | 0) + 24 >> 2] = ba(0.0);
   y = y + 1 | 0;
   k = c[B >> 2] | 0;
   if ((y | 0) >= (k | 0)) {
    A = k;
    break a;
   }
  }
  if ((k | 0) == 7) va(5330, 5360, 103, 5391); else if ((k | 0) == 9) va(5330, 5360, 103, 5391);
 } while (0);
 if ((A | 0) > 1) {
  l = ba(g[e >> 2]);
  switch (A | 0) {
  case 2:
   {
    H = ba(ba(g[a + 16 >> 2]) - ba(g[a + 52 >> 2]));
    z = ba(ba(g[a + 20 >> 2]) - ba(g[a + 56 >> 2]));
    z = ba(O(ba(ba(H * H) + ba(z * z))));
    break;
   }
  case 3:
   {
    F = ba(g[a + 52 >> 2]);
    z = ba(g[a + 16 >> 2]);
    F = ba(F - z);
    H = ba(g[a + 56 >> 2]);
    G = ba(g[a + 20 >> 2]);
    H = ba(H - G);
    z = ba(ba(g[a + 88 >> 2]) - z);
    z = ba(ba(F * ba(ba(g[a + 92 >> 2]) - G)) - ba(H * z));
    break;
   }
  default:
   va(5401, 4593, 259, 4656);
  }
  if (!(z < ba(l * ba(.5)))) if (!(ba(l * ba(2.0)) < z | z < ba(1.1920929e-07))) return;
  c[B >> 2] = 0;
 } else if (A | 0) return;
 c[a + 28 >> 2] = 0;
 c[a + 32 >> 2] = 0;
 if ((c[f + 20 >> 2] | 0) <= 0) va(5330, 5360, 103, 5391);
 k = c[f + 16 >> 2] | 0;
 if ((c[i + 20 >> 2] | 0) <= 0) va(5330, 5360, 103, 5391);
 E = ba(g[k + 4 >> 2]);
 C = ba(g[k >> 2]);
 i = c[i + 16 >> 2] | 0;
 D = ba(g[i >> 2]);
 z = ba(g[i + 4 >> 2]);
 F = ba(g[h + 12 >> 2]);
 G = ba(C * F);
 H = ba(g[h + 8 >> 2]);
 G = ba(G - ba(E * H));
 G = ba(ba(g[h >> 2]) + G);
 H = ba(ba(E * F) + ba(C * H));
 H = ba(H + ba(g[h + 4 >> 2]));
 g[a >> 2] = G;
 g[a + 4 >> 2] = H;
 C = ba(g[j + 12 >> 2]);
 F = ba(D * C);
 E = ba(g[j + 8 >> 2]);
 F = ba(F - ba(z * E));
 F = ba(ba(g[j >> 2]) + F);
 E = ba(ba(z * C) + ba(D * E));
 E = ba(E + ba(g[j + 4 >> 2]));
 g[a + 8 >> 2] = F;
 g[a + 12 >> 2] = E;
 H = ba(E - H);
 g[a + 16 >> 2] = ba(F - G);
 g[a + 20 >> 2] = H;
 c[B >> 2] = 1;
 return;
}

function Jf(a, b, d, e, f) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 var g = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0;
 l = a;
 j = b;
 k = j;
 h = d;
 n = e;
 i = n;
 if (!k) {
  g = (f | 0) != 0;
  if (!i) {
   if (g) {
    c[f >> 2] = (l >>> 0) % (h >>> 0);
    c[f + 4 >> 2] = 0;
   }
   n = 0;
   f = (l >>> 0) / (h >>> 0) >>> 0;
   return (C = n, f) | 0;
  } else {
   if (!g) {
    n = 0;
    f = 0;
    return (C = n, f) | 0;
   }
   c[f >> 2] = a | 0;
   c[f + 4 >> 2] = b & 0;
   n = 0;
   f = 0;
   return (C = n, f) | 0;
  }
 }
 g = (i | 0) == 0;
 do if (!h) {
  if (g) {
   if (f | 0) {
    c[f >> 2] = (k >>> 0) % (h >>> 0);
    c[f + 4 >> 2] = 0;
   }
   n = 0;
   f = (k >>> 0) / (h >>> 0) >>> 0;
   return (C = n, f) | 0;
  }
  if (!l) {
   if (f | 0) {
    c[f >> 2] = 0;
    c[f + 4 >> 2] = (k >>> 0) % (i >>> 0);
   }
   n = 0;
   f = (k >>> 0) / (i >>> 0) >>> 0;
   return (C = n, f) | 0;
  }
  g = i - 1 | 0;
  if (!(g & i)) {
   if (f | 0) {
    c[f >> 2] = a | 0;
    c[f + 4 >> 2] = g & k | b & 0;
   }
   n = 0;
   f = k >>> ((Cf(i | 0) | 0) >>> 0);
   return (C = n, f) | 0;
  }
  g = (aa(i | 0) | 0) - (aa(k | 0) | 0) | 0;
  if (g >>> 0 <= 30) {
   b = g + 1 | 0;
   i = 31 - g | 0;
   h = b;
   a = k << i | l >>> (b >>> 0);
   b = k >>> (b >>> 0);
   g = 0;
   i = l << i;
   break;
  }
  if (!f) {
   n = 0;
   f = 0;
   return (C = n, f) | 0;
  }
  c[f >> 2] = a | 0;
  c[f + 4 >> 2] = j | b & 0;
  n = 0;
  f = 0;
  return (C = n, f) | 0;
 } else {
  if (!g) {
   g = (aa(i | 0) | 0) - (aa(k | 0) | 0) | 0;
   if (g >>> 0 <= 31) {
    m = g + 1 | 0;
    i = 31 - g | 0;
    b = g - 31 >> 31;
    h = m;
    a = l >>> (m >>> 0) & b | k << i;
    b = k >>> (m >>> 0) & b;
    g = 0;
    i = l << i;
    break;
   }
   if (!f) {
    n = 0;
    f = 0;
    return (C = n, f) | 0;
   }
   c[f >> 2] = a | 0;
   c[f + 4 >> 2] = j | b & 0;
   n = 0;
   f = 0;
   return (C = n, f) | 0;
  }
  g = h - 1 | 0;
  if (g & h | 0) {
   i = (aa(h | 0) | 0) + 33 - (aa(k | 0) | 0) | 0;
   p = 64 - i | 0;
   m = 32 - i | 0;
   j = m >> 31;
   o = i - 32 | 0;
   b = o >> 31;
   h = i;
   a = m - 1 >> 31 & k >>> (o >>> 0) | (k << m | l >>> (i >>> 0)) & b;
   b = b & k >>> (i >>> 0);
   g = l << p & j;
   i = (k << p | l >>> (o >>> 0)) & j | l << m & i - 33 >> 31;
   break;
  }
  if (f | 0) {
   c[f >> 2] = g & l;
   c[f + 4 >> 2] = 0;
  }
  if ((h | 0) == 1) {
   o = j | b & 0;
   p = a | 0 | 0;
   return (C = o, p) | 0;
  } else {
   p = Cf(h | 0) | 0;
   o = k >>> (p >>> 0) | 0;
   p = k << 32 - p | l >>> (p >>> 0) | 0;
   return (C = o, p) | 0;
  }
 } while (0);
 if (!h) {
  k = i;
  j = 0;
  i = 0;
 } else {
  m = d | 0 | 0;
  l = n | e & 0;
  k = xf(m | 0, l | 0, -1, -1) | 0;
  d = C;
  j = i;
  i = 0;
  do {
   e = j;
   j = g >>> 31 | j << 1;
   g = i | g << 1;
   e = a << 1 | e >>> 31 | 0;
   n = a >>> 31 | b << 1 | 0;
   uf(k | 0, d | 0, e | 0, n | 0) | 0;
   p = C;
   o = p >> 31 | ((p | 0) < 0 ? -1 : 0) << 1;
   i = o & 1;
   a = uf(e | 0, n | 0, o & m | 0, (((p | 0) < 0 ? -1 : 0) >> 31 | ((p | 0) < 0 ? -1 : 0) << 1) & l | 0) | 0;
   b = C;
   h = h - 1 | 0;
  } while ((h | 0) != 0);
  k = j;
  j = 0;
 }
 h = 0;
 if (f | 0) {
  c[f >> 2] = a;
  c[f + 4 >> 2] = b;
 }
 o = (g | 0) >>> 31 | (k | h) << 1 | (h << 1 | g >>> 31) & 0 | j;
 p = (g << 1 | 0 >>> 31) & -2 | i;
 return (C = o, p) | 0;
}

function Ob(a) {
 a = a | 0;
 var d = Ta, e = Ta, f = Ta, h = 0, j = 0, l = Ta, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = Ta, u = Ta, v = 0, w = 0, x = 0, y = 0, z = Ta, A = 0, B = 0, C = 0, D = Ta;
 B = i;
 i = i + 16 | 0;
 q = B;
 r = a + 116 | 0;
 s = a + 120 | 0;
 v = a + 124 | 0;
 w = a + 128 | 0;
 x = a + 28 | 0;
 g[x >> 2] = ba(0.0);
 y = a + 32 | 0;
 g[y >> 2] = ba(0.0);
 c[r >> 2] = 0;
 c[r + 4 >> 2] = 0;
 c[r + 8 >> 2] = 0;
 c[r + 12 >> 2] = 0;
 switch (c[a >> 2] | 0) {
 case 1:
 case 0:
  {
   y = a + 12 | 0;
   x = c[y >> 2] | 0;
   y = c[y + 4 >> 2] | 0;
   A = a + 36 | 0;
   c[A >> 2] = x;
   c[A + 4 >> 2] = y;
   A = a + 44 | 0;
   c[A >> 2] = x;
   c[A + 4 >> 2] = y;
   c[a + 52 >> 2] = c[a + 56 >> 2];
   i = B;
   return;
  }
 case 2:
  {
   j = c[2429] | 0;
   h = c[2430] | 0;
   m = c[a + 100 >> 2] | 0;
   if (!m) {
    e = ba(0.0);
    A = 11;
   } else {
    n = q + 4 | 0;
    o = q + 8 | 0;
    p = q + 12 | 0;
    e = ba(0.0);
    d = ba(0.0);
    do {
     f = ba(g[m >> 2]);
     if (!(f == ba(0.0))) {
      C = c[m + 12 >> 2] | 0;
      $a[c[(c[C >> 2] | 0) + 28 >> 2] & 3](C, q, f);
      e = ba(g[q >> 2]);
      d = ba(e + ba(g[r >> 2]));
      g[r >> 2] = d;
      l = ba(e * ba(g[n >> 2]));
      e = ba(e * ba(g[o >> 2]));
      l = ba((c[k >> 2] = j, ba(g[k >> 2])) + l);
      j = (g[k >> 2] = l, c[k >> 2] | 0);
      e = ba((c[k >> 2] = h, ba(g[k >> 2])) + e);
      h = (g[k >> 2] = e, c[k >> 2] | 0);
      e = ba(g[p >> 2]);
      e = ba(e + ba(g[v >> 2]));
      g[v >> 2] = e;
     }
     m = c[m + 4 >> 2] | 0;
    } while ((m | 0) != 0);
    if (d > ba(0.0)) {
     f = ba(ba(1.0) / d);
     g[s >> 2] = f;
     l = ba((c[k >> 2] = j, ba(g[k >> 2])) * f);
     j = (g[k >> 2] = l, c[k >> 2] | 0);
     f = ba((c[k >> 2] = h, ba(g[k >> 2])) * f);
     l = e;
     h = (g[k >> 2] = f, c[k >> 2] | 0);
    } else A = 11;
   }
   if ((A | 0) == 11) {
    g[r >> 2] = ba(1.0);
    g[s >> 2] = ba(1.0);
    l = e;
    d = ba(1.0);
   }
   do if (l > ba(0.0)) if (!(b[a + 4 >> 1] & 16)) {
    e = (c[k >> 2] = j, ba(g[k >> 2]));
    D = ba(e * e);
    f = (c[k >> 2] = h, ba(g[k >> 2]));
    d = ba(l - ba(ba(D + ba(f * f)) * d));
    g[v >> 2] = d;
    if (d > ba(0.0)) {
     t = e;
     u = f;
     z = ba(ba(1.0) / d);
     break;
    } else va(3168, 2868, 319, 3154);
   } else A = 17; else A = 17; while (0);
   if ((A | 0) == 17) {
    g[v >> 2] = ba(0.0);
    t = (c[k >> 2] = j, ba(g[k >> 2]));
    u = (c[k >> 2] = h, ba(g[k >> 2]));
    z = ba(0.0);
   }
   g[w >> 2] = z;
   A = a + 44 | 0;
   D = ba(g[A >> 2]);
   C = a + 48 | 0;
   z = ba(g[C >> 2]);
   c[x >> 2] = j;
   c[y >> 2] = h;
   f = ba(g[a + 24 >> 2]);
   l = ba(t * f);
   e = ba(g[a + 20 >> 2]);
   l = ba(l - ba(e * u));
   l = ba(ba(g[a + 12 >> 2]) + l);
   t = ba(ba(t * e) + ba(f * u));
   t = ba(t + ba(g[a + 16 >> 2]));
   g[A >> 2] = l;
   g[C >> 2] = t;
   g[a + 36 >> 2] = l;
   g[a + 40 >> 2] = t;
   u = ba(g[a + 72 >> 2]);
   z = ba(u * ba(t - z));
   D = ba(u * ba(l - D));
   C = a + 64 | 0;
   g[C >> 2] = ba(ba(g[C >> 2]) - z);
   C = a + 68 | 0;
   g[C >> 2] = ba(D + ba(g[C >> 2]));
   i = B;
   return;
  }
 default:
  va(3129, 2868, 284, 3154);
 }
}

function wd(a, b, d, e) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = ba(e);
 var f = 0, h = Ta, i = Ta, j = Ta, k = Ta, l = Ta, m = Ta, n = Ta, o = Ta, p = Ta, q = Ta, r = Ta, s = Ta, t = Ta;
 n = ba(ba(1.0) - e);
 q = ba(n * ba(g[a + 16 >> 2]));
 i = ba(n * ba(g[a + 20 >> 2]));
 h = ba(ba(g[a + 24 >> 2]) * e);
 h = ba(q + h);
 i = ba(i + ba(ba(g[a + 28 >> 2]) * e));
 q = ba(n * ba(g[a + 32 >> 2]));
 q = ba(q + ba(ba(g[a + 36 >> 2]) * e));
 p = ba(Ne(q));
 q = ba(Me(q));
 m = ba(g[a + 8 >> 2]);
 l = ba(q * m);
 r = ba(g[a + 12 >> 2]);
 l = ba(h - ba(l - ba(p * r)));
 r = ba(i - ba(ba(p * m) + ba(q * r)));
 m = ba(n * ba(g[a + 52 >> 2]));
 i = ba(n * ba(g[a + 56 >> 2]));
 h = ba(ba(g[a + 60 >> 2]) * e);
 h = ba(m + h);
 i = ba(i + ba(ba(g[a + 64 >> 2]) * e));
 n = ba(n * ba(g[a + 68 >> 2]));
 n = ba(n + ba(ba(g[a + 72 >> 2]) * e));
 m = ba(Ne(n));
 n = ba(Me(n));
 j = ba(g[a + 44 >> 2]);
 k = ba(n * j);
 o = ba(g[a + 48 >> 2]);
 k = ba(h - ba(k - ba(m * o)));
 o = ba(i - ba(ba(m * j) + ba(n * o)));
 switch (c[a + 80 >> 2] | 0) {
 case 0:
  {
   i = ba(g[a + 92 >> 2]);
   j = ba(g[a + 96 >> 2]);
   f = c[a >> 2] | 0;
   if ((b | 0) <= -1) va(5330, 5360, 103, 5391);
   if ((c[f + 20 >> 2] | 0) <= (b | 0)) va(5330, 5360, 103, 5391);
   f = c[f + 16 >> 2] | 0;
   h = ba(g[f + (b << 3) >> 2]);
   e = ba(g[f + (b << 3) + 4 >> 2]);
   f = c[a + 4 >> 2] | 0;
   if ((d | 0) <= -1) va(5330, 5360, 103, 5391);
   if ((c[f + 20 >> 2] | 0) <= (d | 0)) va(5330, 5360, 103, 5391);
   a = c[f + 16 >> 2] | 0;
   t = ba(g[a + (d << 3) >> 2]);
   s = ba(g[a + (d << 3) + 4 >> 2]);
   r = ba(ba(i * ba(ba(k + ba(ba(n * t) - ba(m * s))) - ba(l + ba(ba(q * h) - ba(p * e))))) + ba(j * ba(ba(o + ba(ba(m * t) + ba(n * s))) - ba(r + ba(ba(p * h) + ba(q * e))))));
   return ba(r);
  }
 case 1:
  {
   t = ba(g[a + 92 >> 2]);
   i = ba(q * t);
   j = ba(g[a + 96 >> 2]);
   i = ba(i - ba(p * j));
   j = ba(ba(p * t) + ba(q * j));
   t = ba(g[a + 84 >> 2]);
   h = ba(q * t);
   e = ba(g[a + 88 >> 2]);
   h = ba(l + ba(h - ba(p * e)));
   e = ba(r + ba(ba(p * t) + ba(q * e)));
   f = c[a + 4 >> 2] | 0;
   if ((d | 0) <= -1) va(5330, 5360, 103, 5391);
   if ((c[f + 20 >> 2] | 0) <= (d | 0)) va(5330, 5360, 103, 5391);
   a = c[f + 16 >> 2] | 0;
   s = ba(g[a + (d << 3) >> 2]);
   t = ba(g[a + (d << 3) + 4 >> 2]);
   t = ba(ba(i * ba(ba(k + ba(ba(n * s) - ba(m * t))) - h)) + ba(j * ba(ba(o + ba(ba(m * s) + ba(n * t))) - e)));
   return ba(t);
  }
 case 2:
  {
   t = ba(g[a + 92 >> 2]);
   i = ba(n * t);
   j = ba(g[a + 96 >> 2]);
   i = ba(i - ba(m * j));
   j = ba(ba(m * t) + ba(n * j));
   t = ba(g[a + 84 >> 2]);
   h = ba(n * t);
   e = ba(g[a + 88 >> 2]);
   h = ba(k + ba(h - ba(m * e)));
   e = ba(o + ba(ba(m * t) + ba(n * e)));
   f = c[a >> 2] | 0;
   if ((b | 0) <= -1) va(5330, 5360, 103, 5391);
   if ((c[f + 20 >> 2] | 0) <= (b | 0)) va(5330, 5360, 103, 5391);
   a = c[f + 16 >> 2] | 0;
   s = ba(g[a + (b << 3) >> 2]);
   t = ba(g[a + (b << 3) + 4 >> 2]);
   t = ba(ba(i * ba(ba(l + ba(ba(q * s) - ba(p * t))) - h)) + ba(j * ba(ba(r + ba(ba(p * s) + ba(q * t))) - e)));
   return ba(t);
  }
 default:
  va(5401, 5257, 242, 5425);
 }
 return ba(0.0);
}

function $d(a, b, d, e, f) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 var h = Ta, i = Ta, j = Ta, k = Ta, l = Ta, m = Ta, n = Ta, o = Ta, p = Ta, q = 0, r = 0, s = 0;
 if ((c[b + 84 >> 2] | 0) <= 0) va(6358, 6156, 617, 6377);
 switch (c[b + 72 >> 2] | 0) {
 case 0:
  {
   k = ba(g[d + 12 >> 2]);
   n = ba(g[b + 24 >> 2]);
   o = ba(k * n);
   h = ba(g[d + 8 >> 2]);
   m = ba(g[b + 28 >> 2]);
   o = ba(ba(o - ba(h * m)) + ba(g[d >> 2]));
   m = ba(ba(ba(n * h) + ba(k * m)) + ba(g[d + 4 >> 2]));
   k = ba(g[e + 12 >> 2]);
   h = ba(g[b >> 2]);
   n = ba(k * h);
   l = ba(g[e + 8 >> 2]);
   j = ba(g[b + 4 >> 2]);
   n = ba(ba(n - ba(l * j)) + ba(g[e >> 2]));
   j = ba(ba(ba(h * l) + ba(k * j)) + ba(g[e + 4 >> 2]));
   k = ba(n - o);
   l = ba(j - m);
   g[a >> 2] = k;
   f = a + 4 | 0;
   g[f >> 2] = l;
   h = ba(O(ba(ba(k * k) + ba(l * l))));
   if (h < ba(1.1920929e-07)) {
    h = k;
    i = l;
   } else {
    i = ba(ba(1.0) / h);
    h = ba(k * i);
    g[a >> 2] = h;
    i = ba(l * i);
    g[f >> 2] = i;
   }
   m = ba(ba(m + j) * ba(.5));
   g[a + 8 >> 2] = ba(ba(o + n) * ba(.5));
   g[a + 12 >> 2] = m;
   g[a + 16 >> 2] = ba(ba(ba(ba(k * h) + ba(l * i)) - ba(g[b + 76 >> 2])) - ba(g[b + 80 >> 2]));
   return;
  }
 case 1:
  {
   r = d + 12 | 0;
   i = ba(g[r >> 2]);
   k = ba(g[b + 16 >> 2]);
   j = ba(i * k);
   q = d + 8 | 0;
   n = ba(g[q >> 2]);
   m = ba(g[b + 20 >> 2]);
   j = ba(j - ba(n * m));
   m = ba(ba(k * n) + ba(i * m));
   g[a >> 2] = j;
   g[a + 4 >> 2] = m;
   i = ba(g[r >> 2]);
   n = ba(g[b + 24 >> 2]);
   k = ba(i * n);
   p = ba(g[q >> 2]);
   l = ba(g[b + 28 >> 2]);
   k = ba(ba(k - ba(p * l)) + ba(g[d >> 2]));
   l = ba(ba(ba(n * p) + ba(i * l)) + ba(g[d + 4 >> 2]));
   i = ba(g[e + 12 >> 2]);
   p = ba(g[b + (f << 3) >> 2]);
   n = ba(i * p);
   h = ba(g[e + 8 >> 2]);
   o = ba(g[b + (f << 3) + 4 >> 2]);
   n = ba(ba(n - ba(h * o)) + ba(g[e >> 2]));
   o = ba(ba(ba(p * h) + ba(i * o)) + ba(g[e + 4 >> 2]));
   g[a + 16 >> 2] = ba(ba(ba(ba(j * ba(n - k)) + ba(ba(o - l) * m)) - ba(g[b + 76 >> 2])) - ba(g[b + 80 >> 2]));
   g[a + 8 >> 2] = n;
   g[a + 12 >> 2] = o;
   return;
  }
 case 2:
  {
   s = e + 12 | 0;
   j = ba(g[s >> 2]);
   k = ba(g[b + 16 >> 2]);
   o = ba(j * k);
   q = e + 8 | 0;
   m = ba(g[q >> 2]);
   p = ba(g[b + 20 >> 2]);
   o = ba(o - ba(m * p));
   p = ba(ba(k * m) + ba(j * p));
   g[a >> 2] = o;
   r = a + 4 | 0;
   g[r >> 2] = p;
   j = ba(g[s >> 2]);
   m = ba(g[b + 24 >> 2]);
   k = ba(j * m);
   h = ba(g[q >> 2]);
   l = ba(g[b + 28 >> 2]);
   k = ba(ba(k - ba(h * l)) + ba(g[e >> 2]));
   l = ba(ba(ba(m * h) + ba(j * l)) + ba(g[e + 4 >> 2]));
   j = ba(g[d + 12 >> 2]);
   h = ba(g[b + (f << 3) >> 2]);
   m = ba(j * h);
   i = ba(g[d + 8 >> 2]);
   n = ba(g[b + (f << 3) + 4 >> 2]);
   m = ba(ba(m - ba(i * n)) + ba(g[d >> 2]));
   n = ba(ba(ba(h * i) + ba(j * n)) + ba(g[d + 4 >> 2]));
   g[a + 16 >> 2] = ba(ba(ba(ba(o * ba(m - k)) + ba(ba(n - l) * p)) - ba(g[b + 76 >> 2])) - ba(g[b + 80 >> 2]));
   g[a + 8 >> 2] = m;
   g[a + 12 >> 2] = n;
   p = ba(-p);
   g[a >> 2] = ba(-o);
   g[r >> 2] = p;
   return;
  }
 default:
  return;
 }
}

function Zc(b, d, e, f, h) {
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 h = h | 0;
 var i = Ta, j = Ta, l = Ta, m = Ta, n = Ta, o = Ta, p = Ta, q = Ta, r = Ta, s = Ta, t = Ta, u = Ta, v = Ta, w = Ta, x = 0, y = 0, z = 0, A = 0;
 z = b + 60 | 0;
 c[z >> 2] = 0;
 A = f + 12 | 0;
 t = ba(g[h + 12 >> 2]);
 s = ba(g[A >> 2]);
 v = ba(t * s);
 j = ba(g[h + 8 >> 2]);
 l = ba(g[f + 16 >> 2]);
 v = ba(v - ba(j * l));
 v = ba(ba(g[h >> 2]) + v);
 l = ba(ba(s * j) + ba(t * l));
 l = ba(l + ba(g[h + 4 >> 2]));
 v = ba(v - ba(g[e >> 2]));
 l = ba(l - ba(g[e + 4 >> 2]));
 t = ba(g[e + 12 >> 2]);
 j = ba(v * t);
 s = ba(g[e + 8 >> 2]);
 j = ba(j + ba(l * s));
 s = ba(ba(t * l) - ba(v * s));
 x = c[d + 12 >> 2] | 0;
 y = c[d + 16 >> 2] | 0;
 e = c[d + 20 >> 2] | 0;
 h = c[d + 24 >> 2] | 0;
 v = (c[k >> 2] = e, ba(g[k >> 2]));
 l = (c[k >> 2] = x, ba(g[k >> 2]));
 t = ba(v - l);
 w = (c[k >> 2] = h, ba(g[k >> 2]));
 m = (c[k >> 2] = y, ba(g[k >> 2]));
 n = ba(w - m);
 o = ba(ba(t * ba(v - j)) + ba(n * ba(w - s)));
 p = ba(j - l);
 q = ba(s - m);
 r = ba(ba(p * t) + ba(q * n));
 u = ba(g[d + 8 >> 2]);
 u = ba(u + ba(g[f + 8 >> 2]));
 if (r <= ba(0.0)) {
  if (ba(ba(p * p) + ba(q * q)) > ba(u * u)) return;
  if (a[d + 44 >> 0] | 0) {
   w = ba(g[d + 28 >> 2]);
   if (ba(ba(ba(l - j) * ba(l - w)) + ba(ba(m - s) * ba(m - ba(g[d + 32 >> 2])))) > ba(0.0)) return;
  }
  c[z >> 2] = 1;
  c[b + 56 >> 2] = 0;
  g[b + 40 >> 2] = ba(0.0);
  g[b + 44 >> 2] = ba(0.0);
  c[b + 48 >> 2] = x;
  c[b + 52 >> 2] = y;
  z = b + 16 | 0;
  c[z >> 2] = 0;
  a[z >> 0] = 0;
  a[z + 1 >> 0] = 0;
  a[z + 2 >> 0] = 0;
  a[z + 3 >> 0] = 0;
  z = A;
  A = c[z + 4 >> 2] | 0;
  c[b >> 2] = c[z >> 2];
  c[b + 4 >> 2] = A;
  return;
 }
 if (o <= ba(0.0)) {
  j = ba(j - v);
  i = ba(s - w);
  if (ba(ba(j * j) + ba(i * i)) > ba(u * u)) return;
  if (a[d + 45 >> 0] | 0) {
   u = ba(g[d + 36 >> 2]);
   if (ba(ba(j * ba(u - v)) + ba(i * ba(ba(g[d + 40 >> 2]) - w))) > ba(0.0)) return;
  }
  c[z >> 2] = 1;
  c[b + 56 >> 2] = 0;
  g[b + 40 >> 2] = ba(0.0);
  g[b + 44 >> 2] = ba(0.0);
  c[b + 48 >> 2] = e;
  c[b + 52 >> 2] = h;
  z = b + 16 | 0;
  c[z >> 2] = 0;
  a[z >> 0] = 1;
  a[z + 1 >> 0] = 0;
  a[z + 2 >> 0] = 0;
  a[z + 3 >> 0] = 0;
  z = A;
  A = c[z + 4 >> 2] | 0;
  c[b >> 2] = c[z >> 2];
  c[b + 4 >> 2] = A;
  return;
 }
 i = ba(ba(t * t) + ba(n * n));
 if (!(i > ba(0.0))) va(4372, 4383, 127, 4417);
 i = ba(ba(1.0) / i);
 v = ba(j - ba(i * ba(ba(l * o) + ba(v * r))));
 w = ba(s - ba(i * ba(ba(m * o) + ba(w * r))));
 if (ba(ba(v * v) + ba(w * w)) > ba(u * u)) return;
 l = ba(-n);
 d = ba(ba(q * t) + ba(p * l)) < ba(0.0);
 i = ba(-t);
 l = d ? n : l;
 i = d ? i : t;
 j = ba(O(ba(ba(l * l) + ba(i * i))));
 if (j < ba(1.1920929e-07)) j = l; else {
  w = ba(ba(1.0) / j);
  j = ba(l * w);
  i = ba(i * w);
 }
 c[z >> 2] = 1;
 c[b + 56 >> 2] = 1;
 g[b + 40 >> 2] = j;
 g[b + 44 >> 2] = i;
 c[b + 48 >> 2] = x;
 c[b + 52 >> 2] = y;
 z = b + 16 | 0;
 c[z >> 2] = 0;
 a[z >> 0] = 0;
 a[z + 1 >> 0] = 0;
 a[z + 2 >> 0] = 1;
 a[z + 3 >> 0] = 0;
 z = A;
 A = c[z + 4 >> 2] | 0;
 c[b >> 2] = c[z >> 2];
 c[b + 4 >> 2] = A;
 return;
}

function Nb(d, e, f) {
 d = d | 0;
 e = e | 0;
 f = f | 0;
 var h = Ta, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = Ta;
 q = e + 4 | 0;
 h = ba(g[q >> 2]);
 if (h != h | ba(0.0) != ba(0.0)) va(2845, 2868, 27, 2894);
 p = h > ba(-s);
 if (!(p & h < ba(s))) va(2845, 2868, 27, 2894);
 h = ba(g[e + 8 >> 2]);
 if (h != h | ba(0.0) != ba(0.0)) va(2845, 2868, 27, 2894);
 p = h > ba(-s);
 if (!(p & h < ba(s))) va(2845, 2868, 27, 2894);
 p = e + 16 | 0;
 h = ba(g[p >> 2]);
 if (h != h | ba(0.0) != ba(0.0)) va(2901, 2868, 28, 2894);
 o = h > ba(-s);
 if (!(o & h < ba(s))) va(2901, 2868, 28, 2894);
 h = ba(g[e + 20 >> 2]);
 if (h != h | ba(0.0) != ba(0.0)) va(2901, 2868, 28, 2894);
 o = h > ba(-s);
 if (!(o & h < ba(s))) va(2901, 2868, 28, 2894);
 o = e + 12 | 0;
 h = ba(g[o >> 2]);
 if (h != h | ba(0.0) != ba(0.0)) va(2930, 2868, 29, 2894);
 n = h > ba(-s);
 if (!(n & h < ba(s))) va(2930, 2868, 29, 2894);
 n = e + 24 | 0;
 h = ba(g[n >> 2]);
 if (h != h | ba(0.0) != ba(0.0)) va(2951, 2868, 30, 2894);
 m = h > ba(-s);
 if (!(m & h < ba(s))) va(2951, 2868, 30, 2894);
 m = e + 32 | 0;
 h = ba(g[m >> 2]);
 if (h != h | ba(0.0) != ba(0.0)) va(2982, 2868, 31, 2894);
 l = !(h > ba(-s));
 if (!(h < ba(s)) | l | !(h >= ba(0.0))) va(2982, 2868, 31, 2894);
 l = e + 28 | 0;
 h = ba(g[l >> 2]);
 if (h != h | ba(0.0) != ba(0.0)) va(3042, 2868, 32, 2894);
 k = !(h > ba(-s));
 if (!(h < ba(s)) | k | !(h >= ba(0.0))) va(3042, 2868, 32, 2894);
 k = d + 4 | 0;
 b[k >> 1] = 0;
 i = (a[e + 39 >> 0] | 0) == 0 ? 0 : 8;
 b[k >> 1] = i;
 if (a[e + 38 >> 0] | 0) {
  i = (i & 65535 | 16) & 65535;
  b[k >> 1] = i;
 }
 j = b[e + 36 >> 1] | 0;
 if ((j & 255) << 24 >> 24) {
  i = (i & 65535 | 4) & 65535;
  b[k >> 1] = i;
 }
 if ((j & 65535) >= 256) {
  i = (i & 65535 | 2) & 65535;
  b[k >> 1] = i;
 }
 if (a[e + 40 >> 0] | 0) b[k >> 1] = i & 65535 | 32;
 c[d + 88 >> 2] = f;
 f = q;
 k = c[f >> 2] | 0;
 f = c[f + 4 >> 2] | 0;
 q = d + 12 | 0;
 c[q >> 2] = k;
 c[q + 4 >> 2] = f;
 r = ba(g[o >> 2]);
 g[d + 20 >> 2] = ba(Ne(r));
 g[d + 24 >> 2] = ba(Me(r));
 g[d + 28 >> 2] = ba(0.0);
 g[d + 32 >> 2] = ba(0.0);
 q = d + 36 | 0;
 c[q >> 2] = k;
 c[q + 4 >> 2] = f;
 q = d + 44 | 0;
 c[q >> 2] = k;
 c[q + 4 >> 2] = f;
 q = c[o >> 2] | 0;
 c[d + 52 >> 2] = q;
 c[d + 56 >> 2] = q;
 g[d + 60 >> 2] = ba(0.0);
 c[d + 108 >> 2] = 0;
 c[d + 112 >> 2] = 0;
 c[d + 92 >> 2] = 0;
 c[d + 96 >> 2] = 0;
 q = c[p + 4 >> 2] | 0;
 f = d + 64 | 0;
 c[f >> 2] = c[p >> 2];
 c[f + 4 >> 2] = q;
 c[d + 72 >> 2] = c[n >> 2];
 c[d + 132 >> 2] = c[l >> 2];
 c[d + 136 >> 2] = c[m >> 2];
 c[d + 140 >> 2] = c[e + 48 >> 2];
 g[d + 76 >> 2] = ba(0.0);
 g[d + 80 >> 2] = ba(0.0);
 g[d + 84 >> 2] = ba(0.0);
 g[d + 144 >> 2] = ba(0.0);
 f = c[e >> 2] | 0;
 c[d >> 2] = f;
 f = (f | 0) == 2;
 r = f ? ba(1.0) : ba(0.0);
 h = f ? ba(1.0) : ba(0.0);
 g[d + 116 >> 2] = r;
 g[d + 120 >> 2] = h;
 g[d + 124 >> 2] = ba(0.0);
 g[d + 128 >> 2] = ba(0.0);
 c[d + 148 >> 2] = c[e + 44 >> 2];
 c[d + 100 >> 2] = 0;
 c[d + 104 >> 2] = 0;
 return;
}

function ec(a, b, d, e, f) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 var g = 0, h = 0, j = 0, k = 0;
 j = i;
 i = i + 16 | 0;
 h = j;
 k = bb[c[f >> 2] & 3](b, a) | 0;
 g = bb[c[f >> 2] & 3](d, b) | 0;
 do if (k) {
  if (g) {
   c[h >> 2] = c[a >> 2];
   c[h + 4 >> 2] = c[a + 4 >> 2];
   c[h + 8 >> 2] = c[a + 8 >> 2];
   c[a >> 2] = c[d >> 2];
   c[a + 4 >> 2] = c[d + 4 >> 2];
   c[a + 8 >> 2] = c[d + 8 >> 2];
   c[d >> 2] = c[h >> 2];
   c[d + 4 >> 2] = c[h + 4 >> 2];
   c[d + 8 >> 2] = c[h + 8 >> 2];
   g = 1;
   break;
  };
  c[h >> 2] = c[a >> 2];
  c[h + 4 >> 2] = c[a + 4 >> 2];
  c[h + 8 >> 2] = c[a + 8 >> 2];
  c[a >> 2] = c[b >> 2];
  c[a + 4 >> 2] = c[b + 4 >> 2];
  c[a + 8 >> 2] = c[b + 8 >> 2];
  c[b >> 2] = c[h >> 2];
  c[b + 4 >> 2] = c[h + 4 >> 2];
  c[b + 8 >> 2] = c[h + 8 >> 2];
  if (bb[c[f >> 2] & 3](d, b) | 0) {
   c[h >> 2] = c[b >> 2];
   c[h + 4 >> 2] = c[b + 4 >> 2];
   c[h + 8 >> 2] = c[b + 8 >> 2];
   c[b >> 2] = c[d >> 2];
   c[b + 4 >> 2] = c[d + 4 >> 2];
   c[b + 8 >> 2] = c[d + 8 >> 2];
   c[d >> 2] = c[h >> 2];
   c[d + 4 >> 2] = c[h + 4 >> 2];
   c[d + 8 >> 2] = c[h + 8 >> 2];
   g = 2;
  } else g = 1;
 } else if (g) {
  c[h >> 2] = c[b >> 2];
  c[h + 4 >> 2] = c[b + 4 >> 2];
  c[h + 8 >> 2] = c[b + 8 >> 2];
  c[b >> 2] = c[d >> 2];
  c[b + 4 >> 2] = c[d + 4 >> 2];
  c[b + 8 >> 2] = c[d + 8 >> 2];
  c[d >> 2] = c[h >> 2];
  c[d + 4 >> 2] = c[h + 4 >> 2];
  c[d + 8 >> 2] = c[h + 8 >> 2];
  if (bb[c[f >> 2] & 3](b, a) | 0) {
   c[h >> 2] = c[a >> 2];
   c[h + 4 >> 2] = c[a + 4 >> 2];
   c[h + 8 >> 2] = c[a + 8 >> 2];
   c[a >> 2] = c[b >> 2];
   c[a + 4 >> 2] = c[b + 4 >> 2];
   c[a + 8 >> 2] = c[b + 8 >> 2];
   c[b >> 2] = c[h >> 2];
   c[b + 4 >> 2] = c[h + 4 >> 2];
   c[b + 8 >> 2] = c[h + 8 >> 2];
   g = 2;
  } else g = 1;
 } else g = 0; while (0);
 if (!(bb[c[f >> 2] & 3](e, d) | 0)) {
  k = g;
  i = j;
  return k | 0;
 };
 c[h >> 2] = c[d >> 2];
 c[h + 4 >> 2] = c[d + 4 >> 2];
 c[h + 8 >> 2] = c[d + 8 >> 2];
 c[d >> 2] = c[e >> 2];
 c[d + 4 >> 2] = c[e + 4 >> 2];
 c[d + 8 >> 2] = c[e + 8 >> 2];
 c[e >> 2] = c[h >> 2];
 c[e + 4 >> 2] = c[h + 4 >> 2];
 c[e + 8 >> 2] = c[h + 8 >> 2];
 if (!(bb[c[f >> 2] & 3](d, b) | 0)) {
  k = g + 1 | 0;
  i = j;
  return k | 0;
 };
 c[h >> 2] = c[b >> 2];
 c[h + 4 >> 2] = c[b + 4 >> 2];
 c[h + 8 >> 2] = c[b + 8 >> 2];
 c[b >> 2] = c[d >> 2];
 c[b + 4 >> 2] = c[d + 4 >> 2];
 c[b + 8 >> 2] = c[d + 8 >> 2];
 c[d >> 2] = c[h >> 2];
 c[d + 4 >> 2] = c[h + 4 >> 2];
 c[d + 8 >> 2] = c[h + 8 >> 2];
 if (!(bb[c[f >> 2] & 3](b, a) | 0)) {
  k = g + 2 | 0;
  i = j;
  return k | 0;
 };
 c[h >> 2] = c[a >> 2];
 c[h + 4 >> 2] = c[a + 4 >> 2];
 c[h + 8 >> 2] = c[a + 8 >> 2];
 c[a >> 2] = c[b >> 2];
 c[a + 4 >> 2] = c[b + 4 >> 2];
 c[a + 8 >> 2] = c[b + 8 >> 2];
 c[b >> 2] = c[h >> 2];
 c[b + 4 >> 2] = c[h + 4 >> 2];
 c[b + 8 >> 2] = c[h + 8 >> 2];
 k = g + 3 | 0;
 i = j;
 return k | 0;
}

function fc(a, b, d) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 var e = 0, f = 0, g = 0, h = 0, j = 0, k = 0;
 j = i;
 i = i + 16 | 0;
 h = j;
 e = a + 24 | 0;
 f = a + 12 | 0;
 k = bb[c[d >> 2] & 3](f, a) | 0;
 g = bb[c[d >> 2] & 3](e, f) | 0;
 do if (k) {
  if (g) {
   c[h >> 2] = c[a >> 2];
   c[h + 4 >> 2] = c[a + 4 >> 2];
   c[h + 8 >> 2] = c[a + 8 >> 2];
   c[a >> 2] = c[e >> 2];
   c[a + 4 >> 2] = c[e + 4 >> 2];
   c[a + 8 >> 2] = c[e + 8 >> 2];
   c[e >> 2] = c[h >> 2];
   c[e + 4 >> 2] = c[h + 4 >> 2];
   c[e + 8 >> 2] = c[h + 8 >> 2];
   break;
  };
  c[h >> 2] = c[a >> 2];
  c[h + 4 >> 2] = c[a + 4 >> 2];
  c[h + 8 >> 2] = c[a + 8 >> 2];
  c[a >> 2] = c[f >> 2];
  c[a + 4 >> 2] = c[f + 4 >> 2];
  c[a + 8 >> 2] = c[f + 8 >> 2];
  c[f >> 2] = c[h >> 2];
  c[f + 4 >> 2] = c[h + 4 >> 2];
  c[f + 8 >> 2] = c[h + 8 >> 2];
  if (bb[c[d >> 2] & 3](e, f) | 0) {
   c[h >> 2] = c[f >> 2];
   c[h + 4 >> 2] = c[f + 4 >> 2];
   c[h + 8 >> 2] = c[f + 8 >> 2];
   c[f >> 2] = c[e >> 2];
   c[f + 4 >> 2] = c[e + 4 >> 2];
   c[f + 8 >> 2] = c[e + 8 >> 2];
   c[e >> 2] = c[h >> 2];
   c[e + 4 >> 2] = c[h + 4 >> 2];
   c[e + 8 >> 2] = c[h + 8 >> 2];
  }
 } else if (g) {
  c[h >> 2] = c[f >> 2];
  c[h + 4 >> 2] = c[f + 4 >> 2];
  c[h + 8 >> 2] = c[f + 8 >> 2];
  c[f >> 2] = c[e >> 2];
  c[f + 4 >> 2] = c[e + 4 >> 2];
  c[f + 8 >> 2] = c[e + 8 >> 2];
  c[e >> 2] = c[h >> 2];
  c[e + 4 >> 2] = c[h + 4 >> 2];
  c[e + 8 >> 2] = c[h + 8 >> 2];
  if (bb[c[d >> 2] & 3](f, a) | 0) {
   c[h >> 2] = c[a >> 2];
   c[h + 4 >> 2] = c[a + 4 >> 2];
   c[h + 8 >> 2] = c[a + 8 >> 2];
   c[a >> 2] = c[f >> 2];
   c[a + 4 >> 2] = c[f + 4 >> 2];
   c[a + 8 >> 2] = c[f + 8 >> 2];
   c[f >> 2] = c[h >> 2];
   c[f + 4 >> 2] = c[h + 4 >> 2];
   c[f + 8 >> 2] = c[h + 8 >> 2];
  }
 } while (0);
 f = a + 36 | 0;
 if ((f | 0) == (b | 0)) {
  i = j;
  return;
 }
 while (1) {
  if (bb[c[d >> 2] & 3](f, e) | 0) {
   c[h >> 2] = c[f >> 2];
   c[h + 4 >> 2] = c[f + 4 >> 2];
   c[h + 8 >> 2] = c[f + 8 >> 2];
   g = f;
   while (1) {
    c[g >> 2] = c[e >> 2];
    c[g + 4 >> 2] = c[e + 4 >> 2];
    c[g + 8 >> 2] = c[e + 8 >> 2];
    if ((e | 0) == (a | 0)) break;
    g = e + -12 | 0;
    if (bb[c[d >> 2] & 3](h, g) | 0) {
     k = e;
     e = g;
     g = k;
    } else break;
   }
   c[e >> 2] = c[h >> 2];
   c[e + 4 >> 2] = c[h + 4 >> 2];
   c[e + 8 >> 2] = c[h + 8 >> 2];
  }
  e = f + 12 | 0;
  if ((e | 0) == (b | 0)) break; else {
   k = f;
   f = e;
   e = k;
  }
 }
 i = j;
 return;
}

function Xd(a) {
 a = a | 0;
 var b = Ta, d = Ta, e = 0, f = 0, h = 0, i = 0, j = Ta, l = Ta, m = 0, n = Ta, o = Ta, p = Ta, q = Ta, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, z = 0, A = 0, B = Ta, C = Ta, D = Ta, E = Ta;
 z = a + 48 | 0;
 if ((c[z >> 2] | 0) <= 0) return;
 A = a + 40 | 0;
 v = a + 28 | 0;
 f = c[v >> 2] | 0;
 y = 0;
 do {
  s = c[A >> 2] | 0;
  w = c[s + (y * 152 | 0) + 112 >> 2] | 0;
  x = c[s + (y * 152 | 0) + 116 >> 2] | 0;
  n = ba(g[s + (y * 152 | 0) + 120 >> 2]);
  o = ba(g[s + (y * 152 | 0) + 128 >> 2]);
  p = ba(g[s + (y * 152 | 0) + 124 >> 2]);
  q = ba(g[s + (y * 152 | 0) + 132 >> 2]);
  r = c[s + (y * 152 | 0) + 144 >> 2] | 0;
  t = f + (w * 12 | 0) | 0;
  h = c[t >> 2] | 0;
  u = f + (w * 12 | 0) + 4 | 0;
  i = c[u >> 2] | 0;
  d = ba(g[f + (w * 12 | 0) + 8 >> 2]);
  e = c[f + (x * 12 | 0) >> 2] | 0;
  a = c[f + (x * 12 | 0) + 4 >> 2] | 0;
  b = ba(g[f + (x * 12 | 0) + 8 >> 2]);
  j = ba(g[s + (y * 152 | 0) + 72 >> 2]);
  l = ba(g[s + (y * 152 | 0) + 76 >> 2]);
  if ((r | 0) > 0) {
   m = 0;
   f = i;
   do {
    E = ba(g[s + (y * 152 | 0) + (m * 36 | 0) + 16 >> 2]);
    C = ba(j * E);
    E = ba(l * E);
    B = ba(g[s + (y * 152 | 0) + (m * 36 | 0) + 20 >> 2]);
    C = ba(C + ba(l * B));
    B = ba(E - ba(j * B));
    E = ba(ba(g[s + (y * 152 | 0) + (m * 36 | 0) >> 2]) * B);
    d = ba(d - ba(o * ba(E - ba(ba(g[s + (y * 152 | 0) + (m * 36 | 0) + 4 >> 2]) * C))));
    E = ba(n * C);
    D = ba(n * B);
    E = ba((c[k >> 2] = h, ba(g[k >> 2])) - E);
    h = (g[k >> 2] = E, c[k >> 2] | 0);
    D = ba((c[k >> 2] = f, ba(g[k >> 2])) - D);
    f = (g[k >> 2] = D, c[k >> 2] | 0);
    D = ba(B * ba(g[s + (y * 152 | 0) + (m * 36 | 0) + 8 >> 2]));
    b = ba(b + ba(q * ba(D - ba(C * ba(g[s + (y * 152 | 0) + (m * 36 | 0) + 12 >> 2])))));
    C = ba(p * C);
    B = ba(p * B);
    C = ba((c[k >> 2] = e, ba(g[k >> 2])) + C);
    e = (g[k >> 2] = C, c[k >> 2] | 0);
    B = ba((c[k >> 2] = a, ba(g[k >> 2])) + B);
    a = (g[k >> 2] = B, c[k >> 2] | 0);
    m = m + 1 | 0;
   } while ((m | 0) != (r | 0));
  } else f = i;
  c[t >> 2] = h;
  c[u >> 2] = f;
  f = c[v >> 2] | 0;
  g[f + (w * 12 | 0) + 8 >> 2] = d;
  c[f + (x * 12 | 0) >> 2] = e;
  c[f + (x * 12 | 0) + 4 >> 2] = a;
  f = c[v >> 2] | 0;
  g[f + (x * 12 | 0) + 8 >> 2] = b;
  y = y + 1 | 0;
 } while ((y | 0) < (c[z >> 2] | 0));
 return;
}

function id(a) {
 a = a | 0;
 var b = 0, d = 0, e = Ta, f = Ta, h = Ta, i = Ta, j = Ta, k = Ta, l = Ta, m = Ta, n = Ta, o = Ta, p = Ta, q = Ta, r = Ta, s = Ta, t = Ta, u = Ta, v = Ta;
 r = ba(g[a + 16 >> 2]);
 p = ba(g[a + 20 >> 2]);
 b = a + 36 | 0;
 o = ba(g[a + 52 >> 2]);
 q = ba(g[a + 56 >> 2]);
 d = a + 72 | 0;
 s = ba(g[a + 88 >> 2]);
 m = ba(g[a + 92 >> 2]);
 u = ba(o - r);
 l = ba(q - p);
 e = ba(ba(r * u) + ba(p * l));
 f = ba(ba(o * u) + ba(q * l));
 n = ba(s - r);
 t = ba(m - p);
 h = ba(ba(r * n) + ba(p * t));
 i = ba(ba(s * n) + ba(m * t));
 v = ba(s - o);
 k = ba(m - q);
 j = ba(ba(o * v) + ba(q * k));
 k = ba(ba(s * v) + ba(m * k));
 n = ba(ba(u * t) - ba(l * n));
 l = ba(ba(ba(o * m) - ba(q * s)) * n);
 m = ba(ba(ba(p * s) - ba(r * m)) * n);
 n = ba(ba(ba(r * q) - ba(p * o)) * n);
 if (e >= ba(-0.0) & h >= ba(-0.0)) {
  g[a + 24 >> 2] = ba(1.0);
  c[a + 108 >> 2] = 1;
  return;
 }
 if (f > ba(0.0) & e < ba(-0.0) & n <= ba(0.0)) {
  v = ba(ba(1.0) / ba(f - e));
  g[a + 24 >> 2] = ba(f * v);
  g[a + 60 >> 2] = ba(-ba(e * v));
  c[a + 108 >> 2] = 2;
  return;
 }
 if (i > ba(0.0) & h < ba(-0.0) & m <= ba(0.0)) {
  v = ba(ba(1.0) / ba(i - h));
  g[a + 24 >> 2] = ba(i * v);
  g[a + 96 >> 2] = ba(-ba(h * v));
  c[a + 108 >> 2] = 2;
  a = b;
  b = d;
  d = a + 36 | 0;
  do {
   c[a >> 2] = c[b >> 2];
   a = a + 4 | 0;
   b = b + 4 | 0;
  } while ((a | 0) < (d | 0));
  return;
 }
 if (f <= ba(0.0) & j >= ba(-0.0)) {
  g[a + 60 >> 2] = ba(1.0);
  c[a + 108 >> 2] = 1;
  d = a + 36 | 0;
  do {
   c[a >> 2] = c[b >> 2];
   a = a + 4 | 0;
   b = b + 4 | 0;
  } while ((a | 0) < (d | 0));
  return;
 }
 if (i <= ba(0.0) & k <= ba(0.0)) {
  g[a + 96 >> 2] = ba(1.0);
  c[a + 108 >> 2] = 1;
  b = d;
  d = a + 36 | 0;
  do {
   c[a >> 2] = c[b >> 2];
   a = a + 4 | 0;
   b = b + 4 | 0;
  } while ((a | 0) < (d | 0));
  return;
 }
 if (k > ba(0.0) & j < ba(-0.0) & l <= ba(0.0)) {
  v = ba(ba(1.0) / ba(k - j));
  g[a + 60 >> 2] = ba(k * v);
  g[a + 96 >> 2] = ba(-ba(j * v));
  c[a + 108 >> 2] = 2;
  b = d;
  d = a + 36 | 0;
  do {
   c[a >> 2] = c[b >> 2];
   a = a + 4 | 0;
   b = b + 4 | 0;
  } while ((a | 0) < (d | 0));
  return;
 } else {
  v = ba(ba(1.0) / ba(n + ba(l + m)));
  g[a + 24 >> 2] = ba(l * v);
  g[a + 60 >> 2] = ba(m * v);
  g[a + 96 >> 2] = ba(n * v);
  c[a + 108 >> 2] = 3;
  return;
 }
}

function Cc(d, f) {
 d = d | 0;
 f = f | 0;
 var h = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x = 0;
 x = i;
 i = i + 64 | 0;
 w = x;
 m = d + 64 | 0;
 h = w;
 j = m;
 k = h + 64 | 0;
 do {
  c[h >> 2] = c[j >> 2];
  h = h + 4 | 0;
  j = j + 4 | 0;
 } while ((h | 0) < (k | 0));
 u = d + 4 | 0;
 q = c[u >> 2] | 0;
 c[u >> 2] = q | 4;
 q = q >>> 1;
 l = c[d + 48 >> 2] | 0;
 h = c[d + 52 >> 2] | 0;
 v = (a[h + 38 >> 0] | a[l + 38 >> 0]) << 24 >> 24 != 0;
 s = c[l + 8 >> 2] | 0;
 t = c[h + 8 >> 2] | 0;
 j = s + 12 | 0;
 k = t + 12 | 0;
 if (v) {
  l = gd(c[l + 12 >> 2] | 0, c[d + 56 >> 2] | 0, c[h + 12 >> 2] | 0, c[d + 60 >> 2] | 0, j, k) | 0;
  c[d + 124 >> 2] = 0;
  h = q & 1;
 } else {
  db[c[c[d >> 2] >> 2] & 15](d, m, j, k);
  p = d + 124 | 0;
  l = (c[p >> 2] | 0) > 0;
  a : do if (l) {
   k = c[w + 60 >> 2] | 0;
   if ((k | 0) > 0) o = 0; else {
    h = 0;
    while (1) {
     g[d + 64 + (h * 20 | 0) + 8 >> 2] = ba(0.0);
     g[d + 64 + (h * 20 | 0) + 12 >> 2] = ba(0.0);
     h = h + 1 | 0;
     if ((h | 0) >= (c[p >> 2] | 0)) break a;
    }
   }
   do {
    m = d + 64 + (o * 20 | 0) + 8 | 0;
    g[m >> 2] = ba(0.0);
    n = d + 64 + (o * 20 | 0) + 12 | 0;
    g[n >> 2] = ba(0.0);
    j = c[d + 64 + (o * 20 | 0) + 16 >> 2] | 0;
    h = 0;
    do {
     if ((c[w + (h * 20 | 0) + 16 >> 2] | 0) == (j | 0)) {
      r = 8;
      break;
     }
     h = h + 1 | 0;
    } while ((h | 0) < (k | 0));
    if ((r | 0) == 8) {
     r = 0;
     c[m >> 2] = c[w + (h * 20 | 0) + 8 >> 2];
     c[n >> 2] = c[w + (h * 20 | 0) + 12 >> 2];
    }
    o = o + 1 | 0;
   } while ((o | 0) < (c[p >> 2] | 0));
  } while (0);
  h = q & 1;
  if ((h | 0) != 0 ^ l) {
   j = s + 4 | 0;
   k = e[j >> 1] | 0;
   if (!(k & 2)) {
    b[j >> 1] = k | 2;
    g[s + 144 >> 2] = ba(0.0);
   }
   j = t + 4 | 0;
   k = e[j >> 1] | 0;
   if (!(k & 2)) {
    b[j >> 1] = k | 2;
    g[t + 144 >> 2] = ba(0.0);
   }
  }
 }
 j = c[u >> 2] | 0;
 c[u >> 2] = l ? j | 2 : j & -3;
 h = (h | 0) == 0;
 j = (f | 0) != 0;
 k = j & l;
 if (h & k) Xa[c[(c[f >> 2] | 0) + 8 >> 2] & 15](f, d);
 if (j & (l ^ 1) & (h ^ 1)) Xa[c[(c[f >> 2] | 0) + 12 >> 2] & 15](f, d);
 if (!(k & (v ^ 1))) {
  i = x;
  return;
 }
 Za[c[(c[f >> 2] | 0) + 16 >> 2] & 3](f, d, w);
 i = x;
 return;
}

function rd(a, b) {
 a = a | 0;
 b = b | 0;
 var d = 0, e = 0, f = 0, h = 0, i = 0, j = 0, k = Ta, l = Ta, m = Ta, n = Ta;
 if ((c[a >> 2] | 0) == (b | 0)) {
  c[a >> 2] = -1;
  return;
 }
 f = a + 4 | 0;
 h = c[f >> 2] | 0;
 i = c[h + (b * 36 | 0) + 20 >> 2] | 0;
 j = h + (i * 36 | 0) + 20 | 0;
 d = c[j >> 2] | 0;
 e = c[h + (i * 36 | 0) + 24 >> 2] | 0;
 if ((e | 0) == (b | 0)) b = c[h + (i * 36 | 0) + 28 >> 2] | 0; else b = e;
 if ((d | 0) == -1) {
  c[a >> 2] = b;
  c[h + (b * 36 | 0) + 20 >> 2] = -1;
  if ((i | 0) <= -1) va(4787, 4740, 97, 4826);
  if ((c[a + 12 >> 2] | 0) <= (i | 0)) va(4787, 4740, 97, 4826);
  d = a + 8 | 0;
  if ((c[d >> 2] | 0) <= 0) va(4835, 4740, 98, 4826);
  a = a + 16 | 0;
  c[j >> 2] = c[a >> 2];
  c[h + (i * 36 | 0) + 32 >> 2] = -1;
  c[a >> 2] = i;
  c[d >> 2] = (c[d >> 2] | 0) + -1;
  return;
 }
 e = h + (d * 36 | 0) + 24 | 0;
 if ((c[e >> 2] | 0) == (i | 0)) c[e >> 2] = b; else c[h + (d * 36 | 0) + 28 >> 2] = b;
 c[h + (b * 36 | 0) + 20 >> 2] = d;
 if ((i | 0) <= -1) va(4787, 4740, 97, 4826);
 if ((c[a + 12 >> 2] | 0) <= (i | 0)) va(4787, 4740, 97, 4826);
 e = a + 8 | 0;
 if ((c[e >> 2] | 0) <= 0) va(4835, 4740, 98, 4826);
 b = a + 16 | 0;
 c[j >> 2] = c[b >> 2];
 c[h + (i * 36 | 0) + 32 >> 2] = -1;
 c[b >> 2] = i;
 c[e >> 2] = (c[e >> 2] | 0) + -1;
 do {
  j = qd(a, d) | 0;
  i = c[f >> 2] | 0;
  b = c[i + (j * 36 | 0) + 24 >> 2] | 0;
  h = c[i + (j * 36 | 0) + 28 >> 2] | 0;
  k = ba(g[i + (b * 36 | 0) >> 2]);
  l = ba(g[i + (h * 36 | 0) >> 2]);
  m = ba(g[i + (b * 36 | 0) + 4 >> 2]);
  n = ba(g[i + (h * 36 | 0) + 4 >> 2]);
  g[i + (j * 36 | 0) >> 2] = k < l ? k : l;
  g[i + (j * 36 | 0) + 4 >> 2] = m < n ? m : n;
  n = ba(g[i + (b * 36 | 0) + 8 >> 2]);
  m = ba(g[i + (h * 36 | 0) + 8 >> 2]);
  l = ba(g[i + (b * 36 | 0) + 12 >> 2]);
  k = ba(g[i + (h * 36 | 0) + 12 >> 2]);
  g[i + (j * 36 | 0) + 8 >> 2] = n > m ? n : m;
  g[i + (j * 36 | 0) + 12 >> 2] = l > k ? l : k;
  i = c[f >> 2] | 0;
  b = c[i + (b * 36 | 0) + 32 >> 2] | 0;
  h = c[i + (h * 36 | 0) + 32 >> 2] | 0;
  c[i + (j * 36 | 0) + 32 >> 2] = ((b | 0) > (h | 0) ? b : h) + 1;
  d = c[i + (j * 36 | 0) + 20 >> 2] | 0;
 } while ((d | 0) != -1);
 return;
}

function $b(a) {
 a = a | 0;
 var d = 0, e = 0, f = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = Ta, t = Ta, u = Ta, v = Ta;
 d = c[a + 60 >> 2] | 0;
 if (!d) return;
 n = a + 12 | 0;
 o = a + 4 | 0;
 p = a + 72 | 0;
 q = a + 68 | 0;
 a : while (1) {
  k = c[d + 48 >> 2] | 0;
  l = c[d + 52 >> 2] | 0;
  j = c[d + 56 >> 2] | 0;
  m = c[d + 60 >> 2] | 0;
  e = c[k + 8 >> 2] | 0;
  i = c[l + 8 >> 2] | 0;
  f = d + 4 | 0;
  do if (!(c[f >> 2] & 8)) r = 10; else {
   if (!(Sb(i, e) | 0)) {
    m = c[d + 12 >> 2] | 0;
    _b(a, d);
    d = m;
    break;
   }
   h = c[q >> 2] | 0;
   if (h | 0) if (!(Ua[c[(c[h >> 2] | 0) + 8 >> 2] & 7](h, k, l) | 0)) {
    m = c[d + 12 >> 2] | 0;
    _b(a, d);
    d = m;
    break;
   }
   c[f >> 2] = c[f >> 2] & -9;
   r = 10;
  } while (0);
  do if ((r | 0) == 10) {
   r = 0;
   if (!(b[e + 4 >> 1] & 2)) f = 0; else f = (c[e >> 2] | 0) != 0;
   if (!(b[i + 4 >> 1] & 2)) e = 0; else e = (c[i >> 2] | 0) != 0;
   if (!(f | e)) {
    d = c[d + 12 >> 2] | 0;
    break;
   }
   i = c[(c[k + 24 >> 2] | 0) + (j * 28 | 0) + 24 >> 2] | 0;
   e = c[(c[l + 24 >> 2] | 0) + (m * 28 | 0) + 24 >> 2] | 0;
   if ((i | 0) <= -1) {
    r = 19;
    break a;
   }
   f = c[n >> 2] | 0;
   if ((f | 0) <= (i | 0)) {
    r = 19;
    break a;
   }
   h = c[o >> 2] | 0;
   if (!((e | 0) > -1 & (f | 0) > (e | 0))) {
    r = 21;
    break a;
   }
   v = ba(g[h + (e * 36 | 0) >> 2]);
   v = ba(v - ba(g[h + (i * 36 | 0) + 8 >> 2]));
   u = ba(g[h + (e * 36 | 0) + 4 >> 2]);
   u = ba(u - ba(g[h + (i * 36 | 0) + 12 >> 2]));
   t = ba(g[h + (i * 36 | 0) >> 2]);
   t = ba(t - ba(g[h + (e * 36 | 0) + 8 >> 2]));
   s = ba(g[h + (i * 36 | 0) + 4 >> 2]);
   if (v > ba(0.0) | u > ba(0.0) | t > ba(0.0) | ba(s - ba(g[h + (e * 36 | 0) + 12 >> 2])) > ba(0.0)) {
    m = c[d + 12 >> 2] | 0;
    _b(a, d);
    d = m;
    break;
   } else {
    Cc(d, c[p >> 2] | 0);
    d = c[d + 12 >> 2] | 0;
    break;
   }
  } while (0);
  if (!d) {
   r = 25;
   break;
  }
 }
 if ((r | 0) == 19) va(5161, 3213, 159, 3247); else if ((r | 0) == 21) va(5161, 3213, 159, 3247); else if ((r | 0) == 25) return;
}

function pe(a, b, d) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 var e = 0, f = 0, g = 0.0;
 a : do if (b >>> 0 <= 20) do switch (b | 0) {
 case 9:
  {
   e = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);
   b = c[e >> 2] | 0;
   c[d >> 2] = e + 4;
   c[a >> 2] = b;
   break a;
  }
 case 10:
  {
   e = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);
   b = c[e >> 2] | 0;
   c[d >> 2] = e + 4;
   e = a;
   c[e >> 2] = b;
   c[e + 4 >> 2] = ((b | 0) < 0) << 31 >> 31;
   break a;
  }
 case 11:
  {
   e = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);
   b = c[e >> 2] | 0;
   c[d >> 2] = e + 4;
   e = a;
   c[e >> 2] = b;
   c[e + 4 >> 2] = 0;
   break a;
  }
 case 12:
  {
   e = (c[d >> 2] | 0) + (8 - 1) & ~(8 - 1);
   b = e;
   f = c[b >> 2] | 0;
   b = c[b + 4 >> 2] | 0;
   c[d >> 2] = e + 8;
   e = a;
   c[e >> 2] = f;
   c[e + 4 >> 2] = b;
   break a;
  }
 case 13:
  {
   f = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);
   e = c[f >> 2] | 0;
   c[d >> 2] = f + 4;
   e = (e & 65535) << 16 >> 16;
   f = a;
   c[f >> 2] = e;
   c[f + 4 >> 2] = ((e | 0) < 0) << 31 >> 31;
   break a;
  }
 case 14:
  {
   f = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);
   e = c[f >> 2] | 0;
   c[d >> 2] = f + 4;
   f = a;
   c[f >> 2] = e & 65535;
   c[f + 4 >> 2] = 0;
   break a;
  }
 case 15:
  {
   f = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);
   e = c[f >> 2] | 0;
   c[d >> 2] = f + 4;
   e = (e & 255) << 24 >> 24;
   f = a;
   c[f >> 2] = e;
   c[f + 4 >> 2] = ((e | 0) < 0) << 31 >> 31;
   break a;
  }
 case 16:
  {
   f = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);
   e = c[f >> 2] | 0;
   c[d >> 2] = f + 4;
   f = a;
   c[f >> 2] = e & 255;
   c[f + 4 >> 2] = 0;
   break a;
  }
 case 17:
  {
   f = (c[d >> 2] | 0) + (8 - 1) & ~(8 - 1);
   g = +h[f >> 3];
   c[d >> 2] = f + 8;
   h[a >> 3] = g;
   break a;
  }
 case 18:
  {
   f = (c[d >> 2] | 0) + (8 - 1) & ~(8 - 1);
   g = +h[f >> 3];
   c[d >> 2] = f + 8;
   h[a >> 3] = g;
   break a;
  }
 default:
  break a;
 } while (0); while (0);
 return;
}

function bc(a, b) {
 a = a | 0;
 b = b | 0;
 var d = 0, e = 0, f = 0, g = 0, h = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0;
 q = i;
 i = i + 16 | 0;
 m = q;
 p = a + 52 | 0;
 c[p >> 2] = 0;
 l = a + 40 | 0;
 d = c[l >> 2] | 0;
 do if ((d | 0) > 0) {
  g = a + 32 | 0;
  h = a + 56 | 0;
  j = a + 12 | 0;
  k = a + 4 | 0;
  f = 0;
  while (1) {
   e = c[(c[g >> 2] | 0) + (f << 2) >> 2] | 0;
   c[h >> 2] = e;
   if ((e | 0) != -1) {
    if ((e | 0) <= -1) {
     d = 9;
     break;
    }
    if ((c[j >> 2] | 0) <= (e | 0)) {
     d = 9;
     break;
    }
    hc(a, a, (c[k >> 2] | 0) + (e * 36 | 0) | 0);
    d = c[l >> 2] | 0;
   }
   f = f + 1 | 0;
   if ((f | 0) >= (d | 0)) {
    d = 3;
    break;
   }
  }
  if ((d | 0) == 3) {
   n = c[p >> 2] | 0;
   break;
  } else if ((d | 0) == 9) va(5161, 3213, 159, 3247);
 } else n = 0; while (0);
 c[l >> 2] = 0;
 o = a + 44 | 0;
 l = c[o >> 2] | 0;
 c[m >> 2] = 3;
 dc(l, l + (n * 12 | 0) | 0, m);
 if ((c[p >> 2] | 0) <= 0) {
  i = q;
  return;
 }
 m = a + 12 | 0;
 l = a + 4 | 0;
 d = 0;
 while (1) {
  e = c[o >> 2] | 0;
  k = e + (d * 12 | 0) | 0;
  f = c[k >> 2] | 0;
  if ((f | 0) <= -1) {
   d = 15;
   break;
  }
  g = c[m >> 2] | 0;
  if ((g | 0) <= (f | 0)) {
   d = 15;
   break;
  }
  h = c[l >> 2] | 0;
  j = e + (d * 12 | 0) + 4 | 0;
  e = c[j >> 2] | 0;
  if (!((e | 0) > -1 & (g | 0) > (e | 0))) {
   d = 17;
   break;
  }
  jc(b, c[h + (f * 36 | 0) + 16 >> 2] | 0, c[h + (e * 36 | 0) + 16 >> 2] | 0);
  f = c[p >> 2] | 0;
  d = d + 1 | 0;
  do {
   if ((d | 0) >= (f | 0)) break;
   e = c[o >> 2] | 0;
   if ((c[e + (d * 12 | 0) >> 2] | 0) != (c[k >> 2] | 0)) break;
   a = (c[e + (d * 12 | 0) + 4 >> 2] | 0) == (c[j >> 2] | 0);
   d = (a & 1) + d | 0;
  } while (a);
  if ((d | 0) >= (f | 0)) {
   d = 22;
   break;
  }
 }
 if ((d | 0) == 15) va(5161, 3213, 153, 3258); else if ((d | 0) == 17) va(5161, 3213, 153, 3258); else if ((d | 0) == 22) {
  i = q;
  return;
 }
}

function jc(a, d, f) {
 a = a | 0;
 d = d | 0;
 f = f | 0;
 var h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0;
 o = c[d + 16 >> 2] | 0;
 p = c[f + 16 >> 2] | 0;
 n = c[d + 20 >> 2] | 0;
 m = c[f + 20 >> 2] | 0;
 l = c[o + 8 >> 2] | 0;
 k = c[p + 8 >> 2] | 0;
 if ((l | 0) == (k | 0)) return;
 d = c[k + 112 >> 2] | 0;
 a : do if (d | 0) {
  while (1) {
   if ((c[d >> 2] | 0) == (l | 0)) {
    j = c[d + 4 >> 2] | 0;
    f = c[j + 48 >> 2] | 0;
    h = c[j + 52 >> 2] | 0;
    i = c[j + 56 >> 2] | 0;
    j = c[j + 60 >> 2] | 0;
    if ((f | 0) == (o | 0) & (h | 0) == (p | 0) & (i | 0) == (n | 0) & (j | 0) == (m | 0)) {
     d = 22;
     break;
    }
    if ((f | 0) == (p | 0) & (h | 0) == (o | 0) & (i | 0) == (m | 0) & (j | 0) == (n | 0)) {
     d = 22;
     break;
    }
   }
   d = c[d + 12 >> 2] | 0;
   if (!d) break a;
  }
  if ((d | 0) == 22) return;
 } while (0);
 if (!(Sb(k, l) | 0)) return;
 d = c[a + 68 >> 2] | 0;
 if (d | 0) if (!(Ua[c[(c[d >> 2] | 0) + 8 >> 2] & 7](d, o, p) | 0)) return;
 i = xc(o, n, p, m, c[a + 76 >> 2] | 0) | 0;
 if (!i) return;
 j = c[(c[i + 48 >> 2] | 0) + 8 >> 2] | 0;
 k = c[(c[i + 52 >> 2] | 0) + 8 >> 2] | 0;
 c[i + 8 >> 2] = 0;
 d = a + 60 | 0;
 f = c[d >> 2] | 0;
 c[i + 12 >> 2] = f;
 if (f | 0) c[f + 8 >> 2] = i;
 c[d >> 2] = i;
 d = i + 16 | 0;
 c[i + 20 >> 2] = i;
 c[d >> 2] = k;
 c[i + 24 >> 2] = 0;
 f = j + 112 | 0;
 h = c[f >> 2] | 0;
 c[i + 28 >> 2] = h;
 if (h | 0) c[h + 8 >> 2] = d;
 c[f >> 2] = d;
 d = i + 32 | 0;
 c[i + 36 >> 2] = i;
 c[d >> 2] = j;
 c[i + 40 >> 2] = 0;
 f = k + 112 | 0;
 h = c[f >> 2] | 0;
 c[i + 44 >> 2] = h;
 if (h | 0) c[h + 8 >> 2] = d;
 c[f >> 2] = d;
 d = j + 4 | 0;
 f = e[d >> 1] | 0;
 if (!(f & 2)) {
  b[d >> 1] = f | 2;
  g[j + 144 >> 2] = ba(0.0);
 }
 d = k + 4 | 0;
 f = e[d >> 1] | 0;
 if (!(f & 2)) {
  b[d >> 1] = f | 2;
  g[k + 144 >> 2] = ba(0.0);
 }
 a = a + 64 | 0;
 c[a >> 2] = (c[a >> 2] | 0) + 1;
 return;
}

function hc(a, b, d) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 var e = 0, f = 0, h = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = Ta, v = Ta, w = Ta, x = Ta;
 t = i;
 i = i + 1040 | 0;
 s = t;
 r = s + 4 | 0;
 c[s >> 2] = r;
 p = s + 1028 | 0;
 q = s + 1032 | 0;
 c[q >> 2] = 256;
 c[r >> 2] = c[a >> 2];
 c[p >> 2] = 1;
 l = a + 4 | 0;
 m = d + 4 | 0;
 n = d + 8 | 0;
 o = d + 12 | 0;
 a = 1;
 e = r;
 a : while (1) {
  a = a + -1 | 0;
  c[p >> 2] = a;
  j = c[e + (a << 2) >> 2] | 0;
  do if ((j | 0) != -1) {
   k = c[l >> 2] | 0;
   x = ba(g[d >> 2]);
   x = ba(x - ba(g[k + (j * 36 | 0) + 8 >> 2]));
   w = ba(g[m >> 2]);
   w = ba(w - ba(g[k + (j * 36 | 0) + 12 >> 2]));
   v = ba(g[k + (j * 36 | 0) >> 2]);
   v = ba(v - ba(g[n >> 2]));
   u = ba(g[k + (j * 36 | 0) + 4 >> 2]);
   if (!(x > ba(0.0) | w > ba(0.0) | v > ba(0.0) | ba(u - ba(g[o >> 2])) > ba(0.0))) {
    f = k + (j * 36 | 0) + 24 | 0;
    if ((c[f >> 2] | 0) == -1) {
     if (!(Wc(b, j) | 0)) break a;
     a = c[p >> 2] | 0;
     break;
    }
    if ((a | 0) == (c[q >> 2] | 0)) {
     c[q >> 2] = a << 1;
     h = Lb(a << 3) | 0;
     c[s >> 2] = h;
     zf(h | 0, e | 0, c[p >> 2] << 2 | 0) | 0;
     if ((e | 0) != (r | 0)) Mb(e);
    }
    h = c[s >> 2] | 0;
    c[h + (c[p >> 2] << 2) >> 2] = c[f >> 2];
    e = (c[p >> 2] | 0) + 1 | 0;
    c[p >> 2] = e;
    a = k + (j * 36 | 0) + 28 | 0;
    if ((e | 0) == (c[q >> 2] | 0)) {
     c[q >> 2] = e << 1;
     k = Lb(e << 3) | 0;
     c[s >> 2] = k;
     zf(k | 0, h | 0, c[p >> 2] << 2 | 0) | 0;
     if ((h | 0) != (r | 0)) Mb(h);
    }
    c[(c[s >> 2] | 0) + (c[p >> 2] << 2) >> 2] = c[a >> 2];
    a = (c[p >> 2] | 0) + 1 | 0;
    c[p >> 2] = a;
   }
  } while (0);
  if ((a | 0) <= 0) break;
  e = c[s >> 2] | 0;
 }
 a = c[s >> 2] | 0;
 if ((a | 0) == (r | 0)) {
  i = t;
  return;
 }
 Mb(a);
 c[s >> 2] = 0;
 i = t;
 return;
}

function Db(a, b, d, e, f) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 var h = Ta, i = Ta, j = Ta, k = Ta, l = Ta, m = Ta, n = Ta, o = Ta, p = Ta, q = Ta, r = Ta, s = Ta, t = Ta;
 m = ba(g[d >> 2]);
 o = ba(g[e >> 2]);
 m = ba(m - o);
 n = ba(g[d + 4 >> 2]);
 p = ba(g[e + 4 >> 2]);
 n = ba(n - p);
 r = ba(g[e + 12 >> 2]);
 l = ba(m * r);
 q = ba(g[e + 8 >> 2]);
 l = ba(l + ba(n * q));
 m = ba(ba(r * n) - ba(m * q));
 o = ba(ba(g[d + 8 >> 2]) - o);
 p = ba(ba(g[d + 12 >> 2]) - p);
 n = ba(ba(ba(r * o) + ba(q * p)) - l);
 o = ba(ba(ba(r * p) - ba(q * o)) - m);
 p = ba(g[d + 16 >> 2]);
 e = c[a + 148 >> 2] | 0;
 a : do if ((e | 0) > 0) {
  d = 0;
  f = -1;
  h = ba(0.0);
  i = p;
  b : while (1) {
   t = ba(ba(g[a + 20 + (d << 3) >> 2]) - l);
   j = ba(ba(g[a + 20 + (d << 3) + 4 >> 2]) - m);
   s = ba(g[a + 84 + (d << 3) >> 2]);
   t = ba(t * s);
   k = ba(g[a + 84 + (d << 3) + 4 >> 2]);
   j = ba(t + ba(j * k));
   k = ba(ba(n * s) + ba(o * k));
   do if (k == ba(0.0)) {
    if (j < ba(0.0)) {
     f = 0;
     e = 14;
     break b;
    }
   } else {
    if (k < ba(0.0) & j < ba(h * k)) {
     f = d;
     h = ba(j / k);
     break;
    }
    if (k > ba(0.0) & j < ba(i * k)) i = ba(j / k);
   } while (0);
   d = d + 1 | 0;
   if (i < h) {
    f = 0;
    e = 14;
    break;
   }
   if ((d | 0) >= (e | 0)) break a;
  }
  if ((e | 0) == 14) return f | 0;
 } else {
  f = -1;
  h = ba(0.0);
 } while (0);
 if (!(h >= ba(0.0)) | !(h <= p)) va(2536, 2580, 249, 2622);
 if ((f | 0) <= -1) {
  a = 0;
  return a | 0;
 }
 g[b + 8 >> 2] = h;
 t = ba(g[a + 84 + (f << 3) >> 2]);
 p = ba(r * t);
 s = ba(g[a + 84 + (f << 3) + 4 >> 2]);
 t = ba(ba(t * q) + ba(r * s));
 g[b >> 2] = ba(p - ba(q * s));
 g[b + 4 >> 2] = t;
 a = 1;
 return a | 0;
}

function cd(a, b, d, e, f) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 var h = 0, i = Ta, j = 0, k = Ta, l = 0, m = Ta, n = Ta, o = 0, p = Ta, q = Ta, r = Ta;
 o = c[b + 148 >> 2] | 0;
 p = ba(g[f + 12 >> 2]);
 n = ba(g[e + 12 >> 2]);
 q = ba(p * n);
 r = ba(g[f + 8 >> 2]);
 i = ba(g[e + 16 >> 2]);
 q = ba(q - ba(r * i));
 q = ba(ba(g[f >> 2]) + q);
 i = ba(ba(n * r) + ba(p * i));
 i = ba(i + ba(g[f + 4 >> 2]));
 p = ba(g[d + 12 >> 2]);
 r = ba(g[b + 12 >> 2]);
 n = ba(p * r);
 k = ba(g[d + 8 >> 2]);
 m = ba(g[b + 16 >> 2]);
 n = ba(n - ba(k * m));
 n = ba(ba(g[d >> 2]) + n);
 m = ba(ba(r * k) + ba(p * m));
 n = ba(q - n);
 m = ba(i - ba(m + ba(g[d + 4 >> 2])));
 i = ba(ba(p * n) + ba(k * m));
 k = ba(ba(p * m) - ba(n * k));
 if ((o | 0) > 0) {
  l = 0;
  j = 0;
  n = ba(-3402823469999999843913219.0e14);
  while (1) {
   m = ba(i * ba(g[b + 84 + (j << 3) >> 2]));
   m = ba(m + ba(k * ba(g[b + 84 + (j << 3) + 4 >> 2])));
   h = m > n;
   l = h ? j : l;
   j = j + 1 | 0;
   if ((j | 0) == (o | 0)) break; else n = h ? m : n;
  }
 } else l = 0;
 k = ba(dd(b, d, l, e, f));
 j = ((l | 0) > 0 ? l : o) + -1 | 0;
 m = ba(dd(b, d, j, e, f));
 h = l + 1 | 0;
 h = (h | 0) < (o | 0) ? h : 0;
 i = ba(dd(b, d, h, e, f));
 if (m > k & m > i) {
  h = j;
  i = m;
  while (1) {
   j = ((h | 0) > 0 ? h : o) + -1 | 0;
   k = ba(dd(b, d, j, e, f));
   if (k > i) {
    h = j;
    i = k;
   } else break;
  }
  c[a >> 2] = h;
  return ba(i);
 }
 if (!(i > k)) {
  r = k;
  f = l;
  c[a >> 2] = f;
  return ba(r);
 }
 while (1) {
  j = h + 1 | 0;
  j = (j | 0) < (o | 0) ? j : 0;
  k = ba(dd(b, d, j, e, f));
  if (k > i) {
   h = j;
   i = k;
  } else break;
 }
 c[a >> 2] = h;
 return ba(i);
}

function $c(a, b) {
 a = a | 0;
 b = b | 0;
 var d = 0, e = Ta, f = Ta, h = Ta, i = Ta, j = Ta, k = Ta, l = Ta, m = Ta, n = Ta, o = Ta, p = 0, q = 0, r = 0, s = 0, t = Ta, u = Ta, v = 0, w = 0, x = 0, y = 0, z = Ta, A = Ta;
 c[a >> 2] = 0;
 w = a + 4 | 0;
 c[w >> 2] = -1;
 x = a + 8 | 0;
 g[x >> 2] = ba(-3402823469999999843913219.0e14);
 t = ba(g[b + 216 >> 2]);
 u = ba(g[b + 212 >> 2]);
 v = c[b + 128 >> 2] | 0;
 if ((v | 0) <= 0) return;
 k = ba(g[b + 164 >> 2]);
 l = ba(g[b + 168 >> 2]);
 m = ba(g[b + 172 >> 2]);
 n = ba(g[b + 176 >> 2]);
 o = ba(g[b + 244 >> 2]);
 p = b + 228 | 0;
 q = b + 232 | 0;
 r = b + 236 | 0;
 s = b + 240 | 0;
 j = ba(-3402823469999999843913219.0e14);
 d = 0;
 while (1) {
  f = ba(g[b + 64 + (d << 3) >> 2]);
  h = ba(-f);
  i = ba(-ba(g[b + 64 + (d << 3) + 4 >> 2]));
  A = ba(g[b + (d << 3) >> 2]);
  z = ba(A - k);
  e = ba(g[b + (d << 3) + 4 >> 2]);
  z = ba(ba(z * h) + ba(ba(e - l) * i));
  e = ba(ba(ba(A - m) * h) + ba(ba(e - n) * i));
  e = z < e ? z : e;
  if (e > o) break;
  if (!(ba(ba(t * f) + ba(u * i)) >= ba(0.0))) {
   A = ba(h - ba(g[p >> 2]));
   if (e > j ? !(ba(ba(A * u) + ba(ba(i - ba(g[q >> 2])) * t)) < ba(-.0349065885)) : 0) y = 7; else e = j;
  } else {
   A = ba(h - ba(g[r >> 2]));
   if (e > j ? !(ba(ba(A * u) + ba(ba(i - ba(g[s >> 2])) * t)) < ba(-.0349065885)) : 0) y = 7; else e = j;
  }
  if ((y | 0) == 7) {
   y = 0;
   c[a >> 2] = 2;
   c[w >> 2] = d;
   g[x >> 2] = e;
  }
  d = d + 1 | 0;
  if ((d | 0) >= (v | 0)) {
   y = 10;
   break;
  } else j = e;
 }
 if ((y | 0) == 10) return;
 c[a >> 2] = 2;
 c[w >> 2] = d;
 g[x >> 2] = e;
 return;
}

function Fb(a, b, d) {
 a = a | 0;
 b = b | 0;
 d = ba(d);
 var e = Ta, f = Ta, h = 0, i = Ta, j = Ta, k = Ta, l = 0, m = 0, n = Ta, o = Ta, p = 0, q = 0, r = Ta, s = Ta, t = Ta, u = Ta, v = Ta;
 p = c[a + 148 >> 2] | 0;
 if ((p | 0) > 2) {
  h = 0;
  e = ba(0.0);
  f = ba(0.0);
 } else va(2630, 2580, 306, 2649);
 do {
  e = ba(e + ba(g[a + 20 + (h << 3) >> 2]));
  f = ba(f + ba(g[a + 20 + (h << 3) + 4 >> 2]));
  h = h + 1 | 0;
 } while ((h | 0) < (p | 0));
 n = ba(ba(1.0) / ba(p | 0));
 o = ba(e * n);
 n = ba(f * n);
 h = a + 20 | 0;
 l = a + 24 | 0;
 e = ba(0.0);
 k = ba(0.0);
 j = ba(0.0);
 i = ba(0.0);
 m = 0;
 do {
  t = ba(ba(g[a + 20 + (m << 3) >> 2]) - o);
  r = ba(ba(g[a + 20 + (m << 3) + 4 >> 2]) - n);
  m = m + 1 | 0;
  q = (m | 0) < (p | 0);
  s = ba(ba(g[(q ? a + 20 + (m << 3) | 0 : h) >> 2]) - o);
  f = ba(ba(g[(q ? a + 20 + (m << 3) + 4 | 0 : l) >> 2]) - n);
  u = ba(ba(t * f) - ba(r * s));
  v = ba(u * ba(.5));
  k = ba(k + v);
  v = ba(v * ba(.333333343));
  j = ba(j + ba(ba(t + s) * v));
  i = ba(i + ba(ba(r + f) * v));
  e = ba(e + ba(ba(u * ba(.0833333358)) * ba(ba(ba(s * s) + ba(ba(t * t) + ba(t * s))) + ba(ba(f * f) + ba(ba(r * r) + ba(r * f))))));
 } while (q);
 f = ba(k * d);
 g[b >> 2] = f;
 if (k > ba(1.1920929e-07)) {
  v = ba(ba(1.0) / k);
  u = ba(j * v);
  v = ba(i * v);
  s = ba(o + u);
  t = ba(n + v);
  g[b + 4 >> 2] = s;
  g[b + 8 >> 2] = t;
  g[b + 12 >> 2] = ba(ba(e * d) + ba(f * ba(ba(ba(s * s) + ba(t * t)) - ba(ba(u * u) + ba(v * v)))));
  return;
 } else va(2661, 2580, 352, 2649);
}

function fe(a, b, d) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 var e = 0, f = 0, g = 0, h = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0;
 q = i;
 i = i + 48 | 0;
 n = q + 16 | 0;
 m = q;
 e = q + 32 | 0;
 o = a + 28 | 0;
 f = c[o >> 2] | 0;
 c[e >> 2] = f;
 p = a + 20 | 0;
 f = (c[p >> 2] | 0) - f | 0;
 c[e + 4 >> 2] = f;
 c[e + 8 >> 2] = b;
 c[e + 12 >> 2] = d;
 k = a + 60 | 0;
 l = a + 44 | 0;
 b = 2;
 f = f + d | 0;
 while (1) {
  if (!(c[2431] | 0)) {
   c[n >> 2] = c[k >> 2];
   c[n + 4 >> 2] = e;
   c[n + 8 >> 2] = b;
   h = de(Ra(146, n | 0) | 0) | 0;
  } else {
   Na(24, a | 0);
   c[m >> 2] = c[k >> 2];
   c[m + 4 >> 2] = e;
   c[m + 8 >> 2] = b;
   h = de(Ra(146, m | 0) | 0) | 0;
   qa(0);
  }
  if ((f | 0) == (h | 0)) {
   f = 6;
   break;
  }
  if ((h | 0) < 0) {
   f = 8;
   break;
  }
  f = f - h | 0;
  g = c[e + 4 >> 2] | 0;
  if (h >>> 0 > g >>> 0) {
   j = c[l >> 2] | 0;
   c[o >> 2] = j;
   c[p >> 2] = j;
   j = c[e + 12 >> 2] | 0;
   h = h - g | 0;
   e = e + 8 | 0;
   b = b + -1 | 0;
  } else if ((b | 0) == 2) {
   c[o >> 2] = (c[o >> 2] | 0) + h;
   j = g;
   b = 2;
  } else j = g;
  c[e >> 2] = (c[e >> 2] | 0) + h;
  c[e + 4 >> 2] = j - h;
 }
 if ((f | 0) == 6) {
  n = c[l >> 2] | 0;
  c[a + 16 >> 2] = n + (c[a + 48 >> 2] | 0);
  a = n;
  c[o >> 2] = a;
  c[p >> 2] = a;
 } else if ((f | 0) == 8) {
  c[a + 16 >> 2] = 0;
  c[o >> 2] = 0;
  c[p >> 2] = 0;
  c[a >> 2] = c[a >> 2] | 32;
  if ((b | 0) == 2) d = 0; else d = d - (c[e + 4 >> 2] | 0) | 0;
 }
 i = q;
 return d | 0;
}

function Eb(a, b, d, e) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 var f = 0, h = 0, i = 0, j = Ta, l = 0, m = 0, n = Ta, o = Ta, p = Ta, q = Ta, r = Ta, s = Ta, t = Ta;
 n = ba(g[d + 12 >> 2]);
 j = ba(g[a + 20 >> 2]);
 r = ba(n * j);
 p = ba(g[d + 8 >> 2]);
 q = ba(g[a + 24 >> 2]);
 r = ba(r - ba(p * q));
 o = ba(g[d >> 2]);
 r = ba(o + r);
 q = ba(ba(j * p) + ba(n * q));
 j = ba(g[d + 4 >> 2]);
 q = ba(q + j);
 e = (g[k >> 2] = r, c[k >> 2] | 0);
 i = (g[k >> 2] = q, c[k >> 2] | 0);
 l = c[a + 148 >> 2] | 0;
 if ((l | 0) > 1) {
  m = 1;
  h = e;
  f = i;
  d = e;
  e = i;
  do {
   q = ba(g[a + 20 + (m << 3) >> 2]);
   s = ba(n * q);
   r = ba(g[a + 20 + (m << 3) + 4 >> 2]);
   s = ba(o + ba(s - ba(p * r)));
   r = ba(ba(ba(q * p) + ba(n * r)) + j);
   q = (c[k >> 2] = h, ba(g[k >> 2]));
   t = (c[k >> 2] = f, ba(g[k >> 2]));
   h = (g[k >> 2] = q < s ? q : s, c[k >> 2] | 0);
   f = (g[k >> 2] = t < r ? t : r, c[k >> 2] | 0);
   t = (c[k >> 2] = d, ba(g[k >> 2]));
   q = (c[k >> 2] = e, ba(g[k >> 2]));
   d = (g[k >> 2] = t > s ? t : s, c[k >> 2] | 0);
   e = (g[k >> 2] = q > r ? q : r, c[k >> 2] | 0);
   m = m + 1 | 0;
  } while ((m | 0) < (l | 0));
 } else {
  h = e;
  f = i;
  d = e;
  e = i;
 }
 t = ba(g[a + 8 >> 2]);
 r = ba((c[k >> 2] = h, ba(g[k >> 2])) - t);
 s = ba((c[k >> 2] = f, ba(g[k >> 2])) - t);
 g[b >> 2] = r;
 g[b + 4 >> 2] = s;
 s = ba((c[k >> 2] = d, ba(g[k >> 2])) + t);
 t = ba((c[k >> 2] = e, ba(g[k >> 2])) + t);
 g[b + 8 >> 2] = s;
 g[b + 12 >> 2] = t;
 return;
}

function vb(a, b, c, d, e) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 e = e | 0;
 var f = Ta, h = Ta, i = Ta, j = Ta, k = Ta, l = Ta, m = Ta, n = Ta, o = Ta, p = Ta, q = Ta, r = Ta, s = Ta;
 n = ba(g[c >> 2]);
 p = ba(g[d >> 2]);
 n = ba(n - p);
 o = ba(g[c + 4 >> 2]);
 r = ba(g[d + 4 >> 2]);
 o = ba(o - r);
 s = ba(g[d + 12 >> 2]);
 m = ba(n * s);
 q = ba(g[d + 8 >> 2]);
 m = ba(m + ba(o * q));
 n = ba(ba(s * o) - ba(n * q));
 p = ba(ba(g[c + 8 >> 2]) - p);
 r = ba(ba(g[c + 12 >> 2]) - r);
 o = ba(ba(ba(s * p) + ba(q * r)) - m);
 p = ba(ba(ba(s * r) - ba(q * p)) - n);
 q = ba(g[a + 12 >> 2]);
 r = ba(g[a + 16 >> 2]);
 s = ba(g[a + 20 >> 2]);
 s = ba(s - q);
 k = ba(ba(g[a + 24 >> 2]) - r);
 h = ba(-s);
 l = ba(ba(s * s) + ba(k * k));
 f = ba(O(ba(l)));
 if (f < ba(1.1920929e-07)) j = k; else {
  i = ba(ba(1.0) / f);
  j = ba(k * i);
  h = ba(i * h);
 }
 i = ba(ba(ba(q - m) * j) + ba(ba(r - n) * h));
 f = ba(ba(o * j) + ba(p * h));
 if (f == ba(0.0)) {
  b = 0;
  return b | 0;
 }
 f = ba(i / f);
 if (f < ba(0.0)) {
  b = 0;
  return b | 0;
 }
 if (l == ba(0.0) ? 1 : ba(g[c + 16 >> 2]) < f) {
  b = 0;
  return b | 0;
 }
 s = ba(ba(ba(s * ba(ba(m + ba(o * f)) - q)) + ba(k * ba(ba(n + ba(p * f)) - r))) / l);
 if (s < ba(0.0) | s > ba(1.0)) {
  b = 0;
  return b | 0;
 }
 g[b + 8 >> 2] = f;
 if (i > ba(0.0)) {
  s = ba(-h);
  g[b >> 2] = ba(-j);
  g[b + 4 >> 2] = s;
  b = 1;
  return b | 0;
 } else {
  g[b >> 2] = j;
  g[b + 4 >> 2] = h;
  b = 1;
  return b | 0;
 }
 return 0;
}

function tc(b, d, e, f) {
 b = b | 0;
 d = ba(d);
 e = e | 0;
 f = f | 0;
 var h = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = Ta;
 n = i;
 i = i + 32 | 0;
 m = n + 25 | 0;
 j = n;
 k = n + 24 | 0;
 l = b + 102868 | 0;
 h = c[l >> 2] | 0;
 if (h & 1) {
  ac(b + 102872 | 0);
  h = c[l >> 2] & -2;
  c[l >> 2] = h;
 }
 c[l >> 2] = h | 2;
 g[j >> 2] = d;
 c[j + 12 >> 2] = e;
 c[j + 16 >> 2] = f;
 e = d > ba(0.0);
 o = ba(ba(1.0) / d);
 h = j + 4 | 0;
 g[h >> 2] = e ? o : ba(0.0);
 f = b + 102988 | 0;
 g[j + 8 >> 2] = ba(ba(g[f >> 2]) * d);
 a[j + 20 >> 0] = a[b + 102992 >> 0] | 0;
 $b(b + 102872 | 0);
 g[b + 103e3 >> 2] = ba(Dd(k));
 if ((a[b + 102995 >> 0] | 0) != 0 & e) {
  rc(b, j);
  g[b + 103004 >> 2] = ba(Dd(k));
  d = ba(g[j >> 2]);
 }
 if ((a[b + 102993 >> 0] | 0) != 0 & d > ba(0.0)) {
  sc(b, j);
  g[b + 103024 >> 2] = ba(Dd(k));
  d = ba(g[j >> 2]);
 }
 if (d > ba(0.0)) c[f >> 2] = c[h >> 2];
 f = c[l >> 2] | 0;
 if (!(f & 4)) {
  k = f & -3;
  c[l >> 2] = k;
  o = ba(Dd(m));
  b = b + 102996 | 0;
  g[b >> 2] = o;
  i = n;
  return;
 }
 h = c[b + 102952 >> 2] | 0;
 if (!h) {
  k = f & -3;
  c[l >> 2] = k;
  o = ba(Dd(m));
  b = b + 102996 | 0;
  g[b >> 2] = o;
  i = n;
  return;
 }
 do {
  g[h + 76 >> 2] = ba(0.0);
  g[h + 80 >> 2] = ba(0.0);
  g[h + 84 >> 2] = ba(0.0);
  h = c[h + 96 >> 2] | 0;
 } while ((h | 0) != 0);
 k = f & -3;
 c[l >> 2] = k;
 o = ba(Dd(m));
 b = b + 102996 | 0;
 g[b >> 2] = o;
 i = n;
 return;
}

function dd(a, b, d, e, f) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 var h = 0, i = 0, j = Ta, k = Ta, l = Ta, m = 0, n = 0, o = Ta, p = Ta, q = Ta, r = Ta, s = Ta, t = Ta, u = Ta;
 i = c[e + 148 >> 2] | 0;
 if ((d | 0) <= -1) va(4440, 4483, 32, 4520);
 if ((c[a + 148 >> 2] | 0) <= (d | 0)) va(4440, 4483, 32, 4520);
 u = ba(g[b + 12 >> 2]);
 s = ba(g[a + 84 + (d << 3) >> 2]);
 q = ba(u * s);
 p = ba(g[b + 8 >> 2]);
 r = ba(g[a + 84 + (d << 3) + 4 >> 2]);
 q = ba(q - ba(p * r));
 r = ba(ba(s * p) + ba(u * r));
 s = ba(g[f + 12 >> 2]);
 j = ba(s * q);
 t = ba(g[f + 8 >> 2]);
 j = ba(j + ba(t * r));
 k = ba(ba(s * r) - ba(q * t));
 if ((i | 0) > 0) {
  n = 0;
  h = 0;
  o = ba(3402823469999999843913219.0e14);
  while (1) {
   l = ba(j * ba(g[e + 20 + (n << 3) >> 2]));
   l = ba(l + ba(k * ba(g[e + 20 + (n << 3) + 4 >> 2])));
   m = l < o;
   h = m ? n : h;
   n = n + 1 | 0;
   if ((n | 0) == (i | 0)) break; else o = m ? l : o;
  }
 } else h = 0;
 l = ba(g[a + 20 + (d << 3) >> 2]);
 o = ba(u * l);
 k = ba(g[a + 20 + (d << 3) + 4 >> 2]);
 o = ba(o - ba(p * k));
 o = ba(ba(g[b >> 2]) + o);
 u = ba(ba(l * p) + ba(u * k));
 u = ba(u + ba(g[b + 4 >> 2]));
 k = ba(g[e + 20 + (h << 3) >> 2]);
 p = ba(s * k);
 l = ba(g[e + 20 + (h << 3) + 4 >> 2]);
 p = ba(p - ba(t * l));
 p = ba(ba(g[f >> 2]) + p);
 t = ba(ba(k * t) + ba(s * l));
 return ba(ba(q * ba(p - o)) + ba(r * ba(ba(t + ba(g[f + 4 >> 2])) - u)));
}

function nc(a, b, d, e) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 var f = 0, h = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, z = Ta, A = Ta, B = Ta, C = Ta, D = 0;
 w = i;
 i = i + 48 | 0;
 t = w + 24 | 0;
 u = w + 8 | 0;
 v = w;
 r = a + 28 | 0;
 if ((c[r >> 2] | 0) <= 0) {
  i = w;
  return;
 }
 s = a + 24 | 0;
 k = a + 12 | 0;
 l = t + 4 | 0;
 m = u + 4 | 0;
 n = t + 8 | 0;
 o = u + 8 | 0;
 p = t + 12 | 0;
 a = u + 12 | 0;
 f = e + 4 | 0;
 h = d + 4 | 0;
 j = v + 4 | 0;
 q = 0;
 do {
  y = c[s >> 2] | 0;
  D = c[k >> 2] | 0;
  x = y + (q * 28 | 0) + 20 | 0;
  db[c[(c[D >> 2] | 0) + 24 >> 2] & 15](D, t, d, c[x >> 2] | 0);
  D = c[k >> 2] | 0;
  db[c[(c[D >> 2] | 0) + 24 >> 2] & 15](D, u, e, c[x >> 2] | 0);
  x = y + (q * 28 | 0) | 0;
  A = ba(g[t >> 2]);
  z = ba(g[u >> 2]);
  B = ba(g[l >> 2]);
  C = ba(g[m >> 2]);
  g[x >> 2] = A < z ? A : z;
  g[y + (q * 28 | 0) + 4 >> 2] = B < C ? B : C;
  C = ba(g[n >> 2]);
  B = ba(g[o >> 2]);
  z = ba(g[p >> 2]);
  A = ba(g[a >> 2]);
  g[y + (q * 28 | 0) + 8 >> 2] = C > B ? C : B;
  g[y + (q * 28 | 0) + 12 >> 2] = z > A ? z : A;
  A = ba(g[e >> 2]);
  A = ba(A - ba(g[d >> 2]));
  z = ba(g[f >> 2]);
  z = ba(z - ba(g[h >> 2]));
  g[v >> 2] = A;
  g[j >> 2] = z;
  Vc(b, c[y + (q * 28 | 0) + 24 >> 2] | 0, x, v);
  q = q + 1 | 0;
 } while ((q | 0) < (c[r >> 2] | 0));
 i = w;
 return;
}

function bf(b, d, e, f, g) {
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 g = g | 0;
 var h = 0, i = 0, j = 0;
 do if ((b | 0) == (c[d + 8 >> 2] | 0)) {
  if ((c[d + 4 >> 2] | 0) == (e | 0)) {
   h = d + 28 | 0;
   if ((c[h >> 2] | 0) != 1) c[h >> 2] = f;
  }
 } else {
  if ((b | 0) != (c[d >> 2] | 0)) {
   j = c[b + 8 >> 2] | 0;
   Va[c[(c[j >> 2] | 0) + 24 >> 2] & 3](j, d, e, f, g);
   break;
  }
  if ((c[d + 16 >> 2] | 0) != (e | 0)) {
   i = d + 20 | 0;
   if ((c[i >> 2] | 0) != (e | 0)) {
    c[d + 32 >> 2] = f;
    j = d + 44 | 0;
    if ((c[j >> 2] | 0) == 4) break;
    h = d + 52 | 0;
    a[h >> 0] = 0;
    f = d + 53 | 0;
    a[f >> 0] = 0;
    b = c[b + 8 >> 2] | 0;
    ab[c[(c[b >> 2] | 0) + 20 >> 2] & 3](b, d, e, e, 1, g);
    if (!(a[f >> 0] | 0)) {
     h = 0;
     f = 13;
    } else if (!(a[h >> 0] | 0)) {
     h = 1;
     f = 13;
    } else f = 17;
    do if ((f | 0) == 13) {
     c[i >> 2] = e;
     e = d + 40 | 0;
     c[e >> 2] = (c[e >> 2] | 0) + 1;
     if ((c[d + 36 >> 2] | 0) == 1) if ((c[d + 24 >> 2] | 0) == 2) {
      a[d + 54 >> 0] = 1;
      if (h) {
       f = 17;
       break;
      } else {
       h = 4;
       break;
      }
     }
     if (h) f = 17; else h = 4;
    } while (0);
    if ((f | 0) == 17) h = 3;
    c[j >> 2] = h;
    break;
   }
  }
  if ((f | 0) == 1) c[d + 32 >> 2] = 1;
 } while (0);
 return;
}

function sd(a, b, d, e) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 var f = 0, h = 0, i = 0, j = Ta, k = Ta, l = Ta, m = Ta, n = Ta, o = Ta, p = Ta, q = Ta;
 if ((b | 0) <= -1) va(5161, 4740, 135, 5228);
 if ((c[a + 12 >> 2] | 0) <= (b | 0)) va(5161, 4740, 135, 5228);
 i = a + 4 | 0;
 h = c[i >> 2] | 0;
 if ((c[h + (b * 36 | 0) + 24 >> 2] | 0) != -1) va(5202, 4740, 137, 5228);
 j = ba(g[h + (b * 36 | 0) >> 2]);
 if (!(j <= ba(g[d >> 2]))) f = d + 4 | 0; else {
  j = ba(g[h + (b * 36 | 0) + 4 >> 2]);
  f = d + 4 | 0;
  if (j <= ba(g[f >> 2])) {
   j = ba(g[d + 8 >> 2]);
   if (j <= ba(g[h + (b * 36 | 0) + 8 >> 2])) {
    j = ba(g[d + 12 >> 2]);
    if (j <= ba(g[h + (b * 36 | 0) + 12 >> 2])) {
     a = 0;
     return a | 0;
    }
   }
  }
 }
 rd(a, b);
 p = ba(g[d >> 2]);
 n = ba(g[f >> 2]);
 m = ba(g[d + 8 >> 2]);
 p = ba(p + ba(-.100000001));
 n = ba(n + ba(-.100000001));
 m = ba(m + ba(.100000001));
 k = ba(ba(g[d + 12 >> 2]) + ba(.100000001));
 l = ba(ba(g[e >> 2]) * ba(2.0));
 j = ba(ba(g[e + 4 >> 2]) * ba(2.0));
 h = l < ba(0.0);
 q = ba(p + l);
 l = ba(m + l);
 d = j < ba(0.0);
 o = ba(n + j);
 j = ba(k + j);
 e = c[i >> 2] | 0;
 g[e + (b * 36 | 0) >> 2] = h ? q : p;
 g[e + (b * 36 | 0) + 4 >> 2] = d ? o : n;
 g[e + (b * 36 | 0) + 8 >> 2] = h ? m : l;
 g[e + (b * 36 | 0) + 12 >> 2] = d ? k : j;
 pd(a, b);
 a = 1;
 return a | 0;
}

function Ne(a) {
 a = ba(a);
 var b = 0.0, d = 0, e = 0, f = 0, j = 0, l = Ta;
 j = i;
 i = i + 16 | 0;
 e = j;
 d = (g[k >> 2] = a, c[k >> 2] | 0) >>> 31;
 l = ba(N(ba(a)));
 f = (g[k >> 2] = l, c[k >> 2] | 0);
 a : do if (f >>> 0 < 1061752795) {
  if (f >>> 0 >= 964689920) a = ba(Ge(+a));
 } else {
  if (f >>> 0 < 1081824210) {
   d = (d | 0) != 0;
   b = +a;
   if (f >>> 0 >= 1075235812) {
    a = ba(Ge(-(b + (d ? 3.141592653589793 : -3.141592653589793))));
    break;
   }
   if (d) {
    a = ba(-ba(He(b + 1.5707963267948966)));
    break;
   } else {
    a = ba(He(b + -1.5707963267948966));
    break;
   }
  }
  if (f >>> 0 < 1088565718) {
   d = (d | 0) != 0;
   b = +a;
   if (f >>> 0 >= 1085271520) {
    a = ba(Ge(b + (d ? 6.283185307179586 : -6.283185307179586)));
    break;
   }
   if (d) {
    a = ba(He(b + 4.71238898038469));
    break;
   } else {
    a = ba(-ba(He(b + -4.71238898038469)));
    break;
   }
  }
  if (f >>> 0 > 2139095039) {
   a = ba(a - a);
   break;
  }
  switch ((Ie(a, e) | 0) & 3 | 0) {
  case 0:
   {
    a = ba(Ge(+h[e >> 3]));
    break a;
   }
  case 1:
   {
    a = ba(He(+h[e >> 3]));
    break a;
   }
  case 2:
   {
    a = ba(Ge(-+h[e >> 3]));
    break a;
   }
  default:
   {
    a = ba(-ba(He(+h[e >> 3])));
    break a;
   }
  }
 } while (0);
 i = j;
 return ba(a);
}

function Me(a) {
 a = ba(a);
 var b = 0.0, d = 0, e = 0, f = 0, j = 0, l = Ta;
 j = i;
 i = i + 16 | 0;
 e = j;
 d = (g[k >> 2] = a, c[k >> 2] | 0) >>> 31;
 l = ba(N(ba(a)));
 f = (g[k >> 2] = l, c[k >> 2] | 0);
 a : do if (f >>> 0 < 1061752795) if (f >>> 0 < 964689920) a = ba(1.0); else a = ba(He(+a)); else {
  if (f >>> 0 < 1081824210) {
   d = (d | 0) != 0;
   b = +a;
   if (f >>> 0 > 1075235811) {
    a = ba(-ba(He(b + (d ? 3.141592653589793 : -3.141592653589793))));
    break;
   }
   if (d) {
    a = ba(Ge(b + 1.5707963267948966));
    break;
   } else {
    a = ba(Ge(1.5707963267948966 - b));
    break;
   }
  }
  if (f >>> 0 < 1088565718) {
   d = (d | 0) != 0;
   if (f >>> 0 > 1085271519) {
    a = ba(He(+a + (d ? 6.283185307179586 : -6.283185307179586)));
    break;
   }
   if (d) {
    a = ba(Ge(+ba(-a) + -4.71238898038469));
    break;
   } else {
    a = ba(Ge(+a + -4.71238898038469));
    break;
   }
  }
  if (f >>> 0 > 2139095039) {
   a = ba(a - a);
   break;
  }
  switch ((Ie(a, e) | 0) & 3 | 0) {
  case 0:
   {
    a = ba(He(+h[e >> 3]));
    break a;
   }
  case 1:
   {
    a = ba(Ge(-+h[e >> 3]));
    break a;
   }
  case 2:
   {
    a = ba(-ba(He(+h[e >> 3])));
    break a;
   }
  default:
   {
    a = ba(Ge(+h[e >> 3]));
    break a;
   }
  }
 } while (0);
 i = j;
 return ba(a);
}

function be(b, d, e) {
 b = b | 0;
 d = d | 0;
 e = e | 0;
 var f = 0, g = 0, h = 0, i = 0, j = 0;
 if ((e | 0) <= -1) va(6428, 6388, 89, 6462);
 g = b + 16 | 0;
 if (((c[g >> 2] | 0) + -1 | 0) <= (e | 0)) va(6428, 6388, 89, 6462);
 c[d + 4 >> 2] = 1;
 c[d + 8 >> 2] = c[b + 8 >> 2];
 h = b + 12 | 0;
 f = (c[h >> 2] | 0) + (e << 3) | 0;
 i = c[f + 4 >> 2] | 0;
 j = d + 12 | 0;
 c[j >> 2] = c[f >> 2];
 c[j + 4 >> 2] = i;
 j = (c[h >> 2] | 0) + (e + 1 << 3) | 0;
 i = c[j + 4 >> 2] | 0;
 f = d + 20 | 0;
 c[f >> 2] = c[j >> 2];
 c[f + 4 >> 2] = i;
 f = d + 28 | 0;
 if ((e | 0) > 0) {
  i = (c[h >> 2] | 0) + (e + -1 << 3) | 0;
  j = c[i + 4 >> 2] | 0;
  c[f >> 2] = c[i >> 2];
  c[f + 4 >> 2] = j;
  f = 1;
 } else {
  i = b + 20 | 0;
  j = c[i + 4 >> 2] | 0;
  c[f >> 2] = c[i >> 2];
  c[f + 4 >> 2] = j;
  f = a[b + 36 >> 0] | 0;
 }
 a[d + 44 >> 0] = f;
 f = d + 36 | 0;
 if (((c[g >> 2] | 0) + -2 | 0) > (e | 0)) {
  b = (c[h >> 2] | 0) + (e + 2 << 3) | 0;
  j = c[b + 4 >> 2] | 0;
  i = f;
  c[i >> 2] = c[b >> 2];
  c[i + 4 >> 2] = j;
  i = 1;
  j = d + 45 | 0;
  a[j >> 0] = i;
  return;
 } else {
  e = b + 28 | 0;
  j = c[e + 4 >> 2] | 0;
  i = f;
  c[i >> 2] = c[e >> 2];
  c[i + 4 >> 2] = j;
  i = a[b + 37 >> 0] | 0;
  j = d + 45 | 0;
  a[j >> 0] = i;
  return;
 }
}

function Jb(b, d) {
 b = b | 0;
 d = d | 0;
 var e = 0, f = 0, g = 0, h = 0, i = 0, j = 0;
 if (!d) {
  j = 0;
  return j | 0;
 }
 if ((d | 0) <= 0) va(2761, 2710, 104, 5551);
 if ((d | 0) > 640) {
  j = Lb(d) | 0;
  return j | 0;
 }
 j = a[10280 + d >> 0] | 0;
 h = j & 255;
 if ((j & 255) >= 14) va(2770, 2710, 112, 5551);
 j = b + 12 + (h << 2) | 0;
 d = c[j >> 2] | 0;
 if (d | 0) {
  c[j >> 2] = c[d >> 2];
  j = d;
  return j | 0;
 }
 i = b + 4 | 0;
 d = c[i >> 2] | 0;
 e = b + 8 | 0;
 if ((d | 0) == (c[e >> 2] | 0)) {
  g = c[b >> 2] | 0;
  d = d + 128 | 0;
  c[e >> 2] = d;
  d = Lb(d << 3) | 0;
  c[b >> 2] = d;
  zf(d | 0, g | 0, c[i >> 2] << 3 | 0) | 0;
  vf((c[b >> 2] | 0) + (c[i >> 2] << 3) | 0, 0, 1024) | 0;
  Mb(g);
  d = c[i >> 2] | 0;
 }
 e = c[b >> 2] | 0;
 f = Lb(16384) | 0;
 g = e + (d << 3) + 4 | 0;
 c[g >> 2] = f;
 b = c[1464 + (h << 2) >> 2] | 0;
 c[e + (d << 3) >> 2] = b;
 d = 16384 / (b | 0) | 0;
 if ((_(d, b) | 0) >= 16385) va(2806, 2710, 140, 5551);
 e = d + -1 | 0;
 if ((d | 0) > 1) {
  d = 0;
  do {
   h = d;
   d = d + 1 | 0;
   c[f + (_(h, b) | 0) >> 2] = f + (_(d, b) | 0);
  } while ((d | 0) != (e | 0));
 }
 c[f + (_(e, b) | 0) >> 2] = 0;
 c[j >> 2] = c[f >> 2];
 c[i >> 2] = (c[i >> 2] | 0) + 1;
 j = c[g >> 2] | 0;
 return j | 0;
}

function hd(a, b, d) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 var e = 0, f = 0, g = 0, h = 0, i = 0;
 switch (c[b + 4 >> 2] | 0) {
 case 0:
  {
   c[a + 16 >> 2] = b + 12;
   c[a + 20 >> 2] = 1;
   c[a + 24 >> 2] = c[b + 8 >> 2];
   return;
  }
 case 2:
  {
   c[a + 16 >> 2] = b + 20;
   c[a + 20 >> 2] = c[b + 148 >> 2];
   c[a + 24 >> 2] = c[b + 8 >> 2];
   return;
  }
 case 3:
  {
   if ((d | 0) <= -1) va(4556, 4593, 53, 4624);
   f = b + 16 | 0;
   if ((c[f >> 2] | 0) <= (d | 0)) va(4556, 4593, 53, 4624);
   g = b + 12 | 0;
   i = (c[g >> 2] | 0) + (d << 3) | 0;
   h = c[i + 4 >> 2] | 0;
   e = a;
   c[e >> 2] = c[i >> 2];
   c[e + 4 >> 2] = h;
   d = d + 1 | 0;
   e = a + 8 | 0;
   if ((d | 0) < (c[f >> 2] | 0)) {
    g = (c[g >> 2] | 0) + (d << 3) | 0;
    h = c[g + 4 >> 2] | 0;
    i = e;
    c[i >> 2] = c[g >> 2];
    c[i + 4 >> 2] = h;
   } else {
    g = c[g >> 2] | 0;
    h = c[g + 4 >> 2] | 0;
    i = e;
    c[i >> 2] = c[g >> 2];
    c[i + 4 >> 2] = h;
   }
   c[a + 16 >> 2] = a;
   c[a + 20 >> 2] = 2;
   c[a + 24 >> 2] = c[b + 8 >> 2];
   return;
  }
 case 1:
  {
   c[a + 16 >> 2] = b + 12;
   c[a + 20 >> 2] = 2;
   c[a + 24 >> 2] = c[b + 8 >> 2];
   return;
  }
 default:
  va(5401, 4593, 81, 4624);
 }
}

function _e(d, e, f, g) {
 d = d | 0;
 e = e | 0;
 f = f | 0;
 g = g | 0;
 var h = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0;
 r = i;
 i = i + 64 | 0;
 q = r;
 p = c[d >> 2] | 0;
 o = d + (c[p + -8 >> 2] | 0) | 0;
 p = c[p + -4 >> 2] | 0;
 c[q >> 2] = f;
 c[q + 4 >> 2] = d;
 c[q + 8 >> 2] = e;
 c[q + 12 >> 2] = g;
 l = q + 16 | 0;
 g = q + 20 | 0;
 d = q + 24 | 0;
 e = q + 28 | 0;
 h = q + 32 | 0;
 j = q + 40 | 0;
 k = (p | 0) == (f | 0);
 m = l;
 n = m + 36 | 0;
 do {
  c[m >> 2] = 0;
  m = m + 4 | 0;
 } while ((m | 0) < (n | 0));
 b[l + 36 >> 1] = 0;
 a[l + 38 >> 0] = 0;
 a : do if (k) {
  c[q + 48 >> 2] = 1;
  ab[c[(c[f >> 2] | 0) + 20 >> 2] & 3](f, q, o, o, 1, 0);
  g = (c[d >> 2] | 0) == 1 ? o : 0;
 } else {
  Va[c[(c[p >> 2] | 0) + 24 >> 2] & 3](p, q, o, 1, 0);
  switch (c[q + 36 >> 2] | 0) {
  case 0:
   {
    g = (c[j >> 2] | 0) == 1 & (c[e >> 2] | 0) == 1 & (c[h >> 2] | 0) == 1 ? c[g >> 2] | 0 : 0;
    break a;
   }
  case 1:
   break;
  default:
   {
    g = 0;
    break a;
   }
  }
  if ((c[d >> 2] | 0) != 1) if (!((c[j >> 2] | 0) == 0 & (c[e >> 2] | 0) == 1 & (c[h >> 2] | 0) == 1)) {
   g = 0;
   break;
  }
  g = c[l >> 2] | 0;
 } while (0);
 i = r;
 return g | 0;
}

function nd(a) {
 a = a | 0;
 var b = 0, d = 0, e = 0, f = 0, g = 0, h = 0;
 h = a + 16 | 0;
 b = c[h >> 2] | 0;
 if ((b | 0) == -1) {
  d = a + 8 | 0;
  b = c[d >> 2] | 0;
  g = a + 12 | 0;
  if ((b | 0) != (c[g >> 2] | 0)) va(4710, 4740, 61, 4774);
  f = a + 4 | 0;
  a = c[f >> 2] | 0;
  c[g >> 2] = b << 1;
  b = Lb(b * 72 | 0) | 0;
  c[f >> 2] = b;
  zf(b | 0, a | 0, (c[d >> 2] | 0) * 36 | 0) | 0;
  Mb(a);
  a = c[d >> 2] | 0;
  b = (c[g >> 2] | 0) + -1 | 0;
  if ((a | 0) < (b | 0)) {
   e = c[f >> 2] | 0;
   do {
    b = a;
    a = a + 1 | 0;
    c[e + (b * 36 | 0) + 20 >> 2] = a;
    c[e + (b * 36 | 0) + 32 >> 2] = -1;
    b = (c[g >> 2] | 0) + -1 | 0;
   } while ((a | 0) < (b | 0));
  }
  a = c[f >> 2] | 0;
  c[a + (b * 36 | 0) + 20 >> 2] = -1;
  c[a + (((c[g >> 2] | 0) + -1 | 0) * 36 | 0) + 32 >> 2] = -1;
  b = c[d >> 2] | 0;
  c[h >> 2] = b;
 } else {
  d = a + 8 | 0;
  a = c[a + 4 >> 2] | 0;
 }
 g = a + (b * 36 | 0) + 20 | 0;
 c[h >> 2] = c[g >> 2];
 c[g >> 2] = -1;
 c[a + (b * 36 | 0) + 24 >> 2] = -1;
 c[a + (b * 36 | 0) + 28 >> 2] = -1;
 c[a + (b * 36 | 0) + 32 >> 2] = 0;
 c[a + (b * 36 | 0) + 16 >> 2] = 0;
 c[d >> 2] = (c[d >> 2] | 0) + 1;
 return b | 0;
}

function le(b, d, e) {
 b = b | 0;
 d = d | 0;
 e = e | 0;
 var f = 0, g = 0, h = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0;
 s = i;
 i = i + 224 | 0;
 o = s + 120 | 0;
 r = s + 80 | 0;
 q = s;
 p = s + 136 | 0;
 f = r;
 g = f + 40 | 0;
 do {
  c[f >> 2] = 0;
  f = f + 4 | 0;
 } while ((f | 0) < (g | 0));
 c[o >> 2] = c[e >> 2];
 if ((me(0, d, o, q, r) | 0) < 0) e = -1; else {
  if ((c[b + 76 >> 2] | 0) > -1) m = ye(b) | 0; else m = 0;
  e = c[b >> 2] | 0;
  n = e & 32;
  if ((a[b + 74 >> 0] | 0) < 1) c[b >> 2] = e & -33;
  e = b + 48 | 0;
  if (!(c[e >> 2] | 0)) {
   g = b + 44 | 0;
   h = c[g >> 2] | 0;
   c[g >> 2] = p;
   j = b + 28 | 0;
   c[j >> 2] = p;
   k = b + 20 | 0;
   c[k >> 2] = p;
   c[e >> 2] = 80;
   l = b + 16 | 0;
   c[l >> 2] = p + 80;
   f = me(b, d, o, q, r) | 0;
   if (h) {
    Ua[c[b + 36 >> 2] & 7](b, 0, 0) | 0;
    f = (c[k >> 2] | 0) == 0 ? -1 : f;
    c[g >> 2] = h;
    c[e >> 2] = 0;
    c[l >> 2] = 0;
    c[j >> 2] = 0;
    c[k >> 2] = 0;
   }
  } else f = me(b, d, o, q, r) | 0;
  e = c[b >> 2] | 0;
  c[b >> 2] = e | n;
  if (m | 0) he(b);
  e = (e & 32 | 0) == 0 ? f : -1;
 }
 i = s;
 return e | 0;
}

function xc(b, d, e, f, g) {
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 g = g | 0;
 var h = 0, i = 0, j = 0;
 if (!(a[10922] | 0)) {
  c[2373] = 3;
  c[2374] = 3;
  a[9500] = 1;
  c[2397] = 4;
  c[2398] = 4;
  a[9596] = 1;
  c[2379] = 4;
  c[2380] = 4;
  a[9524] = 0;
  c[2403] = 5;
  c[2404] = 5;
  a[9620] = 1;
  c[2385] = 6;
  c[2386] = 6;
  a[9548] = 1;
  c[2376] = 6;
  c[2377] = 6;
  a[9512] = 0;
  c[2391] = 7;
  c[2392] = 7;
  a[9572] = 1;
  c[2400] = 7;
  c[2401] = 7;
  a[9608] = 0;
  c[2409] = 8;
  c[2410] = 8;
  a[9644] = 1;
  c[2382] = 8;
  c[2383] = 8;
  a[9536] = 0;
  c[2415] = 9;
  c[2416] = 9;
  a[9668] = 1;
  c[2406] = 9;
  c[2407] = 9;
  a[9632] = 0;
  a[10922] = 1;
 }
 i = c[(c[b + 12 >> 2] | 0) + 4 >> 2] | 0;
 j = c[(c[e + 12 >> 2] | 0) + 4 >> 2] | 0;
 if (i >>> 0 >= 4) va(3682, 3725, 80, 3806);
 if (j >>> 0 >= 4) va(3763, 3725, 81, 3806);
 h = c[9492 + (i * 48 | 0) + (j * 12 | 0) >> 2] | 0;
 if (!h) {
  f = 0;
  return f | 0;
 }
 if (!(a[9492 + (i * 48 | 0) + (j * 12 | 0) + 8 >> 0] | 0)) {
  f = cb[h & 15](e, f, b, d, g) | 0;
  return f | 0;
 } else {
  f = cb[h & 15](b, d, e, f, g) | 0;
  return f | 0;
 }
 return 0;
}

function _b(a, b) {
 a = a | 0;
 b = b | 0;
 var d = 0, e = 0, f = 0, g = 0, h = 0;
 g = c[(c[b + 48 >> 2] | 0) + 8 >> 2] | 0;
 h = c[(c[b + 52 >> 2] | 0) + 8 >> 2] | 0;
 d = c[a + 72 >> 2] | 0;
 if (d | 0) if (c[b + 4 >> 2] & 2 | 0) Xa[c[(c[d >> 2] | 0) + 12 >> 2] & 15](d, b);
 e = c[b + 8 >> 2] | 0;
 d = b + 12 | 0;
 if (e | 0) c[e + 12 >> 2] = c[d >> 2];
 f = c[d >> 2] | 0;
 if (f | 0) c[f + 8 >> 2] = e;
 d = a + 60 | 0;
 if ((c[d >> 2] | 0) == (b | 0)) c[d >> 2] = f;
 e = c[b + 24 >> 2] | 0;
 d = b + 28 | 0;
 if (e | 0) c[e + 12 >> 2] = c[d >> 2];
 f = c[d >> 2] | 0;
 if (f | 0) c[f + 8 >> 2] = e;
 d = g + 112 | 0;
 if ((b + 16 | 0) == (c[d >> 2] | 0)) c[d >> 2] = f;
 e = c[b + 40 >> 2] | 0;
 d = b + 44 | 0;
 if (e | 0) c[e + 12 >> 2] = c[d >> 2];
 f = c[d >> 2] | 0;
 if (f | 0) c[f + 8 >> 2] = e;
 d = h + 112 | 0;
 if ((b + 32 | 0) != (c[d >> 2] | 0)) {
  h = a + 76 | 0;
  h = c[h >> 2] | 0;
  yc(b, h);
  a = a + 64 | 0;
  b = c[a >> 2] | 0;
  b = b + -1 | 0;
  c[a >> 2] = b;
  return;
 }
 c[d >> 2] = f;
 h = a + 76 | 0;
 h = c[h >> 2] | 0;
 yc(b, h);
 a = a + 64 | 0;
 b = c[a >> 2] | 0;
 b = b + -1 | 0;
 c[a >> 2] = b;
 return;
}

function fd(b, d, e, f, h) {
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = ba(f);
 h = h | 0;
 var i = 0, j = 0, k = 0, l = Ta, m = Ta, n = Ta, o = 0, p = Ta;
 n = ba(g[e >> 2]);
 l = ba(n * ba(g[d >> 2]));
 m = ba(g[e + 4 >> 2]);
 k = d + 4 | 0;
 l = ba(ba(l + ba(m * ba(g[k >> 2]))) - f);
 i = d + 12 | 0;
 n = ba(n * ba(g[i >> 2]));
 j = d + 16 | 0;
 f = ba(ba(n + ba(m * ba(g[j >> 2]))) - f);
 if (!(l <= ba(0.0))) e = 0; else {
  c[b >> 2] = c[d >> 2];
  c[b + 4 >> 2] = c[d + 4 >> 2];
  c[b + 8 >> 2] = c[d + 8 >> 2];
  e = 1;
 }
 if (f <= ba(0.0)) {
  o = b + (e * 12 | 0) | 0;
  c[o >> 2] = c[i >> 2];
  c[o + 4 >> 2] = c[i + 4 >> 2];
  c[o + 8 >> 2] = c[i + 8 >> 2];
  e = e + 1 | 0;
 }
 if (!(ba(l * f) < ba(0.0))) {
  o = e;
  return o | 0;
 }
 l = ba(l / ba(l - f));
 m = ba(g[i >> 2]);
 f = ba(g[d >> 2]);
 m = ba(m - f);
 p = ba(g[j >> 2]);
 n = ba(g[k >> 2]);
 n = ba(n + ba(l * ba(p - n)));
 g[b + (e * 12 | 0) >> 2] = ba(f + ba(l * m));
 g[b + (e * 12 | 0) + 4 >> 2] = n;
 o = b + (e * 12 | 0) + 8 | 0;
 a[o >> 0] = h;
 a[o + 1 >> 0] = a[d + 8 + 1 >> 0] | 0;
 a[o + 2 >> 0] = 0;
 a[o + 3 >> 0] = 1;
 o = e + 1 | 0;
 return o | 0;
}

function Xc(a, b, d, e, f) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 var h = 0, i = 0, j = Ta, k = Ta, l = Ta, m = Ta, n = Ta, o = Ta, p = Ta;
 h = a + 60 | 0;
 c[h >> 2] = 0;
 i = b + 12 | 0;
 n = ba(g[d + 12 >> 2]);
 m = ba(g[i >> 2]);
 j = ba(n * m);
 p = ba(g[d + 8 >> 2]);
 k = ba(g[b + 16 >> 2]);
 j = ba(j - ba(p * k));
 j = ba(ba(g[d >> 2]) + j);
 k = ba(ba(m * p) + ba(n * k));
 k = ba(k + ba(g[d + 4 >> 2]));
 d = e + 12 | 0;
 n = ba(g[f + 12 >> 2]);
 p = ba(g[d >> 2]);
 m = ba(n * p);
 o = ba(g[f + 8 >> 2]);
 l = ba(g[e + 16 >> 2]);
 m = ba(m - ba(o * l));
 m = ba(ba(g[f >> 2]) + m);
 l = ba(ba(p * o) + ba(n * l));
 j = ba(m - j);
 k = ba(ba(l + ba(g[f + 4 >> 2])) - k);
 k = ba(ba(j * j) + ba(k * k));
 j = ba(g[b + 8 >> 2]);
 j = ba(j + ba(g[e + 8 >> 2]));
 if (k > ba(j * j)) return;
 c[a + 56 >> 2] = 0;
 f = i;
 e = c[f + 4 >> 2] | 0;
 b = a + 48 | 0;
 c[b >> 2] = c[f >> 2];
 c[b + 4 >> 2] = e;
 g[a + 40 >> 2] = ba(0.0);
 g[a + 44 >> 2] = ba(0.0);
 c[h >> 2] = 1;
 b = d;
 e = c[b + 4 >> 2] | 0;
 f = a;
 c[f >> 2] = c[b >> 2];
 c[f + 4 >> 2] = e;
 c[a + 16 >> 2] = 0;
 return;
}

function se(b, d, e) {
 b = b | 0;
 d = d | 0;
 e = e | 0;
 var f = 0, g = 0, h = 0, i = 0;
 h = d & 255;
 f = (e | 0) != 0;
 a : do if (f & (b & 3 | 0) != 0) {
  g = d & 255;
  while (1) {
   if ((a[b >> 0] | 0) == g << 24 >> 24) {
    i = 6;
    break a;
   }
   b = b + 1 | 0;
   e = e + -1 | 0;
   f = (e | 0) != 0;
   if (!(f & (b & 3 | 0) != 0)) {
    i = 5;
    break;
   }
  }
 } else i = 5; while (0);
 if ((i | 0) == 5) if (f) i = 6; else e = 0;
 b : do if ((i | 0) == 6) {
  g = d & 255;
  if ((a[b >> 0] | 0) != g << 24 >> 24) {
   f = _(h, 16843009) | 0;
   c : do if (e >>> 0 > 3) while (1) {
    h = c[b >> 2] ^ f;
    if ((h & -2139062144 ^ -2139062144) & h + -16843009 | 0) break;
    b = b + 4 | 0;
    e = e + -4 | 0;
    if (e >>> 0 <= 3) {
     i = 11;
     break c;
    }
   } else i = 11; while (0);
   if ((i | 0) == 11) if (!e) {
    e = 0;
    break;
   }
   while (1) {
    if ((a[b >> 0] | 0) == g << 24 >> 24) break b;
    b = b + 1 | 0;
    e = e + -1 | 0;
    if (!e) {
     e = 0;
     break;
    }
   }
  }
 } while (0);
 return (e | 0 ? b : 0) | 0;
}

function lc(d, e, f, g) {
 d = d | 0;
 e = e | 0;
 f = f | 0;
 g = g | 0;
 var h = 0;
 c[d + 40 >> 2] = c[g + 4 >> 2];
 c[d + 16 >> 2] = c[g + 8 >> 2];
 c[d + 20 >> 2] = c[g + 12 >> 2];
 c[d + 8 >> 2] = f;
 c[d + 4 >> 2] = 0;
 h = d + 32 | 0;
 f = g + 22 | 0;
 b[h >> 1] = b[f >> 1] | 0;
 b[h + 2 >> 1] = b[f + 2 >> 1] | 0;
 b[h + 4 >> 1] = b[f + 4 >> 1] | 0;
 a[d + 38 >> 0] = a[g + 20 >> 0] | 0;
 h = c[g >> 2] | 0;
 h = bb[c[(c[h >> 2] | 0) + 8 >> 2] & 3](h, e) | 0;
 c[d + 12 >> 2] = h;
 h = Ya[c[(c[h >> 2] | 0) + 12 >> 2] & 7](h) | 0;
 f = Jb(e, h * 28 | 0) | 0;
 c[d + 24 >> 2] = f;
 if ((h | 0) > 0) e = 0; else {
  h = d + 28 | 0;
  c[h >> 2] = 0;
  g = g + 16 | 0;
  g = c[g >> 2] | 0;
  c[d >> 2] = g;
  return;
 }
 do {
  c[f + (e * 28 | 0) + 16 >> 2] = 0;
  c[f + (e * 28 | 0) + 24 >> 2] = -1;
  e = e + 1 | 0;
 } while ((e | 0) != (h | 0));
 h = d + 28 | 0;
 c[h >> 2] = 0;
 g = g + 16 | 0;
 g = c[g >> 2] | 0;
 c[d >> 2] = g;
 return;
}

function Oe() {
 var a = 0, b = 0, d = 0, e = 0, f = 0, g = 0, h = 0, j = 0;
 f = i;
 i = i + 48 | 0;
 h = f + 32 | 0;
 e = f + 24 | 0;
 j = f + 16 | 0;
 g = f;
 f = f + 36 | 0;
 a = Pe() | 0;
 if (a | 0) {
  d = c[a >> 2] | 0;
  if (d | 0) {
   a = d + 48 | 0;
   b = c[a >> 2] | 0;
   a = c[a + 4 >> 2] | 0;
   if (!((b & -256 | 0) == 1126902528 & (a | 0) == 1129074247)) {
    c[e >> 2] = 9183;
    Se(9278, e);
   }
   if ((b | 0) == 1126902529 & (a | 0) == 1129074247) a = c[d + 44 >> 2] | 0; else a = d + 80 | 0;
   c[f >> 2] = a;
   e = c[d >> 2] | 0;
   a = c[e + 4 >> 2] | 0;
   if (Ua[c[(c[316] | 0) + 16 >> 2] & 7](1264, e, f) | 0) {
    j = c[f >> 2] | 0;
    j = Ya[c[(c[j >> 2] | 0) + 8 >> 2] & 7](j) | 0;
    c[g >> 2] = 9183;
    c[g + 4 >> 2] = a;
    c[g + 8 >> 2] = j;
    Se(9192, g);
   } else {
    c[j >> 2] = 9183;
    c[j + 4 >> 2] = a;
    Se(9237, j);
   }
  }
 }
 Se(9316, h);
}

function ne(b, d, e) {
 b = b | 0;
 d = d | 0;
 e = e | 0;
 var f = 0, g = 0, h = 0, i = 0;
 f = e + 16 | 0;
 g = c[f >> 2] | 0;
 if (!g) if (!(oe(e) | 0)) {
  g = c[f >> 2] | 0;
  h = 5;
 } else f = 0; else h = 5;
 a : do if ((h | 0) == 5) {
  i = e + 20 | 0;
  f = c[i >> 2] | 0;
  h = f;
  if ((g - f | 0) >>> 0 < d >>> 0) {
   f = Ua[c[e + 36 >> 2] & 7](e, b, d) | 0;
   break;
  }
  b : do if ((a[e + 75 >> 0] | 0) > -1) {
   f = d;
   while (1) {
    if (!f) {
     g = h;
     f = 0;
     break b;
    }
    g = f + -1 | 0;
    if ((a[b + g >> 0] | 0) == 10) break; else f = g;
   }
   if ((Ua[c[e + 36 >> 2] & 7](e, b, f) | 0) >>> 0 < f >>> 0) break a;
   d = d - f | 0;
   b = b + f | 0;
   g = c[i >> 2] | 0;
  } else {
   g = h;
   f = 0;
  } while (0);
  zf(g | 0, b | 0, d | 0) | 0;
  c[i >> 2] = (c[i >> 2] | 0) + d;
  f = f + d | 0;
 } while (0);
 return f | 0;
}

function Ie(a, b) {
 a = ba(a);
 b = b | 0;
 var d = 0, e = 0.0, f = 0, j = 0, l = 0, m = 0, n = Ta, o = 0.0, p = 0;
 m = i;
 i = i + 16 | 0;
 f = m + 8 | 0;
 j = m;
 l = (g[k >> 2] = a, c[k >> 2] | 0);
 n = ba(N(ba(a)));
 d = (g[k >> 2] = n, c[k >> 2] | 0);
 do if (d >>> 0 < 1305022427) {
  o = +a;
  e = o * .6366197723675814 + 6755399441055744.0 + -6755399441055744.0;
  h[b >> 3] = o - e * 1.5707963109016418 - e * 1.5893254773528196e-08;
  d = ~~e;
 } else {
  if (d >>> 0 > 2139095039) {
   h[b >> 3] = +ba(a - a);
   d = 0;
   break;
  }
  p = (d >>> 23) + -150 | 0;
  h[f >> 3] = +(c[k >> 2] = d - (p << 23), ba(g[k >> 2]));
  d = Je(f, j, p, 1, 0) | 0;
  e = +h[j >> 3];
  if ((l | 0) < 0) {
   h[b >> 3] = -e;
   d = 0 - d | 0;
   break;
  } else {
   h[b >> 3] = e;
   break;
  }
 } while (0);
 i = m;
 return d | 0;
}

function pb() {
 var a = 0, b = 0, d = 0, e = 0, f = 0.0, j = 0.0, k = 0.0, l = 0.0;
 e = i;
 i = i + 48 | 0;
 d = e;
 b = e + 32 | 0;
 a = c[2371] | 0;
 if ((a | 0) >= (c[2368] | 0)) {
  c[2371] = a + 1;
  nb(b, c[2370] | 0);
  l = +ba(g[b >> 2]);
  k = +ba(g[b + 4 >> 2]);
  j = +ba(ba(ba(c[344] | 0) / ba(1.0e6)) * ba(1.0e3));
  f = +ba(ba(ba(c[345] | 0) / ba(1.0e6)) * ba(1.0e3));
  h[d >> 3] = l;
  h[d + 8 >> 3] = k;
  h[d + 16 >> 3] = j;
  h[d + 24 >> 3] = f;
  Ee(2368, d) | 0;
  ra(2420);
  if (c[2372] | 0) Oa();
  i = e;
  return;
 }
 a = Fa() | 0;
 tc(c[2369] | 0, ba(.0166666675), 3, 3);
 a = (Fa() | 0) - a | 0;
 b = c[2371] | 0;
 c[(c[2370] | 0) + (b << 2) >> 2] = a;
 if ((a | 0) < (c[344] | 0)) c[344] = a;
 if ((a | 0) > (c[345] | 0)) c[345] = a;
 c[2371] = b + 1;
 i = e;
 return;
}

function Cb(a, b, d) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 var e = Ta, f = Ta, h = Ta, i = Ta, j = Ta;
 h = ba(g[d >> 2]);
 h = ba(h - ba(g[b >> 2]));
 i = ba(g[d + 4 >> 2]);
 i = ba(i - ba(g[b + 4 >> 2]));
 j = ba(g[b + 12 >> 2]);
 e = ba(h * j);
 f = ba(g[b + 8 >> 2]);
 e = ba(e + ba(i * f));
 f = ba(ba(j * i) - ba(h * f));
 d = c[a + 148 >> 2] | 0;
 if ((d | 0) > 0) b = 0; else {
  a = 1;
  return a | 0;
 }
 while (1) {
  i = ba(e - ba(g[a + 20 + (b << 3) >> 2]));
  j = ba(f - ba(g[a + 20 + (b << 3) + 4 >> 2]));
  i = ba(i * ba(g[a + 84 + (b << 3) >> 2]));
  if (ba(i + ba(j * ba(g[a + 84 + (b << 3) + 4 >> 2]))) > ba(0.0)) {
   d = 0;
   b = 4;
   break;
  }
  b = b + 1 | 0;
  if ((b | 0) >= (d | 0)) {
   d = 1;
   b = 4;
   break;
  }
 }
 if ((b | 0) == 4) return d | 0;
 return 0;
}

function nb(a, b) {
 a = a | 0;
 b = b | 0;
 var d = Ta, e = Ta, f = 0, h = Ta, j = 0, k = 0, l = 0, m = 0, n = Ta;
 m = i;
 k = c[2368] | 0;
 l = i;
 i = i + ((1 * (k << 2) | 0) + 15 & -16) | 0;
 j = (k | 0) > 0;
 if (j) {
  f = 0;
  d = ba(0.0);
  do {
   h = ba(ba(ba(c[b + (f << 2) >> 2] | 0) / ba(1.0e6)) * ba(1.0e3));
   g[l + (f << 2) >> 2] = h;
   d = ba(d + h);
   f = f + 1 | 0;
  } while ((f | 0) < (k | 0));
  e = ba(k | 0);
  h = ba(d / e);
  g[a >> 2] = h;
  if (j) {
   f = 0;
   d = ba(0.0);
   do {
    n = ba(ba(g[l + (f << 2) >> 2]) - h);
    d = ba(d + ba(n * n));
    f = f + 1 | 0;
   } while ((f | 0) < (k | 0));
  } else d = ba(0.0);
 } else {
  e = ba(k | 0);
  g[a >> 2] = ba(ba(0.0) / e);
  d = ba(0.0);
 }
 g[a + 4 >> 2] = ba(O(ba(d / e)));
 i = m;
 return;
}

function gd(d, e, f, h, j, k) {
 d = d | 0;
 e = e | 0;
 f = f | 0;
 h = h | 0;
 j = j | 0;
 k = k | 0;
 var l = 0, m = 0, n = 0, o = 0;
 l = i;
 i = i + 128 | 0;
 n = l + 36 | 0;
 o = l + 24 | 0;
 m = l;
 c[n + 16 >> 2] = 0;
 c[n + 20 >> 2] = 0;
 g[n + 24 >> 2] = ba(0.0);
 c[n + 44 >> 2] = 0;
 c[n + 48 >> 2] = 0;
 g[n + 52 >> 2] = ba(0.0);
 hd(n, d, e);
 hd(n + 28 | 0, f, h);
 f = n + 56 | 0;
 c[f >> 2] = c[j >> 2];
 c[f + 4 >> 2] = c[j + 4 >> 2];
 c[f + 8 >> 2] = c[j + 8 >> 2];
 c[f + 12 >> 2] = c[j + 12 >> 2];
 j = n + 72 | 0;
 c[j >> 2] = c[k >> 2];
 c[j + 4 >> 2] = c[k + 4 >> 2];
 c[j + 8 >> 2] = c[k + 8 >> 2];
 c[j + 12 >> 2] = c[k + 12 >> 2];
 a[n + 88 >> 0] = 1;
 b[o + 4 >> 1] = 0;
 jd(m, o, n);
 k = ba(g[m + 16 >> 2]) < ba(1.1920929e-06);
 i = l;
 return k | 0;
}

function yc(d, f) {
 d = d | 0;
 f = f | 0;
 var h = 0, i = 0, j = 0, k = 0, l = 0;
 if (!(a[10922] | 0)) va(3813, 3725, 103, 3835);
 l = c[d + 48 >> 2] | 0;
 if ((c[d + 124 >> 2] | 0) > 0) {
  i = c[l + 8 >> 2] | 0;
  j = i + 4 | 0;
  h = e[j >> 1] | 0;
  if (!(h & 2)) {
   b[j >> 1] = h | 2;
   g[i + 144 >> 2] = ba(0.0);
  }
  h = c[d + 52 >> 2] | 0;
  i = c[h + 8 >> 2] | 0;
  j = i + 4 | 0;
  k = e[j >> 1] | 0;
  if (!(k & 2)) {
   b[j >> 1] = k | 2;
   g[i + 144 >> 2] = ba(0.0);
  }
 } else h = c[d + 52 >> 2] | 0;
 i = c[(c[l + 12 >> 2] | 0) + 4 >> 2] | 0;
 h = c[(c[h + 12 >> 2] | 0) + 4 >> 2] | 0;
 if ((i | 0) > -1 & (h | 0) < 4) {
  Xa[c[9492 + (i * 48 | 0) + (h * 12 | 0) + 4 >> 2] & 15](d, f);
  return;
 } else va(3843, 3725, 114, 3835);
}

function oc(b, d) {
 b = b | 0;
 d = d | 0;
 var e = 0, f = 0;
 Hb(b);
 xd(b + 68 | 0);
 Zb(b + 102872 | 0);
 c[b + 102980 >> 2] = 0;
 c[b + 102984 >> 2] = 0;
 f = b + 102952 | 0;
 c[f >> 2] = 0;
 c[f + 4 >> 2] = 0;
 c[f + 8 >> 2] = 0;
 c[f + 12 >> 2] = 0;
 a[b + 102992 >> 0] = 1;
 a[b + 102993 >> 0] = 1;
 a[b + 102994 >> 0] = 0;
 a[b + 102995 >> 0] = 1;
 a[b + 102976 >> 0] = 1;
 f = d;
 e = c[f + 4 >> 2] | 0;
 d = b + 102968 | 0;
 c[d >> 2] = c[f >> 2];
 c[d + 4 >> 2] = e;
 c[b + 102868 >> 2] = 4;
 g[b + 102988 >> 2] = ba(0.0);
 c[b + 102948 >> 2] = b;
 b = b + 102996 | 0;
 c[b >> 2] = 0;
 c[b + 4 >> 2] = 0;
 c[b + 8 >> 2] = 0;
 c[b + 12 >> 2] = 0;
 c[b + 16 >> 2] = 0;
 c[b + 20 >> 2] = 0;
 c[b + 24 >> 2] = 0;
 c[b + 28 >> 2] = 0;
 return;
}

function wb(a, b, c, d) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 var e = Ta, f = Ta, h = Ta, i = Ta, j = Ta, k = Ta, l = Ta, m = Ta, n = Ta;
 i = ba(g[c + 12 >> 2]);
 m = ba(g[a + 12 >> 2]);
 h = ba(i * m);
 l = ba(g[c + 8 >> 2]);
 j = ba(g[a + 16 >> 2]);
 h = ba(h - ba(l * j));
 n = ba(g[c >> 2]);
 h = ba(n + h);
 j = ba(ba(m * l) + ba(i * j));
 m = ba(g[c + 4 >> 2]);
 j = ba(j + m);
 k = ba(g[a + 20 >> 2]);
 f = ba(i * k);
 e = ba(g[a + 24 >> 2]);
 f = ba(n + ba(f - ba(l * e)));
 e = ba(m + ba(ba(l * k) + ba(i * e)));
 i = ba(g[a + 8 >> 2]);
 k = ba((j < e ? j : e) - i);
 g[b >> 2] = ba((h < f ? h : f) - i);
 g[b + 4 >> 2] = k;
 e = ba(i + (j > e ? j : e));
 g[b + 8 >> 2] = ba(i + (h > f ? h : f));
 g[b + 12 >> 2] = e;
 return;
}

function ve(b, d, e) {
 b = b | 0;
 d = d | 0;
 e = e | 0;
 do if (!b) b = 1; else {
  if (d >>> 0 < 128) {
   a[b >> 0] = d;
   b = 1;
   break;
  }
  if (d >>> 0 < 2048) {
   a[b >> 0] = d >>> 6 | 192;
   a[b + 1 >> 0] = d & 63 | 128;
   b = 2;
   break;
  }
  if (d >>> 0 < 55296 | (d & -8192 | 0) == 57344) {
   a[b >> 0] = d >>> 12 | 224;
   a[b + 1 >> 0] = d >>> 6 & 63 | 128;
   a[b + 2 >> 0] = d & 63 | 128;
   b = 3;
   break;
  }
  if ((d + -65536 | 0) >>> 0 < 1048576) {
   a[b >> 0] = d >>> 18 | 240;
   a[b + 1 >> 0] = d >>> 12 & 63 | 128;
   a[b + 2 >> 0] = d >>> 6 & 63 | 128;
   a[b + 3 >> 0] = d & 63 | 128;
   b = 4;
   break;
  } else {
   c[(ee() | 0) >> 2] = 84;
   b = -1;
   break;
  }
 } while (0);
 return b | 0;
}

function sb(a, d) {
 a = a | 0;
 d = d | 0;
 var e = 0, f = 0, h = 0;
 d = Jb(d, 48) | 0;
 c[d >> 2] = 1392;
 e = d + 4 | 0;
 c[e >> 2] = 1;
 g[d + 8 >> 2] = ba(.00999999977);
 h = d + 28 | 0;
 c[h >> 2] = 0;
 c[h + 4 >> 2] = 0;
 c[h + 8 >> 2] = 0;
 c[h + 12 >> 2] = 0;
 b[h + 16 >> 1] = 0;
 h = a + 4 | 0;
 f = c[h + 4 >> 2] | 0;
 c[e >> 2] = c[h >> 2];
 c[e + 4 >> 2] = f;
 e = d + 12 | 0;
 a = a + 12 | 0;
 c[e >> 2] = c[a >> 2];
 c[e + 4 >> 2] = c[a + 4 >> 2];
 c[e + 8 >> 2] = c[a + 8 >> 2];
 c[e + 12 >> 2] = c[a + 12 >> 2];
 c[e + 16 >> 2] = c[a + 16 >> 2];
 c[e + 20 >> 2] = c[a + 20 >> 2];
 c[e + 24 >> 2] = c[a + 24 >> 2];
 c[e + 28 >> 2] = c[a + 28 >> 2];
 b[e + 32 >> 1] = b[a + 32 >> 1] | 0;
 return d | 0;
}

function zd(b, d) {
 b = b | 0;
 d = d | 0;
 var e = 0, f = 0, g = 0, h = 0, i = 0;
 i = b + 102796 | 0;
 f = c[i >> 2] | 0;
 if ((f | 0) >= 32) va(5517, 5447, 38, 5551);
 e = b + 102412 + (f * 12 | 0) | 0;
 c[b + 102412 + (f * 12 | 0) + 4 >> 2] = d;
 g = b + 102400 | 0;
 h = c[g >> 2] | 0;
 if ((h + d | 0) > 102400) {
  c[e >> 2] = Lb(d) | 0;
  a[b + 102412 + (f * 12 | 0) + 8 >> 0] = 1;
 } else {
  c[e >> 2] = b + h;
  a[b + 102412 + (f * 12 | 0) + 8 >> 0] = 0;
  c[g >> 2] = (c[g >> 2] | 0) + d;
 }
 h = b + 102404 | 0;
 d = (c[h >> 2] | 0) + d | 0;
 c[h >> 2] = d;
 b = b + 102408 | 0;
 h = c[b >> 2] | 0;
 c[b >> 2] = (h | 0) > (d | 0) ? h : d;
 c[i >> 2] = (c[i >> 2] | 0) + 1;
 return c[e >> 2] | 0;
}

function Ae(b, d) {
 b = b | 0;
 d = d | 0;
 var e = 0, f = 0, g = 0;
 if ((c[d + 76 >> 2] | 0) < 0) g = 3; else if (!(ye(d) | 0)) g = 3; else {
  if ((a[d + 75 >> 0] | 0) == (b | 0)) g = 10; else {
   e = d + 20 | 0;
   f = c[e >> 2] | 0;
   if (f >>> 0 < (c[d + 16 >> 2] | 0) >>> 0) {
    c[e >> 2] = f + 1;
    a[f >> 0] = b;
    e = b & 255;
   } else g = 10;
  }
  if ((g | 0) == 10) e = Be(d, b) | 0;
  he(d);
 }
 do if ((g | 0) == 3) {
  if ((a[d + 75 >> 0] | 0) != (b | 0)) {
   f = d + 20 | 0;
   e = c[f >> 2] | 0;
   if (e >>> 0 < (c[d + 16 >> 2] | 0) >>> 0) {
    c[f >> 2] = e + 1;
    a[e >> 0] = b;
    e = b & 255;
    break;
   }
  }
  e = Be(d, b) | 0;
 } while (0);
 return e | 0;
}

function af(b, d, e, f, g) {
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 g = g | 0;
 a[d + 53 >> 0] = 1;
 do if ((c[d + 4 >> 2] | 0) == (f | 0)) {
  a[d + 52 >> 0] = 1;
  f = d + 16 | 0;
  b = c[f >> 2] | 0;
  if (!b) {
   c[f >> 2] = e;
   c[d + 24 >> 2] = g;
   c[d + 36 >> 2] = 1;
   if (!((g | 0) == 1 ? (c[d + 48 >> 2] | 0) == 1 : 0)) break;
   a[d + 54 >> 0] = 1;
   break;
  }
  if ((b | 0) != (e | 0)) {
   g = d + 36 | 0;
   c[g >> 2] = (c[g >> 2] | 0) + 1;
   a[d + 54 >> 0] = 1;
   break;
  }
  b = d + 24 | 0;
  f = c[b >> 2] | 0;
  if ((f | 0) == 2) {
   c[b >> 2] = g;
   f = g;
  }
  if ((f | 0) == 1 ? (c[d + 48 >> 2] | 0) == 1 : 0) a[d + 54 >> 0] = 1;
 } while (0);
 return;
}

function ld(a) {
 a = a | 0;
 var b = 0, d = 0, e = 0, f = 0, g = 0;
 c[a >> 2] = -1;
 f = a + 12 | 0;
 c[f >> 2] = 16;
 c[a + 8 >> 2] = 0;
 e = Lb(576) | 0;
 g = a + 4 | 0;
 c[g >> 2] = e;
 vf(e | 0, 0, (c[f >> 2] | 0) * 36 | 0) | 0;
 e = c[f >> 2] | 0;
 b = e + -1 | 0;
 if ((e | 0) > 1) {
  d = c[g >> 2] | 0;
  e = 0;
  do {
   b = e;
   e = e + 1 | 0;
   c[d + (b * 36 | 0) + 20 >> 2] = e;
   c[d + (b * 36 | 0) + 32 >> 2] = -1;
   b = (c[f >> 2] | 0) + -1 | 0;
  } while ((e | 0) < (b | 0));
 }
 g = c[g >> 2] | 0;
 c[g + (b * 36 | 0) + 20 >> 2] = -1;
 c[g + (((c[f >> 2] | 0) + -1 | 0) * 36 | 0) + 32 >> 2] = -1;
 c[a + 16 >> 2] = 0;
 c[a + 20 >> 2] = 0;
 c[a + 24 >> 2] = 0;
 return;
}

function Qb(a, d) {
 a = a | 0;
 d = d | 0;
 var e = 0, f = 0, h = 0;
 e = a + 88 | 0;
 f = c[e >> 2] | 0;
 if (c[f + 102868 >> 2] & 2 | 0) va(3100, 2868, 153, 3179);
 h = Jb(f, 44) | 0;
 kc(h);
 lc(h, f, a, d);
 if (b[a + 4 >> 1] & 32) mc(h, (c[e >> 2] | 0) + 102872 | 0, a + 12 | 0);
 d = a + 100 | 0;
 c[h + 4 >> 2] = c[d >> 2];
 c[d >> 2] = h;
 d = a + 104 | 0;
 c[d >> 2] = (c[d >> 2] | 0) + 1;
 c[h + 8 >> 2] = a;
 if (!(ba(g[h >> 2]) > ba(0.0))) {
  a = c[e >> 2] | 0;
  a = a + 102868 | 0;
  d = c[a >> 2] | 0;
  d = d | 1;
  c[a >> 2] = d;
  return h | 0;
 }
 Ob(a);
 a = c[e >> 2] | 0;
 a = a + 102868 | 0;
 d = c[a >> 2] | 0;
 d = d | 1;
 c[a >> 2] = d;
 return h | 0;
}

function gf(b, d, e, f, g) {
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 g = g | 0;
 do if ((b | 0) == (c[d + 8 >> 2] | 0)) {
  if ((c[d + 4 >> 2] | 0) == (e | 0)) {
   b = d + 28 | 0;
   if ((c[b >> 2] | 0) != 1) c[b >> 2] = f;
  }
 } else if ((b | 0) == (c[d >> 2] | 0)) {
  if ((c[d + 16 >> 2] | 0) != (e | 0)) {
   b = d + 20 | 0;
   if ((c[b >> 2] | 0) != (e | 0)) {
    c[d + 32 >> 2] = f;
    c[b >> 2] = e;
    f = d + 40 | 0;
    c[f >> 2] = (c[f >> 2] | 0) + 1;
    if ((c[d + 36 >> 2] | 0) == 1) if ((c[d + 24 >> 2] | 0) == 2) a[d + 54 >> 0] = 1;
    c[d + 44 >> 2] = 4;
    break;
   }
  }
  if ((f | 0) == 1) c[d + 32 >> 2] = 1;
 } while (0);
 return;
}

function Pb(a) {
 a = a | 0;
 var b = 0, d = 0, e = 0, f = 0, h = Ta, j = Ta, k = Ta, l = Ta, m = Ta;
 f = i;
 i = i + 16 | 0;
 e = f;
 k = ba(g[a + 52 >> 2]);
 l = ba(Ne(k));
 g[e + 8 >> 2] = l;
 k = ba(Me(k));
 g[e + 12 >> 2] = k;
 m = ba(g[a + 28 >> 2]);
 j = ba(k * m);
 h = ba(g[a + 32 >> 2]);
 j = ba(j - ba(l * h));
 h = ba(ba(m * l) + ba(k * h));
 j = ba(ba(g[a + 36 >> 2]) - j);
 h = ba(ba(g[a + 40 >> 2]) - h);
 g[e >> 2] = j;
 g[e + 4 >> 2] = h;
 d = (c[a + 88 >> 2] | 0) + 102872 | 0;
 b = c[a + 100 >> 2] | 0;
 if (!b) {
  i = f;
  return;
 }
 a = a + 12 | 0;
 do {
  nc(b, d, e, a);
  b = c[b + 4 >> 2] | 0;
 } while ((b | 0) != 0);
 i = f;
 return;
}

function mc(a, b, d) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 var e = 0, f = 0, g = 0, h = 0, i = 0, j = 0, k = 0;
 e = a + 28 | 0;
 if (c[e >> 2] | 0) va(3270, 3288, 124, 3317);
 g = a + 12 | 0;
 h = c[g >> 2] | 0;
 h = Ya[c[(c[h >> 2] | 0) + 12 >> 2] & 7](h) | 0;
 c[e >> 2] = h;
 if ((h | 0) <= 0) return;
 f = a + 24 | 0;
 h = 0;
 do {
  i = c[f >> 2] | 0;
  j = i + (h * 28 | 0) | 0;
  k = c[g >> 2] | 0;
  db[c[(c[k >> 2] | 0) + 24 >> 2] & 15](k, j, d, h);
  c[i + (h * 28 | 0) + 24 >> 2] = Uc(b, j, j) | 0;
  c[i + (h * 28 | 0) + 16 >> 2] = a;
  c[i + (h * 28 | 0) + 20 >> 2] = h;
  h = h + 1 | 0;
 } while ((h | 0) < (c[e >> 2] | 0));
 return;
}

function Hb(b) {
 b = b | 0;
 var d = 0, e = 0, f = 0, g = 0;
 d = b + 8 | 0;
 c[d >> 2] = 128;
 c[b + 4 >> 2] = 0;
 f = Lb(1024) | 0;
 c[b >> 2] = f;
 vf(f | 0, 0, c[d >> 2] << 3 | 0) | 0;
 b = b + 12 | 0;
 d = b + 56 | 0;
 do {
  c[b >> 2] = 0;
  b = b + 4 | 0;
 } while ((b | 0) < (d | 0));
 if (!(a[10921] | 0)) {
  e = 1;
  f = 0;
 } else return;
 while (1) {
  if ((f | 0) >= 14) {
   g = 4;
   break;
  }
  b = (e | 0) > (c[1464 + (f << 2) >> 2] | 0);
  d = f + 1 | 0;
  a[10280 + e >> 0] = b ? d : f;
  e = e + 1 | 0;
  if ((e | 0) >= 641) break; else f = b ? d : f;
 }
 if ((g | 0) == 4) va(2692, 2710, 73, 2744);
 a[10921] = 1;
 return;
}

function Ze(a, b, d) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 var e = 0, f = 0, g = 0, h = 0;
 h = i;
 i = i + 64 | 0;
 g = h;
 if ((a | 0) == (b | 0)) b = 1; else if (!b) b = 0; else {
  b = _e(b, 1304, 1272, 0) | 0;
  if (!b) b = 0; else {
   e = g;
   f = e + 56 | 0;
   do {
    c[e >> 2] = 0;
    e = e + 4 | 0;
   } while ((e | 0) < (f | 0));
   c[g >> 2] = b;
   c[g + 8 >> 2] = a;
   c[g + 12 >> 2] = -1;
   c[g + 48 >> 2] = 1;
   db[c[(c[b >> 2] | 0) + 28 >> 2] & 15](b, g, c[d >> 2] | 0, 1);
   if ((c[g + 24 >> 2] | 0) == 1) {
    c[d >> 2] = c[g + 16 >> 2];
    b = 1;
   } else b = 0;
  }
 }
 i = h;
 return b | 0;
}

function Zd(a) {
 a = a | 0;
 var b = 0, d = 0, e = 0, f = 0, g = 0, h = 0;
 g = c[a + 48 >> 2] | 0;
 if ((g | 0) <= 0) return;
 h = c[a + 40 >> 2] | 0;
 d = c[a + 44 >> 2] | 0;
 e = 0;
 do {
  a = c[d + (c[h + (e * 152 | 0) + 148 >> 2] << 2) >> 2] | 0;
  b = c[h + (e * 152 | 0) + 144 >> 2] | 0;
  if ((b | 0) > 0) {
   f = 0;
   do {
    c[a + 64 + (f * 20 | 0) + 8 >> 2] = c[h + (e * 152 | 0) + (f * 36 | 0) + 16 >> 2];
    c[a + 64 + (f * 20 | 0) + 12 >> 2] = c[h + (e * 152 | 0) + (f * 36 | 0) + 20 >> 2];
    f = f + 1 | 0;
   } while ((f | 0) < (b | 0));
  }
  e = e + 1 | 0;
 } while ((e | 0) < (g | 0));
 return;
}

function te(a, b, d, e, f) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 var g = 0, h = 0, j = 0;
 j = i;
 i = i + 256 | 0;
 h = j;
 do if ((d | 0) > (e | 0) & (f & 73728 | 0) == 0) {
  f = d - e | 0;
  vf(h | 0, b | 0, (f >>> 0 > 256 ? 256 : f) | 0) | 0;
  b = c[a >> 2] | 0;
  g = (b & 32 | 0) == 0;
  if (f >>> 0 > 255) {
   e = d - e | 0;
   do {
    if (g) {
     ne(h, 256, a) | 0;
     b = c[a >> 2] | 0;
    }
    f = f + -256 | 0;
    g = (b & 32 | 0) == 0;
   } while (f >>> 0 > 255);
   if (g) f = e & 255; else break;
  } else if (!g) break;
  ne(h, f, a) | 0;
 } while (0);
 i = j;
 return;
}

function Wc(a, b) {
 a = a | 0;
 b = b | 0;
 var d = 0, e = 0, f = 0, g = 0, h = 0;
 f = a + 56 | 0;
 e = c[f >> 2] | 0;
 if ((e | 0) == (b | 0)) return 1;
 h = a + 52 | 0;
 d = c[h >> 2] | 0;
 g = a + 48 | 0;
 a = a + 44 | 0;
 if ((d | 0) == (c[g >> 2] | 0)) {
  e = c[a >> 2] | 0;
  c[g >> 2] = d << 1;
  d = Lb(d * 24 | 0) | 0;
  c[a >> 2] = d;
  zf(d | 0, e | 0, (c[h >> 2] | 0) * 12 | 0) | 0;
  Mb(e);
  e = c[f >> 2] | 0;
  d = c[h >> 2] | 0;
 }
 g = c[a >> 2] | 0;
 c[g + (d * 12 | 0) >> 2] = (e | 0) > (b | 0) ? b : e;
 c[g + (d * 12 | 0) + 4 >> 2] = (e | 0) < (b | 0) ? b : e;
 c[h >> 2] = d + 1;
 return 1;
}

function Be(b, e) {
 b = b | 0;
 e = e | 0;
 var f = 0, g = 0, h = 0, j = 0, k = 0, l = 0, m = 0;
 m = i;
 i = i + 16 | 0;
 l = m;
 k = e & 255;
 a[l >> 0] = k;
 f = b + 16 | 0;
 g = c[f >> 2] | 0;
 if (!g) if (!(oe(b) | 0)) {
  g = c[f >> 2] | 0;
  h = 4;
 } else f = -1; else h = 4;
 do if ((h | 0) == 4) {
  h = b + 20 | 0;
  j = c[h >> 2] | 0;
  if (j >>> 0 < g >>> 0) {
   f = e & 255;
   if ((f | 0) != (a[b + 75 >> 0] | 0)) {
    c[h >> 2] = j + 1;
    a[j >> 0] = k;
    break;
   }
  }
  if ((Ua[c[b + 36 >> 2] & 7](b, l, 1) | 0) == 1) f = d[l >> 0] | 0; else f = -1;
 } while (0);
 i = m;
 return f | 0;
}

function od(a, b, d) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 var e = 0, f = 0, h = 0, i = Ta, j = Ta;
 e = nd(a) | 0;
 f = a + 4 | 0;
 h = c[f >> 2] | 0;
 i = ba(ba(g[b >> 2]) + ba(-.100000001));
 j = ba(ba(g[b + 4 >> 2]) + ba(-.100000001));
 g[h + (e * 36 | 0) >> 2] = i;
 g[h + (e * 36 | 0) + 4 >> 2] = j;
 h = c[f >> 2] | 0;
 j = ba(ba(g[b + 8 >> 2]) + ba(.100000001));
 i = ba(ba(g[b + 12 >> 2]) + ba(.100000001));
 g[h + (e * 36 | 0) + 8 >> 2] = j;
 g[h + (e * 36 | 0) + 12 >> 2] = i;
 b = c[f >> 2] | 0;
 c[b + (e * 36 | 0) + 16 >> 2] = d;
 c[b + (e * 36 | 0) + 32 >> 2] = 0;
 pd(a, e);
 return e | 0;
}

function Ff(a, b, d, e) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 var f = 0, g = 0, h = 0, j = 0, k = 0, l = 0;
 f = i;
 i = i + 16 | 0;
 j = f | 0;
 h = b >> 31 | ((b | 0) < 0 ? -1 : 0) << 1;
 g = ((b | 0) < 0 ? -1 : 0) >> 31 | ((b | 0) < 0 ? -1 : 0) << 1;
 l = e >> 31 | ((e | 0) < 0 ? -1 : 0) << 1;
 k = ((e | 0) < 0 ? -1 : 0) >> 31 | ((e | 0) < 0 ? -1 : 0) << 1;
 a = uf(h ^ a | 0, g ^ b | 0, h | 0, g | 0) | 0;
 b = C;
 Jf(a, b, uf(l ^ d | 0, k ^ e | 0, l | 0, k | 0) | 0, C, j) | 0;
 e = uf(c[j >> 2] ^ h | 0, c[j + 4 >> 2] ^ g | 0, h | 0, g | 0) | 0;
 d = C;
 i = f;
 return (C = d, e) | 0;
}

function ke(a, b) {
 a = +a;
 b = b | 0;
 var d = 0;
 if ((b | 0) > 1023) {
  a = a * 8988465674311579538646525.0e283;
  d = b + -1023 | 0;
  if ((d | 0) > 1023) {
   d = b + -2046 | 0;
   d = (d | 0) > 1023 ? 1023 : d;
   a = a * 8988465674311579538646525.0e283;
  }
 } else if ((b | 0) < -1022) {
  a = a * 2.2250738585072014e-308;
  d = b + 1022 | 0;
  if ((d | 0) < -1022) {
   d = b + 2044 | 0;
   d = (d | 0) < -1022 ? -1022 : d;
   a = a * 2.2250738585072014e-308;
  }
 } else d = b;
 d = wf(d + 1023 | 0, 0, 52) | 0;
 b = C;
 c[k >> 2] = d;
 c[k + 4 >> 2] = b;
 return +(a * +h[k >> 3]);
}

function Gb(a, b, d) {
 a = a | 0;
 b = ba(b);
 d = ba(d);
 var e = Ta, f = Ta;
 c[a + 148 >> 2] = 4;
 e = ba(-b);
 f = ba(-d);
 g[a + 20 >> 2] = e;
 g[a + 24 >> 2] = f;
 g[a + 28 >> 2] = b;
 g[a + 32 >> 2] = f;
 g[a + 36 >> 2] = b;
 g[a + 40 >> 2] = d;
 g[a + 44 >> 2] = e;
 g[a + 48 >> 2] = d;
 g[a + 84 >> 2] = ba(0.0);
 g[a + 88 >> 2] = ba(-1.0);
 g[a + 92 >> 2] = ba(1.0);
 g[a + 96 >> 2] = ba(0.0);
 g[a + 100 >> 2] = ba(0.0);
 g[a + 104 >> 2] = ba(1.0);
 g[a + 108 >> 2] = ba(-1.0);
 g[a + 112 >> 2] = ba(0.0);
 g[a + 12 >> 2] = ba(0.0);
 g[a + 16 >> 2] = ba(0.0);
 return;
}

function zc(a, b, d, e, f) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 var h = 0, i = Ta, j = Ta;
 c[a >> 2] = 1588;
 c[a + 4 >> 2] = 4;
 c[a + 48 >> 2] = b;
 c[a + 52 >> 2] = e;
 c[a + 56 >> 2] = d;
 c[a + 60 >> 2] = f;
 c[a + 124 >> 2] = 0;
 c[a + 128 >> 2] = 0;
 d = b + 16 | 0;
 f = a + 8 | 0;
 h = f + 40 | 0;
 do {
  c[f >> 2] = 0;
  f = f + 4 | 0;
 } while ((f | 0) < (h | 0));
 j = ba(g[d >> 2]);
 g[a + 136 >> 2] = ba(O(ba(j * ba(g[e + 16 >> 2]))));
 j = ba(g[b + 20 >> 2]);
 i = ba(g[e + 20 >> 2]);
 g[a + 140 >> 2] = j > i ? j : i;
 return;
}

function Ed(a, b, d, e, f, g) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 g = g | 0;
 var h = 0;
 h = a + 40 | 0;
 c[h >> 2] = b;
 c[a + 44 >> 2] = d;
 c[a + 48 >> 2] = e;
 c[a + 28 >> 2] = 0;
 c[a + 36 >> 2] = 0;
 c[a + 32 >> 2] = 0;
 c[a >> 2] = f;
 c[a + 4 >> 2] = g;
 c[a + 8 >> 2] = zd(f, b << 2) | 0;
 c[a + 12 >> 2] = zd(c[a >> 2] | 0, d << 2) | 0;
 c[a + 16 >> 2] = zd(c[a >> 2] | 0, e << 2) | 0;
 c[a + 24 >> 2] = zd(c[a >> 2] | 0, (c[h >> 2] | 0) * 12 | 0) | 0;
 c[a + 20 >> 2] = zd(c[a >> 2] | 0, (c[h >> 2] | 0) * 12 | 0) | 0;
 return;
}

function Ad(b, d) {
 b = b | 0;
 d = d | 0;
 var e = 0, f = 0, g = 0;
 g = b + 102796 | 0;
 e = c[g >> 2] | 0;
 if ((e | 0) <= 0) va(5560, 5447, 63, 5577);
 f = b + 102412 + (e * 12 | 0) | 0;
 if ((c[f + -12 >> 2] | 0) != (d | 0)) va(5582, 5447, 65, 5577);
 if (!(a[f + -4 >> 0] | 0)) {
  f = f + -8 | 0;
  d = b + 102400 | 0;
  c[d >> 2] = (c[d >> 2] | 0) - (c[f >> 2] | 0);
 } else {
  Mb(d);
  f = f + -8 | 0;
  e = c[g >> 2] | 0;
 }
 b = b + 102404 | 0;
 c[b >> 2] = (c[b >> 2] | 0) - (c[f >> 2] | 0);
 c[g >> 2] = e + -1;
 return;
}

function Ef(a, b, c, d) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 var e = 0, f = 0, g = 0, h = 0, i = 0, j = 0;
 j = b >> 31 | ((b | 0) < 0 ? -1 : 0) << 1;
 i = ((b | 0) < 0 ? -1 : 0) >> 31 | ((b | 0) < 0 ? -1 : 0) << 1;
 f = d >> 31 | ((d | 0) < 0 ? -1 : 0) << 1;
 e = ((d | 0) < 0 ? -1 : 0) >> 31 | ((d | 0) < 0 ? -1 : 0) << 1;
 h = uf(j ^ a | 0, i ^ b | 0, j | 0, i | 0) | 0;
 g = C;
 a = f ^ j;
 b = e ^ i;
 return uf((Jf(h, g, uf(f ^ c | 0, e ^ d | 0, f | 0, e | 0) | 0, C, 0) | 0) ^ a | 0, C ^ b | 0, a | 0, b | 0) | 0;
}

function zf(b, d, e) {
 b = b | 0;
 d = d | 0;
 e = e | 0;
 var f = 0;
 if ((e | 0) >= 4096) return Ba(b | 0, d | 0, e | 0) | 0;
 f = b | 0;
 if ((b & 3) == (d & 3)) {
  while (b & 3) {
   if (!e) return f | 0;
   a[b >> 0] = a[d >> 0] | 0;
   b = b + 1 | 0;
   d = d + 1 | 0;
   e = e - 1 | 0;
  }
  while ((e | 0) >= 4) {
   c[b >> 2] = c[d >> 2];
   b = b + 4 | 0;
   d = d + 4 | 0;
   e = e - 4 | 0;
  }
 }
 while ((e | 0) > 0) {
  a[b >> 0] = a[d >> 0] | 0;
  b = b + 1 | 0;
  d = d + 1 | 0;
  e = e - 1 | 0;
 }
 return f | 0;
}

function xe(a, b) {
 a = +a;
 b = b | 0;
 var d = 0, e = 0, f = 0;
 h[k >> 3] = a;
 d = c[k >> 2] | 0;
 e = c[k + 4 >> 2] | 0;
 f = yf(d | 0, e | 0, 52) | 0;
 f = f & 2047;
 switch (f | 0) {
 case 0:
  {
   if (a != 0.0) {
    a = +xe(a * 18446744073709551616.0, b);
    d = (c[b >> 2] | 0) + -64 | 0;
   } else d = 0;
   c[b >> 2] = d;
   break;
  }
 case 2047:
  break;
 default:
  {
   c[b >> 2] = f + -1022;
   c[k >> 2] = d;
   c[k + 4 >> 2] = e & -2146435073 | 1071644672;
   a = +h[k >> 3];
  }
 }
 return +a;
}

function qe(b, c, d) {
 b = b | 0;
 c = c | 0;
 d = d | 0;
 var e = 0;
 if (c >>> 0 > 0 | (c | 0) == 0 & b >>> 0 > 4294967295) while (1) {
  e = If(b | 0, c | 0, 10, 0) | 0;
  d = d + -1 | 0;
  a[d >> 0] = e | 48;
  e = Hf(b | 0, c | 0, 10, 0) | 0;
  if (c >>> 0 > 9 | (c | 0) == 9 & b >>> 0 > 4294967295) {
   b = e;
   c = C;
  } else {
   b = e;
   break;
  }
 }
 if (b) while (1) {
  d = d + -1 | 0;
  a[d >> 0] = (b >>> 0) % 10 | 0 | 48;
  if (b >>> 0 < 10) break; else b = (b >>> 0) / 10 | 0;
 }
 return d | 0;
}

function ze(b) {
 b = b | 0;
 var d = 0, e = 0, f = 0;
 f = b;
 a : do if (!(f & 3)) e = 4; else {
  d = b;
  b = f;
  while (1) {
   if (!(a[d >> 0] | 0)) break a;
   d = d + 1 | 0;
   b = d;
   if (!(b & 3)) {
    b = d;
    e = 4;
    break;
   }
  }
 } while (0);
 if ((e | 0) == 4) {
  while (1) {
   d = c[b >> 2] | 0;
   if (!((d & -2139062144 ^ -2139062144) & d + -16843009)) b = b + 4 | 0; else break;
  }
  if ((d & 255) << 24 >> 24) do b = b + 1 | 0; while ((a[b >> 0] | 0) != 0);
 }
 return b - f | 0;
}

function Uc(a, b, d) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 var e = 0, f = 0, g = 0;
 e = od(a, b, d) | 0;
 f = a + 28 | 0;
 c[f >> 2] = (c[f >> 2] | 0) + 1;
 f = a + 40 | 0;
 b = c[f >> 2] | 0;
 d = a + 36 | 0;
 a = a + 32 | 0;
 if ((b | 0) == (c[d >> 2] | 0)) {
  g = c[a >> 2] | 0;
  c[d >> 2] = b << 1;
  b = Lb(b << 3) | 0;
  c[a >> 2] = b;
  zf(b | 0, g | 0, c[f >> 2] << 2 | 0) | 0;
  Mb(g);
  b = c[f >> 2] | 0;
 }
 c[(c[a >> 2] | 0) + (b << 2) >> 2] = e;
 c[f >> 2] = (c[f >> 2] | 0) + 1;
 return e | 0;
}

function re(b) {
 b = b | 0;
 var c = 0, e = 0;
 c = 0;
 while (1) {
  if ((d[6965 + c >> 0] | 0) == (b | 0)) {
   e = 2;
   break;
  }
  c = c + 1 | 0;
  if ((c | 0) == 87) {
   c = 87;
   b = 7053;
   e = 5;
   break;
  }
 }
 if ((e | 0) == 2) if (!c) b = 7053; else {
  b = 7053;
  e = 5;
 }
 if ((e | 0) == 5) while (1) {
  e = b;
  while (1) {
   b = e + 1 | 0;
   if (!(a[e >> 0] | 0)) break; else e = b;
  }
  c = c + -1 | 0;
  if (!c) break; else e = 5;
 }
 return b | 0;
}

function vf(b, d, e) {
 b = b | 0;
 d = d | 0;
 e = e | 0;
 var f = 0, g = 0, h = 0, i = 0;
 f = b + e | 0;
 if ((e | 0) >= 20) {
  d = d & 255;
  h = b & 3;
  i = d | d << 8 | d << 16 | d << 24;
  g = f & ~3;
  if (h) {
   h = b + 4 - h | 0;
   while ((b | 0) < (h | 0)) {
    a[b >> 0] = d;
    b = b + 1 | 0;
   }
  }
  while ((b | 0) < (g | 0)) {
   c[b >> 2] = i;
   b = b + 4 | 0;
  }
 }
 while ((b | 0) < (f | 0)) {
  a[b >> 0] = d;
  b = b + 1 | 0;
 }
 return b - e | 0;
}

function Vc(a, b, d, e) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 var f = 0, g = 0;
 if (!(sd(a, b, d, e) | 0)) return;
 f = a + 40 | 0;
 d = c[f >> 2] | 0;
 e = a + 36 | 0;
 a = a + 32 | 0;
 if ((d | 0) == (c[e >> 2] | 0)) {
  g = c[a >> 2] | 0;
  c[e >> 2] = d << 1;
  d = Lb(d << 3) | 0;
  c[a >> 2] = d;
  zf(d | 0, g | 0, c[f >> 2] << 2 | 0) | 0;
  Mb(g);
  d = c[f >> 2] | 0;
 }
 c[(c[a >> 2] | 0) + (d << 2) >> 2] = b;
 c[f >> 2] = (c[f >> 2] | 0) + 1;
 return;
}

function Md(a, d, e, f) {
 a = a | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 var h = 0, j = 0, k = 0, l = 0;
 h = i;
 i = i + 48 | 0;
 j = h;
 k = c[(c[a + 48 >> 2] | 0) + 12 >> 2] | 0;
 c[j >> 2] = 1392;
 c[j + 4 >> 2] = 1;
 g[j + 8 >> 2] = ba(.00999999977);
 l = j + 28 | 0;
 c[l >> 2] = 0;
 c[l + 4 >> 2] = 0;
 c[l + 8 >> 2] = 0;
 c[l + 12 >> 2] = 0;
 b[l + 16 >> 1] = 0;
 be(k, j, c[a + 56 >> 2] | 0);
 ad(d, j, e, c[(c[a + 52 >> 2] | 0) + 12 >> 2] | 0, f);
 i = h;
 return;
}

function Id(a, d, e, f) {
 a = a | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 var h = 0, j = 0, k = 0, l = 0;
 h = i;
 i = i + 48 | 0;
 j = h;
 k = c[(c[a + 48 >> 2] | 0) + 12 >> 2] | 0;
 c[j >> 2] = 1392;
 c[j + 4 >> 2] = 1;
 g[j + 8 >> 2] = ba(.00999999977);
 l = j + 28 | 0;
 c[l >> 2] = 0;
 c[l + 4 >> 2] = 0;
 c[l + 8 >> 2] = 0;
 c[l + 12 >> 2] = 0;
 b[l + 16 >> 1] = 0;
 be(k, j, c[a + 56 >> 2] | 0);
 Zc(d, j, e, c[(c[a + 52 >> 2] | 0) + 12 >> 2] | 0, f);
 i = h;
 return;
}

function Fe(b) {
 b = b | 0;
 var d = 0, e = 0, f = 0;
 e = c[464] | 0;
 if ((c[e + 76 >> 2] | 0) > -1) f = ye(e) | 0; else f = 0;
 do if ((De(b, e) | 0) < 0) b = 1; else {
  if ((a[e + 75 >> 0] | 0) != 10) {
   b = e + 20 | 0;
   d = c[b >> 2] | 0;
   if (d >>> 0 < (c[e + 16 >> 2] | 0) >>> 0) {
    c[b >> 2] = d + 1;
    a[d >> 0] = 10;
    b = 0;
    break;
   }
  }
  b = (Be(e, 10) | 0) < 0;
 } while (0);
 if (f | 0) he(e);
 return b << 31 >> 31 | 0;
}

function Sb(b, d) {
 b = b | 0;
 d = d | 0;
 if ((c[b >> 2] | 0) != 2) if ((c[d >> 2] | 0) != 2) {
  d = 0;
  return d | 0;
 }
 b = c[b + 108 >> 2] | 0;
 if (!b) {
  d = 1;
  return d | 0;
 }
 while (1) {
  if ((c[b >> 2] | 0) == (d | 0)) if (!(a[(c[b + 4 >> 2] | 0) + 61 >> 0] | 0)) {
   b = 0;
   d = 7;
   break;
  }
  b = c[b + 12 >> 2] | 0;
  if (!b) {
   b = 1;
   d = 7;
   break;
  }
 }
 if ((d | 0) == 7) return b | 0;
 return 0;
}

function df(b, d, e, f) {
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 var g = 0;
 b = d + 16 | 0;
 g = c[b >> 2] | 0;
 do if (!g) {
  c[b >> 2] = e;
  c[d + 24 >> 2] = f;
  c[d + 36 >> 2] = 1;
 } else {
  if ((g | 0) != (e | 0)) {
   f = d + 36 | 0;
   c[f >> 2] = (c[f >> 2] | 0) + 1;
   c[d + 24 >> 2] = 2;
   a[d + 54 >> 0] = 1;
   break;
  }
  b = d + 24 | 0;
  if ((c[b >> 2] | 0) == 2) c[b >> 2] = f;
 } while (0);
 return;
}

function Ab(a, b) {
 a = a | 0;
 b = b | 0;
 var d = 0, e = 0, f = 0, h = 0;
 b = Jb(b, 152) | 0;
 c[b >> 2] = 1432;
 e = b + 4 | 0;
 c[e >> 2] = 2;
 g[b + 8 >> 2] = ba(.00999999977);
 c[b + 148 >> 2] = 0;
 d = b + 12 | 0;
 g[d >> 2] = ba(0.0);
 g[b + 16 >> 2] = ba(0.0);
 h = a + 4 | 0;
 f = c[h + 4 >> 2] | 0;
 c[e >> 2] = c[h >> 2];
 c[e + 4 >> 2] = f;
 zf(d | 0, a + 12 | 0, 140) | 0;
 return b | 0;
}

function qc(f, h) {
 f = f | 0;
 h = h | 0;
 var i = 0;
 i = f + 102976 | 0;
 if ((h & 1 | 0) == (d[i >> 0] | 0 | 0)) return;
 a[i >> 0] = h & 1;
 if (h) return;
 i = c[f + 102952 >> 2] | 0;
 if (!i) return;
 do {
  f = i + 4 | 0;
  h = e[f >> 1] | 0;
  if (!(h & 2)) {
   b[f >> 1] = h | 2;
   g[i + 144 >> 2] = ba(0.0);
  }
  i = c[i + 96 >> 2] | 0;
 } while ((i | 0) != 0);
 return;
}

function jf() {
 var a = 0, b = 0, d = 0, e = 0;
 b = i;
 i = i + 16 | 0;
 d = b + 8 | 0;
 a = Pe() | 0;
 if (a | 0) {
  a = c[a >> 2] | 0;
  if (a | 0) {
   e = a + 48 | 0;
   if ((c[e >> 2] & -256 | 0) == 1126902528 ? (c[e + 4 >> 2] | 0) == 1129074247 : 0) {
    _a[c[a + 12 >> 2] & 7]();
    Se(9328, b);
   }
  }
 }
 e = c[563] | 0;
 c[563] = e + 0;
 _a[e & 7]();
 Se(9328, d);
}

function oe(b) {
 b = b | 0;
 var d = 0, e = 0;
 d = b + 74 | 0;
 e = a[d >> 0] | 0;
 a[d >> 0] = e + 255 | e;
 d = c[b >> 2] | 0;
 if (!(d & 8)) {
  c[b + 8 >> 2] = 0;
  c[b + 4 >> 2] = 0;
  d = c[b + 44 >> 2] | 0;
  c[b + 28 >> 2] = d;
  c[b + 20 >> 2] = d;
  c[b + 16 >> 2] = d + (c[b + 48 >> 2] | 0);
  d = 0;
 } else {
  c[b >> 2] = d | 32;
  d = -1;
 }
 return d | 0;
}

function Rc(a, b, d, e, f) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 b = Jb(f, 144) | 0;
 zc(b, a, 0, d, 0);
 c[b >> 2] = 1668;
 if ((c[(c[(c[b + 48 >> 2] | 0) + 12 >> 2] | 0) + 4 >> 2] | 0) != 2) va(4266, 4310, 44, 4355);
 if ((c[(c[(c[b + 52 >> 2] | 0) + 12 >> 2] | 0) + 4 >> 2] | 0) == 2) return b | 0; else va(5933, 4310, 45, 4355);
 return 0;
}

function Od(a, b, d, e, f) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 f = Jb(f, 144) | 0;
 zc(f, a, b, d, e);
 c[f >> 2] = 1708;
 if ((c[(c[(c[f + 48 >> 2] | 0) + 12 >> 2] | 0) + 4 >> 2] | 0) != 3) va(5813, 5855, 43, 5908);
 if ((c[(c[(c[f + 52 >> 2] | 0) + 12 >> 2] | 0) + 4 >> 2] | 0) == 2) return f | 0; else va(5933, 5855, 44, 5908);
 return 0;
}

function Jc(a, b, d, e, f) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 b = Jb(f, 144) | 0;
 zc(b, a, 0, d, 0);
 c[b >> 2] = 1628;
 if ((c[(c[(c[b + 48 >> 2] | 0) + 12 >> 2] | 0) + 4 >> 2] | 0) != 1) va(4022, 4063, 41, 4115);
 if ((c[(c[(c[b + 52 >> 2] | 0) + 12 >> 2] | 0) + 4 >> 2] | 0) == 2) return b | 0; else va(5933, 4063, 42, 4115);
 return 0;
}

function ie(a, b, d) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 var e = 0, f = 0, g = 0;
 f = i;
 i = i + 32 | 0;
 g = f;
 e = f + 20 | 0;
 c[g >> 2] = c[a + 60 >> 2];
 c[g + 4 >> 2] = 0;
 c[g + 8 >> 2] = b;
 c[g + 12 >> 2] = e;
 c[g + 16 >> 2] = d;
 if ((de(Pa(140, g | 0) | 0) | 0) < 0) {
  c[e >> 2] = -1;
  a = -1;
 } else a = c[e >> 2] | 0;
 i = f;
 return a | 0;
}

function Nc(a, b, d, e, f) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 b = Jb(f, 144) | 0;
 zc(b, a, 0, d, 0);
 c[b >> 2] = 1648;
 if ((c[(c[(c[b + 48 >> 2] | 0) + 12 >> 2] | 0) + 4 >> 2] | 0) != 2) va(4266, 4167, 41, 4221);
 if (!(c[(c[(c[b + 52 >> 2] | 0) + 12 >> 2] | 0) + 4 >> 2] | 0)) return b | 0; else va(6098, 4167, 42, 4221);
 return 0;
}

function Kd(a, b, d, e, f) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 f = Jb(f, 144) | 0;
 zc(f, a, b, d, e);
 c[f >> 2] = 1688;
 if ((c[(c[(c[f + 48 >> 2] | 0) + 12 >> 2] | 0) + 4 >> 2] | 0) != 3) va(5813, 5710, 43, 5762);
 if (!(c[(c[(c[f + 52 >> 2] | 0) + 12 >> 2] | 0) + 4 >> 2] | 0)) return f | 0; else va(6098, 5710, 44, 5762);
 return 0;
}

function Fc(a, b, d, e, f) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 b = Jb(f, 144) | 0;
 zc(b, a, 0, d, 0);
 c[b >> 2] = 1608;
 if ((c[(c[(c[b + 48 >> 2] | 0) + 12 >> 2] | 0) + 4 >> 2] | 0) != 1) va(4022, 3922, 41, 3973);
 if (!(c[(c[(c[b + 52 >> 2] | 0) + 12 >> 2] | 0) + 4 >> 2] | 0)) return b | 0; else va(6098, 3922, 42, 3973);
 return 0;
}

function wc(a, c, d) {
 a = a | 0;
 c = c | 0;
 d = d | 0;
 a = b[c + 36 >> 1] | 0;
 if (!(a << 16 >> 16 == 0 ? 1 : a << 16 >> 16 != (b[d + 36 >> 1] | 0))) {
  d = a << 16 >> 16 > 0;
  return d | 0;
 }
 if (!((b[d + 32 >> 1] & b[c + 34 >> 1]) << 16 >> 16)) {
  d = 0;
  return d | 0;
 }
 d = (b[d + 34 >> 1] & b[c + 32 >> 1]) << 16 >> 16 != 0;
 return d | 0;
}

function pc(a, b) {
 a = a | 0;
 b = b | 0;
 var d = 0, e = 0;
 if (c[a + 102868 >> 2] & 2 | 0) va(3331, 3351, 109, 3378);
 e = Jb(a, 152) | 0;
 Nb(e, b, a);
 c[e + 92 >> 2] = 0;
 b = a + 102952 | 0;
 d = c[b >> 2] | 0;
 c[e + 96 >> 2] = d;
 if (d | 0) c[d + 92 >> 2] = e;
 c[b >> 2] = e;
 a = a + 102960 | 0;
 c[a >> 2] = (c[a >> 2] | 0) + 1;
 return e | 0;
}

function Sd(a, b, d, e, f) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 b = Jb(f, 144) | 0;
 zc(b, a, 0, d, 0);
 c[b >> 2] = 1728;
 if (c[(c[(c[b + 48 >> 2] | 0) + 12 >> 2] | 0) + 4 >> 2] | 0) va(5995, 6038, 44, 6082);
 if (!(c[(c[(c[b + 52 >> 2] | 0) + 12 >> 2] | 0) + 4 >> 2] | 0)) return b | 0; else va(6098, 6038, 45, 6082);
 return 0;
}

function Rb(d, e, f) {
 d = d | 0;
 e = e | 0;
 f = ba(f);
 var h = 0, j = 0;
 h = i;
 i = i + 32 | 0;
 j = h;
 b[j + 22 >> 1] = 1;
 b[j + 24 >> 1] = -1;
 b[j + 26 >> 1] = 0;
 c[j + 4 >> 2] = 0;
 g[j + 8 >> 2] = ba(.200000003);
 g[j + 12 >> 2] = ba(0.0);
 a[j + 20 >> 0] = 0;
 c[j >> 2] = e;
 g[j + 16 >> 2] = f;
 d = Qb(d, j) | 0;
 i = h;
 return d | 0;
}

function of(a) {
 a = a | 0;
 var b = 0;
 b = (a | 0) == 0 ? 1 : a;
 while (1) {
  a = Ke(b) | 0;
  if (a | 0) {
   b = 6;
   break;
  }
  a = pf() | 0;
  if (!a) {
   b = 5;
   break;
  }
  _a[a & 7]();
 }
 if ((b | 0) == 5) {
  b = wa(4) | 0;
  c[b >> 2] = 2344;
  La(b | 0, 1328, 22);
 } else if ((b | 0) == 6) return a | 0;
 return 0;
}

function je(b, d, e) {
 b = b | 0;
 d = d | 0;
 e = e | 0;
 var f = 0, g = 0;
 g = i;
 i = i + 80 | 0;
 f = g;
 c[b + 36 >> 2] = 4;
 if (!(c[b >> 2] & 64)) {
  c[f >> 2] = c[b + 60 >> 2];
  c[f + 4 >> 2] = 21505;
  c[f + 8 >> 2] = g + 12;
  if (Ia(54, f | 0) | 0) a[b + 75 >> 0] = -1;
 }
 f = fe(b, d, e) | 0;
 i = g;
 return f | 0;
}

function Kb(b, d, e) {
 b = b | 0;
 d = d | 0;
 e = e | 0;
 if (!e) return;
 if ((e | 0) <= 0) va(2761, 2710, 164, 5577);
 if ((e | 0) > 640) {
  Mb(d);
  return;
 }
 e = a[10280 + e >> 0] | 0;
 if ((e & 255) >= 14) va(2770, 2710, 173, 5577);
 b = b + 12 + ((e & 255) << 2) | 0;
 c[d >> 2] = c[b >> 2];
 c[b >> 2] = d;
 return;
}

function Df(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0, e = 0, f = 0;
 f = a & 65535;
 e = b & 65535;
 c = _(e, f) | 0;
 d = a >>> 16;
 a = (c >>> 16) + (_(e, d) | 0) | 0;
 e = b >>> 16;
 b = _(e, f) | 0;
 return (C = (a >>> 16) + (_(e, d) | 0) + (((a & 65535) + b | 0) >>> 16) | 0, a + b << 16 | c & 65535 | 0) | 0;
}

function yb(b, d, e) {
 b = b | 0;
 d = d | 0;
 e = e | 0;
 var f = 0, g = 0;
 g = d;
 d = c[g + 4 >> 2] | 0;
 f = b + 12 | 0;
 c[f >> 2] = c[g >> 2];
 c[f + 4 >> 2] = d;
 f = e;
 d = c[f + 4 >> 2] | 0;
 e = b + 20 | 0;
 c[e >> 2] = c[f >> 2];
 c[e + 4 >> 2] = d;
 a[b + 44 >> 0] = 0;
 a[b + 45 >> 0] = 0;
 return;
}

function xb(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = ba(c);
 var d = Ta;
 g[b >> 2] = ba(0.0);
 d = ba(g[a + 12 >> 2]);
 d = ba(d + ba(g[a + 20 >> 2]));
 c = ba(g[a + 16 >> 2]);
 c = ba(ba(c + ba(g[a + 24 >> 2])) * ba(.5));
 g[b + 4 >> 2] = ba(d * ba(.5));
 g[b + 8 >> 2] = c;
 g[b + 12 >> 2] = ba(0.0);
 return;
}

function Ce(a, b, d, e) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 var f = 0, g = 0;
 f = _(d, b) | 0;
 if ((c[e + 76 >> 2] | 0) > -1) {
  g = (ye(e) | 0) == 0;
  a = ne(a, f, e) | 0;
  if (!g) he(e);
 } else a = ne(a, f, e) | 0;
 if ((a | 0) != (f | 0)) d = (a >>> 0) / (b >>> 0) | 0;
 return d | 0;
}

function Cf(b) {
 b = b | 0;
 var c = 0;
 c = a[m + (b & 255) >> 0] | 0;
 if ((c | 0) < 8) return c | 0;
 c = a[m + (b >> 8 & 255) >> 0] | 0;
 if ((c | 0) < 8) return c + 8 | 0;
 c = a[m + (b >> 16 & 255) >> 0] | 0;
 if ((c | 0) < 8) return c + 16 | 0;
 return (a[m + (b >>> 24) >> 0] | 0) + 24 | 0;
}

function Ib(a) {
 a = a | 0;
 var b = 0, d = 0;
 b = a + 4 | 0;
 if ((c[b >> 2] | 0) <= 0) {
  a = c[a >> 2] | 0;
  Mb(a);
  return;
 }
 d = 0;
 do {
  Mb(c[(c[a >> 2] | 0) + (d << 3) + 4 >> 2] | 0);
  d = d + 1 | 0;
 } while ((d | 0) < (c[b >> 2] | 0));
 a = c[a >> 2] | 0;
 Mb(a);
 return;
}

function kb(b) {
 b = b | 0;
 a[k >> 0] = a[b >> 0];
 a[k + 1 >> 0] = a[b + 1 >> 0];
 a[k + 2 >> 0] = a[b + 2 >> 0];
 a[k + 3 >> 0] = a[b + 3 >> 0];
 a[k + 4 >> 0] = a[b + 4 >> 0];
 a[k + 5 >> 0] = a[b + 5 >> 0];
 a[k + 6 >> 0] = a[b + 6 >> 0];
 a[k + 7 >> 0] = a[b + 7 >> 0];
}

function cc(a, b) {
 a = a | 0;
 b = b | 0;
 var d = 0, e = 0;
 d = c[a >> 2] | 0;
 e = c[b >> 2] | 0;
 if ((d | 0) < (e | 0)) {
  b = 1;
  return b | 0;
 }
 if ((d | 0) != (e | 0)) {
  b = 0;
  return b | 0;
 }
 b = (c[a + 4 >> 2] | 0) < (c[b + 4 >> 2] | 0);
 return b | 0;
}

function $e(a, b, d, e, f, g) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 g = g | 0;
 if ((a | 0) == (c[b + 8 >> 2] | 0)) af(0, b, d, e, f); else {
  a = c[a + 8 >> 2] | 0;
  ab[c[(c[a >> 2] | 0) + 20 >> 2] & 3](a, b, d, e, f, g);
 }
 return;
}

function rf(a, b, d) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 var e = 0, f = 0;
 f = i;
 i = i + 16 | 0;
 e = f;
 c[e >> 2] = c[d >> 2];
 a = Ua[c[(c[a >> 2] | 0) + 16 >> 2] & 7](a, b, e) | 0;
 if (a) c[d >> 2] = c[e >> 2];
 i = f;
 return a & 1 | 0;
}

function kc(a) {
 a = a | 0;
 b[a + 32 >> 1] = 1;
 b[a + 34 >> 1] = -1;
 b[a + 36 >> 1] = 0;
 c[a + 40 >> 2] = 0;
 c[a + 24 >> 2] = 0;
 c[a + 28 >> 2] = 0;
 c[a >> 2] = 0;
 c[a + 4 >> 2] = 0;
 c[a + 8 >> 2] = 0;
 c[a + 12 >> 2] = 0;
 return;
}

function Fd(a) {
 a = a | 0;
 Ad(c[a >> 2] | 0, c[a + 20 >> 2] | 0);
 Ad(c[a >> 2] | 0, c[a + 24 >> 2] | 0);
 Ad(c[a >> 2] | 0, c[a + 16 >> 2] | 0);
 Ad(c[a >> 2] | 0, c[a + 12 >> 2] | 0);
 Ad(c[a >> 2] | 0, c[a + 8 >> 2] | 0);
 return;
}

function cf(a, b, d, e) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 if ((a | 0) == (c[b + 8 >> 2] | 0)) df(0, b, d, e); else {
  a = c[a + 8 >> 2] | 0;
  db[c[(c[a >> 2] | 0) + 28 >> 2] & 15](a, b, d, e);
 }
 return;
}

function Tc(a) {
 a = a | 0;
 ld(a);
 c[a + 28 >> 2] = 0;
 c[a + 48 >> 2] = 16;
 c[a + 52 >> 2] = 0;
 c[a + 44 >> 2] = Lb(192) | 0;
 c[a + 36 >> 2] = 16;
 c[a + 40 >> 2] = 0;
 c[a + 32 >> 2] = Lb(64) | 0;
 return;
}

function If(a, b, d, e) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 var f = 0, g = 0;
 g = i;
 i = i + 16 | 0;
 f = g | 0;
 Jf(a, b, d, e, f) | 0;
 i = g;
 return (C = c[f + 4 >> 2] | 0, c[f >> 2] | 0) | 0;
}

function Ge(a) {
 a = +a;
 var b = 0.0, c = 0.0;
 b = a * a;
 c = b * a;
 return ba(c * (b * b) * (b * 2.718311493989822e-06 + -1.9839334836096632e-04) + (c * (b * .008333329385889463 + -.16666666641626524) + a));
}

function Gf(a, b, c, d) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 var e = 0, f = 0;
 e = a;
 f = c;
 c = Df(e, f) | 0;
 a = C;
 return (C = (_(b, f) | 0) + (_(d, e) | 0) + a | a & 0, c | 0 | 0) | 0;
}

function Bf(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 if ((c | 0) < 32) {
  C = b >> c;
  return a >>> c | (b & (1 << c) - 1) << 32 - c;
 }
 C = (b | 0) < 0 ? -1 : 0;
 return b >> c - 32 | 0;
}

function He(a) {
 a = +a;
 var b = 0.0;
 a = a * a;
 b = a * a;
 return ba(1.0 - a * .499999997251031 + b * .04166662332373906 + a * b * (a * 2.439044879627741e-05 + -.001388676377460993));
}

function wf(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 if ((c | 0) < 32) {
  C = b << c | (a & (1 << c) - 1 << 32 - c) >>> 32 - c;
  return a << c;
 }
 C = a << c - 32;
 return 0;
}

function yf(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 if ((c | 0) < 32) {
  C = b >>> c;
  return a >>> c | (b & (1 << c) - 1) << 32 - c;
 }
 C = 0;
 return b >>> c - 32 | 0;
}

function Qd(a, b, d, e) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 Xc(b, c[(c[a + 48 >> 2] | 0) + 12 >> 2] | 0, d, c[(c[a + 52 >> 2] | 0) + 12 >> 2] | 0, e);
 return;
}

function Pc(a, b, d, e) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 bd(b, c[(c[a + 48 >> 2] | 0) + 12 >> 2] | 0, d, c[(c[a + 52 >> 2] | 0) + 12 >> 2] | 0, e);
 return;
}

function Lc(a, b, d, e) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 Yc(b, c[(c[a + 48 >> 2] | 0) + 12 >> 2] | 0, d, c[(c[a + 52 >> 2] | 0) + 12 >> 2] | 0, e);
 return;
}

function Hc(a, b, d, e) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 ad(b, c[(c[a + 48 >> 2] | 0) + 12 >> 2] | 0, d, c[(c[a + 52 >> 2] | 0) + 12 >> 2] | 0, e);
 return;
}

function Dc(a, b, d, e) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 Zc(b, c[(c[a + 48 >> 2] | 0) + 12 >> 2] | 0, d, c[(c[a + 52 >> 2] | 0) + 12 >> 2] | 0, e);
 return;
}

function tf() {}
function uf(a, b, c, d) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 d = b - d - (c >>> 0 > a >>> 0 | 0) >>> 0;
 return (C = d, a - c >>> 0 | 0) | 0;
}

function Sf(a, b, c, d, e, f, g) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 g = g | 0;
 ab[a & 3](b | 0, c | 0, d | 0, e | 0, f | 0, g | 0);
}

function Pe() {
 var a = 0, b = 0;
 a = i;
 i = i + 16 | 0;
 if (!(Ha(10268, 4) | 0)) {
  b = Ea(c[2568] | 0) | 0;
  i = a;
  return b | 0;
 } else Se(9004, a);
 return 0;
}

function ff(a, b, d, e, f, g) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 g = g | 0;
 if ((a | 0) == (c[b + 8 >> 2] | 0)) af(0, b, d, e, f);
 return;
}

function ad(a, b, c, d, e) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 e = e | 0;
 var f = 0;
 f = i;
 i = i + 256 | 0;
 _c(f, a, b, c, d, e);
 i = f;
 return;
}

function Ee(a, b) {
 a = a | 0;
 b = b | 0;
 var d = 0, e = 0;
 d = i;
 i = i + 16 | 0;
 e = d;
 c[e >> 2] = b;
 b = le(c[464] | 0, a, e) | 0;
 i = d;
 return b | 0;
}

function ce(a) {
 a = a | 0;
 var b = 0, d = 0;
 b = i;
 i = i + 16 | 0;
 d = b;
 c[d >> 2] = c[a + 60 >> 2];
 a = de(Ma(6, d | 0) | 0) | 0;
 i = b;
 return a | 0;
}

function Uf(a, b, c, d, e, f) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 return cb[a & 15](b | 0, c | 0, d | 0, e | 0, f | 0) | 0;
}

function Zb(a) {
 a = a | 0;
 Tc(a);
 c[a + 60 >> 2] = 0;
 c[a + 64 >> 2] = 0;
 c[a + 68 >> 2] = 1520;
 c[a + 72 >> 2] = 1524;
 c[a + 76 >> 2] = 0;
 return;
}

function xf(a, b, c, d) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 c = a + c >>> 0;
 return (C = b + d + (c >>> 0 < a >>> 0 | 0) >>> 0, c | 0) | 0;
}

function yd(a) {
 a = a | 0;
 if (c[a + 102400 >> 2] | 0) va(5434, 5447, 32, 5481);
 if (!(c[a + 102796 >> 2] | 0)) return; else va(5499, 5447, 33, 5481);
}

function Se(a, b) {
 a = a | 0;
 b = b | 0;
 var d = 0;
 d = i;
 i = i + 16 | 0;
 c[d >> 2] = b;
 b = c[435] | 0;
 le(b, a, d) | 0;
 Ae(10, b) | 0;
 ta();
}

function Lf(a, b, c, d, e, f) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 Va[a & 3](b | 0, c | 0, d | 0, e | 0, f | 0);
}

function jb(b) {
 b = b | 0;
 a[k >> 0] = a[b >> 0];
 a[k + 1 >> 0] = a[b + 1 >> 0];
 a[k + 2 >> 0] = a[b + 2 >> 0];
 a[k + 3 >> 0] = a[b + 3 >> 0];
}

function Re(a) {
 a = a | 0;
 var b = 0;
 b = i;
 i = i + 16 | 0;
 Le(a);
 if (!(Ka(c[2568] | 0, 0) | 0)) {
  i = b;
  return;
 } else Se(8901, b);
}

function Vd(a) {
 a = a | 0;
 var b = 0;
 b = a + 32 | 0;
 Ad(c[b >> 2] | 0, c[a + 40 >> 2] | 0);
 Ad(c[b >> 2] | 0, c[a + 36 >> 2] | 0);
 return;
}

function xd(a) {
 a = a | 0;
 c[a + 102400 >> 2] = 0;
 c[a + 102404 >> 2] = 0;
 c[a + 102408 >> 2] = 0;
 c[a + 102796 >> 2] = 0;
 return;
}

function hf(a, b, d, e) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 if ((a | 0) == (c[b + 8 >> 2] | 0)) df(0, b, d, e);
 return;
}

function Vf(a, b, c, d, e) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 e = e | 0;
 db[a & 15](b | 0, c | 0, d | 0, e | 0);
}

function Qe() {
 var a = 0;
 a = i;
 i = i + 16 | 0;
 if (!(sa(10272, 25) | 0)) {
  i = a;
  return;
 } else Se(8954, a);
}

function Kf(a, b, c, d) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 return Ua[a & 7](b | 0, c | 0, d | 0) | 0;
}

function de(a) {
 a = a | 0;
 if (a >>> 0 > 4294963200) {
  c[(ee() | 0) >> 2] = 0 - a;
  a = -1;
 }
 return a | 0;
}

function dg(a, b, c, d, e, f) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 ca(8);
}

function Td(a, b) {
 a = a | 0;
 b = b | 0;
 Wa[c[(c[a >> 2] | 0) + 4 >> 2] & 31](a);
 Kb(b, a, 144);
 return;
}

function Sc(a, b) {
 a = a | 0;
 b = b | 0;
 Wa[c[(c[a >> 2] | 0) + 4 >> 2] & 31](a);
 Kb(b, a, 144);
 return;
}

function Pd(a, b) {
 a = a | 0;
 b = b | 0;
 Wa[c[(c[a >> 2] | 0) + 4 >> 2] & 31](a);
 Kb(b, a, 144);
 return;
}

function Oc(a, b) {
 a = a | 0;
 b = b | 0;
 Wa[c[(c[a >> 2] | 0) + 4 >> 2] & 31](a);
 Kb(b, a, 144);
 return;
}

function Ld(a, b) {
 a = a | 0;
 b = b | 0;
 Wa[c[(c[a >> 2] | 0) + 4 >> 2] & 31](a);
 Kb(b, a, 144);
 return;
}

function Kc(a, b) {
 a = a | 0;
 b = b | 0;
 Wa[c[(c[a >> 2] | 0) + 4 >> 2] & 31](a);
 Kb(b, a, 144);
 return;
}

function Gc(a, b) {
 a = a | 0;
 b = b | 0;
 Wa[c[(c[a >> 2] | 0) + 4 >> 2] & 31](a);
 Kb(b, a, 144);
 return;
}

function fg(a, b, c, d, e) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 e = e | 0;
 ca(10);
 return 0;
}

function Rf(a, b, c, d) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = ba(d);
 $a[a & 3](b | 0, c | 0, ba(d));
}

function Pf(a, b, c, d) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 Za[a & 3](b | 0, c | 0, d | 0);
}

function sf(a) {
 a = a | 0;
 if (!a) a = 0; else a = (_e(a, 1304, 1360, 0) | 0) != 0;
 return a & 1 | 0;
}

function Hf(a, b, c, d) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 return Jf(a, b, c, d, 0) | 0;
}

function ue(a, b) {
 a = a | 0;
 b = b | 0;
 if (!a) a = 0; else a = ve(a, b, 0) | 0;
 return a | 0;
}

function ee() {
 var a = 0;
 if (!0) a = 9768; else a = c[(Af() | 0) + 64 >> 2] | 0;
 return a | 0;
}
function eb(a) {
 a = a | 0;
 var b = 0;
 b = i;
 i = i + a | 0;
 i = i + 15 & -16;
 return b | 0;
}

function Xf(a, b, c, d, e) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 e = e | 0;
 ca(1);
}

function Tf(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 return bb[a & 3](b | 0, c | 0) | 0;
}

function De(a, b) {
 a = a | 0;
 b = b | 0;
 return (Ce(a, ze(a) | 0, 1, b) | 0) + -1 | 0;
}

function Nf(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 Xa[a & 15](b | 0, c | 0);
}

function gg(a, b, c, d) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 ca(11);
}

function pf() {
 var a = 0;
 a = c[2569] | 0;
 c[2569] = a + 0;
 return a | 0;
}

function Wf(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 ca(0);
 return 0;
}

function ib(a, b) {
 a = a | 0;
 b = b | 0;
 if (!n) {
  n = a;
  o = b;
 }
}

function Of(a, b) {
 a = a | 0;
 b = b | 0;
 return Ya[a & 7](b | 0) | 0;
}

function ge(a) {
 a = a | 0;
 if (!(c[a + 68 >> 2] | 0)) he(a);
 return;
}

function ub(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 return 0;
}

function Yb(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 return;
}

function Xb(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 return;
}

function cg(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = ba(c);
 ca(7);
}

function $f(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 ca(5);
}

function Mf(a, b) {
 a = a | 0;
 b = b | 0;
 Wa[a & 31](b | 0);
}

function we(a, b) {
 a = +a;
 b = b | 0;
 return +(+xe(a, b));
}

function eg(a, b) {
 a = a | 0;
 b = b | 0;
 ca(9);
 return 0;
}

function md(a) {
 a = a | 0;
 Mb(c[a + 4 >> 2] | 0);
 return;
}

function hb(a, b) {
 a = a | 0;
 b = b | 0;
 i = a;
 j = b;
}

function Wb(a, b) {
 a = a | 0;
 b = b | 0;
 return;
}

function Vb(a, b) {
 a = a | 0;
 b = b | 0;
 return;
}

function ic(a) {
 a = a | 0;
 Aa(a | 0) | 0;
 jf();
}

function Zf(a, b) {
 a = a | 0;
 b = b | 0;
 ca(3);
}

function ac(a) {
 a = a | 0;
 bc(a, a);
 return;
}

function qf(a) {
 a = a | 0;
 return of(a) | 0;
}

function _f(a) {
 a = a | 0;
 ca(4);
 return 0;
}

function Lb(a) {
 a = a | 0;
 return Ke(a) | 0;
}

function zb(a) {
 a = a | 0;
 We(a);
 return;
}

function vc(a) {
 a = a | 0;
 We(a);
 return;
}

function rb(a) {
 a = a | 0;
 We(a);
 return;
}

function mf(a) {
 a = a | 0;
 We(a);
 return;
}

function ef(a) {
 a = a | 0;
 We(a);
 return;
}

function We(a) {
 a = a | 0;
 Le(a);
 return;
}

function Ve(a) {
 a = a | 0;
 We(a);
 return;
}

function Ub(a) {
 a = a | 0;
 We(a);
 return;
}

function Rd(a) {
 a = a | 0;
 We(a);
 return;
}

function Qc(a) {
 a = a | 0;
 We(a);
 return;
}

function Nd(a) {
 a = a | 0;
 We(a);
 return;
}

function Mc(a) {
 a = a | 0;
 We(a);
 return;
}

function Mb(a) {
 a = a | 0;
 Le(a);
 return;
}

function Jd(a) {
 a = a | 0;
 We(a);
 return;
}

function Ic(a) {
 a = a | 0;
 We(a);
 return;
}

function Ec(a) {
 a = a | 0;
 We(a);
 return;
}

function Dd(a) {
 a = a | 0;
 return ba(0.0);
}

function Bc(a) {
 a = a | 0;
 We(a);
 return;
}

function nf(a) {
 a = a | 0;
 return 9381;
}

function Qf(a) {
 a = a | 0;
 _a[a & 7]();
}

function ye(a) {
 a = a | 0;
 return 0;
}

function tb(a) {
 a = a | 0;
 return 1;
}

function Bb(a) {
 a = a | 0;
 return 1;
}

function uc(a) {
 a = a | 0;
 return;
}

function qb(a) {
 a = a | 0;
 return;
}

function lf(a) {
 a = a | 0;
 return;
}

function kf(a) {
 a = a | 0;
 return;
}

function he(a) {
 a = a | 0;
 return;
}

function Ye(a) {
 a = a | 0;
 return;
}

function Xe(a) {
 a = a | 0;
 return;
}

function Ue(a) {
 a = a | 0;
 return;
}

function Te(a) {
 a = a | 0;
 return;
}

function Tb(a) {
 a = a | 0;
 return;
}

function Cd(a) {
 a = a | 0;
 return;
}

function Bd(a) {
 a = a | 0;
 return;
}

function Ac(a) {
 a = a | 0;
 return;
}

function lb(a) {
 a = a | 0;
 C = a;
}

function gb(a) {
 a = a | 0;
 i = a;
}

function Yf(a) {
 a = a | 0;
 ca(2);
}

function mb() {
 return C | 0;
}

function fb() {
 return i | 0;
}

function Af() {
 return 0;
}

function ag() {
 ca(6);
}

function bg() {
 Qa();
}

// EMSCRIPTEN_END_FUNCS

 var Ua = [ Wf, ub, Cb, wc, fe, ie, je, Ze ];
 var Va = [ Xf, gf, bf, Xf ];
 var Wa = [ Yf, qb, rb, zb, Tb, Ub, uc, vc, Ac, Bc, Ec, Ic, Mc, Qc, Jd, Nd, Rd, Te, ef, Xe, Ye, Ve, kf, mf, ge, Re, Yf, Yf, Yf, Yf, Yf, Yf ];
 var Xa = [ Zf, Vb, Wb, Td, Oc, Sc, Gc, Kc, Ld, Pd, Zf, Zf, Zf, Zf, Zf, Zf ];
 var Ya = [ _f, tb, Bb, ce, nf, _f, _f, _f ];
 var Za = [ $f, Xb, Yb, $f ];
 var _a = [ ag, bg, Oe, pb, Qe, ag, ag, ag ];
 var $a = [ cg, xb, Fb, cg ];
 var ab = [ dg, ff, $e, dg ];
 var bb = [ eg, sb, Ab, cc ];
 var cb = [ fg, vb, Db, Sd, Nc, Rc, Fc, Jc, Kd, Od, fg, fg, fg, fg, fg, fg ];
 var db = [ gg, wb, Eb, Dc, Hc, Lc, Pc, Id, Md, Qd, hf, cf, gg, gg, gg, gg ];
 return {
  ___cxa_can_catch: rf,
  _free: Le,
  _main: ob,
  ___cxa_is_pointer_type: sf,
  _i64Add: xf,
  _pthread_self: Af,
  _i64Subtract: uf,
  _memset: vf,
  _malloc: Ke,
  _memcpy: zf,
  _bitshift64Lshr: yf,
  ___errno_location: ee,
  _bitshift64Shl: wf,
  runPostSets: tf,
  stackAlloc: eb,
  stackSave: fb,
  stackRestore: gb,
  establishStackSpace: hb,
  setThrew: ib,
  setTempRet0: lb,
  getTempRet0: mb,
  dynCall_iiii: Kf,
  dynCall_viiiii: Lf,
  dynCall_vi: Mf,
  dynCall_vii: Nf,
  dynCall_ii: Of,
  dynCall_viii: Pf,
  dynCall_v: Qf,
  dynCall_viif: Rf,
  dynCall_viiiiii: Sf,
  dynCall_iii: Tf,
  dynCall_iiiiii: Uf,
  dynCall_viiii: Vf
 };
})


;