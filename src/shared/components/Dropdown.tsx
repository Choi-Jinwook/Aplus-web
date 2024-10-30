import styled from "@emotion/styled";
import { Colors } from "styles";
import { Icon, Text } from ".";
import { useState } from "react";

interface DropdownProps {
  value: string;
  list: string[];
  onChange: (selectedOption: string) => void;
}

const Dropdown = ({ value, list, onChange }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOption = (selectedOption: string) => {
    onChange(selectedOption);
    setIsOpen(false);
  };

  return (
    <Container>
      <DropdownContainer onClick={handleOpen} tabIndex={0}>
        <Current>
          <Text type="Body">{value}</Text>
          <Icon
            icon={isOpen ? "Chevron_Up" : "Chevron_Down"}
            color={Colors.Gray400}
          />
        </Current>
      </DropdownContainer>
      {isOpen && (
        <DropdownList>
          {list.map((_list) => {
            return (
              <DropdownOption key={_list} onClick={() => handleOption(_list)}>
                <Text type="Body" color={Colors.Gray400}>
                  {_list}
                </Text>
                {value === _list && (
                  <Icon icon="Check_Button" color={Colors.Gray400} />
                )}
              </DropdownOption>
            );
          })}
        </DropdownList>
      )}
    </Container>
  );
};

export default Dropdown;

const Container = styled.div`
  display: flex;
  position: relative;
  width: 140px;
  height: 44px;
  border-radius: 8px;
  background-color: ${Colors.Gray50};
`;

const DropdownContainer = styled.div`
  width: 100%;

  &:focus-within {
    outline-color: 2px solid ${Colors.Orange100};
    outline-offset: 2px;
  }
`;

const Current = styled.div`
  display: flex;
  width: 100%;
  padding: 8px 16px;
  justify-content: space-between;
  align-items: center;
`;

const DropdownList = styled.li`
  position: absolute;
  top: 52px;
  width: 100%;
  border: 1px solid ${Colors.Gray100};
  border-radius: 8px;
  background-color: ${Colors.White};
  padding: 4px 0;
  z-index: 9999;
  list-style: none;
`;

const DropdownOption = styled.ul`
  display: flex;
  padding: 8px 8px 8px 14px;
  margin: 0;
  justify-content: space-between;
  align-items: center;
  list-style: none;

  &:hover {
    background-color: ${Colors.Gray50};
  }
`;
