import styled from "@emotion/styled";
import { useGetMember } from "@shared/apis";
import { currentUser } from "@shared/atoms";
import { Button, ControlledInput, Text } from "@shared/components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Colors } from "styles";

const EnterRoom = () => {
  const {
    query: { member, roomId, memberId: id, roomPassword },
    push,
  } = useRouter();
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useRecoilState(currentUser);

  const { data } = useGetMember(String(roomId), {
    roomPassword: String(roomPassword),
  });

  const handleChangePassword = (value: string) => {
    setPassword(value);
  };

  const handleClick = async () => {
    if (user && user[0].memberPassword === password) {
      push(`/${roomId}/home`);
      return;
    }

    setIsError(true);
  };

  useEffect(() => {
    if (data) {
      const user = data.filter(({ memberId }) => memberId === Number(id));
      setUser(user);
    }
  }, [data]);

  useEffect(() => {
    if (isError) setIsError(false);
  }, [password]);

  return (
    <Container>
      <TitleContainer>
        <Text type="H2">{`Hi, ${member}!`}</Text>
        <Text type="H4">Enter your password to continue</Text>
      </TitleContainer>

      <FixedArea>
        <InputContainer>
          <InputWrapper>
            {isError && (
              <Text type="Label" color={Colors.State_Negative}>
                Incorrect password! Please try again
              </Text>
            )}
            <ControlledInput
              maxLength={4}
              inputMode="numeric"
              placeholder="Password"
              onChange={handleChangePassword}
            />
          </InputWrapper>
        </InputContainer>
        <Button
          textColor={Colors.White}
          textType="BodyBold"
          buttonColor={Colors.Orange200}
          buttonSize="Normal"
          onClick={handleClick}
        >
          Login
        </Button>
      </FixedArea>
    </Container>
  );
};

export default EnterRoom;

const Container = styled.main`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100vw;
  top: 48px;
  gap: 8px;
  background-color: ${Colors.White};
  overflow-y: auto;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 120px 17px;
  gap: 16px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  gap: 12px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const FixedArea = styled.section`
  position: fixed;
  width: 100%;
  bottom: 12px;
  padding: 0 12px;
`;
