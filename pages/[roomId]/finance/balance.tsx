import styled from "@emotion/styled";
import { useGetFinanceHistory, useGetFinanceInfo } from "@shared/apis";
import { deviceHeight } from "@shared/atoms";
import { BottomSheet, Icon, Text } from "@shared/components";
import { FinanceAccounts, GetFinanceHistory } from "@shared/types";
import { convertDate, getExistingDates, getMonth } from "@shared/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Colors, Shadow } from "styles";

const FinanceBalance = () => {
  const today = new Date();
  const {
    query: { roomId, accountId },
  } = useRouter();

  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);
  const [existingDate, setExistingDate] = useState<string[]>();
  const [currentAccount, setCurrentAccount] = useState<FinanceAccounts[]>();
  const [formattedHistory, setFormattedHistory] =
    useState<Record<string, Omit<GetFinanceHistory, "txnDate">[]>>();
  const [YYMM, setYYMM] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  });
  const [totalMoney, setTotalMoney] = useState(0);
  const height = useRecoilValue(deviceHeight);

  const { data: financeInfo } = useGetFinanceInfo(
    String(roomId),
    String(YYMM.year),
    String(YYMM.month),
  );
  const { data: historyData, refetch: historyRefetch } = useGetFinanceHistory(
    String(roomId),
    String(accountId),
    String(YYMM.year),
    String(YYMM.month),
  );

  const handleSheetOpen = () => {
    setIsOpenBottomSheet((prev) => !prev);
  };

  const handleTargetDate = (value: string) => {
    const { year, month } = convertDate(value, true);

    setYYMM({ year: Number(year), month: Number(month) });

    handleSheetOpen();
  };

  useEffect(() => {
    historyRefetch();
  }, []);

  useEffect(() => {
    if (financeInfo) {
      setCurrentAccount(
        financeInfo.accounts.filter(
          ({ accountId: aid }) => aid === Number(accountId),
        ),
      );
    }
  }, [financeInfo]);

  useEffect(() => {
    if (historyData) {
      const sortedHistory = historyData.reduce<
        Record<string, Omit<GetFinanceHistory, "txnDate">[]>
      >((acc, { txnDate, ...rest }) => {
        if (!acc[txnDate]) {
          acc[txnDate] = [];
        }
        acc[txnDate].push(rest);
        return acc;
      }, {});

      const sum = historyData.reduce((acc, { amount, txnType }) => {
        return txnType === "DEPOSIT" ? acc + amount : acc - amount;
      }, 0);

      setFormattedHistory(sortedHistory);
      setTotalMoney(sum);
    }
  }, [historyData]);

  useEffect(() => {
    if (formattedHistory) {
      const dates = Object.keys(formattedHistory).map((value) => value);

      setExistingDate(getExistingDates(dates));
    }
  }, [formattedHistory]);

  useEffect(() => {
    historyRefetch();
  }, [YYMM]);

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

      {historyData && (
        <>
          <BriefContainer>
            <BriefWrapper>
              <TotalContainer>
                <TotalWrapper>
                  <Text type="H4">{totalMoney?.toLocaleString()}</Text>
                  <Text type="H4">₩</Text>
                </TotalWrapper>

                <MonthWrapper onClick={handleSheetOpen}>
                  <Icon icon="Chevron_Left" />
                  <Text type="Label">{getMonth(YYMM.month)}</Text>
                  <Icon icon="Chevron_Right" />
                </MonthWrapper>
              </TotalContainer>

              <AccountContainer>
                <Text type="Body" color={Colors.Gray600}>
                  {currentAccount?.[0].accountName}
                </Text>
              </AccountContainer>
            </BriefWrapper>
          </BriefContainer>

          <HistoryContainer>
            {formattedHistory &&
              Object.entries(formattedHistory)?.map(([txnDate, data]) => {
                const [year, month, day] = txnDate.split("-");

                return (
                  <HistoryWrapper key={txnDate}>
                    <Text type="BodyBold" color={Colors.Gray500}>
                      {`${getMonth(Number(month))} ${day}`}
                    </Text>
                    <HistoryContents>
                      {data.map(
                        (
                          { accountTxnId, amount, txnType, description },
                          index,
                        ) => {
                          const isDeposit = txnType === "DEPOSIT";

                          return (
                            <HistoryContent key={accountTxnId}>
                              <ContentContainer index={index}>
                                <ContentWrapper>
                                  <WhoDoThis>
                                    <Text type="BodyBold">{description}</Text>
                                    <Text
                                      type="LabelLight"
                                      color={Colors.Gray400}
                                    >
                                      Someone
                                    </Text>
                                  </WhoDoThis>
                                  <Money>
                                    <Text
                                      type="BodyBold"
                                      color={
                                        isDeposit
                                          ? Colors.Orange200
                                          : Colors.Gray500
                                      }
                                    >
                                      {`${
                                        isDeposit ? "+" : "-"
                                      }${amount.toLocaleString()}₩`}
                                    </Text>
                                  </Money>
                                </ContentWrapper>
                              </ContentContainer>
                            </HistoryContent>
                          );
                        },
                      )}
                    </HistoryContents>
                  </HistoryWrapper>
                );
              })}
          </HistoryContainer>
        </>
      )}
    </Container>
  );
};

export default FinanceBalance;

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
  padding: 16px;
  gap: 8px;
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

const AccountContainer = styled.div`
  display: flex;
  height: 40px;
  border-radius: 8px;
  background-color: ${Colors.Gray50};
  padding: 0px 8px 0px 12px;
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

const ContentContainer = styled.div<{ index: number }>`
  display: flex;
  width: 100%;
  padding: 8px 0px;
  align-items: center;

  ${({ index }) => index !== 0 && `border-top: 1px solid ${Colors.Gray200};`}
`;

const ContentWrapper = styled.div`
  display: flex;
  padding: 0px 8px;
  justify-content: space-between;
  flex: 1 0 0;
`;

const WhoDoThis = styled.div`
  display: flex;
  flex-direction: column;
`;

const Money = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;
