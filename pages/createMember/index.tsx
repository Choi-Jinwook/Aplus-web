import styled from "@emotion/styled";
import { usePostCreateRoom } from "@shared/apis";
import { roomName, roomPassword, userName, userPassword } from "@shared/atoms";
import { Button, ControlledInput, Text } from "@shared/components";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Colors } from "styles";

const CreateMember = () => {
  const { push } = useRouter();
  const [nameRoom, setNameRoom] = useRecoilState(roomName);
  const [passwordRoom, setPasswordRoom] = useRecoilState(roomPassword);
  const [name, setName] = useRecoilState(userName);
  const [password, setPassword] = useRecoilState(userPassword);
  const [validate, setValidate] = useState({ name: false, password: false });

  const { mutateAsync: postRoom } = usePostCreateRoom();

  const handleChangeName = useCallback((value: string) => {
    setName(value);
  }, []);

  const handleChangePassword = useCallback((value: string) => {
    setPassword(value);
  }, []);

  const handleCreateMember = async () => {
    if (validate.name && validate.password) {
      try {
        const roomData = await postRoom({
          masterMemberName: name,
          masterMemberPassword: password,
          roomName: nameRoom,
          roomPassword: passwordRoom,
          description: "",
        });

        push(`/${roomData.roomId}/home`);
      } catch (error) {
        console.error("member failed", error);
      }
    }
  };

  useEffect(() => {
    setValidate((prev) => ({
      ...prev,
      password: password.length === 4,
      name: name.trim().length >= 2,
    }));
  }, [name, password]);

  return (
    <Container>
      <InputContainer>
        <InputWrapper>
          <Text type="LabelBold" color={Colors.Gray700}>
            Name
          </Text>
          <ControlledInput
            inputType="text"
            placeholder="Member Name"
            onChange={handleChangeName}
          />
        </InputWrapper>
        <InputWrapper>
          <Text type="LabelBold" color={Colors.Gray700}>
            Password
          </Text>
          <ControlledInput
            maxLength={4}
            inputMode="numeric"
            placeholder="Password"
            onChange={handleChangePassword}
          />
          {!validate.password && (
            <Text
              type="Label"
              color={validate.password ? Colors.Gray400 : Colors.State_Negative}
            >
              User password should be 4 digits
            </Text>
          )}
        </InputWrapper>
      </InputContainer>

      <FixedArea>
        <Button
          textColor={
            validate.name && validate.password ? Colors.White : Colors.Gray500
          }
          textType="BodyBold"
          buttonColor={
            validate.name && validate.password
              ? Colors.Orange200
              : Colors.Gray200
          }
          buttonSize="Normal"
          onClick={handleCreateMember}
        >
          Create
        </Button>
      </FixedArea>
    </Container>
  );
};

export default CreateMember;

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
  bottom: 12px;
  padding: 0 12px;
`;
