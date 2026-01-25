import { HeaderUserNavItem } from '@/type';
import { useIcon } from '@/hooks/useIcon';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';

interface ItemProps {
  item: HeaderUserNavItem;
  // 這裡我們只接收需要的樣式，避免傳入整個 HeaderUserNavClasses 太重
  classNames?: {
    item?: string;
    icon?: string;
    shortcut?: string;
  };
}

export function Item({ item, classNames }: ItemProps) {
  const { getIcon } = useIcon();
  const IconComponent = item.icon ? (getIcon(item.icon) as LucideIcon) : null;
  const hasChildren = item.children && item.children.length > 0;

  // 共用的 Icon 渲染邏輯
  const renderIcon = () =>
    IconComponent && (
      <IconComponent className={cn('mr-2 h-4 w-4', classNames?.icon)} />
    );

  // 1. 遞迴渲染 (有子選單)
  if (hasChildren) {
    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger className={classNames?.item}>
          {renderIcon()}
          <span>{item.label}</span>
        </DropdownMenuSubTrigger>

        <DropdownMenuSubContent>
          {item.children!.map((child, index) => (
            <Item
              key={`${child.label}-${index}`}
              item={child}
              classNames={classNames} // 關鍵：繼續往下傳遞樣式
            />
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    );
  }

  // 2. 一般項目 (葉節點)
  return (
    <DropdownMenuItem className={classNames?.item} onClick={item.onClick}>
      {renderIcon()}
      <span>{item.label}</span>
      {item.shortcut && (
        <DropdownMenuShortcut className={classNames?.shortcut}>
          {item.shortcut}
        </DropdownMenuShortcut>
      )}
    </DropdownMenuItem>
  );
}
