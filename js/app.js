function D3Reddit(data) {

  // setup
  const vizContainerLeft = d3.select('.viz-container.left');
  const vizContainerRight = d3.select('.viz-container.right');

  const {
    height: heightLeft,
    xRange: xRangeLeft,
    yRange: yRangeLeft,
  } = getLeftContainerDim(vizContainerLeft);

  this.vizContainerLeft = vizContainerLeft;
  this.heightLeft = heightLeft;
  this.xRangeLeft = xRangeLeft;
  this.yRangeLeft = yRangeLeft;

  const {
    height: heightRight,
    xRange: xRangeRight,
    yRange: yRangeRight,
  } = getRightContainerDim(vizContainerRight);

  this.vizContainerRight = vizContainerRight;
  this.heightRight = heightRight;
  this.xRangeRight = xRangeRight;
  this.yRangeRight = yRangeRight;

  this.data = data;
  this.isShowingTable = true;

  this.visualize = () => {
    this.activeVisualizations = getVizNamesFromHash();
    this.persistentVisualizations = ['axis', 'brush', 'table', 'histogram'];
    this.filterableVisualizations = [ 'table', 'histogram' ].concat(this.activeVisualizations);

    this.activeVisualizations
      .concat(this.persistentVisualizations)
      .forEach(viz => this[`${viz}Viz`]());

    d3.select('.viz.histogram')
      .classed('hide', true);

    d3.select('.tab-data')
      .on('click', () => {
        d3.select('.menu-right .data')
          .classed('selected', true);
        d3.select('.menu-right .histogram')
          .classed('selected', false);
        this.showTable();
      });

    d3.select('.tab-histogram')
      .on('click', () => {
        d3.select('.menu-right .histogram')
          .classed('selected', true);
        d3.select('.menu-right .data')
          .classed('selected', false);
        this.showHistogram();
      });
  };

  this.loadChart = (vizName) => {
    return redditChart[vizName]()
      .data(this.data);
  };

  this.getVizContainer = (vizName, side) => {
    const container = d3.select(`.viz.${vizName}`);
    return container[0][0] ?
      container :
      (side === 'left' ? this.vizContainerLeft : this.vizContainerRight)
        .append('div')
        .classed(`viz ${vizName}`, true);
  };

  this.loadViz = (vizName, side) => {
    const container = this.getVizContainer(vizName, side);
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
    } = this.loadViz('axis', 'left');

    container.attr('transform', 'translate(0, 5)');

    axis.xRange([this.xRangeLeft[0], this.xRangeLeft[1] + 5])
      .yRange(this.yRangeLeft);

    const g = container.append('svg')
      .append('g');
    axis(g);

    this.axis = axis;
  };

  this.barViz = () => {
    const {
      chart: bar,
      container,
    } = this.loadViz('bar', 'left');

    container.attr('transform', 'translate(0, 5)');

    bar.xRange([this.xRangeLeft[0], this.xRangeLeft[1] + 5])
    .yRange(this.yRangeLeft);

    const g = container.append('svg')
      .append('g');
    bar(g);

    this.bar = bar;
  };

  this.brushViz = () => {
    const {
      chart: brush,
      container,
    } = this.loadViz('brush', 'left');

    brush.xRange([this.xRangeLeft[0], this.xRangeLeft[1] + 5]);

    const g = container.append('svg')
      .append('g');
    brush(g);

    brush.on('filter', (filtered, minCreated, maxCreated) => {
      this.data = filtered;

      this.axis
        .data(filtered)
        .render([ minCreated, maxCreated ]);

      this.filterableVisualizations
        .forEach(viz => {
          this[viz].data(filtered)
            .render()
          });

      d3.select('.timespan .from')
        .text(window.timeFormat(minCreated));

      d3.select('.timespan .to')
        .text(window.timeFormat(maxCreated));
    });

    d3.select('.viz.brush')
      .style('margin-top', `${this.heightLeft - window.yAxisSpacing - 40}px`);

    this.brush = brush;
  };

  this.histogramViz = () => {
    const {
      chart: histogram,
      container,
    } = this.loadViz('histogram', 'right');

    histogram.xRange(this.xRangeRight)
    .yRange(this.yRangeRight);

    const g = container.append('svg')
      .append('g');
    histogram(g);

    histogram.on('mouseOver', d => {
      if (this.scatter) {
        this.scatter.highlight(d);
      }
      this.brush.highlight(d);
    });

    histogram.on('mouseOut', (d) => {
      if (this.scatter) {
        this.scatter.unhighlight(d);
      }
      this.brush.unhighlight(d);
    });

    this.histogram = histogram;
  },

  this.lineViz = () => {
    const {
      chart: line,
      container,
    } = this.loadViz('line', 'left');

    container.attr('transform', 'translate(5, 10)');

    line.xRange(this.xRangeLeft)
    .yRange([this.yRangeLeft[0] + 5, this.yRangeLeft[1]]);

    const g = container.append('svg')
      .append('g');
    line(g);

    this.line = line;
  };

  this.scatterViz = () => {
    const {
      chart: scatter,
      container,
    } = this.loadViz('scatter', 'left');

    container.attr('transform', 'translate(5, 10)');

    scatter.xRange(this.xRangeLeft)
      .yRange([this.yRangeLeft[0] + 5, this.yRangeLeft[1]]);

    const g = container.append('svg')
      .append('g');
    scatter(g);

    scatter.on('mouseOver', d => {
      this.brush.highlight(d);
      if (this.isShowingTable) {
        this.table.highlight([ d ]);
        this.table.scrollTo([ d ]);
      } else {
        this.histogram.highlight([ d ]);
      }
    });

    scatter.on('mouseOut', (d) => {
      if (this.isShowingTable) {
         this.table.unhighlight([ d ]);
      } else {
        this.histogram.unhighlight([ d ]);
      }
    });

    this.scatter = scatter;

  };

  this.tableViz = () => {
    const {
      chart: table,
      container,
    } = this.loadViz('table', 'right');

    table(container);

    table.on('mouseOver', d => {
      if (this.scatter) {
        this.scatter.highlight([ d ]);
      }
    });

    table.on('mouseOut', () => {
      if (this.scatter) {
        this.scatter.unhighlightAll();
      }
    });

    this.table = table;
  };

  this.showTable = () => {
    d3.select('.viz.histogram')
      .classed('hide', true);

    d3.select('.viz.table')
      .classed('hide', false);

    this.isShowingTable = true;
  },

  this.showHistogram = () => {
    d3.select('.viz.table')
      .classed('hide', true);

    d3.select('.viz.histogram')
      .classed('hide', false);

    this.isShowingTable = false;
  }
};
