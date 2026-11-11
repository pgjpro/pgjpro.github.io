export const SITE = {
  name: '박규진',
  title: '물음표 노트',
  description: '당연하게 해오던 광고 운영 방식에 물음표를 붙이고, 확인한 숫자를 기록합니다.',
  categories: ['검색광고', '측정', '데이터·자동화', '공부 기록'] as const,
  // GA4 측정 ID (예: G-XXXXXXX). 비워 두면 추적 코드를 넣지 않습니다.
  ga4: '',
};

export const slugOf = (cat: string) =>
  ({ '검색광고': 'search-ads', '측정': 'measurement', '데이터·자동화': 'data', '공부 기록': 'study' } as Record<string, string>)[cat];
