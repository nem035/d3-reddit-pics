document.addEventListener('DOMContentLoaded', (event) => {
  window.fillColor = '#00e676';
  window.d3.json('https://www.reddit.com/r/pics.json', (error, json) => {
    if (error) {
      return console.error(error);
    }
    visualize(json); // defined outside
  });
});
