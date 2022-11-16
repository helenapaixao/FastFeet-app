import React from "react";
import { View, Text } from "react-native";
import { Background } from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function Login() {
  return (
    <Background>
      <Input
        icon="user-alt"
        text="CPF"
        isErrored={false}
        isFocused={false}
        onChangeText={() => {}}
      />
      <Input
        name="password"
        text="Senha"
        isErrored={false}
        isFocused={false}
        onChangeText={() => {}}
      />
      <Button onPress={() => {}}>Entrar</Button>
    </Background>
  );
}
