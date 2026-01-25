// ---------- Header__Brand Start -----------

import { AppRoute } from './route';

/**定義 Header Brand 的核心資料 (純資料) */
export interface HeaderBrandData {
  logo: {
    href: string;
    alt: string;
    src: string;
  };
  title?: string;
}

/**定義 Header Brand 的 Slot 樣式 (純樣式) */
export interface HeaderBrandClasses {
  title?: string;
  image?: string;
}

/**
 * 定義 Component 接收的 Props
 * 組件只需要關心樣式，因為資料是從 Hook 來的 (或者是選填的 override)
 */
export interface HeaderBrandProps {
  data: HeaderBrandData;
  className?: string;
  classNames?: HeaderBrandClasses;
}

// ---------- Header__Navigation Start -----------

export type HeaderNavigationItem = AppRoute;

export interface HeaderNavigationClasses {
  container?: string; // 最外層 nav
  list?: string; // ul
  item?: string; // li
  link?: string; // a
  active?: string;
}

export interface HeaderNavigationProps {
  items: HeaderNavigationItem[]; // Navigation 比較特別，它是陣列
  className?: string;
  classNames?: HeaderNavigationClasses;
}

// ---------- Header__Toolbar Start -----------

// ==== Header Search ====

/**定義 Header Search 的核心資料 (純資料) */
export interface HeaderSearchData {
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: string; // 可選：預設搜尋字串
}

/**定義 Header Search 的 Slot 樣式 (純樣式) */
export interface HeaderSearchClasses {
  wrapper?: string; // 最外層 (對應 InputGroup)
  input?: string; // 輸入框
  addon?: string; // 搜尋按鈕圖示區
}

/**
 * 定義 Component 接收的 Props
 * 組件只需要關心樣式，因為資料是從 Hook 來的 (或者是選填的 override)
 */
export interface HeaderSearchProps {
  data: HeaderSearchData; // <--- 統一命名為 data
  onSearch?: (value: string) => void; // 這是行為 (Event)，通常獨立於 data 之外
  className?: string;
  classNames?: HeaderSearchClasses;
}

// ==== Header User Nav ====

// === 1. 基礎單元 (Item & Trigger) ===

export type HeaderUserNavTrigger =
  | string
  | { src: string; alt: string; label: string };

export interface HeaderUserNavItem {
  label: string;
  icon?: string;
  shortcut?: string;
  onClick?: () => void;
  children?: HeaderUserNavItem[]; // 遞迴結構
}

export interface HeaderUserNavGroup {
  menuTitle?: string;
  menuItems: HeaderUserNavItem[];
}

// === 2. Data (資料結構) ===
export interface HeaderUserNavData {
  // 改名 Data
  trigger: HeaderUserNavTrigger;
  groups: HeaderUserNavGroup[];
}

// === 3. Classes (樣式插槽) ===
export interface HeaderUserNavClasses {
  trigger?: string; // 按鈕本體
  content?: string; // 下拉選單容器
  groupLabel?: string; // 群組標題
  item?: string; // 選項列 (li)
  icon?: string; // 圖示
  shortcut?: string; // 快捷鍵
}

// === 4. Props (組件介面) ===
export interface HeaderUserNavProps {
  data: HeaderUserNavData;
  className?: string; // 最外層定位用
  classNames?: HeaderUserNavClasses; // 內部微調用
}

// ---------- Header__Search Over -----------

export interface HeaderData {
  brand: HeaderBrandData;
  navigation: HeaderNavigationItem[];
  user: HeaderUserNav;
  search: HeaderSearchData;
}
