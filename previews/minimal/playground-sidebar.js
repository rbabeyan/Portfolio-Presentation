function renderPlaygroundSidebar() {
  const media = './chapter-media/';
  const decisions = [
    ['navigation', 'One navigation pattern', 'The Boards / Explore tabs are gone. Create new, Explore, Assets and All generations sit at the top of the sidebar, so the whole app follows one pattern.'],
    ['assets', 'A home for assets', 'Characters and other saved assets can now be viewed and edited, with their reference images, voice and description, instead of existing only as tags in a prompt.'],
    ['explore', 'A clear line between your work and inspiration', 'Explore is a destination you choose to visit, not a twin of your own boards.'],
    ['folders', 'Folders that are worth using', 'Your Playground boards live in one place, with Picsart Drive set apart as an outside source.'],
    ['workspace', 'A focused workspace', 'The account moved to the bottom left, so the top bar shows only what’s on the board and every setting and navigation lives in the sidebar.'],
  ];
  const before = `
    <figure class="pg-sidebar-comparison-side pg-sidebar-before-side">
      <figcaption class="pg-sidebar-pill">Before</figcaption>
      <div class="pg-sidebar-comparison-image pg-sidebar-before" data-zoom-crop>
        <img src="${media}sidebar-before.png" alt="Original sidebar with a flat list of boards" loading="lazy">
      </div>
    </figure>`;
  const afterImage = `<img src="${media}sidebar-after.png" alt="Redesigned sidebar with Create, Explore, Library, All generations, folders, and the account grouped by purpose" loading="lazy">`;
  const after = `
    <figure class="pg-sidebar-comparison-side pg-sidebar-after-side">
      <figcaption class="pg-sidebar-pill pg-sidebar-after-pill">After</figcaption>
      <div class="pg-sidebar-comparison-image pg-sidebar-after">${afterImage}</div>
    </figure>`;

  return `
    <div class="pg-sidebar-chapter">
      <section class="pg-designed-section" aria-labelledby="pg-sidebar-problem">
        <h2 id="pg-sidebar-problem">The problem</h2>
        <div class="pg-sidebar-problem-grid">
          <div class="pg-sidebar-problem-image">
            <img src="${media}sidebar-explore.png" alt="Earlier Explore tab showing a grid of AI generations" loading="lazy">
          </div>
          <div class="pg-sidebar-problem-image">
            <img src="${media}sidebar-board.png" alt="Earlier Boards tab using a similar layout, with a flat sidebar" loading="lazy">
          </div>
          <ul class="pg-sidebar-problem-notes">
            <li><strong>Two experiences that looked alike -</strong> Boards and Explore were two tabs at the top of the screen. Switching between them changed the whole screen, but both were grids of generations, so people confused their own work with Explore content.</li>
            <li><strong>No home for the library -</strong> People could tag saved assets such as characters in a prompt, but there was nowhere to view or edit them.</li>
          </ul>
          <ul class="pg-sidebar-problem-notes">
            <li><strong>A flat sidebar -</strong> The sidebar was only a list of boards, with no structure and no access to anything else.</li>
            <li><strong>Boards went unused -</strong> Almost everyone kept everything on the default Main board. Organizing wasn’t worth the effort when the structure didn’t help.</li>
          </ul>
        </div>
      </section>

      <div class="pg-sidebar-analysis">
        <section class="pg-designed-section" aria-labelledby="pg-sidebar-approach">
          <h2 id="pg-sidebar-approach">The approach</h2>
          <p>I treated this as an information architecture problem, not a styling one.</p>
          <p>Before deciding how the sidebar looked, I listed everything people needed for a smoother experience and to make getting desired results easier (create, explore, their assets, their past work, their boards) and grouped those by purpose.</p>
        </section>
        <section class="pg-designed-section" aria-labelledby="pg-sidebar-solution">
          <h2 id="pg-sidebar-solution">The solution</h2>
          <p>Went through several directions. Created improved iterations, some added separate sections, some removed a layer until one structure was left.</p>
        </section>
      </div>

      <div class="pg-sidebar-diagram" role="group" aria-label="Sidebar design comparison">
        <div class="pg-sidebar-comparison">
          ${before}
          <div class="pg-sidebar-iteration-stack">
            <div class="pg-sidebar-iteration-row" id="pg-sidebar-comparison" inert>
              ${[1, 2, 3, 4].map(number => `
                <div class="pg-sidebar-iteration-image"${number === 1 ? ' data-zoom-crop' : ''}>
                  <img src="${media}sidebar-iteration-${number}.png" alt="Sidebar design iteration ${number}" decoding="async">
                  <span class="pg-sidebar-iteration-caption" aria-hidden="true">Iteration ${number}</span>
                </div>`).join('')}
            </div>
            <button type="button" class="pg-sidebar-iterations" aria-expanded="false" aria-controls="pg-sidebar-comparison">
              <img src="${media}sidebar-arrow-left.svg" alt="" width="24" height="24">
              <span class="pg-sidebar-iterations-label">
                <span class="pg-sidebar-iterations-show">4 iterations</span>
                <span class="pg-sidebar-iterations-hide">Hide iterations</span>
              </span>
              <img src="${media}sidebar-arrow-right.svg" alt="" width="24" height="24">
            </button>
          </div>
          ${after}
        </div>
        <div class="pg-sidebar-annotation-card" role="group" aria-label="Sidebar design decisions">
          <div class="pg-sidebar-comparison-image pg-sidebar-annotated-image">
            ${afterImage}
            <span class="pg-sidebar-outline pg-sidebar-outline-top" aria-hidden="true"></span>
            <span class="pg-sidebar-outline pg-sidebar-outline-folders" aria-hidden="true"></span>
            <span class="pg-sidebar-outline pg-sidebar-outline-account" aria-hidden="true"></span>
          </div>
          <ul class="pg-sidebar-decisions" role="list">
            ${decisions.map(([key, title, description]) => `
              <li class="pg-sidebar-decision pg-sidebar-decision-${key}">
                <img class="pg-sidebar-connector" src="${media}sidebar-callout-${key}.svg" alt="" loading="lazy">
                <strong>${title} -</strong> ${description}
              </li>`).join('')}
          </ul>
        </div>
      </div>
    </div>`;
}

function openSidebarIterations(article, trigger, reducedMotion) {
  let dialog = article.querySelector('.pg-sidebar-gallery');
  if (dialog) {
    dialog.openGallery();
    return;
  }
  dialog = document.createElement('dialog');
  dialog.className = 'pg-sidebar-gallery';
  dialog.setAttribute('aria-label', 'Sidebar design iterations');
  dialog.innerHTML = `
    <header><h2>Sidebar design iterations</h2><button type="button" aria-label="Close iterations" autofocus>×</button></header>
    <div class="pg-sidebar-gallery-track" aria-label="Swipe through the iterations">
      ${[4, 1, 2, 3, 4, 1].map((number, index) => `
        <figure data-number="${number}" ${index === 0 || index === 5 ? 'aria-hidden="true"' : ''}>
          <img src="./chapter-media/sidebar-iteration-${number}.png" alt="Sidebar design iteration ${number}">
        </figure>`).join('')}
    </div>
    <div class="pg-sidebar-gallery-controls">
      <button type="button" aria-label="Previous iteration">←</button>
      <span role="status"></span>
      <button type="button" aria-label="Next iteration">→</button>
    </div>`;
  article.append(dialog);
  const track = dialog.querySelector('.pg-sidebar-gallery-track');
  const slides = [...track.children];
  const status = dialog.querySelector('[role="status"]');
  const center = slide => slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2;
  let index = 1;
  let settleTimer;
  function select(next, behavior = 'instant') {
    index = next;
    slides.forEach((slide, position) => slide.classList.toggle('is-current', position === index));
    status.textContent = `Iteration ${slides[index].dataset.number} of 4`;
    track.scrollTo({ left: center(slides[index]), behavior });
  }
  function settle() {
    if (!dialog.open) return;
    const nearest = slides.reduce((best, slide, position) =>
      Math.abs(center(slide) - track.scrollLeft) < Math.abs(center(slides[best]) - track.scrollLeft) ? position : best, 0);
    select(nearest === 0 ? 4 : nearest === 5 ? 1 : nearest);
  }
  track.addEventListener('scroll', () => {
    clearTimeout(settleTimer);
    settleTimer = setTimeout(settle, 140);
  }, { passive: true });
  const step = direction => {
    const current = index === 0 ? 4 : index === 5 ? 1 : index;
    if (current !== index) select(current);
    select(current + direction, reducedMotion.matches ? 'instant' : 'smooth');
  };
  dialog.querySelector('[aria-label="Previous iteration"]').addEventListener('click', () => step(-1));
  dialog.querySelector('[aria-label="Next iteration"]').addEventListener('click', () => step(1));
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    step(event.key === 'ArrowLeft' ? -1 : 1);
  });
  dialog.querySelector('[aria-label="Close iterations"]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    clearTimeout(settleTimer);
    trigger.focus({ preventScroll: true });
  });
  dialog.openGallery = () => {
    if (dialog.open) return;
    dialog.showModal();
    select(1);
  };
  dialog.openGallery();
}

function setupPlaygroundSidebar(article) {
  const diagram = article.querySelector('.pg-sidebar-diagram');
  const comparison = diagram.querySelector('.pg-sidebar-comparison');
  const toggle = diagram.querySelector('.pg-sidebar-iterations');
  const row = comparison.querySelector('.pg-sidebar-iteration-row');
  const movingElements = [...comparison.querySelectorAll('.pg-sidebar-comparison-side, .pg-sidebar-iteration-image'), toggle];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let moving = false;

  function keepToggleVisible() {
    const { top, bottom } = toggle.getBoundingClientRect();
    const navHeight = document.querySelector('.site-header-bar')?.offsetHeight || 0;
    if (top < navHeight || bottom > window.innerHeight) {
      toggle.scrollIntoView({ block: 'nearest', behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    }
  }

  toggle.addEventListener('click', async () => {
    if (portfolioPhone.matches) {
      openSidebarIterations(article, toggle, reducedMotion);
      return;
    }
    if (moving) return;
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    const update = () => {
      diagram.classList.toggle('is-expanded', !expanded);
      toggle.setAttribute('aria-expanded', String(!expanded));
      row.inert = expanded;
    };
    if (reducedMotion.matches || !comparison.animate) {
      update();
      keepToggleVisible();
      return;
    }

    moving = true;
    const bounds = comparison.getBoundingClientRect();
    const from = movingElements.map(element => element.getBoundingClientRect());
    update();

    const nextBounds = comparison.getBoundingClientRect();
    const options = { duration: 520, easing: 'cubic-bezier(.22, .75, .25, 1)' };
    const movements = movingElements.map((element, index) => {
      const to = element.getBoundingClientRect();
      const x = from[index].left - to.left;
      const y = from[index].top - bounds.top - (to.top - nextBounds.top);
      const scaleX = from[index].width / to.width;
      const scaleY = from[index].height / to.height;
      return element.animate({ transform: [`translate(${x}px, ${y}px) scale(${scaleX}, ${scaleY})`, 'none'] }, options);
    });
    await Promise.allSettled(movements.map(movement => movement.finished));
    moving = false;
    if (diagram.isConnected) keepToggleVisible();
  });
}
