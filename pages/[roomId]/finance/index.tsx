import styled from "@emotion/styled";
import { useGetFinanceInfo } from "@shared/apis";
import { deviceHeight } from "@shared/atoms";
import { Button, CheckBox, Chip, Icon, Text } from "@shared/components";
import {
  AccountAddModal,
  BudgetPlanModal,
  TxnModal,
} from "@shared/components/ModalContent";
import {
  FinancePredictedExpenses,
  FinancePredictedIncomes,
} from "@shared/types";
import { getExpense } from "@shared/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Colors, Shadow } from "styles";

const Finance = () => {
  const today = new Date();

  const {
    query: { roomId },
    push,
  } = useRouter();

  const [YYMM, setYYMM] = useState({ year: 0, month: 0 });
  const [expected, setExpected] = useState({
    income: 0,
    expense: 0,
    saving: 0,
  });
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showBudgetPlanModal, setShowBudgetPlanModal] = useState(false);
  const [showTxnModal, setShowTxnModal] = useState(false);
  const [txnData, setTxnData] = useState<
    FinancePredictedIncomes | FinancePredictedExpenses
  >();
  const [txnType, setTxnType] = useState("");
  const height = useRecoilValue(deviceHeight);

  const { data: financeInfo, refetch: infoRefetch } = useGetFinanceInfo(
    String(roomId),
    String(YYMM.year),
    String(YYMM.month),
  );

  const handleClickRoute = (type: string) => {
    push(`/${roomId}/finance/${type}`);
  };

  const handleAccountModal = () => {
    setShowAccountModal((prev) => !prev);
  };

  const handleBudgetPlanModal = () => {
    setShowBudgetPlanModal((prev) => !prev);
  };

  const handleTxnModal = () => {
    setShowTxnModal((prev) => !prev);
  };

  const handleClickCheckBox = (
    hasChecked: boolean,
    type: string,
    index: number,
  ) => {
    if (hasChecked) return;

    setTxnType(type);

    if (type === "income") {
      setTxnData(financeInfo?.predictedIncomes[index]);
    } else {
      setTxnData(financeInfo?.predictedExpenses[index]);
    }

    handleTxnModal();
  };

  useEffect(() => {
    setYYMM({ year: today.getFullYear(), month: today.getMonth() + 1 });
  }, []);

  useEffect(() => {
    if (financeInfo) {
      const expectedIncome = getExpense(financeInfo.predictedIncomes);
      const expectedExpense = getExpense(financeInfo.predictedExpenses);
      const expectedSaving = getExpense(financeInfo.savingGoals);

      setExpected({
        income: expectedIncome,
        expense: expectedExpense,
        saving: expectedSaving,
      });
    }
  }, [financeInfo]);

  return (
    <Container height={height} isOpen={showAccountModal || showBudgetPlanModal}>
      {showAccountModal && (
        <AccountAddModal
          handleAccountModal={handleAccountModal}
          infoRefetch={infoRefetch}
        />
      )}

      {showBudgetPlanModal && (
        <BudgetPlanModal
          handleBudgetPlanModal={handleBudgetPlanModal}
          infoRefetch={infoRefetch}
        />
      )}

      {showTxnModal && (
        <TxnModal
          handleTxnModal={handleTxnModal}
          infoRefetch={infoRefetch}
          data={txnData}
          type={txnType}
          accounts={financeInfo?.accounts}
        />
      )}

      <CashFlowContainer>
        <Text type="BodyBold" color={Colors.Gray600}>
          Financial Transaction
        </Text>
        <ChangeContainer>
          <CurrentCash>
            <CurrentCashCard onClick={() => handleClickRoute("income")}>
              <CurrentCashCardTitle>
                <Text type="LabelBold" color={Colors.Gray500}>
                  Income
                </Text>
                <Text type="H4">{`${(
                  financeInfo?.income ?? 0
                ).toLocaleString()}₩`}</Text>
              </CurrentCashCardTitle>
            </CurrentCashCard>
            <CurrentCashCard onClick={() => handleClickRoute("expense")}>
              <CurrentCashCardTitle>
                <Text type="LabelBold" color={Colors.Gray500}>
                  Expense
                </Text>
                <Text type="H4">{`${(
                  financeInfo?.expense ?? 0
                ).toLocaleString()}₩`}</Text>
              </CurrentCashCardTitle>
            </CurrentCashCard>
          </CurrentCash>
          <Button
            buttonColor={Colors.Orange200}
            onClick={() => handleClickRoute("transaction")}
          >
            Add Transaction
          </Button>
        </ChangeContainer>
      </CashFlowContainer>

      <BalanceContainer>
        <BalanceWrapper>
          <BalanceTitle>
            <Text type="BodyBold" color={Colors.Gray600}>
              Account Balances
            </Text>
            <AddNewAccount onClick={handleAccountModal}>
              <Text type="LabelLight" color={Colors.Gray400}>
                Add Account
              </Text>
            </AddNewAccount>
          </BalanceTitle>
          <AccountContainer>
            {financeInfo?.accounts.length !== 0 ? (
              financeInfo?.accounts.map(
                ({ accountId, accountName, balance, color }, index) => {
                  return (
                    <AccountWrapper
                      key={accountId + accountName}
                      index={index}
                      onClick={() =>
                        handleClickRoute(`balance?accountId=${accountId}`)
                      }
                    >
                      <Account>
                        <IconContainer>
                          <Icon icon="Icon_Money" />
                        </IconContainer>
                        <AccountDesc>
                          <RemainMoney>
                            <Text type="BodyBold">{`${balance.toLocaleString()}`}</Text>
                            <Text type="BodyBold">₩</Text>
                          </RemainMoney>
                          <Text type="Label" color={Colors.Gray400}>
                            {`${accountName}`}
                          </Text>
                        </AccountDesc>
                      </Account>
                    </AccountWrapper>
                  );
                },
              )
            ) : (
              <>
                <Text type="Label" color={Colors.Gray400}>
                  Add new account
                </Text>
                <Text type="Label" color={Colors.Gray400}>
                  and manage it with HOUSIT!
                </Text>
              </>
            )}
          </AccountContainer>
        </BalanceWrapper>
      </BalanceContainer>

      <PlanContainer>
        <PlanWrapper>
          <PlanTitle>
            <PlanTitlePadding>
              <Text type="H4" color={Colors.Gray600}>
                Budget Plan
              </Text>
            </PlanTitlePadding>
            <AddNewAccount>
              <Text type="LabelLight" color={Colors.Gray400}>
                Edit
              </Text>
            </AddNewAccount>
          </PlanTitle>

          <PlansContainer>
            <ExpectedContainer>
              <TextContainer>
                <Text type="Body" color={Colors.Gray400}>
                  Saving Goal
                </Text>
              </TextContainer>
              <RemainMoney>
                <Text type="BodyBold">{`${expected.saving.toLocaleString()}`}</Text>
                <Text type="BodyBold">₩</Text>
              </RemainMoney>
              <DepositContainer>
                {financeInfo?.savingGoals.map(
                  (
                    {
                      savingGoalId,
                      description,
                      amount,
                      isChecked: hasChecked,
                      dueDate,
                      enrolledDate,
                    },
                    index,
                  ) => {
                    return (
                      <DepositContent
                        key={savingGoalId + description}
                        index={index}
                      >
                        <DepositInner>
                          <DepositInnerBox>
                            <CheckBoxContainer>
                              <CheckBox value={hasChecked} />
                            </CheckBoxContainer>
                            <DepositCheck>
                              <RemainMoney>
                                <Text type="BodyBold">{`${amount.toLocaleString()}`}</Text>
                                <Text type="BodyBold">₩</Text>
                              </RemainMoney>
                              <DepositDesc>
                                <Text type="Label" color={Colors.Gray400}>
                                  {description.split(",")[0]}
                                </Text>
                              </DepositDesc>
                            </DepositCheck>
                          </DepositInnerBox>
                        </DepositInner>
                        <Chip>{description.split(",")[1] ?? "Someone"}</Chip>
                      </DepositContent>
                    );
                  },
                )}
              </DepositContainer>
            </ExpectedContainer>
          </PlansContainer>

          <PlansContainer>
            <ExpectedContainer>
              <TextContainer>
                <Text type="Body" color={Colors.Gray400}>
                  Expecetd Income
                </Text>
              </TextContainer>
              <RemainMoney>
                <Text type="BodyBold">{`${expected.income.toLocaleString()}`}</Text>
                <Text type="BodyBold">₩</Text>
              </RemainMoney>
            </ExpectedContainer>
            <DepositContainer>
              {financeInfo?.predictedIncomes.map(
                (
                  {
                    incomeId,
                    description,
                    amount,
                    isChecked: hasChecked,
                    dueDate,
                    enrolledDate,
                  },
                  index,
                ) => {
                  return (
                    <DepositContent key={incomeId + description} index={index}>
                      <DepositInner>
                        <DepositInnerBox>
                          <CheckBoxContainer>
                            <CheckBox
                              value={hasChecked}
                              onClick={() =>
                                handleClickCheckBox(hasChecked, "income", index)
                              }
                            />
                          </CheckBoxContainer>
                          <DepositCheck>
                            <RemainMoney>
                              <Text type="BodyBold">{`${amount.toLocaleString()}`}</Text>
                              <Text type="BodyBold">₩</Text>
                            </RemainMoney>
                            <DepositDesc>
                              <Text type="Label" color={Colors.Gray400}>
                                {description.split(",")[0]}
                              </Text>
                            </DepositDesc>
                          </DepositCheck>
                        </DepositInnerBox>
                      </DepositInner>
                      <Chip>{description.split(",")[1] ?? "Someone"}</Chip>
                    </DepositContent>
                  );
                },
              )}
            </DepositContainer>
          </PlansContainer>

          <PlansContainer>
            <ExpectedContainer>
              <TextContainer>
                <Text type="Body" color={Colors.Gray400}>
                  Expected Expenses
                </Text>
              </TextContainer>
              <RemainMoney>
                <Text type="BodyBold">{`${expected.expense.toLocaleString()}`}</Text>
                <Text type="BodyBold">₩</Text>
              </RemainMoney>
            </ExpectedContainer>
            <DepositContainer>
              {financeInfo?.predictedExpenses.map(
                (
                  {
                    expenseId,
                    description,
                    amount,
                    isChecked: hasChecked,
                    dueDate,
                    enrolledDate,
                  },
                  index,
                ) => {
                  return (
                    <DepositContent key={expenseId + description} index={index}>
                      <DepositInner>
                        <DepositInnerBox>
                          <CheckBoxContainer>
                            <CheckBox
                              value={hasChecked}
                              onClick={() =>
                                handleClickCheckBox(
                                  hasChecked,
                                  "expense",
                                  index,
                                )
                              }
                            />
                          </CheckBoxContainer>
                          <DepositCheck>
                            <RemainMoney>
                              <Text type="BodyBold">{`${amount.toLocaleString()}`}</Text>
                              <Text type="BodyBold">₩</Text>
                            </RemainMoney>
                            <DepositDesc>
                              <Text type="Label" color={Colors.Gray400}>
                                {description.split(",")[0]}
                              </Text>
                            </DepositDesc>
                          </DepositCheck>
                        </DepositInnerBox>
                      </DepositInner>
                      <Chip>{description.split(",")[1] ?? "Someone"}</Chip>
                    </DepositContent>
                  );
                },
              )}
            </DepositContainer>
          </PlansContainer>
        </PlanWrapper>
      </PlanContainer>

      <AddNewButton onClick={handleBudgetPlanModal}>
        <Icon icon="Plus_Button" color={Colors.White} size={32} />
      </AddNewButton>
    </Container>
  );
};

export default Finance;

const Container = styled.main<{ height: number | null; isOpen?: boolean }>`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100vw;
  height: ${({ height }) => height && `${height - 108}px`};
  top: 48px;
  background-color: ${Colors.Gray50};
  padding-bottom: 12px;
  gap: 21px;
  ${({ isOpen }) => (isOpen ? `overflow-y: hidden;` : `overflow-y: scroll;`)}
`;

const CashFlowContainer = styled.section`
  display: flex;
  flex-direction: column;
  background-color: ${Colors.White};
  padding: 20px 12px;
  gap: 12px;
`;

const ChangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CurrentCash = styled.div`
  display: flex;
  gap: 8px;
`;

const CurrentCashCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  border: 1px solid ${Colors.Gray100};
  border-radius: 16px;
  background-color: ${Colors.Gray50};
  padding: 12px 16px 16px 16px;
`;

const CurrentCashCardTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const BalanceContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0px 12px;
  gap: 10px;
`;

const BalanceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: ${Colors.White};
  padding: 16px 16px 12px 16px;
  gap: 4px;
  ${Shadow.Small};
`;

const BalanceTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddNewAccount = styled.div`
  height: fit-content;
  border-bottom: 1px solid ${Colors.Gray400};
`;

const AccountContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AccountWrapper = styled.div<{ index: number }>`
  display: flex;
  padding: 12px 0px;
  align-items: center;

  ${({ index }) => {
    switch (index) {
      case 0:
        return;
      default:
        return `border-top: 1px solid ${Colors.Gray200};`;
    }
  }}
`;

const Account = styled.div`
  display: flex;
  padding: 0px 4px;
  gap: 16px;
`;

const IconContainer = styled.div`
  display: flex;
  width: 32px;
  padding-top: 4px;
  align-items: center;
  gap: 10px;
`;

const AccountDesc = styled.div`
  display: flex;
  flex-direction: column;
`;

const RemainMoney = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const PlanContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0px 12px;
`;

const PlanWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  gap: 8px;
`;

const PlanTitle = styled.div`
  display: flex;
  padding: 0 14px 0 0;
  justify-content: space-between;
  align-items: center;
`;

const PlanTitlePadding = styled.div`
  padding-left: 6px;
`;

const PlansContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: ${Colors.White};
  padding: 16px 16px 12px 16px;
  gap: 8px;
  ${Shadow.Small};
`;

const ExpectedContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DepositContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DepositContent = styled.div<{ index: number }>`
  display: flex;
  padding: 12px 0px;
  justify-content: space-between;
  align-items: center;

  ${({ index }) => {
    switch (index) {
      case 0:
        return;
      default:
        return `border-top: 1px solid ${Colors.Gray200};`;
    }
  }}
`;

const DepositInner = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const DepositInnerBox = styled.div`
  display: flex;
  gap: 12px;
`;

const CheckBoxContainer = styled.div`
  padding-top: 4px;
`;

const DepositCheck = styled.div`
  display: flex;
  flex-direction: column;
`;

const DepositDesc = styled.div`
  display: flex;
  align-items: center;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
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
  z-index: 999;
`;
