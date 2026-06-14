import { Recipient } from "@/domain/enterprise/entities/recipient";

// Contrato: o use-case depende DESTA abstração, não de Prisma/in-memory.
// (abstract class p/ servir de token de injeção no NestJS depois)
export abstract class RecipientsRepository {
  abstract create(recipient: Recipient): Promise<void>;
  abstract findById(id: string): Promise<Recipient | null>;
  abstract save(recipient: Recipient): Promise<void>;
  abstract delete(recipient: Recipient): Promise<void>;
}
