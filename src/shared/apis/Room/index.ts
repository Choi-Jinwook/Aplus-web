import { QueryKey } from "@shared/queryKey";
import { RoomBody, UserBody } from "@shared/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const usePostCreateRoom = () => {
  return useMutation({
    mutationFn: async (data: RoomBody) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/room`,
        data,
      );

      return res.data;
    },
    mutationKey: [QueryKey.room.post],
    onSuccess: (data) => console.log(data),
  });
};

export const usePostMember = () => {
  return useMutation({
    mutationFn: async ({
      roomNumber,
      data,
    }: {
      roomNumber: string;
      data: UserBody;
    }) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/room/${roomNumber}/member`,
        data,
      );

      return res.data;
    },
    mutationKey: [QueryKey.user.post],
    onSuccess: (data) => console.log(data),
  });
};
