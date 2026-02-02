# 系统参数管理架构 (System Params Architecture)

## ✅ 完成的优化

成功创建了 **SystemParamsProvider** 统一管理系统级别的参数数据，实现了：
1. ✅ 系统初始化时自动载入参数
2. ✅ 语系切换时自动重新载入参数
3. ✅ 统一的数据源和 Loading 状态管理
4. ✅ 错误处理（Fallback 到 Mock 数据）

---

## 🎯 问题分析

### ❌ 优化前的问题

**SupportCategories 在组件级别管理**：

```tsx
// useSupport.ts - 每个组件实例都自己获取分类
export function useSupport() {
  const [rawCategories, setRawCategories] = useState<SupportCategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await SupportService.handleGetSupportCategories(language);
      setRawCategories(data);
    };
    fetchCategories();
  }, []); // ❌ 没有监听 language 变化
}
```

**问题**：
1. 🔴 **语系切换不响应**：分类只在组件挂载时获取一次，切换语系后标签不更新
2. 🔴 **重复获取**：如果多个组件使用 useSupport，会发送多次相同的 API 请求
3. 🔴 **数据不统一**：SupportCategories 是系统配置参数，不是组件数据，应该在系统级别管理

---

## ✅ 优化后的架构

### 核心概念：系统参数 vs 组件数据

| 类型 | 特征 | 管理方式 | 示例 |
|------|------|----------|------|
| **系统参数** | 全局配置，不常变化，多处使用 | SystemParamsProvider | SupportCategories, ProductCategories |
| **组件数据** | 用户操作驱动，频繁变化，组件独立 | 组件级 State/Hook | SupportList, ProductList |

### 架构设计

```
┌─────────────────────────────────────────┐
│  RootLayout (app/layout.tsx)            │
│  ├─ ReduxProvider                       │
│  │  └─ LanguageProvider                 │
│  │     └─ SystemParamsProvider  ← 🔥 新增 │
│  │        └─ App Content                │
└─────────────────────────────────────────┘

SystemParamsProvider 职责：
1. 监听 language 变化
2. 自动载入系统参数
3. 提供统一数据源
```

---

## 📁 实现详情

### 1. **SystemParamsProvider** (system-params-provider.tsx)

```tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLanguage } from './language-provider';
import { SupportService } from '@/api/services/support.service';
import { SupportCategory } from '@/type/page/support';

interface SystemParamsContextType {
  // Support 相关
  supportCategories: SupportCategory[];
  isSupportCategoriesLoading: boolean;
  refetchSupportCategories: () => Promise<void>;

  // 未来可扩充：
  // productCategories: ProductCategory[];
  // officeCategories: OfficeCategory[];
}

export function SystemParamsProvider({ children }) {
  const { language } = useLanguage();
  const [supportCategories, setSupportCategories] = useState([]);
  const [isSupportCategoriesLoading, setIsSupportCategoriesLoading] = useState(true);

  const fetchSupportCategories = async () => {
    setIsSupportCategoriesLoading(true);
    try {
      const data = await SupportService.handleGetSupportCategories(language);
      setSupportCategories(data);
    } catch (error) {
      console.warn('[SystemParams] API Failed, using Mock Data.');
      setSupportCategories(SupportMapper.toDomainCategoryList(MOCK_SUPPORT_CATEGORIES));
    } finally {
      setIsSupportCategoriesLoading(false);
    }
  };

  // 🔥 核心：监听语系变化，自动重新载入参数
  useEffect(() => {
    fetchSupportCategories();
  }, [language]); // 依赖 language

  // ...
}
```

**关键特性**：
- ✅ **依赖 language**: `useEffect` 监听 `language` 变化
- ✅ **自动重新加载**: 语系切换时自动重新获取数据
- ✅ **统一数据源**: 所有组件共享同一份数据
- ✅ **Loading 状态**: 提供统一的 Loading 状态管理
- ✅ **错误处理**: API 失败时 Fallback 到 Mock 数据

---

### 2. **RootLayout 集成** (app/layout.tsx)

```tsx
import { LanguageProvider } from '@/provider/language-provider';
import { SystemParamsProvider } from '@/provider/system-params-provider';
import { ReduxProvider } from '@/provider/ReduxProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <LanguageProvider>
            <SystemParamsProvider>  {/* 🔥 新增：在 LanguageProvider 之后 */}
              <div className="relative flex min-h-screen flex-col bg-background">
                <Header />
                <main className="flex-1 flex flex-col">{children}</main>
                <Footer />
              </div>
            </SystemParamsProvider>
          </LanguageProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
```

**Provider 层级顺序**：
```
ReduxProvider
  └─ LanguageProvider        (提供 language 状态)
      └─ SystemParamsProvider (依赖 language，监听变化)
          └─ App Content
```

---

### 3. **useSupport 重构** (hooks/useSupport.ts)

**优化前**（87 行）：
```tsx
export function useSupport() {
  const { t, language } = useTranslation();

  // ❌ 组件级别管理分类数据
  const [rawCategories, setRawCategories] = useState<SupportCategory[]>([]);
  const [isLoadingCats, setIsLoadingCats] = useState(false);

  // ❌ 每次组件挂载都获取一次
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCats(true);
      const data = await SupportService.handleGetSupportCategories(language);
      setRawCategories(data);
      setIsLoadingCats(false);
    };
    fetchCategories();
  }, []); // ❌ 没有监听 language 变化

  // ...
}
```

**优化后**（70 行，-20%）：
```tsx
export function useSupport() {
  const { t, language } = useTranslation();

  // ✅ 从 SystemParamsProvider 获取分类数据
  const {
    supportCategories: rawCategories,
    isSupportCategoriesLoading: isLoadingCats
  } = useSystemParams();

  // ✅ 无需自己管理分类状态
  // ✅ 自动响应语系变化
  // ✅ 共享数据，避免重复请求

  // 只负责管理列表数据
  const [resources, setResources] = useState<SupportResource[]>([]);
  // ...
}
```

**优势对比**：

| 项目 | 优化前 | 优化后 |
|------|--------|--------|
| **代码行数** | 87 行 | 70 行 (-20%) |
| **状态管理** | 组件级（每个实例独立） | 系统级（全局共享） |
| **语系响应** | ❌ 不响应 | ✅ 自动响应 |
| **重复请求** | ❌ 多个组件多次请求 | ✅ 全局共享，一次请求 |
| **Loading 状态** | 组件独立管理 | 统一管理 |
| **职责清晰度** | 混合（分类 + 列表） | 清晰（只管列表） |

---

## 🔄 数据流示意

### 语系切换时的自动更新流程

```
用户点击语系切换按钮
  ↓
LanguageProvider.setLanguage('en')
  ↓
language 状态变化 (Context 通知所有订阅者)
  ↓
┌─────────────────────────────────────────┐
│ SystemParamsProvider                    │
│   useEffect(() => {                     │
│     fetchSupportCategories();  ← 🔥 自动执行 │
│   }, [language]);                       │
│                                         │
│   API: GET /support-categories?lang=en  │
│   ↓                                     │
│   setSupportCategories(newData)         │
└─────────────────────────────────────────┘
  ↓
所有使用 useSystemParams 的组件自动更新
  ↓
┌──────────────┬──────────────┐
│ useSupport   │ 其他组件     │
│ (自动获取)   │ (未来扩充)   │
└──────────────┴──────────────┘
  ↓
UI 自动显示新的分类标签 (英文 → 中文)
```

---

## 🎯 使用方式

### 在任意组件中使用系统参数

```tsx
import { useSystemParams } from '@/provider/system-params-provider';

export function MyComponent() {
  const {
    supportCategories,
    isSupportCategoriesLoading
  } = useSystemParams();

  if (isSupportCategoriesLoading) {
    return <div>Loading categories...</div>;
  }

  return (
    <div>
      {supportCategories.map(cat => (
        <div key={cat.id}>{cat.label.zh}</div>
      ))}
    </div>
  );
}
```

**优势**：
- ✅ 无需自己调用 API
- ✅ 自动响应语系变化
- ✅ 统一的 Loading 状态
- ✅ 数据全局共享

---

## 🚀 扩展性：未来可添加的参数

SystemParamsProvider 设计为可扩展架构，未来可轻松添加其他系统参数：

```tsx
interface SystemParamsContextType {
  // Support 相关
  supportCategories: SupportCategory[];
  isSupportCategoriesLoading: boolean;

  // 🔥 Product 相关（未来扩充）
  productCategories: ProductCategory[];
  isProductCategoriesLoading: boolean;

  // 🔥 Office 相关（未来扩充）
  officeCategories: OfficeCategory[];
  isOfficeCategoriesLoading: boolean;

  // 🔥 其他系统配置（未来扩充）
  systemConfig: SystemConfig;
  isSystemConfigLoading: boolean;
}

export function SystemParamsProvider({ children }) {
  const { language } = useLanguage();

  // Support Categories
  const [supportCategories, setSupportCategories] = useState([]);

  // 🔥 Product Categories
  const [productCategories, setProductCategories] = useState([]);

  // 🔥 Office Categories
  const [officeCategories, setOfficeCategories] = useState([]);

  useEffect(() => {
    // 并行加载所有参数
    Promise.all([
      fetchSupportCategories(),
      fetchProductCategories(),
      fetchOfficeCategories(),
    ]);
  }, [language]); // 语系变化时全部重新加载

  // ...
}
```

---

## 📊 性能优化

### 1. **避免重复请求**

**优化前**：
```
Support Page 组件 → API Request 1
Support Filter 组件 → API Request 2  (重复!)
Support List 组件 → API Request 3    (重复!)
```

**优化后**：
```
SystemParamsProvider → API Request 1 (唯一)
  ↓ (共享数据)
Support Page, Filter, List (无需请求)
```

### 2. **语系切换性能**

**优化前**：
```
切换语系 → 用户手动刷新页面 → 重新加载
```

**优化后**：
```
切换语系 → 自动触发 useEffect → 无感更新 UI
```

### 3. **Loading 状态统一**

**优化前**：
```
每个组件独立管理 Loading 状态 → 多个 Spinner
```

**优化后**：
```
SystemParamsProvider 统一 Loading → 单一 Loading 状态
```

---

## ✅ 验证清单

- [x] 创建 SystemParamsProvider
- [x] 添加到 RootLayout（LanguageProvider 之后）
- [x] 实现 language 变化监听
- [x] 实现自动重新加载逻辑
- [x] 提供 useSystemParams hook
- [x] 重构 useSupport 使用 SystemParams
- [x] 移除组件级别的分类获取逻辑
- [x] 添加错误处理（Fallback 到 Mock）
- [x] TypeScript 编译验证通过
- [x] 添加详细文档

---

## 📖 总结

### 核心改进

1. **系统参数集中管理**
   - SupportCategories 现在是系统级参数
   - 统一的数据源和 Loading 状态
   - 避免重复 API 请求

2. **自动响应语系变化**
   - 监听 `language` 状态
   - 自动重新载入参数
   - UI 无感更新

3. **职责清晰分离**
   - SystemParamsProvider: 管理系统参数
   - useSupport: 管理组件数据（列表、分页、搜索）
   - 组件: 纯展示

4. **可扩展架构**
   - 轻松添加新的系统参数
   - 统一的管理模式
   - 一致的错误处理

### 架构优势

✅ **Single Source of Truth**: 系统参数有唯一的数据源
✅ **Reactive**: 自动响应语系变化
✅ **Performant**: 避免重复请求，数据全局共享
✅ **Maintainable**: 职责清晰，易于扩展
✅ **Type-Safe**: 完整的 TypeScript 类型支持

### 下一步建议

1. **添加 ProductCategories 到 SystemParams**
   - 目前 ProductCategories 可能还在组件级别管理
   - 可以迁移到 SystemParamsProvider

2. **添加 OfficeCategories 到 SystemParams**
   - 统一所有分类参数的管理方式

3. **考虑添加 Loading UI**
   - 系统初始化时显示 Loading Skeleton
   - 提升用户体验

4. **添加重新加载功能**
   - 提供手动重新加载系统参数的能力
   - 用于错误恢复或数据刷新

---

## 🎨 架构对比

### Before: 组件级数据管理

```
useSupport (Component Level)
  ├─ Fetch Categories ❌
  ├─ Fetch List ✅
  └─ Manage States

useSupport (Component Level)
  ├─ Fetch Categories ❌ (重复!)
  ├─ Fetch List ✅
  └─ Manage States
```

### After: 系统级 + 组件级分离

```
SystemParamsProvider (System Level)
  ├─ Fetch Categories ✅
  └─ Listen to Language Changes ✅

useSupport (Component Level)
  ├─ Use Categories from SystemParams ✅
  ├─ Fetch List ✅
  └─ Manage List States ✅
```

**结论**: 系统参数和组件数据职责分离，架构更清晰！
