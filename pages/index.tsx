import styled from "@emotion/styled";
import { deviceHeight } from "@shared/atoms";
import { Button, Text } from "@shared/components";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Colors } from "styles";

const Home: NextPage = () => {
  const { push } = useRouter();
  const [, setHeight] = useRecoilState(deviceHeight);

  const handleClick = (type: string) => {
    switch (type) {
      case "new":
        push("/createRoom");
        break;
      case "enter":
        push("/enterRoom");
        break;
    }
  };

  useEffect(() => {
    setHeight(window.innerHeight);
  }, []);

  return (
    <Container>
      <TextContainer>
        <Text type="H2">Welcome!</Text>
        <Subtitle>
          <Text type="H4">Let’s get your home</Text>
          <Text type="H4">in order with HOUSIT</Text>
        </Subtitle>
      </TextContainer>
      <ButtonContainer>
        <Button
          textType="BodyBold"
          buttonColor={Colors.Orange200}
          onClick={() => handleClick("new")}
          buttonSize="Normal"
        >
          Create new room
        </Button>
        <Button
          textColor={Colors.Gray50}
          textType="BodyBold"
          buttonColor={Colors.Gray500}
          onClick={() => handleClick("enter")}
          buttonSize="Normal"
        >
          Enter the room
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default Home;

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
  top: 150px;
  margin: 0 17px;
  gap: 16px;
`;

const Subtitle = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.section`
  display: flex;
  position: relative;
  flex-direction: column;
  top: 350px;
  margin: 0 12px;
  gap: 12px;
`;
