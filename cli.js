const { mdLinks } = require('./index.js');

mdLinks('./test/pruebaTest.md', 'validate')
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.log(error);
  });
