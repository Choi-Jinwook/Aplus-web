import { QueryKey } from "@shared/queryKey";
import {
  FinanceInfoBody,
  GetFinanceHistory,
  PostFinanceAccount,
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
    enabled: roomNumber !== null,
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
        { ...data },
      );

      return res.data;
    },
    mutationKey: [QueryKey.finance.account],
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
      const res = await axios.get<GetFinanceHistory>(
        `${process.env.NEXT_PUBLIC_API_URL}/room/${roomNumber}/finance/${accountId}?year=${year}&month=${month}`,
      );

      return res.data;
    },
    enabled: roomNumber !== null,
  });
};
