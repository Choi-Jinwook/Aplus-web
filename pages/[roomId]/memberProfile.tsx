import styled from "@emotion/styled";
import { roomMembers } from "@shared/atoms";
import { Icon, Text } from "@shared/components";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { Colors } from "styles";

const MemberProfile = () => {
  const {
    push,
    query: { roomId },
  } = useRouter();

  const [member, setMember] = useRecoilState(roomMembers);

  const handleClickMember = (value: string, memberId: number) => {
    push(`/${roomId}/enterRoom?member=${value}&memberId=${memberId}`);
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
        {member &&
          member.map(({ memberId, memberName, memberIcon }, index) => {
            return (
              <CardWrapper
                index={index}
                key={memberId}
                onClick={() => handleClickMember(memberName, memberId)}
              >
                <Text type="Body" color={Colors.Black}>
                  {memberName}
                </Text>
              </CardWrapper>
            );
          })}
        {member && (
          <CardWrapper index={member.length} isAddNew onClick={handleClickNew}>
            <Icon icon="Plus_Button" color={Colors.White} />
            <Text type="Body" color={Colors.White}>
              Create New
            </Text>
          </CardWrapper>
        )}

        <AdjustHeight />
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
  top: 100px;
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

const AdjustHeight = styled.div`
  height: 52px;
`;
