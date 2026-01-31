# 静态网站 + Docker + Nginx 配置检查清单

## ✅ 已完成的配置

### Next.js 配置
- [x] `output: 'export'` - 静态导出模式
- [x] `images.unoptimized: true` - 禁用图片优化
- [x] `generateStaticParams()` - 动态路由预生成
- [x] `dynamicParams: false` - 限制只使用预定义路径

### Docker 配置
- [x] Node.js 20 - 满足 Next.js 16 要求
- [x] 多阶段构建 - 优化镜像大小
- [x] Alpine Linux - 最小化基础镜像
- [x] `.dockerignore` - 优化构建速度

### Nginx 配置
- [x] SPA 路由处理 - `try_files $uri $uri/ /index.html`
- [x] API 反向代理 - 解决 CORS
- [x] Gzip 压缩 - 减少传输大小
- [x] 静态资源缓存 - 提升性能
- [x] HTML 不缓存 - 确保获取最新版本

### 项目结构
- [x] 服务器组件 + 客户端组件分离
- [x] 静态路径配置文件
- [x] TypeScript 类型系统完整
- [x] API Mapper 层实现

## 📝 配置文件清单

| 文件 | 状态 | 说明 |
|------|------|------|
| `next.config.ts` | ✅ | 静态导出配置 |
| `Dockerfile` | ✅ | Node 20 + 多阶段构建 |
| `docker-compose.yml` | ✅ | 端口映射 3000:80 |
| `nginx-frontend.conf` | ✅ | 路由 + 代理 + 优化 |
| `.dockerignore` | ✅ | 优化构建 |
| `src/config/static-paths.ts` | ✅ | 动态路由配置 |
| `DEPLOY.md` | ✅ | 部署文档 |
| `rebuild.sh` | ✅ | 一键部署脚本 |

## 🔍 关键配置内容

### 1. next.config.ts

```typescript
const nextConfig: NextConfig = {
  output: "export",              // ✅ 静态导出
  images: {
    unoptimized: true,           // ✅ 禁用图片优化
  },
};
```

### 2. Dockerfile

```dockerfile
FROM node:20-alpine AS builder  # ✅ Node 20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build               # ✅ 生成 out/ 目录

FROM nginx:alpine               # ✅ Nginx 提供静态文件
COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx-frontend.conf /etc/nginx/conf.d/default.conf
```

### 3. 动态路由配置

```typescript
// src/app/(main)/products/[slug]/page.tsx
export async function generateStaticParams() {
  return PRODUCT_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;  // ✅ 只允许预定义路径
```

### 4. Nginx 核心配置

```nginx
# SPA 路由
location / {
    try_files $uri $uri/ /index.html;  # ✅ 重定向到 index.html
}

# API 代理
location /api/ {
    proxy_pass http://nginx.resource-mapping-backend.orb.local;  # ✅ 后端地址
}
```

## ⚠️ 需要注意的地方

### 动态路由限制
```typescript
// ❌ 错误：空数组会导致没有页面生成
export const PRODUCT_SLUGS: string[] = [];

// ✅ 正确：至少提供一个 slug
export const PRODUCT_SLUGS: string[] = [
  'example-product',
  'gc-ip50-w288',
];
```

### API 代理地址
```nginx
# ⚠️ 确保后端地址正确
location /api/ {
    # OrbStack 环境
    proxy_pass http://nginx.resource-mapping-backend.orb.local;

    # 或本地开发
    # proxy_pass http://host.docker.internal;
}
```

### 端口映射
```yaml
# ✅ 前端通过 3000 访问
ports:
  - "3000:80"

# ⚠️ 注意不要与后端 3000 冲突
```

## 🚀 部署流程

### 首次部署

```bash
# 1. 配置产品 slug
vim src/config/static-paths.ts

# 2. 一键部署
./rebuild.sh

# 3. 访问测试
open http://localhost:3000
```

### 日常更新

```bash
# 修改代码后重新部署
./rebuild.sh
```

### 故障排查

```bash
# 查看容器状态
docker-compose ps

# 查看日志
docker-compose logs -f frontend

# 进入容器检查
docker exec -it resource-mapping-frontend sh
ls /usr/share/nginx/html

# 检查 Nginx 配置
docker exec -it resource-mapping-frontend cat /etc/nginx/conf.d/default.conf
```

## 📊 构建产物检查

构建完成后应该生成：

```
out/
├── index.html
├── about.html
├── products.html
├── products/
│   └── example-product.html  # ✅ 静态生成的产品页面
├── _next/
│   └── static/
│       ├── chunks/
│       └── css/
└── ...
```

## 🎯 性能指标

### 预期结果

- ✅ 首屏加载时间 < 2s
- ✅ Gzip 压缩率 > 70%
- ✅ 静态资源缓存命中率 > 90%
- ✅ Docker 镜像大小 < 50MB

### 测试命令

```bash
# 检查 Gzip 是否启用
curl -H "Accept-Encoding: gzip" -I http://localhost:3000

# 检查缓存头
curl -I http://localhost:3000/products

# 检查镜像大小
docker images resource-mapping-frontend
```

## ✨ 最佳实践

1. **定期更新依赖**
   ```bash
   npm outdated
   npm update
   ```

2. **定期清理 Docker**
   ```bash
   docker system prune -a
   ```

3. **监控日志**
   ```bash
   docker-compose logs -f --tail=100
   ```

4. **备份配置**
   ```bash
   git add .
   git commit -m "Update configs"
   git push
   ```

## 🔗 相关文档

- [DEPLOY.md](./DEPLOY.md) - 详细部署说明
- [Next.js 静态导出文档](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Docker 最佳实践](https://docs.docker.com/develop/dev-best-practices/)
- [Nginx 配置指南](https://nginx.org/en/docs/)
