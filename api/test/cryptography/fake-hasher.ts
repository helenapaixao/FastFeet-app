import { HashComparer } from "@/domain/application/cryptography/hash-comparer";
import { HashGenerator } from "@/domain/application/cryptography/hash-generator";

// Hash "de mentira" só p/ teste: senha + sufixo. Determinístico e rápido.
export class FakeHasher implements HashGenerator, HashComparer {
  async hash(plain: string) {
    return plain.concat("-hashed");
  }

  async compare(plain: string, hash: string) {
    return plain.concat("-hashed") === hash;
  }
}
