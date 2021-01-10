'use strict';

import { readFileSync } from 'fs';

export function getInput() {
  return readFileSync('./day6/input', 'utf-8').trim().split('\n\n');
}

export function getSingleGrpYays(groupAnswers, result = '') {
  if (!groupAnswers) {
    return result;
  }

  const head = groupAnswers[0];
  const tail = groupAnswers.slice(1);

  //Using destructiring here somehow causes stack overflow even tho it seems
  //identical to the statements above.😕
  //const [head, ...tail] = groupAnswers;

  return result.includes(head)
    ? getSingleGrpYays(tail, result)
    : getSingleGrpYays(tail, result + head);
}

export function getAgreeds(groupAnswer) {
  const everyYes = getSingleGrpYays(groupAnswer.replaceAll('\n', ''));

  return everyYes
    .split('')
    .filter(yes => allAgrees(yes, groupAnswer))
    .join('');
}

function allAgrees(yes, groupAnswer) {
  return groupAnswer.split('\n').every(perPerson => perPerson.includes(yes));
}
