import styled from "@emotion/styled";
import { HTMLAttributes, useEffect, useState } from "react";
import { Colors, Shadow } from "styles";
import Icon from "./Icon";

interface ControlledInputProps
  extends Omit<HTMLAttributes<HTMLInputElement>, "onChange"> {
  value?: string;
  maxLength?: number;
  inputType?: string;
  disabled?: boolean;
  isError?: boolean;
  showOutline?: boolean;
  shaded?: boolean;
  size?: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export const ControlledInput = ({
  value: initialValue,
  maxLength,
  inputType,
  disabled,
  isError,
  showOutline,
  shaded,
  size = "Normal",
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
    <InputContainer
      isError={isError}
      disabled={disabled}
      showOutline={showOutline}
      shaded={shaded}
      size={size}
    >
      <SInput
        shaded={shaded}
        maxLength={maxLength}
        disabled={disabled}
        type={inputType ? "text" : showPassword ? "text" : "password"}
        value={value}
        onChange={({ target: { value } }) => setValue(value)}
        placeholder={placeholder}
        {...props}
      />
      {!inputType && (
        <IconContainer onClick={() => setShowPassword((prev) => !prev)}>
          <Icon
            icon={showPassword ? "Eye_Close" : "Eye_Open"}
            color={Colors.Gray300}
          />
        </IconContainer>
      )}
    </InputContainer>
  );
};

const InputContainer = styled.div<{
  isError?: boolean;
  disabled?: boolean;
  showOutline?: boolean;
  shaded?: boolean;
  size?: string;
}>`
  display: flex;
  border-radius: 8px;
  justify-content: space-between;
  align-items: center;

  ${({ size }) =>
    size === "Normal" ? `padding: 10px 14px;` : `padding: 8px; height: 44px;`}

  ${({ shaded }) => shaded && `background-color: ${Colors.Gray50};`}

  ${({ disabled, isError, showOutline }) => {
    if (disabled) {
      return `
        border: ${showOutline ? "none" : `1px solid ${Colors.Gray200}`} ;
        background-color: ${Colors.Gray50};
        ${Shadow.Small};
      `;
    }
    if (isError) {
      return `
        border: ${showOutline ? "none" : `1px solid ${Colors.State_Negative}`};
      `;
    }
    return `
      border: ${showOutline ? "none" : `1px solid ${Colors.Gray100}`};
    `;
  }}
`;

const SInput = styled.input<{ shaded?: boolean }>`
  width: 100%;
  border: none;
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: -0.01em;
  padding: 3px 0;
  outline: none;

  ${({ shaded }) => shaded && `background-color: ${Colors.Gray50};`}
`;

const IconContainer = styled.div`
  width: 24px;
  height: 24px;
`;
