import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f5f4f8;
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.COLORS.PRIMARY};
  padding: 16px 24px 44px;
`;

export const TopRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const Greeting = styled.Text`
  font-family: "Roboto_400Regular";
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.PURPLE};
`;

export const UserName = styled.Text`
  font-family: "Roboto_500Medium";
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const LogoutButton = styled.TouchableOpacity`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.12);
  align-items: center;
  justify-content: center;
`;

export const TitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
`;

export const Title = styled.Text`
  font-family: "Roboto_700Bold";
  font-size: 28px;
  color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const Location = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LocationText = styled.Text`
  font-family: "Roboto_400Regular";
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.WHITE};
  margin-left: 6px;
`;

export const SearchBar = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 8px;
  height: 52px;
  margin: -26px 24px 0;
  padding: 0 16px;
  border: 1px solid #ecebf1;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  font-family: "Roboto_400Regular";
  font-size: 15px;
  color: ${({ theme }) => theme.COLORS.GRAY_100};
`;

export const Count = styled.Text`
  font-family: "Roboto_400Regular";
  font-size: 12px;
  color: ${({ theme }) => theme.COLORS.GRAY_300};
  text-align: center;
  margin: 16px 0 8px;
`;

export const List = styled.View`
  padding: 0 24px;
`;

export const TabBar = styled.View`
  flex-direction: row;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-top-width: 1px;
  border-top-color: #ecebf1;
`;

export const Tab = styled.TouchableOpacity<{ $active: boolean }>`
  flex: 1;
  padding: 16px 0 24px;
  align-items: center;
  border-top-width: 2px;
  border-top-color: ${({ $active, theme }) =>
    $active ? theme.COLORS.PRIMARY : "transparent"};
`;

export const TabText = styled.Text<{ $active: boolean }>`
  font-family: ${({ $active }) =>
    $active ? "Roboto_500Medium" : "Roboto_400Regular"};
  font-size: 15px;
  color: ${({ $active, theme }) =>
    $active ? theme.COLORS.PRIMARY : theme.COLORS.GRAY_200};
`;
