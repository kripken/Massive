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
 var ba = env.abort;
 var ca = env.assert;
 var da = env.invoke_iiii;
 var ea = env.invoke_viiiii;
 var fa = env.invoke_vi;
 var ga = env.invoke_vii;
 var ha = env.invoke_ii;
 var ia = env.invoke_viii;
 var ja = env.invoke_v;
 var ka = env.invoke_viid;
 var la = env.invoke_viiiiii;
 var ma = env.invoke_iii;
 var na = env.invoke_iiiiii;
 var oa = env.invoke_viiii;
 var pa = env._pthread_cleanup_pop;
 var qa = env._emscripten_run_script;
 var ra = env._pthread_key_create;
 var sa = env._abort;
 var ta = env.___gxx_personality_v0;
 var ua = env.___assert_fail;
 var va = env.___cxa_allocate_exception;
 var wa = env.__ZSt18uncaught_exceptionv;
 var xa = env._emscripten_set_main_loop_timing;
 var ya = env._sbrk;
 var za = env.___cxa_begin_catch;
 var Aa = env._emscripten_memcpy_big;
 var Ba = env.___resumeException;
 var Ca = env.___cxa_find_matching_catch;
 var Da = env._pthread_getspecific;
 var Ea = env._clock;
 var Fa = env._llvm_fabs_f32;
 var Ga = env._pthread_once;
 var Ha = env.___syscall54;
 var Ia = env._emscripten_set_main_loop;
 var Ja = env._pthread_setspecific;
 var Ka = env.___cxa_throw;
 var La = env.___syscall6;
 var Ma = env._pthread_cleanup_push;
 var Na = env._emscripten_cancel_main_loop;
 var Oa = env.___syscall140;
 var Pa = env.___cxa_pure_virtual;
 var Qa = env.___syscall146;
 var Ra = 0.0;
 
// EMSCRIPTEN_START_FUNCS

function Ie(a) {
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
    if (h >>> 0 < (c[2447] | 0) >>> 0) sa();
    a = h + 12 | 0;
    if ((c[a >> 2] | 0) == (f | 0)) {
     c[a >> 2] = d;
     c[e >> 2] = h;
     break;
    } else sa();
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
     if (f >>> 0 < (c[2447] | 0) >>> 0) sa();
     a = f + 12 | 0;
     if ((c[a >> 2] | 0) == (g | 0)) {
      c[a >> 2] = d;
      c[e >> 2] = f;
      l = c[2445] | 0;
      break;
     } else sa();
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
      if (b >>> 0 < (c[2447] | 0) >>> 0) sa(); else {
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
    if (k >>> 0 < g >>> 0) sa();
    j = k + q | 0;
    if (k >>> 0 >= j >>> 0) sa();
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
     if (b >>> 0 < g >>> 0) sa(); else {
      c[b >> 2] = 0;
      o = a;
      break;
     }
    } else {
     f = c[k + 8 >> 2] | 0;
     if (f >>> 0 < g >>> 0) sa();
     a = f + 12 | 0;
     if ((c[a >> 2] | 0) != (k | 0)) sa();
     b = e + 8 | 0;
     if ((c[b >> 2] | 0) == (k | 0)) {
      c[a >> 2] = e;
      c[b >> 2] = f;
      o = e;
      break;
     } else sa();
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
      if (h >>> 0 < (c[2447] | 0) >>> 0) sa();
      a = h + 16 | 0;
      if ((c[a >> 2] | 0) == (k | 0)) c[a >> 2] = o; else c[h + 20 >> 2] = o;
      if (!o) break;
     }
     b = c[2447] | 0;
     if (o >>> 0 < b >>> 0) sa();
     c[o + 24 >> 2] = h;
     a = c[k + 16 >> 2] | 0;
     do if (a | 0) if (a >>> 0 < b >>> 0) sa(); else {
      c[o + 16 >> 2] = a;
      c[a + 24 >> 2] = o;
      break;
     } while (0);
     a = c[k + 20 >> 2] | 0;
     if (a | 0) if (a >>> 0 < (c[2447] | 0) >>> 0) sa(); else {
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
       if (b >>> 0 < (c[2447] | 0) >>> 0) sa(); else {
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
    if (k >>> 0 < f >>> 0) sa();
    j = k + q | 0;
    if (k >>> 0 >= j >>> 0) sa();
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
     if (b >>> 0 < f >>> 0) sa(); else {
      c[b >> 2] = 0;
      t = a;
      break;
     }
    } else {
     e = c[k + 8 >> 2] | 0;
     if (e >>> 0 < f >>> 0) sa();
     a = e + 12 | 0;
     if ((c[a >> 2] | 0) != (k | 0)) sa();
     b = d + 8 | 0;
     if ((c[b >> 2] | 0) == (k | 0)) {
      c[a >> 2] = d;
      c[b >> 2] = e;
      t = d;
      break;
     } else sa();
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
      if (g >>> 0 < (c[2447] | 0) >>> 0) sa();
      a = g + 16 | 0;
      if ((c[a >> 2] | 0) == (k | 0)) c[a >> 2] = t; else c[g + 20 >> 2] = t;
      if (!t) break;
     }
     b = c[2447] | 0;
     if (t >>> 0 < b >>> 0) sa();
     c[t + 24 >> 2] = g;
     a = c[k + 16 >> 2] | 0;
     do if (a | 0) if (a >>> 0 < b >>> 0) sa(); else {
      c[t + 16 >> 2] = a;
      c[a + 24 >> 2] = t;
      break;
     } while (0);
     a = c[k + 20 >> 2] | 0;
     if (a | 0) if (a >>> 0 < (c[2447] | 0) >>> 0) sa(); else {
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
       if (b >>> 0 < (c[2447] | 0) >>> 0) sa(); else {
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
     if ((w | 0) == 145) if (b >>> 0 < (c[2447] | 0) >>> 0) sa(); else {
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
      } else sa();
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
    b = ya(a | 0) | 0;
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
   f = ya(0) | 0;
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
     b = ya(a | 0) | 0;
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
    if (b >>> 0 < 2147483647) if ((ya(b | 0) | 0) == (-1 | 0)) {
     ya(d | 0) | 0;
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
  b = ya(k | 0) | 0;
  a = ya(0) | 0;
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
        if (d >>> 0 < k >>> 0) sa();
        if ((c[d + 12 >> 2] | 0) == (a | 0)) break;
        sa();
       } while (0);
       if ((e | 0) == (d | 0)) {
        c[2443] = c[2443] & ~(1 << f);
        break;
       }
       do if ((e | 0) == (b | 0)) x = e + 8 | 0; else {
        if (e >>> 0 < k >>> 0) sa();
        b = e + 8 | 0;
        if ((c[b >> 2] | 0) == (a | 0)) {
         x = b;
         break;
        }
        sa();
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
        if (d >>> 0 < k >>> 0) sa(); else {
         c[d >> 2] = 0;
         A = b;
         break;
        }
       } else {
        f = c[a + 8 >> 2] | 0;
        if (f >>> 0 < k >>> 0) sa();
        b = f + 12 | 0;
        if ((c[b >> 2] | 0) != (a | 0)) sa();
        d = e + 8 | 0;
        if ((c[d >> 2] | 0) == (a | 0)) {
         c[b >> 2] = e;
         c[d >> 2] = f;
         A = e;
         break;
        } else sa();
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
        if (h >>> 0 < (c[2447] | 0) >>> 0) sa();
        b = h + 16 | 0;
        if ((c[b >> 2] | 0) == (a | 0)) c[b >> 2] = A; else c[h + 20 >> 2] = A;
        if (!A) break e;
       } while (0);
       e = c[2447] | 0;
       if (A >>> 0 < e >>> 0) sa();
       c[A + 24 >> 2] = h;
       b = a + 16 | 0;
       d = c[b >> 2] | 0;
       do if (d | 0) if (d >>> 0 < e >>> 0) sa(); else {
        c[A + 16 >> 2] = d;
        c[d + 24 >> 2] = A;
        break;
       } while (0);
       b = c[b + 4 >> 2] | 0;
       if (!b) break;
       if (b >>> 0 < (c[2447] | 0) >>> 0) sa(); else {
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
       sa();
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
     if ((w | 0) == 276) if (b >>> 0 < (c[2447] | 0) >>> 0) sa(); else {
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
      } else sa();
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
      if (b >>> 0 < (c[2447] | 0) >>> 0) sa(); else {
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
    if ((w | 0) == 302) if (b >>> 0 < (c[2447] | 0) >>> 0) sa(); else {
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
     } else sa();
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
 c[(ce() | 0) >> 2] = 12;
 C = 0;
 i = D;
 return C | 0;
}

function ke(e, f, g, j, l) {
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
   c[(ce() | 0) >> 2] = 75;
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
  if (M) if (!(c[e >> 2] & 32)) le(y, w, e) | 0;
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
   ne(ca, r, g);
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
      o = wf(o | 0, p | 0, 3) | 0;
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
     f = sf(0, 0, f | 0, o | 0) | 0;
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
    o = pe(c[(ce() | 0) >> 2] | 0) | 0;
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
     re(e, 32, K, 0, I);
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
     x = +ue(q, fa) * 2.0;
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
      f = oe(f, ((f | 0) < 0) << 31 >> 31, $) | 0;
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
      re(e, 32, K, r, I);
      if (!(c[e >> 2] & 32)) le(y, w, e) | 0;
      re(e, 48, K, r, I ^ 65536);
      o = f - Y | 0;
      if (!(c[e >> 2] & 32)) le(ea, o, e) | 0;
      f = ba - p | 0;
      re(e, 48, s - (o + f) | 0, 0, 0);
      if (!(c[e >> 2] & 32)) le(t, f, e) | 0;
      re(e, 32, K, r, I ^ 8192);
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
         B = uf(c[r >> 2] | 0, 0, t | 0) | 0;
         B = vf(B | 0, C | 0, o | 0, 0) | 0;
         o = C;
         A = Gf(B | 0, o | 0, 1e9, 0) | 0;
         c[r >> 2] = A;
         o = Ff(B | 0, o | 0, 1e9, 0) | 0;
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
      r = oe(r, ((r | 0) < 0) << 31 >> 31, $) | 0;
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
     re(e, 32, K, w, I);
     if (!(c[e >> 2] & 32)) le(H, G, e) | 0;
     re(e, 48, K, w, I ^ 65536);
     do if (t) {
      r = z >>> 0 > F >>> 0 ? F : z;
      o = r;
      do {
       p = oe(c[o >> 2] | 0, 0, S) | 0;
       do if ((o | 0) == (r | 0)) {
        if ((p | 0) != (S | 0)) break;
        a[U >> 0] = 48;
        p = U;
       } else {
        if (p >>> 0 <= ea >>> 0) break;
        tf(ea | 0, 48, p - Y | 0) | 0;
        do p = p + -1 | 0; while (p >>> 0 > ea >>> 0);
       } while (0);
       if (!(c[e >> 2] & 32)) le(p, T - p | 0, e) | 0;
       o = o + 4 | 0;
      } while (o >>> 0 <= F >>> 0);
      do if (v | 0) {
       if (c[e >> 2] & 32 | 0) break;
       le(8899, 1, e) | 0;
      } while (0);
      if ((f | 0) > 0 & o >>> 0 < D >>> 0) {
       p = o;
       while (1) {
        o = oe(c[p >> 2] | 0, 0, S) | 0;
        if (o >>> 0 > ea >>> 0) {
         tf(ea | 0, 48, o - Y | 0) | 0;
         do o = o + -1 | 0; while (o >>> 0 > ea >>> 0);
        }
        if (!(c[e >> 2] & 32)) le(o, (f | 0) > 9 ? 9 : f, e) | 0;
        p = p + 4 | 0;
        o = f + -9 | 0;
        if (!((f | 0) > 9 & p >>> 0 < D >>> 0)) {
         f = o;
         break;
        } else f = o;
       }
      }
      re(e, 48, f + 9 | 0, 9, 0);
     } else {
      t = y ? D : z + 4 | 0;
      if ((f | 0) > -1) {
       s = (p | 0) == 0;
       r = z;
       do {
        o = oe(c[r >> 2] | 0, 0, S) | 0;
        if ((o | 0) == (S | 0)) {
         a[U >> 0] = 48;
         o = U;
        }
        do if ((r | 0) == (z | 0)) {
         p = o + 1 | 0;
         if (!(c[e >> 2] & 32)) le(o, 1, e) | 0;
         if (s & (f | 0) < 1) {
          o = p;
          break;
         }
         if (c[e >> 2] & 32 | 0) {
          o = p;
          break;
         }
         le(8899, 1, e) | 0;
         o = p;
        } else {
         if (o >>> 0 <= ea >>> 0) break;
         tf(ea | 0, 48, o + Z | 0) | 0;
         do o = o + -1 | 0; while (o >>> 0 > ea >>> 0);
        } while (0);
        p = T - o | 0;
        if (!(c[e >> 2] & 32)) le(o, (f | 0) > (p | 0) ? p : f, e) | 0;
        f = f - p | 0;
        r = r + 4 | 0;
       } while (r >>> 0 < t >>> 0 & (f | 0) > -1);
      }
      re(e, 48, f + 18 | 0, 18, 0);
      if (c[e >> 2] & 32 | 0) break;
      le(u, ba - u | 0, e) | 0;
     } while (0);
     re(e, 32, K, w, I ^ 8192);
     f = (w | 0) < (K | 0) ? K : w;
    } else {
     t = (u & 32 | 0) != 0;
     s = q != q | 0.0 != 0.0;
     o = s ? 0 : G;
     r = o + 3 | 0;
     re(e, 32, K, r, p);
     f = c[e >> 2] | 0;
     if (!(f & 32)) {
      le(H, o, e) | 0;
      f = c[e >> 2] | 0;
     }
     if (!(f & 32)) le(s ? (t ? 8891 : 8895) : t ? 8883 : 8887, 3, e) | 0;
     re(e, 32, K, r, I ^ 8192);
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
     o = wf(o | 0, p | 0, 4) | 0;
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
   f = oe(f, o, N) | 0;
   o = I;
   t = p;
   L = 77;
  } else if ((L | 0) == 82) {
   L = 0;
   I = qe(o, 0, s) | 0;
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
    o = se(ga, r) | 0;
    if ((o | 0) < 0 | o >>> 0 > (s - p | 0) >>> 0) break;
    p = o + p | 0;
    if (s >>> 0 > p >>> 0) t = t + 4 | 0; else break;
   }
   if ((o | 0) < 0) {
    m = -1;
    break a;
   }
   re(e, 32, K, p, I);
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
     o = se(ga, o) | 0;
     r = o + r | 0;
     if ((r | 0) > (p | 0)) {
      f = p;
      L = 97;
      break g;
     }
     if (!(c[e >> 2] & 32)) le(ga, o, e) | 0;
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
   re(e, 32, K, f, I ^ 8192);
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
  re(e, 32, o, s, p);
  if (!(c[e >> 2] & 32)) le(v, w, e) | 0;
  re(e, 48, o, s, p ^ 65536);
  re(e, 48, r, t, 0);
  if (!(c[e >> 2] & 32)) le(f, t, e) | 0;
  re(e, 32, o, s, p ^ 8192);
  y = J;
 }
 h : do if ((L | 0) == 244) if (!e) if (!n) m = 0; else {
  m = 1;
  while (1) {
   n = c[l + (m << 2) >> 2] | 0;
   if (!n) break;
   ne(j + (m << 3) | 0, n, g);
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

function Yc(d, e, f, h, j, l) {
 d = d | 0;
 e = e | 0;
 f = f | 0;
 h = h | 0;
 j = j | 0;
 l = l | 0;
 var m = 0.0, n = 0.0, o = 0.0, p = 0.0, q = 0.0, r = 0.0, s = 0.0, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, z = 0, A = 0, B = 0, C = 0.0, D = 0.0, E = 0.0, F = 0.0, G = 0.0, H = 0.0, I = 0.0, J = 0.0, K = 0, L = 0, M = 0, N = 0, P = 0, Q = 0, R = 0, S = 0, T = 0, U = 0, V = 0, W = 0;
 W = i;
 i = i + 144 | 0;
 v = W + 128 | 0;
 N = W + 24 | 0;
 Q = W + 72 | 0;
 P = W + 48 | 0;
 V = W;
 q = +g[h + 12 >> 2];
 I = +g[l + 8 >> 2];
 F = +g[h + 8 >> 2];
 p = +g[l + 12 >> 2];
 o = q * I - F * p;
 p = I * F + q * p;
 I = +g[l >> 2] - +g[h >> 2];
 G = +g[l + 4 >> 2] - +g[h + 4 >> 2];
 H = q * I + F * G;
 I = q * G - F * I;
 R = d + 132 | 0;
 g[R >> 2] = H;
 S = d + 136 | 0;
 g[S >> 2] = I;
 T = d + 140 | 0;
 g[T >> 2] = o;
 U = d + 144 | 0;
 g[U >> 2] = p;
 F = +g[j + 12 >> 2];
 G = +g[j + 16 >> 2];
 H = H + (p * F - o * G);
 I = F * o + p * G + I;
 g[d + 148 >> 2] = H;
 g[d + 152 >> 2] = I;
 z = f + 28 | 0;
 y = c[z >> 2] | 0;
 z = c[z + 4 >> 2] | 0;
 A = d + 156 | 0;
 c[A >> 2] = y;
 c[A + 4 >> 2] = z;
 A = d + 164 | 0;
 x = f + 12 | 0;
 w = c[x >> 2] | 0;
 x = c[x + 4 >> 2] | 0;
 B = A;
 c[B >> 2] = w;
 c[B + 4 >> 2] = x;
 B = d + 172 | 0;
 u = f + 20 | 0;
 t = c[u >> 2] | 0;
 u = c[u + 4 >> 2] | 0;
 L = B;
 c[L >> 2] = t;
 c[L + 4 >> 2] = u;
 L = f + 36 | 0;
 K = c[L >> 2] | 0;
 L = c[L + 4 >> 2] | 0;
 h = d + 180 | 0;
 c[h >> 2] = K;
 c[h + 4 >> 2] = L;
 h = b[f + 44 >> 1] | 0;
 l = (h & 255) << 24 >> 24 != 0;
 h = (h & 65535) > 255;
 G = (c[k >> 2] = t, +g[k >> 2]);
 p = (c[k >> 2] = w, +g[k >> 2]);
 o = G - p;
 F = (c[k >> 2] = u, +g[k >> 2]);
 u = d + 168 | 0;
 q = (c[k >> 2] = x, +g[k >> 2]);
 m = F - q;
 n = +O(+(o * o + m * m));
 r = (c[k >> 2] = y, +g[k >> 2]);
 s = (c[k >> 2] = z, +g[k >> 2]);
 C = (c[k >> 2] = K, +g[k >> 2]);
 D = (c[k >> 2] = L, +g[k >> 2]);
 if (n < 1.1920928955078125e-07) J = m; else {
  E = 1.0 / n;
  J = m * E;
  o = o * E;
 }
 y = d + 196 | 0;
 E = -o;
 g[y >> 2] = J;
 z = d + 200 | 0;
 g[z >> 2] = E;
 E = (H - p) * J + (I - q) * E;
 if (l) {
  p = p - r;
  n = q - s;
  m = +O(+(p * p + n * n));
  if (m < 1.1920928955078125e-07) m = p; else {
   q = 1.0 / m;
   m = p * q;
   n = n * q;
  }
  q = -m;
  g[d + 188 >> 2] = n;
  g[d + 192 >> 2] = q;
  t = J * m - o * n >= 0.0;
  q = (H - r) * n + (I - s) * q;
 } else {
  t = 0;
  q = 0.0;
 }
 do if (h) {
  p = C - G;
  m = D - F;
  n = +O(+(p * p + m * m));
  if (n < 1.1920928955078125e-07) n = m; else {
   D = 1.0 / n;
   n = m * D;
   p = p * D;
  }
  m = -p;
  g[d + 204 >> 2] = n;
  g[d + 208 >> 2] = m;
  f = o * n - J * p > 0.0;
  m = (H - G) * n + (I - F) * m;
  if (!l) {
   l = E >= 0.0;
   h = m >= 0.0;
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
     g[d + 228 >> 2] = -(c[k >> 2] = x, +g[k >> 2]);
     g[d + 232 >> 2] = o;
     x = d + 204 | 0;
     K = c[x + 4 >> 2] | 0;
     L = d + 236 | 0;
     c[L >> 2] = c[x >> 2];
     c[L + 4 >> 2] = K;
     break;
    } else {
     J = -J;
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
     g[d + 228 >> 2] = -(c[k >> 2] = x, +g[k >> 2]);
     g[d + 232 >> 2] = o;
     L = d + 236 | 0;
     c[L >> 2] = x;
     c[L + 4 >> 2] = K;
     break;
    } else {
     g[h >> 2] = -J;
     g[d + 216 >> 2] = o;
     J = -+g[d + 208 >> 2];
     g[d + 228 >> 2] = -+g[d + 204 >> 2];
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
   L = E >= 0.0 | q >= 0.0 | m >= 0.0;
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
    J = -J;
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
   if (!(q >= 0.0)) {
    L = E >= 0.0 & m >= 0.0;
    a[d + 248 >> 0] = L & 1;
    h = d + 212 | 0;
    if (!L) {
     J = -J;
     g[h >> 2] = J;
     g[d + 216 >> 2] = o;
     g[d + 228 >> 2] = -n;
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
   L = E >= 0.0 & q >= 0.0 & m >= 0.0;
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
    g[h >> 2] = -J;
    g[d + 216 >> 2] = o;
    g[d + 228 >> 2] = -n;
    g[d + 232 >> 2] = p;
    J = -+g[d + 192 >> 2];
    g[d + 236 >> 2] = -+g[d + 188 >> 2];
    g[d + 240 >> 2] = J;
    break;
   }
  }
  if (!(m >= 0.0)) {
   L = E >= 0.0 & q >= 0.0;
   a[d + 248 >> 0] = L & 1;
   h = d + 212 | 0;
   if (!L) {
    J = -J;
    g[h >> 2] = J;
    g[d + 216 >> 2] = o;
    g[d + 228 >> 2] = J;
    g[d + 232 >> 2] = o;
    J = -+g[d + 192 >> 2];
    g[d + 236 >> 2] = -+g[d + 188 >> 2];
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
   L = E >= 0.0;
   a[d + 248 >> 0] = L & 1;
   h = d + 212 | 0;
   if (L) {
    x = y;
    L = c[x >> 2] | 0;
    x = c[x + 4 >> 2] | 0;
    K = h;
    c[K >> 2] = L;
    c[K + 4 >> 2] = x;
    J = -(c[k >> 2] = L, +g[k >> 2]);
    g[d + 228 >> 2] = J;
    g[d + 232 >> 2] = o;
    g[d + 236 >> 2] = J;
    g[d + 240 >> 2] = o;
    break;
   } else {
    g[h >> 2] = -J;
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
  l = q >= 0.0;
  h = E >= 0.0;
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
    g[d + 236 >> 2] = -(c[k >> 2] = L, +g[k >> 2]);
    g[d + 240 >> 2] = o;
    break;
   } else {
    g[h >> 2] = -J;
    g[d + 216 >> 2] = o;
    x = y;
    L = c[x >> 2] | 0;
    x = c[x + 4 >> 2] | 0;
    K = d + 228 | 0;
    c[K >> 2] = L;
    c[K + 4 >> 2] = x;
    g[d + 236 >> 2] = -(c[k >> 2] = L, +g[k >> 2]);
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
    g[d + 236 >> 2] = -(c[k >> 2] = L, +g[k >> 2]);
    g[d + 240 >> 2] = o;
    break;
   } else {
    g[h >> 2] = -J;
    g[d + 216 >> 2] = o;
    x = y;
    K = c[x + 4 >> 2] | 0;
    L = d + 228 | 0;
    c[L >> 2] = c[x >> 2];
    c[L + 4 >> 2] = K;
    J = -+g[d + 192 >> 2];
    g[d + 236 >> 2] = -+g[d + 188 >> 2];
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
   F = +g[U >> 2];
   J = +g[j + 20 + (h << 3) >> 2];
   H = +g[T >> 2];
   G = +g[j + 20 + (h << 3) + 4 >> 2];
   I = J * H + F * G + +g[S >> 2];
   g[d + (h << 3) >> 2] = +g[R >> 2] + (F * J - H * G);
   g[d + (h << 3) + 4 >> 2] = I;
   I = +g[U >> 2];
   G = +g[j + 84 + (h << 3) >> 2];
   H = +g[T >> 2];
   J = +g[j + 84 + (h << 3) + 4 >> 2];
   g[d + 64 + (h << 3) >> 2] = I * G - H * J;
   g[d + 64 + (h << 3) + 4 >> 2] = G * H + I * J;
   h = h + 1 | 0;
  } while ((h | 0) < (c[l >> 2] | 0));
  h = c[t >> 2] | 0;
 }
 K = d + 244 | 0;
 g[K >> 2] = .019999999552965164;
 L = e + 60 | 0;
 c[L >> 2] = 0;
 x = d + 248 | 0;
 if ((h | 0) <= 0) {
  i = W;
  return;
 }
 s = +g[d + 164 >> 2];
 m = +g[u >> 2];
 o = +g[d + 212 >> 2];
 p = +g[d + 216 >> 2];
 r = 3402823466385288598117041.0e14;
 n = 3402823466385288598117041.0e14;
 f = 0;
 while (1) {
  q = o * (+g[d + (f << 3) >> 2] - s) + p * (+g[d + (f << 3) + 4 >> 2] - m);
  l = q < r;
  n = l ? q : n;
  f = f + 1 | 0;
  if ((f | 0) == (h | 0)) break; else r = l ? q : r;
 }
 if (n > .019999999552965164) {
  i = W;
  return;
 }
 Zc(v, d);
 l = c[v >> 2] | 0;
 if (!l) M = 58; else {
  m = +g[v + 8 >> 2];
  if (!(m > +g[K >> 2])) if (m > n * .9800000190734863 + 1.0000000474974513e-03) {
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
    m = (c[k >> 2] = w, +g[k >> 2]);
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
   m = +g[d + 212 >> 2];
   n = +g[d + 216 >> 2];
   h = 0;
   p = m * +g[d + 64 >> 2] + n * +g[d + 68 >> 2];
   f = 1;
   while (1) {
    o = m * +g[d + 64 + (f << 3) >> 2] + n * +g[d + 64 + (f << 3) + 4 >> 2];
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
   m = -+g[y >> 2];
   J = -+g[z >> 2];
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
   m = (c[k >> 2] = v, +g[k >> 2]);
   v = 0;
   x = 1;
   M = 67;
   break;
  }
 } while (0);
 if ((M | 0) == 67) {
  E = (c[k >> 2] = t, +g[k >> 2]);
  F = (c[k >> 2] = f, +g[k >> 2]);
  G = (c[k >> 2] = l, +g[k >> 2]);
  I = (c[k >> 2] = h, +g[k >> 2]);
  N = Q + 32 | 0;
  y = Q + 28 | 0;
  t = Q + 24 | 0;
  J = -m;
  c[N >> 2] = u;
  g[Q + 36 >> 2] = J;
  l = Q + 44 | 0;
  D = (c[k >> 2] = u, +g[k >> 2]);
  H = -D;
  g[l >> 2] = H;
  g[Q + 48 >> 2] = m;
  f = Q + 8 | 0;
  u = Q + 12 | 0;
  J = D * E + F * J;
  g[Q + 40 >> 2] = J;
  h = Q + 52 | 0;
  g[h >> 2] = G * H + m * I;
  if ((dd(P, w, N, J, v) | 0) >= 2) if ((dd(V, P, l, +g[h >> 2], c[Q + 4 >> 2] | 0) | 0) >= 2) {
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
    r = (c[k >> 2] = Q, +g[k >> 2]);
    s = (c[k >> 2] = j, +g[k >> 2]);
    q = +g[u >> 2];
    p = +g[y >> 2];
    m = +g[V >> 2];
    n = +g[V + 4 >> 2];
    o = +g[K >> 2];
    if (!((m - r) * s + (n - q) * p <= o)) h = 0; else {
     J = m - +g[R >> 2];
     I = n - +g[S >> 2];
     H = +g[U >> 2];
     o = +g[T >> 2];
     g[e >> 2] = J * H + I * o;
     g[e + 4 >> 2] = H * I - J * o;
     c[e + 16 >> 2] = c[V + 8 >> 2];
     o = +g[K >> 2];
     h = 1;
    }
    m = +g[V + 12 >> 2];
    n = +g[V + 16 >> 2];
    if ((m - r) * s + (n - q) * p <= o) {
     I = m - +g[R >> 2];
     H = n - +g[S >> 2];
     G = +g[U >> 2];
     J = +g[T >> 2];
     g[e + (h * 20 | 0) >> 2] = I * G + H * J;
     g[e + (h * 20 | 0) + 4 >> 2] = G * H - I * J;
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
    q = +g[f >> 2];
    p = +g[t >> 2];
    o = +g[u >> 2];
    n = +g[y >> 2];
    m = +g[K >> 2];
    if (!((+g[V >> 2] - q) * p + (+g[V + 4 >> 2] - o) * n <= m)) h = 0; else {
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
     m = +g[K >> 2];
     h = 1;
    }
    l = V + 12 | 0;
    if ((+g[l >> 2] - q) * p + (+g[V + 16 >> 2] - o) * n <= m) {
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
 i = W;
 return;
}

function qc(d, f) {
 d = d | 0;
 f = f | 0;
 var h = 0, j = 0, l = 0.0, m = 0, n = 0, o = 0, p = 0.0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0.0, w = 0, x = 0, y = 0, z = 0, A = 0, B = 0, C = 0, D = 0, E = 0, F = 0, G = 0, H = 0, I = 0, J = 0, K = 0, L = 0, M = 0, N = 0, O = 0, P = 0, Q = 0, R = 0, S = 0, T = 0, U = 0, V = 0, W = 0, X = 0, Y = 0, Z = 0, _ = 0, $ = 0, aa = 0, ba = 0, ca = 0, da = 0, ea = 0, fa = 0, ga = 0, ha = 0, ia = 0, ja = 0, ka = 0, la = 0, ma = 0, na = 0, oa = 0, pa = 0, qa = 0, ra = 0, sa = 0, ta = 0, va = 0.0, wa = 0.0, xa = 0.0;
 ta = i;
 i = i + 272 | 0;
 sa = ta + 216 | 0;
 pa = ta + 84 | 0;
 qa = ta + 48 | 0;
 oa = ta + 40 | 0;
 na = ta;
 la = d + 102872 | 0;
 ma = d + 102944 | 0;
 Cd(sa, 64, 32, 0, d + 68 | 0, c[ma >> 2] | 0);
 ra = d + 102995 | 0;
 if (!(a[ra >> 0] | 0)) j = d + 102932 | 0; else {
  h = c[d + 102952 >> 2] | 0;
  if (h | 0) do {
   ka = h + 4 | 0;
   b[ka >> 1] = e[ka >> 1] & 65534;
   g[h + 60 >> 2] = 0.0;
   h = c[h + 96 >> 2] | 0;
  } while ((h | 0) != 0);
  j = d + 102932 | 0;
  h = c[j >> 2] | 0;
  if (h) do {
   ka = h + 4 | 0;
   c[ka >> 2] = c[ka >> 2] & -34;
   c[h + 128 >> 2] = 0;
   g[h + 132 >> 2] = 1.0;
   h = c[h + 12 >> 2] | 0;
  } while ((h | 0) != 0);
 }
 Z = sa + 28 | 0;
 _ = sa + 36 | 0;
 $ = sa + 32 | 0;
 aa = sa + 40 | 0;
 ba = sa + 8 | 0;
 ca = sa + 44 | 0;
 da = sa + 12 | 0;
 ea = oa + 4 | 0;
 fa = na + 4 | 0;
 ga = na + 8 | 0;
 ha = na + 16 | 0;
 ia = f + 12 | 0;
 ja = na + 12 | 0;
 ka = na + 20 | 0;
 N = d + 102994 | 0;
 O = pa + 16 | 0;
 P = pa + 20 | 0;
 Q = pa + 24 | 0;
 R = pa + 44 | 0;
 S = pa + 48 | 0;
 T = pa + 52 | 0;
 U = pa + 28 | 0;
 V = pa + 56 | 0;
 W = pa + 92 | 0;
 X = pa + 128 | 0;
 Y = qa + 4 | 0;
 h = c[j >> 2] | 0;
 a : do if (h | 0) {
  v = 1.0;
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
     l = +g[d >> 2];
     o = r + 28 | 0;
     m = r + 60 | 0;
     p = +g[m >> 2];
     if (l < p) {
      if (!(l < 1.0)) {
       h = 21;
       break b;
      }
      l = (p - l) / (1.0 - l);
      va = 1.0 - l;
      L = q + 36 | 0;
      M = q + 40 | 0;
      wa = va * +g[M >> 2] + l * +g[q + 48 >> 2];
      g[L >> 2] = va * +g[L >> 2] + l * +g[q + 44 >> 2];
      g[M >> 2] = wa;
      M = q + 52 | 0;
      g[M >> 2] = va * +g[M >> 2] + l * +g[q + 56 >> 2];
      g[d >> 2] = p;
      l = p;
     } else if (p < l) {
      if (!(p < 1.0)) {
       h = 25;
       break b;
      }
      wa = (l - p) / (1.0 - p);
      va = 1.0 - wa;
      L = r + 36 | 0;
      M = r + 40 | 0;
      p = va * +g[M >> 2] + wa * +g[r + 48 >> 2];
      g[L >> 2] = va * +g[L >> 2] + wa * +g[r + 44 >> 2];
      g[M >> 2] = p;
      M = r + 52 | 0;
      g[M >> 2] = va * +g[M >> 2] + wa * +g[r + 56 >> 2];
      g[m >> 2] = l;
     }
     if (!(l < 1.0)) {
      h = 28;
      break b;
     }
     K = c[h + 56 >> 2] | 0;
     L = c[h + 60 >> 2] | 0;
     c[O >> 2] = 0;
     c[P >> 2] = 0;
     g[Q >> 2] = 0.0;
     c[R >> 2] = 0;
     c[S >> 2] = 0;
     g[T >> 2] = 0.0;
     fd(pa, c[s + 12 >> 2] | 0, K);
     fd(U, c[t + 12 >> 2] | 0, L);
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
     g[X >> 2] = 1.0;
     rd(qa, pa);
     if ((c[qa >> 2] | 0) == 3) {
      l = l + (1.0 - l) * +g[Y >> 2];
      l = l < 1.0 ? l : 1.0;
     } else l = 1.0;
     g[h + 132 >> 2] = l;
     c[u >> 2] = c[u >> 2] | 32;
    } else l = +g[h + 132 >> 2];
    M = l < v;
    v = M ? l : v;
    w = M ? h : w;
   } while (0);
   h = c[h + 12 >> 2] | 0;
   if (h | 0) continue;
   if (v > .9999988079071045 | (w | 0) == 0) break a;
   d = c[(c[w + 48 >> 2] | 0) + 8 >> 2] | 0;
   M = c[(c[w + 52 >> 2] | 0) + 8 >> 2] | 0;
   I = d + 28 | 0;
   L = pa;
   n = I;
   K = L + 36 | 0;
   do {
    c[L >> 2] = c[n >> 2];
    L = L + 4 | 0;
    n = n + 4 | 0;
   } while ((L | 0) < (K | 0));
   J = M + 28 | 0;
   L = qa;
   n = J;
   K = L + 36 | 0;
   do {
    c[L >> 2] = c[n >> 2];
    L = L + 4 | 0;
    n = n + 4 | 0;
   } while ((L | 0) < (K | 0));
   h = d + 60 | 0;
   l = +g[h >> 2];
   if (!(l < 1.0)) {
    h = 36;
    break;
   }
   va = (v - l) / (1.0 - l);
   xa = 1.0 - va;
   H = d + 36 | 0;
   D = d + 40 | 0;
   F = d + 44 | 0;
   G = d + 48 | 0;
   p = xa * +g[D >> 2] + va * +g[G >> 2];
   g[H >> 2] = xa * +g[H >> 2] + va * +g[F >> 2];
   g[D >> 2] = p;
   D = d + 52 | 0;
   H = d + 56 | 0;
   va = xa * +g[D >> 2] + va * +g[H >> 2];
   g[D >> 2] = va;
   g[h >> 2] = v;
   D = d + 36 | 0;
   E = c[D >> 2] | 0;
   D = c[D + 4 >> 2] | 0;
   z = d + 44 | 0;
   c[z >> 2] = E;
   c[z + 4 >> 2] = D;
   g[H >> 2] = va;
   xa = +Le(va);
   z = d + 20 | 0;
   g[z >> 2] = xa;
   va = +Ke(va);
   A = d + 24 | 0;
   g[A >> 2] = va;
   B = d + 28 | 0;
   p = +g[B >> 2];
   C = d + 32 | 0;
   l = +g[C >> 2];
   wa = (c[k >> 2] = E, +g[k >> 2]) - (va * p - xa * l);
   l = (c[k >> 2] = D, +g[k >> 2]) - (xa * p + va * l);
   D = d + 12 | 0;
   g[D >> 2] = wa;
   E = d + 16 | 0;
   g[E >> 2] = l;
   h = M + 60 | 0;
   l = +g[h >> 2];
   if (!(l < 1.0)) {
    h = 38;
    break;
   }
   va = (v - l) / (1.0 - l);
   l = 1.0 - va;
   y = M + 36 | 0;
   s = M + 40 | 0;
   u = M + 44 | 0;
   x = M + 48 | 0;
   p = l * +g[s >> 2] + va * +g[x >> 2];
   g[y >> 2] = l * +g[y >> 2] + va * +g[u >> 2];
   g[s >> 2] = p;
   s = M + 52 | 0;
   y = M + 56 | 0;
   va = l * +g[s >> 2] + va * +g[y >> 2];
   g[s >> 2] = va;
   g[h >> 2] = v;
   s = M + 36 | 0;
   t = c[s >> 2] | 0;
   s = c[s + 4 >> 2] | 0;
   m = M + 44 | 0;
   c[m >> 2] = t;
   c[m + 4 >> 2] = s;
   g[y >> 2] = va;
   l = +Le(va);
   m = M + 20 | 0;
   g[m >> 2] = l;
   va = +Ke(va);
   o = M + 24 | 0;
   g[o >> 2] = va;
   q = M + 28 | 0;
   p = +g[q >> 2];
   r = M + 32 | 0;
   xa = +g[r >> 2];
   wa = (c[k >> 2] = t, +g[k >> 2]) - (va * p - l * xa);
   xa = (c[k >> 2] = s, +g[k >> 2]) - (l * p + va * xa);
   s = M + 12 | 0;
   g[s >> 2] = wa;
   t = M + 16 | 0;
   g[t >> 2] = xa;
   Ac(w, c[ma >> 2] | 0);
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
     g[d + 144 >> 2] = 0.0;
    }
    m = M + 4 | 0;
    h = e[m >> 1] | 0;
    if (!(h & 2)) {
     b[m >> 1] = h | 2;
     g[M + 144 >> 2] = 0.0;
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
    c[c[ba >> 2] >> 2] = d;
    c[Z >> 2] = 1;
    if ((h | 0) <= 1) {
     h = 49;
     break;
    }
    u = M + 8 | 0;
    c[u >> 2] = 1;
    c[(c[ba >> 2] | 0) + 4 >> 2] = M;
    c[Z >> 2] = 2;
    if ((c[ca >> 2] | 0) <= 0) {
     h = 51;
     break;
    }
    c[_ >> 2] = 1;
    c[c[da >> 2] >> 2] = w;
    b[n >> 1] = e[n >> 1] | 1;
    b[m >> 1] = e[m >> 1] | 1;
    c[K >> 2] = L | 1;
    c[oa >> 2] = d;
    c[ea >> 2] = M;
    h = 0;
    while (1) {
     c : do if ((c[d >> 2] | 0) == 2) {
      m = c[d + 112 >> 2] | 0;
      if (m | 0) {
       t = d + 4 | 0;
       do {
        if ((c[Z >> 2] | 0) == (c[aa >> 2] | 0)) break c;
        if ((c[_ >> 2] | 0) == (c[ca >> 2] | 0)) break c;
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
         L = na;
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
          l = +g[d >> 2];
          if (!(l < 1.0)) {
           h = 67;
           break b;
          }
          va = (v - l) / (1.0 - l);
          l = 1.0 - va;
          K = s + 36 | 0;
          M = s + 40 | 0;
          p = l * +g[M >> 2] + va * +g[s + 48 >> 2];
          g[K >> 2] = l * +g[K >> 2] + va * +g[s + 44 >> 2];
          g[M >> 2] = p;
          M = s + 52 | 0;
          K = s + 56 | 0;
          va = l * +g[M >> 2] + va * +g[K >> 2];
          g[M >> 2] = va;
          g[d >> 2] = v;
          M = s + 36 | 0;
          L = c[M >> 2] | 0;
          M = c[M + 4 >> 2] | 0;
          J = s + 44 | 0;
          c[J >> 2] = L;
          c[J + 4 >> 2] = M;
          g[K >> 2] = va;
          l = +Le(va);
          g[s + 20 >> 2] = l;
          va = +Ke(va);
          g[s + 24 >> 2] = va;
          p = +g[s + 28 >> 2];
          xa = +g[s + 32 >> 2];
          wa = (c[k >> 2] = L, +g[k >> 2]) - (va * p - l * xa);
          xa = (c[k >> 2] = M, +g[k >> 2]) - (l * p + va * xa);
          g[s + 12 >> 2] = wa;
          g[s + 16 >> 2] = xa;
         }
         Ac(r, c[ma >> 2] | 0);
         d = c[o >> 2] | 0;
         do if (!(d & 4)) {
          L = q;
          n = na;
          K = L + 36 | 0;
          do {
           c[L >> 2] = c[n >> 2];
           L = L + 4 | 0;
           n = n + 4 | 0;
          } while ((L | 0) < (K | 0));
          l = +g[s + 56 >> 2];
          va = +Le(l);
          g[s + 20 >> 2] = va;
          l = +Ke(l);
          g[s + 24 >> 2] = l;
          p = +g[s + 28 >> 2];
          wa = +g[s + 32 >> 2];
          xa = +g[s + 48 >> 2] - (va * p + l * wa);
          g[s + 12 >> 2] = +g[s + 44 >> 2] - (l * p - va * wa);
          g[s + 16 >> 2] = xa;
         } else {
          if (!(d & 2)) {
           L = q;
           n = na;
           K = L + 36 | 0;
           do {
            c[L >> 2] = c[n >> 2];
            L = L + 4 | 0;
            n = n + 4 | 0;
           } while ((L | 0) < (K | 0));
           l = +g[s + 56 >> 2];
           va = +Le(l);
           g[s + 20 >> 2] = va;
           l = +Ke(l);
           g[s + 24 >> 2] = l;
           p = +g[s + 28 >> 2];
           wa = +g[s + 32 >> 2];
           xa = +g[s + 48 >> 2] - (va * p + l * wa);
           g[s + 12 >> 2] = +g[s + 44 >> 2] - (l * p - va * wa);
           g[s + 16 >> 2] = xa;
           break;
          }
          c[o >> 2] = d | 1;
          d = c[_ >> 2] | 0;
          if ((d | 0) >= (c[ca >> 2] | 0)) {
           h = 74;
           break b;
          }
          c[_ >> 2] = d + 1;
          c[(c[da >> 2] | 0) + (d << 2) >> 2] = r;
          d = e[n >> 1] | 0;
          if (d & 1 | 0) break;
          b[n >> 1] = d | 1;
          if ((d & 2 | 0) == 0 & (c[s >> 2] | 0) != 0) {
           b[n >> 1] = d | 3;
           g[s + 144 >> 2] = 0.0;
          }
          d = c[Z >> 2] | 0;
          if ((d | 0) >= (c[aa >> 2] | 0)) {
           h = 79;
           break b;
          }
          c[s + 8 >> 2] = d;
          c[(c[ba >> 2] | 0) + (d << 2) >> 2] = s;
          c[Z >> 2] = d + 1;
         } while (0);
        } while (0);
        m = c[m + 12 >> 2] | 0;
       } while ((m | 0) != 0);
      }
     } while (0);
     h = h + 1 | 0;
     if ((h | 0) >= 2) break;
     d = c[oa + (h << 2) >> 2] | 0;
    }
    xa = (1.0 - v) * +g[f >> 2];
    g[na >> 2] = xa;
    g[fa >> 2] = 1.0 / xa;
    g[ga >> 2] = 1.0;
    c[ha >> 2] = 20;
    c[ja >> 2] = c[ia >> 2];
    a[ka >> 0] = 0;
    Fd(sa, na, c[x >> 2] | 0, c[u >> 2] | 0);
    if ((c[Z >> 2] | 0) > 0) {
     d = 0;
     do {
      h = c[(c[ba >> 2] | 0) + (d << 2) >> 2] | 0;
      M = h + 4 | 0;
      b[M >> 1] = e[M >> 1] & 65534;
      do if ((c[h >> 2] | 0) == 2) {
       Nb(h);
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
    _b(la);
    if (a[N >> 0] | 0) {
     h = 90;
     break;
    }
   } else {
    c[K >> 2] = h & -37;
    L = I;
    n = pa;
    K = L + 36 | 0;
    do {
     c[L >> 2] = c[n >> 2];
     L = L + 4 | 0;
     n = n + 4 | 0;
    } while ((L | 0) < (K | 0));
    L = J;
    n = qa;
    K = L + 36 | 0;
    do {
     c[L >> 2] = c[n >> 2];
     L = L + 4 | 0;
     n = n + 4 | 0;
    } while ((L | 0) < (K | 0));
    xa = +g[H >> 2];
    v = +Le(xa);
    g[z >> 2] = v;
    xa = +Ke(xa);
    g[A >> 2] = xa;
    wa = +g[B >> 2];
    va = +g[C >> 2];
    p = +g[G >> 2] - (v * wa + xa * va);
    g[D >> 2] = +g[F >> 2] - (xa * wa - v * va);
    g[E >> 2] = p;
    p = +g[y >> 2];
    va = +Le(p);
    g[m >> 2] = va;
    p = +Ke(p);
    g[o >> 2] = p;
    v = +g[q >> 2];
    wa = +g[r >> 2];
    xa = +g[x >> 2] - (va * v + p * wa);
    g[s >> 2] = +g[u >> 2] - (p * v - va * wa);
    g[t >> 2] = xa;
   }
   h = c[j >> 2] | 0;
   if (!h) break a; else {
    v = 1.0;
    w = 0;
   }
  }
  switch (h | 0) {
  case 16:
   {
    ua(3567, 3351, 641, 5651);
    break;
   }
  case 21:
   {
    ua(3618, 3632, 723, 3656);
    break;
   }
  case 25:
   {
    ua(3618, 3632, 723, 3656);
    break;
   }
  case 28:
   {
    ua(3618, 3351, 676, 5651);
    break;
   }
  case 36:
   {
    ua(3618, 3632, 723, 3656);
    break;
   }
  case 38:
   {
    ua(3618, 3632, 723, 3656);
    break;
   }
  case 47:
   {
    ua(3417, 3446, 54, 3474);
    break;
   }
  case 49:
   {
    ua(3417, 3446, 54, 3474);
    break;
   }
  case 51:
   {
    ua(3478, 3446, 62, 3474);
    break;
   }
  case 67:
   {
    ua(3618, 3632, 723, 3656);
    break;
   }
  case 74:
   {
    ua(3478, 3446, 62, 3474);
    break;
   }
  case 79:
   {
    ua(3417, 3446, 54, 3474);
    break;
   }
  case 90:
   {
    a[ra >> 0] = 0;
    Dd(sa);
    i = ta;
    return;
   }
  }
 } while (0);
 a[ra >> 0] = 1;
 Dd(sa);
 i = ta;
 return;
}

function bc(a, b, d) {
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
    f = cc(a, h, k, e, d) | 0;
    if ($a[c[d >> 2] & 3](n, e) | 0) {
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
     if ($a[c[d >> 2] & 3](e, k) | 0) {
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
      if ($a[c[d >> 2] & 3](k, h) | 0) {
       c[p >> 2] = c[h >> 2];
       c[p + 4 >> 2] = c[h + 4 >> 2];
       c[p + 8 >> 2] = c[h + 8 >> 2];
       c[h >> 2] = c[k >> 2];
       c[h + 4 >> 2] = c[k + 4 >> 2];
       c[h + 8 >> 2] = c[k + 8 >> 2];
       c[k >> 2] = c[p >> 2];
       c[k + 4 >> 2] = c[p + 4 >> 2];
       c[k + 8 >> 2] = c[p + 8 >> 2];
       if ($a[c[d >> 2] & 3](h, a) | 0) {
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
    j = $a[c[d >> 2] & 3](k, a) | 0;
    e = $a[c[d >> 2] & 3](n, k) | 0;
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
     if (!($a[c[d >> 2] & 3](k, a) | 0)) {
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
    if ($a[c[d >> 2] & 3](n, k) | 0) {
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
   do if ($a[c[d >> 2] & 3](a, k) | 0) g = n; else {
    e = n;
    while (1) {
     e = e + -12 | 0;
     if ((a | 0) == (e | 0)) break;
     if ($a[c[d >> 2] & 3](e, k) | 0) {
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
    if (!($a[c[d >> 2] & 3](a, n) | 0)) {
     if ((e | 0) == (n | 0)) {
      o = 69;
      break a;
     }
     while (1) {
      if ($a[c[d >> 2] & 3](a, e) | 0) break;
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
      if ($a[c[d >> 2] & 3](a, g) | 0) break; else g = e;
     }
     do f = f + -12 | 0; while ($a[c[d >> 2] & 3](a, f) | 0);
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
      if ($a[c[d >> 2] & 3](g, k) | 0) g = e; else {
       h = g;
       break;
      }
     }
     g = j;
     do g = g + -12 | 0; while (!($a[c[d >> 2] & 3](g, k) | 0));
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
   if ((e | 0) != (g | 0)) if ($a[c[d >> 2] & 3](g, e) | 0) {
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
    f = ec(a, e, d) | 0;
    g = e + 12 | 0;
    if (ec(g, b, d) | 0) {
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
   bc(a, e, d);
   a = e + 12 | 0;
  }
  if ((o | 0) == 67) {
   o = 0;
   bc(e + 12 | 0, b, d);
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
  if (!($a[c[d >> 2] & 3](e, a) | 0)) {
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
  o = $a[c[d >> 2] & 3](e, a) | 0;
  b = $a[c[d >> 2] & 3](g, e) | 0;
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
   if (!($a[c[d >> 2] & 3](e, a) | 0)) {
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
  if (!($a[c[d >> 2] & 3](g, e) | 0)) {
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
  cc(a, a + 12 | 0, a + 24 | 0, b, d) | 0;
  i = q;
  return;
 } else if ((o | 0) == 15) {
  b = a + 12 | 0;
  e = a + 24 | 0;
  f = a + 36 | 0;
  cc(a, b, e, f, d) | 0;
  if (!($a[c[d >> 2] & 3](h, f) | 0)) {
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
  if (!($a[c[d >> 2] & 3](f, e) | 0)) {
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
  if (!($a[c[d >> 2] & 3](e, b) | 0)) {
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
  if (!($a[c[d >> 2] & 3](b, a) | 0)) {
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
  dc(a, b, d);
  i = q;
  return;
 } else if ((o | 0) == 69) {
  i = q;
  return;
 }
}

function hd(d, e, f) {
 d = d | 0;
 e = e | 0;
 f = f | 0;
 var h = 0.0, j = 0.0, l = 0, m = 0.0, n = 0.0, o = 0.0, p = 0.0, q = 0.0, r = 0.0, s = 0.0, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, z = 0, A = 0, B = 0, C = 0, D = 0.0, E = 0, F = 0, G = 0.0, H = 0.0, I = 0.0, J = 0, K = 0, L = 0.0, M = 0, N = 0, P = 0, Q = 0, R = 0, S = 0, T = 0, U = 0.0, V = 0.0, W = 0.0, X = 0.0, Y = 0, Z = 0.0, _ = 0, $ = 0, aa = 0, ba = 0, ca = 0, da = 0, ea = 0, fa = 0, ga = 0;
 ga = i;
 i = i + 176 | 0;
 l = ga + 152 | 0;
 t = ga + 136 | 0;
 ba = ga;
 M = ga + 124 | 0;
 N = ga + 112 | 0;
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
 id(ba, e, f, l, f + 28 | 0, t);
 P = ba + 108 | 0;
 u = c[P >> 2] | 0;
 switch (u | 0) {
 case 0:
  {
   ua(5401, 4593, 194, 4666);
   break;
  }
 case 3:
 case 2:
 case 1:
  {
   $ = ba + 16 | 0;
   aa = ba + 20 | 0;
   H = +g[l + 12 >> 2];
   I = +g[l + 8 >> 2];
   J = f + 16 | 0;
   K = f + 20 | 0;
   L = +g[l >> 2];
   r = +g[l + 4 >> 2];
   s = +g[t + 12 >> 2];
   D = +g[t + 8 >> 2];
   E = f + 44 | 0;
   F = f + 48 | 0;
   G = +g[t >> 2];
   q = +g[t + 4 >> 2];
   S = ba + 52 | 0;
   T = ba + 56 | 0;
   C = ba + 36 | 0;
   Q = ba + 24 | 0;
   R = ba + 60 | 0;
   l = 0;
   a : while (1) {
    B = (u | 0) > 0;
    if (B) {
     t = 0;
     do {
      c[M + (t << 2) >> 2] = c[ba + (t * 36 | 0) + 28 >> 2];
      c[N + (t << 2) >> 2] = c[ba + (t * 36 | 0) + 32 >> 2];
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
      p = +g[$ >> 2];
      o = +g[aa >> 2];
      h = +g[S >> 2];
      j = +g[T >> 2];
      m = h - p;
      n = j - o;
      o = p * m + o * n;
      if (o >= -0.0) {
       g[Q >> 2] = 1.0;
       c[P >> 2] = 1;
       v = 18;
       break b;
      }
      h = h * m + j * n;
      if (!(h <= 0.0)) {
       p = 1.0 / (h - o);
       g[Q >> 2] = h * p;
       g[R >> 2] = -(o * p);
       c[P >> 2] = 2;
       v = 19;
       break b;
      } else {
       g[R >> 2] = 1.0;
       c[P >> 2] = 1;
       t = ba;
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
      gd(ba);
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
     A = 1;
     h = -+g[$ >> 2];
     j = -+g[aa >> 2];
    } else if ((v | 0) == 19) {
     o = +g[$ >> 2];
     j = +g[S >> 2] - o;
     p = +g[aa >> 2];
     h = +g[T >> 2] - p;
     if (o * h - j * p > 0.0) {
      A = 2;
      h = -h;
      break;
     } else {
      A = 2;
      j = -j;
      break;
     }
    } while (0);
    if (h * h + j * j < 1.4210854715202004e-14) {
     u = A;
     v = 44;
     break;
    }
    o = -h;
    p = -j;
    n = H * o + I * p;
    o = H * p - I * o;
    x = c[J >> 2] | 0;
    y = c[K >> 2] | 0;
    if ((y | 0) > 1) {
     v = 0;
     p = n * +g[x >> 2] + o * +g[x + 4 >> 2];
     w = 1;
     while (1) {
      m = n * +g[x + (w << 3) >> 2] + o * +g[x + (w << 3) + 4 >> 2];
      t = m > p;
      v = t ? w : v;
      w = w + 1 | 0;
      if ((w | 0) == (y | 0)) break; else p = t ? m : p;
     }
     t = ba + (A * 36 | 0) + 28 | 0;
     c[t >> 2] = v;
     if ((v | 0) <= -1) {
      v = 29;
      break;
     }
    } else {
     t = ba + (A * 36 | 0) + 28 | 0;
     c[t >> 2] = 0;
     v = 0;
    }
    if ((y | 0) <= (v | 0)) {
     v = 29;
     break;
    }
    n = +g[x + (v << 3) >> 2];
    p = +g[x + (v << 3) + 4 >> 2];
    o = L + (H * n - I * p);
    p = n * I + H * p + r;
    g[ba + (A * 36 | 0) >> 2] = o;
    g[ba + (A * 36 | 0) + 4 >> 2] = p;
    n = h * s + j * D;
    h = j * s - h * D;
    y = c[E >> 2] | 0;
    z = c[F >> 2] | 0;
    if ((z | 0) > 1) {
     w = 0;
     m = n * +g[y >> 2] + h * +g[y + 4 >> 2];
     x = 1;
     while (1) {
      j = n * +g[y + (x << 3) >> 2] + h * +g[y + (x << 3) + 4 >> 2];
      v = j > m;
      w = v ? x : w;
      x = x + 1 | 0;
      if ((x | 0) == (z | 0)) break; else m = v ? j : m;
     }
     v = ba + (A * 36 | 0) + 32 | 0;
     c[v >> 2] = w;
     if ((w | 0) > -1) {
      x = v;
      v = w;
     } else {
      v = 36;
      break;
     }
    } else {
     x = ba + (A * 36 | 0) + 32 | 0;
     c[x >> 2] = 0;
     v = 0;
    }
    if ((z | 0) <= (v | 0)) {
     v = 36;
     break;
    }
    j = +g[y + (v << 3) >> 2];
    n = +g[y + (v << 3) + 4 >> 2];
    m = G + (s * j - D * n);
    n = j * D + s * n + q;
    g[ba + (A * 36 | 0) + 8 >> 2] = m;
    g[ba + (A * 36 | 0) + 12 >> 2] = n;
    g[ba + (A * 36 | 0) + 16 >> 2] = m - o;
    g[ba + (A * 36 | 0) + 20 >> 2] = n - p;
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
   if ((v | 0) == 13) ua(5401, 4593, 498, 4682); else if ((v | 0) == 15) {
    fa = c[2423] | 0;
    c[2423] = (fa | 0) > (l | 0) ? fa : l;
    v = 48;
   } else if ((v | 0) == 16) ua(5401, 4593, 194, 4666); else if ((v | 0) == 17) ua(5401, 4593, 207, 4666); else if ((v | 0) == 29) ua(5330, 5360, 103, 5391); else if ((v | 0) == 36) ua(5330, 5360, 103, 5391); else if ((v | 0) == 43) {
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
      ua(5401, 4593, 217, 4693);
      break;
     }
    case 1:
     {
      ca = ba;
      ea = c[ca >> 2] | 0;
      ca = c[ca + 4 >> 2] | 0;
      _ = d;
      c[_ >> 2] = ea;
      c[_ + 4 >> 2] = ca;
      _ = ba + 8 | 0;
      da = c[_ >> 2] | 0;
      _ = c[_ + 4 >> 2] | 0;
      fa = t;
      c[fa >> 2] = da;
      c[fa + 4 >> 2] = _;
      V = (c[k >> 2] = ea, +g[k >> 2]);
      U = (c[k >> 2] = da, +g[k >> 2]);
      X = (c[k >> 2] = ca, +g[k >> 2]);
      ca = t;
      da = d + 4 | 0;
      ea = d + 12 | 0;
      fa = d;
      W = (c[k >> 2] = _, +g[k >> 2]);
      _ = 1;
      Y = l;
      break c;
     }
    case 2:
     {
      L = +g[Q >> 2];
      W = +g[R >> 2];
      V = L * +g[ba >> 2] + W * +g[ba + 36 >> 2];
      X = L * +g[ba + 4 >> 2] + W * +g[ba + 40 >> 2];
      g[d >> 2] = V;
      da = d + 4 | 0;
      g[da >> 2] = X;
      U = L * +g[ba + 8 >> 2] + W * +g[ba + 44 >> 2];
      W = L * +g[ba + 12 >> 2] + W * +g[ba + 48 >> 2];
      g[t >> 2] = U;
      ea = d + 12 | 0;
      g[ea >> 2] = W;
      ca = t;
      fa = d;
      _ = 2;
      Y = l;
      break c;
     }
    default:
     ua(5401, 4593, 236, 4693);
    }
   } while (0);
   if ((v | 0) == 48) {
    W = +g[Q >> 2];
    U = +g[R >> 2];
    X = +g[ba + 96 >> 2];
    V = W * +g[ba >> 2] + U * +g[ba + 36 >> 2] + X * +g[ba + 72 >> 2];
    X = W * +g[ba + 4 >> 2] + U * +g[ba + 40 >> 2] + X * +g[ba + 76 >> 2];
    g[d >> 2] = V;
    da = d + 4 | 0;
    g[da >> 2] = X;
    ca = d + 8 | 0;
    g[ca >> 2] = V;
    ea = d + 12 | 0;
    g[ea >> 2] = X;
    fa = d;
    U = V;
    W = X;
    _ = 3;
    Y = l;
   }
   V = V - U;
   X = X - W;
   t = d + 16 | 0;
   g[t >> 2] = +O(+(V * V + X * X));
   c[d + 20 >> 2] = Y;
   switch (_ | 0) {
   case 0:
    {
     ua(5401, 4593, 246, 4656);
     break;
    }
   case 1:
    {
     Z = 0.0;
     break;
    }
   case 2:
    {
     X = +g[$ >> 2] - +g[S >> 2];
     Z = +g[aa >> 2] - +g[T >> 2];
     Z = +O(+(X * X + Z * Z));
     break;
    }
   case 3:
    {
     Z = +g[$ >> 2];
     X = +g[aa >> 2];
     Z = (+g[S >> 2] - Z) * (+g[ba + 92 >> 2] - X) - (+g[T >> 2] - X) * (+g[ba + 88 >> 2] - Z);
     break;
    }
   default:
    {}
   }
   g[e >> 2] = Z;
   b[e + 4 >> 1] = _;
   l = 0;
   do {
    a[e + 6 + l >> 0] = c[ba + (l * 36 | 0) + 28 >> 2];
    a[e + 9 + l >> 0] = c[ba + (l * 36 | 0) + 32 >> 2];
    l = l + 1 | 0;
   } while ((l | 0) < (_ | 0));
   if (!(a[f + 88 >> 0] | 0)) {
    i = ga;
    return;
   }
   s = +g[f + 24 >> 2];
   r = +g[f + 52 >> 2];
   h = +g[t >> 2];
   j = s + r;
   if (!(h > j & h > 1.1920928955078125e-07)) {
    X = (+g[fa >> 2] + +g[ca >> 2]) * .5;
    Z = (+g[da >> 2] + +g[ea >> 2]) * .5;
    g[fa >> 2] = X;
    g[da >> 2] = Z;
    g[ca >> 2] = X;
    g[ea >> 2] = Z;
    g[t >> 2] = 0.0;
    i = ga;
    return;
   }
   g[t >> 2] = h - j;
   n = +g[ca >> 2];
   o = +g[fa >> 2];
   j = n - o;
   p = +g[ea >> 2];
   q = +g[da >> 2];
   h = p - q;
   m = +O(+(j * j + h * h));
   if (!(m < 1.1920928955078125e-07)) {
    Z = 1.0 / m;
    j = j * Z;
    h = h * Z;
   }
   g[fa >> 2] = s * j + o;
   g[da >> 2] = s * h + q;
   g[ca >> 2] = n - r * j;
   g[ea >> 2] = p - r * h;
   i = ga;
   return;
  }
 default:
  ua(5401, 4593, 207, 4666);
 }
}

function Je(a) {
 a = a | 0;
 var b = 0, d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0;
 if (!a) return;
 d = a + -8 | 0;
 h = c[2447] | 0;
 if (d >>> 0 < h >>> 0) sa();
 a = c[a + -4 >> 2] | 0;
 b = a & 3;
 if ((b | 0) == 1) sa();
 e = a & -8;
 m = d + e | 0;
 do if (!(a & 1)) {
  a = c[d >> 2] | 0;
  if (!b) return;
  k = d + (0 - a) | 0;
  j = a + e | 0;
  if (k >>> 0 < h >>> 0) sa();
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
    if (b >>> 0 < h >>> 0) sa();
    if ((c[b + 12 >> 2] | 0) != (k | 0)) sa();
   }
   if ((d | 0) == (b | 0)) {
    c[2443] = c[2443] & ~(1 << e);
    q = k;
    g = j;
    break;
   }
   if ((d | 0) == (a | 0)) f = d + 8 | 0; else {
    if (d >>> 0 < h >>> 0) sa();
    a = d + 8 | 0;
    if ((c[a >> 2] | 0) == (k | 0)) f = a; else sa();
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
   if (b >>> 0 < h >>> 0) sa(); else {
    c[b >> 2] = 0;
    i = a;
    break;
   }
  } else {
   e = c[k + 8 >> 2] | 0;
   if (e >>> 0 < h >>> 0) sa();
   a = e + 12 | 0;
   if ((c[a >> 2] | 0) != (k | 0)) sa();
   b = d + 8 | 0;
   if ((c[b >> 2] | 0) == (k | 0)) {
    c[a >> 2] = d;
    c[b >> 2] = e;
    i = d;
    break;
   } else sa();
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
    if (f >>> 0 < (c[2447] | 0) >>> 0) sa();
    a = f + 16 | 0;
    if ((c[a >> 2] | 0) == (k | 0)) c[a >> 2] = i; else c[f + 20 >> 2] = i;
    if (!i) {
     q = k;
     g = j;
     break;
    }
   }
   d = c[2447] | 0;
   if (i >>> 0 < d >>> 0) sa();
   c[i + 24 >> 2] = f;
   a = k + 16 | 0;
   b = c[a >> 2] | 0;
   do if (b | 0) if (b >>> 0 < d >>> 0) sa(); else {
    c[i + 16 >> 2] = b;
    c[b + 24 >> 2] = i;
    break;
   } while (0);
   a = c[a + 4 >> 2] | 0;
   if (!a) {
    q = k;
    g = j;
   } else if (a >>> 0 < (c[2447] | 0) >>> 0) sa(); else {
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
 if (q >>> 0 >= m >>> 0) sa();
 a = m + 4 | 0;
 b = c[a >> 2] | 0;
 if (!(b & 1)) sa();
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
    if (b >>> 0 < (c[2447] | 0) >>> 0) sa();
    if ((c[b + 12 >> 2] | 0) != (m | 0)) sa();
   }
   if ((d | 0) == (b | 0)) {
    c[2443] = c[2443] & ~(1 << e);
    break;
   }
   if ((d | 0) == (a | 0)) l = d + 8 | 0; else {
    if (d >>> 0 < (c[2447] | 0) >>> 0) sa();
    a = d + 8 | 0;
    if ((c[a >> 2] | 0) == (m | 0)) l = a; else sa();
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
    if (b >>> 0 < (c[2447] | 0) >>> 0) sa(); else {
     c[b >> 2] = 0;
     n = a;
     break;
    }
   } else {
    b = c[m + 8 >> 2] | 0;
    if (b >>> 0 < (c[2447] | 0) >>> 0) sa();
    d = b + 12 | 0;
    if ((c[d >> 2] | 0) != (m | 0)) sa();
    e = a + 8 | 0;
    if ((c[e >> 2] | 0) == (m | 0)) {
     c[d >> 2] = a;
     c[e >> 2] = b;
     n = a;
     break;
    } else sa();
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
     if (f >>> 0 < (c[2447] | 0) >>> 0) sa();
     a = f + 16 | 0;
     if ((c[a >> 2] | 0) == (m | 0)) c[a >> 2] = n; else c[f + 20 >> 2] = n;
     if (!n) break;
    }
    d = c[2447] | 0;
    if (n >>> 0 < d >>> 0) sa();
    c[n + 24 >> 2] = f;
    a = m + 16 | 0;
    b = c[a >> 2] | 0;
    do if (b | 0) if (b >>> 0 < d >>> 0) sa(); else {
     c[n + 16 >> 2] = b;
     c[b + 24 >> 2] = n;
     break;
    } while (0);
    a = c[a + 4 >> 2] | 0;
    if (a | 0) if (a >>> 0 < (c[2447] | 0) >>> 0) sa(); else {
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
   if (b >>> 0 < (c[2447] | 0) >>> 0) sa(); else {
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
  if ((e | 0) == 127) if (b >>> 0 < (c[2447] | 0) >>> 0) sa(); else {
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
   } else sa();
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

function Ed(d, f, h, j, l) {
 d = d | 0;
 f = f | 0;
 h = h | 0;
 j = j | 0;
 l = l | 0;
 var m = 0, n = 0, o = 0.0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0.0, v = 0.0, w = 0, x = 0, y = 0, z = 0.0, A = 0, B = 0, C = 0, D = 0, E = 0, F = 0.0, G = 0, H = 0, I = 0, J = 0, K = 0.0;
 I = i;
 i = i + 160 | 0;
 E = I + 128 | 0;
 D = I + 148 | 0;
 C = I + 96 | 0;
 B = I + 52 | 0;
 H = I;
 F = +g[h >> 2];
 G = d + 28 | 0;
 if ((c[G >> 2] | 0) > 0) {
  t = d + 8 | 0;
  w = j + 4 | 0;
  A = d + 20 | 0;
  x = d + 24 | 0;
  y = 0;
  do {
   p = c[(c[t >> 2] | 0) + (y << 2) >> 2] | 0;
   r = p + 44 | 0;
   q = c[r >> 2] | 0;
   r = c[r + 4 >> 2] | 0;
   s = c[p + 56 >> 2] | 0;
   m = c[p + 64 >> 2] | 0;
   n = c[p + 68 >> 2] | 0;
   o = +g[p + 72 >> 2];
   J = p + 36 | 0;
   c[J >> 2] = q;
   c[J + 4 >> 2] = r;
   c[p + 52 >> 2] = s;
   if ((c[p >> 2] | 0) == 2) {
    v = +g[p + 140 >> 2];
    u = +g[p + 120 >> 2];
    z = (c[k >> 2] = m, +g[k >> 2]) + F * (v * +g[j >> 2] + u * +g[p + 76 >> 2]);
    u = (c[k >> 2] = n, +g[k >> 2]) + F * (v * +g[w >> 2] + u * +g[p + 80 >> 2]);
    v = 1.0 - F * +g[p + 132 >> 2];
    v = v < 1.0 ? v : 1.0;
    v = v < 0.0 ? 0.0 : v;
    m = (g[k >> 2] = z * v, c[k >> 2] | 0);
    z = 1.0 - F * +g[p + 136 >> 2];
    z = z < 1.0 ? z : 1.0;
    n = (g[k >> 2] = u * v, c[k >> 2] | 0);
    o = (o + F * +g[p + 128 >> 2] * +g[p + 84 >> 2]) * (z < 0.0 ? 0.0 : z);
   }
   J = (c[A >> 2] | 0) + (y * 12 | 0) | 0;
   c[J >> 2] = q;
   c[J + 4 >> 2] = r;
   c[(c[A >> 2] | 0) + (y * 12 | 0) + 8 >> 2] = s;
   J = c[x >> 2] | 0;
   c[J + (y * 12 | 0) >> 2] = m;
   c[J + (y * 12 | 0) + 4 >> 2] = n;
   g[(c[x >> 2] | 0) + (y * 12 | 0) + 8 >> 2] = o;
   y = y + 1 | 0;
  } while ((y | 0) < (c[G >> 2] | 0));
 } else {
  x = d + 24 | 0;
  A = d + 20 | 0;
 };
 c[C >> 2] = c[h >> 2];
 c[C + 4 >> 2] = c[h + 4 >> 2];
 c[C + 8 >> 2] = c[h + 8 >> 2];
 c[C + 12 >> 2] = c[h + 12 >> 2];
 c[C + 16 >> 2] = c[h + 16 >> 2];
 c[C + 20 >> 2] = c[h + 20 >> 2];
 w = c[A >> 2] | 0;
 c[C + 24 >> 2] = w;
 J = c[x >> 2] | 0;
 c[C + 28 >> 2] = J;
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
 c[B + 36 >> 2] = J;
 c[B + 40 >> 2] = c[d >> 2];
 Sd(H, B);
 Ud(H);
 if (a[h + 20 >> 0] | 0) Vd(H);
 w = d + 32 | 0;
 if ((c[w >> 2] | 0) > 0) {
  m = d + 16 | 0;
  n = 0;
  do {
   J = c[(c[m >> 2] | 0) + (n << 2) >> 2] | 0;
   Va[c[(c[J >> 2] | 0) + 28 >> 2] & 15](J, C);
   n = n + 1 | 0;
  } while ((n | 0) < (c[w >> 2] | 0));
 }
 g[f + 12 >> 2] = +Bd(D);
 m = h + 12 | 0;
 if ((c[m >> 2] | 0) > 0) {
  n = d + 16 | 0;
  p = 0;
  do {
   if ((c[w >> 2] | 0) > 0) {
    q = 0;
    do {
     J = c[(c[n >> 2] | 0) + (q << 2) >> 2] | 0;
     Va[c[(c[J >> 2] | 0) + 32 >> 2] & 15](J, C);
     q = q + 1 | 0;
    } while ((q | 0) < (c[w >> 2] | 0));
   }
   Wd(H);
   p = p + 1 | 0;
  } while ((p | 0) < (c[m >> 2] | 0));
 }
 Xd(H);
 g[f + 16 >> 2] = +Bd(D);
 if ((c[G >> 2] | 0) > 0) {
  m = c[x >> 2] | 0;
  t = 0;
  do {
   q = c[A >> 2] | 0;
   r = q + (t * 12 | 0) | 0;
   s = q + (t * 12 | 0) + 4 | 0;
   n = c[m + (t * 12 | 0) >> 2] | 0;
   p = c[m + (t * 12 | 0) + 4 >> 2] | 0;
   z = +g[m + (t * 12 | 0) + 8 >> 2];
   o = (c[k >> 2] = n, +g[k >> 2]);
   K = F * o;
   v = (c[k >> 2] = p, +g[k >> 2]);
   u = F * v;
   u = K * K + u * u;
   if (u > 4.0) {
    K = 2.0 / +O(+u);
    n = (g[k >> 2] = o * K, c[k >> 2] | 0);
    m = (g[k >> 2] = v * K, c[k >> 2] | 0);
   } else m = p;
   o = F * z;
   if (o * o > 2.4674012660980225) o = z * (1.5707963705062866 / (o > 0.0 ? o : -o)); else o = z;
   v = F * (c[k >> 2] = n, +g[k >> 2]);
   z = +g[s >> 2] + F * (c[k >> 2] = m, +g[k >> 2]);
   K = +g[q + (t * 12 | 0) + 8 >> 2] + F * o;
   g[r >> 2] = +g[r >> 2] + v;
   g[s >> 2] = z;
   g[(c[A >> 2] | 0) + (t * 12 | 0) + 8 >> 2] = K;
   J = c[x >> 2] | 0;
   c[J + (t * 12 | 0) >> 2] = n;
   c[J + (t * 12 | 0) + 4 >> 2] = m;
   m = c[x >> 2] | 0;
   g[m + (t * 12 | 0) + 8 >> 2] = o;
   t = t + 1 | 0;
  } while ((t | 0) < (c[G >> 2] | 0));
 }
 r = h + 16 | 0;
 if ((c[r >> 2] | 0) > 0) {
  s = d + 16 | 0;
  t = 0;
  m = 0;
  do {
   q = Yd(H) | 0;
   if ((c[w >> 2] | 0) > 0) {
    p = 0;
    n = 1;
    do {
     J = c[(c[s >> 2] | 0) + (p << 2) >> 2] | 0;
     n = n & ($a[c[(c[J >> 2] | 0) + 36 >> 2] & 3](J, C) | 0);
     p = p + 1 | 0;
    } while ((p | 0) < (c[w >> 2] | 0));
   } else n = 1;
   J = q & n;
   m = m | J;
   t = t + 1 | 0;
  } while ((t | 0) < (c[r >> 2] | 0) & (J ^ 1));
  w = m ^ 1;
 } else w = 1;
 if ((c[G >> 2] | 0) > 0) {
  m = d + 8 | 0;
  n = 0;
  do {
   J = c[(c[m >> 2] | 0) + (n << 2) >> 2] | 0;
   C = (c[A >> 2] | 0) + (n * 12 | 0) | 0;
   h = c[C >> 2] | 0;
   C = c[C + 4 >> 2] | 0;
   B = J + 44 | 0;
   c[B >> 2] = h;
   c[B + 4 >> 2] = C;
   B = c[(c[A >> 2] | 0) + (n * 12 | 0) + 8 >> 2] | 0;
   c[J + 56 >> 2] = B;
   r = (c[x >> 2] | 0) + (n * 12 | 0) | 0;
   s = c[r + 4 >> 2] | 0;
   t = J + 64 | 0;
   c[t >> 2] = c[r >> 2];
   c[t + 4 >> 2] = s;
   c[J + 72 >> 2] = c[(c[x >> 2] | 0) + (n * 12 | 0) + 8 >> 2];
   v = (c[k >> 2] = B, +g[k >> 2]);
   o = +Le(v);
   g[J + 20 >> 2] = o;
   v = +Ke(v);
   g[J + 24 >> 2] = v;
   u = +g[J + 28 >> 2];
   K = +g[J + 32 >> 2];
   z = (c[k >> 2] = h, +g[k >> 2]) - (v * u - o * K);
   K = (c[k >> 2] = C, +g[k >> 2]) - (o * u + v * K);
   g[J + 12 >> 2] = z;
   g[J + 16 >> 2] = K;
   n = n + 1 | 0;
  } while ((n | 0) < (c[G >> 2] | 0));
 }
 g[f + 20 >> 2] = +Bd(D);
 m = c[H + 40 >> 2] | 0;
 n = d + 4 | 0;
 if (c[n >> 2] | 0) if ((c[y >> 2] | 0) > 0) {
  p = E + 16 | 0;
  s = 0;
  do {
   q = c[(c[j >> 2] | 0) + (s << 2) >> 2] | 0;
   r = c[m + (s * 152 | 0) + 144 >> 2] | 0;
   c[p >> 2] = r;
   if ((r | 0) > 0) {
    t = 0;
    do {
     c[E + (t << 2) >> 2] = c[m + (s * 152 | 0) + (t * 36 | 0) + 16 >> 2];
     c[E + 8 + (t << 2) >> 2] = c[m + (s * 152 | 0) + (t * 36 | 0) + 20 >> 2];
     t = t + 1 | 0;
    } while ((t | 0) != (r | 0));
   }
   J = c[n >> 2] | 0;
   Xa[c[(c[J >> 2] | 0) + 20 >> 2] & 3](J, q, E);
   s = s + 1 | 0;
  } while ((s | 0) < (c[y >> 2] | 0));
 }
 if (!l) {
  Td(H);
  i = I;
  return;
 }
 n = c[G >> 2] | 0;
 if ((n | 0) > 0) {
  p = c[d + 8 >> 2] | 0;
  q = 0;
  o = 3402823466385288598117041.0e14;
  do {
   m = c[p + (q << 2) >> 2] | 0;
   do if (c[m >> 2] | 0) {
    if (b[m + 4 >> 1] & 4) {
     K = +g[m + 72 >> 2];
     if (!(K * K > .001218469929881394)) {
      z = +g[m + 64 >> 2];
      K = +g[m + 68 >> 2];
      if (!(z * z + K * K > 9.999999747378752e-05)) {
       J = m + 144 | 0;
       K = F + +g[J >> 2];
       g[J >> 2] = K;
       o = o < K ? o : K;
       break;
      }
     }
    }
    g[m + 144 >> 2] = 0.0;
    o = 0.0;
   } while (0);
   q = q + 1 | 0;
  } while ((q | 0) < (n | 0));
 } else o = 3402823466385288598117041.0e14;
 if (!(o >= .5) | w) {
  Td(H);
  i = I;
  return;
 }
 if ((c[G >> 2] | 0) <= 0) {
  Td(H);
  i = I;
  return;
 }
 m = d + 8 | 0;
 n = 0;
 do {
  J = c[(c[m >> 2] | 0) + (n << 2) >> 2] | 0;
  d = J + 4 | 0;
  b[d >> 1] = e[d >> 1] & 65533;
  g[J + 144 >> 2] = 0.0;
  J = J + 64 | 0;
  c[J >> 2] = 0;
  c[J + 4 >> 2] = 0;
  c[J + 8 >> 2] = 0;
  c[J + 12 >> 2] = 0;
  c[J + 16 >> 2] = 0;
  c[J + 20 >> 2] = 0;
  n = n + 1 | 0;
 } while ((n | 0) < (c[G >> 2] | 0));
 Td(H);
 i = I;
 return;
}

function ec(a, b, d) {
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
   if (!($a[c[d >> 2] & 3](e, a) | 0)) {
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
   b = $a[c[d >> 2] & 3](g, a) | 0;
   e = $a[c[d >> 2] & 3](f, g) | 0;
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
    if (!($a[c[d >> 2] & 3](g, a) | 0)) {
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
   if (!($a[c[d >> 2] & 3](f, g) | 0)) {
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
   cc(a, a + 12 | 0, a + 24 | 0, b + -12 | 0, d) | 0;
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
   cc(a, f, g, h, d) | 0;
   if (!($a[c[d >> 2] & 3](e, h) | 0)) {
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
   if (!($a[c[d >> 2] & 3](h, g) | 0)) {
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
   if (!($a[c[d >> 2] & 3](g, f) | 0)) {
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
   if (!($a[c[d >> 2] & 3](f, a) | 0)) {
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
   h = $a[c[d >> 2] & 3](e, a) | 0;
   g = $a[c[d >> 2] & 3](f, e) | 0;
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
    if ($a[c[d >> 2] & 3](f, e) | 0) {
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
    if ($a[c[d >> 2] & 3](e, a) | 0) {
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
     if ($a[c[d >> 2] & 3](g, f) | 0) {
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
       if ($a[c[d >> 2] & 3](j, h) | 0) {
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

function od(a, b) {
 a = a | 0;
 b = b | 0;
 var d = 0, e = 0, f = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0.0, x = 0.0, y = 0.0, z = 0.0, A = 0.0, B = 0.0;
 if ((b | 0) == -1) ua(4851, 4740, 382, 4862);
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
 if ((v | 0) <= -1) ua(4870, 4740, 392, 4862);
 e = c[a + 12 >> 2] | 0;
 if ((v | 0) >= (e | 0)) ua(4870, 4740, 392, 4862);
 if (!((s | 0) > -1 & (s | 0) < (e | 0))) ua(4901, 4740, 393, 4862);
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
  if (!((f | 0) > -1 & (f | 0) < (e | 0))) ua(4932, 4740, 407, 4862);
  if (!((i | 0) > -1 & (i | 0) < (e | 0))) ua(4963, 4740, 408, 4862);
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
   } else ua(4994, 4740, 424, 4862);
  } while (0);
  d = p + (f * 36 | 0) + 32 | 0;
  e = p + (i * 36 | 0) + 32 | 0;
  if ((c[d >> 2] | 0) > (c[e >> 2] | 0)) {
   c[h >> 2] = f;
   c[l >> 2] = i;
   c[p + (i * 36 | 0) + 20 >> 2] = b;
   B = +g[n >> 2];
   w = +g[k >> 2];
   w = B < w ? B : w;
   B = +g[p + (v * 36 | 0) + 4 >> 2];
   y = +g[p + (i * 36 | 0) + 4 >> 2];
   y = B < y ? B : y;
   g[q >> 2] = w;
   g[p + (b * 36 | 0) + 4 >> 2] = y;
   B = +g[p + (v * 36 | 0) + 8 >> 2];
   A = +g[p + (i * 36 | 0) + 8 >> 2];
   z = +g[p + (v * 36 | 0) + 12 >> 2];
   x = +g[p + (i * 36 | 0) + 12 >> 2];
   q = p + (b * 36 | 0) + 8 | 0;
   g[q >> 2] = B > A ? B : A;
   v = p + (b * 36 | 0) + 12 | 0;
   g[v >> 2] = z > x ? z : x;
   x = +g[j >> 2];
   z = +g[p + (f * 36 | 0) + 4 >> 2];
   g[o >> 2] = w < x ? w : x;
   g[p + (s * 36 | 0) + 4 >> 2] = y < z ? y : z;
   z = +g[q >> 2];
   y = +g[p + (f * 36 | 0) + 8 >> 2];
   x = +g[v >> 2];
   w = +g[p + (f * 36 | 0) + 12 >> 2];
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
   w = +g[n >> 2];
   B = +g[j >> 2];
   B = w < B ? w : B;
   w = +g[p + (v * 36 | 0) + 4 >> 2];
   z = +g[p + (f * 36 | 0) + 4 >> 2];
   z = w < z ? w : z;
   g[q >> 2] = B;
   g[p + (b * 36 | 0) + 4 >> 2] = z;
   w = +g[p + (v * 36 | 0) + 8 >> 2];
   x = +g[p + (f * 36 | 0) + 8 >> 2];
   y = +g[p + (v * 36 | 0) + 12 >> 2];
   A = +g[p + (f * 36 | 0) + 12 >> 2];
   q = p + (b * 36 | 0) + 8 | 0;
   g[q >> 2] = w > x ? w : x;
   v = p + (b * 36 | 0) + 12 | 0;
   g[v >> 2] = y > A ? y : A;
   A = +g[k >> 2];
   y = +g[p + (i * 36 | 0) + 4 >> 2];
   g[o >> 2] = B < A ? B : A;
   g[p + (s * 36 | 0) + 4 >> 2] = z < y ? z : y;
   y = +g[q >> 2];
   z = +g[p + (i * 36 | 0) + 8 >> 2];
   A = +g[v >> 2];
   B = +g[p + (i * 36 | 0) + 12 >> 2];
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
 if (!((f | 0) > -1 & (f | 0) < (e | 0))) ua(5026, 4740, 467, 4862);
 if (!((i | 0) > -1 & (i | 0) < (e | 0))) ua(5057, 4740, 468, 4862);
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
  } else ua(5088, 4740, 484, 4862);
 } while (0);
 d = p + (f * 36 | 0) + 32 | 0;
 e = p + (i * 36 | 0) + 32 | 0;
 if ((c[d >> 2] | 0) > (c[e >> 2] | 0)) {
  c[h >> 2] = f;
  c[m >> 2] = i;
  c[p + (i * 36 | 0) + 20 >> 2] = b;
  w = +g[o >> 2];
  B = +g[k >> 2];
  B = w < B ? w : B;
  w = +g[p + (s * 36 | 0) + 4 >> 2];
  z = +g[p + (i * 36 | 0) + 4 >> 2];
  z = w < z ? w : z;
  g[q >> 2] = B;
  g[p + (b * 36 | 0) + 4 >> 2] = z;
  w = +g[p + (s * 36 | 0) + 8 >> 2];
  x = +g[p + (i * 36 | 0) + 8 >> 2];
  y = +g[p + (s * 36 | 0) + 12 >> 2];
  A = +g[p + (i * 36 | 0) + 12 >> 2];
  q = p + (b * 36 | 0) + 8 | 0;
  g[q >> 2] = w > x ? w : x;
  s = p + (b * 36 | 0) + 12 | 0;
  g[s >> 2] = y > A ? y : A;
  A = +g[j >> 2];
  y = +g[p + (f * 36 | 0) + 4 >> 2];
  g[n >> 2] = B < A ? B : A;
  g[p + (v * 36 | 0) + 4 >> 2] = z < y ? z : y;
  y = +g[q >> 2];
  z = +g[p + (f * 36 | 0) + 8 >> 2];
  A = +g[s >> 2];
  B = +g[p + (f * 36 | 0) + 12 >> 2];
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
  w = +g[o >> 2];
  B = +g[j >> 2];
  B = w < B ? w : B;
  w = +g[p + (s * 36 | 0) + 4 >> 2];
  z = +g[p + (f * 36 | 0) + 4 >> 2];
  z = w < z ? w : z;
  g[q >> 2] = B;
  g[p + (b * 36 | 0) + 4 >> 2] = z;
  w = +g[p + (s * 36 | 0) + 8 >> 2];
  x = +g[p + (f * 36 | 0) + 8 >> 2];
  y = +g[p + (s * 36 | 0) + 12 >> 2];
  A = +g[p + (f * 36 | 0) + 12 >> 2];
  q = p + (b * 36 | 0) + 8 | 0;
  g[q >> 2] = w > x ? w : x;
  s = p + (b * 36 | 0) + 12 | 0;
  g[s >> 2] = y > A ? y : A;
  A = +g[k >> 2];
  y = +g[p + (i * 36 | 0) + 4 >> 2];
  g[n >> 2] = B < A ? B : A;
  g[p + (v * 36 | 0) + 4 >> 2] = z < y ? z : y;
  y = +g[q >> 2];
  z = +g[p + (i * 36 | 0) + 8 >> 2];
  A = +g[s >> 2];
  B = +g[p + (i * 36 | 0) + 12 >> 2];
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

function Wd(a) {
 a = a | 0;
 var b = 0.0, d = 0.0, e = 0, f = 0, h = 0, i = 0, j = 0.0, l = 0.0, m = 0.0, n = 0, o = 0.0, p = 0.0, q = 0, r = 0.0, s = 0.0, t = 0.0, u = 0.0, v = 0.0, w = 0.0, x = 0.0, y = 0, z = 0.0, A = 0.0, B = 0.0, C = 0.0, D = 0.0, E = 0.0, F = 0.0, G = 0.0, H = 0, I = 0, J = 0.0, K = 0.0, L = 0.0, M = 0.0, N = 0.0, O = 0.0, P = 0, Q = 0, R = 0, S = 0, T = 0, U = 0, V = 0, W = 0, X = 0.0, Y = 0.0;
 V = a + 48 | 0;
 if ((c[V >> 2] | 0) <= 0) return;
 W = a + 40 | 0;
 S = a + 28 | 0;
 e = c[S >> 2] | 0;
 U = 0;
 a : while (1) {
  I = c[W >> 2] | 0;
  H = I + (U * 152 | 0) | 0;
  T = c[I + (U * 152 | 0) + 112 >> 2] | 0;
  P = c[I + (U * 152 | 0) + 116 >> 2] | 0;
  J = +g[I + (U * 152 | 0) + 120 >> 2];
  N = +g[I + (U * 152 | 0) + 128 >> 2];
  M = +g[I + (U * 152 | 0) + 124 >> 2];
  O = +g[I + (U * 152 | 0) + 132 >> 2];
  y = I + (U * 152 | 0) + 144 | 0;
  n = c[y >> 2] | 0;
  Q = e + (T * 12 | 0) | 0;
  R = e + (T * 12 | 0) + 4 | 0;
  K = +g[I + (U * 152 | 0) + 72 >> 2];
  L = +g[I + (U * 152 | 0) + 76 >> 2];
  o = -K;
  p = +g[I + (U * 152 | 0) + 136 >> 2];
  if ((n + -1 | 0) >>> 0 >= 2) {
   a = 6;
   break;
  }
  q = 0;
  h = c[Q >> 2] | 0;
  f = c[R >> 2] | 0;
  i = c[e + (P * 12 | 0) >> 2] | 0;
  a = c[e + (P * 12 | 0) + 4 >> 2] | 0;
  d = +g[e + (T * 12 | 0) + 8 >> 2];
  b = +g[e + (P * 12 | 0) + 8 >> 2];
  while (1) {
   F = +g[I + (U * 152 | 0) + (q * 36 | 0) + 12 >> 2];
   D = +g[I + (U * 152 | 0) + (q * 36 | 0) + 8 >> 2];
   m = (c[k >> 2] = i, +g[k >> 2]);
   r = (c[k >> 2] = a, +g[k >> 2]);
   j = (c[k >> 2] = h, +g[k >> 2]);
   l = (c[k >> 2] = f, +g[k >> 2]);
   C = +g[I + (U * 152 | 0) + (q * 36 | 0) + 4 >> 2];
   B = +g[I + (U * 152 | 0) + (q * 36 | 0) >> 2];
   G = p * +g[I + (U * 152 | 0) + (q * 36 | 0) + 16 >> 2];
   h = I + (U * 152 | 0) + (q * 36 | 0) + 20 | 0;
   E = +g[h >> 2];
   z = E - +g[I + (U * 152 | 0) + (q * 36 | 0) + 28 >> 2] * (L * (m - b * F - j + d * C) + (r + b * D - l - d * B) * o);
   A = -G;
   G = z < G ? z : G;
   G = G < A ? A : G;
   E = G - E;
   g[h >> 2] = G;
   G = L * E;
   E = E * o;
   j = j - J * G;
   h = (g[k >> 2] = j, c[k >> 2] | 0);
   l = l - J * E;
   f = (g[k >> 2] = l, c[k >> 2] | 0);
   d = d - N * (B * E - C * G);
   m = m + M * G;
   e = (g[k >> 2] = m, c[k >> 2] | 0);
   r = r + M * E;
   a = (g[k >> 2] = r, c[k >> 2] | 0);
   b = b + O * (D * E - F * G);
   q = q + 1 | 0;
   if ((q | 0) == (n | 0)) break; else i = e;
  }
  do if ((c[y >> 2] | 0) == 1) {
   G = +g[I + (U * 152 | 0) + 12 >> 2];
   F = +g[I + (U * 152 | 0) + 8 >> 2];
   E = +g[I + (U * 152 | 0) + 4 >> 2];
   D = +g[H >> 2];
   h = I + (U * 152 | 0) + 16 | 0;
   C = +g[h >> 2];
   B = C - +g[I + (U * 152 | 0) + 24 >> 2] * (K * (m - b * G - j + d * E) + L * (r + b * F - l - d * D) - +g[I + (U * 152 | 0) + 32 >> 2]);
   B = B > 0.0 ? B : 0.0;
   C = B - C;
   g[h >> 2] = B;
   K = K * C;
   L = L * C;
   h = (g[k >> 2] = j - J * K, c[k >> 2] | 0);
   f = (g[k >> 2] = l - J * L, c[k >> 2] | 0);
   e = (g[k >> 2] = m + M * K, c[k >> 2] | 0);
   a = (g[k >> 2] = r + M * L, c[k >> 2] | 0);
   d = d - N * (D * L - E * K);
   b = b + O * (F * L - G * K);
  } else {
   i = I + (U * 152 | 0) + 16 | 0;
   w = +g[i >> 2];
   n = I + (U * 152 | 0) + 52 | 0;
   x = +g[n >> 2];
   if (!(w >= 0.0) | !(x >= 0.0)) {
    a = 11;
    break a;
   }
   F = +g[I + (U * 152 | 0) + 12 >> 2];
   G = +g[I + (U * 152 | 0) + 8 >> 2];
   C = +g[I + (U * 152 | 0) + 4 >> 2];
   z = +g[H >> 2];
   D = +g[I + (U * 152 | 0) + 48 >> 2];
   E = +g[I + (U * 152 | 0) + 44 >> 2];
   A = +g[I + (U * 152 | 0) + 40 >> 2];
   B = +g[I + (U * 152 | 0) + 36 >> 2];
   t = +g[I + (U * 152 | 0) + 104 >> 2];
   s = +g[I + (U * 152 | 0) + 100 >> 2];
   u = K * (m - b * F - j + d * C) + L * (r + b * G - l - d * z) - +g[I + (U * 152 | 0) + 32 >> 2] - (w * +g[I + (U * 152 | 0) + 96 >> 2] + x * t);
   v = K * (m - b * D - j + d * A) + L * (r + b * E - l - d * B) - +g[I + (U * 152 | 0) + 68 >> 2] - (w * s + x * +g[I + (U * 152 | 0) + 108 >> 2]);
   Y = +g[I + (U * 152 | 0) + 80 >> 2] * u + +g[I + (U * 152 | 0) + 88 >> 2] * v;
   X = u * +g[I + (U * 152 | 0) + 84 >> 2] + v * +g[I + (U * 152 | 0) + 92 >> 2];
   o = -Y;
   p = -X;
   if (!(!(Y <= -0.0) | !(X <= -0.0))) {
    w = o - w;
    X = p - x;
    x = K * w;
    w = L * w;
    Y = K * X;
    X = L * X;
    K = x + Y;
    L = w + X;
    h = (g[k >> 2] = j - J * K, c[k >> 2] | 0);
    f = (g[k >> 2] = l - J * L, c[k >> 2] | 0);
    e = (g[k >> 2] = m + M * K, c[k >> 2] | 0);
    a = (g[k >> 2] = r + M * L, c[k >> 2] | 0);
    g[i >> 2] = o;
    g[n >> 2] = p;
    d = d - N * (z * w - C * x + (B * X - A * Y));
    b = b + O * (G * w - F * x + (E * X - D * Y));
    break;
   }
   Y = u * +g[I + (U * 152 | 0) + 24 >> 2];
   o = -Y;
   if (Y <= -0.0 & v + s * o >= 0.0) {
    w = o - w;
    X = 0.0 - x;
    x = K * w;
    w = L * w;
    Y = K * X;
    X = L * X;
    K = Y + x;
    L = X + w;
    h = (g[k >> 2] = j - J * K, c[k >> 2] | 0);
    f = (g[k >> 2] = l - J * L, c[k >> 2] | 0);
    e = (g[k >> 2] = m + M * K, c[k >> 2] | 0);
    a = (g[k >> 2] = r + M * L, c[k >> 2] | 0);
    g[i >> 2] = o;
    c[n >> 2] = 0;
    d = d - N * (w * z - x * C + (X * B - Y * A));
    b = b + O * (w * G - x * F + (X * E - Y * D));
    break;
   }
   Y = v * +g[I + (U * 152 | 0) + 60 >> 2];
   o = -Y;
   if (Y <= -0.0 & u + t * o >= 0.0) {
    w = 0.0 - w;
    X = o - x;
    x = K * w;
    w = L * w;
    Y = K * X;
    X = L * X;
    K = x + Y;
    L = w + X;
    h = (g[k >> 2] = j - J * K, c[k >> 2] | 0);
    f = (g[k >> 2] = l - J * L, c[k >> 2] | 0);
    e = (g[k >> 2] = m + M * K, c[k >> 2] | 0);
    a = (g[k >> 2] = r + M * L, c[k >> 2] | 0);
    c[i >> 2] = 0;
    g[n >> 2] = o;
    d = d - N * (w * z - x * C + (X * B - Y * A));
    b = b + O * (w * G - x * F + (X * E - Y * D));
    break;
   }
   if (u >= 0.0 & v >= 0.0) {
    w = 0.0 - w;
    X = 0.0 - x;
    x = K * w;
    w = L * w;
    Y = K * X;
    X = L * X;
    K = x + Y;
    L = w + X;
    h = (g[k >> 2] = j - J * K, c[k >> 2] | 0);
    f = (g[k >> 2] = l - J * L, c[k >> 2] | 0);
    e = (g[k >> 2] = m + M * K, c[k >> 2] | 0);
    a = (g[k >> 2] = r + M * L, c[k >> 2] | 0);
    c[i >> 2] = 0;
    c[n >> 2] = 0;
    d = d - N * (w * z - x * C + (X * B - Y * A));
    b = b + O * (w * G - x * F + (X * E - Y * D));
   }
  } while (0);
  c[Q >> 2] = h;
  c[R >> 2] = f;
  R = c[S >> 2] | 0;
  g[R + (T * 12 | 0) + 8 >> 2] = d;
  c[R + (P * 12 | 0) >> 2] = e;
  c[R + (P * 12 | 0) + 4 >> 2] = a;
  e = c[S >> 2] | 0;
  g[e + (P * 12 | 0) + 8 >> 2] = b;
  U = U + 1 | 0;
  if ((U | 0) >= (c[V >> 2] | 0)) {
   a = 3;
   break;
  }
 }
 if ((a | 0) == 3) return; else if ((a | 0) == 6) ua(6271, 6156, 311, 6306); else if ((a | 0) == 11) ua(6331, 6156, 406, 6306);
}

function He(a, b, d, e, f) {
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
  g = +ie(g, l);
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
     g = g - +ie(1.0, l);
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
  g = +ie(g, 0 - l | 0);
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
  g = +ie(1.0, l);
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

function pc(d, f) {
 d = d | 0;
 f = f | 0;
 var h = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, z = 0, A = 0, B = 0, C = 0, D = 0, E = 0, F = 0, G = 0, H = 0, I = 0, J = 0, K = 0, L = 0, M = 0, N = 0, O = 0, P = 0, Q = 0, R = 0, S = 0, T = 0, U = 0, V = 0, W = 0.0;
 V = i;
 i = i + 96 | 0;
 T = V + 32 | 0;
 U = V;
 N = d + 103008 | 0;
 g[N >> 2] = 0.0;
 O = d + 103012 | 0;
 g[O >> 2] = 0.0;
 P = d + 103016 | 0;
 g[P >> 2] = 0.0;
 j = d + 102960 | 0;
 S = d + 102872 | 0;
 Q = d + 68 | 0;
 Cd(T, c[j >> 2] | 0, c[d + 102936 >> 2] | 0, c[d + 102964 >> 2] | 0, Q, c[d + 102944 >> 2] | 0);
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
 M = xd(Q, x << 2) | 0;
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
      g[r + 144 >> 2] = 0.0;
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
    Ed(T, U, f, H, (a[I >> 0] | 0) != 0);
    g[N >> 2] = +g[J >> 2] + +g[N >> 2];
    g[O >> 2] = +g[K >> 2] + +g[O >> 2];
    g[P >> 2] = +g[L >> 2] + +g[P >> 2];
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
  if ((h | 0) == 14) ua(3389, 3351, 445, 3411); else if ((h | 0) == 16) ua(3417, 3446, 54, 3474); else if ((h | 0) == 27) ua(3478, 3446, 62, 3474); else if ((h | 0) == 30) ua(3513, 3351, 495, 3411); else if ((h | 0) == 36) ua(3536, 3446, 68, 3474); else if ((h | 0) == 39) ua(3513, 3351, 524, 3411);
 } while (0);
 yd(Q, M);
 h = c[R >> 2] | 0;
 if (!h) {
  _b(S);
  W = +Bd(U);
  d = d + 103020 | 0;
  g[d >> 2] = W;
  Dd(T);
  i = V;
  return;
 }
 do {
  if (b[h + 4 >> 1] & 1) if (c[h >> 2] | 0) Nb(h);
  h = c[h + 96 >> 2] | 0;
 } while ((h | 0) != 0);
 _b(S);
 W = +Bd(U);
 d = d + 103020 | 0;
 g[d >> 2] = W;
 Dd(T);
 i = V;
 return;
}

function rd(d, e) {
 d = d | 0;
 e = e | 0;
 var f = 0, h = 0.0, j = 0, l = 0, m = 0.0, n = 0.0, o = 0.0, p = 0.0, q = 0, r = 0, s = 0.0, t = 0.0, u = 0, v = 0.0, w = 0.0, x = 0.0, y = 0.0, z = 0.0, A = 0.0, B = 0.0, C = 0.0, D = 0.0, E = 0.0, F = 0.0, G = 0.0, H = 0.0, I = 0.0, J = 0.0, K = 0.0, L = 0.0, N = 0.0, O = 0.0, P = 0, Q = 0, R = 0, S = 0, T = 0, U = 0, V = 0, W = 0, X = 0, Y = 0.0, Z = 0.0, _ = 0, $ = 0, aa = 0, ba = 0, ca = 0, da = 0, ea = 0, fa = 0, ga = 0, ha = 0, ia = 0, ja = 0, ka = 0, la = 0.0;
 ka = i;
 i = i + 320 | 0;
 ga = ka + 276 | 0;
 ha = ka + 240 | 0;
 aa = ka + 228 | 0;
 ba = ka + 136 | 0;
 ca = ka + 112 | 0;
 da = ka + 8 | 0;
 ea = ka + 4 | 0;
 fa = ka;
 c[2424] = (c[2424] | 0) + 1;
 c[d >> 2] = 0;
 _ = c[e + 128 >> 2] | 0;
 ia = d + 4 | 0;
 c[ia >> 2] = _;
 $ = e + 28 | 0;
 f = ga;
 j = e + 56 | 0;
 l = f + 36 | 0;
 do {
  c[f >> 2] = c[j >> 2];
  f = f + 4 | 0;
  j = j + 4 | 0;
 } while ((f | 0) < (l | 0));
 f = ha;
 j = e + 92 | 0;
 l = f + 36 | 0;
 do {
  c[f >> 2] = c[j >> 2];
  f = f + 4 | 0;
  j = j + 4 | 0;
 } while ((f | 0) < (l | 0));
 X = ga + 24 | 0;
 I = +g[X >> 2];
 J = +M(+(I / 6.2831854820251465)) * 6.2831854820251465;
 I = I - J;
 g[X >> 2] = I;
 X = ga + 28 | 0;
 J = +g[X >> 2] - J;
 g[X >> 2] = J;
 X = ha + 24 | 0;
 K = +g[X >> 2];
 L = +M(+(K / 6.2831854820251465)) * 6.2831854820251465;
 K = K - L;
 g[X >> 2] = K;
 X = ha + 28 | 0;
 L = +g[X >> 2] - L;
 g[X >> 2] = L;
 N = (c[k >> 2] = _, +g[k >> 2]);
 O = +g[e + 24 >> 2] + +g[e + 52 >> 2] + -.014999999664723873;
 O = O < .004999999888241291 ? .004999999888241291 : O;
 if (!(O > 1.2499999720603228e-03)) ua(5238, 5257, 280, 5292);
 b[aa + 4 >> 1] = 0;
 c[ba >> 2] = c[e >> 2];
 c[ba + 4 >> 2] = c[e + 4 >> 2];
 c[ba + 8 >> 2] = c[e + 8 >> 2];
 c[ba + 12 >> 2] = c[e + 12 >> 2];
 c[ba + 16 >> 2] = c[e + 16 >> 2];
 c[ba + 20 >> 2] = c[e + 20 >> 2];
 c[ba + 24 >> 2] = c[e + 24 >> 2];
 P = ba + 28 | 0;
 c[P >> 2] = c[$ >> 2];
 c[P + 4 >> 2] = c[$ + 4 >> 2];
 c[P + 8 >> 2] = c[$ + 8 >> 2];
 c[P + 12 >> 2] = c[$ + 12 >> 2];
 c[P + 16 >> 2] = c[$ + 16 >> 2];
 c[P + 20 >> 2] = c[$ + 20 >> 2];
 c[P + 24 >> 2] = c[$ + 24 >> 2];
 a[ba + 88 >> 0] = 0;
 P = ba + 56 | 0;
 Q = ba + 60 | 0;
 R = ba + 64 | 0;
 S = ba + 68 | 0;
 T = ba + 72 | 0;
 U = ba + 76 | 0;
 V = ba + 80 | 0;
 W = ba + 84 | 0;
 X = ca + 16 | 0;
 Y = O + 1.2499999720603228e-03;
 Z = O + -1.2499999720603228e-03;
 w = +g[ga + 8 >> 2];
 x = +g[ga + 12 >> 2];
 y = +g[ga + 16 >> 2];
 z = +g[ga + 20 >> 2];
 A = +g[ga >> 2];
 B = +g[ga + 4 >> 2];
 C = +g[ha + 8 >> 2];
 D = +g[ha + 12 >> 2];
 E = +g[ha + 16 >> 2];
 F = +g[ha + 20 >> 2];
 G = +g[ha >> 2];
 H = +g[ha + 4 >> 2];
 f = 0;
 h = 0.0;
 while (1) {
  t = 1.0 - h;
  s = t * I + h * J;
  p = +Le(s);
  s = +Ke(s);
  m = t * K + h * L;
  v = +Le(m);
  m = +Ke(m);
  g[P >> 2] = t * w + h * y - (s * A - p * B);
  g[Q >> 2] = t * x + h * z - (p * A + s * B);
  g[R >> 2] = p;
  g[S >> 2] = s;
  g[T >> 2] = t * C + h * E - (m * G - v * H);
  g[U >> 2] = t * D + h * F - (v * G + m * H);
  g[V >> 2] = v;
  g[W >> 2] = m;
  hd(ca, aa, ba);
  m = +g[X >> 2];
  if (m <= 0.0) {
   h = 0.0;
   j = 2;
   ja = 23;
   break;
  }
  if (m < Y) {
   j = 3;
   ja = 23;
   break;
  }
  +sd(da, aa, e, ga, $, ha, h);
  m = +td(da, ea, fa, N);
  a : do if (m > Y) ja = 7; else {
   u = 0;
   v = N;
   while (1) {
    if (m > Z) {
     j = 0;
     h = v;
     break a;
    }
    q = c[ea >> 2] | 0;
    r = c[fa >> 2] | 0;
    n = +ud(da, q, r, h);
    if (n < Z) {
     ja = 10;
     break;
    }
    if (!(n <= Y)) {
     s = h;
     t = v;
     j = 0;
     p = n;
    } else {
     ja = 12;
     break;
    }
    while (1) {
     if (!(j & 1)) n = (s + t) * .5; else n = s + (O - p) * (t - s) / (m - p);
     o = +ud(da, q, r, n);
     la = o - O;
     if ((la > 0.0 ? la : -la) < 1.2499999720603228e-03) break;
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
    m = +td(da, ea, fa, n);
    if (m > Y) {
     ja = 7;
     break a;
    } else v = n;
   }
   if ((ja | 0) == 10) {
    ja = 0;
    c[d >> 2] = 1;
    g[ia >> 2] = h;
    j = 1;
    break;
   } else if ((ja | 0) == 12) {
    ja = 0;
    c[d >> 2] = 3;
    g[ia >> 2] = h;
    j = 1;
    break;
   }
  } while (0);
  if ((ja | 0) == 7) {
   ja = 0;
   c[d >> 2] = 4;
   c[ia >> 2] = _;
   j = 1;
  }
  f = f + 1 | 0;
  c[2425] = (c[2425] | 0) + 1;
  if (j) break;
  if ((f | 0) == 20) {
   ja = 22;
   break;
  }
 }
 if ((ja | 0) == 22) {
  c[d >> 2] = 1;
  g[ia >> 2] = h;
  f = 20;
 } else if ((ja | 0) == 23) {
  c[d >> 2] = j;
  g[ia >> 2] = h;
  ja = f;
  d = c[2426] | 0;
  ia = (d | 0) > (ja | 0);
  ja = ia ? d : ja;
  c[2426] = ja;
  i = ka;
  return;
 }
 ja = f;
 d = c[2426] | 0;
 ia = (d | 0) > (ja | 0);
 ja = ia ? d : ja;
 c[2426] = ja;
 i = ka;
 return;
}

function Ud(a) {
 a = a | 0;
 var b = 0.0, d = 0.0, e = 0.0, f = 0.0, h = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0.0, p = 0.0, q = 0.0, r = 0.0, s = 0.0, t = 0.0, u = 0.0, v = 0.0, w = 0.0, x = 0.0, y = 0.0, z = 0.0, A = 0, B = 0, C = 0, D = 0, E = 0, F = 0, G = 0, H = 0, I = 0, J = 0, K = 0, L = 0, M = 0, N = 0, O = 0, P = 0, Q = 0, R = 0, S = 0.0, T = 0.0, U = 0.0, V = 0.0, W = 0.0, X = 0.0, Y = 0.0, Z = 0.0, _ = 0;
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
  p = +g[E + (I * 152 | 0) + 120 >> 2];
  q = +g[E + (I * 152 | 0) + 124 >> 2];
  y = +g[E + (I * 152 | 0) + 128 >> 2];
  z = +g[E + (I * 152 | 0) + 132 >> 2];
  j = c[N >> 2] | 0;
  b = +g[j + (h * 12 | 0) + 8 >> 2];
  n = c[F >> 2] | 0;
  r = +g[n + (h * 12 | 0) >> 2];
  s = +g[n + (h * 12 | 0) + 4 >> 2];
  t = +g[n + (h * 12 | 0) + 8 >> 2];
  d = +g[j + (a * 12 | 0) + 8 >> 2];
  u = +g[n + (a * 12 | 0) >> 2];
  v = +g[n + (a * 12 | 0) + 4 >> 2];
  w = +g[n + (a * 12 | 0) + 8 >> 2];
  if ((c[l + 124 >> 2] | 0) <= 0) {
   a = 5;
   break;
  }
  x = +g[j + (a * 12 | 0) + 4 >> 2];
  f = +g[j + (a * 12 | 0) >> 2];
  o = +g[j + (h * 12 | 0) + 4 >> 2];
  e = +g[j + (h * 12 | 0) >> 2];
  V = +g[k + (I * 88 | 0) + 60 >> 2];
  U = +g[k + (I * 88 | 0) + 56 >> 2];
  Z = +g[k + (I * 88 | 0) + 52 >> 2];
  X = +g[k + (I * 88 | 0) + 48 >> 2];
  S = +g[k + (I * 88 | 0) + 80 >> 2];
  T = +g[k + (I * 88 | 0) + 76 >> 2];
  W = +Le(b);
  g[G >> 2] = W;
  Y = +Ke(b);
  g[H >> 2] = Y;
  b = +Le(d);
  g[A >> 2] = b;
  d = +Ke(d);
  g[B >> 2] = d;
  g[P >> 2] = e - (X * Y - Z * W);
  g[C >> 2] = o - (Z * Y + X * W);
  g[Q >> 2] = f - (U * d - V * b);
  g[D >> 2] = x - (V * d + U * b);
  cd(O, l + 64 | 0, P, T, Q, S);
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
   b = p + q;
   j = E + (I * 152 | 0) + 140 | 0;
   m = 0;
   do {
    _ = O + 8 + (m << 3) | 0;
    d = +g[_ >> 2] - e;
    k = O + 8 + (m << 3) + 4 | 0;
    Y = +g[k >> 2] - o;
    g[E + (I * 152 | 0) + (m * 36 | 0) >> 2] = d;
    g[E + (I * 152 | 0) + (m * 36 | 0) + 4 >> 2] = Y;
    Z = +g[_ >> 2] - f;
    X = +g[k >> 2] - x;
    g[E + (I * 152 | 0) + (m * 36 | 0) + 8 >> 2] = Z;
    g[E + (I * 152 | 0) + (m * 36 | 0) + 12 >> 2] = X;
    V = +g[h >> 2];
    W = +g[l >> 2];
    U = d * V - Y * W;
    W = V * Z - W * X;
    W = b + U * (y * U) + W * (z * W);
    g[E + (I * 152 | 0) + (m * 36 | 0) + 24 >> 2] = W > 0.0 ? 1.0 / W : 0.0;
    W = +g[h >> 2];
    U = -+g[l >> 2];
    V = d * U - W * Y;
    W = Z * U - W * X;
    W = b + V * (y * V) + W * (z * W);
    g[E + (I * 152 | 0) + (m * 36 | 0) + 28 >> 2] = W > 0.0 ? 1.0 / W : 0.0;
    k = E + (I * 152 | 0) + (m * 36 | 0) + 32 | 0;
    g[k >> 2] = 0.0;
    d = +g[l >> 2] * (u - w * X - r + t * Y) + +g[h >> 2] * (v + w * Z - s - t * d);
    if (d < -1.0) g[k >> 2] = -(d * +g[j >> 2]);
    m = m + 1 | 0;
   } while ((m | 0) != (a | 0));
   if ((c[n >> 2] | 0) == 2) {
    X = +g[E + (I * 152 | 0) + 76 >> 2];
    d = +g[l >> 2];
    b = +g[E + (I * 152 | 0) >> 2] * X - +g[E + (I * 152 | 0) + 4 >> 2] * d;
    f = X * +g[E + (I * 152 | 0) + 8 >> 2] - d * +g[E + (I * 152 | 0) + 12 >> 2];
    Z = X * +g[E + (I * 152 | 0) + 36 >> 2] - d * +g[E + (I * 152 | 0) + 40 >> 2];
    d = X * +g[E + (I * 152 | 0) + 44 >> 2] - d * +g[E + (I * 152 | 0) + 48 >> 2];
    X = p + q;
    Y = y * b;
    e = z * f;
    f = X + b * Y + f * e;
    b = X + Z * (y * Z) + d * (z * d);
    d = X + Y * Z + e * d;
    e = f * b - d * d;
    if (f * f < e * 1.0e3) {
     g[E + (I * 152 | 0) + 96 >> 2] = f;
     g[E + (I * 152 | 0) + 100 >> 2] = d;
     g[E + (I * 152 | 0) + 104 >> 2] = d;
     g[E + (I * 152 | 0) + 108 >> 2] = b;
     Z = e != 0.0 ? 1.0 / e : e;
     Y = -(Z * d);
     g[E + (I * 152 | 0) + 80 >> 2] = b * Z;
     g[E + (I * 152 | 0) + 84 >> 2] = Y;
     g[E + (I * 152 | 0) + 88 >> 2] = Y;
     g[E + (I * 152 | 0) + 92 >> 2] = f * Z;
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
 } else if ((a | 0) == 5) ua(6216, 6156, 168, 6241);
}

function $c(b, d, e, f, h) {
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 h = h | 0;
 var j = 0.0, k = 0.0, l = 0, m = 0, n = 0.0, o = 0.0, p = 0.0, q = 0.0, r = 0.0, s = 0.0, t = 0.0, u = 0.0, v = 0.0, w = 0.0, x = 0, y = 0, z = 0.0, A = 0.0, B = 0.0, C = 0.0, D = 0.0, E = 0, F = 0.0, G = 0.0, H = 0, I = 0, J = 0, K = 0, L = 0.0, M = 0, N = 0, P = 0, Q = 0.0, R = 0.0;
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
 L = +g[d + 8 >> 2] + +g[f + 8 >> 2];
 c[l >> 2] = 0;
 j = +ad(l, d, e, f, h);
 if (j > L) {
  i = P;
  return;
 }
 c[m >> 2] = 0;
 k = +ad(m, f, h, d, e);
 if (!(k > L)) {
  o = +g[h >> 2];
  u = +g[h + 4 >> 2];
  r = +g[h + 8 >> 2];
  s = +g[h + 12 >> 2];
  n = +g[e >> 2];
  t = +g[e + 4 >> 2];
  p = +g[e + 8 >> 2];
  q = +g[e + 12 >> 2];
  if (k > j * .9800000190734863 + 1.0000000474974513e-03) {
   h = 2;
   l = m;
   E = 1;
   x = f;
   z = o;
   A = s;
   B = u;
   C = r;
   G = n;
   F = p;
   s = q;
   D = t;
  } else {
   h = 1;
   E = 0;
   x = d;
   d = f;
   z = n;
   A = q;
   B = t;
   C = p;
   G = o;
   F = r;
   D = u;
  }
  y = c[l >> 2] | 0;
  c[b + 56 >> 2] = h;
  m = c[d + 148 >> 2] | 0;
  if ((y | 0) <= -1) ua(4440, 4483, 151, 4537);
  f = c[x + 148 >> 2] | 0;
  if ((f | 0) <= (y | 0)) ua(4440, 4483, 151, 4537);
  j = +g[x + 84 + (y << 3) >> 2];
  w = +g[x + 84 + (y << 3) + 4 >> 2];
  k = A * j - C * w;
  w = C * j + A * w;
  j = s * k + F * w;
  k = s * w - F * k;
  if ((m | 0) > 0) {
   l = 0;
   h = 0;
   o = 3402823466385288598117041.0e14;
   while (1) {
    n = j * +g[d + 84 + (l << 3) >> 2] + k * +g[d + 84 + (l << 3) + 4 >> 2];
    e = n < o;
    h = e ? l : h;
    l = l + 1 | 0;
    if ((l | 0) == (m | 0)) break; else o = e ? n : o;
   }
  } else h = 0;
  l = h + 1 | 0;
  m = (l | 0) < (m | 0) ? l : 0;
  q = +g[d + 20 + (h << 3) >> 2];
  r = +g[d + 20 + (h << 3) + 4 >> 2];
  g[J >> 2] = G + (s * q - F * r);
  g[J + 4 >> 2] = D + (F * q + s * r);
  l = y & 255;
  e = J + 8 | 0;
  a[e >> 0] = l;
  a[e + 1 >> 0] = h;
  a[e + 2 >> 0] = 1;
  a[e + 3 >> 0] = 0;
  r = +g[d + 20 + (m << 3) >> 2];
  q = +g[d + 20 + (m << 3) + 4 >> 2];
  g[J + 12 >> 2] = G + (s * r - F * q);
  g[J + 16 >> 2] = D + (F * r + s * q);
  h = J + 20 | 0;
  a[h >> 0] = l;
  a[h + 1 >> 0] = m;
  a[h + 2 >> 0] = 1;
  a[h + 3 >> 0] = 0;
  h = y + 1 | 0;
  h = (h | 0) < (f | 0) ? h : 0;
  q = +g[x + 20 + (y << 3) >> 2];
  r = +g[x + 20 + (y << 3) + 4 >> 2];
  u = +g[x + 20 + (h << 3) >> 2];
  t = +g[x + 20 + (h << 3) + 4 >> 2];
  j = u - q;
  n = t - r;
  k = +O(+(j * j + n * n));
  if (!(k < 1.1920928955078125e-07)) {
   w = 1.0 / k;
   j = j * w;
   n = n * w;
  }
  o = (q + u) * .5;
  p = A * j - C * n;
  v = C * j + A * n;
  g[K >> 2] = p;
  g[K + 4 >> 2] = v;
  w = -p;
  R = z + (A * q - C * r);
  Q = B + (C * q + A * r);
  k = -j;
  j = (r + t) * .5;
  q = R * v + Q * w;
  g[H >> 2] = w;
  g[H + 4 >> 2] = -v;
  if ((dd(I, J, H, L - (R * p + Q * v), y) | 0) >= 2) if ((dd(M, I, K, L + ((z + (A * u - C * t)) * p + (B + (C * u + A * t)) * v), h) | 0) >= 2) {
   g[b + 40 >> 2] = n;
   g[b + 44 >> 2] = k;
   g[b + 48 >> 2] = o;
   g[b + 52 >> 2] = j;
   j = +g[M >> 2];
   k = +g[M + 4 >> 2];
   h = !(v * j + k * w - q <= L);
   if (!(E << 24 >> 24)) {
    if (h) h = 0; else {
     R = j - G;
     Q = k - D;
     g[b >> 2] = s * R + F * Q;
     g[b + 4 >> 2] = s * Q - F * R;
     c[b + 16 >> 2] = c[M + 8 >> 2];
     h = 1;
    }
    j = +g[M + 12 >> 2];
    k = +g[M + 16 >> 2];
    if (v * j + k * w - q <= L) {
     R = j - G;
     Q = k - D;
     g[b + (h * 20 | 0) >> 2] = s * R + F * Q;
     g[b + (h * 20 | 0) + 4 >> 2] = s * Q - F * R;
     c[b + (h * 20 | 0) + 16 >> 2] = c[M + 20 >> 2];
     h = h + 1 | 0;
    }
   } else {
    if (h) h = 0; else {
     R = j - G;
     Q = k - D;
     g[b >> 2] = s * R + F * Q;
     g[b + 4 >> 2] = s * Q - F * R;
     h = b + 16 | 0;
     K = c[M + 8 >> 2] | 0;
     c[h >> 2] = K;
     a[h >> 0] = K >>> 8;
     a[h + 1 >> 0] = K;
     a[h + 2 >> 0] = K >>> 24;
     a[h + 3 >> 0] = K >>> 16;
     h = 1;
    }
    j = +g[M + 12 >> 2];
    k = +g[M + 16 >> 2];
    if (v * j + k * w - q <= L) {
     R = j - G;
     Q = k - D;
     g[b + (h * 20 | 0) >> 2] = s * R + F * Q;
     g[b + (h * 20 | 0) + 4 >> 2] = s * Q - F * R;
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

function Fd(a, b, d, e) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 var f = 0, h = 0, j = 0, l = 0, m = 0, n = 0, o = 0.0, p = 0.0, q = 0.0, r = 0.0, s = 0.0, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, z = 0, A = 0.0, B = 0.0, C = 0.0;
 z = i;
 i = i + 128 | 0;
 y = z + 96 | 0;
 n = z + 52 | 0;
 x = z;
 u = a + 28 | 0;
 f = c[u >> 2] | 0;
 if ((f | 0) <= (d | 0)) ua(5599, 5623, 386, 5651);
 if ((f | 0) <= (e | 0)) ua(5660, 5623, 387, 5651);
 if ((f | 0) > 0) {
  h = a + 8 | 0;
  m = a + 20 | 0;
  l = a + 24 | 0;
  j = 0;
  do {
   w = c[(c[h >> 2] | 0) + (j << 2) >> 2] | 0;
   f = w + 44 | 0;
   v = c[f + 4 >> 2] | 0;
   t = (c[m >> 2] | 0) + (j * 12 | 0) | 0;
   c[t >> 2] = c[f >> 2];
   c[t + 4 >> 2] = v;
   c[(c[m >> 2] | 0) + (j * 12 | 0) + 8 >> 2] = c[w + 56 >> 2];
   t = w + 64 | 0;
   v = c[t + 4 >> 2] | 0;
   f = (c[l >> 2] | 0) + (j * 12 | 0) | 0;
   c[f >> 2] = c[t >> 2];
   c[f + 4 >> 2] = v;
   f = c[l >> 2] | 0;
   c[f + (j * 12 | 0) + 8 >> 2] = c[w + 72 >> 2];
   j = j + 1 | 0;
  } while ((j | 0) < (c[u >> 2] | 0));
 } else {
  f = a + 24 | 0;
  l = f;
  m = a + 20 | 0;
  f = c[f >> 2] | 0;
 }
 w = a + 12 | 0;
 c[n + 24 >> 2] = c[w >> 2];
 v = a + 36 | 0;
 c[n + 28 >> 2] = c[v >> 2];
 c[n + 40 >> 2] = c[a >> 2];
 c[n >> 2] = c[b >> 2];
 c[n + 4 >> 2] = c[b + 4 >> 2];
 c[n + 8 >> 2] = c[b + 8 >> 2];
 c[n + 12 >> 2] = c[b + 12 >> 2];
 c[n + 16 >> 2] = c[b + 16 >> 2];
 c[n + 20 >> 2] = c[b + 20 >> 2];
 c[n + 32 >> 2] = c[m >> 2];
 c[n + 36 >> 2] = f;
 Sd(x, n);
 f = b + 16 | 0;
 if ((c[f >> 2] | 0) > 0) {
  h = 0;
  do {
   h = h + 1 | 0;
   t = (_d(x, d, e) | 0) ^ 1;
  } while ((h | 0) < (c[f >> 2] | 0) & t);
 }
 t = a + 8 | 0;
 j = (c[m >> 2] | 0) + (d * 12 | 0) | 0;
 f = c[j + 4 >> 2] | 0;
 n = (c[(c[t >> 2] | 0) + (d << 2) >> 2] | 0) + 36 | 0;
 c[n >> 2] = c[j >> 2];
 c[n + 4 >> 2] = f;
 n = c[m >> 2] | 0;
 f = c[t >> 2] | 0;
 c[(c[f + (d << 2) >> 2] | 0) + 52 >> 2] = c[n + (d * 12 | 0) + 8 >> 2];
 n = n + (e * 12 | 0) | 0;
 d = c[n + 4 >> 2] | 0;
 f = (c[f + (e << 2) >> 2] | 0) + 36 | 0;
 c[f >> 2] = c[n >> 2];
 c[f + 4 >> 2] = d;
 c[(c[(c[t >> 2] | 0) + (e << 2) >> 2] | 0) + 52 >> 2] = c[(c[m >> 2] | 0) + (e * 12 | 0) + 8 >> 2];
 Ud(x);
 f = b + 12 | 0;
 if ((c[f >> 2] | 0) > 0) {
  h = 0;
  do {
   Wd(x);
   h = h + 1 | 0;
  } while ((h | 0) < (c[f >> 2] | 0));
 }
 s = +g[b >> 2];
 if ((c[u >> 2] | 0) > 0) {
  e = 0;
  do {
   j = c[m >> 2] | 0;
   n = j + (e * 12 | 0) | 0;
   d = j + (e * 12 | 0) + 4 | 0;
   b = c[l >> 2] | 0;
   h = c[b + (e * 12 | 0) >> 2] | 0;
   f = c[b + (e * 12 | 0) + 4 >> 2] | 0;
   o = +g[b + (e * 12 | 0) + 8 >> 2];
   p = (c[k >> 2] = h, +g[k >> 2]);
   A = s * p;
   r = (c[k >> 2] = f, +g[k >> 2]);
   q = s * r;
   q = A * A + q * q;
   if (q > 4.0) {
    A = 2.0 / +O(+q);
    h = (g[k >> 2] = p * A, c[k >> 2] | 0);
    f = (g[k >> 2] = r * A, c[k >> 2] | 0);
   }
   p = s * o;
   if (p * p > 2.4674012660980225) o = o * (1.5707963705062866 / (p > 0.0 ? p : -p));
   C = s * (c[k >> 2] = h, +g[k >> 2]);
   C = +g[n >> 2] + C;
   B = +g[d >> 2] + s * (c[k >> 2] = f, +g[k >> 2]);
   r = +g[j + (e * 12 | 0) + 8 >> 2] + s * o;
   g[n >> 2] = C;
   g[d >> 2] = B;
   g[(c[m >> 2] | 0) + (e * 12 | 0) + 8 >> 2] = r;
   b = c[l >> 2] | 0;
   c[b + (e * 12 | 0) >> 2] = h;
   c[b + (e * 12 | 0) + 4 >> 2] = f;
   g[(c[l >> 2] | 0) + (e * 12 | 0) + 8 >> 2] = o;
   b = c[(c[t >> 2] | 0) + (e << 2) >> 2] | 0;
   g[b + 44 >> 2] = C;
   g[b + 48 >> 2] = B;
   g[b + 56 >> 2] = r;
   c[b + 64 >> 2] = h;
   c[b + 68 >> 2] = f;
   g[b + 72 >> 2] = o;
   p = +Le(r);
   g[b + 20 >> 2] = p;
   r = +Ke(r);
   g[b + 24 >> 2] = r;
   q = +g[b + 28 >> 2];
   A = +g[b + 32 >> 2];
   g[b + 12 >> 2] = C - (r * q - p * A);
   g[b + 16 >> 2] = B - (p * q + r * A);
   e = e + 1 | 0;
  } while ((e | 0) < (c[u >> 2] | 0));
 }
 d = c[x + 40 >> 2] | 0;
 f = a + 4 | 0;
 if (!(c[f >> 2] | 0)) {
  Td(x);
  i = z;
  return;
 }
 if ((c[v >> 2] | 0) <= 0) {
  Td(x);
  i = z;
  return;
 }
 h = y + 16 | 0;
 m = 0;
 do {
  j = c[(c[w >> 2] | 0) + (m << 2) >> 2] | 0;
  l = c[d + (m * 152 | 0) + 144 >> 2] | 0;
  c[h >> 2] = l;
  if ((l | 0) > 0) {
   n = 0;
   do {
    c[y + (n << 2) >> 2] = c[d + (m * 152 | 0) + (n * 36 | 0) + 16 >> 2];
    c[y + 8 + (n << 2) >> 2] = c[d + (m * 152 | 0) + (n * 36 | 0) + 20 >> 2];
    n = n + 1 | 0;
   } while ((n | 0) != (l | 0));
  }
  a = c[f >> 2] | 0;
  Xa[c[(c[a >> 2] | 0) + 20 >> 2] & 3](a, j, y);
  m = m + 1 | 0;
 } while ((m | 0) < (c[v >> 2] | 0));
 Td(x);
 i = z;
 return;
}

function td(a, b, d, e) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = +e;
 var f = 0, h = 0.0, i = 0, j = 0, k = 0, l = 0, m = 0.0, n = 0.0, o = 0.0, p = 0.0, q = 0.0, r = 0.0, s = 0, t = 0, u = 0, v = 0, w = 0.0, x = 0.0, y = 0.0, z = 0.0, A = 0.0, B = 0.0, C = 0.0, D = 0.0;
 z = 1.0 - e;
 x = z * +g[a + 16 >> 2] + +g[a + 24 >> 2] * e;
 q = z * +g[a + 20 >> 2] + +g[a + 28 >> 2] * e;
 C = z * +g[a + 32 >> 2] + +g[a + 36 >> 2] * e;
 B = +Le(C);
 C = +Ke(C);
 w = +g[a + 8 >> 2];
 D = +g[a + 12 >> 2];
 x = x - (C * w - B * D);
 D = q - (B * w + C * D);
 w = z * +g[a + 52 >> 2] + +g[a + 60 >> 2] * e;
 q = z * +g[a + 56 >> 2] + +g[a + 64 >> 2] * e;
 z = z * +g[a + 68 >> 2] + +g[a + 72 >> 2] * e;
 y = +Le(z);
 z = +Ke(z);
 r = +g[a + 44 >> 2];
 A = +g[a + 48 >> 2];
 w = w - (z * r - y * A);
 A = q - (y * r + z * A);
 switch (c[a + 80 >> 2] | 0) {
 case 0:
  {
   u = a + 92 | 0;
   p = +g[u >> 2];
   v = a + 96 | 0;
   r = +g[v >> 2];
   h = C * p + B * r;
   m = C * r - B * p;
   p = -p;
   r = -r;
   o = z * p + y * r;
   p = z * r - y * p;
   s = c[a >> 2] | 0;
   t = c[s + 16 >> 2] | 0;
   s = s + 20 | 0;
   j = c[s >> 2] | 0;
   if ((j | 0) > 1) {
    f = 0;
    n = h * +g[t >> 2] + m * +g[t + 4 >> 2];
    k = 1;
    while (1) {
     e = h * +g[t + (k << 3) >> 2] + m * +g[t + (k << 3) + 4 >> 2];
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
    i = 0;
    h = o * +g[a >> 2] + p * +g[a + 4 >> 2];
    k = 1;
    while (1) {
     e = o * +g[a + (k << 3) >> 2] + p * +g[a + (k << 3) + 4 >> 2];
     j = e > h;
     i = j ? k : i;
     k = k + 1 | 0;
     if ((k | 0) == (f | 0)) break; else h = j ? e : h;
    }
   } else i = 0;
   c[d >> 2] = i;
   f = c[b >> 2] | 0;
   if ((f | 0) <= -1) ua(5330, 5360, 103, 5391);
   if ((c[s >> 2] | 0) <= (f | 0)) ua(5330, 5360, 103, 5391);
   h = +g[t + (f << 3) >> 2];
   e = +g[t + (f << 3) + 4 >> 2];
   if ((i | 0) <= -1) ua(5330, 5360, 103, 5391);
   if ((c[l >> 2] | 0) <= (i | 0)) ua(5330, 5360, 103, 5391);
   q = +g[a + (i << 3) >> 2];
   r = +g[a + (i << 3) + 4 >> 2];
   D = +g[u >> 2] * (w + (z * q - y * r) - (x + (C * h - B * e))) + +g[v >> 2] * (A + (y * q + z * r) - (D + (B * h + C * e)));
   return +D;
  }
 case 1:
  {
   n = +g[a + 92 >> 2];
   r = +g[a + 96 >> 2];
   q = C * n - B * r;
   r = B * n + C * r;
   n = +g[a + 84 >> 2];
   o = +g[a + 88 >> 2];
   p = x + (C * n - B * o);
   o = D + (B * n + C * o);
   n = -q;
   D = -r;
   m = z * n + y * D;
   n = z * D - y * n;
   c[b >> 2] = -1;
   l = c[a + 4 >> 2] | 0;
   a = c[l + 16 >> 2] | 0;
   l = l + 20 | 0;
   i = c[l >> 2] | 0;
   if ((i | 0) > 1) {
    f = 0;
    h = m * +g[a >> 2] + n * +g[a + 4 >> 2];
    k = 1;
    while (1) {
     e = m * +g[a + (k << 3) >> 2] + n * +g[a + (k << 3) + 4 >> 2];
     j = e > h;
     f = j ? k : f;
     k = k + 1 | 0;
     if ((k | 0) == (i | 0)) break; else h = j ? e : h;
    }
    c[d >> 2] = f;
    if ((f | 0) > -1) t = f; else ua(5330, 5360, 103, 5391);
   } else {
    c[d >> 2] = 0;
    t = 0;
   }
   if ((c[l >> 2] | 0) <= (t | 0)) ua(5330, 5360, 103, 5391);
   C = +g[a + (t << 3) >> 2];
   D = +g[a + (t << 3) + 4 >> 2];
   D = q * (w + (z * C - y * D) - p) + r * (A + (y * C + z * D) - o);
   return +D;
  }
 case 2:
  {
   n = +g[a + 92 >> 2];
   r = +g[a + 96 >> 2];
   q = z * n - y * r;
   r = y * n + z * r;
   n = +g[a + 84 >> 2];
   o = +g[a + 88 >> 2];
   p = w + (z * n - y * o);
   o = A + (y * n + z * o);
   n = -q;
   A = -r;
   m = C * n + B * A;
   n = C * A - B * n;
   c[d >> 2] = -1;
   l = c[a >> 2] | 0;
   a = c[l + 16 >> 2] | 0;
   l = l + 20 | 0;
   i = c[l >> 2] | 0;
   if ((i | 0) > 1) {
    f = 0;
    h = m * +g[a >> 2] + n * +g[a + 4 >> 2];
    k = 1;
    while (1) {
     e = m * +g[a + (k << 3) >> 2] + n * +g[a + (k << 3) + 4 >> 2];
     j = e > h;
     f = j ? k : f;
     k = k + 1 | 0;
     if ((k | 0) == (i | 0)) break; else h = j ? e : h;
    }
    c[b >> 2] = f;
    if ((f | 0) > -1) s = f; else ua(5330, 5360, 103, 5391);
   } else {
    c[b >> 2] = 0;
    s = 0;
   }
   if ((c[l >> 2] | 0) <= (s | 0)) ua(5330, 5360, 103, 5391);
   z = +g[a + (s << 3) >> 2];
   A = +g[a + (s << 3) + 4 >> 2];
   D = q * (x + (C * z - B * A) - p) + r * (D + (B * z + C * A) - o);
   return +D;
  }
 default:
  ua(5401, 5257, 183, 5407);
 }
 return +(0.0);
}

function sd(a, e, f, h, i, j, k) {
 a = a | 0;
 e = e | 0;
 f = f | 0;
 h = h | 0;
 i = i | 0;
 j = j | 0;
 k = +k;
 var l = 0.0, m = 0, n = 0.0, o = 0, p = 0, q = 0, r = 0, s = 0.0, t = 0.0, u = 0.0, v = 0.0, w = 0.0, x = 0.0, y = 0.0, z = 0.0, A = 0.0, B = 0.0, C = 0.0, D = 0.0, E = 0.0;
 c[a >> 2] = f;
 c[a + 4 >> 2] = i;
 r = b[e + 4 >> 1] | 0;
 if ((r + -1 & 65535) >= 2) ua(5307, 5257, 50, 6377);
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
 B = 1.0 - k;
 z = B * +g[a + 16 >> 2] + +g[a + 24 >> 2] * k;
 v = B * +g[a + 20 >> 2] + +g[a + 28 >> 2] * k;
 E = B * +g[a + 32 >> 2] + +g[a + 36 >> 2] * k;
 D = +Le(E);
 E = +Ke(E);
 x = +g[p >> 2];
 C = +g[a + 12 >> 2];
 z = z - (E * x - D * C);
 C = v - (D * x + E * C);
 x = B * +g[a + 52 >> 2] + +g[a + 60 >> 2] * k;
 v = B * +g[a + 56 >> 2] + +g[a + 64 >> 2] * k;
 B = B * +g[a + 68 >> 2] + +g[a + 72 >> 2] * k;
 A = +Le(B);
 B = +Ke(B);
 w = +g[q >> 2];
 y = +g[a + 48 >> 2];
 x = x - (B * w - A * y);
 y = v - (A * w + B * y);
 if (r << 16 >> 16 == 1) {
  c[a + 80 >> 2] = 0;
  j = d[e + 6 >> 0] | 0;
  if ((c[f + 20 >> 2] | 0) <= (j | 0)) ua(5330, 5360, 103, 5391);
  m = c[f + 16 >> 2] | 0;
  h = d[e + 9 >> 0] | 0;
  if ((c[i + 20 >> 2] | 0) <= (h | 0)) ua(5330, 5360, 103, 5391);
  k = +g[m + (j << 3) + 4 >> 2];
  l = +g[m + (j << 3) >> 2];
  m = c[i + 16 >> 2] | 0;
  v = +g[m + (h << 3) >> 2];
  w = +g[m + (h << 3) + 4 >> 2];
  n = x + (B * v - A * w) - (z + (E * l - D * k));
  l = y + (A * v + B * w) - (C + (E * k + D * l));
  m = a + 92 | 0;
  g[m >> 2] = n;
  h = a + 96 | 0;
  g[h >> 2] = l;
  k = +O(+(n * n + l * l));
  if (k < 1.1920928955078125e-07) {
   E = 0.0;
   return +E;
  }
  E = 1.0 / k;
  g[m >> 2] = n * E;
  g[h >> 2] = E * l;
  E = k;
  return +E;
 }
 p = e + 6 | 0;
 r = b[p >> 1] | 0;
 h = a + 80 | 0;
 if ((r & 255) << 24 >> 24 == ((r & 65535) >>> 8 & 255) << 24 >> 24) {
  c[h >> 2] = 2;
  m = d[e + 9 >> 0] | 0;
  h = c[i + 20 >> 2] | 0;
  if ((h | 0) <= (m | 0)) ua(5330, 5360, 103, 5391);
  o = c[i + 16 >> 2] | 0;
  j = d[e + 10 >> 0] | 0;
  if ((h | 0) <= (j | 0)) ua(5330, 5360, 103, 5391);
  w = +g[o + (m << 3) + 4 >> 2];
  t = +g[o + (m << 3) >> 2];
  u = +g[o + (j << 3) >> 2];
  s = +g[o + (j << 3) + 4 >> 2];
  l = u - t;
  k = s - w;
  n = -l;
  m = a + 92 | 0;
  g[m >> 2] = k;
  j = a + 96 | 0;
  g[j >> 2] = n;
  l = +O(+(l * l + k * k));
  if (l < 1.1920928955078125e-07) v = k; else {
   l = 1.0 / l;
   v = k * l;
   g[m >> 2] = v;
   n = l * n;
   g[j >> 2] = n;
  }
  l = (t + u) * .5;
  k = (w + s) * .5;
  g[a + 84 >> 2] = l;
  g[a + 88 >> 2] = k;
  h = d[p >> 0] | 0;
  if ((c[f + 20 >> 2] | 0) <= (h | 0)) ua(5330, 5360, 103, 5391);
  a = c[f + 16 >> 2] | 0;
  u = +g[a + (h << 3) >> 2];
  w = +g[a + (h << 3) + 4 >> 2];
  k = (B * v - A * n) * (z + (E * u - D * w) - (x + (B * l - A * k))) + (A * v + B * n) * (C + (D * u + E * w) - (y + (A * l + B * k)));
  if (!(k < 0.0)) {
   E = k;
   return +E;
  }
  g[m >> 2] = -v;
  g[j >> 2] = -n;
  E = -k;
  return +E;
 } else {
  c[h >> 2] = 1;
  h = b[p >> 1] | 0;
  j = h & 255;
  m = c[f + 20 >> 2] | 0;
  if ((m | 0) <= (j | 0)) ua(5330, 5360, 103, 5391);
  o = (h & 65535) >>> 8 & 65535;
  h = c[f + 16 >> 2] | 0;
  if ((m | 0) <= (o | 0)) ua(5330, 5360, 103, 5391);
  w = +g[h + (j << 3) + 4 >> 2];
  t = +g[h + (j << 3) >> 2];
  u = +g[h + (o << 3) >> 2];
  s = +g[h + (o << 3) + 4 >> 2];
  l = u - t;
  k = s - w;
  n = -l;
  m = a + 92 | 0;
  g[m >> 2] = k;
  j = a + 96 | 0;
  g[j >> 2] = n;
  l = +O(+(l * l + k * k));
  if (l < 1.1920928955078125e-07) v = k; else {
   l = 1.0 / l;
   v = k * l;
   g[m >> 2] = v;
   n = l * n;
   g[j >> 2] = n;
  }
  l = (t + u) * .5;
  k = (w + s) * .5;
  g[a + 84 >> 2] = l;
  g[a + 88 >> 2] = k;
  h = d[e + 9 >> 0] | 0;
  if ((c[i + 20 >> 2] | 0) <= (h | 0)) ua(5330, 5360, 103, 5391);
  a = c[i + 16 >> 2] | 0;
  u = +g[a + (h << 3) >> 2];
  w = +g[a + (h << 3) + 4 >> 2];
  k = (E * v - D * n) * (x + (B * u - A * w) - (z + (E * l - D * k))) + (D * v + E * n) * (y + (A * u + B * w) - (C + (D * l + E * k)));
  if (!(k < 0.0)) {
   E = k;
   return +E;
  }
  g[m >> 2] = -v;
  g[j >> 2] = -n;
  E = -k;
  return +E;
 }
 return 0.0;
}

function nd(a, b) {
 a = a | 0;
 b = b | 0;
 var d = 0, e = 0, f = 0, h = 0, i = 0, j = 0.0, k = 0.0, l = 0.0, m = 0.0, n = 0.0, o = 0.0, p = 0.0, q = 0.0, r = 0.0, s = 0.0, t = 0.0, u = 0.0, v = 0.0, w = 0.0, x = 0.0, y = 0;
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
 u = +g[h + (b * 36 | 0) >> 2];
 v = +g[h + (b * 36 | 0) + 4 >> 2];
 w = +g[h + (b * 36 | 0) + 8 >> 2];
 x = +g[h + (b * 36 | 0) + 12 >> 2];
 e = c[h + (d * 36 | 0) + 24 >> 2] | 0;
 a : do if ((e | 0) == -1) i = d; else while (1) {
  f = c[h + (d * 36 | 0) + 28 >> 2] | 0;
  l = +g[h + (d * 36 | 0) + 8 >> 2];
  k = +g[h + (d * 36 | 0) >> 2];
  j = +g[h + (d * 36 | 0) + 12 >> 2];
  s = +g[h + (d * 36 | 0) + 4 >> 2];
  m = ((l > w ? l : w) - (k < u ? k : u) + ((j > x ? j : x) - (s < v ? s : v))) * 2.0;
  t = m * 2.0;
  s = (m - (l - k + (j - s)) * 2.0) * 2.0;
  j = +g[h + (e * 36 | 0) >> 2];
  k = u < j ? u : j;
  l = +g[h + (e * 36 | 0) + 4 >> 2];
  m = v < l ? v : l;
  n = +g[h + (e * 36 | 0) + 8 >> 2];
  o = w > n ? w : n;
  p = +g[h + (e * 36 | 0) + 12 >> 2];
  q = x > p ? x : p;
  if ((c[h + (e * 36 | 0) + 24 >> 2] | 0) == -1) j = (o - k + (q - m)) * 2.0; else j = (o - k + (q - m)) * 2.0 - (n - j + (p - l)) * 2.0;
  r = s + j;
  k = +g[h + (f * 36 | 0) >> 2];
  l = u < k ? u : k;
  m = +g[h + (f * 36 | 0) + 4 >> 2];
  n = v < m ? v : m;
  o = +g[h + (f * 36 | 0) + 8 >> 2];
  p = w > o ? w : o;
  q = +g[h + (f * 36 | 0) + 12 >> 2];
  j = x > q ? x : q;
  if ((c[h + (f * 36 | 0) + 24 >> 2] | 0) == -1) j = (p - l + (j - n)) * 2.0; else j = (p - l + (j - n)) * 2.0 - (o - k + (q - m)) * 2.0;
  j = s + j;
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
 h = ld(a) | 0;
 d = c[y >> 2] | 0;
 c[d + (h * 36 | 0) + 20 >> 2] = f;
 c[d + (h * 36 | 0) + 16 >> 2] = 0;
 s = +g[d + (i * 36 | 0) >> 2];
 t = +g[d + (i * 36 | 0) + 4 >> 2];
 g[d + (h * 36 | 0) >> 2] = u < s ? u : s;
 g[d + (h * 36 | 0) + 4 >> 2] = v < t ? v : t;
 u = +g[d + (i * 36 | 0) + 8 >> 2];
 v = +g[d + (i * 36 | 0) + 12 >> 2];
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
  d = od(a, d) | 0;
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
  x = +g[e + (f * 36 | 0) >> 2];
  w = +g[e + (h * 36 | 0) >> 2];
  v = +g[e + (f * 36 | 0) + 4 >> 2];
  u = +g[e + (h * 36 | 0) + 4 >> 2];
  g[e + (d * 36 | 0) >> 2] = x < w ? x : w;
  g[e + (d * 36 | 0) + 4 >> 2] = v < u ? v : u;
  u = +g[e + (f * 36 | 0) + 8 >> 2];
  v = +g[e + (h * 36 | 0) + 8 >> 2];
  w = +g[e + (f * 36 | 0) + 12 >> 2];
  x = +g[e + (h * 36 | 0) + 12 >> 2];
  g[e + (d * 36 | 0) + 8 >> 2] = u > v ? u : v;
  g[e + (d * 36 | 0) + 12 >> 2] = w > x ? w : x;
  d = c[(c[y >> 2] | 0) + (d * 36 | 0) + 20 >> 2] | 0;
  if ((d | 0) == -1) {
   d = 24;
   break;
  }
 }
 if ((d | 0) == 20) ua(5120, 4740, 307, 5135); else if ((d | 0) == 22) ua(5146, 4740, 308, 5135); else if ((d | 0) == 24) return;
}
function Sd(b, d) {
 b = b | 0;
 d = d | 0;
 var e = 0.0, f = 0.0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, z = 0;
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
 c[p >> 2] = xd(k, m * 88 | 0) | 0;
 m = b + 40 | 0;
 c[m >> 2] = xd(c[j >> 2] | 0, (c[n >> 2] | 0) * 152 | 0) | 0;
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
 } else ua(6141, 6156, 71, 6200);
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
    e = 0.0;
    f = 0.0;
   } else {
    f = +g[i >> 2];
    e = f * +g[l + 64 + (h * 20 | 0) + 12 >> 2];
    f = f * +g[l + 64 + (h * 20 | 0) + 8 >> 2];
   }
   g[d + (q * 152 | 0) + (h * 36 | 0) + 16 >> 2] = f;
   g[d + (q * 152 | 0) + (h * 36 | 0) + 20 >> 2] = e;
   x = d + (q * 152 | 0) + (h * 36 | 0) | 0;
   g[d + (q * 152 | 0) + (h * 36 | 0) + 24 >> 2] = 0.0;
   g[d + (q * 152 | 0) + (h * 36 | 0) + 28 >> 2] = 0.0;
   g[d + (q * 152 | 0) + (h * 36 | 0) + 32 >> 2] = 0.0;
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
 if ((d | 0) == 3) return; else if ((d | 0) == 4) ua(6141, 6156, 71, 6200);
}

function mb(d, e) {
 d = d | 0;
 e = e | 0;
 var f = 0, h = 0, j = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, z = 0, A = 0, B = 0, C = 0, D = 0, E = 0;
 D = i;
 i = i + 256 | 0;
 h = D;
 A = D + 232 | 0;
 c[A >> 2] = 0;
 B = D + 76 | 0;
 c[B >> 2] = 0;
 m = D + 240 | 0;
 y = D + 80 | 0;
 z = D + 24 | 0;
 j = D + 16 | 0;
 l = D + 8 | 0;
 a : do if ((d | 0) > 1) {
  f = a[c[e + 4 >> 2] >> 0] | 0;
  switch (f | 0) {
  case 51:
   {
    C = 5;
    break a;
   }
  case 49:
   {
    c[B >> 2] = 5;
    c[2368] = 35;
    f = 35;
    h = 5;
    break a;
   }
  case 50:
   {
    c[B >> 2] = 32;
    c[2368] = 161;
    f = 161;
    h = 32;
    break a;
   }
  case 52:
   {
    c[B >> 2] = 320;
    c[2368] = 2331;
    f = 2331;
    h = 320;
    break a;
   }
  case 53:
   {
    c[B >> 2] = 640;
    c[2368] = 5661;
    f = 5661;
    h = 640;
    break a;
   }
  case 48:
   {
    C = 0;
    i = D;
    return C | 0;
   }
  default:
   {
    c[h >> 2] = f + -48;
    Ce(2356, h) | 0;
    C = -1;
    i = D;
    return C | 0;
   }
  }
 } else C = 5; while (0);
 if ((C | 0) == 5) {
  c[B >> 2] = 64;
  c[2368] = 333;
  f = 333;
  h = 64;
 }
 f = f + h | 0;
 c[2368] = f;
 c[B >> 2] = 0;
 c[2370] = of(f << 2) | 0;
 g[m >> 2] = 0.0;
 g[m + 4 >> 2] = -10.0;
 f = mf(103028) | 0;
 mc(f, m);
 c[2369] = f;
 oc(f, 0);
 c[y + 44 >> 2] = 0;
 f = y + 4 | 0;
 c[f >> 2] = 0;
 c[f + 4 >> 2] = 0;
 c[f + 8 >> 2] = 0;
 c[f + 12 >> 2] = 0;
 c[f + 16 >> 2] = 0;
 c[f + 20 >> 2] = 0;
 c[f + 24 >> 2] = 0;
 c[f + 28 >> 2] = 0;
 a[y + 36 >> 0] = 1;
 a[y + 37 >> 0] = 1;
 a[y + 38 >> 0] = 0;
 a[y + 39 >> 0] = 0;
 c[y >> 2] = 0;
 a[y + 40 >> 0] = 1;
 g[y + 48 >> 2] = 1.0;
 f = nc(c[2369] | 0, y) | 0;
 c[z >> 2] = 1392;
 c[z + 4 >> 2] = 1;
 g[z + 8 >> 2] = .009999999776482582;
 h = z + 28 | 0;
 c[h >> 2] = 0;
 c[h + 4 >> 2] = 0;
 c[h + 8 >> 2] = 0;
 c[h + 12 >> 2] = 0;
 b[h + 16 >> 1] = 0;
 g[j >> 2] = -40.0;
 g[j + 4 >> 2] = 0.0;
 g[l >> 2] = 40.0;
 g[l + 4 >> 2] = 0.0;
 wb(z, j, l);
 Pb(f, z, 0.0) | 0;
 c[y >> 2] = 1432;
 c[y + 4 >> 2] = 2;
 g[y + 8 >> 2] = .009999999776482582;
 c[y + 148 >> 2] = 0;
 g[y + 12 >> 2] = 0.0;
 g[y + 16 >> 2] = 0.0;
 Eb(y, .5, .5);
 f = z + 44 | 0;
 h = z + 4 | 0;
 j = z + 36 | 0;
 l = z + 37 | 0;
 m = z + 38 | 0;
 n = z + 39 | 0;
 o = z + 40 | 0;
 p = z + 48 | 0;
 q = z + 4 | 0;
 r = z + 8 | 0;
 s = 0;
 u = -1059061760;
 v = 1061158912;
 while (1) {
  t = s;
  w = u;
  x = v;
  while (1) {
   c[f >> 2] = 0;
   c[h >> 2] = 0;
   c[h + 4 >> 2] = 0;
   c[h + 8 >> 2] = 0;
   c[h + 12 >> 2] = 0;
   c[h + 16 >> 2] = 0;
   c[h + 20 >> 2] = 0;
   c[h + 24 >> 2] = 0;
   c[h + 28 >> 2] = 0;
   a[j >> 0] = 1;
   a[l >> 0] = 1;
   a[m >> 0] = 0;
   a[n >> 0] = 0;
   a[o >> 0] = 1;
   g[p >> 2] = 1.0;
   c[z >> 2] = 2;
   c[q >> 2] = w;
   c[r >> 2] = x;
   E = nc(c[2369] | 0, z) | 0;
   Pb(E, y, 5.0) | 0;
   c[A >> 2] = E;
   w = (g[k >> 2] = (c[k >> 2] = w, +g[k >> 2]) + 1.125, c[k >> 2] | 0);
   t = t + 1 | 0;
   if ((t | 0) >= 40) break; else x = (g[k >> 2] = (c[k >> 2] = x, +g[k >> 2]) + 0.0, c[k >> 2] | 0);
  }
  u = (g[k >> 2] = (c[k >> 2] = u, +g[k >> 2]) + .5625, c[k >> 2] | 0);
  s = s + 1 | 0;
  if ((s | 0) >= 40) break; else v = (g[k >> 2] = (c[k >> 2] = v, +g[k >> 2]) + 1.0, c[k >> 2] | 0);
 }
 if ((c[B >> 2] | 0) > 0) {
  f = 0;
  do {
   rc(c[2369] | 0, .01666666753590107, 3, 3);
   f = f + 1 | 0;
  } while ((f | 0) < (c[B >> 2] | 0));
 }
 if ((d | 0) > 2) {
  E = (a[c[e + 8 >> 2] >> 0] | 0) + -48 | 0;
  c[2372] = E;
  if (!E) C = 19; else {
   De(2475) | 0;
   Ia(3, 60, 1);
  }
 } else {
  c[2372] = 0;
  C = 19;
 }
 if ((C | 0) == 19) while (1) {
  nb();
  if ((c[2371] | 0) > (c[2368] | 0)) break; else C = 19;
 }
 E = 0;
 i = D;
 return E | 0;
}

function Wc(a, b, d, e, f) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 var h = 0.0, i = 0.0, j = 0.0, l = 0.0, m = 0.0, n = 0.0, o = 0.0, p = 0.0, q = 0, r = 0, s = 0, t = 0, u = 0.0, v = 0.0, w = 0.0, x = 0, y = 0;
 x = a + 60 | 0;
 c[x >> 2] = 0;
 y = e + 12 | 0;
 o = +g[f + 12 >> 2];
 u = +g[y >> 2];
 v = +g[f + 8 >> 2];
 p = +g[e + 16 >> 2];
 w = +g[f >> 2] + (o * u - v * p) - +g[d >> 2];
 p = u * v + o * p + +g[f + 4 >> 2] - +g[d + 4 >> 2];
 o = +g[d + 12 >> 2];
 v = +g[d + 8 >> 2];
 u = w * o + p * v;
 v = o * p - w * v;
 w = +g[b + 8 >> 2] + +g[e + 8 >> 2];
 e = c[b + 148 >> 2] | 0;
 do if ((e | 0) > 0) {
  f = 0;
  d = 0;
  i = -3402823466385288598117041.0e14;
  while (1) {
   h = (u - +g[b + 20 + (f << 3) >> 2]) * +g[b + 84 + (f << 3) >> 2] + (v - +g[b + 20 + (f << 3) + 4 >> 2]) * +g[b + 84 + (f << 3) + 4 >> 2];
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
   d = i < 1.1920928955078125e-07;
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
  v = (c[k >> 2] = e, +g[k >> 2]);
  v = v + (c[k >> 2] = r, +g[k >> 2]);
  w = (c[k >> 2] = q, +g[k >> 2]);
  w = (w + (c[k >> 2] = s, +g[k >> 2])) * .5;
  g[a + 48 >> 2] = v * .5;
  g[a + 52 >> 2] = w;
  b = y;
  x = c[b + 4 >> 2] | 0;
  y = a;
  c[y >> 2] = c[b >> 2];
  c[y + 4 >> 2] = x;
  c[a + 16 >> 2] = 0;
  return;
 }
 h = (c[k >> 2] = e, +g[k >> 2]);
 m = u - h;
 j = (c[k >> 2] = q, +g[k >> 2]);
 n = v - j;
 i = (c[k >> 2] = r, +g[k >> 2]);
 l = (c[k >> 2] = s, +g[k >> 2]);
 o = u - i;
 p = v - l;
 if (m * (i - h) + n * (l - j) <= 0.0) {
  h = m * m + n * n;
  if (h > w * w) return;
  c[x >> 2] = 1;
  c[a + 56 >> 2] = 1;
  d = a + 40 | 0;
  g[d >> 2] = m;
  f = a + 44 | 0;
  g[f >> 2] = n;
  h = +O(+h);
  if (!(h < 1.1920928955078125e-07)) {
   w = 1.0 / h;
   g[d >> 2] = m * w;
   g[f >> 2] = n * w;
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
 if (!(o * (h - i) + p * (j - l) <= 0.0)) {
  i = (h + i) * .5;
  h = (j + l) * .5;
  d = b + 84 + (t << 3) | 0;
  if ((u - i) * +g[d >> 2] + (v - h) * +g[b + 84 + (t << 3) + 4 >> 2] > w) return;
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
 h = o * o + p * p;
 if (h > w * w) return;
 c[x >> 2] = 1;
 c[a + 56 >> 2] = 1;
 d = a + 40 | 0;
 g[d >> 2] = o;
 f = a + 44 | 0;
 g[f >> 2] = p;
 h = +O(+h);
 if (!(h < 1.1920928955078125e-07)) {
  w = 1.0 / h;
  g[d >> 2] = o * w;
  g[f >> 2] = p * w;
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

function _d(a, b, d) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 var e = 0.0, f = 0.0, h = 0.0, j = 0, l = 0, m = 0, n = 0, o = 0.0, p = 0.0, q = 0.0, r = 0.0, s = 0.0, t = 0.0, u = 0.0, v = 0.0, w = 0.0, x = 0.0, y = 0.0, z = 0.0, A = 0.0, B = 0.0, C = 0, D = 0.0, E = 0.0, F = 0.0, G = 0.0, H = 0, I = 0.0, J = 0.0, K = 0.0, L = 0, M = 0, N = 0, O = 0, P = 0, Q = 0, R = 0, S = 0, T = 0, U = 0, V = 0, W = 0, X = 0, Y = 0, Z = 0, _ = 0, $ = 0, aa = 0, ba = 0, ca = 0, da = 0.0;
 ca = i;
 i = i + 64 | 0;
 aa = ca + 40 | 0;
 ba = ca + 24 | 0;
 $ = ca;
 Z = a + 48 | 0;
 if ((c[Z >> 2] | 0) <= 0) {
  K = 0.0;
  ba = K >= -.007499999832361937;
  i = ca;
  return ba | 0;
 }
 _ = a + 36 | 0;
 S = a + 24 | 0;
 T = aa + 8 | 0;
 U = aa + 12 | 0;
 V = ba + 8 | 0;
 W = ba + 12 | 0;
 X = aa + 4 | 0;
 L = ba + 4 | 0;
 M = $ + 4 | 0;
 N = $ + 8 | 0;
 O = $ + 12 | 0;
 P = $ + 16 | 0;
 Y = 0;
 e = 0.0;
 do {
  a = c[_ >> 2] | 0;
  C = a + (Y * 88 | 0) | 0;
  Q = c[a + (Y * 88 | 0) + 32 >> 2] | 0;
  R = c[a + (Y * 88 | 0) + 36 >> 2] | 0;
  D = +g[a + (Y * 88 | 0) + 48 >> 2];
  E = +g[a + (Y * 88 | 0) + 52 >> 2];
  F = +g[a + (Y * 88 | 0) + 56 >> 2];
  G = +g[a + (Y * 88 | 0) + 60 >> 2];
  H = c[a + (Y * 88 | 0) + 84 >> 2] | 0;
  if ((Q | 0) == (b | 0) | (Q | 0) == (d | 0)) {
   I = +g[a + (Y * 88 | 0) + 64 >> 2];
   J = +g[a + (Y * 88 | 0) + 40 >> 2];
  } else {
   I = 0.0;
   J = 0.0;
  }
  K = +g[a + (Y * 88 | 0) + 44 >> 2];
  B = +g[a + (Y * 88 | 0) + 68 >> 2];
  n = c[S >> 2] | 0;
  m = c[n + (Q * 12 | 0) >> 2] | 0;
  l = c[n + (Q * 12 | 0) + 4 >> 2] | 0;
  h = +g[n + (Q * 12 | 0) + 8 >> 2];
  j = c[n + (R * 12 | 0) >> 2] | 0;
  a = c[n + (R * 12 | 0) + 4 >> 2] | 0;
  f = +g[n + (R * 12 | 0) + 8 >> 2];
  if ((H | 0) > 0) {
   A = J + K;
   n = 0;
   do {
    w = +Le(h);
    g[T >> 2] = w;
    x = +Ke(h);
    g[U >> 2] = x;
    q = +Le(f);
    g[V >> 2] = q;
    r = +Ke(f);
    g[W >> 2] = r;
    u = (c[k >> 2] = m, +g[k >> 2]);
    v = (c[k >> 2] = l, +g[k >> 2]);
    g[aa >> 2] = u - (D * x - E * w);
    g[X >> 2] = v - (E * x + D * w);
    w = (c[k >> 2] = j, +g[k >> 2]);
    x = (c[k >> 2] = a, +g[k >> 2]);
    g[ba >> 2] = w - (F * r - G * q);
    g[L >> 2] = x - (G * r + F * q);
    Zd($, C, aa, ba, n);
    q = +g[$ >> 2];
    r = +g[M >> 2];
    y = +g[N >> 2];
    z = +g[O >> 2];
    o = +g[P >> 2];
    s = y - u;
    t = z - v;
    y = y - w;
    z = z - x;
    e = e < o ? e : o;
    o = (o + .004999999888241291) * .75;
    o = o < 0.0 ? o : 0.0;
    p = r * s - q * t;
    da = r * y - q * z;
    p = da * (B * da) + (A + p * (I * p));
    if (p > 0.0) o = -(o < -.20000000298023224 ? -.20000000298023224 : o) / p; else o = 0.0;
    da = q * o;
    r = r * o;
    m = (g[k >> 2] = u - J * da, c[k >> 2] | 0);
    l = (g[k >> 2] = v - J * r, c[k >> 2] | 0);
    h = h - I * (s * r - t * da);
    j = (g[k >> 2] = w + K * da, c[k >> 2] | 0);
    a = (g[k >> 2] = x + K * r, c[k >> 2] | 0);
    f = f + B * (y * r - z * da);
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
 ba = e >= -.007499999832361937;
 i = ca;
 return ba | 0;
}

function Hf(a, b, d, e, f) {
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
   f = k >>> ((Af(i | 0) | 0) >>> 0);
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
   p = Af(h | 0) | 0;
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
  k = vf(m | 0, l | 0, -1, -1) | 0;
  d = C;
  j = i;
  i = 0;
  do {
   e = j;
   j = g >>> 31 | j << 1;
   g = i | g << 1;
   e = a << 1 | e >>> 31 | 0;
   n = a >>> 31 | b << 1 | 0;
   sf(k | 0, d | 0, e | 0, n | 0) | 0;
   p = C;
   o = p >> 31 | ((p | 0) < 0 ? -1 : 0) << 1;
   i = o & 1;
   a = sf(e | 0, n | 0, o & m | 0, (((p | 0) < 0 ? -1 : 0) >> 31 | ((p | 0) < 0 ? -1 : 0) << 1) & l | 0) | 0;
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

function Yd(a) {
 a = a | 0;
 var b = 0.0, d = 0.0, e = 0.0, f = 0, h = 0, j = 0, l = 0, m = 0.0, n = 0.0, o = 0.0, p = 0.0, q = 0.0, r = 0.0, s = 0.0, t = 0.0, u = 0.0, v = 0.0, w = 0.0, x = 0.0, y = 0.0, z = 0, A = 0.0, B = 0.0, C = 0.0, D = 0.0, E = 0.0, F = 0.0, G = 0.0, H = 0.0, I = 0, J = 0, K = 0, L = 0, M = 0, N = 0, O = 0, P = 0, Q = 0, R = 0, S = 0, T = 0, U = 0, V = 0, W = 0, X = 0, Y = 0, Z = 0, _ = 0, $ = 0, aa = 0, ba = 0.0;
 aa = i;
 i = i + 64 | 0;
 _ = aa + 40 | 0;
 $ = aa + 24 | 0;
 Z = aa;
 X = a + 48 | 0;
 if ((c[X >> 2] | 0) <= 0) {
  H = 0.0;
  $ = H >= -.014999999664723873;
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
 b = 0.0;
 do {
  I = c[Y >> 2] | 0;
  z = I + (W * 88 | 0) | 0;
  O = c[I + (W * 88 | 0) + 32 >> 2] | 0;
  P = c[I + (W * 88 | 0) + 36 >> 2] | 0;
  A = +g[I + (W * 88 | 0) + 48 >> 2];
  B = +g[I + (W * 88 | 0) + 52 >> 2];
  C = +g[I + (W * 88 | 0) + 40 >> 2];
  D = +g[I + (W * 88 | 0) + 64 >> 2];
  E = +g[I + (W * 88 | 0) + 56 >> 2];
  F = +g[I + (W * 88 | 0) + 60 >> 2];
  G = +g[I + (W * 88 | 0) + 44 >> 2];
  H = +g[I + (W * 88 | 0) + 68 >> 2];
  I = c[I + (W * 88 | 0) + 84 >> 2] | 0;
  j = c[l + (O * 12 | 0) >> 2] | 0;
  h = c[l + (O * 12 | 0) + 4 >> 2] | 0;
  e = +g[l + (O * 12 | 0) + 8 >> 2];
  f = c[l + (P * 12 | 0) >> 2] | 0;
  a = c[l + (P * 12 | 0) + 4 >> 2] | 0;
  d = +g[l + (P * 12 | 0) + 8 >> 2];
  if ((I | 0) > 0) {
   y = C + G;
   l = 0;
   do {
    u = +Le(e);
    g[R >> 2] = u;
    v = +Ke(e);
    g[S >> 2] = v;
    o = +Le(d);
    g[T >> 2] = o;
    p = +Ke(d);
    g[U >> 2] = p;
    s = (c[k >> 2] = j, +g[k >> 2]);
    t = (c[k >> 2] = h, +g[k >> 2]);
    g[_ >> 2] = s - (A * v - B * u);
    g[V >> 2] = t - (B * v + A * u);
    u = (c[k >> 2] = f, +g[k >> 2]);
    v = (c[k >> 2] = a, +g[k >> 2]);
    g[$ >> 2] = u - (E * p - F * o);
    g[J >> 2] = v - (F * p + E * o);
    Zd(Z, z, _, $, l);
    o = +g[Z >> 2];
    p = +g[K >> 2];
    w = +g[L >> 2];
    x = +g[M >> 2];
    m = +g[N >> 2];
    q = w - s;
    r = x - t;
    w = w - u;
    x = x - v;
    b = b < m ? b : m;
    m = (m + .004999999888241291) * .20000000298023224;
    m = m < 0.0 ? m : 0.0;
    n = p * q - o * r;
    ba = p * w - o * x;
    n = ba * (H * ba) + (y + n * (D * n));
    if (n > 0.0) m = -(m < -.20000000298023224 ? -.20000000298023224 : m) / n; else m = 0.0;
    ba = o * m;
    p = p * m;
    j = (g[k >> 2] = s - C * ba, c[k >> 2] | 0);
    h = (g[k >> 2] = t - C * p, c[k >> 2] | 0);
    e = e - D * (q * p - r * ba);
    f = (g[k >> 2] = u + G * ba, c[k >> 2] | 0);
    a = (g[k >> 2] = v + G * p, c[k >> 2] | 0);
    d = d + H * (w * p - x * ba);
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
 $ = b >= -.014999999664723873;
 i = aa;
 return $ | 0;
}

function cd(a, b, d, e, f, h) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = +e;
 f = f | 0;
 h = +h;
 var i = 0.0, j = 0.0, k = 0.0, l = 0.0, m = 0.0, n = 0, o = 0.0, p = 0.0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0.0, w = 0.0;
 u = b + 60 | 0;
 if (!(c[u >> 2] | 0)) return;
 switch (c[b + 56 >> 2] | 0) {
 case 0:
  {
   g[a >> 2] = 1.0;
   n = a + 4 | 0;
   g[n >> 2] = 0.0;
   j = +g[d + 12 >> 2];
   k = +g[b + 48 >> 2];
   i = +g[d + 8 >> 2];
   o = +g[b + 52 >> 2];
   p = +g[d >> 2] + (j * k - i * o);
   o = k * i + j * o + +g[d + 4 >> 2];
   j = +g[f + 12 >> 2];
   i = +g[b >> 2];
   k = +g[f + 8 >> 2];
   l = +g[b + 4 >> 2];
   m = +g[f >> 2] + (j * i - k * l);
   l = i * k + j * l + +g[f + 4 >> 2];
   j = p - m;
   k = o - l;
   if (j * j + k * k > 1.4210854715202004e-14) {
    j = m - p;
    i = l - o;
    g[a >> 2] = j;
    g[n >> 2] = i;
    k = +O(+(j * j + i * i));
    if (!(k < 1.1920928955078125e-07)) {
     k = 1.0 / k;
     j = j * k;
     g[a >> 2] = j;
     i = i * k;
     g[n >> 2] = i;
    }
   } else {
    j = 1.0;
    i = 0.0;
   }
   g[a + 8 >> 2] = (p + j * e + (m - j * h)) * .5;
   g[a + 12 >> 2] = (o + i * e + (l - i * h)) * .5;
   return;
  }
 case 1:
  {
   r = d + 12 | 0;
   p = +g[r >> 2];
   o = +g[b + 40 >> 2];
   s = d + 8 | 0;
   m = +g[s >> 2];
   j = +g[b + 44 >> 2];
   i = p * o - m * j;
   j = o * m + p * j;
   g[a >> 2] = i;
   t = a + 4 | 0;
   g[t >> 2] = j;
   p = +g[r >> 2];
   m = +g[b + 48 >> 2];
   o = +g[s >> 2];
   k = +g[b + 52 >> 2];
   l = +g[d >> 2] + (p * m - o * k);
   k = m * o + p * k + +g[d + 4 >> 2];
   if ((c[u >> 2] | 0) <= 0) return;
   q = f + 12 | 0;
   r = f + 8 | 0;
   s = f + 4 | 0;
   n = 0;
   while (1) {
    p = +g[q >> 2];
    w = +g[b + (n * 20 | 0) >> 2];
    v = +g[r >> 2];
    o = +g[b + (n * 20 | 0) + 4 >> 2];
    m = +g[f >> 2] + (p * w - v * o);
    o = w * v + p * o + +g[s >> 2];
    p = e - (i * (m - l) + (o - k) * j);
    g[a + 8 + (n << 3) >> 2] = (m - i * h + (m + i * p)) * .5;
    g[a + 8 + (n << 3) + 4 >> 2] = (o - j * h + (o + j * p)) * .5;
    n = n + 1 | 0;
    if ((n | 0) >= (c[u >> 2] | 0)) break;
    i = +g[a >> 2];
    j = +g[t >> 2];
   }
   return;
  }
 case 2:
  {
   r = f + 12 | 0;
   w = +g[r >> 2];
   v = +g[b + 40 >> 2];
   s = f + 8 | 0;
   p = +g[s >> 2];
   i = +g[b + 44 >> 2];
   j = w * v - p * i;
   i = v * p + w * i;
   g[a >> 2] = j;
   t = a + 4 | 0;
   g[t >> 2] = i;
   w = +g[r >> 2];
   p = +g[b + 48 >> 2];
   v = +g[s >> 2];
   k = +g[b + 52 >> 2];
   l = +g[f >> 2] + (w * p - v * k);
   k = p * v + w * k + +g[f + 4 >> 2];
   if ((c[u >> 2] | 0) > 0) {
    q = d + 12 | 0;
    r = d + 8 | 0;
    s = d + 4 | 0;
    n = 0;
    do {
     w = +g[q >> 2];
     m = +g[b + (n * 20 | 0) >> 2];
     o = +g[r >> 2];
     v = +g[b + (n * 20 | 0) + 4 >> 2];
     p = +g[d >> 2] + (w * m - o * v);
     v = m * o + w * v + +g[s >> 2];
     w = h - (j * (p - l) + (v - k) * i);
     g[a + 8 + (n << 3) >> 2] = (p - j * e + (p + j * w)) * .5;
     g[a + 8 + (n << 3) + 4 >> 2] = (v - i * e + (v + i * w)) * .5;
     n = n + 1 | 0;
     j = +g[a >> 2];
     i = +g[t >> 2];
    } while ((n | 0) < (c[u >> 2] | 0));
   }
   g[a >> 2] = -j;
   g[t >> 2] = -i;
   return;
  }
 default:
  return;
 }
}

function id(a, e, f, h, i, j) {
 a = a | 0;
 e = e | 0;
 f = f | 0;
 h = h | 0;
 i = i | 0;
 j = j | 0;
 var k = 0, l = 0.0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, z = 0.0, A = 0, B = 0, C = 0.0, D = 0.0, E = 0.0, F = 0.0, G = 0.0, H = 0.0;
 k = b[e + 4 >> 1] | 0;
 if ((k & 65535) >= 4) ua(4628, 4593, 102, 4646);
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
   E = +g[n + (k << 3) + 4 >> 2];
   G = +g[n + (k << 3) >> 2];
   k = c[x >> 2] | 0;
   F = +g[k + (m << 3) >> 2];
   H = +g[k + (m << 3) + 4 >> 2];
   C = +g[o >> 2];
   l = +g[p >> 2];
   D = +g[h >> 2] + (G * C - E * l);
   l = E * C + G * l + +g[q >> 2];
   g[a + (y * 36 | 0) >> 2] = D;
   g[a + (y * 36 | 0) + 4 >> 2] = l;
   G = +g[r >> 2];
   C = +g[s >> 2];
   E = +g[j >> 2] + (F * G - H * C);
   C = H * G + F * C + +g[t >> 2];
   g[a + (y * 36 | 0) + 8 >> 2] = E;
   g[a + (y * 36 | 0) + 12 >> 2] = C;
   g[a + (y * 36 | 0) + 16 >> 2] = E - D;
   g[a + (y * 36 | 0) + 20 >> 2] = C - l;
   g[a + (y * 36 | 0) + 24 >> 2] = 0.0;
   y = y + 1 | 0;
   k = c[B >> 2] | 0;
   if ((y | 0) >= (k | 0)) {
    A = k;
    break a;
   }
  }
  if ((k | 0) == 7) ua(5330, 5360, 103, 5391); else if ((k | 0) == 9) ua(5330, 5360, 103, 5391);
 } while (0);
 if ((A | 0) > 1) {
  l = +g[e >> 2];
  switch (A | 0) {
  case 2:
   {
    H = +g[a + 16 >> 2] - +g[a + 52 >> 2];
    z = +g[a + 20 >> 2] - +g[a + 56 >> 2];
    z = +O(+(H * H + z * z));
    break;
   }
  case 3:
   {
    z = +g[a + 16 >> 2];
    H = +g[a + 20 >> 2];
    z = (+g[a + 52 >> 2] - z) * (+g[a + 92 >> 2] - H) - (+g[a + 56 >> 2] - H) * (+g[a + 88 >> 2] - z);
    break;
   }
  default:
   ua(5401, 4593, 259, 4656);
  }
  if (!(z < l * .5)) if (!(l * 2.0 < z | z < 1.1920928955078125e-07)) return;
  c[B >> 2] = 0;
 } else if (A | 0) return;
 c[a + 28 >> 2] = 0;
 c[a + 32 >> 2] = 0;
 if ((c[f + 20 >> 2] | 0) <= 0) ua(5330, 5360, 103, 5391);
 k = c[f + 16 >> 2] | 0;
 if ((c[i + 20 >> 2] | 0) <= 0) ua(5330, 5360, 103, 5391);
 E = +g[k + 4 >> 2];
 C = +g[k >> 2];
 i = c[i + 16 >> 2] | 0;
 D = +g[i >> 2];
 z = +g[i + 4 >> 2];
 G = +g[h + 12 >> 2];
 H = +g[h + 8 >> 2];
 F = +g[h >> 2] + (C * G - E * H);
 H = E * G + C * H + +g[h + 4 >> 2];
 g[a >> 2] = F;
 g[a + 4 >> 2] = H;
 C = +g[j + 12 >> 2];
 G = +g[j + 8 >> 2];
 E = +g[j >> 2] + (D * C - z * G);
 G = z * C + D * G + +g[j + 4 >> 2];
 g[a + 8 >> 2] = E;
 g[a + 12 >> 2] = G;
 g[a + 16 >> 2] = E - F;
 g[a + 20 >> 2] = G - H;
 c[B >> 2] = 1;
 return;
}

function cc(a, b, d, e, f) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 var g = 0, h = 0, j = 0, k = 0;
 j = i;
 i = i + 16 | 0;
 h = j;
 k = $a[c[f >> 2] & 3](b, a) | 0;
 g = $a[c[f >> 2] & 3](d, b) | 0;
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
  if ($a[c[f >> 2] & 3](d, b) | 0) {
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
  if ($a[c[f >> 2] & 3](b, a) | 0) {
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
 if (!($a[c[f >> 2] & 3](e, d) | 0)) {
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
 if (!($a[c[f >> 2] & 3](d, b) | 0)) {
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
 if (!($a[c[f >> 2] & 3](b, a) | 0)) {
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

function Mb(a) {
 a = a | 0;
 var d = 0.0, e = 0.0, f = 0.0, h = 0, j = 0, l = 0.0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0.0, u = 0.0, v = 0, w = 0, x = 0, y = 0, z = 0.0, A = 0, B = 0, C = 0;
 B = i;
 i = i + 16 | 0;
 q = B;
 r = a + 116 | 0;
 s = a + 120 | 0;
 v = a + 124 | 0;
 w = a + 128 | 0;
 x = a + 28 | 0;
 g[x >> 2] = 0.0;
 y = a + 32 | 0;
 g[y >> 2] = 0.0;
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
    d = 0.0;
    A = 11;
   } else {
    n = q + 4 | 0;
    o = q + 8 | 0;
    p = q + 12 | 0;
    d = 0.0;
    e = 0.0;
    do {
     f = +g[m >> 2];
     if (!(f == 0.0)) {
      C = c[m + 12 >> 2] | 0;
      Za[c[(c[C >> 2] | 0) + 28 >> 2] & 3](C, q, f);
      d = +g[q >> 2];
      e = d + +g[r >> 2];
      g[r >> 2] = e;
      j = (g[k >> 2] = (c[k >> 2] = j, +g[k >> 2]) + d * +g[n >> 2], c[k >> 2] | 0);
      h = (g[k >> 2] = (c[k >> 2] = h, +g[k >> 2]) + d * +g[o >> 2], c[k >> 2] | 0);
      d = +g[p >> 2] + +g[v >> 2];
      g[v >> 2] = d;
     }
     m = c[m + 4 >> 2] | 0;
    } while ((m | 0) != 0);
    if (e > 0.0) {
     f = 1.0 / e;
     g[s >> 2] = f;
     j = (g[k >> 2] = (c[k >> 2] = j, +g[k >> 2]) * f, c[k >> 2] | 0);
     l = e;
     h = (g[k >> 2] = (c[k >> 2] = h, +g[k >> 2]) * f, c[k >> 2] | 0);
    } else A = 11;
   }
   if ((A | 0) == 11) {
    g[r >> 2] = 1.0;
    g[s >> 2] = 1.0;
    l = 1.0;
   }
   do if (d > 0.0) if (!(b[a + 4 >> 1] & 16)) {
    e = (c[k >> 2] = j, +g[k >> 2]);
    f = (c[k >> 2] = h, +g[k >> 2]);
    d = d - (e * e + f * f) * l;
    g[v >> 2] = d;
    if (d > 0.0) {
     t = e;
     u = f;
     z = 1.0 / d;
     break;
    } else ua(3168, 2868, 319, 3154);
   } else A = 17; else A = 17; while (0);
   if ((A | 0) == 17) {
    g[v >> 2] = 0.0;
    t = (c[k >> 2] = j, +g[k >> 2]);
    u = (c[k >> 2] = h, +g[k >> 2]);
    z = 0.0;
   }
   g[w >> 2] = z;
   A = a + 44 | 0;
   z = +g[A >> 2];
   C = a + 48 | 0;
   f = +g[C >> 2];
   c[x >> 2] = j;
   c[y >> 2] = h;
   e = +g[a + 24 >> 2];
   d = +g[a + 20 >> 2];
   l = +g[a + 12 >> 2] + (t * e - d * u);
   t = t * d + e * u + +g[a + 16 >> 2];
   g[A >> 2] = l;
   g[C >> 2] = t;
   g[a + 36 >> 2] = l;
   g[a + 40 >> 2] = t;
   u = +g[a + 72 >> 2];
   C = a + 64 | 0;
   g[C >> 2] = +g[C >> 2] - u * (t - f);
   C = a + 68 | 0;
   g[C >> 2] = u * (l - z) + +g[C >> 2];
   i = B;
   return;
  }
 default:
  ua(3129, 2868, 284, 3154);
 }
}

function Lb(d, e, f) {
 d = d | 0;
 e = e | 0;
 f = f | 0;
 var h = 0.0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0;
 q = e + 4 | 0;
 h = +g[q >> 2];
 if (h != h | 0.0 != 0.0) ua(2845, 2868, 27, 2894);
 if (!(h > -s & h < s)) ua(2845, 2868, 27, 2894);
 h = +g[e + 8 >> 2];
 if (h != h | 0.0 != 0.0) ua(2845, 2868, 27, 2894);
 if (!(h > -s & h < s)) ua(2845, 2868, 27, 2894);
 p = e + 16 | 0;
 h = +g[p >> 2];
 if (h != h | 0.0 != 0.0) ua(2901, 2868, 28, 2894);
 if (!(h > -s & h < s)) ua(2901, 2868, 28, 2894);
 h = +g[e + 20 >> 2];
 if (h != h | 0.0 != 0.0) ua(2901, 2868, 28, 2894);
 if (!(h > -s & h < s)) ua(2901, 2868, 28, 2894);
 o = e + 12 | 0;
 h = +g[o >> 2];
 if (h != h | 0.0 != 0.0) ua(2930, 2868, 29, 2894);
 if (!(h > -s & h < s)) ua(2930, 2868, 29, 2894);
 n = e + 24 | 0;
 h = +g[n >> 2];
 if (h != h | 0.0 != 0.0) ua(2951, 2868, 30, 2894);
 if (!(h > -s & h < s)) ua(2951, 2868, 30, 2894);
 m = e + 32 | 0;
 h = +g[m >> 2];
 if (h != h | 0.0 != 0.0) ua(2982, 2868, 31, 2894);
 if (!(h < s) | !(h > -s) | !(h >= 0.0)) ua(2982, 2868, 31, 2894);
 l = e + 28 | 0;
 h = +g[l >> 2];
 if (h != h | 0.0 != 0.0) ua(3042, 2868, 32, 2894);
 if (!(h < s) | !(h > -s) | !(h >= 0.0)) ua(3042, 2868, 32, 2894);
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
 h = +g[o >> 2];
 g[d + 20 >> 2] = +Le(h);
 g[d + 24 >> 2] = +Ke(h);
 g[d + 28 >> 2] = 0.0;
 g[d + 32 >> 2] = 0.0;
 q = d + 36 | 0;
 c[q >> 2] = k;
 c[q + 4 >> 2] = f;
 q = d + 44 | 0;
 c[q >> 2] = k;
 c[q + 4 >> 2] = f;
 q = c[o >> 2] | 0;
 c[d + 52 >> 2] = q;
 c[d + 56 >> 2] = q;
 g[d + 60 >> 2] = 0.0;
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
 g[d + 76 >> 2] = 0.0;
 g[d + 80 >> 2] = 0.0;
 g[d + 84 >> 2] = 0.0;
 g[d + 144 >> 2] = 0.0;
 f = c[e >> 2] | 0;
 c[d >> 2] = f;
 f = (f | 0) == 2;
 g[d + 116 >> 2] = f ? 1.0 : 0.0;
 g[d + 120 >> 2] = f ? 1.0 : 0.0;
 g[d + 124 >> 2] = 0.0;
 g[d + 128 >> 2] = 0.0;
 c[d + 148 >> 2] = c[e + 44 >> 2];
 c[d + 100 >> 2] = 0;
 c[d + 104 >> 2] = 0;
 return;
}

function Xc(b, d, e, f, h) {
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 h = h | 0;
 var i = 0.0, j = 0.0, l = 0.0, m = 0.0, n = 0.0, o = 0.0, p = 0.0, q = 0.0, r = 0.0, s = 0.0, t = 0.0, u = 0.0, v = 0.0, w = 0.0, x = 0, y = 0, z = 0, A = 0;
 z = b + 60 | 0;
 c[z >> 2] = 0;
 A = f + 12 | 0;
 t = +g[h + 12 >> 2];
 j = +g[A >> 2];
 s = +g[h + 8 >> 2];
 l = +g[f + 16 >> 2];
 v = +g[h >> 2] + (t * j - s * l) - +g[e >> 2];
 l = j * s + t * l + +g[h + 4 >> 2] - +g[e + 4 >> 2];
 t = +g[e + 12 >> 2];
 s = +g[e + 8 >> 2];
 j = v * t + l * s;
 s = t * l - v * s;
 x = c[d + 12 >> 2] | 0;
 y = c[d + 16 >> 2] | 0;
 e = c[d + 20 >> 2] | 0;
 h = c[d + 24 >> 2] | 0;
 v = (c[k >> 2] = e, +g[k >> 2]);
 l = (c[k >> 2] = x, +g[k >> 2]);
 t = v - l;
 w = (c[k >> 2] = h, +g[k >> 2]);
 m = (c[k >> 2] = y, +g[k >> 2]);
 n = w - m;
 o = t * (v - j) + n * (w - s);
 p = j - l;
 q = s - m;
 r = p * t + q * n;
 u = +g[d + 8 >> 2] + +g[f + 8 >> 2];
 if (r <= 0.0) {
  if (p * p + q * q > u * u) return;
  if (a[d + 44 >> 0] | 0) if ((l - j) * (l - +g[d + 28 >> 2]) + (m - s) * (m - +g[d + 32 >> 2]) > 0.0) return;
  c[z >> 2] = 1;
  c[b + 56 >> 2] = 0;
  g[b + 40 >> 2] = 0.0;
  g[b + 44 >> 2] = 0.0;
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
 if (o <= 0.0) {
  j = j - v;
  i = s - w;
  if (j * j + i * i > u * u) return;
  if (a[d + 45 >> 0] | 0) if (j * (+g[d + 36 >> 2] - v) + i * (+g[d + 40 >> 2] - w) > 0.0) return;
  c[z >> 2] = 1;
  c[b + 56 >> 2] = 0;
  g[b + 40 >> 2] = 0.0;
  g[b + 44 >> 2] = 0.0;
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
 i = t * t + n * n;
 if (!(i > 0.0)) ua(4372, 4383, 127, 4417);
 i = 1.0 / i;
 v = j - i * (l * o + v * r);
 w = s - i * (m * o + w * r);
 if (v * v + w * w > u * u) return;
 l = -n;
 d = q * t + p * l < 0.0;
 l = d ? n : l;
 i = d ? -t : t;
 j = +O(+(l * l + i * i));
 if (j < 1.1920928955078125e-07) j = l; else {
  w = 1.0 / j;
  j = l * w;
  i = i * w;
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

function Zd(a, b, d, e, f) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 var h = 0.0, i = 0.0, j = 0.0, k = 0.0, l = 0.0, m = 0.0, n = 0.0, o = 0.0, p = 0.0, q = 0.0, r = 0.0, s = 0, t = 0, u = 0;
 if ((c[b + 84 >> 2] | 0) <= 0) ua(6358, 6156, 617, 6377);
 switch (c[b + 72 >> 2] | 0) {
 case 0:
  {
   k = +g[d + 12 >> 2];
   l = +g[b + 24 >> 2];
   h = +g[d + 8 >> 2];
   m = +g[b + 28 >> 2];
   o = +g[d >> 2] + (k * l - h * m);
   m = l * h + k * m + +g[d + 4 >> 2];
   k = +g[e + 12 >> 2];
   h = +g[b >> 2];
   l = +g[e + 8 >> 2];
   j = +g[b + 4 >> 2];
   n = +g[e >> 2] + (k * h - l * j);
   j = h * l + k * j + +g[e + 4 >> 2];
   k = n - o;
   l = j - m;
   g[a >> 2] = k;
   f = a + 4 | 0;
   g[f >> 2] = l;
   h = +O(+(k * k + l * l));
   if (h < 1.1920928955078125e-07) {
    h = k;
    i = l;
   } else {
    i = 1.0 / h;
    h = k * i;
    g[a >> 2] = h;
    i = l * i;
    g[f >> 2] = i;
   }
   g[a + 8 >> 2] = (o + n) * .5;
   g[a + 12 >> 2] = (m + j) * .5;
   g[a + 16 >> 2] = k * h + l * i - +g[b + 76 >> 2] - +g[b + 80 >> 2];
   return;
  }
 case 1:
  {
   t = d + 12 | 0;
   k = +g[t >> 2];
   j = +g[b + 16 >> 2];
   s = d + 8 | 0;
   i = +g[s >> 2];
   m = +g[b + 20 >> 2];
   h = k * j - i * m;
   m = j * i + k * m;
   g[a >> 2] = h;
   g[a + 4 >> 2] = m;
   k = +g[t >> 2];
   i = +g[b + 24 >> 2];
   j = +g[s >> 2];
   l = +g[b + 28 >> 2];
   p = +g[e + 12 >> 2];
   r = +g[b + (f << 3) >> 2];
   q = +g[e + 8 >> 2];
   o = +g[b + (f << 3) + 4 >> 2];
   n = +g[e >> 2] + (p * r - q * o);
   o = r * q + p * o + +g[e + 4 >> 2];
   g[a + 16 >> 2] = h * (n - (+g[d >> 2] + (k * i - j * l))) + (o - (i * j + k * l + +g[d + 4 >> 2])) * m - +g[b + 76 >> 2] - +g[b + 80 >> 2];
   g[a + 8 >> 2] = n;
   g[a + 12 >> 2] = o;
   return;
  }
 case 2:
  {
   u = e + 12 | 0;
   m = +g[u >> 2];
   l = +g[b + 16 >> 2];
   s = e + 8 | 0;
   k = +g[s >> 2];
   r = +g[b + 20 >> 2];
   q = m * l - k * r;
   r = l * k + m * r;
   g[a >> 2] = q;
   t = a + 4 | 0;
   g[t >> 2] = r;
   m = +g[u >> 2];
   k = +g[b + 24 >> 2];
   l = +g[s >> 2];
   n = +g[b + 28 >> 2];
   j = +g[d + 12 >> 2];
   h = +g[b + (f << 3) >> 2];
   i = +g[d + 8 >> 2];
   p = +g[b + (f << 3) + 4 >> 2];
   o = +g[d >> 2] + (j * h - i * p);
   p = h * i + j * p + +g[d + 4 >> 2];
   g[a + 16 >> 2] = q * (o - (+g[e >> 2] + (m * k - l * n))) + (p - (k * l + m * n + +g[e + 4 >> 2])) * r - +g[b + 76 >> 2] - +g[b + 80 >> 2];
   g[a + 8 >> 2] = o;
   g[a + 12 >> 2] = p;
   g[a >> 2] = -q;
   g[t >> 2] = -r;
   return;
  }
 default:
  return;
 }
}

function dc(a, b, d) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 var e = 0, f = 0, g = 0, h = 0, j = 0, k = 0;
 j = i;
 i = i + 16 | 0;
 h = j;
 e = a + 24 | 0;
 f = a + 12 | 0;
 k = $a[c[d >> 2] & 3](f, a) | 0;
 g = $a[c[d >> 2] & 3](e, f) | 0;
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
  if ($a[c[d >> 2] & 3](e, f) | 0) {
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
  if ($a[c[d >> 2] & 3](f, a) | 0) {
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
  if ($a[c[d >> 2] & 3](f, e) | 0) {
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
    if ($a[c[d >> 2] & 3](h, g) | 0) {
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

function ud(a, b, d, e) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = +e;
 var f = 0, h = 0.0, i = 0.0, j = 0.0, k = 0.0, l = 0.0, m = 0.0, n = 0.0, o = 0.0, p = 0.0, q = 0.0, r = 0.0, s = 0.0, t = 0.0;
 l = 1.0 - e;
 q = l * +g[a + 16 >> 2] + +g[a + 24 >> 2] * e;
 i = l * +g[a + 20 >> 2] + +g[a + 28 >> 2] * e;
 p = l * +g[a + 32 >> 2] + +g[a + 36 >> 2] * e;
 o = +Le(p);
 p = +Ke(p);
 m = +g[a + 8 >> 2];
 r = +g[a + 12 >> 2];
 q = q - (p * m - o * r);
 r = i - (o * m + p * r);
 m = l * +g[a + 52 >> 2] + +g[a + 60 >> 2] * e;
 i = l * +g[a + 56 >> 2] + +g[a + 64 >> 2] * e;
 l = l * +g[a + 68 >> 2] + +g[a + 72 >> 2] * e;
 k = +Le(l);
 l = +Ke(l);
 j = +g[a + 44 >> 2];
 n = +g[a + 48 >> 2];
 m = m - (l * j - k * n);
 n = i - (k * j + l * n);
 switch (c[a + 80 >> 2] | 0) {
 case 0:
  {
   i = +g[a + 92 >> 2];
   j = +g[a + 96 >> 2];
   f = c[a >> 2] | 0;
   if ((b | 0) <= -1) ua(5330, 5360, 103, 5391);
   if ((c[f + 20 >> 2] | 0) <= (b | 0)) ua(5330, 5360, 103, 5391);
   f = c[f + 16 >> 2] | 0;
   h = +g[f + (b << 3) >> 2];
   e = +g[f + (b << 3) + 4 >> 2];
   f = c[a + 4 >> 2] | 0;
   if ((d | 0) <= -1) ua(5330, 5360, 103, 5391);
   if ((c[f + 20 >> 2] | 0) <= (d | 0)) ua(5330, 5360, 103, 5391);
   a = c[f + 16 >> 2] | 0;
   t = +g[a + (d << 3) >> 2];
   s = +g[a + (d << 3) + 4 >> 2];
   r = i * (m + (l * t - k * s) - (q + (p * h - o * e))) + j * (n + (k * t + l * s) - (r + (o * h + p * e)));
   return +r;
  }
 case 1:
  {
   e = +g[a + 92 >> 2];
   h = +g[a + 96 >> 2];
   i = +g[a + 84 >> 2];
   j = +g[a + 88 >> 2];
   f = c[a + 4 >> 2] | 0;
   if ((d | 0) <= -1) ua(5330, 5360, 103, 5391);
   if ((c[f + 20 >> 2] | 0) <= (d | 0)) ua(5330, 5360, 103, 5391);
   a = c[f + 16 >> 2] | 0;
   s = +g[a + (d << 3) >> 2];
   t = +g[a + (d << 3) + 4 >> 2];
   t = (p * e - o * h) * (m + (l * s - k * t) - (q + (p * i - o * j))) + (o * e + p * h) * (n + (k * s + l * t) - (r + (o * i + p * j)));
   return +t;
  }
 case 2:
  {
   e = +g[a + 92 >> 2];
   h = +g[a + 96 >> 2];
   i = +g[a + 84 >> 2];
   j = +g[a + 88 >> 2];
   f = c[a >> 2] | 0;
   if ((b | 0) <= -1) ua(5330, 5360, 103, 5391);
   if ((c[f + 20 >> 2] | 0) <= (b | 0)) ua(5330, 5360, 103, 5391);
   a = c[f + 16 >> 2] | 0;
   s = +g[a + (b << 3) >> 2];
   t = +g[a + (b << 3) + 4 >> 2];
   t = (l * e - k * h) * (q + (p * s - o * t) - (m + (l * i - k * j))) + (k * e + l * h) * (r + (o * s + p * t) - (n + (k * i + l * j)));
   return +t;
  }
 default:
  ua(5401, 5257, 242, 5425);
 }
 return +(0.0);
}

function Ac(d, f) {
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
  l = ed(c[l + 12 >> 2] | 0, c[d + 56 >> 2] | 0, c[h + 12 >> 2] | 0, c[d + 60 >> 2] | 0, j, k) | 0;
  c[d + 124 >> 2] = 0;
  h = q & 1;
 } else {
  bb[c[c[d >> 2] >> 2] & 15](d, m, j, k);
  p = d + 124 | 0;
  l = (c[p >> 2] | 0) > 0;
  a : do if (l) {
   k = c[w + 60 >> 2] | 0;
   if ((k | 0) > 0) o = 0; else {
    h = 0;
    while (1) {
     g[d + 64 + (h * 20 | 0) + 8 >> 2] = 0.0;
     g[d + 64 + (h * 20 | 0) + 12 >> 2] = 0.0;
     h = h + 1 | 0;
     if ((h | 0) >= (c[p >> 2] | 0)) break a;
    }
   }
   do {
    m = d + 64 + (o * 20 | 0) + 8 | 0;
    g[m >> 2] = 0.0;
    n = d + 64 + (o * 20 | 0) + 12 | 0;
    g[n >> 2] = 0.0;
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
    g[s + 144 >> 2] = 0.0;
   }
   j = t + 4 | 0;
   k = e[j >> 1] | 0;
   if (!(k & 2)) {
    b[j >> 1] = k | 2;
    g[t + 144 >> 2] = 0.0;
   }
  }
 }
 j = c[u >> 2] | 0;
 c[u >> 2] = l ? j | 2 : j & -3;
 h = (h | 0) == 0;
 j = (f | 0) != 0;
 k = j & l;
 if (h & k) Va[c[(c[f >> 2] | 0) + 8 >> 2] & 15](f, d);
 if (j & (l ^ 1) & (h ^ 1)) Va[c[(c[f >> 2] | 0) + 12 >> 2] & 15](f, d);
 if (!(k & (v ^ 1))) {
  i = x;
  return;
 }
 Xa[c[(c[f >> 2] | 0) + 16 >> 2] & 3](f, d, w);
 i = x;
 return;
}

function pd(a, b) {
 a = a | 0;
 b = b | 0;
 var d = 0, e = 0, f = 0, h = 0, i = 0, j = 0, k = 0.0, l = 0.0, m = 0.0, n = 0.0;
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
  if ((i | 0) <= -1) ua(4787, 4740, 97, 4826);
  if ((c[a + 12 >> 2] | 0) <= (i | 0)) ua(4787, 4740, 97, 4826);
  d = a + 8 | 0;
  if ((c[d >> 2] | 0) <= 0) ua(4835, 4740, 98, 4826);
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
 if ((i | 0) <= -1) ua(4787, 4740, 97, 4826);
 if ((c[a + 12 >> 2] | 0) <= (i | 0)) ua(4787, 4740, 97, 4826);
 e = a + 8 | 0;
 if ((c[e >> 2] | 0) <= 0) ua(4835, 4740, 98, 4826);
 b = a + 16 | 0;
 c[j >> 2] = c[b >> 2];
 c[h + (i * 36 | 0) + 32 >> 2] = -1;
 c[b >> 2] = i;
 c[e >> 2] = (c[e >> 2] | 0) + -1;
 do {
  j = od(a, d) | 0;
  i = c[f >> 2] | 0;
  b = c[i + (j * 36 | 0) + 24 >> 2] | 0;
  h = c[i + (j * 36 | 0) + 28 >> 2] | 0;
  k = +g[i + (b * 36 | 0) >> 2];
  l = +g[i + (h * 36 | 0) >> 2];
  m = +g[i + (b * 36 | 0) + 4 >> 2];
  n = +g[i + (h * 36 | 0) + 4 >> 2];
  g[i + (j * 36 | 0) >> 2] = k < l ? k : l;
  g[i + (j * 36 | 0) + 4 >> 2] = m < n ? m : n;
  n = +g[i + (b * 36 | 0) + 8 >> 2];
  m = +g[i + (h * 36 | 0) + 8 >> 2];
  l = +g[i + (b * 36 | 0) + 12 >> 2];
  k = +g[i + (h * 36 | 0) + 12 >> 2];
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

function Vd(a) {
 a = a | 0;
 var b = 0.0, d = 0.0, e = 0, f = 0, h = 0, i = 0, j = 0.0, l = 0.0, m = 0, n = 0.0, o = 0.0, p = 0.0, q = 0.0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, z = 0, A = 0, B = 0.0, C = 0.0, D = 0.0;
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
  n = +g[s + (y * 152 | 0) + 120 >> 2];
  o = +g[s + (y * 152 | 0) + 128 >> 2];
  p = +g[s + (y * 152 | 0) + 124 >> 2];
  q = +g[s + (y * 152 | 0) + 132 >> 2];
  r = c[s + (y * 152 | 0) + 144 >> 2] | 0;
  t = f + (w * 12 | 0) | 0;
  h = c[t >> 2] | 0;
  u = f + (w * 12 | 0) + 4 | 0;
  i = c[u >> 2] | 0;
  d = +g[f + (w * 12 | 0) + 8 >> 2];
  e = c[f + (x * 12 | 0) >> 2] | 0;
  a = c[f + (x * 12 | 0) + 4 >> 2] | 0;
  b = +g[f + (x * 12 | 0) + 8 >> 2];
  j = +g[s + (y * 152 | 0) + 72 >> 2];
  l = +g[s + (y * 152 | 0) + 76 >> 2];
  if ((r | 0) > 0) {
   m = 0;
   f = i;
   do {
    D = +g[s + (y * 152 | 0) + (m * 36 | 0) + 16 >> 2];
    B = +g[s + (y * 152 | 0) + (m * 36 | 0) + 20 >> 2];
    C = j * D + l * B;
    B = l * D - j * B;
    d = d - o * (+g[s + (y * 152 | 0) + (m * 36 | 0) >> 2] * B - +g[s + (y * 152 | 0) + (m * 36 | 0) + 4 >> 2] * C);
    h = (g[k >> 2] = (c[k >> 2] = h, +g[k >> 2]) - n * C, c[k >> 2] | 0);
    f = (g[k >> 2] = (c[k >> 2] = f, +g[k >> 2]) - n * B, c[k >> 2] | 0);
    b = b + q * (B * +g[s + (y * 152 | 0) + (m * 36 | 0) + 8 >> 2] - C * +g[s + (y * 152 | 0) + (m * 36 | 0) + 12 >> 2]);
    e = (g[k >> 2] = (c[k >> 2] = e, +g[k >> 2]) + p * C, c[k >> 2] | 0);
    a = (g[k >> 2] = (c[k >> 2] = a, +g[k >> 2]) + p * B, c[k >> 2] | 0);
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

function gd(a) {
 a = a | 0;
 var b = 0, d = 0, e = 0.0, f = 0.0, h = 0.0, i = 0.0, j = 0.0, k = 0.0, l = 0.0, m = 0.0, n = 0.0, o = 0.0, p = 0.0, q = 0.0, r = 0.0, s = 0.0, t = 0.0, u = 0.0, v = 0.0;
 r = +g[a + 16 >> 2];
 p = +g[a + 20 >> 2];
 b = a + 36 | 0;
 o = +g[a + 52 >> 2];
 q = +g[a + 56 >> 2];
 d = a + 72 | 0;
 s = +g[a + 88 >> 2];
 m = +g[a + 92 >> 2];
 u = o - r;
 l = q - p;
 e = r * u + p * l;
 f = o * u + q * l;
 n = s - r;
 t = m - p;
 h = r * n + p * t;
 i = s * n + m * t;
 v = s - o;
 k = m - q;
 j = o * v + q * k;
 k = s * v + m * k;
 n = u * t - l * n;
 l = (o * m - q * s) * n;
 m = (p * s - r * m) * n;
 n = (r * q - p * o) * n;
 if (e >= -0.0 & h >= -0.0) {
  g[a + 24 >> 2] = 1.0;
  c[a + 108 >> 2] = 1;
  return;
 }
 if (f > 0.0 & e < -0.0 & n <= 0.0) {
  v = 1.0 / (f - e);
  g[a + 24 >> 2] = f * v;
  g[a + 60 >> 2] = -(e * v);
  c[a + 108 >> 2] = 2;
  return;
 }
 if (i > 0.0 & h < -0.0 & m <= 0.0) {
  v = 1.0 / (i - h);
  g[a + 24 >> 2] = i * v;
  g[a + 96 >> 2] = -(h * v);
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
 if (f <= 0.0 & j >= -0.0) {
  g[a + 60 >> 2] = 1.0;
  c[a + 108 >> 2] = 1;
  d = a + 36 | 0;
  do {
   c[a >> 2] = c[b >> 2];
   a = a + 4 | 0;
   b = b + 4 | 0;
  } while ((a | 0) < (d | 0));
  return;
 }
 if (i <= 0.0 & k <= 0.0) {
  g[a + 96 >> 2] = 1.0;
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
 if (k > 0.0 & j < -0.0 & l <= 0.0) {
  v = 1.0 / (k - j);
  g[a + 60 >> 2] = k * v;
  g[a + 96 >> 2] = -(j * v);
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
  v = 1.0 / (n + (l + m));
  g[a + 24 >> 2] = l * v;
  g[a + 60 >> 2] = m * v;
  g[a + 96 >> 2] = n * v;
  c[a + 108 >> 2] = 3;
  return;
 }
}

function Zb(a) {
 a = a | 0;
 var d = 0, e = 0, f = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0;
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
   if (!(Qb(i, e) | 0)) {
    m = c[d + 12 >> 2] | 0;
    Yb(a, d);
    d = m;
    break;
   }
   h = c[q >> 2] | 0;
   if (h | 0) if (!(Sa[c[(c[h >> 2] | 0) + 8 >> 2] & 7](h, k, l) | 0)) {
    m = c[d + 12 >> 2] | 0;
    Yb(a, d);
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
   if ((+g[h + (e * 36 | 0) >> 2] - +g[h + (i * 36 | 0) + 8 >> 2] > 0.0 ? 1 : +g[h + (e * 36 | 0) + 4 >> 2] - +g[h + (i * 36 | 0) + 12 >> 2] > 0.0) | +g[h + (i * 36 | 0) >> 2] - +g[h + (e * 36 | 0) + 8 >> 2] > 0.0 | +g[h + (i * 36 | 0) + 4 >> 2] - +g[h + (e * 36 | 0) + 12 >> 2] > 0.0) {
    m = c[d + 12 >> 2] | 0;
    Yb(a, d);
    d = m;
    break;
   } else {
    Ac(d, c[p >> 2] | 0);
    d = c[d + 12 >> 2] | 0;
    break;
   }
  } while (0);
  if (!d) {
   r = 25;
   break;
  }
 }
 if ((r | 0) == 19) ua(5161, 3213, 159, 3247); else if ((r | 0) == 21) ua(5161, 3213, 159, 3247); else if ((r | 0) == 25) return;
}

function ne(a, b, d) {
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

function $b(a, b) {
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
    fc(a, a, (c[k >> 2] | 0) + (e * 36 | 0) | 0);
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
  } else if ((d | 0) == 9) ua(5161, 3213, 159, 3247);
 } else n = 0; while (0);
 c[l >> 2] = 0;
 o = a + 44 | 0;
 l = c[o >> 2] | 0;
 c[m >> 2] = 3;
 bc(l, l + (n * 12 | 0) | 0, m);
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
  hc(b, c[h + (f * 36 | 0) + 16 >> 2] | 0, c[h + (e * 36 | 0) + 16 >> 2] | 0);
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
 if ((d | 0) == 15) ua(5161, 3213, 153, 3258); else if ((d | 0) == 17) ua(5161, 3213, 153, 3258); else if ((d | 0) == 22) {
  i = q;
  return;
 }
}

function hc(a, d, f) {
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
 if (!(Qb(k, l) | 0)) return;
 d = c[a + 68 >> 2] | 0;
 if (d | 0) if (!(Sa[c[(c[d >> 2] | 0) + 8 >> 2] & 7](d, o, p) | 0)) return;
 i = vc(o, n, p, m, c[a + 76 >> 2] | 0) | 0;
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
  g[j + 144 >> 2] = 0.0;
 }
 d = k + 4 | 0;
 f = e[d >> 1] | 0;
 if (!(f & 2)) {
  b[d >> 1] = f | 2;
  g[k + 144 >> 2] = 0.0;
 }
 a = a + 64 | 0;
 c[a >> 2] = (c[a >> 2] | 0) + 1;
 return;
}

function fc(a, b, d) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 var e = 0, f = 0, h = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0;
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
   if (!((+g[d >> 2] - +g[k + (j * 36 | 0) + 8 >> 2] > 0.0 ? 1 : +g[m >> 2] - +g[k + (j * 36 | 0) + 12 >> 2] > 0.0) | +g[k + (j * 36 | 0) >> 2] - +g[n >> 2] > 0.0 | +g[k + (j * 36 | 0) + 4 >> 2] - +g[o >> 2] > 0.0)) {
    f = k + (j * 36 | 0) + 24 | 0;
    if ((c[f >> 2] | 0) == -1) {
     if (!(Uc(b, j) | 0)) break a;
     a = c[p >> 2] | 0;
     break;
    }
    if ((a | 0) == (c[q >> 2] | 0)) {
     c[q >> 2] = a << 1;
     h = Jb(a << 3) | 0;
     c[s >> 2] = h;
     xf(h | 0, e | 0, c[p >> 2] << 2 | 0) | 0;
     if ((e | 0) != (r | 0)) Kb(e);
    }
    h = c[s >> 2] | 0;
    c[h + (c[p >> 2] << 2) >> 2] = c[f >> 2];
    e = (c[p >> 2] | 0) + 1 | 0;
    c[p >> 2] = e;
    a = k + (j * 36 | 0) + 28 | 0;
    if ((e | 0) == (c[q >> 2] | 0)) {
     c[q >> 2] = e << 1;
     k = Jb(e << 3) | 0;
     c[s >> 2] = k;
     xf(k | 0, h | 0, c[p >> 2] << 2 | 0) | 0;
     if ((h | 0) != (r | 0)) Kb(h);
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
 Kb(a);
 c[s >> 2] = 0;
 i = t;
 return;
}

function de(a, b, d) {
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
   h = be(Qa(146, n | 0) | 0) | 0;
  } else {
   Ma(24, a | 0);
   c[m >> 2] = c[k >> 2];
   c[m + 4 >> 2] = e;
   c[m + 8 >> 2] = b;
   h = be(Qa(146, m | 0) | 0) | 0;
   pa(0);
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

function Bb(a, b, d, e, f) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 var h = 0.0, i = 0.0, j = 0.0, k = 0.0, l = 0.0, m = 0.0, n = 0.0, o = 0.0, p = 0.0, q = 0.0, r = 0.0, s = 0.0;
 o = +g[e >> 2];
 m = +g[d >> 2] - o;
 p = +g[e + 4 >> 2];
 n = +g[d + 4 >> 2] - p;
 r = +g[e + 12 >> 2];
 q = +g[e + 8 >> 2];
 l = m * r + n * q;
 m = r * n - m * q;
 o = +g[d + 8 >> 2] - o;
 p = +g[d + 12 >> 2] - p;
 n = r * o + q * p - l;
 o = r * p - q * o - m;
 p = +g[d + 16 >> 2];
 e = c[a + 148 >> 2] | 0;
 a : do if ((e | 0) > 0) {
  d = 0;
  f = -1;
  h = 0.0;
  i = p;
  b : while (1) {
   s = +g[a + 84 + (d << 3) >> 2];
   k = +g[a + 84 + (d << 3) + 4 >> 2];
   j = (+g[a + 20 + (d << 3) >> 2] - l) * s + (+g[a + 20 + (d << 3) + 4 >> 2] - m) * k;
   k = n * s + o * k;
   do if (k == 0.0) {
    if (j < 0.0) {
     f = 0;
     e = 14;
     break b;
    }
   } else {
    if (k < 0.0 & j < h * k) {
     f = d;
     h = j / k;
     break;
    }
    if (k > 0.0 & j < i * k) i = j / k;
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
  h = 0.0;
 } while (0);
 if (!(h >= 0.0) | !(h <= p)) ua(2536, 2580, 249, 2622);
 if ((f | 0) <= -1) {
  a = 0;
  return a | 0;
 }
 g[b + 8 >> 2] = h;
 p = +g[a + 84 + (f << 3) >> 2];
 s = +g[a + 84 + (f << 3) + 4 >> 2];
 g[b >> 2] = r * p - q * s;
 g[b + 4 >> 2] = p * q + r * s;
 a = 1;
 return a | 0;
}

function ad(a, b, d, e, f) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 var h = 0, i = 0.0, j = 0, k = 0.0, l = 0, m = 0.0, n = 0.0, o = 0, p = 0.0, q = 0.0, r = 0.0, s = 0.0, t = 0.0;
 o = c[b + 148 >> 2] | 0;
 r = +g[f + 12 >> 2];
 t = +g[e + 12 >> 2];
 s = +g[f + 8 >> 2];
 q = +g[e + 16 >> 2];
 p = +g[d + 12 >> 2];
 i = +g[b + 12 >> 2];
 k = +g[d + 8 >> 2];
 m = +g[b + 16 >> 2];
 n = +g[f >> 2] + (r * t - s * q) - (+g[d >> 2] + (p * i - k * m));
 m = t * s + r * q + +g[f + 4 >> 2] - (i * k + p * m + +g[d + 4 >> 2]);
 i = p * n + k * m;
 k = p * m - n * k;
 if ((o | 0) > 0) {
  l = 0;
  j = 0;
  n = -3402823466385288598117041.0e14;
  while (1) {
   m = i * +g[b + 84 + (j << 3) >> 2] + k * +g[b + 84 + (j << 3) + 4 >> 2];
   h = m > n;
   l = h ? j : l;
   j = j + 1 | 0;
   if ((j | 0) == (o | 0)) break; else n = h ? m : n;
  }
 } else l = 0;
 k = +bd(b, d, l, e, f);
 j = ((l | 0) > 0 ? l : o) + -1 | 0;
 m = +bd(b, d, j, e, f);
 h = l + 1 | 0;
 h = (h | 0) < (o | 0) ? h : 0;
 i = +bd(b, d, h, e, f);
 if (m > k & m > i) {
  h = j;
  i = m;
  while (1) {
   j = ((h | 0) > 0 ? h : o) + -1 | 0;
   k = +bd(b, d, j, e, f);
   if (k > i) {
    h = j;
    i = k;
   } else break;
  }
  c[a >> 2] = h;
  return +i;
 }
 if (!(i > k)) {
  t = k;
  f = l;
  c[a >> 2] = f;
  return +t;
 }
 while (1) {
  j = h + 1 | 0;
  j = (j | 0) < (o | 0) ? j : 0;
  k = +bd(b, d, j, e, f);
  if (k > i) {
   h = j;
   i = k;
  } else break;
 }
 c[a >> 2] = h;
 return +i;
}

function Zc(a, b) {
 a = a | 0;
 b = b | 0;
 var d = 0, e = 0.0, f = 0.0, h = 0.0, i = 0.0, j = 0.0, k = 0.0, l = 0.0, m = 0.0, n = 0.0, o = 0.0, p = 0, q = 0, r = 0, s = 0, t = 0.0, u = 0.0, v = 0, w = 0, x = 0, y = 0, z = 0.0, A = 0.0;
 c[a >> 2] = 0;
 w = a + 4 | 0;
 c[w >> 2] = -1;
 x = a + 8 | 0;
 g[x >> 2] = -3402823466385288598117041.0e14;
 t = +g[b + 216 >> 2];
 u = +g[b + 212 >> 2];
 v = c[b + 128 >> 2] | 0;
 if ((v | 0) <= 0) return;
 k = +g[b + 164 >> 2];
 l = +g[b + 168 >> 2];
 m = +g[b + 172 >> 2];
 n = +g[b + 176 >> 2];
 o = +g[b + 244 >> 2];
 p = b + 228 | 0;
 q = b + 232 | 0;
 r = b + 236 | 0;
 s = b + 240 | 0;
 j = -3402823466385288598117041.0e14;
 d = 0;
 while (1) {
  f = +g[b + 64 + (d << 3) >> 2];
  h = -f;
  i = -+g[b + 64 + (d << 3) + 4 >> 2];
  A = +g[b + (d << 3) >> 2];
  e = +g[b + (d << 3) + 4 >> 2];
  z = (A - k) * h + (e - l) * i;
  e = (A - m) * h + (e - n) * i;
  e = z < e ? z : e;
  if (e > o) break;
  if (!(t * f + u * i >= 0.0)) if (e > j ? !((h - +g[p >> 2]) * u + (i - +g[q >> 2]) * t < -.03490658849477768) : 0) y = 7; else e = j; else if (e > j ? !((h - +g[r >> 2]) * u + (i - +g[s >> 2]) * t < -.03490658849477768) : 0) y = 7; else e = j;
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

function $e(b, d, e, f, g) {
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
   Ta[c[(c[j >> 2] | 0) + 24 >> 2] & 3](j, d, e, f, g);
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
    _a[c[(c[b >> 2] | 0) + 20 >> 2] & 3](b, d, e, e, 1, g);
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

function rc(b, d, e, f) {
 b = b | 0;
 d = +d;
 e = e | 0;
 f = f | 0;
 var h = 0, j = 0, k = 0, l = 0, m = 0, n = 0;
 n = i;
 i = i + 32 | 0;
 m = n + 25 | 0;
 j = n;
 k = n + 24 | 0;
 l = b + 102868 | 0;
 h = c[l >> 2] | 0;
 if (h & 1) {
  _b(b + 102872 | 0);
  h = c[l >> 2] & -2;
  c[l >> 2] = h;
 }
 c[l >> 2] = h | 2;
 g[j >> 2] = d;
 c[j + 12 >> 2] = e;
 c[j + 16 >> 2] = f;
 e = d > 0.0;
 h = j + 4 | 0;
 g[h >> 2] = e ? 1.0 / d : 0.0;
 f = b + 102988 | 0;
 g[j + 8 >> 2] = +g[f >> 2] * d;
 a[j + 20 >> 0] = a[b + 102992 >> 0] | 0;
 Zb(b + 102872 | 0);
 g[b + 103e3 >> 2] = +Bd(k);
 if ((a[b + 102995 >> 0] | 0) != 0 & e) {
  pc(b, j);
  g[b + 103004 >> 2] = +Bd(k);
  d = +g[j >> 2];
 }
 if ((a[b + 102993 >> 0] | 0) != 0 & d > 0.0) {
  qc(b, j);
  g[b + 103024 >> 2] = +Bd(k);
  d = +g[j >> 2];
 }
 if (d > 0.0) c[f >> 2] = c[h >> 2];
 f = c[l >> 2] | 0;
 if (!(f & 4)) {
  k = f & -3;
  c[l >> 2] = k;
  d = +Bd(m);
  b = b + 102996 | 0;
  g[b >> 2] = d;
  i = n;
  return;
 }
 h = c[b + 102952 >> 2] | 0;
 if (!h) {
  k = f & -3;
  c[l >> 2] = k;
  d = +Bd(m);
  b = b + 102996 | 0;
  g[b >> 2] = d;
  i = n;
  return;
 }
 do {
  g[h + 76 >> 2] = 0.0;
  g[h + 80 >> 2] = 0.0;
  g[h + 84 >> 2] = 0.0;
  h = c[h + 96 >> 2] | 0;
 } while ((h | 0) != 0);
 k = f & -3;
 c[l >> 2] = k;
 d = +Bd(m);
 b = b + 102996 | 0;
 g[b >> 2] = d;
 i = n;
 return;
}

function lc(a, b, d, e) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 var f = 0, h = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, z = 0.0, A = 0.0, B = 0.0, C = 0.0, D = 0;
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
  bb[c[(c[D >> 2] | 0) + 24 >> 2] & 15](D, t, d, c[x >> 2] | 0);
  D = c[k >> 2] | 0;
  bb[c[(c[D >> 2] | 0) + 24 >> 2] & 15](D, u, e, c[x >> 2] | 0);
  x = y + (q * 28 | 0) | 0;
  z = +g[t >> 2];
  A = +g[u >> 2];
  B = +g[l >> 2];
  C = +g[m >> 2];
  g[x >> 2] = z < A ? z : A;
  g[y + (q * 28 | 0) + 4 >> 2] = B < C ? B : C;
  C = +g[n >> 2];
  B = +g[o >> 2];
  A = +g[p >> 2];
  z = +g[a >> 2];
  g[y + (q * 28 | 0) + 8 >> 2] = C > B ? C : B;
  g[y + (q * 28 | 0) + 12 >> 2] = A > z ? A : z;
  z = +g[f >> 2] - +g[h >> 2];
  g[v >> 2] = +g[e >> 2] - +g[d >> 2];
  g[j >> 2] = z;
  Tc(b, c[y + (q * 28 | 0) + 24 >> 2] | 0, x, v);
  q = q + 1 | 0;
 } while ((q | 0) < (c[r >> 2] | 0));
 i = w;
 return;
}

function Cb(a, b, d, e) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 var f = 0, h = 0, i = 0, j = 0.0, l = 0, m = 0, n = 0.0, o = 0.0, p = 0.0, q = 0.0, r = 0.0, s = 0.0, t = 0.0;
 n = +g[d + 12 >> 2];
 r = +g[a + 20 >> 2];
 p = +g[d + 8 >> 2];
 q = +g[a + 24 >> 2];
 o = +g[d >> 2];
 j = +g[d + 4 >> 2];
 e = (g[k >> 2] = o + (n * r - p * q), c[k >> 2] | 0);
 i = (g[k >> 2] = r * p + n * q + j, c[k >> 2] | 0);
 l = c[a + 148 >> 2] | 0;
 if ((l | 0) > 1) {
  m = 1;
  h = e;
  f = i;
  d = e;
  e = i;
  do {
   q = +g[a + 20 + (m << 3) >> 2];
   r = +g[a + 20 + (m << 3) + 4 >> 2];
   s = o + (n * q - p * r);
   r = q * p + n * r + j;
   q = (c[k >> 2] = h, +g[k >> 2]);
   t = (c[k >> 2] = f, +g[k >> 2]);
   h = (g[k >> 2] = q < s ? q : s, c[k >> 2] | 0);
   f = (g[k >> 2] = t < r ? t : r, c[k >> 2] | 0);
   t = (c[k >> 2] = d, +g[k >> 2]);
   q = (c[k >> 2] = e, +g[k >> 2]);
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
 t = +g[a + 8 >> 2];
 r = (c[k >> 2] = h, +g[k >> 2]) - t;
 s = (c[k >> 2] = f, +g[k >> 2]) - t;
 g[b >> 2] = r;
 g[b + 4 >> 2] = s;
 s = (c[k >> 2] = d, +g[k >> 2]) + t;
 t = (c[k >> 2] = e, +g[k >> 2]) + t;
 g[b + 8 >> 2] = s;
 g[b + 12 >> 2] = t;
 return;
}

function Db(a, b, d) {
 a = a | 0;
 b = b | 0;
 d = +d;
 var e = 0.0, f = 0.0, h = 0, i = 0.0, j = 0.0, k = 0.0, l = 0, m = 0, n = 0.0, o = 0.0, p = 0, q = 0, r = 0.0, s = 0.0, t = 0.0, u = 0.0, v = 0.0;
 p = c[a + 148 >> 2] | 0;
 if ((p | 0) > 2) {
  h = 0;
  e = 0.0;
  f = 0.0;
 } else ua(2630, 2580, 306, 2649);
 do {
  e = e + +g[a + 20 + (h << 3) >> 2];
  f = f + +g[a + 20 + (h << 3) + 4 >> 2];
  h = h + 1 | 0;
 } while ((h | 0) < (p | 0));
 n = 1.0 / +(p | 0);
 o = e * n;
 n = f * n;
 h = a + 20 | 0;
 l = a + 24 | 0;
 e = 0.0;
 k = 0.0;
 j = 0.0;
 i = 0.0;
 m = 0;
 do {
  t = +g[a + 20 + (m << 3) >> 2] - o;
  r = +g[a + 20 + (m << 3) + 4 >> 2] - n;
  m = m + 1 | 0;
  q = (m | 0) < (p | 0);
  s = +g[(q ? a + 20 + (m << 3) | 0 : h) >> 2] - o;
  f = +g[(q ? a + 20 + (m << 3) + 4 | 0 : l) >> 2] - n;
  u = t * f - r * s;
  v = u * .5;
  k = k + v;
  v = v * .3333333432674408;
  j = j + (t + s) * v;
  i = i + (r + f) * v;
  e = e + u * .0833333358168602 * (s * s + (t * t + t * s) + (f * f + (r * r + r * f)));
 } while (q);
 f = k * d;
 g[b >> 2] = f;
 if (k > 1.1920928955078125e-07) {
  v = 1.0 / k;
  u = j * v;
  v = i * v;
  s = o + u;
  t = n + v;
  g[b + 4 >> 2] = s;
  g[b + 8 >> 2] = t;
  g[b + 12 >> 2] = e * d + f * (s * s + t * t - (u * u + v * v));
  return;
 } else ua(2661, 2580, 352, 2649);
}

function $d(b, d, e) {
 b = b | 0;
 d = d | 0;
 e = e | 0;
 var f = 0, g = 0, h = 0, i = 0, j = 0;
 if ((e | 0) <= -1) ua(6428, 6388, 89, 6462);
 g = b + 16 | 0;
 if (((c[g >> 2] | 0) + -1 | 0) <= (e | 0)) ua(6428, 6388, 89, 6462);
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

function Hb(b, d) {
 b = b | 0;
 d = d | 0;
 var e = 0, f = 0, g = 0, h = 0, i = 0, j = 0;
 if (!d) {
  j = 0;
  return j | 0;
 }
 if ((d | 0) <= 0) ua(2761, 2710, 104, 5551);
 if ((d | 0) > 640) {
  j = Jb(d) | 0;
  return j | 0;
 }
 j = a[10280 + d >> 0] | 0;
 h = j & 255;
 if ((j & 255) >= 14) ua(2770, 2710, 112, 5551);
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
  d = Jb(d << 3) | 0;
  c[b >> 2] = d;
  xf(d | 0, g | 0, c[i >> 2] << 3 | 0) | 0;
  tf((c[b >> 2] | 0) + (c[i >> 2] << 3) | 0, 0, 1024) | 0;
  Kb(g);
  d = c[i >> 2] | 0;
 }
 e = c[b >> 2] | 0;
 f = Jb(16384) | 0;
 g = e + (d << 3) + 4 | 0;
 c[g >> 2] = f;
 b = c[1464 + (h << 2) >> 2] | 0;
 c[e + (d << 3) >> 2] = b;
 d = 16384 / (b | 0) | 0;
 if ((_(d, b) | 0) >= 16385) ua(2806, 2710, 140, 5551);
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

function Ke(a) {
 a = +a;
 var b = 0, d = 0, e = 0, f = 0, j = 0.0;
 f = i;
 i = i + 16 | 0;
 d = f;
 b = (g[k >> 2] = a, c[k >> 2] | 0) >>> 31;
 j = +N(+a);
 e = (g[k >> 2] = j, c[k >> 2] | 0);
 a : do if (e >>> 0 < 1061752795) if (e >>> 0 < 964689920) a = 1.0; else a = +Fe(a); else {
  if (e >>> 0 < 1081824210) {
   b = (b | 0) != 0;
   if (e >>> 0 > 1075235811) {
    a = -+Fe(a + (b ? 3.141592653589793 : -3.141592653589793));
    break;
   }
   if (b) {
    a = +Ee(a + 1.5707963267948966);
    break;
   } else {
    a = +Ee(1.5707963267948966 - a);
    break;
   }
  }
  if (e >>> 0 < 1088565718) {
   b = (b | 0) != 0;
   if (e >>> 0 > 1085271519) {
    a = +Fe(a + (b ? 6.283185307179586 : -6.283185307179586));
    break;
   }
   if (b) {
    a = +Ee(-a + -4.71238898038469);
    break;
   } else {
    a = +Ee(a + -4.71238898038469);
    break;
   }
  }
  if (e >>> 0 > 2139095039) {
   a = a - a;
   break;
  }
  switch ((Ge(a, d) | 0) & 3 | 0) {
  case 0:
   {
    a = +Fe(+h[d >> 3]);
    break a;
   }
  case 1:
   {
    a = +Ee(-+h[d >> 3]);
    break a;
   }
  case 2:
   {
    a = -+Fe(+h[d >> 3]);
    break a;
   }
  default:
   {
    a = +Ee(+h[d >> 3]);
    break a;
   }
  }
 } while (0);
 i = f;
 return +a;
}

function fd(a, b, d) {
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
   if ((d | 0) <= -1) ua(4556, 4593, 53, 4624);
   f = b + 16 | 0;
   if ((c[f >> 2] | 0) <= (d | 0)) ua(4556, 4593, 53, 4624);
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
  ua(5401, 4593, 81, 4624);
 }
}

function Le(a) {
 a = +a;
 var b = 0, d = 0, e = 0, f = 0, j = 0.0;
 f = i;
 i = i + 16 | 0;
 d = f;
 b = (g[k >> 2] = a, c[k >> 2] | 0) >>> 31;
 j = +N(+a);
 e = (g[k >> 2] = j, c[k >> 2] | 0);
 a : do if (e >>> 0 < 1061752795) {
  if (e >>> 0 >= 964689920) a = +Ee(a);
 } else {
  if (e >>> 0 < 1081824210) {
   b = (b | 0) != 0;
   if (e >>> 0 >= 1075235812) {
    a = +Ee(-(a + (b ? 3.141592653589793 : -3.141592653589793)));
    break;
   }
   if (b) {
    a = -+Fe(a + 1.5707963267948966);
    break;
   } else {
    a = +Fe(a + -1.5707963267948966);
    break;
   }
  }
  if (e >>> 0 < 1088565718) {
   b = (b | 0) != 0;
   if (e >>> 0 >= 1085271520) {
    a = +Ee(a + (b ? 6.283185307179586 : -6.283185307179586));
    break;
   }
   if (b) {
    a = +Fe(a + 4.71238898038469);
    break;
   } else {
    a = -+Fe(a + -4.71238898038469);
    break;
   }
  }
  if (e >>> 0 > 2139095039) {
   a = a - a;
   break;
  }
  switch ((Ge(a, d) | 0) & 3 | 0) {
  case 0:
   {
    a = +Ee(+h[d >> 3]);
    break a;
   }
  case 1:
   {
    a = +Fe(+h[d >> 3]);
    break a;
   }
  case 2:
   {
    a = +Ee(-+h[d >> 3]);
    break a;
   }
  default:
   {
    a = -+Fe(+h[d >> 3]);
    break a;
   }
  }
 } while (0);
 i = f;
 return +a;
}

function tb(a, b, c, d, e) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 e = e | 0;
 var f = 0.0, h = 0.0, i = 0.0, j = 0.0, k = 0.0, l = 0.0, m = 0.0, n = 0.0, o = 0.0, p = 0.0, q = 0.0, r = 0.0, s = 0.0;
 p = +g[d >> 2];
 n = +g[c >> 2] - p;
 r = +g[d + 4 >> 2];
 o = +g[c + 4 >> 2] - r;
 s = +g[d + 12 >> 2];
 q = +g[d + 8 >> 2];
 m = n * s + o * q;
 n = s * o - n * q;
 p = +g[c + 8 >> 2] - p;
 r = +g[c + 12 >> 2] - r;
 o = s * p + q * r - m;
 p = s * r - q * p - n;
 q = +g[a + 12 >> 2];
 r = +g[a + 16 >> 2];
 s = +g[a + 20 >> 2] - q;
 k = +g[a + 24 >> 2] - r;
 h = -s;
 l = s * s + k * k;
 f = +O(+l);
 if (f < 1.1920928955078125e-07) j = k; else {
  i = 1.0 / f;
  j = k * i;
  h = i * h;
 }
 i = (q - m) * j + (r - n) * h;
 f = o * j + p * h;
 if (f == 0.0) {
  b = 0;
  return b | 0;
 }
 f = i / f;
 if (f < 0.0) {
  b = 0;
  return b | 0;
 }
 if (l == 0.0 ? 1 : +g[c + 16 >> 2] < f) {
  b = 0;
  return b | 0;
 }
 s = (s * (m + o * f - q) + k * (n + p * f - r)) / l;
 if (s < 0.0 | s > 1.0) {
  b = 0;
  return b | 0;
 }
 g[b + 8 >> 2] = f;
 if (i > 0.0) {
  g[b >> 2] = -j;
  g[b + 4 >> 2] = -h;
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

function Ye(d, e, f, g) {
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
  _a[c[(c[f >> 2] | 0) + 20 >> 2] & 3](f, q, o, o, 1, 0);
  g = (c[d >> 2] | 0) == 1 ? o : 0;
 } else {
  Ta[c[(c[p >> 2] | 0) + 24 >> 2] & 3](p, q, o, 1, 0);
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

function ld(a) {
 a = a | 0;
 var b = 0, d = 0, e = 0, f = 0, g = 0, h = 0;
 h = a + 16 | 0;
 b = c[h >> 2] | 0;
 if ((b | 0) == -1) {
  d = a + 8 | 0;
  b = c[d >> 2] | 0;
  g = a + 12 | 0;
  if ((b | 0) != (c[g >> 2] | 0)) ua(4710, 4740, 61, 4774);
  f = a + 4 | 0;
  a = c[f >> 2] | 0;
  c[g >> 2] = b << 1;
  b = Jb(b * 72 | 0) | 0;
  c[f >> 2] = b;
  xf(b | 0, a | 0, (c[d >> 2] | 0) * 36 | 0) | 0;
  Kb(a);
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

function je(b, d, e) {
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
 if ((ke(0, d, o, q, r) | 0) < 0) e = -1; else {
  if ((c[b + 76 >> 2] | 0) > -1) m = we(b) | 0; else m = 0;
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
   f = ke(b, d, o, q, r) | 0;
   if (h) {
    Sa[c[b + 36 >> 2] & 7](b, 0, 0) | 0;
    f = (c[k >> 2] | 0) == 0 ? -1 : f;
    c[g >> 2] = h;
    c[e >> 2] = 0;
    c[l >> 2] = 0;
    c[j >> 2] = 0;
    c[k >> 2] = 0;
   }
  } else f = ke(b, d, o, q, r) | 0;
  e = c[b >> 2] | 0;
  c[b >> 2] = e | n;
  if (m | 0) fe(b);
  e = (e & 32 | 0) == 0 ? f : -1;
 }
 i = s;
 return e | 0;
}

function bd(a, b, d, e, f) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 var h = 0, i = 0, j = 0.0, k = 0.0, l = 0.0, m = 0, n = 0, o = 0.0, p = 0.0, q = 0.0, r = 0.0, s = 0.0, t = 0.0, u = 0.0;
 i = c[e + 148 >> 2] | 0;
 if ((d | 0) <= -1) ua(4440, 4483, 32, 4520);
 if ((c[a + 148 >> 2] | 0) <= (d | 0)) ua(4440, 4483, 32, 4520);
 u = +g[b + 12 >> 2];
 s = +g[a + 84 + (d << 3) >> 2];
 p = +g[b + 8 >> 2];
 r = +g[a + 84 + (d << 3) + 4 >> 2];
 q = u * s - p * r;
 r = s * p + u * r;
 s = +g[f + 12 >> 2];
 t = +g[f + 8 >> 2];
 j = s * q + t * r;
 k = s * r - q * t;
 if ((i | 0) > 0) {
  n = 0;
  h = 0;
  o = 3402823466385288598117041.0e14;
  while (1) {
   l = j * +g[e + 20 + (n << 3) >> 2] + k * +g[e + 20 + (n << 3) + 4 >> 2];
   m = l < o;
   h = m ? n : h;
   n = n + 1 | 0;
   if ((n | 0) == (i | 0)) break; else o = m ? l : o;
  }
 } else h = 0;
 l = +g[a + 20 + (d << 3) >> 2];
 o = +g[a + 20 + (d << 3) + 4 >> 2];
 j = +g[e + 20 + (h << 3) >> 2];
 k = +g[e + 20 + (h << 3) + 4 >> 2];
 return +(q * (+g[f >> 2] + (s * j - t * k) - (+g[b >> 2] + (u * l - p * o))) + r * (j * t + s * k + +g[f + 4 >> 2] - (l * p + u * o + +g[b + 4 >> 2])));
}

function vc(b, d, e, f, g) {
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
 if (i >>> 0 >= 4) ua(3682, 3725, 80, 3806);
 if (j >>> 0 >= 4) ua(3763, 3725, 81, 3806);
 h = c[9492 + (i * 48 | 0) + (j * 12 | 0) >> 2] | 0;
 if (!h) {
  f = 0;
  return f | 0;
 }
 if (!(a[9492 + (i * 48 | 0) + (j * 12 | 0) + 8 >> 0] | 0)) {
  f = ab[h & 15](e, f, b, d, g) | 0;
  return f | 0;
 } else {
  f = ab[h & 15](b, d, e, f, g) | 0;
  return f | 0;
 }
 return 0;
}

function Yb(a, b) {
 a = a | 0;
 b = b | 0;
 var d = 0, e = 0, f = 0, g = 0, h = 0;
 g = c[(c[b + 48 >> 2] | 0) + 8 >> 2] | 0;
 h = c[(c[b + 52 >> 2] | 0) + 8 >> 2] | 0;
 d = c[a + 72 >> 2] | 0;
 if (d | 0) if (c[b + 4 >> 2] & 2 | 0) Va[c[(c[d >> 2] | 0) + 12 >> 2] & 15](d, b);
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
  wc(b, h);
  a = a + 64 | 0;
  b = c[a >> 2] | 0;
  b = b + -1 | 0;
  c[a >> 2] = b;
  return;
 }
 c[d >> 2] = f;
 h = a + 76 | 0;
 h = c[h >> 2] | 0;
 wc(b, h);
 a = a + 64 | 0;
 b = c[a >> 2] | 0;
 b = b + -1 | 0;
 c[a >> 2] = b;
 return;
}

function qd(a, b, d, e) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 var f = 0, h = 0, i = 0, j = 0.0, k = 0.0, l = 0.0, m = 0.0, n = 0.0, o = 0.0;
 if ((b | 0) <= -1) ua(5161, 4740, 135, 5228);
 if ((c[a + 12 >> 2] | 0) <= (b | 0)) ua(5161, 4740, 135, 5228);
 i = a + 4 | 0;
 h = c[i >> 2] | 0;
 if ((c[h + (b * 36 | 0) + 24 >> 2] | 0) != -1) ua(5202, 4740, 137, 5228);
 if (!(+g[h + (b * 36 | 0) >> 2] <= +g[d >> 2])) f = d + 4 | 0; else {
  f = d + 4 | 0;
  if (+g[h + (b * 36 | 0) + 4 >> 2] <= +g[f >> 2]) if (+g[d + 8 >> 2] <= +g[h + (b * 36 | 0) + 8 >> 2]) if (+g[d + 12 >> 2] <= +g[h + (b * 36 | 0) + 12 >> 2]) {
   a = 0;
   return a | 0;
  }
 }
 pd(a, b);
 o = +g[d >> 2] + -.10000000149011612;
 n = +g[f >> 2] + -.10000000149011612;
 m = +g[d + 8 >> 2] + .10000000149011612;
 k = +g[d + 12 >> 2] + .10000000149011612;
 l = +g[e >> 2] * 2.0;
 j = +g[e + 4 >> 2] * 2.0;
 h = l < 0.0;
 d = j < 0.0;
 e = c[i >> 2] | 0;
 g[e + (b * 36 | 0) >> 2] = h ? o + l : o;
 g[e + (b * 36 | 0) + 4 >> 2] = d ? n + j : n;
 g[e + (b * 36 | 0) + 8 >> 2] = h ? m : m + l;
 g[e + (b * 36 | 0) + 12 >> 2] = d ? k : k + j;
 nd(a, b);
 a = 1;
 return a | 0;
}

function qe(b, d, e) {
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

function dd(b, d, e, f, h) {
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = +f;
 h = h | 0;
 var i = 0, j = 0, k = 0, l = 0.0, m = 0.0, n = 0.0, o = 0;
 n = +g[e >> 2];
 m = +g[e + 4 >> 2];
 k = d + 4 | 0;
 l = n * +g[d >> 2] + m * +g[k >> 2] - f;
 i = d + 12 | 0;
 j = d + 16 | 0;
 f = n * +g[i >> 2] + m * +g[j >> 2] - f;
 if (!(l <= 0.0)) e = 0; else {
  c[b >> 2] = c[d >> 2];
  c[b + 4 >> 2] = c[d + 4 >> 2];
  c[b + 8 >> 2] = c[d + 8 >> 2];
  e = 1;
 }
 if (f <= 0.0) {
  o = b + (e * 12 | 0) | 0;
  c[o >> 2] = c[i >> 2];
  c[o + 4 >> 2] = c[i + 4 >> 2];
  c[o + 8 >> 2] = c[i + 8 >> 2];
  e = e + 1 | 0;
 }
 if (!(l * f < 0.0)) {
  o = e;
  return o | 0;
 }
 l = l / (l - f);
 m = +g[d >> 2];
 n = +g[k >> 2];
 n = n + l * (+g[j >> 2] - n);
 g[b + (e * 12 | 0) >> 2] = m + l * (+g[i >> 2] - m);
 g[b + (e * 12 | 0) + 4 >> 2] = n;
 o = b + (e * 12 | 0) + 8 | 0;
 a[o >> 0] = h;
 a[o + 1 >> 0] = a[d + 8 + 1 >> 0] | 0;
 a[o + 2 >> 0] = 0;
 a[o + 3 >> 0] = 1;
 o = e + 1 | 0;
 return o | 0;
}

function jc(d, e, f, g) {
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
 h = $a[c[(c[h >> 2] | 0) + 8 >> 2] & 3](h, e) | 0;
 c[d + 12 >> 2] = h;
 h = Wa[c[(c[h >> 2] | 0) + 12 >> 2] & 7](h) | 0;
 f = Hb(e, h * 28 | 0) | 0;
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

function Vc(a, b, d, e, f) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 var h = 0, i = 0, j = 0, k = 0.0, l = 0.0, m = 0.0, n = 0.0, o = 0.0, p = 0.0, q = 0.0, r = 0.0, s = 0.0;
 h = a + 60 | 0;
 c[h >> 2] = 0;
 i = b + 12 | 0;
 k = +g[d + 12 >> 2];
 o = +g[i >> 2];
 n = +g[d + 8 >> 2];
 l = +g[b + 16 >> 2];
 j = e + 12 | 0;
 q = +g[f + 12 >> 2];
 s = +g[j >> 2];
 r = +g[f + 8 >> 2];
 p = +g[e + 16 >> 2];
 m = +g[f >> 2] + (q * s - r * p) - (+g[d >> 2] + (k * o - n * l));
 l = s * r + q * p + +g[f + 4 >> 2] - (o * n + k * l + +g[d + 4 >> 2]);
 k = +g[b + 8 >> 2] + +g[e + 8 >> 2];
 if (m * m + l * l > k * k) return;
 c[a + 56 >> 2] = 0;
 f = i;
 d = c[f + 4 >> 2] | 0;
 e = a + 48 | 0;
 c[e >> 2] = c[f >> 2];
 c[e + 4 >> 2] = d;
 g[a + 40 >> 2] = 0.0;
 g[a + 44 >> 2] = 0.0;
 c[h >> 2] = 1;
 e = j;
 d = c[e + 4 >> 2] | 0;
 f = a;
 c[f >> 2] = c[e >> 2];
 c[f + 4 >> 2] = d;
 c[a + 16 >> 2] = 0;
 return;
}

function Me() {
 var a = 0, b = 0, d = 0, e = 0, f = 0, g = 0, h = 0, j = 0;
 f = i;
 i = i + 48 | 0;
 h = f + 32 | 0;
 e = f + 24 | 0;
 j = f + 16 | 0;
 g = f;
 f = f + 36 | 0;
 a = Ne() | 0;
 if (a | 0) {
  d = c[a >> 2] | 0;
  if (d | 0) {
   a = d + 48 | 0;
   b = c[a >> 2] | 0;
   a = c[a + 4 >> 2] | 0;
   if (!((b & -256 | 0) == 1126902528 & (a | 0) == 1129074247)) {
    c[e >> 2] = 9183;
    Qe(9278, e);
   }
   if ((b | 0) == 1126902529 & (a | 0) == 1129074247) a = c[d + 44 >> 2] | 0; else a = d + 80 | 0;
   c[f >> 2] = a;
   e = c[d >> 2] | 0;
   a = c[e + 4 >> 2] | 0;
   if (Sa[c[(c[316] | 0) + 16 >> 2] & 7](1264, e, f) | 0) {
    j = c[f >> 2] | 0;
    j = Wa[c[(c[j >> 2] | 0) + 8 >> 2] & 7](j) | 0;
    c[g >> 2] = 9183;
    c[g + 4 >> 2] = a;
    c[g + 8 >> 2] = j;
    Qe(9192, g);
   } else {
    c[j >> 2] = 9183;
    c[j + 4 >> 2] = a;
    Qe(9237, j);
   }
  }
 }
 Qe(9316, h);
}

function le(b, d, e) {
 b = b | 0;
 d = d | 0;
 e = e | 0;
 var f = 0, g = 0, h = 0, i = 0;
 f = e + 16 | 0;
 g = c[f >> 2] | 0;
 if (!g) if (!(me(e) | 0)) {
  g = c[f >> 2] | 0;
  h = 5;
 } else f = 0; else h = 5;
 a : do if ((h | 0) == 5) {
  i = e + 20 | 0;
  f = c[i >> 2] | 0;
  h = f;
  if ((g - f | 0) >>> 0 < d >>> 0) {
   f = Sa[c[e + 36 >> 2] & 7](e, b, d) | 0;
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
   if ((Sa[c[e + 36 >> 2] & 7](e, b, f) | 0) >>> 0 < f >>> 0) break a;
   d = d - f | 0;
   b = b + f | 0;
   g = c[i >> 2] | 0;
  } else {
   g = h;
   f = 0;
  } while (0);
  xf(g | 0, b | 0, d | 0) | 0;
  c[i >> 2] = (c[i >> 2] | 0) + d;
  f = f + d | 0;
 } while (0);
 return f | 0;
}

function Ge(a, b) {
 a = +a;
 b = b | 0;
 var d = 0, e = 0, f = 0, j = 0, l = 0, m = 0.0, n = 0;
 l = i;
 i = i + 16 | 0;
 e = l + 8 | 0;
 f = l;
 j = (g[k >> 2] = a, c[k >> 2] | 0);
 m = +N(+a);
 d = (g[k >> 2] = m, c[k >> 2] | 0);
 do if (d >>> 0 < 1305022427) {
  m = a * .6366197723675814 + 6755399441055744.0 + -6755399441055744.0;
  h[b >> 3] = a - m * 1.5707963109016418 - m * 1.5893254773528196e-08;
  d = ~~m;
 } else {
  if (d >>> 0 > 2139095039) {
   h[b >> 3] = a - a;
   d = 0;
   break;
  }
  n = (d >>> 23) + -150 | 0;
  h[e >> 3] = (c[k >> 2] = d - (n << 23), +g[k >> 2]);
  d = He(e, f, n, 1, 0) | 0;
  a = +h[f >> 3];
  if ((j | 0) < 0) {
   h[b >> 3] = -a;
   d = 0 - d | 0;
   break;
  } else {
   h[b >> 3] = a;
   break;
  }
 } while (0);
 i = l;
 return d | 0;
}

function ed(d, e, f, h, j, k) {
 d = d | 0;
 e = e | 0;
 f = f | 0;
 h = h | 0;
 j = j | 0;
 k = k | 0;
 var l = 0, m = 0, n = 0, o = 0;
 m = i;
 i = i + 128 | 0;
 n = m + 36 | 0;
 o = m + 24 | 0;
 l = m;
 c[n + 16 >> 2] = 0;
 c[n + 20 >> 2] = 0;
 g[n + 24 >> 2] = 0.0;
 c[n + 44 >> 2] = 0;
 c[n + 48 >> 2] = 0;
 g[n + 52 >> 2] = 0.0;
 fd(n, d, e);
 fd(n + 28 | 0, f, h);
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
 hd(l, o, n);
 i = m;
 return +g[l + 16 >> 2] < 1.1920928955078125e-06 | 0;
}

function wc(d, f) {
 d = d | 0;
 f = f | 0;
 var h = 0, i = 0, j = 0, k = 0, l = 0;
 if (!(a[10922] | 0)) ua(3813, 3725, 103, 3835);
 l = c[d + 48 >> 2] | 0;
 if ((c[d + 124 >> 2] | 0) > 0) {
  i = c[l + 8 >> 2] | 0;
  j = i + 4 | 0;
  h = e[j >> 1] | 0;
  if (!(h & 2)) {
   b[j >> 1] = h | 2;
   g[i + 144 >> 2] = 0.0;
  }
  h = c[d + 52 >> 2] | 0;
  i = c[h + 8 >> 2] | 0;
  j = i + 4 | 0;
  k = e[j >> 1] | 0;
  if (!(k & 2)) {
   b[j >> 1] = k | 2;
   g[i + 144 >> 2] = 0.0;
  }
 } else h = c[d + 52 >> 2] | 0;
 i = c[(c[l + 12 >> 2] | 0) + 4 >> 2] | 0;
 h = c[(c[h + 12 >> 2] | 0) + 4 >> 2] | 0;
 if ((i | 0) > -1 & (h | 0) < 4) {
  Va[c[9492 + (i * 48 | 0) + (h * 12 | 0) + 4 >> 2] & 15](d, f);
  return;
 } else ua(3843, 3725, 114, 3835);
}

function mc(b, d) {
 b = b | 0;
 d = d | 0;
 var e = 0, f = 0;
 Fb(b);
 vd(b + 68 | 0);
 Xb(b + 102872 | 0);
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
 g[b + 102988 >> 2] = 0.0;
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

function nb() {
 var a = 0, b = 0, d = 0, e = 0, f = 0.0, j = 0.0, k = 0.0;
 e = i;
 i = i + 48 | 0;
 d = e;
 b = e + 32 | 0;
 a = c[2371] | 0;
 if ((a | 0) >= (c[2368] | 0)) {
  c[2371] = a + 1;
  lb(b, c[2370] | 0);
  k = +g[b + 4 >> 2];
  j = +(c[344] | 0) / 1.0e6 * 1.0e3;
  f = +(c[345] | 0) / 1.0e6 * 1.0e3;
  h[d >> 3] = +g[b >> 2];
  h[d + 8 >> 3] = k;
  h[d + 16 >> 3] = j;
  h[d + 24 >> 3] = f;
  Ce(2368, d) | 0;
  qa(2420);
  if (c[2372] | 0) Na();
  i = e;
  return;
 }
 a = Ea() | 0;
 rc(c[2369] | 0, .01666666753590107, 3, 3);
 a = (Ea() | 0) - a | 0;
 b = c[2371] | 0;
 c[(c[2370] | 0) + (b << 2) >> 2] = a;
 if ((a | 0) < (c[344] | 0)) c[344] = a;
 if ((a | 0) > (c[345] | 0)) c[345] = a;
 c[2371] = b + 1;
 i = e;
 return;
}

function te(b, d, e) {
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
   c[(ce() | 0) >> 2] = 84;
   b = -1;
   break;
  }
 } while (0);
 return b | 0;
}

function qb(a, d) {
 a = a | 0;
 d = d | 0;
 var e = 0, f = 0, h = 0;
 d = Hb(d, 48) | 0;
 c[d >> 2] = 1392;
 e = d + 4 | 0;
 c[e >> 2] = 1;
 g[d + 8 >> 2] = .009999999776482582;
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

function lb(a, b) {
 a = a | 0;
 b = b | 0;
 var d = 0.0, e = 0.0, f = 0, h = 0.0, j = 0, k = 0, l = 0, m = 0, n = 0.0;
 m = i;
 k = c[2368] | 0;
 l = i;
 i = i + ((1 * (k << 2) | 0) + 15 & -16) | 0;
 j = (k | 0) > 0;
 if (j) {
  f = 0;
  d = 0.0;
  do {
   h = +(c[b + (f << 2) >> 2] | 0) / 1.0e6 * 1.0e3;
   g[l + (f << 2) >> 2] = h;
   d = d + h;
   f = f + 1 | 0;
  } while ((f | 0) < (k | 0));
  e = +(k | 0);
  h = d / e;
  g[a >> 2] = h;
  if (j) {
   f = 0;
   d = 0.0;
   do {
    n = +g[l + (f << 2) >> 2] - h;
    d = d + n * n;
    f = f + 1 | 0;
   } while ((f | 0) < (k | 0));
  } else d = 0.0;
 } else {
  e = +(k | 0);
  g[a >> 2] = 0.0 / e;
  d = 0.0;
 }
 g[a + 4 >> 2] = +O(+(d / e));
 i = m;
 return;
}

function xd(b, d) {
 b = b | 0;
 d = d | 0;
 var e = 0, f = 0, g = 0, h = 0, i = 0;
 i = b + 102796 | 0;
 f = c[i >> 2] | 0;
 if ((f | 0) >= 32) ua(5517, 5447, 38, 5551);
 e = b + 102412 + (f * 12 | 0) | 0;
 c[b + 102412 + (f * 12 | 0) + 4 >> 2] = d;
 g = b + 102400 | 0;
 h = c[g >> 2] | 0;
 if ((h + d | 0) > 102400) {
  c[e >> 2] = Jb(d) | 0;
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

function ye(b, d) {
 b = b | 0;
 d = d | 0;
 var e = 0, f = 0, g = 0;
 if ((c[d + 76 >> 2] | 0) < 0) g = 3; else if (!(we(d) | 0)) g = 3; else {
  if ((a[d + 75 >> 0] | 0) == (b | 0)) g = 10; else {
   e = d + 20 | 0;
   f = c[e >> 2] | 0;
   if (f >>> 0 < (c[d + 16 >> 2] | 0) >>> 0) {
    c[e >> 2] = f + 1;
    a[f >> 0] = b;
    e = b & 255;
   } else g = 10;
  }
  if ((g | 0) == 10) e = ze(d, b) | 0;
  fe(d);
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
  e = ze(d, b) | 0;
 } while (0);
 return e | 0;
}

function _e(b, d, e, f, g) {
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

function jd(a) {
 a = a | 0;
 var b = 0, d = 0, e = 0, f = 0, g = 0;
 c[a >> 2] = -1;
 f = a + 12 | 0;
 c[f >> 2] = 16;
 c[a + 8 >> 2] = 0;
 e = Jb(576) | 0;
 g = a + 4 | 0;
 c[g >> 2] = e;
 tf(e | 0, 0, (c[f >> 2] | 0) * 36 | 0) | 0;
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

function Ob(a, d) {
 a = a | 0;
 d = d | 0;
 var e = 0, f = 0, h = 0;
 e = a + 88 | 0;
 f = c[e >> 2] | 0;
 if (c[f + 102868 >> 2] & 2 | 0) ua(3100, 2868, 153, 3179);
 h = Hb(f, 44) | 0;
 ic(h);
 jc(h, f, a, d);
 if (b[a + 4 >> 1] & 32) kc(h, (c[e >> 2] | 0) + 102872 | 0, a + 12 | 0);
 d = a + 100 | 0;
 c[h + 4 >> 2] = c[d >> 2];
 c[d >> 2] = h;
 d = a + 104 | 0;
 c[d >> 2] = (c[d >> 2] | 0) + 1;
 c[h + 8 >> 2] = a;
 if (!(+g[h >> 2] > 0.0)) {
  a = c[e >> 2] | 0;
  a = a + 102868 | 0;
  d = c[a >> 2] | 0;
  d = d | 1;
  c[a >> 2] = d;
  return h | 0;
 }
 Mb(a);
 a = c[e >> 2] | 0;
 a = a + 102868 | 0;
 d = c[a >> 2] | 0;
 d = d | 1;
 c[a >> 2] = d;
 return h | 0;
}

function ef(b, d, e, f, g) {
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

function Ab(a, b, d) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 var e = 0.0, f = 0.0, h = 0.0, i = 0.0, j = 0.0;
 h = +g[d >> 2] - +g[b >> 2];
 i = +g[d + 4 >> 2] - +g[b + 4 >> 2];
 j = +g[b + 12 >> 2];
 f = +g[b + 8 >> 2];
 e = h * j + i * f;
 f = j * i - h * f;
 d = c[a + 148 >> 2] | 0;
 if ((d | 0) > 0) b = 0; else {
  a = 1;
  return a | 0;
 }
 while (1) {
  if ((e - +g[a + 20 + (b << 3) >> 2]) * +g[a + 84 + (b << 3) >> 2] + (f - +g[a + 20 + (b << 3) + 4 >> 2]) * +g[a + 84 + (b << 3) + 4 >> 2] > 0.0) {
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

function kc(a, b, d) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 var e = 0, f = 0, g = 0, h = 0, i = 0, j = 0, k = 0;
 e = a + 28 | 0;
 if (c[e >> 2] | 0) ua(3270, 3288, 124, 3317);
 g = a + 12 | 0;
 h = c[g >> 2] | 0;
 h = Wa[c[(c[h >> 2] | 0) + 12 >> 2] & 7](h) | 0;
 c[e >> 2] = h;
 if ((h | 0) <= 0) return;
 f = a + 24 | 0;
 h = 0;
 do {
  i = c[f >> 2] | 0;
  j = i + (h * 28 | 0) | 0;
  k = c[g >> 2] | 0;
  bb[c[(c[k >> 2] | 0) + 24 >> 2] & 15](k, j, d, h);
  c[i + (h * 28 | 0) + 24 >> 2] = Sc(b, j, j) | 0;
  c[i + (h * 28 | 0) + 16 >> 2] = a;
  c[i + (h * 28 | 0) + 20 >> 2] = h;
  h = h + 1 | 0;
 } while ((h | 0) < (c[e >> 2] | 0));
 return;
}

function Fb(b) {
 b = b | 0;
 var d = 0, e = 0, f = 0, g = 0;
 d = b + 8 | 0;
 c[d >> 2] = 128;
 c[b + 4 >> 2] = 0;
 f = Jb(1024) | 0;
 c[b >> 2] = f;
 tf(f | 0, 0, c[d >> 2] << 3 | 0) | 0;
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
 if ((g | 0) == 4) ua(2692, 2710, 73, 2744);
 a[10921] = 1;
 return;
}

function Xe(a, b, d) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 var e = 0, f = 0, g = 0, h = 0;
 h = i;
 i = i + 64 | 0;
 g = h;
 if ((a | 0) == (b | 0)) b = 1; else if (!b) b = 0; else {
  b = Ye(b, 1304, 1272, 0) | 0;
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
   bb[c[(c[b >> 2] | 0) + 28 >> 2] & 15](b, g, c[d >> 2] | 0, 1);
   if ((c[g + 24 >> 2] | 0) == 1) {
    c[d >> 2] = c[g + 16 >> 2];
    b = 1;
   } else b = 0;
  }
 }
 i = h;
 return b | 0;
}

function Xd(a) {
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

function re(a, b, d, e, f) {
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
  tf(h | 0, b | 0, (f >>> 0 > 256 ? 256 : f) | 0) | 0;
  b = c[a >> 2] | 0;
  g = (b & 32 | 0) == 0;
  if (f >>> 0 > 255) {
   e = d - e | 0;
   do {
    if (g) {
     le(h, 256, a) | 0;
     b = c[a >> 2] | 0;
    }
    f = f + -256 | 0;
    g = (b & 32 | 0) == 0;
   } while (f >>> 0 > 255);
   if (g) f = e & 255; else break;
  } else if (!g) break;
  le(h, f, a) | 0;
 } while (0);
 i = j;
 return;
}

function Uc(a, b) {
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
  d = Jb(d * 24 | 0) | 0;
  c[a >> 2] = d;
  xf(d | 0, e | 0, (c[h >> 2] | 0) * 12 | 0) | 0;
  Kb(e);
  e = c[f >> 2] | 0;
  d = c[h >> 2] | 0;
 }
 g = c[a >> 2] | 0;
 c[g + (d * 12 | 0) >> 2] = (e | 0) > (b | 0) ? b : e;
 c[g + (d * 12 | 0) + 4 >> 2] = (e | 0) < (b | 0) ? b : e;
 c[h >> 2] = d + 1;
 return 1;
}

function ze(b, e) {
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
 if (!g) if (!(me(b) | 0)) {
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
  if ((Sa[c[b + 36 >> 2] & 7](b, l, 1) | 0) == 1) f = d[l >> 0] | 0; else f = -1;
 } while (0);
 i = m;
 return f | 0;
}

function Df(a, b, d, e) {
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
 a = sf(h ^ a | 0, g ^ b | 0, h | 0, g | 0) | 0;
 b = C;
 Hf(a, b, sf(l ^ d | 0, k ^ e | 0, l | 0, k | 0) | 0, C, j) | 0;
 e = sf(c[j >> 2] ^ h | 0, c[j + 4 >> 2] ^ g | 0, h | 0, g | 0) | 0;
 d = C;
 i = f;
 return (C = d, e) | 0;
}

function ub(a, b, c, d) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 var e = 0.0, f = 0.0, h = 0.0, i = 0.0, j = 0.0, k = 0.0, l = 0.0, m = 0.0;
 h = +g[c + 12 >> 2];
 k = +g[a + 12 >> 2];
 l = +g[c + 8 >> 2];
 f = +g[a + 16 >> 2];
 i = +g[c >> 2];
 j = i + (h * k - l * f);
 m = +g[c + 4 >> 2];
 f = k * l + h * f + m;
 k = +g[a + 20 >> 2];
 e = +g[a + 24 >> 2];
 i = i + (h * k - l * e);
 e = m + (l * k + h * e);
 h = +g[a + 8 >> 2];
 g[b >> 2] = (j < i ? j : i) - h;
 g[b + 4 >> 2] = (f < e ? f : e) - h;
 g[b + 8 >> 2] = h + (j > i ? j : i);
 g[b + 12 >> 2] = h + (f > e ? f : e);
 return;
}

function ie(a, b) {
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
 d = uf(d + 1023 | 0, 0, 52) | 0;
 b = C;
 c[k >> 2] = d;
 c[k + 4 >> 2] = b;
 return +(a * +h[k >> 3]);
}

function Nb(a) {
 a = a | 0;
 var b = 0, d = 0, e = 0, f = 0, h = 0.0, j = 0.0, k = 0.0, l = 0.0, m = 0.0;
 f = i;
 i = i + 16 | 0;
 e = f;
 m = +g[a + 52 >> 2];
 k = +Le(m);
 g[e + 8 >> 2] = k;
 m = +Ke(m);
 g[e + 12 >> 2] = m;
 l = +g[a + 28 >> 2];
 j = +g[a + 32 >> 2];
 h = +g[a + 40 >> 2] - (l * k + m * j);
 g[e >> 2] = +g[a + 36 >> 2] - (m * l - k * j);
 g[e + 4 >> 2] = h;
 d = (c[a + 88 >> 2] | 0) + 102872 | 0;
 b = c[a + 100 >> 2] | 0;
 if (!b) {
  i = f;
  return;
 }
 a = a + 12 | 0;
 do {
  lc(b, d, e, a);
  b = c[b + 4 >> 2] | 0;
 } while ((b | 0) != 0);
 i = f;
 return;
}

function md(a, b, d) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 var e = 0, f = 0, h = 0, i = 0.0;
 e = ld(a) | 0;
 f = a + 4 | 0;
 h = c[f >> 2] | 0;
 i = +g[b + 4 >> 2] + -.10000000149011612;
 g[h + (e * 36 | 0) >> 2] = +g[b >> 2] + -.10000000149011612;
 g[h + (e * 36 | 0) + 4 >> 2] = i;
 h = c[f >> 2] | 0;
 i = +g[b + 12 >> 2] + .10000000149011612;
 g[h + (e * 36 | 0) + 8 >> 2] = +g[b + 8 >> 2] + .10000000149011612;
 g[h + (e * 36 | 0) + 12 >> 2] = i;
 b = c[f >> 2] | 0;
 c[b + (e * 36 | 0) + 16 >> 2] = d;
 c[b + (e * 36 | 0) + 32 >> 2] = 0;
 nd(a, e);
 return e | 0;
}

function Cd(a, b, d, e, f, g) {
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
 c[a + 8 >> 2] = xd(f, b << 2) | 0;
 c[a + 12 >> 2] = xd(c[a >> 2] | 0, d << 2) | 0;
 c[a + 16 >> 2] = xd(c[a >> 2] | 0, e << 2) | 0;
 c[a + 24 >> 2] = xd(c[a >> 2] | 0, (c[h >> 2] | 0) * 12 | 0) | 0;
 c[a + 20 >> 2] = xd(c[a >> 2] | 0, (c[h >> 2] | 0) * 12 | 0) | 0;
 return;
}

function xc(a, b, d, e, f) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 var h = 0, i = 0.0, j = 0.0;
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
 g[a + 136 >> 2] = +O(+(+g[d >> 2] * +g[e + 16 >> 2]));
 j = +g[b + 20 >> 2];
 i = +g[e + 20 >> 2];
 g[a + 140 >> 2] = j > i ? j : i;
 return;
}

function yd(b, d) {
 b = b | 0;
 d = d | 0;
 var e = 0, f = 0, g = 0;
 g = b + 102796 | 0;
 e = c[g >> 2] | 0;
 if ((e | 0) <= 0) ua(5560, 5447, 63, 5577);
 f = b + 102412 + (e * 12 | 0) | 0;
 if ((c[f + -12 >> 2] | 0) != (d | 0)) ua(5582, 5447, 65, 5577);
 if (!(a[f + -4 >> 0] | 0)) {
  f = f + -8 | 0;
  d = b + 102400 | 0;
  c[d >> 2] = (c[d >> 2] | 0) - (c[f >> 2] | 0);
 } else {
  Kb(d);
  f = f + -8 | 0;
  e = c[g >> 2] | 0;
 }
 b = b + 102404 | 0;
 c[b >> 2] = (c[b >> 2] | 0) - (c[f >> 2] | 0);
 c[g >> 2] = e + -1;
 return;
}

function Cf(a, b, c, d) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 var e = 0, f = 0, g = 0, h = 0, i = 0, j = 0;
 j = b >> 31 | ((b | 0) < 0 ? -1 : 0) << 1;
 i = ((b | 0) < 0 ? -1 : 0) >> 31 | ((b | 0) < 0 ? -1 : 0) << 1;
 f = d >> 31 | ((d | 0) < 0 ? -1 : 0) << 1;
 e = ((d | 0) < 0 ? -1 : 0) >> 31 | ((d | 0) < 0 ? -1 : 0) << 1;
 h = sf(j ^ a | 0, i ^ b | 0, j | 0, i | 0) | 0;
 g = C;
 a = f ^ j;
 b = e ^ i;
 return sf((Hf(h, g, sf(f ^ c | 0, e ^ d | 0, f | 0, e | 0) | 0, C, 0) | 0) ^ a | 0, C ^ b | 0, a | 0, b | 0) | 0;
}

function xf(b, d, e) {
 b = b | 0;
 d = d | 0;
 e = e | 0;
 var f = 0;
 if ((e | 0) >= 4096) return Aa(b | 0, d | 0, e | 0) | 0;
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

function Eb(a, b, d) {
 a = a | 0;
 b = +b;
 d = +d;
 var e = 0.0, f = 0.0;
 c[a + 148 >> 2] = 4;
 e = -b;
 f = -d;
 g[a + 20 >> 2] = e;
 g[a + 24 >> 2] = f;
 g[a + 28 >> 2] = b;
 g[a + 32 >> 2] = f;
 g[a + 36 >> 2] = b;
 g[a + 40 >> 2] = d;
 g[a + 44 >> 2] = e;
 g[a + 48 >> 2] = d;
 g[a + 84 >> 2] = 0.0;
 g[a + 88 >> 2] = -1.0;
 g[a + 92 >> 2] = 1.0;
 g[a + 96 >> 2] = 0.0;
 g[a + 100 >> 2] = 0.0;
 g[a + 104 >> 2] = 1.0;
 g[a + 108 >> 2] = -1.0;
 g[a + 112 >> 2] = 0.0;
 g[a + 12 >> 2] = 0.0;
 g[a + 16 >> 2] = 0.0;
 return;
}

function ve(a, b) {
 a = +a;
 b = b | 0;
 var d = 0, e = 0, f = 0;
 h[k >> 3] = a;
 d = c[k >> 2] | 0;
 e = c[k + 4 >> 2] | 0;
 f = wf(d | 0, e | 0, 52) | 0;
 f = f & 2047;
 switch (f | 0) {
 case 0:
  {
   if (a != 0.0) {
    a = +ve(a * 18446744073709551616.0, b);
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

function oe(b, c, d) {
 b = b | 0;
 c = c | 0;
 d = d | 0;
 var e = 0;
 if (c >>> 0 > 0 | (c | 0) == 0 & b >>> 0 > 4294967295) while (1) {
  e = Gf(b | 0, c | 0, 10, 0) | 0;
  d = d + -1 | 0;
  a[d >> 0] = e | 48;
  e = Ff(b | 0, c | 0, 10, 0) | 0;
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

function xe(b) {
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

function Sc(a, b, d) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 var e = 0, f = 0, g = 0;
 e = md(a, b, d) | 0;
 f = a + 28 | 0;
 c[f >> 2] = (c[f >> 2] | 0) + 1;
 f = a + 40 | 0;
 b = c[f >> 2] | 0;
 d = a + 36 | 0;
 a = a + 32 | 0;
 if ((b | 0) == (c[d >> 2] | 0)) {
  g = c[a >> 2] | 0;
  c[d >> 2] = b << 1;
  b = Jb(b << 3) | 0;
  c[a >> 2] = b;
  xf(b | 0, g | 0, c[f >> 2] << 2 | 0) | 0;
  Kb(g);
  b = c[f >> 2] | 0;
 }
 c[(c[a >> 2] | 0) + (b << 2) >> 2] = e;
 c[f >> 2] = (c[f >> 2] | 0) + 1;
 return e | 0;
}

function pe(b) {
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

function Kd(a, d, e, f) {
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
 g[j + 8 >> 2] = .009999999776482582;
 l = j + 28 | 0;
 c[l >> 2] = 0;
 c[l + 4 >> 2] = 0;
 c[l + 8 >> 2] = 0;
 c[l + 12 >> 2] = 0;
 b[l + 16 >> 1] = 0;
 $d(k, j, c[a + 56 >> 2] | 0);
 _c(d, j, e, c[(c[a + 52 >> 2] | 0) + 12 >> 2] | 0, f);
 i = h;
 return;
}

function Gd(a, d, e, f) {
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
 g[j + 8 >> 2] = .009999999776482582;
 l = j + 28 | 0;
 c[l >> 2] = 0;
 c[l + 4 >> 2] = 0;
 c[l + 8 >> 2] = 0;
 c[l + 12 >> 2] = 0;
 b[l + 16 >> 1] = 0;
 $d(k, j, c[a + 56 >> 2] | 0);
 Xc(d, j, e, c[(c[a + 52 >> 2] | 0) + 12 >> 2] | 0, f);
 i = h;
 return;
}

function tf(b, d, e) {
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

function Tc(a, b, d, e) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 var f = 0, g = 0;
 if (!(qd(a, b, d, e) | 0)) return;
 f = a + 40 | 0;
 d = c[f >> 2] | 0;
 e = a + 36 | 0;
 a = a + 32 | 0;
 if ((d | 0) == (c[e >> 2] | 0)) {
  g = c[a >> 2] | 0;
  c[e >> 2] = d << 1;
  d = Jb(d << 3) | 0;
  c[a >> 2] = d;
  xf(d | 0, g | 0, c[f >> 2] << 2 | 0) | 0;
  Kb(g);
  d = c[f >> 2] | 0;
 }
 c[(c[a >> 2] | 0) + (d << 2) >> 2] = b;
 c[f >> 2] = (c[f >> 2] | 0) + 1;
 return;
}

function De(b) {
 b = b | 0;
 var d = 0, e = 0, f = 0;
 e = c[464] | 0;
 if ((c[e + 76 >> 2] | 0) > -1) f = we(e) | 0; else f = 0;
 do if ((Be(b, e) | 0) < 0) b = 1; else {
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
  b = (ze(e, 10) | 0) < 0;
 } while (0);
 if (f | 0) fe(e);
 return b << 31 >> 31 | 0;
}

function Qb(b, d) {
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

function bf(b, d, e, f) {
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

function yb(a, b) {
 a = a | 0;
 b = b | 0;
 var d = 0, e = 0, f = 0, h = 0;
 b = Hb(b, 152) | 0;
 c[b >> 2] = 1432;
 e = b + 4 | 0;
 c[e >> 2] = 2;
 g[b + 8 >> 2] = .009999999776482582;
 c[b + 148 >> 2] = 0;
 d = b + 12 | 0;
 g[d >> 2] = 0.0;
 g[b + 16 >> 2] = 0.0;
 h = a + 4 | 0;
 f = c[h + 4 >> 2] | 0;
 c[e >> 2] = c[h >> 2];
 c[e + 4 >> 2] = f;
 xf(d | 0, a + 12 | 0, 140) | 0;
 return b | 0;
}

function oc(f, h) {
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
   g[i + 144 >> 2] = 0.0;
  }
  i = c[i + 96 >> 2] | 0;
 } while ((i | 0) != 0);
 return;
}

function gf() {
 var a = 0, b = 0, d = 0, e = 0;
 b = i;
 i = i + 16 | 0;
 d = b + 8 | 0;
 a = Ne() | 0;
 if (a | 0) {
  a = c[a >> 2] | 0;
  if (a | 0) {
   e = a + 48 | 0;
   if ((c[e >> 2] & -256 | 0) == 1126902528 ? (c[e + 4 >> 2] | 0) == 1129074247 : 0) {
    Ya[c[a + 12 >> 2] & 7]();
    Qe(9328, b);
   }
  }
 }
 e = c[563] | 0;
 c[563] = e + 0;
 Ya[e & 7]();
 Qe(9328, d);
}

function me(b) {
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

function Pc(a, b, d, e, f) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 b = Hb(f, 144) | 0;
 xc(b, a, 0, d, 0);
 c[b >> 2] = 1668;
 if ((c[(c[(c[b + 48 >> 2] | 0) + 12 >> 2] | 0) + 4 >> 2] | 0) != 2) ua(4266, 4310, 44, 4355);
 if ((c[(c[(c[b + 52 >> 2] | 0) + 12 >> 2] | 0) + 4 >> 2] | 0) == 2) return b | 0; else ua(5933, 4310, 45, 4355);
 return 0;
}

function Md(a, b, d, e, f) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 f = Hb(f, 144) | 0;
 xc(f, a, b, d, e);
 c[f >> 2] = 1708;
 if ((c[(c[(c[f + 48 >> 2] | 0) + 12 >> 2] | 0) + 4 >> 2] | 0) != 3) ua(5813, 5855, 43, 5908);
 if ((c[(c[(c[f + 52 >> 2] | 0) + 12 >> 2] | 0) + 4 >> 2] | 0) == 2) return f | 0; else ua(5933, 5855, 44, 5908);
 return 0;
}

function Hc(a, b, d, e, f) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 b = Hb(f, 144) | 0;
 xc(b, a, 0, d, 0);
 c[b >> 2] = 1628;
 if ((c[(c[(c[b + 48 >> 2] | 0) + 12 >> 2] | 0) + 4 >> 2] | 0) != 1) ua(4022, 4063, 41, 4115);
 if ((c[(c[(c[b + 52 >> 2] | 0) + 12 >> 2] | 0) + 4 >> 2] | 0) == 2) return b | 0; else ua(5933, 4063, 42, 4115);
 return 0;
}

function ge(a, b, d) {
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
 if ((be(Oa(140, g | 0) | 0) | 0) < 0) {
  c[e >> 2] = -1;
  a = -1;
 } else a = c[e >> 2] | 0;
 i = f;
 return a | 0;
}

function Lc(a, b, d, e, f) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 b = Hb(f, 144) | 0;
 xc(b, a, 0, d, 0);
 c[b >> 2] = 1648;
 if ((c[(c[(c[b + 48 >> 2] | 0) + 12 >> 2] | 0) + 4 >> 2] | 0) != 2) ua(4266, 4167, 41, 4221);
 if (!(c[(c[(c[b + 52 >> 2] | 0) + 12 >> 2] | 0) + 4 >> 2] | 0)) return b | 0; else ua(6098, 4167, 42, 4221);
 return 0;
}

function Id(a, b, d, e, f) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 f = Hb(f, 144) | 0;
 xc(f, a, b, d, e);
 c[f >> 2] = 1688;
 if ((c[(c[(c[f + 48 >> 2] | 0) + 12 >> 2] | 0) + 4 >> 2] | 0) != 3) ua(5813, 5710, 43, 5762);
 if (!(c[(c[(c[f + 52 >> 2] | 0) + 12 >> 2] | 0) + 4 >> 2] | 0)) return f | 0; else ua(6098, 5710, 44, 5762);
 return 0;
}

function Dc(a, b, d, e, f) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 b = Hb(f, 144) | 0;
 xc(b, a, 0, d, 0);
 c[b >> 2] = 1608;
 if ((c[(c[(c[b + 48 >> 2] | 0) + 12 >> 2] | 0) + 4 >> 2] | 0) != 1) ua(4022, 3922, 41, 3973);
 if (!(c[(c[(c[b + 52 >> 2] | 0) + 12 >> 2] | 0) + 4 >> 2] | 0)) return b | 0; else ua(6098, 3922, 42, 3973);
 return 0;
}

function uc(a, c, d) {
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

function nc(a, b) {
 a = a | 0;
 b = b | 0;
 var d = 0, e = 0;
 if (c[a + 102868 >> 2] & 2 | 0) ua(3331, 3351, 109, 3378);
 e = Hb(a, 152) | 0;
 Lb(e, b, a);
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

function Qd(a, b, d, e, f) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 b = Hb(f, 144) | 0;
 xc(b, a, 0, d, 0);
 c[b >> 2] = 1728;
 if (c[(c[(c[b + 48 >> 2] | 0) + 12 >> 2] | 0) + 4 >> 2] | 0) ua(5995, 6038, 44, 6082);
 if (!(c[(c[(c[b + 52 >> 2] | 0) + 12 >> 2] | 0) + 4 >> 2] | 0)) return b | 0; else ua(6098, 6038, 45, 6082);
 return 0;
}

function Pb(d, e, f) {
 d = d | 0;
 e = e | 0;
 f = +f;
 var h = 0, j = 0;
 h = i;
 i = i + 32 | 0;
 j = h;
 b[j + 22 >> 1] = 1;
 b[j + 24 >> 1] = -1;
 b[j + 26 >> 1] = 0;
 c[j + 4 >> 2] = 0;
 g[j + 8 >> 2] = .20000000298023224;
 g[j + 12 >> 2] = 0.0;
 a[j + 20 >> 0] = 0;
 c[j >> 2] = e;
 g[j + 16 >> 2] = f;
 d = Ob(d, j) | 0;
 i = h;
 return d | 0;
}

function mf(a) {
 a = a | 0;
 var b = 0;
 b = (a | 0) == 0 ? 1 : a;
 while (1) {
  a = Ie(b) | 0;
  if (a | 0) {
   b = 6;
   break;
  }
  a = nf() | 0;
  if (!a) {
   b = 5;
   break;
  }
  Ya[a & 7]();
 }
 if ((b | 0) == 5) {
  b = va(4) | 0;
  c[b >> 2] = 2344;
  Ka(b | 0, 1328, 22);
 } else if ((b | 0) == 6) return a | 0;
 return 0;
}

function he(b, d, e) {
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
  if (Ha(54, f | 0) | 0) a[b + 75 >> 0] = -1;
 }
 f = de(b, d, e) | 0;
 i = g;
 return f | 0;
}

function Ib(b, d, e) {
 b = b | 0;
 d = d | 0;
 e = e | 0;
 if (!e) return;
 if ((e | 0) <= 0) ua(2761, 2710, 164, 5577);
 if ((e | 0) > 640) {
  Kb(d);
  return;
 }
 e = a[10280 + e >> 0] | 0;
 if ((e & 255) >= 14) ua(2770, 2710, 173, 5577);
 b = b + 12 + ((e & 255) << 2) | 0;
 c[d >> 2] = c[b >> 2];
 c[b >> 2] = d;
 return;
}

function Bf(a, b) {
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

function wb(b, d, e) {
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

function Ae(a, b, d, e) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 var f = 0, g = 0;
 f = _(d, b) | 0;
 if ((c[e + 76 >> 2] | 0) > -1) {
  g = (we(e) | 0) == 0;
  a = le(a, f, e) | 0;
  if (!g) fe(e);
 } else a = le(a, f, e) | 0;
 if ((a | 0) != (f | 0)) d = (a >>> 0) / (b >>> 0) | 0;
 return d | 0;
}

function Af(b) {
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

function Gb(a) {
 a = a | 0;
 var b = 0, d = 0;
 b = a + 4 | 0;
 if ((c[b >> 2] | 0) <= 0) {
  a = c[a >> 2] | 0;
  Kb(a);
  return;
 }
 d = 0;
 do {
  Kb(c[(c[a >> 2] | 0) + (d << 3) + 4 >> 2] | 0);
  d = d + 1 | 0;
 } while ((d | 0) < (c[b >> 2] | 0));
 a = c[a >> 2] | 0;
 Kb(a);
 return;
}

function ib(b) {
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

function ac(a, b) {
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

function Ze(a, b, d, e, f, g) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 g = g | 0;
 if ((a | 0) == (c[b + 8 >> 2] | 0)) _e(0, b, d, e, f); else {
  a = c[a + 8 >> 2] | 0;
  _a[c[(c[a >> 2] | 0) + 20 >> 2] & 3](a, b, d, e, f, g);
 }
 return;
}

function pf(a, b, d) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 var e = 0, f = 0;
 f = i;
 i = i + 16 | 0;
 e = f;
 c[e >> 2] = c[d >> 2];
 a = Sa[c[(c[a >> 2] | 0) + 16 >> 2] & 7](a, b, e) | 0;
 if (a) c[d >> 2] = c[e >> 2];
 i = f;
 return a & 1 | 0;
}

function ic(a) {
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

function Dd(a) {
 a = a | 0;
 yd(c[a >> 2] | 0, c[a + 20 >> 2] | 0);
 yd(c[a >> 2] | 0, c[a + 24 >> 2] | 0);
 yd(c[a >> 2] | 0, c[a + 16 >> 2] | 0);
 yd(c[a >> 2] | 0, c[a + 12 >> 2] | 0);
 yd(c[a >> 2] | 0, c[a + 8 >> 2] | 0);
 return;
}

function vb(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = +c;
 g[b >> 2] = 0.0;
 c = (+g[a + 16 >> 2] + +g[a + 24 >> 2]) * .5;
 g[b + 4 >> 2] = (+g[a + 12 >> 2] + +g[a + 20 >> 2]) * .5;
 g[b + 8 >> 2] = c;
 g[b + 12 >> 2] = 0.0;
 return;
}

function af(a, b, d, e) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 if ((a | 0) == (c[b + 8 >> 2] | 0)) bf(0, b, d, e); else {
  a = c[a + 8 >> 2] | 0;
  bb[c[(c[a >> 2] | 0) + 28 >> 2] & 15](a, b, d, e);
 }
 return;
}

function Rc(a) {
 a = a | 0;
 jd(a);
 c[a + 28 >> 2] = 0;
 c[a + 48 >> 2] = 16;
 c[a + 52 >> 2] = 0;
 c[a + 44 >> 2] = Jb(192) | 0;
 c[a + 36 >> 2] = 16;
 c[a + 40 >> 2] = 0;
 c[a + 32 >> 2] = Jb(64) | 0;
 return;
}

function Gf(a, b, d, e) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 var f = 0, g = 0;
 g = i;
 i = i + 16 | 0;
 f = g | 0;
 Hf(a, b, d, e, f) | 0;
 i = g;
 return (C = c[f + 4 >> 2] | 0, c[f >> 2] | 0) | 0;
}

function Ee(a) {
 a = +a;
 var b = 0.0, c = 0.0;
 b = a * a;
 c = b * a;
 return +(c * (b * b) * (b * 2.718311493989822e-06 + -1.9839334836096632e-04) + (c * (b * .008333329385889463 + -.16666666641626524) + a));
}

function Ef(a, b, c, d) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 var e = 0, f = 0;
 e = a;
 f = c;
 c = Bf(e, f) | 0;
 a = C;
 return (C = (_(b, f) | 0) + (_(d, e) | 0) + a | a & 0, c | 0 | 0) | 0;
}

function zf(a, b, c) {
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

function Fe(a) {
 a = +a;
 var b = 0.0;
 a = a * a;
 b = a * a;
 return +(1.0 - a * .499999997251031 + b * .04166662332373906 + a * b * (a * 2.439044879627741e-05 + -.001388676377460993));
}

function uf(a, b, c) {
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

function wf(a, b, c) {
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

function Od(a, b, d, e) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 Vc(b, c[(c[a + 48 >> 2] | 0) + 12 >> 2] | 0, d, c[(c[a + 52 >> 2] | 0) + 12 >> 2] | 0, e);
 return;
}

function Nc(a, b, d, e) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 $c(b, c[(c[a + 48 >> 2] | 0) + 12 >> 2] | 0, d, c[(c[a + 52 >> 2] | 0) + 12 >> 2] | 0, e);
 return;
}

function Jc(a, b, d, e) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 Wc(b, c[(c[a + 48 >> 2] | 0) + 12 >> 2] | 0, d, c[(c[a + 52 >> 2] | 0) + 12 >> 2] | 0, e);
 return;
}

function Fc(a, b, d, e) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 _c(b, c[(c[a + 48 >> 2] | 0) + 12 >> 2] | 0, d, c[(c[a + 52 >> 2] | 0) + 12 >> 2] | 0, e);
 return;
}

function Bc(a, b, d, e) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 Xc(b, c[(c[a + 48 >> 2] | 0) + 12 >> 2] | 0, d, c[(c[a + 52 >> 2] | 0) + 12 >> 2] | 0, e);
 return;
}

function rf() {}
function sf(a, b, c, d) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 d = b - d - (c >>> 0 > a >>> 0 | 0) >>> 0;
 return (C = d, a - c >>> 0 | 0) | 0;
}

function Qf(a, b, c, d, e, f, g) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 g = g | 0;
 _a[a & 3](b | 0, c | 0, d | 0, e | 0, f | 0, g | 0);
}

function Ne() {
 var a = 0, b = 0;
 a = i;
 i = i + 16 | 0;
 if (!(Ga(10268, 4) | 0)) {
  b = Da(c[2568] | 0) | 0;
  i = a;
  return b | 0;
 } else Qe(9004, a);
 return 0;
}

function df(a, b, d, e, f, g) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 g = g | 0;
 if ((a | 0) == (c[b + 8 >> 2] | 0)) _e(0, b, d, e, f);
 return;
}

function _c(a, b, c, d, e) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 e = e | 0;
 var f = 0;
 f = i;
 i = i + 256 | 0;
 Yc(f, a, b, c, d, e);
 i = f;
 return;
}

function Ce(a, b) {
 a = a | 0;
 b = b | 0;
 var d = 0, e = 0;
 d = i;
 i = i + 16 | 0;
 e = d;
 c[e >> 2] = b;
 b = je(c[464] | 0, a, e) | 0;
 i = d;
 return b | 0;
}

function ae(a) {
 a = a | 0;
 var b = 0, d = 0;
 b = i;
 i = i + 16 | 0;
 d = b;
 c[d >> 2] = c[a + 60 >> 2];
 a = be(La(6, d | 0) | 0) | 0;
 i = b;
 return a | 0;
}

function Sf(a, b, c, d, e, f) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 return ab[a & 15](b | 0, c | 0, d | 0, e | 0, f | 0) | 0;
}

function Xb(a) {
 a = a | 0;
 Rc(a);
 c[a + 60 >> 2] = 0;
 c[a + 64 >> 2] = 0;
 c[a + 68 >> 2] = 1520;
 c[a + 72 >> 2] = 1524;
 c[a + 76 >> 2] = 0;
 return;
}

function vf(a, b, c, d) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 c = a + c >>> 0;
 return (C = b + d + (c >>> 0 < a >>> 0 | 0) >>> 0, c | 0) | 0;
}

function wd(a) {
 a = a | 0;
 if (c[a + 102400 >> 2] | 0) ua(5434, 5447, 32, 5481);
 if (!(c[a + 102796 >> 2] | 0)) return; else ua(5499, 5447, 33, 5481);
}

function Qe(a, b) {
 a = a | 0;
 b = b | 0;
 var d = 0;
 d = i;
 i = i + 16 | 0;
 c[d >> 2] = b;
 b = c[435] | 0;
 je(b, a, d) | 0;
 ye(10, b) | 0;
 sa();
}

function Jf(a, b, c, d, e, f) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 Ta[a & 3](b | 0, c | 0, d | 0, e | 0, f | 0);
}

function hb(b) {
 b = b | 0;
 a[k >> 0] = a[b >> 0];
 a[k + 1 >> 0] = a[b + 1 >> 0];
 a[k + 2 >> 0] = a[b + 2 >> 0];
 a[k + 3 >> 0] = a[b + 3 >> 0];
}

function Pe(a) {
 a = a | 0;
 var b = 0;
 b = i;
 i = i + 16 | 0;
 Je(a);
 if (!(Ja(c[2568] | 0, 0) | 0)) {
  i = b;
  return;
 } else Qe(8901, b);
}

function Td(a) {
 a = a | 0;
 var b = 0;
 b = a + 32 | 0;
 yd(c[b >> 2] | 0, c[a + 40 >> 2] | 0);
 yd(c[b >> 2] | 0, c[a + 36 >> 2] | 0);
 return;
}

function vd(a) {
 a = a | 0;
 c[a + 102400 >> 2] = 0;
 c[a + 102404 >> 2] = 0;
 c[a + 102408 >> 2] = 0;
 c[a + 102796 >> 2] = 0;
 return;
}

function ff(a, b, d, e) {
 a = a | 0;
 b = b | 0;
 d = d | 0;
 e = e | 0;
 if ((a | 0) == (c[b + 8 >> 2] | 0)) bf(0, b, d, e);
 return;
}

function Tf(a, b, c, d, e) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 e = e | 0;
 bb[a & 15](b | 0, c | 0, d | 0, e | 0);
}

function Oe() {
 var a = 0;
 a = i;
 i = i + 16 | 0;
 if (!(ra(10272, 25) | 0)) {
  i = a;
  return;
 } else Qe(8954, a);
}

function If(a, b, c, d) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 return Sa[a & 7](b | 0, c | 0, d | 0) | 0;
}

function be(a) {
 a = a | 0;
 if (a >>> 0 > 4294963200) {
  c[(ce() | 0) >> 2] = 0 - a;
  a = -1;
 }
 return a | 0;
}

function bg(a, b, c, d, e, f) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 ba(8);
}

function Rd(a, b) {
 a = a | 0;
 b = b | 0;
 Ua[c[(c[a >> 2] | 0) + 4 >> 2] & 31](a);
 Ib(b, a, 144);
 return;
}

function Qc(a, b) {
 a = a | 0;
 b = b | 0;
 Ua[c[(c[a >> 2] | 0) + 4 >> 2] & 31](a);
 Ib(b, a, 144);
 return;
}

function Nd(a, b) {
 a = a | 0;
 b = b | 0;
 Ua[c[(c[a >> 2] | 0) + 4 >> 2] & 31](a);
 Ib(b, a, 144);
 return;
}

function Mc(a, b) {
 a = a | 0;
 b = b | 0;
 Ua[c[(c[a >> 2] | 0) + 4 >> 2] & 31](a);
 Ib(b, a, 144);
 return;
}

function Jd(a, b) {
 a = a | 0;
 b = b | 0;
 Ua[c[(c[a >> 2] | 0) + 4 >> 2] & 31](a);
 Ib(b, a, 144);
 return;
}

function Ic(a, b) {
 a = a | 0;
 b = b | 0;
 Ua[c[(c[a >> 2] | 0) + 4 >> 2] & 31](a);
 Ib(b, a, 144);
 return;
}

function Ec(a, b) {
 a = a | 0;
 b = b | 0;
 Ua[c[(c[a >> 2] | 0) + 4 >> 2] & 31](a);
 Ib(b, a, 144);
 return;
}

function dg(a, b, c, d, e) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 e = e | 0;
 ba(10);
 return 0;
}

function Nf(a, b, c, d) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 Xa[a & 3](b | 0, c | 0, d | 0);
}

function qf(a) {
 a = a | 0;
 if (!a) a = 0; else a = (Ye(a, 1304, 1360, 0) | 0) != 0;
 return a & 1 | 0;
}

function Ff(a, b, c, d) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 return Hf(a, b, c, d, 0) | 0;
}

function se(a, b) {
 a = a | 0;
 b = b | 0;
 if (!a) a = 0; else a = te(a, b, 0) | 0;
 return a | 0;
}

function Pf(a, b, c, d) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = +d;
 Za[a & 3](b | 0, c | 0, +d);
}

function ce() {
 var a = 0;
 if (!0) a = 9768; else a = c[(yf() | 0) + 64 >> 2] | 0;
 return a | 0;
}
function cb(a) {
 a = a | 0;
 var b = 0;
 b = i;
 i = i + a | 0;
 i = i + 15 & -16;
 return b | 0;
}

function Vf(a, b, c, d, e) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 e = e | 0;
 ba(1);
}

function Rf(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 return $a[a & 3](b | 0, c | 0) | 0;
}

function Be(a, b) {
 a = a | 0;
 b = b | 0;
 return (Ae(a, xe(a) | 0, 1, b) | 0) + -1 | 0;
}

function Lf(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 Va[a & 15](b | 0, c | 0);
}

function eg(a, b, c, d) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 ba(11);
}

function nf() {
 var a = 0;
 a = c[2569] | 0;
 c[2569] = a + 0;
 return a | 0;
}

function Uf(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 ba(0);
 return 0;
}

function gb(a, b) {
 a = a | 0;
 b = b | 0;
 if (!n) {
  n = a;
  o = b;
 }
}

function Mf(a, b) {
 a = a | 0;
 b = b | 0;
 return Wa[a & 7](b | 0) | 0;
}

function ee(a) {
 a = a | 0;
 if (!(c[a + 68 >> 2] | 0)) fe(a);
 return;
}

function sb(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 return 0;
}

function Wb(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 return;
}

function Vb(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 return;
}

function Zf(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 ba(5);
}

function ag(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = +c;
 ba(7);
}

function Kf(a, b) {
 a = a | 0;
 b = b | 0;
 Ua[a & 31](b | 0);
}

function ue(a, b) {
 a = +a;
 b = b | 0;
 return +(+ve(a, b));
}

function cg(a, b) {
 a = a | 0;
 b = b | 0;
 ba(9);
 return 0;
}

function kd(a) {
 a = a | 0;
 Kb(c[a + 4 >> 2] | 0);
 return;
}

function fb(a, b) {
 a = a | 0;
 b = b | 0;
 i = a;
 j = b;
}

function Ub(a, b) {
 a = a | 0;
 b = b | 0;
 return;
}

function Tb(a, b) {
 a = a | 0;
 b = b | 0;
 return;
}

function gc(a) {
 a = a | 0;
 za(a | 0) | 0;
 gf();
}

function Xf(a, b) {
 a = a | 0;
 b = b | 0;
 ba(3);
}

function _b(a) {
 a = a | 0;
 $b(a, a);
 return;
}

function of(a) {
 a = a | 0;
 return mf(a) | 0;
}

function Yf(a) {
 a = a | 0;
 ba(4);
 return 0;
}

function Jb(a) {
 a = a | 0;
 return Ie(a) | 0;
}

function zc(a) {
 a = a | 0;
 Ue(a);
 return;
}

function xb(a) {
 a = a | 0;
 Ue(a);
 return;
}

function tc(a) {
 a = a | 0;
 Ue(a);
 return;
}

function pb(a) {
 a = a | 0;
 Ue(a);
 return;
}

function kf(a) {
 a = a | 0;
 Ue(a);
 return;
}

function cf(a) {
 a = a | 0;
 Ue(a);
 return;
}

function Ue(a) {
 a = a | 0;
 Je(a);
 return;
}

function Te(a) {
 a = a | 0;
 Ue(a);
 return;
}

function Sb(a) {
 a = a | 0;
 Ue(a);
 return;
}

function Pd(a) {
 a = a | 0;
 Ue(a);
 return;
}

function Oc(a) {
 a = a | 0;
 Ue(a);
 return;
}

function Ld(a) {
 a = a | 0;
 Ue(a);
 return;
}

function Kc(a) {
 a = a | 0;
 Ue(a);
 return;
}

function Kb(a) {
 a = a | 0;
 Je(a);
 return;
}

function Hd(a) {
 a = a | 0;
 Ue(a);
 return;
}

function Gc(a) {
 a = a | 0;
 Ue(a);
 return;
}

function Cc(a) {
 a = a | 0;
 Ue(a);
 return;
}

function lf(a) {
 a = a | 0;
 return 9381;
}

function Of(a) {
 a = a | 0;
 Ya[a & 7]();
}

function Bd(a) {
 a = a | 0;
 return 0.0;
}

function zb(a) {
 a = a | 0;
 return 1;
}

function we(a) {
 a = a | 0;
 return 0;
}

function rb(a) {
 a = a | 0;
 return 1;
}

function zd(a) {
 a = a | 0;
 return;
}

function yc(a) {
 a = a | 0;
 return;
}

function sc(a) {
 a = a | 0;
 return;
}

function ob(a) {
 a = a | 0;
 return;
}

function jf(a) {
 a = a | 0;
 return;
}

function hf(a) {
 a = a | 0;
 return;
}

function fe(a) {
 a = a | 0;
 return;
}

function We(a) {
 a = a | 0;
 return;
}

function Ve(a) {
 a = a | 0;
 return;
}

function Se(a) {
 a = a | 0;
 return;
}

function Re(a) {
 a = a | 0;
 return;
}

function Rb(a) {
 a = a | 0;
 return;
}

function Ad(a) {
 a = a | 0;
 return;
}

function jb(a) {
 a = a | 0;
 C = a;
}

function eb(a) {
 a = a | 0;
 i = a;
}

function Wf(a) {
 a = a | 0;
 ba(2);
}

function kb() {
 return C | 0;
}

function db() {
 return i | 0;
}

function yf() {
 return 0;
}

function _f() {
 ba(6);
}

function $f() {
 Pa();
}

// EMSCRIPTEN_END_FUNCS

 var Sa = [ Uf, sb, Ab, uc, de, ge, he, Xe ];
 var Ta = [ Vf, ef, $e, Vf ];
 var Ua = [ Wf, ob, pb, xb, Rb, Sb, sc, tc, yc, zc, Cc, Gc, Kc, Oc, Hd, Ld, Pd, Re, cf, Ve, We, Te, hf, kf, ee, Pe, Wf, Wf, Wf, Wf, Wf, Wf ];
 var Va = [ Xf, Tb, Ub, Rd, Mc, Qc, Ec, Ic, Jd, Nd, Xf, Xf, Xf, Xf, Xf, Xf ];
 var Wa = [ Yf, rb, zb, ae, lf, Yf, Yf, Yf ];
 var Xa = [ Zf, Vb, Wb, Zf ];
 var Ya = [ _f, $f, Me, nb, Oe, _f, _f, _f ];
 var Za = [ ag, vb, Db, ag ];
 var _a = [ bg, df, Ze, bg ];
 var $a = [ cg, qb, yb, ac ];
 var ab = [ dg, tb, Bb, Qd, Lc, Pc, Dc, Hc, Id, Md, dg, dg, dg, dg, dg, dg ];
 var bb = [ eg, ub, Cb, Bc, Fc, Jc, Nc, Gd, Kd, Od, ff, af, eg, eg, eg, eg ];
 return {
  ___cxa_can_catch: pf,
  _free: Je,
  _main: mb,
  ___cxa_is_pointer_type: qf,
  _i64Add: vf,
  _pthread_self: yf,
  _i64Subtract: sf,
  _memset: tf,
  _malloc: Ie,
  _memcpy: xf,
  _bitshift64Lshr: wf,
  ___errno_location: ce,
  _bitshift64Shl: uf,
  runPostSets: rf,
  stackAlloc: cb,
  stackSave: db,
  stackRestore: eb,
  establishStackSpace: fb,
  setThrew: gb,
  setTempRet0: jb,
  getTempRet0: kb,
  dynCall_iiii: If,
  dynCall_viiiii: Jf,
  dynCall_vi: Kf,
  dynCall_vii: Lf,
  dynCall_ii: Mf,
  dynCall_viii: Nf,
  dynCall_v: Of,
  dynCall_viid: Pf,
  dynCall_viiiiii: Qf,
  dynCall_iii: Rf,
  dynCall_iiiiii: Sf,
  dynCall_viiii: Tf
 };
})


;