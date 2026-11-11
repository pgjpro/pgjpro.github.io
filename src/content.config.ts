import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 글은 src/content/posts 에 .md 로 둡니다. (나중에 옵시디언 폴더로 바꿀 수 있음)
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    answer: z.string().optional(),     // 한 줄 요약 (목록·글 머리에 보임)
    number: z.string().optional(),     // 핵심 숫자 (표지에 크게 보임)
    cover: z.string().optional(),      // 표지 이미지 경로 (예: /covers/bid.png, public 폴더 기준). 없으면 색 표지
    date: z.coerce.date(),
    category: z.enum(['검색광고', '측정', '데이터·자동화', '공부 기록']),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
