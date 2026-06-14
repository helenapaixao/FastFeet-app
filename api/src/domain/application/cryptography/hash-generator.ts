// Gera hash de uma senha. A implementação real (bcrypt) fica na infra.
export abstract class HashGenerator {
  abstract hash(plain: string): Promise<string>;
}
