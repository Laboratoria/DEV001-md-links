const { mdLinks } = require('./index.js');

mdLinks('./carpeta de prueba')
  .then(() => {})
  .catch((error) => {
    console.log(error);
  });
