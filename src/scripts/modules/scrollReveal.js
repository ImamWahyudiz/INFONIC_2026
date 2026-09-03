/**
 * Ultra-Smooth Hardware-Accelerated Scroll Reveal
 * - Observes elements via IntersectionObserver (off main thread)
 * - Proactively reveals elements slightly before they enter the viewport (positive rootMargin)
 * - Zero GPU layer bloat: avoids permanent will-change raster locks
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
      }, 60 + idx * 100);
    });
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px 80px 0px', // Proactive trigger: starts smoothly before user scrolls into it
    threshold: 0.02
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
      const staggerParent = el.closest('.why-grid, .features-grid, .faq-list, .timeline-circle-line, .stagger-group');
      if (staggerParent && !el.style.transitionDelay) {
        const siblings = Array.from(staggerParent.querySelectorAll('.reveal-item'));
        const sibIndex = siblings.indexOf(el);
        if (sibIndex >= 0) {
          el.style.transitionDelay = `${Math.min(sibIndex * 120, 600)}ms`;
        }
      } else if (intersecting.length > 1 && !el.style.transitionDelay) {
        el.style.transitionDelay = `${Math.min(batchIdx * 90, 450)}ms`;
      }

      requestAnimationFrame(() => {
        el.classList.add('is-revealed');
      });

      // Unobserve immediately to free memory
      obs.unobserve(el);
    });
  }, observerOptions);

  revealElements.forEach(el => {
    if (!el.closest('#hero')) {
      observer.observe(el);
    }
  });
}
