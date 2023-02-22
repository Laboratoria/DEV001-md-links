const {mdLinks}= require('./index');
mdLinks('./README.md').then(()=>{})
.catch((error)=>{
    console.log(error)
});