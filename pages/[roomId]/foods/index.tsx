import styled from "@emotion/styled";
import { useGetFoods } from "@shared/apis/Foods";
import { deviceHeight } from "@shared/atoms";
import { Badge, FoodCard, Icon, Slider, Text } from "@shared/components";
import { FoodsBody, StorageType } from "@shared/types";
import {
  calculateRemainDay,
  getSoonExpiredFoods,
  upperFirstLetter,
} from "@shared/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Colors, Shadow } from "styles";

export interface Foods {
  [key: string]: FoodsBody[];
}

const Food = () => {
  const DAY_ALERT = 3;
  const today = new Date();
  const categories: StorageType[] = [
    "frozen",
    "refrigerated",
    "roomTemperature",
  ];

  const {
    query: { roomId },
  } = useRouter();

  const [sort, setSort] = useState("Purchased Date");
  const [isOpenSort, setIsOpenSort] = useState(false);
  const [foods, setFoods] = useState<Foods>();
  const [soon, setSoon] = useState<FoodsBody[] | null>(null);
  const height = useRecoilValue(deviceHeight);

  const { data: foodData } = useGetFoods(String(roomId));

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
          amount: Number(amount),
        };

        return newFoods;
      }
    });
  };

  const handleSoon = (data: FoodsBody[]) => {
    setSoon(data);
  };

  useEffect(() => {
    if (foodData) setFoods(foodData);
    getSoonExpiredFoods(handleSoon, foodData);
  }, [foodData]);

  return (
    <>
      {foods &&
      !Object.values(foods).every(
        (array) => Array.isArray(array) && array.length === 0,
      ) ? (
        <Container>
          <CardContainer>
            {soon &&
              soon.map(
                ({
                  foodId,
                  foodName,
                  expirationDate,
                  quantity,
                  amount,
                  memberName,
                }) => {
                  const { day } = calculateRemainDay(expirationDate, DAY_ALERT);

                  return (
                    <FoodCard
                      key={foodId}
                      owner={[memberName]}
                      name={foodName}
                      expire={day}
                      amount={amount}
                      quantity={quantity}
                    />
                  );
                },
              )}
          </CardContainer>

          <FoodArea>
            <Sort onClick={handleClickSort}>
              <Text type="LabelLight" color={Colors.Gray500}>
                {`Sorted by: ${sort}`}
              </Text>
              <Icon icon="TriangleDown" />
            </Sort>

            <FoodAreaWrapper>
              {categories.map((_category) => (
                <CategoryContainer key={_category}>
                  <Text type="Label">{`${upperFirstLetter(
                    _category,
                  )} Foods`}</Text>
                  <FoodInfoContainer>
                    {foods[_category].map(
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
                                  {`Purchased at ${createAt}`}
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
                                    value={String(amount)}
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
            </FoodAreaWrapper>
          </FoodArea>

          <AddNewButton onClick={() => alert("add New")}>
            <Icon icon="Plus_Button" color={Colors.White} size={32} />
          </AddNewButton>
        </Container>
      ) : (
        <Empty height={height}>
          <Text type="Body" color={Colors.Gray500}>
            Your food list is empty!
          </Text>
          <Text type="Body" color={Colors.Gray500}>
            {`Add items and manage them with HOUSIT :)`}
          </Text>

          <AddNewButton onClick={() => alert("add New")}>
            <Icon icon="Plus_Button" color={Colors.White} size={32} />
          </AddNewButton>
        </Empty>
      )}
    </>
  );
};

export default Food;

const Empty = styled.div<{ height: number | null }>`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100vw;
  height: ${({ height }) => height && `${height - 108}px`};
  top: 48px;
  background-color: ${Colors.Gray50};
  justify-content: center;
  align-items: center;
`;

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

const FoodAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
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

const AddNewButton = styled.div`
  display: flex;
  position: fixed;
  width: 56px;
  height: 56px;
  bottom: 70px;
  right: 20px;
  border-radius: 28px;
  background-color: ${Colors.Gray600};
  padding: 16px;
  gap: 10px;
  justify-content: center;
  align-items: center;
  ${Shadow.Medium};
  z-index: 9999;
`;

const AdjustHeight = styled.div`
  height: 52px;
`;
