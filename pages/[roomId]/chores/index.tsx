import styled from "@emotion/styled";
import { useGetChores } from "@shared/apis/Chores";
import { deviceHeight } from "@shared/atoms";
import { Button, Chip, Icon, Text } from "@shared/components";
import RandomRole from "@shared/components/ModalContent/RandomRole";
import { ChoresBody, IconType } from "@shared/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Colors, Shadow } from "styles";

const Chore = () => {
  const {
    query: { roomId },
    push,
  } = useRouter();

  const [showRoleModal, setShowRoleModal] = useState(false);
  const height = useRecoilValue(deviceHeight);

  const { data: choreData, refetch: choreRefetch } = useGetChores(
    String(roomId),
  );

  const getMembersRole = (data?: ChoresBody[]) => {
    if (data) {
      const members = data.map(({ choreMembers, choreArea }) => {
        return { choreMembers, choreArea };
      });

      return members;
    }
  };

  const handleClickAddNew = () => {
    push(`/${roomId}/chores/add`);
  };

  const handleClickRandomModal = () => {
    setShowRoleModal((prev) => !prev);
  };

  useEffect(() => {
    choreRefetch();
  }, []);

  return (
    <Container height={height}>
      {showRoleModal && (
        <RandomRole
          handleRoleModal={handleClickRandomModal}
          infoRefetch={choreRefetch}
        />
      )}
      <TodoSection>
        <Text type="BodyBold" color={Colors.Black}>
          Chores to do
        </Text>
        <Todos>
          {choreData?.map(
            ({
              choreId,
              choreArea,
              color,
              description,
              icon,
              choreDay,
              choreFrequency,
              choreMembers,
            }) => {
              return (
                <TodoCardContainer key={choreId + choreArea + description}>
                  <Icon icon={icon as IconType} size={38} color={color} />
                  <TodoCardText>
                    <Text type="BodyBold">{choreArea}</Text>
                    <Text type="LabelLight" color={Colors.Gray400}>
                      {choreDay ?? `weekly ${choreFrequency} times`}
                    </Text>
                  </TodoCardText>
                </TodoCardContainer>
              );
            },
          )}
          <AddNew index={choreData?.length || 0} onClick={handleClickAddNew}>
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
          {/* <Text type="LabelLight" color={Colors.Gray400}>
            {`Updated at ${choreData.}`}
          </Text> */}
        </RolesTitle>
        <MemberContainer>
          {getMembersRole(choreData)?.map(
            ({ choreArea, choreMembers }, index) => {
              return (
                <MemberWrapper key={choreArea + index} index={index}>
                  <MemberInner>
                    <Inner>
                      <div>
                        {choreMembers.map((member, index) => (
                          <Text
                            key={index + member.memberId}
                            type="Body"
                          >{`@${member.memberName}`}</Text>
                        ))}
                      </div>
                      <Chip>{choreArea}</Chip>
                    </Inner>
                  </MemberInner>
                </MemberWrapper>
              );
            },
          )}
        </MemberContainer>
        <Button
          textType="LabelBold"
          buttonColor={Colors.Orange200}
          buttonSize="Normal"
          onClick={handleClickRandomModal}
        >
          Assign Random Roles
        </Button>
      </RolesContainer>
    </Container>
  );
};

export default Chore;

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

const AddNew = styled.div<{ index: number }>`
  display: flex;
  flex-direction: column;
  width: ${({ index }) => (index % 2 === 0 ? `100%;` : "calc(50% - 4px);")} 
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
