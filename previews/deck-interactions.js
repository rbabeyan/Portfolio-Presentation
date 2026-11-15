function setupDeckInteractions(root) {
  const toggle = root.querySelector('#formStateToggle');
  if (toggle) {
    const buttons = [...toggle.querySelectorAll('button[data-state]')];
    const images = root.querySelectorAll('#imgSlider .form-img');
    function selectState(state) {
      buttons.forEach(button => {
        const selected = button.dataset.state === state;
        button.classList.toggle('active', selected);
        button.setAttribute('aria-pressed', String(selected));
      });
      images.forEach(image => {
        image.style.display = image.dataset.state === state ? 'block' : 'none';
      });
    }
    buttons.forEach(button => {
      button.addEventListener('click', () => selectState(button.dataset.state));
    });
    selectState(buttons.find(button => button.classList.contains('active'))?.dataset.state ?? buttons[0]?.dataset.state);
  }

  root.querySelectorAll('.img-slider').forEach(slider => {
    const frame = slider.querySelector('.img-slider-frame');
    const handle = slider.querySelector('.img-slider-handle');
    const afterLayer = slider.querySelector('.img-slider-layer.after');
    const beforeLabel = slider.querySelector('.img-slider-label.before');
    const afterLabel = slider.querySelector('.img-slider-label.after');
    if (!frame || !handle || !afterLayer) return;

    slider.tabIndex = 0;
    slider.style.touchAction = 'pan-y';
    slider.setAttribute('role', 'slider');
    slider.setAttribute('aria-label', 'Before and after comparison');
    slider.setAttribute('aria-valuemin', '0');
    slider.setAttribute('aria-valuemax', '100');

    let percent = 50;
    let activePointer = null;
    function setReveal(value) {
      percent = Math.max(0, Math.min(100, value));
      const rounded = Math.round(percent);
      slider.setAttribute('aria-valuenow', String(rounded));
      slider.setAttribute('aria-valuetext', `${rounded}% before, ${100 - rounded}% after`);
      handle.style.left = `${percent}%`;
      afterLayer.style.clipPath = `inset(0 0 0 ${percent}%)`;
      if (beforeLabel) beforeLabel.style.opacity = percent < 12 ? '0' : '1';
      if (afterLabel) afterLabel.style.opacity = percent > 88 ? '0' : '1';
      if (revealButtons) {
        revealButtons.forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.reveal) === percent)));
      }
    }
    function revealAt(clientX) {
      const bounds = frame.getBoundingClientRect();
      if (bounds.width) setReveal((clientX - bounds.left) / bounds.width * 100);
    }

    slider.addEventListener('pointerdown', event => {
      if (!event.isPrimary || event.button !== 0 || activePointer !== null) return;
      activePointer = event.pointerId;
      slider.setPointerCapture(activePointer);
      slider.focus({ preventScroll: true });
      revealAt(event.clientX);
    });
    slider.addEventListener('pointermove', event => {
      if (activePointer === event.pointerId) revealAt(event.clientX);
    });
    function endDrag(event) {
      if (activePointer === event.pointerId) activePointer = null;
    }
    slider.addEventListener('pointerup', endDrag);
    slider.addEventListener('pointercancel', endDrag);
    slider.addEventListener('lostpointercapture', endDrag);
    slider.addEventListener('dragstart', event => event.preventDefault());
    slider.addEventListener('keydown', event => {
      const values = {
        ArrowLeft: percent - 5,
        ArrowDown: percent - 5,
        ArrowRight: percent + 5,
        ArrowUp: percent + 5,
        PageDown: percent - 20,
        PageUp: percent + 20,
        Home: 0,
        End: 100,
      };
      if (!Object.hasOwn(values, event.key)) return;
      event.preventDefault();
      event.stopPropagation();
      setReveal(values[event.key]);
    });
    let revealButtons;
    if (root.host?.dataset.theme === 'minimal') {
      const modes = root.ownerDocument.createElement('div');
      modes.className = 'deck-phone-reveal';
      modes.hidden = true;
      modes.setAttribute('role', 'group');
      modes.setAttribute('aria-label', 'Comparison view');
      revealButtons = [['Before', 100], ['Split view', 50], ['After', 0]].map(([label, reveal]) => {
        const button = root.ownerDocument.createElement('button');
        button.type = 'button';
        button.textContent = label;
        button.dataset.reveal = reveal;
        button.addEventListener('click', () => setReveal(reveal));
        modes.append(button);
        return button;
      });
      slider.before(modes);
    }
    setReveal(percent);

    const zoomActions = root.ownerDocument.createElement('div');
    zoomActions.className = 'deck-comparison-zoom';
    for (const side of ['before', 'after']) {
      const images = [...slider.querySelectorAll(`.img-slider-layer.${side} img`)];
      if (!images.length) continue;
      const button = root.ownerDocument.createElement('button');
      button.type = 'button';
      button.textContent = side === 'before' ? 'Enlarge before' : 'Enlarge after';
      button.setAttribute('aria-haspopup', 'dialog');
      button.addEventListener('click', () => {
        const image = images.find(item => item.style.display !== 'none');
        if (image) openProjectImage(image, button);
      });
      zoomActions.append(button);
    }
    if (zoomActions.childElementCount) slider.after(zoomActions);
  });

  const doc = root.ownerDocument;
  const dialog = doc.createElement('dialog');
  if (typeof dialog.showModal !== 'function') return;

  const style = doc.createElement('style');
  style.textContent = `
    .img-slider:focus-visible, .deck-media-trigger:focus-visible {
      outline: 2px solid var(--accent, #e2724e);
      outline-offset: 4px;
    }
    .deck-media-trigger:focus-visible::after { opacity: 1; transform: translateY(0); }
    .deck-interaction-dialog {
      width: max-content;
      max-width: calc(100vw - 2rem);
      max-height: calc(100dvh - 2rem);
      margin: auto;
      padding: 0;
      border: 1px solid var(--line-strong, #4e4338);
      border-radius: 14px;
      color: var(--ink, #f4ecd8);
      background: var(--bg, #0f0b07);
    }
    .deck-interaction-dialog::backdrop { background: rgba(8, 6, 4, 0.9); }
    .deck-dialog-actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 1rem;
      padding: 0.65rem;
    }
    .deck-dialog-actions button, .deck-dialog-actions a {
      color: inherit;
      font: inherit;
    }
    .deck-dialog-actions button {
      padding: 0.45rem 0.7rem;
      border: 1px solid currentColor;
      border-radius: 0.4rem;
      background: transparent;
      cursor: pointer;
    }
    .deck-dialog-stage > iframe {
      display: block;
      width: min(410px, calc(100vw - 2rem - 2px));
      height: min(820px, calc(100dvh - 6rem));
      border: 0;
      background: #f5f5f5;
    }
  `;
  dialog.className = 'deck-interaction-dialog';
  dialog.innerHTML = `
    <div class="deck-dialog-actions">
      <a target="_blank" rel="noopener" hidden>Open prototype in a new tab</a>
      <button type="button" autofocus>Close</button>
    </div>
    <div class="deck-dialog-stage"></div>
  `;
  root.append(style, dialog);

  const closeButton = dialog.querySelector('button');
  const externalLink = dialog.querySelector('a');
  const stage = dialog.querySelector('.deck-dialog-stage');
  let returnFocus;
  function show(content, label, trigger, prototypeURL) {
    if (dialog.open) return;
    returnFocus = trigger;
    dialog.setAttribute('aria-label', label);
    externalLink.hidden = !prototypeURL;
    if (prototypeURL) externalLink.href = prototypeURL;
    stage.replaceChildren(content);
    dialog.showModal();
  }
  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    stage.replaceChildren();
    returnFocus?.focus({ preventScroll: true });
  });

  root.querySelectorAll('.media:not(.no-zoom)').forEach(frame => {
    const original = frame.querySelector('img, video');
    if (!original) return;
    frame.classList.add('deck-media-trigger');
    if (original.tagName === 'IMG') {
      enableProjectImage(original, frame);
      return;
    }
    const caption = frame.parentElement.querySelector('.media-cap')?.textContent.trim();
    const title = original.getAttribute('aria-label') || caption || frame.closest('.slide')?.querySelector('h3')?.textContent.trim();
    const label = title ? `View full screen: ${title}` : 'View video full screen';
    enableProjectMediaTrigger(frame, label, () => openProjectVideo(original, frame, title));
  });

  root.querySelectorAll('.proto-btn[href]').forEach(link => {
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const iframe = doc.createElement('iframe');
      iframe.src = link.href;
      iframe.title = 'Interactive ProtoPie prototype';
      iframe.allow = 'fullscreen; autoplay';
      show(iframe, iframe.title, link, link.href);
    });
  });
}
