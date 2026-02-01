# === 第一階段：編譯 (Builder) ===
# 保留這行！$BUILDPLATFORM 是變數，不會報錯。
# 它讓你的 M1 Mac 用原生 ARM 架構跑 npm install，速度快 10 倍。
FROM --platform=$BUILDPLATFORM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
ENV NEXT_PUBLIC_API_BASE_URL=""
RUN npm run build

# === 第二階段：生產環境 (Runner) ===
# ★ 修改重點：拿掉 --platform=linux/amd64
# 這裡不寫死平台，改成在 "docker build 指令" 中指定，警告就會消失。
FROM nginx:alpine

# 1. 複製靜態檔案 
# (前端 build 出來的 HTML/CSS/JS 是純文字，不分 CPU 架構，所以可以直接複製)
COPY --from=builder /app/out /usr/share/nginx/html

# 2. 複製 Nginx 設定
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]