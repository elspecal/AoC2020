'use strict';

import { readFileSync } from 'fs';

export const INPUT = getInput();
export const BAG = 'shiny gold';

function getInput() {
  return readFileSync('./day7/input', 'utf-8').trim().split('\n');
}

function separateContents(contents) {
  return (function inner(contents, result) {
    if (0 === contents.length) {
      return result;
    }

    const content = {
      quantity: Number(contents[0]),
      color: contents.slice(1, 3).join(' '),
    };

    return inner(contents.slice(3), [...result, content]);
  })(contents, []);
}

export function parseRule(rule) {
  const bags = rule
    .replaceAll(/bag[s]?|contain|[,.]/g, '')
    .trim()
    .split(/\s+/g);

  return {
    container: bags.slice(0, 2).join(' '),
    contents: separateContents(bags.slice(2)),
  };
}

export function findDirectContainers(color, rules) {
  return rules
    .filter(rule => rule.contents.some(content => color === content.color))
    .map(rule => rule.container);
}

export function findAllContainers(containers, rules) {
  return (function inner(containers, rules, result) {
    if (0 === containers.length) {
      return result;
    }

    const nestedContainers = containers
      .flatMap(container => findDirectContainers(container, rules))
      .filter(
        (container, idx, arr) =>
          idx === arr.lastIndexOf(container) &&
          !result.includes(container) &&
          !containers.includes(container)
      );

    return inner(nestedContainers, rules, result.concat(containers));
  })(containers, rules, []);
}

function findContents(container, rules) {
  return rules.find(rule => rule.container === container)?.contents;
}

export function collectAllContents(contents, rules) {
  return (function inner(contents, rules, result) {
    if (0 === contents.length) {
      return result;
    }

    const nestedContents = contents
      .filter(content => rules.some(rule => rule.container === content.color))
      .flatMap(content =>
        findContents(content.color, rules).map(nested => ({
          ...nested,
          quantity: nested.quantity * content.quantity,
        }))
      );

    return inner(nestedContents, rules, result.concat(contents));
  })(contents, rules, []);
}
