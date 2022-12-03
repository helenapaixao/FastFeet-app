import styled from 'styled-components/native'

import Checkbox from 'expo-checkbox';


export const Container = styled.View`   
 flex: 1;
 width: 100%;
 height: 100%;
  align-items: center;
  justify-content: center;
  background-color: #4C33CC;
`;


export const CheckboxNative = styled(Checkbox)`
background-color: #F7F5F4;
border-radius: 4px;
width: 20px;
height: 20px;
border: none;
`;

export const CheckboxContainer = styled.View`
flex-direction: row;
`

export const CheckboxText = styled.Text`
font-family: "Inter_400Regular";
font-size: 15px;
color: #D5CCFF;
margin-left: 14px;
margin-right: 11px;
`   
export const Header = styled.View`
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

export const ContainerButton = styled.View`
margin-top: 18px;
`