import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Professional Services | 專業服務',
  description:
    'Professional security services including residential protection, commercial surveillance, and system integration from planning to maintenance. 光訊科技提供居家防護、商務監控、弱電工程規劃等專業服務，從需求分析到安裝維護的一站式解決方案。',
  keywords: [
    'residential security',
    'commercial surveillance',
    'system integration',
    'installation service',
    '居家防護',
    '商務監控',
    '弱電工程',
  ],
  openGraph: {
    title: 'Professional Services | Guangxun Tech',
    description:
      'Professional security services including residential protection, commercial surveillance, and system integration from planning to maintenance.',
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
