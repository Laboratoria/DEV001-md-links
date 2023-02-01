const { mdLinks } = require('./index');

mdLinks('./prueba/ejemplo.md').then((value) => {
  console.log(value);
})
  .catch((error) => {
    console.log(error);
  });
