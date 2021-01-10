import {
  INPUT,
  BAG,
  parseRule,
  findDirectContainers,
  findAllContainers,
} from './util.js';

function main() {
  const rules = INPUT.map(parseRule);
  const containers = findDirectContainers(BAG, rules);
  const allContainers = findAllContainers(containers, rules);

  console.log(allContainers.length);
}

main();
