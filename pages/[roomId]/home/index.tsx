import styled from "@emotion/styled";
import { useGetHome } from "@shared/apis";
import { currentUser, deviceHeight } from "@shared/atoms";
import { Badge, Card, Chip, HomeSection, Icon, Text } from "@shared/components";
import { FoodsBody, IconType } from "@shared/types";
import { calculateRemainDay } from "@shared/utils";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Colors } from "styles";

const Home = () => {
  const badgeRef = useRef(false);
  const today = new Date();
  const DAY_ALERT = 3;

  const {
    query: { roomId },
  } = useRouter();

  const [foodData, setFoodData] = useState<FoodsBody[]>();
  const user = useRecoilValue(currentUser);
  const [height, setHeight] = useRecoilState(deviceHeight);

  const { data: homeData, refetch } = useGetHome(
    String(roomId),
    String(user?.[0].memberId),
  );
  console.log(homeData);

  useEffect(() => {
    refetch();
    setHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    if (homeData) {
      const sortedFoodData = homeData.expiringSoonFoods
        .filter(({ expirationDate }) => {
          const expire = new Date(expirationDate);
          today.setHours(0, 0, 0, 0);

          return expire.getTime() >= today.getTime();
        })
        .sort((a, b) => {
          const _a = new Date(a.expirationDate).getTime();
          const _b = new Date(b.expirationDate).getTime();

          return _a - _b;
        });

      setFoodData(sortedFoodData);
    }
  }, [homeData]);

  return (
    <Container height={height}>
      <HomeSection>
        <Text type="H4" color={Colors.Black}>
          Foods
        </Text>
        <ListContainer>
          {foodData?.map(({ foodId, foodName, expirationDate, memberName }) => {
            const { isAlert, day } = calculateRemainDay(
              expirationDate,
              DAY_ALERT,
            );

            return (
              <List key={foodId}>
                <ListElement>
                  <Text
                    type="LabelLight"
                    color={isAlert ? Colors.State_Negative : Colors.Gray400}
                  >
                    {isAlert ? "Today" : day}
                  </Text>
                  <Text type="BodyBold" color={Colors.Gray600}>
                    {foodName}
                  </Text>
                </ListElement>
                <Chip
                  key={memberName + foodId}
                  color={memberName === "All" ? Colors.White : undefined}
                  backgroundColor={
                    memberName === "All" ? Colors.Orange200 : undefined
                  }
                >
                  {memberName}
                </Chip>
              </List>
            );
          })}
        </ListContainer>
      </HomeSection>

      <HomeSection>
        <Text type="H4" color={Colors.Black}>
          Chores
        </Text>
        <CardView>
          {homeData?.choreDtos.map(
            ({ choreArea, choreId, choreMembers, color, icon }) => {
              const choreMember =
                choreMembers.length === 1
                  ? choreMembers[0].memberName
                  : `${choreMembers[0].memberName} and ${
                      choreMembers.length - 1
                    } others`;
              return (
                <Card
                  key={choreId}
                  icon={icon as IconType}
                  iconColor={color}
                  title={choreArea}
                  person={choreMember}
                />
              );
            },
          )}
        </CardView>
      </HomeSection>

      <HomeSection>
        <Text type="H4" color={Colors.Black}>
          Finance
        </Text>
        <ListContainer>
          {homeData?.predictedExpenses.map(
            ({ amount, expenseId, description, dueDate }) => {
              const { isAlert, day } = calculateRemainDay(dueDate, DAY_ALERT);
              const targetDay = new Date(dueDate);
              const isPassed = today.getTime() > targetDay.getTime();
              const formattedDate = dueDate.split("-").join(".");
              let showBadge = false;
              if (isPassed && !badgeRef.current) {
                showBadge = true;
                badgeRef.current = true;
              }

              return (
                <React.Fragment key={expenseId}>
                  {!isPassed ? (
                    <List>
                      <ListElement>
                        <Text
                          type="LabelLight"
                          color={
                            isAlert ? Colors.State_Negative : Colors.Gray400
                          }
                        >
                          {isAlert ? day : formattedDate}
                        </Text>
                        <ContentContainer>
                          <Text type="BodyBold" color={Colors.Black}>
                            {description}
                          </Text>
                          <Text
                            type="BodyBold"
                            color={Colors.Black}
                          >{`${amount.toLocaleString()}₩`}</Text>
                        </ContentContainer>
                      </ListElement>
                    </List>
                  ) : (
                    <PassedContainer>
                      {showBadge && (
                        <Badge backgroundColor={Colors.Blue300}>Passed</Badge>
                      )}
                      <PassedElement>
                        <Text type="BodyBold" color={Colors.Gray400}>
                          {description}
                        </Text>
                        <Text type="BodyBold" color={Colors.Gray400}>
                          {`${amount.toLocaleString()}₩`}
                        </Text>
                      </PassedElement>
                    </PassedContainer>
                  )}
                </React.Fragment>
              );
            },
          )}
        </ListContainer>
      </HomeSection>

      <InviteBanner>
        <BannerContainer>
          <Text type="H4">Invite Your Friends!</Text>
          <Icon icon="Arrow_Right" size={32} />
        </BannerContainer>
      </InviteBanner>

      <EventContainer>
        <Text type="H4" color={Colors.Black}>
          Events
        </Text>
      </EventContainer>
      {homeData?.eventDtos.map(
        ({ description, eventDay, eventId, eventName, eventTime, members }) => {
          const { isAlert } = calculateRemainDay(eventDay, DAY_ALERT);

          return (
            <HomeSection key={eventId} paddingSize="SemiLight">
              <TitleContainer>
                <TitleWrapper>
                  <Text type="BodyBold">{eventName}</Text>
                  <Text
                    type="LabelLight"
                    color={isAlert ? Colors.State_Negative : Colors.Black}
                  >
                    {eventDay.split("-").join("/")}
                  </Text>
                </TitleWrapper>
                {description && (
                  <Text type="Label" color={Colors.Gray400}>
                    {description}
                  </Text>
                )}
              </TitleContainer>
              <OwnerContainer>
                {members.map(({ memberId, memberName }) => (
                  <Chip
                    key={memberId}
                    color={memberName === "All" ? Colors.White : undefined}
                    backgroundColor={
                      memberName === "All" ? Colors.Orange200 : undefined
                    }
                  >
                    {memberName}
                  </Chip>
                ))}
              </OwnerContainer>
            </HomeSection>
          );
        },
      )}
    </Container>
  );
};

export default Home;

const Container = styled.main<{ height: number | null }>`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100vw;
  height: ${({ height }) => height && `${height - 108}px`};
  top: 48px;
  padding: 12px 0;
  gap: 8px;
  background-color: ${Colors.Gray50};
  overflow-y: auto;
`;

const ListContainer = styled.div``;

const List = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  padding: 8px 0;
  gap: 4px;
  align-items: center;
`;

const ListElement = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PassedContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;

  & > div:first-of-type {
    align-self: flex-end;
  }

  &:first-of-type {
    padding: 8px 0 0 0;
    border-top: 1px solid ${Colors.Gray100};
  }
`;

const PassedElement = styled.span`
  display: flex;
  justify-content: space-between;
`;

const CardView = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const EventContainer = styled.section`
  padding: 0 18px;
`;

const InviteBanner = styled.section`
  position: relative;
  width: 100%;
  background-color: #ffeada;
  padding: 20px;
  z-index: 999;
`;

const BannerContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleContainer = styled.div``;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OwnerContainer = styled.div`
  display: flex;
  gap: 4px;
`;
