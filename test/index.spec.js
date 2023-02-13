const {mdLinks} = require('../index')


const validate = true;
const rutaRelativa = 'prueba/hola.md';

describe("mdLinks", () => {
    it("mdLinks retorna una promesa", () => {
      expect(mdLinks(rutaRelativa, validate)).toBeInstanceOf(Promise);
    });

})