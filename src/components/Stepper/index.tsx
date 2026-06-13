import { Fragment } from "react";

import {
  Container,
  Track,
  Node,
  NodeInner,
  Connector,
  Labels,
  Label,
} from "./styles";

const STEPS = ["AGUARDANDO", "RETIRADO", "ENTREGUE"];

type Props = {
  reached: number;
};

export default function Stepper({ reached }: Props) {
  return (
    <Container>
      <Track>
        {STEPS.map((_, index) => (
          <Fragment key={index}>
            {index > 0 && <Connector $active={index <= reached} />}
            <Node $active={index <= reached}>
              {index <= reached && <NodeInner />}
            </Node>
          </Fragment>
        ))}
      </Track>
      <Labels>
        {STEPS.map((label, index) => (
          <Label key={label} $active={index <= reached} $index={index}>
            {label}
          </Label>
        ))}
      </Labels>
    </Container>
  );
}
