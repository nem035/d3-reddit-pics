window.fillColor = '#00e676';
window.transitionTime = 300;

if (!d3.chart) {
  d3.chart = {};
}

function getContainerDim(container) {
  let ref = container instanceof SVGElement ? container.parentElement : container;

  const height = parseInt(ref.style('height'));
  const minHeight = height / 12;
  const maxHeight = height - minHeight;

  const width = parseInt(ref.style('width'));
  const minWidth = width / 12;
  const maxWidth = width - minWidth;

  return {
    height,
    minHeight,
    maxHeight,
    width,
    minWidth,
    maxWidth,
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

// create specific chart using the reusable chart pattern
function loadChart({ name, data, container }) {

  const chart = d3.chart[name]()
    .data(data);

  chart({
    container
  });
}
