import { Order } from "@/domain/enterprise/entities/order";

export abstract class OrdersRepository {
  abstract create(order: Order): Promise<void>;
  abstract findById(id: string): Promise<Order | null>;
  abstract findManyByDeliverymanId(deliverymanId: string): Promise<Order[]>;
  abstract save(order: Order): Promise<void>;
  abstract delete(order: Order): Promise<void>;
}
