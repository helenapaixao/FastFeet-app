import { Either, left, right } from "@/core/either";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { RecipientsRepository } from "@/domain/application/repositories/recipients-repository";
import { UsersRepository } from "@/domain/application/repositories/users-repository";
import { Recipient } from "@/domain/enterprise/entities/recipient";

interface CreateRecipientUseCaseRequest {
  administratorId: string; // quem está executando a ação
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
}

type CreateRecipientUseCaseResponse = Either<
  NotAllowedError,
  {
    recipient: Recipient;
  }
>;

export class CreateRecipientUseCase {
  constructor(
    private recipientsRepository: RecipientsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    administratorId,
    name,
    address,
    city,
    state,
    zipCode,
    latitude,
    longitude,
  }: CreateRecipientUseCaseRequest): Promise<CreateRecipientUseCaseResponse> {
    const administrator = await this.usersRepository.findById(administratorId);

    // RBAC: só admin pode criar destinatário
    if (!administrator || !administrator.isAdmin) {
      return left(new NotAllowedError());
    }

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
