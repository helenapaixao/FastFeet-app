import { Encrypter } from "@/domain/application/cryptography/encrypter";

// Token "de mentira": só serializa o payload. Suficiente p/ testar o use-case.
export class FakeEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>) {
    return JSON.stringify(payload);
  }
}
