import { HeaderUserNavTrigger } from '@/type';
import { AvatarFallback, AvatarImage, Avatar } from '@/components/ui/avatar';

interface TriggerProps {
  trigger: HeaderUserNavTrigger;
}

export function Trigger({ trigger }: TriggerProps) {
  // 簡單的判斷：如果是字串直接顯示
  if (typeof trigger === 'string') {
    return <span className="font-medium">{trigger}</span>;
  }

  // 否則顯示 Avatar
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src={trigger.src} alt={trigger.alt} />
      <AvatarFallback>{trigger.label}</AvatarFallback>
    </Avatar>
  );
}
