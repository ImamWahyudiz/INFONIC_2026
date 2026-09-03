export function initNavbar() {
  // 1. Hardware Accelerated Scroll Progress Bar (scaleX on GPU Layer)
  const progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    let ticking = false;
    const updateProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const scrollFraction = Math.min(Math.max(scrollTop / docHeight, 0), 1);
        progressBar.style.transform = `scaleX(${scrollFraction})`;
      }
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }, { passive: true });

    // Initial calculation
    updateProgress();
  }

  // 2. Hamburger Menu Toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navToggle.classList.toggle('open');
      navMenu.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when clicking on any menu link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 3. Active Navbar State using IntersectionObserver (Zero Layout Thrashing)
  const sections = document.querySelectorAll('.page-section');
  const navLinks = document.querySelectorAll('.nav-menu a');

  if (sections.length && navLinks.length) {
    if ('IntersectionObserver' in window) {
      const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
      };

      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
              const href = link.getAttribute('href');
              if (href === '#' + id) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      }, observerOptions);

      sections.forEach(section => sectionObserver.observe(section));
    } else {
      // Fallback throttled scroll for older browsers
      let scrollTicking = false;
      window.addEventListener('scroll', () => {
        if (!scrollTicking) {
          window.requestAnimationFrame(() => {
            let current = '';
            const scrollY = window.pageYOffset;
            sections.forEach(section => {
              if (scrollY >= (section.offsetTop - 220)) {
                current = section.getAttribute('id');
              }
            });

            navLinks.forEach(link => {
              if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
            scrollTicking = false;
          });
          scrollTicking = true;
        }
      }, { passive: true });
    }
  }
}
