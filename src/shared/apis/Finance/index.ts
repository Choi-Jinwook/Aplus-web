import { QueryKey } from "@shared/queryKey";
import {
  ExpenseGet,
  FinanceInfoBody,
  FinancePredictedExpenses,
  FinancePredictedIncomes,
  FinanceSavingGoals,
  GetFinanceHistory,
  IncomeGet,
  IncomeOrExpense,
  PostFinanceAccount,
  Transaction,
} from "@shared/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetFinanceInfo = (
  roomNumber: string,
  year: string,
  month: string,
) => {
  return useQuery({
    queryKey: [QueryKey.finance.info],
    queryFn: async () => {
      const res = await axios.get<FinanceInfoBody>(
        `${process.env.NEXT_PUBLIC_API_URL}/room/${roomNumber}/finance?year=${year}&month=${month}`,
      );

      return res.data;
    },
    enabled: roomNumber !== "undefined" && year !== "0" && month !== "0",
  });
};

export const usePostFinanceAccount = () => {
  return useMutation({
    mutationFn: async ({
      roomNumber,
      data,
    }: {
      roomNumber: string;
      data: PostFinanceAccount;
    }) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/room/${roomNumber}/finance/account`,
        data,
      );

      return res.data;
    },
    mutationKey: [QueryKey.finance.account.post],
    onSuccess: (data) => console.log(data),
  });
};

export const usePutFinanceAccount = () => {
  return useMutation({
    mutationFn: async ({
      roomNumber,
      accountId,
      data,
    }: {
      roomNumber: string;
      accountId: string;
      data: PostFinanceAccount;
    }) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/room/${roomNumber}/finance/${accountId}`,
        { ...data },
      );

      return res.data;
    },
    mutationKey: [QueryKey.finance.account.put],
    onSuccess: (data) => console.log(data),
  });
};

export const useGetFinanceHistory = (
  roomNumber: string,
  accountId: string,
  year: string,
  month: string,
) => {
  return useQuery({
    queryKey: [QueryKey.finance.history, accountId],
    queryFn: async () => {
      const res = await axios.get<GetFinanceHistory[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/room/${roomNumber}/finance/${accountId}?year=${year}&month=${month}`,
      );

      return res.data;
    },
    enabled: roomNumber !== "undefined" && year !== "0" && month !== "0",
  });
};

export const usePostIncomeExpense = () => {
  return useMutation({
    mutationFn: async ({
      roomNumber,
      accountId,
      data,
    }: {
      roomNumber: string;
      accountId: string;
      data: IncomeOrExpense;
    }) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/room/${roomNumber}/finance/${accountId}/accountTxn`,
        data,
      );

      return res.data;
    },
    mutationKey: [QueryKey.finance.ie.post],
    onSuccess: (data) => console.log(data),
  });
};

export const usePutIncomeExpense = () => {
  return useMutation({
    mutationFn: async ({
      roomNumber,
      accountId,
      data,
    }: {
      roomNumber: string;
      accountId: string;
      data: IncomeOrExpense;
    }) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/room/${roomNumber}/finance/accountTxn/${accountId}`,
        { ...data },
      );

      return res.data;
    },
    mutationKey: [QueryKey.finance.ie.put],
    onSuccess: (data) => console.log(data),
  });
};

export const usePostTransfer = () => {
  return useMutation({
    mutationFn: async ({
      roomNumber,
      from,
      to,
      data,
    }: {
      roomNumber: string;
      from: string;
      to: string;
      data: Transaction;
    }) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/room/${roomNumber}/finance/accountTransferTxn?fromAccountId=${from}&toAccountId=${to}`,
        data,
      );

      return res.data;
    },
    mutationKey: [QueryKey.finance.transfer.post],
    onSuccess: (data) => console.log(data),
  });
};

export const usePutTransfer = () => {
  return useMutation({
    mutationFn: async ({
      roomNumber,
      transactionId,
      from,
      to,
      data,
    }: {
      roomNumber: string;
      transactionId: string;
      from: string;
      to: string;
      data: Transaction;
    }) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/room/${roomNumber}/finance/accountTransferTxn/${transactionId}?fromAccountId=${from}&toAccountId=${to}`,
        { ...data },
      );

      return res.data;
    },
    mutationKey: [QueryKey.finance.transfer.put],
    onSuccess: (data) => console.log(data),
  });
};

export const useGetIncome = ({
  roomNumber,
  year,
  month,
}: {
  roomNumber: string;
  year: string;
  month: string;
}) => {
  return useQuery({
    queryKey: [QueryKey.finance.ig],
    queryFn: async () => {
      const res = await axios.get<IncomeGet>(
        `${process.env.NEXT_PUBLIC_API_URL}/room/${roomNumber}/finance/income?year=${year}&month=${month}`,
      );

      return res.data;
    },
    enabled: roomNumber !== "undefined",
  });
};

export const useGetExpense = ({
  roomNumber,
  year,
  month,
}: {
  roomNumber: string;
  year: string;
  month: string;
}) => {
  return useQuery({
    queryKey: [QueryKey.finance.eg],
    queryFn: async () => {
      const res = await axios.get<ExpenseGet>(
        `${process.env.NEXT_PUBLIC_API_URL}/room/${roomNumber}/finance/expense?year=${year}&month=${month}`,
      );

      return res.data;
    },
    enabled: roomNumber !== "undefined",
  });
};

export const usePostBudgetPlan = () => {
  return useMutation({
    mutationFn: async ({
      roomNumber,
      planType,
      data,
    }: {
      roomNumber: string;
      planType: string;
      data: Omit<FinanceSavingGoals, "savingGoalId">;
    }) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/room/${roomNumber}/finance/${planType}`,
        data,
      );

      return res.data;
    },
    mutationKey: [QueryKey.finance.savingGoal.post],
    onSuccess: (data) => console.log(data),
  });
};

export const usePutSavingGoal = () => {
  return useMutation({
    mutationFn: async ({
      roomNumber,
      accountId,
      data,
    }: {
      roomNumber: string;
      accountId: string;
      data: Omit<FinanceSavingGoals, "savingGoalId">;
    }) => {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/room/${roomNumber}/finance/savingGoal/${accountId}`,
        { ...data },
      );

      return res.data;
    },
    mutationKey: [QueryKey.finance.savingGoal.put],
    onSuccess: (data) => console.log(data),
  });
};

export const usePutPredicted = () => {
  return useMutation({
    mutationFn: async ({
      roomNumber,
      accountId,
      type,
      data,
    }: {
      roomNumber: string;
      accountId: string;
      type: string;
      data: Omit<FinancePredictedExpenses, "expenseId">;
    }) => {
      const txnType = type === "income" ? "Income" : "Expense";
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/room/${roomNumber}/finance/predicted${txnType}/${accountId}`,
        data,
      );

      return res.data;
    },
    mutationKey: [QueryKey.finance.expectedExpense.put],
    onSuccess: (data) => console.log(data),
  });
};
