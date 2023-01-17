const { mdLinks } = require('../index');

describe('mdLinks', () => {
  it('should...', () => {
    console.log('FIX ME!');
  });
  // it('Deberia devolver una promesa', () => {
  //   expect(mdLinks()).reolves.toBe(typeof Promise);
  // });
  it('Debe rechazar cuando el path no exixte', () => (mdLinks('/path/noexiste.md')).catch((error) => {
    expect(error).toBe('La ruta no existe');
  }));
});
