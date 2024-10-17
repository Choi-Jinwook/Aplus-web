import styled from "@emotion/styled";
import { HTMLAttributes } from "react";
import { Colors } from "styles";
import { Text } from ".";

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  color?: string;
  backgroundColor?: string;
}

const Badge = ({
  color = Colors.White,
  backgroundColor = Colors.Gray400,
  ...props
}: BadgeProps) => {
  return (
    <Container backgroundColor={backgroundColor}>
      <Text type="LabelLight" color={color}>
        {props.children}
      </Text>
    </Container>
  );
};

export default Badge;

const Container = styled.div<BadgeProps>`
  display: flex;
  width: fit-content;
  border-radius: 8px;
  padding: 4px 10px;
  ${({ backgroundColor }) => `background-color: ${backgroundColor};`}
`;
