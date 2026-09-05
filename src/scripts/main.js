import { initInteractiveChar } from './modules/interactiveChar.js';
import { initNavbar } from './modules/navbar.js';
import { initTimeline } from './modules/timeline.js';
import { initGugus } from './modules/gugus.js';
import { initScrollReveal } from './modules/scrollReveal.js';
import { initVideoAutopause } from './modules/videoAutopause.js';
import { initFilosofi } from './modules/filosofi.js';
import { initMateri } from './modules/materi.js';
import { initParallax } from './modules/parallax.js';
import { initFaq } from './modules/faq.js';

document.addEventListener('DOMContentLoaded', () => {
  initInteractiveChar();
  initNavbar();
  initTimeline();
  initGugus();
  initScrollReveal();
  initVideoAutopause();
  initFilosofi();
  initMateri();
  initParallax();
  initFaq();
});
