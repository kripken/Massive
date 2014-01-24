var jobs = [
  {
    benchmark: 'box2d',
    createWorker: function() {
      return new Worker('box2d/benchmark-worker.js')
    },
    calculate: function() {
      console.log(this.msg.output);
      return this.msg.runtime/1000;
    },
    normalized: function() {
      return (20.308/this.calculate());
    },
  },
  {
    benchmark: 'lua-binarytrees',
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
    args: ['scimark.lua'],
    createWorker: function() {
      return new Worker('lua/benchmark-worker.js')
    },
    calculate: function() {
      return /\nSciMark +([\d\.]+)/.exec(this.msg.output)[1]; 
    },
    normalized: function() {
      return (this.calculate()/3.19);
    },
  },
  { // do startup last so there is no network access, and can see previous
    benchmark: 'lua-startup',
    args: null,
    createWorker: function() {
      return new Worker('lua/benchmark-worker.js')
    },
    calculate: function() {
      var startups = jobs.map(function(job) { return job.msg.startup });
      startups.sort(function(x, y) { return x - y });
      return startups[Math.floor((startups.length-1)/2)]/1000;
    },
    normalized: function() {
      return 0.10/Math.max(this.calculate(), 1/60); // resolution: 1 frame
    },
  }
];

var ran = false;
function run() {
  if (ran) return;
  ran = true;

  var theButton = document.getElementById('the_button');
  theButton.innerHTML = 'Running benchmarks... (this can take a while)';
  theButton.classList.remove('btn-primary');
  theButton.classList.add('btn-warning');

  function finalCalculation() {
    // normalize based on experimental data
    var normalized = jobs.map(function(job) { return 100*job.normalized() });
    console.log('normalized values: ' + normalized);
    return Math.round(normalized.reduce(function(x, y) { return x + y }, 0));
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
    document.getElementById(job.benchmark + '-output').innerHTML = '<b>(..running..)</b>';
    document.getElementById(job.benchmark + '-cell').style = 'background-color: #ffddaa';
    var worker = job.createWorker();
    worker.onmessage = function(event) {
      var msg = event.data;
      console.log(JSON.stringify(msg));
      if (msg.benchmark != job.benchmark) throw 'invalid data from benchmark worker';
      job.msg = msg;
      document.getElementById(job.benchmark + '-output').innerHTML = '<b>' + job.calculate() + '</b>';
      document.getElementById(job.benchmark + '-cell').style = 'background-color: #bbccff';
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

