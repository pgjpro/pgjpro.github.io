export const SITE = {
  name: '박규진',
  title: '박규진의 마케팅 기록',
  tagline: '퍼포먼스 마케터 박규진입니다.',
  role: '광고대행사 퍼포먼스 마케터(AE)',
  description:
    '광고대행사 퍼포먼스 마케터로 일하며 배운 실무, 분석, 실험, AI 활용, 그리고 성장의 과정을 기록하는 개인 블로그입니다. 완성된 정답보다 직접 부딪히며 배운 인사이트와 변화의 흐름을 담습니다.',
  about:
    '퍼포먼스 마케터로 일하며 마주한 문제와 실험, 그리고 배운 점을 기록합니다. 이 블로그는 저의 성장 과정이자, 같은 고민을 하는 사람에게 건네는 작은 정리 노트입니다.',
  // GA4 측정 ID (예: G-XXXXXXX). 비워 두면 추적 코드를 넣지 않습니다.
  ga4: '',
};

// 콘텐츠 필라 = 카테고리
export const CATEGORIES = [
  { name: 'Marketing', slug: 'marketing', desc: '퍼포먼스 마케팅 실무, 성과 분석, 운영 인사이트' },
  { name: 'AI & Automation', slug: 'ai-automation', desc: 'AI 활용, 자동화, 도구 실험' },
  { name: 'Projects', slug: 'projects', desc: '직접 실행한 프로젝트와 개선 과정' },
  { name: 'Journal', slug: 'journal', desc: '커리어 고민, 회고, 성장 기록' },
] as const;
export const CATEGORY_NAMES = CATEGORIES.map((c) => c.name) as unknown as readonly [string, ...string[]];

// 홈 "무엇이 궁금해서 오셨나요?" 선택지 → 카테고리 연결
export const INTERESTS = [
  { label: '검색광고 운영·성과 분석', cat: 'Marketing', lead: '광고비가 어디서 새는지, 어떤 숫자를 먼저 봐야 하는지부터 읽어 보세요.' },
  { label: 'AI로 반복 업무 줄이기', cat: 'AI & Automation', lead: '마케터가 직접 써 본 AI 도구와 자동화 실험을 모았습니다.' },
  { label: '직접 만든 프로젝트', cat: 'Projects', lead: '문제를 발견하고, 만들고, 바꿔 본 과정을 처음부터 끝까지 기록했습니다.' },
  { label: '마케터 커리어·회고', cat: 'Journal', lead: '퍼포먼스 마케터로 일하며 한 고민과 회고입니다.' },
] as const;

export const tagSlug = (t: string) => encodeURIComponent(t.replace(/\s+/g, '-'));

export const slugOf =(cat: string) => CATEGORIES.find((c) => c.name === cat)?.slug ?? 'marketing';

export const fmtDate = (d: Date) =>
  `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;

// 한국어 기준 1분에 약 500자
export const readMin = (body = '') => Math.max(1, Math.round(body.replace(/\s/g, '').length / 500));
