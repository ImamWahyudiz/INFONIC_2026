/**
 * Video Autopause via YouTube IFrame API (postMessage)
 * Automatically pauses YouTube video playback when user scrolls away,
 * preserving the exact timestamp without restarting the video.
 */
export function initVideoAutopause() {
  const section = document.getElementById('video-profil');
  if (!section) return;

  const iframe = section.querySelector('iframe');
  if (!iframe) return;

  // IntersectionObserver to detect when user scrolls away from the video
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // When section leaves viewport (less than 15% visible)
        if (!entry.isIntersecting) {
          try {
            iframe.contentWindow?.postMessage(
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
    {
      threshold: 0.15,
    }
  );

  observer.observe(section);
}
