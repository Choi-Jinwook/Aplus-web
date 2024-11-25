import styled from "@emotion/styled";
import { usePostEvents } from "@shared/apis/Events";
import { deviceHeight, roomMembers } from "@shared/atoms";
import { Chip, ControlledInput, Text } from "@shared/components";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { Colors, Shadow } from "styles";

interface Member {
  id: number;
  name: string;
}

const EventsAdd = () => {
  const today = new Date();

  const {
    query: { roomId },
    push,
  } = useRouter();

  const [name, setName] = useState("");
  const [participants, setParticipants] = useState<Member[]>();
  const [date, setDate] = useState(today.toISOString().split("T")[0]);
  const [isAM, setIsAM] = useState(true);
  const [hhmm, setHHMM] = useState({ hour: 0, minute: 0 });
  const [note, setNote] = useState("");
  const height = useRecoilValue(deviceHeight);
  const members = useRecoilValue(roomMembers);

  const { mutateAsync: postEvents, isPending, isSuccess } = usePostEvents();

  const checkValidate = () => {
    const vName = name !== "";
    const vParticipants =
      participants?.length !== 0 || participants !== undefined;
    const vDate = date !== "";
    const vHHMM = hhmm.hour !== 0 && hhmm.minute !== 0;
    const vNote = note !== "";

    return vName && vParticipants && vDate && vHHMM && vNote;
  };

  const handleChoreName = (value: string) => {
    setName(value);
  };

  const handleParticipants = (id: number, name: string) => {
    setParticipants((prev) => {
      if (name === "All") {
        const isAllSelected = prev?.length === members?.length;

        return isAllSelected
          ? []
          : members?.map(({ memberId, memberName }) => ({
              id: memberId,
              name: memberName,
            }));
      }

      const isMemberSelected = prev?.some((member) => member.id === id);

      return isMemberSelected
        ? prev?.filter((member) => member.id !== id)
        : [...(prev || []), { id, name }];
    });
  };

  const handleDate = (value: string) => {
    setDate(value);
  };

  const handleIsAm = () => {
    setIsAM((prev) => !prev);
  };

  const handleHHMM = (type: boolean, value: number) => {
    if (String(value).length > 2) return;

    setHHMM((prev) =>
      type ? { ...prev, hour: value } : { ...prev, minute: value },
    );
  };

  const handleNote = (value: string) => {
    setNote(value);
  };

  const handleClickAdd = async () => {
    if (isPending || isSuccess) return;

    if (participants) {
      const memberIds = participants.map(({ id }) => id);

      try {
        await postEvents({
          roomNumber: String(roomId),
          data: {
            memberIds: memberIds,
            eventDay: date,
            eventName: name,
            eventTime: `${hhmm.hour}:${hhmm.minute}`,
          },
        });

        push(`/${roomId}/events`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Container height={height}>
      <ChoreNameContainer>
        <ChoreNameInput
          value={name}
          placeholder="Event Name"
          onChange={({ target: { value } }) => handleChoreName(value)}
        />
      </ChoreNameContainer>

      <DetailContainer>
        <DetailWrapper>
          <DetailContent>
            <Part>
              <Text type="LabelLight" color={Colors.Gray600}>
                Participants
              </Text>

              <ResponsibleContainer>
                <Chip
                  color={
                    participants?.length === members?.length
                      ? Colors.Orange200
                      : Colors.Gray400
                  }
                  backgroundColor={
                    participants?.length === members?.length
                      ? Colors.Orange50
                      : Colors.Gray50
                  }
                  onClick={() => handleParticipants(-1, "All")}
                >
                  All
                </Chip>
                {members?.map(({ memberId, memberName }) => (
                  <Chip
                    key={memberId}
                    color={
                      participants?.some((member) => member.id === memberId)
                        ? Colors.Orange200
                        : Colors.Gray400
                    }
                    backgroundColor={
                      participants?.some((member) => member.id === memberId)
                        ? Colors.Orange50
                        : Colors.Gray50
                    }
                    onClick={() => handleParticipants(memberId, memberName)}
                  >
                    {memberName}
                  </Chip>
                ))}
              </ResponsibleContainer>
            </Part>

            <SSibalPart>
              <Part>
                <Text type="LabelLight" color={Colors.Gray600}>
                  Date
                </Text>
                <FuckingInputContainer>
                  <FuckingInput
                    type="date"
                    value={date}
                    onChange={({ target: { value } }) => handleDate(value)}
                    placeholder="yyyy-dd-mm"
                  />
                </FuckingInputContainer>
              </Part>
              <Part>
                <Text type="LabelLight" color={Colors.Gray600}>
                  Time
                </Text>
                <WhyAllContents>
                  <TT onClick={handleIsAm}>
                    <Text type="Label">{isAM ? "AM" : "PM"}</Text>
                  </TT>
                  <ReallyAngry>
                    <LateDesignButLowCompleteness
                      inputMode="numeric"
                      value={hhmm.hour}
                      type="text"
                      placeholder="00"
                      onChange={({ target: { value } }) =>
                        handleHHMM(true, Number(value))
                      }
                    />
                  </ReallyAngry>
                  <ReallyAngry>
                    <LateDesignButLowCompleteness
                      inputMode="numeric"
                      value={hhmm.minute}
                      type="text"
                      placeholder="00"
                      onChange={({ target: { value } }) =>
                        handleHHMM(false, Number(value))
                      }
                    />
                  </ReallyAngry>
                </WhyAllContents>
              </Part>
            </SSibalPart>

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

export default EventsAdd;

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

  &::-webkit-scrollbar {
    display: none;
  }
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
  width: 100%;
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
  width: 100%;
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

const ResponsibleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  align-content: center;
`;

const SSibalPart = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
  align-items: center;
`;

const FuckingInputContainer = styled.div`
  display: flex;
  width: 100%;
  height: 36px;
  border-radius: 8px;
  background-color: ${Colors.Gray50};
  padding: 8px;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const FuckingInput = styled.input`
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.14px;
  border: none;
  outline: none;
  background-color: ${Colors.Gray50};
`;

const WhyAllContents = styled.div`
  display: flex;
  height: 36px;
  justify-content: space-between;
  align-items: center;
`;

const TT = styled.div`
  display: flex;
  width: 40px;
  height: 36px;
  border-radius: 8px;
  background-color: ${Colors.Orange50};
  padding: 8px;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const ReallyAngry = styled.div`
  display: flex;
  height: 36px;
  border-radius: 8px;
  background-color: ${Colors.Gray50};
  padding: 8px;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const LateDesignButLowCompleteness = styled.input`
  width: 32px;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.14px;
  border: none;
  outline: none;
  background-color: ${Colors.Gray50};
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
