const { mdLinks } = require('./index');

mdLinks('./filesExamples/with-links.md', { validate: true })
  .then((respuesta) => console.log(respuesta))
  .catch((error) => console.error(error));