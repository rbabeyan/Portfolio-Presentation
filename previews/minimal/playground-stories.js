const minimalStories = {
  start: {
    title: 'Use-case cards', lead: 'Starting points built from what people actually make.',
    leadDetail: 'Six cards per media type give creators a place to start.',
  },
  navigate: {
    title: 'Sidebar navigation', chapterTitle: 'Side bar navigation',
    lead: 'One place to find everything, and a clear line between your work and inspiration.',
  },
  return: {
    title: 'All generations', lead: 'Every generation in one place, ready to reuse.',
  },
  choose: {
    title: 'Best for my prompt', chapterTitle: 'Model picker',
    lead: 'Three ways to choose a model, including not choosing at all.',
  },
  credits: {
    title: 'Credits status', lead: 'The right nudge at the right moment, before you hit a wall.', comingSoon: true,
  },
};

const minimalStoryOrder = ['return', 'start', 'navigate', 'choose', 'credits'];

function renderPlaygroundUseCaseCards() {
  const decisions = [
    ['Built from real usage', 'We analyzed more than 10,000 prompts, classified them by intent, and ranked those intents by unique users. That kept a few heavy users from skewing the order.'],
    ['A set for each media type', 'Video, image, and audio each have six cards tailored to the tasks people do in that mode.'],
    ['Only what the models can deliver', 'I checked every card against the live model lineup and cut three audio ideas that the available models couldn’t deliver well.'],
    ['One slot for discovery', 'Five cards cover proven demand. The sixth tests a new use case while keeping the most common tasks available.'],
    ['The thumbnail is a promise', 'Each thumbnail comes from the card’s own prompt and model, so it shows the kind of result people can expect.'],
  ];
  return `
    <section class="pg-designed-section pg-usecase-problem">
      <div>
        <h2>The problem</h2>
        <p>A new board is the first thing most people see, and it wasn’t helping them start.</p>
        <ul>
          <li><strong>Unrelated content.</strong> The empty board showed Explore content unrelated to what creators came to make.</li>
          <li><strong>Clutter.</strong> Imagery, a carousel, and a prompt box all competed for attention.</li>
          <li><strong>Lost guidance.</strong> The step-by-step guide was easy to miss among the visuals.</li>
          <li><strong>Weak prompt starts.</strong> Short, vague prompts often led to mediocre first results, right when new users were deciding whether to come back.</li>
        </ul>
      </div>
      <figure class="pg-usecase-before" data-zoom-crop>
        <img src="./chapter-media/cards-before.png" alt="The earlier empty board, with Explore content competing with the prompt composer." loading="lazy" decoding="async">
      </figure>
    </section>
    <section class="pg-designed-section pg-usecase-approach">
      <h2>The approach</h2>
      <p>I replaced the inspiration feed with starting points for real tasks. Each card works like a preset, filling in the details needed to recreate the example.</p>
      <div class="pg-usecase-decisions">
        ${decisions.map(([title, body]) => `<div><h3>${title}</h3><p>${body}</p></div>`).join('')}
      </div>
    </section>
    <section class="pg-designed-section">
      <h2>The card</h2>
      <p>I explored several directions and chose a card with a thumbnail, title, one-line description, and Try action. A six-card grid is easy to scan on desktop. On mobile, the cards scroll vertically.</p>
      <div class="pg-usecase-pair">
        <img class="pg-usecase-desktop" src="./chapter-media/cards-desktop.png" alt="Desktop empty board showing six use-case cards in a grid." loading="lazy" decoding="async">
        <img class="pg-usecase-phone" src="./chapter-media/cards-mobile.png" alt="Mobile empty board with use-case cards arranged vertically." loading="lazy" decoding="async">
      </div>
    </section>
    <section class="pg-designed-section">
      <h2>Selecting a card</h2>
      <p>Selecting a card fills the composer with a tested prompt, a compatible model and settings, and upload slots for any required files. People can generate right away or edit the prompt first.</p>
      <div class="pg-usecase-pair">
        <img class="pg-usecase-desktop" src="./chapter-media/cards-composer-desktop.png" alt="Desktop composer filled with the prompt and settings from a selected use-case card." loading="lazy" decoding="async">
        <img class="pg-usecase-phone" src="./chapter-media/cards-composer-mobile.png" alt="Mobile composer ready to generate with the selected card’s prompt and settings." loading="lazy" decoding="async">
      </div>
    </section>`;
}

function minimalPlaygroundCase() {
  const annotations = {
    return: 'Everything you’ve made in one place, ready to reuse.',
    start: 'Six starting points per mode, chosen from real prompt data.',
    navigate: 'One place for everything, a clear line between your work, inspiration, assets and a focused work area.',
    choose: 'Picks the model based on your prompt, and always shows its choice for transparency and knowledge.',
    credits: 'Shows up only when you’re running low or out, with the right next step: top up or upgrade.',
  };
  const phoneOrder = ['return', 'navigate', 'start', 'credits', 'choose'];
  const workspaceArt = (label = '') => `
    <span class="pg-workspace-art" ${label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"'}>
      <span class="pg-art-panel"></span>
      <span class="pg-art-crop pg-art-navigate"></span>
      <span class="pg-art-crop pg-art-credits"></span>
      <span class="pg-art-crop pg-art-return"></span>
      <span class="pg-art-crop pg-art-start"></span>
      <span class="pg-art-choose">
        <svg class="pg-model-auto" viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
          <path d="M7 1.5c.8 3.4 1.6 4.2 5 5-3.4.8-4.2 1.6-5 5-.8-3.4-1.6-4.2-5-5 3.4-.8 4.2-1.6 5-5Zm5.5 8c.45 1.7.8 2.05 2.5 2.5-1.7.45-2.05.8-2.5 2.5-.45-1.7-.8-2.05-2.5-2.5 1.7-.45 2.05-.8 2.5-2.5Z"/>
        </svg>
        <span class="pg-model-icon">S</span><span>Seedance 2.5</span>
        <svg class="pg-model-chevron" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.2">
          <path d="m3 6 5 5 5-5"/>
        </svg>
      </span>
    </span>`;
  const annotation = id => `
    <button class="pg-annotation pg-${id}" type="button" data-playground-area="${id}" ${id === 'credits' ? '' : 'aria-controls="pg-story-content"'}>
      <strong><span class="pg-phone-key" aria-hidden="true">${phoneOrder.indexOf(id) + 1}</span><span>${minimalStories[id].title}</span>
        ${id === 'credits' ? '<span class="pg-coming-soon">Coming soon</span>' : `<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M3.5 8h9m-3.75-3.75L12.5 8l-3.75 3.75"/>
        </svg>`}
      </strong>
      <span>${annotations[id]}</span>
    </button>`;

  return `
    <div class="pg-page-overview">
      <header class="pg-overview-intro">
        <h1 class="pg-visually-hidden">Picsart’s AI Playground</h1>
        <p>Designing the moments of choice in an AI creation tool, where to start, <span>which model to use, how to get around, and how to get back to what you made.</span></p>
      </header>
      <figure class="pg-v3-workspace" aria-label="Explore the AI Playground workspace">
        <figcaption><span class="pg-desktop-hint"><strong>Hint:</strong> Select a highlighted area to see more</span><span class="pg-phone-hint">Tap a number to explore the workspace</span></figcaption>
        <div class="pg-v3-screen">
          ${workspaceArt('Picsart workspace with a raised sidebar, use-case cards, model controls, and credits status.')}
          ${minimalStoryOrder.map(id => `<button class="pg-hotspot pg-${id}" type="button" data-playground-area="${id}" ${id === 'credits' ? 'aria-label="Credits status, coming soon"' : `aria-controls="pg-story-content" aria-label="${minimalStories[id].title}"`}></button>`).join('')}
          <div class="pg-phone-markers">${phoneOrder.map((id, index) => `
            <button class="pg-phone-marker pg-${id}" type="button" data-playground-area="${id}" aria-label="${index + 1}. ${minimalStories[id].title}${id === 'credits' ? ', coming soon' : ''}">
              <span class="pg-phone-marker-number" aria-hidden="true">${index + 1}</span>
              ${id === 'credits' ? '<span class="pg-phone-marker-status" aria-hidden="true" hidden>Coming soon</span>' : ''}
            </button>`).join('')}</div>
        </div>
        <div class="pg-callout-column">
          ${annotation('return')}
          ${annotation('navigate')}
        </div>
        ${annotation('start')}
        <div class="pg-callout-row">
          ${annotation('credits')}
          ${annotation('choose')}
        </div>
      </figure>
      <div class="pg-overview-copy">
        <section class="pg-overview-section" aria-labelledby="pg-problems-title">
          <h2 id="pg-problems-title">Where creators got stuck</h2>
          <p>AI Playground puts more than a hundred image, video and audio models behind one prompt box. The tools were powerful, but the experience around them added so much cognitive load on the users. They had to work out where to start, which model to use, where their work lived and how to find it again. I redesigned those four moments.</p>
          <p>At each stage user’s were asked to decide something before they had made anyhting.</p>
        </section>
        <section class="pg-overview-section" aria-labelledby="pg-process-title">
          <h2 id="pg-process-title">How I worked</h2>
          <p>The approach was the same, find out what people are actually trying to do, give the common case a short path, and keep every choice visible and easy to reach.</p>
          <div class="pg-process-grid">
            <section>
              <h3>Fast iterations on Claude design</h3>
              <p>Built fast medium fidelity interactive prototypes, to test some ideas and discuss with the team.</p>
            </section>
            <section>
              <h3>Decisions based on data</h3>
              <p>Worked from prompt data, usage patterns and the real model lineup, not assumptions.</p>
            </section>
            <section>
              <h3>Built in Claude Code</h3>
              <p>Once decided on the final solution, I moved to Claude code and started building it, to then get reviewed by the developers and merged into the product.</p>
            </section>
          </div>
        </section>
        <p class="pg-release-note">As the solo product designer on AI Playground, I worked with stakeholders and built the changes on feature branches that went through the team’s CI pipeline.</p>
      </div>
    </div>
    <div class="pg-page-detail" data-layout="design" hidden>
      <div class="pg-chapter-dock" inert>
        <button type="button" class="pg-chapter-back" aria-label="Back to AI Playground">${workspaceArt()}<span>AI Playground</span></button>
      </div>
      <button type="button" class="pg-page-thumb" aria-label="Expand the workspace overview">${workspaceArt()}</button>
      <article id="pg-story-content"></article>
    </div>`;
}

function showMinimalStory(host) {
  let selectedButton;
  let restoreFocus = true;
  let activeTransition;
  let disposeStory;
  const overview = host.querySelector('.pg-page-overview');
  const detail = host.querySelector('.pg-page-detail');
  const article = detail.querySelector('article');
  const thumb = detail.querySelector('.pg-page-thumb');
  const dock = detail.querySelector('.pg-chapter-dock');
  const back = dock.querySelector('.pg-chapter-back');
  const fixedHeader = document.querySelector('.site-header-bar');
  const dockArtwork = back.querySelector('.pg-workspace-art');
  const dockLabel = back.lastElementChild;
  const comingSoon = overview.querySelector('.pg-coming-soon');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let dockAnimations = [];
  let creditsBlink;
  let creditsNoticeTimeout;
  const renderers = {
    start: renderPlaygroundUseCaseCards,
    navigate: renderPlaygroundSidebar,
    return: renderPlaygroundAllGenerations,
    choose: renderPlaygroundModelPicker,
  };

  function highlightArea(id) {
    overview.querySelectorAll('[data-playground-area]').forEach(button => {
      button.classList.toggle('is-highlighted', Boolean(id) && button.dataset.playgroundArea === id);
    });
  }

  function updateChapterDock() {
    const title = article.querySelector('h1');
    const headerBottom = fixedHeader.getBoundingClientRect().bottom;
    const titleBox = title?.getBoundingClientRect();
    const docked = !detail.hidden && titleBox && titleBox.bottom <= headerBottom;
    if (Boolean(docked) === !dock.inert) return;

    dockAnimations.forEach(animation => animation.cancel());
    dock.inert = !docked;
    detail.classList.toggle('is-docked', Boolean(docked));
    if (!docked || reducedMotion.matches || portfolioPhone.matches) return;

    const thumbBox = thumb.getBoundingClientRect();
    const animationOptions = { duration: 420, easing: 'cubic-bezier(.22, .8, .26, 1)' };
    dockAnimations = [[dockArtwork, thumbBox], [dockLabel, titleBox]].map(([element, from]) => {
      const to = element.getBoundingClientRect();
      const fromX = from.left + (from.width - to.width) / 2;
      const fromY = Math.max(headerBottom - 12, from.top);
      const scale = element === dockArtwork ? from.width / to.width : Math.min(from.height / to.height, 2);
      return element.animate([
        { transform: `translate(${fromX - to.left}px, ${fromY - to.top}px) scale(${scale})`, opacity: .3 },
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      ], animationOptions);
    });
  }

  function renderStory({ animate = false, scrollToTop = false } = {}) {
    const key = location.hash.slice(1);
    const id = key === 'auto' ? 'choose' : key;
    const candidate = Object.hasOwn(minimalStories, id) ? minimalStories[id] : null;
    const story = candidate?.comingSoon ? null : candidate;
    if (candidate?.comingSoon && location.protocol !== 'file:') {
      const url = new URL(location.href);
      url.hash = '';
      history.replaceState(history.state, '', url);
    }
    const viewChanged = overview.hidden !== Boolean(story);
    const changeView = () => {
      if (!candidate?.comingSoon && key !== location.hash.slice(1)) return;
      disposeStory?.();
      disposeStory = undefined;
      highlightArea();
      overview.hidden = Boolean(story);
      detail.hidden = !story;
      if (!story) {
        article.replaceChildren();
        updateChapterDock();
        if (scrollToTop) window.scrollTo({ top: 0, behavior: 'instant' });
        if (restoreFocus && selectedButton) selectedButton.focus({ preventScroll: true });
        return;
      }
      article.dataset.chapter = id;
      const intro = `<h1 tabindex="-1">${story.chapterTitle || story.title}</h1><p class="pg-story-lead">${story.lead}${story.leadDetail ? `<span>${story.leadDetail}</span>` : ''}</p>`;
      const template = document.createElement('template');
      template.innerHTML = intro + renderers[id](key === 'auto');
      preparePortfolioMedia(template.content);
      article.replaceChildren(template.content);
      if (id === 'navigate') setupPlaygroundSidebar(article);
      if (id === 'choose') setupPlaygroundModelPicker(article);
      const videos = article.querySelectorAll('button > video');
      if (videos.length) {
        for (const video of videos) {
          keepVideoSilent(video);
          const trigger = video.parentElement;
          const label = video.getAttribute('aria-label');
          enableProjectMediaTrigger(trigger, trigger.getAttribute('aria-label'), () => openProjectVideo(video, trigger, label));
        }
        const observer = observeProjectVideos(videos);
        disposeStory = () => {
          observer?.disconnect();
          for (const video of videos) video.pause();
        };
      }
      article.querySelectorAll('img[alt]:not([alt=""])').forEach(image => {
        const crop = image.closest('[data-zoom-crop]');
        enableProjectImage(image, crop || image, crop);
      });
      if (scrollToTop) window.scrollTo({ top: 0, behavior: 'instant' });
      updateChapterDock();
      article.querySelector('h1').focus({ preventScroll: true });
    };
    activeTransition?.skipTransition();
    if (!animate || !viewChanged || portfolioPhone.matches || !document.startViewTransition || reducedMotion.matches) {
      changeView();
      return;
    }

    const transition = document.startViewTransition(changeView);
    activeTransition = transition;
    transition.ready.catch(() => {});
    const clearTransition = () => {
      if (activeTransition === transition) activeTransition = undefined;
    };
    transition.finished.then(clearTransition, clearTransition);
  }

  function navigate(id) {
    const url = new URL(location.href);
    url.hash = id;
    if (url.href !== location.href) {
      if (location.protocol === 'file:') {
        location.hash = id;
        return;
      }
      history.pushState(null, '', url);
    }
    renderStory({ animate: true, scrollToTop: true });
  }

  overview.querySelectorAll('[data-playground-area]').forEach(button => {
    const id = button.dataset.playgroundArea;
    button.addEventListener('click', event => {
      if (id === 'credits') {
        creditsBlink?.cancel();
        const markerNotice = button.querySelector('.pg-phone-marker-status');
        if (markerNotice) {
          markerNotice.hidden = false;
          clearTimeout(creditsNoticeTimeout);
          creditsNoticeTimeout = setTimeout(() => { markerNotice.hidden = true; }, 2200);
        }
        creditsBlink = (markerNotice || comingSoon).animate(
          reducedMotion.matches
            ? [{ backgroundColor: 'var(--pg-blue)', color: 'var(--paper)' }, { backgroundColor: 'transparent' }]
            : [{ opacity: 1 }, { opacity: .18 }, { opacity: 1 }],
          { duration: reducedMotion.matches ? 700 : 360, iterations: reducedMotion.matches ? 1 : 2, easing: 'ease-in-out' },
        );
        return;
      }
      selectedButton = button;
      restoreFocus = event.detail === 0 || event.pointerType === 'mouse';
      navigate(id);
    });
    button.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse' && matchMedia('(hover: hover)').matches) highlightArea(id);
    });
    button.addEventListener('pointerleave', event => {
      if (event.pointerType === 'mouse') highlightArea();
    });
    button.addEventListener('pointerdown', event => {
      if (event.pointerType !== 'mouse') highlightArea();
    });
    button.addEventListener('focus', () => {
      if (button.matches(':focus-visible')) highlightArea(id);
    });
    button.addEventListener('blur', () => highlightArea());
  });
  function backToOverview() {
    selectedButton ||= overview.querySelector(`.pg-annotation[data-playground-area="${article.dataset.chapter}"]`);
    navigate('');
  }
  thumb.addEventListener('click', backToOverview);
  back.addEventListener('click', backToOverview);
  window.addEventListener('scroll', updateChapterDock, { passive: true });
  window.addEventListener('resize', updateChapterDock);
  window.addEventListener('popstate', () => renderStory({ animate: true }));
  if (location.protocol === 'file:') {
    window.addEventListener('hashchange', () => renderStory({ animate: true, scrollToTop: true }));
  }
  renderStory();
}
