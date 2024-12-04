import styled from "@emotion/styled";
import { useGetFinanceInfo, useGetIncome } from "@shared/apis";
import { deviceHeight } from "@shared/atoms";
import { BottomSheet, Icon, Text } from "@shared/components";
import { Txns } from "@shared/types";
import {
  convertDate,
  getExistingDates,
  getMonth,
  getMonthlyBalance,
} from "@shared/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Colors, Shadow } from "styles";

const FinanceIncome = () => {
  const today = new Date();
  const {
    query: { roomId },
    push,
  } = useRouter();

  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);
  const [existingDate, setExistingDate] = useState<string[]>();
  const [formattedData, setFormattedData] =
    useState<Record<string, { totalIncome: number; txns: Txns[] }>>();
  const [YYMM, setYYMM] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  });
  const height = useRecoilValue(deviceHeight);

  const { data: financeInfo } = useGetFinanceInfo(
    String(roomId),
    String(YYMM.year),
    String(YYMM.month),
  );
  const { data: incomeData, refetch: incomeRefetch } = useGetIncome({
    roomNumber: String(roomId),
    year: String(YYMM.year),
    month: String(YYMM.month),
  });

  const handleSheetOpen = () => {
    setIsOpenBottomSheet((prev) => !prev);
  };

  const handleTargetDate = (value: string) => {
    const { year, month } = convertDate(value, true);

    setYYMM({ year: Number(year), month: Number(month) });

    handleSheetOpen();
  };

  useEffect(() => {
    incomeRefetch();
  }, []);

  useEffect(() => {
    if (incomeData) {
      const transformedData = incomeData.txns.reduce((acc, txn) => {
        const { txnDate, amount } = txn;

        if (!acc[txnDate]) {
          acc[txnDate] = { totalIncome: 0, txns: [] };
        }

        acc[txnDate].totalIncome += amount;
        acc[txnDate].txns.push(txn);

        return acc;
      }, {} as Record<string, { totalIncome: number; txns: Txns[] }>);

      setFormattedData(transformedData);
    }
  }, [incomeData]);

  useEffect(() => {
    if (formattedData) {
      const dates = Object.keys(formattedData).map((value) => value);

      setExistingDate(getExistingDates(dates));
    }
  }, [formattedData]);

  return (
    <Container height={height}>
      {isOpenBottomSheet && (
        <BottomSheet
          title="Select Month"
          handleClickDimmed={handleSheetOpen}
          data={existingDate}
          selectedData={`${
            convertDate(`${YYMM.year} ${YYMM.month}`, false).year
          } ${convertDate(`${YYMM.year} ${YYMM.month}`, false).month}`}
          onClick={handleTargetDate}
        />
      )}

      <BriefContainer>
        <BriefWrapper>
          <TotalContainer>
            <TotalWrapper>
              <Text type="H4">
                {Number(incomeData?.totalIncome).toLocaleString()}
              </Text>
              <Text type="H4">₩</Text>
            </TotalWrapper>

            <MonthWrapper onClick={handleSheetOpen}>
              <Icon icon="Chevron_Left" />
              <Text type="Label">{getMonth(YYMM.month)}</Text>
              <Icon icon="Chevron_Right" />
            </MonthWrapper>
          </TotalContainer>

          <DetailContainer>
            {financeInfo?.accounts.map(({ accountId, accountName }) => {
              return (
                <DetailWrapper key={accountId}>
                  <TotalWrapper>
                    <Text type="LabelBold">
                      {getMonthlyBalance(
                        accountId,
                        incomeData,
                      ).toLocaleString()}
                    </Text>
                    <Text type="LabelBold">₩</Text>
                  </TotalWrapper>
                  <Text type="Label" color={Colors.Gray400}>
                    {accountName}
                  </Text>
                </DetailWrapper>
              );
            })}
          </DetailContainer>
        </BriefWrapper>
      </BriefContainer>

      {formattedData &&
        Object.entries(formattedData).map(([date, data]) => {
          const [year, month, day] = date.split("-").map(Number);

          return (
            <HistoryContainer key={date}>
              <HistoryWrapper>
                <Text type="BodyBold" color={Colors.Gray500}>{`${getMonth(
                  month,
                )} ${day}`}</Text>
                <HistoryContents>
                  {data.txns.map(
                    ({
                      accountTxnId,
                      account,
                      amount,
                      txnType,
                      description,
                    }) => {
                      const isDeposit = txnType === "DEPOSIT";

                      return (
                        <HistoryContent key={accountTxnId}>
                          <ContentContainer>
                            <ContentWrapper>
                              <Content>
                                <Text type="BodyBold">{description}</Text>
                                <Text type="LabelLight" color={Colors.Gray400}>
                                  {account.accountName}
                                </Text>
                              </Content>
                              <Text type="BodyBold" color={Colors.Gray500}>{`${
                                isDeposit ? "+" : "-"
                              }${amount.toLocaleString()}₩`}</Text>
                            </ContentWrapper>
                          </ContentContainer>
                        </HistoryContent>
                      );
                    },
                  )}
                </HistoryContents>
              </HistoryWrapper>
            </HistoryContainer>
          );
        })}
    </Container>
  );
};

export default FinanceIncome;

const Container = styled.main<{ height: number | null }>`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100vw;
  height: ${({ height }) => height && `${height - 108}px`};
  top: 48px;
  background-color: ${Colors.Gray50};
  padding-top: 20px;
  padding-bottom: 12px;
  gap: 20px;
  overflow-y: scroll;
`;

const BriefContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0px 12px;
  gap: 10px;
`;

const BriefWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: ${Colors.White};
  padding: 16px 16px 16px 24px;
  gap: 16px;
  ${Shadow.Small};
`;

const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const MonthWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DetailWrapper = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
`;

const HistoryContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const HistoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${Colors.White};
  padding: 20px 12px;
  gap: 8px;
`;

const HistoryContents = styled.div`
  display: flex;
  flex-direction: column;
`;

const HistoryContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  display: flex;
  padding: 8px 0px;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  padding: 0px 8px;
  gap: 12px;
  flex: 1 0 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
`;
