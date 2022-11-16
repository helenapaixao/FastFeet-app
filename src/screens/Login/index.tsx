import React from "react";
import { View, Text } from "react-native";
import { Background } from "./styles";
import Input from "../../components/Input";

export default function Login() {
  return (
    <Background>
      <Input
        icon="user-alt"
        text="Digite seu nome"
        isErrored={false}
        isFocused={false}
        onChangeText={() => {}}
      />
      <Text>Login</Text>
    </Background>
  );
}
