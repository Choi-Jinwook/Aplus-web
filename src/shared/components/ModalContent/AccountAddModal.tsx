import styled from "@emotion/styled";
import { deviceHeight } from "@shared/atoms";
import { useRecoilValue } from "recoil";
import { Colors } from "styles";
import { ControlledInput, Icon, Text } from "..";
import { useState } from "react";
import { usePostFinanceAccount, usePostIncomeExpense } from "@shared/apis";
import { useRouter } from "next/router";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { FinanceInfoBody } from "@shared/types";

interface AccountAddModalProps {
  handleAccountModal: () => void;
  infoRefetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<FinanceInfoBody, Error>>;
}

const AccountAddModal = ({
  handleAccountModal,
  infoRefetch,
}: AccountAddModalProps) => {
  const color = [
    "#FF4133",
    "#FF7143",
    "#FEC107",
    "#8BC348",
    "#307CD2",
    "#7E8B99",
  ];

  const {
    query: { roomId },
  } = useRouter();

  const [accountNickname, setAccountNickname] = useState("");
  const [accountBalance, setAccountBalance] = useState(0);
  const [selectedColor, setSelectedColor] = useState("#FF4133");
  const height = useRecoilValue(deviceHeight);

  const { mutateAsync: postFinanceAccount, isPending: accountPending } =
    usePostFinanceAccount();
  const { mutateAsync: postIncomeExpense, isPending: typePending } =
    usePostIncomeExpense();

  const handleChangeNickname = (value: string) => {
    setAccountNickname(value);
  };

  const handleChangeBalance = (value: number) => {
    if (value === 0) return;

    setAccountBalance(value);
  };

  const handleClickColor = (value: string) => {
    setSelectedColor(value);
  };

  const handleClickCancel = () => {
    setAccountNickname("");
    setAccountBalance(0);
    handleAccountModal();
  };

  const handleClickAdd = async () => {
    if (
      typePending ||
      accountPending ||
      accountNickname === "" ||
      accountBalance === 0
    )
      return;

    try {
      const res = await postFinanceAccount({
        roomNumber: String(roomId),
        data: { accountName: accountNickname, color: selectedColor },
      });

      await postIncomeExpense({
        roomNumber: String(roomId),
        accountId: res,
        data: {
          amount: accountBalance,
          txnType: "DEPOSIT",
          txnDate: new Date().toISOString().split("T")[0],
          description: "Account Created",
        },
      });

      handleAccountModal();
      infoRefetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Dimmer height={height} onClick={handleClickCancel} />
      <AccountModalContainer>
        <AccountModalTitle>
          <Text type="H4">Add Account</Text>
        </AccountModalTitle>
        <AccountModalContent>
          <NickName>
            <Text type="LabelLight" color={Colors.Gray600}>
              Account Nickname
            </Text>
            <ControlledInput
              shaded
              inputType="text"
              placeholder="Nickname"
              onChange={handleChangeNickname}
            />
          </NickName>
          <NickName>
            <Text type="LabelLight" color={Colors.Gray600}>
              Balance
            </Text>
            <ControlledInput
              shaded
              inputType="text"
              inputMode="numeric"
              placeholder="0"
              onChange={(value) => handleChangeBalance(Number(value))}
            />
          </NickName>
          <NickName>
            <Text type="LabelLight" color={Colors.Gray600}>
              Color
            </Text>
            <ColorContainer>
              {color.map((_color) => (
                <Color
                  key={_color}
                  color={_color}
                  onClick={() => handleClickColor(_color)}
                >
                  {selectedColor === _color && (
                    <Icon icon="Check_Button" color={Colors.White} />
                  )}
                </Color>
              ))}
            </ColorContainer>
          </NickName>

          <ButtonContainer>
            <AddAccountButton onClick={handleClickCancel}>
              <Text type="LabelBold" color={Colors.Orange300}>
                Cancel
              </Text>
            </AddAccountButton>
            <AddAccountButton onClick={handleClickAdd}>
              <Text
                type="LabelBold"
                color={
                  accountNickname !== "" && accountBalance !== 0
                    ? Colors.Orange300
                    : Colors.Gray400
                }
              >
                Add
              </Text>
            </AddAccountButton>
          </ButtonContainer>
        </AccountModalContent>
      </AccountModalContainer>
    </>
  );
};

export default AccountAddModal;

const Dimmer = styled.div<{ height: number | null }>`
  position: fixed;
  width: 100%;
  height: ${({ height }) => height && `${height}px`};
  top: 0;
  background-color: ${Colors.Dimmer200};
  z-index: 99999;
`;

const AccountModalContainer = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  width: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 28px;
  background-color: ${Colors.White};
  justify-content: center;
  overflow-y: scroll;
  z-index: 999999;
`;

const AccountModalTitle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 16px;
`;

const AccountModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 24px;
  gap: 12px;
`;

const NickName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const ColorContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Color = styled.div<{ color: string }>`
  display: flex;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  ${({ color }) => `background-color: ${color};`}
  padding: 6px;
  justify-content; center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  padding: 24px;
  gap: 8px;
  justify-content: flex-end;
  align-items: center;
`;

const AddAccountButton = styled.div`
  display: flex;
  height: 40px;
  padding: 10px 12px;
  justify-content: center;
  align-items: center;
`;
