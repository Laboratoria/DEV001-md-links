/* eslint-disable no-undef */
const { mdLinks } = require('../index.js');
const tryPathAbsolute = `${process.cwd()}`;

describe('mdLinks', () => {
  it('should...', () => {
    console.log('FIX ME!');
  });
  it('Debería devolver una promesa', () => {
    expect(mdLinks('./README.md')).toBe(typeof Promise);
  });
  it('Debería rechazar la promesa si el path no existe', () => {
    mdLinks('./estepathnoexiste.md').catch((error) => {
    expect(error).toBe('Esta ruta no existe: ./estepathnoexiste.md');
  })});
  it('Debería rechazar la promesa si el path no es ni un directorio ni un archivo md', () => {
    mdLinks('./thumb.png').catch((error) => {
    expect(error).toBe(`Esta ruta no es una carpeta ni un archivo md: ${tryPathAbsolute}\\thumb.png`);
  })});
  it('Debería rechazar la promesa si el directorio no contiene archivos md', () => {
    mdLinks('./images').catch((error) => {
    expect(error).toBe(`Esta ruta no contiene archivos md: ${tryPathAbsolute}\\images`);
  })});
  it('Debería rechazar la promesa si el archivo md no contiene links', () => {
    mdLinks('./CarpetaDePrueba/Prueba/README-ghibli-data-lovers.md').catch((error) => {
    expect(error).toBe(`No se encontraron links en el archivo con ruta: ${tryPathAbsolute}\\CarpetaDePrueba\\Prueba\\README-ghibli-data-lovers.md`);
  })});
});
