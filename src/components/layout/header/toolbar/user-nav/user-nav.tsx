'use client';

// type
import { HeaderUserNavProps } from '@/type'; // 使用標準 Props

// ui
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

// utils
import { cn } from '@/lib/utils';

// components
import { Trigger } from './trigger';
import { Item } from './item';

export default function UserNav({
  data, // 資料
  className, // 外層樣式 (定位)
  classNames, // 內部樣式 (微調)
}: HeaderUserNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            'relative h-8 w-8 rounded-full',
            classNames?.trigger, // 允許客製化按鈕樣式
            className
          )}
        >
          {/* 傳遞 className 給 Avatar 以確保大小一致 */}
          <Trigger trigger={data.trigger} className="h-8 w-8" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className={cn('w-56', classNames?.content)}
        align="end"
        forceMount
      >
        {data.groups.map((group, groupIndex) => (
          <div key={groupIndex}>
            {groupIndex > 0 && <DropdownMenuSeparator />}

            <DropdownMenuGroup>
              {group.menuTitle && (
                <DropdownMenuLabel className={classNames?.groupLabel}>
                  {group.menuTitle}
                </DropdownMenuLabel>
              )}

              {group.menuItems.map((item, itemIndex) => (
                <Item
                  key={`${item.label}-${itemIndex}`}
                  item={item}
                  // 只傳遞 Item 需要的樣式子集
                  classNames={{
                    item: classNames?.item,
                    icon: classNames?.icon,
                    shortcut: classNames?.shortcut,
                  }}
                />
              ))}
            </DropdownMenuGroup>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
