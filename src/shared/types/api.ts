export type StorageType = "refrigerated" | "frozen" | "roomTemperature";

export interface FoodsBody {
  foodName: string;
  createAt: string;
  expirationDate: string;
  quantity: number | null;
  amount: string | null;
  isFavorite: boolean;
  memberName: string;
  isShared: boolean;
}

export interface ChoreMembers {
  memberId: number;
  memberName: string;
  hasPassword: boolean | null;
  memberIcon: string | null;
}

export interface ChoresBody {
  choreId: number;
  choreArea: string;
  color: string;
  description: string;
  icon: string;
  choreDay?: string;
  choreFrequency: number;
  choreMembers: ChoreMembers[];
}

export interface EventsBody {
  eventName: string;
  eventDay: string;
  eventTime: string;
  memberIds: number[];
}

export interface FinanceAccounts {
  accountId: number;
  accountName: string;
  balance: number;
  color: string;
}

export interface FinancePredictedIncomes {
  incomeId: number;
  description: string;
  amount: number;
  isChecked: boolean;
  dueDate: string;
  enrolledDate: string;
}

export interface FinancePredictedExpenses {
  expenseId: number;
  description: string;
  amount: number;
  isChecked: boolean;
  dueDate: string;
  enrolledDate: string;
}

export interface FinanceSavingGoals {
  savingGoalId: number;
  description: string;
  amount: number;
  isChecked: boolean;
  dueDate: string;
  enrolledDate: string;
}

export interface FinanceInfoBody {
  accounts: FinanceAccounts[];
  income: number;
  expense: number;
  predictedIncomes: FinancePredictedIncomes[];
  predictedExpenses: FinancePredictedExpenses[];
  savingGoals: FinanceSavingGoals[];
}

export interface PostFinanceAccount {
  accountName: string;
  color: string;
}

export interface GetFinanceHistory {
  accountTxnId: number;
  amount: number;
  txnType: string;
  txnDate: string;
  description: string;
  fromTxnId: string | null;
  toTxnId: number;
}
