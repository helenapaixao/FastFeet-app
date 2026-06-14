import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryOrdersRepository } from "test/repositories/in-memory-orders-repository";
import { makeOrder } from "test/factories/make-order";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { PickUpOrderUseCase } from "./pick-up-order";

let ordersRepository: InMemoryOrdersRepository;
let sut: PickUpOrderUseCase;

describe("Pick Up Order", () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository();
    sut = new PickUpOrderUseCase(ordersRepository);
  });

  it("deve permitir retirar uma encomenda", async () => {
    const order = makeOrder();
    ordersRepository.items.push(order);

    const result = await sut.execute({
      deliverymanId: "deliveryman-1",
      orderId: order.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(ordersRepository.items[0].status).toBe("PICKED_UP");
    expect(ordersRepository.items[0].deliverymanId?.toString()).toBe(
      "deliveryman-1",
    );
  });

  it("não deve retirar uma encomenda inexistente", async () => {
    const result = await sut.execute({
      deliverymanId: "deliveryman-1",
      orderId: "nao-existe",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
