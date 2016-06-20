document.addEventListener('DOMContentLoaded', (event) => {
  updateAndVisualize();
});

function updateAndVisualize() {
  clearContent();
  createLoadingSlider();
  window.d3.json('https://www.reddit.com/r/pics.json', (error, json) => {
    if (error) {
      return console.error(error);
    }
    destroyLoadingSlider();
    visualize(json); // defined per individual page
  });
}
