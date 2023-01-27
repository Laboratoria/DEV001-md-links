const { existsSync, isAbsolute, isDirectoryorfile, returnOnlyFilesMd, getAllLinks, validatedLinks } = require('./index.js')

const mdLinks = (route, options) => {
  //resolve(resuelto) cuando se resuelve la promesa, y reject no,relacionado al then y catch, resolve y reject son callback,son funciones!! 
  return new Promise((resolve, reject) => {
    const pathAbsolute = isAbsolute(route);
    const root = isDirectoryorfile(pathAbsolute);
    //estamos devolviendo una promesa, en este caso usamos reject
    if (!existsSync(pathAbsolute)) {
      reject(`${route} This path does not exist`);
    } else if (root !== 'directory' && root !== 'file') {
      reject(`${pathAbsolute} is not a directory or a file`)
    };
    let files;
    if (root === 'file') {
      files = returnOnlyFilesMd(pathAbsolute);
      //resolve(files);
      //console.log(files);
    };
    const arrayAll = files.map(file => getAllLinks(file));
    resolve(arrayAll);
    // console.log(promises,'hola');


    //return Promise.all(promises)
    // .then(res => resolve([...res].flat(1)))
    // .catch(reject);
  });
};
   const prom = mdLinks('./README.md',{validate:true});
   const prom2 = prom.then(res => {
    console.log(res);
    return 5
   });
   
   prom2.then(res =>{
    console.log(res,'prom2');
   })

module.exports = {
  mdLinks
};

