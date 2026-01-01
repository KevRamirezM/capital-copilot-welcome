import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { OnboardingData, Currency } from '@/types/onboarding';

interface Step1ProfileProps {
  data: OnboardingData;
  onUpdate: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
}

const currencies: { value: Currency; label: string }[] = [
  { value: 'USD', label: 'USD - US Dollar' },
  { value: 'EUR', label: 'EUR - Euro' },
  { value: 'GBP', label: 'GBP - British Pound' },
  { value: 'JPY', label: 'JPY - Japanese Yen' },
  { value: 'CAD', label: 'CAD - Canadian Dollar' },
  { value: 'AUD', label: 'AUD - Australian Dollar' },
  { value: 'CHF', label: 'CHF - Swiss Franc' },
  { value: 'CNY', label: 'CNY - Chinese Yuan' },
  { value: 'INR', label: 'INR - Indian Rupee' },
  { value: 'BRL', label: 'BRL - Brazilian Real' },
];

const countries = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
  'France', 'Japan', 'China', 'India', 'Brazil', 'Mexico', 'Spain',
  'Italy', 'Netherlands', 'Switzerland', 'Sweden', 'Norway', 'Denmark',
  'Singapore', 'Hong Kong', 'South Korea', 'Other',
];

export function Step1Profile({ data, onUpdate, onNext }: Step1ProfileProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!data.preferredName.trim()) {
      newErrors.preferredName = 'Please enter your name';
    }
    if (!data.country) {
      newErrors.country = 'Please select your country';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Welcome to Capital Copilot</h2>
          <p className="text-muted-foreground">
            Let's personalize your experience. This will only take a few minutes.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">What should we call you?</Label>
            <Input
              id="name"
              placeholder="Your preferred name"
              value={data.preferredName}
              onChange={(e) => onUpdate({ preferredName: e.target.value })}
              className="bg-secondary border-border"
            />
            {errors.preferredName && (
              <p className="text-sm text-destructive">{errors.preferredName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency">Preferred Currency</Label>
            <Select
              value={data.currency}
              onValueChange={(value: Currency) => onUpdate({ currency: value })}
            >
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((curr) => (
                  <SelectItem key={curr.value} value={curr.value}>
                    {curr.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country / Region</Label>
            <Select
              value={data.country}
              onValueChange={(value) => onUpdate({ country: value })}
            >
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && (
              <p className="text-sm text-destructive">{errors.country}</p>
            )}
          </div>
        </div>
      </div>

      <div className="pt-6">
        <Button onClick={handleNext} className="w-full" size="lg">
          Continue
        </Button>
      </div>
    </div>
  );
}
