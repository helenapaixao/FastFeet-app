import React from "react";
import { Container } from "./styles";
export interface IconProps {
  name: string;
  color?: string;
  size?: number;
}

export default function Icon({ name, color, size }: IconProps) {
  return <Container name={name} color={color} size={size} />;
}
