'use client';

import { FileText, Download, FileCode, FileArchive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn, formatBytes } from '@/lib/utils';
import { ProductDownloadsProps } from '@/type/page/proudct-detail';
import { useTranslation } from '@/hooks/useTranslation';

export function ProductDownloads({
  props,
  className,
  classNames,
}: ProductDownloadsProps) {
  const { t } = useTranslation();
  const { downloads } = props;
  const { container, title, downloadsGrid } = classNames || {};

  if (!downloads || downloads.length === 0) return null;

  return (
    <div className={cn('space-y-6', className, container)}>
      <h3 className={cn('text-lg font-bold flex items-center gap-2', title)}>
        <Download className="w-5 h-5 text-primary" />
        {t('productDetail.downloads.title')}
      </h3>

      <div className={cn('grid gap-3', downloadsGrid)}>
        {downloads.map((item, idx) => (
          <div
            key={idx}
            className="group relative flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card hover:border-primary/30 hover:shadow-md transition-all duration-300"
          >
            {/* 檔案類型 Icon */}
            <div
              className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors',
                item.type === 'PDF'
                  ? 'bg-accent-red/10 text-accent-red'
                  : item.type === 'Driver' || item.type === 'Firmware'
                    ? 'bg-accent-blue/10 text-accent-blue'
                    : 'bg-muted text-muted-foreground'
              )}
            >
              {item.type === 'PDF' ? (
                <FileText className="w-5 h-5" />
              ) : item.type === 'Driver' ? (
                <FileCode className="w-5 h-5" />
              ) : (
                <FileArchive className="w-5 h-5" />
              )}
            </div>

            {/* 檔案資訊 */}
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm text-foreground truncate group-hover:text-primary transition-colors">
                {item.title}
              </h4>
              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground font-mono">
                <span className="bg-muted px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider">
                  {item.type}
                </span>
                <span>{formatBytes(item.size)}</span>
                <span className="hidden sm:inline-block">• {item.date}</span>
              </div>
            </div>

            {/* 下載按鈕 */}
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 text-muted-foreground group-hover:text-primary"
            >
              <Download className="w-4 h-4" />
            </Button>

            {/* 隱形連結 */}
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="absolute inset-0"
              aria-label={t('productDetail.downloads.aria', {
                title: item.title,
              })}
            ></a>
          </div>
        ))}
      </div>
    </div>
  );
}
