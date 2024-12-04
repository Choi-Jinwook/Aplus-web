import styled from "@emotion/styled";
import { useGetEvents } from "@shared/apis/Events";
import { deviceHeight } from "@shared/atoms";
import { Chip, Icon, Text } from "@shared/components";
import { getMonth } from "@shared/utils";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { Colors, Shadow } from "styles";

const Event = () => {
  const {
    query: { roomId },
    push,
  } = useRouter();

  const containerRef = useRef<HTMLElement | null>(null);
  const [showScroll2Top, setShowScroll2Top] = useState(false);
  const height = useRecoilValue(deviceHeight);

  const { data: eventData, refetch: eventRefetch } = useGetEvents(
    String(roomId),
  );

  const handleScroll2TopView = () => {
    const Y = window.scrollY;
    if (Y > 80) {
      setShowScroll2Top(true);
    } else {
      setShowScroll2Top(false);
    }
  };

  const handleClickAddNew = () => {
    push(`/${roomId}/events/add`);
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

  useEffect(() => {
    eventRefetch();
  }, []);

  return (
    <>
      {eventData && Object.keys(eventData).length !== 0 ? (
        <Container height={height} ref={containerRef}>
          <ScrollTopContainer isShown={showScroll2Top}>
            <Icon icon="Chevron_Up" color={Colors.Gray400} />
            <Text type="LabelLight" color={Colors.Gray400}>
              Scroll to see previous events
            </Text>
          </ScrollTopContainer>
          <EventContainer>
            {eventData &&
              Object.entries(eventData).map(([year, months], index) =>
                Object.entries(months).map(([month, events]) => {
                  const monthName = getMonth(Number(month));
                  const isLast = Object.entries(eventData).length - 1 === index;

                  return (
                    <EventWrapper
                      isLast={isLast}
                      key={`${year}-${month}`}
                      id={`${year}-${month}`}
                    >
                      <Text type="BodyBold" color={Colors.Gray500}>
                        {monthName} {year}
                      </Text>
                      <Events>
                        {events.map(
                          ({ eventId, eventName, eventDay, members }) => (
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
                          ),
                        )}
                      </Events>
                    </EventWrapper>
                  );
                }),
              )}
          </EventContainer>

          <AddNewButton onClick={handleClickAddNew}>
            <Icon icon="Plus_Button" color={Colors.White} size={32} />
          </AddNewButton>
        </Container>
      ) : (
        <Empty height={height}>
          <Text type="Body" color={Colors.Gray500}>
            No events yet!
          </Text>
          <Text type="Body" color={Colors.Gray500}>
            {`Add one and manage with HOUSIT :)`}
          </Text>

          <AddNewButton onClick={handleClickAddNew}>
            <Icon icon="Plus_Button" color={Colors.White} size={32} />
          </AddNewButton>
        </Empty>
      )}
    </>
  );
};

export default Event;

const Container = styled.main<{ height: number | null }>`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100vw;
  height: ${({ height }) => height && `${height - 108}px`};
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

const EventWrapper = styled.div<{ isLast: boolean }>`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  gap: 4px;

  ${({ isLast }) => isLast && `padding-bottom: 20px;`}
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
  flex-wrap: wrap;
  gap: 4px;
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
  z-index: 9999;
`;

const Empty = styled.div<{ height: number | null }>`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100vw;
  height: ${({ height }) => height && `${height - 108}px`};
  top: 48px;
  background-color: ${Colors.Gray50};
  justify-content: center;
  align-items: center;
`;
