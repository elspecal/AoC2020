'use strict';

import { getInput, convertToSeatId } from './util.js';

function main() {
  const seats = getInput().map(convertToSeatId);

  console.log(Math.max(...seats));
}

main();
