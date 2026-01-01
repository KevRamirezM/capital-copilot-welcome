import { useState, useEffect, useCallback } from 'react';
import { OnboardingData, defaultOnboardingData } from '@/types/onboarding';

const STORAGE_KEY = 'capital-copilot-onboarding';

export function useOnboarding() {
  const [data, setData] = useState<OnboardingData>(defaultOnboardingData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch {
        setData(defaultOnboardingData);
      }
    }
    setIsLoading(false);
  }, []);

  const updateData = useCallback((updates: Partial<OnboardingData>) => {
    setData(prev => {
      const newData = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      return newData;
    });
  }, []);

  const nextStep = useCallback(() => {
    setData(prev => {
      const newData = { ...prev, currentStep: Math.min(prev.currentStep + 1, 5) };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      return newData;
    });
  }, []);

  const prevStep = useCallback(() => {
    setData(prev => {
      const newData = { ...prev, currentStep: Math.max(prev.currentStep - 1, 1) };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      return newData;
    });
  }, []);

  const goToStep = useCallback((step: number) => {
    setData(prev => {
      const newData = { ...prev, currentStep: Math.max(1, Math.min(step, 5)) };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      return newData;
    });
  }, []);

  const completeOnboarding = useCallback(() => {
    setData(prev => {
      const newData = { ...prev, completed: true };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      return newData;
    });
  }, []);

  const resetOnboarding = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setData(defaultOnboardingData);
  }, []);

  return {
    data,
    isLoading,
    updateData,
    nextStep,
    prevStep,
    goToStep,
    completeOnboarding,
    resetOnboarding,
    isCompleted: data.completed,
  };
}
