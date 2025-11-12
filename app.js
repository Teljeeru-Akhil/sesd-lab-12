// Replace with your NewsAPI key (for testing only)
const NEWSAPI_KEY = '4c5455d1d7564883abd02efd9323b682';
const PROXY_URL = ''; // For production: your backend proxy endpoint

let page = 1;
let autoRefresh = false;
let autoTimer = null;

const countryEl = document.getElementById('country');
const categoryEl = document.getElementById('category');
const refreshBtn = document.getElementById('refreshNow');
const autoToggleBtn = document.getElementById('autoToggle');
const intervalSecInput = document.getElementById('intervalSec');
const articlesEl = document.getElementById('articles');
const lastUpdatedEl = document.getElementById('lastUpdated');
const pageSizeEl = document.getElementById('pageSize');
const pageNumEl = document.getElementById('pageNum');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function el(tag, cls = '') { const e = document.createElement(tag); if (cls) e.className = cls; return e; }
function formatDate(ts) { return new Date(ts).toLocaleString(); }

async function fetchNews() {
  const country = countryEl.value;
  const category = categoryEl.value;
  const pageSize = parseInt(pageSizeEl.value, 10);

  const params = new URLSearchParams({ country, category, pageSize, page });
  if (!PROXY_URL) params.set('apiKey', NEWSAPI_KEY);

  const url = PROXY_URL ? `${PROXY_URL}?${params}` :const url = `https://newsapi.org/v2/top-headlines?${params}`;
;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.status !== 'ok') throw new Error(data.message || 'API error');
    renderArticles(data.articles);
    lastUpdatedEl.textContent = formatDate(Date.now());
  } catch (err) {
    console.error(err);
    articlesEl.innerHTML = `<div class="p-4 bg-red-50 border rounded text-red-700">Error: ${err.message}</div>`;
  }
}

function renderArticles(list) {
  articlesEl.innerHTML = '';
  if (!list || list.length === 0) {
    articlesEl.innerHTML = '<div class="p-4 bg-yellow-50 border rounded">No articles found.</div>';
    return;
  }
  list.forEach(a => {
    const card = el('article', 'bg-white p-4 rounded-lg shadow');
    const row = el('div', 'md:flex md:gap-4');

    const imgWrap = el('div', 'md:w-48 mb-3 md:mb-0');
    if (a.urlToImage) {
      const img = el('img', 'w-full h-32 object-cover rounded');
      img.src = a.urlToImage;
      img.alt = a.title || 'thumbnail';
      imgWrap.appendChild(img);
    }

    const body = el('div', 'flex-1');
    const title = el('h2', 'font-semibold text-lg');
    const link = el('a');
    link.href = a.url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = a.title || 'Untitled';
    title.appendChild(link);

    const meta = el('div', 'text-xs text-gray-500 mt-1');
    meta.textContent = `${a.source?.name || 'Unknown'} • ${a.author || '—'} • ${a.publishedAt ? new Date(a.publishedAt).toLocaleString() : '—'}`;

    const desc = el('p', 'mt-2 text-sm text-gray-700');
    desc.textContent = a.description || '';

    body.appendChild(title);
    body.appendChild(meta);
    body.appendChild(desc);

    row.appendChild(imgWrap);
    row.appendChild(body);
    card.appendChild(row);
    articlesEl.appendChild(card);
  });
}

refreshBtn.addEventListener('click', () => { page = 1; pageNumEl.textContent = page; fetchNews(); });
autoToggleBtn.addEventListener('click', () => {
  autoRefresh = !autoRefresh;
  autoToggleBtn.textContent = `Auto: ${autoRefresh ? 'On' : 'Off'}`;
  autoToggleBtn.className = autoRefresh ? 'px-3 py-2 rounded bg-green-600 text-white' : 'px-3 py-2 rounded bg-gray-200';
  if (autoRefresh) startAuto(); else stopAuto();
});
function startAuto() {
  stopAuto();
  const sec = Math.max(10, parseInt(intervalSecInput.value || 60, 10));
  autoTimer = setInterval(() => { fetchNews(); }, sec * 1000);
}
function stopAuto() { if (autoTimer) clearInterval(autoTimer); autoTimer = null; }

pageSizeEl.addEventListener('change', () => { page = 1; pageNumEl.textContent = page; fetchNews(); });
prevBtn.addEventListener('click', () => { if (page > 1) { page--; pageNumEl.textContent = page; fetchNews(); } });
nextBtn.addEventListener('click', () => { page++; pageNumEl.textContent = page; fetchNews(); });
countryEl.addEventListener('change', () => { page = 1; pageNumEl.textContent = page; fetchNews(); });
categoryEl.addEventListener('change', () => { page = 1; pageNumEl.textContent = page; fetchNews(); });

fetchNews();

