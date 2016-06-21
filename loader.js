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
    const cleanData = json.data.children
      .filter(({ data }) => data.thumbnail !== 'self')
      .map(({ data }) => {
        data.created = data.created * 1000;
        return data;
      });

    const { codeScope } = window;
    if (codeScope === 'D3Reddit') {
        window.D3Reddit.visualize(cleanData);
    } else {
      const name = window.codeScope;
      const data = cleanData.sort((a, b) => a.created - b.created);

      let container;
      if (name === 'table') {
        container = d3.select('.viz-container');
      } else {
        container = d3.select('.viz-container')
          .append(`svg`)
          .classed(`${name}-container`, true);
      }

      // load a specific chart using the reusable chart pattern
      loadChart({
        name,
        data,
        container,
      });
    }
  });
}
