window.codeScope = 'D3Reddit';
window.D3Reddit = {

  visualize(data) {
    loadChart('axis', data.sort((a, b) => a.created - b.created));
    loadChart('bar', data.sort((a, b) => a.created - b.created));
    loadChart('brush', data.sort((a, b) => a.created - b.created));
    loadChart('line', data.sort((a, b) => a.created - b.created));
    loadChart('scatter', data.sort((a, b) => a.created - b.created));
    loadChart('table', data.sort((a, b) => a.created - b.created));
  },
};
