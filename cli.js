const { mdLinks } = require('./index');

const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats'),
};

mdLinks('./prueba/ejemplo2links.md', options).then((value) => {
  console.log(value);
  // agregar un foreac para que muestre cada link como en el readme
})
  .catch((error) => {
    console.log(error);
  });

// console.log(option)
