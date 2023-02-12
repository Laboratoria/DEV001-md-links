const {mdLinks } = require('./index.js');

 /*console.log(mdLinks);
mdLinks('/noexiste/').then(()=>{
})
.catch((error)=>{
   console.log(error)
})

//cambiar la ruta reltiva por absoluta
mdLinks('./index.js').then((result)=>{ 
   console.log(result)
})
.catch((error)=>{
   console.log(error)
})*/

//cambiar la ruta reltiva por absoluta

let isValidate = true
mdLinks('./testReadme.md', { validate: isValidate }).then((result)=>{ 
   console.log(result);
})
.catch((error)=>{
   console.log(error)
})

/*
//ruta absoluta
console.log(mdLinks);
mdLinks("D:/coderHouse Programacion web/class 01/css/style.css").then(()=>{
})
.catch((error)=>{
   console.log(error)
}); 

//ruta absoluta
console.log(mdLinks);
mdLinks("C:/Users/Usuario/Desktop/Laboratoria/DEV001-card-validation/README.md").then(()=>{
})
.catch((error)=>{
   console.log(error)
}); 

console.log(mdLinks);
mdLinks("C:/Users/Usuario/Desktop/Laboratoria/DEV001-md-links/testReadme.md").then(()=>{
})
.catch((error)=>{
   console.log(error)
}); */