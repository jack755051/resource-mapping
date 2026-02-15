import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '技術支援',
  description:
    '光訊科技提供完善的技術支援服務，包括產品使用說明、常見問題解答、系統維護等，確保您的監控系統穩定運作。',
  keywords: [
    '技術支援',
    '常見問題',
    'FAQ',
    '產品說明',
    '系統維護',
    '售後服務',
  ],
  openGraph: {
    title: '技術支援 | Guangxun Tech',
    description:
      '提供完善的技術支援服務，包括產品使用說明、常見問題解答、系統維護等。',
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
