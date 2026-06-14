// Gera um token assinado a partir de um payload. Implementação real = JWT (infra).
export abstract class Encrypter {
  abstract encrypt(payload: Record<string, unknown>): Promise<string>;
}
