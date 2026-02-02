# Support Filters 修复总结

## 🐛 问题分析

用户反馈了两个问题：

### 1. 排序问题
**现象**: SupportFilters 的分类显示顺序混乱，没有按照后端返回的 `sort` 字段排序

**原因**: 前端没有使用后端的 `sort` 字段进行排序

### 2. 切换失败问题
**现象**: 无法切换分类，卡死在最后一个选项（"所有資源"）

**原因**:
1. **后端已经返回了 "所有資源" (value: "all", sort: 0)**
2. **前端又添加了一个 "all" 选项**（通过 `t('support.category.all')`）
3. 导致重复，切换逻辑混乱
4. **使用 UUID 作为 id**，而不是 `value` 字段，导致无法正确匹配

---

## ✅ 修复方案

### 1. 使用 `value` 作为 `id`

**修改前**:
```typescript
// Mapper 使用 UUID 作为 id
static toDomainCategory(dto: SupportCategoryResDto): SupportCategory {
    return {
        id: this.mapCategoryId(dto.id),  // ❌ UUID: "96a9d7b3-bc5a-460e-bfb3-10091b1cd8f8"
        label: dto.name
    };
}
```

**修改后**:
```typescript
// Mapper 使用 value 作为 id
static toDomainCategory(dto: SupportCategoryResDto): SupportCategory {
    return {
        id: dto.value,     // ✅ "all", "manual", "faq" 等
        label: dto.name,
        sort: dto.sort     // ✅ 保留排序字段
    };
}
```

**原因**:
- 使用 `value` 字段（如 "all", "manual"）作为 id，便于匹配和切换
- UUID 对前端没有意义，只是数据库主键

---

### 2. 移除前端重复的 "all" 选项

**修改前**:
```typescript
const uiCategories: FilterCategory[] = useMemo(() => {
    const allOption: FilterCategory = { id: 'all', label: t('support.category.all') };  // ❌ 重复！
    const apiOptions: FilterCategory[] = rawCategories.map(...);
    return [allOption, ...apiOptions];  // ❌ 有两个 "all"
}, [rawCategories, t]);
```

**修改后**:
```typescript
const uiCategories: FilterCategory[] = useMemo(() => {
    // ✅ 后端已经返回了 "all" 选项，不需要前端再添加
    return rawCategories
        .map(cat => ({
            id: cat.id,
            label: cat.label as string,
            sort: cat.sort
        }))
        .sort((a, b) => (a.sort ?? 999) - (b.sort ?? 999));  // ✅ 按 sort 排序
}, [rawCategories]);
```

**原因**:
- 后端数据中已经包含 `value: "all"` 的选项
- 前端不需要重复添加
- 统一由后端管理所有分类数据

---

### 3. 添加 `sort` 字段并排序

**修改的类型定义**:

```typescript
// CommonFilter 添加 sort 字段
export interface CommonFilter {
  id: string;
  label: string | LocalizedString;
  sort?: number;  // ✅ 新增
  // ...
}

// FilterCategory 添加 sort 字段
export interface FilterCategory {
    id: string;
    label: string;
    sort?: number;  // ✅ 新增
}

// SupportCategoryResDto 完善字段
export interface SupportCategoryResDto {
    id: string;
    name: string;
    value: string;  // ✅ 新增
    sort: number;   // ✅ 新增
    icon: string | null;
}
```

**排序逻辑**:
```typescript
.sort((a, b) => (a.sort ?? 999) - (b.sort ?? 999));  // 升序排序
```

---

### 4. 支持 "manuals" 复数形式

**修改前**:
```typescript
export type CategoryId = 'all' | 'manual' | 'firmware' | 'software' | 'faq';
```

**修改后**:
```typescript
export type CategoryId = 'all' | 'manual' | 'manuals' | 'firmware' | 'software' | 'faq';
```

**原因**: 后端返回的 value 是 "manuals"（复数），需要支持

---

## 📊 数据流

### 后端返回的数据
```json
{
    "data": [
        {
            "id": "339fed17-89ac-41a6-8805-7b53ceacd76f",
            "name": "所有資源",
            "value": "all",
            "sort": 0,
            "icon": null
        },
        {
            "id": "da92a4d7-5715-4144-b551-a9211e9025de",
            "name": "使用手冊",
            "value": "manuals",
            "sort": 1,
            "icon": null
        },
        {
            "id": "7fc3a6a8-329e-4ad5-9830-cbdd182c06ff",
            "name": "韌體更新",
            "value": "firmware",
            "sort": 2,
            "icon": null
        },
        {
            "id": "27b9cdb2-2364-4344-b262-b54e4960d442",
            "name": "軟體下載",
            "value": "software",
            "sort": 3,
            "icon": null
        },
        {
            "id": "96a9d7b3-bc5a-460e-bfb3-10091b1cd8f8",
            "name": "常見問題",
            "value": "faq",
            "sort": 4,
            "icon": null
        }
    ]
}
```

### Mapper 转换后
```typescript
[
    { id: "all", label: "所有資源", sort: 0 },
    { id: "manuals", label: "使用手冊", sort: 1 },
    { id: "firmware", label: "韌體更新", sort: 2 },
    { id: "software", label: "軟體下載", sort: 3 },
    { id: "faq", label: "常見問題", sort: 4 }
]
```

### UI 显示顺序（按 sort 排序）
```
1. 所有資源 (sort: 0)
2. 使用手冊 (sort: 1)
3. 韌體更新 (sort: 2)
4. 軟體下載 (sort: 3)
5. 常見問題 (sort: 4)
```

---

## 🔄 切换流程

### 修复前（失败）
```
用户点击 "使用手冊"
  ↓
setActiveCategory("使用手冊")  // ❌ 错误！应该是 id，不是 label
  ↓
activeCategory = "使用手冊"
  ↓
无法匹配到任何分类（因为 id 是 "manuals"）
  ↓
卡死！
```

### 修复后（成功）
```
用户点击 "使用手冊"
  ↓
setActiveCategory("manuals")  // ✅ 使用 value 作为 id
  ↓
activeCategory = "manuals"
  ↓
API 调用: GET /supports?category=manuals
  ↓
显示对应的资源列表
  ✅ 成功！
```

---

## 📝 修改的文件清单

### 1. **类型定义**
- `src/type/common.ts` - 添加 `sort` 字段到 CommonFilter
- `src/type/page/support.ts` - 添加 "manuals" 到 CategoryId
- `src/hooks/useSupport.ts` - FilterCategory 添加 `sort` 字段

### 2. **API 响应**
- `src/api/response/support.response.ts` - 完善 SupportCategoryResDto 字段

### 3. **Mapper**
- `src/api/mapper/support.mapper.ts` - 使用 `value` 作为 `id`，保留 `sort`

### 4. **Hooks**
- `src/hooks/useSupport.ts` - 移除重复的 "all" 选项，添加排序逻辑

### 5. **Mock 数据**
- `src/mock/support.ts` - 添加 `value` 和 `sort` 字段

---

## ✅ 验证清单

- [x] 修复排序问题 - 按 `sort` 字段升序排序
- [x] 修复切换问题 - 使用 `value` 作为 `id`
- [x] 移除重复的 "all" 选项
- [x] 添加 `sort` 字段到类型定义
- [x] 支持 "manuals" 复数形式
- [x] 前端编译验证通过
- [ ] **待测试**: 实际页面切换功能
- [ ] **待测试**: 语系切换时排序是否正常

---

## 🎯 预期效果

1. ✅ **正确排序**: 分类按 sort 字段显示：所有資源 → 使用手冊 → 韌體更新 → 軟體下載 → 常見問題
2. ✅ **正常切换**: 点击任意分类都能正确切换并加载对应数据
3. ✅ **语系响应**: 切换语系时，分类标签自动更新，排序保持不变
4. ✅ **无重复选项**: 只有一个 "所有資源" 选项

---

## 🚀 测试步骤

1. 刷新前端页面
2. 导航到 Support 页面
3. **验证排序**: 检查分类顺序是否为：所有資源 → 使用手冊 → 韌體更新 → 軟體下載 → 常見問題
4. **验证切换**: 依次点击每个分类，确认能正常切换
5. **验证数据**: 每个分类应显示对应的资源列表
6. **验证语系**: 切换中英文，分类标签应自动更新

---

## 📖 总结

### 核心问题
1. 使用了错误的字段作为 id（UUID 而不是 value）
2. 前端重复添加了后端已有的 "all" 选项
3. 没有使用后端的 sort 字段排序

### 解决方案
1. ✅ 使用 `value` 作为 `id`（"all", "manual" 等）
2. ✅ 移除前端重复的 "all" 选项
3. ✅ 按 `sort` 字段排序
4. ✅ 统一由后端管理所有分类数据

### 架构改进
- **单一数据源**: 所有分类都由后端提供，包括 "all"
- **类型安全**: 完善了 DTO 和 Domain Model 的字段定义
- **灵活排序**: 后端可以通过修改 sort 字段调整显示顺序
