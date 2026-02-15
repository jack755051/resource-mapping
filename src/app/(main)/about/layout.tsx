import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | 關於我們',
  description:
    'Guangxun Tech is dedicated to providing professional security surveillance solutions with extensive engineering experience and technical expertise. 光訊科技致力於提供專業的安防監控解決方案，擁有豐富的工程經驗和技術團隊。',
  keywords: [
    'Guangxun Tech',
    'security company',
    'surveillance expert',
    'professional team',
    '光訊科技',
    '安防監控專家',
  ],
  openGraph: {
    title: 'About Us | Guangxun Tech',
    description:
      'Guangxun Tech is dedicated to providing professional security surveillance solutions with extensive engineering experience and technical expertise.',
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
