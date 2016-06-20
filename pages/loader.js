document.addEventListener('DOMContentLoaded', (event) => {
  window.fillColor = '#00e676';
  window.transitionTime = 300;
  updateAndVisualize();
});

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
