const footer = document.querySelector('.portfolio-footer');
const footerAssets = new URL('portfolio-images/', document.currentScript.src);
const cvFile = new URL('CV-RoupenBabian.pdf', footerAssets);

const cvIcon = `<img src="${new URL('figma-footer-download.svg', footerAssets)}" width="16" height="16" alt="">`;
footer.innerHTML = `
  <div class="portfolio-footer-inner">
    <div class="portfolio-footer-contact">
      <h2>Get in touch</h2>
      <button type="button" data-copy="rbabeyan@gmail.com" aria-label="Copy email address, rbabeyan@gmail.com">rbabeyan@gmail.com</button>
      <button type="button" data-copy="+374 98 634 674" aria-label="Copy phone number, +374 98 634 674">+374 98 634 674</button>
      <span class="portfolio-footer-feedback" role="status"></span>
    </div>
    <div class="portfolio-footer-links">
      <a href="${cvFile}" download>Download CV ${cvIcon}</a>
      <a href="https://www.linkedin.com/in/roupen-babian/" target="_blank" rel="noopener noreferrer">LinkedIn
        <img src="${new URL('figma-project-arrow.svg', footerAssets)}" width="16" height="16" alt="">
      </a>
    </div>
  </div>`;

const feedback = footer.querySelector('.portfolio-footer-feedback');
let feedbackTimeout;
footer.addEventListener('click', async event => {
  const button = event.target.closest('[data-copy]');
  if (!button) return;
  try {
    await navigator.clipboard.writeText(button.dataset.copy);
    feedback.textContent = 'Copied to clipboard';
  } catch {
    feedback.textContent = 'Couldn’t copy. You can select the text to copy it.';
  }
  clearTimeout(feedbackTimeout);
  feedbackTimeout = setTimeout(() => { feedback.textContent = ''; }, 2400);
});
