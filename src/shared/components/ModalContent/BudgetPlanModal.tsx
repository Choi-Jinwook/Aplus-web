import styled from "@emotion/styled";
import { deviceHeight, roomMembers } from "@shared/atoms";
import { useRecoilValue } from "recoil";
import { Colors } from "styles";
import { Chip, ControlledInput, Text } from "..";
import { useState } from "react";
import { usePostBudgetPlan } from "@shared/apis";
import { useRouter } from "next/router";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { FinanceInfoBody } from "@shared/types";

interface BudgetPlanModalProps {
  handleBudgetPlanModal: () => void;
  infoRefetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<FinanceInfoBody, Error>>;
}

type BudgetPlanType = "Income" | "Expense" | "Saving Goal";

const BudgetPlanModal = ({
  handleBudgetPlanModal,
  infoRefetch,
}: BudgetPlanModalProps) => {
  const today = new Date();
  const {
    query: { roomId },
  } = useRouter();

  const [planType, setPlanType] = useState<BudgetPlanType>("Income");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState(today.toISOString().split("T")[0]);
  const [selectedMember, setSelectedMember] = useState("");
  const height = useRecoilValue(deviceHeight);
  const member = useRecoilValue(roomMembers);

  const {
    mutateAsync: postBudgetPlan,
    isPending,
    isSuccess,
  } = usePostBudgetPlan();

  const handleClickPlanType = (type: BudgetPlanType) => {
    setPlanType(type);
  };

  const handleChangeDescription = (value: string) => {
    setDescription(value);
  };

  const handleChangeAmount = (value: string) => {
    setAmount(value);
  };

  const handleChangeDueDate = (value: string) => {
    setDueDate(value);
  };

  const handleClickContributor = (value: string) => {
    setSelectedMember((prev) => (prev === value ? "" : value));
  };

  const handleClickCancel = () => {
    setDescription("");
    setAmount("");
    handleBudgetPlanModal();
  };

  const handleClickAdd = async () => {
    if (isPending || isSuccess) return;

    if (description !== "" && amount !== "" && dueDate !== "") {
      const formattedPlanType =
        planType !== "Saving Goal" ? `predicted${planType}` : "savingGoal";
      try {
        // TODO: Add contributor
        await postBudgetPlan({
          roomNumber: String(roomId),
          planType: formattedPlanType,
          data: {
            amount: Number(amount),
            description: description,
            dueDate: dueDate,
            isChecked: false,
            enrolledDate: today.toISOString().split("T")[0],
          },
        });

        infoRefetch();
        handleClickCancel();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Dimmer height={height} onClick={handleClickCancel} />
      <AccountModalContainer>
        <AccountModalTitle>
          <Text type="H4">New Budget Plan</Text>
        </AccountModalTitle>
        <AccountModalContent>
          <SegmentedPicker>
            <MethodContainer
              isSelected={planType === "Income"}
              onClick={() => handleClickPlanType("Income")}
            >
              <Text
                type="Label"
                color={planType === "Income" ? Colors.Black : Colors.Gray400}
              >
                Income
              </Text>
            </MethodContainer>
            <MethodContainer
              isSelected={planType === "Expense"}
              onClick={() => handleClickPlanType("Expense")}
            >
              <Text
                type="Label"
                color={planType === "Expense" ? Colors.Black : Colors.Gray400}
              >
                Expense
              </Text>
            </MethodContainer>
            <MethodContainer
              isSelected={planType === "Saving Goal"}
              onClick={() => handleClickPlanType("Saving Goal")}
            >
              <Text
                type="Label"
                color={
                  planType === "Saving Goal" ? Colors.Black : Colors.Gray400
                }
              >
                Saving
              </Text>
            </MethodContainer>
          </SegmentedPicker>

          <NickName>
            <Text type="LabelLight" color={Colors.Gray600}>
              Description
            </Text>
            <ControlledInput
              shaded
              size="Small"
              inputType="text"
              placeholder="Description"
              onChange={handleChangeDescription}
            />
          </NickName>

          <AmountDueDate>
            <NickName>
              <Text type="LabelLight" color={Colors.Gray600}>
                Amount
              </Text>
              <ControlledInput
                shaded
                size="Small"
                inputType="text"
                inputMode="numeric"
                placeholder="0"
                onChange={handleChangeAmount}
              />
            </NickName>
            <NickName>
              <Text type="LabelLight" color={Colors.Gray600}>
                Due Date
              </Text>
              <DueDateInputContainer>
                <DueDateInput
                  placeholder="yyyy-mm-dd"
                  type="date"
                  value={dueDate}
                  onChange={({ target: { value } }) =>
                    handleChangeDueDate(value)
                  }
                />
              </DueDateInputContainer>
            </NickName>
          </AmountDueDate>

          {planType === "Income" && (
            <NickName>
              <Text type="LabelLight" color={Colors.Gray600}>
                Contributor
              </Text>
              <ContributorContainer>
                {member?.map(({ memberId, memberName }) => (
                  <Chip
                    key={memberId}
                    onClick={() => handleClickContributor(memberName)}
                    color={
                      selectedMember === memberName
                        ? Colors.Orange200
                        : Colors.Gray400
                    }
                    backgroundColor={
                      selectedMember === memberName
                        ? Colors.Orange50
                        : Colors.Gray50
                    }
                  >
                    {memberName}
                  </Chip>
                ))}
              </ContributorContainer>
            </NickName>
          )}

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
                  description !== "" && amount !== "" && dueDate !== ""
                    ? Colors.Orange300
                    : Colors.Gray400
                }
              >
                Add
              </Text>
            </AddAccountButton>
          </ButtonContainer>
        </AccountModalContent>
      </AccountModalContainer>
    </>
  );
};

export default BudgetPlanModal;

const Dimmer = styled.div<{ height: number | null }>`
  position: fixed;
  width: 100%;
  height: ${({ height }) => height && `${height}px`};
  top: 0;
  background-color: ${Colors.Dimmer200};
  z-index: 99999;
`;

const AccountModalContainer = styled.div`
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

const AccountModalTitle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 16px;
`;

const AccountModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 24px;
  gap: 12px;
`;

const SegmentedPicker = styled.div`
  display: flex;
  border-radius: 8px;
  background-color: ${Colors.Gray50};
  height: 36px;
  padding: 4px;
  gap: 2px;
`;

const MethodContainer = styled.div<{ isSelected?: boolean }>`
  display: flex;
  width: 100%;
  height: 28px;
  padding: 4px;
  justify-content: center;
  align-items: center;

  ${({ isSelected }) => {
    if (isSelected) {
      return `
        border-radius: 8px;
        background-color: ${Colors.White};
      `;
    }
  }}
`;

const NickName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const AmountDueDate = styled.div`
  display: flex;
  gap: 12px;
`;

const DueDateInputContainer = styled.div`
  display: flex;
  height: 44px;
  border-radius: 8px;
  background-color: ${Colors.Gray50};
  padding: 8px;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const DueDateInput = styled.input`
  width: 100%;
  border: none;
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: -0.01em;
  padding: 3px 0;
  outline: none;
  background-color: ${Colors.Gray50};
`;

const ContributorContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-content: center;
  align-items: center;
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
