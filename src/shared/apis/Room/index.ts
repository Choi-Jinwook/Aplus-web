import { QueryKey } from "@shared/queryKey";
import { RoomBody, RoomResponse, UserBody, UserData } from "@shared/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const usePostCreateRoom = () => {
  return useMutation({
    mutationFn: async (data: RoomBody) => {
      const res = await axios.post<RoomResponse>(
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

export const useGetMember = () => {
  return useMutation({
    mutationKey: [QueryKey.user.get],
    mutationFn: async ({
      roomNumber,
      roomPassword,
    }: {
      roomNumber: string;
      roomPassword: string;
    }) => {
      try {
        const res = await axios.post<UserData[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/room/${roomNumber}/join`,
          { roomPassword: roomPassword },
        );

        return {
          status: res.status,
          data: res.data,
        };
      } catch (error: any) {
        if (error.response) {
          return {
            status: error.response.status,
          };
        }
        throw error;
      }
    },
    onSuccess: (data) => console.log(data),
  });
};

export const useGetRoomId = () => {
  return useMutation({
    mutationKey: [QueryKey.room.roomId],
    mutationFn: async (roomName: string) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/room/roomId`,
        { roomName: roomName },
      );

      return res;
    },
    onSuccess: (data) => console.log(data),
  });
};

export const usePostMemberPassword = () => {
  return useMutation({
    mutationKey: [QueryKey.room.passowrd],
    mutationFn: async ({
      roomId,
      memberId,
      data,
    }: {
      roomId: string;
      memberId: string;
      data: { memberPassword: string };
    }) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/room/${roomId}/memberId/${memberId}/join`,
        data,
      );

      return res;
    },
    onSuccess: (data) => console.log(data),
  });
};
