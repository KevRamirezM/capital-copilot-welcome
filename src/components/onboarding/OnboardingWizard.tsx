import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '@/hooks/useOnboarding';
import { OnboardingLayout } from './OnboardingLayout';
import { Step1Profile } from './steps/Step1Profile';
import { Step2Goals } from './steps/Step2Goals';
import { Step3Accounts } from './steps/Step3Accounts';
import { Step4Payments } from './steps/Step4Payments';
import { Step5Preferences } from './steps/Step5Preferences';

export function OnboardingWizard() {
  const navigate = useNavigate();
  const { data, updateData, nextStep, prevStep, completeOnboarding, isLoading } = useOnboarding();

  const handleComplete = () => {
    completeOnboarding();
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const renderStep = () => {
    switch (data.currentStep) {
      case 1:
        return <Step1Profile data={data} onUpdate={updateData} onNext={nextStep} />;
      case 2:
        return <Step2Goals data={data} onUpdate={updateData} onNext={nextStep} />;
      case 3:
        return <Step3Accounts data={data} onUpdate={updateData} onNext={nextStep} />;
      case 4:
        return <Step4Payments data={data} onUpdate={updateData} onNext={nextStep} />;
      case 5:
        return <Step5Preferences data={data} onUpdate={updateData} onComplete={handleComplete} />;
      default:
        return <Step1Profile data={data} onUpdate={updateData} onNext={nextStep} />;
    }
  };

  return (
    <OnboardingLayout
      currentStep={data.currentStep}
      totalSteps={5}
      onBack={prevStep}
      showBack={data.currentStep > 1}
    >
      {renderStep()}
    </OnboardingLayout>
  );
}
