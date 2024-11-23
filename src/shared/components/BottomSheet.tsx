import styled from "@emotion/styled";
import { deviceHeight } from "@shared/atoms";
import { useRecoilValue } from "recoil";
import { Colors, Shadow } from "styles";
import { Icon, Text } from ".";

interface BottomSheetProps {
  title: string;
  handleClickDimmed: () => void;
  onClick: (value: string) => void;
  data?: string[];
  selectedData?: string;
}

const BottomSheet = ({
  title,
  handleClickDimmed,
  onClick,
  data,
  selectedData,
}: BottomSheetProps) => {
  const height = useRecoilValue(deviceHeight);

  return (
    <>
      <Dimmer height={height} onClick={handleClickDimmed} />
      <BottomSheetContainer>
        <SheetHeader>
          <Grab />
        </SheetHeader>
        <SheetContent>
          <Text type="BodyBold">{title}</Text>
          <SheetData>
            {data?.map((_data, index) => (
              <Data key={_data + index} onClick={() => onClick(_data)}>
                <Text
                  key={_data + index}
                  type="Body"
                  color={
                    selectedData === _data ? Colors.Gray700 : Colors.Gray400
                  }
                >
                  {_data}
                </Text>
                {selectedData === _data && (
                  <Icon icon="Check_Button" color={Colors.Orange300} />
                )}
              </Data>
            ))}
          </SheetData>
        </SheetContent>
      </BottomSheetContainer>
    </>
  );
};

export default BottomSheet;

const Dimmer = styled.div<{ height: number | null }>`
  position: fixed;
  width: 100%;
  height: ${({ height }) => height && `${height}px`};
  top: 0;
  background-color: ${Colors.Dimmer200};
  z-index: 9999;
`;

const BottomSheetContainer = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  width: 100%;
  max-height: 600px;
  bottom: 0;
  border-radius: 28px 28px 0px 0px;
  background-color: ${Colors.White};
  padding: 0px 32px 40px 32px;
  gap: 8px;
  ${Shadow.Small};
  z-index: 99999;
`;

const SheetHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 12px;
  align-items: center;
`;

const Grab = styled.div`
  width: 40px;
  height: 4px;
  border-radius: 100px;
  background-color: ${Colors.Gray400};
  opacity: 0.4;
`;

const SheetContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;

const SheetData = styled.div`
  display: flex;
  padding: 20px 0px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;

const Data = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
