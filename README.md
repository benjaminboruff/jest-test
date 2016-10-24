# This repo should pass the jest test with Firebase imported
First install all the node_modules
> `npm install`

Then, before we do *anything else* make sure this setup passes the
jest test.
> `npm test`

should output to the console:

```bash
PASS  ./index.test.js
 jest with firebase
   ✓ is at least loadable (5ms)

 Test Suites: 1 passed, 1 total
 Tests:       1 passed, 1 total
 Snapshots:   0 total
 Time:        1.895s
 Ran all test suites.
```

Our goal, now, is to see how installing, then setting up a
jest-react-native preset *breaks* the babel-jest preprocessor's
ability to import the firebase module a la ES modules.

As per the [Jest tutorial on using react-native](https://facebook.github.io/jest/docs/tutorial-react-native.html#content) the following additional modules need to be installed:

> npm install --save-dev  jest-react-native babel-preset-react-native react-test-renderer

Then configure your package.json file by adding a "jest" option, and modifying the "babel" option:
```js
"jest": {
    "preset": "jest-react-native"
 },
"babel": {
  "presets": [
    "latest",
    "react-native"
  ]
 }
```
Then, lets try to run the test again:
> npm test
