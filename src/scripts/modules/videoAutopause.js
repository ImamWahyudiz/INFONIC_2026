/**
 * Lite YouTube Facade Activation & Autopause via YouTube IFrame API (postMessage)
 * - Zero heavy scripts on initial load (~580 KiB JS & CSS saved)
 * - Dynamically loads iframe only when requested
 * - Automatically pauses playback when user scrolls away from the section
 */
export function initVideoAutopause() {
  const section = document.getElementById('video-profil');
  if (!section) return;

  const frameContainer = document.getElementById('videoAspectFrame');
  const facade = document.getElementById('videoFacade');
  let activeIframe = null;

  function loadYouTubeVideo() {
    if (!facade || !frameContainer || activeIframe) return;

    const videoId = facade.getAttribute('data-video-id') || 'duVUo2qjiAk';
    const iframe = document.createElement('iframe');
    iframe.id = 'profileVideoIframe';
    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&enablejsapi=1&rel=0&modestbranding=1`;
    iframe.title = 'Video Profil HMIT UIN Sunan Kalijaga';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;

    frameContainer.innerHTML = '';
    frameContainer.appendChild(iframe);
    activeIframe = iframe;
  }

  if (facade) {
    facade.addEventListener('click', loadYouTubeVideo);
    facade.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        loadYouTubeVideo();
      }
    });
  }

  // IntersectionObserver to pause video when user scrolls away
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting && activeIframe) {
          try {
            activeIframe.contentWindow?.postMessage(
              JSON.stringify({
                event: 'command',
                func: 'pauseVideo',
                args: ''
              }),
              '*'
            );
          } catch (_) {}
        }
      });
    },
    { threshold: 0.15 }
  );

  observer.observe(section);
}
