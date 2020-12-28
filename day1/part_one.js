'use strict';

import { getInput, getRemainder, hasRemainder } from './util.js';

function main() {
  const input = getInput();
  const amountA = input
    .map(getRemainder)
    .find(remainder => hasRemainder(input, remainder));
  const amountB = getRemainder(amountA);

  console.log(amountA * amountB);
}

main();
