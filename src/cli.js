const { mdLinks } = require('../index.js')

mdLinks('/rutanoexiste.md').then(() => {

}).catch((error) => {
    console.log(error);
});