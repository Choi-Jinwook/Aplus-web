import styled from "@emotion/styled";
import {
  useGetFinanceHistory,
  useGetFinanceInfo,
  usePostFinanceAccount,
} from "@shared/apis";
import { Button, CheckBox, Chip, Icon, Text } from "@shared/components";
import { useEffect, useState } from "react";
import { Colors, Shadow } from "styles";

const Finance = () => {
  const [isChecked, setIsChecked] = useState(false);
  const { data: financeInfo } = useGetFinanceInfo("1", "2024", "11");
  const { data: financeHistory } = useGetFinanceHistory("1", "1", "2024", "11");
  const { mutate } = usePostFinanceAccount();

  const handleAddChangeClick = () => {};

  const handleChange = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <Container>
      {financeInfo && (
        <>
          <CashFlowContainer>
            <Text type="BodyBold" color={Colors.Gray600}>
              Cash Flow
            </Text>
            <ChangeContainer>
              <CurrentCash>
                <CurrentCashCard>
                  <CurrentCashCardTitle>
                    <Text type="LabelBold" color={Colors.Gray500}>
                      Expense
                    </Text>
                    <Text type="H4">{`${financeInfo.expense.toLocaleString()}₩`}</Text>
                  </CurrentCashCardTitle>
                </CurrentCashCard>
                <CurrentCashCard>
                  <CurrentCashCardTitle>
                    <Text type="LabelBold" color={Colors.Gray500}>
                      Income
                    </Text>
                    <Text type="H4">{`${financeInfo.income.toLocaleString()}₩`}</Text>
                  </CurrentCashCardTitle>
                </CurrentCashCard>
              </CurrentCash>
              <Button buttonColor={Colors.Orange200}>Add Change</Button>
            </ChangeContainer>
          </CashFlowContainer>

          <BalanceContainer>
            <BalanceWrapper>
              <Text type="BodyBold" color={Colors.Gray600}>
                Account Balances
              </Text>
              <AccountContainer>
                {financeInfo.accounts.map(
                  ({ accountId, accountName, balance, color }, index) => {
                    return (
                      <AccountWrapper
                        key={accountId + accountName}
                        index={index}
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
                )}
              </AccountContainer>
            </BalanceWrapper>
          </BalanceContainer>

          <PlanContainer>
            <PlanWrapper>
              <PlanTitle>
                <PlanTitlePadding>
                  <Text type="H4" color={Colors.Gray600}>
                    Plans
                  </Text>
                </PlanTitlePadding>
                <div>zz</div>
              </PlanTitle>

              <PlansContainer>
                <ExpectedContainer>
                  <Text type="Body" color={Colors.Gray400}>
                    Expected Income
                  </Text>
                  <RemainMoney>
                    <Text type="BodyBold">{`${(900000).toLocaleString()}`}</Text>
                    <Text type="BodyBold">₩</Text>
                  </RemainMoney>
                </ExpectedContainer>
                <DepositContainer>
                  {financeInfo.predictedIncomes.map(
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
                        <DepositContent
                          key={incomeId + description}
                          index={index}
                        >
                          <DepositInner>
                            <DepositInnerBox>
                              <DepositCheck>
                                <CheckBox
                                  value={isChecked}
                                  onChange={handleChange}
                                />
                                <RemainMoney>
                                  <Text type="BodyBold">{`${amount.toLocaleString()}`}</Text>
                                  <Text type="BodyBold">₩</Text>
                                </RemainMoney>
                              </DepositCheck>
                              <DepositDesc>
                                <Text type="Label" color={Colors.Gray400}>
                                  {description.split(",")[0]}
                                </Text>
                              </DepositDesc>
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

          <AdjustHeight />
        </>
      )}
    </Container>
  );
};

export default Finance;

const Container = styled.main`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100vw;
  top: 48px;
  background-color: ${Colors.Gray50};
  gap: 21px;
  overflow-y: auto;
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
  flex-direction: column;
`;

const DepositCheck = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const DepositDesc = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AdjustHeight = styled.div`
  height: 52px;
`;
