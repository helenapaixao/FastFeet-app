import { useEffect, useRef, useState } from "react";
import { Modal } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Input from "../../components/Input";
import Button from "../../components/Button";
import Header from "../../components/Header";
import LogoOutline from "../../components/LogoOutline";

import {
  Container,
  Decoration,
  ContainerButton,
  CheckboxNative,
  CheckboxContainer,
  CheckboxText,
  ButtonForgotPassword,
  ForgotPasswordText,
  ErrorOverlay,
  ErrorCircle,
  ErrorBox,
  ErrorText,
} from "./styles";

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
    <Container>
      <Decoration>
        <LogoOutline width={360} height={420} />
      </Decoration>
      <Header />
      <Input
        icon="user"
        placeholder="CPF"
        keyboardType="numeric"
        value={cpf}
        maxLength={14}
        onChangeText={(text) => setCpf(maskCpf(text))}
      />
      <Input
        icon="lock"
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <ContainerButton>
        <CheckboxContainer>
          <CheckboxNative
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? "#4630EB" : undefined}
          />
          <CheckboxText>Lembrar-me</CheckboxText>
          <ButtonForgotPassword onPress={handleForgotPassword}>
            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
          </ButtonForgotPassword>
        </CheckboxContainer>

        <Button onPress={handleSignIn}>Entrar</Button>
      </ContainerButton>

      <Modal visible={hasError} transparent animationType="fade">
        <ErrorOverlay>
          <ErrorCircle>
            <Feather name="x" size={32} color="#FFFFFF" />
          </ErrorCircle>
          <ErrorBox>
            <ErrorText>Senha ou CPF{"\n"}incorretos.</ErrorText>
          </ErrorBox>
        </ErrorOverlay>
      </Modal>
    </Container>
  );
}
