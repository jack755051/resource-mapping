'use client';

// hooks
import { useNavigation } from '@/hook/useNavigation';
import { useHeader } from '@/hook/useHeader';

// components
import HeaderNavigation from './headerNavigation';
import HeaderBrand from './headerBrand';
import HeaderToolbar from './headerToolbar';

export default function Header() {
    const { items: navigationItems } = useNavigation();
    const { headerBrand } = useHeader();

    return (
        <header className="header__wrapper w-full items-center justify-between flex py-2">
            <HeaderBrand className="header__content__brand " {...headerBrand} />
            <HeaderNavigation
                className="header__content__navigation"
                classNames={{
                    container: "hidden md:block", // 手機版隱藏，桌機版顯示
                    list: "gap-6 items-center",   // 控制間距
                    link: "text-sm font-medium text-gray-600 hover:text-black" // 控制文字樣式
                }}
                items={navigationItems}
            />
            <HeaderToolbar />
        </header>
    );
}
