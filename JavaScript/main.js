'use strict';

const INTERVAL_DELAY = 1000;
const IMAGE_FOLDER = '../0-images';

/**
 * Containers for traffic light images
 * @typedef {Element[]} Containers
 */
const containers = ['left', 'top', 'right', 'bottom'].map((el) => document.getElementById(el));

const enableButton = document.getElementById('enableButton');
const nightModeButton = document.getElementById('nightMode');
const debugText = document.getElementById('debug');

/**
 * States of crosswalk
 * @typedef {string[][]} States
 */
const States = [
  ['Red', 'Green'],
  ['Red', 'Yellow'],
  ['Red', 'Red'],
  ['RedYellow', 'Red'],
  ['Green', 'Red'],
  ['Yellow', 'Red'],
  ['Red', 'Red'],
  ['Red', 'RedYellow'],
];

const NightStates = [
  ['Yellow', 'Off'],
  ['Off', 'Yellow'],
];

let currentState = 0;
let enabled = true;
let nightMode = false;

const render = () => {
  const states = nightMode ? NightStates : States;
  const colors = states[currentState];
  debugText.innerHTML = `State: ${currentState} | ${colors.join(' ')}`;
  for (const [i, container] of Object.entries(containers)) {
    const colorName = colors[i % 2];
    const path = `${IMAGE_FOLDER}/${i}-${colorName}.ico`;
    container.style.backgroundImage = `url(${path})`;
  }
};

const nextState = () => {
  const states = nightMode ? NightStates : States;
  const colors = states[currentState];
  if (!enabled && colors.every((s) => s === 'Red')) return;
  if (currentState >= states.length - 1) currentState = -1;
  currentState++;
};

const onEnableClick = () => {
  enabled = !enabled;
  enableButton.innerHTML = enabled ? 'Ausschalten' : 'Einschalten';
};
enableButton.addEventListener('click', onEnableClick);

const onNightModeClick = () => {
  nightMode = !nightMode;
  nightModeButton.innerHTML = nightMode ? 'Tagmodus' : 'Nachtmodus';
};
nightModeButton.addEventListener('click', onNightModeClick);

const onTimerTick = () => {
  nextState();
  render();
};

setInterval(onTimerTick, INTERVAL_DELAY);
render();
