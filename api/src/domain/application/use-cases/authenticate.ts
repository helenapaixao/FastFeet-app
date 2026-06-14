import { Either, left, right } from "@/core/either";
import { HashComparer } from "@/domain/application/cryptography/hash-comparer";
import { Encrypter } from "@/domain/application/cryptography/encrypter";
import { UsersRepository } from "@/domain/application/repositories/users-repository";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";

interface AuthenticateUseCaseRequest {
  cpf: string;
  password: string;
}

type AuthenticateUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string;
  }
>;

export class AuthenticateUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    cpf,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByCpf(cpf);

    if (!user) {
      return left(new WrongCredentialsError());
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      return left(new WrongCredentialsError());
    }

    // payload do token: id + role (role usado pelo RBAC nos guards)
    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
      role: user.role,
    });

    return right({ accessToken });
  }
}
