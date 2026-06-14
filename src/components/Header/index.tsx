import { Image } from "react-native";

import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";

import LogoSymbol from "../LogoSymbol";
import TextLogo from "../../assets/logo_text.png";
import BigText from "../../assets/bigText.png";

export default function Header() {
  return (
    <VStack className="w-full px-10 pt-10">
      <HStack className="items-center justify-between">
        <LogoSymbol width={56} height={62} />
        <Image source={TextLogo} style={{ width: 128, height: 24 }} />
      </HStack>

      <Box className="mt-4">
        <Image source={BigText} style={{ width: 245, height: 133 }} />
      </Box>

      <Text className="mt-5 w-44 text-left font-[Inter_400Regular] text-[15px] text-white">
        Faça seu login para começar suas entregas.
      </Text>
    </VStack>
  );
}
