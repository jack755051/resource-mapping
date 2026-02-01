import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. 強制靜態輸出
  output: "export",

  // 2. 關閉圖片優化 (或者你需要配置第三方 Loader 如 Cloudinary)
  images: {
    unoptimized: true,
  },

  // 3. 確保 React Strict Mode 開啟 (生產環境建議)
  reactStrictMode: true,

  // 4. 禁止 Next.js 在 header 加入 'X-Powered-By: Next.js' (安全考量)
  poweredByHeader: false,
};

export default nextConfig;