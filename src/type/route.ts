import { LucideIcon } from 'lucide-react';

export interface AppRoute {
  title: string; // 顯示名稱
  href: string; // 路徑
  icon?: string; // Icon 名稱 (對應你的 useIcon)
  hideInMenu?: boolean; // 是否在導航列隱藏 (例如 404 頁面或詳情頁)
  disabled?: boolean; // 是否禁用

  // 類似 Angular 的 data 屬性，放額外資訊
  data?: {
    role?: string[]; // 權限控制
    description?: string;
  };

  // 支援巢狀路由 (為了 Breadcrumb 或 Sidebar)
  children?: AppRoute[];

  // 如果是按鈕而不是連結 (例如登出)
  onClick?: () => void;
}
