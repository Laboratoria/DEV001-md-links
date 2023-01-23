const { mdLinks } = require('./index.js');


mdLinks('./archivoPrueba').then((promise)=>{
    console.log(promise.flat())
    promise.flat();
})
.catch((error) => {
    console.log(error);
});