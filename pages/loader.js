document.addEventListener('DOMContentLoaded', (event) => {
  window.fillColor = '#00e676';
  window.transitionTime = 300;
  updateAndVisualize();
});

function createLoadingSlider() {
  const slider = d3.select('body')
    .insert('div', ':first-child')
    .classed('loading-slider', true);

  slider.append('div').classed('line', true);
  slider.append('div').classed('break dot1', true);
  slider.append('div').classed('break dot2', true);
  slider.append('div').classed('break dot3', true);
}

function destroyLoadingSlider() {
  d3.select('.loading-slider').remove();
}

function updateAndVisualize() {
  d3.selectAll('svg > *').remove();
  d3.selectAll('.display > *').remove();
  createLoadingSlider();
  window.d3.json('https://www.reddit.com/r/pics.json', (error, json) => {
    if (error) {
      return console.error(error);
    }
    destroyLoadingSlider();
    visualize(json); // defined per individual page
  });
}
