# === 第一階段：編譯 (Builder) ===
FROM node:18-alpine AS builder

WORKDIR /app

# 先複製依賴檔，利用 Docker Cache 加速
COPY package*.json ./
RUN npm install

# 複製所有程式碼
COPY . .

# 開始打包 (因為設定了 output: 'export'，會產生 /app/out 資料夾)
RUN npm run build

# === 第二階段：生產環境 (Runner) ===
FROM nginx:alpine

# 1. 複製剛剛編譯好的靜態檔案到 Nginx 目錄
COPY --from=builder /app/out /usr/share/nginx/html

# 2. 複製我們寫好的 nginx 設定檔
COPY nginx-frontend.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]