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
    } else {
        return 'invalid route'
    }
};
//ahora tenemos que leer el directorio y devolver solo archivos dentro del direc.
const isFile = (routeFile) => {
    return fs.lstatSync(routeFile).isFile();
};
const folderPath = (folderPath) => {
    fs.readdirSync(folderPath).map(routeFile => {
        //el metodo path.join une todos los seg de ruta, si la cadena es de long 0 devolverá '.'
        return path.join(folderPath, routeFile);
    })
        .filter(isFile);
};
//guardamos los archivos en un array y sino ejecute la funcion folderPath
const arrayForFiles = (routeFile) => {
    let arrayForFilesMd = [];
    if (isFile(routeFile)) {
        arrayForFiles.push(routeFile);
    } else {
        folderPath;
    }
    return arrayForFilesMd;
};
//función para devolver la extensión de la ruta
// ejemplo route='index.md' devuelve 'md'
const returnOnlyFilesMd = (routeFile) => {
    if (arrayForFiles(routeFile).length === 0) {
        return (`There are no '.md' files in ${routeFile}`)
    } else {
        return arrayForFiles(routeFile).filter(path.extname(route) === '.md');
    }
};
//Debemos crear un array que nos traiga todos los href,text,file
const bringAllLinks = (md, route) => {
    const arrayAllLinks = [];
    const regex = /\[(.*)\]\(((?:\/|https?:\/\/).*)\)/gi;
    let match = regex.exec(md);
    for (let i = 0; i < md.length; i++) {
        //Si el valor es diferente a nulo
        if (match !== null) {
            arrayAllLinks.push({
                href: match[4],
                text: match[2],
                file: route,
            })
            match = regex.exec(md);
        }
    }
    return arrayAllLinks;
};
//Ahora creamos un array que nos traiga además de los href,text,file, Status, ok o fail
const bringAllLinksValidated = (md, route) => {
    const linksValidated = [];
    const regex = /\[(.*)\]\(((?:\/|https?:\/\/).*)\)/gi;
    let match = regex.exec(md);
    for (let i = 0; i < md.length; i++) {
        if (match !== null) {
            let newMatch = match;
            linksValidated.push(fetch(match[4])
                .then((result) => {
                    return {
                        href: match[4],
                        text: match[2],
                        file: route,
                        status: result.status,
                        ok: (result.ok) ? 'ok' : 'fail',
                    }
                }));
            match = regex.exec(md);
        }
    }
    return Promise.all(linksValidated);
};
//Lee de forma asincrónica todo el contenido de un archivo y retorna todos los datos dentro del buffer
const readFile = (route) => fsprom.readFile(route, 'utf8')
    .then((data) => {
        return bringAllLinks(data, route);
    })
    .catch((error) => {
        console.error(error + 'ERROR: THIS FILE DOES NOT EXIST')
    })
//igual que readFile pero adicional devuelve las propiedades status, ok o fail
const readFileLinksValidated = (route) => fsprom.readFile(route, 'utf8')
    .then((data) => {
        return bringAllLinksValidated(data, route);
    })
    .catch((error) => {
        console.error(error + 'ERROR: THIS FILE DOES NOT EXIST')
    })

module.exports = {
    existsSync,
    isAbsolute,
    isDirectoryorfile,
    folderPath,
    returnOnlyFilesMd,
    readFile,
    readFileLinksValidated
}