import styled from "styled-components/native";
import Checkbox from "expo-checkbox";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY};
`;

export const CheckboxNative = styled(Checkbox)`
  background-color: #f7f5f4;
  border-radius: 4px;
  width: 20px;
  height: 20px;
`;

export const CheckboxContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CheckboxText = styled.Text`
  font-family: "Inter_400Regular";
  font-size: 15px;
  color: ${({ theme }) => theme.COLORS.PURPLE};
  margin-left: 14px;
  margin-right: 11px;
`;

export const ContainerButton = styled.View`
  margin-top: 18px;
`;

export const ButtonForgotPassword = styled.TouchableOpacity``;

export const ForgotPasswordText = styled.Text`
  font-family: "Inter_400Regular";
  font-size: 15px;
  color: ${({ theme }) => theme.COLORS.PURPLE};
`;
