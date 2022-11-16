import React from "react";
import { Container, ButtonText } from "./styles";

interface ButtonProps {
  onPress: () => void;
  children?: React.ReactNode;
}

export default function Button({ children, ...rest }: ButtonProps) {
  return (
    <Container {...rest}>
      <ButtonText>{children}</ButtonText>
    </Container>
  );
}
