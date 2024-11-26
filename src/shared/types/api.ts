export type StorageType = "refrigerated" | "frozen" | "roomTemperature";

export interface FoodsBody {
  foodId: number;
  foodName: string;
  createAt: string;
  expirationDate: string;
  quantity: number | null;
  amount: number | null;
  isFavorite: boolean;
  memberName: string;
  isShared: boolean;
  storageType?: string;
}

export interface ChoreMembers {
  memberId: number;
  memberName: string;
  hasPassword: boolean | null;
  memberIcon: string | null;
}

export interface ChorePost {
  choreArea: string;
  color: string;
  description: string;
  icon: string;
  choreDay: string;
  choreFrequency: number;
  enrolledDate: string;
  memberIds: number[];
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

export interface IncomeOrExpense {
  amount: number;
  txnType: string;
  txnDate: string;
  description: string;
}

export interface Transaction {
  amount: number;
  txnType: string;
  txnDate: string;
  description: string;
}

export interface Txns {
  accountTxnId: number;
  amount: number;
  txnType: string;
  txnDate: string;
  description: string;
  fromTxnId: number | null;
  toTxnId: number | null;
  account: FinanceAccounts;
}

export interface IncomeGet {
  txns: Txns[];
  totalIncome: number;
}

export interface ExpenseGet {
  txns: Txns[];
  totalExpense: number;
}

export interface EventsGet {
  eventId: number;
  eventName: string;
  eventDay: string;
  eventTime: string;
  description: string | null;
  members: ChoreMembers[];
}

export interface RoomBody {
  roomName: string;
  description: string;
  roomPassword: string;
  masterMemberName: string;
  masterMemberPassword: string | null;
}

export interface RoomResponse {
  roomId: number;
  masterMemberId: number;
}

export interface UserBody {
  memberName: string;
  memberPassword: string;
  memberIcon: string;
}

export interface UserData extends UserBody {
  memberId: number;
}

export interface HomeData {
  expiringSoonFoods: FoodsBody[];
  outOfFavoriteFoods: FoodsBody[];
  predictedIncomes: FinancePredictedIncomes[];
  savingGoals: FinanceSavingGoals[];
  predictedExpenses: FinancePredictedExpenses[];
  choreDtos: ChoresBody[];
  eventDtos: EventsGet[];
}
