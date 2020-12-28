'use strict';

import { getInput, parseInput, passIsValidPos } from './util.js';

function main() {
  console.log(getInput().map(parseInput).filter(passIsValidPos).length);
}

main();
