'use strict';

import { getInput, getDifference, hasTheDifference } from './util.js';

function main() {
  const input = getInput();
  const amountA = input
    .map(getDifference)
    .find(remainder => hasTheDifference(input, remainder));
  const amountB = getDifference(amountA);

  console.log(amountA * amountB);
}

main();
