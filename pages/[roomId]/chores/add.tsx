import styled from "@emotion/styled";
import { usePostChores } from "@shared/apis";
import { deviceHeight, roomMembers } from "@shared/atoms";
import { Chip, ControlledInput, Icon, Text } from "@shared/components";
import { IconType } from "@shared/types";
import { getDay } from "@shared/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Colors, Shadow } from "styles";

const ChoresAdd = () => {
  const icons: IconType[] = [
    "ChoresHousit",
    "ChoresLaundry",
    "ChoresKitchen",
    "ChoresLivingroom",
    "ChoresOffice",
    "ChoresToilet",
    "ChoresTrash",
    "ChoresVacuum",
    "ChoresDish",
    "ChoresBathroom",
    "ChoresGarden",
    "ChoresEntrance",
  ];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const frequency = ["Daily", "Weekly", "Bi-weekly", "Monthly"];

  const {
    query: { roomId },
    push,
  } = useRouter();

  const [name, setName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");
  const [assignedDay, setAssignedDay] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [selectedFrequency, setSelectedFrequency] = useState("");
  const [response, setResponse] = useState(0);
  const [note, setNote] = useState("");
  const members = useRecoilValue(roomMembers);
  const height = useRecoilValue(deviceHeight);

  const { mutateAsync: postChores } = usePostChores();

  const handleChoreName = (value: string) => {
    setName(value);
  };

  const handleIcon = (value: string) => {
    setSelectedIcon(value);
  };

  const handleAssignedDay = (index: number) => {
    if (assignedDay.every((value) => value === true)) setSelectedFrequency("");

    setAssignedDay((prev) =>
      prev.map((_prev, _index) => (_index === index ? !_prev : _prev)),
    );
  };

  const handleSelectedFrequency = (value: string) => {
    setSelectedFrequency(value);
  };

  const handleResponse = (value: number) => {
    setResponse(value);
  };

  const handleNote = (value: string) => {
    setNote(value);
  };

  const checkValidate = () => {
    const vName = name !== "";
    const vIcon = selectedIcon !== "";
    const vAssignedDay = !assignedDay.every((value) => value === false);
    const vFrequency = selectedFrequency !== "";
    const vMember = response !== 0;

    return vName && vIcon && vAssignedDay && vFrequency && vMember;
  };

  const handleClickAdd = async () => {
    if (!checkValidate()) return;

    const choreDay = assignedDay
      .map((day, index) => {
        console.log(day);

        if (day) return getDay(index);
      })
      .filter((value) => value !== undefined)
      .join(",");

    try {
      await postChores({
        roomNumber: String(roomId),
        data: {
          choreArea: name,
          color: Colors.Orange200,
          description: note,
          icon: selectedIcon,
          enrolledDate: new Date().toISOString().split("T")[0],
          memberIds: [response],
          choreDay: choreDay,
          choreFrequency: 1,
        },
      });

      push(`/${roomId}/chores`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (assignedDay.every((value) => value === true))
      setSelectedFrequency("Daily");
  }, [assignedDay]);

  useEffect(() => {
    if (selectedFrequency === "Daily") {
      setAssignedDay((prev) => prev.map(() => true));
    }
  }, [selectedFrequency]);

  return (
    <Container height={height}>
      <ChoreNameContainer>
        <ChoreNameInput
          value={name}
          placeholder="Chore Name"
          onChange={({ target: { value } }) => handleChoreName(value)}
        />
      </ChoreNameContainer>

      <DetailContainer>
        <DetailWrapper>
          <DetailContent>
            <Part>
              <Text type="LabelLight" color={Colors.Gray600}>
                Icon
              </Text>
              <IconWrapper>
                {icons.map((icon) => (
                  <IconRound
                    key={icon}
                    isSelected={selectedIcon === icon}
                    onClick={() => handleIcon(icon)}
                  >
                    <Icon
                      icon={icon}
                      color={
                        selectedIcon === icon ? Colors.Orange200 : "#A2AEBA"
                      }
                    />
                  </IconRound>
                ))}
              </IconWrapper>
            </Part>

            <Part>
              <Text type="LabelLight" color={Colors.Gray600}>
                Assigned Day
              </Text>
              <DayContainer>
                {days.map((day, index) => (
                  <Day
                    key={day}
                    isSelected={assignedDay[index]}
                    onClick={() => handleAssignedDay(index)}
                  >
                    <Text
                      type="Label"
                      color={
                        assignedDay[index] ? Colors.Orange200 : Colors.Gray400
                      }
                    >
                      {day}
                    </Text>
                  </Day>
                ))}
              </DayContainer>
            </Part>

            <Part>
              <Text type="LabelLight" color={Colors.Gray600}>
                Frequency
              </Text>
              <FrequencyContainer>
                {frequency.map((_frequency) => (
                  <Frequency
                    key={_frequency}
                    isSelected={_frequency === selectedFrequency}
                    onClick={() => handleSelectedFrequency(_frequency)}
                  >
                    <Text
                      type="Label"
                      color={
                        _frequency === selectedFrequency
                          ? Colors.Orange200
                          : Colors.Gray400
                      }
                    >
                      {_frequency}
                    </Text>
                  </Frequency>
                ))}
              </FrequencyContainer>
            </Part>

            <Part>
              <Text type="LabelLight" color={Colors.Gray600}>
                Responsible
              </Text>
              <ResponsibleContainer>
                {members?.map((member) => (
                  <Chip
                    key={member.memberId}
                    color={
                      member.memberId === response
                        ? Colors.Orange200
                        : Colors.Gray400
                    }
                    backgroundColor={
                      member.memberId === response
                        ? Colors.Orange50
                        : Colors.Gray50
                    }
                    onClick={() => handleResponse(member.memberId)}
                  >
                    {member.memberName}
                  </Chip>
                ))}
              </ResponsibleContainer>
            </Part>

            <Part>
              <Text type="LabelLight" color={Colors.Gray600}>
                Notes
              </Text>
              <ControlledInput
                shaded
                showOutline
                inputType="text"
                size="Small"
                placeholder="Notes"
                value={note}
                onChange={handleNote}
              />
            </Part>
          </DetailContent>
        </DetailWrapper>
      </DetailContainer>

      <ButtonContainer onClick={handleClickAdd}>
        <AddButton isValid={checkValidate()}>
          <Text type="Label" color={Colors.White}>
            Add
          </Text>
        </AddButton>
      </ButtonContainer>
    </Container>
  );
};

export default ChoresAdd;

const Container = styled.main<{ height: number | null }>`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100vw;
  height: ${({ height }) => height && `${height - 108}px`};
  top: 48px;
  padding: 12px;
  gap: 8px;
  background-color: ${Colors.Gray50};
  overflow-y: auto;
`;

const ChoreNameContainer = styled.section`
  display: flex;
  height: 44px;
  border-radius: 16px;
  background-color: ${Colors.White};
  padding: 0px 16px;
  gap: 10px;
  align-items: center;
  ${Shadow.Small};
`;

const ChoreNameInput = styled.input`
  width: 100%;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
  letter-spacing: -0.16px;
  border: none;
  outline: none;
`;

const DetailContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-radius: 16px;
  background-color: ${Colors.White};
  padding: 10px 12px;
  row-gap: 14px;
  justify-content: space-between;
  ${Shadow.Small};
`;

const DetailContent = styled.div`
  display: flex;
  width: 312px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;

const Part = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 6px;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;

const IconRound = styled.div<{ isSelected: boolean }>`
  display: flex;
  width: 44px;
  height: 44px;
  border-radius: 20px;
  background-color: ${({ isSelected }) =>
    isSelected ? Colors.Orange50 : Colors.Gray50};
  padding: 5px;
  justify-content: center;
  align-items: center;
`;

const DayContainer = styled.div`
  display: flex;
  gap: 4px;
`;

const Day = styled.div<{ isSelected: boolean }>`
  display: flex;
  height: 36px;
  border-radius: 8px;
  background-color: ${({ isSelected }) =>
    isSelected ? Colors.Orange50 : Colors.Gray50};
  padding: 8px;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const FrequencyContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Frequency = styled.div<{ isSelected: boolean }>`
  display: flex;
  height: 36px;
  border-radius: 8px;
  background-color: ${({ isSelected }) =>
    isSelected ? Colors.Orange50 : Colors.Gray50};
  padding: 8px;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const ResponsibleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  align-content: center;
`;

const ButtonContainer = styled.div`
  position: fixed;
  top: 9px;
  right: 12px;
  z-index: 9999;
`;

const AddButton = styled.button<{ isValid: boolean }>`
  display: flex;
  border: none;
  border-radius: 6px;
  background-color: ${({ isValid }) =>
    isValid ? Colors.Blue300 : Colors.Gray400};
  padding: 4px 10px;
  justify-content: center;
  align-items: center;
`;
