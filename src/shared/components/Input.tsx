import styled from "@emotion/styled";
import { HTMLAttributes, useEffect, useState } from "react";
import { Colors } from "styles";
import Icon from "./Icon";

interface ControlledInputProps
  extends Omit<HTMLAttributes<HTMLInputElement>, "onChange"> {
  value?: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export const ControlledInput = ({
  value: initialValue,
  onChange,
  placeholder,
  ...props
}: ControlledInputProps) => {
  const [value, setValue] = useState(initialValue || "");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  return (
    <InputContainer>
      <SInput
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={({ target: { value } }) => setValue(value)}
        placeholder={placeholder}
        {...props}
      />
      <IconContainer onClick={() => setShowPassword((prev) => !prev)}>
        <Icon
          icon={showPassword ? "Eye_Close" : "Eye_Open"}
          color={Colors.Gray300}
        />
      </IconContainer>
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  border: 1px solid ${Colors.Gray100};
  border-radius: 8px;
  padding: 16px 12px;
  justify-content: space-between;
  align-items: center;
`;

const SInput = styled.input`
  width: 100%;
  border: none;
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: -0.01em;
  padding: 3px 0;
  outline: none;
`;

const IconContainer = styled.div`
  width: 24px;
  height: 24px;
`;
