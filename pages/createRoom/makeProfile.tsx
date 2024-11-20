import styled from "@emotion/styled";
import { Icon, Text } from "@shared/components";
import { useRouter } from "next/router";
import { Colors } from "styles";

const MakeProfile = () => {
  const { push } = useRouter();

  const handleClick = () => {
    push("/createMember");
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
        <CardWrapper onClick={handleClick}>
          <Icon icon="Plus_Button" color={Colors.White} />
          <Text type="Body" color={Colors.White}>
            Create New
          </Text>
        </CardWrapper>
      </CardContainer>
    </Container>
  );
};

export default MakeProfile;

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
  position: relative;
  top: 300px;
  padding: 0 12px;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: ${Colors.Gray400};
  padding: 20px 12px;
  gap: 12px;
  justify-content: center;
  align-items: center;
`;
