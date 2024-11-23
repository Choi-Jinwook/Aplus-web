import styled from "@emotion/styled";
import { Colors, Shadow } from "styles";
import Icon from "../Icon";
import { useRouter } from "next/router";
import { Text } from "..";
import { upperFirstLetter } from "@shared/utils";

const Header = () => {
  const {
    push,
    pathname,
    back,
    query: { roomId },
  } = useRouter();
  const currentPath = pathname.split("/")[2];
  const isChange =
    pathname.split("/")[3] === "change" || pathname.split("/")[3] === "balance";
  const paths = ["home", "foods", "finance", "events", "chores"];

  const handleClickLeft = () => {
    if (currentPath && paths.some((path) => currentPath.includes(path)))
      push(`/${roomId}/${currentPath}`);
    else back();
  };

  const handleClickRight = async () => {
    if (isChange) {
      // TODO: api call
      return;
    }

    switch (currentPath) {
      case "setting":
        // TODO: api call
        break;
      default:
        push(`/${roomId}/setting`);
        break;
    }
  };

  return (
    <Container>
      <IconContainer onClick={handleClickLeft}>
        {currentPath === "home" ? (
          <Icon icon="Logo_Main" color={Colors.Black} />
        ) : currentPath &&
          paths.some((path) => currentPath.includes(path)) &&
          !isChange ? (
          <Text type="H4">{upperFirstLetter(currentPath)}</Text>
        ) : (
          <Icon icon="Arrow_Left" color={Colors.Black} />
        )}
      </IconContainer>
      {currentPath === "setting" && !pathname.split("/")[3] && (
        <Text type="BodyBold">Setting</Text>
      )}
      <IconContainer onClick={handleClickRight}>
        {currentPath === "setting" && !pathname.split("/")[3] ? (
          <SaveButton>
            <Text type="Label" color={Colors.White}>
              Save
            </Text>
          </SaveButton>
        ) : (
          !isChange &&
          currentPath &&
          paths.some((path) => currentPath.includes(path)) && (
            <Icon icon="Settings" color={Colors.Black} />
          )
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

const SaveButton = styled.button`
  display: flex;
  border: none;
  border-radius: 6px;
  background-color: ${Colors.Gray400};
  padding: 4px 10px;
  justify-content: center;
  align-items: center;
`;
