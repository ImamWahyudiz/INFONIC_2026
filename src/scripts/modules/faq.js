/**
 * FAQ Smooth Accordion Controller
 * Provides 60fps fluid expand & collapse transitions for native <details> elements
 * without instant close snaps or unintended auto-closures.
 */
export function initFaq() {
  const faqItems = document.querySelectorAll('#faq .faq-item');
  if (!faqItems.length) return;

  faqItems.forEach((details) => {
    const summary = details.querySelector('summary');
    const wrapper = details.querySelector('.faq-answer-wrapper');
    if (!summary || !wrapper) return;

    summary.addEventListener('click', (e) => {
      e.preventDefault(); // Stop native instant snap

      const isCurrentlyOpen = details.hasAttribute('open');

      if (isCurrentlyOpen) {
        // CLOSE smoothly
        details.classList.remove('is-open');
        wrapper.style.gridTemplateRows = '0fr';

        const onEnd = (evt) => {
          if (evt.propertyName === 'grid-template-rows') {
            wrapper.removeEventListener('transitionend', onEnd);
            details.removeAttribute('open');
            wrapper.style.gridTemplateRows = '';
          }
        };
        wrapper.addEventListener('transitionend', onEnd);
      } else {
        // OPEN smoothly
        // Close other open items
        faqItems.forEach((other) => {
          if (other !== details && other.hasAttribute('open')) {
            const otherWrapper = other.querySelector('.faq-answer-wrapper');
            other.classList.remove('is-open');
            if (otherWrapper) {
              otherWrapper.style.gridTemplateRows = '0fr';
              const onOtherEnd = (evt) => {
                if (evt.propertyName === 'grid-template-rows') {
                  otherWrapper.removeEventListener('transitionend', onOtherEnd);
                  other.removeAttribute('open');
                  otherWrapper.style.gridTemplateRows = '';
                }
              };
              otherWrapper.addEventListener('transitionend', onOtherEnd);
            } else {
              other.removeAttribute('open');
            }
          }
        });

        // Open this item
        details.setAttribute('open', '');
        wrapper.style.gridTemplateRows = '0fr';

        // Force reflow
        wrapper.offsetHeight; // eslint-disable-line

        details.classList.add('is-open');
        wrapper.style.gridTemplateRows = '1fr';

        const onEnd = (evt) => {
          if (evt.propertyName === 'grid-template-rows') {
            wrapper.removeEventListener('transitionend', onEnd);
            wrapper.style.gridTemplateRows = '';
          }
        };
        wrapper.addEventListener('transitionend', onEnd);
      }
    });
  });
}
