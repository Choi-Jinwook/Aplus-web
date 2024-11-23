import { Foods } from "@pages/[roomId]/foods";
import { QueryKey } from "@shared/queryKey";
import { FoodsBody } from "@shared/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetFoods = (roomNumber: string | null) => {
  const res = useQuery({
    queryKey: [QueryKey.food.get, roomNumber],
    queryFn: async () => {
      const _res = await axios.get<Foods>(
        `${process.env.NEXT_PUBLIC_API_URL}/room/${roomNumber}/foods`,
      );

      return _res.data;
    },
    enabled: roomNumber !== "undefined",
  });

  return res;
};

export const usePostFoods = () => {
  return useMutation({
    mutationFn: async ({
      roomNumber,
      data,
    }: {
      roomNumber: string;
      data: Omit<FoodsBody, "foodId">;
    }) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/room/${roomNumber}/foods`,
        data,
      );

      return res.data;
    },
    mutationKey: [QueryKey.food.post],
    onSuccess: (data) => console.log(data),
  });
};
