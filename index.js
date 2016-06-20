function createLoadingSlider() {
  const slider = d3.select('body')
    .insert('div', ':first-child')
    .classed('loading-slider', true);

  slider.append('div').classed('line', true);
  slider.append('div').classed('break dot1', true);
  slider.append('div').classed('break dot2', true);
  slider.append('div').classed('break dot3', true);
}

function destroyLoadingSlider() {
  d3.select('.loading-slider').remove();
}
