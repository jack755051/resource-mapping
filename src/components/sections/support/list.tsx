'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    FileText,
    Download,
    HelpCircle,
    ChevronRight,
    FileCode,
    Wrench,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { cn, formatBytes } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';
import { useSupport } from '@/hooks/useSupport';

// Icon Helper
const getIcon = (type: string, category: string) => {
    if (category === 'firmware' || category === 'software')
        return <FileCode className="w-5 h-5 text-blue-600" />;
    if (category === 'faq')
        return <HelpCircle className="w-5 h-5 text-orange-500" />;
    if (category === 'manual')
        return <FileText className="w-5 h-5 text-primary" />;
    return <Wrench className="w-5 h-5 text-muted-foreground" />;
};

interface SupportListProps {
    className?: string;
    classNames?: {
        container?: string;
        listWrapper?: string;
        item?: string;
        itemIcon?: string;
        itemTitle?: string;
        itemMeta?: string;
        emptyState?: string;
        pagination?: string;
    };
}

export function SupportList({ className, classNames }: SupportListProps = {}) {
    const { t } = useTranslation();
    const { currentData, currentPage, totalPages, setCurrentPage } = useSupport();

    const data = currentData;

    return (
        <div className={cn("container mx-auto px-6 py-12 max-w-4xl", className, classNames?.container)}>
            {/* 列表內容區塊 */}
            <div className={cn("space-y-4 min-h-[400px]", classNames?.listWrapper)}>
                <AnimatePresence mode="popLayout">
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: index * 0.05 }}
                                className={cn(
                                    "group relative flex items-center gap-4 p-5 rounded-2xl border border-border/40 bg-card hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300",
                                    classNames?.item // 應用 item 樣式
                                )}
                            >
                                {/* Icon Box */}
                                <div
                                    className={cn(
                                        'w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors',
                                        'bg-muted/50 group-hover:bg-primary/5',
                                        classNames?.itemIcon // 應用 itemIcon 樣式
                                    )}
                                >
                                    {getIcon(item.type, item.category)}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Badge
                                            variant="outline"
                                            className="text-[10px] px-1.5 py-0 h-5 border-border/50 text-muted-foreground"
                                        >
                                            {item.type}
                                        </Badge>
                                        <span className={cn("text-xs text-muted-foreground", classNames?.itemMeta)}>
                                            {item.date}
                                        </span>
                                    </div>
                                    <h3 className={cn(
                                        "text-base md:text-lg font-bold text-foreground truncate group-hover:text-primary transition-colors",
                                        classNames?.itemTitle // 應用 itemTitle 樣式
                                    )}>
                                        {item.title}
                                    </h3>
                                </div>

                                {/* Action */}
                                <div className="shrink-0 flex items-center gap-3">
                                    {/* 修正 size 顯示邏輯：確保大於 0 才顯示 */}
                                    {item.size > 0 && (
                                        <span className={cn("hidden md:block text-sm text-muted-foreground font-mono", classNames?.itemMeta)}>
                                            {formatBytes(item.size)}
                                        </span>
                                    )}
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-full text-muted-foreground group-hover:text-primary group-hover:bg-primary/10"
                                    >
                                        {item.category === 'faq' ? (
                                            <ChevronRight className="w-5 h-5" />
                                        ) : (
                                            <Download className="w-5 h-5" />
                                        )}
                                    </Button>
                                </div>

                                {/* 隱形連結 */}
                                <a
                                    href="#"
                                    className="absolute inset-0"
                                    aria-label={`View ${item.title}`}
                                    onClick={(e) => e.preventDefault()}
                                ></a>
                            </motion.div>
                        ))
                    ) : (
                        /* Empty State */
                        <div className={cn("flex flex-col items-center justify-center py-20 text-center", classNames?.emptyState)}>
                            <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
                                <Search className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-bold">
                                {t('support.list.empty.title')}
                            </h3>
                            <p className="text-muted-foreground">
                                {t('support.list.empty.desc')}
                            </p>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* 分頁器 */}
            {totalPages > 1 && (
                <div className={cn("mt-12", classNames?.pagination)}>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
                                    }}
                                    className={cn(
                                        "cursor-pointer",
                                        currentPage === 1 && "pointer-events-none opacity-50"
                                    )}
                                />
                            </PaginationItem>

                            {Array.from({ length: totalPages }).map((_, i) => (
                                <PaginationItem key={i}>
                                    <PaginationLink
                                        href="#"
                                        isActive={currentPage === i + 1}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setCurrentPage(i + 1);
                                        }}
                                    >
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (currentPage < totalPages)
                                            setCurrentPage((prev) => prev + 1);
                                    }}
                                    className={cn(
                                        "cursor-pointer",
                                        currentPage === totalPages && "pointer-events-none opacity-50"
                                    )}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
}