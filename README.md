---
schema_version: 1
repo_id: resource-mapping
name: Guangxun Tech Corporate Site
display_name: 光訊科技 企業官網
summary: 光訊科技 (Guangxun Tech) 安防監控產品官方網站 — Next.js 16 + React 19 靜態輸出，支援多語系、SEO、RWD 與 Docker/Nginx 部署。
owner: jack755051
status: active
visibility: public
repository_url: https://github.com/jack755051/resource-mapping
demo_url: https://guangxun.net
category: web-frontend
project_type: corporate-site
stack:
  - nextjs
  - react
  - typescript
  - tailwindcss
  - radix-ui
  - redux-toolkit
  - docker
  - nginx
tags:
  - portfolio
  - nextjs
  - react-19
  - typescript
  - tailwindcss
  - shadcn-ui
  - i18n
  - seo
  - docker
  - static-export
  - corporate-site
  - security-surveillance
portfolio:
  featured: true
  priority: 1
  card_title: 光訊科技 官網
  card_subtitle: Next.js 16 + React 19 企業官網
---

# Guangxun Tech Corporate Site · 光訊科技 企業官網

> 光訊科技 (Guangxun Tech) 安防監控產品官方網站。採用 Next.js 16 App Router (React 19) 打造，支援繁中 / 英文雙語系、完整 SEO metadata，並以 Nginx 容器靜態託管。
>
> 🌐 Live：<https://guangxun.net>　|　📦 Repo：<https://github.com/jack755051/resource-mapping>

---

## Purpose

本專案是光訊科技的品牌門面，目標有三：

1. **產品展示**：集中呈現 IP Camera、NVR / DVR、安防監控與弱電工程解決方案。
2. **商業轉換**：引導使用者透過 Contact / Support 表單建立業務接觸。
3. **技術展演**：作為個人作品集 (Portfolio) 的代表作之一，展示使用 Next.js 16 + React 19 + Tailwind 4 建構現代化企業網站的整體能力。

## Scope

涵蓋範圍：

- 企業官網所有公開頁面（首頁 / 關於 / 產品 / 案例 / 解決方案 / Live View / 聯絡 / 支援）。
- 前端呈現層與對後端 API 的消費層（`src/api/*`）。
- 開發環境 API Rewrite 代理、生產環境 Static Export + Nginx 容器。
- 多語系系統資源（透過 Redux store 管理繁中 / 英文切換）。

不涵蓋：

- 後端服務（部署於 `https://guangxun.net` 背後獨立的 API 服務，不在此 repo）。
- CMS / 後台管理介面。

## Architecture

```
┌────────────────────────────────────────────────────────────────┐
│  Browser                                                       │
│    │                                                           │
│    ▼                                                           │
│  Nginx (container :80) ──► Static Export (out/)                │
│                            │                                   │
│                            ▼                                   │
│                      Next.js App Router                        │
│                       ├─ src/app/(main)/* (pages)              │
│                       ├─ src/components/{ui,layout,sections}   │
│                       ├─ src/store (Redux Toolkit)             │
│                       └─ src/api/* (client / services / mapper)│
│                                │                               │
│                                ▼                               │
│                         Backend API (外部)                     │
└────────────────────────────────────────────────────────────────┘
```

**關鍵設計**：

- **App Router + Static Export**：生產環境 `next build` 產出 `out/`，由 Nginx 託管；開發環境保留 SSR / HMR。
- **API 分層**：`client.ts` (ofetch) → `services/*.service.ts` → `mapper/*.mapper.ts` → UI，DTO 與 Domain Model 分離。
- **多語系**：`SystemInitializer` 監聽語言變化，向 Redux store 寫入語系資源，UI 層消費。
- **主題**：`next-themes` + Tailwind CSS 4 + shadcn/ui (Radix Primitives)。
- **表單**：`react-hook-form` + `zod` schema 驗證。

## Project Structure

```
resource-mapping/
├─ src/
│  ├─ app/                       # Next.js App Router
│  │  ├─ (main)/                 # 主要公開頁面群
│  │  │  ├─ about/
│  │  │  ├─ cases/
│  │  │  ├─ contact/
│  │  │  ├─ live-view/
│  │  │  ├─ products/[slug]/
│  │  │  ├─ solutions/
│  │  │  └─ support/
│  │  ├─ layout.tsx              # Root layout, metadata, providers
│  │  ├─ page.tsx                # 首頁
│  │  ├─ error.tsx / not-found.tsx / loading.tsx
│  │  └─ globals.css
│  ├─ api/                       # HTTP 層
│  │  ├─ client.ts               # ofetch instance
│  │  ├─ url.ts                  # endpoint 常數
│  │  ├─ services/               # 呼叫端
│  │  ├─ mapper/                 # DTO ↔ Domain
│  │  ├─ request/                # Request DTO
│  │  └─ response/               # Response DTO
│  ├─ components/
│  │  ├─ ui/                     # shadcn/ui primitives
│  │  ├─ layout/                 # Header / Footer / Breadcrumb
│  │  └─ sections/               # 頁面區塊
│  ├─ store/                     # Redux Toolkit
│  ├─ provider/                  # Redux / Theme Provider
│  ├─ schema/                    # zod schemas
│  ├─ hooks/ · lib/ · utils/ · config/ · type/
│  └─ mock/                      # 開發期 mock 資料
├─ scripts/
│  └─ generate-product-slugs.ts  # prebuild hook: 產生產品 slug
├─ public/                       # 靜態資產 (圖片、icon、svg)
├─ Dockerfile                    # multi-stage: node:20-alpine → nginx:alpine
├─ docker-compose.yml            # 本機容器啟動
├─ nginx.conf                    # SPA 路由 + /api 反代
├─ next.config.ts                # static export / image / rewrites
├─ tailwind.config.ts
├─ tsconfig.json                 # paths: "@/*": ["./src/*"]
├─ repo.manifest.yaml            # 機器可解析的專案 metadata
└─ package.json
```

## Runbook

### Prerequisites

- Node.js 20+
- npm 10+
- （選用）Docker 24+ 與 docker-compose

### Install

```bash
npm install
```

### Develop

```bash
# 代理到正式環境後端 (https://guangxun.net)
npm run dev

# 代理到本機後端 (http://localhost:3000)
npm run dev:local
```

開發伺服器監聽 **`http://localhost:3006`**；
`/api/v1/*` 會透過 Next rewrites 代理至後端，避免 CORS。

### Build

```bash
npm run build            # 會先執行 prebuild: 產生產品 slug
```

生產模式為 **Static Export**，輸出於 `out/`。

### Lint / Format

```bash
npm run lint             # ESLint 檢查
npm run lint:fix         # ESLint 自動修正
npm run format           # Prettier 格式化
npm run format:check     # Prettier 檢查
```

### Container

```bash
# 單獨建置
docker build -t resource-mapping-frontend .

# docker-compose (對外 http://localhost:3000 → container :80)
docker compose up -d --build
```

重建腳本：

```bash
./rebuild.sh
```

## Interfaces

| Interface      | 狀態 | 說明                                         |
| -------------- | ---- | -------------------------------------------- |
| Web UI         | ✅   | 公開企業官網                                 |
| Static Export  | ✅   | `next build` 生成 `out/` 給 Nginx 託管       |
| i18n           | ✅   | 繁中 / 英文 (Redux store 驅動)               |
| SEO            | ✅   | Metadata / OpenGraph / Twitter Card / Robots |
| RWD            | ✅   | Mobile-first (Tailwind CSS 4)                |
| Backend API    | 🔗   | 消費外部 API；本 repo 不包含後端實作         |
| Public API     | ❌   | 本 repo 不對外提供 API                       |
| Worker / Cron  | ❌   | 無                                           |

## Dependencies

**Runtime**

- `next@16.1.3`、`react@19.2.3`、`react-dom@19.2.3`
- `@reduxjs/toolkit@2` + `react-redux@9`
- `@radix-ui/react-*`（dialog、dropdown、popover、select、navigation-menu 等）
- `react-hook-form@7` + `@hookform/resolvers@5` + `zod@4`
- `ofetch@1`（HTTP client）
- `framer-motion@12`、`embla-carousel-react`、`lucide-react`、`sonner`、`vaul`、`cmdk`
- `next-themes`、`class-variance-authority`、`clsx`、`tailwind-merge`

**Dev / Tooling**

- `typescript@5`、`@types/react@19`、`@types/node@20`
- `tailwindcss@4` + `@tailwindcss/postcss`、`tailwindcss-animate`、`tw-animate-css`
- `eslint@9` + `eslint-config-next` + `@typescript-eslint/*`
- `prettier@3` + `eslint-config-prettier` + `eslint-plugin-prettier`
- `tsx@4`（執行 `scripts/generate-product-slugs.ts`）

**External**

- 後端 API：`https://guangxun.net`（開發預設代理目標）
- 圖片來源：`images.unsplash.com`（`next.config.ts` remote pattern 白名單）

## Notes

- **Port 約定**：dev `3006`、container `80`、host 對外 `3000`。
- **Prebuild 鉤子**：`npm run build` 之前會自動執行 `scripts/generate-product-slugs.ts` 生成產品 slug 清單。
- **Static Export 注意事項**：
  - 不支援 Server Actions、`dynamic = 'force-dynamic'`、Route Handlers 等需要伺服器的能力。
  - 所有 API 請求皆由 Client 端直接打向 `https://guangxun.net`。
- **Nginx SPA 路由**：`nginx.conf` 已加入 `try_files $uri $uri.html $uri/ /index.html;`，支援 Next export 的 `.html` 副檔名路由與 SPA fallback。
- **Portfolio 展示**：本 repo 之 `repo.manifest.yaml` 供 <https://jack755051.github.io/charlie_portfolio_frontend/portfolio> 解析並呈現於作品集卡片；README 頂部 YAML front matter 為精簡對照，完整結構化欄位以 manifest 為準。
- **無測試腳本**：目前 `package.json` 未定義 `test` 指令，屬已知待補項 (`unresolved_fields.commands.test`)。
- **歷史遺留命名**：`src/api/` 下如有 `resquest`（刻意保留拼寫）等既有命名，請沿用不得擅自修正。
