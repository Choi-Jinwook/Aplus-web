import styled from "@emotion/styled";
import { usePostFoods } from "@shared/apis";
import { deviceHeight, roomMembers } from "@shared/atoms";
import { Chip, Icon, Text } from "@shared/components";
import { StorageType } from "@shared/types";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Colors, Shadow } from "styles";

type Option = "Manual" | "Barcode";

const FoodAdd = () => {
  const {
    query: { roomId, category },
    push,
  } = useRouter();
  const today = new Date();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [currentOption, setCurrentOption] = useState<Option>("Manual");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [storageType, setStorageType] = useState<StorageType>("refrigerated");
  const [owner, setOwner] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(
    today.toISOString().split("T")[0],
  );
  const [expirationDate, setExpirationDate] = useState(
    today.toISOString().split("T")[0],
  );
  const [dateWarn, setDateWarn] = useState(false);
  const [isAmount, setIsAmount] = useState(false);
  const height = useRecoilValue(deviceHeight);
  const member = useRecoilValue(roomMembers);

  const { mutateAsync: postFoods } = usePostFoods();

  const openCamera = () => {
    if (
      window.AndroidBridge &&
      typeof window.AndroidBridge.openCameraWithQuery === "function"
    ) {
      window.AndroidBridge.openCameraWithQuery(String(roomId));
    } else {
      console.error("AndroidBridge is not available.");
    }
  };

  const handleChangeFoodName = useCallback((value: string) => {
    setName(value);
  }, []);

  const handleClickOption = (value: Option) => {
    setCurrentOption(value);

    if (value === "Barcode") {
      setIsError(false);
      setIsLoading(true);
      openCamera();
    }
  };

  const handleClickPercentage = () => {
    setIsAmount((prev) => !prev);
  };

  const handleClickStorageMethod = (type: StorageType) => {
    setStorageType(type);
  };

  const handleClickOwner = (value: string) => {
    setOwner(value);
  };

  const handleClickAmount = (type: boolean) => {
    setAmount((prev) => (type ? prev + 1 : Math.max(prev - 1, 0)));
  };

  const handleChangeItemNum = (value: string) => {
    setAmount(Number(value));
  };

  const handleChangeDate = (type: boolean, value: string) => {
    if (type) {
      if (expirationDate !== "" && expirationDate < value) {
        setDateWarn(true);
        return;
      }
    }

    if (purchaseDate !== "" && purchaseDate > value) {
      setDateWarn(true);
      return;
    }

    setDateWarn(false);
    if (type) setPurchaseDate(value);
    else setExpirationDate(value);
  };

  const handleClickSave = async () => {
    if (name === "" || owner === "") return;

    try {
      await postFoods({
        roomNumber: String(roomId),
        data: {
          foodName: String(name),
          isFavorite: false,
          isShared: owner === "All",
          createAt: purchaseDate,
          expirationDate: expirationDate,
          quantity: isAmount ? null : Number(amount),
          amount: isAmount ? Number(amount) : null,
          memberName: owner,
          storageType: storageType,
        },
      });

      push(`/${roomId}/foods`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.AndroidBridge) {
        window.handleProductInfo = (productName, expirationDate) => {
          console.log(productName);

          handleChangeFoodName(productName);
          setIsError(false);
          setIsLoading(false);
        };
        window.handleProductInfoError = (errorMessage) => {
          console.log("errorMessage", errorMessage);
          setIsError(true);
          setErrMessage(`Barcode error: ${errorMessage}`);
          setIsLoading(false);
        };
      } else {
        console.error("AndroidBridge is not available at useEffect.");
      }
    }
  }, []);

  console.log(name);

  return (
    <Container height={height}>
      <OptionSelector>
        <OptionContainer
          onClick={() => handleClickOption("Manual")}
          isSelected={currentOption === "Manual"}
        >
          <Icon
            icon="Edit_Button"
            color={currentOption === "Manual" ? Colors.Gray600 : Colors.Gray400}
          />
          <Text
            type="Label"
            color={currentOption === "Manual" ? Colors.Gray600 : Colors.Gray400}
          >
            add manually
          </Text>
        </OptionContainer>
        <OptionContainer
          onClick={() => handleClickOption("Barcode")}
          isSelected={currentOption === "Barcode"}
        >
          <Icon
            icon="Barcode"
            color={
              currentOption === "Barcode" ? Colors.Gray600 : Colors.Gray400
            }
          />
          <Text
            ellipsis
            type="Label"
            color={
              currentOption === "Barcode" ? Colors.Gray600 : Colors.Gray400
            }
          >
            add via barcode
          </Text>
        </OptionContainer>
      </OptionSelector>
      <ChoreNameContainer>
        <ChoreNameInput
          value={name}
          placeholder="Event Name"
          onChange={({ target: { value } }) => handleChangeFoodName(value)}
        />
      </ChoreNameContainer>
      <FoodInfoContainer>
        <NumOfItems>
          <Text type="LabelLight" color={Colors.Gray600}>
            Number of Items
          </Text>
          <ItemAmountContainer>
            <AdjustItems isAmount={isAmount}>
              <AmountButton
                isLeft
                isAmount={isAmount}
                onClick={() => handleClickAmount(false)}
              >
                <Text type="Body">-</Text>
              </AmountButton>
              <ItemInputContainer>
                <ItemInput
                  value={amount}
                  placeholder="0"
                  onChange={({ target: { value } }) =>
                    handleChangeItemNum(value)
                  }
                />
                {isAmount && <Text type="LabelLight">%</Text>}
              </ItemInputContainer>
              <AmountButton
                isAmount={isAmount}
                onClick={() => handleClickAmount(true)}
              >
                <Text type="Body">+</Text>
              </AmountButton>
            </AdjustItems>
            <ConvertButton isAmount={!isAmount} onClick={handleClickPercentage}>
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
            <Chip
              onClick={() => handleClickOwner("All")}
              color={owner === "All" ? Colors.Orange200 : Colors.Gray400}
              backgroundColor={
                owner === "All" ? Colors.Orange50 : Colors.Gray50
              }
            >
              All
            </Chip>
            {member?.map(({ memberId, memberName }) => (
              <Chip
                onClick={() => handleClickOwner(memberName)}
                key={memberId}
                color={owner === memberName ? Colors.Orange200 : Colors.Gray400}
                backgroundColor={
                  owner === memberName ? Colors.Orange50 : Colors.Gray50
                }
              >
                {memberName}
              </Chip>
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
                value={
                  purchaseDate === ""
                    ? today.toISOString().split("T")[0]
                    : purchaseDate
                }
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
                value={
                  expirationDate === ""
                    ? today.toISOString().split("T")[0]
                    : expirationDate
                }
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
        {isLoading && (
          <Text type="LabelLight" color={Colors.Orange200}>
            Loading...
          </Text>
        )}
        {isError && (
          <Text type="LabelLight" color={Colors.Orange200}>
            {errMessage}
          </Text>
        )}

        <SaveButton
          isActive={
            name !== "" &&
            owner !== "" &&
            purchaseDate !== "" &&
            expirationDate !== ""
          }
          onClick={handleClickSave}
        >
          <Text type="Label" color={Colors.White}>
            Save
          </Text>
        </SaveButton>
      </FoodInfoContainer>
    </Container>
  );
};

export default FoodAdd;

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

const OptionSelector = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OptionContainer = styled.div<{ isSelected: boolean }>`
  display: flex;
  width: 50%;
  height: 36px;
  border: 1px solid ${Colors.Gray100};
  background-color: ${({ isSelected }) =>
    isSelected ? Colors.Orange50 : Colors.White};
  padding: 4px 16px;
  justify-content: space-between;
  align-items: center;
`;

const ChoreNameContainer = styled.section`
  display: flex;
  height: 44px;
  border-radius: 16px;
  background-color: ${Colors.White};
  padding: 0px 16px;
  gap: 10px;
  align-items: center;
  ${Shadow.Small};
`;

const ChoreNameInput = styled.input`
  width: 100%;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
  letter-spacing: -0.16px;
  border: none;
  outline: none;
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

const AmountButton = styled.div<{ isAmount: boolean; isLeft?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: ${({ isLeft }) => (isLeft ? `8px 0 0 8px;` : `0 8px 8px 0;`)} 
  background-color: ${({ isAmount }) =>
    isAmount ? Colors.Gray100 : Colors.Orange50};
  padding: 0 12px 4px 12px;
`;

const ItemInputContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: transparent;
  padding: 4px 12px;
  align-items: center;
`;

const ItemInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  text-align: center;
  outline: none;
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

const SaveButton = styled.button<{ isActive: boolean }>`
  display: flex;
  position: fixed;
  top: 10px;
  right: 12px;
  border: none;
  border-radius: 6px;
  background-color: ${({ isActive }) =>
    isActive ? Colors.Blue300 : Colors.Gray400};
  padding: 4px 10px;
  justify-content: center;
  align-items: center;
  z-index: 999999;
`;
