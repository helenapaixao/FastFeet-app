import { Fragment } from "react";

import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";

const STEPS = ["AGUARDANDO", "RETIRADO", "ENTREGUE"];

type Props = {
  /** index of the last reached step: 0 = AGUARDANDO ... 2 = ENTREGUE */
  reached: number;
};

export default function Stepper({ reached }: Props) {
  return (
    <Box className="mt-4">
      <HStack className="items-center">
        {STEPS.map((_, index) => {
          const active = index <= reached;
          return (
            <Fragment key={index}>
              {index > 0 && (
                <Box
                  className={`h-0.5 flex-1 ${
                    active ? "bg-brand-green" : "bg-[#E3E1EC]"
                  }`}
                />
              )}
              <Box
                className={`h-4 w-4 items-center justify-center rounded-full border-2 bg-white ${
                  active ? "border-brand-green" : "border-[#C6C4D4]"
                }`}
              >
                {active && (
                  <Box className="h-2 w-2 rounded-full bg-brand-green" />
                )}
              </Box>
            </Fragment>
          );
        })}
      </HStack>

      <HStack className="mt-2 justify-between">
        {STEPS.map((label, index) => (
          <Text
            key={label}
            className={`font-[Roboto_500Medium] text-[9px] ${
              index <= reached ? "text-brand-green" : "text-brand-gray300"
            } ${index === 0 ? "text-left" : index === 2 ? "text-right" : "text-center"}`}
          >
            {label}
          </Text>
        ))}
      </HStack>
    </Box>
  );
}
