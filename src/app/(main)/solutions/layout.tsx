import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '專業服務',
  description:
    '光訊科技提供居家防護、商務監控、弱電工程規劃等專業服務，從需求分析、系統設計到安裝維護，提供一站式解決方案。',
  keywords: [
    '居家防護',
    '商務監控',
    '弱電工程',
    '系統整合',
    '安裝維護',
    '監控規劃',
  ],
  openGraph: {
    title: '專業服務 | Guangxun Tech',
    description:
      '提供居家防護、商務監控、弱電工程規劃等專業服務，從需求分析到安裝維護的一站式解決方案。',
    url: 'https://guangxun.net/solutions',
  },
};

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
