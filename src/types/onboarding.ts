export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD' | 'CHF' | 'CNY' | 'INR' | 'BRL';

export type FinancialFocus = 'saving' | 'debt' | 'investing' | 'tracking' | 'all';

export type AccountType = 'checking' | 'savings' | 'credit' | 'investment';

export type InvestmentType = 
  | 'stocks' 
  | 'bonds' 
  | 'mutual_funds' 
  | 'etfs' 
  | 'real_estate' 
  | 'crypto' 
  | 'savings_accounts' 
  | 'cds' 
  | 'reits' 
  | 'dividend_stocks';

export type GrowthType = 'fixed' | 'variable';

export type InsightLevel = 'simple' | 'detailed';

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  targetDate?: string;
}

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  investmentType?: InvestmentType;
  amountInvested?: number;
  growthType?: GrowthType;
  fixedGrowthRate?: number;
}

export interface Payment {
  id: string;
  name: string;
  amount: number;
  isRecurring: boolean;
  accountId?: string;
  goalId?: string;
  frequency?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export interface OnboardingData {
  // Step 1: Basic Profile
  preferredName: string;
  currency: Currency;
  country: string;

  // Step 2: Financial Goals
  financialFocus: FinancialFocus[];
  goals: Goal[];

  // Step 3: Accounts
  accounts: Account[];

  // Step 4: Payments
  trackRecurring: boolean;
  trackOneTime: boolean;
  payments: Payment[];

  // Step 5: Preferences
  insightLevel: InsightLevel;
  notifications: {
    paymentReminders: boolean;
    goalProgress: boolean;
    investmentPerformance: boolean;
  };

  // Meta
  completed: boolean;
  currentStep: number;
}

export const defaultOnboardingData: OnboardingData = {
  preferredName: '',
  currency: 'USD',
  country: '',
  financialFocus: [],
  goals: [],
  accounts: [],
  trackRecurring: true,
  trackOneTime: true,
  payments: [],
  insightLevel: 'simple',
  notifications: {
    paymentReminders: true,
    goalProgress: true,
    investmentPerformance: true,
  },
  completed: false,
  currentStep: 1,
};
