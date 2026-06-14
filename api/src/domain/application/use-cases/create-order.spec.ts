import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryOrdersRepository } from "test/repositories/in-memory-orders-repository";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { InMemoryRecipientsRepository } from "test/repositories/in-memory-recipients-repository";
import { makeUser } from "test/factories/make-user";
import { makeRecipient } from "test/factories/make-recipient";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { CreateOrderUseCase } from "./create-order";

let ordersRepository: InMemoryOrdersRepository;
let usersRepository: InMemoryUsersRepository;
let recipientsRepository: InMemoryRecipientsRepository;
let sut: CreateOrderUseCase;

describe("Create Order", () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository();
    usersRepository = new InMemoryUsersRepository();
    recipientsRepository = new InMemoryRecipientsRepository();
    sut = new CreateOrderUseCase(
      ordersRepository,
      usersRepository,
      recipientsRepository,
    );
  });

  it("deve permitir que um admin crie uma encomenda", async () => {
    const admin = makeUser({ role: "ADMIN" });
    const recipient = makeRecipient();
    usersRepository.items.push(admin);
    recipientsRepository.items.push(recipient);

    const result = await sut.execute({
      administratorId: admin.id.toString(),
      title: "Encomenda 01",
      recipientId: recipient.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(ordersRepository.items).toHaveLength(1);
    if (result.isRight()) {
      expect(result.value.order.status).toBe("WAITING");
    }
  });

  it("não deve permitir que um não-admin crie encomenda", async () => {
    const deliveryman = makeUser({ role: "DELIVERYMAN" });
    const recipient = makeRecipient();
    usersRepository.items.push(deliveryman);
    recipientsRepository.items.push(recipient);

    const result = await sut.execute({
      administratorId: deliveryman.id.toString(),
      title: "Encomenda 01",
      recipientId: recipient.id.toString(),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });

  it("não deve criar encomenda para destinatário inexistente", async () => {
    const admin = makeUser({ role: "ADMIN" });
    usersRepository.items.push(admin);

    const result = await sut.execute({
      administratorId: admin.id.toString(),
      title: "Encomenda 01",
      recipientId: "nao-existe",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
