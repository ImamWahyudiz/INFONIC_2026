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
    cards.forEach((c) => {
      c.classList.remove('is-active');
      c.setAttribute('aria-expanded', 'false');
    });

    card.classList.add('is-active');
    card.setAttribute('aria-expanded', 'true');
    if (grid) {
      grid.setAttribute('data-active', String(index));
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
