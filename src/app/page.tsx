export default function Home() {
  return (
    // 這裡只需要處理頁面內部的排版
    // 外層已經有 flex-col 和 min-h-screen 了
    <div className="home__page__content flex flex-col items-center justify-center p-6 h-full">
      <h1 className="text-2xl font-bold">Resource Mapping Tool</h1>
      {/* 你的其他主要內容放這裡 */}
      <p className="mt-4 text-muted-foreground">
        歡迎使用資源地圖系統...
      </p>
    </div>
  );
}