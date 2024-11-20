import styled from "@emotion/styled";
import {
  ControlledInput,
  Dropdown,
  HomeSection,
  Icon,
  Text,
} from "@shared/components";
import { useRouter } from "next/router";
import { useState } from "react";
import { Colors } from "styles";

const Setting = () => {
  const {
    query: { roomId },
    push,
  } = useRouter();

  const [members, setMembers] = useState([
    { name: "Mins00", auth: "Master" },
    { name: "Jinwook", auth: "Member" },
    { name: "Sooyoung", auth: "Member" },
  ]);

  const handleRoleChange = (name: string, newRole: string) => {
    console.log(newRole);

    setMembers((prev) =>
      prev.map((member) =>
        member.name === name ? { ...member, auth: newRole } : member,
      ),
    );
  };

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
    <Container>
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
              <Text type="BodyBold">1</Text>
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
              <Text type="BodyBold">5</Text>
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
          {members.map(({ name, auth }) => {
            return (
              <MemberListWrapper key={name}>
                <Text type="BodyBold">{`@${name}`}</Text>
                <Dropdown
                  list={["Master", "Member", "Expel"]}
                  value={auth}
                  onChange={(newRole) => handleRoleChange(name, newRole)}
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
    </Container>
  );
};

export default Setting;

const Container = styled.main`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100vw;
  height: ${window.innerHeight - 108}px;
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
