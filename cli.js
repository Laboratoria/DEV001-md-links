const { mdLinks } = require('./index.js');

mdLinks('./carpeta de prueba/prueba/README-ghibli-data-lovers.md')
  .then(() => {})
  .catch((error) => {
    console.log(error);
  });
