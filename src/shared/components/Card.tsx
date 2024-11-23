import styled from "@emotion/styled";
import { HTMLAttributes } from "react";
import { Text, Icon, Badge } from ".";
import { Colors, Shadow } from "styles";
import { IconType } from "@shared/types";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  icon: IconType;
  iconColor: string;
  title: string;
  person: string;
}

export const Card = ({
  icon,
  iconColor,
  title,
  person,
  ...props
}: CardProps) => {
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

interface FoodCardProps extends HTMLAttributes<HTMLDivElement> {
  owner: string[];
  name: string;
  expire: string;
  amount: number | null;
  quantity: number | null;
}

export const FoodCard = ({
  owner,
  name,
  expire,
  amount,
  quantity,
  ...props
}: FoodCardProps) => {
  const formattingAmount = () => {
    if (amount) {
      return { type: "percent", value: amount };
    }

    return { type: "number", value: quantity };
  };

  return (
    <FoodCardContainer {...props}>
      <BadgeWrapper>
        {owner.map((person) => (
          <Badge
            key={person}
            color={owner[0] === "All" ? Colors.White : Colors.Orange200}
            backgroundColor={
              owner[0] === "All" ? Colors.Orange200 : Colors.Orange50
            }
          >
            {person}
          </Badge>
        ))}
      </BadgeWrapper>
      <TextContainer>
        <Text type="BodyBold">{name}</Text>
        <Text
          type="LabelLight"
          color={expire === "Today" ? Colors.Orange300 : Colors.Gray400}
        >
          {expire}
        </Text>
      </TextContainer>
      {formattingAmount().type === "percent" ? (
        <PercentBar>
          <RemainPercentBar amount={formattingAmount().value} />
        </PercentBar>
      ) : (
        <Text type="Label" color={Colors.Gray500}>{`${
          amount || quantity
        } remains`}</Text>
      )}
    </FoodCardContainer>
  );
};

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

const FoodCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 140px;
  max-width: fit-content;
  border-radius: 16px;
  background-color: ${Colors.White};
  gap: 16px;
  padding: 12px;
  ${Shadow.Small};
`;

const BadgeWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const TextContainer = styled.div``;

const PercentBar = styled.div`
  width: 116px;
  height: 24px;
  border-radius: 6px;
  background-color: ${Colors.Gray50};
`;

const RemainPercentBar = styled.div<{ amount: string | number | null }>`
  width: ${({ amount }) => `${(116 * Number(amount)) / 100}px`};
  height: 24px;
  border-radius: 6px 0 0 6px;
  background-color: ${Colors.Gray300};
`;
