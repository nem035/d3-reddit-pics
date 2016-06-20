window.fillColor = '#00e676';
window.transitionTime = 300;

if (!d3.chart) {
  d3.chart = {};
}

function getContainerDim(container) {
  const containerHeight = parseInt(container.style('height'));
  const minHeight = containerHeight / 12;
  const maxHeight = containerHeight - minHeight;

  const containerWidth = parseInt(container.style('width'));
  const minWidth = containerWidth / 12;
  const maxWidth = containerWidth - minWidth;

  return {
    containerHeight,
    minHeight,
    maxHeight,
    containerWidth,
    minWidth,
    maxWidth
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
