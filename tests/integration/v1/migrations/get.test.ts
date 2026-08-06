import { beforeAll, describe, expect, test } from "bun:test";
import { clearDatabase } from "../../../../infra/database/clear-database";
import { buildApp } from "../../../../src/app";

beforeAll(clearDatabase);

describe("GET /api/v1/migrations", async () => {
  test("should return all migrations", async () => {
    const testApp = buildApp();

    const response = await testApp.inject({
      method: "GET",
      url: "/api/v1/migrations",
    });

    const parsedBody = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(parsedBody.migrations).toBeArray();
    expect(parsedBody.migrations.length).toBeGreaterThan(0);

    await testApp.close();
  });
});
