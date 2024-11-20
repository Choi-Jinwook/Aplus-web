import styled from "@emotion/styled";
import { usePostMember } from "@shared/apis";
import { Button, ControlledInput, Text } from "@shared/components";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Colors } from "styles";

const CreateUser = () => {
  const {
    push,
    query: { roomId },
  } = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [validate, setValidate] = useState({ name: false, password: false });

  const { mutateAsync: postUser } = usePostMember();

  const handleChangeName = useCallback((value: string) => {
    setName(value);
  }, []);

  const handleChangePassword = useCallback((value: string) => {
    setPassword(value);
  }, []);

  const handleCreateMember = async () => {
    if (validate.name && validate.password) {
      try {
        const res = await postUser({
          roomNumber: String(roomId),
          data: {
            memberName: name,
            memberPassword: password,
            memberIcon: "",
          },
        });
        push(`/${res.roomId}/home`);
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

export default CreateUser;

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
