import { cn } from '@/lib/utils';

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

const stepLabels = ['Profile', 'Goals', 'Accounts', 'Payments', 'Preferences'];

export function OnboardingProgress({ currentStep, totalSteps }: OnboardingProgressProps) {
  return (
    <div className="w-full px-4 py-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-foreground">
          {stepLabels[currentStep - 1]}
        </span>
      </div>
      <div className="flex gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={cn(
              'h-1.5 flex-1 rounded-full transition-colors',
              index < currentStep
                ? 'bg-primary'
                : 'bg-muted'
            )}
          />
        ))}
      </div>
    </div>
  );
}
