import { QueryKey } from "@shared/queryKey";
import { ChoresBody } from "@shared/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetChores = (roomNumber: string) => {
  return useQuery({
    queryKey: [QueryKey.chore],
    queryFn: async () => {
      const _res = await axios.get<ChoresBody[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/room/${roomNumber}/chores`,
      );

      return _res.data;
    },
    enabled: roomNumber !== "undefined",
  });
};
