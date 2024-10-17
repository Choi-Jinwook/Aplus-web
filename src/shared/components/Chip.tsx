import styled from "@emotion/styled";
import { HTMLAttributes } from "react";
import { Colors } from "styles";
import { Text } from ".";
import { TextProps } from "@shared/types";

interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  color?: string;
  backgroundColor?: string;
  textType?: TextProps;
}

const Chip = ({
  color = Colors.Orange200,
  backgroundColor = Colors.Orange50,
  textType = "Label",
  ...props
}: ChipProps) => {
  return (
    <Container backgroundColor={backgroundColor}>
      <Text type={textType} color={color}>
        {props.children}
      </Text>
    </Container>
  );
};

export default Chip;

const Container = styled.div<ChipProps>`
  display: flex;
  height: fit-content;
  border-radius: 8px;
  ${({ backgroundColor }) => `background-color: ${backgroundColor};`}
  padding: 8px 10px;
  align-items: center;
`;
