/**
 * Ultra-Smooth Hardware-Accelerated Scroll Reveal with Staggered Cascading Delay
 * - Observes elements via IntersectionObserver (off main thread)
 * - Automatically computes staggered delay for elements entering in the same frame
 * - Liberates GPU memory by cleaning up will-change after transition finishes
 */
export function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-item');
  if (!revealElements.length) return;

  // Fallback for ancient browsers without IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  // Pre-reveal hero section immediately on page load with silky sequence
  const heroItems = document.querySelectorAll('#hero .reveal-item');
  if (heroItems.length) {
    heroItems.forEach((el, idx) => {
      setTimeout(() => {
        el.classList.add('is-revealed');
      }, 80 + idx * 120);
    });
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -6% 0px', // Trigger slightly before element enters center view
    threshold: 0.08
  };

  const observer = new IntersectionObserver((entries, obs) => {
    // Filter only currently intersecting entries
    const intersecting = entries.filter(e => e.isIntersecting);

    intersecting.forEach((entry, batchIdx) => {
      const el = entry.target;

      // If element belongs to #hero, skip since handled by initial entrance
      if (el.closest('#hero')) {
        obs.unobserve(el);
        return;
      }

      // Check if element belongs to a staggered group/grid
      const staggerParent = el.closest('.why-grid, .features-grid, .faq-list, .timeline-circle-line, .mobile-timeline-accordion, .stagger-group');
      if (staggerParent && !el.style.transitionDelay) {
        const siblings = Array.from(staggerParent.querySelectorAll('.reveal-item'));
        const sibIndex = siblings.indexOf(el);
        if (sibIndex >= 0) {
          el.style.transitionDelay = `${Math.min(sibIndex * 140, 750)}ms`;
        }
      } else if (intersecting.length > 1 && !el.style.transitionDelay) {
        el.style.transitionDelay = `${Math.min(batchIdx * 110, 600)}ms`;
      }

      requestAnimationFrame(() => {
        el.classList.add('is-revealed');
      });

      // Cleanup will-change after transition completes to preserve mobile GPU memory
      const onTransitionEnd = (evt) => {
        if (evt.target === el && (evt.propertyName === 'transform' || evt.propertyName === 'opacity')) {
          el.style.willChange = 'auto';
          el.removeEventListener('transitionend', onTransitionEnd);
        }
      };
      el.addEventListener('transitionend', onTransitionEnd, { passive: true });

      // Unobserve immediately
      obs.unobserve(el);
    });
  }, observerOptions);

  revealElements.forEach(el => {
    if (!el.closest('#hero')) {
      observer.observe(el);
    }
  });
}
