const { findPath, pathAbsolute, searchMD, readFile, verifyUrl, verifyUrlFalse } = require('./src/functionsMD.js')

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    //la ruta existe?
    if (!findPath(path)) {
      //sino existe la ruta se termina la promesa
      reject('No existe la ruta')
    }
    //convertir la rut en absoluta
    const absolutePath = pathAbsolute(path)
    // buscar si hay un archivos md
    let searchFile = searchMD(absolutePath)
    console.log(searchFile)
    // tomar cada archivo md
    searchFile.map((url) => {
    console.log(url)
      //leer el archivo 
      const fileReadPromise = readFile(url)
      //leer la promesa del readFile
      fileReadPromise.then((links) => {
        //verificar la url
        if (options.validate === false) {
          resolve(verifyUrlFalse(links, url))
        }
        resolve(verifyUrl(links, url))
      })
    })
    // // tomar solo 1 archivo md
    // const archivo = searchFile
    // //leer el archivo 
    // const fileReadPromise = readFile(archivo)
    // //leer la promesa del readFile
    // fileReadPromise.then((links) => {
    //   //verificar la url
    //   if (options.validate === false) {
    //     resolve(verifyUrlFalse(links, absolutePath))
    //     }
    //   resolve(verifyUrl(links, absolutePath))
    // })


  });


  // recorrer links y armar un arreglo de promesas con lo que retorna verify url

  // promiseArray

  // Promise.all(promiseArray).then((objLinks) => resolve(objLinks))
};



;

mdLinks('./test', { validate: true })
  .then((path) => {
    console.log(path)
  }).catch((error) => {
    console.log(error)
  })

module.exports = () => {
  // ...
};
