setInterval(() => {
  fetch('https://6442459433997d3ef90c1331.mockapi.io/users')
    .then(data => {
      self.postMessage({
        data
      });
    })
    .catch(error => {
      self.postMessage({
        error
      });
    });
}, 1000);
