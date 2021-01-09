'use strict';

import { getInput, convertToSeatId } from './util.js';

function main() {
  const seats = getInput().map(convertToSeatId);
  const reference = [...Array(seats.length).keys()].map(
    id => id + Math.min(...seats)
  );
  const missing = reference.find(id => !seats.includes(id));

  console.log(missing);
}

main();
