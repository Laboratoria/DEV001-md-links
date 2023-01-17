const { mdLinks }= require('/index.js');
mdLinks('/documentos/mayito/noexiste').then(()=>{

})
.catch((error)=>{
    console.log(error)
});