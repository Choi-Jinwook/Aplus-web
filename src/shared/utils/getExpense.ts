import {
  FinancePredictedExpenses,
  FinancePredictedIncomes,
  FinanceSavingGoals,
} from "@shared/types";

const getExpense = (
  array:
    | FinancePredictedIncomes[]
    | FinancePredictedExpenses[]
    | FinanceSavingGoals[],
) => {
  return array.reduce((acc, cur) => {
    return acc + cur.amount;
  }, 0);
};

export default getExpense;
