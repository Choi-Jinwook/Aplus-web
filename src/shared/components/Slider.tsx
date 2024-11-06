import styled from "@emotion/styled";
import { HTMLAttributes, useState } from "react";
import { Colors } from "styles";

interface SliderProps
  extends Omit<HTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange?: (storageType: string, index: number, amount: string) => void;
  index: number;
  value: string;
  storageType: string;
}

const Slider = ({
  onChange,
  storageType,
  index,
  value: initialValue,
  ...props
}: SliderProps) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (_value: string) => {
    setValue(_value);
    onChange?.(storageType, index, `${_value}%`);
  };

  return (
    <SliderContainer>
      <SliderRail value={value} />
      <SliderTrack value={value} />
      <SInput
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={({ target: { value: changedValue } }) =>
          handleChange(changedValue)
        }
      />
    </SliderContainer>
  );
};

export default Slider;

const SliderContainer = styled.div`
  display: flex;
  position: relative;
  width: 150px;
  height: 20px;
  justify-content: center;
  align-items: center;
`;

const SliderRail = styled.div<{ value: string }>`
  position: absolute;
  ${({ value }) => `width: calc(100% - ${value}%);`}
  height: 8px;
  border-radius: 999px;
  background-color: ${Colors.Orange50};
  top: calc(50% - 4px);
  right: 0;
`;

const SliderTrack = styled.div<{ value: string }>`
  position: absolute;
  ${({ value }) => `width: ${value}%;`}
  height: 8px;
  border-radius: 999px;
  background-color: ${Colors.Orange200};
  top: calc(50% - 4px);
  left: 0;
`;

const SInput = styled.input`
  position: relative;
  width: 150px;
  height: 8px;
  border-radius: 4px;
  background-color: ${Colors.Orange50};
  appearance: none;
  outline: none;

  &::-webkit-slider-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${Colors.White};
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    appearance: none;
    top: -8px;
  }
`;
