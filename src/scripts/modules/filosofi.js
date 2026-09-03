/**
 * Filosofi Section Interactive Card Toggle (Mobile-friendly)
 * Enables single expanded card with compact companion cards on mobile screens,
 * seamlessly toggling between cards when clicked.
 */
export function initFilosofi() {
  const cards = document.querySelectorAll('#filosofi .why-card');
  if (!cards.length) return;

  cards.forEach((card) => {
    const handleToggle = () => {
      // If already active, do nothing
      if (card.classList.contains('is-active')) return;

      cards.forEach((c) => {
        c.classList.remove('is-active');
        c.setAttribute('aria-expanded', 'false');
      });

      card.classList.add('is-active');
      card.setAttribute('aria-expanded', 'true');
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
