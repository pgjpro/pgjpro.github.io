import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 배포 주소 (GitHub Pages 사용자 도메인)
export default defineConfig({
  site: 'https://marketerpark.co.kr',
  trailingSlash: 'always',
  integrations: [
    // 검색엔진용 사이트맵: /sitemap-index.xml (글쓰기 화면 /admin 은 제외)
    sitemap({ filter: (page) => !page.includes('/admin') }),
  ],
});
