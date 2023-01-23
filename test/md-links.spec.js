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
    expect(error).toBe('Esta ruta no existe: Documents/estepathnoexiste.md');
  })});
  it('Debería rechazar la promesa si el path no es ni un directorio ni un archivo md', () => {
    mdLinks('./thumb.png').catch((error) => {
    expect(error).toBe('Esta ruta no es una carpeta ni un archivo md: C:\\Users\\griselda\\Documents\\GitHub\\DEV001-md-links_GAG\\thumb.png');
  })});
  it('Debería rechazar la promesa si el directorio no contiene archivos md', () => {
    mdLinks('./images').catch((error) => {
    expect(error).toBe('Esta ruta no contiene archivos md: C:\\Users\\griselda\\Documents\\GitHub\\DEV001-md-links_GAG\\images');
  })});
});
