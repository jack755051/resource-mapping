import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

// 1. 引入你的 Header 和 Footer
import Header from '@/components/layout/header/header';
import Footer from '@/components/layout/footer';
import SiteBreadcrumb from '@/components/layout/site-breadcrumb';

// 2. 引入 Redux Provider 和系统初始化组件
import { ReduxProvider } from '@/provider/ReduxProvider';
import { ThemeProvider } from '@/provider/ThemeProvider';
import { SystemInitializer } from '@/components/system-initializer';
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Guangxun Tech - 專業安防監控系統解決方案',
    template: '%s | Guangxun Tech',
  },
  description:
    '光訊科技提供專業的安防監控系統、攝影機、錄影主機及完整的弱電工程規劃服務，為您的居家與商業環境提供全方位安全防護。',
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
  authors: [{ name: 'Guangxun Tech' }],
  creator: 'Guangxun Tech',
  publisher: 'Guangxun Tech',
  metadataBase: new URL('https://guangxun.net'),
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    url: 'https://guangxun.net',
    siteName: 'Guangxun Tech',
    title: 'Guangxun Tech - 專業安防監控系統解決方案',
    description:
      '光訊科技提供專業的安防監控系統、攝影機、錄影主機及完整的弱電工程規劃服務，為您的居家與商業環境提供全方位安全防護。',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Guangxun Tech',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guangxun Tech - 專業安防監控系統解決方案',
    description:
      '光訊科技提供專業的安防監控系統、攝影機、錄影主機及完整的弱電工程規劃服務。',
    images: ['/og-image.jpg'],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ReduxProvider>
            {/* 系统资源初始化：监听语言变化并自动加载系统资源 */}
            <SystemInitializer />

            {/* 2. 在这里建立全局的 Sticky Footer 结构 */}
            <div className="relative flex min-h-screen flex-col bg-background">
              <Header />
              {/* <SiteBreadcrumb /> */}

              {/* 3. 主要内容区：这里的 flex-1 会确保 Footer 被推到底部 */}
              {/* 你可以在这里加 main，或者留给 page 自己加 */}
              <main className="flex-1 flex flex-col">{children}</main>
              <Toaster />

              <Footer />
            </div>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
