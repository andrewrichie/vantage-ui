import { Zap } from 'lucide-react';
import { cn } from '../lib/utils';

interface CreditBadgeProps {
  balance: number;
  size?: 'sm' | 'md';
}

function CreditBadge({ balance, size = 'md' }: CreditBadgeProps) {
  const isLow = balance < 5;
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5 gap-1' : 'text-sm px-3 py-1 gap-1.5';

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-[6px] font-medium',
        isLow ? 'bg-[rgba(220,38,38,0.06)] text-destructive' : 'bg-[#EFF4FF] text-primary',
        sizeClasses,
      )}
    >
      <Zap className={size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
      {balance}
    </span>
  );
}

export { CreditBadge, type CreditBadgeProps };
