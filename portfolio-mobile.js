const portfolioPhone = matchMedia('(max-width: 600px)');
const portfolioStillPreviews = matchMedia('(prefers-reduced-motion: reduce), (prefers-reduced-data: reduce)');
const portfolioMobileImages = new Set([
  'all-generations-grid.png', 'cards-before.png', 'sidebar-before.png', 'sidebar-board.png', 'sidebar-explore.png',
  'ChooserScreen.png', 'SlippageFlow.png', 'SortingLogic.png',
]);
const portfolioMobileVideos = new Set([
  'all-generations-list.mp4', 'model-auto-picking.mp4', 'model-dropdown.mp4', 'model-smart-search.mp4',
  'InteractiveSearch.mp4', 'MinMaxBehavior.mp4', 'MultiWallets.mp4', 'ResponsicePicker.mp4',
  'TransactionHistory.mp4', 'color-picker-prototype.mp4', 'font-chooser-prototype.mp4',
]);

function usePortfolioStillPreviews() {
  return portfolioPhone.matches && (portfolioStillPreviews.matches || navigator.connection?.saveData);
}

function preparePortfolioMedia(root) {
  for (const image of root.querySelectorAll('img[src]')) {
    if (!portfolioPhone.matches && !image.dataset.fullSrc) continue;
    const original = new URL(image.dataset.fullSrc || image.getAttribute('src'), document.baseURI);
    const name = original.pathname.split('/').pop();
    if (!portfolioMobileImages.has(name)) continue;
    if (portfolioPhone.matches) {
      image.dataset.fullSrc = original.href;
      image.loading = 'lazy';
      image.src = new URL('mobile/' + name.replace(/\.png$/, '.jpg'), original);
    } else if (image.dataset.fullSrc) {
      image.src = original;
      delete image.dataset.fullSrc;
    }
  }
  for (const video of root.querySelectorAll('video')) {
    if (portfolioPhone.matches === Boolean(video.dataset.fullSrc)) continue;
    const src = video.dataset.fullSrc || video.getAttribute('src') || video.querySelector('source')?.getAttribute('src');
    if (!src) continue;
    const original = new URL(src, document.baseURI);
    const name = original.pathname.split('/').pop();
    if (!portfolioMobileVideos.has(name)) continue;

    const wasPlaying = !video.paused;
    if (portfolioPhone.matches) {
      video.dataset.fullSrc = original.href;
      video.dataset.desktopPoster = video.getAttribute('poster') || '';
      video.poster = new URL('mobile/' + name.replace(/\.mp4$/, '.jpg'), original);
      video.src = new URL('mobile/' + name, original);
    } else {
      video.src = original;
      if (video.dataset.desktopPoster) video.poster = video.dataset.desktopPoster;
      else video.removeAttribute('poster');
      delete video.dataset.desktopPoster;
      delete video.dataset.fullSrc;
    }
    if (wasPlaying && !usePortfolioStillPreviews()) video.play().catch(() => {});
  }
}

portfolioPhone.addEventListener('change', () => {
  preparePortfolioMedia(document);
  const deck = document.querySelector('.deck-details')?.shadowRoot;
  if (deck) preparePortfolioMedia(deck);
});

document.addEventListener('DOMContentLoaded', () => {
  const mobileHeader = document.querySelector('.portfolio-header, .site-header');
  const desktopNav = mobileHeader?.querySelector('nav');
  if (!desktopNav) return;

  const menu = document.createElement('details');
  menu.className = 'portfolio-mobile-menu';
  const summary = document.createElement('summary');
  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Portfolio pages');
  const current = desktopNav.querySelector('a[aria-current="page"]') || desktopNav.querySelector('a');
  summary.textContent = current.textContent.trim();
  for (const link of desktopNav.querySelectorAll('a')) {
    const entry = link.cloneNode(true);
    entry.classList.remove('portfolio-playground-link');
    if (link === current) entry.setAttribute('aria-current', 'page');
    nav.append(entry);
  }
  menu.append(summary, nav);
  mobileHeader.append(menu);
  mobileHeader.classList.add('has-mobile-menu');

  document.addEventListener('click', event => {
    if (!menu.open) return;
    if (!menu.contains(event.target) || event.target.closest('a')) menu.open = false;
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || !menu.open || !portfolioPhone.matches) return;
    menu.open = false;
    summary.focus();
  });
  window.addEventListener('scroll', () => {
    if (mobileHeader.inert) menu.open = false;
  }, { passive: true });
  portfolioPhone.addEventListener('change', () => { menu.open = false; });

  const detail = document.querySelector('.pg-page-detail');
  const desktopBack = detail?.querySelector('.pg-page-thumb');
  if (!desktopBack) return;
  const mobileBack = document.createElement('button');
  mobileBack.type = 'button';
  mobileBack.className = 'portfolio-mobile-chapter-back';
  mobileBack.textContent = 'AI Playground';
  mobileBack.setAttribute('aria-label', 'Back to AI Playground');
  mobileBack.hidden = true;
  mobileBack.addEventListener('click', () => desktopBack.click());
  mobileHeader.insertBefore(mobileBack, menu);

  function showMobileChapterBack() {
    const show = portfolioPhone.matches && !detail.hidden;
    mobileBack.hidden = !show;
    mobileHeader.classList.toggle('has-mobile-chapter-back', show);
  }
  new MutationObserver(showMobileChapterBack).observe(detail, { attributes: true, attributeFilter: ['hidden'] });
  portfolioPhone.addEventListener('change', showMobileChapterBack);
  showMobileChapterBack();
});
