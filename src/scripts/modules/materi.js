/**
 * Materi Section Touch & Hold Interactive Feedback (Mobile & Desktop)
 * - Provides immediate tactile visual feedback on touchstart / hold
 * - Removes active state cleanly on touchend / touchcancel / touchmove beyond threshold
 */
export function initMateri() {
  const cards = document.querySelectorAll('.feature-card');
  if (!cards.length) return;

  cards.forEach((card) => {
    let touchStartX = 0;
    let touchStartY = 0;
    let isTouchActive = false;

    card.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      isTouchActive = true;
      card.classList.add('is-touched');
    }, { passive: true });

    card.addEventListener('touchmove', (e) => {
      if (!isTouchActive) return;
      const diffX = Math.abs(e.touches[0].clientX - touchStartX);
      const diffY = Math.abs(e.touches[0].clientY - touchStartY);
      // If user is scrolling the page, release the hold/press state
      if (diffX > 10 || diffY > 10) {
        isTouchActive = false;
        card.classList.remove('is-touched');
      }
    }, { passive: true });

    card.addEventListener('touchend', () => {
      isTouchActive = false;
      setTimeout(() => {
        card.classList.remove('is-touched');
      }, 150);
    }, { passive: true });

    card.addEventListener('touchcancel', () => {
      isTouchActive = false;
      card.classList.remove('is-touched');
    }, { passive: true });
  });
}
