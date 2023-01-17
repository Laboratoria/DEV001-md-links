const { mdLinks } = require('./index.js');


mdLinks('./').then((promise)=>{
   console.log(promise);
})
.catch((error) => {
    console.log(error);
});