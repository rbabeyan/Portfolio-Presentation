function renderPlaygroundModelPicker(autoExpanded = false) {
  const methods = [
    {
      key: 'dropdown',
      title: 'Dropdown picker',
      audience: 'For users who know what they want (desktop only)',
      description: 'A compact list that opens right above the composer when you click the model chip. It puts your recent and most-used models within reach, so switching takes one click and you never leave the board. The full picker is still one click away when you want to browse.',
      video: 'model-dropdown-v2.mp4',
      notes: [
        ['Quick switching', 'Clicking the model chip opens a compact dropdown above the composer, so there’s no full-screen modal for a quick change.'],
        ['What you need first', 'Recent and most-used models sit at the top, followed by Featured and Recommended.'],
        ['Enough context to decide', 'Each row shows speed, supported inputs and a one-line strength, such as “Strong motion and physics”, with details on hover.'],
        ['Everything else is still one click away', '“See all models” opens the full picker for browsing and comparing.'],
      ],
    },
    {
      key: 'search',
      title: 'Smart search',
      audience: 'For people who know what they want to make, but not which model',
      description: 'A search field that understands what you want to make, not just model names. Describe the result you’re after, like “cinematic drone shot with sound”, and it ranks the models that fit best. It always answers with models, never a chat reply, and every search gets a result.',
      video: 'model-smart-search.mp4',
      notes: [
        ['Search by intent', 'People describe the result they want and get matching models back. Model names still work too.'],
        ['Models, not prose', 'Results are always model cards, never a chat reply.'],
        ['Built on a ranking API', 'Designed the UI on top of an existing ranking service that scores every model in the active tab for fit.'],
        ['Every search gets a result', 'If nothing matches exactly, the closest picks are shown. If the ranking service is slow or unavailable, it falls back to name search without showing an error.'],
        ['It teaches itself', 'A rotating placeholder and example queries show what kind of searches work, so people learn the feature by seeing it.'],
      ],
      images: [
        ['model-dropdown-loading.png', 'Loading states for Smart search in the compact dropdown', 243, 202],
        ['model-picker-loading.png', 'Loading states for Smart search in the full model picker', 385, 202],
      ],
    },
    {
      key: 'auto',
      title: 'Auto-picking / Best for prompt',
      audience: 'For people who just want the best result, without thinking about models',
      description: 'An optional Auto mode that picks the model for you. It reads your prompt, attachments and settings, chooses the best fit, and updates its pick as your prompt changes. The chosen model always shows on the chip, and picking one yourself turns Auto off.',
      video: 'model-auto-picking.mp4',
      notes: [
        ['Always visible', 'The model chip always names the pick, so the choice is never hidden.'],
        ['Always reversible', 'Choosing any model by hand turns Auto off. Turning it back on reads the current prompt again right away.'],
        ['Off until you want it', 'Auto is off by default, and each tab (video, image, audio) remembers its own setting.'],
        ['Calm, not jumpy', 'Typos, punctuation and word order never trigger a re-pick. Only meaningful changes do. It switches only when another model is clearly better, never while a generation is running, and not within two seconds of the last switch.'],
        ['It respects your choices', 'Settings you changed by hand (resolution, aspect ratio, duration, sound) and files you attached rule out models that can’t support them.'],
        ['Credits don’t decide the pick', 'Auto always suggests the best model, whatever your balance. Cost is a separate decision.'],
        ['It understands intent across modes', '“Write a song about…” typed in the video tab switches to audio and picks there. Only clear requests count, so “animate this portrait” stays in video.'],
      ],
      images: [
        ['model-auto-chip-states.png', 'Auto-picking states on the model chip', 302, 284],
        ['model-auto-picker-states.png', 'Auto-picking states in the compact dropdown and full picker', 328, 284],
      ],
    },
  ];
  const problems = [
    ['Too many options', 'The video tab alone lists 112 models, and the full lineup is over 100 across all modes.'],
    ['Knowledge users don’t have', 'Most people can’t tell Seedance from Veo from Kling, and they shouldn’t need to. New models launch every few weeks, and even people who follow the industry struggle to keep up.'],
    ['Bad results', 'The selected model is one of the major settings that affect the result of the generation. Choosing one that isn’t good for a specific prompt can return bad results.'],
    ['Heavy decisions', 'Picking a model meant opening a large modal and comparing specs right when people wanted to create. That’s high cognitive load for a decision that shapes the whole result.'],
  ];
  const list = items => items.map(([name, copy]) => `<li><strong>${name} -</strong> ${copy}</li>`).join('');
  const media = './chapter-media/';

  return `
    <section class="pg-designed-section pg-model-problem" aria-labelledby="pg-model-problem-title">
      <div>
        <h2 id="pg-model-problem-title">The problem</h2>
        <p>Picking the right model is important to get high quality results, at the same time it’s complicated for most of the users.</p>
        <ul>${list(problems)}</ul>
      </div>
      <figure class="pg-model-before" data-zoom-crop>
        <img src="${media}model-picker-before.png" alt="The earlier full model picker showing a grid of model options and specifications" loading="lazy" decoding="async">
      </figure>
    </section>
    <section class="pg-designed-section pg-model-approach" aria-labelledby="pg-model-approach-title">
      <h2 id="pg-model-approach-title">The approach &amp; solutions</h2>
      <p>I designed three layers, each for a different level of certainty.</p>
      <div class="pg-model-methods">
        ${methods.map(method => {
          const expanded = autoExpanded && method.key === 'auto';
          const hidden = expanded ? '' : ' hidden';
          const notesId = `pg-model-${method.key}-notes`;
          const imagesId = `pg-model-${method.key}-images`;
          return `
            <div class="pg-model-method" data-method="${method.key}" data-expanded="${expanded}">
              <h3>
                <button type="button" class="pg-model-toggle" aria-expanded="${expanded}" aria-controls="${notesId}${method.images ? ` ${imagesId}` : ''}">
                  ${method.title}
                  <img src="${media}model-picker-chevron.svg" alt="" width="24" height="24">
                </button>
              </h3>
              <div class="pg-model-method-body">
                <div class="pg-model-method-copy">
                  <p class="pg-model-audience"><strong>${method.audience}</strong></p>
                  <p>${method.description}</p>
                  <ul id="${notesId}"${hidden}>${list(method.notes)}</ul>
                </div>
                <div class="pg-model-visuals">
                  <button class="pg-model-clip" type="button" aria-label="View full screen: ${method.title} recording">
                    <video src="${media}${method.video}" loop muted playsinline preload="none" aria-label="${method.title} recording"></video>
                    <span class="pg-model-clip-zoom" aria-hidden="true">⤢</span>
                  </button>
                  ${method.images ? `<div class="pg-model-support" id="${imagesId}"${hidden}>
                    ${method.images.map(([src, alt, width, height]) => `<img src="${media}${src}" alt="${alt}" width="${width}" height="${height}" loading="lazy" decoding="async">`).join('')}
                  </div>` : ''}
                </div>
              </div>
            </div>`;
        }).join('')}
      </div>
    </section>`;
}

function setupPlaygroundModelPicker(article) {
  for (const toggle of article.querySelectorAll('.pg-model-toggle')) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(expanded));
      toggle.closest('.pg-model-method').dataset.expanded = String(expanded);
      for (const id of toggle.getAttribute('aria-controls').split(' ')) {
        article.querySelector(`#${id}`).hidden = !expanded;
      }
    });
  }
}
