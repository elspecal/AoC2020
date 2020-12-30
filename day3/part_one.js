'use strict';

import { getInput, filterMap, getLocations, isTree } from './util.js';

function main() {
  const stepsH = 3;
  const stepsV = 1;

  console.log(
    getLocations(filterMap(getInput(), stepsV), stepsH).filter(isTree).length
  );
}

main();
