import styled from "@emotion/styled";
import { roomName, roomPassword } from "@shared/atoms";
import { Button, ControlledInput, Text } from "@shared/components";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Colors } from "styles";

const CreateRoom = () => {
  const { push } = useRouter();
  const [name, setName] = useRecoilState(roomName);
  const [password, setPassword] = useRecoilState(roomPassword);
  const [validate, setValidate] = useState({ name: false, password: false });

  const handleChangeName = useCallback((value: string) => {
    setName(value);
  }, []);

  const handleChangePassword = useCallback((value: string) => {
    setPassword(value);
  }, []);

  const handleCreateRoom = () => {
    if (validate.name && validate.password) push("/createRoom/makeProfile");
  };

  useEffect(() => {
    setValidate({
      password: password.length >= 6,
      name: name.trim().length >= 2,
    });
  }, [name, password]);

  return (
    <Container>
      <InputContainer>
        <InputWrapper>
          <Text type="LabelBold" color={Colors.Gray700}>
            Room Name
          </Text>
          <ControlledInput
            value={name}
            inputType="text"
            placeholder="Room Name"
            onChange={handleChangeName}
          />
        </InputWrapper>
        <InputWrapper>
          <Text type="LabelBold" color={Colors.Gray700}>
            Room Password
          </Text>
          <ControlledInput
            value={password}
            placeholder="Password"
            onChange={handleChangePassword}
          />
          <Text
            type="Label"
            color={validate.password ? Colors.Gray400 : Colors.State_Negative}
          >
            Room password should be 6 digits
          </Text>
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
          onClick={handleCreateRoom}
        >
          Create
        </Button>
      </FixedArea>
    </Container>
  );
};

export default CreateRoom;

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
  padding: 30px 12px;
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
