'use strict';

import { readFileSync } from 'fs';

export function getInput() {
  return readFileSync('./day2/input', 'utf-8').trim().split('\n');
}

export function parseInput(input) {
  const charArr = input.match(/(\d+)-(\d+) (\w): (\w+)/);
  const [int1, int2, _char, pass] = charArr.slice(1);

  return { int1, int2, _char, pass };
}

function findIndexes(pass, _char, idxArr = []) {
  const idx = pass.indexOf(_char, idxArr[idxArr.length - 1] ?? 0);
  if (-1 === idx) return idxArr;
  return findIndexes(pass, _char, [...idxArr, (idx + 1).toString()]);
}

export function passIsValidRange({ int1, int2, _char, pass }) {
  const charRegEx = new RegExp(_char, 'g');
  const count = (pass.match(charRegEx) || []).length;

  return int1 <= count && int2 >= count;
}

export function passIsValidPos({ int1, int2, _char, pass }) {
  const indexes = findIndexes(pass, _char);

  return (
    (indexes.includes(int1) && !indexes.includes(int2)) ||
    (indexes.includes(int2) && !indexes.includes(int1))
  );
}
