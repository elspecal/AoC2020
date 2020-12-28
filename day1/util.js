'use strict';

import { readFileSync } from 'fs';

const SUM = 2020;

export function getInput() {
  return readFileSync('./day1/input', 'utf-8').split('\n').map(Number);
}

export function getRemainder(amount) {
  return SUM - amount;
}

export function hasRemainder(input, remainder) {
  return input.includes(remainder);
}

export function getThreeEntries(entryA, idxOfA, report) {
  const bPlucC = getRemainder(entryA);
  const entryC = report
    .slice(idxOfA + 1)
    .find((entryB, idxOfB, tailOfReport) =>
      tailOfReport.includes(bPlucC - entryB)
    );

  return [entryA, bPlucC - entryC, entryC];
}
