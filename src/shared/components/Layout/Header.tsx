import styled from "@emotion/styled";
import { Colors, Shadow } from "styles";
import Icon from "../Icon";
import { useRouter } from "next/router";
import Button from "../Button";
import { Text } from "..";

const Header = () => {
  const { push, pathname, back } = useRouter();
  const currentPath = pathname.split("/")[1];

  const handleClickLeft = () => {
    switch (currentPath) {
      case "setting":
        back();
        break;
      default:
        push("/home");
        break;
    }
  };

  const handleClickRight = () => {
    switch (currentPath) {
      case "setting":
        // TODO: api call
        break;
      default:
        push("/setting");
        break;
    }
  };

  return (
    <Container>
      <IconContainer onClick={handleClickLeft}>
        {currentPath === "setting" ? (
          <Icon icon="Arrow_Left" color={Colors.Black} />
        ) : (
          <Icon icon="Logo_Main" color={Colors.Black} />
        )}
      </IconContainer>
      {currentPath === "setting" && <Text type="BodyBold">Setting</Text>}
      <IconContainer onClick={handleClickRight}>
        {currentPath === "setting" ? (
          <Button buttonColor={Colors.Gray400} textColor={Colors.White}>
            Save
          </Button>
        ) : (
          <Icon icon="Settings" color={Colors.Black} />
        )}
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
  align-items: center;
  background-color: ${Colors.White};
  ${Shadow.Small};
  z-index: 9999;
`;

const IconContainer = styled.div``;
