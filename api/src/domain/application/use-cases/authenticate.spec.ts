import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { FakeHasher } from "test/cryptography/fake-hasher";
import { FakeEncrypter } from "test/cryptography/fake-encrypter";
import { makeUser } from "test/factories/make-user";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";
import { AuthenticateUseCase } from "./authenticate";

let inMemoryUsersRepository: InMemoryUsersRepository;
let fakeHasher: FakeHasher;
let fakeEncrypter: FakeEncrypter;
let sut: AuthenticateUseCase;

describe("Authenticate", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    fakeHasher = new FakeHasher();
    fakeEncrypter = new FakeEncrypter();
    sut = new AuthenticateUseCase(
      inMemoryUsersRepository,
      fakeHasher,
      fakeEncrypter,
    );
  });

  it("deve autenticar com CPF e senha corretos", async () => {
    const user = makeUser({
      cpf: "12345678900",
      password: await fakeHasher.hash("123456"),
    });
    inMemoryUsersRepository.items.push(user);

    const result = await sut.execute({
      cpf: "12345678900",
      password: "123456",
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.accessToken).toEqual(expect.any(String));
    }
  });

  it("não deve autenticar com CPF inexistente", async () => {
    const result = await sut.execute({
      cpf: "00000000000",
      password: "123456",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(WrongCredentialsError);
  });

  it("não deve autenticar com senha errada", async () => {
    const user = makeUser({
      cpf: "12345678900",
      password: await fakeHasher.hash("123456"),
    });
    inMemoryUsersRepository.items.push(user);

    const result = await sut.execute({
      cpf: "12345678900",
      password: "senha-errada",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(WrongCredentialsError);
  });
});
