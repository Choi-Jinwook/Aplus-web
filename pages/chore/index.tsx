import styled from "@emotion/styled";
import { useGetChores } from "@shared/apis/Chores";
import { Button, Chip, Icon, Text } from "@shared/components";
import { ChoresBody, IconType } from "@shared/types";
import { useState } from "react";
import { Colors, Shadow } from "styles";

const Chore = () => {
  // const { data } = useGetChores("1");

  const [todos, setTodos] = useState<ChoresBody[]>([
    {
      choreArea: "주방",
      color: "#FF5733",
      description: "주말에 주방 청소하기",
      icon: "Livingroom",
      choreDay: "MONDAY",
      choreFrequency: 1,
      enrolledDate: "2024-11-03",
      memberIds: [1, 3, 4],
    },
    {
      choreArea: "부엌",
      color: "#FF5733",
      description: "주말에 부엌 청소하기",
      icon: "Kitchen",
      choreDay: "MONDAY",
      choreFrequency: 1,
      enrolledDate: "2024-11-03",
      memberIds: [1, 3, 4],
    },
    {
      choreArea: "화장실",
      color: "#FF5733",
      description: "주말에 화장실 청소하기",
      icon: "Toilet",
      choreDay: "MONDAY",
      choreFrequency: 1,
      enrolledDate: "2024-11-03",
      memberIds: [1, 3, 4],
    },
    {
      choreArea: "빨래",
      color: "#FF5733",
      description: "주말에 빨래 청소하기",
      icon: "Laundry",
      choreDay: "MONDAY",
      choreFrequency: 1,
      enrolledDate: "2024-11-03",
      memberIds: [1, 3, 4],
    },
    {
      choreArea: "사람",
      color: "#FF5733",
      description: "주말에 사람 청소하기",
      icon: "Person",
      choreDay: "MONDAY",
      choreFrequency: 1,
      enrolledDate: "2024-11-03",
      memberIds: [1, 3, 4],
    },
  ]);

  return (
    <Container>
      <TodoSection>
        <Text type="BodyBold" color={Colors.Black}>
          Chores to do
        </Text>
        <Todos>
          {todos?.map(
            ({ choreArea, color, description, icon, enrolledDate }) => {
              return (
                <TodoCardContainer key={choreArea + description}>
                  <Icon icon={icon as IconType} size={38} color={color} />
                  <TodoCardText>
                    <Text type="BodyBold">{choreArea}</Text>
                    <Text type="LabelLight" color={Colors.Gray400}>
                      {enrolledDate}
                    </Text>
                  </TodoCardText>
                </TodoCardContainer>
              );
            },
          )}
          <AddNew>
            <Icon icon="Plus_Button" color={Colors.Gray600} />
            <Text type="Label" color={Colors.Gray600}>
              Add New
            </Text>
          </AddNew>
        </Todos>
      </TodoSection>

      <RolesContainer>
        <RolesTitle>
          <Text type="BodyBold">Roles</Text>
          <Text type="LabelLight" color={Colors.Gray400}>
            Updated at 10/8 (Tue)
          </Text>
        </RolesTitle>
        <MemberContainer>
          <MemberWrapper index={0}>
            <MemberInner>
              <Inner>
                <Text type="Body">@Minsoo</Text>
                <Chip>Living Room</Chip>
              </Inner>
            </MemberInner>
          </MemberWrapper>
          <MemberWrapper index={1}>
            <MemberInner>
              <Inner>
                <Text type="Body">@Jinwook</Text>
                <Chip>Laundry</Chip>
              </Inner>
            </MemberInner>
          </MemberWrapper>
          <MemberWrapper index={2}>
            <MemberInner>
              <Inner>
                <Text type="Body">@Sooyeong</Text>
                <Chip>Toilet</Chip>
              </Inner>
            </MemberInner>
          </MemberWrapper>
        </MemberContainer>
        <Button
          textType="LabelBold"
          buttonColor={Colors.Orange200}
          buttonSize="Normal"
        >
          Assign Random Roles
        </Button>
      </RolesContainer>

      <AdjustHeight />
    </Container>
  );
};

export default Chore;

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

const TodoSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 12px;
`;

const Todos = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TodoCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(50% - 4px);
  border-radius: 16px;
  background-color: ${Colors.White};
  padding: 20px 12px;
  gap: 4px;
  ${Shadow.Small};
`;

const TodoCardText = styled.div``;

const AddNew = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(50% - 4px);
  border-radius: 16px;
  background-color: ${Colors.Blue100};
  padding: 20px 12px;
  gap: 12px;
  justify-content: center;
  align-items: center;
  ${Shadow.Small};
`;

const RolesContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 12px;
  gap: 12px;
  background-color: ${Colors.White};
`;

const RolesTitle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const MemberContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const MemberWrapper = styled.div<{ index: number }>`
  display: flex;
  width: 100%;
  padding: 4px 0;
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

const MemberInner = styled.div`
  display: flex;
  width: 100%;
  padding: 0px 8px;
  gap: 8px;
  align-items: center;
`;

const Inner = styled.div`
  display: flex;
  width: 100%;
  padding: 11px 0px;
  gap: 10px;
  justify-content: space-between;
`;

const AdjustHeight = styled.div`
  height: 52px;
`;
