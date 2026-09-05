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

  function updateParallax() {
    const scrollY = window.scrollY;
    const windowH = window.innerHeight;

    // Hitung progress saat pengguna berada di section filosofi (dibuat rentang panjang dan smooth)
    let convergeProgress = 0;
    if (filosofiSec) {
      const rect = filosofiSec.getBoundingClientRect();
      // Rentang scroll diperlebar dari filosofi hingga video profil agar gerakannya gradual & santai
      const startTrigger = windowH * 0.25; 
      const endTrigger = -rect.height * 0.95;
      const totalRange = startTrigger - endTrigger;
      
      const currentPos = startTrigger - rect.top;
      convergeProgress = Math.max(0, Math.min(1, currentPos / totalRange));
    }

    const isMobile = window.innerWidth <= 768;
    // Jarak pergeseran dari luar layar sampai merapat pas di tengah
    const maxShift = isMobile ? window.innerWidth * 0.60 : 450;

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
