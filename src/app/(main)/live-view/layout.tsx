import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Real Footage Quality Showcase | 實拍畫質展示',
  description:
    'Seeing is believing. We provide unmodified raw output frames showcasing ultra low light performance, high-speed LPR, and 180° panoramic surveillance. | 眼見為憑。我們提供未經修飾的原始輸出畫面，展示極低照度測試、高速車牌辨識與 180° 全景監控。',
  keywords: [
    'surveillance footage',
    'camera quality',
    'night vision',
    'LPR',
    'license plate recognition',
    'panoramic camera',
    '實拍畫質',
    '監控畫面',
    '夜視功能',
    '車牌辨識',
    '全景監控',
    '極低照度',
  ],
  openGraph: {
    title: 'Real Footage Quality Showcase | Guangxun Tech',
    description:
      'Seeing is believing. We provide unmodified raw output frames showcasing ultra low light performance, high-speed LPR, and 180° panoramic surveillance.',
    url: 'https://guangxun.net/live-view',
  },
};

export default function LiveViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
