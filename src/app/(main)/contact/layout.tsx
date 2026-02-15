import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '聯絡我們',
  description:
    '歡迎聯絡光訊科技，我們的專業團隊將為您提供完整的安防監控諮詢服務，解答您的任何疑問。',
  keywords: ['聯絡我們', '諮詢服務', '客戶服務', '技術支援', '業務洽詢'],
  openGraph: {
    title: '聯絡我們 | Guangxun Tech',
    description:
      '歡迎聯絡光訊科技，我們的專業團隊將為您提供完整的安防監控諮詢服務。',
    url: 'https://guangxun.net/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
