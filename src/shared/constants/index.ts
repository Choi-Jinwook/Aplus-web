export const ERROR_MESSAGE = {
  PASSWORD: {
    CURRENT: "Incorrect current password! Please try again",
    USER_NEW: "User password should be 4 digits",
    ROOM_NEW: "Room password should be 6 digits",
  },
  ROOM: {
    PASSWORD: "Incorrect password! Please try again",
    NAME: "Incorrect room name! Please try again",
    USER: "Something wrong. Please contact developer",
  },
  NORMAL: (error: unknown) => `Critical Bug. Call Team A, Error: ${error}`,
};
