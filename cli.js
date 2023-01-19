const { mdLinks } = require('./index.js');

mdLinks('./README.md')
  .then(() => {})
  .catch((error) => {
    console.log(error);
  });
