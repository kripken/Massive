
function prettyInteger(x) {
  x = '' + Math.round(x);
  var chars = x.split('');
  var ret = '';
  for (var i = 0; i < x.length; i++) {
    if (i > 0 && i % 3 === 0) ret = ',' + ret;
    ret = x[x.length-1-i] + ret;
  }
  return ret;
}

var SECONDS = 'seconds (lower is better)';
var MILLISECONDS = 'milliseconds (lower is better)';
var MFLOPS = 'MFLOPS (<b>higher</b> is better)';

function makeMainThreadBenchmark(name, args) {
  return {
    benchmark: 'main-thread-' + name,
    description: 'Responsiveness during ' + args.description + ' on the main thread',
    scale: SECONDS,
    totalReps: args.totalReps,
    warmupReps: args.warmupReps,
    createWorker: function() {
      return {
        postMessage: function() {
          var worker = this;
          // create the iframe and set up communication
          var frame = document.createElement('iframe');
          frame.width = document.body.clientWidth*0.6;
          frame.height = document.body.clientHeight*0.2;
          frame.src = 'responsiveness.html'
          window.onmessage = function(event) {
            document.getElementById('presentation-area').removeChild(frame);
            window.onmessage = null;
            event.data.benchmark = 'main-thread-' + name;
            worker.onmessage(event);
          };
          frame.onload = function() {
            frame.contentWindow.postMessage(args, '*');
          };
          document.getElementById('presentation-area').appendChild(frame);
        },
        terminate: function(){},
      };
    },
    calculate: function() {
      // care about main thread pauses
      return Math.max(1/30, this.msg.mainThread/1000);
    },
    normalized: function() {
      return (args.factor || 1/30)/this.calculate();
    },
  };
}

var jobMap = {};

var POPPLER_DATA = { url: 'poppler/freeculture.pdf', filename: 'input.pdf' };
var POPPLER_ARGS = ['-scale-to', '512', 'input.pdf', '-f', '1', '-l', '5'];

var jobs = [

  { title: 'Main thread responsiveness', description: 'Tests user-noticeable stalls as a large codebase is loaded' },

  // test of latency/smoothness on main thread as a large codebase loads and starts to run
  // build instructionses: see below
  makeMainThreadBenchmark('poppler-cold', { cold: true,  url: 'poppler/poppler.js', data: POPPLER_DATA, prints: 1, arguments: POPPLER_ARGS, description: 'Poppler PDF rendering',
                          totalReps: 6, warmupReps: 0 }),
  makeMainThreadBenchmark('poppler-warm', { cold: false, url: 'poppler/poppler.js', data: POPPLER_DATA, prints: 1, arguments: POPPLER_ARGS, description: 'Poppler PDF rendering',
                          totalReps: 7, warmupReps: 1 }),
  makeMainThreadBenchmark('sqlite-cold', { cold: true,  url: 'sqlite/sqlite.js', prints: 12, arguments: ['5', '2'], description: 'SQLite operations',
                          totalReps: 8, warmupReps: 0 }),
  makeMainThreadBenchmark('sqlite-warm', { cold: false, url: 'sqlite/sqlite.js', prints: 12, arguments: ['5', '2'], description: 'SQLite operations',
                          totalReps: 9, warmupReps: 1 }),

  { title: 'Throughput', description: 'Tests performance in long-running computational code' },

  // box2d. build instructions: let emscripten benchmark suite generate it for you (non-fround)
  {
    benchmark: 'box2d-throughput',
    description: 'Box2D physics: average frame rate',
    scale: MILLISECONDS,
    args: ['3'],
    totalReps: 4, // more reps to stabilize variance, which is more variable
    createWorker: function() {
      return new Worker('box2d/benchmark-worker.js')
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
    description: 'Box2D physics: average frame rate w/ Math.fround',
    scale: MILLISECONDS,
    args: ['3'],
    createWorker: function() {
      return new Worker('box2d/benchmark-worker.js')
    },
    calculate: function() {
      return this.msg.average;
    },
    normalized: function() {
      return (10/this.calculate());
    },
  },

  // lua. build instructions: use lua.vm.js project build system
  {
    benchmark: 'lua-binarytrees',
    description: 'GC performance in compiled Lua VM',
    scale: SECONDS,
    args: ['binarytrees.lua'],
    createWorker: function() {
      return new Worker('lua/benchmark-worker.js')
    },
    calculate: function() {
      return Math.max(1/30, this.msg.runtime/1000);
    },
    normalized: function() {
      return (7/this.calculate());
    },
  },
  {
    benchmark: 'lua-scimark',
    description: 'numeric computation performance in compiled Lua VM',
    scale: MFLOPS,
    args: ['scimark.lua'],
    createWorker: function() {
      return new Worker('lua/benchmark-worker.js')
    },
    calculate: function() {
      return this.msg.scimarkTime;
    },
    normalized: function() {
      return this.calculate()/10;
    },
  },
  // poppler. build instructions: run asm3.test_poppler in emscripten test suite, then remove last 3 lines in source file that were appended, change shouldRunNow to true
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

  // sqlite. build instructions: run asm3.test_sqlite in emscripten test suite with OUTLINING_LIMIT 60000
  {
    benchmark: 'sqlite-throughput',
    description: 'sqlite operations performance (create, inserts, selects)',
    scale: SECONDS,
    args: ['15000', '10'],
    createWorker: function() {
      return new Worker('sqlite/benchmark-worker.js')
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
    benchmark: 'poppler-cold-preparation',
    description: 'how long a cold preparation takes Poppler',
    scale: SECONDS,
    args: ['startup'],
    totalReps: 4,
    createWorker: function() {
      return new Worker('poppler/benchmark-worker.js')
    },
    calculate: function() {
      return this.msg.startup/1000;
    },
    normalized: function() {
      return (1/30)/Math.max(this.calculate(), 1/30);
    },
  },
  {
    benchmark: 'poppler-warm-preparation',
    description: 'how long a warm preparation takes Poppler',
    scale: SECONDS,
    args: ['startup', 'warm'],
    totalReps: 5,
    warmupReps: 1,
    createWorker: function() {
      return new Worker('poppler/benchmark-worker.js')
    },
    calculate: function() {
      return this.msg.startup/1000;
    },
    normalized: function() {
      return (1/30)/Math.max(this.calculate(), 1/30);
    },
  },
  {
    benchmark: 'sqlite-cold-preparation',
    description: 'how long a cold preparation takes SQLite',
    scale: SECONDS,
    args: ['startup', 'cold'],
    totalReps: 6,
    createWorker: function() {
      return new Worker('sqlite/benchmark-worker.js')
    },
    calculate: function() {
      return this.msg.runtime/1000;
    },
    normalized: function() {
      return (1/30)/Math.max(this.calculate(), 1/30); // resolution: 1 frame
    },
  },
  {
    benchmark: 'sqlite-warm-preparation',
    description: 'how long a warm preparation takes SQLite',
    scale: SECONDS,
    args: ['startup', 'warm'],
    totalReps: 7,
    warmupReps: 1,
    createWorker: function() {
      return new Worker('sqlite/benchmark-worker.js')
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
    description: 'Box2D physics: frame rate variance',
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
    benchmark: 'poppler-variance',
    description: 'Poppler PDF performance: frame rate variance',
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
];

function normalize(job) {
  return 10000 * job.normalized();
}

var ran = false;
function run() {
  if (ran) return;
  ran = true;

  document.getElementById('results_area').hidden = false;
  document.getElementById('warning').hidden = true;

  var tableBody = document.getElementById('table_body');
  var tableBodyLines = jobs.map(function(job) { return '<tr><td>' + (job.title ? '<b>' + job.title + '</b>' : job.benchmark) + '</td><td></td><td></td><td></td></tr>'; });
  function flushTable() {
    tableBody.innerHTML = tableBodyLines.join('\n');
  }
  flushTable();

  var theButton = document.getElementById('the_button');
  theButton.innerHTML = 'Running benchmarks... (this can take a while)';
  theButton.classList.remove('btn-primary');
  theButton.classList.add('btn-warning');

  function finalCalculation() {
    // normalize based on experimental data
    var normalized = jobs.filter(function(job) { return job.normalized }).map(function(job) { return normalize(job) });
    return normalized.map(function(x) { return Math.pow(x, 1/normalized.length) }).reduce(function(x, y) { return x * y }, 1)
  }

  var curr = 0;

  function runJob() {

    var job = jobs[curr++];
    if (!job) {
      // All benchmarks complete!
      theButton.innerHTML = 'Score: <strong>' + prettyInteger(finalCalculation()) + '</strong> (higher is better)';
      theButton.classList.remove('btn-warning');
      theButton.classList.add('btn-success');
      return;
    }
    if (job.title) {
      tableBodyLines[curr-1] = '<tr>' +
                               '  <td style="background-color:#ddd"><b>' + job.title + '</b></td>' +
                               '  <td style="background-color:#ddd"></td>' +
                               '  <td style="background-color:#ddd"></td>' +
                               '  <td style="background-color:#ddd">' + (job.description ? job.description + ' (<a href="#explanations">details</a>)' : '') + '</td>' +
                               //'  <td style="background-color:#ddd"></td>' +
                               '</tr>';
      flushTable();
      setTimeout(runJob, 1);
      return;
    }

    jobMap[job.benchmark] = job;

    function emitBenchmarkLine(result, style) {
      tableBodyLines[curr-1] = '<tr>' +
                               '  <td>' + job.benchmark + '</td>' +
                               '  <td style="' + style + '"><div class="text-center">' + result + '</div></td>' +
                               '  <td>' + job.scale + '</td>' +
                               '  <td>' + (job.description || '') + '</td>' +
                               //'  <td id="' + job.benchmark + '-normalized-cell"><div id="' + job.benchmark + '-normalized-output" class="text-center"></div></td>' +
                               '</tr>';
    }
    emitBenchmarkLine('<b>(..running..)</b>', 'background-color: #ffddaa');
    flushTable();

    // Run the job the specified number of times
    var reps = 0;
    var totalReps = job.totalReps || 2;
    var warmupReps = job.warmupReps || 0;
    var results = [];

    function finish() {
      console.log('final: ' + JSON.stringify(results));
      var final = {}, sum = 0, squares = 0;
      for (var i = warmupReps; i < totalReps; i++) {
        var result = results[i];
        for (var k in result) {
          if (typeof result[k] === 'number') {
            final[k] = (final[k] || 0) + result[k];
          }
        }
        job.msg = result;
        var curr = job.calculate();
        job.msg = null;
        sum += curr;
        squares += curr*curr;
      }
      // check for excessive variability
      var n = totalReps - warmupReps;
      var mean = sum/n;
      var mean2 = squares/n;
      var std = Math.sqrt(mean2 - mean*mean);
      var noise = Math.abs(std/mean)/Math.sqrt(n);
      var tooVariable = noise > 0.2;

      // calculate final score
      for (var k in final) {
        if (typeof final[k] === 'number') {
          final[k] /= totalReps - warmupReps;
        }
      }
      job.msg = final;
      console.log('final: ' + JSON.stringify(job.msg) + ' on ' + (totalReps - warmupReps));

      emitBenchmarkLine('<b>' + job.calculate().toFixed(3) + (tooVariable ? ' <a href="#toovariable">(±' + Math.round(100*noise) + '%!)</a>' : '') + '</b>', 'background-color: #bbccff');
      flushTable();
      //document.getElementById(job.benchmark + '-normalized-output').innerHTML = '<b>' + prettyInteger(normalize(job)) + '</b>';
      //document.getElementById(job.benchmark + '-normalized-cell').style = 'background-color: #ee9955';
      setTimeout(function() {
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

        reps++;
        if (reps === totalReps) {
          worker.terminate(); // ensure the worker is cleaned up before the next starts
          finish();
        } else {
          setTimeout(doRep, 1);
        }
      };
      console.log('requesting benchmark ' + job.benchmark);
      worker.postMessage({
        benchmark: job.benchmark,
        args: job.args
      });
    }

    doRep();
  }
  runJob();
}

