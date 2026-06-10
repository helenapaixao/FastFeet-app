import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import Input from "../../components/Input";
import Button from "../../components/Button";
import Header from "../../components/Header";

import {
  Container,
  ContainerButton,
  CheckboxNative,
  CheckboxContainer,
  CheckboxText,
  ButtonForgotPassword,
  ForgotPasswordText,
} from "./styles";

export default function SignIn() {
  const [isChecked, setChecked] = useState(false);
  const navigation = useNavigation();

  function handleSignIn() {
    navigation.navigate("Dashboard");
  }

  function handleForgotPassword() {
    navigation.navigate("ForgotPassword");
  }

  return (
    <Container>
      <Header />
      <Input
        icon="user"
        placeholder="CPF"
        keyboardType="numeric"
        onChangeText={() => {}}
      />
      <Input
        icon="lock"
        placeholder="Senha"
        secureTextEntry
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
          <ButtonForgotPassword onPress={handleForgotPassword}>
            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
          </ButtonForgotPassword>
        </CheckboxContainer>

        <Button onPress={handleSignIn}>Entrar</Button>
      </ContainerButton>
    </Container>
  );
}
