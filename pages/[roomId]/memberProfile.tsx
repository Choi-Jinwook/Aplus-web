import styled from "@emotion/styled";
import { useGetMember } from "@shared/apis";
import { Icon, Text } from "@shared/components";
import { useRouter } from "next/router";
import { Colors } from "styles";

const MemberProfile = () => {
  const {
    push,
    query: { roomId },
  } = useRouter();
  const { data } = useGetMember(String(roomId));

  const handleClickMember = (member: string, memberId: string) => {
    push(`/${roomId}/enterRoom?member=${member}&memberId=${memberId}`);
  };

  const handleClickNew = () => {
    push(`/${roomId}/createUser`);
  };

  return (
    <Container>
      <TextContainer>
        <Text type="H2">Almost Done!</Text>
        <Subtitle>
          <Text type="H4">Select or create a profile</Text>
          <Text type="H4">and get started</Text>
        </Subtitle>
      </TextContainer>

      <CardContainer>
        {data &&
          data.map(({ memberId, memberName, memberIcon }, index) => {
            return (
              <CardWrapper
                index={index}
                key={memberId}
                onClick={handleClickNew}
              >
                <Text type="Body" color={Colors.Black}>
                  {memberName}
                </Text>
              </CardWrapper>
            );
          })}
        <CardWrapper
          index={0}
          onClick={() => handleClickMember("memberName", "1")}
        >
          <Text type="Body" color={Colors.Black}>
            member1
          </Text>
        </CardWrapper>
        <CardWrapper
          index={1}
          onClick={() => handleClickMember("memberName", "2")}
        >
          <Text type="Body" color={Colors.Black}>
            member12
          </Text>
        </CardWrapper>
        <CardWrapper
          index={2}
          onClick={() => handleClickMember("memberName", "3")}
        >
          <Text type="Body" color={Colors.Black}>
            member123
          </Text>
        </CardWrapper>
        <CardWrapper index={3} isAddNew onClick={handleClickNew}>
          <Icon icon="Plus_Button" color={Colors.White} />
          <Text type="Body" color={Colors.White}>
            Create New
          </Text>
        </CardWrapper>
      </CardContainer>
    </Container>
  );
};

export default MemberProfile;

const Container = styled.main`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

const TextContainer = styled.section`
  display: flex;
  position: relative;
  flex-direction: column;
  top: 200px;
  margin: 0 17px;
  gap: 16px;
`;

const Subtitle = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardContainer = styled.div`
  display: flex;
  position: relative;
  top: 300px;
  flex-wrap: wrap;
  padding: 0 12px;
  gap: 8px;
`;

const CardWrapper = styled.div<{ isAddNew?: boolean; index: number }>`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  ${({ isAddNew, index }) => {
    if (isAddNew) {
      if (index % 2 !== 0) {
        return `
          width: calc(50% - 4px);
          background-color: ${Colors.Gray400};
          padding: 20px 12px;
          gap: 12px;
        `;
      }
      return `
        width: 100%;
        background-color: ${Colors.Gray400};
        padding: 20px 12px;
        gap: 12px;
      `;
    }

    return `
      width: calc(50% - 4px);
      background-color: ${Colors.Blue100};
      padding: 49px 51px;
    `;
  }}
`;
