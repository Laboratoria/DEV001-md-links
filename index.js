const {
  pathExists, turnPathAbsolute, isExtensionMd, getLinks, getLinkStatus,
} = require('./functions');

// funcion mdLinks con Angie
// const mdLinks = (path, options) => new Promise((resolve, reject) => {
//   if (pathExists(path)) {
//     const pathAbsolute = turnPathAbsolute(path);
//     if (isExtensionMd(pathAbsolute)) {
//       getLinks(pathAbsolute).then((arrayLinks) => {
//         if (arrayLinks.length !== 0) {
//           resolve(arrayLinks);
//         } else {
//           reject(new Error('Path does not have links'));
//         }
//       });
//     } else {
//       reject(new Error('Path is not an extension file .md'));
//     }
//   } else {
//     reject(new Error('Path does not exist'));
//   }
// });
// console.log(mdLinks('C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplodos.md'));
const mdLinks = (path, options) => new Promise((resolve, reject) => {
  if (!pathExists(path)) {
    reject(new Error('Path does not exist'));
  }
  const pathAbsolute = turnPathAbsolute(path);
  if (!isExtensionMd(pathAbsolute)) {
    reject(new Error('Path is not an extension file .md'));
  }
  getLinks(pathAbsolute).then((arrayLinks) => {
    if (arrayLinks.length === 0) {
      reject(new Error('Path does not have links'));
    }
    getLinkStatus(arrayLinks).then((response) => {
      resolve(response);
    });
  });
});

// console.log(pathExists('C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md'));
// console.log(pathExists('C:/noexiste'));
// console.log(pathIsAbsolute('./functions'));
// console.log(turnPathAbsolute('./functions'));
// console.log(
// isExtensionMd('C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.html'));
// console.log(readFiles('C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md'));
// console.log(createArray('C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md'));
// console.log(mdLinks('./prueba/ejemplo.md'))
//   .then((res) => console.log('este es de aqui', res));

module.exports = {
  mdLinks,
};
