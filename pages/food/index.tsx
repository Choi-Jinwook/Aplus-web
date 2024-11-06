import styled from "@emotion/styled";
import { useGetFoods } from "@shared/apis/Foods";
import { Badge, FoodCard, Icon, Slider, Text } from "@shared/components";
import { FoodsBody, StorageType } from "@shared/types";
import {
  calculateRemainDay,
  getYearMonthDay,
  upperFirstLetter,
} from "@shared/utils";
import { useEffect, useState } from "react";
import { Colors } from "styles";

export interface Foods {
  [key: string]: FoodsBody[];
}

const Food = () => {
  const today = new Date();
  const DAY = 24 * 60 * 60 * 1000;
  const DAY_ALERT = 3;
  const categories: StorageType[] = [
    "frozen",
    "refrigerated",
    "roomTemperature",
  ];

  const [sort, setSort] = useState("Purchased Date");
  const [isOpenSort, setIsOpenSort] = useState(false);
  const [roomNumber, setRoomNumber] = useState<string | null>(null);
  const [foods, setFoods] = useState<Foods>();
  const { data: foodData } = useGetFoods(roomNumber);

  useEffect(() => {
    if (localStorage.getItem("roomNum")) {
      setRoomNumber(localStorage.getItem("roomNum"));
    }
  }, []);

  useEffect(() => {
    if (foodData) setFoods(foodData);
  }, [foodData]);

  const soon = [
    { name: "Yogurt", expire: today, owner: ["Mike"], amount: "6" },
    {
      name: "Seoul Milk",
      expire: new Date(today.getTime() + 2 * DAY),
      owner: ["All"],
      amount: "75%",
    },
    {
      name: "Cracker",
      expire: new Date(today.getTime() + 4 * DAY),
      owner: ["Minsoo", "Seoyoung"],
      amount: "5%",
    },
  ];

  const handleClickSort = () => {
    setIsOpenSort((prev) => !prev);
  };

  const handleSort = (value: string) => {
    setSort(value);
  };

  const handleChangeFoodAmount = (
    storageType: string,
    index: number,
    amount: string,
  ) => {
    setFoods((prev) => {
      if (prev) {
        const newFoods = { ...prev };
        newFoods[storageType][index] = {
          ...newFoods[storageType][index],
          amount: amount,
        };

        return newFoods;
      }
    });
  };
  console.log(foods);

  return (
    <Container>
      <CardContainer>
        {soon.map(({ name, expire, owner, amount }) => {
          const { day } = calculateRemainDay(expire, DAY_ALERT);

          return (
            <FoodCard
              key={name + amount}
              owner={owner}
              name={name}
              expire={day}
              amount={amount}
            />
          );
        })}
      </CardContainer>

      <FoodArea>
        <Sort onClick={handleClickSort}>
          <Text type="LabelLight" color={Colors.Gray500}>
            {`Sorted by: ${sort}`}
          </Text>
          <Icon icon="TriangleDown" />
        </Sort>

        {categories.map((_category) => (
          <CategoryContainer key={_category}>
            <Text type="Label">{`${upperFirstLetter(_category)} Foods`}</Text>
            <FoodInfoContainer>
              {foods &&
                foods[_category].map(
                  (
                    { foodName, createAt, memberName, quantity, amount },
                    index,
                  ) => {
                    return (
                      <FoodInfoWrapper
                        key={foodName + memberName + index}
                        index={index}
                      >
                        <Icon icon="Like_Button" color={Colors.Gray200} />
                        <FoodInfo>
                          <NamdDate>
                            <Text type="BodyBold">{foodName}</Text>
                            <Text type="LabelLight" color={Colors.Gray400}>
                              {`Purchased at ${getYearMonthDay(createAt)}`}
                            </Text>
                          </NamdDate>
                          <OwnerRemain>
                            <Owner>
                              <Badge
                                color={
                                  memberName === "All"
                                    ? Colors.White
                                    : Colors.Orange200
                                }
                                backgroundColor={
                                  memberName === "All"
                                    ? Colors.Orange200
                                    : Colors.Orange50
                                }
                              >
                                {memberName}
                              </Badge>
                            </Owner>
                            {amount && !quantity ? (
                              <Slider
                                value={amount}
                                index={index}
                                storageType={_category}
                                onChange={(_category, _index, _amount) =>
                                  handleChangeFoodAmount(
                                    _category,
                                    _index,
                                    _amount,
                                  )
                                }
                              />
                            ) : (
                              <RemainContainer>
                                <Text type="Label" color={Colors.Gray500}>
                                  remaining
                                </Text>
                                <RemainCount>
                                  <Text type="BodyBold">{quantity}</Text>
                                </RemainCount>
                              </RemainContainer>
                            )}
                          </OwnerRemain>
                        </FoodInfo>
                      </FoodInfoWrapper>
                    );
                  },
                )}
            </FoodInfoContainer>
          </CategoryContainer>
        ))}
      </FoodArea>

      <AdjustHeight />
    </Container>
  );
};

export default Food;

const Container = styled.main`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100vw;
  top: 48px;
  padding: 12px 0;
  gap: 20px;
  background-color: ${Colors.Gray50};
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CardContainer = styled.section`
  display: flex;
  gap: 8px;
  padding: 0 12px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const FoodArea = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Sort = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${Colors.White};
  padding: 20px 12px;
  gap: 20px;
`;

const FoodInfoContainer = styled.div`
  padding: 0 8px;
`;

const FoodInfoWrapper = styled.div<{ index: number }>`
  display: flex;
  padding: 8px 0;
  gap: 12px;

  ${({ index }) => {
    switch (index) {
      case 0:
        return;
      default:
        return `border-top: 1px solid ${Colors.Gray200};`;
    }
  }}
`;

const FoodInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;

const NamdDate = styled.div``;

const OwnerRemain = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Owner = styled.div`
  display: flex;
  gap: 4px;
`;

const PercentBar = styled.div`
  width: 116px;
  height: 24px;
  border-radius: 6px;
  background-color: ${Colors.Gray50};
`;

const RemainPercentBar = styled.div<{ amount: string }>`
  width: ${({ amount }) => `${(116 * Number(amount)) / 100}px`};
  height: 24px;
  border-radius: 6px 0 0 6px;
  background-color: ${Colors.Gray300};
`;

const RemainContainer = styled.div`
  display: flex;
  gap: 9px;
  align-items: center;
`;

const RemainCount = styled.div`
  display: flex;
  width: 32px;
  height: 36px;
  border-radius: 8px;
  background-color: ${Colors.Orange50};
  justify-content: center;
  align-items: center;
`;

const AdjustHeight = styled.div`
  height: 52px;
`;
