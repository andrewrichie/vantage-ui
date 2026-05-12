import { Check } from 'lucide-react';
import { cn } from '../lib/utils';

interface StepperProgressProps {
  steps: string[];
  currentStep: number;
}

function StepperProgress({ steps, currentStep }: StepperProgressProps) {
  return (
    <div className="flex items-center w-full">
      {steps.map((label, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const isFuture = index > currentStep;
        const isLast = index === steps.length - 1;

        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors',
                  isCompleted && 'bg-primary text-primary-foreground',
                  isActive && 'bg-primary text-primary-foreground ring-2 ring-primary/30',
                  isFuture && 'bg-transparent border-2 border-[#E4E4E7] text-muted-foreground',
                )}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : <span>{index + 1}</span>}
              </div>
              <span
                className={cn(
                  'mt-1.5 text-xs text-center max-w-[80px] leading-tight',
                  isActive && 'text-primary font-medium',
                  isCompleted && 'text-muted-foreground',
                  isFuture && 'text-muted-foreground/60',
                )}
              >
                {label}
              </span>
            </div>
            {!isLast && (
              <div
                className={cn(
                  'flex-1 h-[2px] mx-2 mt-[-1.5rem]',
                  index < currentStep ? 'bg-primary' : 'bg-[#E4E4E7]',
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export { StepperProgress, type StepperProgressProps };
