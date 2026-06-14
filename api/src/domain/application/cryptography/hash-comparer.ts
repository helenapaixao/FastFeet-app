// Compara senha em texto puro com um hash. Usado no login.
export abstract class HashComparer {
  abstract compare(plain: string, hash: string): Promise<boolean>;
}
