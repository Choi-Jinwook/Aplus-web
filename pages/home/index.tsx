import styled from "@emotion/styled";
import { Badge, Card, Chip, HomeSection, Icon, Text } from "@shared/components";
import { IconType } from "@shared/types";
import { calculateRemainDay } from "@shared/utils";
import React, { useRef } from "react";
import { Colors } from "styles";

const Home = () => {
  const badgeRef = useRef(false);
  const today = new Date();
  const DAY_ALERT = 3;
  const foodData = [
    { name: "Yogurt", owner: ["Mike"], expire: "2024-11-08" },
    {
      name: "Seoul Milk",
      owner: ["All"],
      expire: "2024-11-09",
    },
    {
      name: "Bread",
      owner: ["Mike", "Jinwook"],
      expire: "2024-11-19",
    },
  ];

  const financeData = [
    {
      name: "Water Charge",
      fee: 32000,
      date: "2024-11-07",
    },
    {
      name: "Netflix",
      fee: 12000,
      date: "2024-11-08",
    },
    {
      name: "Rent fee",
      fee: 450000,
      date: "2024-11-17",
    },
    {
      name: "Electric Charge",
      fee: 9800,
      date: "2024-11-27",
    },
  ];

  const cleanData = [
    { locate: "Laundry", date: "2024-11-07", owner: "Mike" },
    {
      locate: "Kitchen",
      date: "2024-11-08",
      owner: "Seoyeong",
    },
    {
      locate: "Toilet",
      date: "2024-11-18",
      owner: "Minsoo",
    },
    {
      locate: "Livingroom",
      date: "2024-11-28",
      owner: "Jinwook",
    },
  ];

  const eventData = [
    {
      name: "Firework",
      date: "2024-11-16",
      owner: ["Minsoo", "Jinwook", "Sooyeong"],
      memo: null,
    },
    {
      name: "Hangang Picnic",
      date: "2024-11-20",
      owner: ["All"],
      memo: "Don’t forget to bring the mat!",
    },
  ];

  return (
    <Container>
      <HomeSection>
        <Text type="H4" color={Colors.Black}>
          Foods
        </Text>
        <ListContainer>
          {foodData.map(({ name, owner, expire }) => {
            const { isAlert, day } = calculateRemainDay(expire, DAY_ALERT);

            return (
              <List key={name + expire}>
                <ListElement>
                  <Text
                    type="LabelLight"
                    color={isAlert ? Colors.State_Negative : Colors.Gray400}
                  >
                    {isAlert ? "Today" : day}
                  </Text>
                  <Text type="BodyBold" color={Colors.Gray600}>
                    {name}
                  </Text>
                </ListElement>
                {owner.map((_owner) => {
                  return (
                    <Chip
                      key={_owner}
                      color={_owner === "All" ? Colors.White : undefined}
                      backgroundColor={
                        _owner === "All" ? Colors.Orange200 : undefined
                      }
                    >
                      {_owner}
                    </Chip>
                  );
                })}
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
          {cleanData.map(({ locate, date, owner }) => {
            return (
              <Card
                key={locate + date}
                icon={locate as IconType}
                iconColor={Colors.Blue200}
                title={locate}
                person={owner}
              />
            );
          })}
        </CardView>
      </HomeSection>

      <HomeSection>
        <Text type="H4" color={Colors.Black}>
          Finance
        </Text>
        <ListContainer>
          {financeData.map(({ name, fee, date }) => {
            const { isAlert, day } = calculateRemainDay(date, DAY_ALERT);
            const targetDay = new Date(date);
            const isPassed = today.getTime() > targetDay.getTime();
            const formattedDate = date.split("-").join(".");
            let showBadge = false;
            if (isPassed && !badgeRef.current) {
              showBadge = true;
              badgeRef.current = true;
            }

            return (
              <React.Fragment key={name + fee}>
                {!isPassed ? (
                  <List>
                    <ListElement>
                      <Text
                        type="LabelLight"
                        color={isAlert ? Colors.State_Negative : Colors.Gray400}
                      >
                        {isAlert ? day : formattedDate}
                      </Text>
                      <ContentContainer>
                        <Text type="BodyBold" color={Colors.Black}>
                          {name}
                        </Text>
                        <Text
                          type="BodyBold"
                          color={Colors.Black}
                        >{`${fee.toLocaleString()}₩`}</Text>
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
                        {name}
                      </Text>
                      <Text type="BodyBold" color={Colors.Gray400}>
                        {`${fee.toLocaleString()}₩`}
                      </Text>
                    </PassedElement>
                  </PassedContainer>
                )}
              </React.Fragment>
            );
          })}
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
      {eventData.map(({ name, date, owner, memo }) => {
        const { isAlert } = calculateRemainDay(date, DAY_ALERT);

        return (
          <HomeSection key={date + name} paddingSize="SemiLight">
            <TitleContainer>
              <TitleWrapper>
                <Text type="BodyBold">{name}</Text>
                <Text
                  type="LabelLight"
                  color={isAlert ? Colors.State_Negative : Colors.Black}
                >
                  {date.split("-").join("/")}
                </Text>
              </TitleWrapper>
              {memo && (
                <Text type="Label" color={Colors.Gray400}>
                  {memo}
                </Text>
              )}
            </TitleContainer>
            <OwnerContainer>
              {owner.map((_owner) => (
                <Chip
                  key={_owner}
                  color={_owner === "All" ? Colors.White : undefined}
                  backgroundColor={
                    _owner === "All" ? Colors.Orange200 : undefined
                  }
                >
                  {_owner}
                </Chip>
              ))}
            </OwnerContainer>
          </HomeSection>
        );
      })}

      <AdjustHeight />
    </Container>
  );
};

export default Home;

const Container = styled.main`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100vw;
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

const AdjustHeight = styled.div`
  height: 52px;
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
