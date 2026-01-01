import { ReactNode } from 'react';
import { OnboardingProgress } from './OnboardingProgress';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface OnboardingLayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
  showBack?: boolean;
}

export function OnboardingLayout({
  children,
  currentStep,
  totalSteps,
  onBack,
  showBack = true,
}: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="flex items-center p-4">
        {showBack && currentStep > 1 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <div className="flex-1 text-center">
          <h1 className="text-lg font-semibold text-foreground">Capital Copilot</h1>
        </div>
        {showBack && currentStep > 1 && <div className="w-10" />}
      </header>

      <OnboardingProgress currentStep={currentStep} totalSteps={totalSteps} />

      <main className="flex-1 flex flex-col px-4 pb-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
