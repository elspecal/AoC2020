'use strict';

import { readFileSync } from 'fs';

export const BOOT_CODE = getInput();

const INIT_STATE = {
  accumulator: 0,
  next: 0,
  switched: null,
  done: [],
};

function getInput() {
  return readFileSync('./day8/input', 'utf-8').trim().split('\n');
}

function execute(instruction, state) {
  const operations = { acc, jmp, nop };
  const [operation, argument] = instruction.split(' ');

  return operations[operation](Number(argument), state);
}

function acc(argument, state) {
  const { accumulator, next, done } = state;
  return {
    ...state,
    accumulator: accumulator + argument,
    next: next + 1,
    done: [...done, next],
  };
}

function jmp(argument, state) {
  const { next, done } = state;
  return {
    ...state,
    next: next + argument,
    done: [...done, next],
  };
}

function nop() {
  const state = arguments[1];
  const { next, done } = state;
  return {
    ...state,
    next: next + 1,
    done: [...done, next],
  };
}

function isJmpOrNop(instruction) {
  return /jmp|nop/.test(instruction);
}

function switchOperation(instruction) {
  const [operation, argument] = instruction.split(' ');

  return 'nop' === operation ? `jmp ${argument}` : `nop ${argument}`;
}

function fixBootCode(bootCode, toFix, newInstruction) {
  return [
    ...bootCode.slice(0, toFix),
    newInstruction,
    ...bootCode.slice(toFix + 1),
  ];
}

function fixAndRestart(bootCode, switched, bootLoader) {
  const startIdx = null === switched ? switched : switched + 1;
  const toSwitch = startIdx + bootCode.slice(startIdx).findIndex(isJmpOrNop);
  const state = {
    accumulator: 0,
    next: 0,
    switched: toSwitch,
    done: [],
  };
  const restored =
    null === switched
      ? bootCode
      : fixBootCode(bootCode, switched, switchOperation(bootCode[switched]));

  const fixed = fixBootCode(
    restored,
    toSwitch,
    switchOperation(bootCode[toSwitch])
  );

  return bootLoader(fixed, state);
}

function processBootCode(bootCode, state) {
  if (state.next === bootCode.length || state.done.includes(state.next)) {
    return state;
  }

  const newState = execute(bootCode[state.next], state);

  return processBootCode(bootCode, newState);
}

export function processTilRepeat(bootCode, state = INIT_STATE) {
  return processBootCode(bootCode, state).accumulator;
}

export function processTilEOL(bootCode, state = INIT_STATE) {
  const newState = processBootCode(bootCode, state);

  if (newState.next === bootCode.length) {
    return newState.accumulator;
  }

  return fixAndRestart(bootCode, newState.switched, processTilEOL);
}
