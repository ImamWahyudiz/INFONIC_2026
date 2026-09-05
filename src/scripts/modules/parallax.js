export function initParallax() {
  const parallaxAssets = document.querySelectorAll('.parallax-asset');
  
  if (parallaxAssets.length === 0) return;

  // Cache flip status from data attribute or initial style
  parallaxAssets.forEach(asset => {
    if (asset.dataset.flip === 'true' || asset.style.transform.includes('scaleX(-1)')) {
      asset.dataset.isFlipped = 'true';
    }
  });

  let ticking = false;

  const filosofiSec = document.getElementById('filosofi');

  let cachedFilosofiTop = 0;
  let cachedFilosofiHeight = 0;
  let cachedMaxShift = 0;
  let cachedWindowH = 0;

  function measureParallaxLayout() {
    cachedWindowH = window.innerHeight;
    if (filosofiSec) {
      const rect = filosofiSec.getBoundingClientRect();
      cachedFilosofiTop = rect.top + window.scrollY;
      cachedFilosofiHeight = rect.height;
    }
    const isMobile = window.innerWidth <= 768;
    cachedMaxShift = isMobile ? window.innerWidth * 0.60 : 450;
  }

  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(measureParallaxLayout);
    ro.observe(document.body);
  } else {
    window.addEventListener('resize', measureParallaxLayout, { passive: true });
  }
  // Initial measure
  measureParallaxLayout();

  function updateParallax() {
    const scrollY = window.scrollY;

    // Hitung progress saat pengguna berada di section filosofi (dibuat rentang panjang dan smooth)
    let convergeProgress = 0;
    if (filosofiSec) {
      const currentTop = cachedFilosofiTop - scrollY;
      // Rentang scroll diperlebar dari filosofi hingga video profil agar gerakannya gradual & santai
      const startTrigger = cachedWindowH * 0.25; 
      const endTrigger = -cachedFilosofiHeight * 0.95;
      const totalRange = startTrigger - endTrigger;
      
      const currentPos = startTrigger - currentTop;
      convergeProgress = Math.max(0, Math.min(1, currentPos / totalRange));
    }

    // Jarak pergeseran dari luar layar sampai merapat pas di tengah
    const maxShift = cachedMaxShift;

    parallaxAssets.forEach(asset => {
      // Subtle background depth speed so objects stay in their sky/space zones
      let speed = 0.08;
      if (asset.classList.contains('atmos')) {
        speed = 0.12;
      }
      
      const yPos = scrollY * speed;
      let xPos = 0;

      // Efek awan pembatas merapat dari kiri & kanan saat scroll ke bawah dan kembali saat scroll ke atas
      if (asset.classList.contains('awan-filosofi-kiri')) {
        xPos = convergeProgress * maxShift;
      } else if (asset.classList.contains('awan-filosofi-kanan')) {
        xPos = -convergeProgress * maxShift;
      }

      const flip = asset.dataset.isFlipped === 'true' ? ' scaleX(-1)' : '';
      asset.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)${flip}`;
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
  
  // Initial call to set positions
  updateParallax();
}
