import React,{useState} from "react";
import { Text } from "react-native";
import { Background,ContainerButton,CheckboxNative, CheckboxContainer,CheckboxText } from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Header from "../../components/Header";

export default function Login() {
  const [isChecked, setChecked] = useState(false);

  return (
    <Background>
      <Header/>
      <Input
        name="user"
        icon="user"
        placeholder="CPF"
        onChangeText={() => {}}
      />
      <Input 
      name="Senha" 
      icon="lock"
      placeholder="Senha"
      
      />
      <ContainerButton>
        <CheckboxContainer>
        <CheckboxNative
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#4630EB' : undefined}
        />
           <CheckboxText>Lembrar-me</CheckboxText>
        </CheckboxContainer>
      
      <Button onPress={() => {}}>Entrar</Button>
      </ContainerButton>
    </Background>
  );
}
