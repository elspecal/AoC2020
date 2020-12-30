'use strict';

import { getInput, getLocations, filterMap, isTree } from './util.js';

function main() {
  const slopes = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 },
  ];

  const treeCounts = slopes.map(
    slope =>
      getLocations(filterMap(getInput(), slope.down), slope.right).filter(
        isTree
      ).length
  );

  console.log(treeCounts.reduce((cur, acc) => cur * acc));
}

main();
