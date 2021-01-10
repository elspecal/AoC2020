'use strict';

import { INPUT, BAG, parseRule, collectAllContents } from './util.js';

function main() {
  const rules = INPUT.filter(rule => /\d/.test(rule)).map(parseRule);

  const contents = rules.find(rule => rule.container === BAG).contents;
  const quantities = collectAllContents(contents, rules).map(
    content => content.quantity
  );

  console.log(quantities.reduce((total, current) => total + current));
}

main();
