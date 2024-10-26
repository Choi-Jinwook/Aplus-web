import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FontWeight, TextProps } from "@shared/types";
import { HTMLAttributes, ReactNode } from "react";

interface STextProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  type: TextProps;
  weight?: FontWeight;
  color?: string;
  fontSize?: number;
  lineHeight?: number;
}

const SText = ({
  type = "H1",
  weight,
  color = "#161618",
  fontSize,
  lineHeight,
  children,
  ...props
}: STextProps) => {
  return (
    <Text
      type={type}
      weight={weight}
      color={color}
      fontSize={fontSize}
      lineHeight={lineHeight}
      {...props}
    >
      {children}
    </Text>
  );
};

export default SText;

const Text = styled.p<STextProps>`
  ${({ type }) => types[type]}
  ${({ weight }) => weight && `font-weight: ${weight};`}
  ${({ color }) => color && `color: ${color};`}
  ${({ fontSize }) => fontSize && `font-size: ${fontSize};`}
  ${({ lineHeight }) => lineHeight && `line-height: ${lineHeight};`}
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
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
  `,
  Navigation: css`
    font-size: 10px;
    font-weight: 600;
    line-height: 12px;
  `,
};
