window.codeScope = 'D3Reddit';
window.D3Reddit = {

  visualize(data) {
    this.visualizeTable(data);
    this.visualizeScatter(data);
  },

  visualizeTable(data) {
    const container = d3.select('.viz-container')
      .append('div')
      .classed('table-container', true);

    const table = d3.chart.table();

    table.data(data);

    table({ container });
  },

  visualizeScatter(data) {
    const container = d3.select('.viz-container')
      .append('svg')
      .classed('scatter-container', true);

    const scatter = d3.chart.scatter();

    scatter.data(data);

    scatter({ container });
  }
};
