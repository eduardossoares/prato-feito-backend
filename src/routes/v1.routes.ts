import migrationsRoutes from "../modules/migrations/migrations.routes";
import statusRoutes from "../modules/status/status.routes";
import usersRoutes from "../modules/users/users.routes";
import type { FastifyTypedInstance } from "../shared/@types/fastify.types";

export default async function v1Routes(app: FastifyTypedInstance) {
  app.register(statusRoutes, { prefix: "/status" });
  app.register(migrationsRoutes, { prefix: "/migrations" });
  app.register(usersRoutes, { prefix: "/users" });
}
