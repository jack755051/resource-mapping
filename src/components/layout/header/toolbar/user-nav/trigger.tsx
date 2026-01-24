import { HeaderUserNavTrigger } from '@/type';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface TriggerProps {
  trigger: HeaderUserNavTrigger;
  className?: string; // 補上 className 讓外層可以控制 Avatar 大小
}

export function Trigger({ trigger, className }: TriggerProps) {
  // 1. 純文字模式
  if (typeof trigger === 'string') {
    return <span className={cn("font-medium", className)}>{trigger}</span>;
  }

  // 2. Avatar 模式
  return (
    <Avatar className={cn("h-8 w-8", className)}>
      <AvatarImage src={trigger.src} alt={trigger.alt} />
      <AvatarFallback>{trigger.label}</AvatarFallback>
    </Avatar>
  );
}