'use client';

//utils
import { cn } from '@/lib/utils';

// hooks
import { useNavigation } from '@/hooks/useNavigation';
import { useHeader } from '@/hooks/useHeader';

// components
import Navigation from './navigation';
import Brand from './brand';
import Toolbar from './toolbar/toolbar';
import { LanguageSwitcher, Search, UserNav } from './toolbar';

export default function Header() {
  const { items: navigationItems } = useNavigation();
  const { headerBrand, headerUserNav, headerSearch, headerNavigation } =
    useHeader();

  // 定義搜尋邏輯 (Header 層級控制業務邏輯)
  const handleSearch = (value: string) => {
    console.log('User searched for:', value);
    // router.push(`/search?q=${value}`);
  };

  return (
    <header
      className={cn(
        // 1. 移除 justify-between
        // 2. 加入 gap-6 (或 gap-8) 讓 Brand 跟 Navigation 之間有適當間距
        'header__wrapper w-full flex items-center gap-6 py-2 px-6',

        // 凍結樣式保持不變
        'sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
      )}
    >
      {/* 左側第一部分：Logo */}
      {/* shrink-0 確保 Logo 不會被擠壓 */}
      <Brand className="header__content__brand shrink-0" data={headerBrand} />

      {/* 左側第二部分：導航 */}
      {/* 因為外層有 flex + gap-6，所以它會自然緊跟在 Logo 右邊 */}
      <Navigation
        className="header__content__navigation"
        classNames={{
          container: 'hidden md:block',
          list: 'gap-6 items-center',
          link: 'text-sm font-medium text-muted-foreground hover:text-foreground transition-colors',
        }}
        items={headerNavigation}
      />

      {/* 右側部分：工具列 */}
      {/* 關鍵：加上 ml-auto (margin-left: auto) */}
      {/* 這會吃掉中間所有剩餘空間，把 Toolbar 推到最右邊 */}
      <Toolbar className="ml-auto">
        <Search
          search={headerSearch}
          onSearch={handleSearch}
          className="hidden md:flex"
        />

        <LanguageSwitcher />

        <div className="h-4 w-[1px] bg-border mx-2 hidden md:block" />

        <UserNav data={headerUserNav} />
      </Toolbar>
    </header>
  );
}
