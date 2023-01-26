const totalLinks = (array) => {
    const  total = array.length;
    return stats = `Total : ${total}`
};

const uniqueLinks = (array) => {
    const unique = [...new Set(array.map(link => link.href))];
    return stats = `Unique : ${unique.length}`;
}
const brokenLinks = (array) => {
    const broken = array.filter((link) => link.status === 'Fail ' || link.status > 400 || link.status < 199 )
    return statsBroken = `Broken : ${broken.length}`;
}

module.exports = {
    totalLinks,
    uniqueLinks,
    brokenLinks,
}