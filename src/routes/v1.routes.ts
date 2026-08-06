import type { FastifyInstance } from "fastify";
import migrationsRoutes from "../modules/migrations/migrations.routes";
import statusRoutes from "../modules/status/status.routes";
import usersRoutes from "../modules/users/users.routes";

export default async function v1Routes(app: FastifyInstance) {
  app.register(statusRoutes, { prefix: "/status" });
  app.register(migrationsRoutes, { prefix: "/migrations" });
  app.register(usersRoutes, { prefix: "/users" });
}
