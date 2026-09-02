export function initTimeline() {
  // =========================================================
  // TIMELINE CARD CAROUSEL (Desktop & Sync)
  // =========================================================
  const track = document.getElementById('carouselTrack');
  const container = document.getElementById('carouselContainer');
  const cards = document.querySelectorAll('#carouselTrack .agenda-card');
  const tlSteps = document.querySelectorAll('#timelineNav .tl-step');
  const indicatorDots = document.querySelectorAll('#carouselIndicators .indicator-dot');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');

  let currentIndex = 0;
  const totalCards = cards.length;

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

    // 1. Calculate & apply position first to avoid layout thrashing
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

    // Mobile horizontal timeline auto-scroll without disturbing page vertical scroll
    const tlNav = document.getElementById('timelineNav');
    if (tlNav && window.innerWidth <= 768 && tlSteps[currentIndex]) {
      const activeStep = tlSteps[currentIndex];
      const stepLeft = activeStep.offsetLeft;
      const stepWidth = activeStep.offsetWidth;
      const navWidth = tlNav.clientWidth;
      tlNav.scrollTo({
        left: Math.round(stepLeft - (navWidth - stepWidth) / 2),
        behavior: smooth ? 'smooth' : 'auto'
      });
    }

    // 4. Update Indicator Dots
    indicatorDots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
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

  // Event Listeners: Card Click (click adjacent peek card to focus)
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (hasDragged) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
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

  // Event Listeners: Indicator Dots
  indicatorDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      if (!isNaN(idx)) updateCarousel(idx, true);
    });
  });

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

  // Smooth Touch Swipe & Mouse Drag with Realtime Tracking & Momentum
  if (container) {
    const onDragStart = (e) => {
      isDragging = true;
      hasDragged = false;
      isHorizontalSwipe = null;
      dragDiffX = 0;
      startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
      startY = e.type.includes('mouse') ? e.pageY : e.touches[0].clientY;
      currentTranslateX = getTargetTranslateX(currentIndex);
      container.classList.add('is-dragging');
      if (track) track.style.transition = 'none';
    };

    const onDragMove = (e) => {
      if (!isDragging) return;
      const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
      const currentY = e.type.includes('mouse') ? e.pageY : e.touches[0].clientY;
      const diffX = currentX - startX;
      const diffY = currentY - startY;

      // Determine intent on first significant movement
      if (isHorizontalSwipe === null) {
        if (Math.abs(diffX) > 6 || Math.abs(diffY) > 6) {
          isHorizontalSwipe = Math.abs(diffX) >= Math.abs(diffY);
        }
      }

      // Vertical scroll on mobile: allow native scroll without hijacking
      if (isHorizontalSwipe === false) return;

      // Horizontal swipe on carousel
      if (isHorizontalSwipe === true) {
        if (e.cancelable) e.preventDefault();
        if (Math.abs(diffX) > 6) hasDragged = true;

        // Rubber-band resistance on boundary edges
        let resistanceDiff = diffX;
        if ((currentIndex === 0 && diffX > 0) || (currentIndex === totalCards - 1 && diffX < 0)) {
          resistanceDiff = diffX * 0.35;
        }
        dragDiffX = resistanceDiff;

        // Realtime 60fps position update
        if (!animationFrameId) {
          animationFrameId = requestAnimationFrame(() => {
            setTrackPosition(Math.round(currentTranslateX + dragDiffX), false);
            animationFrameId = null;
          });
        }
      }
    };

    const onDragEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      container.classList.remove('is-dragging');

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }

      if (hasDragged) {
        // Threshold of 45px or velocity to trigger slide
        if (dragDiffX < -45 && currentIndex < totalCards - 1) {
          updateCarousel(currentIndex + 1, true);
        } else if (dragDiffX > 45 && currentIndex > 0) {
          updateCarousel(currentIndex - 1, true);
        } else {
          // Snap back to current
          updateCarousel(currentIndex, true);
        }
      } else {
        updateCarousel(currentIndex, false);
      }

      // Briefly keep hasDragged flag to suppress inadvertent click handlers
      setTimeout(() => {
        hasDragged = false;
        dragDiffX = 0;
      }, 50);
    };

    // Touch events
    container.addEventListener('touchstart', onDragStart, { passive: true });
    window.addEventListener('touchmove', onDragMove, { passive: false });
    window.addEventListener('touchend', onDragEnd);
    window.addEventListener('touchcancel', onDragEnd);

    // Mouse events
    container.addEventListener('mousedown', onDragStart);
    window.addEventListener('mousemove', onDragMove);
    window.addEventListener('mouseup', onDragEnd);

    // Prevent image/link ghost dragging inside carousel
    container.addEventListener('dragstart', (e) => e.preventDefault());

    // Window Resize recalculation (debounced)
    let resizeRaf = null;
    window.addEventListener('resize', () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        updateCarousel(currentIndex, false);
      });
    });

    // Initialize on page load (Default: TM - Index 0)
    updateCarousel(0, false);
    requestAnimationFrame(() => updateCarousel(0, false));
    window.addEventListener('load', () => updateCarousel(0, false));
  }

  // =========================================================
  // MOBILE VERTICAL ACCORDION TIMELINE CONTROLLER (<=768px)
  // =========================================================
  const mobileAccordion = document.getElementById('mobileTimelineAccordion');
  if (mobileAccordion) {
    const mtlSteps = mobileAccordion.querySelectorAll('.mtl-step');
    let activeMobileIndex = 0;

    let scrollTimeout = null;
    let safetyTimeout = null;

    function setActiveMobileStep(index, smoothScroll = false) {
      if (index < 0 || index >= mtlSteps.length) return;
      const previousIndex = activeMobileIndex;
      activeMobileIndex = index;

      mtlSteps.forEach((step, i) => {
        const pill = step.querySelector('.mtl-pill');
        if (i === activeMobileIndex) {
          step.classList.add('active');
          if (pill) pill.setAttribute('aria-expanded', 'true');
        } else {
          step.classList.remove('active');
          if (pill) pill.setAttribute('aria-expanded', 'false');
        }
      });

      // Smooth scroll so the active card is centered and NEVER covered by the sticky header
      if (smoothScroll && window.innerWidth <= 768) {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        if (safetyTimeout) clearTimeout(safetyTimeout);

        // Opening card below: wait for previous card above to finish collapsing (310ms)
        // Opening card above: card below causes zero shift, start earlier (160ms)
        const delay = (index > previousIndex) ? 310 : 160;

        scrollTimeout = setTimeout(() => {
          const targetStep = mtlSteps[activeMobileIndex];
          if (!targetStep) return;

          const card = targetStep.querySelector('.agenda-card') || targetStep;
          const rect = card.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const cardHeight = rect.height;

          // Header clearance: sticky nav bottom is at ~74px, minimum clearance is 88px
          let idealTopOffset = Math.round((viewportHeight - cardHeight) / 2);
          if (idealTopOffset < 88) {
            idealTopOffset = 88;
          }

          const targetScrollY = Math.max(0, window.pageYOffset + rect.top - idealTopOffset);
          window.scrollTo({
            top: Math.round(targetScrollY),
            behavior: 'smooth'
          });

          // Safety check: ensure card is NEVER covered by header
          safetyTimeout = setTimeout(() => {
            const currentRect = card.getBoundingClientRect();
            if (currentRect.top < 84) {
              window.scrollBy({
                top: Math.round(currentRect.top - 88),
                behavior: 'smooth'
              });
            }
          }, 200);
        }, delay);
      }
    }

    // Tap/Click on compact pills and dots
    mtlSteps.forEach((step, i) => {
      const pill = step.querySelector('.mtl-pill');
      const dot = step.querySelector('.mtl-dot');

      if (pill) {
        pill.addEventListener('click', (e) => {
          e.preventDefault();
          setActiveMobileStep(i, true);
        });
      }

      if (dot) {
        dot.addEventListener('click', (e) => {
          e.preventDefault();
          setActiveMobileStep(i, true);
        });
      }
    });

    // Touch swipe left/right on active cards to step next/prev
    mtlSteps.forEach((step) => {
      const cardWrapper = step.querySelector('.mtl-card-wrapper');
      if (!cardWrapper) return;

      let touchStartX = 0;
      let touchStartY = 0;
      let isSwiping = null;

      cardWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isSwiping = null;
      }, { passive: true });

      cardWrapper.addEventListener('touchmove', (e) => {
        const diffX = e.touches[0].clientX - touchStartX;
        const diffY = e.touches[0].clientY - touchStartY;
        if (isSwiping === null) {
          if (Math.abs(diffX) > 8 || Math.abs(diffY) > 8) {
            isSwiping = Math.abs(diffX) > Math.abs(diffY);
          }
        }
      }, { passive: true });

      cardWrapper.addEventListener('touchend', (e) => {
        if (isSwiping === true) {
          const touchEndX = e.changedTouches[0].clientX;
          const diffX = touchEndX - touchStartX;
          // Swipe threshold 45px
          if (diffX < -45) {
            // Swipe left -> Next step
            if (activeMobileIndex < mtlSteps.length - 1) {
              setActiveMobileStep(activeMobileIndex + 1, true);
            }
          } else if (diffX > 45) {
            // Swipe right -> Prev step
            if (activeMobileIndex > 0) {
              setActiveMobileStep(activeMobileIndex - 1, true);
            }
          }
        }
      });
    });

    // Initialize mobile accordion (Default: TM - Index 0)
    setActiveMobileStep(0, false);
  }
}
