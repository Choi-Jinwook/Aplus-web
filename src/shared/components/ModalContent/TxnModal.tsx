import styled from "@emotion/styled";
import { deviceHeight } from "@shared/atoms";
import {
  FinanceAccounts,
  FinanceInfoBody,
  FinancePredictedExpenses,
  FinancePredictedIncomes,
} from "@shared/types";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { Colors, Shadow } from "styles";
import { Icon, Text } from "..";
import { useState } from "react";
import { usePostIncomeExpense, usePutPredicted } from "@shared/apis";
import { useRouter } from "next/router";

interface TxnModalProps {
  handleTxnModal: () => void;
  infoRefetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<FinanceInfoBody, Error>>;
  data?: FinancePredictedIncomes | FinancePredictedExpenses;
  type?: string;
  accounts?: FinanceAccounts[];
}

const TxnModal = ({
  handleTxnModal,
  infoRefetch,
  data,
  type,
  accounts,
}: TxnModalProps) => {
  const today = new Date();

  const {
    query: { roomId },
  } = useRouter();

  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [account, setAccount] = useState({
    id: accounts?.[0].accountId,
    name: accounts?.[0].accountName,
  });
  const [date, setDate] = useState(today.toISOString().split("T")[0]);
  const height = useRecoilValue(deviceHeight);

  const { mutateAsync: postTxn } = usePostIncomeExpense();
  const { mutateAsync: putPredicted } = usePutPredicted();

  const handleClickDropdown = () => {
    setIsOpenDropdown((prev) => !prev);
  };

  const handleChangeAccount = (id: number, value: string) => {
    setAccount({ id: id, name: value });
  };

  const handleChangeDate = (value: string) => {
    setDate(value);
  };

  const handleClickCancel = () => {
    setDate("");
    handleTxnModal();
  };

  const handleClickAdd = async () => {
    if (date === "" || account.id === 0 || account.name === "") return;

    if (data) {
      try {
        await postTxn({
          roomNumber: String(roomId),
          accountId: String(account.id),
          data: {
            amount: data.amount,
            txnDate: date,
            description: data.description,
            txnType: type === "income" ? "DEPOSIT" : "WITHDRAWAL",
          },
        });

        await putPredicted({
          roomNumber: String(roomId),
          accountId: String(account.id),
          type: String(type),
          data: {
            ...data,
            isChecked: true,
          },
        });

        infoRefetch();
        handleClickCancel();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Dimmer height={height} onClick={handleTxnModal} />
      <TxnModalContainer>
        <TxnModalTitle>
          <Text type="BodyBold">
            {`Add ${data?.amount.toLocaleString()}₩ as '${
              data?.description
            }' to your ${type} transaction?`}
          </Text>
        </TxnModalTitle>
        <TxnModalContent>
          <NickName>
            <Text type="LabelLight" color={Colors.Gray600}>
              Deposit Account
            </Text>
            <AccountsContainer onClick={handleClickDropdown}>
              <AccountsWrapper>
                <Text type="Body" color={Colors.Gray600} ellipsis>
                  {account.name}
                </Text>
                <Icon
                  icon={isOpenDropdown ? "Chevron_Up" : "Chevron_Down"}
                  color={Colors.Gray300}
                />
              </AccountsWrapper>
              {isOpenDropdown && (
                <DropDownMenu>
                  {accounts?.map(({ accountId, accountName }) => (
                    <MenuItems
                      isSelected={account.name === accountName}
                      key={accountId}
                      onClick={() =>
                        handleChangeAccount(accountId, accountName)
                      }
                    >
                      <MenuItem>
                        <Text type="Body" color={Colors.Gray600} ellipsis>
                          {accountName}
                        </Text>
                        {account.name === accountName && (
                          <Icon icon="Check_Button" color={Colors.Gray400} />
                        )}
                      </MenuItem>
                    </MenuItems>
                  ))}
                </DropDownMenu>
              )}
            </AccountsContainer>
          </NickName>

          <NickName>
            <Text type="LabelLight" color={Colors.Gray600}>
              Due Date
            </Text>
            <DatePicker>
              <DateInput
                value={date === "" ? today.toISOString().split("T")[0] : date}
                type="date"
                placeholder="YYYY-MM-DD"
                onChange={({ target: { value } }) => handleChangeDate(value)}
              />
            </DatePicker>
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
                  date !== "" && account.id !== 0 && account.name !== ""
                    ? Colors.Orange300
                    : Colors.Gray400
                }
              >
                Add
              </Text>
            </AddAccountButton>
          </ButtonContainer>
        </TxnModalContent>
      </TxnModalContainer>
    </>
  );
};

export default TxnModal;

const Dimmer = styled.div<{ height: number | null }>`
  position: fixed;
  width: 100%;
  height: ${({ height }) => height && `${height}px`};
  top: 0;
  background-color: ${Colors.Dimmer200};
  z-index: 99999;
`;

const TxnModalContainer = styled.div`
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

const TxnModalTitle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 16px;
`;

const TxnModalContent = styled.div`
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

const DatePicker = styled.div`
  display: flex;
  height: 44px;
  border-radius: 8px;
  background-color: ${Colors.Gray50};
  padding: 8px;
  gap: 10px;
  align-items: center;
`;

const DateInput = styled.input`
  width: 100%;
  border: none;
  background-color: transparent;
  outline: none;
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

const AccountsContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  gap: 6px;
`;

const AccountsWrapper = styled.div`
  display: flex;
  position: relative;
  height: 44px;
  border-radius: 8px;
  background-color: ${Colors.Gray50};
  padding: 8px 8px 8px 16px;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
  ${Shadow.Small};
`;

const DropDownMenu = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  top: 52px;
  border: 1px solid ${Colors.Gray100};
  border-radius: 8px;
  background-color: ${Colors.White};
  ${Shadow.Medium};
`;

const MenuItems = styled.div<{ isSelected?: boolean }>`
  width: 100%;
  padding: 0 4px;

  ${({ isSelected }) => isSelected && `background-color: ${Colors.Gray50};`}
`;

const MenuItem = styled.div`
  display: flex;
  padding: 14px 8px 8px 8px;
  justify-content: space-between;
  align-items: center;
`;
