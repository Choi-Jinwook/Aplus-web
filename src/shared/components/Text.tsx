import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FontWeight, ShadowType, TextProps } from "@shared/types";
import { HTMLAttributes, ReactNode } from "react";
import { Shadow } from "styles";

interface STextProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  type: TextProps;
  weight?: FontWeight;
  fontSize?: number;
  lineHeight?: number;
  shadow?: ShadowType;
}

const SText = ({
  type = "H1",
  weight = 400,
  fontSize,
  lineHeight,
  shadow,
  children,
  ...props
}: STextProps) => {
  return (
    <Text
      type={type}
      weight={weight}
      fontSize={fontSize}
      lineHeight={lineHeight}
      shadow={shadow}
      {...props}
    >
      {children}
    </Text>
  );
};

export default SText;

const Text = styled.p<STextProps>`
  ${({ type }) => types[type]}
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
`;

const types = {
  Display: css`
    font-wieght: 700;
    font-size: 48px;
    line-height: 60px;
    letter-spacing: -0.02em;
  `,
  H1: css`
    font-weight: 700;
    font-size: 48px;
    line-height: 60px;
    letter-spacing: -0.02em;
  `,
  H2: css`
    font-weight: 700;
    font-size: 36px;
    line-height: 45px;
    letter-spacing: -0.02em;
  `,
  H3: css`
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
    letter-spacing: -0.02em;
  `,
  H4: css`
    font-weight: 700;
    font-size: 21px;
    line-height: 31.5px;
    letter-spacing: -0.02em;
  `,
  BodyBold: css`
    font-size: 16px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: -0.01em;
  `,
  Body: css`
    font-size: 16px;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: -0.01em;
  `,
  LabelBold: css`
    font-size: 14px;
    font-weight: 700;
    line-height: 24.5px;
    letter-spacing: -0.01em;
  `,
  Label: css`
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: -0.01em;
  `,
  LabelLight: css`
    font-size: 16px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: -0.01em;
  `,
};
