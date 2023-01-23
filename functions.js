const fs = require('fs');
const path = require('path');

const pathExists = (route) => fs.existsSync(route);
const pathIsAbsolute = (absoluteRoute) => path.isAbsolute(absoluteRoute);
const turnPathAbsolute = (route) => (pathIsAbsolute(route) ? route : path.resolve(route));

module.exports = {
  pathExists,
  pathIsAbsolute,
  turnPathAbsolute,
};
