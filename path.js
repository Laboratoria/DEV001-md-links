const fs = require('fs');
const path = require('path');

// identifica si la ruta existe o no
const pathExist = (param) => fs.existsSync(param);

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

const readFile = (pathsMd) => {
  if (pathsMd === true) {
    return fs.readFileSync(pathsMd, 'utf-8');
  }
};

module.exports = {
  pathExist,
  getAbsolutePath,
  isFileMd,
  readFile
};
