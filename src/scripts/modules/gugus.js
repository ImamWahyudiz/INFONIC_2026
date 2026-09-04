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
      clone.setAttribute('inert', '');
      clone.classList.add('is-clone');
      clone.dataset.cloneIndex = idx;
      // Ensure all focusable elements inside clones cannot receive keyboard focus
      clone.querySelectorAll('a, button, [tabindex]').forEach(el => {
        el.setAttribute('tabindex', '-1');
      });
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
      clone.setAttribute('inert', '');
      clone.classList.add('is-clone');
      clone.dataset.cloneIndex = idx;
      clone.querySelectorAll('a, button, [tabindex]').forEach(el => {
        el.setAttribute('tabindex', '-1');
      });
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

    let cachedStepWidth = 0;
    let cachedSideGap = 0;

    function measureLayout() {
      cachedSideGap = window.innerWidth <= 768 ? 20 : (window.innerWidth <= 950 ? 32 : 40);
      if (allCards[0]) {
        const card = allCards[0];
        const style = window.getComputedStyle(card);
        const marginRight = parseFloat(style.marginRight) || 0;
        cachedStepWidth = card.offsetWidth + marginRight;
      }
    }

    function getTargetTranslateX(idx) {
      return cachedSideGap - idx * cachedStepWidth;
    }

    function setGugusPosition(x, smooth = false) {
      if (smooth) {
        gugusTrack.classList.add('is-animating');
      } else {
        gugusTrack.classList.remove('is-animating');
      }
      gugusTrack.style.transform = `translate3d(${Math.round(x)}px, 0, 0)`;
    }

    function updateGugusDots(realIdx) {
      gugusDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === realIdx);
      });
    }

    function normalizeIndex(idx) {
      return ((idx - bufferSize) % totalOriginal + totalOriginal) % totalOriginal + bufferSize;
    }

    function goToIndex(idx, smooth = true) {
      trackIndex = idx;

      const targetX = getTargetTranslateX(trackIndex);
      setGugusPosition(targetX, smooth);

      const realIndex = ((trackIndex - bufferSize) % totalOriginal + totalOriginal) % totalOriginal;
      updateGugusDots(realIndex);
    }

    // Instant seamless normalization when transition finishes
    gugusTrack.addEventListener('transitionend', (e) => {
      if (e.target !== gugusTrack || e.propertyName !== 'transform') return;
      gugusTrack.classList.remove('is-animating');
      const norm = normalizeIndex(trackIndex);
      if (norm !== trackIndex) {
        // Brief opacity veil hides the teleport jump from user eyes
        gugusViewport.style.transition = 'opacity 0.05s linear';
        gugusViewport.style.opacity = '0';
        requestAnimationFrame(() => {
          trackIndex = norm;
          setGugusPosition(getTargetTranslateX(trackIndex), false);
          requestAnimationFrame(() => {
            gugusViewport.style.opacity = '';
            // Clean up inline transition after it resolves
            setTimeout(() => {
              gugusViewport.style.transition = '';
            }, 60);
          });
        });
      }
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
          }
          currentTranslateX = getTargetTranslateX(trackIndex);

          gugusViewport.classList.add('is-dragging');
          gugusTrack.classList.remove('is-animating');
          if (animFrame) {
            cancelAnimationFrame(animFrame);
            animFrame = null;
          }

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
          const step = cachedStepWidth || 300;
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
    document.addEventListener('pointermove', onPointerMove, { passive: true });
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
          }
          const currentReal = (trackIndex - bufferSize) % totalOriginal;
          let diff = dotIdx - currentReal;
          if (diff > totalOriginal / 2) diff -= totalOriginal;
          if (diff < -totalOriginal / 2) diff += totalOriginal;
          goToIndex(trackIndex + diff, true);
        }
      });
    });

    // Desktop Prev/Next Arrow Buttons
    const navPrev = document.getElementById('gugusNavPrev');
    const navNext = document.getElementById('gugusNavNext');
    if (navPrev) {
      navPrev.addEventListener('click', () => goToIndex(trackIndex - 1, true));
    }
    if (navNext) {
      navNext.addEventListener('click', () => goToIndex(trackIndex + 1, true));
    }

    // Window Resize Handling (with cached geometry update)
    let gugusResizeRaf = null;
    window.addEventListener('resize', () => {
      if (gugusResizeRaf) cancelAnimationFrame(gugusResizeRaf);
      gugusResizeRaf = requestAnimationFrame(() => {
        measureLayout();
        goToIndex(trackIndex, false);
      });
    });

    // Initialize layout measurement & position
    gugusTrack.style.transition = ''; // Clear any stale inline override
    measureLayout();
    goToIndex(bufferSize, false);
  }
}
