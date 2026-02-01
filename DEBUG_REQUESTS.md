# 请求诊断指南

## 如何确认这些请求的来源

### 1. 打开浏览器开发者工具

```
Chrome/Edge: F12 或 Cmd+Option+I (Mac)
```

### 2. 切换到 Network 标签

### 3. 刷新页面并观察请求

### 4. 筛选并分析请求

#### A. 页面预加载（正常）

**特征**：
- **Type**: `document` 或 `prefetch`
- **Initiator**: `Link prefetch` 或 `next/link`
- **URL**: `https://guangxun.net/contact`
- **Method**: `GET`
- **状态**: 通常 `200` 或 `304`

**例子**：
```
Request URL: https://guangxun.net/contact
Request Method: GET
Type: document (prefetch)
Initiator: Link prefetch
```

✅ **这是正常的 Next.js 优化行为**

#### B. API 调用（正确）

**特征**：
- **Type**: `xhr` 或 `fetch`
- **Initiator**: JavaScript 文件 (如 `contact.service.ts`)
- **URL**: `https://guangxun.net/api/v1/contact/locations`
- **Method**: `GET` 或 `POST`

**例子**：
```
Request URL: https://guangxun.net/api/v1/contact/locations
Request Method: GET
Type: xhr
Initiator: ofetch
Request Headers:
  Accept-Language: zh
  Content-Type: application/json
```

✅ **这是正确的 API 调用**

#### C. 错误的 API 调用（问题）

**特征**：
- **Type**: `xhr` 或 `fetch`
- **Initiator**: JavaScript 文件
- **URL**: `https://guangxun.net/contact` (没有 `/api/v1`)
- **状态**: 可能 `404` 或返回 HTML

**例子**：
```
Request URL: https://guangxun.net/contact  ← 缺少 /api/v1
Type: xhr
Initiator: contact.service.ts
Status: 404
```

❌ **这是问题，API 请求缺少前缀**

### 5. 诊断步骤

#### 步骤 1：检查请求类型

在 Network 标签中，点击可疑的请求，查看：

1. **Headers 标签** → `Request URL`
2. **Headers 标签** → `Request Method`
3. **Initiator 标签** → 查看是哪个文件发起的请求

#### 步骤 2：区分请求类型

| 条件 | 类型 | 是否正常 |
|------|------|---------|
| Type = `document` 且 Initiator 包含 `Link` | 页面预加载 | ✅ 正常 |
| Type = `xhr/fetch` 且 URL 包含 `/api/v1` | API 调用 | ✅ 正常 |
| Type = `xhr/fetch` 且 URL **不包含** `/api/v1` | 错误的 API | ❌ 问题 |

#### 步骤 3：如果是错误的 API 调用

查看 **Initiator** 栏，找到是哪个文件发起的请求：

```
Initiator: contact.service.ts:21
```

然后检查该文件的 `baseURL` 配置。

## 常见问题

### Q1: 看到 `https://guangxun.net/contact` 请求是正常的吗？

**答**：取决于请求类型：
- ✅ **Type = document/prefetch** → 正常，这是 Next.js 预加载页面
- ❌ **Type = xhr/fetch** → 问题，API 请求缺少 `/api/v1` 前缀

### Q2: 如何禁用页面预加载？

在 Link 组件上添加 `prefetch={false}`：

```tsx
<Link href="/contact" prefetch={false}>
  联系我们
</Link>
```

**注意**：禁用预加载会降低用户体验，因为页面切换会变慢。

### Q3: 如何确认 API 调用是否正确？

检查这些特征：

✅ **正确的 API 调用**：
```
URL: https://guangxun.net/api/v1/contact/locations
Headers:
  Content-Type: application/json
  Accept-Language: zh
```

❌ **错误的 API 调用**：
```
URL: https://guangxun.net/contact  ← 缺少 /api/v1
```

### Q4: 为什么页面预加载会触发请求？

Next.js 的性能优化策略：
1. 用户鼠标悬停在链接上时，预加载目标页面
2. 当用户点击链接时，页面已经加载好，切换更快
3. 这会产生一些网络请求，但可以提升用户体验

### Q5: 后端会触发这些请求吗？

**不会**。后端是被动的，只响应请求，不会主动发起 HTTP 请求到前端路由。

这些请求都是：
- ✅ 前端的 Next.js Link 预加载
- ✅ 前端的 API 服务调用

## 检查后端（确认没有问题）

让我们快速检查后端，确认它不会主动发起这些请求：

```bash
cd /Users/charlie010583/Desktop/01_private/resource-mapping-backend

# 搜索是否有 HTTP 客户端代码
grep -r "axios\|fetch\|http\." src/ 2>/dev/null

# 搜索是否有 guangxun.net
grep -r "guangxun" . 2>/dev/null
```

**预期结果**：应该找不到任何相关代码，因为后端不会主动请求前端。

## 解决方案总结

### 如果是页面预加载（正常）

**不需要修复**，这是 Next.js 的优化功能。

如果想禁用（不推荐）：
```tsx
<Link href="/contact" prefetch={false}>
```

### 如果是 API 调用缺少前缀（问题）

检查 API 服务文件：

```typescript
// ❌ 错误
const data = await ofetch('/contact/locations');

// ✅ 正确
const baseURL = '/api/v1';
const data = await ofetch('/contact/locations', { baseURL });
```

## 监控建议

### 设置 API 拦截器（调试用）

创建 `src/api/interceptor.ts`：

```typescript
import { ofetch } from 'ofetch';

export const api = ofetch.create({
  baseURL: '/api/v1',

  // 请求拦截
  onRequest({ request }) {
    console.log('[API Request]', request);
  },

  // 响应拦截
  onResponse({ response }) {
    console.log('[API Response]', response.status);
  },

  // 错误拦截
  onResponseError({ response }) {
    console.error('[API Error]', response.status, response.url);
  },
});
```

然后在服务中使用：

```typescript
import { api } from '@/api/interceptor';

export const ContactService = {
  handleGetLocations: async (lang: string) => {
    const data = await api('/contact/locations', {
      headers: { 'Accept-Language': lang },
    });
    return ContactMapper.toDomainList(data);
  },
};
```

这样可以在控制台清楚看到所有 API 调用。

## 快速检查命令

```bash
# 检查前端是否有硬编码的域名
cd /Users/charlie010583/Desktop/01_private/resource-mapping
grep -r "guangxun\.net" src/ 2>/dev/null

# 检查 API 服务的 baseURL 配置
grep -r "baseURL" src/api/ 2>/dev/null

# 检查环境变量
cat .env.local .env 2>/dev/null
```
