/* ===== IT Tech Note — Core JS ===== */

// --- Theme ---
(function () {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();

function toggleTheme() {
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  const btn = document.querySelector('.theme-toggle');
  if (btn) btn.textContent = next === 'dark' ? '☀' : '☾';
}

// --- Back to top ---
function initBackToTop() {
  const btn = document.querySelector('.to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 600);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// --- Home: render article list from articles.json ---
async function renderHome() {
  const listEl = document.getElementById('post-list');
  const catBar = document.getElementById('cat-bar');
  if (!listEl) return;

  let data;
  try {
    const res = await fetch('articles.json');
    data = await res.json();
  } catch (e) {
    listEl.innerHTML = '<p style="color:var(--ink-faint)">기사 목록을 불러오지 못했습니다.</p>';
    return;
  }

  const catMap = {};
  data.categories.forEach(c => { catMap[c.id] = c.name; });

  // category chips
  if (catBar) {
    const chips = ['<button class="cat-chip active" data-cat="all">전체</button>']
      .concat(data.categories.map(c => `<button class="cat-chip" data-cat="${c.id}">${c.name}</button>`));
    catBar.innerHTML = chips.join('');
  }

  // sort newest first
  const articles = [...data.articles].sort((a, b) => (a.date < b.date ? 1 : -1));

  listEl.innerHTML = articles.map((a, i) => `
    <a href="${a.path}" class="post-card reveal" data-cat="${a.category}" style="animation-delay:${i * 60}ms">
      <div class="post-meta">
        <span class="post-cat-tag">${catMap[a.category] || a.category}</span>
        <span>${a.date}</span>
        <span>· ${a.readingMinutes || 5} min</span>
      </div>
      <div class="post-card-title">${a.title}</div>
      <div class="post-card-summary">${a.summary}</div>
    </a>
  `).join('');

  // filter behavior
  if (catBar) {
    catBar.addEventListener('click', (e) => {
      const chip = e.target.closest('.cat-chip');
      if (!chip) return;
      catBar.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const cat = chip.dataset.cat;
      listEl.querySelectorAll('.post-card').forEach(card => {
        card.classList.toggle('hidden', cat !== 'all' && card.dataset.cat !== cat);
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initBackToTop();
  renderHome();
  const btn = document.querySelector('.theme-toggle');
  if (btn) {
    btn.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? '☀' : '☾';
    btn.addEventListener('click', toggleTheme);
  }
});
