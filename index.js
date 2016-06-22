window.transitionTime = 300;
window.color = {
  black: '#263238',
  green: '#00e676',
  gray: '#b0bec5',
  lightgray: '#eceff1',
  orange: '#ff9100',
  yellow: '#00bfa5',
  teal: '#eeff41',
};

if (!d3.redditChart) {
  d3.redditChart = {};
}

function getContainerDim(container) {
  const ref = (() => {
    while (!container.style) {
      container = container.parentElement;
    }
    return container;
  })();

  const padding = 10;

  const height = parseInt(ref.style('height'));
  const minHeight = height / 12;
  const maxHeight = height - minHeight;

  const width = parseInt(ref.style('width'));
  const minWidth = width / 12;
  const maxWidth = width - minWidth;

  const xRange = [ 50, width - padding ];
  const yRange = [ padding, height - 30 ];

  return {
    padding,
    height,
    minHeight,
    maxHeight,
    width,
    minWidth,
    maxWidth,
    xRange,
    yRange,
  };
}

function animateElemCreation(elem) {
  elem.style('opacity', 0)
    .transition()
    .duration(window.transitionTime)
    .style('opacity', 1);
}

function animateElemDestruction(elem) {
  elem.style('opacity', 1)
    .transition()
    .duration(window.transitionTime)
    .style('opacity', 0)
    .remove();
}

function createLoadingSlider() {
  const slider = d3.select('body')
    .insert('div', ':first-child')
    .classed('loading-slider', true);

  animateElemCreation(slider);

  slider.append('div').classed('line', true);
  slider.append('div').classed('break dot1', true);
  slider.append('div').classed('break dot2', true);
  slider.append('div').classed('break dot3', true);
}

function destroyLoadingSlider() {
  animateElemDestruction(d3.select('.loading-slider'));
}

function createErrorBox(error) {
  const message = error.responseText || error.message || 'Uknown Error';

  const errorBox = d3.select('body')
    .insert('div', ':first-child')
    .classed('error-box', true);

  animateElemCreation(errorBox);

  errorBox.append('error-message')
    .text(message);
}

function destroyErrorBox() {
  animateElemDestruction(d3.select('.error-box'));
}

function clearContent() {
  d3.selectAll('.viz-container > *').remove();
}
