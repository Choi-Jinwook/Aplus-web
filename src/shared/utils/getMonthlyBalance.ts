import { ExpenseGet, IncomeGet } from "@shared/types";

const getMonthlyBalance = (id: number, data?: IncomeGet | ExpenseGet) => {
  if (!data) return 0;

  const accountIncomes = data.txns.filter(
    ({ account: { accountId } }) => accountId === id,
  );

  if (accountIncomes.length !== 0) {
    const sum = accountIncomes.reduce((acc, cur) => {
      return acc + cur.amount;
    }, 0);

    return sum;
  }

  return 0;
};

export default getMonthlyBalance;
