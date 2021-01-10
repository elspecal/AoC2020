'use strict';

import { getInput, getSingleGrpYays } from './util.js';

function main() {
  console.log(
    getInput()
      .map(answers => getSingleGrpYays(answers.replaceAll('\n', '')).length)
      .reduce((acc, cur) => acc + cur)
  );
}

main();
