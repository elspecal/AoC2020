'use strict';

import { getInput, parseInput, keysAreValid } from './util.js';

function main() {
  console.log(
    getInput()
      .map(parseInput)
      .filter(passport => keysAreValid(Object.keys(passport))).length
  );
}

main();
