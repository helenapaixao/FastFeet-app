import React from "react";
import { View, Text, TextInputProps } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Container,TextInput } from "./styles";

interface InputProps extends TextInputProps {
  text: string;
  onChangeText: (text: string) => void;
  isErrored: boolean;
  isFocused: boolean;
  icon: string;
}

export default function Input({
  text,
  isErrored,
  isFocused,
  onChangeText,
}: InputProps) {
  return (
    <Container isErrored={isErrored} isFocused={isFocused}>
    <FontAwesome5 name="user-alt" size={16} color="#FFC042" />

      <TextInput placeholder={text} onChangeText={onChangeText} />
    </Container>
  );
}
