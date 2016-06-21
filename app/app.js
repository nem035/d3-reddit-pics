window.codeScope = 'D3Reddit';
window.D3Reddit = {

  visualize(data) {
    const sortedByCreationDate = data.sort((a, b) => a.created - b.created);
    loadChart('axis', sortedByCreationDate);
    loadChart('bar', sortedByCreationDate);
    loadChart('brush', sortedByCreationDate);
    loadChart('line', sortedByCreationDate);
    loadChart('scatter', sortedByCreationDate);
    loadChart('table', sortedByCreationDate);
  },
};
