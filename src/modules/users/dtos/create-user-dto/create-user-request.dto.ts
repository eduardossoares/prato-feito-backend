import z from "zod";
import { AbstractDTO } from "../../../../shared/dtos/abstract.dto";

const createUserSchema = z.object({
  email: z
    .email()
    .max(254, "E-mail must constains at most 254 characters")
    .toLowerCase()
    .trim(),
  username: z
    .string()
    .min(6, "Username must constains at least 6 characters")
    .max(30, "Username must constains at most 30 characters")
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(6, "Password must constains at least 6 characters")
    .max(72, "Password must contains at most 72 characters")
    .regex(/\p{Lu}/u, "Password must contain an uppercase letter")
    .regex(/\p{Ll}/u, "Password must contain a lowercase letter")
    .regex(/\p{N}/u, "Password must contain a number")
    .regex(/[\p{P}\p{S}]/u, "Password must contain a special character")
    .trim(),
});

export type CreateUserRequestData = z.infer<typeof createUserSchema>;

export class CreateUserRequestDTO extends AbstractDTO<typeof createUserSchema> {
  protected schema() {
    return createUserSchema;
  }
}
