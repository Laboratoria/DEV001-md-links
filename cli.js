const { mdLinks } = require('./index.js');

mdLinks('./readme.md', 'validate')
  .then(() => {})
  .catch((error) => {
    console.log(error);
  });
