import type { ReactNode } from "react";

import { Button as GSButton, ButtonText } from "@/components/ui/button";

interface ButtonProps {
  onPress: () => void;
  children?: ReactNode;
}

export default function Button({ onPress, children }: ButtonProps) {
  return (
    <GSButton
      onPress={onPress}
      className="h-14 w-full rounded bg-brand-yellow active:bg-brand-yellow/90"
    >
      <ButtonText className="font-[Roboto_500Medium] text-base text-brand-gray100">
        {children}
      </ButtonText>
    </GSButton>
  );
}
