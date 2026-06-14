import { Either, left, right } from "@/core/either";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { OrdersRepository } from "@/domain/application/repositories/orders-repository";
import { Order } from "@/domain/enterprise/entities/order";

interface PickUpOrderUseCaseRequest {
  deliverymanId: string;
  orderId: string;
}

type PickUpOrderUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    order: Order;
  }
>;

export class PickUpOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    deliverymanId,
    orderId,
  }: PickUpOrderUseCaseRequest): Promise<PickUpOrderUseCaseResponse> {
    const order = await this.ordersRepository.findById(orderId);

    if (!order) {
      return left(new ResourceNotFoundError());
    }

    // transição de estado mora na entidade
    order.pickUp(new UniqueEntityID(deliverymanId));

    await this.ordersRepository.save(order);

    return right({ order });
  }
}
