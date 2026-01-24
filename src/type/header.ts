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
}

export interface HeaderNavigationProps {
  items: HeaderNavigationItem[]; // Navigation 比較特別，它是陣列
  className?: string;
  classNames?: HeaderNavigationClasses;
}

// ---------- Header__UserNav Start -----------

// 1. 基礎的 Item 定義
export interface HeaderUserNavItem {
  label: string;
  icon?: string; // icon 改為可選
  shortcut?: string; // shortcut 改為可選
  onClick?: () => void; // 預留點擊事件
  children?: HeaderUserNavItem[]; // 關鍵：遞迴結構
}

// 2. Group 定義
export interface HeaderUserNavGroup {
  menuTitle?: string; // Title 改為可選，有時候不需要標題
  menuItems: HeaderUserNavItem[];
}

// 3. Main Data 定義
export interface HeaderUserNav {
  trigger: HeaderUserNavTrigger;
  groups: HeaderUserNavGroup[]; // 建議改名 groups 比較語意化
}

// ... Trigger 相關定義保持不變
export type HeaderUserNavTrigger = string | UserNavTriggerAvatar;
export interface UserNavTriggerAvatar {
  src: string;
  alt: string;
  label: string;
}

// ---------- Header__UserNav Over -----------

// ---------- Header__Search Start -----------
export interface HeaderSearch {
  placeholder?: string;
  disabled?: boolean;
}

// ---------- Header__Search Over -----------

export interface HeaderData {
  brand: HeaderBrandData;
  navigation: HeaderNavigationItem[];
  user: HeaderUserNav;
  search: HeaderSearch;
}
