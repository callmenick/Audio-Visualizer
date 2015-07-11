# Audio Visualization Using D3 & the Web Audio API

A simple audio visualization demo using D3 and the Web Audio API. Using the Audio API enabled me to keep track of audio frequency as the song played, attach frequency to nodes, and make the nodes pulse as frequency changes.

The nodes are SVG elements, and they blend using CSS3 blend modes. D3's timer api is used to constantly keep track of frequencies, and update the nodes via a CSS transform.

## Potential Future Upgrades

* Force exerted on nodes via mouse move
* Song selection from sound cloud via api calls
* Colour theme selection

## Gotchas

Audio stuff sometimes doesn't initialize properly, even though it's run in the `canplay` event. In that case, just refresh the page.

## Live Demo

[View the live demo here.](http://callmenick.com/_development/d3-audio-visualizer/)