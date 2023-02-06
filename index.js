const { file } = require('@babel/types');
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
    // console.log('entrando a searchFile',searchFile)
    // tomar cada archivo md
    let arrPromise = []
    searchFile.forEach((url) => {
      // console.log('cada url del ForEach',url)
      //leer el archivo 
      const fileReadPromise = readFile(url)
      // console.log('antes de entrar al then',fileReadPromise)
      console.log(url)
      //leer la promesa del readFile
      fileReadPromise.then((links) => {
        // console.log('dentro del then',fileReadPromise)
        //console.log(typeof links)
        //verificar la url
        if (options.validate === false) {
          // console.log(verifyUrlFalse(links, url))
          resolve(verifyUrlFalse(url))

        }
        //console.log(verifyUrl(links, url))
        verifyUrl(links, url).then((linkVerify)=> resolve( linkVerify))
   


      })
      //const promise = fileMd.then((result)=> result)

      //console.log('lo que deberia retornar',fileMd)
//console.log(arrPromise)
    })
    //arrPromise.then((result)=> console.log(result))
    //resolve(arrPromise)
    resolve(arrPromise)
  })
};

mdLinks('./prueba', { validate: true })
  .then((path) => {
    //console.log("el then de mdlinks", path)
    console.log(path)
  }).catch((error) => {
    console.log(error)
  })

module.exports = () => {
  mdLinks
};



// const promise = searchFile.forEach((url) => {
//    //leer el archivo 
//   readFile(url).forEach((links)=> {})
//    //leer el archivo 
//    if (options.validate === false) {
//     return verifyUrlFalse(links)
//    }
//      return verifyUrl(links), url)
//    })
//   })

//   const todo= Promise.all(promise).then... 
//    // const promise = fileMd.then((result)=> result)

//    console.log('lo que deberia retornar',todo)
//  resolve(todo)
