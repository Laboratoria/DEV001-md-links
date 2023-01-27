const {
  doesPathExist,
  isPathAbsolute,
  turnIntoAbsolute,
  isItFile,
  isItMarkdown,
  readFile,
  findLinks,
  mdLinks,
} = require('../index.js');

// *** VERIFIES IF THE PATH EXISTS ***
describe('doesPathExist', () => {
  it('should be a function', () => {
    expect(typeof doesPathExist).toBe('function');
  });
  it('should return "true" if the path exists', () => {
    const path = '/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/EXTRA.md';
    expect(doesPathExist(path)).toBeTruthy();
  });
  it('should return "false" if the path DOES NOT exist', () => {
    const path = '/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/EXTR.md';
    expect(doesPathExist(path)).toBeFalsy();
  });
});

// *** VERIFIES IF THE PATH IS ABSOLUTE ***
describe('isPathAbsolute', () => {
  it('should be a function', () => {
    expect(typeof isPathAbsolute).toBe('function');
  });
  it('should return "true" if the path is absolute', () => {
    const path = '/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/EXTRA.md';
    expect(isPathAbsolute(path)).toBeTruthy();
  });
  it('should return "false" if the path IS NOT absolute (relative)', () => {
    const path = 'prueba/EXTRA.md';
    expect(isPathAbsolute(path)).toBeFalsy();
  });
});

// *** TURNS A RELATIVE PATH INTO ABSOLUTE ***
describe('turnIntoAbsolute', () => {
  it('should be a function', () => {
    expect(typeof turnIntoAbsolute).toBe('function');
  });
  it('should return an absolute path', () => {
    const path = 'prueba/EXTRA.md';
    const pathAbsolute = '/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/EXTRA.md';
    expect(turnIntoAbsolute(path)).toBe(pathAbsolute);
  });
  it('should return the same path if it is already absolute', () => {
    const pathAbsolute = '/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/EXTRA.md';
    expect(turnIntoAbsolute(pathAbsolute)).toBe('/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/EXTRA.md');
  });
});

// *** VERIFIES IF THE PATH IS A FILE OR NOT ***
describe('isItFile', () => {
  it('should be a function', () => {
    expect(typeof isItFile).toBe('function');
  });
  it('should return "true" if it is a file', () => {
    const pathAbsolute = '/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/EXTRA.md';
    expect(isItFile(pathAbsolute)).toBeTruthy();
  });
  it('should return "false" if it IS NOT a file', () => {
    const notFile = '/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba';
    expect(isItFile(notFile)).toBeFalsy();
  });
});

// *** VERIFIES IF THE FILE IS .md OR NOT ***
describe('isItMarkdown', () => {
  it('should be a function', () => {
    expect(typeof isItMarkdown).toBe('function');
  });
  it('should return "true" if the file is .md', () => {
    const pathAbsolute = '/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/EXTRA.md';
    expect(isItMarkdown(pathAbsolute)).toBeTruthy();
  });
  it('should return "false" if it IS NOT an .md file', () => {
    const txt = '/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/prueba.txt';
    expect(isItMarkdown(txt)).toBeFalsy();
  });
});

// *** READS WHAT IS INSIDE AN .md FILE ***
describe('readFile', () => {
  it('should be a function', () => {
    expect(typeof readFile).toBe('function');
  });
  it('should read what is inside the file "texto.md" ', () => {
    const pathWithText = '/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/texto.md';
    expect(readFile(pathWithText)).toEqual('Hola soy un archivo .md con texto.');
  });
});

// *** FINDS THE LINKS INSIDE AN .md FILE ***
describe('findLinks', () => {
  it('should be a function', () => {
    expect(typeof findLinks).toBe('function');
  });
  it('should find the links', () => {
    const content = `Texto Ejemplo [Fuente](https://www.theodysseyonline.com/road-trips-worthwhile) 
    Texto Ejemplo [Refactoriza](https://es.wikipedia.org/wiki/Refactorizaci%C3%B3n) 
    Texto Ejemplo [Travel pic](https://assets-auto.rbl.ms/5fefc7fee587f0e4aca6794810f346d3c555463eed4e21eaa015d6fc9e6bcb5d)`;
    // [
    //   [
    //     '[Fuente](https://www.theodysseyonline.com/road-trips-worthwhile)',
    //     'Fuente',
    //   ],
    //   [
    //     '[Refactoriza](https://es.wikipedia.org/wiki/Refactorizaci%C3%B3n',
    //     'Refactoriza',
    //   ],
    //   [
    //     '[Travel pic](https://assets-auto.rbl.ms/5fefc7fee587f0e4aca6794810f346d3c555463eed4e21eaa015d6fc9e6bcb5d)',
    //     'Travel pic',
    //   ],
    // ];
    const path = '/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/EXTRA.md';

    const links = [
      {
        href: 'https://www.theodysseyonline.com/road-trips-worthwhile',
        text: 'Fuente',
        file: path,
      },
      {
        href: 'https://es.wikipedia.org/wiki/Refactorizaci%C3%B3n',
        text: 'Refactoriza',
        file: path,
      },
      {
        href: 'https://assets-auto.rbl.ms/5fefc7fee587f0e4aca6794810f346d3c555463eed4e21eaa015d6fc9e6bcb5d',
        text: 'Travel pic',
        file: path,
      },
    ];
    expect(findLinks(content, path)).toStrictEqual(links);
  });
});

// *** MDLINKS ***
describe('mdLinks', () => {
  it('should be a function', () => {
    expect(typeof mdLinks).toBe('function');
  });
});

// it('should return a promise', () => {
//   expect(mdLinks()).toBe(typeof Promise);
// });
// it('should reject when the path does not exists', () => mdLinks('/doesnotexists.md').then(() => {

//   }).catch((error) => {
//     expect(error).toBe('The path does not exists');
//   }));
// });
