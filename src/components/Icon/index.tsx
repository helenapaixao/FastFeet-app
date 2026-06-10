import React, { type ComponentProps } from "react";
import { Feather } from "@expo/vector-icons";

import { Container } from "./styles";

export interface IconProps {
  name: ComponentProps<typeof Feather>["name"];
  color?: string;
  size?: number;
}

export default function Icon({ name, color, size = 20 }: IconProps) {
  return (
    <Container>
      <Feather name={name} color={color} size={size} />
    </Container>
  );
}
