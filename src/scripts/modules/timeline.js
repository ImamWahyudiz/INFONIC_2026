export function initTimeline() {
  // =========================================================
  // TIMELINE CARD CAROUSEL (Desktop & Sync)
  // =========================================================
  const track = document.getElementById('carouselTrack');
  const container = document.getElementById('carouselContainer');
  const cards = document.querySelectorAll('#carouselTrack .agenda-card');
  const tlSteps = document.querySelectorAll('#timelineNav .tl-step');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');

  let currentIndex = 0;
  const totalCards = cards.length;

  let isPointerDown = false;
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let currentTranslateX = 0;
  let dragDiffX = 0;
  let hasDragged = false;
  let isHorizontalSwipe = null;
  let animationFrameId = null;

  // Calculate pixel-perfect center position snapped to integer pixels
  function getTargetTranslateX(idx) {
    if (!track || !container || !cards[idx]) return 0;
    const containerWidth = container.clientWidth;
    const card = cards[idx];
    const cardLeft = card.offsetLeft;
    const cardWidth = card.offsetWidth;
    return Math.round((containerWidth - cardWidth) / 2 - cardLeft);
  }

  function setTrackPosition(x, smooth = false) {
    if (!track) return;
    track.style.transition = smooth ? 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)' : 'none';
    track.style.transform = `translate3d(${x}px, 0, 0)`;
  }

  function updateCarousel(index, smooth = true) {
    if (index < 0) index = 0;
    if (index >= totalCards) index = totalCards - 1;
    currentIndex = index;

    // 1. Calculate & apply position with GPU compositing
    const targetX = getTargetTranslateX(currentIndex);
    setTrackPosition(targetX, smooth);

    // 2. Update Active Card State
    cards.forEach((card, i) => {
      if (i === currentIndex) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    // 3. Update Timeline Steps
    tlSteps.forEach((step, i) => {
      if (i === currentIndex) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });
  }

  // Event Listeners: Timeline Steps Click
  tlSteps.forEach(step => {
    step.addEventListener('click', () => {
      const idx = parseInt(step.getAttribute('data-index'), 10);
      if (!isNaN(idx)) updateCarousel(idx, true);
    });
  });

  // Event Listeners: Card Click
  cards.forEach(card => {
    card.addEventListener('click', () => {
      if (hasDragged) return;
      const idx = parseInt(card.getAttribute('data-index'), 10);
      if (!isNaN(idx) && idx !== currentIndex) {
        updateCarousel(idx, true);
      }
    });
  });

  // Event Listeners: Prev / Next Buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const nextIdx = (currentIndex - 1 + totalCards) % totalCards;
      updateCarousel(nextIdx, true);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const nextIdx = (currentIndex + 1) % totalCards;
      updateCarousel(nextIdx, true);
    });
  }

  // Keyboard Arrow Navigation
  window.addEventListener('keydown', (e) => {
    const section = document.getElementById('acara');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;

    if (e.key === 'ArrowLeft') {
      const nextIdx = (currentIndex - 1 + totalCards) % totalCards;
      updateCarousel(nextIdx, true);
    } else if (e.key === 'ArrowRight') {
      const nextIdx = (currentIndex + 1) % totalCards;
      updateCarousel(nextIdx, true);
    }
  });

  // Passive Touch Swipe & Mouse Drag (Zero Scroll Prevention)
  if (container) {
    const onDragStart = (e) => {
      isPointerDown = true;
      isDragging = false;
      hasDragged = false;
      isHorizontalSwipe = null;
      dragDiffX = 0;
      startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
      startY = e.type.includes('mouse') ? e.pageY : e.touches[0].clientY;
    };

    const onDragMove = (e) => {
      if (!isPointerDown) return;
      if (isHorizontalSwipe === false) return; // Completely yield to native vertical scroll

      const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
      const currentY = e.type.includes('mouse') ? e.pageY : e.touches[0].clientY;
      const diffX = currentX - startX;
      const diffY = currentY - startY;
      const absX = Math.abs(diffX);
      const absY = Math.abs(diffY);

      if (isHorizontalSwipe === null) {
        // Vertical move -> immediately abort carousel drag, 100% native scroll
        if (absY > 6 && absY >= absX) {
          isHorizontalSwipe = false;
          isPointerDown = false;
          isDragging = false;
          return;
        }

        // Horizontal move -> activate carousel drag
        if (absX > 10 && absX > absY * 1.3) {
          isHorizontalSwipe = true;
          isDragging = true;
          currentTranslateX = getTargetTranslateX(currentIndex);
          container.classList.add('is-dragging');
          if (track) {
            track.style.willChange = 'transform';
            track.style.transition = 'none';
          }
        }
      }

      if (isHorizontalSwipe === true && isDragging) {
        if (absX > 6) hasDragged = true;

        let resistanceDiff = diffX;
        if ((currentIndex === 0 && diffX > 0) || (currentIndex === totalCards - 1 && diffX < 0)) {
          resistanceDiff = diffX * 0.35;
        }
        dragDiffX = resistanceDiff;

        if (!animationFrameId) {
          animationFrameId = requestAnimationFrame(() => {
            setTrackPosition(Math.round(currentTranslateX + dragDiffX), false);
            animationFrameId = null;
          });
        }
      }
    };

    const onDragEnd = () => {
      if (!isPointerDown && !isDragging) return;
      isPointerDown = false;

      if (isDragging) {
        isDragging = false;
        container.classList.remove('is-dragging');

        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }

        if (hasDragged) {
          if (dragDiffX < -45 && currentIndex < totalCards - 1) {
            updateCarousel(currentIndex + 1, true);
          } else if (dragDiffX > 45 && currentIndex > 0) {
            updateCarousel(currentIndex - 1, true);
          } else {
            updateCarousel(currentIndex, true);
          }
        } else {
          updateCarousel(currentIndex, false);
        }
      }

      setTimeout(() => {
        if (track) track.style.willChange = 'auto';
        hasDragged = false;
        dragDiffX = 0;
        isHorizontalSwipe = null;
      }, 480);
    };

    // Prevent HTML5 native image/text dragging
    container.addEventListener('dragstart', (e) => e.preventDefault());

    // 100% Passive Touch events (Never prevents default)
    container.addEventListener('touchstart', onDragStart, { passive: true });
    window.addEventListener('touchmove', onDragMove, { passive: true });
    window.addEventListener('touchend', onDragEnd, { passive: true });
    window.addEventListener('touchcancel', onDragEnd, { passive: true });

    // Mouse events with blur/mouseleave safety
    container.addEventListener('mousedown', (e) => {
      if (e.button !== 0 || e.target.closest('a, button')) return;
      onDragStart(e);
    });
    window.addEventListener('mousemove', onDragMove);
    window.addEventListener('mouseup', onDragEnd);
    window.addEventListener('blur', onDragEnd);
    document.addEventListener('mouseleave', onDragEnd);

    // Window Resize recalculation (debounced)
    let resizeRaf = null;
    window.addEventListener('resize', () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        updateCarousel(currentIndex, false);
      });
    });

    // Initialize on page load
    updateCarousel(0, false);
  }

  // =========================================================
  // MOBILE TIMELINE (Modern Compact Grid Accordion - Zero Reflow)
  // =========================================================
  const mobileTimeline = document.getElementById('mobileTimelineAccordion') || document.getElementById('mobileTimeline');
  if (mobileTimeline) {
    const mtlSteps = mobileTimeline.querySelectorAll('.mtl-step');
    let activeMobileIndex = 0;

    function setActiveMobileStep(index) {
      // Toggle closed if tapping the already open step
      if (activeMobileIndex === index) {
        activeMobileIndex = -1;
        mtlSteps.forEach((step) => {
          step.classList.remove('active');
          const cardWrapper = step.querySelector('.mtl-card-wrapper');
          if (cardWrapper) {
            cardWrapper.setAttribute('aria-hidden', 'true');
            cardWrapper.setAttribute('inert', '');
          }
        });
        return;
      }

      if (index < 0 || index >= mtlSteps.length) return;
      activeMobileIndex = index;

      mtlSteps.forEach((step, i) => {
        const isTarget = i === index;
        step.classList.toggle('active', isTarget);
        const cardWrapper = step.querySelector('.mtl-card-wrapper');
        if (cardWrapper) {
          cardWrapper.setAttribute('aria-hidden', isTarget ? 'false' : 'true');
          if (isTarget) {
            cardWrapper.removeAttribute('inert');
          } else {
            cardWrapper.setAttribute('inert', '');
          }
        }
      });

      // Synchronize with desktop index
      if (currentIndex !== index) {
        updateCarousel(index, false);
      }
    }

    // Tap/Click on compact pills and dots
    mtlSteps.forEach((step, i) => {
      const pill = step.querySelector('.mtl-pill');
      const dot = step.querySelector('.mtl-dot');

      const handleStepClick = () => {
        setActiveMobileStep(i);
      };

      if (pill) pill.addEventListener('click', handleStepClick);
      if (dot) dot.addEventListener('click', handleStepClick);
    });

    // Initialize mobile accordion (Default: TM - Index 0)
    setActiveMobileStep(0);
  }
}
