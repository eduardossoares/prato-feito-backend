import z from "zod";
import { AbstractDTO } from "../../../shared/dtos/abstract.dto";

const getStatusResponseSchema = z.object({
  updated_at: z.string(),
  dependencies: z.object({
    database: z.object({
      version: z.string(),
      max_connections: z.string(),
      opened_connections: z.string(),
    }),
  }),
});

export class GetStatusResponseDTO extends AbstractDTO<
  typeof getStatusResponseSchema
> {
  protected schema() {
    return getStatusResponseSchema;
  }
}
