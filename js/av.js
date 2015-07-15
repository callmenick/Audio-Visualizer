(function() {

// Cache some variables
var numParticles = 256;
var colours = ['#ff0046', '#ffd700', '#99ff00', '#00ccff'];
var nodes = [];
var f = 10;

// Cross browser audio context
var AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext;

// Set up our analyzer
var audio = document.querySelector('#audio');

// Set up our analyser
var analyser = context.createAnalyser();
analyser.fftSize = numParticles * 2;

// Create new frequency data array
var frequencyData = new Float32Array(analyser.frequencyBinCount);

// Listen for if audio can play, and connect source and analyser
audio.addEventListener('canplay', function() {
  var source = context.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(context.destination);

  // UNCOMMENT BELOW FOR PRODUCTION
  // ++++++++++++++++++++++++++++++
  setTimeout(function() {
    document.querySelector('#init').classList.add('init--hidden');
    audio.play();
    d3.timer(pulse);
    initGestures();
  }, 2000);
  
  // COMMENT BELOW FOR PRODUCTION
  // ++++++++++++++++++++++++++++
  // document.querySelector('#init').classList.add('init--hidden');
  // audio.play();
  // d3.timer(pulse);
  // initGestures();
});

// Set up visualization stage
var v = d3.select('#visualization');

// Append num nodes to start
for (var i = 0; i < numParticles; i++) {
  var cx = Math.random() * 100 + '%';
  var cy = Math.random() * 100 + '%';

  var node = v.append('circle')
   .attr('class', 'node')
   .attr('cx', cx)
   .attr('cy', cy)
   .attr('r', 2)
   .attr('fill', colours[i % 4]);

  nodes.push(node);
}

// This is the pulse callback that gets passed into the d3 timer
var pulse = function() {
  analyser.getFloatFrequencyData(frequencyData);    
  v.selectAll('.node')
   .data(frequencyData)
   .style('transform', function(d) {
     return 'scale(' + Math.abs(d)/10 + ')';
   });
};

// Gestures for mouse movement
var initGestures = function() {
  d3.select('body').on('mousemove', function(e) {
    var mouseX = d3.event.x;
    var mouseY = d3.event.y;

    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      
    }
  });
};

})();