import { useCallback, useState, type ComponentProps } from "react";
import { type TextInputProps } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Input as GSInput, InputField } from "@/components/ui/input";
import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";

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
  const isActive = isFocused || isFilled;
  const iconColor = isActive ? "#FF9000" : "#4C33CC";

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
    <GSInput
      variant="outline"
      className={`h-14 w-full rounded border bg-brand-field px-4 ${
        isFocused ? "border-brand-orange" : "border-brand-gray200"
      }`}
    >
      <Feather name={icon} size={20} color={iconColor} />
      <Box className="mx-2.5 h-6 w-px rounded bg-[#dad7e0]" />
      <InputField
        className="flex-1 font-[Inter_400Regular] text-base text-brand-gray200"
        placeholderTextColor="#BEBCCC"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={handleChangeText}
        secureTextEntry={isPassword && isHidden}
        {...rest}
      />
      {isPassword && (
        <Pressable className="p-1" onPress={() => setIsHidden((prev) => !prev)}>
          <Feather
            name={isHidden ? "eye-off" : "eye"}
            size={20}
            color={iconColor}
          />
        </Pressable>
      )}
    </GSInput>
  );
}
