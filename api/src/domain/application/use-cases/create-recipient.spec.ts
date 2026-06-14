import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryRecipientsRepository } from "test/repositories/in-memory-recipients-repository";
import { CreateRecipientUseCase } from "./create-recipient";

let inMemoryRecipientsRepository: InMemoryRecipientsRepository;
let sut: CreateRecipientUseCase; // sut = System Under Test (o que estamos testando)

describe("Create Recipient", () => {
  beforeEach(() => {
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository();
    sut = new CreateRecipientUseCase(inMemoryRecipientsRepository);
  });

  it("deve criar um destinatário", async () => {
    const result = await sut.execute({
      name: "Diego Fernandes",
      address: "Rua Guilherme Gembala, 280",
      city: "Rio do Sul",
      state: "SC",
      zipCode: "89168-000",
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    expect(result.isRight()).toBe(true);
    // o repositório deve ter persistido 1 destinatário
    expect(inMemoryRecipientsRepository.items).toHaveLength(1);
    expect(inMemoryRecipientsRepository.items[0].name).toBe("Diego Fernandes");
  });
});
