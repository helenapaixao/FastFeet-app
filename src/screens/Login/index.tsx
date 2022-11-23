import React from "react";
import { Background } from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Search from "../../components/Search";
import Header from "../../components/Header";

export default function Login() {
  return (
    <Background>
      <Header/>
      <Input
  
        name="user"
        
      
        onChangeText={() => {}}
      />
      <Input name="Senha"  />
      <Button onPress={() => {}}>Entrar</Button>
    </Background>
  );
}
