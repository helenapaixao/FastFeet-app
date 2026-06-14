import { Either, right } from "@/core/either";
import { RecipientsRepository } from "@/domain/application/repositories/recipients-repository";
import { Recipient } from "@/domain/enterprise/entities/recipient";

interface CreateRecipientUseCaseRequest {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
}

// por ora não há erro possível -> Left = null. Quando entrar RBAC, vira um erro.
type CreateRecipientUseCaseResponse = Either<
  null,
  {
    recipient: Recipient;
  }
>;

export class CreateRecipientUseCase {
  constructor(private recipientsRepository: RecipientsRepository) {}

  async execute({
    name,
    address,
    city,
    state,
    zipCode,
    latitude,
    longitude,
  }: CreateRecipientUseCaseRequest): Promise<CreateRecipientUseCaseResponse> {
    const recipient = Recipient.create({
      name,
      address,
      city,
      state,
      zipCode,
      latitude,
      longitude,
    });

    await this.recipientsRepository.create(recipient);

    return right({ recipient });
  }
}
