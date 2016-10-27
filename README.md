# This repo should pass the jest test with Firebase imported
## From a Jest/FB team member : "firebase is doing something funky, there is an open issue about it we haven't had time to fix it yet".
First, install all the node_modules
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

Our goal, now, is to see how installing, then setting up, a
jest-react-native preset *breaks* the babel-jest preprocessor's
ability to import the firebase module a la ES modules.

The
[Jest tutorial on using react](https://facebook.github.io/jest/docs/tutorial-react.html#content) and the
[Jest tutorial on using react-native](https://facebook.github.io/jest/docs/tutorial-react-native.html#content)
are confusing, but the following additional modules seem to be needed:

> npm install --save react react-native

> npm install --save-dev jest-react-native babel-preset-react-native react-test-renderer

Then configure your package.json file by adding a "jest" option with the `jest-react-native` preset, and *modifying* the "babel" option by *adding* a `react-native` preset:
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
Then, let's try to run the test again:
> npm test

You should get something similar to:

```bash
FAIL  ./index.test.js
 ● Test suite failed to run

   TypeError: Cannot read property 'defineProperties' of undefined

     at node_modules/firebase/app-node.js:18:234
     at Object.<anonymous> (node_modules/firebase/app-node.js:23:260)
     at Object.<anonymous> (node_modules/firebase/firebase-node.js:8:16)
     at Object.<anonymous> (index.test.js:1:117)

Test Suites: 1 failed, 1 total
Tests:       0 total
Snapshots:   0 total
Time:        2.074s
Ran all test suites.
npm ERR! Test failed.  See above for more details.
```

So, right away, by installing and configuring the "jest-react-native" and "react-native" presets **breaks** our ability to "import" firebase! The fix is to `require` firebase (**not** `import`) in our `index.test.js` file and add a line that imports `react-native`. Without `import`ing `react-native` in *addition* to `require('firebase')`, firebase will not be included in the test file:
```
const Firebase = require('firebase')
import React from 'react-native'
```
Then, run our test again and it should pass:
```bash
PASS  ./index.test.js
 jest with firebase
   ✓ is at least loadable (4ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        4.604s
Ran all test suites.
```
**WHY?** That's the question that needs to be answered!
