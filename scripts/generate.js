#!/usr/bin/env node
/**
 * generate.js — articles.json을 읽어 sitemap.xml과 rss.xml을 생성한다.
 * 외부 의존성 없음 (Node 내장 모듈만 사용).
 * 실행: node scripts/generate.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'articles.json'), 'utf8'));
const SITE = data.site.url.replace(/\/$/, '');

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ---- sitemap.xml ----
const urls = [
  { loc: SITE + '/', priority: '1.0' },
  { loc: SITE + '/about.html', priority: '0.5' },
  ...data.articles.map(a => ({
    loc: SITE + '/' + a.path,
    lastmod: a.date,
    priority: '0.8'
  }))
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${esc(u.loc)}</loc>${u.lastmod ? `
    <lastmod>${u.lastmod}</lastmod>` : ''}
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap);

// ---- rss.xml ----
const sorted = [...data.articles].sort((a, b) => (a.date < b.date ? 1 : -1));
const items = sorted.map(a => `    <item>
      <title>${esc(a.title)}</title>
      <link>${esc(SITE + '/' + a.path)}</link>
      <guid>${esc(SITE + '/' + a.path)}</guid>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
      <description>${esc(a.summary)}</description>
    </item>`).join('\n');

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(data.site.title)}</title>
    <link>${esc(SITE)}/</link>
    <description>${esc(data.site.description)}</description>
    <language>${data.site.language || 'ko'}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
fs.writeFileSync(path.join(ROOT, 'rss.xml'), rss);

console.log(`✓ sitemap.xml (${urls.length} urls), rss.xml (${sorted.length} items) 생성 완료`);
