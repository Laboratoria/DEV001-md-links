
/**
 * @function  statLinks
 * @param {toma un array de objetos y retorna unique y total links usando new Set}
 * @returns {cuantos links hay unicos y cuantos totales }
 */
const statLinks = (arrOfLinks) => {
  // Set es un objeto introducido en ES6. Solo le permite almacenar valores únicos. Cuando pasa un array, eliminará cualquier valor duplicado.
  const uniqueLinks = new Set(arrOfLinks.map((link) => link.href)).size;
  return {
    Total: arrOfLinks.length,
    Unique: uniqueLinks,
  };
};

const statAndValidate = (arrOfLinks) => {
    const uniqueLinks = new Set(arrOfLinks.map((link) => link.href)).size;
    const brokenLinks = arrOfLinks.filter((link) => link.isOk === 'false')
    return {
        Total: arrOfLinks.length,
        Unique: uniqueLinks,
        Broken: brokenLinks.length
    }
}


module.exports = {statLinks, statAndValidate}
