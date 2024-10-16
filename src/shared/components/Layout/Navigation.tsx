import styled from "@emotion/styled";
import { IconType } from "@shared/types";
import { Colors } from "styles";
import Icon from "../Icon";
import { useRouter } from "next/router";

const Navigation = () => {
  const { push, pathname } = useRouter();

  const handleClick = (_icon: IconType) => {
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
        push("/clean");
        break;
      case "Icon_Event":
        push("/event");
        break;
    }
  };

  const checkPath = (_icon: IconType) => {
    const currentPath = _icon.split("_")[1].toLowerCase();

    if (pathname.includes(currentPath)) return true;
  };

  const Icons: IconType[] = [
    "Icon_Home",
    "Icon_Food",
    "Icon_Finance",
    "Icon_Clean",
    "Icon_Event",
  ];

  return (
    <Container>
      {Icons.map((_icon) => (
        <IconContainer key={_icon} onClick={() => handleClick(_icon)}>
          <Icon icon={_icon} color={checkPath(_icon) && `${Colors.Black}`} />
        </IconContainer>
      ))}
    </Container>
  );
};

export default Navigation;

const Container = styled.nav`
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 52px;
  background-color: ${Colors.White};
  z-index: 9999;
  box-shadow:
    0px -4px 4px 0px #00000008,
    0px 0px 3px 0px #00000014;
`;

const IconContainer = styled.div`
  display: flex;
  width: 20%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
