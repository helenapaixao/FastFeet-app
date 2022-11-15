import React from "react";
import { View, Text } from "react-native";
import { Background } from "./styles";
import Input from "../../components/Input";

export default function Login() {
  return (
    <Background>
      <Input
        text="Digite seu nome"
        isErrored={false}
        isFocused={false}
        onChangeText={() => {}}
      />
      <Text>Login</Text>
    </Background>
  );
}
