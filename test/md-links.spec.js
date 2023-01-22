const { mdLinks } = require('../index');

// describe('mdLinks', () => {
//   it('should...', () => {
//     console.log('FIX ME!');
//   });
// it('Deberia devolver una promesa', () => {
//   expect(mdLinks()).reolves.toBe(typeof Promise);
// });
describe('mdLinks', () => {
  it('Debe rechazar cuando el path no exixte', () => (mdLinks('/path/noexiste.md')).catch((error) => {
    expect(error).toStrictEqual(new Error('La ruta no existe'));
  }));
});

describe('mdLinks', () => {
  it('Debe indicar si la ruta es absoluta o no', () => mdLinks('C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md').then((value) => {
    expect(value).toEqual(true);
  }));
});

describe('mdLinks', () => {
  it('Si la ruta es relativa cambia a absoluta', () => mdLinks('./prueba/ejemplo.md').then((value) => {
    expect(value).toEqual('C:\\Users\\adria\\Desktop\\Laboratoria\\DEV001-md-links\\prueba\\ejemplo.md');
  }));
});


// describe('mdLinks', () => {
//   it('Debe ver si la ruta es absoluta o no', () => pathIsAbsolute('C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md').then((value) => {
//     expect(value).toBe(turnPathAbsolute());
//   }));
// });