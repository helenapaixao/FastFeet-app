import React from "react";
import { Container, ButtonText } from "./styles";

interface ButtonProps {
  onPress: () => void;
  children?: React.ReactNode;
}

export default function Button({ onPress,children}: ButtonProps) {
  return (
    <Container  onPress={onPress}>
      <ButtonText>{children}</ButtonText>
    </Container>
  );
}
