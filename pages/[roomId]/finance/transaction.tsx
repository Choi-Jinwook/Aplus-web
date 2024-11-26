import styled from "@emotion/styled";
import {
  useGetFinanceInfo,
  usePostIncomeExpense,
  usePostTransfer,
} from "@shared/apis";
import { deviceHeight } from "@shared/atoms";
import { Button, ControlledInput, Icon, Text } from "@shared/components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Colors, Shadow } from "styles";

type TxnType = "Income" | "Expense" | "Transfer";

const FinanceTransaction = () => {
  const today = new Date();

  const {
    query: { roomId },
    push,
  } = useRouter();

  const [txnType, setTxnType] = useState<TxnType>("Income");
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [account, setAccount] = useState({
    id: 0,
    name: "",
  });
  const [txnAccount, setTxnAccount] = useState({
    id: 0,
    name: "",
  });
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState(today.toISOString().split("T")[0]);
  const height = useRecoilValue(deviceHeight);

  const { data: financeInfo, refetch: infoRefetch } = useGetFinanceInfo(
    String(roomId),
    String(today.getFullYear()),
    String(today.getMonth() + 1),
  );
  const { mutateAsync: postIncomeExpense } = usePostIncomeExpense();
  const { mutateAsync: postTransfer } = usePostTransfer();

  const handleClickTxnType = (value: TxnType) => {
    setTxnType(value);
  };

  const handleClickDropdown = () => {
    setIsOpenDropdown((prev) => !prev);
  };

  const handleChangeAccount = (id: number, value: string) => {
    setAccount({ id: id, name: value });
  };

  const handleChangeTxnAccount = (id: number, value: string) => {
    setTxnAccount({ id: id, name: value });
  };

  const handleChangeDescription = (value: string) => {
    setDescription(value);
  };

  const handleChangeAmount = (value: string) => {
    setAmount(value);
  };

  const handleChangeDueDate = (value: string) => {
    setDueDate(value);
  };

  const checkValidate = () => {
    const isValidAccount = account.id !== 0 && account.name !== "";
    const isValidTxnAccount = txnAccount.id !== 0 && txnAccount.name !== "";
    const isValidDescription = description !== "";
    const isValidAmount = amount !== "";
    const isValidDueDate = dueDate !== "";

    if (txnType === "Transfer") {
      return (
        isValidAccount &&
        isValidTxnAccount &&
        isValidDescription &&
        isValidAmount &&
        isValidDueDate
      );
    }

    return (
      isValidAccount && isValidDescription && isValidAmount && isValidDueDate
    );
  };

  const handleClickSave = async () => {
    if (!checkValidate()) return;

    try {
      if (txnType === "Transfer") {
        await postTransfer({
          roomNumber: String(roomId),
          from: String(txnAccount.id),
          to: String(account.id),
          data: {
            amount: Number(amount),
            txnType: "TRANSFER",
            txnDate: dueDate,
            description: description,
          },
        });
      } else {
        await postIncomeExpense({
          roomNumber: String(roomId),
          accountId: String(account.id),
          data: {
            amount: Number(amount),
            txnType: txnType === "Income" ? "DEPOSIT" : "WITHDRAWAL",
            txnDate: dueDate,
            description: description,
          },
        });
      }

      infoRefetch();
      push(`/${roomId}/finance`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (financeInfo && financeInfo.accounts.length !== 0) {
      setAccount({
        id: financeInfo.accounts[0].accountId,
        name: financeInfo.accounts[0].accountName,
      });
    }
  }, [financeInfo]);

  return (
    <Container height={height}>
      <Wrapper>
        <SegmentedPicker>
          <MethodContainer
            onClick={() => handleClickTxnType("Income")}
            isSelected={txnType === "Income"}
          >
            <Text
              type="Label"
              color={txnType === "Income" ? Colors.Gray600 : Colors.Gray400}
            >
              Income
            </Text>
          </MethodContainer>
          <MethodContainer
            onClick={() => handleClickTxnType("Expense")}
            isSelected={txnType === "Expense"}
          >
            <Text
              type="Label"
              color={txnType === "Expense" ? Colors.Gray600 : Colors.Gray400}
            >
              Expense
            </Text>
          </MethodContainer>
          <MethodContainer
            onClick={() => handleClickTxnType("Transfer")}
            isSelected={txnType === "Transfer"}
          >
            <Text
              type="Label"
              color={txnType === "Transfer" ? Colors.Gray600 : Colors.Gray400}
            >
              Transfer
            </Text>
          </MethodContainer>
        </SegmentedPicker>

        <ContentContainer>
          <ContentWrapper>
            <Text type="LabelLight" color={Colors.Gray600}>{`${
              txnType === "Transfer" ? "Withdrawal" : "Deposit"
            } Account`}</Text>
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
                  {financeInfo?.accounts.map(({ accountId, accountName }) => (
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
          </ContentWrapper>

          {txnType === "Transfer" && (
            <ContentWrapper>
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
                    {financeInfo?.accounts.map(({ accountId, accountName }) => (
                      <MenuItems
                        isSelected={account.name === accountName}
                        key={accountId}
                        onClick={() =>
                          handleChangeTxnAccount(accountId, accountName)
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
            </ContentWrapper>
          )}

          <ContentWrapper>
            <Text type="LabelLight" color={Colors.Gray600}>
              Description
            </Text>
            <ControlledInput
              shaded
              showOutline
              size="Small"
              inputType="text"
              placeholder="Description"
              onChange={handleChangeDescription}
            />
          </ContentWrapper>

          <AmountDueDate>
            <ContentWrapper>
              <Text type="LabelLight" color={Colors.Gray600}>
                Amount
              </Text>
              <ControlledInput
                shaded
                showOutline
                size="Small"
                inputType="text"
                inputMode="numeric"
                placeholder="0"
                onChange={handleChangeAmount}
              />
            </ContentWrapper>
            <ContentWrapper>
              <Text type="LabelLight" color={Colors.Gray600}>
                Due Date
              </Text>
              <DueDateInputContainer>
                <DueDateInput
                  placeholder="yyyy-mm-dd"
                  type="date"
                  value={dueDate}
                  onChange={({ target: { value } }) =>
                    handleChangeDueDate(value)
                  }
                />
              </DueDateInputContainer>
            </ContentWrapper>
          </AmountDueDate>
        </ContentContainer>
      </Wrapper>

      <FixedArea>
        <Button
          textColor={
            description !== "" && account.id ? Colors.White : Colors.Gray500
          }
          textType="BodyBold"
          buttonColor={checkValidate() ? Colors.Orange200 : Colors.Gray200}
          buttonSize="Normal"
          onClick={handleClickSave}
        >
          Save
        </Button>
      </FixedArea>
    </Container>
  );
};

export default FinanceTransaction;

const Container = styled.main<{ height: number | null }>`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100vw;
  height: ${({ height }) => height && `${height - 108}px`};
  top: 48px;
  background-color: ${Colors.Gray50};
  padding-bottom: 12px;
  gap: 21px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 12px 12px 0px 12px;
  gap: 6px;
`;

const SegmentedPicker = styled.div`
  display: flex;
  border-radius: 8px;
  background-color: ${Colors.Dimmer100};
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

const ContentContainer = styled.section`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: ${Colors.White};
  padding: 14px;
  gap: 12px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
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

const AmountDueDate = styled.div`
  display: flex;
  gap: 12px;
`;

const DueDateInputContainer = styled.div`
  display: flex;
  height: 44px;
  border-radius: 8px;
  background-color: ${Colors.Gray50};
  padding: 8px;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const DueDateInput = styled.input`
  width: 100%;
  border: none;
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: -0.01em;
  padding: 3px 0;
  outline: none;
  background-color: ${Colors.Gray50};
`;

const FixedArea = styled.section`
  position: fixed;
  width: 100%;
  bottom: 72px;
  padding: 0 12px;
`;
