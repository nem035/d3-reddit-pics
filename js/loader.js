window.location.hash = `#${getVizNamesFromHash()}`;

document.addEventListener('DOMContentLoaded', (event) => {
  if (window.d3) {
    init();
    setupCheckboxes();
    updateAndVisualize();
  } else {
    resetLoading();
    createErrorBox({ message: 'Check your internet connection' });
  }
});

function updateAndVisualize() {
  clearContent();
  setLoading();
  d3.json('https://www.reddit.com/r/pics.json', (error, json) => {
    resetLoading();
    destroyErrorBox();
    if (error) {
      createErrorBox(error);
      return console.error(error);
    }
    if (!json || !json.data || !json.data.children) {
      createErrorBox({ message: 'Missing Reddit Data'});
      return console.error(error);
    }

    const data = cleanData(json);

    if (!window.d3Reddit) {
      window.d3Reddit = new D3Reddit(data);
    }
    window.d3Reddit.visualize();
  });
}
