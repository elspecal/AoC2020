'use strict';

import { readFileSync } from 'fs';

export function getInput() {
  return readFileSync('./day4/input', 'utf-8').trim().split('\n\n');
}

export function parseInput(passportData) {
  return Object.fromEntries(
    passportData
      .split(/\s/)
      .map(passportEntry => passportEntry.match(/(\w+):(.+)/).slice(1, 3))
  );
}

export function keysAreValid(keyCollection) {
  return ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].every(key =>
    keyCollection.includes(key)
  );
}

function birthYearIsValid(year) {
  return 1920 <= Number(year) && 2002 >= Number(year);
}

function issueYearIsValid(year) {
  return 2010 <= Number(year) && 2020 >= Number(year);
}

function expirationYearIsValid(year) {
  return 2020 <= Number(year) && 2030 >= Number(year);
}

function heightIsValid(height) {
  const parsed = height.match(/(\d{2,3})(cm|in)/);

  if (parsed) {
    const [value, unit] = parsed.slice(1);

    if ('cm' === unit) {
      return 150 <= Number(value) && 193 >= Number(value);
    }
    if ('in' === unit) {
      return 59 <= Number(value) && 76 >= Number(value);
    }
  }

  return false;
}

function hairColorIsValid(color) {
  return /^#[0-9a-f]{6}$/.test(color);
}

function eyeColorIsValid(color) {
  return /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(color);
}

function passportIdIsValid(id) {
  return /^\d{9}$/.test(id);
}

export function valuesAreValid({ byr, iyr, eyr, hgt, hcl, ecl, pid }) {
  return (
    birthYearIsValid(byr) &&
    issueYearIsValid(iyr) &&
    expirationYearIsValid(eyr) &&
    heightIsValid(hgt) &&
    hairColorIsValid(hcl) &&
    eyeColorIsValid(ecl) &&
    passportIdIsValid(pid)
  );
}
