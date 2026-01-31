import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. 啟用靜態輸出 (會產生 out 資料夾)
  output: "export",

  // 2. 如果你有用 Next/Image，靜態輸出不支援內建優化，需關閉
  images: {
    unoptimized: true,
  },

  // 3. 確保你的 API 請求會打到相對路徑 (開發時的 rewrites 這裡無效，因為是靜態輸出)
  // 生產環境由 Nginx 處理路由
};

export default nextConfig;