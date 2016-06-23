function D3Reddit(data) {

  // setup
  const vizContainer = d3.select('.viz-container');
  const {
    width,
    height,
    xRange,
    yRange,
  } = getContainerDim(vizContainer);

  this.data = data;
  this.vizContainer = vizContainer;
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

    const xRange = [this.xRange[0], this.xRange[1] + 5]
    const yRange = this.yRange;
    axis.xRange(xRange)
      .yRange(yRange);

    axis(container);
  },

  this.bar = (data) => {
    const {
      chart: bar,
      container,
    } = this.loadViz('bar');

    bar.xRange([this.xRange[0], this.xRange[1] + 5])
    .yRange(this.yRange);

    bar(container);
  },

  this.brush = (data) => {
    const {
      chart: brush,
      container,
    } = this.loadViz('brush');

    brush.xRange([this.xRange[0], this.xRange[1] + 5]);

    brush(container);

    brush.on('brushFilter', function(data) {
      console.log(data);
    });

    d3.select('.viz.brush')
      .style({
        'margin-top': `${this.height - window.yAxisSpacing - 40}px`
      })
  },

  this.line = (data) => {
    const {
      chart: line,
      container,
    } = this.loadViz('line');

    container.attr('transform', 'translate(5, 5)');

    line.xRange(this.xRange)
    .yRange([this.yRange[0] + 5, this.yRange[1]]);

    line(container);
  },

  this.scatter = (data) => {
    const {
      chart: scatter,
      container,
    } = this.loadViz('scatter');

    container.attr('transform', 'translate(5, 5)');

    scatter.xRange(this.xRange)
      .yRange([this.yRange[0] + 5, this.yRange[1]]);

    scatter(container);

    const tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(d => (
        `<div class="score">
          <strong>Score:</strong> <span>${d.score}</span>
        </div>
        <div class="created">
          <strong>Created:</strong> <span>${getAxisTimeFormat(d.created)}</span>
        </div>`
      ));

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

    d3.select('.viz.table')
      .style({
        'margin-top': `${this.height + window.brushHeight}px`
      })
  }
};
