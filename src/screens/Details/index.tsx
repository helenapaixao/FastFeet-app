import { useEffect, useRef, useState } from "react";
import { Modal, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import DeliveredIcon from "../../components/DeliveredIcon";

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  Body,
  Card,
  SectionTitleRow,
  SectionTitle,
  FieldRow,
  Field,
  FieldLabel,
  FieldValue,
  Footer,
  RetrieveButton,
  RetrieveText,
  Overlay,
  OverlayTitle,
  OverlaySubtitle,
} from "./styles";

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
    <Container>
      <Header>
        <SafeAreaView
          edges={["top"]}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <BackButton onPress={handleBack} activeOpacity={0.7}>
            <Feather name="arrow-left" size={24} color="#FFFFFF" />
          </BackButton>
          <HeaderTitle>Detalhes</HeaderTitle>
        </SafeAreaView>
      </Header>

      <Body>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Card>
            <SectionTitleRow>
              <Feather name="clipboard" size={20} color="#FFC042" />
              <SectionTitle>Dados</SectionTitle>
            </SectionTitleRow>

            <FieldRow>
              <Field>
                <FieldLabel>DESTINATÁRIO</FieldLabel>
                <FieldValue>Diego Fernandes</FieldValue>
              </Field>
            </FieldRow>

            <FieldRow>
              <Field>
                <FieldLabel>ENDEREÇO</FieldLabel>
                <FieldValue>
                  Rua Guilherme Gembala, 280{"\n"}Jardim América, SC{"\n"}89
                  168-000
                </FieldValue>
              </Field>
            </FieldRow>
          </Card>

          <Card>
            <SectionTitleRow>
              <Feather name="info" size={20} color="#FFC042" />
              <SectionTitle>Situação</SectionTitle>
            </SectionTitleRow>

            <FieldRow>
              <Field>
                <FieldLabel>STATUS</FieldLabel>
                <FieldValue>Aguardando</FieldValue>
              </Field>
              <Field>
                <FieldLabel>POSTADO EM</FieldLabel>
                <FieldValue>01/07/2020</FieldValue>
              </Field>
            </FieldRow>

            <FieldRow>
              <Field>
                <FieldLabel>DATA DE RETIRADA</FieldLabel>
                <FieldValue>--/--/----</FieldValue>
              </Field>
              <Field>
                <FieldLabel>DATA DE ENTREGA</FieldLabel>
                <FieldValue>--/--/----</FieldValue>
              </Field>
            </FieldRow>
          </Card>
        </ScrollView>
      </Body>

      <Footer>
        <RetrieveButton onPress={handleRetrieve} activeOpacity={0.8}>
          <RetrieveText>Retirar pacote</RetrieveText>
        </RetrieveButton>
      </Footer>

      <Modal visible={retrieved} transparent animationType="fade">
        <Overlay>
          <DeliveredIcon size={72} />
          <OverlayTitle>Pacote retirado.</OverlayTitle>
          <OverlaySubtitle>Só falta entregar :)</OverlaySubtitle>
        </Overlay>
      </Modal>
    </Container>
  );
}
