import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '關於我們',
  description:
    '光訊科技致力於提供專業的安防監控解決方案，擁有豐富的工程經驗和技術團隊，為客戶打造安全可靠的監控環境。',
  keywords: [
    '光訊科技',
    '公司簡介',
    '企業願景',
    '專業團隊',
    '安防監控專家',
  ],
  openGraph: {
    title: '關於我們 | Guangxun Tech',
    description:
      '光訊科技致力於提供專業的安防監控解決方案，擁有豐富的工程經驗和技術團隊。',
    url: 'https://guangxun.net/about',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
