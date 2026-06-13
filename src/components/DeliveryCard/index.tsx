import { Feather } from "@expo/vector-icons";

import Stepper from "../Stepper";

import {
  Card,
  TopRow,
  IconBox,
  TitleGroup,
  Title,
  Date,
  DetailsButton,
  DetailsText,
} from "./styles";

export type Delivery = {
  id: string;
  name: string;
  date: string;
  reached: number;
};

type Props = {
  delivery: Delivery;
  onPressDetails?: () => void;
};

export default function DeliveryCard({ delivery, onPressDetails }: Props) {
  return (
    <Card>
      <TopRow>
        <TitleGroup>
          <IconBox>
            <Feather name="package" size={18} color="#FFFFFF" />
          </IconBox>
          <Title>{delivery.name}</Title>
        </TitleGroup>
        <Date>{delivery.date}</Date>
      </TopRow>

      <Stepper reached={delivery.reached} />

      <DetailsButton onPress={onPressDetails} activeOpacity={0.7}>
        <DetailsText>Detalhes</DetailsText>
        <Feather name="arrow-right" size={18} color="#4C4766" />
      </DetailsButton>
    </Card>
  );
}
