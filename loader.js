document.addEventListener('DOMContentLoaded', (event) => {
  updateAndVisualize();
});

function updateAndVisualize() {
  clearContent();
  createLoadingSlider();
  window.d3.json('https://www.reddit.com/r/pics.json', (error, json) => {
    destroyLoadingSlider();
    if (error) {
      alert(error);
      return console.error(error);
    }
    visualize(json); // defined per individual page
  });
}
