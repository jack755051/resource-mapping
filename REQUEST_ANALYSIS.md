# 请求分析和优化方案

## 📊 截图中的请求分类

### ✅ 必需的请求（无法禁用）

| 请求 | 类型 | 说明 | 可否禁用 |
|------|------|------|---------|
| `__next._tree.txt?_rsc=xxx` | Next.js RSC | React Server Components 路由树 | ❌ 不可 |
| `__next._head.txt?_rsc=xxx` | Next.js RSC | 页面头部元数据 | ❌ 不可 |
| `__next._index.txt?_rsc=xxx` | Next.js RSC | 页面索引 | ❌ 不可 |
| `__next._PAGE__.txt?_rsc=xxx` | Next.js RSC | 页面内容 | ❌ 不可 |

**这些是 Next.js 内部机制**：
- 用于客户端导航
- 即使使用静态导出也会出现
- 对用户体验至关重要
- **不应该也无法禁用**

### ⚠️ 可选的请求（可以禁用）

| 请求 | 类型 | 说明 | 可否禁用 |
|------|------|------|---------|
| `special-solutions` | 页面预加载 | Link prefetch | ✅ 可以 |
| `enterprise` | 页面预加载 | Link prefetch | ✅ 可以 |
| `history` | 页面预加载 | Link prefetch | ✅ 可以 |
| `about.txt?_rsc=xxx` | 页面预加载 | Next.js prefetch | ✅ 可以 |

**这些是页面预加载**：
- 提升用户体验（页面切换更快）
- 会增加一些网络请求
- 可以通过 `prefetch={false}` 禁用

### ❌ 异常的请求（需要修复）

| 请求 | 预期 URL | 实际 URL | 问题 |
|------|----------|----------|------|
| 产品列表 API | `/api/v1/products?page=1&limit=12` | `products?page=1&limit=12` | ❌ 缺少前缀 |
| 产品分类 API | `/api/v1/constants/products-categories` | `products-categories` | ❌ 缺少前缀 |

**这是严重问题**：
- API 调用缺少 `/api/v1` 前缀
- 会导致 404 错误
- 需要立即修复

### ❓ 未知的请求

| 请求 | 可能来源 | 建议 |
|------|----------|------|
| `rum` | 未知 | 需要排查 |

## 🔧 修复方案

### 1. 修复 API 前缀问题

#### 问题诊断

虽然你的服务文件中有 `baseURL = '/api/v1'`，但 `ofetch` 在某些情况下可能不会正确应用。

#### 解决方案：创建统一的 API 客户端

创建 `src/api/client.ts`：

```typescript
import { ofetch } from 'ofetch';

/**
 * 统一的 API 客户端
 * 确保所有 API 请求都带有正确的 baseURL
 */
export const apiClient = ofetch.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api/v1',

  // 请求拦截
  onRequest({ options }) {
    // 自动添加语言头
    const lang = localStorage.getItem('language') || 'zh';
    options.headers = {
      ...options.headers,
      'Content-Type': 'application/json',
      'Accept-Language': lang,
    };
  },

  // 错误处理
  onResponseError({ response }) {
    console.error('[API Error]', {
      url: response.url,
      status: response.status,
      statusText: response.statusText,
    });
  },
});
```

#### 更新所有服务文件

**product.service.ts**:
```typescript
import { apiClient } from '../client';
import { CommonUrl } from '../url';
import { ProductListResponse } from '../response/product.response';
import { ProductListReqDto } from '../request/product.request';
import { ProductMapper } from '../mapper/product.mapper';
import { PaginatedList } from '@/type/common';
import { ProductCardData } from '@/type/page/product';

export const ProductService = {
  handleGetProducts: async (
    params: ProductListReqDto,
    lang: string
  ): Promise<PaginatedList<ProductCardData>> => {
    const data = await apiClient<ProductListResponse>(CommonUrl.PRODUCTS, {
      method: 'GET',
      query: {
        page: params.page,
        limit: params.limit,
        category: params.category,
        keyword: params.keyword,
        sort: params.sort,
      },
      headers: {
        'Accept-Language': lang,
      },
    });

    return ProductMapper.toPaginatedList(data);
  },
};
```

**constants.service.ts**:
```typescript
import { apiClient } from '../client';
import { CommonUrl } from '../url';
import { ConstantProductsCategoriesResDto } from '../response/constant.response';

export const ConstantsService = {
  handleGetProductsCategories: async (
    language?: string
  ): Promise<ConstantProductsCategoriesResDto[]> => {
    const data = await apiClient<ConstantProductsCategoriesResDto[]>(
      CommonUrl.CONSTANTS_PRODUCTS_CATEGORIES,
      {
        method: 'GET',
        headers: {
          'Accept-Language': language ?? 'zh',
        },
      }
    );

    return data;
  },
};
```

同样更新所有其他服务文件：
- `contact.service.ts`
- `about.service.ts`
- `support.service.ts`

### 2. 禁用页面预加载（可选）

如果想减少网络请求，可以禁用 Link 预加载：

#### 方式一：全局禁用

在 `next.config.ts` 中：

```typescript
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  experimental: {
    // 禁用自动预加载
    optimizeCss: false,
  },
};
```

#### 方式二：针对特定链接禁用

已经在导航组件中添加了 `prefetch={false}`：

```tsx
<Link href={item.href} prefetch={false}>
  {t(item.title)}
</Link>
```

### 3. 排查 `rum` 请求

运行以下命令查找来源：

```bash
cd /Users/charlie010583/Desktop/01_private/resource-mapping

# 搜索可能的监控/分析代码
grep -r "analytics\|tracking\|monitoring\|rum" src/ package.json

# 检查是否有第三方脚本
grep -r "<script" src/app/
```

如果不需要，删除相关代码。

## 📋 优化建议

### 推荐配置（平衡性能和请求数量）

| 配置项 | 建议 | 原因 |
|--------|------|------|
| Next.js 内部请求 | ✅ 保留 | 必需，无法禁用 |
| Link prefetch | ⚠️ 主要页面保留，次要页面禁用 | 平衡性能和请求数 |
| API 请求 | ✅ 修复前缀问题 | 确保功能正常 |
| 监控/分析 | 视需求 | 生产环境可能需要 |

### 具体实施

#### 保留预加载的链接（主要导航）

```tsx
// 主导航 - 保留预加载
<Link href="/">首页</Link>
<Link href="/products">产品</Link>
<Link href="/solutions">解决方案</Link>
<Link href="/about">关于我们</Link>
<Link href="/contact">联系我们</Link>
```

#### 禁用预加载的链接（次要链接）

```tsx
// 次要链接 - 禁用预加载
<Link href="/special-solutions" prefetch={false}>特殊方案</Link>
<Link href="/enterprise" prefetch={false}>企业服务</Link>
<Link href="/cases" prefetch={false}>案例</Link>
```

## 📊 预期结果

### 修复前（当前状态）

```
请求数：~20 个
异常请求：2 个（缺少 /api/v1）
状态：❌ 有错误
```

### 修复后（使用统一客户端）

```
请求数：~18 个
异常请求：0 个
状态：✅ 正常
```

### 优化后（禁用部分预加载）

```
请求数：~10 个
异常请求：0 个
状态：✅ 正常，但页面切换可能稍慢
```

## 🎯 建议方案

**我的建议是**：

1. ✅ **立即修复 API 前缀问题**（创建统一客户端）
2. ✅ **保留 Next.js 内部请求**（必需）
3. ⚠️ **保留主要导航的预加载**（提升用户体验）
4. ✅ **禁用次要链接的预加载**（减少不必要的请求）
5. ⚠️ **排查并决定是否保留 `rum` 请求**

## 🚀 实施步骤

1. 创建 `src/api/client.ts`
2. 更新所有服务文件使用 `apiClient`
3. 在次要链接上添加 `prefetch={false}`
4. 重新构建和测试
5. 在浏览器 Network 标签中验证请求

## 验证清单

- [ ] 所有 API 请求都有 `/api/v1` 前缀
- [ ] 没有 404 错误
- [ ] 主要页面切换速度正常
- [ ] 请求数量合理（10-15 个）
- [ ] 没有未知的异常请求
