import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Trash2, RefreshCw, Receipt } from 'lucide-react';
import { OnboardingData, Payment } from '@/types/onboarding';

interface Step4PaymentsProps {
  data: OnboardingData;
  onUpdate: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
}

const frequencies = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
];

type PaymentFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly';

interface NewPayment {
  name: string;
  amount: string;
  isRecurring: boolean;
  accountId: string;
  goalId: string;
  frequency: PaymentFrequency;
}

const defaultPayment: NewPayment = {
  name: '',
  amount: '',
  isRecurring: true,
  accountId: '',
  goalId: '',
  frequency: 'monthly',
};

export function Step4Payments({ data, onUpdate, onNext }: Step4PaymentsProps) {
  const [newPayment, setNewPayment] = useState(defaultPayment);

  const addPayment = () => {
    if (newPayment.name && newPayment.amount) {
      const payment: Payment = {
        id: crypto.randomUUID(),
        name: newPayment.name,
        amount: parseFloat(newPayment.amount),
        isRecurring: newPayment.isRecurring,
        accountId: newPayment.accountId || undefined,
        goalId: newPayment.goalId || undefined,
        frequency: newPayment.isRecurring ? newPayment.frequency : undefined,
      };
      onUpdate({ payments: [...data.payments, payment] });
      setNewPayment(defaultPayment);
    }
  };

  const removePayment = (id: string) => {
    onUpdate({ payments: data.payments.filter(p => p.id !== id) });
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Payments & Transactions</h2>
          <p className="text-muted-foreground">
            Set up recurring payments or one-time transactions you want to track.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
            <div className="flex items-center gap-3">
              <RefreshCw className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">Track recurring payments</p>
                <p className="text-sm text-muted-foreground">Subscriptions, bills, etc.</p>
              </div>
            </div>
            <Switch
              checked={data.trackRecurring}
              onCheckedChange={(checked) => onUpdate({ trackRecurring: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
            <div className="flex items-center gap-3">
              <Receipt className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">Track one-time transactions</p>
                <p className="text-sm text-muted-foreground">Individual purchases</p>
              </div>
            </div>
            <Switch
              checked={data.trackOneTime}
              onCheckedChange={(checked) => onUpdate({ trackOneTime: checked })}
            />
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-semibold text-foreground">Add a Payment</h3>

          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="paymentName">Payment Name</Label>
              <Input
                id="paymentName"
                placeholder="e.g., Netflix, Rent, Groceries"
                value={newPayment.name}
                onChange={(e) => setNewPayment(prev => ({ ...prev, name: e.target.value }))}
                className="bg-secondary border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentAmount">Amount ({data.currency})</Label>
              <Input
                id="paymentAmount"
                type="number"
                placeholder="0.00"
                value={newPayment.amount}
                onChange={(e) => setNewPayment(prev => ({ ...prev, amount: e.target.value }))}
                className="bg-secondary border-border"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
              <Label htmlFor="isRecurring" className="cursor-pointer">Recurring payment</Label>
              <Switch
                id="isRecurring"
                checked={newPayment.isRecurring}
                onCheckedChange={(checked) => setNewPayment(prev => ({ ...prev, isRecurring: checked }))}
              />
            </div>

            {newPayment.isRecurring && (
              <div className="space-y-2">
                <Label>Frequency</Label>
                <Select
                  value={newPayment.frequency}
                  onValueChange={(value: Payment['frequency']) => 
                    setNewPayment(prev => ({ ...prev, frequency: value }))
                  }
                >
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {frequencies.map((freq) => (
                      <SelectItem key={freq.value} value={freq.value}>
                        {freq.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {data.accounts.length > 0 && (
              <div className="space-y-2">
                <Label>Link to Account (Optional)</Label>
                <Select
                  value={newPayment.accountId}
                  onValueChange={(value) => setNewPayment(prev => ({ ...prev, accountId: value }))}
                >
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent>
                    {data.accounts.map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {data.goals.length > 0 && (
              <div className="space-y-2">
                <Label>Link to Goal (Optional)</Label>
                <Select
                  value={newPayment.goalId}
                  onValueChange={(value) => setNewPayment(prev => ({ ...prev, goalId: value }))}
                >
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue placeholder="Select goal" />
                  </SelectTrigger>
                  <SelectContent>
                    {data.goals.map((goal) => (
                      <SelectItem key={goal.id} value={goal.id}>
                        {goal.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button
              type="button"
              variant="outline"
              onClick={addPayment}
              disabled={!newPayment.name || !newPayment.amount}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Payment
            </Button>
          </div>

          {data.payments.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Your payments:</p>
              {data.payments.map((payment) => (
                <Card key={payment.id} className="p-3 bg-secondary border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {payment.isRecurring ? (
                        <RefreshCw className="h-4 w-4 text-primary" />
                      ) : (
                        <Receipt className="h-4 w-4 text-primary" />
                      )}
                      <div>
                        <p className="font-medium text-foreground">{payment.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {data.currency} {payment.amount.toLocaleString()}
                          {payment.frequency && ` • ${payment.frequency}`}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removePayment(payment.id)}
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

      <div className="pt-6 flex gap-3">
        <Button variant="outline" onClick={onNext} className="flex-1" size="lg">
          Skip for now
        </Button>
        <Button onClick={onNext} className="flex-1" size="lg">
          Continue
        </Button>
      </div>
    </div>
  );
}
