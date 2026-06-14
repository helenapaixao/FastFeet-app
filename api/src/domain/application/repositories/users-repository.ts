import { User } from "@/domain/enterprise/entities/user";

export abstract class UsersRepository {
  abstract create(user: User): Promise<void>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByCpf(cpf: string): Promise<User | null>; // login é por CPF
  abstract save(user: User): Promise<void>;
  abstract delete(user: User): Promise<void>;
}
