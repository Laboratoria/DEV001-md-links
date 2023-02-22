const fs = require('fs');
const path = require('path');

// ruta valida
const isValidRoute = (inputpath) => {
    if (fs.existsSync(inputpath)) {
        return true;
    } else {
        return false;
    }
};

//la ruta es relativa o absoluta. // convierte ruta relativa a absoluta
const convertToAbsolute = (filePath) => {
    if (path.isAbsolute(filePath)) {
       return filePath;
    }else{
       const absolutePath= (path.join(process.cwd(), filePath));
       return absolutePath;
    }
    };
console.log('Prueba 1', convertToAbsolute('README.md'))

//validcar archivo md
const fileMd = (filePath) => {
    return (path.extname(filePath) === ".md");
 };

console.log('Prueba 2', fileMd('README.md'))


module.exports = {
    isValidRoute, convertToAbsolute, fileMd, 
};