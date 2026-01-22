// ui
import {
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { useIcon } from '@/hook/useIcon';
// type
import { HeaderUserNavItem } from '@/type';
// utils
import { cn } from '@/lib/utils';


interface UserNavMenuItemProps {
    item: HeaderUserNavItem;
    classNames?: {
        item?: string;
        icon?: string;
        shortcut?: string;
    };
}

export function UserNavMenuItem({ item, classNames }: UserNavMenuItemProps) {
    const { getIcon } = useIcon();

    // 1. 取得 Icon Component (注意：變數名稱要大寫開頭)
    const IconComponent = item.icon ? getIcon(item.icon) : null;

    // 2. 判斷是否有子選單 (巢狀邏輯)
    const hasChildren = item.children && item.children.length > 0;

    if (hasChildren) {
        return (
            <DropdownMenuSub>
                <DropdownMenuSubTrigger className={classNames?.item}>
                    {IconComponent && (
                        <IconComponent className={cn("mr-2 h-4 w-4", classNames?.icon)} />
                    )}
                    <span>{item.label}</span>
                </DropdownMenuSubTrigger>

                {/* 遞迴渲染子層 */}
                <DropdownMenuSubContent>
                    {item.children!.map((child, index) => (
                        // 自己呼叫自己
                        <UserNavMenuItem
                            key={`${child.label}-${index}`}
                            item={child}
                            classNames={classNames}
                        />
                    ))}
                </DropdownMenuSubContent>
            </DropdownMenuSub>
        );
    }

    // 3. 沒有子選單，渲染一般 Item
    return (
        <DropdownMenuItem className={classNames?.item} onClick={item.onClick}>
            {IconComponent && (
                <IconComponent className={cn("mr-2 h-4 w-4", classNames?.icon)} />
            )}
            <span>{item.label}</span>
            {item.shortcut && (
                <DropdownMenuShortcut className={classNames?.shortcut}>
                    {item.shortcut}
                </DropdownMenuShortcut>
            )}
        </DropdownMenuItem>
    );
}