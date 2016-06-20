window.codeScope = 'D3Reddit';
window.D3Reddit = {

  visualize(redditData, display = '.display') {
    this.display = display;
    this.visualizeTable(redditData);
  },

  visualizeTable(redditData) {
    const tableContainer = d3.select(this.display)
      .append('div')
      .classed('table', true);

    const table = d3.chart.table();

    table.data(redditData);

    table(tableContainer);
  }
};
