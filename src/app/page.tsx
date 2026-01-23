import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header/header';

export default function Home() {
  return (
    <div className="home__page__main__wrapper flex min-h-screen flex-col bg-background">
      <Header />
      {/* 主要的介面 */}
      <main className="home__page__main flex-1 flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold">Resource Mapping Tool</h1>
        {/* 你的其他主要內容放這裡 */}
      </main>
      <Footer
        startYear={2020}
        companyName="San Ring Tech."
        remark="All rights reserved."
        // 可以在這裡傳入樣式了 (見下文)
        className="border-t"
      />
    </div>
  );
}
