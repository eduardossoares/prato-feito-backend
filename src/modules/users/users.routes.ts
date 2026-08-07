import type { FastifyInstance } from "fastify";
import z from "zod";
import UsersController from "./users.controller";

export default function usersRoutes(app: FastifyInstance) {
  const controller = new UsersController();

  app.post(
    "/",
    {
      schema: {
        tags: ["users"],
        description: "Create user with credentials",
        body: z.object({
          email: z.string(),
          username: z.string(),
          password: z.string(),
        }),
        response: {
          201: z
            .object({
              user: z.object({
                email: z.string(),
                username: z.string(),
                created_at: z.date(),
              }),
            })
            .describe("User created successfully"),
        },
      },
    },
    controller.createUser,
  );
}
