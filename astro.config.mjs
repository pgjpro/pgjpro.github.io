import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

const SITE = 'https://marketerpark.co.kr';
const CAT_SLUG = { Marketing: 'marketing', 'AI & Automation': 'ai-automation', Projects: 'projects', Journal: 'journal' };

// 공개된 글(draft 아님)의 주소·날짜·카테고리·태그를 읽어 사이트맵에 씁니다.
function readPosts() {
  const dir = new URL('./src/content/posts/', import.meta.url);
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const fm = (readFileSync(new URL(f, dir), 'utf-8').match(/^---\r?\n([\s\S]*?)\r?\n---/) || [])[1] || '';
      const get = (k) => (fm.match(new RegExp(`^${k}:\s*(.*)$`, 'm')) || [])[1]?.trim().replace(/^['"]|['"]$/g, '');
      const tagsLine = get('tags') || '';
      return {
        slug: get('slug') || f.replace(/\.md$/, ''),
        date: get('updated') || get('date'),
        category: get('category'),
        draft: get('draft') === 'true',
        hasTags: /\[\s*\S/.test(tagsLine) || /^tags:\s*\r?\n\s*-\s*\S/m.test(fm),
      };
    })
    .filter((p) => !p.draft);
}
const posts = readPosts();
const usedCats = new Set(posts.map((p) => CAT_SLUG[p.category]));
const lastmod = new Map(posts.filter((p) => p.date).map((p) => [`${SITE}/posts/${p.slug}/`, new Date(p.date)]));

// 글이 없는 빈 목록 페이지는 검색에 내보내지 않습니다 (페이지 쪽에도 noindex).
function isEmptyPage(url) {
  const path = new URL(url).pathname;
  if (path.startsWith('/admin')) return true;
  if (posts.length === 0 && (path === '/posts/' || path === '/category/')) return true;
  if (path === '/tags/' && !posts.some((p) => p.hasTags)) return true;
  if (path === '/projects/' && !usedCats.has('projects')) return true;
  const m = path.match(/^\/category\/([^/]+)\/$/);
  return !!m && !usedCats.has(m[1]);
}

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !isEmptyPage(page),
      serialize: (item) => {
        const d = lastmod.get(item.url);
        return d && !isNaN(d) ? { ...item, lastmod: d.toISOString() } : item;
      },
    }),
  ],
});
