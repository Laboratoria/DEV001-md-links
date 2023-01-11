const { mdLinks } = require('./index.js');

mdLinks('/Documents/noexiste.md')
  .then(() => {})
  .catch((error) => {
    console.log(error);
  });
