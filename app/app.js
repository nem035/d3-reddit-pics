window.codeScope = 'D3Reddit';
window.D3Reddit = {

  xRange: null,
  yRange: null,

  visualize(redditData) {
    // setup
    const data = redditData.sort((a, b) => a.created - b.created);
    const vizContainer = d3.select('.viz-container');

    // dimensions
    const {
      minWidth,
      maxWidth,
      minHeight,
      maxHeight
    } = getContainerDim(vizContainer);

    this.xRange = [ minWidth, maxWidth ];
    this.yRange = [ minHeight, maxHeight ];

    // visualizations
    this.showAxis(data, vizContainer);
    this.showBar(data, vizContainer);
    this.showBrush(data, vizContainer);
    this.showLine(data, vizContainer);
    this.showScatter(data, vizContainer);
  },

  showAxis(data, parent) {
    const container = parent.append('div')
      .classed(`viz axis`, true)
      .append('svg')
      .append('g');

    const axis = d3.redditChart
      .axis()
      .data(data)
      .xRange(this.xRange)
      .yRange(this.yRange);

    axis(container);
  },

  showBar(data, parent) {
    const container = parent.append('div')
      .classed(`viz bar`, true)
      .append('svg')
      .append('g');

    const bar = d3.redditChart
      .bar()
      .data(data)
      .xRange(this.xRange)
      .yRange(this.yRange)
      .width(5);

    bar(container);
  },

  showBrush(data, parent) {
    const container = parent.append('div')
      .classed(`viz brush`, true)
      .append('svg')
      .append('g');

    const brush = d3.redditChart
      .brush()
      .data(data)
      .xRange(this.xRange)
      .width(5)
      .height(30);

    brush(container);
  },

  showLine(data, parent) {
    const container = parent.append('div')
      .classed(`viz line`, true)
      .append('svg')
      .append('g');

    const line = d3.redditChart
      .line()
      .data(data)
      .xRange(this.xRange)
      .yRange(this.yRange)
      .width(5);

    line(container);
  },

  showScatter(data, parent) {
    const container = parent.append('div')
      .classed(`viz scatter`, true)
      .append('svg')
      .append('g');

    const scatter = d3.redditChart
      .scatter()
      .data(data)
      .xRange(this.xRange)
      .yRange(this.yRange)
      .radius(5);

    scatter(container);
  }
};
