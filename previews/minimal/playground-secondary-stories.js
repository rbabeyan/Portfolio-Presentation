function renderPlaygroundAllGenerations() {
  return `
    <section class="pg-designed-section" aria-labelledby="pg-history-problem">
      <h2 id="pg-history-problem">The problem</h2>
      <p class="pg-secondary-copy">Finding an earlier generation meant remembering which board contained it. Using a prompt or result from another project meant searching through folders.</p>
    </section>
    <section class="pg-designed-section" aria-labelledby="pg-history-approach">
      <h2 id="pg-history-approach">The approach</h2>
      <p class="pg-secondary-copy">I designed one cross-board history, grouped by date. People can search by prompt or filter by type, model, folder, and date. List view gives prompts and metadata room, while grid view makes it easier to scan visually.</p>
      <div class="pg-secondary-evidence">
        <figure>
          <button class="media-zoom pg-history-video" type="button" aria-label="View full screen: List view exploration recording">
            <video src="./chapter-media/all-generations-list.mp4" width="1600" height="908" loop muted playsinline preload="none" aria-label="List view exploration recording"></video>
            <span aria-hidden="true">⤢</span>
          </button>
          <figcaption>List view exploration</figcaption>
        </figure>
        <figure>
          <img src="./chapter-media/all-generations-grid.png" width="3024" height="1724" alt="All generations grid view with past results arranged as visual cards" loading="lazy" decoding="async">
          <figcaption>Grid view exploration</figcaption>
        </figure>
      </div>
    </section>`;
}

function renderPlaygroundCreditsNudge() {
  return `
    <section class="pg-designed-section" aria-labelledby="pg-credits-problem">
      <h2 id="pg-credits-problem">The problem</h2>
      <ul class="pg-credits-list pg-secondary-copy">
        <li><strong>Credits were easy to lose track of.</strong> The balance was a bare number, with no sense of what it would buy or when it would refill. When the account moved to the bottom left, credits risked being buried in the profile menu, one click away from the moment they matter most.</li>
        <li><strong>People found out at the worst moment.</strong> Without a warning, people learned they were out of credits when Generate failed, after writing a prompt and choosing settings. That’s the most frustrating point to hit a wall, and the least likely to lead to an upgrade.</li>
        <li><strong>One number, several kinds of credit.</strong> Plan credits renew monthly, free credits refill weekly, and add-on credits never expire. A single number couldn’t explain any of that.</li>
        <li><strong>Every case got the same response.</strong> Being a little low, being out, and being on a free plan each need a different next step, but the product treated them the same way.</li>
      </ul>
    </section>
    <section class="pg-designed-section" aria-labelledby="pg-credits-approach">
      <h2 id="pg-credits-approach">The approach</h2>
      <p class="pg-secondary-copy">I treated credits as live status, not account settings. People spend credits on every generation, so they need to know where they stand, but a balance that’s always shouting becomes noise. That led to two parts: a balance card that’s there when people look for it, and a status nudge that appears only when action is needed.</p>
    </section>
    <section class="pg-designed-section" aria-labelledby="pg-credits-balance">
      <h2 id="pg-credits-balance">The balance card</h2>
      <p class="pg-secondary-copy">The profile menu opens with an “Available credits” card:</p>
      <ul class="pg-credits-list pg-secondary-copy">
        <li><strong>A ring for the balance.</strong> It shows how much of the allowance is left at a glance, without anyone having to do the math.</li>
        <li><strong>Each credit type on its own line.</strong> Plan credits and add-on credits are listed separately.</li>
        <li><strong>When credits renew.</strong> Plan credits say when they renew (“renew in 5 days”), free credits say they refill every Monday, and add-on credits note that they never expire.</li>
      </ul>
      <p class="pg-secondary-copy">People can check what they have and what happens next without leaving the board.</p>
    </section>
    <section class="pg-designed-section" aria-labelledby="pg-credits-sidebar">
      <h2 id="pg-credits-sidebar">The status nudge</h2>
      <div class="pg-credits-nudge">
        <p class="pg-secondary-copy">A compact card in the sidebar appears only when the balance needs attention. When the balance is fine, the nudge isn’t there. Its color, message and action change with the situation.</p>
        <figure>
          <div class="pg-credits-crop" data-zoom-crop>
            <img src="./workspace-figma.png" alt="Available credits in the Playground sidebar, with a usage bar, remaining credits, and an upgrade action" loading="lazy" decoding="async">
          </div>
          <figcaption>Available credits in the sidebar</figcaption>
        </figure>
      </div>
      <div class="pg-credits-table-wrap" role="region" aria-label="Credits status states" tabindex="0">
        <table class="pg-credits-table">
          <thead><tr><th scope="col">State</th><th scope="col">When it appears</th><th scope="col">What it says</th><th scope="col">Next step</th></tr></thead>
          <tbody>
            <tr><th scope="row">Running low</th><td>Below <strong>[X]%</strong> of the plan’s credits</td><td>“Running low · X% of your balance remaining”</td><td>Buy top-up credits</td></tr>
            <tr><th scope="row">Out of credits</th><td>Balance at zero</td><td>“Out of credits”</td><td>Top up, or upgrade. The Generate button changes to “Top up”.</td></tr>
            <tr><th scope="row">Upgrade</th><td>Free plan, or limits reached</td><td>“Upgrade to Pro · 2.5× more credits”</td><td>Upgrade to Pro</td></tr>
            <tr><th scope="row">Premium only</th><td>The feature needs a paid plan</td><td>“Credits available with premium. Upgrade to continue creating with our AI tools.”</td><td>Upgrade</td></tr>
          </tbody>
        </table>
      </div>
    </section>
    <section class="pg-designed-section" aria-labelledby="pg-credits-decisions">
      <h2 id="pg-credits-decisions">Decisions worth naming</h2>
      <ul class="pg-credits-list pg-secondary-copy">
        <li><strong>Quiet by default.</strong> The nudge appears only when it’s needed. A warning that’s always on becomes wallpaper, and people learn to ignore it.</li>
        <li><strong>Amber means act.</strong> The warning color is kept for states that need action (running low, out), so it never loses its meaning.</li>
        <li><strong>No dead end at zero.</strong> When the balance runs out, Generate turns into “Top up”. People don’t hit a failed generation; the main button becomes the way forward.</li>
        <li><strong>The right offer for the situation.</strong> A paying user running low is offered a top-up, which keeps their plan and solves the immediate need. A free user is shown the upgrade, with its benefit in concrete terms (2.5× more credits) instead of a generic “Go Pro”.</li>
        <li><strong>Help, not a sales pitch.</strong> The copy states the situation plainly and offers one clear action.</li>
        <li><strong>One source of truth.</strong> The sidebar nudge and the profile menu card always show the same balance and state.</li>
      </ul>
    </section>`;
}
