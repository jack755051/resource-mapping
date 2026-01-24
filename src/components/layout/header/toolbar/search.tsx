'use client';

import { useState } from 'react';
import { LucideIcon } from 'lucide-react';

// type (引入剛剛定義好的標準 Props)
import { HeaderSearchProps } from '@/type';

// components & packages
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { cn } from '@/lib/utils';
import { useIcon } from '@/hooks/useIcon';

export default function Search({
  data, // 1. 改名為 data
  className,
  classNames,
  onSearch,
}: HeaderSearchProps) {
  const { placeholder, disabled, defaultValue } = data; // 2. 解構資料

  const { getIcon } = useIcon();
  const IconComponent = getIcon('search') as LucideIcon;

  const [inputValue, setInputValue] = useState(defaultValue || '');

  const handleTriggerSearch = () => {
    if (onSearch) {
      onSearch(inputValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleTriggerSearch();
    }
  };

  return (
    <InputGroup
      className={cn(
        'max-w-xs',
        classNames?.wrapper, // 3. 使用 wrapper 對應最外層
        className
      )}
    >
      <InputGroupInput
        className={cn('max-w-xs', classNames?.input)}
        placeholder={placeholder ?? 'Search...'}
        value={inputValue}
        disabled={disabled} // 4. 綁定 disabled
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <InputGroupAddon
        onClick={handleTriggerSearch}
        className={cn(
          'cursor-pointer hover:text-primary transition-colors',
          classNames?.addon // 5. 加上 addon 的樣式控制能力
        )}
      >
        {IconComponent && <IconComponent className="h-4 w-4" />}
      </InputGroupAddon>
    </InputGroup>
  );
}
