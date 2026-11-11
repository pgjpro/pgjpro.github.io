import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 글은 src/content/posts 에 .md 로 둡니다. (나중에 옵시디언 폴더로 바꿀 수 있음)
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),                 // 글 제목 = 붙잡은 질문
    answer: z.string().optional(),     // 한 줄 답 (목록에 보임)
    number: z.string().optional(),     // 확인한 숫자 (형광펜으로 강조)
    date: z.coerce.date(),
    category: z.enum(['검색광고', '측정', '데이터·자동화', '공부 기록']),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
