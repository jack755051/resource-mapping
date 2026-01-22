'use client';

// ui
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

// type
import { HeaderUserNav } from '@/type';

// utils
import { cn } from '@/lib/utils';

// components
import { UserNavTrigger } from './user-nav-trigger';
import { UserNavMenuItem } from './user-nav-item';

import { useIcon } from '@/hook/useIcon';


export interface UserNavigationClasses {
  trigger?: string;      // 按鈕
  content?: string;      // 下拉選單容器
  groupLabel?: string;   // 群組標題
  item?: string;         // 選項 (會傳給子組件)
  icon?: string;         // icon (會傳給子組件)
  shortcut?: string;     // 快捷鍵文字 (會傳給子組件)
}

interface UserNavigationProps {
  data: HeaderUserNav; // 改名 data 比較清楚，不要叫 props
  className?: string;  // 留給最外層用
  classNames?: UserNavigationClasses; // 細部控制
}

export default function UserNavigation({
  data,
  className,
  classNames,
}: UserNavigationProps) {

  return (
    <DropdownMenu>
      {/* Trigger 區塊 */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn("relative h-8 w-8 rounded-full", classNames?.trigger, className)}
        >
          <UserNavTrigger trigger={data.trigger} />
        </Button>
      </DropdownMenuTrigger>

      {/* Content 區塊 */}
      <DropdownMenuContent className={cn("w-56", classNames?.content)} align="end">

        {data.groups.map((group, groupIndex) => (
          <div key={groupIndex}>
            {/* 每個 Group 之間加分隔線 (除了第一個) */}
            {groupIndex > 0 && <DropdownMenuSeparator />}

            <DropdownMenuGroup>
              {group.menuTitle && (
                <DropdownMenuLabel className={classNames?.groupLabel}>
                  {group.menuTitle}
                </DropdownMenuLabel>
              )}

              {/* 使用遞迴組件渲染 Item */}
              {group.menuItems.map((item, itemIndex) => (
                <UserNavMenuItem
                  key={`${item.label}-${itemIndex}`}
                  item={item}
                  // 將樣式往下傳遞
                  classNames={{
                    item: classNames?.item,
                    icon: classNames?.icon,
                    shortcut: classNames?.shortcut
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
