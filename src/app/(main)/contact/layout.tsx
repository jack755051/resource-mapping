import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | 聯絡我們',
  description:
    'Contact Guangxun Tech for professional security surveillance consulting services. Our expert team is ready to answer your questions. 歡迎聯絡光訊科技，我們的專業團隊將為您提供完整的安防監控諮詢服務。',
  keywords: [
    'contact us',
    'consultation',
    'customer service',
    'technical support',
    '聯絡我們',
    '諮詢服務',
  ],
  openGraph: {
    title: 'Contact Us | Guangxun Tech',
    description:
      'Contact Guangxun Tech for professional security surveillance consulting services.',
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
