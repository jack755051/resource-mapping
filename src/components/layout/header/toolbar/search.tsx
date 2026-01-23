// type
import { HeaderSearch } from '@/type';

// components & packages
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group';
import { cn } from '@/lib/utils';
import { useIcon } from '@/hook/useIcon';
import { LucideIcon } from 'lucide-react';

interface SearchClasses {
    inputGroup?: string;
    input?: string;
}

interface SearchProps {
    search: HeaderSearch;
    className?: string;
    classNames?: SearchClasses;
}

export default function Search({ search, className, classNames }: SearchProps) {
    const { getIcon } = useIcon();
    const IconComponent = getIcon('search') as LucideIcon;

    return (
        <InputGroup className={cn('max-w-xs', classNames?.inputGroup)}>
            <InputGroupInput className={cn('max-w-xs', classNames?.input)} placeholder={search.placeholder ?? 'Search...'} />
            <InputGroupAddon>
                {IconComponent && <IconComponent className="h-4 w-4" />}
            </InputGroupAddon>
        </InputGroup>
    );
}
