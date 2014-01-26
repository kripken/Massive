var jobMap = {};

var jobs = [
  // test of latency/smoothness on main thread as a large codebase loads
  {
    benchmark: 'main-thread-responsiveness',
    description: 'Maximum pause on the main thread as a large codebase is loaded asynchronously',
    scale: 'milliseconds (lower numbers are better)',
    args: ['3'],
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
            worker.onmessage({ data: {
              benchmark: 'main-thread-responsiveness',
              msg: event.data
            }});
          };
          frame.onload = function() {
            frame.contentWindow.postMessage('go!', '*');
          };
          document.getElementById('presentation-area').appendChild(frame);
        }
      };
    },
    calculate: function() {
      return this.msg.msg.latency;
    },
    normalized: function() {
      return 20.308/this.calculate();
    },
  },

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
      // output format is:         frame averages: 31.675 +- 7.808, range: 22.000 to 63.000
      var m = /frame averages: (\d+\.\d+) \+- (\d+\.\d+), range: (\d+\.\d+) to (\d+\.\d+)/.exec(this.msg.output);
      this.parsed = {
        average: parseFloat(m[1]),
        variance: parseFloat(m[2]),
        lowest: parseFloat(m[3]),
        highest: parseFloat(m[4])
      };
      return this.parsed.average;
    },
    normalized: function() {
      return (20.308/this.calculate());
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
        }
      };
    },
    calculate: function() {
      var parsed = jobMap['box2d-throughput'].parsed;
      return (2*parsed.variance + (parsed.highest - parsed.average))/3;
    },
    normalized: function() {
      return (20.308/this.calculate());
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
      return this.msg.runtime/1000;
    },
    normalized: function() {
      return (20.308/this.calculate());
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
      return parseFloat(/\nSciMark +([\d\.]+)/.exec(this.msg.output)[1]);
    },
    normalized: function() {
      return (this.calculate()/3.19);
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

  // sqlite. build instructions: run asm3.test_sqlite in emscripten test suite
  {
    benchmark: 'sqlite',
    description: 'sqlite operations performance (create, inserts, selects)',
    scale: 'seconds (lower numbers are better)',
    args: ['5000', '9'],
    createWorker: function() {
      return new Worker('sqlite/benchmark-worker.js')
    },
    calculate: function() {
      var m = /create table : took (\d+) ms\n25,000 inserts : took (\d+) ms\ncommit : took (\d+) ms\ncount\(\*\) = 25000\n\ncount\(\*\) = 5000\n\ncount\(\*\) = 15000\n\ncount\(\*\) = 5000\n\nselects : took (\d+) ms\ncreate indexes : took (\d+) ms\ncount\(\*\) = 5000\n\ncount\(\*\) = 15000\n\nselects with indexes : took (\d+) ms/.exec(this.msg.output);
      if (!m) throw 'invalid sqlite output: ' + this.msg.output;
      m = m.map(parseFloat);
      return (m[1]+m[2]+m[3]+m[4]+m[5]+m[6])/1000;
    },
    normalized: function() {
      return 4.0/Math.max(this.calculate(), 1/60);
    },
  },
];

var ran = false;
function run() {
  if (ran) return;
  ran = true;

  document.getElementById('results_area').hidden = false;

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

    var worker = job.createWorker();
    worker.onmessage = function(event) {
      var msg = event.data;
      console.log(JSON.stringify(msg));
      if (msg.benchmark != job.benchmark) throw 'invalid data from benchmark worker';
      job.msg = msg;
      document.getElementById(job.benchmark + '-output').innerHTML = '<b>' + job.calculate().toFixed(3) + '</b>';
      document.getElementById(job.benchmark + '-cell').style = 'background-color: #bbccff';
      document.getElementById(job.benchmark + '-normalized-output').innerHTML = '<b>' + (100*job.normalized()).toFixed(3) + '</b>';
      document.getElementById(job.benchmark + '-normalized-cell').style = 'background-color: #ee9955';
      runJob();
    };
    console.log('requesting benchmark ' + job.benchmark);
    worker.postMessage({
      benchmark: job.benchmark,
      args: job.args
    });
  }
  runJob();
}

