import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryOrdersRepository } from "test/repositories/in-memory-orders-repository";
import { makeOrder } from "test/factories/make-order";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { MarkOrderAsDeliveredUseCase } from "./mark-order-as-delivered";

let ordersRepository: InMemoryOrdersRepository;
let sut: MarkOrderAsDeliveredUseCase;

describe("Mark Order As Delivered", () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository();
    sut = new MarkOrderAsDeliveredUseCase(ordersRepository);
  });

  it("deve permitir que o entregador que retirou marque como entregue (com foto)", async () => {
    const order = makeOrder({
      status: "PICKED_UP",
      deliverymanId: new UniqueEntityID("deliveryman-1"),
    });
    ordersRepository.items.push(order);

    const result = await sut.execute({
      deliverymanId: "deliveryman-1",
      orderId: order.id.toString(),
      deliveryPhoto: "foto.jpg",
    });

    expect(result.isRight()).toBe(true);
    expect(ordersRepository.items[0].status).toBe("DELIVERED");
    expect(ordersRepository.items[0].deliveryPhoto).toBe("foto.jpg");
  });

  it("não deve permitir entregar sem foto", async () => {
    const order = makeOrder({
      status: "PICKED_UP",
      deliverymanId: new UniqueEntityID("deliveryman-1"),
    });
    ordersRepository.items.push(order);

    const result = await sut.execute({
      deliverymanId: "deliveryman-1",
      orderId: order.id.toString(),
      deliveryPhoto: "",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });

  it("não deve permitir que outro entregador marque como entregue", async () => {
    const order = makeOrder({
      status: "PICKED_UP",
      deliverymanId: new UniqueEntityID("deliveryman-1"),
    });
    ordersRepository.items.push(order);

    const result = await sut.execute({
      deliverymanId: "deliveryman-2", // não foi quem retirou
      orderId: order.id.toString(),
      deliveryPhoto: "foto.jpg",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });

  it("não deve entregar uma encomenda inexistente", async () => {
    const result = await sut.execute({
      deliverymanId: "deliveryman-1",
      orderId: "nao-existe",
      deliveryPhoto: "foto.jpg",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
