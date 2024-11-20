import styled from "@emotion/styled";
import { usePutMember } from "@shared/apis";
import { currentUser } from "@shared/atoms";
import { Button, ControlledInput, Text } from "@shared/components";
import { ERROR_MESSAGE } from "@shared/constants";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import { Colors } from "styles";

type ErrorType = "current" | "new";

const RoomPw = () => {
  const {
    push,
    query: { roomId },
  } = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState<ErrorType | null>(null);
  const [user, setUser] = useRecoilState(currentUser);

  const { mutateAsync: putUser } = usePutMember();

  const handleChangeName = useCallback((value: string) => {
    setName(value);
  }, []);

  const handleChangePassword = useCallback((value: string) => {
    setPassword(value);
  }, []);

  const handleChangeNewPassword = useCallback((value: string) => {
    setNewPassword(value);
  }, []);

  const handleClickChange = async () => {
    if (user) {
      if (password !== user[0].memberPassword) setPasswordError("current");
      else if (newPassword.length < 4) setPasswordError("new");
      else {
        setPasswordError(null);

        try {
          await putUser({
            roomNumber: String(roomId),
            memberId: String(user[0].memberId),
            data: {
              memberIcon: user[0].memberIcon,
              memberName: name,
              memberPassword: newPassword,
            },
          });

          push(`/${roomId}/home`);
        } catch (error) {
          console.error("putError", error);
        }
      }
    }
  };

  return (
    <Container>
      <InputContainer>
        <InputWrapper>
          <Text type="LabelBold" color={Colors.Gray700}>
            Name
          </Text>
          <ControlledInput
            disabled
            value={"HOUSIT"} // roomName
            inputType="text"
            placeholder="Room Name"
            onChange={handleChangeName}
          />
        </InputWrapper>
        <InputWrapper>
          <Text type="LabelBold" color={Colors.Gray700}>
            Current Room Password
          </Text>
          <ControlledInput
            isError={passwordError === "current"}
            maxLength={6}
            placeholder="Current Password"
            onChange={handleChangePassword}
          />
        </InputWrapper>
        <InputWrapper>
          <Text type="LabelBold" color={Colors.Gray700}>
            New Room Password
          </Text>
          <ControlledInput
            isError={passwordError === "new"}
            maxLength={6}
            placeholder="New Password"
            onChange={handleChangeNewPassword}
          />
          {passwordError && (
            <Text type="Label" color={Colors.State_Negative}>
              {passwordError === "current"
                ? ERROR_MESSAGE.PASSWORD.CURRENT
                : ERROR_MESSAGE.PASSWORD.ROOM_NEW}
            </Text>
          )}
        </InputWrapper>
      </InputContainer>

      <FixedArea>
        <Button
          textColor={name && password ? Colors.White : Colors.Gray500}
          textType="BodyBold"
          buttonColor={name && password ? Colors.Orange200 : Colors.Gray200}
          buttonSize="Normal"
          onClick={handleClickChange}
        >
          Change
        </Button>
      </FixedArea>
    </Container>
  );
};

export default RoomPw;

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

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
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
  bottom: 74px;
  padding: 0 12px;
`;
