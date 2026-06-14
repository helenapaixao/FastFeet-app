import { Either, left, right } from "@/core/either";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { HashGenerator } from "@/domain/application/cryptography/hash-generator";
import { UsersRepository } from "@/domain/application/repositories/users-repository";
import { User } from "@/domain/enterprise/entities/user";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface RegisterDeliverymanUseCaseRequest {
  administratorId: string;
  name: string;
  cpf: string;
  password: string;
}

type RegisterDeliverymanUseCaseResponse = Either<
  NotAllowedError | UserAlreadyExistsError,
  {
    deliveryman: User;
  }
>;

export class RegisterDeliverymanUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    administratorId,
    name,
    cpf,
    password,
  }: RegisterDeliverymanUseCaseRequest): Promise<RegisterDeliverymanUseCaseResponse> {
    const administrator = await this.usersRepository.findById(administratorId);

    // RBAC: só admin cadastra entregador
    if (!administrator || !administrator.isAdmin) {
      return left(new NotAllowedError());
    }

    // CPF é único
    const userWithSameCpf = await this.usersRepository.findByCpf(cpf);

    if (userWithSameCpf) {
      return left(new UserAlreadyExistsError(cpf));
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const deliveryman = User.create({
      name,
      cpf,
      password: hashedPassword,
      role: "DELIVERYMAN",
    });

    await this.usersRepository.create(deliveryman);

    return right({ deliveryman });
  }
}
