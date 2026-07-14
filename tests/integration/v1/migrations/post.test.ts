import { beforeAll, describe, expect, test } from "bun:test";
import { buildApp } from "../../../../src/app";
import { clearDatabase } from "../../../utils/clear-database";

beforeAll(clearDatabase);

describe("POST /api/v1/migrations", () => {
  const testApp = buildApp();

  test("should execute pending migrations", async () => {
    const response = await testApp.inject({
      method: "POST",
      path: "/api/v1/migrations",
    });

    const parsedBody = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(parsedBody.migrations).toBeArray();
  });

  test("should return pending migrations", async () => {
    const response = await testApp.inject({
      method: "GET",
      path: "/api/v1/migrations",
    });

    const parsedBody = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(parsedBody.migrations).toBeArray();
    expect(parsedBody.migrations).toHaveLength(0);
  });
});
