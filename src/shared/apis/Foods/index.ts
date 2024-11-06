import { Foods } from "@pages/food";
import { QueryKey } from "@shared/queryKey";
import { FoodsBody } from "@shared/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetFoods = (roomNumber?: string | null) => {
  const res = useQuery({
    queryKey: [QueryKey.food, roomNumber],
    queryFn: async () => {
      const _res = await axios.get<Foods>(
        `${process.env.NEXT_PUBLIC_API_URL}/room/${roomNumber}/foods`,
      );

      return _res.data;
    },
    enabled: roomNumber !== null,
  });

  return res;
};
