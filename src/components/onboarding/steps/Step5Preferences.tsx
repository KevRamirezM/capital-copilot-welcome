import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bell, TrendingUp, Target, BarChart3, Sparkles } from 'lucide-react';
import { OnboardingData, InsightLevel } from '@/types/onboarding';
import { cn } from '@/lib/utils';

interface Step5PreferencesProps {
  data: OnboardingData;
  onUpdate: (updates: Partial<OnboardingData>) => void;
  onComplete: () => void;
}

const insightOptions: { value: InsightLevel; label: string; description: string; icon: React.ReactNode }[] = [
  {
    value: 'simple',
    label: 'Simple Summaries',
    description: 'Key highlights and quick overviews',
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    value: 'detailed',
    label: 'Detailed Analytics',
    description: 'In-depth charts and breakdowns',
    icon: <Sparkles className="h-5 w-5" />,
  },
];

export function Step5Preferences({ data, onUpdate, onComplete }: Step5PreferencesProps) {
  const updateNotification = (key: keyof OnboardingData['notifications'], value: boolean) => {
    onUpdate({
      notifications: {
        ...data.notifications,
        [key]: value,
      },
    });
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Your Preferences</h2>
          <p className="text-muted-foreground">
            Customize how you want to experience Capital Copilot.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Insight Detail Level</h3>
          <div className="grid grid-cols-1 gap-3">
            {insightOptions.map((option) => (
              <Card
                key={option.value}
                className={cn(
                  'p-4 cursor-pointer transition-colors border',
                  data.insightLevel === option.value
                    ? 'bg-primary/10 border-primary'
                    : 'bg-secondary border-border hover:border-muted-foreground'
                )}
                onClick={() => onUpdate({ insightLevel: option.value })}
              >
                <div className="flex items-center gap-3">
                  <div className="text-primary">{option.icon}</div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{option.label}</p>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-primary" />
                <div>
                  <Label htmlFor="paymentReminders" className="cursor-pointer font-medium">
                    Payment Reminders
                  </Label>
                  <p className="text-sm text-muted-foreground">Get notified before bills are due</p>
                </div>
              </div>
              <Switch
                id="paymentReminders"
                checked={data.notifications.paymentReminders}
                onCheckedChange={(checked) => updateNotification('paymentReminders', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-primary" />
                <div>
                  <Label htmlFor="goalProgress" className="cursor-pointer font-medium">
                    Goal Progress Updates
                  </Label>
                  <p className="text-sm text-muted-foreground">Celebrate milestones and track progress</p>
                </div>
              </div>
              <Switch
                id="goalProgress"
                checked={data.notifications.goalProgress}
                onCheckedChange={(checked) => updateNotification('goalProgress', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-primary" />
                <div>
                  <Label htmlFor="investmentPerformance" className="cursor-pointer font-medium">
                    Investment Performance
                  </Label>
                  <p className="text-sm text-muted-foreground">Weekly summaries of your investments</p>
                </div>
              </div>
              <Switch
                id="investmentPerformance"
                checked={data.notifications.investmentPerformance}
                onCheckedChange={(checked) => updateNotification('investmentPerformance', checked)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6">
        <Button onClick={onComplete} className="w-full" size="lg">
          Finish Setup
        </Button>
      </div>
    </div>
  );
}
