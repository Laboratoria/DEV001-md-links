 const { mdLinks } = require('./index.js')

 mdLinks(`Links\\ejemplo-1.md`).then((exito) => {

     console.log(exito);




 }).catch((error) => {
     console.log(error)

 })