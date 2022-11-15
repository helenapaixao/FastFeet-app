import React from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";
import { Container } from "./styles";

interface InputProps {
  text: string;
  onChangeText: (text: string) => void;
  isErrored: boolean;
  isFocused: boolean;
}

export default function Input({
  text,
  isErrored,
  isFocused,
  onChangeText,
}: InputProps) {
  return (
    <Container isErrored={isErrored} isFocused={isFocused}>
      <TextInput placeholder={text} onChangeText={onChangeText} />
    </Container>
  );
}
