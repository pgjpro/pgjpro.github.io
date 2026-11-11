import { getCollection } from 'astro:content';

// 개발 중에는 draft 도 보이고, 배포 빌드에서는 숨긴다
export async function getPosts() {
  const posts = await getCollection('posts', ({ data }) => !data.draft || import.meta.env.DEV);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
