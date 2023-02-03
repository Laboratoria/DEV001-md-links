
const {findPath, pathAbsolute, searchMD, readFile, verifyUrl, verifyUrlFalse} = require('../src/functionsMD');



describe('probando función que verifica si una ruta existe o no', ()=>{
    it('Debería ser una función', ()=>{
        expect(typeof findPath).toBe('function');
    })

})