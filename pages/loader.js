document.addEventListener('DOMContentLoaded', (event) => {
  window.fillColor = '#c51162';
  window.d3.json('https://www.reddit.com/r/pics.json', (error, json) => {
    if (error) {
      return console.error(error);
    }
    visualize(json); // defined outside
  });
});
