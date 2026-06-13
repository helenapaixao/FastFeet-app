import styled from "styled-components/native";
import Checkbox from "expo-checkbox";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY};
`;

export const Decoration = styled.View`
  position: absolute;
  top: 40px;
  right: -40px;
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

export const ErrorOverlay = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(20, 12, 60, 0.7);
`;

export const ErrorCircle = styled.View`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: #e23a3a;
  align-items: center;
  justify-content: center;
  z-index: 2;
  elevation: 4;
`;

export const ErrorBox = styled.View`
  margin-top: -28px;
  padding: 40px 32px 20px;
  background-color: #2b1c66;
  border-radius: 8px;
  align-items: center;
  min-width: 240px;
`;

export const ErrorText = styled.Text`
  font-family: "Inter_500Medium";
  font-size: 16px;
  color: ${({ theme }) => theme.COLORS.WHITE};
  text-align: center;
`;
