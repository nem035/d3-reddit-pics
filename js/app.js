function D3Reddit(data) {

  // setup
  const vizContainerLeft = d3.select('.viz-container.left');
  const vizContainerRight = d3.select('.viz-container.right');

  const {
    width,
    height,
    xRange,
    yRange,
  } = getContainerDim(vizContainerLeft);

  this.data = data;
  this.vizContainerLeft = vizContainerLeft;
  this.vizContainerRight = vizContainerRight;
  this.width = width;
  this.height = height;
  this.xRange = xRange;
  this.yRange = yRange;

  this.visualize = (visualizations) => {
    getVizNamesFromHash().concat(['axis', 'brush', 'table'])
      .forEach(viz => this[`${viz}Viz`]());
  };

  this.loadChart = (vizName) => {
    return d3.redditChart[vizName]()
      .data(this.data);
  };

  this.getVizContainer = (vizName) => {
    const container = d3.select(`.${vizName}`);
    return container[0][0] ? container : this.vizContainerLeft
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

    container.attr('transform', 'translate(0, 5)');

    axis.xRange([this.xRange[0], this.xRange[1] + 5])
      .yRange(this.yRange);

    axis(container);

    this.axis = axis;
  };

  this.barViz = () => {
    const {
      chart: bar,
      container,
    } = this.loadViz('bar');

    container.attr('transform', 'translate(0, 5)');

    bar.xRange([this.xRange[0], this.xRange[1] + 5])
    .yRange(this.yRange);

    bar(container);

    this.bar = bar;
  };

  this.brushViz = () => {
    const {
      chart: brush,
      container,
    } = this.loadViz('brush');

    brush.xRange([this.xRange[0], this.xRange[1] + 5]);

    brush(container);

    brush.on('brushFilter', (filtered) => {
      this.data = filtered;

      // rerender bar plot with filtered data
      this.bar
        .data(filtered)
        .render();

      // rerender line plot with filtered data
      this.line
        .data(filtered)
        .render();

      // rerender scatter plot with filtered data
      this.scatter
        .data(filtered)
        .render();

      // rerender the table with filtered data
      this.table
        .data(filtered)
        .render();

      // rerender x-axis with the dates from the filtered data
      this.axis
        .data(filtered)
        .render();
    });

    d3.select('.viz.brush')
      .style('margin-top', `${this.height - window.yAxisSpacing - 40}px`);

    this.brush = brush;
  };

  this.lineViz = () => {
    const {
      chart: line,
      container,
    } = this.loadViz('line');

    container.attr('transform', 'translate(5, 10)');

    line.xRange(this.xRange)
    .yRange([this.yRange[0] + 5, this.yRange[1]]);

    line(container);

    this.line = line;
  };

  this.scatterViz = () => {
    const {
      chart: scatter,
      container,
    } = this.loadViz('scatter');

    container.attr('transform', 'translate(5, 10)');

    scatter.xRange(this.xRange)
      .yRange([this.yRange[0] + 5, this.yRange[1]]);

    scatter(container);

    scatter.on('circleMouseOver', d => {
      this.table.highlightRows([ d ]);
    });

    scatter.on('circleMouseOut', (d) => {
      this.table.unhighlightRows([ d ]);
    });

    this.scatter = scatter;

  };

  this.tableViz = () => {
    const table = this.loadChart('table');
    const container = this.vizContainerRight
      .append('div')
      .classed('viz table', true);

    table(container);

    table.on('rowMouseOver', d => {
      this.scatter.highlightCircles([ d ]);
    });

    table.on('rowMouseOut', () => {
      this.scatter.unhighlightAllCircles();
    });

    this.table = table;
  };
};
