import styled from "@emotion/styled";
import { useGetMember, usePostFoods } from "@shared/apis";
import { currentChangeFood, deviceHeight } from "@shared/atoms";
import { Chip, Text } from "@shared/components";
import { FoodsBody, StorageType, UserData } from "@shared/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Colors, Shadow } from "styles";

const FoodChange = () => {
  const {
    query: { roomId, category },
    push,
  } = useRouter();
  const [dateWarn, setDateWarn] = useState(false);
  const [isAmount, setIsAmount] = useState(false);
  const [storageType, setStorageType] = useState<StorageType>("frozen");
  const [foods, setFoods] = useState<FoodsBody | null>(null);
  const height = useRecoilValue(deviceHeight);
  const currentFood = useRecoilValue(currentChangeFood);

  // const { data: users } = useGetMember(String(roomId), { roomPassword: "" });
  const { mutateAsync: postFoods } = usePostFoods();

  const users: UserData[] = [
    {
      memberId: 1,
      memberName: "Seoyeong",
      memberPassword: "123",
      memberIcon: "ICON1",
    },
    {
      memberId: 2,
      memberName: "Jinwook",
      memberPassword: "123",
      memberIcon: "ICON1",
    },
    {
      memberId: 3,
      memberName: "Minsoo",
      memberPassword: "123",
      memberIcon: "ICON1",
    },
    {
      memberId: 4,
      memberName: "Mike",
      memberPassword: "123",
      memberIcon: "ICON1",
    },
    {
      memberId: 5,
      memberName: "All",
      memberPassword: "123",
      memberIcon: "ICON1",
    },
  ];

  const handleClickPercentage = () => {
    setIsAmount((prev) => !prev);
  };

  const handleClickStorageMethod = (type: StorageType) => {
    setStorageType(type);
  };

  const handleClickAmount = (type: boolean) => {
    if (isAmount) return;
    setFoods((prev) => {
      if (prev) {
        return type
          ? { ...prev, quantity: Number(prev.quantity) + 1 }
          : { ...prev, quantity: Math.max(Number(prev.quantity) - 1, 1) };
      }

      return null;
    });
  };

  const handleChangeDate = (type: boolean, value: string) => {
    if (foods) {
      if (type) {
        if (foods.expirationDate < value) {
          setDateWarn(true);
          return;
        }
      }

      if (foods.createAt > value) {
        setDateWarn(true);
        return;
      }
    }

    setDateWarn(false);

    setFoods((prev) => {
      if (prev) {
        return type
          ? { ...prev, createAt: value }
          : { ...prev, expirationDate: value };
      }

      return null;
    });
  };

  const handleClickSave = async () => {
    if (foods === currentFood) return;

    if (foods) {
      try {
        await postFoods({ roomNumber: String(roomId), data: foods });

        push(`/${roomId}/foods`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (currentFood) {
      setFoods(currentFood);
      setStorageType(category as StorageType);
      setIsAmount(currentFood.amount ? true : false);
    }
  }, [currentFood]);

  return (
    <Container height={height}>
      {currentFood && foods && (
        <>
          <TitleContainer>
            <Text type="BodyBold">{currentFood.foodName}</Text>
          </TitleContainer>
          <FoodInfoContainer>
            <NumOfItems>
              <Text type="LabelLight" color={Colors.Gray600}>
                Number of Items
              </Text>
              <ItemAmountContainer>
                <AdjustItems isAmount={isAmount}>
                  <AmountButton onClick={() => handleClickAmount(false)}>
                    <Text type="Body">-</Text>
                  </AmountButton>
                  <Text type="Label">{foods.amount || foods.quantity}</Text>
                  <AmountButton onClick={() => handleClickAmount(true)}>
                    <Text type="Body">+</Text>
                  </AmountButton>
                </AdjustItems>
                <ConvertButton
                  isAmount={!isAmount}
                  onClick={handleClickPercentage}
                >
                  <Text type="Label">Show as percentage</Text>
                </ConvertButton>
              </ItemAmountContainer>
            </NumOfItems>

            <StorageMethod>
              <Text type="LabelLight" color={Colors.Gray600}>
                Storage Method
              </Text>
              <SegmentedPicker>
                <MethodContainer
                  onClick={() => handleClickStorageMethod("refrigerated")}
                  isSelected={storageType === "refrigerated"}
                >
                  <Text
                    type="Label"
                    color={
                      storageType === "refrigerated"
                        ? Colors.Gray600
                        : Colors.Gray400
                    }
                  >
                    Refrigerated
                  </Text>
                </MethodContainer>
                <MethodContainer
                  onClick={() => handleClickStorageMethod("frozen")}
                  isSelected={storageType === "frozen"}
                >
                  <Text
                    type="Label"
                    color={
                      storageType === "frozen" ? Colors.Gray600 : Colors.Gray400
                    }
                  >
                    Frozen
                  </Text>
                </MethodContainer>
                <MethodContainer
                  onClick={() => handleClickStorageMethod("roomTemperature")}
                  isSelected={storageType === "roomTemperature"}
                >
                  <Text
                    type="Label"
                    color={
                      storageType === "roomTemperature"
                        ? Colors.Gray600
                        : Colors.Gray400
                    }
                  >
                    Room temp
                  </Text>
                </MethodContainer>
              </SegmentedPicker>
            </StorageMethod>

            <Owner>
              <Text type="LabelLight" color={Colors.Gray600}>
                Owner
              </Text>
              <Users>
                {users?.map(({ memberId, memberName }) => (
                  <Chip key={memberId}>{memberName}</Chip>
                ))}
              </Users>
            </Owner>

            <FoodDate>
              <DateContainer>
                <Text type="LabelLight" color={Colors.Gray600}>
                  Purchase Date
                </Text>
                <DatePicker>
                  <DateInput
                    value={foods.createAt}
                    type="date"
                    placeholder="YYYY-MM-DD"
                    onChange={({ target: { value } }) =>
                      handleChangeDate(true, value)
                    }
                  />
                </DatePicker>
              </DateContainer>
              <DateContainer>
                <Text type="LabelLight" color={Colors.Gray600}>
                  Expiration Date
                </Text>
                <DatePicker>
                  <DateInput
                    value={foods.expirationDate}
                    type="date"
                    placeholder="YYYY-MM-DD"
                    onChange={({ target: { value } }) =>
                      handleChangeDate(false, value)
                    }
                  />
                </DatePicker>
              </DateContainer>
            </FoodDate>
            {dateWarn && (
              <Text type="LabelLight" color={Colors.State_Negative}>
                Wrong Date Input
              </Text>
            )}

            <SaveButton onClick={handleClickSave}>
              <Text type="Label" color={Colors.White}>
                Save
              </Text>
            </SaveButton>
          </FoodInfoContainer>
        </>
      )}
    </Container>
  );
};

export default FoodChange;

const Container = styled.main<{ height: number | null }>`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100vw;
  height: ${({ height }) => height && `${height - 108}px`};
  top: 48px;
  padding: 12px;
  gap: 8px;
  background-color: ${Colors.Gray50};
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TitleContainer = styled.section`
  border-radius: 16px;
  background-color: ${Colors.White};
  padding: 8px 16px;
  ${Shadow.Small};
`;

const FoodInfoContainer = styled.section`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: ${Colors.White};
  padding: 10px 12px;
  gap: 12px;
  justify-content: space-between;
  ${Shadow.Small};
`;

const NumOfItems = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2px;
`;

const ItemAmountContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
`;

const AdjustItems = styled.div<{ isAmount: boolean }>`
  display: flex;
  height: 32px;
  border-radius: 8px;
  background-color: ${({ isAmount }) =>
    isAmount ? Colors.Gray50 : Colors.Orange50};
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
`;

const AmountButton = styled.div`
  width: 32px;
  height: 32px;
  padding: 0 12px 4px 12px;
`;

const ConvertButton = styled.div<{ isAmount: boolean }>`
  display: flex;
  height: 32px;
  border-radius: 8px;
  background-color: ${({ isAmount }) =>
    isAmount ? Colors.Gray50 : Colors.Orange50};
  padding: 0 8px;
  justify-content: space-between;
  align-items: center;
`;

const StorageMethod = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2px;
`;

const SegmentedPicker = styled.div`
  display: flex;
  border-radius: 8px;
  background-color: ${Colors.Gray50};
  height: 36px;
  padding: 4px;
  gap: 2px;
`;

const MethodContainer = styled.div<{ isSelected?: boolean }>`
  display: flex;
  width: 100%;
  height: 28px;
  padding: 8px;
  justify-content: center;
  align-items: center;

  ${({ isSelected }) => {
    if (isSelected) {
      return `
        border-radius: 8px;
        background-color: ${Colors.White};
      `;
    }
  }}
`;

const Owner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Users = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const FoodDate = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 2px;
`;

const DatePicker = styled.div`
  display: flex;
  height: 36px;
  border-radius: 8px;
  background-color: ${Colors.Gray50};
  padding: 8px;
  gap: 10px;
  align-items: center;
`;

const DateInput = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
`;

const SaveButton = styled.button`
  display: flex;
  position: fixed;
  top: 10px;
  right: 12px;
  border: none;
  border-radius: 6px;
  background-color: ${Colors.Gray400};
  padding: 4px 10px;
  justify-content: center;
  align-items: center;
  z-index: 999999;
`;
