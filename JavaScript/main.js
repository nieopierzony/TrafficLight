'use strict';

const INTERVAL_DELAY = 1000;
const IMAGE_FOLDER = '/0-images';

/**
 * Containers for traffic light images
 * @typedef {Element[]} Containers
 */
const containers = ['left', 'top', 'right', 'bottom'].map((el) => document.getElementById(el));

const enableButton = document.getElementById('enableButton');
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

let currentState = 0;
let enabled = true;

const render = () => {
  const colors = States[currentState];
  debugText.innerHTML = `State: ${currentState} | ${colors.join(' ')}`;
  for (const [i, container] of Object.entries(containers)) {
    const colorName = colors[i % 2];
    const path = `${IMAGE_FOLDER}/${i}-${colorName}.ico`;
    container.style.backgroundImage = `url(${path})`;
  }
};

const nextState = () => {
  const colors = States[currentState];
  if (!enabled && colors.every((s) => s === 'Red')) return;
  if (currentState >= States.length - 1) currentState = -1;
  currentState++;
};

const onButtonClick = () => {
  enabled = !enabled;
  enableButton.innerHTML = enabled ? 'Ausschalten' : 'Einschalten';
};
enableButton.addEventListener('click', onButtonClick);

const onTimerTick = () => {
  nextState();
  render();
};

setInterval(onTimerTick, INTERVAL_DELAY);
render();
