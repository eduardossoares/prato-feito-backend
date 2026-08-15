import z from "zod";
import { AbstractDTO } from "../../../../shared/dtos/abstract.dto";

const createUserResponseSchema = z.object({
  user: z.object({
    id: z.string(),
    email: z.email(),
    username: z.string(),
    created_at: z.date(),
  }),
});

export class CreateUserResponseDTO extends AbstractDTO<
  typeof createUserResponseSchema
> {
  protected schema() {
    return createUserResponseSchema;
  }
}
