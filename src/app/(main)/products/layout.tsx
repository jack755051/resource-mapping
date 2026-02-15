import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products & Services | 產品與服務',
  description:
    'Explore our professional security surveillance products including HD IP cameras, smart NVR/DVR recorders, and complete security solutions. 探索光訊科技的專業安防監控產品，包括高清攝影機、智能錄影主機、周邊配件等完整解決方案。',
  keywords: [
    'IP camera',
    'security camera',
    'NVR',
    'DVR',
    'surveillance equipment',
    'CCTV products',
    '監控攝影機',
    '錄影主機',
    '安防產品',
  ],
  openGraph: {
    title: 'Products & Services | Guangxun Tech',
    description:
      'Explore our professional security surveillance products including HD IP cameras, smart NVR/DVR recorders, and complete security solutions.',
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
