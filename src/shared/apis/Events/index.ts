import { QueryKey } from "@shared/queryKey";
import { EventsBody, EventsGet } from "@shared/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

interface EventMonth {
  [key: string]: EventsGet[];
}

interface Event {
  [key: string]: EventMonth;
}

export const useGetEvents = (roomNumber: string) => {
  return useQuery({
    queryKey: [QueryKey.event.get],
    queryFn: async () => {
      const res = await axios.get<EventsGet[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/room/${roomNumber}/events`,
      );

      return res.data;
    },
    enabled: roomNumber !== "undefined",
    select: (data) => {
      return data.reduce((acc, event) => {
        const [year, month] = event.eventDay.split("-");
        if (!acc[year]) {
          acc[year] = {};
        }
        if (!acc[year][month]) {
          acc[year][month] = [];
        }
        acc[year][month].push(event);
        return acc;
      }, {} as Record<string, Record<string, EventsGet[]>>);
    },
  });
};

export const usePostEvents = () => {
  return useMutation({
    mutationFn: async ({
      roomNumber,
      data,
    }: {
      roomNumber: string;
      data: EventsBody;
    }) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/room/${roomNumber}/events`,
        { ...data },
      );

      return res.data;
    },
    mutationKey: [QueryKey.event.post],
    onSuccess: (data) => console.log(data),
  });
};
