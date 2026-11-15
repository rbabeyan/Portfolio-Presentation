const deckLayoutURL = new URL('deck-layout.css?v=image-viewer', document.currentScript.src).href;
const minimalDeckThemeURL = new URL('minimal/deck-theme.css?v=process-rows', document.currentScript.src).href;
const minimalDeckMobileURL = new URL('minimal/deck-mobile.css?v=5', document.currentScript.src).href;

function addMinimalPhoneIntro(details, projectId, links) {
  const intro = details.querySelector('.ptitle');
  const makeSectionLink = ({ id, label }) => {
    const link = document.createElement('a');
    link.href = '#' + id;
    link.textContent = label;
    link.addEventListener('click', () => {
      if (location.hash === link.hash) details.querySelector('#' + id)?.scrollIntoView();
    });
    return link;
  };

  if (projectId === 'design-system' || projectId === 'color-picker') {
    const contents = document.createElement('details');
    contents.className = 'deck-phone-contents';
    contents.hidden = true;
    const toggle = document.createElement('summary');
    toggle.textContent = 'Project contents';
    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'Project contents');
    nav.append(...links.map(makeSectionLink));
    nav.addEventListener('click', event => {
      if (event.target.closest('a')) contents.open = false;
    });
    contents.append(toggle, nav);
    intro.append(contents);
  }

  const hero = document.createElement('figure');
  hero.className = 'deck-phone-hero deck-phone-hero-' + projectId;
  hero.hidden = true;
  intro.append(hero);
  if (projectId === 'color-picker') {
    const recording = details.querySelector('.prototype-recording');
    const originalSpot = recording.parentElement;
    const caption = document.createElement('figcaption');
    caption.textContent = 'Color picker prototype · Tap to expand';
    hero.append(caption);
    originalSpot.classList.add('deck-recording-original');
    const placeRecording = () => {
      if (portfolioPhone.matches) hero.prepend(recording);
      else originalSpot.append(recording);
    };
    placeRecording();
    portfolioPhone.addEventListener('change', placeRecording);
  } else {
    const assets = {
      layerswap: ['figma-layerswap', 'The redesigned Layerswap transfer form'],
      'font-chooser': ['figma-font-after', 'The redesigned Font Chooser shown in the Picsart editor'],
      'design-system': ['figma-design-system', 'Picsart editor screens showing the design system in use'],
    };
    const [asset, label] = assets[projectId];
    const frame = document.createElement('button');
    frame.type = 'button';
    frame.className = 'deck-phone-hero-image';
    const image = new Image();
    image.loading = 'lazy';
    image.src = '../../portfolio-images/mobile/' + asset + '.jpg';
    image.dataset.fullSrc = new URL('../../portfolio-images/' + asset + '.png', document.baseURI).href;
    image.alt = label;
    frame.append(image);
    enableProjectImage(image, frame);
    frame.setAttribute('aria-label', 'View full screen: ' + label);
    hero.append(frame);
  }

  if (projectId === 'layerswap') {
    const jumpLabels = [
      ['The friction points', 'Problems'],
      ['Two boxes', 'Transfer flow'],
      ['One picker', 'Asset picker'],
      ['Warnings before', 'Error recovery'],
    ];
    const jumps = document.createElement('nav');
    jumps.className = 'deck-phone-jumps';
    jumps.hidden = true;
    jumps.setAttribute('aria-label', 'Jump to a project section');
    for (const [heading, label] of jumpLabels) {
      const destination = links.find(link => link.label.startsWith(heading));
      if (destination) jumps.append(makeSectionLink({ ...destination, label }));
    }
    intro.append(jumps);
  }
}

function adaptMinimalDeck(details, projectId) {
  if (['layerswap', 'font-chooser', 'color-picker'].includes(projectId)) {
    for (const list of details.querySelectorAll('ul.nlist, ul.biglist')) {
      list.classList.add('deck-dot-list');
      list.querySelectorAll('li > .n').forEach(number => number.remove());
    }
  }
  if (projectId === 'layerswap') {
    details.querySelectorAll('.m-flow > .m-stack ~ div').forEach(block => block.remove());
    const pill = [...details.querySelectorAll('.outcome-slide .pill')].find(item => item.textContent === 'Full experienceredesign delivered');
    if (pill) pill.textContent = 'Full experience redesign delivered';
    return;
  }

  const context = details.querySelector('.slide.statement');
  const cards = context.querySelector('.detail-row');
  cards.classList.add('deck-context-cards');
  if (projectId === 'font-chooser') {
    context.querySelector('.quote').remove();
  } else if (projectId === 'design-system') {
    const role = details.querySelector('.slide.role-slide');
    context.querySelector('.eyebrow').textContent = 'Context';
    context.querySelector('.quote').textContent = role.querySelector('.scope').textContent;
    role.remove();
  } else if (projectId === 'color-picker') {
    context.querySelector('.eyebrow').textContent = 'Context';
    const extraCards = cards.nextElementSibling;
    cards.append(...extraCards.children);
    extraCards.remove();
    cards.classList.add('deck-prototyping-cards');
    const webinar = details.querySelector('.video-link');
    webinar.classList.add('deck-webinar-link');
    const label = document.createElement('span');
    label.className = 'deck-phone-webinar-label';
    label.hidden = true;
    label.innerHTML = '<strong>How Picsart Designers Free Their Ideas</strong><span>Watch the ProtoPie webinar ↗</span>';
    webinar.append(label);
  }
}

function renderDeckDetails(host, projectId) {
  const root = host.attachShadow({ mode: 'open' });
  const deckStyle = document.createElement('style');
  deckStyle.textContent = portfolioDeck.styles;
  const layoutStyle = document.createElement('link');
  layoutStyle.rel = 'stylesheet';
  layoutStyle.href = deckLayoutURL;
  const details = document.createElement('div');
  details.innerHTML = portfolioDeck.projects[projectId].join('');
  const chapters = [...details.querySelectorAll('.slide')];
  chapters.forEach((chapter, index) => { chapter.id = 'detail-' + (index + 1); });
  root.append(deckStyle, layoutStyle);
  if (host.dataset.theme === 'minimal') {
    adaptMinimalDeck(details, projectId);
    if (typeof preparePortfolioMedia === 'function') preparePortfolioMedia(details);
    const theme = document.createElement('link');
    theme.rel = 'stylesheet';
    theme.href = minimalDeckThemeURL;
    const mobileTheme = document.createElement('link');
    mobileTheme.rel = 'stylesheet';
    mobileTheme.href = minimalDeckMobileURL;
    root.append(theme, mobileTheme);

    const coverTitle = details.querySelector('.ptitle h2');
    if (coverTitle) {
      const heading = document.createElement('h1');
      coverTitle.querySelectorAll('br').forEach(lineBreak => lineBreak.replaceWith(' '));
      heading.append(...coverTitle.childNodes);
      coverTitle.replaceWith(heading);
    }
  }
  const links = chapters.filter(chapter => details.contains(chapter)).map((chapter, index) => {
    const heading = chapter.querySelector('h1, h2, h3, .statement, .quote, .pull');
    return { id: chapter.id, label: index === 0 ? 'Overview' : (heading?.innerText || heading?.textContent || 'Outcome').trim() };
  });
  if (host.dataset.theme === 'minimal') addMinimalPhoneIntro(details, projectId, links);

  let playbackObserver;

  function replaceMedia(media) {
    if (media.tagName === 'VIDEO') playbackObserver?.unobserve(media);
    const slot = media.closest('.media, .video-link') || media;
    if (!slot.parentElement) return;
    if (slot.classList.contains('deck-media-trigger')) {
      slot.classList.remove('deck-media-trigger', 'project-image-trigger');
      for (const name of ['tabindex', 'role', 'aria-haspopup', 'aria-label']) slot.removeAttribute(name);
    }
    const fallback = document.createElement('div');
    fallback.className = 'deck-missing';
    const label = document.createElement('div');
    label.textContent = media.alt || media.getAttribute('aria-label') || slot.parentElement.querySelector('.media-cap')?.textContent || 'Project video';
    const note = document.createElement('small');
    note.textContent = 'Media unavailable in this preview';
    label.append(note);
    fallback.append(label);
    media.replaceWith(fallback);
  }

  details.querySelectorAll('img, video').forEach(media => {
    if (media.matches('[data-media-missing]') || media.querySelector('[data-media-missing]')) {
      replaceMedia(media);
      return;
    }
    if (media.tagName === 'VIDEO') {
      media.removeAttribute('autoplay');
      keepVideoSilent(media);
      media.loop = true;
      media.preload = 'none';
      media.controls = false;
      media.closest('.media')?.classList.remove('no-zoom');
      media.querySelectorAll('source').forEach(source => {
        source.addEventListener('error', () => replaceMedia(media), { once: true });
      });
    }
    media.addEventListener('error', () => {
      if (media.isConnected) replaceMedia(media);
    }, { once: true });
  });

  root.append(details);
  playbackObserver = observeProjectVideos(details.querySelectorAll('video'));
  setupDeckInteractions(root);
  return links;
}
