import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

// 1. 引入你的 Header 和 Footer
import Header from '@/components/layout/header/header';
import Footer from '@/components/layout/footer';
import SiteBreadcrumb from '@/components/layout/site-breadcrumb';

// 2. 引入剛做好的 Provider
import { LanguageProvider } from '@/provider/language-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Resource Mapping Tool',
  description: 'San Ring Tech.',
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
        <LanguageProvider>
          {/* 2. 在這裡建立全域的 Sticky Footer 結構 */}
          <div className="relative flex min-h-screen flex-col bg-background">
            <Header />
            {/* <SiteBreadcrumb /> */}

            {/* 3. 主要內容區：這裡的 flex-1 會確保 Footer 被推到底部 */}
            {/* 你可以在這裡加 main，或者留給 page 自己加 */}
            <main className="flex-1 flex flex-col">{children}</main>

            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
