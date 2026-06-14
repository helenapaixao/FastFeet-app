import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Order, OrderProps } from "@/domain/enterprise/entities/order";

export function makeOrder(
  override: Partial<OrderProps> = {},
  id?: UniqueEntityID,
) {
  const order = Order.create(
    {
      title: "Encomenda 01",
      recipientId: new UniqueEntityID("recipient-1"),
      ...override,
    },
    id,
  );

  return order;
}
