const fs = require('fs');
const path = require('path');

// identifica si la ruta existe o no
const isPathExist = (param) => fs.existsSync(param);

// chequear o convertir a ruta absoluta
const getAbsolutePath = (paths) => {
  return path.isAbsolute(paths) ? paths : path.resolve(paths);
};

const isFileMd = (pathAbsolute) => {
  const filePath = path.extname(pathAbsolute);
  if (filePath === '.md') {
    return true;
  }
  return false;
};

module.exports = {
  isPathExist,
  getAbsolutePath,
  isFileMd
};
