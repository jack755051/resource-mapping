import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header/header';

export default function Home() {
  return (
    <div className="home__page__main__wrapper flex min-h-screen flex-col items-center justify-center">
      <Header />
      {/* 主要的介面 */}
      <main className="home__page__main flex-1 flex flex-col items-center justify-center ">
        <h1 className="text-2xl font-bold">Resource Mapping Tool</h1>
        {/* 你的其他主要內容放這裡 */}
      </main>
      <Footer
        startYear={2020}
        companyName="San Ring Tech."
        remark="All rights reserved."
      ></Footer>
    </div>
  );
}
