import { useEffect, useRef, useState } from "react";
import { Modal } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/ui/icon";

import Input from "../../components/Input";
import Button from "../../components/Button";
import Header from "../../components/Header";
import LogoOutline from "../../components/LogoOutline";

const VALID_CPF = "08625914902";
const VALID_PASSWORD = "1234";

function maskCpf(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export default function SignIn() {
  const [isChecked, setChecked] = useState(false);
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const navigation = useNavigation();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  function handleSignIn() {
    const onlyDigitsCpf = cpf.replace(/\D/g, "");

    if (onlyDigitsCpf === VALID_CPF && password === VALID_PASSWORD) {
      navigation.navigate("Dashboard");
      return;
    }

    setHasError(true);
    timer.current = setTimeout(() => setHasError(false), 2000);
  }

  function handleForgotPassword() {
    navigation.navigate("ForgotPassword");
  }

  return (
    <Box className="flex-1 justify-center bg-brand-purple">
      <Box className="absolute right-[-60px] top-[30px]">
        <LogoOutline width={360} height={420} />
      </Box>

      <Header />

      <VStack className="mt-2 w-full px-10">
        <Box className="mb-2">
          <Input
            icon="user"
            placeholder="CPF"
            keyboardType="numeric"
            value={cpf}
            maxLength={14}
            onChangeText={(text) => setCpf(maskCpf(text))}
          />
        </Box>

        <Input
          icon="lock"
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <HStack className="mt-5 items-center">
          <Checkbox
            value="remember"
            isChecked={isChecked}
            onChange={setChecked}
            size="md"
          >
            <CheckboxIndicator className="h-5 w-5 rounded border-0 bg-[#f7f5f4] data-[checked=true]:bg-[#4630EB]">
              <CheckboxIcon as={CheckIcon} className="text-white" />
            </CheckboxIndicator>
            <CheckboxLabel className="ml-3 font-[Inter_400Regular] text-[15px] text-brand-lilac">
              Lembrar-me
            </CheckboxLabel>
          </Checkbox>

          <Pressable className="ml-3" onPress={handleForgotPassword}>
            <Text className="font-[Inter_400Regular] text-[15px] text-brand-lilac">
              Esqueci minha senha
            </Text>
          </Pressable>
        </HStack>

        <Box className="mt-5">
          <Button onPress={handleSignIn}>Entrar</Button>
        </Box>
      </VStack>

      <Modal visible={hasError} transparent animationType="fade">
        <Center className="flex-1 bg-[rgba(20,12,60,0.7)]">
          <Center className="z-10 h-14 w-14 rounded-full bg-brand-red">
            <Feather name="x" size={32} color="#FFFFFF" />
          </Center>
          <Center className="-mt-7 min-w-[240px] rounded-lg bg-[#2b1c66] px-8 pb-5 pt-10">
            <Text className="text-center font-[Inter_500Medium] text-base text-white">
              Senha ou CPF{"\n"}incorretos.
            </Text>
          </Center>
        </Center>
      </Modal>
    </Box>
  );
}
