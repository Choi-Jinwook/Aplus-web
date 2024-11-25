export const QueryKey = {
  food: { get: "foodGet", post: "foodPost", put: "foodPut" },
  home: "Home",
  chore: { get: "ChoreGet", post: "ChorePost" },
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
  room: { get: "roomGet", post: "roomPost", roomId: "getRoomId" },
  user: { get: "userGet", post: "userPost", put: "userPut" },
};
