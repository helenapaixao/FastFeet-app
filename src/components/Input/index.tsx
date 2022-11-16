import React from "react";
import { View, Text, TextInputProps } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Container, Line, TextInput } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
interface InputProps extends TextInputProps {
  text: string;
  onChangeText: (text: string) => void;
  isErrored: boolean;
  isFocused: boolean;
  icon: string;
  name: string;
}

export default function Input({
  text,
  isErrored,
  isFocused,
  onChangeText,
  name,
  icon,
  ...rest
}: InputProps) {
  return (
    <Container isErrored={isErrored} isFocused={isFocused}>
      <FontAwesome5 name="user-alt" size={16} color="#FFC042" />
      <Line />

      <TextInput placeholder={text} onChangeText={onChangeText} />
    </Container>
  );
}
