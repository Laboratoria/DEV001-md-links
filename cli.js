const { mdLinks } = require('./index');

mdLinks('./prueba/ejemplodos.md').then((value) => {
  console.log(value);
})
  .catch((error) => {
    console.log(error);
  });
