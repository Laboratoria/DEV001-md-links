const fs = require('fs');

// identifica si la ruta existe o no
const isPathExist = (param) => fs.existsSync(param);

// identificar si la ruta es absoluta o no

module.exports = {
  isPathExist,
};
