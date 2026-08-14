import type { FastifyInstance } from "fastify";
import z from "zod";
import { StatusController } from "./status.controller";

export default async function statusRoutes(app: FastifyInstance) {
  const statusController = new StatusController();

  app.get(
    "/",
    {
      schema: {
        tags: ["status"],
        description: "Return server status",
        response: {
          200: z
            .object({
              updated_at: z.string(),
              dependencies: z.object({
                database: z.object({
                  version: z.string(),
                  max_connections: z.string(),
                  opened_connections: z.string(),
                }),
              }),
            })
            .describe("Server status returned successfully"),
        },
      },
    },
    statusController.getStatus.bind(statusController),
  );
}
