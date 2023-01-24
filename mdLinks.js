const { existsSync, isAbsolute, isDirectoryorfile, returnOnlyFilesMd, readFileLinksValidated, readFile } = require('./index.js')

const mdLinks = (route, options) => {
  //resolve(resuelto) cuando se resuelve la promesa, y reject no,relacionado al then y catch, resolve y reject son callback,son funciones!! 
  const pathAbsolute = isAbsolute(route);
  const root = isDirectoryorfile(pathAbsolute);
  return new Promise((resolve, reject) => {
    //estamos devolviendo una promesa, en este caso usamos reject
    if (!existsSync(pathAbsolute)) {
      return reject(`${route} This path does not exist`);
    } else if (root !== 'directory' && root !== 'file') {
      return reject(`${pathAbsolute} is not a directory or a file`)
    };
    let files;
    if (root === 'file') {
      files = returnOnlyFilesMd();
     return resolve (`${pathAbsolute}this file is correct`);
    };
      const promises = files.map(files => options.validate ? readFileLinksValidated(files) : readFile(files));
      return Promise.all(promises)
        .then(res => resolve([...res].flat(1)))
        .catch(reject);
  });
};
mdLinks('./Prueba');

module.exports = {
  mdLinks

};

