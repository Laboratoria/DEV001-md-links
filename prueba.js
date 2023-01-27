const fs = require('fs');
//Para utilizar las API basadas en promesas usar fs/promises
const fsprom = require('fs/promises');
const path = require('path');
const fetch = require('node-fetch')

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

// const folderPath = (folPath) => fs.readdirSync(folPath);
//console.log(folderPath('/Users/gaba/Documents/GABA/BOOTCAMP LABORATORIA /PROYECTOS/DEV001-md-links/DEV001-md-links/Prueba'));
//const folderPathJoin = (folPath, routeFile) => path.join(folPath, routeFile);
// const readDirectory = folderPath(isAbsolute(folPath))
// .map(file => isAbsolute(folderPathJoin(folPath, routeFile)));

// el metodo path.join une todos los seg de ruta, si la cadena es de long 0 devolverá '.'

// .filter(isFile);

//console.log(folderPathJoin('/Users/gaba/Documents/GABA/BOOTCAMP LABORATORIA /PROYECTOS/DEV001-md-links/DEV001-md-links/Prueba'));


//guardamos los archivos en un array y sino ejecute la funcion folderPath
const arrayForFiles = (routeFile) => {
    let arrayOnlyFiles = [];
    if (isFile(routeFile)) {
        arrayOnlyFiles.push(routeFile);
    } else {
        const folderPath = fs.readdirSync(routeFile);
        folderPath.map((file) => {
            const folderPathJoin = path.join(routeFile, file);
            arrayOnlyFiles = [...arrayOnlyFiles, ...(arrayForFiles(folderPathJoin))];
        })
    }
    return arrayOnlyFiles;
};
//console.log(arrayForFiles('./Readme.md'));

//función para devolver la extensión de la ruta
// ejemplo route='index.md' devuelve 'md'
const returnOnlyFilesMd = (routeFile) => {
    return arrayForFiles(routeFile).filter((file => path.extname(file) === '.md'));
};
//let arrayForFilesMd = [];
// if (arrayForFiles(routeFile).length === 0) {
//     return (`There are no '.md' files in ${routeFile}`)
// } else if (arrayForFiles(routeFile) === 'file') {
//     arrayForFiles(routeFile).filter(path.extname(route) === '.md');
//     return arrayForFilesMd.push(routeFile);
// }
// return arrayForFilesMd;
//console.log(returnOnlyFilesMd('/Users/gaba/Documents/GABA/BOOTCAMP LABORATORIA /PROYECTOS/DEV001-md-links/DEV001-md-links/Prueba'));
//Debemos crear un array que nos traiga todos los href,text,file

//const readFile = (route) => fs.readFileSync ( route,'utf8');
// if(err) { 
// console . error ('Error: file not found') ; 
// //return  
// }
//console.log (route) ; 
//   });
//console.log(readFile('./prueba.md'));

const getAllLinks = (route) => {
    const arrayAllLinks = [];
    const regEx = /\[(.*)\]\(((?:\/|https?:\/\/).*)\)/gi;
    //const file = readFile(route);
    //console.log(file);
    let match = regEx.exec(route);
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
const validatedLinks = (route) => {
    const linksValidated = [];
    const regex = /\[(.*)\]\(((?:\/|https?:\/\/).*)\)/gi;
    const fileValidate = readFile(route);
    let match = regex.exec(fileValidate);
    for (let i = 0; i < route.length; i++) {
        if (match !== null) {
            let newMatch = match;
            linksValidated.push(fetch(match[2]))
                .then((result) => {
                    const data = {
                        href: newMatch[2],
                        text: newMatch[1],
                        file: route,
                        status: result.status,
                        Message: (result.ok) ? 'ok' : 'fail',
                    };
                    return data;
                })
                .cacth((error) => {
                    const dataError = {
                        href: newMatch[2],
                        text: newMatch[1],
                        file: route,
                        status: `Fail ${error.message}`,
                        message: 'No status',
                        ok: (result.ok) ? 'ok' : 'fail',
                    };
                    return dataError;
                });
    };
};
return Promise.all(linksValidated);
};


console.log(validatedLinks('[/Users/gaba/Documents/GABA/BOOTCAMP LABORATORIA /PROYECTOS/DEV001-md-links/DEV001-md-links/README.md]'));
//Lee de forma asincrónica todo el contenido de un archivo y retorna todos los datos dentro del buffer
const readFile = (route) => fsprom.readFile(route,'utf8')
    .then((data) => {
        return getAllLinks(data, route);
    })
    .catch((error) => {
        console.error(error + 'ERROR: THIS FILE DOES NOT EXIST')
    });
//console.log(readFile('//Users/gaba/Documents/GABA/BOOTCAMP LABORATORIA /PROYECTOS/DEV001-md-links/DEV001-md-links/README.md'));
// //igual que readFile pero adicional devuelve las propiedades status, ok o fail
// const readFileLinksValidated = (route) => fsprom.readFile(route, 'utf8')
//     .then((data) => {
//         return validatedLinks(data, route);
//     })
//     .catch((error) => {
//         console.error(error +'ERROR: THIS FILE DOES NOT EXIST')
//     })

module.exports = {
    existsSync,
    isAbsolute,
    isDirectoryorfile,
    returnOnlyFilesMd,
    readFile,
}
