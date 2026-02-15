import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Technical Support | 技術支援',
  description:
    'Comprehensive technical support services including product manuals, FAQs, and system maintenance to ensure your surveillance system runs smoothly. 光訊科技提供完善的技術支援服務，包括產品使用說明、常見問題解答、系統維護等。',
  keywords: [
    'technical support',
    'FAQ',
    'product manual',
    'system maintenance',
    'after-sales service',
    '技術支援',
    '常見問題',
  ],
  openGraph: {
    title: 'Technical Support | Guangxun Tech',
    description:
      'Comprehensive technical support services including product manuals, FAQs, and system maintenance.',
    url: 'https://guangxun.net/support',
  },
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
