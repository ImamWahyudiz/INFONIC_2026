import { initInteractiveChar } from './modules/interactiveChar.js';
import { initNavbar } from './modules/navbar.js';
import { initTimeline } from './modules/timeline.js';
import { initGugus } from './modules/gugus.js';
import { initScrollReveal } from './modules/scrollReveal.js';

document.addEventListener('DOMContentLoaded', () => {
  initInteractiveChar();
  initNavbar();
  initTimeline();
  initGugus();
  initScrollReveal();
});
