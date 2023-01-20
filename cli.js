const { mdLinks } = require('./index.js');


mdLinks('./archivoPrueba/prueba.md').then((promise)=>{
   console.log(promise);
   return Promise.all(promise)
})
.catch((error) => {
    console.log(error);
});