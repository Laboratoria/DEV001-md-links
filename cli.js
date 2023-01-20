const { mdLinks } = require('./index.js');


mdLinks('./archivoPrueba/prueba.md').then((promise)=>{
    console.log('cli', promise)
   return Promise.all(promise); 
})
.catch((error) => {
    console.log(error);
});