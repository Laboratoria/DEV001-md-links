const { mdLinks } = require('../index.js');

describe('mdLinks', () => {
  it('should be a function', () => {
    console.log('FIX ME!');
  });
  // it('should return a promise', () => {
  //   expect(mdLinks()).toBe(typeof Promise);
  // });
  it('should reject when the path does not exists', () => mdLinks('/doesnotexists.md').catch((error) => {
    expect(error).toBe('The path does not exists');
  }));
});
