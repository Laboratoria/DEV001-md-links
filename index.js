const fs = require('fs');
//Para utilizar las API basadas en promesas usar fs/promises–––
const fsprom = require('fs/promises')
const path = require('path');
const fetch = require('node-fetch');
const { resolve } = require('path');

//identificar si la ruta existe.
const existsSync = (route) => fs.existsSync(route);
//Vamos determinar si la ruta es absoluta,si es relativo, entonces hay que convertilo en absoluto
const isAbsolute = (route) => (path.isAbsolute(route)) ? route : path.resolve(route);

//Saber si es un directorio o es un archivo.
const isDirectoryorfile = (route) => {
    if (fs.statSync(route).isDirectory()) {
        return 'directory'
    } else if (fs.statSync(route).isFile()) {
        return 'file'
    }
};
//ahora tenemos que leer el directorio y devolver solo archivos dentro del direc.
const isFile = (routeFile) => {
    return fs.statSync(routeFile).isFile();
};
// console.log(isFile('Readme.md'));

//console.log(folderPathJoin('/Users/gaba/Documents/GABA/BOOTCAMP LABORATORIA /PROYECTOS/DEV001-md-links/DEV001-md-links/Prueba'));

//guardamos los archivos en un array sino lea si es un directorio
const arrayForFiles = (routeFile) => {
    let arrayOnlyFiles = [];
    if (isFile(routeFile)) {
        arrayOnlyFiles.push(routeFile);
    } else {
        const folderPath = fs.readdirSync(routeFile);
        folderPath.map((file) => {
            // el metodo path.join une todos los seg de ruta, si la cadena es de long 0 devolverá '.'
            const folderPathJoin = path.join(routeFile, file);
            arrayOnlyFiles = [...arrayOnlyFiles, ...(arrayForFiles(folderPathJoin))];
        })
    }
    return arrayOnlyFiles;
};
//console.log(arrayForFiles('./Readme.md'));

//función para devolver la extensión de la ruta
const returnOnlyFilesMd = (routeFile) => {
    return arrayForFiles(routeFile).filter((file => path.extname(file) === '.md'));
};
//console.log(returnOnlyFilesMd('/Users/gaba/Documents/GABA/BOOTCAMP LABORATORIA /PROYECTOS/DEV001-md-links/DEV001-md-links/Prueba'));

const readFile = (route) => fs.readFileSync ( route,'utf8');
//console.log(readFile('./readme.md'));

// const readFileLinksValidated = (route) => fsprom.readFile(route, 'utf8')
//     .then((data) => {
//         return (data, route);
//     })
//     .catch((error) => {
//         console.error(error +'ERROR: THIS FILE DOES NOT EXIST')
//     });
//  console.log(readFileLinksValidated('./readme.md'));   

const getAllLinks = (route) => {
    const arrayAllLinks = [];
    const regEx = /\[(.*)\]\(((?:\/|https?:\/\/).*)\)/gi;
    const file = readFile(route);
    //console.log(file);
    let match = regEx.exec(file);
    for (let i = 0; i < route.length; i++) {
        //Si el valor es diferente a nulo
        if (match !== null) {
            arrayAllLinks.push({
                href: match[2],
                text: match[1],
                file: route,
            });
        };
    };
    return arrayAllLinks;
};
//console.log(getAllLinks('/Users/gaba/Documents/GABA/BOOTCAMP LABORATORIA /PROYECTOS/DEV001-md-links/DEV001-md-links/README.md'));
//Ahora creamos un array que nos traiga además de los href,text,file, Status, ok o fail
const validatedLinks = (arrayLinks) => {
    return Promise.all(arrayLinks.map((link => {
        return fetch(link.href) 
            .then((result) => {
                const data = {
                    href: link.href,
                    text: link.text,
                    file: link.file,
                    status: result.status,
                    message: (result.ok) ? 'ok' : 'fail',
                };
                return data;
            })
            .catch((error) => {
                const dataError = {
                    href: link.href,
                    text: link.text,
                    file: link.file,
                    status: `Fail ${error.message}`,
                    message: 'No status',
                    ok: (result.ok) ? 'ok' : 'fail',
                };
                return dataError;
            });
        })));
};              
//console.log(validatedLinks(getAllLinks('./README.md')).then(links => console.log(links)));

module.exports = {
    existsSync,
    isAbsolute,
    isDirectoryorfile,
    arrayForFiles,
    returnOnlyFilesMd,
    getAllLinks,
    validatedLinks 
}
