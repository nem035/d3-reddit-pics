document.addEventListener('DOMContentLoaded', (event) => {
  updateAndVisualize();
});

function updateAndVisualize() {
  clearContent();
  createLoadingSlider();
  window.d3.json('https://www.reddit.com/r/pics.json', (error, json) => {
    destroyLoadingSlider();
    destroyErrorBox();
    if (error) {
      createErrorBox(error);
      return console.error(error);
    }
    if (!json || !json.data) {
      createErrorBox({ message: 'Missing Reddit Data'});
      return console.error(error);
    }
    window[window.codeScope].visualize(json); // defined per individual page
  });
}
