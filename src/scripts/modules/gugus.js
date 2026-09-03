export function initGugus() {
  // =========================================================
  // GUGUS CIRCULAR LOOP CAROUSEL (GPU Accelerated)
  // =========================================================
  const gugusTrack = document.getElementById('gugusTrack');
  const gugusViewport = document.getElementById('gugusViewport');
  const gugusDots = document.querySelectorAll('#gugusIndicators .gugus-dot');

  if (gugusTrack && gugusViewport) {
    // Clean any prior clones
    gugusTrack.querySelectorAll('.is-clone').forEach(c => c.remove());

    const originalCards = Array.from(gugusTrack.querySelectorAll('.id-card'));
    const totalOriginal = originalCards.length; // 12 cards
    const bufferSize = totalOriginal; // Set 1: 0..11, Set 2: 12..23, Set 3: 24..35

    // Prepend clone set
    const prependFrag = document.createDocumentFragment();
    originalCards.forEach((card, idx) => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.classList.add('is-clone');
      clone.dataset.cloneIndex = idx;
      // Ensure clone images are lazy and async decoded
      clone.querySelectorAll('img').forEach(img => {
        img.loading = 'lazy';
        img.decoding = 'async';
      });
      prependFrag.appendChild(clone);
    });
    gugusTrack.insertBefore(prependFrag, gugusTrack.firstChild);

    // Append clone set
    const appendFrag = document.createDocumentFragment();
    originalCards.forEach((card, idx) => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.classList.add('is-clone');
      clone.dataset.cloneIndex = idx;
      clone.querySelectorAll('img').forEach(img => {
        img.loading = 'lazy';
        img.decoding = 'async';
      });
      appendFrag.appendChild(clone);
    });
    gugusTrack.appendChild(appendFrag);

    let allCards = Array.from(gugusTrack.querySelectorAll('.id-card'));
    let trackIndex = bufferSize; // Start at index 12 (Gugus 01 in Set 2)

    let isPointerDown = false;
    let isDragging = false;
    let hasDragged = false;
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastTime = 0;
    let velocity = 0;
    let currentTranslateX = 0;
    let dragDiffX = 0;
    let isHorizontalSwipe = null;
    let animFrame = null;
    let settleTimeout = null;

    function getSideGap() {
      if (window.innerWidth <= 768) return 20; // 1.25rem on mobile
      if (window.innerWidth <= 950) return 32; // 2rem on tablet
      return 40; // 2.5rem on desktop
    }

    function getVisibleCount() {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 950) return 2;
      return 3;
    }

    function updateActiveCards() {
      const visibleCount = getVisibleCount();
      allCards.forEach((card, i) => {
        card.classList.remove('stagger-card-0', 'stagger-card-1', 'stagger-card-2');
        if (i >= trackIndex && i < trackIndex + visibleCount) {
          const visibleIdx = i - trackIndex;
          card.classList.add('is-active-card', `stagger-card-${visibleIdx}`);
        } else {
          card.classList.remove('is-active-card');
        }
      });
    }

    function getStepWidth() {
      if (!allCards[0]) return 0;
      const card = allCards[0];
      const style = window.getComputedStyle(card);
      const marginRight = parseFloat(style.marginRight) || 0;
      return card.offsetWidth + marginRight;
    }

    function getTargetTranslateX(idx) {
      const sideGap = getSideGap();
      const step = getStepWidth();
      return sideGap - idx * step;
    }

    function setGugusPosition(x, smooth = false) {
      gugusTrack.style.transition = smooth ? 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)' : 'none';
      gugusTrack.style.transform = `translate3d(${Math.round(x)}px, 0, 0)`;
    }

    function updateGugusDots(realIdx) {
      gugusDots.forEach((dot, i) => {
        if (i === realIdx) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    function normalizeIndex(idx) {
      return ((idx - bufferSize) % totalOriginal + totalOriginal) % totalOriginal + bufferSize;
    }

    function goToIndex(idx, smooth = true) {
      trackIndex = idx;
      updateActiveCards();

      if (smooth) {
        gugusTrack.classList.add('is-scrolling');
        gugusTrack.style.willChange = 'transform';
        if (settleTimeout) clearTimeout(settleTimeout);
        settleTimeout = setTimeout(() => {
          gugusTrack.classList.remove('is-scrolling');
          gugusTrack.style.willChange = 'auto';
          const norm = normalizeIndex(trackIndex);
          if (norm !== trackIndex) {
            trackIndex = norm;
            setGugusPosition(getTargetTranslateX(trackIndex), false);
            updateActiveCards();
          }
        }, 480);
      } else {
        gugusTrack.classList.remove('is-scrolling');
      }

      const targetX = getTargetTranslateX(trackIndex);
      setGugusPosition(targetX, smooth);

      const realIndex = ((trackIndex - bufferSize) % totalOriginal + totalOriginal) % totalOriginal;
      updateGugusDots(realIndex);
    }

    // Instant seamless normalization when transition finishes
    gugusTrack.addEventListener('transitionend', (e) => {
      if (e.target !== gugusTrack) return;
      gugusTrack.classList.remove('is-scrolling');
      gugusTrack.style.willChange = 'auto';

      const norm = normalizeIndex(trackIndex);
      if (norm !== trackIndex) {
        trackIndex = norm;
        setGugusPosition(getTargetTranslateX(trackIndex), false);
      }
      updateActiveCards();
    });

    // =========================================================
    // POINTER & SWIPE HANDLER (Zero-Sticking, 100% Fluid Release)
    // =========================================================
    let activePointerId = null;

    const onPointerDown = (e) => {
      // Only primary button (left click) or touch/pen
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      // Do not initiate carousel drag when clicking buttons or links
      if (e.target.closest('a, button, input, textarea')) return;

      isPointerDown = true;
      isDragging = false;
      hasDragged = false;
      isHorizontalSwipe = null;
      dragDiffX = 0;
      activePointerId = e.pointerId;

      startX = e.clientX;
      startY = e.clientY;
      lastX = startX;
      lastTime = Date.now();
      velocity = 0;
    };

    const onPointerMove = (e) => {
      if (!isPointerDown) return;
      if (isHorizontalSwipe === false) return; // Yield completely to native vertical scroll

      const currentX = e.clientX;
      const currentY = e.clientY;
      const diffX = currentX - startX;
      const diffY = currentY - startY;
      const absX = Math.abs(diffX);
      const absY = Math.abs(diffY);

      if (isHorizontalSwipe === null) {
        // Vertical scroll intent: release immediately so page scrolls freely
        if (absY > 6 && absY >= absX) {
          isHorizontalSwipe = false;
          isPointerDown = false;
          isDragging = false;
          if (activePointerId !== null && gugusViewport.releasePointerCapture) {
            try { gugusViewport.releasePointerCapture(activePointerId); } catch (_) {}
          }
          activePointerId = null;
          return;
        }

        // Horizontal swipe intent: activate carousel drag
        if (absX > 10 && absX > absY * 1.2) {
          isHorizontalSwipe = true;
          isDragging = true;

          const norm = normalizeIndex(trackIndex);
          if (norm !== trackIndex) {
            trackIndex = norm;
            setGugusPosition(getTargetTranslateX(trackIndex), false);
            updateActiveCards();
          }
          currentTranslateX = getTargetTranslateX(trackIndex);

          gugusViewport.classList.add('is-dragging');
          gugusTrack.classList.add('is-scrolling');
          gugusTrack.style.willChange = 'transform';
          gugusTrack.style.transition = 'none';
          if (settleTimeout) clearTimeout(settleTimeout);

          if (activePointerId !== null && gugusViewport.setPointerCapture) {
            try { gugusViewport.setPointerCapture(activePointerId); } catch (_) {}
          }
        }
      }

      if (isHorizontalSwipe === true && isDragging) {
        if (absX > 6) hasDragged = true;
        dragDiffX = diffX;

        const now = Date.now();
        const dt = now - lastTime;
        if (dt > 0) {
          velocity = (currentX - lastX) / dt;
          lastX = currentX;
          lastTime = now;
        }

        if (!animFrame) {
          animFrame = requestAnimationFrame(() => {
            setGugusPosition(currentTranslateX + dragDiffX, false);
            animFrame = null;
          });
        }
      }
    };

    const onPointerUp = (e) => {
      if (activePointerId !== null && gugusViewport.releasePointerCapture) {
        try { gugusViewport.releasePointerCapture(activePointerId); } catch (_) {}
      }
      activePointerId = null;

      if (!isPointerDown && !isDragging) return;
      isPointerDown = false;

      if (isDragging) {
        isDragging = false;
        gugusViewport.classList.remove('is-dragging');
        if (animFrame) {
          cancelAnimationFrame(animFrame);
          animFrame = null;
        }

        if (hasDragged) {
          const step = getStepWidth();
          let stepCount = Math.round(Math.abs(dragDiffX) / step);
          if (stepCount < 1 && (Math.abs(dragDiffX) > 35 || Math.abs(velocity) > 0.3)) {
            stepCount = 1;
          }
          stepCount = Math.min(stepCount, 3); // Max 3 cards per flick

          const dir = (dragDiffX < 0 || velocity < -0.3) ? 1 : -1;
          if (stepCount > 0) {
            goToIndex(trackIndex + dir * stepCount, true);
          } else {
            goToIndex(trackIndex, true);
          }
        } else {
          goToIndex(trackIndex, false);
        }
      }

      setTimeout(() => {
        hasDragged = false;
        dragDiffX = 0;
        isHorizontalSwipe = null;
        gugusTrack.classList.remove('is-scrolling');
        gugusTrack.style.willChange = 'auto';
      }, 60);
    };

    // Prevent HTML5 native image dragging from hijacking mouse events
    gugusViewport.addEventListener('dragstart', (e) => e.preventDefault());

    // Prevent click triggering when drag occurred
    gugusViewport.addEventListener('click', (e) => {
      if (hasDragged) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);

    // Modern Pointer Events API (supports Mouse, Touch, Pen cleanly)
    gugusViewport.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
    window.addEventListener('blur', onPointerUp);
    document.addEventListener('mouseleave', onPointerUp);

    // Indicator Dots Click
    gugusDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const dotIdx = parseInt(dot.getAttribute('data-index'), 10);
        if (!isNaN(dotIdx)) {
          const norm = normalizeIndex(trackIndex);
          if (norm !== trackIndex) {
            trackIndex = norm;
            setGugusPosition(getTargetTranslateX(trackIndex), false);
            updateActiveCards();
          }
          const currentReal = (trackIndex - bufferSize) % totalOriginal;
          let diff = dotIdx - currentReal;
          if (diff > totalOriginal / 2) diff -= totalOriginal;
          if (diff < -totalOriginal / 2) diff += totalOriginal;
          goToIndex(trackIndex + diff, true);
        }
      });
    });

    // Window Resize Handling
    let gugusResizeRaf = null;
    window.addEventListener('resize', () => {
      if (gugusResizeRaf) cancelAnimationFrame(gugusResizeRaf);
      gugusResizeRaf = requestAnimationFrame(() => {
        goToIndex(trackIndex, false);
      });
    });

    // Initialize position
    goToIndex(bufferSize, false);
  }
}
