function D3Reddit(data) {

  // setup
  const vizContainer = d3.select('.viz-container');
  const {
    padding,
    axisXSpacing,
    axisYSpacing,
    width,
    height,
    xRange,
    yRange,
  } = getContainerDim(vizContainer);

  this.data = data;
  this.vizContainer = vizContainer;
  this.padding = padding;
  this.axisXSpacing = axisXSpacing;
  this.axisYSpacing = axisYSpacing;
  this.width = width;
  this.height = height;
  this.xRange = xRange;
  this.yRange = yRange;

  this.visualize = (visualizations) => {
    getVizNamesFromHash().forEach(viz => this[viz]());
  },

  this.loadChart = (vizName) => {
    return d3.redditChart[vizName]()
      .data(this.data);
  },

  this.loadViz = (vizName) => {
    const container = this.vizContainer
      .append('div')
      .classed(`viz ${vizName}`, true)
      .append('svg')
      .append('g');

    const chart = this.loadChart(vizName);

    return {
      container,
      chart,
    };
  },

  this.axis = () => {
    const {
      chart: axis,
      container,
    } = this.loadViz('axis');

    axis.xRange(this.xRange)
      .yRange(this.yRange);

    axis(container);
  },

  this.bar = (data) => {
    const {
      chart: bar,
      container,
    } = this.loadViz('bar');

    bar.xRange(this.xRange)
    .yRange(this.yRange);

    bar(container);
  },

  this.brush = (data) => {
    const {
      chart: brush,
      container,
    } = this.loadViz('brush');

    brush.xRange(this.xRange);

    brush(container);

    const brushHeight = 30;
    d3.select('.viz.brush')
      .style({
        'margin-top': `${this.height}px`
      })
  },

  this.line = (data) => {
    const {
      chart: line,
      container,
    } = this.loadViz('line');

    line.xRange(this.xRange)
    .yRange(this.yRange);

    line(container);
  },

  this.scatter = (data) => {
    const {
      chart: scatter,
      container,
    } = this.loadViz('scatter');

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

  this.table = (data) => {
    const table = this.loadChart('table');
    const container = this.vizContainer
      .append('div')
      .classed('viz table', true);

    table(container);

    const brushHeight = 30;
    d3.select('.viz.table')
      .style({
        'margin-top': `${this.height + brushHeight + this.padding}px`
      })
  }
};
