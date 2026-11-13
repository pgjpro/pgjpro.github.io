import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CATEGORY_NAMES } from './site';

// 글은 src/content/posts 에 .md 로 둡니다. (나중에 옵시디언 폴더로 바꿀 수 있음)
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    answer: z.string().optional(),     // 한 줄 요약 (대표 글·글 머리에 보임)
    number: z.string().optional(),     // 핵심 숫자 (대표 글 표지에 보임)
    cover: z.string().optional(),      // 표지 이미지 경로 (예: /covers/bid.png, public 폴더 기준)
    date: z.coerce.date(),
    updated: z.coerce.date().optional(), // 크게 고친 날짜 (검색엔진에 수정일로 알림)
    category: z.enum(CATEGORY_NAMES as [string, ...string[]]), // Marketing | AI & Automation | Projects | Journal
    tags: z.array(z.string()).default([]),   // 검색어가 될 만한 단어
    featured: z.boolean().default(false),    // 홈 대표 글
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
