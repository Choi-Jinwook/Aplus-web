import styled from "@emotion/styled";
import { HTMLAttributes, ReactNode } from "react";
import { Colors, Shadow } from "styles";

interface HomeSectionProps extends HTMLAttributes<HTMLDivElement> {}

const HomeSection = ({ children, ...props }: HomeSectionProps) => {
  return <Container {...props}>{children}</Container>;
};

export default HomeSection;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  border: 1px solid ${Colors.Gray100};
  border-radius: 16px;
  padding: 20px 16px;
  gap: 8px;
  ${Shadow.Small};

  & > div > div:not(:first-of-type) {
    border-top: 1px solid ${Colors.Gray100};
  }
`;
