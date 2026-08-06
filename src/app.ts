import Fastify from "fastify";
import v1Routes from "./routes/v1.routes";
import { errorHandler, notFoundHandler } from "./shared/http/handlers";
import {
  validatorCompiler,
  serializerCompiler,
} from "fastify-type-provider-zod";

export function buildApp() {
  const app = Fastify({
    logger: true,
  });

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.setErrorHandler(errorHandler);
  app.setNotFoundHandler(notFoundHandler);

  app.register(v1Routes, {
    prefix: "/api/v1",
  });

  return app;
}
