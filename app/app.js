window.codeScope = 'D3Reddit';
window.D3Reddit = {

  visualize(redditData) {
    const data = redditData.sort((a, b) => a.created - b.created);
    const vizContainer = d3.select('.viz-container');
    [ 'axis', 'bar', 'brush', 'line', 'scatter' ].forEach(name => {
      const container = vizContainer.append('div')
        .classed(`container ${name}-container`, true)
        .append('svg');

      loadChart({
        name,
        data,
        container
      })
    });
  },
};
