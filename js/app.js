window.D3Reddit = {

  xRange: null,
  yRange: null,

  visualize(redditData) {
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

    // visualizations
    this.showViz('axis', data);
    this.showViz('bar', data);
    // this.showViz('brush', data);
    this.showViz('line', data);
    this.showViz('scatter', data);
  },

  showViz(vizName, data) {
     const container = this.vizContainer
      .append('div')
      .classed(`viz ${vizName}`, true)
      .append('svg')
      .append('g');

    const viz = d3.redditChart[vizName]()
      .data(data)
      .xRange(this.xRange)
      .yRange(this.yRange);

    viz(container);
  },
};
