import styled from "@emotion/styled";
import { useGetEvents } from "@shared/apis/Events";
import { Chip, Icon, Text } from "@shared/components";
import { getMonth } from "@shared/utils";
import { useEffect, useRef, useState } from "react";
import { Colors } from "styles";

const Event = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [showScroll2Top, setShowScroll2Top] = useState(false);
  const { data: eventData } = useGetEvents("1");

  const handleScroll2TopView = () => {
    const Y = window.scrollY;
    if (Y > 80) {
      setShowScroll2Top(true);
    } else {
      setShowScroll2Top(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const today = new Date();
      const currentFocus = document.getElementById(
        `${today.getFullYear()}-${today.getMonth() + 1}`,
      );
      if (currentFocus) {
        currentFocus.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);

    window.addEventListener("scroll", handleScroll2TopView);

    return () => {
      window.removeEventListener("scroll", handleScroll2TopView);
      clearTimeout(timer);
    };
  }, []);

  return (
    <Container ref={containerRef}>
      <ScrollTopContainer isShown={showScroll2Top}>
        <Icon icon="Chevron_Up" color={Colors.Gray400} />
        <Text type="LabelLight" color={Colors.Gray400}>
          Scroll to see previous events
        </Text>
      </ScrollTopContainer>
      <EventContainer>
        {eventData &&
          Object.entries(eventData).map(([year, months]) =>
            Object.entries(months).map(([month, events]) => {
              const monthName = getMonth(Number(month));

              return (
                <EventWrapper key={`${year}-${month}`} id={`${year}-${month}`}>
                  <Text type="BodyBold" color={Colors.Gray500}>
                    {monthName} {year}
                  </Text>
                  <Events>
                    {events.map(({ eventId, eventName, eventDay, members }) => (
                      <EventCard key={eventId}>
                        <EventAlert>
                          <Text type="BodyBold">{eventName}</Text>
                          <Text type="LabelLight">{eventDay}</Text>
                        </EventAlert>
                        <MemberContainer>
                          {members.map(({ memberId, memberName }) => (
                            <Chip key={memberId}>{memberName}</Chip>
                          ))}
                        </MemberContainer>
                      </EventCard>
                    ))}
                  </Events>
                </EventWrapper>
              );
            }),
          )}
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

const ScrollTopContainer = styled.div<{ isShown: boolean }>`
  display: ${({ isShown }) => (isShown ? "flex" : "none")};
  position: fixed;
  flex-direction: column;
  width: 100%;
  top: 48px;
  background: linear-gradient(
    180deg,
    #fff 35.93%,
    rgba(255, 255, 255, 0) 93.33%
  );
  padding: 10px 0;
  justify-content: center;
  align-items: center;
  z-index: 999;
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
  height: 66px;
`;
