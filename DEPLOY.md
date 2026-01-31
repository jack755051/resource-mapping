# 部署说明

## 架构概述

```
┌─────────────────────────────────────────────────────────┐
│                    用户浏览器                              │
│                  (http://localhost:3000)                 │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│               Nginx (前端容器) :80                         │
│  ┌────────────────────┬──────────────────────────────┐  │
│  │   静态文件服务      │    API 反向代理               │  │
│  │   /products/*      │    /api/* → 后端 Nginx       │  │
│  │   /about           │                              │  │
│  │   /contact         │                              │  │
│  └────────────────────┴──────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                        │
                        │ (API 请求)
                        ▼
┌─────────────────────────────────────────────────────────┐
│          后端 Nginx (resource-mapping-backend)           │
│                  /api/v1/products                        │
│                  /api/v1/office-types                    │
└─────────────────────────────────────────────────────────┘
```

## 技术栈

- **框架**: Next.js 16 (App Router)
- **渲染模式**: 静态导出 (Static Site Generation)
- **容器**: Docker + Docker Compose
- **Web 服务器**: Nginx
- **Node.js**: 20+

## 项目特点

### ✅ 静态网站
- 使用 `output: 'export'` 配置
- 构建时生成所有 HTML 文件到 `out/` 目录
- 无需 Node.js 运行时，纯静态文件服务
- SEO 友好，首屏加载快

### ✅ Docker 容器化
- 多阶段构建优化镜像大小
- 第一阶段：编译 Next.js 项目
- 第二阶段：使用 Nginx Alpine 提供静态文件

### ✅ Nginx 反向代理
- SPA 路由处理（避免 404）
- API 代理到后端（解决 CORS）
- Gzip 压缩
- 静态资源缓存

## 构建与部署

### 方式一：使用脚本（推荐）

```bash
# 一键构建并启动
./rebuild.sh
```

### 方式二：手动步骤

```bash
# 1. 本地测试构建
npm run build

# 2. 停止现有容器
docker-compose down

# 3. 构建并启动容器
docker-compose up -d --build

# 4. 查看日志
docker-compose logs -f frontend

# 5. 查看运行状态
docker-compose ps
```

## 访问地址

- **前端**: http://localhost:3000
- **后端 API** (通过前端代理): http://localhost:3000/api/v1

## 文件说明

### 核心配置文件

| 文件 | 说明 |
|------|------|
| `next.config.ts` | Next.js 配置（output: 'export'） |
| `Dockerfile` | Docker 多阶段构建配置 |
| `docker-compose.yml` | 容器编排配置 |
| `nginx-frontend.conf` | Nginx 配置（路由 + 代理） |
| `.dockerignore` | 减少构建上下文大小 |
| `src/config/static-paths.ts` | 静态路径配置 |

### 目录结构

```
resource-mapping/
├── src/
│   ├── app/                    # Next.js App Router
│   │   └── (main)/
│   │       ├── products/
│   │       │   ├── page.tsx
│   │       │   └── [slug]/     # 动态路由
│   │       │       ├── page.tsx
│   │       │       └── product-detail-content.tsx
│   │       ├── about/
│   │       ├── contact/
│   │       └── ...
│   ├── components/             # React 组件
│   ├── hooks/                  # 自定义 Hooks
│   ├── api/                    # API 客户端
│   ├── config/                 # 配置文件
│   └── type/                   # TypeScript 类型
├── public/                     # 静态资源
├── Dockerfile                  # Docker 构建文件
├── docker-compose.yml          # 容器编排
├── nginx-frontend.conf         # Nginx 配置
└── rebuild.sh                  # 一键部署脚本
```

## 动态路由处理

### 产品详情页 (`/products/[slug]`)

由于使用静态导出，所有动态路由必须预先生成。

**配置文件**: `src/config/static-paths.ts`

```typescript
export const PRODUCT_SLUGS: string[] = [
  'example-product',
  'gc-ip50-w288',
  'smart-eye-x1',
  // 添加更多产品 slug
];
```

**构建时生成**:
- 构建时会为每个 slug 生成静态 HTML
- 访问未定义的 slug 会显示 404

## 环境变量

创建 `.env.local` 文件：

```env
# API 端点（通过 Nginx 代理，相对路径）
NEXT_PUBLIC_API_URL=/api
```

## 常见问题

### Q1: 修改代码后如何重新部署？

```bash
./rebuild.sh
```

### Q2: 如何添加新的产品页面？

1. 在 `src/config/static-paths.ts` 中添加产品 slug
2. 重新构建: `./rebuild.sh`

### Q3: 如何查看容器日志？

```bash
docker-compose logs -f frontend
```

### Q4: 如何停止容器？

```bash
docker-compose down
```

### Q5: 构建失败怎么办？

```bash
# 清理缓存
rm -rf .next out node_modules

# 重新安装依赖
npm install

# 本地测试构建
npm run build

# 如果本地成功，再用 Docker
./rebuild.sh
```

## 性能优化

### 已实现

- ✅ Gzip 压缩（减少传输大小）
- ✅ 静态资源缓存（1年）
- ✅ HTML 不缓存（确保获取最新版本）
- ✅ Docker 多阶段构建（减小镜像）
- ✅ `.dockerignore`（加快构建速度）

### 可进一步优化

- [ ] 添加 Brotli 压缩
- [ ] 使用 CDN 托管静态资源
- [ ] 图片优化（WebP、AVIF）
- [ ] 代码分割优化

## 生产环境部署

### 修改配置

1. **更新 API 代理地址** (`nginx-frontend.conf`):
   ```nginx
   location /api/ {
       proxy_pass https://api.yourdomain.com;
   }
   ```

2. **配置域名** (`nginx-frontend.conf`):
   ```nginx
   server_name yourdomain.com www.yourdomain.com;
   ```

3. **启用 HTTPS**:
   - 使用 Let's Encrypt 或其他 SSL 证书
   - 修改 Nginx 配置添加 SSL

4. **更新 docker-compose.yml**:
   ```yaml
   ports:
     - "80:80"
     - "443:443"
   volumes:
     - ./ssl:/etc/nginx/ssl  # SSL 证书
   ```

## 监控与维护

```bash
# 查看容器状态
docker-compose ps

# 查看资源使用
docker stats resource-mapping-frontend

# 重启容器
docker-compose restart frontend

# 更新镜像
docker-compose pull
docker-compose up -d
```

## 备份与回滚

```bash
# 备份当前镜像
docker save resource-mapping-frontend > backup.tar

# 回滚到之前的镜像
docker load < backup.tar
docker-compose up -d
```

## 技术支持

- Next.js 文档: https://nextjs.org/docs
- Docker 文档: https://docs.docker.com
- Nginx 文档: https://nginx.org/en/docs
