import getMonth from "./getMonth";

const getExistingDates = (data: string[]) => {
  const dates: string[] = [];

  data.forEach((date) => {
    const [year, month, day] = date.split("-");
    const formattedMonth = getMonth(Number(month), true);
    const final = `${year} ${formattedMonth}`;

    if (!dates.includes(final)) dates.push(final);
  });

  return dates;
};

export default getExistingDates;
