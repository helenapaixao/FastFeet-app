import styled from 'styled-components/native';
import { TextInput } from '../Input/styles';


export const Container = styled.View<{ isFocused: boolean }>`
  flex-direction: column;
  z-index: 1;
  //box-shadow: ${({ isFocused, theme }) => (isFocused ? theme.color.shadowBox : '0px 0px 0px #00000000')};
`;

export const Title = styled(TextInput)`
  margin-bottom: 10px;
  font-family: "Inter";
`;

export const InputContainer = styled.View<{ isFocused: boolean; disabled: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  height: 56px;
  border-radius: 2px;
  /* border: ${({ isFocused, theme }) =>
    isFocused ? `2px solid  ${theme.color.candyBlue}` : `1px solid  ${theme.color.darkGrey}`}; */
  width: 100%;
  align-items: center;
  //background-color: ${({ disabled, theme }) => (disabled ? theme.color.white : theme.color.background)};
  padding: 0 16px 0 22px;
`;

export const InputContent = styled.View<{ disabled: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  height: 56px;
  border-radius: 2px;
  width: 100%;
  align-items: center;
  /* background-color: ${({ disabled, theme }) => (disabled ? theme.color.white : theme.color.background)}; */
  padding: 0 16px 0 22px;
  /* border: ${({ theme }) => `1px solid ${theme.color.darkGrey}`}; */
`;

export const Input = styled.TextInput<{ disabled: boolean }>`
  /* color: ${({ disabled, theme }) => (disabled ? theme.color.midGrey : theme.color.almostBlack)}; */
  margin-right: auto;
  height: 100%;
  flex: 1;
  /* font-size: ${({ theme }) => theme.typography.body.m.size};
  font-family: ${({ theme }) => theme.typography.fontFamily.helveticaNow.weight400}; */
`;

export const ItemsContainer = styled.ScrollView`
  z-index: 10000000;
  width: 100%;
  /* background-color: ${({ theme }) => theme.color.white}; */
  margin-top: 84px;
  max-height: 254px;
  position: absolute;
  flex: 1;
`;

export const Item = styled.TouchableOpacity`
  height: 50px;
  padding: 0 22px 0 16px;
  border-bottom-width: 1px;
  /* border-bottom-color: ${({ theme }) => theme.color.midGrey}; */
  border-bottom-style: solid;
  flex-direction: row;
  align-items: center;
`;

export const ItemText = styled.Text<{ isBold: boolean }>`
  /* font-size: ${({ theme }) => theme.typography.body.m.size};
  font-family: ${({ theme, isBold }) =>
    isBold ? theme.typography.fontFamily.helveticaNow.weight700 : theme.typography.fontFamily.helveticaNow.weight400}; */
`;

export const NoResultsContainer = styled.View`
  box-sizing: border-box;
  /* border: ${({ theme }) => `1px solid ${theme.color.midGrey}`}; */
  border-radius: 2px;
  padding: 5px 19px;
`;
