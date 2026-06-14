import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryOrdersRepository } from "test/repositories/in-memory-orders-repository";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { makeOrder } from "test/factories/make-order";
import { makeUser } from "test/factories/make-user";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { MarkOrderAsWaitingUseCase } from "./mark-order-as-waiting";

let ordersRepository: InMemoryOrdersRepository;
let usersRepository: InMemoryUsersRepository;
let sut: MarkOrderAsWaitingUseCase;

describe("Mark Order As Waiting", () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository();
    usersRepository = new InMemoryUsersRepository();
    sut = new MarkOrderAsWaitingUseCase(ordersRepository, usersRepository);
  });

  it("deve permitir que um admin volte a encomenda para aguardando", async () => {
    const admin = makeUser({ role: "ADMIN" });
    const order = makeOrder({
      status: "PICKED_UP",
      deliverymanId: new UniqueEntityID("deliveryman-1"),
    });
    usersRepository.items.push(admin);
    ordersRepository.items.push(order);

    const result = await sut.execute({
      administratorId: admin.id.toString(),
      orderId: order.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(ordersRepository.items[0].status).toBe("WAITING");
    // ao voltar para aguardando, o vínculo com o entregador é limpo
    expect(ordersRepository.items[0].deliverymanId).toBeNull();
  });

  it("não deve permitir que um não-admin altere para aguardando", async () => {
    const deliveryman = makeUser({ role: "DELIVERYMAN" });
    const order = makeOrder();
    usersRepository.items.push(deliveryman);
    ordersRepository.items.push(order);

    const result = await sut.execute({
      administratorId: deliveryman.id.toString(),
      orderId: order.id.toString(),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
