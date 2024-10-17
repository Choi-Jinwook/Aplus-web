import styled from "@emotion/styled";
import { Colors, Shadow } from "styles";
import Icon from "../Icon";
import { useRouter } from "next/router";

const Header = () => {
  const { push } = useRouter();

  const handleClick = () => {
    push("/setting");
  };

  return (
    <Container>
      <IconContainer>
        <Icon icon="Logo_Main" />
      </IconContainer>
      <IconContainer onClick={handleClick}>
        <Icon icon="Settings" />
      </IconContainer>
    </Container>
  );
};

export default Header;

const Container = styled.header`
  display: flex;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 48px;
  padding: 12px;
  justify-content: space-between;
  background-color: ${Colors.White};
  ${Shadow.Small};
  z-index: 9999;
`;

const IconContainer = styled.div``;
