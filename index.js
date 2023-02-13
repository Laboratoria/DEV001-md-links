const { findPath, pathAbsolute, searchMD, verifyUrl, getLinks} = require('./src/functionsMD.js')

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    //la ruta existe?
    if (!findPath(path)) {
      //sino existe la ruta se termina la promesa
      reject('No existe la ruta')
    }
    //convertir la ruta en absoluta
    const absolutePath = pathAbsolute(path)
    // buscar si hay un archivos md
    let searchFile = searchMD(absolutePath)
    // tomar cada route 
    const linksPromise = searchFile.flatMap((file) => {
      return getLinks(file)
    })

    // tomar toda la promesa y tomar cada array
    Promise.all(linksPromise).then((result) => {
        //con el flat() lo volvemos todo uno 
         const arrObj = result.flat()
         //Si es Falso devuelve el objeto con {href,file,text}
         if (options.validate === false) {
           resolve(arrObj)
         }
        //si es True devuelve el objeto con {href,file,text, status,message}
         else if (options.validate === true) {
       //leemos la promera de verifyUrl
           verifyUrl(arrObj).then(result => {
           
            resolve(result)
           })
         }
    })
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
