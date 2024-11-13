export const QueryKey = {
  food: "Food",
  home: "Home",
  chore: "Chore",
  finance: {
    info: "financeInfo",
    history: "financeHistory",
    income: "financeIncome",
    expense: "financeExpense",
    account: { post: "financeAccountPost", put: "financeAccountPut" },
    savingGoal: { post: "financeSavingGoalPost", put: "financeSavingGoalPut" },
    expectedIncome: {
      post: "financeExpectedIncomePost",
      put: "financeExpectedIncomePut",
    },
    expectedExpense: {
      post: "financeExpectedExpensePost",
      put: "financeExpectedExpensePut",
    },
    ie: { post: "financeIEPost", put: "financeIEPut" },
    transfer: { post: "financeTransferPost", put: "financeTransferPut" },
    ig: "getIncome",
    eg: "getExpense",
  },
  event: { get: "eventGet", post: "eventPost" },
};
