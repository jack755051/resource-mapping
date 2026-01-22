export interface HeaderNavigationItem {
    title: string;
    href: string;
    description?: string;
}

export interface HeaderBrand {
    logo: {
        href: string;
        alt: string;
        src: string;
    };
    title?: string;
}

// ---------- Header__UserNav Start -----------
// 1. 基礎的 Item 定義
export interface HeaderUserNavItem {
    label: string;
    icon?: string;     // icon 改為可選
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
