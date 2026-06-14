import { Feather } from "@expo/vector-icons";

import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";

import Stepper from "../Stepper";

export type Delivery = {
  id: string;
  name: string;
  date: string;
  reached: number;
};

type Props = {
  delivery: Delivery;
  onPressDetails?: () => void;
};

export default function DeliveryCard({ delivery, onPressDetails }: Props) {
  return (
    <Box className="mb-4 rounded-lg border border-[#ECEBF1] bg-white px-4 pt-4">
      <HStack className="items-center justify-between">
        <HStack className="items-center">
          <Center className="mr-2.5 h-8 w-8 rounded-md bg-brand-yellow">
            <Feather name="package" size={18} color="#FFFFFF" />
          </Center>
          <Text className="font-[Roboto_700Bold] text-base text-brand-gray100">
            {delivery.name}
          </Text>
        </HStack>
        <Text className="font-[Roboto_400Regular] text-xs text-brand-gray300">
          {delivery.date}
        </Text>
      </HStack>

      <Stepper reached={delivery.reached} />

      <Pressable
        onPress={onPressDetails}
        className="-mx-4 mt-4 flex-row items-center justify-between rounded-b-lg bg-[#FDF0D5] px-4 py-3.5"
      >
        <Text className="font-[Roboto_500Medium] text-sm text-brand-gray100">
          Detalhes
        </Text>
        <Feather name="arrow-right" size={18} color="#4C4766" />
      </Pressable>
    </Box>
  );
}
