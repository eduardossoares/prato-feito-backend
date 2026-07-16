import fastifyCors from "@fastify/cors";
import { buildApp } from "./app";

const PORT = Number(process.env.PORT || 8080);
const HOST = process.env.HOST || "0.0.0.0";
const FRONTEND_URL = process.env.FRONTEND_URL || ""

const app = buildApp();
await app.register(fastifyCors, {
  origin: [FRONTEND_URL]
})

try {
  app.listen({ port: PORT, host: HOST }, () => {
    console.log(`Server is running on ${HOST}:${PORT}`);
  });
} catch (error) {
  console.error(error);
}
