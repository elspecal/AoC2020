'use strict';

import { getInput, parseInput, keysAreValid, valuesAreValid } from './util.js';

function main() {
  console.log(
    getInput()
      .map(parseInput)
      .filter(passport => keysAreValid(Object.keys(passport)))
      .filter(valuesAreValid).length
  );
}

main();
