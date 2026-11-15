const cover = document.querySelector('.portfolio-cover');
const coverName = document.querySelector('#cover-name');
const header = document.querySelector('.portfolio-header');
const navName = header.querySelector('.wordmark');
const movingName = document.querySelector('.cover-name-in-motion');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let frame = 0;

function positionCoverName() {
  frame = 0;
  const destination = navName.getBoundingClientRect();
  const source = coverName.getBoundingClientRect();
  const start = cover.offsetHeight * 0.22;
  const end = cover.offsetHeight - header.offsetHeight;
  const progress = Math.max(0, Math.min(1, (window.scrollY - start) / Math.max(1, end - start)));
  const eased = progress * progress * (3 - 2 * progress);
  const isMoving = !reducedMotion.matches && progress > 0 && progress < 1;
  const navVisible = progress >= 1;
  const reveal = navVisible ? 1 : isMoving ? Math.max(0, (eased - 0.67) / 0.33) : 0;
  const wordmarkReveal = navVisible ? 1 : isMoving ? Math.max(0, (progress - 0.92) / 0.08) : 0;

  header.style.setProperty('--nav-reveal', reveal);
  header.style.setProperty('--wordmark-reveal', wordmarkReveal);
  header.inert = !navVisible;
  header.classList.toggle('is-visible', navVisible);
  const animateName = isMoving && !matchMedia('(max-width: 600px)').matches;
  coverName.classList.toggle('is-docking', animateName);
  movingName.classList.toggle('is-moving', animateName);
  if (!animateName) return;

  const sourceFontSize = parseFloat(getComputedStyle(coverName).fontSize);
  const destinationFontSize = parseFloat(getComputedStyle(navName).fontSize);
  const destinationScale = destinationFontSize / sourceFontSize;
  const destinationY = destination.top + (destination.height - source.height * destinationScale) / 2;
  const x = source.left + (destination.left - source.left) * eased;
  const y = source.top + (destinationY - source.top) * eased;
  const scale = 1 + (destinationScale - 1) * eased;
  movingName.style.fontSize = `${sourceFontSize}px`;
  movingName.style.setProperty('--name-morph', eased);
  movingName.style.opacity = Math.min(1, (1 - progress) / 0.12);
  movingName.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
}

function schedulePosition() {
  if (!frame) frame = requestAnimationFrame(positionCoverName);
}

function playPortfolioSplash() {
  const root = document.documentElement;
  if (!root.classList.contains('has-portfolio-splash')) return;

  const splash = document.querySelector('.portfolio-splash');
  const listeners = new AbortController();
  const { signal } = listeners;

  function dismiss() {
    root.classList.remove('has-portfolio-splash');
    listeners.abort();
  }

  if (window.scrollY > 0) {
    dismiss();
    return;
  }

  window.addEventListener('scroll', dismiss, { passive: true, signal });
  document.addEventListener('focusin', dismiss, { signal });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') dismiss();
  }, { signal });
  window.addEventListener('pageshow', event => {
    if (event.persisted) dismiss();
  }, { signal });
  splash.addEventListener('animationend', event => {
    if (event.target === splash) dismiss();
  }, { signal });

  const photos = [...splash.querySelectorAll('img')];
  const decoded = Promise.allSettled(photos.map(photo => photo.decode?.()));
  const waitLimit = new Promise(resolve => setTimeout(resolve, 400));
  Promise.race([decoded, waitLimit]).then(() => {
    if (!signal.aborted) splash.classList.add('is-ready');
  });
}

window.addEventListener('scroll', schedulePosition, { passive: true });
window.addEventListener('resize', schedulePosition);
window.addEventListener('pageshow', schedulePosition);
reducedMotion.addEventListener('change', schedulePosition);
document.fonts?.ready.then(schedulePosition);
positionCoverName();
playPortfolioSplash();
