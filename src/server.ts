import fastifyCors from "@fastify/cors";
import { buildApp } from "./app";

const PORT = Number(process.env.PORT || 8080);
const HOST = process.env.HOST || "0.0.0.0";
const FRONTEND_URL = process.env.FRONTEND_URL || "";

const app = buildApp();

await app.register(fastifyCors, {
  origin: [FRONTEND_URL],
});

try {
  app.listen({ port: PORT, host: HOST }, () => {
    const isDev = process.env.NODE_ENV === "development";

    if (isDev) {
      console.log(`Server is running on http://${HOST}:${PORT}`);
      console.log(`Docs are running on http://${HOST}:${PORT}/docs`);
      return;
    }

    console.log("Server is running!");
  });
} catch (error) {
  console.error(error);
}
