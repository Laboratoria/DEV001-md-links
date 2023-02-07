const path = require('path');
const fs = require('fs');
// const axios = require('axios')

const comprobarPath = (archivo) => {
    return fs.statSync(archivo.replace(/\\/g, "/"))
}

const extensionArchivo = (archivo) => {
    return archivo.split('.').pop()
}

const tipoRuta = (archivo) => {
    return path.isAbsolute(archivo)
}

const rutaAbsoluta = (archivo) => {
    return path.join(__dirname, archivo)
}

const lectorDatos = (archivo) => {
    return fs.readFileSync(archivo, 'utf-8');
}

// readingFiles es lectorDatos
const obtenerLinks = (archivo) => {
    return new Promise((resolve, reject) => {
            const links = [];
            const datosNuevos = lectorDatos(archivo)

            const regex = /\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g;
            let match = regex.exec(datosNuevos);

            while (match !== null) {
                links.push({
                    href: match[2],
                    text: match[1],
                    file: archivo,
                });
                match = regex.exec(datosNuevos);
            }
            resolve(links);


        })
        .catch((error) => reject(error))

}

const validarLink = (archivo) => {
    //1.crear un nuevo array y añadir los nuevos status y messager
    return archivo.map(link => {
        return fetch(link.href).then(linkRespuesta => {
            return {
                ...link,
                status: linkRespuesta.status,
                ok: linkRespuesta.statusText
            }
        })
    })
}




module.exports = {
    comprobarPath,
    extensionArchivo,
    tipoRuta,
    rutaAbsoluta,
    obtenerLinks,
    validarLink

};
// validarLinks(links)
// obtenerLinks('D:\\LABORATORIA\\MD-Links\\DEV001-md-links\\Links\\ejemplo-1.md')
// validarLinks('https://es.wikipedia.org/wiki/Markdown')
// comprobarPath('D:\\archivofalso')
// extensionArchivo('D:\\LABORATORIA\\MD-Links\\DEV001-md-links\\thumb.png')
// tipoRuta('D:\\LABORATORIA\\MD-Links\\DEV001-md-links\\README.md')
// rutaAbsoluta(`DEV001-md-links\\README.md`)
// lectorDatos('D:\\LABORATORIA\\MD-Links\\DEV001-md-links\\README.md')