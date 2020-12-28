'use strict';

import { readFileSync } from 'fs';

const SUM = 2020;

export function getInput() {
  return readFileSync('./day1/input', 'utf-8').split('\n').map(Number);
}

export function getDifference(subtrahend) {
  return SUM - subtrahend;
}

export function hasTheDifference(input, difference) {
  return input.includes(difference);
}
