/**
 * Filosofi Section Interactive Card Toggle (Mobile-friendly)
 * Enables single expanded card with compact companion cards on mobile screens,
 * seamlessly toggling between cards when clicked.
 */
export function initFilosofi() {
  const grid = document.getElementById('filosofiGrid');
  const cards = document.querySelectorAll('#filosofi .why-card');
  if (!cards.length) return;

  const setActive = (card, index) => {
    const isMobile = window.innerWidth <= 768;

    if (isMobile && grid) {
      // 1. FIRST: Record initial dimensions and positions
      const firstRects = Array.from(cards).map(c => c.getBoundingClientRect());

      // 2. LAST: Apply new layout state
      cards.forEach((c) => {
        c.classList.remove('is-active');
        c.setAttribute('aria-expanded', 'false');
      });
      card.classList.add('is-active');
      card.setAttribute('aria-expanded', 'true');
      grid.setAttribute('data-active', String(index));

      // Force synchronous layout to calculate new positions
      const lastRects = Array.from(cards).map(c => c.getBoundingClientRect());

      // 3. INVERT: Move and scale elements back to their initial positions instantly
      cards.forEach((c, i) => {
        const first = firstRects[i];
        const last = lastRects[i];
        const deltaX = first.left - last.left;
        const deltaY = first.top - last.top;
        const scaleW = first.width / last.width;
        const scaleH = first.height / last.height;

        c.style.transition = 'none';
        c.style.transformOrigin = 'top left';
        c.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scaleW}, ${scaleH})`;
      });

      // 4. PLAY: Animate to the new state
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          cards.forEach((c) => {
            // Add a smooth easing curve for the movement and scale
            c.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.3, 1), background 0.3s ease, border-color 0.3s ease';
            c.style.transform = 'translate(0, 0) scale(1, 1)';
            
            // Cleanup inline styles after animation finishes
            const onEnd = (e) => {
              if (e.propertyName === 'transform') {
                c.style.transition = '';
                c.style.transform = '';
                c.style.transformOrigin = '';
                c.removeEventListener('transitionend', onEnd);
              }
            };
            c.addEventListener('transitionend', onEnd);
          });
        });
      });

    } else {
      // Desktop behavior
      cards.forEach((c) => {
        c.classList.remove('is-active');
        c.setAttribute('aria-expanded', 'false');
      });
      card.classList.add('is-active');
      card.setAttribute('aria-expanded', 'true');
      if (grid) {
        grid.setAttribute('data-active', String(index));
      }
    }
  };

  cards.forEach((card, index) => {
    if (card.classList.contains('is-active') && grid) {
      grid.setAttribute('data-active', String(index));
    }

    const handleToggle = () => {
      if (card.classList.contains('is-active')) return;
      setActive(card, index);
    };

    card.addEventListener('click', handleToggle);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleToggle();
      }
    });
  });
}
