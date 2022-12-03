import React from "react";
import { Image, ImageBackground } from "react-native";
import { Container, Text, ContainerHeader, ContainerContent } from "./styles";
import Logo from "../../assets/logo.png";
import TextLogo from "../../assets/logo_text.png";
import BigText from "../../assets/bigText.png";
import FF from "../../assets/FF.png";

export default function Header() {
  return (
    <Container>
      <Image source={Logo} />
      <ContainerContent>
        <Image source={TextLogo} />
      </ContainerContent>
      <Image source={BigText} />
      <Text>Faça seu login para começar suas entregas.</Text>
    </Container>
  );
}
