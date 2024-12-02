import { ChoreMembers, FoodsBody } from "@shared/types";
import { atom } from "recoil";

export const roomName = atom<string>({
  default: "",
  key: "roomName",
});

export const roomPassword = atom<string>({
  default: "",
  key: "roomPassword",
});

export const userName = atom<string>({
  default: "",
  key: "userName",
});

export const userPassword = atom<string>({
  default: "",
  key: "userPassword",
});

export const currentUser = atom<ChoreMembers[] | null>({
  default: null,
  key: "currentUser",
});

export const deviceHeight = atom<number | null>({
  default: null,
  key: "deviceHeight",
});

export const currentChangeFood = atom<FoodsBody | null>({
  default: null,
  key: "currentChangeFood",
});

export const roomMembers = atom<ChoreMembers[] | null>({
  default: null,
  key: "roomMembers",
});
