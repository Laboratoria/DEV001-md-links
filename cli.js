const { mdLinks } = require('./index.js');

mdLinks('C:/Users/griselda/Documents/GitHub/DEV001-md-links_GAG/Carpeta de prueba')
  .then(() => {})
  .catch((error) => {
    console.log(error);
  });
