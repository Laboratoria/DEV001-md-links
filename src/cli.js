const { mdLinks } = require('../index');

mdLinks('./filesExamples/with-links.md', { validate: true }).then((links) => {
  console.log(links);
}).catch((error) => {
  console.log(error);
});