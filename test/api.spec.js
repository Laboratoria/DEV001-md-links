const path = require('path')
const apiJs = require('../src/api')
/*
//test de función checkPath

describe('checkPath', () => {

    const absPath = 'C:\Users\Januhary Gonzalez\Desktop\MD-Links\DEV001-md-links\filesExamples\no-links.md';
    const relativePath = 'filesExamples\with-links.md';

    it('Debería ser una función', () => {
        expect(typeof apiJs.checkPath).toBe('function');
    });

    it('debería retornar false si la ruta no es relativa', () => {
        expect(apiJs.checkPath(absPath)).toBe(false);
    });

    it('debería retornar false si la ruta no es absoluta', () => {
        expect(apiJs.checkPath(relativePath)).toBe(false);
    });
});
*/
//test de función fileAbsolute

describe ('fileAbsolute', () =>  {

    const absPath = "C:\\Users\\Januhary Gonzalez\\Desktop\\MD-Links\\DEV001-md-links\\filesExamples\\with-links.md";
    const relativePath = "./filesExamples/no-links.md";

    it('Debería ser una función', () => {
        expect(typeof apiJs.fileAbsolute).toBe('function');
    });

    it('Debería devolver una ruta absoluta', () => {
        expect(apiJs.fileAbsolute(absPath)).toBe(absPath);
    });

})
