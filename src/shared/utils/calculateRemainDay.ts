import getYearMonthDay from "./getYearMonthDay";

const calculateRemainDay = (date: Date, alert: number) => {
  const DAY = 24 * 60 * 60 * 1000;
  const today = new Date();
  const gap = Math.floor((date.getTime() - today.getTime()) / DAY);

  if (gap <= alert && gap >= 0) {
    switch (gap) {
      case 0:
        return { isAlert: true, day: "Today" };
      case 1:
        return { isAlert: true, day: "Tomorrow" };
      default:
        return { isAlert: true, day: `${gap} days left` };
    }
  }

  return { isAlert: false, day: `${gap} days left` };
};

export default calculateRemainDay;
