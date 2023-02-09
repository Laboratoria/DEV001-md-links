const { tipoRuta, rutaAbsoluta, extensionArchivo, lectorDatos } = require('../functions.js');
const { mdLinks } = require('../index.js');
// import mdLinks from '../index.js';



describe('mdLinks', () => {

    it('should...', () => {
        console.log('FIX ME!');
    });

    it('Si el archivo no es .md dará un error', () => mdLinks('thumb.png', { validate: false }).catch((error) => {
        expect(error).toBe('El archivo no es un archivo markdown');
    }));

    it('Cuando la ruta es absoluta, la función rutaAbsoluta no realiza ningún cambio', () => {
        const ruta = rutaAbsoluta('D:\\LABORATORIA\\MD-Links\\DEV001-md-links\\Links\\ejemplo-1.md');
        expect(ruta).toEqual('D:\\LABORATORIA\\MD-Links\\DEV001-md-links\\Links\\ejemplo-1.md');
    });


    it('debería dar error cuando el path no existe', () => mdLinks('READMi.md', { validate: false }).catch((error) => {
        expect(error);
    }))

});



describe('funciones individuales', () => {

    it('tipoRuta, debe indicar true si se le entrega una ruta absoluta', () => {
        expect(tipoRuta('D:/LABORATORIA/MD-Links/DEV001-md-links/Links/ejemplo-1.md')).toEqual(true);
    });

    it('tipoRuta, debe indicar false si se le entrega una ruta relativa', () => {
        expect(tipoRuta('prueba/ejemplo.md')).toEqual(false);
    });

    it('Cuando la ruta es relativa, la función rutaAbsoluta la cambia a absoluta', () => {
        expect(rutaAbsoluta('DEV001-md-links\\Links\\ejemplo-1.md')).toEqual(
            'D:\\LABORATORIA\\MD-Links\\DEV001-md-links\\DEV001-md-links\\Links\\ejemplo-1.md',
        );
    });

    it('extensionArchivo devuelve la extensión del archivo después del "."', () => {
        expect(extensionArchivo('./prueba/ejemplo.md')).toEqual('md');
    });

    it('lectorDatos es una funcion', () => {
        expect(typeof lectorDatos).toBe('function');
    })


});