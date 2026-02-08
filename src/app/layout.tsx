import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

// 1. 引入你的 Header 和 Footer
import Header from '@/components/layout/header/header';
import Footer from '@/components/layout/footer';
import SiteBreadcrumb from '@/components/layout/site-breadcrumb';

// 2. 引入 Redux Provider 和系统初始化组件
import { ReduxProvider } from '@/provider/ReduxProvider';
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
  title: 'Guangxun Tech.',
  description: 'Guangxun Tech.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
      </body>
    </html>
  );
}
