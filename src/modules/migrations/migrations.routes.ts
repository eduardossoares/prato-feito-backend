import type { FastifyInstance } from "fastify";
import z from "zod";
import { MigrationsController } from "./migrations.controller";

export default function migrationsRoutes(app: FastifyInstance) {
  const migrationsController = new MigrationsController();

  app.get(
    "/",
    {
      schema: {
        tags: ["migrations"],
        description: "Runs the pending migrations and return a list of them",
        response: {
          200: z
            .object({
              migrations: z.array(
                z.object({
                  path: z.string(),
                  name: z.string(),
                  timestamp: z.number(),
                }),
              ),
            })
            .describe("Pending migrations have been successfully run"),
        },
      },
    },
    migrationsController.dryRun.bind(migrationsController),
  );

  app.post(
    "/",
    {
      schema: {
        tags: ["migrations"],
        description: "Return a list of the pending migrations",
        response: {
          200: z
            .object({
              migrations: z.array(
                z.object({
                  path: z.string(),
                  name: z.string(),
                  timestamp: z.number(),
                }),
              ),
            })
            .describe("Pending migrations have been successfully returned"),
        },
      },
    },
    migrationsController.liveRun.bind(migrationsController),
  );
}
