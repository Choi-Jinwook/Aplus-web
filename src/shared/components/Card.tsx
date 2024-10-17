import styled from "@emotion/styled";
import { HTMLAttributes } from "react";
import { Text } from ".";
import { Colors } from "styles";
import { IconType } from "@shared/types";
import Icon from "./Icon";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  icon: IconType;
  title: string;
  date: string;
}

const Card = ({ icon, title, date, ...props }: CardProps) => {
  return (
    <Container {...props}>
      <Icon icon={icon} />
      <TitleContainer>
        <Text type="LabelBold" color="#3D3E3F">
          {title}
        </Text>
        <Text type="LabelLight" color={Colors.Gray400}>
          {date}
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
`;

const TitleContainer = styled.div``;
