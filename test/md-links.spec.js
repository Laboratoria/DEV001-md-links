/* eslint-disable no-undef */
const { mdLinks } = require('../index.js');

describe('mdLinks', () => {
  it('should...', () => {
    console.log('FIX ME!');
  });
  it('Debería devolver una promesa', () => {
    expect(mdLinks('./README.md')).toBe(typeof Promise);
  });
  it('Debería rechazar la promesa si el path no existe', () => {
    mdLinks('Documents/estepathnoexiste.md').catch((error) => {
    expect(error).toBe('La ruta no existe');
  })});
});
