'use client';

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
import { useState } from 'react';

interface SearchClasses {
  inputGroup?: string;
  input?: string;
}

interface SearchProps {
  search: HeaderSearch;
  className?: string;
  classNames?: SearchClasses;
  onSearch?: (value: string) => void;
}

export default function Search({
  search,
  className,
  classNames,
  onSearch,
}: SearchProps) {
  const { getIcon } = useIcon();
  const IconComponent = getIcon('search') as LucideIcon;

  const [inputValue, setInputValue] = useState('');

  const handleTriggerSearch = () => {
    if (onSearch) {
      onSearch(inputValue);
    }
  };

  // 按下 Enter 觸發搜索
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleTriggerSearch();
    }
  };

  return (
    <InputGroup className={cn('max-w-xs', classNames?.inputGroup)}>
      <InputGroupInput
        className={cn('max-w-xs', classNames?.input)}
        placeholder={search.placeholder ?? 'Search...'}
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <InputGroupAddon
        onClick={handleTriggerSearch}
        className="cursor-pointer hover:text-primary transition-colors"
      >
        {IconComponent && <IconComponent className="h-4 w-4" />}
      </InputGroupAddon>
    </InputGroup>
  );
}
