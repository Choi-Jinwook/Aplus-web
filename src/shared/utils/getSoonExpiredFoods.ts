import { Foods } from "@pages/[roomId]/foods";
import { FoodsBody } from "@shared/types";
import calculateRemainDay from "./calculateRemainDay";

const getSoonExpiredFoods = (
  handleSoon: (data: FoodsBody[]) => void,
  data?: Foods,
) => {
  const categories = ["frozen", "refrigerated", "roomTemperature"];

  if (data) {
    const _res: FoodsBody[] = [];

    categories.forEach((category) => {
      data[category].forEach((_data) => {
        const { isAlert, day } = calculateRemainDay(_data.expirationDate, 3);
        if (isAlert) _res.push(_data);
      });
    });

    handleSoon(_res);
  }
};

export default getSoonExpiredFoods;
