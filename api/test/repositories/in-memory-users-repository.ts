import { UsersRepository } from "@/domain/application/repositories/users-repository";
import { User } from "@/domain/enterprise/entities/user";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async create(user: User) {
    this.items.push(user);
  }

  async findById(id: string) {
    return this.items.find((item) => item.id.toString() === id) ?? null;
  }

  async findByCpf(cpf: string) {
    return this.items.find((item) => item.cpf === cpf) ?? null;
  }

  async save(user: User) {
    const index = this.items.findIndex((item) => item.id.equals(user.id));
    this.items[index] = user;
  }

  async delete(user: User) {
    const index = this.items.findIndex((item) => item.id.equals(user.id));
    this.items.splice(index, 1);
  }
}
