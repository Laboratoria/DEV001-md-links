const { mdLinks } = require('./index');

mdLinks('./prueba/ejemplo2links.md', { validate: true }).then((value) => {
  console.log(value);
})
  .catch((error) => {
    console.log(error);
  });
