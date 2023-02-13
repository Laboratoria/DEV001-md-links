
const { findPath, pathAbsolute, searchMD, readFile, verifyUrl, getLinks } = require('../src/functionsMD');
const newLinks = [{"file" : "/Users/naycarol/Documents/Paola/Proyecto 4/DEV001-md-links-kei/prueba/hola.md", "href": "https://nodejs.org/api/fs.html", "text": "File system - Documentación oficial (en inglés)"}];

describe('Verificamos si una ruta existe o no', () => {
    it('Debería ser una función', () => {
        expect(typeof findPath).toBe('function');
    })
})

describe('Convertimos el path a absoluto', () => {
    const path = 'README.md';
    const pathAbso = '/Users/naycarol/Documents/Paola/Proyecto 4/DEV001-md-links-kei/README.md';

    it('Debería ser una función', () => {
        expect(typeof pathAbsolute).toBe('function');
    })
    it('Debería convertir una ruta relativa a absoluta', () => {
        expect(pathAbsolute(path)).toBe(pathAbso);
    })
    it('Rectificamos', () => {
        expect(pathAbsolute(pathAbso)).toBe(pathAbso);
    })
})

describe('buscamos archivos md o directorio', () => {
    it('Debería ser una función', () => {
        expect(typeof searchMD).toBe('function');
    })
    it('Debería devolver un array con los archivos md de un directorio', () => {
        let directoryRoute = "/Users/naycarol/Documents/Paola/Proyecto 4/DEV001-md-links-kei/prueba";
        let resultadoArray = [
            '/Users/naycarol/Documents/Paola/Proyecto 4/DEV001-md-links-kei/prueba/hola.md',
            '/Users/naycarol/Documents/Paola/Proyecto 4/DEV001-md-links-kei/prueba/prueba.md',
            '/Users/naycarol/Documents/Paola/Proyecto 4/DEV001-md-links-kei/prueba/quetal.md'
        ]
        expect(searchMD(directoryRoute)).toEqual(resultadoArray)
    })
    it('si es un archivo md, debería devolver un array con ese archivo', () => {
        let fileRoute = "/Users/naycarol/Documents/Paola/Proyecto 4/DEV001-md-links-kei/prueba/hola.md";
        let resultadoArray = [
            '/Users/naycarol/Documents/Paola/Proyecto 4/DEV001-md-links-kei/prueba/hola.md'
        ]
        expect(searchMD(fileRoute)).toEqual(resultadoArray)
    })
})

    describe('Leemos archivos md o directorio y tomamos sus links', () => {
        it('Debería ser una función', () => {
            expect(typeof readFile).toBe('function');
        })
        it('Deberia retornar un array si la ruta es un archivo', () => {
            getLinks('/Users/naycarol/Documents/Paola/Proyecto 4/DEV001-md-links-kei/prueba/hola.md').then((result) => {
                return expect(result).toEqual(newLinks)
            })
        });
        it('Retornaria una promesa rechazada si la ruta no existe', () => {
            return expect(getLinks("./kei-md/pruebatest.md")).rejects.toEqual('Hay un problema para leer tu archivo, verifica que sea valido')
        });

        it('Retornaria la promesa si la ruta existe', () => {
            return expect(getLinks('/Users/naycarol/Documents/Paola/Proyecto 4/DEV001-md-links-kei/prueba/hola.md')).resolves.toEqual(newLinks)
        });
    })

    describe("validamos si la url es valida", () => {
        const arrayobjs = [{
            "href": "https://nodejs.org/api/fs.html",
        }]
        it("debe retornatar un array del 202", () => {
            return verifyUrl(arrayobjs).then((result) => {
                expect([{ "href": "https://nodejs.org/api/fs.html", "ok": "OK", "status": 200 }]).toEqual(result)
            })
        })
        it("debe retornatar un array del 404", () => {
            return verifyUrl(arrayobjs).catch((result) => {
                console.log(result)
                expect([{ "href": "https://nods.org/api/fshtml", "ok": "FAIL", "status": 404 }]).toEqual(result)
            })
        })
    })

