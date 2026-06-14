import { Either, left, right } from "@/core/either";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { OrdersRepository } from "@/domain/application/repositories/orders-repository";
import { Order } from "@/domain/enterprise/entities/order";

interface MarkOrderAsDeliveredUseCaseRequest {
  deliverymanId: string;
  orderId: string;
  deliveryPhoto: string;
}

type MarkOrderAsDeliveredUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    order: Order;
  }
>;

export class MarkOrderAsDeliveredUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    deliverymanId,
    orderId,
    deliveryPhoto,
  }: MarkOrderAsDeliveredUseCaseRequest): Promise<MarkOrderAsDeliveredUseCaseResponse> {
    const order = await this.ordersRepository.findById(orderId);

    if (!order) {
      return left(new ResourceNotFoundError());
    }

    // só o entregador que RETIROU a encomenda pode entregá-la
    if (order.deliverymanId?.toString() !== deliverymanId) {
      return left(new NotAllowedError());
    }

    // foto obrigatória
    if (!deliveryPhoto) {
      return left(new NotAllowedError());
    }

    order.markAsDelivered(deliveryPhoto);

    await this.ordersRepository.save(order);

    return right({ order });
  }
}
