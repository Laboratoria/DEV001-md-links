const { mdLinks } = require('./mdLinks.js');

mdLinks('/noexiste/').then((route)=>{
})
.catch((error) => {
    console.log(error);
});