export function initGugus() {
  // =========================================================
  // GUGUS CIRCULAR LOOP CAROUSEL (Manual with Dynamic Shrink)
  // =========================================================
  const gugusTrack = document.getElementById('gugusTrack');
  const gugusViewport = document.getElementById('gugusViewport');
  const gugusDots = document.querySelectorAll('#gugusIndicators .gugus-dot');

  if (gugusTrack && gugusViewport) {
    // Clean any prior clones
    gugusTrack.querySelectorAll('.is-clone').forEach(c => c.remove());

    const originalCards = Array.from(gugusTrack.querySelectorAll('.id-card'));
    const totalOriginal = originalCards.length; // 12 cards
    const bufferSize = totalOriginal; // Full 12-card buffer on each side (Set 1: 0..11, Set 2: 12..23, Set 3: 24..35)

    // Prepend a full clone set of 12 cards
    const prependFrag = document.createDocumentFragment();
    originalCards.forEach((card, idx) => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.classList.add('is-clone');
      clone.dataset.cloneIndex = idx;
      prependFrag.appendChild(clone);
    });
    gugusTrack.insertBefore(prependFrag, gugusTrack.firstChild);

    // Append a full clone set of 12 cards
    const appendFrag = document.createDocumentFragment();
    originalCards.forEach((card, idx) => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.classList.add('is-clone');
      clone.dataset.cloneIndex = idx;
      appendFrag.appendChild(clone);
    });
    gugusTrack.appendChild(appendFrag);

    let allCards = Array.from(gugusTrack.querySelectorAll('.id-card'));
    let trackIndex = bufferSize; // Start at index 12 (Gugus 01 in Set 2)

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
        if (i >= trackIndex && i < trackIndex + visibleCount) {
          card.classList.add('is-active-card');
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

    // Normalizes trackIndex into Set 2 (range 12..23)
    function normalizeIndex(idx) {
      return ((idx - bufferSize) % totalOriginal + totalOriginal) % totalOriginal + bufferSize;
    }

    function goToIndex(idx, smooth = true) {
      trackIndex = idx;
      updateActiveCards();

      if (smooth) {
        gugusTrack.classList.add('is-scrolling');
        if (settleTimeout) clearTimeout(settleTimeout);
        settleTimeout = setTimeout(() => {
          gugusTrack.classList.remove('is-scrolling');
          // Settle safety normalization
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

      const norm = normalizeIndex(trackIndex);
      if (norm !== trackIndex) {
        trackIndex = norm;
        setGugusPosition(getTargetTranslateX(trackIndex), false);
      }
      updateActiveCards();
    });

    // Touch & Mouse Drag Handlers
    const onDragStart = (e) => {
      isDragging = true;
      hasDragged = false;
      isHorizontalSwipe = null;
      dragDiffX = 0;
      startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
      startY = e.type.includes('mouse') ? e.pageY : e.touches[0].clientY;
      lastX = startX;
      lastTime = Date.now();
      velocity = 0;

      // Always normalize index into middle set (12..23) before dragging
      const norm = normalizeIndex(trackIndex);
      if (norm !== trackIndex) {
        trackIndex = norm;
        setGugusPosition(getTargetTranslateX(trackIndex), false);
        updateActiveCards();
      }
      currentTranslateX = getTargetTranslateX(trackIndex);

      gugusViewport.classList.add('is-dragging');
      gugusTrack.classList.add('is-scrolling');
      gugusTrack.style.transition = 'none';
      if (settleTimeout) clearTimeout(settleTimeout);
    };

    const onDragMove = (e) => {
      if (!isDragging) return;
      const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
      const currentY = e.type.includes('mouse') ? e.pageY : e.touches[0].clientY;
      const diffX = currentX - startX;
      const diffY = currentY - startY;

      if (isHorizontalSwipe === null) {
        if (Math.abs(diffX) > 6 || Math.abs(diffY) > 6) {
          isHorizontalSwipe = Math.abs(diffX) >= Math.abs(diffY);
        }
      }

      if (isHorizontalSwipe === false) return;

      if (isHorizontalSwipe === true) {
        if (e.cancelable) e.preventDefault();
        if (Math.abs(diffX) > 5) hasDragged = true;
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

    const onDragEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      gugusViewport.classList.remove('is-dragging');
      if (animFrame) {
        cancelAnimationFrame(animFrame);
        animFrame = null;
      }

      if (hasDragged) {
        const step = getStepWidth();
        // Calculate step count with momentum support
        let stepCount = Math.round(Math.abs(dragDiffX) / step);
        if (stepCount < 1 && (Math.abs(dragDiffX) > 35 || Math.abs(velocity) > 0.3)) {
          stepCount = 1;
        }
        stepCount = Math.min(stepCount, 3); // Max 3 cards per single flick

        const dir = (dragDiffX < 0 || velocity < -0.3) ? 1 : -1;
        if (stepCount > 0) {
          goToIndex(trackIndex + dir * stepCount, true);
        } else {
          goToIndex(trackIndex, true);
        }
      } else {
        goToIndex(trackIndex, false);
      }

      setTimeout(() => {
        hasDragged = false;
        dragDiffX = 0;
      }, 60);
    };

    // Events attachment
    gugusViewport.addEventListener('touchstart', onDragStart, { passive: true });
    window.addEventListener('touchmove', onDragMove, { passive: false });
    window.addEventListener('touchend', onDragEnd);
    window.addEventListener('touchcancel', onDragEnd);

    gugusViewport.addEventListener('mousedown', onDragStart);
    window.addEventListener('mousemove', onDragMove);
    window.addEventListener('mouseup', onDragEnd);

    gugusViewport.addEventListener('dragstart', (e) => e.preventDefault());

    // Trackpad Horizontal Wheel Support
    let wheelDebounce = null;
    gugusViewport.addEventListener('wheel', (e) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
      if (Math.abs(delta) > 18) {
        e.preventDefault();
        if (wheelDebounce) return;
        wheelDebounce = setTimeout(() => { wheelDebounce = null; }, 280);

        // Normalize before stepping
        const norm = normalizeIndex(trackIndex);
        if (norm !== trackIndex) {
          trackIndex = norm;
          setGugusPosition(getTargetTranslateX(trackIndex), false);
          updateActiveCards();
        }

        if (delta > 0) {
          goToIndex(trackIndex + 1, true);
        } else {
          goToIndex(trackIndex - 1, true);
        }
      }
    }, { passive: false });

    // Indicator Dots Click (Shortest circular path)
    gugusDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const dotIdx = parseInt(dot.getAttribute('data-index'), 10);
        if (!isNaN(dotIdx)) {
          // Normalize first
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
    requestAnimationFrame(() => goToIndex(bufferSize, false));
    window.addEventListener('load', () => goToIndex(bufferSize, false));
  }
}
