import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { User, UserProps } from "@/domain/enterprise/entities/user";

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityID,
) {
  const user = User.create(
    {
      name: "John Doe",
      cpf: "12345678900",
      password: "hashed-password",
      role: "DELIVERYMAN",
      ...override,
    },
    id,
  );

  return user;
}
