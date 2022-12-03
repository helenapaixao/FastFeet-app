import React, { useState } from "react";
import { ImageBackground, Text } from "react-native";
import {
  Container,
  ContainerButton,
  CheckboxNative,
  CheckboxContainer,
  CheckboxText,
  ButtonForgotPassword
} from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Header from "../../components/Header";


export default function SignIn() {
  const [isChecked, setChecked] = useState(false);


  return (
    <Container>
      <Header />
      <Input
        name="user"
        icon="user"
        placeholder="CPF"
        onChangeText={() => {}}
      />
      <Input 
      name="Senha" 
      icon="lock" 
      placeholder="Senha"
      onChangeText={() => {}}
      />
      <ContainerButton>
        <CheckboxContainer>
          <CheckboxNative
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? "#4630EB" : undefined}
          />
          <CheckboxText>Lembrar-me</CheckboxText>
          <ButtonForgotPassword>Esqueci minha senha</ButtonForgotPassword>
        </CheckboxContainer>

        <Button onPress={() => {}}>Entrar</Button>
      </ContainerButton>
    </Container>
  );
}
