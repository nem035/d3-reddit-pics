document.addEventListener('DOMContentLoaded', (event) => {
  updateAndVisualize();
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

    // extract data props
    // add placeholder thumbnails when missing
    // convert dates because reddit uses seconds
    const {
      hostname,
      origin
    } = window.location;
    const baseURL = hostname === 'localhost' ? origin : 'https://nem035.github.io/d3-reddit-pics';
    const cleanData = json.data.children
      .map(({ data }) => {
        data.created = data.created * 1000;
        if (data.thumbnail.indexOf('://') === -1) {
          data.thumbnail = `${baseURL}/img/placeholder-140x140.png`;
        }
        return data;
      })
      .sort((a, b) => a.created - b.created);

    const vizs = ['axis', 'bar', 'brush', 'line', 'scatter'];

    window.data = cleanData;

    D3Reddit.visualize(cleanData, vizs);
  });
}
