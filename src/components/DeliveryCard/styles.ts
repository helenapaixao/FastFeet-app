import styled from "styled-components/native";

export const Card = styled.View`
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 8px;
  margin-bottom: 16px;
  padding: 16px 16px 0;
  border: 1px solid #ecebf1;
`;

export const TopRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TitleGroup = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const IconBox = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.COLORS.YELLOW};
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

export const Title = styled.Text`
  font-family: "Roboto_700Bold";
  font-size: 16px;
  color: ${({ theme }) => theme.COLORS.GRAY_100};
`;

export const Date = styled.Text`
  font-family: "Roboto_400Regular";
  font-size: 12px;
  color: ${({ theme }) => theme.COLORS.GRAY_300};
`;

export const DetailsButton = styled.TouchableOpacity`
  margin: 16px -16px 0;
  padding: 14px 16px;
  background-color: #fdf0d5;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const DetailsText = styled.Text`
  font-family: "Roboto_500Medium";
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.GRAY_100};
`;
