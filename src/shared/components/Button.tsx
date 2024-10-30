import styled from "@emotion/styled";
import { ShadowType, TextProps } from "@shared/types";
import { HTMLAttributes } from "react";
import { Colors, Shadow } from "styles";
import { Text } from ".";

interface TextStyleProps {
  textColor?: string;
  textType?: TextProps;
}

interface ButtonProps
  extends HTMLAttributes<HTMLButtonElement>,
    TextStyleProps {
  shadow?: ShadowType;
  buttonColor: string;
}

const Button = ({
  shadow,
  buttonColor,
  textColor = Colors.White,
  textType = "Label",
  children,
  ...props
}: ButtonProps) => {
  return (
    <SButton shadow={shadow} buttonColor={buttonColor} {...props}>
      <Text type={textType} color={textColor}>
        {children}
      </Text>
    </SButton>
  );
};

export default Button;

const SButton = styled.button<ButtonProps>`
  padding: 4px 10px;
  border: none;
  border-radius: 6px;
  ${({ shadow }) => {
    switch (shadow) {
      case "Large":
        return Shadow.Large;
      case "Medium":
        return Shadow.Medium;
      case "Small":
        return Shadow.Small;
    }
  }}
  ${({ buttonColor }) => `background-color: ${buttonColor};`}
`;
