import { useEffect, useRef, useState } from "react";
import { Modal, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";

import DeliveredIcon from "../../components/DeliveredIcon";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <VStack className="flex-1">
      <Text className="mb-1 font-[Roboto_500Medium] text-[11px] tracking-wide text-brand-gray300">
        {label}
      </Text>
      <Text className="font-[Roboto_400Regular] text-[15px] leading-[22px] text-brand-gray100">
        {value}
      </Text>
    </VStack>
  );
}

export default function Details() {
  const navigation = useNavigation();
  const [retrieved, setRetrieved] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  function handleRetrieve() {
    setRetrieved(true);
    timer.current = setTimeout(() => setRetrieved(false), 2000);
  }

  function handleBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("Dashboard");
    }
  }

  return (
    <Box className="flex-1 bg-brand-surface">
      <Box className="bg-brand-purple px-6 pb-14 pt-4">
        <SafeAreaView edges={["top"]}>
          <HStack className="items-center">
            <Pressable className="-ml-2 p-2" onPress={handleBack}>
              <Feather name="arrow-left" size={24} color="#FFFFFF" />
            </Pressable>
            <Text className="mr-6 flex-1 text-center font-[Roboto_700Bold] text-lg text-white">
              Detalhes
            </Text>
          </HStack>
        </SafeAreaView>
      </Box>

      <Box className="-mt-9 flex-1 px-6">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box className="mb-4 rounded-lg border border-[#ECEBF1] bg-white p-5">
            <HStack className="mb-4 items-center">
              <Feather name="clipboard" size={20} color="#FFC042" />
              <Text className="ml-2 font-[Roboto_700Bold] text-base text-brand-gray100">
                Dados
              </Text>
            </HStack>

            <Box className="mb-4">
              <Field label="DESTINATÁRIO" value="Diego Fernandes" />
            </Box>
            <Field
              label="ENDEREÇO"
              value={"Rua Guilherme Gembala, 280\nJardim América, SC\n89 168-000"}
            />
          </Box>

          <Box className="mb-4 rounded-lg border border-[#ECEBF1] bg-white p-5">
            <HStack className="mb-4 items-center">
              <Feather name="info" size={20} color="#FFC042" />
              <Text className="ml-2 font-[Roboto_700Bold] text-base text-brand-gray100">
                Situação
              </Text>
            </HStack>

            <HStack className="mb-4">
              <Field label="STATUS" value="Aguardando" />
              <Field label="POSTADO EM" value="01/07/2020" />
            </HStack>
            <HStack>
              <Field label="DATA DE RETIRADA" value="--/--/----" />
              <Field label="DATA DE ENTREGA" value="--/--/----" />
            </HStack>
          </Box>
        </ScrollView>
      </Box>

      <Box className="p-6">
        <Pressable
          className="h-14 items-center justify-center rounded bg-brand-yellow active:opacity-90"
          onPress={handleRetrieve}
        >
          <Text className="font-[Roboto_500Medium] text-base text-brand-gray100">
            Retirar pacote
          </Text>
        </Pressable>
      </Box>

      <Modal visible={retrieved} transparent animationType="fade">
        <Center className="flex-1 bg-[rgba(20,12,60,0.75)]">
          <DeliveredIcon size={72} />
          <Text className="mt-5 font-[Roboto_700Bold] text-xl text-white">
            Pacote retirado.
          </Text>
          <Text className="mt-1.5 font-[Roboto_400Regular] text-sm text-white">
            Só falta entregar :)
          </Text>
        </Center>
      </Modal>
    </Box>
  );
}
