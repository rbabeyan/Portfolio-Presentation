const projects = [
  {
    id: 'ai-playground',
    title: 'AI Playground',
    company: 'Picsart',
    discipline: 'AI creation workflows',
    tags: ['redesign', 'experiment'],
    role: 'Solo product designer on the AI Playground team, working with stakeholders',
    implementation: 'I used Claude Code to implement my designs in the AI Playground codebase. The changes went through the team’s CI pipeline on feature branches and were merged into the product.',
    intro: 'I helped creators start a generation, choose a model, and find their work again across a single workspace for images, video, and audio.',
    outcome: 'Quick starts, a redesigned sidebar, All generations, Create, and Smart Search shipped in 2026.',
    cover: {
      src: '../../playground-deck/PG-HistoryList.png',
      alt: 'AI Playground concept showing a searchable generation history, sidebar, and composer',
      caption: 'Design exploration for All generations',
    },
    sections: [
      {
        id: 'start',
        title: 'Start from a task, not a blank prompt',
        body: [
          'The old board offered inspiration clips and left people to figure out what to type. I designed quick-start cards around tasks like editing a portrait or animating a photo.',
          'A card fills an editable prompt, tells people when they need a reference, and keeps the selected model when it supports the task. The dedicated Create page later brought quick starts and recent projects together, with a choice of which board to create in.',
        ],
        media: [
          { src: '../../playground-deck/PG-EmptyBefore.png', alt: 'An empty board with a strip of inspiration clips above the prompt box', caption: 'Earlier empty board' },
        ],
        placeholder: ['Annotated screenshot sequence', 'Show “Studio headshot from a selfie” filling the editable prompt and highlighting the photo slot.'],
      },
      {
        id: 'choose',
        title: 'Search for a model by describing the task',
        body: [
          'I designed a compact picker for recent and recommended models, with the full catalog one step away. Smart Search ranks models for descriptive queries and supports ordinary lookup by name.',
          'I questioned whether choosing the current model counted as a change. The follow-up also uncovered missing desktop selection events. The team added full-picker tracking and experiment labels so the comparison could be measured.',
        ],
        placeholder: ['Short screen recording with a still', 'Type “cinematic drone shot with sound,” show the ranked results and Best match, then select a model.'],
      },
      {
        id: 'navigate',
        title: 'Give the workspace one place to navigate',
        body: [
          'Boards, pinned items, history, Drive, and Library competed for attention. I moved workspace navigation into the sidebar and grouped boards under Folders. Library and All generations gained their own destinations as the workspace evolved.',
          'On phones, the redesign consolidated two bars into one header and moved account settings into the sidebar.',
        ],
        media: [
          { src: '../../playground-deck/PG-SidebarIterations.png', alt: 'A series of sidebar layouts exploring navigation and folder grouping', caption: 'Sidebar explorations' },
        ],
      },
      {
        id: 'return',
        title: 'Find past results across boards',
        body: [
          'I moved history out of an inline rail into a workspace view. People can search and filter generations across boards and choose a list or grid.',
          'A result opens in preview. From there, Show in board returns to the project it belongs to, so people can identify the right result before moving.',
        ],
        media: [
          { src: '../../playground-deck/PG-HistoryGrid.png', alt: 'Generation history exploration with past results in a grid', caption: 'All generations grid exploration' },
        ],
        placeholder: ['Three annotated screenshots', 'Show a search across two boards, open the result, then show the board reached by selecting Show in board.'],
      },
      {
        id: 'auto',
        title: 'Keep automated choices visible',
        body: [
          'In a staging exploration, Best for my prompt let people opt into automatic model selection. The composer named the recommendation, and manually choosing a model turned Auto off.',
        ],
        placeholder: ['Staging prototype recording', 'Show Auto turning on, a named recommendation appearing, and a manual choice turning Auto off.'],
      },
    ],
  },
  layerswapProject,
  fontChooserProject,
  designSystemProject,
  colorPickerProject,
];

const home = document.querySelector('#home');
const casePage = document.querySelector('#case');
const direction = document.body.dataset.direction;
const isMinimalDirection = direction === 'minimal';
const projectURL = id => './index.html?project=' + id;
const allWorkURL = isMinimalDirection ? '../../index.html#work' : './index.html#work';
const image = item => `<img src="${item.src}" alt="${item.alt}" loading="lazy" decoding="async">`;
const escapeText = value => value.replace(/[&<>"]/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;',
})[char]);

function card(project, secondary = false) {
  return `
    <a class="work-card${secondary ? ' secondary' : ''}" data-project="${project.id}" href="${projectURL(project.id)}">
      <div class="work-image work-image--${project.id}">
        ${project.cover && !project.cover.unavailable ? image(project.cover) : `<span class="work-fallback" aria-hidden="true">${project.title}</span>`}
      </div>
      <div class="work-copy">
        <span class="work-kicker">${project.company} / ${project.discipline}</span>
        <h2>${project.title}</h2>
        <p>${project.intro}</p>
        <span class="work-link">View case study <span aria-hidden="true">↗</span></span>
      </div>
    </a>`;
}

function figure(item, className = '') {
  const label = item.caption || item.alt;
  const isVideo = item.kind === 'video';
  if (item.unavailable) {
    return `<figure class="case-media ${className}">
      <div class="case-media-unavailable">${isVideo ? 'Video' : 'Image'} unavailable in this preview</div>
      <figcaption>${label}</figcaption>
    </figure>`;
  }
  return `<figure class="case-media ${className}">
    ${isVideo
      ? `<video controls playsinline preload="none" src="${item.src}" aria-label="${escapeText(label)}"></video>`
      : `<button class="media-zoom" type="button" aria-label="Enlarge ${escapeText(label)}">
          ${image(item)}<span aria-hidden="true">+</span>
        </button>`}
    <div class="case-media-unavailable" hidden>${isVideo ? 'Video' : 'Image'} unavailable in this preview</div>
    <figcaption>${label}</figcaption>
  </figure>`;
}

function chapter(section) {
  return `<section class="case-section" id="${section.id}">
    <div class="case-text">
      <h2>${section.title}</h2>
      ${section.body.map(paragraph => `<p>${paragraph}</p>`).join('')}
      ${section.items?.length ? `<ul class="case-items">${section.items.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}
      ${section.stats?.length ? `<dl class="case-stats">${section.stats.map(({ value, label }) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join('')}</dl>` : ''}
      ${section.links?.length ? `<ul class="case-links">${section.links.map(({ url, label }) => `<li><a href="${url}" target="_blank" rel="noopener">${label} ↗</a></li>`).join('')}</ul>` : ''}
    </div>
    ${section.media ? `<div class="case-visual"><div class="visual-grid">${section.media.map(item => figure(item)).join('')}</div></div>` : ''}
    ${section.placeholder ? `<div class="visual-placeholder"><strong>${section.placeholder[0]}</strong><p>${section.placeholder[1]}</p></div>` : ''}
  </section>`;
}

function showProjectMedia(media, trigger, label, ratio, controls = null) {
  let dialog = document.querySelector('.project-image-dialog');
  if (!dialog) {
    dialog = document.createElement('dialog');
    if (typeof dialog.showModal !== 'function') return;
    dialog.className = 'project-image-dialog';
    dialog.innerHTML = `
      <button class="project-image-close" type="button" aria-label="Close image" autofocus>×</button>
      <div class="project-image-stage"></div>`;
    dialog.querySelector('button').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', () => {
      if (dialog.open) return;
      const stage = dialog.querySelector('.project-image-stage');
      stage.querySelector('video')?.pause();
      stage.replaceChildren();
    });
    document.body.append(dialog);
  }
  if (dialog.open) return;

  const kind = media.tagName === 'VIDEO' ? 'video' : 'image';
  const stage = dialog.querySelector('.project-image-stage');
  stage.style.setProperty('--image-ratio', ratio);
  stage.replaceChildren(media);
  if (controls) stage.append(controls);
  dialog.classList.toggle('is-video', kind === 'video');
  dialog.setAttribute('aria-label', label ? `Full-screen ${kind}: ${label}` : `Full-screen ${kind}`);
  dialog.querySelector('.project-image-close').setAttribute('aria-label', `Close ${kind}`);
  trigger.focus({ preventScroll: true });
  dialog.showModal();
  return dialog;
}

function openProjectImage(image, trigger, crop = null) {
  if (image.complete && !image.naturalWidth) return;

  const fullImage = new Image();
  fullImage.src = image.dataset.fullSrc || image.currentSrc || image.src;
  fullImage.alt = image.alt;
  const width = crop?.clientWidth || image.naturalWidth || image.clientWidth;
  const height = crop?.clientHeight || image.naturalHeight || image.clientHeight;
  if (crop && width && height) {
    fullImage.className = 'project-image-crop';
    fullImage.style.left = `${image.offsetLeft / width * 100}%`;
    fullImage.style.top = `${image.offsetTop / height * 100}%`;
    fullImage.style.width = `${image.offsetWidth / width * 100}%`;
    fullImage.style.height = `${image.offsetHeight / height * 100}%`;
  }
  showProjectMedia(fullImage, trigger, image.alt, width && height ? width / height : 1);
}

function keepVideoSilent(video) {
  video.defaultMuted = true;
  video.muted = true;
  video.playsInline = true;
  video.disablePictureInPicture = true;
  video.disableRemotePlayback = true;
  video.addEventListener('contextmenu', event => event.preventDefault());
  video.addEventListener('volumechange', () => {
    if (!video.muted) video.muted = true;
  });
}

function observeProjectVideos(videos) {
  if (!videos.length || !('IntersectionObserver' in window)) return null;
  const visibleFraction = 0.25;
  const observer = new IntersectionObserver(entries => {
    for (const { target: video, intersectionRatio } of entries) {
      if (!video.isConnected) continue;
      const stillPreview = typeof usePortfolioStillPreviews === 'function' && usePortfolioStillPreviews();
      if (intersectionRatio >= visibleFraction && !stillPreview && !video.hasAttribute('data-viewer-open')) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }
  }, { threshold: visibleFraction });
  for (const video of videos) observer.observe(video);
  return observer;
}

function openProjectVideo(video, trigger, label) {
  if (!video.isConnected || video.error) return;
  const src = video.dataset.fullSrc || video.currentSrc || video.src || video.querySelector('source')?.src;
  if (!src) return;

  const expanded = document.createElement('video');
  keepVideoSilent(expanded);
  expanded.loop = video.loop;
  const videoStyle = getComputedStyle(video);
  const croppedAspect = videoStyle.getPropertyValue('--prototype-aspect').trim();
  expanded.style.borderRadius = videoStyle.borderRadius;
  if (croppedAspect) {
    expanded.style.objectFit = videoStyle.objectFit;
    expanded.style.objectPosition = videoStyle.objectPosition;
  }

  const controls = document.createElement('div');
  controls.className = 'project-video-controls';
  controls.innerHTML = `
    <button type="button">Play</button>
    <input type="range" min="0" max="0" step="any" value="0" aria-label="Seek video" disabled>
    <span class="project-video-time" aria-hidden="true"></span>`;
  const play = controls.querySelector('button');
  const seek = controls.querySelector('input');
  const time = controls.querySelector('span');
  const formatTime = seconds => {
    const total = Math.floor(seconds);
    return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
  };
  function updateProgress() {
    const duration = Number.isFinite(expanded.duration) ? expanded.duration : 0;
    seek.disabled = duration === 0;
    seek.max = duration;
    seek.value = expanded.currentTime;
    const elapsed = formatTime(expanded.currentTime);
    const total = formatTime(duration);
    time.textContent = `${elapsed} / ${total}`;
    seek.setAttribute('aria-valuetext', `${elapsed} of ${total}`);
  }
  play.addEventListener('click', () => {
    if (expanded.paused) expanded.play().catch(() => {});
    else expanded.pause();
  });
  seek.addEventListener('input', () => { expanded.currentTime = seek.valueAsNumber; });
  expanded.addEventListener('play', () => { play.textContent = 'Pause'; });
  expanded.addEventListener('pause', () => { play.textContent = 'Play'; });
  expanded.addEventListener('timeupdate', updateProgress);
  expanded.addEventListener('durationchange', updateProgress);
  updateProgress();

  const ratio = (video.videoWidth || video.clientWidth) / (video.videoHeight || video.clientHeight);
  const dialog = showProjectMedia(expanded, trigger, label, croppedAspect || ratio || 16 / 9, controls);
  if (!dialog) return;
  const initialTime = video.currentTime;
  const wasPlaying = !video.paused;
  video.dataset.viewerOpen = '';
  video.pause();
  expanded.addEventListener('loadedmetadata', () => {
    if (!croppedAspect) {
      expanded.parentElement?.style.setProperty('--image-ratio', expanded.videoWidth / expanded.videoHeight);
    }
    expanded.currentTime = initialTime;
    updateProgress();
  }, { once: true });
  dialog.addEventListener('close', () => {
    delete video.dataset.viewerOpen;
    if (!video.isConnected) return;
    if (video.readyState && expanded.readyState) video.currentTime = expanded.currentTime;
    if (wasPlaying) video.play().catch(() => {});
  }, { once: true });
  expanded.src = src;
  expanded.play().catch(() => {});
}

function enableProjectMediaTrigger(trigger, label, open) {
  trigger.classList.add('project-image-trigger');
  trigger.setAttribute('aria-haspopup', 'dialog');
  trigger.addEventListener('click', open);
  if (trigger.matches('button')) return;
  trigger.tabIndex = 0;
  trigger.setAttribute('role', 'button');
  trigger.setAttribute('aria-label', label);
  trigger.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    open();
  });
}

function enableProjectImage(image, trigger = image, crop = null) {
  const label = image.alt ? `View full screen: ${image.alt}` : 'View image full screen';
  enableProjectMediaTrigger(trigger, label, () => openProjectImage(image, trigger, crop));
}

function setupCaseMedia() {
  casePage.querySelectorAll('.case-media').forEach(figure => {
    const media = figure.querySelector('img, video');
    if (!media) return;
    function showUnavailable() {
      media.closest('.media-zoom, video').hidden = true;
      figure.querySelector('.case-media-unavailable').hidden = false;
    }
    media.addEventListener('error', showUnavailable);
    if (media.error || (media.tagName === 'IMG' && media.complete && !media.naturalWidth)) showUnavailable();
    if (media.tagName === 'IMG') enableProjectImage(media, media.closest('.media-zoom'));
  });
}

const playgroundAreas = [
  { id: 'navigate', tag: 'Navigate', title: 'Sidebar', problem: 'Boards, history, and account tools competed for space.', annotation: 'One place to navigate boards, folders, and account tools.' },
  { id: 'return', tag: 'Return', title: 'All generations', problem: 'Past results were scattered across boards.', annotation: 'Find a past result across boards and open it in context.' },
  { id: 'start', tag: 'Start', title: 'Starter cards', problem: 'An empty board gave creators little help getting started.', annotation: 'Start with a real task and an editable prompt.' },
  { id: 'choose', tag: 'Choose', title: 'Model picker', problem: 'A long catalog made it hard to tell which model fit the task.', annotation: 'Find a model by describing what you want to make.' },
];

function playgroundTrigger(area, annotation = false) {
  return `<button class="pg-${annotation ? 'annotation' : 'hotspot'} pg-${area.id}" type="button"
    data-playground-area="${area.id}" aria-haspopup="dialog" aria-controls="pg-detail-${area.id}">
    ${annotation ? `<small>${area.tag}</small><strong>${area.title} <span aria-hidden="true">↗</span></strong><span>${area.annotation}</span>` : `<span class="pg-visually-hidden">${area.title}</span>`}
  </button>`;
}

function playgroundCase(project, next) {
  if (isMinimalDirection) return minimalPlaygroundCase();

  return `
    <header class="case-hero pg-hero">
      <div class="case-intro">
        <a class="case-back" href="${allWorkURL}">← All work</a>
        <p class="work-kicker">Picsart / AI creation workflows</p>
        <h1>${project.title}</h1>
        <p class="case-deck">${project.intro}</p>
        <dl class="case-outcome"><dt>Role</dt><dd>${project.role}</dd><dt>Implementation</dt><dd>${project.implementation}</dd></dl>
      </div>
    </header>
    <section class="pg-overview" aria-label="Explore the workspace">
      <div class="pg-heading">
        <h2 id="pg-workspace-title">Explore the workspace</h2>
        <p>Select an area to see the design decisions behind it.</p>
      </div>
      <div class="pg-workspace">
        <div class="pg-screen">
          <img src="../playground-reference.png" width="1728" height="1117" alt="AI Playground board with the sidebar on the left, starter cards in the center, and the model picker in the bottom composer." decoding="async">
          ${playgroundAreas.map(area => playgroundTrigger(area)).join('')}
        </div>
        <div class="pg-connectors" aria-hidden="true">
          <i class="pg-line pg-navigate"></i><i class="pg-line pg-return"></i>
          <i class="pg-line pg-start"></i><i class="pg-line pg-choose"></i>
        </div>
        <div class="pg-annotations">
          ${playgroundAreas.map(area => playgroundTrigger(area, true)).join('')}
        </div>
      </div>
    </section>
    <section class="pg-problems" aria-labelledby="pg-problems-title">
      <h2 id="pg-problems-title">Where creators got stuck</h2>
      <dl>${['start', 'choose', 'navigate', 'return'].map(id => {
        const area = playgroundAreas.find(item => item.id === id);
        return `<div><dt>${area.title}</dt><dd>${area.problem}</dd></div>`;
      }).join('')}</dl>
    </section>
    <section class="pg-release"><h2>What shipped</h2><p>${project.outcome}</p></section>
    <nav class="case-footer" aria-label="Explore more work">
      <a href="${allWorkURL}">← All work</a>
      <a href="${projectURL(next.id)}">Next project <strong>${next.title} →</strong></a>
    </nav>
    ${playgroundAreas.map(area => {
      const section = project.sections.find(item => item.id === area.id);
      const auto = project.sections.find(item => item.id === 'auto');
      return `<dialog class="pg-detail" id="pg-detail-${area.id}" aria-labelledby="pg-detail-title-${area.id}">
        <div class="pg-detail-bar">
          <h2 id="pg-detail-title-${area.id}">${area.title}</h2>
          <button type="button" class="pg-close" aria-label="Close ${area.title}" autofocus>×</button>
        </div>
        <div class="pg-detail-content">
          ${chapter(section)}
          ${area.id === 'choose' ? `<details class="pg-exploration"><summary>Auto model selection · Staging exploration</summary>${chapter(auto)}</details>` : ''}
        </div>
      </dialog>`;
    }).join('')}`;
}

function setupPlayground() {
  let activeTrigger;
  const triggers = [...casePage.querySelectorAll('[data-playground-area]')];

  function open(trigger) {
    const dialog = document.getElementById(trigger.getAttribute('aria-controls'));
    const from = trigger.getBoundingClientRect();
    activeTrigger = trigger;
    dialog.showModal();
    const to = dialog.getBoundingClientRect();
    dialog.style.setProperty('--pg-origin-x', (from.left + from.width / 2 - to.left) + 'px');
    dialog.style.setProperty('--pg-origin-y', (from.top + from.height / 2 - to.top) + 'px');
  }

  triggers.forEach(trigger => {
    const related = triggers.filter(item => item.dataset.playgroundArea === trigger.dataset.playgroundArea);
    const highlight = enabled => related.forEach(item => item.classList.toggle('is-highlighted', enabled));
    trigger.addEventListener('pointerenter', () => highlight(true));
    trigger.addEventListener('pointerleave', () => highlight(false));
    trigger.addEventListener('focus', () => highlight(true));
    trigger.addEventListener('blur', () => highlight(false));
    trigger.addEventListener('click', () => open(trigger));
  });
  casePage.querySelectorAll('.pg-detail').forEach(dialog => {
    dialog.querySelector('.pg-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', () => activeTrigger?.focus());
  });

  const chapterId = location.hash.slice(1);
  const target = triggers.find(trigger => trigger.dataset.playgroundArea === (chapterId === 'auto' ? 'choose' : chapterId));
  if (target) requestAnimationFrame(() => {
    if (chapterId === 'auto') casePage.querySelector('.pg-exploration').open = true;
    open(target);
  });
}

function showCase(project) {
  home.hidden = true;
  casePage.hidden = false;
  casePage.tabIndex = -1;
  const skipLink = document.querySelector('a[href="#home"]');
  if (skipLink) skipLink.setAttribute('href', '#case');
  document.title = project.title + ' — Roupen Babian';
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const isPlayground = project.id === 'ai-playground';
  const showCaseNavigation = !isMinimalDirection || !['layerswap', 'font-chooser'].includes(project.id);
  casePage.classList.toggle('pg-case', isPlayground);
  casePage.innerHTML = isPlayground ? playgroundCase(project, next) : `
    ${showCaseNavigation ? `<div class="deck-case-nav">
      <a class="case-back" href="${allWorkURL}">← All work</a>
      <details class="deck-contents"><summary>Project contents</summary><ol></ol></details>
    </div>` : ''}
    <div class="deck-details" data-theme="${direction || 'library'}"></div>
    ${isMinimalDirection ? '' : `<nav class="case-footer" aria-label="Explore more work">
      <a href="${allWorkURL}">← All work</a>
      <a href="${projectURL(next.id)}">Next project <strong>${next.title} →</strong></a>
    </nav>`}`;
  if (!isPlayground) {
    const host = casePage.querySelector('.deck-details');
    const links = renderDeckDetails(host, project.id);
    const contents = casePage.querySelector('.deck-contents ol');
    function scrollToChapter() {
      host.shadowRoot.getElementById(location.hash.slice(1))?.scrollIntoView({ block: 'start' });
    }
    if (contents) links.forEach(({ id, label }) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = '#' + id;
      link.textContent = label;
      link.addEventListener('click', event => {
        event.preventDefault();
        history.pushState(null, '', link.hash);
        scrollToChapter();
      });
      item.append(link);
      contents.append(item);
    });
    window.addEventListener('hashchange', scrollToChapter);
    if (location.hash) requestAnimationFrame(scrollToChapter);
  }
  document.querySelectorAll('a[href="' + projectURL(project.id) + '"]').forEach(link => {
    link.setAttribute('aria-current', 'page');
  });
  if (isPlayground) {
    if (isMinimalDirection) showMinimalStory(casePage);
    else {
      setupCaseMedia();
      setupPlayground();
    }
  }
}

function showHome() {
  const featured = document.querySelector('#featured');
  const moreWork = document.querySelector('#more-work');
  if (featured) featured.innerHTML = projects.slice(0, 3).map(project => card(project)).join('');
  if (moreWork) moreWork.innerHTML = projects.slice(3).map(project => card(project, true)).join('');

  const grid = document.querySelector('#project-grid');
  if (!grid) return;
  grid.innerHTML = projects.map(project => card(project)).join('');
  const buttons = [...document.querySelectorAll('[data-filter]')];
  const count = document.querySelector('#filter-count');
  if (count) count.textContent = projects.length + ' projects';
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(control => control.setAttribute('aria-pressed', String(button === control)));
      let visible = 0;
      projects.forEach(project => {
        const matches = button.dataset.filter === 'all' || project.tags.includes(button.dataset.filter);
        grid.querySelector('[data-project="' + project.id + '"]').hidden = !matches;
        if (matches) visible += 1;
      });
      if (count) count.textContent = visible + (visible === 1 ? ' project' : ' projects');
    });
  });
}

const stickyHeader = document.querySelector('.site-header-bar');
if (stickyHeader) {
  const updateHeaderHeight = () => {
    document.documentElement.style.setProperty('--site-header-height', `${stickyHeader.offsetHeight}px`);
  };
  updateHeaderHeight();
  new ResizeObserver(updateHeaderHeight).observe(stickyHeader);
}

const selected = projects.find(project => project.id === new URLSearchParams(location.search).get('project'));
if (selected) showCase(selected);
else showHome();
