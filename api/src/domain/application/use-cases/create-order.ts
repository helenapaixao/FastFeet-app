import { Either, left, right } from "@/core/either";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { OrdersRepository } from "@/domain/application/repositories/orders-repository";
import { RecipientsRepository } from "@/domain/application/repositories/recipients-repository";
import { UsersRepository } from "@/domain/application/repositories/users-repository";
import { Order } from "@/domain/enterprise/entities/order";

interface CreateOrderUseCaseRequest {
  administratorId: string;
  title: string;
  recipientId: string;
}

type CreateOrderUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  {
    order: Order;
  }
>;

export class CreateOrderUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private usersRepository: UsersRepository,
    private recipientsRepository: RecipientsRepository,
  ) {}

  async execute({
    administratorId,
    title,
    recipientId,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const administrator = await this.usersRepository.findById(administratorId);

    if (!administrator || !administrator.isAdmin) {
      return left(new NotAllowedError());
    }

    const recipient = await this.recipientsRepository.findById(recipientId);

    if (!recipient) {
      return left(new ResourceNotFoundError());
    }

    const order = Order.create({
      title,
      recipientId: new UniqueEntityID(recipientId),
    });

    await this.ordersRepository.create(order);

    return right({ order });
  }
}
