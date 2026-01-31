#!/bin/bash

# 遇到錯誤立刻停止
set -e

# 定義 Docker Compose 的服務名稱 (根據我們剛剛寫的 docker-compose.yml)
SERVICE_NAME="frontend"

echo "🧹 [1/4] 清理舊的編譯檔案..."
rm -rf .next out

echo "🚀 [2/4] 正在執行本機預編譯 (檢查 TS 語法錯誤)..."
# 注意：雖然 Dockerfile 裡面也會 build，但這裡先跑一次是為了快速檢查語法錯誤
# 如果你覺得太慢，可以註解掉下面這行
npm run build

echo "🛑 [3/4] 正在停止當前的 Docker 容器..."
docker-compose down

echo "🏗️  [4/4] 正在重新構建 Image 並啟動容器..."
# --build 會強迫 Docker 重新執行 Dockerfile 裡的 npm run build
docker-compose up -d --build

echo "🧹 [Cleanup] 清理懸空的 Docker Images (釋放空間)..."
docker image prune -f

echo "🎉 [DONE] 前端服務已更新！"
echo "👉 訪問地址: http://localhost:3000"