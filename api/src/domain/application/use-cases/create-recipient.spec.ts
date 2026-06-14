import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryRecipientsRepository } from "test/repositories/in-memory-recipients-repository";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { makeUser } from "test/factories/make-user";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { CreateRecipientUseCase } from "./create-recipient";

let inMemoryRecipientsRepository: InMemoryRecipientsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: CreateRecipientUseCase;

const recipientData = {
  name: "Diego Fernandes",
  address: "Rua Guilherme Gembala, 280",
  city: "Rio do Sul",
  state: "SC",
  zipCode: "89168-000",
  latitude: -27.2092052,
  longitude: -49.6401091,
};

describe("Create Recipient", () => {
  beforeEach(() => {
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new CreateRecipientUseCase(
      inMemoryRecipientsRepository,
      inMemoryUsersRepository,
    );
  });

  it("deve permitir que um admin crie um destinatário", async () => {
    const admin = makeUser({ role: "ADMIN" });
    inMemoryUsersRepository.items.push(admin);

    const result = await sut.execute({
      administratorId: admin.id.toString(),
      ...recipientData,
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryRecipientsRepository.items).toHaveLength(1);
  });

  it("não deve permitir que um entregador crie um destinatário", async () => {
    const deliveryman = makeUser({ role: "DELIVERYMAN" });
    inMemoryUsersRepository.items.push(deliveryman);

    const result = await sut.execute({
      administratorId: deliveryman.id.toString(),
      ...recipientData,
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
    expect(inMemoryRecipientsRepository.items).toHaveLength(0);
  });
});
