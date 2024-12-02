import styled from "@emotion/styled";
import { usePostMemberPassword } from "@shared/apis";
import { currentUser, roomMembers } from "@shared/atoms";
import { Button, ControlledInput, Text } from "@shared/components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Colors } from "styles";

const EnterRoom = () => {
  const {
    query: { roomId, member: memberName, memberId: id },
    push,
  } = useRouter();

  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useRecoilState(currentUser);
  const [member, setMember] = useRecoilState(roomMembers);

  const { mutateAsync: postMemberPassword, isPending } =
    usePostMemberPassword();

  const handleChangePassword = (value: string) => {
    setPassword(value);
  };

  const handleClick = async () => {
    if (isPending) return;

    try {
      await postMemberPassword({
        roomId: String(roomId),
        memberId: String(id),
        data: { memberPassword: password },
      });

      push(`/${roomId}/home`);
    } catch (error) {
      setIsError(true);
      console.error(error);
    }
  };

  useEffect(() => {
    if (member) {
      const user = member.filter(({ memberId }) => memberId === Number(id));
      setUser(user);
      if (!user[0].hasPassword) push(`/${roomId}/home`);
    }
  }, [member, id]);

  useEffect(() => {
    if (isError) setIsError(false);
  }, [password]);

  return (
    <Container>
      <TitleContainer>
        <Text type="H2">{`Hi, ${memberName}!`}</Text>
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
  padding: 40px 17px;
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
