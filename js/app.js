window.D3Reddit = {

  xRange: null,
  yRange: null,

  visualize(redditData, vizNames = ['axis', 'bar', 'brush', 'line', 'scatter', 'table']) {
    // setup
    const data = redditData.sort((a, b) => a.created - b.created);
    const vizContainer = d3.select('.viz-container');

    const {
      xRange,
      yRange,
    } = getContainerDim(vizContainer);

    this.vizContainer = vizContainer;
    this.xRange = xRange;
    this.yRange = yRange;

    // show specified visualizations
    vizNames.forEach(viz => {
      this[viz](data);
    });
  },

  loadViz(vizName, data) {
    const container = this.vizContainer
      .append('div')
      .classed(`viz ${vizName}`, true)
      .append('svg')
      .append('g');

    const chart = d3.redditChart[vizName]()
      .data(data);

    return {
      container,
      chart,
    };
  },

  axis(data) {
    const {
      chart: axis,
      container,
    } = this.loadViz('axis', data);

    axis.xRange(this.xRange)
      .yRange(this.yRange);

    axis(container);
  },

  bar(data) {
    const {
      chart: bar,
      container,
    } = this.loadViz('bar', data);

    bar.xRange(this.xRange)
    .yRange(this.yRange);

    bar(container);
  },

  brush(data) {
    const {
      chart: brush,
      container,
    } = this.loadViz('brush', data);

    brush.xRange(this.xRange);

    brush(container);

    d3.select('.viz.brush')
      .style({
        'margin-top': this.vizContainer.style('height')
      })
  },

  line(data) {
    const {
      chart: line,
      container,
    } = this.loadViz('line', data);

    line.xRange(this.xRange)
    .yRange(this.yRange);

    line(container);
  },

  scatter(data) {
    const {
      chart: scatter,
      container,
    } = this.loadViz('scatter', data);

    scatter.xRange(this.xRange)
    .yRange(this.yRange);

    scatter(container);

    const tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(d => `<strong>Score:</strong> <span>${d.score}</span>`);

    d3.select('.viz.scatter > svg').call(tip);

    d3.selectAll('circle')
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);
  },

  table(data) {
    const {
      chart: table,
      container,
    } = this.loadViz('table', data);

    table(container);
  }
};
