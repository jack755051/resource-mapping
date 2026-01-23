'use client';

//utils
import { cn } from '@/lib/utils';

// hooks
import { useNavigation } from '@/hook/useNavigation';
import { useHeader } from '@/hook/useHeader';

// components
import Navigation from './navigation';
import Brand from './brand';
import Toolbar from './toolbar/toolbar';
import { Search, UserNav } from './toolbar';


export default function Header() {
    const { items: navigationItems } = useNavigation();
    const { headerBrand, headerUserNav, headerSearch } = useHeader();

    // 定義搜尋邏輯 (Header 層級控制業務邏輯)
    const handleSearch = (value: string) => {
        console.log('User searched for:', value);
        // router.push(`/search?q=${value}`);
    };

    return (
        <header
            className={cn(
                'header__wrapper w-full items-center justify-between flex py-2 px-6',
                'sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
            )}
        >
            <Brand className="header__content__brand " {...headerBrand} />
            <Navigation
                className="header__content__navigation"
                classNames={{
                    container: 'hidden md:block', // 手機版隱藏，桌機版顯示
                    list: 'gap-6 items-center', // 控制間距
                    link: 'text-sm font-medium text-gray-600 hover:text-black', // 控制文字樣式
                }}
                items={navigationItems}
            />
            <Toolbar>
                {/* 1. 放入搜尋組件 */}
                <Search
                    search={headerSearch}
                    onSearch={handleSearch}
                    className="hidden md:flex" // 可以控制只有桌機顯示搜尋
                />

                {/* 2. 放入分隔線 (如果需要) */}
                <div className="h-4 w-[1px] bg-border mx-2 hidden md:block" />

                {/* 3. 放入使用者選單 */}
                {/* 注意：這裡直接傳 props 給 UserNav，而不是傳給 Toolbar */}
                <UserNav data={headerUserNav} />
            </Toolbar>
        </header>
    );
}
