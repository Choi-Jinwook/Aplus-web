import { QueryKey } from "@shared/queryKey";
import { HomeData } from "@shared/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetHome = (roomNumber: string, memberId: string) => {
  const res = useQuery({
    queryKey: [QueryKey.home],
    queryFn: async () => {
      const _res = await axios.get<HomeData>(
        `${process.env.NEXT_PUBLIC_API_URL}/room/${roomNumber}/home?memberId=${memberId}`,
      );

      return _res.data;
    },
    enabled: roomNumber !== "undefined" && memberId !== "undefined",
  });

  return res;
};
