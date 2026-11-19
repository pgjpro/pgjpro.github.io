export const SITE = {
  name: '마케터 P',
  title: '마케터 P',
  tagline: '퍼포먼스 마케터 P입니다.',
  role: '광고대행사 퍼포먼스 마케터(AE)',
  description:
    '퍼포먼스 마케터 P의 블로그. 광고 운영 실무와 데이터 분석, AI 활용, 성장 과정을 기록합니다.',
  about:
    '퍼포먼스 마케터로 일하며 마주한 문제와 실험, 그리고 배운 점을 기록합니다. 이 블로그는 저의 성장 과정이자, 같은 고민을 하는 사람에게 건네는 작은 정리 노트입니다.',
  // GA4 측정 ID (예: G-XXXXXXX). 비워 두면 추적 코드를 넣지 않습니다.
  ga4: 'G-LF15SDLSL7',
  // 검색엔진 소유 확인 코드 (Search Console·서치어드바이저에서 받은 content 값만)
  verify: { google: '', naver: '7d17e3df3de6a57a7eacf612c8153dde6e76c45c' },
  url: 'https://marketerpark.co.kr',
  // 하트(공감) 숫자를 저장하는 Cloudflare Worker 주소. 비워 두면 숫자 없이 하트만 동작합니다.
  likesApi: 'https://marketerp-likes.judi8945.workers.dev',
};

// 콘텐츠 필라 = 카테고리
export const CATEGORIES = [
  { name: 'Marketing', slug: 'marketing', desc: '퍼포먼스 마케팅 실무, 성과 분석, 운영 인사이트' },
  { name: 'AI & Automation', slug: 'ai-automation', desc: 'AI 활용, 자동화, 도구 실험' },
  { name: 'Projects', slug: 'projects', desc: '직접 실행한 프로젝트와 개선 과정' },
  { name: 'Journal', slug: 'journal', desc: '커리어 고민, 회고, 성장 기록' },
] as const;
export const CATEGORY_NAMES = CATEGORIES.map((c) => c.name) as unknown as readonly [string, ...string[]];

// 시리즈 (글 목록에서 전체 제목 아래 이 순서대로 묶어 보여 줍니다)
export const SERIES_TITLE = '퍼포먼스 마케팅 쪼개 보기';
export const SERIES = [
  { key: 's1', name: '퍼포먼스 마케팅 길라잡이', desc: '퍼포먼스 마케팅의 정의부터 인하우스와 대행사의 역할, AI 이후의 업무, 첫 실습까지 살펴봅니다.' },
  { key: 's2', name: '광고 시장과 성과 측정 길라잡이', desc: '광고 한 건이 어떻게 거래되는지, 광고와 측정 기술이 어떻게 바뀌었는지, GA4와 광고 매체의 전환 수가 왜 다른지 살펴봅니다.' },
  { key: 's3', name: '퍼포먼스 마케터의 역량 길라잡이', desc: '데이터 분석, 매체 이해, 기획과 검증, 커뮤니케이션, 사업 이해를 기본 개념부터 실무 판단까지 쪼개 봅니다.' },
] as const;

export const tagSlug = (t: string) => encodeURIComponent(t.replace(/\s+/g, '-'));

export const slugOf =(cat: string) => CATEGORIES.find((c) => c.name === cat)?.slug ?? 'marketing';

export const fmtDate = (d: Date) =>
  `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;

// 한국어 기준 1분에 약 500자
export const readMin = (body = '') => Math.max(1, Math.round(body.replace(/\s/g, '').length / 500));
