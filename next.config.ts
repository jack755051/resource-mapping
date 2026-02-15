import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';
const useLocalBackend = process.env.USE_LOCAL_BACKEND === 'true';

// 開發環境後端 URL
const devBackendUrl = useLocalBackend
  ? 'http://localhost:3000'
  : 'https://guangxun.net';

const nextConfig: NextConfig = {
  // 1. 僅在生產環境使用靜態輸出
  ...(isDev ? {} : { output: 'export' }),

  // 2. 關閉圖片優化 (或者你需要配置第三方 Loader 如 Cloudinary)
  images: {
    unoptimized: true,
  },

  // 3. 確保 React Strict Mode 開啟 (生產環境建議)
  reactStrictMode: true,

  // 4. 禁止 Next.js 在 header 加入 'X-Powered-By: Next.js' (安全考量)
  poweredByHeader: false,

  // 5. 開發環境：使用 rewrites 代理 API 請求，避免 CORS 問題
  ...(isDev
    ? {
        async rewrites() {
          return [
            {
              source: '/api/v1/:path*',
              destination: `${devBackendUrl}/api/v1/:path*`,
            },
          ];
        },
      }
    : {}),
};

export default nextConfig;
