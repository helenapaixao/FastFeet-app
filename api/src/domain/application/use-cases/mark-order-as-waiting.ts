import { Either, left, right } from "@/core/either";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { OrdersRepository } from "@/domain/application/repositories/orders-repository";
import { UsersRepository } from "@/domain/application/repositories/users-repository";
import { Order } from "@/domain/enterprise/entities/order";

interface MarkOrderAsWaitingUseCaseRequest {
  administratorId: string;
  orderId: string;
}

type MarkOrderAsWaitingUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  {
    order: Order;
  }
>;

export class MarkOrderAsWaitingUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    administratorId,
    orderId,
  }: MarkOrderAsWaitingUseCaseRequest): Promise<MarkOrderAsWaitingUseCaseResponse> {
    const administrator = await this.usersRepository.findById(administratorId);

    if (!administrator || !administrator.isAdmin) {
      return left(new NotAllowedError());
    }

    const order = await this.ordersRepository.findById(orderId);

    if (!order) {
      return left(new ResourceNotFoundError());
    }

    order.markAsWaiting();

    await this.ordersRepository.save(order);

    return right({ order });
  }
}
