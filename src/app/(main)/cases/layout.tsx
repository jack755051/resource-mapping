import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '安裝實績',
  description:
    '查看光訊科技的安裝實績案例，包括居家、商業、工業等各類型監控系統的成功案例，見證我們的專業實力。',
  keywords: [
    '安裝實績',
    '成功案例',
    '專案實績',
    '客戶見證',
    '監控案例',
  ],
  openGraph: {
    title: '安裝實績 | Guangxun Tech',
    description:
      '查看光訊科技的安裝實績案例，見證我們在各類型監控系統的專業實力。',
    url: 'https://guangxun.net/cases',
  },
};

export default function CasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
