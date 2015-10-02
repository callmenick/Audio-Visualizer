(function() {

  'use strict';

  /**
   * v
   * 
   * @description The visualisation stage
   */
  var v = d3.select('#visualization');

  /**
   * defaults
   *
   * @description Some default variables
   */
  var numParticles = 256;
  var colours = ['#ff0046', '#ffd700', '#99ff00', '#00ccff'];
  var nodes = [];
  var AudioContext = window.AudioContext || window.webkitAudioContext;
  var context = new AudioContext;
  var audio = document.querySelector('#audio');
  
  /**
   * analyser
   *
   * @description The analyser
   */
  var analyser = context.createAnalyser();
  analyser.fftSize = numParticles * 2;
  
  /**
   * frequencyData
   *
   * @description Initializes the frequency data
   */
  var frequencyData = new Float32Array(analyser.frequencyBinCount);

  /**
   * source
   *
   * @description Hooks up the source and destination for the audio
   */
  var source = context.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(context.destination);

  /**
   * init
   * 
   * @description Initializes the visualization
   */
  var init = function() {
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

    setTimeout(function() {
      document.querySelector('#init').classList.add('init--hidden');
      audio.play();
      d3.timer(pulse);
    }, 2000);
  };

  /**
   * pulse
   * 
   * @description Pulses all the nodes
   */
  var pulse = function() {
    analyser.getFloatFrequencyData(frequencyData);    
    v.selectAll('.node')
     .data(frequencyData)
     .style('transform', function(d) {
       return 'scale(' + Math.abs(d)/10 + ')';
     });
  };

  init();

})();