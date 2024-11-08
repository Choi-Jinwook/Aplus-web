import styled from "@emotion/styled";
import { HTMLAttributes, useState } from "react";
import { Colors } from "styles";
import Icon from "./Icon";

interface CheckBoxProps
  extends Omit<HTMLAttributes<HTMLInputElement>, "onChange"> {
  value: boolean;
  onChange: () => void;
}

const CheckBox = ({
  value: initialValue,
  onChange,
  ...props
}: CheckBoxProps) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = () => {
    setValue((prev) => !prev);
    onChange();
  };

  return (
    <InputContainer isChecked={value} onClick={handleChange}>
      {value && <Icon icon="Check_Button" color={Colors.Orange200} />}
      <SInput readOnly checked={value} type="checkbox" {...props} />
    </InputContainer>
  );
};

export default CheckBox;

const InputContainer = styled.div<{ isChecked: boolean }>`
  display: flex;
  width: 20px;
  height: 20px;
  ${({ isChecked }) =>
    isChecked
      ? `border: 1px solid ${Colors.Orange200};
         background-color: ${Colors.Orange100};  
        `
      : `border: 1px solid ${Colors.Gray200};`}
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;

const InputBox = styled.div``;

const SInput = styled.input`
  display: none;
  outline: none;
`;
