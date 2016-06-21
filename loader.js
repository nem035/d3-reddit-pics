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
    if (!json || !json.data || !json.data.children) {
      createErrorBox({ message: 'Missing Reddit Data'});
      return console.error(error);
    }

    // extract data props
    // filter out self linked data item
    // convert dates because reddit uses seconds
    const data = json.data.children
      .filter(({ data }) => data.thumbnail !== 'self')
      .map(({ data }) => {
        data.created = data.created * 1000;
        return data;
      });

    const { codeScope } = window;
    if (codeScope === 'D3Reddit') {
        window.D3Reddit.visualize(data);
    } else {
      // load a specific chart using the reusable chart pattern
      loadChart(window.codeScope, data.sort((a, b) => a.created - b.created));
    }
  });
}
