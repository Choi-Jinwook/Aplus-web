import styled from "@emotion/styled";
import { Shadow } from "styles";
import Icon from "../Icon";

const Header = () => {
  return (
    <Container>
      <Icon icon="Logo_Main" />
      <Icon icon="Settings" />
    </Container>
  );
};

export default Header;

const Container = styled.header`
  display: flex;
  width: 100vw;
  height: 48px;
  padding: 12px;
  justify-content: space-between;
  ${Shadow.Small};
`;
