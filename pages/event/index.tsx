import styled from "@emotion/styled";
import { Chip, Text } from "@shared/components";
import { useState } from "react";
import { Colors } from "styles";

const Event = () => {
  const [events, setEvents] = useState([]);

  return (
    <Container>
      <EventContainer>
        <EventWrapper>
          <Text type="BodyBold" color={Colors.Gray500}>
            current
          </Text>
          <Events>
            <EventCard>
              <EventAlert>
                <Text type="BodyBold">Firework</Text>
                <Text type="LabelLight">Today</Text>
              </EventAlert>
              <MemberContainer>
                <Chip>Person</Chip>
                <Chip>Person</Chip>
                <Chip>Person</Chip>
              </MemberContainer>
            </EventCard>
          </Events>
        </EventWrapper>
      </EventContainer>
      <AdjustHeight />
    </Container>
  );
};

export default Event;

const Container = styled.main`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100vw;
  top: 48px;
  gap: 8px;
  background-color: ${Colors.Gray50};
  overflow-y: auto;
`;

const EventContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0px 12px;
`;

const EventWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  gap: 4px;
`;

const Events = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const EventCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: ${Colors.White};
  padding: 12px 16px 16px 16px;
  gap: 16px;
`;

const EventAlert = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MemberContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const AdjustHeight = styled.div`
  height: 52px;
`;
