(function () {

function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return Array.prototype.slice.call(document.querySelectorAll(selector));
}

function escape_(str) {
  if (typeof str === 'undefined') {
    return;
  }
  return str.replace(/&/g, '&amp;')
            .replace(/>/g, '&gt;')
            .replace(/</g, '&lt;')
            .replace(/'/g, '&#39;')
            .replace(/"/g, '&#34;');
}

function prettyInteger(x) {
  x = '' + Math.round(x);
  var ret = '';
  for (var i = 0; i < x.length; i++) {
    if (i > 0 && i % 3 === 0) ret = ',' + ret;
    ret = x[x.length - 1 - i] + ret;
  }
  return ret;
}

function normalize(job) {
  var ret = 10000 * job.normalized();
  if (isNaN(ret)) throw 'invalid data for ' + job.benchmark;
  return ret;
}

var SECONDS = 'seconds <small>(lower is better)</small>';
var MILLISECONDS = 'milliseconds <small>(lower is better)</small>';
var MFLOPS = 'MFLOPS <small>(<b>higher</b> is better)</small>';

function makeMainThreadBenchmark(name, args, before, after) {
  return {
    benchmark: 'main-thread-' + name,
    description: 'Responsiveness during ' + args.description + ' on the main thread',
    scale: SECONDS,
    totalReps: args.totalReps,
    warmupReps: args.warmupReps,
    createWorker: function() {
      if (before) {
        before();
        before = null;
      }
      return {
        postMessage: function() {
          var worker = this;
          // create the iframe and set up communication
          var frame = document.createElement('iframe');
          frame.id = 'responsiveness-frame';
          frame.src = 'responsiveness.html';
          window.onmessage = function(event) {
            area.removeChild(frame);
            window.onmessage = null;
            event.data.benchmark = 'main-thread-' + name;
            worker.onmessage(event);
          };
          frame.onload = function() {
            frame.contentWindow.postMessage(args, '*');
          };
          area.appendChild(frame);
        },
        terminate: after || function(){},
      };
    },
    calculate: function() {
      return this.msg.mainThread/1000;
    },
    normalized: function() {
      // Care about main thread pauses accumulated over several main loop iterations
      // Give the full score to 0.1 seconds and below, to decrease the effect of DOM
      // noise on good (close to 0) results (a 0.1 second total pause when starting
      // up a very large codebase is quite reasonable, too).
      return (1 / 10) / Math.max(1 / 10, this.calculate());
    },
  };
}

function togglePresentationArea() {
  // area.classList.toggle('visible');
}

var jobMap = {};

var POPPLER_DATA = { url: 'poppler/freeculture.pdf', filename: 'input.pdf' };
var POPPLER_ARGS = ['-scale-to', '512', 'input.pdf', '-f', '1', '-l', '5'];

var jobs = [
  /* XXX wasm doesn't have async loading yet, so we can't test this
  { title: 'Main thread responsiveness', description: 'Tests user-noticeable stalls as a large codebase is loaded' },

  // test of latency/smoothness on main thread as a large codebase loads and starts to run
  // build instructionses: see below
  makeMainThreadBenchmark('poppler-cold', { cold: true,  url: 'poppler/poppler.js', data: POPPLER_DATA, prints: 1, arguments: POPPLER_ARGS, description: 'Poppler PDF rendering',
                          totalReps: 6, warmupReps: 0 }, togglePresentationArea),
  makeMainThreadBenchmark('poppler-warm', { cold: false, url: 'poppler/poppler.js', data: POPPLER_DATA, prints: 1, arguments: POPPLER_ARGS, description: 'Poppler PDF rendering',
                          totalReps: 7, warmupReps: 1 }),
  makeMainThreadBenchmark('sqlite-cold', { cold: true,  url: 'sqlite/sqlite.js', prints: 12, arguments: ['--size', '0'], description: 'SQLite operations',
                          totalReps: 8, warmupReps: 0 }),
  makeMainThreadBenchmark('sqlite-warm', { cold: false, url: 'sqlite/sqlite.js', prints: 12, arguments: ['--size', '0'], description: 'SQLite operations',
                          totalReps: 9, warmupReps: 1 }, null, togglePresentationArea),
  */

  { title: 'Throughput', description: 'Tests performance in long-running computational code' },

  // box2d. build instructions: let emscripten benchmark suite generate it for you (non-fround)
  {
    benchmark: 'box2d-throughput',
    description: 'Box2D physics performance',
    scale: MILLISECONDS,
    args: ['3'],
    totalReps: 4, // more reps to stabilize variance, which is more variable
    createWorker: function() {
      return new Worker('box2d/benchmark-worker.js');
    },
    calculate: function() {
      return this.msg.average;
    },
    normalized: function() {
      return (10/this.calculate());
    },
  },
  {
    benchmark: 'box2d-wasm-throughput',
    description: 'Box2D physics performance (WebAssembly)',
    scale: MILLISECONDS,
    args: ['3'],
    totalReps: 4, // more reps to stabilize variance, which is more variable
    createWorker: function() {
      return new Worker('box2d/benchmark-worker.js');
    },
    calculate: function() {
      return this.msg.average;
    },
    normalized: function() {
      return (10/this.calculate());
    },
  },
  // box2d float32. build instructions: let emscripten benchmark suite generate it for you, with PRECISE_F32=2
  {
    benchmark: 'box2d-throughput-f32',
    description: 'Box2D physics performance w/ float opts',
    scale: MILLISECONDS,
    args: ['3'],
    createWorker: function() {
      return new Worker('box2d/benchmark-worker.js');
    },
    calculate: function() {
      return this.msg.average;
    },
    normalized: function() {
      return (10/this.calculate());
    },
  },
  {
    benchmark: 'box2d-wasm-throughput-f32',
    description: 'Box2D physics performance w/ float opts (WebAssembly)',
    scale: MILLISECONDS,
    args: ['3'],
    createWorker: function() {
      return new Worker('box2d/benchmark-worker.js');
    },
    calculate: function() {
      return this.msg.average;
    },
    normalized: function() {
      return (10/this.calculate());
    },
  },

  // lua. build instructions: use emscripten benchmark suite
  {
    benchmark: 'lua-binarytrees',
    description: 'GC performance in compiled Lua VM',
    scale: SECONDS,
    args: ['binarytrees.lua'],
    createWorker: function() {
      return new Worker('lua/benchmark-worker.js');
    },
    calculate: function() {
      return Math.max(1/30, this.msg.runtime/1000);
    },
    normalized: function() {
      return (7/this.calculate());
    },
  },
  {
    benchmark: 'lua-binarytrees-wasm',
    description: 'GC performance in compiled Lua VM (WebAssembly)',
    scale: SECONDS,
    args: ['binarytrees.lua'],
    createWorker: function() {
      return new Worker('lua/benchmark-worker.js');
    },
    calculate: function() {
      return Math.max(1/30, this.msg.runtime/1000);
    },
    normalized: function() {
      return (7/this.calculate());
    },
  },

  // poppler. build instructions: run asm3.test_poppler in emscripten test suite, then remove last 3 lines in source file that were appended, change shouldRunNow to true a few lines above that
  {
    benchmark: 'poppler-throughput',
    description: 'Poppler PDF rendering performance',
    scale: SECONDS,
    args: [],
    totalReps: 4, // more reps to stabilize variance, which is more variable
    createWorker: function() {
      return new Worker('poppler/benchmark-worker.js');
    },
    calculate: function() {
      return Math.max(1/30, this.msg.runtime/1000);
    },
    normalized: function() {
      return (7/this.calculate());
    },
  },
  {
    benchmark: 'poppler-wasm-throughput',
    description: 'Poppler PDF rendering performance (WebAssembly)',
    scale: SECONDS,
    args: [],
    totalReps: 4, // more reps to stabilize variance, which is more variable
    createWorker: function() {
      return new Worker('poppler/benchmark-worker.js');
    },
    calculate: function() {
      return Math.max(1/30, this.msg.runtime/1000);
    },
    normalized: function() {
      return (7/this.calculate());
    },
  },
  // sqlite. build instructions: run in emscripten: emcc -O3 tests/sqlite/sqlite3.c tests/sqlite/speedtest1.c -Itests/sqlite3/ -s TOTAL_MEMORY=67108864 -s OUTLINING_LIMIT=60000 -s MEMFS_APPEND_TO_TYPED_ARRAYS=1 --memory-init-file 0
  {
    benchmark: 'sqlite-throughput',
    description: 'sqlite operations performance (create, inserts, selects)',
    scale: SECONDS,
    args: ['--size', '19'],
    createWorker: function() {
      return new Worker('sqlite/benchmark-worker.js');
    },
    calculate: function() {
      return this.msg.calcTime;
    },
    normalized: function() {
      return 8.0/this.calculate();
    },
  },
  {
    benchmark: 'sqlite-wasm-throughput',
    description: 'sqlite operations performance (create, inserts, selects) (WebAssembly)',
    scale: SECONDS,
    args: ['--size', '19'],
    createWorker: function() {
      return new Worker('sqlite/benchmark-worker.js');
    },
    calculate: function() {
      return this.msg.calcTime;
    },
    normalized: function() {
      return 8.0/this.calculate();
    },
  },

  { title: 'Preparation', description: 'Tests how fast a casebase is loaded and ready to run' },

  {
    benchmark: 'poppler-preparation',
    description: 'how long preparation takes Poppler',
    scale: SECONDS,
    args: ['startup'],
    totalReps: 4,
    createWorker: function() {
      return new Worker('poppler/benchmark-worker.js');
    },
    calculate: function() {
      return this.msg.startup/1000;
    },
    normalized: function() {
      return (1/30)/Math.max(this.calculate(), 1/30);
    },
  },
  {
    benchmark: 'poppler-wasm-preparation',
    description: 'how long preparation takes Poppler (WebAssembly)',
    scale: SECONDS,
    args: ['startup'],
    totalReps: 4,
    createWorker: function() {
      return new Worker('poppler/benchmark-worker.js');
    },
    calculate: function() {
      return this.msg.startup/1000;
    },
    normalized: function() {
      return (1/30)/Math.max(this.calculate(), 1/30);
    },
  },
  {
    benchmark: 'sqlite-preparation',
    description: 'how long preparation takes SQLite',
    scale: SECONDS,
    args: ['startup'],
    totalReps: 6,
    createWorker: function() {
      return new Worker('sqlite/benchmark-worker.js');
    },
    calculate: function() {
      return this.msg.runtime/1000;
    },
    normalized: function() {
      return (1/30)/Math.max(this.calculate(), 1/30); // resolution: 1 frame
    },
  },
  {
    benchmark: 'sqlite-wasm-preparation',
    description: 'how long preparation takes SQLite (WebAssembly)',
    scale: SECONDS,
    args: ['startup'],
    totalReps: 6,
    createWorker: function() {
      return new Worker('sqlite/benchmark-worker.js');
    },
    calculate: function() {
      return this.msg.runtime/1000;
    },
    normalized: function() {
      return (1/30)/Math.max(this.calculate(), 1/30); // resolution: 1 frame
    },
  },

  { title: 'Variance', description: 'Runs many frames of a long-running simulation and tests variability' },

  {
    benchmark: 'box2d-variance',
    description: 'Box2D physics: frame variance',
    scale: MILLISECONDS,
    createWorker: function() {
      return {
        postMessage: function() {
          this.onmessage({ data: {
            benchmark: 'box2d-variance'
          }});
        },
        terminate: function(){},
      };
    },
    calculate: function() {
      var parsed = jobMap['box2d-throughput'].msg;
      return (2*parsed.variance + (parsed.highest - parsed.average))/3;
    },
    normalized: function() {
      return 5/Math.max(5, this.calculate()); // less than 5ms is perfect
    },
  },
  {
    benchmark: 'box2d-wasm-variance',
    description: 'Box2D physics: frame variance (WebAssembly)',
    scale: MILLISECONDS,
    createWorker: function() {
      return {
        postMessage: function() {
          this.onmessage({ data: {
            benchmark: 'box2d-wasm-variance'
          }});
        },
        terminate: function(){},
      };
    },
    calculate: function() {
      var parsed = jobMap['box2d-wasm-throughput'].msg;
      return (2*parsed.variance + (parsed.highest - parsed.average))/3;
    },
    normalized: function() {
      return 5/Math.max(5, this.calculate()); // less than 5ms is perfect
    },
  },
  {
    benchmark: 'poppler-variance',
    description: 'Poppler PDF performance: frame variance',
    scale: MILLISECONDS,
    createWorker: function() {
      return {
        postMessage: function() {
          this.onmessage({ data: {
            benchmark: 'poppler-variance'
          }});
        },
        terminate: function(){},
      };
    },
    calculate: function() {
      var parsed = jobMap['poppler-throughput'].msg;
      return parsed.deviation;
    },
    normalized: function() {
      return 5/Math.max(5, this.calculate()); // less than 5ms is perfect
    },
  },
  {
    benchmark: 'poppler-wasm-variance',
    description: 'Poppler PDF performance: frame variance (WebAssembly)',
    scale: MILLISECONDS,
    createWorker: function() {
      return {
        postMessage: function() {
          this.onmessage({ data: {
            benchmark: 'poppler-wasm-variance'
          }});
        },
        terminate: function(){},
      };
    },
    calculate: function() {
      var parsed = jobMap['poppler-wasm-throughput'].msg;
      return parsed.deviation;
    },
    normalized: function() {
      return 5/Math.max(5, this.calculate()); // less than 5ms is perfect
    },
  }
];

jobs = jobs.map(function (job) {
  if (job.description) {
    job.description += ' (<a href="#faq-explanations">details</a>)';
  } else {
    job.description = '';
  }

  return job;
});

var tableBody = $('#table-body');
var tableBodyLines = jobs.map(function (job) {
  if (job.title) {
    return (
      '<tr class="row-pending row-group" title="' + job.title + '">\n' +
      '  <td class="cell-group-title">' + job.title + '</td>\n' +
      '  <td></td>\n' +
      '  <td class="cell-description">' + job.description + '</td>\n' +
      '</tr>\n'
    );
  } else {
    return (
      '<tr class="row-pending row-test">\n' +
      '  <td title="' + job.benchmark + '">' + job.benchmark + '</td>\n' +
      '  <td></td>\n' +
      '  <td class="cell-description">' + job.description + '</td>\n' +
      '</tr>\n'
    );
  }
});

function flushTable(data) {
  if (data) {
    resultsArea.classList.remove('hidden');
    tableBodyLines = [data];
  }
  tableBody.innerHTML = tableBodyLines.join('\n');
}

flushTable();

var finalScore;

function showFinalScore(score) {
  finalScore = score;
  btnRun.innerHTML = 'Score: <strong>' + score + '</strong> (higher is better)';
  btnRun.classList.remove('btn-warning');
  btnRun.classList.add('btn-success');
  copyResults.classList.remove('hidden');
  document.body.removeAttribute('data-running');
}

// If set, start benchmarks automatically
var autoRun = false;

// Post final results to a URL. Use something like this:
// http://localhost:8000/index.html?postToURL=/results
// This will send a POST request to http://localhost:8000/results with a
// JSON structure containing individual benchmark results as well as the
// final score.

var postToURL = null;

// Pick which benchmarks to run by adding them to the search part of the URL, comma separated

if (window.location.search) {
  var parts = window.location.search.substr(1).split(',');
  parts = parts.filter(function(part) {
    var slices = part.split('=');
    if (slices.length === 2) {
      if (slices[0] === 'autoRun') {
        autoRun = slices[1].toLowerCase() === 'true';
      } else if (slices[0] === 'postToURL') {
        postToURL = slices[1];
        console.log('will post to ' + postToURL);
      } else {
        console.log('weird url part ' + part);
      }
      return false;
    }
    if (slices.length === 1) {
      return true; // assumed to be a job
    } else {
      console.log('peculiar url part ' + part);
      return false;
    }
  });
  if (parts.length > 0) {
    jobs = jobs.filter(function (job) {
      return parts.indexOf(job.benchmark) >= 0;
    });
    if (jobs.length === 0) {
      window.alert('all jobs filtered by your list ' +
        '(index.html?job1,job2,job3 syntax was assumed, and we saw the url ' +
        'end in "' + window.location.search + '"), this seems wrong :(');
    }
  }
}

var ran = false;

function run() {
  if (ran) return;
  ran = true;

  document.body.setAttribute('data-running', '');

  aboveResultsArea.scrollIntoView(true);

  resultsArea.classList.remove('hidden');

  btnRun.innerHTML = 'Running benchmarks... (this can take a while)';
  btnRun.classList.remove('btn-primary');
  btnRun.classList.add('btn-warning');

  function finalCalculation() {
    // Normalize based on experimental data.
    var normalized = jobs.filter(function(job) { return job.normalized; });
    console.log('normalized scores: ' +
      JSON.stringify(normalized.map(function(job) {
        return [job.benchmark, normalize(job)];
      })));
    normalized = normalized.map(function(job) { return normalize(job); });
    return normalized.map(function(x) {
      return Math.pow(x, 1/normalized.length);
    }).reduce(function(x, y) {
      return x * y;
    }, 1);
  }

  var curr = 0;

  function runJob() {
    var job = jobs[curr++];
    if (!job) {
      // All benchmarks complete!
      var finalResult = finalCalculation();
      showFinalScore(prettyInteger(finalResult));
      if (postToURL) {
        results = jobs.map(function (job) {
          if ('calculate' in job) {
            return {
              'benchmark': job.benchmark,
              'result': normalize(job)
            };
          }
        });

        // We need to remove the 'undefined' elements
        results = results.filter(function(res) {
          return res != null
        });

        results.push({'benchmark': 'score', 'result': finalResult});

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open('POST', postToURL, true);
        xmlHttp.setRequestHeader('Content-type',
          'application/x-www-form-urlencoded');
        xmlHttp.send('results=' + JSON.stringify(results));
      }
      return;
    }

    if (job.title) {
      tableBodyLines[curr-1] = (
        '<tr class="row-group row-active" title="' + job.title + '">\n' +
        '  <td class="cell-group-title">' + job.title + '</td>\n' +
        '  <td></td>\n' +
        '  <td class="cell-description">' + job.description + '</td>\n' +
        //'  <td></td>\n' +
        '</tr>\n'
      );
      flushTable();
      setTimeout(runJob, 1);
      return;
    }

    jobMap[job.benchmark] = job;

    function emitBenchmarkLine(result, classes) {
      tableBodyLines[curr-1] = (
        '<tr>\n' +
        '  <td>' + job.benchmark + '</td>\n' +
        '  <td class="' + classes + '">' + (result || '&nbsp;') + '</td>\n' +
        '  <td class="cell-description">' + (job.description || '') + '</td>\n' +
        //'  <td id="' + job.benchmark + '-normalized-cell"><div id="' + job.benchmark + '-normalized-output" class="text-center"></div></td>\n' +
        '</tr>'
      );
    }
    emitBenchmarkLine('running&hellip;', 'cell-running');
    flushTable();

    // Run the job the specified number of times.
    var reps = 0;
    var totalReps = job.totalReps || 2;
    var warmupReps = job.warmupReps || 0;
    var results = [];

    function finish() {
      console.log('final: ' + JSON.stringify(results));

      var final = {}, i, k, sum = 0, squares = 0;
      for (i = warmupReps; i < totalReps; i++) {
        var result = results[i];
        for (k in result) {
          if (typeof result[k] === 'number') {
            final[k] = (final[k] || 0) + result[k];
          }
        }
        job.msg = result;
        var curr = job.calculate();
        job.msg = null;
        sum += curr;
        squares += curr * curr;
      }

      // Check for excessive variability.
      var n = totalReps - warmupReps;
      var mean = sum/n;
      var mean2 = squares/n;
      var std = Math.sqrt(mean2 - mean*mean);
      var noise = Math.abs(std/mean)/Math.sqrt(n);
      var tooVariable = noise > 0.2;

      // Calculate final score.
      for (k in final) {
        if (typeof final[k] === 'number') {
          final[k] /= totalReps - warmupReps;
        }
      }
      job.msg = final;
      console.log('final: ' + JSON.stringify(job.msg) + ' on ' + (totalReps - warmupReps));

      emitBenchmarkLine(prettyInteger(normalize(job)) + (tooVariable ? ' <a href="#faq-toovariable">(±' + Math.round(100*noise) + '%!)</a>' : ''),
        'cell-number');
      flushTable();
      //$('#' + job.benchmark + '-normalized-output').innerHTML = '<b>' + prettyInteger(normalize(job)) + '</b>';
      //$('#' + job.benchmark + '-normalized-cell').style = 'background-color: #ee9955';
      setTimeout(function () {
        runJob();
      }, 1);
    }

    function doRep() {
      var worker = job.createWorker();
      worker.onmessage = function(event) {
        var msg = event.data;
        console.log(JSON.stringify(msg));
        if (msg.benchmark != job.benchmark) throw 'invalid data from benchmark worker';
        results.push(msg);

        worker.terminate(); // ensure the worker is cleaned up before the next starts

        reps++;
        if (reps === totalReps) {
          finish();
        } else {
          setTimeout(doRep, 1);
        }
      };
      console.log('requesting benchmark ' + job.benchmark + ' ' + job.args);
      worker.postMessage({
        benchmark: job.benchmark,
        args: job.args
      });
    }

    doRep();
  }
  runJob();
}

// Serialization

function copyData() {
  copyResults.innerHTML = (
    '<hr><h3>Copy this:</h3><code><pre>' +
    escape_(finalScore + '|' + tableBody.innerHTML) +
    '</pre></code><hr>'
  );
}

function pasteData() {
  var data = window.prompt('Paste the old results:');
  var split = data.split('|');
  showFinalScore(split[0]);
  flushTable(split[1]);
  btnCopy.blur();
}

function _pd(func) {
  return function(e) {
    e.preventDefault();
    func.apply(this, arguments);
  };
}

var area = $('#presentation-area');
var btnCopy = $('#btn-copy');
var btnRun = $('#btn-run');
var btnPaste = $('#btn-paste');
var copyResults = $('#copy-results');
var aboveResultsArea = $('#above-results-area');
var resultsArea = $('#results-area');

btnCopy.addEventListener('click', _pd(copyData));
btnRun.addEventListener('click', _pd(run));
btnPaste.addEventListener('click', _pd(pasteData));

if (autoRun) {
  document.addEventListener('DOMContentLoaded', run);
}

$('.logo').addEventListener('click', function () {
  window.location.reload();
});

// Open external links in a new tab.
$$('[href^="//"], [href*="://"]').forEach(function (link) {
  link.setAttribute('target', '_blank');
});


// Set `data` attribute for the current section so we can use as a CSS selector.
window.addEventListener('hashchange', updateHash);

function updateHash() {
  document.body.setAttribute('data-hash', window.location.hash);
}

function replaceHash(newHash) {
  // Do not use `window.location.hash`, since we don't want the page to jump
  // to the top of the section when we're already in that section.
  window.history.replaceState(null, null,
    window.location.pathname + (newHash || ''));
  updateHash();
}

updateHash();

var sections = $$('section[id], h3[id], a[name]').map(function (el) {
  return {
    top: el.offsetTop,
    id: el.name || el.id
  };
});

function closest() {
  var section;
  var top = window.scrollY;
  var i = sections.length;
  while (i--) {
    section = sections[i];
    if (top >= section.top - 1) {
      return section;
    }
  }
}

var debouncedScroll = new Debounce(function () {
  var h = closest();
  var newHash = h ? ('#' + h.id) : '';

  // Update the query string in the address bar.
  if (window.location.hash !== newHash) {
    replaceHash(newHash);
  }
}, 25);

window.addEventListener('scroll', function () {
  debouncedScroll.reset();
});


function Debounce(func, ms) {
  this.timeout = null;
  this.func = func;
  this.ms = ms;
}

Debounce.prototype.start = function () {
  this.timeout = window.setTimeout(this.func, this.ms);
};

Debounce.prototype.reset = function () {
  this.abort();
  this.start();
};

Debounce.prototype.abort = function () {
  window.clearTimeout(this.timeout);
};

})();
