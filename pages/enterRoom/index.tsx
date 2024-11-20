import styled from "@emotion/styled";
import { Button, ControlledInput, Text } from "@shared/components";
import { useEffect, useState } from "react";
import { Colors } from "styles";

const CreateRoom = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [validate, setValidate] = useState({ name: false, password: false });

  const handleChangeName = (value: string) => {
    setName(value);
  };

  const handleChangePassword = (value: string) => {
    setPassword(value);
  };

  const handleClick = () => {};

  useEffect(() => {
    // if (incorrect) setAlert(true)
    setValidate((prev) => ({
      ...prev,
      password: password.length >= 6,
      name: name.trim().length >= 2,
    }));
  }, [name, password]);

  return (
    <Container>
      <InputContainer>
        <InputWrapper>
          <Text type="LabelBold" color={Colors.Gray700}>
            Room Name
          </Text>
          <ControlledInput
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
            maxLength={6}
            placeholder="Password"
            onChange={handleChangePassword}
          />
          {alert && (
            <Text
              type="Label"
              color={
                validate.name && validate.password
                  ? Colors.Gray400
                  : Colors.State_Negative
              }
            >
              Incorrect password! Please try again
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
        >
          Enter
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
