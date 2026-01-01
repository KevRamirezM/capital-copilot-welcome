import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Trash2, Wallet, PiggyBank, CreditCard, TrendingUp } from 'lucide-react';
import { OnboardingData, Account, AccountType, InvestmentType, GrowthType } from '@/types/onboarding';
import { cn } from '@/lib/utils';

interface Step3AccountsProps {
  data: OnboardingData;
  onUpdate: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
}

const accountTypes: { value: AccountType; label: string; icon: React.ReactNode }[] = [
  { value: 'checking', label: 'Checking / Cash', icon: <Wallet className="h-5 w-5" /> },
  { value: 'savings', label: 'Savings', icon: <PiggyBank className="h-5 w-5" /> },
  { value: 'credit', label: 'Credit Card', icon: <CreditCard className="h-5 w-5" /> },
  { value: 'investment', label: 'Investment', icon: <TrendingUp className="h-5 w-5" /> },
];

const investmentTypes: { value: InvestmentType; label: string }[] = [
  { value: 'stocks', label: 'Stocks' },
  { value: 'bonds', label: 'Bonds' },
  { value: 'mutual_funds', label: 'Mutual Funds' },
  { value: 'etfs', label: 'ETFs' },
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'crypto', label: 'Cryptocurrencies' },
  { value: 'savings_accounts', label: 'Savings Accounts' },
  { value: 'cds', label: 'Certificates of Deposit (CDs)' },
  { value: 'reits', label: 'REITs' },
  { value: 'dividend_stocks', label: 'Dividend Stocks' },
];

const defaultAccount = {
  name: '',
  type: '' as AccountType | '',
  balance: '',
  investmentType: '' as InvestmentType | '',
  amountInvested: '',
  growthType: 'fixed' as GrowthType,
  fixedGrowthRate: '',
};

export function Step3Accounts({ data, onUpdate, onNext }: Step3AccountsProps) {
  const [newAccount, setNewAccount] = useState(defaultAccount);

  const addAccount = () => {
    if (newAccount.name && newAccount.type && newAccount.balance) {
      const account: Account = {
        id: crypto.randomUUID(),
        name: newAccount.name,
        type: newAccount.type as AccountType,
        balance: parseFloat(newAccount.balance),
        ...(newAccount.type === 'investment' && {
          investmentType: newAccount.investmentType as InvestmentType,
          amountInvested: newAccount.amountInvested ? parseFloat(newAccount.amountInvested) : undefined,
          growthType: newAccount.growthType,
          fixedGrowthRate: newAccount.fixedGrowthRate ? parseFloat(newAccount.fixedGrowthRate) : undefined,
        }),
      };
      onUpdate({ accounts: [...data.accounts, account] });
      setNewAccount(defaultAccount);
    }
  };

  const removeAccount = (id: string) => {
    onUpdate({ accounts: data.accounts.filter(a => a.id !== id) });
  };

  const getAccountIcon = (type: AccountType) => {
    return accountTypes.find(t => t.value === type)?.icon;
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Your Accounts</h2>
          <p className="text-muted-foreground">
            Add your financial accounts to track your complete picture.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="accountName">Account Name</Label>
              <Input
                id="accountName"
                placeholder="e.g., Main Checking, Savings Account"
                value={newAccount.name}
                onChange={(e) => setNewAccount(prev => ({ ...prev, name: e.target.value }))}
                className="bg-secondary border-border"
              />
            </div>

            <div className="space-y-2">
              <Label>Account Type</Label>
              <div className="grid grid-cols-2 gap-2">
                {accountTypes.map((type) => (
                  <Card
                    key={type.value}
                    className={cn(
                      'p-3 cursor-pointer transition-colors border',
                      newAccount.type === type.value
                        ? 'bg-primary/10 border-primary'
                        : 'bg-secondary border-border hover:border-muted-foreground'
                    )}
                    onClick={() => setNewAccount(prev => ({ ...prev, type: type.value }))}
                  >
                    <div className="flex items-center gap-2">
                      <div className="text-primary">{type.icon}</div>
                      <span className="text-sm font-medium text-foreground">{type.label}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountBalance">
                {newAccount.type === 'credit' ? 'Current Balance (debt)' : 'Current Balance'} ({data.currency})
              </Label>
              <Input
                id="accountBalance"
                type="number"
                placeholder="0.00"
                value={newAccount.balance}
                onChange={(e) => setNewAccount(prev => ({ ...prev, balance: e.target.value }))}
                className="bg-secondary border-border"
              />
            </div>

            {newAccount.type === 'investment' && (
              <>
                <div className="space-y-2">
                  <Label>Investment Type</Label>
                  <Select
                    value={newAccount.investmentType}
                    onValueChange={(value: InvestmentType) => 
                      setNewAccount(prev => ({ ...prev, investmentType: value }))
                    }
                  >
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue placeholder="Select investment type" />
                    </SelectTrigger>
                    <SelectContent>
                      {investmentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amountInvested">Amount Invested ({data.currency})</Label>
                  <Input
                    id="amountInvested"
                    type="number"
                    placeholder="0.00"
                    value={newAccount.amountInvested}
                    onChange={(e) => setNewAccount(prev => ({ ...prev, amountInvested: e.target.value }))}
                    className="bg-secondary border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Growth Type</Label>
                  <Select
                    value={newAccount.growthType}
                    onValueChange={(value: GrowthType) => 
                      setNewAccount(prev => ({ ...prev, growthType: value }))
                    }
                  >
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Fixed Annual Growth (%)</SelectItem>
                      <SelectItem value="variable">Variable Growth</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {newAccount.growthType === 'fixed' && (
                  <div className="space-y-2">
                    <Label htmlFor="growthRate">Expected Annual Growth (%)</Label>
                    <Input
                      id="growthRate"
                      type="number"
                      placeholder="7.0"
                      value={newAccount.fixedGrowthRate}
                      onChange={(e) => setNewAccount(prev => ({ ...prev, fixedGrowthRate: e.target.value }))}
                      className="bg-secondary border-border"
                    />
                  </div>
                )}
              </>
            )}

            <Button
              type="button"
              variant="outline"
              onClick={addAccount}
              disabled={!newAccount.name || !newAccount.type || !newAccount.balance}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Account
            </Button>
          </div>

          {data.accounts.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Your accounts:</p>
              {data.accounts.map((account) => (
                <Card key={account.id} className="p-3 bg-secondary border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-primary">{getAccountIcon(account.type)}</div>
                      <div>
                        <p className="font-medium text-foreground">{account.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {data.currency} {account.balance.toLocaleString()}
                          {account.investmentType && ` • ${investmentTypes.find(t => t.value === account.investmentType)?.label}`}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeAccount(account.id)}
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
        <Button onClick={onNext} className="flex-1" size="lg" disabled={data.accounts.length === 0}>
          Continue
        </Button>
      </div>
    </div>
  );
}
