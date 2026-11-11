import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../lib';
import { SITE } from '../site';

// 새 글 구독용 RSS (네이버 서치어드바이저에도 제출)
export async function GET(context: APIContext) {
  const posts = (await getPosts()).filter((p) => !p.data.draft);
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.answer ?? '',
      pubDate: p.data.date,
      link: `/posts/${p.id}/`,
      categories: [p.data.category, ...p.data.tags],
    })),
    customData: '<language>ko</language>',
  });
}
