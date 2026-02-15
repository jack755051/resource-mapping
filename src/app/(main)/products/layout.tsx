import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '產品與服務',
  description:
    '探索光訊科技的專業安防監控產品，包括高清攝影機、智能錄影主機、周邊配件等完整解決方案，滿足您的居家與商業安全需求。',
  keywords: [
    '監控攝影機',
    '錄影主機',
    'NVR',
    'DVR',
    '安防產品',
    '周邊配件',
    '監控設備',
  ],
  openGraph: {
    title: '產品與服務 | Guangxun Tech',
    description:
      '探索光訊科技的專業安防監控產品，包括高清攝影機、智能錄影主機、周邊配件等完整解決方案。',
    url: 'https://guangxun.net/products',
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
