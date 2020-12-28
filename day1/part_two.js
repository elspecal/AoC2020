'use strict';

import { getInput, getRemainder, hasRemainder } from './util.js';

function main() {
  const [a, b, c] = getInput()
    .map((amount, idx, report) => {
      const amountBPlusC = getRemainder(amount);
      const amountB = report
        .slice(idx + 1)
        .find((amount2, idx2, tailOfReport) =>
          hasRemainder(tailOfReport, amountBPlusC - amount2)
        );

      return [amount, amountB, amountBPlusC - amountB];
    })
    .find(entries => undefined !== entries[1]);

  console.log(a * b * c);
}

main();
