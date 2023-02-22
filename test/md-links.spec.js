const { mdLinks } = require('../index.js');
const { convertToAbsolute } = require('../main.js');


describe('mdLinks', () => {

  it('Debe rechazar cuando el path no existe', (done) => {
    mdLinks('romina//laboratoria//archivo.md').catch((error) => {
      expect(error).toBe('La ruta no es valida');
      done();
    })
  });
})


describe('convertToAbsolute', () => {

  const absPath = "C:\\Users\\Laboratoria\\Desktop\\Romina\\Laboratoria\\Proyecto 4\\DEV001-md-links";

  it('Debería ser una función', () => {
    expect(typeof convertToAbsolute).toBe('function');
  });

  it('Debería devolver una ruta absoluta', () => {
    expect(convertToAbsolute(absPath)).toBe(absPath);
  });

  it('debe cambiar relativa a absoluta', () => {
    
expect(convertToAbsolute('romina//laboratoria//archivo.md')).toEqual('C:\\Users\\Laboratoria\\Desktop\\Romina\\Laboratoria\\Proyecto 4\\DEV001-md-links');
  });
});