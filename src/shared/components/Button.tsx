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
  buttonSize?: string;
}

const Button = ({
  shadow,
  buttonColor,
  buttonSize = "Small",
  textColor = Colors.White,
  textType = "Label",
  children,
  ...props
}: ButtonProps) => {
  return (
    <SButton
      shadow={shadow}
      buttonColor={buttonColor}
      buttonSize={buttonSize}
      {...props}
    >
      <Text type={textType} color={textColor}>
        {children}
      </Text>
    </SButton>
  );
};

export default Button;

const SButton = styled.button<ButtonProps>`
  width: 100%;
  height: 52px;
  border: none;
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
  ${({ buttonSize }) => {
    switch (buttonSize) {
      case "Small":
        return `
        padding: 4px 10px;
        border-radius: 6px;
      `;
      case "Normal":
        return `
        padding: 8px 39px;
        border-radius: 8px;
      `;
    }
  }}
`;
