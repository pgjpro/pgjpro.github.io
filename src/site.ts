export const SITE = {
  name: '박규진',
  title: '퍼포먼스 마케터 박규진입니다',
  role: '광고대행사 퍼포먼스 마케터(AE)',
  description: '광고를 운영하며 성장하는 과정과, 그 안에서 얻은 인사이트를 기록합니다.',
  categories: ['검색광고', '측정', '데이터·자동화', '공부 기록'] as const,
  // GA4 측정 ID (예: G-XXXXXXX). 비워 두면 추적 코드를 넣지 않습니다.
  ga4: '',
};

export const slugOf = (cat: string) =>
  ({ '검색광고': 'search-ads', '측정': 'measurement', '데이터·자동화': 'data', '공부 기록': 'study' } as Record<string, string>)[cat];

// 이미지가 없는 글의 표지 색 (카테고리별)
export const toneOf = (cat: string) =>
  ({ '검색광고': 'blue', '측정': 'green', '데이터·자동화': 'violet', '공부 기록': 'sand' } as Record<string, string>)[cat] ?? 'sand';

export const fmtDate = (d: Date) =>
  `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;

// 한국어 기준 1분에 약 500자
export const readMin = (body = '') => Math.max(1, Math.round(body.replace(/\s/g, '').length / 500));
