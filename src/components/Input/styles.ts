import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";

interface ContainerProps {
  $isFocused: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 311px;
  height: 56px;
  padding: 0 16px;
  background-color: #f7f5fa;
  margin-bottom: 8px;
  border: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};
  border-radius: 4px;
  flex-direction: row;
  align-items: center;

  ${({ $isFocused }) =>
    $isFocused &&
    css`
      border-color: #ff9000;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: ${({ theme }) => theme.COLORS.GRAY_200};
  font-size: 16px;
  font-family: "Inter_400Regular";
`;

export const Line = styled.View`
  width: 1px;
  height: 24px;
  background-color: #dad7e0;
  border-radius: 4px;
  margin-left: 2px;
  margin-right: 10px;
`;

export const Icon = styled(Feather)`
  margin-right: 16px;
`;

export const ToggleButton = styled.TouchableOpacity`
  padding: 4px;
  margin-left: 8px;
`;
