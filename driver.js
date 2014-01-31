function makeMainThreadBenchmark(name, args) {
  return {
    benchmark: 'main-thread-' + name,
    description: 'Pauses on the main thread as XXX is loaded and run (from ? startup)',
    scale: 'seconds (lower numbers are better)',
    createWorker: function() {
      return {
        postMessage: function() {
          var worker = this;
          // create the iframe and set up communication
          var frame = document.createElement('iframe');
          frame.width = document.body.clientWidth*0.9;
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
      // should we also bump the importance of the worst frame?
      return Math.max(1/30, this.msg.mainThread/1000);
    },
    normalized: function() {
      return 0.3/this.calculate();
    },
  };
}

var jobMap = {};

var jobs = [
  // test of latency/smoothness on main thread as a large codebase loads
  // build instructions: see below
  makeMainThreadBenchmark('poppler-cold', { cold: true }),
  makeMainThreadBenchmark('poppler-warm', { cold: false }),

  // box2d. build instructions: let emscripten benchmark suite generate it for you
  {
    benchmark: 'box2d-throughput',
    description: 'Box2D physics: average frame rate',
    scale: 'milliseconds (lower numbers are better)',
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
  {
    benchmark: 'box2d-latency',
    description: 'Box2D physics: frame variability and worst case',
    scale: 'milliseconds (lower numbers are better)',
    createWorker: function() {
      return {
        postMessage: function() {
          this.onmessage({ data: {
            benchmark: 'box2d-latency'
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
      return (1/this.calculate());
    },
  },
  {
    benchmark: 'box2d-warm-startup',
    description: 'how long a warm startup takes for Box2D',
    scale: 'seconds (lower numbers are better)',
    args: ['0'],
    createWorker: function() {
      return new Worker('box2d/benchmark-worker.js')
    },
    calculate: function() {
      return this.msg.runtime/1000;
    },
    normalized: function() {
      return 0.10/Math.max(this.calculate(), 1/60);
    },
  },
  {
    benchmark: 'box2d-cold-startup',
    description: 'how long a cold startup takes for Box2D',
    scale: 'seconds (lower numbers are better)',
    args: 'cold',
    createWorker: function() {
      return new Worker('box2d/benchmark-worker.js')
    },
    calculate: function() {
      return this.msg.runtime/1000;
    },
    normalized: function() {
      return 0.10/Math.max(this.calculate(), 1/60);
    },
  },

  // lua. build instructions: use lua.vm.js project build system
  {
    benchmark: 'lua-binarytrees',
    description: 'GC performance in compiled Lua VM',
    scale: 'seconds (lower numbers are better)',
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
    scale: 'MFLOPS (higher numbers are better)',
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
  { // do startup last so there is no network access
    benchmark: 'lua-warm-startup',
    description: 'how long a warm startup takes the compiled Lua VM',
    scale: 'seconds (lower numbers are better)',
    args: null,
    createWorker: function() {
      return new Worker('lua/benchmark-worker.js')
    },
    calculate: function() {
      return this.msg.startup/1000;
    },
    normalized: function() {
      return 0.10/Math.max(this.calculate(), 1/60); // resolution: 1 frame
    },
  },
  { // do startup last so there is no network access
    benchmark: 'lua-cold-startup',
    description: 'how long a cold startup takes the compiled Lua VM',
    scale: 'seconds (lower numbers are better)',
    args: null,
    createWorker: function() {
      return new Worker('lua/benchmark-worker-cold-startup.js')
    },
    calculate: function() {
      return this.msg.startup/1000;
    },
    normalized: function() {
      return 0.10/Math.max(this.calculate(), 1/60); // resolution: 1 frame
    },
  },

  // poppler. build instructions: run asm3.test_sqlite in emscripten test suite, then remove last 3 lines in source file that were appended, change shouldRunNow to true
  {
    benchmark: 'poppler',
    description: 'Poppler PDF performance: cold startup + rendering',
    scale: 'seconds (lower numbers are better)',
    args: [],
    createWorker: function() {
      return new Worker('poppler/benchmark-worker.js')
    },
    calculate: function() {
      return Math.max(1/30, this.msg.runtime/1000);
    },
    normalized: function() {
      return (7/this.calculate());
    },
  },

  // sqlite. build instructions: run asm3.test_sqlite in emscripten test suite
  {
    benchmark: 'sqlite',
    description: 'sqlite operations performance (create, inserts, selects)',
    scale: 'seconds (lower numbers are better)',
    args: ['20000', '25'],
    createWorker: function() {
      return new Worker('sqlite/benchmark-worker.js')
    },
    calculate: function() {
      return this.msg.calcTime;
    },
    normalized: function() {
      return 8.0/Math.max(this.calculate(), 1/60);
    },
  },
];

var ran = false;
function run() {
  if (ran) return;
  ran = true;

  document.getElementById('results_area').hidden = false;
  document.getElementById('warning').hidden = true;

  var tableBody = document.getElementById('table_body');
  tableBody.innerHTML = '';

  var theButton = document.getElementById('the_button');
  theButton.innerHTML = 'Running benchmarks... (this can take a while)';
  theButton.classList.remove('btn-primary');
  theButton.classList.add('btn-warning');

  function finalCalculation() {
    // normalize based on experimental data
    var normalized = jobs.map(function(job) { return job.normalized() });
    return Math.round(100 * normalized.reduce(function(x, y) { return x + y }, 0));
  }

  var curr = 0;

  function runJob() {

    var job = jobs[curr++];
    if (!job) {
      theButton.innerHTML = 'Score: <strong>' + finalCalculation() + '</strong> (higher numbers are better)';
      theButton.classList.remove('btn-warning');
      theButton.classList.add('btn-success');
      return;
    }
    jobMap[job.benchmark] = job;

    tableBody.innerHTML += '<tr>' +
                           '  <td>' + job.benchmark + '</td>' +
                           '  <td id="' + job.benchmark + '-cell"><div id="' + job.benchmark + '-output" class="text-center"></div></td>' +
                           '  <td>' + job.scale + '</td>' +
                           '  <td>' + job.description + '</td>' +
                           '  <td id="' + job.benchmark + '-normalized-cell"><div id="' + job.benchmark + '-normalized-output" class="text-center"></div></td>' +
                           '</tr>';

    document.getElementById(job.benchmark + '-output').innerHTML = '<b>(..running..)</b>';
    document.getElementById(job.benchmark + '-cell').style = 'background-color: #ffddaa';

    // Run the job the specified number of times
    var reps = 0;
    var totalReps = job.reps || 1;
    var warmupReps = job.warmups || 0;
    var results = [];

    function finish() {
      console.log('final: ' + JSON.stringify(results));
      var final = {};
      for (var i = warmupReps; i < totalReps; i++) {
        var result = results[i];
        for (var k in result) {
          if (typeof result[k] === 'number') {
            final[k] = (final[k] || 0) + result[k];
          }
        }
      }
      for (var k in final) {
        if (typeof final[k] === 'number') {
          final[k] /= totalReps - warmupReps;
        }
      }
      job.msg = final;
      console.log('final: ' + JSON.stringify(job.msg));

      document.getElementById(job.benchmark + '-output').innerHTML = '<b>' + job.calculate().toFixed(3) + '</b>';
      document.getElementById(job.benchmark + '-cell').style = 'background-color: #bbccff';
      document.getElementById(job.benchmark + '-normalized-output').innerHTML = '<b>' + (100*job.normalized()).toFixed(3) + '</b>';
      document.getElementById(job.benchmark + '-normalized-cell').style = 'background-color: #ee9955';
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

