import { QueryKey } from "@shared/queryKey";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetHome = (roomNumber: string) => {
  const res = useQuery({
    queryKey: [QueryKey.home],
    queryFn: async () => {
      const _res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/room/${roomNumber}/home`,
      );

      return _res.data;
    },
    enabled: roomNumber !== "undefined",
  });

  return res;
};
