import styled from "@emotion/styled";
import { deviceHeight, roomMembers } from "@shared/atoms";
import { Dropdown, HomeSection, Icon, Text } from "@shared/components";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Colors } from "styles";

const Setting = () => {
  const {
    query: { roomId },
    push,
  } = useRouter();

  const [members, setMembers] = useRecoilState(roomMembers);
  const height = useRecoilValue(deviceHeight);

  // const handleRoleChange = (name: string, newRole: string) => {
  //   setMembers((prev) =>
  //     prev.map((member) =>
  //       member.name === name ? { ...member, auth: newRole } : member,
  //     ),
  //   );
  // };

  const handleClickChangePassword = (type: string) => {
    switch (type) {
      case "personal":
        push(`/${roomId}/setting/mypw`);
        return;
      case "room":
        push(`/${roomId}/setting/roompw`);
        return;
    }
  };

  return (
    <Container height={height}>
      <AlertContainer>
        <HomeSection>
          <Text type="BodyBold">Foods</Text>
          <AlertWrapper>
            <AlertDay>
              <Text type="BodyBold">3</Text>
            </AlertDay>
            <Text type="Label" color={Colors.Gray400}>
              days before expiration date
            </Text>
          </AlertWrapper>
        </HomeSection>

        <HomeSection>
          <Text type="BodyBold">Finance</Text>
          <AlertWrapper>
            <AlertDay>
              <Text type="BodyBold">3</Text>
            </AlertDay>
            <Text type="Label" color={Colors.Gray400}>
              days before predicted transaction
            </Text>
          </AlertWrapper>
        </HomeSection>

        <HomeSection>
          <Text type="BodyBold">Chores</Text>
          <AlertWrapper>
            <AlertDay>
              <Text type="BodyBold">3</Text>
            </AlertDay>
            <Text type="Label" color={Colors.Gray400}>
              days before cleaning task
            </Text>
          </AlertWrapper>
        </HomeSection>

        <HomeSection>
          <Text type="BodyBold">Events</Text>
          <AlertWrapper>
            <AlertDay>
              <Text type="BodyBold">3</Text>
            </AlertDay>
            <Text type="Label" color={Colors.Gray400}>
              days before event
            </Text>
          </AlertWrapper>
        </HomeSection>
      </AlertContainer>

      <MemberContainer>
        <Text type="H4">Members</Text>
        <MemberListContainer>
          {members?.map(({ memberId, memberName }) => {
            return (
              <MemberListWrapper key={memberId}>
                <Text type="BodyBold">{`@${memberName}`}</Text>
                <Dropdown
                  list={["Master", "Member", "Expel"]}
                  value="Member"
                  // onChange={(newRole) => handleRoleChange(memberName, newRole)}
                />
              </MemberListWrapper>
            );
          })}
        </MemberListContainer>
      </MemberContainer>

      <PasswordContainer>
        <PasswordWrapper onClick={() => handleClickChangePassword("personal")}>
          <Text type="H4">Change Password</Text>
          <Icon icon="Arrow_Right" />
        </PasswordWrapper>
        <Divider />
        <PasswordWrapper onClick={() => handleClickChangePassword("room")}>
          <Text type="H4">Change Room Password</Text>
          <Icon icon="Arrow_Right" />
        </PasswordWrapper>
      </PasswordContainer>
      {/* <PasswordWrapper>
          <ControlledInput
            value={oldPassword}
            onChange={handleChangeOldPassword}
            placeholder="current password"
          />
          <ControlledInput
            value={newPassword}
            onChange={handleChangeNewPassword}
            placeholder="new password"
          />
        </PasswordWrapper> */}

      <AdjustHeight />
    </Container>
  );
};

export default Setting;

const Container = styled.main<{ height: number | null }>`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100vw;
  height: ${({ height }) => height && `${height - 108}px`};
  top: 48px;
  padding: 12px 0;
  gap: 20px;
  background-color: ${Colors.Gray50};
  overflow-y: auto;
`;

const AlertContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AlertWrapper = styled.div`
  display: flex;
  gap: 9px;
  align-items: center;
`;

const AlertDay = styled.div`
  width: 32px;
  border-radius: 8px;
  padding: 4px 10px;
  background-color: ${Colors.Orange50};
`;

const MemberContainer = styled.section`
  display: flex;
  flex-direction: column;
  background-color: ${Colors.White};
  padding: 20px 12px;
  gap: 12px;
`;

const MemberListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MemberListWrapper = styled.div`
  display: flex;
  padding: 4px 8px;
  justify-content: space-between;
  align-items: center;
`;

const PasswordContainer = styled.section`
  display: flex;
  flex-direction: column;
  background-color: ${Colors.White};
  padding: 20px 12px;
  gap: 20px;
`;

const PasswordWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Divider = styled.div`
  border: 1px solid ${Colors.Gray50};
`;

const AdjustHeight = styled.div`
  height: 52px;
`;
