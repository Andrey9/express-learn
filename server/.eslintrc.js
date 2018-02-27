/* eslint-disable */
module.exports = {
  "parser": "babel-eslint",
  "extends": ["standard", "plugin:jest/recommended"],
  "env": {
      "jest": true
  },
  "plugins": ["jest"],
  "rules": {
    "jest/consistent-test-it": 2,
    "jest/prefer-to-be-null": 2,
    "jest/prefer-to-be-undefined": 2,
    "jest/valid-expect-in-promise": 2
  }

};