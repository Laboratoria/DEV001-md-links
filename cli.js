const { mdLinks } = require('./mdLinks.js');

mdLinks('./README.md').then((route)=>{
console.log(mdLinks('./README.md'));
})
.catch((error) => {
    console.log(error);
});