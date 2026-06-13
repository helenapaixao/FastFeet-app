import { Image } from "react-native";
import { Container, Text, ContainerContent } from "./styles";
import LogoSymbol from "../LogoSymbol";
import TextLogo from "../../assets/logo_text.png";
import BigText from "../../assets/bigText.png";

export default function Header() {
  return (
    <Container>
      <LogoSymbol width={56} height={62} />
      <ContainerContent>
        <Image source={TextLogo} />
      </ContainerContent>
      <Image source={BigText} />
      <Text>Faça seu login para começar suas entregas.</Text>
    </Container>
  );
}
