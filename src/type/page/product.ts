// src/type/page/product.ts

import { CommonFilter, contentProps } from '../common';
import { LocalizedString } from '../i18n';
import { ProductSpecItem } from './proudct-detail';

/** * 定義 Product Card 的核心資料
 */
export interface ProductCardData {
  id: string; // 新增：唯一識別碼 (例如: "1")
  slug: string; // 新增：網址友善名稱 (例如: "gc-ip50-w288")
  title: string;
  category: string;
  image: string;
  href: string; // 預先組好的連結
  specs: ProductSpecItem[];
  tags: string[];
}

// ... ProductCardClasses 和 ProductCardProps 維持不變
export interface ProductCardClasses {
  container?: string;
  imageWrapper?: string;
  image?: string;
  badge?: string;
  content?: string;
  title?: string;
  specsGrid?: string;
  footer?: string;
}

export interface ProductCardProps extends contentProps<
  ProductCardData,
  ProductCardClasses
> {}

// -------- 產品分類 -----------

export interface ProductCategory extends CommonFilter {}

export interface ProductCategoryClasses {
  container?: string;
  active?: string;
  inactive?: string;
}

export interface ProductCategoryProps extends contentProps<
  ProductCategory,
  ProductCategoryClasses
> {}
