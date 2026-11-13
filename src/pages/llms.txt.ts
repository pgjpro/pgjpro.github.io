// AI 검색·LLM이 블로그를 이해하기 쉽게 정리한 안내 파일 (llmstxt.org 제안 형식)
import type { APIRoute } from 'astro';
import { getPosts } from '../lib';
import { SITE, CATEGORIES } from '../site';

export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const abs = (p: string) => new URL(p, SITE.url).href;
  const lines = [
    `# ${SITE.title}`,
    '',
    `> ${SITE.description}`,
    '',
    `작성자: ${SITE.name} (${SITE.role}). 블로그 이름은 "${SITE.title}"입니다.`,
    '광고주 이름은 가명으로, 광고비는 비율(%)로 표기합니다.',
    '',
    '## 소개',
    `- [소개](${abs('/about/')}): 작성자 소개, 하는 일, 연락처`,
    '',
    '## 카테고리',
    ...CATEGORIES.map((c) => `- [${c.name}](${abs(`/category/${c.slug}/`)}): ${c.desc}`),
  ];
  if (posts.length) {
    lines.push('', '## 글');
    for (const p of posts) {
      const sum = p.data.answer ? `: ${p.data.answer.replace(/\s+/g, ' ')}` : '';
      lines.push(`- [${p.data.title}](${abs(`/posts/${p.id}/`)}) (${p.data.category})${sum}`);
    }
  }
  lines.push('', '## 기타', `- [RSS](${abs('/rss.xml')})`, `- [사이트맵](${abs('/sitemap-index.xml')})`, '');
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
