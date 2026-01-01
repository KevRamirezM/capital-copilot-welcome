import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Target, PiggyBank, CreditCard, TrendingUp, BarChart3 } from 'lucide-react';
import { OnboardingData, FinancialFocus, Goal } from '@/types/onboarding';
import { cn } from '@/lib/utils';

interface Step2GoalsProps {
  data: OnboardingData;
  onUpdate: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
}

const focusOptions: { value: FinancialFocus; label: string; icon: React.ReactNode; description: string }[] = [
  { value: 'saving', label: 'Saving Money', icon: <PiggyBank className="h-5 w-5" />, description: 'Build your emergency fund or save for purchases' },
  { value: 'debt', label: 'Paying Off Debt', icon: <CreditCard className="h-5 w-5" />, description: 'Reduce credit card or loan balances' },
  { value: 'investing', label: 'Investing', icon: <TrendingUp className="h-5 w-5" />, description: 'Grow your wealth over time' },
  { value: 'tracking', label: 'Tracking Expenses', icon: <BarChart3 className="h-5 w-5" />, description: 'Understand where your money goes' },
  { value: 'all', label: 'All of the Above', icon: <Target className="h-5 w-5" />, description: 'Complete financial management' },
];

export function Step2Goals({ data, onUpdate, onNext }: Step2GoalsProps) {
  const [newGoal, setNewGoal] = useState({ name: '', targetAmount: '', targetDate: '' });

  const toggleFocus = (focus: FinancialFocus) => {
    if (focus === 'all') {
      onUpdate({ financialFocus: data.financialFocus.includes('all') ? [] : ['all'] });
    } else {
      const filtered = data.financialFocus.filter(f => f !== 'all');
      const updated = filtered.includes(focus)
        ? filtered.filter(f => f !== focus)
        : [...filtered, focus];
      onUpdate({ financialFocus: updated });
    }
  };

  const addGoal = () => {
    if (newGoal.name && newGoal.targetAmount) {
      const goal: Goal = {
        id: crypto.randomUUID(),
        name: newGoal.name,
        targetAmount: parseFloat(newGoal.targetAmount),
        targetDate: newGoal.targetDate || undefined,
      };
      onUpdate({ goals: [...data.goals, goal] });
      setNewGoal({ name: '', targetAmount: '', targetDate: '' });
    }
  };

  const removeGoal = (id: string) => {
    onUpdate({ goals: data.goals.filter(g => g.id !== id) });
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Your Financial Focus</h2>
          <p className="text-muted-foreground">
            What do you want to focus on? Select all that apply.
          </p>
        </div>

        <div className="space-y-3">
          {focusOptions.map((option) => (
            <Card
              key={option.value}
              className={cn(
                'p-4 cursor-pointer transition-colors border',
                data.financialFocus.includes(option.value)
                  ? 'bg-primary/10 border-primary'
                  : 'bg-secondary border-border hover:border-muted-foreground'
              )}
              onClick={() => toggleFocus(option.value)}
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={data.financialFocus.includes(option.value)}
                  className="pointer-events-none"
                />
                <div className="text-primary">{option.icon}</div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{option.label}</p>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-semibold text-foreground">Create Your First Goal</h3>
          
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="goalName">Goal Name</Label>
              <Input
                id="goalName"
                placeholder="e.g., Emergency Fund, Vacation, New Car"
                value={newGoal.name}
                onChange={(e) => setNewGoal(prev => ({ ...prev, name: e.target.value }))}
                className="bg-secondary border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goalAmount">Target Amount ({data.currency})</Label>
              <Input
                id="goalAmount"
                type="number"
                placeholder="10000"
                value={newGoal.targetAmount}
                onChange={(e) => setNewGoal(prev => ({ ...prev, targetAmount: e.target.value }))}
                className="bg-secondary border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goalDate">Target Date (Optional)</Label>
              <Input
                id="goalDate"
                type="date"
                value={newGoal.targetDate}
                onChange={(e) => setNewGoal(prev => ({ ...prev, targetDate: e.target.value }))}
                className="bg-secondary border-border"
              />
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={addGoal}
              disabled={!newGoal.name || !newGoal.targetAmount}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Goal
            </Button>
          </div>

          {data.goals.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Your goals:</p>
              {data.goals.map((goal) => (
                <Card key={goal.id} className="p-3 bg-secondary border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{goal.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {data.currency} {goal.targetAmount.toLocaleString()}
                        {goal.targetDate && ` • Due: ${new Date(goal.targetDate).toLocaleDateString()}`}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeGoal(goal.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="pt-6">
        <Button onClick={onNext} className="w-full" size="lg">
          Continue
        </Button>
      </div>
    </div>
  );
}
