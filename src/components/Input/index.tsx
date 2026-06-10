import React, { useCallback, useState, type ComponentProps } from "react";
import { type TextInputProps } from "react-native";
import type { Feather } from "@expo/vector-icons";

import { Container, Icon, Line, TextInput } from "./styles";

type FeatherIconName = ComponentProps<typeof Feather>["name"];

interface InputProps extends TextInputProps {
  icon: FeatherIconName;
}

export default function Input({
  icon,
  onFocus,
  onBlur,
  onChangeText,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleFocus: NonNullable<TextInputProps["onFocus"]> = useCallback(
    (event) => {
      setIsFocused(true);
      onFocus?.(event);
    },
    [onFocus]
  );

  const handleBlur: NonNullable<TextInputProps["onBlur"]> = useCallback(
    (event) => {
      setIsFocused(false);
      onBlur?.(event);
    },
    [onBlur]
  );

  const handleChangeText = useCallback(
    (text: string) => {
      setIsFilled(text.length > 0);
      onChangeText?.(text);
    },
    [onChangeText]
  );

  return (
    <Container $isFocused={isFocused}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? "#FF9000" : "#4C33CC"}
      />
      <Line />
      <TextInput
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={handleChangeText}
        {...rest}
      />
    </Container>
  );
}
