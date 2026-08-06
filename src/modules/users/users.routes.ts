import type { FastifyInstance } from "fastify";
import UsersController from "./users.controller";

export default function usersRoutes(app: FastifyInstance) {
  const controller = new UsersController();
  app.post("/", controller.createUser);
}
