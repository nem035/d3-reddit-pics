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
    getVizNamesFromHash().forEach(viz => this[`${viz}Viz`]());
  };

  this.loadChart = (vizName) => {
    return d3.redditChart[vizName]()
      .data(this.data);
  };

  this.getVizContainer = (vizName) => {
    const container = d3.select(`.${vizName}`);
    return container[0][0] ? container : this.vizContainer
      .append('div')
      .classed(`viz ${vizName}`, true)
      .append('svg')
      .append('g');
  };

  this.loadViz = (vizName) => {
    const container = this.getVizContainer(vizName);
    const chart = this.loadChart(vizName);

    return {
      container,
      chart,
    };
  };

  this.axisViz = () => {
    const {
      chart: axis,
      container,
    } = this.loadViz('axis');

    const xRange = [this.xRange[0], this.xRange[1] + 5]
    const yRange = this.yRange;
    axis.xRange(xRange)
      .yRange(yRange);

    this.axis = axis(container);
  };

  this.barViz = () => {
    const {
      chart: bar,
      container,
    } = this.loadViz('bar');

    bar.xRange([this.xRange[0], this.xRange[1] + 5])
    .yRange(this.yRange);

    this.bar = bar(container);
  };

  this.brushViz = () => {
    const {
      chart: brush,
      container,
    } = this.loadViz('brush');

    brush.xRange([this.xRange[0], this.xRange[1] + 5]);

    this.brush = brush(container);

    brush.on('brushFilter', (filtered) => {
      this.data = filtered;
      this.scatterViz();
    });

    d3.select('.viz.brush')
      .style({
        'margin-top': `${this.height - window.yAxisSpacing - 40}px`
      })
  };

  this.lineViz = () => {
    const {
      chart: line,
      container,
    } = this.loadViz('line');

    container.attr('transform', 'translate(5, 5)');

    this.line = line.xRange(this.xRange)
    .yRange([this.yRange[0] + 5, this.yRange[1]]);

    line(container);
  };

  this.scatterViz = () => {
    const {
      chart: scatter,
      container,
    } = this.loadViz('scatter');

    container.attr('transform', 'translate(5, 5)');

    this.scatter = scatter.xRange(this.xRange)
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
      .on('mouseover', function() {
        console.log(this);
        tip.show.apply(this, arguments);
      })
      .on('mouseout', tip.hide);
  };

  this.tableViz = () => {
    const table = this.loadChart('table');
    const container = this.vizContainer
      .append('div')
      .classed('viz table', true);

    this.table = table(container);

    d3.select('.viz.table')
      .style({
        'margin-top': `${this.height + window.brushHeight}px`
      })
  };
};
