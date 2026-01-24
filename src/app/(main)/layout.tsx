import SiteBreadcrumb from '@/components/layout/site-breadcrumb';

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="flex flex-col w-full">
            {/* 1. 麵包屑：自動置頂 */}
            <SiteBreadcrumb />

            {/* 2. 統一的容器與留白：所有內頁自動繼承 */}
            {/* 這裡設定跟麵包屑一樣的 padding-x，確保對齊 */}
            <div className="container mx-auto px-6 py-12 md:py-16 fade-in animate-in duration-500">
                {children}
            </div>
        </div>
    );
}