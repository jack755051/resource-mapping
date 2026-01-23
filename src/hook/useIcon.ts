import {
  LogOutIcon,
  LucideIcon,
  PlusIcon,
  SettingsIcon,
  UserIcon,
  SearchIcon,
} from 'lucide-react';

// 建議把 Map 移到外面，避免每次 render 都重建物件
const iconMap: Record<string, LucideIcon> = {
  plus: PlusIcon,
  settings: SettingsIcon,
  user: UserIcon,
  logout: LogOutIcon,
  search: SearchIcon,
  // ... 其他 icon
};

export function useIcon() {
  const getIcon = (name: string): LucideIcon | null => {
    // 轉小寫以防大小寫不一致
    const key = name.toLowerCase();
    return iconMap[key] || null;
  };

  return {
    getIcon,
  };
}
