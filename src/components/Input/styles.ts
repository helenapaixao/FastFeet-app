import styled, { css } from "styled-components/native";
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
 width: 311px;
 height: 56px;
 padding: 0 16px;
 background: #f7f5fa;
 border-radius: 4px;
 margin-bottom: 8px;
 border: 1px;
 border-radius: 4px;
 border-color: #6f6c80;
 flex-direction: row;
 align-items: center;

 ${props => props.isErrored && css`
  border-color: #c53030;
  `}
  ${props => props.isFocused && css`
  border-color: #ff9000;
  `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #6f6c80;
  font-size: 16px;
  font-family: 'Inter_400Regular';
`;

export const Line = styled.View`
  width: 1px;
  height: 24px;
  background-color: #DAD7E0;
  border-radius: 4px;
  margin-left: 2px;
  margin-right: 10px;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;

export const IconPassword = styled(FeatherIcon)`
  margin-right: 16px;
`;
