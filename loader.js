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

    // extract data props and
    // convert dates because reddit uses seconds
    const data = json.data.children
      .map(({ data }) => {
        data.created = data.created * 1000;
        return data;
      });

    const route = window.location.pathname;
    if (route === '/project/') {
        window.D3Reddit.visualize(data);
    } else {
      // create specific chart using the reusable chart pattern
      const container = d3.select('.viz-container');
      const chart = d3.chart[window.codeScope]();
      chart.data(data);
      chart({
        container
      });
    }
  });
}
