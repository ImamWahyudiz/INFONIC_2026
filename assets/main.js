/**
 * INFONIC 2026 Interactive Script
 * - Interactive word-wrapped characters hover
 * - Smooth scroll progress bar
 * - Active navbar indicator on scroll
 */
document.addEventListener("DOMContentLoaded", () => {
  // Interactive character hover with anti-word-break
  const elements = document.querySelectorAll(".interactive-char");
  elements.forEach((el) => {
    const text = el.textContent.trim();
    el.innerHTML = "";
    const words = text.split(/\s+/);
    words.forEach((wordText, wordIdx) => {
      const wordSpan = document.createElement("span");
      wordSpan.className = "word-wrap";

      for (let i = 0; i < wordText.length; i++) {
        const charSpan = document.createElement("span");
        charSpan.className = "char";
        charSpan.textContent = wordText[i];
        wordSpan.appendChild(charSpan);
      }

      el.appendChild(wordSpan);

      if (wordIdx < words.length - 1) {
        const spaceSpan = document.createElement("span");
        spaceSpan.className = "char-space";
        spaceSpan.innerHTML = "&nbsp;";
        el.appendChild(spaceSpan);
      }
    });
  });

  // Scroll Progress Bar
  const progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
      }
    });
  }

  // Hamburger Menu Toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking on any menu link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
      }
    });
  }

  // Active Navbar State on Scroll
  const sections = document.querySelectorAll('.page-section');
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  if (sections.length && navLinks.length) {
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 220)) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    });
  }
});
