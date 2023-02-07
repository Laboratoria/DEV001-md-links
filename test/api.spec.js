const path = require('path')
const apiJs = require('../src/api')



describe('convertToAbsolute', () => {

    const absPath = "C:\\Users\\Januhary Gonzalez\\Desktop\\MD-Links\\DEV001-md-links\\filesExamples\\with-links.md";

    it('Debería ser una función', () => {
        expect(typeof apiJs.convertToAbsolute).toBe('function');
    });

    it('Debería devolver una ruta absoluta', () => {
        expect(apiJs.convertToAbsolute(absPath)).toBe(absPath);
    });
    it('Debería devolver una ruta absoluta desde una relativa', () => {
        const relativeSegment = ['hola', 'soyUnaRutaRelativa']
        const relativePath = './' + relativeSegment.join(path.sep);
        const expected = process.cwd() + path.sep + relativeSegment.join(path.sep);
        expect(apiJs.convertToAbsolute(relativePath)).toBe(expected);
    });
})

//test de función fileMd

describe('fileMd', () => {
    
    const PathLinksMd = "C:\\Users\\Januhary Gonzalez\\Desktop\\MD-Links\\DEV001-md-links\\filesExamples\\with-links.md";
    const PathNoLinksMd = "C:\\Users\\Januhary Gonzalez\\Desktop\\MD-Links\\DEV001-md-links\\filesExamples\\no-links.txt";
   
    it('Debería ser una función', () => {
        expect(typeof apiJs.fileMd).toBe('function');
    });

    it('Debería retornar true si el archivo contiene links MD', () => {
        expect(typeof apiJs.fileMd(PathLinksMd)).toBe(true);
    });

    it('Debería retornar false si el archivo no contiene links MD', () => {
        expect(typeof apiJs.fileMd(PathNoLinksMd)).toBe('false');
    });
})

