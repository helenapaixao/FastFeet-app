import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export interface RecipientProps {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  // coordenadas usadas para listar encomendas próximas ao entregador
  latitude: number;
  longitude: number;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Recipient extends Entity<RecipientProps> {
  get name() {
    return this.props.name;
  }

  get address() {
    return this.props.address;
  }

  get city() {
    return this.props.city;
  }

  get state() {
    return this.props.state;
  }

  get zipCode() {
    return this.props.zipCode;
  }

  get latitude() {
    return this.props.latitude;
  }

  get longitude() {
    return this.props.longitude;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  set name(name: string) {
    this.props.name = name;
    this.touch();
  }

  set address(address: string) {
    this.props.address = address;
    this.touch();
  }

  set latitude(latitude: number) {
    this.props.latitude = latitude;
    this.touch();
  }

  set longitude(longitude: number) {
    this.props.longitude = longitude;
    this.touch();
  }

  static create(
    props: Optional<RecipientProps, "createdAt">,
    id?: UniqueEntityID,
  ) {
    const recipient = new Recipient(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return recipient;
  }
}
