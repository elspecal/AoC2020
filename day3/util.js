'use strict';

import { readFileSync } from 'fs';

export function getInput() {
  return readFileSync('./day3/input', 'utf-8').trim().split('\n');
}

export function filterMap(map, stepsV) {
  return map.filter((row, idx) => 0 === idx % stepsV);
}

export function getLocations(map, stepsH) {
  const len = map[0].length;
  return map.map((row, idx) => row[(stepsH * idx) % len]);
}

export function isTree(_location) {
  return '#' === _location;
}

export function countTrees({ stepsH, stepsV }) {
  return getLocations(filterMap(getInput(), stepsV), stepsH).filter(isTree)
    .length;
}
