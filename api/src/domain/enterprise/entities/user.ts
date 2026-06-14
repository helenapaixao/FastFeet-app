import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export type UserRole = "ADMIN" | "DELIVERYMAN";

export interface UserProps {
  name: string;
  cpf: string; // só dígitos
  password: string; // hash (o entity não sabe criptografar, isso é infra)
  role: UserRole;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name;
  }

  get cpf() {
    return this.props.cpf;
  }

  get password() {
    return this.props.password;
  }

  get role() {
    return this.props.role;
  }

  get isAdmin() {
    return this.props.role === "ADMIN";
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  // setter privado: toda alteração também marca updatedAt
  private touch() {
    this.props.updatedAt = new Date();
  }

  set name(name: string) {
    this.props.name = name;
    this.touch();
  }

  set password(password: string) {
    this.props.password = password;
    this.touch();
  }

  static create(
    props: Optional<UserProps, "createdAt" | "role">,
    id?: UniqueEntityID,
  ) {
    const user = new User(
      {
        ...props,
        role: props.role ?? "DELIVERYMAN",
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return user;
  }
}
