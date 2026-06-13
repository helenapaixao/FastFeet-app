import styled from "styled-components/native";

export const Container = styled.View`
  margin-top: 16px;
`;

export const Track = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Node = styled.View<{ $active: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  border: 2px solid
    ${({ $active, theme }) => ($active ? theme.COLORS.GREEN : "#C6C4D4")};
  background-color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const NodeInner = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.COLORS.GREEN};
`;

export const Connector = styled.View<{ $active: boolean }>`
  flex: 1;
  height: 2px;
  background-color: ${({ $active, theme }) =>
    $active ? theme.COLORS.GREEN : "#E3E1EC"};
`;

export const Labels = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
`;

export const Label = styled.Text<{ $active: boolean; $index: number }>`
  font-family: "Roboto_500Medium";
  font-size: 9px;
  color: ${({ $active, theme }) =>
    $active ? theme.COLORS.GREEN : theme.COLORS.GRAY_300};
  text-align: ${({ $index }) =>
    $index === 0 ? "left" : $index === 2 ? "right" : "center"};
`;
