'use strict';

import { getInput, parseInput, passIsValidRange } from './util.js';

function main() {
  console.log(getInput().map(parseInput).filter(passIsValidRange).length);
}

main();
