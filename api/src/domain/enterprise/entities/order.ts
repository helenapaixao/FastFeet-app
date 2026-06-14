import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export type OrderStatus =
  | "WAITING" // aguardando retirada (disponível)
  | "PICKED_UP" // retirada pelo entregador
  | "DELIVERED" // entregue
  | "RETURNED"; // devolvida

export interface OrderProps {
  title: string;
  recipientId: UniqueEntityID;
  deliverymanId?: UniqueEntityID | null;
  status: OrderStatus;
  deliveryPhoto?: string | null; // obrigatória para marcar como entregue
  createdAt: Date;
  pickedUpAt?: Date | null;
  deliveredAt?: Date | null;
  returnedAt?: Date | null;
  updatedAt?: Date | null;
}

export class Order extends Entity<OrderProps> {
  get title() {
    return this.props.title;
  }

  get recipientId() {
    return this.props.recipientId;
  }

  get deliverymanId() {
    return this.props.deliverymanId;
  }

  get status() {
    return this.props.status;
  }

  get deliveryPhoto() {
    return this.props.deliveryPhoto;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get pickedUpAt() {
    return this.props.pickedUpAt;
  }

  get deliveredAt() {
    return this.props.deliveredAt;
  }

  get returnedAt() {
    return this.props.returnedAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  // --- transições de status (regras de domínio) ---

  markAsWaiting() {
    this.props.status = "WAITING";
    this.props.deliverymanId = null;
    this.props.pickedUpAt = null;
    this.touch();
  }

  pickUp(deliverymanId: UniqueEntityID) {
    this.props.status = "PICKED_UP";
    this.props.deliverymanId = deliverymanId;
    this.props.pickedUpAt = new Date();
    this.touch();
  }

  markAsDelivered(deliveryPhoto: string) {
    this.props.status = "DELIVERED";
    this.props.deliveryPhoto = deliveryPhoto;
    this.props.deliveredAt = new Date();
    this.touch();
  }

  markAsReturned() {
    this.props.status = "RETURNED";
    this.props.returnedAt = new Date();
    this.touch();
  }

  static create(
    props: Optional<OrderProps, "createdAt" | "status">,
    id?: UniqueEntityID,
  ) {
    const order = new Order(
      {
        ...props,
        status: props.status ?? "WAITING",
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return order;
  }
}
