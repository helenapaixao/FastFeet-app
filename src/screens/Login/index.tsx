import React from "react";
import { Background } from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Header from "../../components/Header";
import {ContainerButton} from './styles'

export default function Login() {
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
      <Button onPress={() => {}}>Entrar</Button>
      </ContainerButton>
    </Background>
  );
}
