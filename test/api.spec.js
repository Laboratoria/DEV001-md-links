const { main } = require('../main.js');
const { path }= require('path');
const { fileMd , convertToAbsolute } = require('../main.js');

describe('absolutePath', () => {
    it('debe cambiar la ruta a absoluta si es relativa', () => {
        convertToAbsolute('./README.md');
      expect(convertToAbsolute('./README.md')).toEqual('C:\\Users\\Laboratoria\\Desktop\\Romina\\Laboratoria\\Proyecto 4\\DEV001-md-links\\README.md');
    });
    it('debe devolver la ruta si ya es absoluta', () => {
        convertToAbsolute('romina/laboratoria/archivo.md');
      expect(convertToAbsolute("C:\\Users\\Laboratoria\\Desktop\\Romina\\Laboratoria\\Proyecto 4\\DEV001-md-links\\with-links.md")).toEqual('C:\\Users\\Laboratoria\\Desktop\\Romina\\Laboratoria\\Proyecto 4\\DEV001-md-links\\with-links.md');
    });
  });

//test de función fileMd

describe('fileMd', () => {
    
    const PathLinksMd = "C:\\Users\\Laboratoria\\Desktop\\Romina\\Laboratoria\\Proyecto 4\\DEV001-md-links\\with-links.md";
    const PathNoLinksMd = "C:\\Users\\Laboratoria\\Desktop\\Romina\\Laboratoria\\Proyecto 4\\DEV001-md-links\\no-links.txt";

    it('retornar true si archivo contiene links MD', () => {
        expect(fileMd(PathLinksMd)).toBe(true);
    });

    it('retornar false si archivo no contiene links MD', () => {
        expect(fileMd(PathNoLinksMd)).toBe(false);
    });
})
