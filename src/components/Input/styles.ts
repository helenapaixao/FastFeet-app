import styled, { css } from "styled-components/native";

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
  border-color: none;
  color: #6f6c80;

  flex-direction: row;
  align-items: center;

  ${(props: { isErrored: any }) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props: { isFocused: any }) =>
    props.isFocused &&
    css`
      border-color: #ffc042;
    `}
`;

export const TextInput = styled.TextInput`
  color: #6f6c80;
  font-size: 16px;
  font-family: "Inter-Regular";
`;

export const Line = styled.View`
  width: 1px;
  height: 24px;
  color: #dad7e0;
`;
