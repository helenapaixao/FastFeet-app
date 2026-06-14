import { RecipientsRepository } from "@/domain/application/repositories/recipients-repository";
import { Recipient } from "@/domain/enterprise/entities/recipient";

export class InMemoryRecipientsRepository implements RecipientsRepository {
  // public p/ os testes poderem inspecionar o estado
  public items: Recipient[] = [];

  async create(recipient: Recipient) {
    this.items.push(recipient);
  }

  async findById(id: string) {
    const recipient = this.items.find((item) => item.id.toString() === id);

    return recipient ?? null;
  }

  async save(recipient: Recipient) {
    const index = this.items.findIndex((item) => item.id.equals(recipient.id));

    this.items[index] = recipient;
  }

  async delete(recipient: Recipient) {
    const index = this.items.findIndex((item) => item.id.equals(recipient.id));

    this.items.splice(index, 1);
  }
}
