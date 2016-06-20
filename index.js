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
