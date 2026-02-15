import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies | 安裝實績',
  description:
    'View our successful security surveillance installation projects for residential, commercial, and industrial applications. 查看光訊科技的安裝實績案例，包括居家、商業、工業等各類型監控系統的成功案例。',
  keywords: [
    'case studies',
    'installation projects',
    'success stories',
    'project portfolio',
    '安裝實績',
    '成功案例',
  ],
  openGraph: {
    title: 'Case Studies | Guangxun Tech',
    description:
      'View our successful security surveillance installation projects for residential, commercial, and industrial applications.',
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
