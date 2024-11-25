import { QueryKey } from "@shared/queryKey";
import { ChorePost, ChoresBody } from "@shared/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetChores = (roomNumber: string) => {
  return useQuery({
    queryKey: [QueryKey.chore.get],
    queryFn: async () => {
      const _res = await axios.get<ChoresBody[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/room/${roomNumber}/chores`,
      );

      return _res.data;
    },
    enabled: roomNumber !== "undefined",
  });
};

export const usePostChores = () => {
  return useMutation({
    mutationFn: async ({
      roomNumber,
      data,
    }: {
      roomNumber: string;
      data: ChorePost;
    }) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/room/${roomNumber}/chores`,
        data,
      );

      return res;
    },
    mutationKey: [QueryKey.chore.post],
    onSuccess: (data) => console.log(data),
  });
};
