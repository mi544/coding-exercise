module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    // process `*.js` files with `babel-jest`
    '.*\\.(js)$': 'babel-jest'
  }
  // moduleNameMapper: {
  //   '^@C/$': '<rootDir>/src/components/'
  // }
}
