import styled from "@emotion/styled";
import { useGetFoods } from "@shared/apis/Foods";
import { currentChangeFood, deviceHeight } from "@shared/atoms";
import { Badge, FoodCard, Icon, Slider, Text } from "@shared/components";
import { FoodsBody, StorageType } from "@shared/types";
import {
  calculateRemainDay,
  getSoonExpiredFoods,
  upperFirstLetter,
} from "@shared/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Colors, Shadow } from "styles";

export interface Foods {
  [key: string]: FoodsBody[];
}

const Food = () => {
  const DAY_ALERT = 3;
  const categories: StorageType[] = [
    "frozen",
    "refrigerated",
    "roomTemperature",
  ];

  const {
    query: { roomId },
    push,
  } = useRouter();

  const [sort, setSort] = useState("Purchased Date");
  const [isOpenSort, setIsOpenSort] = useState(false);
  const [foods, setFoods] = useState<Foods>();
  const [soon, setSoon] = useState<FoodsBody[] | null>(null);
  const height = useRecoilValue(deviceHeight);
  const [, setCurrentFood] = useRecoilState(currentChangeFood);

  const { data: foodData, isLoading, refetch } = useGetFoods(String(roomId));

  const handleClickSort = () => {
    setIsOpenSort((prev) => !prev);
  };

  const handleSort = (value: string) => {
    setSort(value);
  };

  const handleClickAddNew = () => {
    push(`/${roomId}/foods/add`);
  };

  const handleClickFood = (category: string, index: number) => {
    if (foods) {
      setCurrentFood(foods[category][index]);
      // push(`/${roomId}/foods/change?category=${category}`);
    }
  };

  const handleSoon = (data: FoodsBody[]) => {
    setSoon(data);
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (foodData) setFoods(foodData);
    getSoonExpiredFoods(handleSoon, foodData);
  }, [foodData]);

  return (
    <>
      {isLoading ? (
        <Empty height={height}>
          <Text type="Body" color={Colors.Gray500}>
            Loading...
          </Text>
        </Empty>
      ) : foods &&
        !Object.values(foods).every(
          (array) => Array.isArray(array) && array.length === 0,
        ) ? (
        <Container height={height}>
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
                        {
                          foodName,
                          createAt,
                          memberName,
                          quantity,
                          amount,
                          isFavorite,
                        },
                        index,
                      ) => {
                        return (
                          <FoodInfoWrapper
                            key={foodName + memberName + index}
                            index={index}
                            onClick={() => handleClickFood(_category, index)}
                          >
                            <IconContainer>
                              <Icon
                                icon={
                                  isFavorite
                                    ? "Like_Button_Filled"
                                    : "Like_Button"
                                }
                                color={Colors.Gray200}
                              />
                            </IconContainer>
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

          <AddNewButton onClick={handleClickAddNew}>
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

          <AddNewButton onClick={handleClickAddNew}>
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

const Container = styled.main<{ height: number | null }>`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100vw;
  height: ${({ height }) => height && `${height - 108}px`};
  top: 48px;
  padding: 12px 0;
  gap: 20px;
  background-color: ${Colors.Gray50};
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CardContainer = styled.section`
  display: flex;
  min-height: fit-content;
  padding: 0 12px;
  gap: 8px;
  overflow-x: scroll;

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

  &:hover {
    background-color: ${Colors.Gray50};
  }

  ${({ index }) => {
    switch (index) {
      case 0:
        return;
      default:
        return `border-top: 1px solid ${Colors.Gray200};`;
    }
  }}
`;

const IconContainer = styled.div``;

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
