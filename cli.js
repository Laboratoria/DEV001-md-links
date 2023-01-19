const { mdLinks } = require('./index.js');

mdLinks('./thumb.png')
  .then(() => {})
  .catch((error) => {
    console.log(error);
  });
