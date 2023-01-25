const { mdLinks } = require('./mdLinks.js');

mdLinks('./README.md').then((route)=>{
console.log(mdLinks());
})
.catch((error) => {
    console.log(error);
});