import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryOrdersRepository } from "test/repositories/in-memory-orders-repository";
import { InMemoryRecipientsRepository } from "test/repositories/in-memory-recipients-repository";
import { makeOrder } from "test/factories/make-order";
import { makeRecipient } from "test/factories/make-recipient";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { FetchNearbyDeliveriesUseCase } from "./fetch-nearby-deliveries";

let ordersRepository: InMemoryOrdersRepository;
let recipientsRepository: InMemoryRecipientsRepository;
let sut: FetchNearbyDeliveriesUseCase;

// localização do entregador
const DELIVERYMAN_LOCATION = { latitude: -27.2092052, longitude: -49.6401091 };

describe("Fetch Nearby Deliveries", () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository();
    recipientsRepository = new InMemoryRecipientsRepository();
    sut = new FetchNearbyDeliveriesUseCase(
      ordersRepository,
      recipientsRepository,
    );
  });

  it("deve listar só encomendas próximas do entregador", async () => {
    const near = makeRecipient(DELIVERYMAN_LOCATION); // mesma coordenada (0 km)
    const far = makeRecipient({ latitude: -23.55, longitude: -46.63 }); // São Paulo (~longe)
    recipientsRepository.items.push(near, far);

    ordersRepository.items.push(
      makeOrder({
        deliverymanId: new UniqueEntityID("deliveryman-1"),
        recipientId: near.id,
      }),
    );
    ordersRepository.items.push(
      makeOrder({
        deliverymanId: new UniqueEntityID("deliveryman-1"),
        recipientId: far.id,
      }),
    );

    const result = await sut.execute({
      deliverymanId: "deliveryman-1",
      ...DELIVERYMAN_LOCATION,
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      // só a encomenda perto entra
      expect(result.value.orders).toHaveLength(1);
      expect(result.value.orders[0].recipientId.toString()).toBe(
        near.id.toString(),
      );
    }
  });

  it("não deve listar encomendas de outro entregador", async () => {
    const recipient = makeRecipient(DELIVERYMAN_LOCATION);
    recipientsRepository.items.push(recipient);

    // encomenda perto, mas de OUTRO entregador
    ordersRepository.items.push(
      makeOrder({
        deliverymanId: new UniqueEntityID("deliveryman-2"),
        recipientId: recipient.id,
      }),
    );

    const result = await sut.execute({
      deliverymanId: "deliveryman-1",
      ...DELIVERYMAN_LOCATION,
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.orders).toHaveLength(0);
    }
  });
});
