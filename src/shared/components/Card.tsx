import styled from "@emotion/styled";
import { HTMLAttributes } from "react";
import { Text, Icon } from ".";
import { Colors } from "styles";
import { IconType } from "@shared/types";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  icon: IconType;
  iconColor: string;
  title: string;
  person: string;
}

const Card = ({ icon, iconColor, title, person, ...props }: CardProps) => {
  return (
    <Container {...props}>
      <Icon icon={icon} color={iconColor} />
      <TitleContainer>
        <Text type="LabelBold" color="#3D3E3F">
          {title}
        </Text>
        <Text type="LabelLight" color={Colors.Blue300}>
          {person}
        </Text>
      </TitleContainer>
    </Container>
  );
};

export default Card;

const Container = styled.article`
  display: flex;
  flex-direction: column;
  min-width: 140px;
  border: 1px solid ${Colors.Gray100};
  border-radius: 16px;
  background-color: ${Colors.Gray50};
  padding: 20px 12px;
  gap: 4px;

  &:hover {
    background-color: ${Colors.Blue50};
  }
`;

const TitleContainer = styled.div``;
