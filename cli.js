const { mdLinks } = require('./index.js');


mdLinks('./archivoPrueba/').then((promise)=>{
    console.log(promise)
   return promise;
})
.catch((error) => {
    console.log(error);
});