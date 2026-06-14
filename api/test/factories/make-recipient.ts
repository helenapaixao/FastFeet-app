import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  Recipient,
  RecipientProps,
} from "@/domain/enterprise/entities/recipient";

export function makeRecipient(
  override: Partial<RecipientProps> = {},
  id?: UniqueEntityID,
) {
  const recipient = Recipient.create(
    {
      name: "Diego Fernandes",
      address: "Rua Guilherme Gembala, 280",
      city: "Rio do Sul",
      state: "SC",
      zipCode: "89168-000",
      latitude: -27.2092052,
      longitude: -49.6401091,
      ...override,
    },
    id,
  );

  return recipient;
}
