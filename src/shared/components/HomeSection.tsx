import styled from "@emotion/styled";
import { HTMLAttributes, ReactNode } from "react";
import { Colors, Shadow } from "styles";

interface HomeSectionProps extends HTMLAttributes<HTMLDivElement> {}

const HomeSection = ({ children, ...props }: HomeSectionProps) => {
  return (
    <ContentPadding>
      <Container {...props}>{children}</Container>
    </ContentPadding>
  );
};

export default HomeSection;

const ContentPadding = styled.div`
  padding: 0 12px;
`;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  border: 1px solid ${Colors.Gray100};
  border-radius: 16px;
  padding: 20px 16px;
  gap: 8px;
  background-color: ${Colors.White};
  ${Shadow.Small};

  & > div > div:not(:first-of-type) {
    border-top: 1px solid ${Colors.Gray100};
  }
`;
