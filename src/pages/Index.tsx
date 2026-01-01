import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '@/hooks/useOnboarding';

const Index = () => {
  const navigate = useNavigate();
  const { isCompleted, isLoading, data } = useOnboarding();

  useEffect(() => {
    if (!isLoading && !isCompleted) {
      navigate('/onboarding');
    }
  }, [isLoading, isCompleted, navigate]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!isCompleted) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Welcome back, {data.preferredName || 'User'}!
        </h1>
        <p className="text-xl text-muted-foreground">
          Your Capital Copilot dashboard is ready.
        </p>
        <div className="mt-8 p-6 bg-secondary rounded-lg max-w-md mx-auto">
          <h2 className="text-lg font-semibold text-foreground mb-4">Your Setup Summary</h2>
          <div className="space-y-2 text-left text-muted-foreground">
            <p>Currency: <span className="text-foreground">{data.currency}</span></p>
            <p>Goals: <span className="text-foreground">{data.goals.length}</span></p>
            <p>Accounts: <span className="text-foreground">{data.accounts.length}</span></p>
            <p>Payments: <span className="text-foreground">{data.payments.length}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
