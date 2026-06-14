import { OrdersRepository } from "@/domain/application/repositories/orders-repository";
import { Order } from "@/domain/enterprise/entities/order";

export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = [];

  async create(order: Order) {
    this.items.push(order);
  }

  async findById(id: string) {
    return this.items.find((item) => item.id.toString() === id) ?? null;
  }

  async save(order: Order) {
    const index = this.items.findIndex((item) => item.id.equals(order.id));
    this.items[index] = order;
  }

  async delete(order: Order) {
    const index = this.items.findIndex((item) => item.id.equals(order.id));
    this.items.splice(index, 1);
  }
}
