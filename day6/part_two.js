'use strict';

import { getInput, getAgreeds } from './util.js';

function main() {
  console.log(
    getInput()
      .map(getAgreeds)
      .map(answers => answers.length)
      .reduce((acc, cur) => acc + cur)
  );
}

main();
