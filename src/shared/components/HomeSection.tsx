import styled from "@emotion/styled";
import { HTMLAttributes } from "react";
import { Colors, Shadow } from "styles";

interface HomeSectionProps extends HTMLAttributes<HTMLDivElement> {
  paddingSize?: string;
}

const HomeSection = ({
  paddingSize = "Normal",
  children,
  ...props
}: HomeSectionProps) => {
  return (
    <ContentPadding>
      <Container paddingSize={paddingSize} {...props}>
        {children}
      </Container>
    </ContentPadding>
  );
};

export default HomeSection;

const ContentPadding = styled.div`
  padding: 0 12px;
`;

const Container = styled.section<HomeSectionProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  border: 1px solid ${Colors.Gray100};
  border-radius: 16px;
  background-color: ${Colors.White};
  ${Shadow.Small};
  ${({ paddingSize }) => {
    switch (paddingSize) {
      case "Normal":
        return `padding: 20px 16px;
                gap: 8px;
        `;
      case "SemiLight":
        return `padding: 12px 16px 16px 16px;
                gap: 16px;
        `;
      case "Light":
        return `padding: 8px 16px 16px 16px;
                gap: 9px;
        `;
    }
  }}

  & > div > div:not(:first-of-type) {
    border-top: 1px solid ${Colors.Gray100};
  }
`;
