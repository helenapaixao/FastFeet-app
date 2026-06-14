import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { FakeHasher } from "test/cryptography/fake-hasher";
import { makeUser } from "test/factories/make-user";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { RegisterDeliverymanUseCase } from "./register-deliveryman";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let inMemoryUsersRepository: InMemoryUsersRepository;
let fakeHasher: FakeHasher;
let sut: RegisterDeliverymanUseCase;

describe("Register Deliveryman", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    fakeHasher = new FakeHasher();
    sut = new RegisterDeliverymanUseCase(inMemoryUsersRepository, fakeHasher);
  });

  it("deve permitir que um admin cadastre um entregador", async () => {
    const admin = makeUser({ role: "ADMIN" });
    inMemoryUsersRepository.items.push(admin);

    const result = await sut.execute({
      administratorId: admin.id.toString(),
      name: "Carlos Entregador",
      cpf: "98765432100",
      password: "123456",
    });

    expect(result.isRight()).toBe(true);
    // admin + entregador = 2
    expect(inMemoryUsersRepository.items).toHaveLength(2);
    if (result.isRight()) {
      expect(result.value.deliveryman.role).toBe("DELIVERYMAN");
    }
  });

  it("deve hashear a senha do entregador ao cadastrar", async () => {
    const admin = makeUser({ role: "ADMIN" });
    inMemoryUsersRepository.items.push(admin);

    const result = await sut.execute({
      administratorId: admin.id.toString(),
      name: "Carlos Entregador",
      cpf: "98765432100",
      password: "123456",
    });

    const hashedPassword = await fakeHasher.hash("123456");

    expect(result.isRight()).toBe(true);
    // senha persistida deve ser o hash, nunca o texto puro
    expect(inMemoryUsersRepository.items[1].password).toBe(hashedPassword);
  });

  it("não deve permitir cadastrar entregador com CPF já existente", async () => {
    const admin = makeUser({ role: "ADMIN" });
    inMemoryUsersRepository.items.push(admin);
    inMemoryUsersRepository.items.push(makeUser({ cpf: "98765432100" }));

    const result = await sut.execute({
      administratorId: admin.id.toString(),
      name: "Carlos Entregador",
      cpf: "98765432100",
      password: "123456",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(UserAlreadyExistsError);
  });

  it("não deve permitir que um não-admin cadastre entregador", async () => {
    const deliveryman = makeUser({ role: "DELIVERYMAN" });
    inMemoryUsersRepository.items.push(deliveryman);

    const result = await sut.execute({
      administratorId: deliveryman.id.toString(),
      name: "Carlos Entregador",
      cpf: "98765432100",
      password: "123456",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
