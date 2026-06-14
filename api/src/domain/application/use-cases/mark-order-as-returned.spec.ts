import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryOrdersRepository } from "test/repositories/in-memory-orders-repository";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { makeOrder } from "test/factories/make-order";
import { makeUser } from "test/factories/make-user";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { MarkOrderAsReturnedUseCase } from "./mark-order-as-returned";

let ordersRepository: InMemoryOrdersRepository;
let usersRepository: InMemoryUsersRepository;
let sut: MarkOrderAsReturnedUseCase;

describe("Mark Order As Returned", () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository();
    usersRepository = new InMemoryUsersRepository();
    sut = new MarkOrderAsReturnedUseCase(ordersRepository, usersRepository);
  });

  it("deve permitir que um admin marque como devolvida", async () => {
    const admin = makeUser({ role: "ADMIN" });
    const order = makeOrder({ status: "PICKED_UP" });
    usersRepository.items.push(admin);
    ordersRepository.items.push(order);

    const result = await sut.execute({
      administratorId: admin.id.toString(),
      orderId: order.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(ordersRepository.items[0].status).toBe("RETURNED");
  });

  it("não deve permitir que um não-admin marque como devolvida", async () => {
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
