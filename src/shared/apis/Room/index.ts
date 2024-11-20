import { QueryKey } from "@shared/queryKey";
import { RoomBody, UserBody, UserData } from "@shared/types";
import { useMutation, useQuery } from "@tanstack/react-query";
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

export const usePutMember = () => {
  return useMutation({
    mutationFn: async ({
      roomNumber,
      memberId,
      data,
    }: {
      roomNumber: string;
      memberId: string;
      data: UserBody;
    }) => {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/room/${roomNumber}/member/${memberId}`,
        data,
      );

      return res.data;
    },
    mutationKey: [QueryKey.user.put],
    onSuccess: (data) => console.log(data),
  });
};

export const useGetMember = (
  roomNumber: string,
  data: { roomPassword: string },
) => {
  return useQuery({
    queryKey: [QueryKey.user.get],
    queryFn: async () => {
      const res = await axios.post<UserData[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/room/${roomNumber}/join`,
        data,
      );

      return res.data;
    },
    enabled: roomNumber !== "undefined",
  });
};