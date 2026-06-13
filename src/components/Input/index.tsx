import { useCallback, useState, type ComponentProps } from "react";
import { type TextInputProps } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Container, Icon, Line, TextInput, ToggleButton } from "./styles";

type FeatherIconName = ComponentProps<typeof Feather>["name"];

interface InputProps extends TextInputProps {
  icon: FeatherIconName;
}

export default function Input({
  icon,
  onFocus,
  onBlur,
  onChangeText,
  secureTextEntry,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isHidden, setIsHidden] = useState(!!secureTextEntry);

  const isPassword = !!secureTextEntry;

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

  const isActive = isFocused || isFilled;

  return (
    <Container $isFocused={isFocused}>
      <Icon name={icon} size={20} color={isActive ? "#FF9000" : "#4C33CC"} />
      <Line />
      <TextInput
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={handleChangeText}
        secureTextEntry={isPassword && isHidden}
        {...rest}
      />
      {isPassword && (
        <ToggleButton onPress={() => setIsHidden((prev) => !prev)}>
          <Feather
            name={isHidden ? "eye-off" : "eye"}
            size={20}
            color={isActive ? "#FF9000" : "#4C33CC"}
          />
        </ToggleButton>
      )}
    </Container>
  );
}
