const totalLinks = (array) => `Total: ${array.length}`;

const uniqueLinks = (array) => {
  const unique = new Set(array.map((link) => link.href));
  return `Unique: ${unique.size}`;
};
// trater links rotos
const brokenLinks = (array) => {
  const broken = array.filter((link) => link.status === 'Fail' || link.status > 400 || link.status < 199);
  return `Broken : ${broken.length}`;
};

module.exports = {
  totalLinks,
  uniqueLinks,
  brokenLinks,
};
