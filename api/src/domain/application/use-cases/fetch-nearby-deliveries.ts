import { Either, right } from "@/core/either";
import { getDistanceBetweenCoordinates } from "@/core/utils/get-distance-between-coordinates";
import { OrdersRepository } from "@/domain/application/repositories/orders-repository";
import { RecipientsRepository } from "@/domain/application/repositories/recipients-repository";
import { Order } from "@/domain/enterprise/entities/order";

const MAX_DISTANCE_IN_KILOMETERS = 10;

interface FetchNearbyDeliveriesUseCaseRequest {
  deliverymanId: string;
  latitude: number;
  longitude: number;
}

type FetchNearbyDeliveriesUseCaseResponse = Either<
  null,
  {
    orders: Order[];
  }
>;

export class FetchNearbyDeliveriesUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private recipientsRepository: RecipientsRepository,
  ) {}

  async execute({
    deliverymanId,
    latitude,
    longitude,
  }: FetchNearbyDeliveriesUseCaseRequest): Promise<FetchNearbyDeliveriesUseCaseResponse> {
    // "entregador só vê as suas" -> filtra pelo id dele já no repositório
    const orders =
      await this.ordersRepository.findManyByDeliverymanId(deliverymanId);

    const nearby: Order[] = [];

    for (const order of orders) {
      const recipient = await this.recipientsRepository.findById(
        order.recipientId.toString(),
      );

      if (!recipient) {
        continue;
      }

      const distance = getDistanceBetweenCoordinates(
        { latitude, longitude },
        { latitude: recipient.latitude, longitude: recipient.longitude },
      );

      if (distance <= MAX_DISTANCE_IN_KILOMETERS) {
        nearby.push(order);
      }
    }

    return right({ orders: nearby });
  }
}
