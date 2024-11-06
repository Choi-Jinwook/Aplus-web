import styled from "@emotion/styled";
import { IconType } from "@shared/types";
import { Colors } from "styles";
import Icon from "../Icon";
import { useRouter } from "next/router";
import { Text } from "..";

interface Icons {
  name: IconType;
  path: string;
}

const Navigation = () => {
  const { push, pathname } = useRouter();

  const checkPath = (_icon: IconType) => {
    const currentPath = _icon.split("_")[1].toLowerCase();

    if (pathname.includes(currentPath)) return true;
  };

  const handleClick = (_icon: IconType) => {
    if (checkPath(_icon)) return;

    switch (_icon) {
      case "Icon_Home":
        push("/home");
        break;
      case "Icon_Food":
        push("/food");
        break;
      case "Icon_Finance":
        push("/finance");
        break;
      case "Icon_Clean":
        push("/chore");
        break;
      case "Icon_Event":
        push("/event");
        break;
    }
  };

  const Icons: Icons[] = [
    { name: "Icon_Home", path: "Home" },
    { name: "Icon_Food", path: "Foods" },
    { name: "Icon_Finance", path: "Finance" },
    { name: "Icon_Clean", path: "Chores" },
    { name: "Icon_Event", path: "Events" },
  ];

  return (
    <Container>
      {Icons.map(({ name, path }) => {
        const isClicked = checkPath(name);

        return (
          <IconContainer key={name + path} onClick={() => handleClick(name)}>
            <Icon
              icon={name}
              color={isClicked ? `${Colors.Black}` : "#A2AEBA"}
            />
            <Text
              type="Navigation"
              color={isClicked ? `${Colors.Black}` : "#A2AEBA"}
            >
              {path}
            </Text>
          </IconContainer>
        );
      })}
    </Container>
  );
};

export default Navigation;

const Container = styled.nav`
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 60px;
  background-color: ${Colors.White};
  z-index: 9999;
  box-shadow: 0px -4px 4px 0px #00000008, 0px 0px 3px 0px #00000014;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
