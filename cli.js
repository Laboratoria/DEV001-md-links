const { mdLinks } = require('./index.js');

const route = process.argv[2]
const argv = process.argv;
const validate = argv.includes('--validate');


mdLinks(route, validate)
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.log(error);
  });
