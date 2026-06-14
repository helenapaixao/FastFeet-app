import { describe, it, expect } from "vitest";

import { type Either, left, right } from "./either";

// função-exemplo: retorna erro (Left) ou sucesso (Right) conforme o argumento
function doSomething(shouldSucceed: boolean): Either<string, number> {
  if (shouldSucceed) {
    return right(10);
  }

  return left("deu erro");
}

describe("Either", () => {
  it("deve retornar um sucesso (Right)", () => {
    const result = doSomething(true);

    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);

    if (result.isRight()) {
      // dentro do isRight, o TS sabe que result.value é number
      expect(result.value).toBe(10);
    }
  });

  it("deve retornar um erro (Left)", () => {
    const result = doSomething(false);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);

    if (result.isLeft()) {
      // dentro do isLeft, o TS sabe que result.value é string
      expect(result.value).toBe("deu erro");
    }
  });
});
