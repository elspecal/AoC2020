'use strict';

import { readFileSync } from 'fs';

export function getInput() {
  return readFileSync('./day5/input', 'utf-8').trimEnd().split('\n');
}

export function getRow(binarySeatCode) {
  return calcSeat(
    0,
    127,
    binarySeatCode.slice(0, 7).replaceAll('B', '1').replaceAll('F', '0')
  );
}

export function getColumn(binarySeatCode) {
  return calcSeat(
    0,
    7,
    binarySeatCode.slice(7).replaceAll('R', '1').replaceAll('L', '0')
  );
}

export function convertToSeatId(binarySeatCode) {
  return 8 * getRow(binarySeatCode) + getColumn(binarySeatCode);
}

function calcSeat(tail, head, directions) {
  const length = (head - tail + 1) / 2;
  const direction = Number(directions[0]);
  const newDirections = directions.slice(1);

  if (1 === length) {
    return tail + direction;
  }

  return 0 === direction
    ? calcSeat(tail, head - length, newDirections)
    : calcSeat(tail + length, head, newDirections);
}
