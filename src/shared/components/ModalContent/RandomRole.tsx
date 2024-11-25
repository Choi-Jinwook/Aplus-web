import styled from "@emotion/styled";
import { deviceHeight, roomMembers } from "@shared/atoms";
import { ChoresBody, FinanceInfoBody, IconType } from "@shared/types";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { Colors, Shadow } from "styles";
import { Chip, Icon, Text } from "..";
import { useState } from "react";
import { usePostChores } from "@shared/apis";
import { useRouter } from "next/router";

interface RandomRoleProps {
  handleRoleModal: () => void;
  infoRefetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<ChoresBody[], Error>>;
}

interface CleaningArea {
  icon: IconType;
  name: string;
}

interface Member {
  name: string;
  id: number;
}

interface Zone {
  zone: string;
  icon: IconType;
}

interface Assignment {
  member: Member;
  zones: Zone[];
}

const RandomRole = ({ handleRoleModal, infoRefetch }: RandomRoleProps) => {
  const cleaningArea: CleaningArea[] = [
    { icon: "ChoresToilet", name: "Toilet" },
    { icon: "ChoresDish", name: "Dishes" },
    { icon: "ChoresLivingroom", name: "Living Room" },
    { icon: "ChoresLaundry", name: "Laundry" },
    { icon: "ChoresVacuum", name: "Vacuum" },
  ];

  const {
    query: { roomId },
    push,
  } = useRouter();

  const [step, setStep] = useState(1);
  const [selectedArea, setSelectedArea] = useState<Zone[]>([]);
  const [selectedMember, setSelectedMember] = useState<Member[]>();
  const [assigned, setAssigned] = useState<Assignment[]>([]);
  const height = useRecoilValue(deviceHeight);
  const members = useRecoilValue(roomMembers);

  const { mutateAsync: postChores, isPending, isSuccess } = usePostChores();

  const assignRandomRole = (areas: Zone[], member?: Member[]): Assignment[] => {
    if (member) {
      const shuffledZones = [...areas].sort(() => Math.random() - 0.5);

      const assignments: Assignment[] = member.map((_member) => ({
        member: _member,
        zones: [],
      }));

      shuffledZones.forEach((zone, index) => {
        const memberIndex = index % member.length;
        assignments[memberIndex].zones.push(zone);
      });

      return assignments;
    }

    return [];
  };

  const handleStep = (direction: boolean) => {
    setStep(direction ? 2 : 1);
  };

  const handleClickArea = (value: string, icon: IconType) => {
    setSelectedArea((prev) => {
      const isAreaSelected = prev?.some((area) => area.zone === value);
      return isAreaSelected
        ? prev?.filter((area) => area.zone !== value)
        : [...(prev || []), { icon: icon, zone: value }];
    });
  };

  const handleClickMember = (id: number, name: string) => {
    setSelectedMember((prev) => {
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

  const handleClickCancel = () => {
    setSelectedArea([]);
    setSelectedMember([]);
    handleRoleModal();
  };

  const handleClickAdd = () => {
    setAssigned(assignRandomRole(selectedArea, selectedMember));
    handleStep(true);
  };

  const handleClickRedo = () => {
    handleStep(false);
  };

  const handleClickAssign = async () => {
    if (isSuccess || isPending) return;

    try {
      const requests = assigned.flatMap(({ member, zones }) => {
        zones.map(({ icon, zone }) => {
          const data = {
            roomNumber: String(roomId),
            data: {
              choreArea: zone,
              color: Colors.Orange200,
              description: "",
              icon: icon,
              enrolledDate: new Date().toISOString().split("T")[0],
              memberIds: [member.id],
              choreDay: "MONDAY",
              choreFrequency: 1,
            },
          };

          return postChores(data);
        });
      });

      await Promise.all(requests);

      handleClickCancel();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Dimmer height={height} onClick={handleRoleModal} />
      <RandomRoleModalContainer>
        {step === 1 ? (
          <>
            <RandomRoleModalTitle>
              <Text type="H4">Random Roles</Text>
            </RandomRoleModalTitle>

            <RandomRoleModalContent>
              <NickName>
                <Text type="LabelLight" color={Colors.Gray600}>
                  Cleaning Area
                </Text>
                <CleaningAreaContainer>
                  {cleaningArea.map(({ icon, name }) => {
                    const isSelected = selectedArea?.some(
                      (area) => area.zone === name && area.icon === icon,
                    );

                    return (
                      <CleaningAreaWrapper
                        key={icon}
                        isSelected={isSelected}
                        onClick={() => handleClickArea(name, icon)}
                      >
                        <Icon
                          icon={icon}
                          color={isSelected ? Colors.Orange200 : Colors.Gray400}
                        />
                        <Text
                          type="Body"
                          color={isSelected ? Colors.Orange200 : Colors.Gray400}
                        >
                          {name}
                        </Text>
                      </CleaningAreaWrapper>
                    );
                  })}
                </CleaningAreaContainer>
              </NickName>

              <NickName>
                <Text type="LabelLight" color={Colors.Gray600}>
                  Responsible
                </Text>
                <CleaningAreaContainer>
                  <Chip
                    color={
                      selectedMember?.length === members?.length
                        ? Colors.Orange200
                        : Colors.Gray400
                    }
                    backgroundColor={
                      selectedMember?.length === members?.length
                        ? Colors.Orange50
                        : Colors.Gray50
                    }
                    onClick={() => handleClickMember(-1, "All")}
                  >
                    All
                  </Chip>
                  {members?.map(({ memberId, memberName }) => (
                    <Chip
                      key={memberId}
                      color={
                        selectedMember?.some((member) => member.id === memberId)
                          ? Colors.Orange200
                          : Colors.Gray400
                      }
                      backgroundColor={
                        selectedMember?.some((member) => member.id === memberId)
                          ? Colors.Orange50
                          : Colors.Gray50
                      }
                      onClick={() => handleClickMember(memberId, memberName)}
                    >
                      {memberName}
                    </Chip>
                  ))}
                </CleaningAreaContainer>
              </NickName>

              <ButtonContainer>
                <AddAccountButton onClick={handleClickCancel}>
                  <Text type="LabelBold" color={Colors.Orange300}>
                    Cancel
                  </Text>
                </AddAccountButton>
                <AddAccountButton onClick={handleClickAdd}>
                  <Text
                    type="LabelBold"
                    color={
                      selectedArea?.length !== 0 && selectedMember?.length !== 0
                        ? Colors.Orange300
                        : Colors.Gray400
                    }
                  >
                    Assign
                  </Text>
                </AddAccountButton>
              </ButtonContainer>
            </RandomRoleModalContent>
          </>
        ) : (
          <>
            <RandomRoleModalTitle>
              <Text type="H4">Assgin the result?</Text>
              <IconContainer onClick={handleClickRedo}>
                <Icon icon="Redo" />
              </IconContainer>
            </RandomRoleModalTitle>

            <AssignedContainer>
              <AssignedWrapper>
                {assigned.map(({ zones, member }) => (
                  <ContentContainer key={member.id}>
                    <ContentWrapper>
                      <InnerContent>
                        <MemberContainer>
                          <Text type="Label" color={Colors.Gray600}>
                            {member.name}
                          </Text>
                        </MemberContainer>
                        <AreaContainer>
                          {zones.map(({ icon, zone }) => (
                            <Chip key={icon}>{zone}</Chip>
                          ))}
                        </AreaContainer>
                      </InnerContent>
                    </ContentWrapper>
                  </ContentContainer>
                ))}
              </AssignedWrapper>
            </AssignedContainer>

            <ButtonContainer>
              <AddAccountButton onClick={handleClickCancel}>
                <Text type="LabelBold" color={Colors.Orange300}>
                  Cancel
                </Text>
              </AddAccountButton>
              <AddAccountButton onClick={handleClickAdd}>
                <Text
                  type="LabelBold"
                  color={Colors.Orange300}
                  onClick={handleClickAssign}
                >
                  Assign
                </Text>
              </AddAccountButton>
            </ButtonContainer>
          </>
        )}
      </RandomRoleModalContainer>
    </>
  );
};

export default RandomRole;

const Dimmer = styled.div<{ height: number | null }>`
  position: fixed;
  width: 100%;
  height: ${({ height }) => height && `${height}px`};
  top: 0;
  background-color: ${Colors.Dimmer200};
  z-index: 99999;
`;

const RandomRoleModalContainer = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  width: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 28px;
  background-color: ${Colors.White};
  justify-content: center;
  overflow-y: scroll;
  z-index: 999999;
`;

const RandomRoleModalTitle = styled.div`
  display: flex;
  padding: 24px;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
`;

const RandomRoleModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 24px;
  gap: 12px;
`;

const NickName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const CleaningAreaContainer = styled.div`
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  gap: 4px;
  align-self: stretch;
  flex-wrap: wrap;
`;

const CleaningAreaWrapper = styled.div<{ isSelected?: boolean }>`
  display: flex;
  border-radius: 8px;
  background-color: ${Colors.Gray50};
  padding: 2px 12px 2px 6px;
  gap: 8px;
  align-items: center;
  ${Shadow.Small};
`;

const ButtonContainer = styled.div`
  display: flex;
  padding: 24px;
  gap: 8px;
  justify-content: flex-end;
  align-items: center;
`;

const AddAccountButton = styled.div`
  display: flex;
  height: 40px;
  padding: 10px 12px;
  justify-content: center;
  align-items: center;
`;

const AssignedContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 24px;
  gap: 12px;
`;

const AssignedWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  display: flex;
  padding: 4px 0px;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  padding: 0px 8px;
  gap: 8px;
  align-items: center;
  flex: 1 0 0;
`;

const InnerContent = styled.div`
  display: flex;
  padding: 11px 0px;
  gap: 10px;
  flex: 1 0 0;
`;

const MemberContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1 0 0;
`;

const AreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;
