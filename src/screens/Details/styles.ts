import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f5f4f8;
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.COLORS.PRIMARY};
  padding: 8px 24px 56px;
  flex-direction: row;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity`
  padding: 8px;
  margin-left: -8px;
`;

export const HeaderTitle = styled.Text`
  flex: 1;
  text-align: center;
  margin-right: 24px;
  font-family: "Roboto_700Bold";
  font-size: 18px;
  color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const Body = styled.View`
  flex: 1;
  padding: 0 24px;
  margin-top: -36px;
`;

export const Card = styled.View`
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
  border: 1px solid #ecebf1;
`;

export const SectionTitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 18px;
`;

export const SectionTitle = styled.Text`
  font-family: "Roboto_700Bold";
  font-size: 16px;
  color: ${({ theme }) => theme.COLORS.GRAY_100};
  margin-left: 8px;
`;

export const FieldRow = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
`;

export const Field = styled.View`
  flex: 1;
`;

export const FieldLabel = styled.Text`
  font-family: "Roboto_500Medium";
  font-size: 11px;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.COLORS.GRAY_300};
  margin-bottom: 4px;
`;

export const FieldValue = styled.Text`
  font-family: "Roboto_400Regular";
  font-size: 15px;
  color: ${({ theme }) => theme.COLORS.GRAY_100};
  line-height: 22px;
`;

export const Footer = styled.View`
  padding: 24px;
`;

export const RetrieveButton = styled.TouchableOpacity`
  height: 56px;
  background-color: ${({ theme }) => theme.COLORS.YELLOW};
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;

export const RetrieveText = styled.Text`
  font-family: "Roboto_500Medium";
  font-size: 16px;
  color: ${({ theme }) => theme.COLORS.GRAY_100};
`;

export const Overlay = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(20, 12, 60, 0.75);
`;

export const OverlayTitle = styled.Text`
  font-family: "Roboto_700Bold";
  font-size: 20px;
  color: ${({ theme }) => theme.COLORS.WHITE};
  margin-top: 20px;
`;

export const OverlaySubtitle = styled.Text`
  font-family: "Roboto_400Regular";
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.WHITE};
  margin-top: 6px;
`;
