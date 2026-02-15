import { Metadata } from 'next';

const siteUrl = 'https://guangxun.net';
const siteName = 'Guangxun Tech';
const defaultTitle = 'Guangxun Tech - 專業安防監控系統解決方案';
const defaultDescription =
  '光訊科技提供專業的安防監控系統、攝影機、錄影主機及完整的弱電工程規劃服務，為您的居家與商業環境提供全方位安全防護。';

export const seoConfig = {
  siteUrl,
  siteName,
  defaultTitle,
  defaultDescription,
};

// 基礎 metadata 模板
export const createMetadata = (
  title: string,
  description: string,
  path: string = '',
  image?: string
): Metadata => {
  const fullTitle = title === defaultTitle ? title : `${title} | ${siteName}`;
  const url = `${siteUrl}${path}`;
  const ogImage = image || `${siteUrl}/og-image.jpg`;

  return {
    title: fullTitle,
    description,
    keywords: [
      '監控系統',
      '安防監控',
      '攝影機',
      '錄影主機',
      '弱電工程',
      '居家防護',
      '商務監控',
      'CCTV',
      'surveillance',
      'security camera',
    ],
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      locale: 'zh_TW',
      url,
      title: fullTitle,
      description,
      siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: '@guangxuntech',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
};
